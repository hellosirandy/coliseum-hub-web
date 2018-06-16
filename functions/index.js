const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require("uuid-v4");
const gcconfig = require("./sensitives").gcconfig;

const gcs = require("@google-cloud/storage")(gcconfig);

exports.storeImages = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const body = JSON.parse(req.body);
    const image = body.images[0];
    console.log(image);
    console.log(image.name)
    fs.writeFileSync(`/tmp/${image.name}`, image.base64, "base64", err => {
      console.log(err);
      return response.status(500).json({
        error: err
      });
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
          res.status(201).json({
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid
          });
        } else {
          console.log(err);
          res.status(500).json({
            error: err
          });
        }
      }
    );
  });
})