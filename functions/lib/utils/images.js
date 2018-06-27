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
const fs = require("fs");
const UUID = require("uuid-v4");
const sensitives_1 = require("../sensitives");
const GCS = require("@google-cloud/storage");
const CPP = require("child-process-promise");
const request = require("request-promise");
const storage = GCS(sensitives_1.gcconfig);
const bucket = storage.bucket(`${sensitives_1.gcconfig.projectId}.appspot.com`);
const convertAndUploadImage = (source, extension, uuid, size = null) => __awaiter(this, void 0, void 0, function* () {
    let destination = null;
    if (size) {
        destination = `/tmp/${size}${source.split('/').pop()}`;
        const { spawn } = CPP;
        yield spawn('convert', [source, '-thumbnail', `${size}>`, destination]);
    }
    const folder = size ? size : 'original';
    return bucket.upload(destination ? destination : source, {
        destination: `/stadiums/${folder}/` + uuid + '.' + extension,
        metadata: {
            metadata: {
                contentType: "image",
                firebaseStorageDownloadTokens: uuid
            }
        }
    });
});
const uploadSingleImage = (image) => __awaiter(this, void 0, void 0, function* () {
    const base64 = image.base64.replace(/^data:image\/\w+;base64,/, '');
    const originalURL = `/tmp/${image.name}`;
    fs.writeFileSync(originalURL, base64, "base64");
    const uuid = UUID();
    const sizes = [800, 400, 200, 100];
    const results = sizes.map(size => {
        return convertAndUploadImage(originalURL, image.name.split('.').pop(), uuid, size);
    });
    yield Promise.all(results);
    const uploadResponse = yield convertAndUploadImage(originalURL, image.name.split('.').pop(), uuid);
    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" +
        bucket.name +
        "/o/" +
        encodeURIComponent(uploadResponse[0].name) +
        "?alt=media&token=" +
        uuid;
    return {
        url: imageUrl,
        source: {
            type: image.type,
            author: image.author,
        }
    };
});
const requestImage = (url) => __awaiter(this, void 0, void 0, function* () {
    try {
        const options = {
            url,
            encoding: 'base64'
        };
        const base64 = yield request.get(options);
        return { base64, name: 'temp.jpg' };
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.uploadImages = (images, uid) => __awaiter(this, void 0, void 0, function* () {
    const results = [];
    for (const image of images) {
        let newImage = Object.assign({}, image, { type: "internal", author: uid });
        // URL
        if (!image.base64) {
            try {
                const base64AndName = yield requestImage(image.src);
                newImage = Object.assign({}, image, base64AndName, { type: "external", author: image.src });
            }
            catch (e) {
                break;
            }
        }
        results.push(uploadSingleImage(newImage));
    }
    return Promise.all(results);
});
//# sourceMappingURL=images.js.map