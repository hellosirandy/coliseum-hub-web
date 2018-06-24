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
const firebase_admin_1 = require("firebase-admin");
exports.checkAuthorization = (req) => __awaiter(this, void 0, void 0, function* () {
    const authorization = req.get('Authorization');
    if (!authorization) {
        throw { error: 'Missing authorization field' };
    }
    if (!authorization.includes('Bearer ')) {
        throw { error: 'Invalid Bearer format' };
    }
    const tokenId = req.get('Authorization').split('Bearer ')[1];
    return firebase_admin_1.auth().verifyIdToken(tokenId);
});
//# sourceMappingURL=auth.js.map