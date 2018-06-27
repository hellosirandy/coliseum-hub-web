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
const cors = require("cors");
const utils = require("../utils/index");
exports.createStadium = (req, res) => {
    cors({ origin: true })(req, res, () => __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case 'POST':
                let user;
                try {
                    user = yield utils.checkAuthorization(req);
                }
                catch (e) {
                    return res.status(401).send(e);
                }
                let result;
                try {
                    result = yield utils.addStadium(req.body.stadium, user.uid);
                }
                catch (e) {
                    return res.status(406).send(e);
                }
                res.status(201).send(user);
            default:
                res.status(405).send();
        }
    }));
};
exports.getStadiums = (req, res) => {
    cors({ origin: true })(req, res, () => __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case 'GET':
                let snapshot;
                try {
                    snapshot = yield utils.getStadiums();
                }
                catch (e) {
                    return res.status(401).send(e);
                }
                const stadiums = [];
                snapshot.forEach(doc => {
                    stadiums.push(doc.data());
                });
                res.status(200).send(stadiums);
            default:
                res.status(405).send();
        }
    }));
};
//# sourceMappingURL=stadiums.js.map