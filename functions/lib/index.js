"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const http = require("./https/index");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.createStadium = functions.https.onRequest(http.createStadium);
exports.getStadiums = functions.https.onRequest(http.getStadiums);
//# sourceMappingURL=index.js.map