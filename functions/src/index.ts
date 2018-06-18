import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { storeSingleImage } from './utils'

export const uploadImages = functions.https.onRequest((req, res) => {
  cors({origin: true})(req, res, () => {
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
  })
});
