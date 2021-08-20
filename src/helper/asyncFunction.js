import axios from "axios";

const API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";
const API_URL_XL = "https://api-dev.xl.pdb.e-dpm.com/xlpdbapi";
const API_URL_ISAT = "https://api-dev.isat.pdb.e-dpm.com/isatapi";
const API_URL_TSEL = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
// const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const API_EMAIL =
  "https://prod-183.westeurope.logic.azure.com:443/workflows/3b8a849953b94bfdb912b9b7ea078eed/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MU25Ui78cMW3PgJFVGHLrgBuKIEGXb0k28M_THXnggs";
// const API_EMAIL = 'https://prod-43.westeurope.logic.azure.com:443/workflows/50e98637748147d0965ffbc947f2ecfa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NkPVscs69YncexC1mmgkZzpdcXdKc-cKDVytYf0cXyw';
const usernameEVE = "adminbamidsuper";
const passwordEVE = "F760qbAg2sml";

export const getDatafromAPIFreeToken = async (url, token) => {
  try {
    let respond = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return respond;
  } catch (err) {
    let respond = err;
    return respond;
  }
};

// PDB

export const getDatafromAPI_PDB2 = async (url, props) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API_URL_PDB2 + url, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.REACT_APP_usernamepdb2,
        password: process.env.REACT_APP_passwordpdb2,
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
};

export const getDatafromAPI_PDB_dev = async (url, props) => {
  try {
    let respond = await axios.get('https://test.iv-tracker.com/api/bam' + url, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.REACT_APP_usernamepdb2,
        password: process.env.REACT_APP_passwordpdb2,
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
};

export const getDatafromAPIEXEL = async (url) => {
  try {
    let respond = await axios.get(API_URL_XL + url, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: usernameEVE,
        password: passwordEVE,
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
};

export const getDatafromAPIISAT = async (url) => {
  try {
    let respond = await axios.get(API_URL_ISAT + url, {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: usernameEVE,
        password: passwordEVE,
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
};

export const getDatafromAPITSEL = async (url) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API_URL_PB1 + url, {
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
};

export const getDatafromAPINODE = async (url, props) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond GET Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond GET Data err", err);
    return respond;
  }
};

export const getDatafromAPINODEFile = async (url, props, con_type) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
      responseType: "blob",
      headers: {
        // "Content-Type": con_type,
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

export const postDatatoAPIFreeTokenBasic = async (url, data, token) => {
  try {
    let respond = await axios.post(url, data, {
      headers: {
        Authorization: "Basic " + token,
      },
    });
    return respond;
  } catch (err) {
    let respond = err;
    return respond;
  }
};

export const postDatatoAPINODE = async (url, data, props) => {
  try {
    let respond = await axios.post(
      process.env.REACT_APP_API_URL_NODE + url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props,
        },
      }
    );
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

export const postDatatoAPINODEdata = async (url, data, props) => {
  try {
    let respond = await axios.post(
      process.env.REACT_APP_API_URL_NODE + url,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + props,
        },
      }
    );
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

export const patchDatatoAPINODE = async (url, data, props) => {
  try {
    let respond = await axios.patch(
      process.env.REACT_APP_API_URL_NODE + url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props,
        },
      }
    );
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

// email
export const apiSendEmail = async (data) => {
  try {
    let respond = await axios.post(API_EMAIL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return respond;
  } catch (err) {
    let respond = undefined;
    return respond;
  }
};
export const deletemanyDataFromAPINODE = async (url, props, data) => {
  try {
    let respond = await axios.delete(process.env.REACT_APP_API_URL_NODE + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props,
      },
      data,
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
