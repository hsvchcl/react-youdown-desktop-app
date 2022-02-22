import { Tree } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { getDirList, getNavDir } from "../../api/api.js";
export const FileTree = () => {
  const [files, setFiles] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await fetchData();
    setFiles([...data]);
    document
      .getElementById("treefile")
      .addEventListener("click", function (event) {
        clickedDir(event.target.textContent, data);
      });
  }, []);

  const clickedDir = async (dirClick, data) => {
    if (dirClick !== undefined) {
      const nav = await getNavDir(dirClick);
      const a = nav.dirList.map((element) => {
        return { type: "directory", name: element };
      });
      const pepe = data.findIndex((item) => item.name === dirClick);
      const ee = { ...data[pepe], files: a };
      data[pepe] = ee;
      setFiles([...data]);
    }
  };

  const fetchData = async () => {
    const directories = await getDirList();
    const dirFileObject = directories.map((item) => {
      const dirOrFile = item.split(".");
      if (dirOrFile.length === 1) {
        console.log(item);
        return { type: "directory", name: item };
      } else {
        return {
          type: "file",
          name: item,
        };
      }
    });
    return dirFileObject;
  };

  return <Tree value={files} id="treefile" />;
};
