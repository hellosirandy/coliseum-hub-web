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
const index_1 = require("./index");
exports.addStadium = (db, data) => __awaiter(this, void 0, void 0, function* () {
    if (!data) {
        throw { error: "Missing stadium field" };
    }
    let images = [];
    if (data.images && data.images.length > 0) {
        try {
            images = yield index_1.uploadImages(data.images);
        }
        catch (e) {
            console.log('Failed to upload images');
            images = [];
        }
    }
    const stadium = Object.assign({}, data, { images });
    return db.collection('stadiums').add(stadium);
});
//# sourceMappingURL=stadiums.js.map