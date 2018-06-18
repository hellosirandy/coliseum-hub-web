import * as functions from 'firebase-functions';
import * as cors from 'cors';

export const uploadImages = functions.https.onRequest((req, res) => {
  cors({origin: true})(req, res, () => {
    res.status(201).json({
      message: 'hello there'
    })
  })
});
