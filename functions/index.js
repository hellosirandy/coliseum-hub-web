const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const storeSingleImage = require("./utils").storeSingleImage;

exports.storeImages = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const body = JSON.parse(req.body);
    const results = body.images.map(image => {
      return storeSingleImage(image);
    });
    Promise.all(results)
      .then(urls => {
        console.log(urls);
        return res.status(201).json(urls)
      })
      .catch(e => {
        res.status(500).json({
          error: e
        })
      })
  });
})