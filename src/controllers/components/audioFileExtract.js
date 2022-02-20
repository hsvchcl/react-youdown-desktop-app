import shell from "shelljs";
export const audioFileExtract = ({
  absolutePathTemp,
  absolutePathFile,
  videoName,
}) => {
  return new Promise((resolve, reject) => {
    try {
      const command = `ffmpeg -y -i ${absolutePathFile} ${absolutePathTemp}/audio/${videoName}.mp3`;
      shell.exec(command, { silent: true }, (code, stdout, stderr) => {
        if (code === 0) {
          resolve(true);
        } else {
          if (stdout) {
            console.info(stdout);
          } else if (stderr) {
            console.info(stderr);
          }
          resolve(false);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};