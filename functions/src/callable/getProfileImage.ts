import * as functions from "firebase-functions";
import {storage} from "../_constants";
import * as c from "cors";
import {generateAndSaveImage} from "../services/generateProfileImage";


const cors = c({origin: true});


export const getProfileImageCallable = functions.runWith({
  timeoutSeconds: 300,
}).https.onRequest((req, res) => {
  cors(req, res, async () => {
    const start = Date.now();

    let address = req.body.address;
    const regenerate = req.body.regenerate;

    if (!address) {
      res.send({
        error: "no address provided",
      });
      return;
    }

    if (address.startsWith("0x")) {
      address = address.substring(2);
    }

    // check if image exists in cloud storage
    // in this path `address/${address}/profile.png`

    const bucket = storage.bucket();
    const file = bucket.file(`address/${address}/profile.png`);
    const exists = await file.exists();

    if (exists[0] && !regenerate) {
      const url = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      res.send({
        url: url[0],
        time: Date.now() - start,
      });
    } else {
      generateAndSaveImage(address).then((generationResult) => {
        const result = {
          url: generationResult.url,
          time: Date.now() - start,
        };

        functions.logger.log("getProfileImageCallable/generateAndSaveImage", result);

        res.send(result);
      }).catch((err) => {
        functions.logger.error("getProfileImageCallable/generateAndSaveImage", err);

        const result = {
          error: err,
          time: Date.now() - start,
        };

        res.send(result);
      });
    }
  });
});
