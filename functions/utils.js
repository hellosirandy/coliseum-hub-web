const fs = require('fs');
const UUID = require("uuid-v4");
const gcconfig = require("./sensitives").gcconfig;

const gcs = require("@google-cloud/storage")(gcconfig);

exports.storeSingleImage = function(image) {
  const promise = new Promise((resolve, reject) => {
    const base64 = image.base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(`/tmp/${image.name}`, base64, "base64", err => {
      reject(err);
    });
    const bucket = gcs.bucket(`${gcconfig.projectId}.appspot.com`);
    const uuid = UUID();
    bucket.upload(
      `/tmp/${image.name}`, {
        uploadType: "media",
        destination: "/stadiums/" + uuid + "." + image.name.split('.').pop(),
        metadata: {
          metadata: {
            contentType: "image",
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, file) => {
        if (!err) {
          const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" +
            bucket.name +
            "/o/" +
            encodeURIComponent(file) +
            "?alt=media&token=" +
            uuid;
          resolve(imageUrl);
        } else {
          reject(err);
        }
      }
    )
  })
  return promise;
}