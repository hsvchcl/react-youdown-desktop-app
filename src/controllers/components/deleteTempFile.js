import fs from "fs";
export const deleteTempFile = (absolutePathFile) => {
  return fs.unlinkSync(absolutePathFile);
};
