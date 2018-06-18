import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { uploadSingleImage } from './utils'

export const uploadImages = functions.https.onRequest((req, res) => {
  cors({origin: true})(req, res, async () => {
    const body = JSON.parse(req.body);
    const results = body.images.map(image => {
      return uploadSingleImage(image);
    });
    try {
      const urls = await Promise.all(results);
      return res.status(201).json(urls)
    } catch (e) {
      return res.status(500).json({
        error: e
      })
    }
  })
});
