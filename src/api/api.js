const API_URL = process.env.REACT_APP_API_URL_DEV;

export const downloadVideo = (listUrlsBody) => {
  return fetch(`${API_URL}/download-video-list`, {
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

export const checkAPIStatus = () => {
  try {
    return fetch(`${API_URL}/check-status`, {
      method: "get",
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
  } catch (error) {
    console.error(error);
  }
};

export const getConfiguration = () => {
  try {
    return fetch(`${API_URL}/config`, {
      method: "get",
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
  } catch (error) {
    console.error(error);
  }
};

const handleError = (error) => {
  return { status: false, error: error };
};
