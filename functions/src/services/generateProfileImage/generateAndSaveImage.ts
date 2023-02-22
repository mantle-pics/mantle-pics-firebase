import axios from "axios";
import {logger} from "firebase-functions/v1";
import {addressToMnemonic, addressToNumber} from "../mnemoic";
import {startGeneration} from "../replicate-api";
import {saveImage} from "../storage/save";

export const generateAndSaveImage =
  (address: string): Promise<{ url: string }> =>

    new Promise(async (resolve, reject) => {
      const mnemonicPhrase = addressToMnemonic(address);
      const seedPhrase = addressToNumber(address);
      logger.log("mnemonicPhrase", mnemonicPhrase);
      logger.log("seedPhrase", seedPhrase.toString());

      const resGen: any = await
      startGeneration(mnemonicPhrase, seedPhrase.toString());

      let output;

      await new Promise((resolve) => setTimeout(resolve, 10000));
      while (!output) {
        const res = await axios.get(resGen.urls?.get, {
          headers: {
            Authorization: "Token " + process.env.REPLICATE_TOKEN,
          },
        }).catch((err) => reject(err));
        output = res?.data?.output;
        if (!output) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (res?.data?.error) {
          return reject(res.data.error);
        }
      }

      logger.log("imageUrl", output?.[0]);
      const url = await saveImage(address, output[0]);

      return resolve({
        url,
      });
    });
