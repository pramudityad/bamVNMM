import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { ExcelRenderer } from "react-excel-renderer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  getDatafromAPITSEL,
  getDatafromAPIBHARTI,
  getDatafromAPI_PDB2,
  getDatafromAPI_PDB_dev,
  getDatafromAPINODE,
  postDatatoAPINODE,
  patchDatatoAPINODE,
} from "../../helper/asyncFunction";
import Select from "react-select";

const DefaultNotif = React.lazy(() =>
  import("../../viewsIndosat/DefaultView/DefaultNotif")
);

const API_URL_BMS_Phil = "https://api-dev.smart.pdb.e-dpm.com/smartapi";
const usernamePhilApi = "pdbdash";
const passwordPhilApi = "rtkO6EZLkxL1";

const API_URL_BAM = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

const API_URL_PDB_TSEL = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameTselApi = "adminbamidsuper";
const passwordTselApi = "F760qbAg2sml";

const API_URL_ISAT = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameISAT = "adminbamidsuper";
const passwordISAT = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const tokenpdb_temp = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiSTgzcmtBQ0RBeDhJdkpvTnhjbzZLQlp3S1NHUGtYNGhzbVdieXd0OFZnIn0.eyJqdGkiOiI5YWY5MGRiNC0zYjM2LTQwZTUtYTEzZS03NTg1YjM2MDJhOGEiLCJleHAiOjE2MjE0MzQ0NjQsIm5iZiI6MCwiaWF0IjoxNjIxNDI4MTY1LCJpc3MiOiJodHRwczovL2Nhcy5lLWRwbS5jb20vYXV0aC9yZWFsbXMvRURQTS1TU08iLCJzdWIiOiJhOGMyMWZkOS0zZWEyLTQxYWQtYmVjYy1kNTk3ODg5ODA0ODkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhY2NvdW50Iiwibm9uY2UiOiJlOGQyOGQ2Yy02YzJhLTRhNTUtOTIzZC0yMmJmMGZkOWU5NGQiLCJhdXRoX3RpbWUiOjE2MjE0MjgxNjQsInNlc3Npb25fc3RhdGUiOiJmYTYxMDczMy00ZWFjLTQyNTItOWFhMS03YTc0ZjhlODEzNTciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYWN0LmUtZHBtLmNvbSIsImh0dHBzOi8vYmFtLXZubW0uZS1kcG0uY29tIiwiaHR0cHM6Ly9iYW0tbXkuZS1kcG0uY29tIiwiaHR0cHM6Ly9zbWFydC5wZGItZmxvdy5lLWRwbS5jb20iLCJodHRwczovL3NtYXJ0LnBkYi10ZXN0Zmxvdy5lLWRwbS5jb20iLCJodHRwOi8vZGV2LmNvbnZlcnNhdGlvbi5lLWRwbS5jb20iLCJodHRwOi8vbG9jYWxob3N0OjUwMTQiLCJodHRwOi8vY29udmVyc2F0aW9uLmUtZHBtLmNvbSIsImh0dHA6Ly90aC5lLWRwbS5jb20iLCJodHRwczovL3NtYXJ0LmUtZHBtLmNvbSIsImh0dHBzOi8vZGV2LmJhbS1teS5lLWRwbS5jb20iLCJodHRwczovL2Rldi54bC5wZGItdjIuZS1kcG0uY29tIiwiaHR0cHM6Ly9jYXMuZS1kcG0uY29tL2F1dGgiLCJodHRwczovL2JhbS1pZC5lLWRwbS5jb20iLCJodHRwczovL2JhbS12aWwuZS1kcG0uY29tIiwiaHR0cHM6Ly90aC5lLWRwbS5jb20iLCJodHRwczovL2Rldi5iYW0tdmlsLmUtZHBtLmNvbSIsImh0dHBzOi8vdGVzdC5pdi10cmFja2VyLmNvbSIsImh0dHBzOi8vdm5tbS1wZGIuZS1kcG0uY29tIiwiaHR0cHM6Ly9iYW0tYmhhcnRpLmUtZHBtLmNvbSIsImh0dHBzOi8vZGV2LmJhbS1iaGFydGkuZS1kcG0uY29tIiwiaHR0cHM6Ly9kZXYtdGguZS1kcG0uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDA1IiwiaHR0cHM6Ly9hY3QtYmhhcnRpLmUtZHBtLmNvbSIsImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImh0dHA6Ly81Mi4yMzAuNC4yMTg6NTAwMiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHBzOi8vZGV2LmJhbS1zZy5lLWRwbS5jb20iLCJodHRwczovL2RldjMuYWN0LmUtZHBtLmNvbSIsImh0dHBzOi8vYmFtLXNnLmUtZHBtLmNvbSIsImh0dHBzOi8vbW9haS1kYXNoLmUtZHBtLmNvbSIsImh0dHBzOi8vZGV2LmJhbS1pZC5lLWRwbS5jb20iLCJodHRwczovL2Rldi5iYW0tdm5tbS5lLWRwbS5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwaG9uZSBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQWRtaW4gQkFNLVZOTU0iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbmJhbXZubW1zdXBlciIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiQkFNLVZOTU0iLCJlbWFpbCI6ImJhbXZubW1hZG1pbkBlLWRwbS5jb20ifQ.IXxIrL4i-Xwh_buRWU_aQIQhiwF0hywdCYzkMt40bJnX1gMZOMa-waXWd6kOeuqtV_TOKj94c2Pitz1kumGGvDvjrltzl8iclGTEBXjHf9n1KK1KAU3qFvC1z3BLzUxUBradpnQCHO3mj5yJytJ_D2vWDdlJMGxdBbQ1wb2wGmAHOP2LfppD558reDi6l4G44k5nx-SRvoVW4QPbLPxh-JfpSLsTb17UF-2QFTYIPwJPUpA5xj0wGffSGNWk-txnKdRgU8VuGh6NnndGPafanYsshkeN5WZQw2Jk0ABVbrcD7F7pVUuBJ9JWDwX6skRYF5r2Fyic3MolzQwNOKReHw";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  inValue = "",
  disabled = false,
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={inValue}
    className="checkmark-dash"
    disabled={disabled}
  />
);

