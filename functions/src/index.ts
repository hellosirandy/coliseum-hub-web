import * as functions from 'firebase-functions';
import * as http from './https/index';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export const createStadium = functions.https.onRequest(http.createStadium);
export const getStadiums = functions.https.onRequest(http.getStadiums);
export const downloadImage = functions.https.onRequest(http.downloadImage);