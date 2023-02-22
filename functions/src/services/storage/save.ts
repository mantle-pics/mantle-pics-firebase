import axios from "axios";
import sharp = require("sharp");
import {storage} from "../../_constants";


export const saveImage = (address: string, url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
      responseType: "stream",
    })
        .then((response) => {
          const transformer = sharp()
              .composite([{
                input: process.cwd() + "/lib/assets/overlay.png",
              }])
              .png();

          const gcFile = storage.bucket()
              .file(`address/${address}/profile.png`);

          response.data
              .pipe(transformer)
              .pipe(gcFile.createWriteStream({
                resumable: false,
                validation: false,
                public: true,
                contentType: "auto",
                metadata: {
                  "Cache-Control": "public, max-age=31536000",
                },
              }))
              .on("error", (error: any) => {
                reject(error);
              })
              .on("finish", () => {
                gcFile.getSignedUrl({
                  action: "read",
                  expires: "03-09-2491",
                }).then((urlImage) => {
                  resolve(urlImage[0]);
                });
              });
        })
        .catch((err) => reject(err));
  });
};