const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

class BulkMR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      tokenPDB: this.props.dataLogin.token_pdb,
      asp_list: [],
      rowsXLS: [],
      list_data_activity: [],
      data: [],
      cols: [],
      project_name_selected: null,
      cd_id_selected: null,
      dataTssrUpload: [],
      waiting_status: null,
      action_status: null,
      action_message: null,
      redirectSign: false,
      data_checking_mr: [],
      list_warehouse: [],
      modal_loading: false,
      sow_type: null,
      list_project_selection: []
    };
    this.exportFormatBulkMR = this.exportFormatBulkMR.bind(this);
    this.saveDataMRBulk = this.saveDataMRBulk.bind(this);
    this.downloadResultofUploader = this.downloadResultofUploader.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.saveDataMRBulkMigration = this.saveDataMRBulkMigration.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  async getDataFromAPIEXEL(url) {
    try {
      let respond = await axios.get(API_URL_ISAT + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameISAT,
          password: passwordISAT,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(
        process.env.REACT_APP_API_URL_NODE + url,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.tokenUser,
          },
        }
      );
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      this.setState({
        action_status: "failed",
        action_message:
          "Sorry, There is something error, please refresh page and try again",
      });
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async getDatafromAPITSEL(url) {
    try {
      let respond = await axios.get(API_URL_PDB_TSEL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameTselApi,
          password: passwordTselApi,
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

  async getDatafromAPIBMS(url) {
    try {
      let respond = await axios.get(API_URL_BMS_Phil + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi,
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

  async getDatafromAPIBAM(url) {
    try {
      let respond = await axios.get(API_URL_BAM + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameBAM,
          password: passwordBAM,
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

  async postDatatoAPIBAM(url, data) {
    try {
      let respond = await axios.post(API_URL_BAM + url, data, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameBAM,
          password: passwordBAM,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPIBAM(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_BAM + url, data, {
        headers: { "Content-Type": "application/json", "If-Match": _etag },
        auth: {
          username: usernameBAM,
          password: passwordBAM,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(
        process.env.REACT_APP_API_URL_NODE + url,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.tokenUser,
          },
        }
      );
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err.response);
      return respond;
    }
  }

  checkValue(props) {
    //Swap undefined to null
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoZero(props) {
    //Swap undefined or null to 0
    if (typeof props == "undefined" || props == null) {
      return 0;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    //Swap undefined or null to ""
    if (typeof props == "undefined" || props == null) {
      return "";
    } else {
      return props;
    }
  }

  isSameValue(element, value) {
    //function for FindIndex
    return element === value;
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex((e) => this.isSameValue(e, value));
  }

  comparerDiffbyField(otherArray, field) {
    //Compare Different between 2 array
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other[field] == current[field];
        }).length == 0
      );
    };
  }

  comparerDiffbyValue(otherArray) {
    //Compare Different between 2 array
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other == current;
        }).length == 0
      );
    };
  }

  filterDataProject = () => {
    const list = [
    {
      label: "RBS", value:"RBS" 
    },
    {
      label: "TRM", value:"TRM"
    },
  ];
    this.setState({ list_project_selection: list });
  };

  componentDidMount() {
    this.getDataWarehouse();
    this.getASPList();
    this.filterDataProject()
  }

  getDataWarehouse() {
    this.getDataFromAPINODE(
      '/whManagement/warehouse?q={"wh_type":{"$regex" : "internal", "$options" : "i"}}'
    ).then((resWH) => {
      if (resWH.data !== undefined) {
        this.setState({ list_warehouse: resWH.data.data });
      }
    });
  }

  getASPList() {
    getDatafromAPI_PDB2("/get-vendors").then(
      (res) => {
        if (res.data !== undefined) {
          const items = res.data._items;
          this.setState({ asp_list: items });
        }
      }
    );
  }

  fileHandlerMaterial = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    console.log("rABS");
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, devfal: null });
      /* Update state */
      // this.ArrayEmptytoNull(data);
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
        this.ArrayEmptytoNull(data);
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  ArrayEmptytoNull(dataXLS) {
    let newDataXLS = [];
    for (let i = 0; i < dataXLS.length; i++) {
      let col = [];
      for (let j = 0; j < dataXLS[0].length; j++) {
        if (typeof dataXLS[i][j] === "object") {
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if (dataObject !== null) {
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        } else {
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS,
    },()=> console.log([
      ["wp_id",
      "mr_type",
      "mr_delivery_type",
      "assignment_by",
      "dsp",
      "origin_warehouse",
      "etd",
      "eta",
      "pp_id",
      "product_name",
      "product_type",
      "physical_group",
      "package_unit",
      "pp_group",
      "material_id",
      "material_name",
      "material_type",
      "material_unit",
      "material_qty",
      "material_qty_fe"
    ]].concat(this.state.rowsXLS.slice(1,this.state.rowsXLS.length))));
    // this.checkingDataMR(newDataXLS);
    // this.formatDataTSSR(newDataXLS);
  }

  fileHandlerMigration = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, devfal: null });
      /* Update state */
      // this.ArrayEmptytoNull(data);
      this.setState({ action_status: null, action_message: null }, () => {
        this.ArrayEmptytoNullMigration(data);
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  ArrayEmptytoNullMigration(dataXLS) {
    let newDataXLS = [];
    for (let i = 0; i < dataXLS.length; i++) {
      let col = [];
      for (let j = 0; j < dataXLS[0].length; j++) {
        if (typeof dataXLS[i][j] === "object") {
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if (dataObject !== null) {
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        } else {
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS,
    });
  }

  async checkingDataMR(dataXLS) {
    this.setState({ waiting_status: true });
    let wp_invalid = [];
    const respondCheckingMR = await this.postDatatoAPINODE(
      "/matreq/matreqByActivity",
      { data: dataXLS }
    );
    if (
      respondCheckingMR.data !== undefined &&
      respondCheckingMR.status >= 200 &&
      respondCheckingMR.status <= 300
    ) {
      let dataChecking = respondCheckingMR.data.data;
      this.setState({ data_checking_mr: dataChecking });
      for (let i = 0; i < dataChecking.length; i++) {
        if (dataChecking[i].operation === "INVALID") {
          if (dataChecking[i].cd_id === null) {
            wp_invalid.push(dataChecking[i].cd_id + " CD ID Row " + i);
          } else {
            wp_invalid.push(
              dataChecking[i].activity_status + " Activity Row " + i
            );
          }
        }
      }
      if (wp_invalid.length !== 0) {
        this.setState({
          action_status: "failed",
          action_message:
            "[ " +
            wp_invalid.join('", "') +
            " ] => unknown, Please check the results of the upload below",
        });
      }
    } else {
      if (
        respondCheckingMR.response !== undefined &&
        respondCheckingMR.response.data !== undefined &&
        respondCheckingMR.response.data.error !== undefined
      ) {
        if (respondCheckingMR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondCheckingMR.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondCheckingMR.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.setState({ waiting_status: false });
  }

  async getAllActivityID(array_activity_id) {
    let dataAct = [];
    let arrayDataAct = array_activity_id;
    let getNumberPage = Math.ceil(arrayDataAct.length / 25);
    for (let i = 0; i < getNumberPage; i++) {
      let DataPaginationPP = arrayDataAct.slice(i * 25, (i + 1) * 25);
      let arrayIdAct = '"' + DataPaginationPP.join('","') + '"';
      arrayIdAct = arrayIdAct.replace("%BF", "");
      arrayIdAct = arrayIdAct.replace("%BB", "");
      arrayIdAct = arrayIdAct.replace("%EF", "");
      let where_id_Act = '?where={"WP_ID" : {"$in" : [' + arrayIdAct + "]}}";
      let resAct = await this.getDatafromAPITSEL(
        "/custdel_sorted_non_page" + where_id_Act
      );
      if (resAct !== undefined) {
        if (resAct.data !== undefined) {
          dataAct = dataAct.concat(resAct.data._items);
        }
      }
    }
    return dataAct;
  }

  async getDataProject(array_id_project) {
    let dataProject = [];
    let arrayDataProject = array_id_project;
    let getNumberPage = Math.ceil(arrayDataProject.length / 25);
    for (let i = 0; i < getNumberPage; i++) {
      let DataPaginationPP = arrayDataProject.slice(i * 25, (i + 1) * 25);
      let arrayIdProject = '"' + DataPaginationPP.join('","') + '"';
      arrayIdProject = arrayIdProject.replace("%EF", "%BB", "%BF");
      let where_id_Project =
        '?where={"_id" : {"$in" : [' + arrayIdProject + "]}}";
      let resProject = await this.getDatafromAPITSEL(
        "/project_sorted_non_page" + where_id_Project
      );
      if (resProject !== undefined) {
        if (resProject.data !== undefined) {
          dataProject = dataProject.concat(resProject.data._items);
        }
      }
    }
    return dataProject;
  }

  async getAllDataApiPaginationMR(array_value, field, endpoint) {
    let dataValue = [];
    let arrayDataValue = array_value;
    let getNumberPage = Math.ceil(arrayDataValue.length / 25);
    for (let i = 0; i < getNumberPage; i++) {
      let DataPaginationValue = arrayDataValue.slice(i * 25, (i + 1) * 25);
      let arrayIdValue = '"' + DataPaginationValue.join('","') + '"';
      arrayIdValue = arrayIdValue.replace("%BF", "");
      arrayIdValue = arrayIdValue.replace("%BB", "");
      arrayIdValue = arrayIdValue.replace("%EF", "");
      let where_id_value =
        '?where={"mr_id" : {"$in" : [' +
        arrayIdValue +
        ']}}&projection={"_etag" : 1, "eta" : 1, "requested_eta" : 1, "dsp_company" : 1, "mr_status" : 1, "mr_milestones" : 1, "mr_id" : 1}';
      let resValue = await this.getDatafromAPIBAM(
        "/mr_sorted_nonpage" + where_id_value
      );
      if (resValue !== undefined) {
        if (resValue.data !== undefined) {
          dataValue = dataValue.concat(resValue.data._items);
        }
      }
    }
    return dataValue;
  }

  preparingDataMR(id) {
    const dateNow = new Date();
    const dataRandom = (
      Math.floor(Math.random() * 100) + id.toString()
    ).padStart(4, "0");
    const numberTSSR =
      dateNow.getFullYear().toString() +
      (dateNow.getMonth() + 1).toString().padStart(2, "0") +
      dateNow.getDate().toString().padStart(2, "0") +
      dataRandom.toString();
    return numberTSSR;
  }

  checkDSPbyID(id) {
    switch (id.toString()) {
      case "BMS":
        return "PT BMS Delivery";
        break;
      case "MITT":
        return "PT MITT Delivery";
        break;
      case "IXT":
        return "PT IXT Delivery";
        break;
      case "ARA":
        return "PT ARA Delivery";
        break;
      default:
        return id.toString();
    }
  }

  checkDeliveryTypebyID(id) {
    switch (id.toString()) {
      case "WTS":
        return "Warehouse to Site";
        break;
      case "STS":
        return "Site to Site";
        break;
      case "WTW":
        return "Warehouse to Warehouse";
        break;
      default:
        return null;
    }
  }

  checkMRTypebyID(id) {
    switch (id.toString()) {
      case "New":
        return "New";
        break;
      case "Upgrade":
        return "Upgrade";
        break;
      default:
        return null;
    }
  }

  async saveDataMRBulk() {
    this.toggleLoading();
    // const dataChecking = this.state.data_checking_mr;
    const respondSaveMR = await this.postDatatoAPINODE(
      "/matreq/createMultipleMatreqWithPs",
      { sowType: this.state.sow_type, mrPsData: [
        ["wp_id",
        "mr_type",
        "mr_delivery_type",
        "assignment_by",
        "dsp",
        "origin_warehouse",
        "etd",
        "eta",
        "pp_id",
        "product_name",
        "product_type",
        "physical_group",
        "package_unit",
        "pp_group",
        "material_id",
        "material_name",
        "material_type",
        "material_unit",
        "material_qty",
        "material_qty_fe"
      ]].concat(this.state.rowsXLS.slice(1,this.state.rowsXLS.length)), access_token_vnmm: this.state.tokenPDB }
    );
    if (
      respondSaveMR.data !== undefined &&
      respondSaveMR.status >= 200 &&
      respondSaveMR.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      if (
        respondSaveMR.response !== undefined &&
        respondSaveMR.response.data !== undefined &&
        respondSaveMR.response.data.error !== undefined
      ) {
        if (respondSaveMR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondSaveMR.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondSaveMR.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  // getDataSites(){
  //   const respondSite = this.getDataFromAPI('/site_non_page?where')
  // }

  async getAllPP(array_PP, array_PP_sepcial) {
    let dataPP = [];
    let arrayDataPP = array_PP;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for (let i = 0; i < getNumberPage; i++) {
      let DataPaginationPP = arrayDataPP.slice(i * 25, (i + 1) * 25);
      let arrayIdPP = '"' + DataPaginationPP.join('", "') + '"';
      arrayIdPP = arrayIdPP.replace("&", "%26");
      let where_id_PP = '?where={"pp_id" : {"$in" : [' + arrayIdPP + "]}}";
      let resPP = await this.getDatafromAPIBMS(
        "/pp_sorted_non_page" + where_id_PP
      );
      if (resPP !== undefined) {
        if (resPP.data !== undefined) {
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    for (let i = 0; i < array_PP_sepcial.length; i++) {
      let dataPPIndex = array_PP_sepcial[i];
      dataPPIndex = dataPPIndex.replace('"', "");
      let where_id_PP =
        '?where={"pp_id":{"$regex" : "' + dataPPIndex + '", "$options" : "i"}}';
      let resPP = await this.getDatafromAPIBMS(
        "/pp_sorted_non_page" + where_id_PP
      );
      if (resPP !== undefined) {
        if (resPP.data !== undefined) {
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    return dataPP;
  }

  async saveDataMRBulkMigration() {
    this.toggleLoading();
    const respondPatchMR = await this.patchDatatoAPINODE(
      "/matreq/updateStatusMigration",
      { dataObjectMatreq: this.state.rowsXLS }
    );
    if (
      respondPatchMR.data !== undefined &&
      respondPatchMR.status >= 200 &&
      respondPatchMR.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      if (
        respondPatchMR.response !== undefined &&
        respondPatchMR.response.data !== undefined &&
        respondPatchMR.response.data.error !== undefined
      ) {
        if (respondPatchMR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondPatchMR.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondPatchMR.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  exportFormatBulkMR = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow([
      "wp_id",
      "mr_type",
      "mr_delivery_type",
      "asp",
      "dsp",
      "origin_warehouse",
      "etd",
      "eta",
      "pp_id",
      "product_name",
      "product_type",
      "physical_group",
      "package_unit",
      "pp_group",
      "material_id",
      "material_name",
      "material_type",
      "material_unit",
      "material_qty",
      "material_qty_fe",
    ]);

    ws.addRow([
      "123460",
      "look cheatsheet",
      "look cheatsheet",
      "vendor",
      "vendor",
      "look cheatsheet",
      "YYYY-MM-DD",
      "YYYY-MM-DD",
      "PPID2001s",
      "Package Satu",
      "HW",
      "Radio",
      "unit",
      "Radio 2",
      "MDID001",
      "Material 1",
      "active",
      "pc",
      "3",
      "3",
    ]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), "MR Bulk Uploader Template.xlsx");
  };

  async downloadResultofUploader() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const dataUploader = this.state.rowsXLS;
    const resultUploader = this.state.data_checking_mr;

    ws.addRow([
      "Checking Status",
      "id",
      "project_name",
      "mr_type",
      "mr_delivery_type",
      "origin_warehouse",
      "etd",
      "eta",
      "deliver_by",
      "mr_comment_project",
      "sent_mr_request",
      "created_based",
      "identifier",
    ]);

    for (let i = 1; i < dataUploader.length; i++) {
      let row = [resultUploader[i - 1].activity_status];
      row = row.concat(dataUploader[i]);
      ws.addRow(row);
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "Result of Checking mr template Uploader.xlsx"
    );
  }

  handleChangeProject = (e) => {
    this.setState(
      {sow_type : e.value }
    );
  };

  render() {
    if (this.state.redirectSign !== false) {
      return <Redirect to={"/mr-list"} />;
    }
    if (this.state.data_checking_mr.length !== 0) {
      console.log("Excel Render", this.state.data_checking_mr);
    }

    return (
      <div>
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "15px" }}>
                  MR Creation Bulk{" "}
                </span>
                <Button
                  style={{ marginRight: "8px", float: "right" }}
                  outline
                  color="info"
                  onClick={this.exportFormatBulkMR}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download MR Format
                </Button>
              </CardHeader>
              <CardBody className="card-UploadBoq">              
                <Row>
                <Col md={4}>
                    <FormGroup>
                      <Label>Sow Type</Label>
                      <Select
                        cacheOptions
                        options={this.state.list_project_selection}
                        onChange={this.handleChangeProject}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <input
                      type="file"
                      onChange={this.fileHandlerMaterial.bind(this)}
                      style={{ padding: "10px", visiblity: "hidden" }}
                    />
                    <Button
                      color="success"
                      onClick={this.saveDataMRBulk}
                      style={{ float: "right" }}
                      disabled={
                        this.state.rowsXLS.length === 0 
                      }
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
                {/* {this.state.userRole.includes("Admin") && (
                  <Fragment>
                    <hr
                      style={{
                        borderStyle: "double",
                        borderWidth: "0px 0px 3px 0px",
                        borderColor: " rgba(174,213,129 ,1)",
                        marginTop: "5px",
                      }}
                    ></hr>
                    <Row>
                      <Col>
                        <h5>Migration Status from SH :</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <input
                          type="file"
                          onChange={this.fileHandlerMigration.bind(this)}
                          style={{ padding: "10px", visiblity: "hidden" }}
                        />
                        <Button
                          color="success"
                          onClick={this.saveDataMRBulkMigration}
                          style={{ float: "right" }}
                        >
                          Save Migration Status
                        </Button>
                      </Col>
                    </Row>
                  </Fragment>
                )} */}
                <table
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        MRs Preview
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        *please using code below in uploader
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr
                  style={{
                    borderStyle: "double",
                    borderWidth: "0px 0px 3px 0px",
                    borderColor: " rgba(174,213,129 ,1)",
                    marginTop: "5px",
                  }}
                ></hr>
                {this.state.data_checking_mr.length !== 0 && (
                  <Row>
                    <Col xl="12">
                      <Button
                        style={{
                          marginRight: "8px",
                          float: "right",
                          marginBottom: "10px",
                        }}
                        outline
                        color="primary"
                        onClick={this.downloadResultofUploader}
                        size="sm"
                      >
                        <i
                          className="fa fa-download"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Download results of checking of MR Uploader
                      </Button>
                    </Col>
                  </Row>
                )}

                {this.state.rowsXLS.length !== 0 ? (
                  <Table hover bordered responsive size="sm">
                    <tbody>
                      {this.state.rowsXLS.length !== 0
                        ? this.state.rowsXLS.map((row, i) => (
                            <tr>
                              {i === 0 &&
                                this.state.data_checking_mr.length !== 0 && (
                                  <td>Checking Status</td>
                                )}
                              {i > 0 &&
                              this.state.data_checking_mr.length !== 0 ? (
                                this.state.data_checking_mr[i - 1].operation ===
                                "INVALID" ? (
                                  <td
                                    style={{
                                      backgroundColor: "#D84315",
                                      color: "#FFF",
                                    }}
                                  >
                                    {
                                      this.state.data_checking_mr[i - 1]
                                        .activity_status
                                    }
                                  </td>
                                ) : (
                                  <td></td>
                                )
                              ) : (
                                <Fragment></Fragment>
                              )}
                              {row.map((col) => (
                                <Fragment>
                                  <td>{col}</td>
                                </Fragment>
                              ))}
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <Row>
                      <Col sm="6" lg="6">
                        <Table hover bordered responsive size="sm">
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "rgb(11, 72, 107)",
                                color: "white",
                              }}
                            >
                              <td colSpan="2">MR Type</td>
                            </tr>
                            <tr>
                              <th>Code</th>
                              <th>Type Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>New</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Upgrade</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Additional</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Outstanding</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col sm="6" lg="6">
                        <Table hover bordered responsive size="sm">
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "rgb(11, 72, 107)",
                                color: "white",
                              }}
                            >
                              <td colSpan="2">Delivery Type</td>
                            </tr>
                            <tr>
                              <th>Code</th>
                              <th>Delivery Type Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Warehouse to Site</td>
                            </tr>
                            {/*<tr>
                        <td>STS</td>
                        <td>Site to Site</td>
                      </tr>*/}
                          </tbody>
                        </Table>
                      </Col>
                      <Col sm="6" lg="6">
                        <Table hover bordered responsive size="sm">
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "rgb(11, 72, 107)",
                                color: "white",
                              }}
                            >
                              <td colSpan="2">Warehouse</td>
                            </tr>
                            <tr>
                              <th>Code</th>
                              <th>WH Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.list_warehouse.map((wh) => (
                              <tr>
                                <td>{wh.wh_id}</td>
                                <td>{wh.wh_name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                      <Col sm="6" lg="6">
                        <Table
                          hover
                          bordered
                          responsive
                          size="sm"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "rgb(11, 72, 107)",
                                color: "white",
                              }}
                            >
                              <td colSpan="2">ASP Vendor</td>
                            </tr>
                            <tr>
                              <th>Code</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>DSP</td>
                              <td>(LDM will input DSP Company for delivery)</td>
                            </tr>
                            {this.state.asp_list.map((e) => (
                              <tr>
                                <td>{e.Vendor_Code}</td>
                                <td>{e.Name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Modal Loading */}
        <Modal
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm " + this.props.className}
        >
          <ModalBody>
            <div style={{ textAlign: "center" }}>
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>Loading ...</div>
            <div style={{ textAlign: "center" }}>System is processing ...</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleLoading}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(BulkMR);
