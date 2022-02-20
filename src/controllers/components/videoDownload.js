import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ytdl from "ytdl-core";

export const videoDownload = (videoUrl, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const absolutePathTemp = `${path.dirname(__filename)}/tmp`;
      const videoBasicInfo = await ytdl.getBasicInfo(videoUrl);
      const videoName = videoBasicInfo.videoDetails.title
        .replace(/\s/g, "")
        .replace(/[^a-zA-Z ]+/gi, "_");
      const absolutePathFile = `${absolutePathTemp}/${videoName}.mp4`;
      ytdl(videoUrl, { filter: type }).pipe(
        fs
          .createWriteStream(absolutePathFile)
          .on("finish", () => {
            resolve({ absolutePathTemp, absolutePathFile, videoName });
          })
          .on("error", (err) => {
            console.log(err);
          })
      );
    } catch (error) {
      reject(error);
    }
  });
};
