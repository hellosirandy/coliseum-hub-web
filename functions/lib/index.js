"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require("cors");
const utils_1 = require("./utils");
exports.uploadImages = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => __awaiter(this, void 0, void 0, function* () {
        const body = JSON.parse(req.body);
        const results = body.images.map(image => {
            return utils_1.uploadSingleImage(image);
        });
        try {
            const urls = yield Promise.all(results);
            return res.status(201).json(urls);
        }
        catch (e) {
            return res.status(500).json({
                error: e
            });
        }
    }));
});
//# sourceMappingURL=index.js.map