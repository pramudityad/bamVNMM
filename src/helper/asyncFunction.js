import axios from "axios";


/**
 * get
 * @param {*} url api XL
 */
export const getDatafromAPIEXEL = async (url) => {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_XL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: process.env.REACT_APP_usernameXL,
          password: process.env.REACT_APP_passwordXL,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Get Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
  }

/**
 * get
 * @param {*} url api2 NODE
 * @param {*} props Authmethod bearer Token
 */
export const getDatafromAPINODE = async (url, props) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Post Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Post Data err", err);
    return respond;
  }
};

/**
 * post 
 * @param {*} url api2 NODE
 * @param {*} data body
 * @param {*} props Authmethod bearer Token
 */
export const postDatatoAPINODE = async (url, data, props) => {
  try {
    let respond = await axios.post(process.env.REACT_APP_API_URL_NODE + url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Post Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Post Data err", err);
    return respond;
  }
};

/**
 * patch 
 * @param {*} url api2 NODE
 * @param {*} data body
 * @param {*} props Authmethod bearer Token
 */
export const patchDatatoAPINODE = async (url, data, props) => {
  try {
    let respond = await axios.patch(process.env.REACT_APP_API_URL_NODE + url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond patch Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond patch Data err", err);
    return respond;
  }
};

/**
 * delete data
 * @param {*} url api2 NODE
 * @param {*} props Authmethod bearer Token
 */
export const deleteDataFromAPINODE = async (url, props) => {
  try {
    let respond = await axios.delete(process.env.REACT_APP_API_URL_NODE + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond delete Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond delete Data err", err);
    return respond;
  }
};

/**
 * delete with body
 * @param {*} url api2 NODE
 * @param {*} data body
 * @param {*} props Authmethod bearer Token
 */
export const deleteDataFromAPINODE2 = async (url, data, props) => {
  try {
    let respond = await axios.delete(process.env.REACT_APP_API_URL_NODE + url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
      data
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond delete Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond delete Data err", err);
    return respond;
  }
}
