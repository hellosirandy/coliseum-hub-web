import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { checkAuthorization, addStadium } from './utils/index'

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const auth = admin.auth();

export const createStadium = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, async () => {
    let user;
    try {
      user = await checkAuthorization(auth, req);
    } catch(e) {
      res.status(401).send(e);
    }
    let result;
    try {
      result = await addStadium(db, req.body.stadium);
    } catch(e) {
      res.status(406).send(e);
    }
    res.status(200).send(result);
  })
});