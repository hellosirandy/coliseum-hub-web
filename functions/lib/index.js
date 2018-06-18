"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require("cors");
exports.uploadImages = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => {
        res.status(201).json({
            message: 'hello there'
        });
    });
});
//# sourceMappingURL=index.js.map