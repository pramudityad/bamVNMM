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

import { apiSendEmail } from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../viewsIndosat/DefaultView/DefaultNotif")
);

const API_URL_ISAT = "https://api-dev.isat.pdb.e-dpm.com/isatapi";
const usernameISAT = "adminbamidsuper";
const passwordISAT = "F760qbAg2sml";

const API_URL_BAM = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

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

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const dataPercentage = [20, 30, 40, 50, 60, 70, 80, 90, 100];

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

class BulkAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      assignment_ssow_upload: [],
      list_data_activity: [],
      sow_type_selected: "RBS",
      rowsXLS: [],
      rowsXLSMigration: [],
      waiting_status: null,
      action_status: null,
      action_message: null,
      redirectSign: false,
      asp_list: [],
      uploadan_type: "without Predefined SSOW",
      modal_loading: false,
      project_in_bulk: [],
    };
    this.saveDataAssignmentBulk = this.saveDataAssignmentBulk.bind(this);
    this.saveDataAssignmentBulkMigration = this.saveDataAssignmentBulkMigration.bind(
      this
    );
    this.saveDataAssignmentBulkMigrationBAST = this.saveDataAssignmentBulkMigrationBAST.bind(
      this
    );
    this.exportFormatBulkAssignment = this.exportFormatBulkAssignment.bind(
      this
    );
    this.exportFormatBulkAssignmentMigration = this.exportFormatBulkAssignmentMigration.bind(
      this
    );
    this.handleChangeSOWType = this.handleChangeSOWType.bind(this);
    this.handleChangeUploadType = this.handleChangeUploadType.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
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
      return props.toString();
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

  fileHandlerAssignment = (input) => {
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
        this.ArrayEmptytoNull(data);
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

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
      // const data = XLSX.utils.sheet_to_csv(ws, {header:1, devfal : null});
      const data = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        devfal: null,
        raw: false,
      });
      /* Update state */
      // this.ArrayEmptytoNull(data);
      this.setState({ action_status: null, action_message: null }, () => {
        this.ArrayEmptytoNullMigration(data);
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
    });
    this.checkingDataAssignment(newDataXLS);
  }

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

  componentDidMount() {
    this.getASPList();
  }

  getASPList() {
    this.getDataFromAPIEXEL("/vendor_data_non_page").then((res) => {
      if (res.data !== undefined) {
        const items = res.data._items;
        this.setState({ asp_list: items });
      }
    });
  }

  async getProjectinBulk(array_project) {
    let arrayProject = '"' + array_project.join('", "') + '"';
    const dataProject = await this.getDataFromAPIEXEL(
      '/project_sorted_non_page?where={"Project" : {"$in" : [' +
        arrayProject +
        "]}}"
    );
    if (dataProject.data !== undefined) {
      return dataProject.data._items;
    } else {
      return [];
    }
  }

  async checkingDataAssignment(dataXLS) {
    this.setState({ waiting_status: true });
    let wp_invalid = [];
    const dataXLSASG = {
      includeSsow:
        this.state.uploadan_type === "without Predefined SSOW" ? true : false,
      data: dataXLS,
    };
    const respondCheckingASG = await this.postDatatoAPINODE(
      "/aspAssignment/aspAssignmentByActivity",
      dataXLSASG
    );
    if (
      respondCheckingASG.data !== undefined &&
      respondCheckingASG.status >= 200 &&
      respondCheckingASG.status <= 300
    ) {
      let dataChecking = respondCheckingASG.data.data;
      this.setState({ assignment_ssow_upload: dataChecking });
      if (dataChecking.filter((e) => e.operation === "INVALID").length !== 0) {
        this.setState({
          action_status: "failed",
          action_message: "Please check INVALID row in preview",
        });
      } else {
        const dataProject = await this.getProjectinBulk(
          respondCheckingASG.data.data.map((e) => e.Project)
        );
        this.setState({ project_in_bulk: dataProject }, () => {
          console.log("this.state.project_in_bulk", this.state.project_in_bulk);
        });
      }
    } else {
      if (
        respondCheckingASG.response !== undefined &&
        respondCheckingASG.response.data !== undefined &&
        respondCheckingASG.response.data.error !== undefined
      ) {
        if (respondCheckingASG.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(
              respondCheckingASG.response.data.error.message
            ),
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(
              respondCheckingASG.response.data.error
            ),
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

  preparingDataAssignment(id) {
    const dateNow = new Date();
    const dataRandom = (Math.floor(Math.random() * 100) + id)
      .toString()
      .padStart(4, "0");
    const numberTSSR =
      dateNow.getFullYear().toString() +
      (dateNow.getMonth() + 1).toString().padStart(2, "0") +
      dateNow.getDate().toString().padStart(2, "0") +
      dataRandom.toString();
    return numberTSSR;
  }

  async saveDataAssignmentBulk() {
    this.toggleLoading();
    const dataChecking = this.state.assignment_ssow_upload;
    const dataCheckingASG = {
      includeSsow:
        this.state.uploadan_type === "without Predefined SSOW" ? true : false,
      data: dataChecking,
    };
    const respondSaveASG = await this.postDatatoAPINODE(
      "/aspAssignment/createAspAssign",
      dataCheckingASG
    );
    if (
      respondSaveASG.data !== undefined &&
      respondSaveASG.status >= 200 &&
      respondSaveASG.status <= 300
    ) {
      if (this.state.uploadan_type === "without Predefined SSOW") {
        for (let i = 0; i < this.state.project_in_bulk.length; i++) {
          let dataAssignmentforProject = respondSaveASG.data.aspDocsp.filter(
            (e) => e.Project === this.state.project_in_bulk[i].Project
          );
          let dataTableASGEmail = "";
          dataAssignmentforProject.map(
            (asg) =>
              (dataTableASGEmail =
                dataTableASGEmail +
                "<tr><td style='padding:5px'><a href='https://bam-id.e-dpm.com/assignment-detail/" +
                asg._id +
                "'>" +
                asg.Assignment_No +
                "</a></td><td style='padding:5px'>" +
                asg.Project +
                "</td><td style='padding:5px'>" +
                asg.Site_ID +
                "</td></tr>")
          );
          let cpm_email = this.state.project_in_bulk[i].Email_CPM_Name;
          const linkNA = "https://bam-id.e-dpm.com/assignment-list-approval";
          const bodyEmail =
            "<span style='font-size:30px;font-weight:800;'>Approval Request</span><br/><br/><span>You have a request for Assignment Approval because the assignment not using list SSOW from the mapping</span><br/><br/><span style='font-size:20px;font-weight:600;'>Approval Request</span><br/><br/><span>This is automate generate email from DPM - BAM. There is a list of Assignments that need to be approved : </span><br/><body><table cellspacing='0' cellpadding='0' align='center' border='1'><tr><td>Assignment</td><td>Project</td><td>Site</td></tr>" +
            dataTableASGEmail +
            "</table></body><br/><span>Follow this link to see all Assignment need approval : <a href='" +
            linkNA +
            "'>" +
            linkNA +
            "</a></span><br/><span style='font-size:20px;font-weight:600;'>Don't know what this is?</span><br/><br/><span>This message is sent from DPM - BAM, since you are registered as one of the approval role. Questions are welcome to dpm.notification@ericsson.com</span>";
          let dataEmail = {
            // "to": cpm_email+'; aminuddin.fauzan@ericsson.com',
            to: cpm_email + " ;",
            subject: "[Assignment Need Approval] Assignment",
            body: bodyEmail,
          };
          // const sendEmail = await apiSendEmail(dataEmail);
        }
      }
      this.setState({ action_status: "success" });
    } else {
      if (
        respondSaveASG.response !== undefined &&
        respondSaveASG.response.data !== undefined &&
        respondSaveASG.response.data.error !== undefined
      ) {
        if (respondSaveASG.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(
              respondSaveASG.response.data.error.message
            ),
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(respondSaveASG.response.data.error),
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async saveDataAssignmentBulkMigration() {
    this.toggleLoading();
    const respondPatchASG = await this.patchDatatoAPINODE(
      "/aspAssignment/updateStatusMigration",
      { dataAssignment: this.state.rowsXLS }
    );
    if (
      respondPatchASG.data !== undefined &&
      respondPatchASG.status >= 200 &&
      respondPatchASG.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      if (
        respondPatchASG.response !== undefined &&
        respondPatchASG.response.data !== undefined &&
        respondPatchASG.response.data.error !== undefined
      ) {
        if (respondPatchASG.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondPatchASG.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondPatchASG.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async saveBastNumber(_id, dataBAST) {
    const assignBast = {
      account_id: null,
      data: dataBAST,
    };
    const respondAssignBast = await this.patchDatatoAPINODE(
      "/aspAssignment/updateBastNumber/" + _id,
      assignBast
    );
    if (
      respondAssignBast.data !== undefined &&
      respondAssignBast.status >= 200 &&
      respondAssignBast.status <= 300
    ) {
      return {
        success: true,
        asg_no: dataBAST[0].Assignment_No,
        message: null,
      };
    } else {
      return {
        success: false,
        asg_no: dataBAST[0].Assignment_No,
        message: respondAssignBast.response.data.error,
      };
    }
  }

  async prepareDataBASTMigration(dataXLS) {
    let dataBAST = [];
    let dataNotMigration = [];
    const asgSystemXLSIndex = dataXLS[0].findIndex(
      (e) => e === "id_assignment_doc"
    );
    const asgXLSIndex = dataXLS[0].findIndex((e) => e === "Assignment_No");
    const shAsgXLSIndex = dataXLS[0].findIndex((e) => e === "sh_assignment_no");
    const accountXLSIndex = dataXLS[0].findIndex((e) => e === "Account_Name");
    const acceptanceDateXLSIndex = dataXLS[0].findIndex(
      (e) => e === "ASP_Acceptance_Date"
    );
    const wpIdXLSIndex = dataXLS[0].findIndex((e) => e === "WP_ID");
    const projectSystemXLSIndex = dataXLS[0].findIndex(
      (e) => e === "id_project_doc"
    );
    const projectXLSIndex = dataXLS[0].findIndex((e) => e === "Project");
    const sowTypeXLSIndex = dataXLS[0].findIndex((e) => e === "SOW_Type");
    const bastNoXLSIndex = dataXLS[0].findIndex((e) => e === "BAST_No");
    const grTypeXLSIndex = dataXLS[0].findIndex((e) => e === "GR_Type");
    const paymentTermsXLSIndex = dataXLS[0].findIndex(
      (e) => e === "Payment_Terms"
    );
    const paymentTermsRatioXLSIndex = dataXLS[0].findIndex(
      (e) => e === "Payment_Terms_Ratio"
    );
    const grPercentageXLSIndex = dataXLS[0].findIndex(
      (e) => e === "GR_Percentage"
    );
    const poNumberXLSIndex = dataXLS[0].findIndex((e) => e === "PO_Number");
    const poItemXLSIndex = dataXLS[0].findIndex((e) => e === "PO_Item");
    const itemStatusXLSIndex = dataXLS[0].findIndex((e) => e === "Item_Status");
    const requestorXLSIndex = dataXLS[0].findIndex((e) => e === "Requestor");
    const uniqueASG = [];
    for (let i = 1; i < dataXLS.length; i++) {
      const dataASGBAST = {
        Request_Type: "New GR",
        id_assignment_doc: dataXLS[i][asgSystemXLSIndex],
        Assignment_No: dataXLS[i][asgXLSIndex],
        Account_Name: "XL",
        ASP_Acceptance_Date: dataXLS[i][acceptanceDateXLSIndex],
        WP_ID: dataXLS[i][wpIdXLSIndex],
        id_project_doc: dataXLS[i][projectSystemXLSIndex],
        Project: dataXLS[i][projectXLSIndex],
        SOW_Type: dataXLS[i][sowTypeXLSIndex],
        BAST_No: dataXLS[i][bastNoXLSIndex],
        GR_Type: dataXLS[i][grTypeXLSIndex],
        Payment_Terms: dataXLS[i][paymentTermsXLSIndex],
        Payment_Terms_Ratio: dataXLS[i][paymentTermsRatioXLSIndex],
        GR_Percentage: dataXLS[i][grPercentageXLSIndex],
        PO_Number: dataXLS[i][poNumberXLSIndex],
        PO_Item: dataXLS[i][poItemXLSIndex],
        Item_Status: "Submit",
        Requestor:
          dataXLS[i][requestorXLSIndex] === null
            ? this.state.userName
            : dataXLS[i][requestorXLSIndex],
      };
      if (dataXLS[i][shAsgXLSIndex] === null) {
        dataNotMigration.push({
          success: false,
          asg_no: dataASGBAST.Assignment_No,
          message: "Not Data Migration",
        });
      }
      if (
        dataXLS[i][grPercentageXLSIndex] !== null &&
        dataXLS[i][grPercentageXLSIndex] !== undefined
      ) {
        dataASGBAST["Payment_Terms_Ratio"] =
          dataXLS[i][grPercentageXLSIndex].toString().replace("%", "") + "%";
        dataASGBAST["GR_Percentage"] =
          parseFloat(
            dataXLS[i][grPercentageXLSIndex].toString().replace("%", "")
          ) / 100;
      }
      dataBAST.push(dataASGBAST);
      if (uniqueASG.indexOf(dataASGBAST.id_assignment_doc) === -1) {
        uniqueASG.push(dataASGBAST.id_assignment_doc);
      }
    }
    if (dataNotMigration.length === 0) {
      const prepare = [];
      for (let j = 0; j < uniqueASG.length; j++) {
        const bastASG = dataBAST.filter(
          (bst) => bst.id_assignment_doc === uniqueASG[j]
        );
        const resBAST = await this.saveBastNumber(uniqueASG[j], bastASG);
        prepare.push(resBAST);
      }
      return prepare;
    } else {
      return dataNotMigration;
    }
  }

  async saveDataAssignmentBulkMigrationBAST() {
    this.toggleLoading();
    const dataUploadBast = await this.prepareDataBASTMigration(
      this.state.rowsXLS
    );
    const dataSuccess = dataUploadBast.filter((e) => e.success === true);
    const dataFailed = dataUploadBast.filter((e) => e.success === false);
    if (dataFailed.length === 0) {
      this.setState({ action_status: "success", action_message: null });
    } else {
      if (dataSuccess.length === 0) {
        this.setState({
          action_status: "failed",
          action_message:
            "[ " +
            dataFailed.map((e) => e.asg_no + " -> " + e.message).join(" ; ") +
            " ] => failed to add BAST Number",
        });
      } else {
        this.setState({
          action_status: "warning",
          action_message:
            "Some BAST added to Assignment but some are failed. [ " +
            dataFailed
              .map((asg) => asg.asg_no + " => " + asg.message)
              .join(" ; ") +
            " ] => failed to add BAST Number",
        });
      }
    }
    this.toggleLoading();
  }

  handleChangeSOWType(e) {
    const value = e.target.value;
    this.setState({ sow_type_selected: value });
  }

  exportFormatBulkAssignment = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const sow_type = this.state.sow_type_selected;
    let indexSSOW = 7;
    if (sow_type === "SACME") {
      indexSSOW = 25;
    }
    if (sow_type === "RBSTRM") {
      indexSSOW = 5;
    }
    let headerRow = [
      "id",
      "project",
      "sow_type",
      "created_based",
      "vendor_code",
      "vendor_name",
      "payment_terms",
      "identifier",
      "assignment_remark",
    ];
    if (this.state.uploadan_type === "without Predefined SSOW") {
      let headerRow = [
        "id",
        "project",
        "sow_type",
        "created_based",
        "vendor_code",
        "vendor_name",
        "payment_terms",
        "identifier",
        "assignment_remark",
      ];
      if (sow_type === "RBSTRM") {
        for (let idx = 1; idx <= indexSSOW; idx++) {
          headerRow.push(
            "ssow_rbs_id_" + idx.toString(),
            "ssow_rbs_activity_number_" + idx.toString(),
            "ssow_rbs_unit_" + idx.toString(),
            "ssow_rbs_quantity_" + idx.toString()
          );
        }
        for (let idx = 1; idx <= indexSSOW; idx++) {
          headerRow.push(
            "ssow_trm_id_" + idx.toString(),
            "ssow_trm_activity_number_" + idx.toString(),
            "ssow_trm_unit_" + idx.toString(),
            "ssow_trm_quantity_" + idx.toString()
          );
        }
        ws.addRow(headerRow);
        ws.addRow([
          "new",
          "ISAT AOP 2019",
          "RBSTRM",
          "cd_id",
          2000057356,
          "PT NEXWAVE",
          "5050",
          "XISAT2009171",
          "Remarks",
          "1.1.1.N",
          "3022917",
          "pc",
          3,
          "1.1.4.N",
          "3022962",
          null,
          2,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "1.1.1.T",
          "3022917",
          "Site",
          2,
          null,
          null,
          null,
          null,
        ]);
      } else {
        for (let idx = 1; idx <= indexSSOW; idx++) {
          headerRow.push(
            "ssow_" + sow_type.toLowerCase() + "_id_" + idx.toString(),
            "ssow_" +
              sow_type.toLowerCase() +
              "_activity_number_" +
              idx.toString(),
            "ssow_" + sow_type.toLowerCase() + "_unit_" + idx.toString(),
            "ssow_" + sow_type.toLowerCase() + "_quantity_" + idx.toString()
          );
        }
        ws.addRow(headerRow);
        ws.addRow([
          "new",
          "ISAT AOP 2019",
          sow_type,
          "cd_id",
          2000057356,
          "PT NEXWAVE",
          "5050",
          "XISAT2009171",
          "Remarks",
          "1.1.1.N",
          "3022917",
          "pc",
          3,
          "1.1.4.N",
          "3022962",
          null,
          2,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ]);
      }
    } else {
      ws.addRow(headerRow);
      ws.addRow([
        "new",
        "ISAT AOP 2019",
        sow_type,
        "cd_id",
        2000057356,
        "PT NEXWAVE",
        "5050",
        "XISAT2009171",
        "Remarks",
      ]);
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "Assignment " + this.state.uploadan_type + " Uploader Template.xlsx"
    );
  };

  exportFormatBulkAssignmentMigration = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const sow_type = this.state.sow_type_selected;
    let indexSSOW = 7;
    if (sow_type === "SACME") {
      indexSSOW = 25;
    }
    if (sow_type === "RBSTRM") {
      indexSSOW = 5;
    }
    let headerRow = [
      "id",
      "sh_assignment_no",
      "assignment_creation_date",
      "assignment_creation_by",
      "project",
      "sow_type",
      "created_based",
      "vendor_code",
      "vendor_name",
      "payment_terms",
      "identifier",
    ];
    if (this.state.uploadan_type === "without Predefined SSOW") {
      let headerRow = [
        "id",
        "sh_assignment_no",
        "assignment_creation_date",
        "assignment_creation_by",
        "project",
        "sow_type",
        "created_based",
        "vendor_code",
        "vendor_name",
        "payment_terms",
        "identifier",
      ];
      if (sow_type === "RBSTRM") {
        for (let idx = 1; idx <= indexSSOW; idx++) {
          headerRow.push(
            "ssow_rbs_id_" + idx.toString(),
            "ssow_rbs_activity_number_" + idx.toString(),
            "ssow_rbs_unit_" + idx.toString(),
            "ssow_rbs_quantity_" + idx.toString()
          );
        }
        for (let idx = 1; idx <= indexSSOW; idx++) {
          headerRow.push(
            "ssow_trm_id_" + idx.toString(),
            "ssow_trm_activity_number_" + idx.toString(),
            "ssow_trm_unit_" + idx.toString(),
            "ssow_trm_quantity_" + idx.toString()
          );
        }
        ws.addRow(headerRow);
        ws.addRow([
          "new",
          null,
          null,
          null,
          "XL BAM DEMO 2020",
          "RBSTRM",
          "tower_id",
          2000054443,
          "PT SINERGI AITIKOM",
          "3070",
          "JAW-JT-BBS-0001",
          "1.1.1",
          "3022264",
          null,
          1,
          "1.1.4",
          "3022960",
          null,
          2,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "1.1.1.T",
          "3022917",
          "Site",
          2,
          null,
          null,
          null,
          null,
        ]);
        ws.addRow([
          "new",
          null,
          null,
          null,
          "XL BAM DEMO 2020",
          "RBSTRM",
          "cd_id",
          2000057356,
          "PT NEXWAVE",
          "5050",
          "X2660930",
          "1.1.1.N",
          "3022917",
          "pc",
          3,
          "1.1.4.N",
          "3022962",
          null,
          2,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "1.1.1.T",
          "3022917",
          "Site",
          2,
          null,
          null,
          null,
          null,
        ]);
      } else {
        for (let idx = 1; idx <= indexSSOW; idx++) {
          headerRow.push(
            "ssow_" + sow_type.toLowerCase() + "_id_" + idx.toString(),
            "ssow_" +
              sow_type.toLowerCase() +
              "_activity_number_" +
              idx.toString(),
            "ssow_" + sow_type.toLowerCase() + "_unit_" + idx.toString(),
            "ssow_" + sow_type.toLowerCase() + "_quantity_" + idx.toString()
          );
        }
        ws.addRow(headerRow);
        ws.addRow([
          "new",
          null,
          null,
          null,
          "XL BAM DEMO 2020",
          sow_type,
          "tower_id",
          2000054443,
          "PT SINERGI AITIKOM",
          "3070",
          "JAW-JT-BBS-0001",
          "1.1.1",
          "3022264",
          null,
          1,
          "1.1.4",
          "3022960",
          null,
          2,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ]);
        ws.addRow([
          "new",
          null,
          null,
          null,
          "XL BAM DEMO 2020",
          sow_type,
          "cd_id",
          2000057356,
          "PT NEXWAVE",
          "5050",
          "X2660930",
          "1.1.1.N",
          "3022917",
          "pc",
          3,
          "1.1.4.N",
          "3022962",
          null,
          2,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ]);
      }
    } else {
      ws.addRow(headerRow);
      ws.addRow([
        "new",
        null,
        null,
        null,
        "XL BAM DEMO 2020",
        sow_type,
        "tower_id",
        2000054443,
        "PT SINERGI AITIKOM",
        "3070",
        "JAW-JT-BBS-0001",
      ]);
      ws.addRow([
        "new",
        null,
        null,
        null,
        "XL BAM DEMO 2020",
        sow_type,
        "cd_id",
        2000057356,
        "PT NEXWAVE",
        "5050",
        "X2660930",
      ]);
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "Assignment " +
        this.state.uploadan_type +
        " Uploader Template For Migration.xlsx"
    );
  };

  handleChangeUploadType(e) {
    const value = e.target.value;
    this.setState({ uploadan_type: value });
  }

  render() {
    if (this.state.redirectSign !== false) {
      return <Redirect to={"/assignment-list"} />;
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
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  ASP Assignment Bulk{" "}
                </span>
                {/* }<select type="select" onChange={this.handleChangeUploadType} value={this.state.uploadan_type} disabled={this.state.rowsXLS.length !== 0}>
              <option value="without Predefined SSOW">without Predefined SSOW</option>
              <option value="Predefined SSOW">Predefined SSOW</option>
            </select> */}
                <Button
                  style={{ marginRight: "8px", float: "right" }}
                  outline
                  color="info"
                  onClick={this.exportFormatBulkAssignment}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download Assignment Format
                </Button>
                {/*}<Button style={{marginRight : '8px', float : 'right'}} outline color="info" onClick={this.exportFormatBulkAssignmentMigration} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download Assignment Format For Migration</Button> */}
                <select
                  type="select"
                  onChange={this.handleChangeSOWType}
                  value={this.state.sow_type_selected}
                  style={{
                    marginRight: "8px",
                    marginTop: "3px",
                    float: "right",
                    width: "100px",
                  }}
                >
                  <option value={null} disabled hidden>
                    SOW Type
                  </option>
                  <option value="RBS">RBS</option>
                  <option value="TRM">TRM</option>
                  <option value="RBSTRM">RBS - TRM</option>
                  <option value="NDO">NDO</option>
                  <option value="PLNActivity">PLNActivity</option>
                  <option value="CME">CME</option>
                  <option value="Power">Power</option>
                  <option value="SACME">SACME</option>
                  <option value="ADDITIONAL">Additional</option>
                  <option value="DELIVERY">Delivery</option>
                </select>
              </CardHeader>
              <CardBody className="card-UploadBoq">
                <Row>
                  <Col>
                    <input
                      type="file"
                      onChange={this.fileHandlerAssignment.bind(this)}
                      style={{ padding: "10px", visiblity: "hidden" }}
                    />
                    <Button
                      color="success"
                      onClick={this.saveDataAssignmentBulk}
                      style={{ float: "right" }}
                      disabled={
                        this.state.waiting_status ||
                        this.state.rowsXLS.length === 0
                      }
                    >
                      {this.state.waiting_status === true
                        ? "loading.."
                        : "Save"}
                    </Button>
                  </Col>
                </Row>
                {this.state.userRole.includes("Admin") && (
                  <Fragment>
                    {/* }<hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                <Row>
                  <Col>
                    <h5>Migration Status from SH :</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input type="file" onChange={this.fileHandlerMigration.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
                    <span style={{color : 'red'}}>*NOTIFIED TO ASP MUST BE FILLED IN</span>
                    <Button color="success" onClick={this.saveDataAssignmentBulkMigration} style={{float : 'right'}}>
                      Save Migration Status
                    </Button>
                  </Col>
                </Row>
                <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
              */}
                  </Fragment>
                )}
                {this.state.userRole.includes("Admin") && (
                  <Fragment>
                    {/* <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr> */}
                    {/*}<Row>
                <Col>
                  <h5>Bulk BAST Migration :</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input type="file" onChange={this.fileHandlerMigration.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
                  <span style={{color : 'red'}}>*</span>
                  <Button color="success" onClick={this.saveDataAssignmentBulkMigrationBAST} style={{float : 'right'}}>
                    Save BAST Migration
                  </Button>
                </Col>
              </Row>
              <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            */}
                  </Fragment>
                )}
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
                        BULK ASP ASSIGNMENT PREVIEW
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          fontSize: "15px",
                          color: "red",
                        }}
                      >
                        {this.state.uploadan_type === "without Predefined SSOW"
                          ? "It will need approval from authoried"
                          : "SSOW List get from default mapping of SSOW to CD ID"}
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
                <Table hover bordered responsive size="sm">
                  <tbody>
                    {this.state.rowsXLS.length !== 0
                      ? this.state.rowsXLS.map((row, i) => (
                          <tr>
                            {this.state.assignment_ssow_upload.length !== 0 &&
                              i === 0 && (
                                <Fragment>
                                  <td>Operation</td>
                                  <td>Status</td>
                                </Fragment>
                              )}
                            {this.state.assignment_ssow_upload[i - 1] !==
                              undefined && (
                              <Fragment>
                                <td>
                                  {
                                    this.state.assignment_ssow_upload[i - 1]
                                      .operation
                                  }
                                </td>
                                <td>
                                  {
                                    this.state.assignment_ssow_upload[i - 1]
                                      .activity_status
                                  }
                                </td>
                              </Fragment>
                            )}
                            {row.map((col) => (
                              <td>{col}</td>
                            ))}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </Table>
                <div
                  style={{
                    display: "inline-flex",
                    marginTop: "20px",
                    width: "100%",
                  }}
                >
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
                      {this.state.asp_list.map((e) => (
                        <tr>
                          <td>{e.Vendor_Code}</td>
                          <td>{e.Name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Table
                    hover
                    bordered
                    responsive
                    size="sm"
                    style={{ width: "100%", marginLeft: "10px" }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "rgb(11, 72, 107)",
                          color: "white",
                        }}
                      >
                        <td colSpan="2">TOP</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2080</td>
                        <td>20%-80%</td>
                      </tr>
                      <tr>
                        <td>3070</td>
                        <td>30%-70%</td>
                      </tr>
                      <tr>
                        <td>4060</td>
                        <td>40%-60%</td>
                      </tr>
                      <tr>
                        <td>5050</td>
                        <td>50%-50%</td>
                      </tr>
                      <tr>
                        <td>100</td>
                        <td>100%-0%</td>
                      </tr>
                      <tr>
                        <td>8020</td>
                        <td>80%-20%</td>
                      </tr>
                      <tr>
                        <td>7030</td>
                        <td>70%-30%</td>
                      </tr>
                      <tr>
                        <td>6040</td>
                        <td>60%-40%</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table
                    hover
                    bordered
                    responsive
                    size="sm"
                    style={{ width: "90%", marginLeft: "10px" }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "rgb(11, 72, 107)",
                          color: "white",
                        }}
                      >
                        <td colSpan="2">SOW Type</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>RBS</td>
                        <td>RBS</td>
                      </tr>
                      <tr>
                        <td>TRM</td>
                        <td>TRM</td>
                      </tr>
                      <tr>
                        <td>RBSTRM</td>
                        <td>RBSTRM</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table
                    hover
                    bordered
                    responsive
                    size="sm"
                    style={{ width: "90%", marginLeft: "10px" }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "rgb(11, 72, 107)",
                          color: "white",
                        }}
                      >
                        <td colSpan="2">GR Percentage</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPercentage.map((dp) => (
                        <tr>
                          <td>{dp}</td>
                          <td>{dp + "%"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
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

export default connect(mapStateToProps)(BulkAssignment);
