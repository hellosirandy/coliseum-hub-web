import * as fs from 'fs';
import * as UUID from 'uuid-v4';
import { gcconfig } from '../sensitives'
import * as GCS from '@google-cloud/storage';
import * as CPP from 'child-process-promise';
import * as request from 'request-promise';

const storage = GCS(gcconfig);
const bucket = storage.bucket(`${gcconfig.projectId}.appspot.com`);

const convertAndUploadImage = async (source, extension, uuid, size = null) => {
  let destination = null;
  if (size) {
    destination = `/tmp/${size}${source.split('/').pop()}`;
    const { spawn } = CPP;
    await spawn('convert', [source, '-thumbnail', `${size}>`, destination]);
  }
  const folder = size ? size : 'original'
  return bucket.upload(
    destination ? destination : source,
    {
      destination: `/stadiums/${folder}/` + uuid + '.' + extension,
      metadata: {
        metadata: {
          contentType: "image",
          firebaseStorageDownloadTokens: uuid
        }
      }
    }
  )
}

const uploadSingleImage = async (image) => {
  const base64 = image.base64.replace(/^data:image\/\w+;base64,/, '');
  const originalURL = `/tmp/${image.name}`;
  fs.writeFileSync(originalURL, base64, "base64");
  const uuid = UUID();
  const sizes = [800, 400, 200, 100];
  const results = sizes.map(size => {
    return convertAndUploadImage(originalURL, image.name.split('.').pop(), uuid, size)
  });
  await Promise.all(results);
  const uploadResponse = await convertAndUploadImage(originalURL, image.name.split('.').pop(), uuid);
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" +
    bucket.name +
    "/o/" +
    encodeURIComponent(uploadResponse[0].name) +
    "?alt=media&token=" +
    uuid;
  return {
    url: imageUrl,
    source: {
      type: image.type,
      author: image.author,
    }
  };
}

const requestImage = async (url) => {
  try {
    const options = {
      url,
      encoding: 'base64'
    };
    const base64 = await request.get(options);
    return { base64, name: 'temp.jpg' };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const uploadImages = async (images, uid) => {
  const results = [];
  for (const image of images) {
    let newImage = {
      ...image,
      type: "internal",
      author: uid,
    };
    // URL
    if (!image.base64) {
      try {
        const base64AndName = await requestImage(image.src);
        newImage = {
          ...image,
          ...base64AndName,
          type: "external",
          author: image.src,
        }
      } catch(e) {
        break;
      }
    }
    results.push(uploadSingleImage(newImage));
  }
  return Promise.all(results);
}