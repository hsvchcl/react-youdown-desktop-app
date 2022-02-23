export const getDirList = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}/list-usr-directories`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((resp) => {
      return resp;
    })
    .catch((err) => handleError(err.message));
};

export const getNavDir = async (path) => {
  return fetch(`${process.env.REACT_APP_API_URL}/to-path/${path}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((resp) => {
      return resp;
    })
    .catch((err) => handleError(err.message));
};

export const downloadVideo = (listUrlsBody) => {
  return fetch(`${process.env.REACT_APP_API_URL}/download-video-list`, {
    method: "post",
    body: listUrlsBody,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((resp) => {
      return resp;
    })
    .catch((err) => handleError(err.message));
};

const handleError = (error) => {
  console.error(error);
};
