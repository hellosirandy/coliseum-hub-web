"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require("cors");
const utils_1 = require("./utils");
exports.uploadImages = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => {
        const body = JSON.parse(req.body);
        const results = body.images.map(image => {
            return utils_1.storeSingleImage(image);
        });
        Promise.all(results)
            .then(urls => {
            console.log(urls);
            return res.status(201).json(urls);
        })
            .catch(e => {
            res.status(500).json({
                error: e
            });
        });
    });
});
//# sourceMappingURL=index.js.map