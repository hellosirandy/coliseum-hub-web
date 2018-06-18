import * as fs from 'fs';
import * as UUID from 'uuid-v4';
import { gcconfig } from './sensitives'
import * as Storage from '@google-cloud/storage';

export const storeSingleImage = (image) => { 
  const base64 = image.base64.replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(`/tmp/${image.name}`, base64, "base64");
  const gcs = Storage(gcconfig);
  const bucket = gcs.bucket(`${gcconfig.projectId}.appspot.com`);
  const uuid = UUID();
  return bucket.upload(
    `/tmp/${image.name}`, {
      destination: "/stadiums/" + uuid + "." + image.name.split('.').pop(),
      metadata: {
        metadata: {
          contentType: "image",
          firebaseStorageDownloadTokens: uuid
        }
      }
    })
      .then(uploadResponse => {
        const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" +
          bucket.name +
          "/o/" +
          encodeURIComponent(uploadResponse[0].name) +
          "?alt=media&token=" +
          uuid;
        return imageUrl;
      })
}