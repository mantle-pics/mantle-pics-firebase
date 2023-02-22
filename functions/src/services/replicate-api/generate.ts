import axios from "axios";
import {logger} from "firebase-functions/v1";

export const startGeneration = (prompt: string, seed: string) =>
  new Promise((resolve, reject) => {
    // const data = JSON.stringify({
    //   version:
    //     "28cea91bdfced0e2dc7fda466cc0a46501c0edc84905b2120ea02e0707b967fd",
    //   input: {
    //     prompt: prompt,
    //     negative_prompt: "text",
    //     seed: seed,
    //     width: 640,
    //     height: 640,
    //   },
    // });

    // const data = JSON.stringify({
    //   version:
    //     "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
    //   input: {
    //     prompt:
    // 'mdjrny-v4 style, highly detailed, 3d art, artstation, concept art, smooth, sharp focus, illustration, 8k,'
    // + prompt,
    //     seed: seed,
    //     width: 512,
    //     height: 512,
    //   },
    // });

    const data = JSON.stringify({
      version:
        "f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
      input: {
        prompt: "8k, illustration, hyperrealistic, happy lighting, detailed," + prompt,
        negative_prompt: "text",
        seed: seed,
        width: 640,
        height: 640,
      },
    });


    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.replicate.com/v1/predictions",
      headers: {
        "Authorization": "Token " + process.env.REPLICATE_TOKEN,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
        .then((response) => {
          logger.log("startGeneration", JSON.stringify(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          logger.error("startGeneration", error);
          reject(error);
        });
  });
