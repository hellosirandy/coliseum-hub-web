import * as fs from 'fs';
import * as UUID from 'uuid-v4';
import { gcconfig } from '../sensitives'
import * as GCS from '@google-cloud/storage';
import * as CPP from 'child-process-promise';

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
  return imageUrl;
}

export const uploadImages = async (images) => {
  const results = images.map(image => {
    return uploadSingleImage(image);
  });
  return Promise.all(results);
}