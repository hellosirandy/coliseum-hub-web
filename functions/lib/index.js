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
const index_1 = require("./utils/index");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const auth = admin.auth();
exports.createStadium = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield index_1.checkAuthorization(auth, req);
        }
        catch (e) {
            res.status(401).send(e);
        }
        let result;
        try {
            result = yield index_1.addStadium(db, req.body.stadium);
        }
        catch (e) {
            res.status(406).send(e);
        }
        res.status(200).send(result);
    }));
});
//# sourceMappingURL=index.js.map