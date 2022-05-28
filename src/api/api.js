const API_URL = process.env.REACT_APP_API;

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

export const saveConfiguration = (form) => {
  try {
    return fetch(`${API_URL}/save-config`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
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

export const getVideoInfo = (videoUrl) => {
  try {
    return fetch(`${API_URL}/video-info?video_url=${videoUrl}`, {
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
    console.log(error);
    return error;
  }
};

const handleError = (error) => {
  return { status: false, error: error };
};
