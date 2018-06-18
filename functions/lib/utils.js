"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const sensitives_1 = require("./sensitives");
const Storage = require("@google-cloud/storage");
exports.storeSingleImage = (image) => {
    const base64 = image.base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(`/tmp/${image.name}`, base64, "base64");
    const gcs = Storage(sensitives_1.gcconfig);
    const bucket = gcs.bucket(`${sensitives_1.gcconfig.projectId}.appspot.com`);
    const uuid = UUID();
    return bucket.upload(`/tmp/${image.name}`, {
        // uploadType: "media",
        destination: "/stadiums/" + uuid + "." + image.name.split('.').pop(),
        metadata: {
            metadata: {
                contentType: "image",
                firebaseStorageDownloadTokens: uuid
            }
        }
    })
        .then(uploadResponse => {
        const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" +
            bucket.name +
            "/o/" +
            encodeURIComponent(uploadResponse[0].name) +
            "?alt=media&token=" +
            uuid;
        return imageUrl;
    });
};
//# sourceMappingURL=utils.js.map