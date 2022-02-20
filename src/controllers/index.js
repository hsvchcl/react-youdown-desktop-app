import { videoDownload } from "./components/videoDownload";
import { audioFileExtract } from "./components/audioFileExtract";
import { deleteTempFile } from "./components/deleteTempFile";
const main = async (videoUrl, type) => {
  try {
    const pathTemp = await videoDownload(videoUrl, type);
    if (type === "audioonly") {
      const audioExtract = await audioFileExtract(pathTemp);
      if (audioExtract) {
        deleteTempFile(pathTemp.absolutePathFile);
      }
      return audioExtract;
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const downloadVideos = async (videoList, type) => {
  const proccess = await Promise.all(
    videoList.map(async (video) => {
      return main(video, type);
    })
  );

  if (proccess.includes(false)) {
    console.info("❌ Algo ocurrio en el proceso.");
  } else {
    console.info("✅ Proceso finalizado.");
  }
};
