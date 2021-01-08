import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";
import ModalDelete from "../components/ModalDelete";
import axios from "axios";
import { connect } from "react-redux";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import "./assignment.css";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import { getDatafromAPINODEFile } from "../../helper/asyncFunction";

import { apiSendEmail } from "../../helper/asyncFunction";

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

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL_TSEL = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameTSEL = "adminbamidsuper";
const passwordTSEL = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

class AssignmentDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data_assignment: null,
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      action_message: null,
      action_message: null,
      bast_assign_form: new Map(),
      can_edit_ssow: false,
      can_edit_asp: false,
      asp_list: [],
      asp_selected: {},
      asp_note_not_approve: {},
      modal_revision: false,
      revision_note: "",
      modal_reschedule: false,
      reschedule_note: "",
      vendor_id: null,
      vendor_email: null,
      modal_warning_cancel_asg: false,
      modal_warning_revise_asg: false,
      value_warning_cancel_asg: "Are you sure?",
      modal_loading: false,
      sid_file: [],
      abd_file: [],
      pqr_file: [],
      dropdownOpen: new Array(2).fill(false),
      reason_cancel: "No Reason",
    };
    this.notifyASP = this.notifyASP.bind(this);
    this.saveBastNumber = this.saveBastNumber.bind(this);
    this.acceptASG = this.acceptASG.bind(this);
    this.rescheduleASG = this.rescheduleASG.bind(this);
    this.revisionASG = this.revisionASG.bind(this);
    this.approveASGbyPM = this.approveASGbyPM.bind(this);
    this.CancelASG = this.CancelASG.bind(this);
    this.ApproveCancelASG = this.ApproveCancelASG.bind(this);
    this.RejectCancelASG = this.RejectCancelASG.bind(this);
    this.exportFormatBulkAssignment = this.exportFormatBulkAssignment.bind(
      this
    );
    this.loadOptionsSSOWID = this.loadOptionsSSOWID.bind(this);
    this.loadOptionsActivityNumber = this.loadOptionsActivityNumber.bind(this);
    this.handleChangeSSOWListReactSelect = this.handleChangeSSOWListReactSelect.bind(
      this
    );
    this.handleChangeSSOWList = this.handleChangeSSOWList.bind(this);
    this.handleChangeCanEditSSOW = this.handleChangeCanEditSSOW.bind(this);
    this.handleChangeCanEditASP = this.handleChangeCanEditASP.bind(this);
    this.updateSSOWList = this.updateSSOWList.bind(this);
    this.handleChangeASP = this.handleChangeASP.bind(this);
    this.handleChangeTOP = this.handleChangeTOP.bind(this);
    this.getASPList = this.getASPList.bind(this);
    this.deleteSSOW = this.deleteSSOW.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.convertTOP = this.convertTOP.bind(this);
    this.toggleModalRevision = this.toggleModalRevision.bind(this);
    this.handleRevisionNote = this.handleRevisionNote.bind(this);
    this.toggleModalReschedule = this.toggleModalReschedule.bind(this);
    this.handleRescheduleNote = this.handleRescheduleNote.bind(this);

    this.toggleWarningCancelASG = this.toggleWarningCancelASG.bind(this);
    this.toggleWarningReviseASG = this.toggleWarningReviseASG.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.RevisePRPO = this.RevisePRPO.bind(this);
    this.handleChangeReasonCancel = this.handleChangeReasonCancel.bind(this);
    this.ResyncNNandACT = this.ResyncNNandACT.bind(this);
    // this.handleChangeNotApprove = this.handleChangeNotApprove.bind(this);
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  toggleWarningCancelASG(e) {
    this.setState((prevState) => ({
      modal_warning_cancel_asg: !prevState.modal_warning_cancel_asg,
    }));
  }

  toggleWarningReviseASG(e) {
    this.setState((prevState) => ({
      modal_warning_revise_asg: !prevState.modal_warning_revise_asg,
    }));
  }

  async getDataFromAPIXL(url) {
    try {
      let respond = await axios.get(API_URL_TSEL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameTSEL,
          password: passwordTSEL,
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

  async getDataFromAPIEXEL(url) {
    try {
      let respond = await axios.get(API_URL_TSEL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameTSEL,
          password: passwordTSEL,
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
        console.log("respond data node", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data node", err);
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
        console.log("respond Post data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post data ", err);
      return respond;
    }
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_TSEL + url, data, {
        headers: {
          "Content-Type": "application/json",
          "If-Match": _etag,
        },
        auth: {
          username: usernameTSEL,
          password: passwordTSEL,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = undefined;
      this.setState({
        action_status: "failed",
        action_message: "Sorry, there is something wrong, please try again!",
      });
      console.log("respond patch data", err);
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

  componentDidMount() {
    this.getDataAssignment(this.props.match.params.id);
    document.title = "Assignment Detail | BAM";
    // this.getASPListEmail();
  }

  getDataAssignment(_id_Assignment) {
    this.getDataFromAPINODE("/aspAssignment/aspassign/" + _id_Assignment).then(
      (resAsg) => {
        if (resAsg.data !== undefined) {
          // this.getSIDNumber(resAsg.data.data.cust_del.map((cd) => cd.cd_id));
          this.setState({ data_assignment: resAsg.data.data });
        }
      }
    );
  }

  async getSIDNumber(arrayCDID) {
    const page = 1;
    const maxPage = 1;
    let dataSID = [];
    let dataABD = [];
    let dataPQR = [];
    for (let i = 0; i < arrayCDID.length; i++) {
      let filter_array = [];
      filter_array.push('"cust_del.cd_id":"' + arrayCDID[i] + '"');
      filter_array.push('"type" : "SID"');
      let whereAnd = "{" + filter_array.join(",") + "}";
      const res = await this.getDataFromAPINODE(
        "/sidFile?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
      );
      if (
        res.data !== undefined &&
        res.data.data !== undefined &&
        res.data.data.length !== 0
      ) {
        dataSID.push(res.data.data[0]);
      }
    }
    for (let i = 0; i < arrayCDID.length; i++) {
      let filter_array = [];
      filter_array.push('"cust_del.cd_id":"' + arrayCDID[i] + '"');
      filter_array.push('"type" : "ABD"');
      let whereAnd = "{" + filter_array.join(",") + "}";
      const res = await this.getDataFromAPINODE(
        "/sidFile?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
      );
      if (
        res.data !== undefined &&
        res.data.data !== undefined &&
        res.data.data.length !== 0
      ) {
        dataABD.push(res.data.data[0]);
      }
    }
    for (let i = 0; i < arrayCDID.length; i++) {
      let filter_array = [];
      filter_array.push('"cust_del.cd_id":"' + arrayCDID[i] + '"');
      filter_array.push('"type" : "PQR"');
      let whereAnd = "{" + filter_array.join(",") + "}";
      const res = await this.getDataFromAPINODE(
        "/sidFile?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
      );
      if (
        res.data !== undefined &&
        res.data.data !== undefined &&
        res.data.data.length !== 0
      ) {
        dataPQR.push(res.data.data[0]);
      }
    }
    this.setState({ sid_file: dataSID, abd_file: dataABD, pqr_file: dataPQR });
  }

  handleBastAssign = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        bast_assign_form: prevState.bast_assign_form.set(name, value),
      }),
      () => {
        console.log("bast_assign_form", this.state.bast_assign_form);
      }
    );
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  async notifyASP(e) {
    const newDate = new Date();
    const dataAssignment = this.state.data_assignment;
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE(
      "/aspAssignment/notifyAspAssignment/" + _id
    );
    if (res !== undefined) {
      if (res.data !== undefined) {
        let linkImp = "https://bam-id.e-dpm.com/assignment-detail-asp/" + _id;
        const bodyEmail =
          "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assingment need to be approved by " +
          dataAssignment.Vendor_Name +
          ", <br/><br/><i>Site</i>: <b>" +
          dataAssignment.Site_ID +
          "</b> <br/><i>Project</i>: <b>" +
          dataAssignment.Project +
          "</b><br/><i>Assignment</i>: <b>" +
          dataAssignment.Assignment_No +
          "</b><br/><br/>is notified by " +
          this.state.userEmail +
          ".</span><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='" +
          linkImp +
          "'>" +
          linkImp +
          "</a>";
        // let name_vendor = this.state.data_assignment.Vendor_Name;
        this.getASPListEmail(dataAssignment.Vendor_Code);
        let dataEmail = {
          to: this.state.vendor_email,
          // "to" : "damar.pramuditya@ericsson.com",
          subject:
            "[Assignment Need Approval from ASP] Assignment " +
            dataAssignment.Assignment_No,
          body: bodyEmail,
        };
        // const sendEmail = await apiSendEmail(dataEmail);
        this.setState({ action_status: "success" });
      } else {
        this.setState({ action_status: "failed" });
      }
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  async acceptASG(e) {
    let successUpdate = [];
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE(
      "/aspAssignment/acceptAspAssignment/" + _id
    );
    if (res !== undefined) {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
      } else {
        this.setState({ action_status: "failed" });
      }
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  async revisionASG(e) {
    if (this.state.revision_note === "") {
      alert("Note cannot be empty!");
    } else {
      const newDate = new Date();
      const dateNow =
        newDate.getFullYear() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getDate() +
        " " +
        newDate.getHours() +
        ":" +
        newDate.getMinutes() +
        ":" +
        newDate.getSeconds();
      const _etag = e.target.value;
      const _id = e.target.id;
      let res = await this.patchDatatoAPINODE(
        "/aspAssignment/reviseAspAssignment/" + _id,
        { note: this.state.revision_note }
      );
      if (res !== undefined) {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
        } else {
          this.setState({ action_status: "failed" });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
      this.toggleModalRevision();
    }
  }

  async rescheduleASG(e) {
    if (this.state.reschedule_note === "") {
      alert("Note cannot be empty!");
    } else {
      const newDate = new Date();
      const dateNow =
        newDate.getFullYear() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getDate() +
        " " +
        newDate.getHours() +
        ":" +
        newDate.getMinutes() +
        ":" +
        newDate.getSeconds();
      const _etag = e.target.value;
      const _id = e.target.id;
      let res = await this.patchDatatoAPINODE(
        "/aspAssignment/reScheduleAspAssignment/" + _id,
        { note: this.state.reschedule_note }
      );
      if (res !== undefined) {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
        } else {
          this.setState({ action_status: "failed" });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
      this.toggleModalReschedule();
    }
  }

  async saveBastNumber() {
    const dataAssignment = this.state.data_assignment;
    const formBast = this.state.bast_assign_form;
    const dataBast = {
      Request_Type: "New GR",
      id_assignment_doc: dataAssignment._id,
      Assignment_No: dataAssignment.Assignment_No,
      Account_Name: dataAssignment.Account_Name,
      ASP_Acceptance_Date: dataAssignment.ASP_Acceptance_Date,
      WP_ID: dataAssignment.WP_ID,
      id_project_doc: dataAssignment.id_project_doc,
      Project: dataAssignment.Project,
      SOW_Type: dataAssignment.SOW_Type,
      BAST_No: formBast.get("bast_no"),
      GR_Type: formBast.get("gr_type"),
      Payment_Terms: dataAssignment.Payment_Terms,
      //Persen
      Payment_Terms_Ratio: (formBast.get("ratio") * 100).toString() + "%",
      //Float
      GR_Percentage: formBast.get("ratio"),
      PO_Number: dataAssignment.PO_Number,
      PO_Item: dataAssignment.PO_Item,
      Item_Status: formBast.get("item_status"),
      Requestor: this.state.userName,
    };
    let assignBast = {
      account_id: null,
      data: [dataBast],
    };
    const respondAssignBast = await this.patchDatatoAPINODE(
      "/aspAssignment/updateBastNumber/" + dataAssignment._id,
      assignBast
    );
    if (
      respondAssignBast.data !== undefined &&
      respondAssignBast.status >= 200 &&
      respondAssignBast.status <= 300
    ) {
      this.setState({
        action_status: "success",
        action_message: "BAST Number has been assign",
      });
    } else {
      this.setState({
        action_status: "failed",
        action_message: respondAssignBast.response.data.error,
      });
    }
  }

  exportFormatBulkAssignment = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const data_assingment = this.state.data_assignment;
    let indexSSOW = 7;

    let headerRow = [
      "id",
      "project",
      "sow_type",
      "created_based",
      "vendor_code",
      "vendor_name",
      "payment_terms",
      "identifier",
    ];

    data_assingment.SSOW_List.map((e, idx) =>
      headerRow.push(
        "ssow_" + e.sow_type.toLowerCase() + "_id_" + (idx + 1).toString(),
        "ssow_" +
          e.sow_type.toLowerCase() +
          "_activity_number_" +
          (idx + 1).toString(),
        "ssow_" + e.sow_type.toLowerCase() + "_unit_" + (idx + 1).toString(),
        "ssow_" + e.sow_type.toLowerCase() + "_quantity_" + (idx + 1).toString()
      )
    );

    let dataASGPrint = [
      data_assingment.Assignment_No,
      data_assingment.Project,
      data_assingment.SOW_Type,
      "cd_id",
      data_assingment.Vendor_Code_Number,
      data_assingment.Vendor_Name,
      this.convertTOP(data_assingment.Payment_Terms),
      data_assingment.Site_ID,
    ];
    data_assingment.SSOW_List.map((e) =>
      dataASGPrint.push(
        e.ssow_id,
        e.ssow_activity_number,
        e.ssow_unit,
        e.ssow_qty
      )
    );

    ws.addRow(headerRow);
    ws.addRow(dataASGPrint);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "Assignment " + data_assingment.Assignment_No + " Template.xlsx"
    );
  };

  async loadOptionsSSOWID(inputValue) {
    if (!inputValue || inputValue.length < 2) {
      return [];
    } else {
      let ssow_id_list = [];
      // const getSSOWID = await this.getDataFromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getSSOWID = await this.getDataFromAPIXL(
        '/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}'
      );
      if (getSSOWID !== undefined && getSSOWID.data !== undefined) {
        getSSOWID.data._items.map((ssow) =>
          ssow_id_list.push({
            label: ssow.ssow_id !== undefined ? ssow.ssow_id : null,
            value: ssow.ssow_id,
            sow_type: ssow.sow_type,
            ssow_unit: ssow.ssow_type,
            description: ssow.description,
          })
        );
      }
      return ssow_id_list;
    }
  }

  async loadOptionsActivityNumber(inputValue) {
    if (!inputValue || inputValue.length < 2) {
      return [];
    } else {
      let act_number_list = [];
      const getActNumber = await this.getDataFromAPIXL(
        '/ssow_activity_number_sorted_nonpage?where={"activity_number":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}'
      );
      if (getActNumber !== undefined && getActNumber.data !== undefined) {
        getActNumber.data._items.map((act_number) =>
          act_number_list.push({
            label:
              act_number.activity_number !== undefined
                ? act_number.activity_number
                : null,
            value: act_number.activity_number,
          })
        );
      }
      return act_number_list;
    }
  }

  handleChangeCanEditSSOW() {
    this.setState((prevState) => ({
      can_edit_ssow: !prevState.can_edit_ssow,
    }));
  }

  handleChangeCanEditASP() {
    this.getASPList();
    this.setState((prevState) => ({
      can_edit_asp: !prevState.can_edit_asp,
    }));
  }

  handleChangeASP(e) {
    const value = e.target.value;
    const asp_name = this.state.asp_list.find((e) => e.Vendor_Code === value);
    let asp_selected = this.state.data_assignment;
    if (asp_name !== undefined) {
      asp_selected["Vendor_Code"] = asp_name._id;
      asp_selected["Vendor_Code_Number"] = asp_name.Vendor_Code;
      asp_selected["Vendor_Email"] = asp_name.Email;
      asp_selected["Vendor_Name"] = asp_name.Name;
    }
    this.setState({ data_assignment: asp_selected, vendor_id: asp_name._id });
  }

  handleChangeTOP(e) {
    const value = e.target.value;
    let dataASG = this.state.data_assignment;
    if (value !== undefined) {
      dataASG["Payment_Terms"] = value;
    }
    this.setState({ data_assignment: dataASG });
  }

  convertTOP(e) {
    if (e === "20%-80%") {
      return 2080;
    } else if (e === "30%-70%") {
      return 3070;
    } else if (e === "40%-60%") {
      return 4060;
    } else if (e === "50%-50%") {
      return 5050;
    } else if (e === "100%") {
      return 100;
    } else if (e === "80%-20%") {
      return 8020;
    } else if (e === "70%-30%") {
      return 7030;
    } else if (e === "60%-40%") {
      return 6040;
    } else {
      return e;
    }
  }

  getASPList() {
    this.getDataFromAPIEXEL("/vendor_data_non_page").then((res) => {
      if (res.data !== undefined) {
        const items = res.data._items;
        this.setState({ asp_list: items });
      }
    });
  }

  getASPListEmail(_id) {
    this.getDataFromAPIEXEL("/vendor_data_non_page/" + _id).then((res) => {
      // this.getDataFromAPIEXEL("/vendor_data_non_page/5e9ddd1203748a2f02b1fa63").then((res) => {
      if (res.data !== undefined) {
        const items = res.data.Email;
        // const email_list = items.map(e => e.Email);
        this.setState({ vendor_email: items });
      }
    });
  }

  handleChangeSSOWList(e) {
    let dataSSOW = this.state.data_assignment;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSSOW.SSOW_List[parseInt(idx)][field] = value;
    this.setState({ data_assignment: dataSSOW });
  }

  handleChangeSSOWListReactSelect = async (newValue, e) => {
    let dataSSOW = this.state.data_assignment;
    let idxField = e.name.split(" /// ");
    let idx = idxField[0];
    let field = idxField[1];
    if (field === "ssow_id") {
      dataSSOW.SSOW_List[parseInt(idx)]["sow_type"] = newValue.sow_type;
      dataSSOW.SSOW_List[parseInt(idx)]["ssow_description"] =
        newValue.description;
      dataSSOW.SSOW_List[parseInt(idx)]["ssow_unit"] = newValue.ssow_unit;
    }
    dataSSOW.SSOW_List[parseInt(idx)][field] = newValue.value;
    this.setState({ data_assignment: dataSSOW });
  };

  async updateSSOWList() {
    const data_assingment = this.state.data_assignment;

    let headerRow = [
      "id",
      "project",
      "sow_type",
      "created_based",
      "vendor_code",
      "vendor_name",
      "payment_terms",
      "identifier",
    ];

    let dataASGRow = [
      data_assingment.Assignment_No,
      data_assingment.Project,
      "RBS",
      "tower_id",
      data_assingment.Vendor_Code_Number,
      data_assingment.Vendor_Name,
      this.convertTOP(data_assingment.Payment_Terms),
      data_assingment.Site_ID,
    ];
    data_assingment.SSOW_List.map((e, idx) =>
      headerRow.push(
        "ssow_" + e.sow_type.toLowerCase() + "_id_" + (idx + 1).toString(),
        "ssow_" +
          e.sow_type.toLowerCase() +
          "_activity_number_" +
          (idx + 1).toString(),
        "ssow_" + e.sow_type.toLowerCase() + "_unit_" + (idx + 1).toString(),
        "ssow_" + e.sow_type.toLowerCase() + "_quantity_" + (idx + 1).toString()
      )
    );
    data_assingment.SSOW_List.map((e) =>
      dataASGRow.push(
        e.ssow_id,
        e.ssow_activity_number,
        e.ssow_unit,
        e.ssow_qty
      )
    );

    let dataXLS = [headerRow, dataASGRow];
    console.log("dataXLS", dataXLS);
    const dataXLSASG = {
      includeSsow: true,
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
      if (dataChecking[0].operation === "INVALID") {
        this.setState({
          action_status: "failed",
          action_message: dataChecking[0].activity_status,
        });
      } else {
        const respondSaveASG = await this.postDatatoAPINODE(
          "/aspAssignment/createAspAssign",
          { data: dataChecking }
        );
        if (
          respondSaveASG.data !== undefined &&
          respondSaveASG.status >= 200 &&
          respondSaveASG.status <= 300
        ) {
          this.setState({ action_status: "success" });
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  deleteSSOW(e) {
    let index = e.target.value;
    let dataSSOW = this.state.data_assignment;
    dataSSOW.SSOW_List.splice(parseInt(index), 1);
    this.setState({ data_assignment: dataSSOW });
  }

  addSSOW() {
    let dataSSOW = this.state.data_assignment;
    dataSSOW.SSOW_List.push({});
    this.setState({ data_assignment: dataSSOW });
  }

  async approveASGbyPM(e) {
    const newDate = new Date();
    const dataAssignment = this.state.data_assignment;
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let creatorEmail = null;
    let creator = dataAssignment.ASP_Assignment_Status.find(
      (e) => e.status_value === "CREATED" && e.status_name === "ASP_ASSIGNMENT"
    );
    if (creator !== undefined) {
      creatorEmail = creator.status_updater;
    }
    let res = await this.patchDatatoAPINODE("/aspAssignment/pmApproval/" + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        let linkImp = "https://bam-id.e-dpm.com/assignment-detail/" + _id;
        const bodyEmail =
          "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assingment approved by PM " +
          this.state.userEmail +
          ", <br/><br/><i>Site</i>: <b>" +
          dataAssignment.Site_ID +
          "</b> <br/><i>Project</i>: <b>" +
          dataAssignment.Project +
          "</b><br/><i>Assignment</i>: <b>" +
          dataAssignment.Assignment_No +
          ".</span><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='" +
          linkImp +
          "'>" +
          linkImp +
          "</a>";
        let dataEmail = {
          to: creatorEmail,
          // "to": "damar.pramuditya@ericsson.com",
          subject: "[APPROVED ASG] Assignment " + dataAssignment.Assignment_No,
          body: bodyEmail,
        };
        // let sendEmail = await apiSendEmail(dataEmail);
        console.log(dataEmail);
        this.setState({ action_status: "success" });
      } else {
        this.setState({ action_status: "failed" });
      }
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  async RevisePRPO(e) {
    this.toggleLoading();
    const newDate = new Date();
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _id = e.target.id;
    const dataAssignment = this.state.data_assignment;
    let res = await this.patchDatatoAPINODE(
      "/aspAssignment/revisePrPoAssignment/" + this.props.match.params.id,
      {}
    );
    if (res !== undefined && res.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async CancelASG(e) {
    this.setState({ modal_warning_cancel_asg: false });
    this.toggleLoading();
    const newDate = new Date();
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _id = e.target.id;
    const dataAssignment = this.state.data_assignment;
    let res = await this.patchDatatoAPINODE(
      "/aspAssignment/requestCancelation",
      { assignmentId: [dataAssignment._id], reason: this.state.reason_cancel }
    );
    if (res !== undefined) {
      if (res.data !== undefined) {
        let linkImp = "https://bam-id.e-dpm.com/assignment-detail/" + _id;
        const bodyEmail =
          "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been requested for Cancel by " +
          this.state.userEmail +
          ", <br/><br/><i>Site</i>: <b>" +
          dataAssignment.Site_ID +
          "</b> <br/><i>Project</i>: <b>" +
          dataAssignment.Project +
          "</b><br/><i>Assignment</i>: <b>" +
          dataAssignment.Assignment_No +
          "</b><br/><br/>is requested for reschedule by " +
          this.state.userEmail +
          ".</span><br/><i>Note from ASP</i>: <b>" +
          this.state.reschedule_note +
          "</b><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='" +
          linkImp +
          "'>" +
          linkImp +
          "</a>";
        let dataEmail = {
          // "to": creatorEmail,
          // "to" : "a.rakha.ahmad.taufiq@ericsson.com",
          subject:
            "[Cancellation Approval] Assignment " +
            dataAssignment.Assignment_No,
          body: bodyEmail,
        };
        // let sendEmail = await this.apiSendEmail(dataEmail);
        this.setState({ action_status: "success" });
      } else {
        if (
          res.response !== undefined &&
          res.response.data !== undefined &&
          res.response.data.error !== undefined
        ) {
          if (res.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error.message,
            });
          } else {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error,
            });
          }
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async ApproveCancelASG(e) {
    this.toggleLoading();
    const newDate = new Date();
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _id = e.target.id;
    const dataAssignment = this.state.data_assignment;
    let res = await this.patchDatatoAPINODE(
      "/aspAssignment/approveCancelation",
      { assignmentId: [_id] }
    );
    if (res !== undefined) {
      if (res.data !== undefined) {
        let linkImp = "https://bam-id.e-dpm.com/assignment-detail/" + _id;
        const bodyEmail =
          "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been Approve for Cancel by " +
          this.state.userEmail +
          ", <br/><br/><i>Site</i>: <b>" +
          dataAssignment.Site_ID +
          "</b> <br/><i>Project</i>: <b>" +
          dataAssignment.Project +
          "</b><br/><i>Assignment</i>: <b>" +
          dataAssignment.Assignment_No +
          "</b><br/><br/>is requested for reschedule by " +
          this.state.userEmail +
          ".</span><br/><i>Note from ASP</i>: <b>" +
          this.state.reschedule_note +
          "</b><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='" +
          linkImp +
          "'>" +
          linkImp +
          "</a>";
        let dataEmail = {
          // "to": creatorEmail,
          // "to" : "a.rakha.ahmad.taufiq@ericsson.com",
          subject:
            "[Approve Cancellation] Assignment " + dataAssignment.Assignment_No,
          body: bodyEmail,
        };
        // let sendEmail = await this.apiSendEmail(dataEmail);
        this.setState({ action_status: "success" });
      } else {
        if (
          res.response !== undefined &&
          res.response.data !== undefined &&
          res.response.data.error !== undefined
        ) {
          if (res.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error.message,
            });
          } else {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error,
            });
          }
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async RejectCancelASG(e) {
    this.toggleLoading();
    const newDate = new Date();
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _id = e.target.id;
    const dataAssignment = this.state.data_assignment;
    let res = await this.patchDatatoAPINODE(
      "/aspAssignment/rejectCancelation",
      { assignmentId: [_id] }
    );
    if (res !== undefined) {
      if (res.data !== undefined) {
        let linkImp = "https://bam-id.e-dpm.com/assignment-detail/" + _id;
        const bodyEmail =
          "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been Reject for Cancel by " +
          this.state.userEmail +
          ", <br/><br/><i>Site</i>: <b>" +
          dataAssignment.Site_ID +
          "</b> <br/><i>Project</i>: <b>" +
          dataAssignment.Project +
          "</b><br/><i>Assignment</i>: <b>" +
          dataAssignment.Assignment_No +
          "</b><br/><br/>is requested for reschedule by " +
          this.state.userEmail +
          ".</span><br/><i>Note from ASP</i>: <b>" +
          this.state.reschedule_note +
          "</b><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='" +
          linkImp +
          "'>" +
          linkImp +
          "</a>";
        let dataEmail = {
          // "to": creatorEmail,
          // "to" : "a.rakha.ahmad.taufiq@ericsson.com",
          subject:
            "[Reject Cancellation] Assignment " + dataAssignment.Assignment_No,
          body: bodyEmail,
        };
        // let sendEmail = await this.apiSendEmail(dataEmail);
        this.setState({ action_status: "success" });
      } else {
        if (
          res.response !== undefined &&
          res.response.data !== undefined &&
          res.response.data.error !== undefined
        ) {
          if (res.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error.message,
            });
          } else {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error,
            });
          }
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  toggleModalRevision(e) {
    this.setState((prevState) => ({
      modal_revision: !prevState.modal_revision,
    }));
  }

  handleRevisionNote(e) {
    let value = e.target.value;
    this.setState({ revision_note: value });
  }

  toggleModalReschedule(e) {
    this.setState((prevState) => ({
      modal_reschedule: !prevState.modal_reschedule,
    }));
  }

  handleRescheduleNote(e) {
    let value = e.target.value;
    this.setState({ reschedule_note: value });
  }

  getSIDFile = async (e) => {
    e.preventDefault();
    e.persist();
    const _id = e.target.value;
    const dataSID = this.state.sid_file.find((sf) => sf._id === _id);
    if (dataSID !== undefined) {
      const resFile = await getDatafromAPINODEFile(
        "/sidFile/getDocument/" + _id,
        this.props.dataLogin.token,
        dataSID.file_document.mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], { type: dataSID.file_document.mime_type }),
          dataSID.file_document.file_name
        );
      }
    }
  };

  getABDFile = async (e) => {
    e.preventDefault();
    e.persist();
    const _id = e.currentTarget.value;
    const dataSID = this.state.abd_file.find((sf) => sf._id === _id);
    if (dataSID !== undefined) {
      const resFile = await getDatafromAPINODEFile(
        "/sidFile/getDocument/" + _id,
        this.props.dataLogin.token,
        dataSID.file_document.mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], { type: dataSID.file_document.mime_type }),
          dataSID.file_document.file_name
        );
      }
    }
  };

  getPQRFile = async (e) => {
    e.preventDefault();
    e.persist();
    const _id = e.currentTarget.value;
    const dataSID = this.state.pqr_file.find((sf) => sf._id === _id);
    if (dataSID !== undefined) {
      const resFile = await getDatafromAPINODEFile(
        "/sidFile/getDocument/" + _id,
        this.props.dataLogin.token,
        dataSID.file_document.mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], { type: dataSID.file_document.mime_type }),
          dataSID.file_document.file_name
        );
      }
    }
  };

  handleChangeReasonCancel(e) {
    this.setState({ reason_cancel: e.target.value });
  }

  async ResyncNNandACT(e) {
    const dataPatch = await this.patchDatatoAPINODE(
      "/aspAssignment/resyncNnActCodePdb/" + this.state.data_assignment._id,
      {}
    );
    if (dataPatch !== undefined && dataPatch.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        dataPatch.response !== undefined &&
        dataPatch.response.data !== undefined &&
        dataPatch.response.data.error !== undefined
      ) {
        if (dataPatch.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: dataPatch.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: dataPatch.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif
              actionMessage={this.state.action_message}
              actionStatus={this.state.action_status}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            {this.state.data_assignment !== null && (
              <Card>
                <CardHeader>
                  <span style={{ lineHeight: "2", fontSize: "17px" }}>
                    <i
                      className="fa fa-info-circle"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Assignment Detail (
                    {this.state.data_assignment.Assignment_No})
                  </span>
                  <Button
                    style={{ marginRight: "8px", float: "right" }}
                    outline
                    color="info"
                    size="sm"
                    onClick={this.exportFormatBulkAssignment}
                    size="sm"
                  >
                    <i
                      className="fa fa-download"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Assignment Format
                  </Button>
                  {/* {this.state.userRole.findIndex((e) => e === "Admin") !== -1 &&
                    (this.state.data_assignment.Locked_For_Revision ===
                      undefined ||
                      this.state.data_assignment.Locked_For_Revision ===
                        false) && (
                      <Button
                        style={{ marginRight: "8px", float: "right" }}
                        outline
                        color="secondary"
                        size="sm"
                        onClick={this.ResyncNNandACT}
                        size="sm"
                      >
                        <i
                          class="fa fa-refresh"
                          aria-hidden="true"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Resync NN and ACT Code
                      </Button>
                    )} */}
                  {/* {this.state.sid_file.length !== 0 ||
                  this.state.abd_file.length !== 0 ||
                  this.state.pqr_file !== 0 ? (
                    <Dropdown
                      size="sm"
                      isOpen={this.state.dropdownOpen[1]}
                      toggle={() => {
                        this.toggleDropdown(1);
                      }}
                      style={{ float: "right", marginRight: "10px" }}
                    >
                      <DropdownToggle caret color="secondary">
                        <i className="fa fa-download" aria-hidden="true">
                          {" "}
                          &nbsp;{" "}
                        </i>
                        Download SID File
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>SID File</DropdownItem>
                        {this.state.sid_file.map((sf) => (
                          <DropdownItem
                            value={sf._id}
                            onClick={this.getSIDFile}
                          >
                            <span>{sf.file_document.file_name}</span> (
                            {sf.cust_del[0].cd_id})
                          </DropdownItem>
                        ))}
                        <DropdownItem header>ABD File</DropdownItem>
                        {this.state.userRole.findIndex(
                          (e) => e === "BAM-ASP Management"
                        ) === -1 &&
                          this.state.userRole.findIndex(
                            (e) => e === "BAM-ASP"
                          ) === -1 &&
                          this.state.userRole.findIndex(
                            (e) => e === "BAM-ASPWarehouse"
                          ) === -1 &&
                          this.state.abd_file.map((sf) => (
                            <DropdownItem
                              value={sf._id}
                              onClick={this.getABDFile}
                            >
                              <span>{sf.file_document.file_name}</span> (
                              {sf.cust_del[0].cd_id})
                            </DropdownItem>
                          ))}
                        <DropdownItem header>PQR File</DropdownItem>
                        {this.state.userRole.findIndex(
                          (e) => e === "BAM-ASP Management"
                        ) === -1 &&
                          this.state.userRole.findIndex(
                            (e) => e === "BAM-ASP"
                          ) === -1 &&
                          this.state.userRole.findIndex(
                            (e) => e === "BAM-ASPWarehouse"
                          ) === -1 &&
                          this.state.pqr_file.map((sf) => (
                            <DropdownItem
                              value={sf._id}
                              onClick={this.getPQRFile}
                            >
                              <span>{sf.file_document.file_name}</span> (
                              {sf.cust_del[0].cd_id})
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Button
                      size="sm"
                      style={{ float: "right", marginRight: "10px" }}
                    >
                      no data SID or ABD
                    </Button>
                  )} */}
                </CardHeader>
                <CardBody>
                  <Form>
                    {this.state.data_assignment.SH_Assignment_No !== null &&
                      this.state.data_assignment.SH_Assignment_No !==
                        undefined && (
                        <Fragment>
                          <h5>SH Migration Data</h5>
                          <Row>
                            <Col md="6">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>SH Assignment ID</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={
                                    this.state.data_assignment.SH_Assignment_No
                                  }
                                ></Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              md="12"
                              style={{
                                paddingLeft: "31px",
                                paddingRight: "31px",
                              }}
                            >
                              <Table responsive striped bordered size="sm">
                                <thead>
                                  <tr>
                                    <th>Status</th>
                                    <th>By</th>
                                    <th>Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.data_assignment.ASP_Assignment_Status.map(
                                    (stat) => (
                                      <tr>
                                        <td>{stat.status_value}</td>
                                        <td>{stat.status_updater}</td>
                                        <td>{stat.status_date}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </Fragment>
                      )}
                    <h5>ACTIVITY</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>WP ID</Label>
                          <Input
                            type="text"
                            readOnly
                            value={this.state.data_assignment.cust_del.map(
                              (e) => e.cd_id + ", "
                            )}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Status</Label>
                          <Input
                            type="text"
                            readOnly
                            value={this.state.data_assignment.Current_Status}
                          ></Input>
                        </FormGroup>
                      </Col>
                      {this.state.data_assignment.Current_Status ===
                      "ASP ASSIGNMENT NEED REVISION" ? (
                        <Col md="6">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Notes</Label>
                            <Input
                              type="text"
                              readOnly
                              value={this.state.data_assignment.notes}
                            ></Input>
                          </FormGroup>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                    {/* <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Remark</Label>
                          <Input
                            type="textarea"
                            readOnly
                            value={this.state.data_assignment.Assignment_Remark}
                          ></Input>
                        </FormGroup>
                      </Col>
                      {this.state.data_assignment.Cancelation_Reason !==
                        undefined &&
                        this.state.data_assignment.Cancelation_Reason !==
                          null &&
                        this.state.data_assignment.Cancelation_Reason.length !==
                          0 && (
                          <Col md="6">
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>Cancel Remark</Label>
                              <Input
                                type="textarea"
                                readOnly
                                value={
                                  this.state.data_assignment.Cancelation_Reason
                                }
                              ></Input>
                            </FormGroup>
                          </Col>
                        )}
                    </Row> */}
                    <h5 style={{ marginTop: "16px" }}>PROJECT</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Project Name</Label>
                          <Input
                            type="text"
                            name="project_name"
                            readOnly
                            value={this.state.data_assignment.Project}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Project PO</Label>
                          <Input
                            type="text"
                            name="project_name"
                            readOnly
                            value={this.state.data_assignment.cust_del
                              .map((cd) => cd.project_po)
                              .join(", ")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "16px" }}>
                      <Col md="6">
                        <h5>SITE DETAILS NE</h5>
                      </Col>
                      <Col md="6">
                        <h5>SITE DETAILS FE</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site ID</Label>
                          <Input
                            type="text"
                            name="site_id_ne"
                            readOnly
                            value={this.state.data_assignment.Site_ID}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site Name</Label>
                          <Input
                            type="text"
                            name="site_name_ne"
                            readOnly
                            value={this.state.data_assignment.Site_Name}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Latitude</Label>
                          <Input
                            type="text"
                            name="site_lat_ne"
                            readOnly
                            value={this.state.data_assignment.Site_Latitude}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Longitude</Label>
                          <Input
                            type="text"
                            name="site_long_ne"
                            readOnly
                            value={this.state.data_assignment.Site_Longitude}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site ID</Label>
                          <Input
                            type="text"
                            name="site_id_fe"
                            readOnly
                            value={this.state.data_assignment.Site_FE_ID}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site Name</Label>
                          <Input
                            type="text"
                            name="site_name_fe"
                            readOnly
                            value={this.state.data_assignment.Site_FE_Name}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Latitude</Label>
                          <Input
                            type="text"
                            name="site_lat_fe"
                            readOnly
                            value={this.state.data_assignment.Site_FE_Latitude}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Longitude</Label>
                          <Input
                            type="text"
                            name="site_long_fe"
                            readOnly
                            value={this.state.data_assignment.Site_FE_Longitude}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 style={{ marginTop: "16px" }}>SOW / CONFIG</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>SOW / Config</Label>
                          <Input
                            type="text"
                            name="sow_config"
                            readOnly
                            value={this.state.data_assignment.SOW_Type}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>NN Service</Label>
                          <Input
                            type="text"
                            name="nn_service"
                            readOnly
                            value={this.state.data_assignment.NW}
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>WBS</Label>
                          <Input type="text" name="wbs" readOnly value="" />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Act Code</Label>
                          <Input
                            type="text"
                            name="act_code"
                            readOnly
                            value={this.state.data_assignment.NW_Activity}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <h5 style={{ marginTop: "16px" }}>PR/PO INFORMATION</h5>
                    <Row>
                      <div style={{ paddingLeft: "25px" }}>
                        <Checkbox
                          name="editable"
                          checked={this.state.can_edit_asp}
                          onChange={this.handleChangeCanEditASP}
                        />
                        <span>Editable</span>
                      </div>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>ASP</Label>
                          {this.state.can_edit_asp ? (
                            <Input
                              type="select"
                              name="14"
                              onChange={this.handleChangeASP}
                              value={
                                this.state.data_assignment.Vendor_Code_Number
                              }
                            >
                              <option value="" disabled hidden>
                                Select ASP
                              </option>
                              {this.state.asp_list.map((list, i) => (
                                <option value={list.Vendor_Code}>
                                  {list.Name}
                                </option>
                              ))}
                            </Input>
                          ) : (
                            <Input
                              type="text"
                              name="asp"
                              readOnly
                              value={this.state.data_assignment.Vendor_Name}
                            />
                          )}
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>TOP</Label>
                          {this.state.can_edit_asp ? (
                            <Input
                              type="select"
                              name="14"
                              onChange={this.handleChangeTOP}
                              value={this.convertTOP(
                                this.state.data_assignment.Payment_Terms
                              )}
                            >
                              <option value="" disabled hidden>
                                Select TOP
                              </option>
                              <option value="2080">20% - 80%</option>
                              <option value="3070">30% - 70%</option>
                              <option value="4060">40% - 60%</option>
                              <option value="5050">50% - 50%</option>
                              <option value="100">100% - 0%</option>
                              <option value="8020">80% - 20%</option>
                              <option value="7030">70% - 30%</option>
                              <option value="6040">60% - 40%</option>
                            </Input>
                          ) : (
                            <Input
                              type="text"
                              name="top"
                              readOnly
                              value={this.state.data_assignment.Payment_Terms}
                            />
                          )}
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>SSOW Type</Label>
                          <Input
                            type="text"
                            name="ssow_type"
                            readOnly
                            value={this.state.data_assignment.SOW_Type}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Assignment Accepted by</Label>
                          <Input
                            type="text"
                            name="pr"
                            readOnly
                            value={
                              this.state.data_assignment.ASP_Assignment_Status.find(
                                (st) => st.status_value === "ACCEPTED"
                              ) !== undefined
                                ? this.state.data_assignment.ASP_Assignment_Status.find(
                                    (st) => st.status_value === "ACCEPTED"
                                  ).status_updater
                                : null
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Assignment Accepted On</Label>
                          <Input
                            type="text"
                            name="pr_created_by"
                            value={
                              this.state.data_assignment.ASP_Assignment_Status.find(
                                (st) => st.status_value === "ACCEPTED"
                              ) !== undefined
                                ? this.state.data_assignment.ASP_Assignment_Status.find(
                                    (st) => st.status_value === "ACCEPTED"
                                  ).status_date.slice(0, 10)
                                : null
                            }
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PR</Label>
                          <Input
                            type="text"
                            name="pr"
                            readOnly
                            value={this.state.data_assignment.PR_for_ASP}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created By</Label>
                          <Input
                            type="text"
                            name="pr_created_by"
                            value={
                              this.state.data_assignment.PR_For_ASP_Creator
                            }
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created On</Label>
                          <Input
                            type="date"
                            name="pr_created_on"
                            value={
                              this.state.data_assignment.PR_For_ASP_Date !==
                                null &&
                              this.state.data_assignment.PR_For_ASP_Date !==
                                undefined
                                ? this.state.data_assignment.PR_For_ASP_Date.slice(
                                    0,
                                    10
                                  )
                                : null
                            }
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO</Label>
                          <Input
                            type="text"
                            name="po"
                            readOnly
                            value={this.state.data_assignment.PO_Number}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created By</Label>
                          <Input
                            type="text"
                            name="po_created_by"
                            value={this.state.data_assignment.PO_Creator}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created On</Label>
                          <Input
                            type="date"
                            name="po_created_on"
                            value={
                              this.state.data_assignment.PO_Date !== null &&
                              this.state.data_assignment.PO_Date !== undefined
                                ? this.state.data_assignment.PO_Date.slice(
                                    0,
                                    10
                                  )
                                : null
                            }
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO LINE ITEM</Label>
                          <Input type="text" name="po_line_item" readOnly />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    {/* {this.state.data_assignment !== null &&
                      this.state.data_assignment !== undefined && (
                        <Fragment>
                          <h5 style={{ marginTop: "16px" }}>SSOW List</h5>
                          <Row
                            style={{
                              paddingLeft: "16px",
                              paddingRight: "16px",
                            }}
                          >
                            {(this.state.userRole.includes(
                              "BAM-Implementation Manager"
                            ) === true ||
                              this.state.userRole.includes(
                                "BAM-Implementation Coordinator"
                              ) === true ||
                              this.state.userRole.includes("Admin") ===
                                true) && (
                              <div style={{ marginBottom: "10px" }}>
                                <Checkbox
                                  name="editable"
                                  checked={this.state.can_edit_ssow}
                                  onChange={this.handleChangeCanEditSSOW}
                                />
                                <span>Editable</span>
                              </div>
                            )}
                          </Row>
                          {this.state.can_edit_ssow ? (
                            <Fragment>
                              {this.state.data_assignment.SSOW_List !==
                                undefined &&
                                this.state.data_assignment.SSOW_List.map(
                                  (ssow, idx) => (
                                    <Row
                                      style={{
                                        paddingLeft: "16px",
                                        paddingRight: "16px",
                                      }}
                                    >
                                      <Col
                                        md="2"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>SSOW ID</Label>
                                          <AsyncSelect
                                            cacheOptions
                                            loadOptions={this.loadOptionsSSOWID}
                                            defaultOptions
                                            defaultInputValue={ssow.ssow_id}
                                            isDisabled={
                                              !this.state.can_edit_ssow
                                            }
                                            onChange={
                                              this
                                                .handleChangeSSOWListReactSelect
                                            }
                                            name={idx + " /// ssow_id"}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col
                                        md="2"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>Activity Number</Label>
                                          <AsyncSelect
                                            cacheOptions
                                            loadOptions={
                                              this.loadOptionsActivityNumber
                                            }
                                            defaultOptions
                                            defaultInputValue={
                                              ssow.ssow_activity_number
                                            }
                                            isDisabled={
                                              !this.state.can_edit_ssow
                                            }
                                            onChange={
                                              this
                                                .handleChangeSSOWListReactSelect
                                            }
                                            name={
                                              idx + " /// ssow_activity_number"
                                            }
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col
                                        md="4"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>Description</Label>
                                          <Input
                                            type="textarea"
                                            name={idx + " /// ssow_description"}
                                            rows="1"
                                            value={ssow.ssow_description}
                                            readOnly
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col
                                        md="1"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>SSOW Type</Label>
                                          <Input
                                            type="text"
                                            name={idx + " /// sow_type"}
                                            value={ssow.sow_type}
                                            onChange={this.handleChangeSSOWList}
                                            readOnly
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col
                                        md="1"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>Unit</Label>
                                          <Input
                                            type="text"
                                            name={idx + " /// ssow_unit"}
                                            value={ssow.ssow_unit}
                                            disabled={!this.state.can_edit_ssow}
                                            onChange={this.handleChangeSSOWList}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col
                                        md="1"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>Quantity</Label>
                                          <Input
                                            type="number"
                                            name={idx + " /// ssow_qty"}
                                            value={ssow.ssow_qty}
                                            disabled={!this.state.can_edit_ssow}
                                            onChange={this.handleChangeSSOWList}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col
                                        md="1"
                                        style={{ margin: "0", padding: "4px" }}
                                      >
                                        <FormGroup>
                                          <Label>Status</Label>
                                          <div style={{ display: "flex" }}>
                                            <Input
                                              type="select"
                                              name={
                                                idx + " /// ssow_current_status"
                                              }
                                              onChange={this.handleChangeForm}
                                              value={
                                                ssow.ssow_status !== undefined
                                                  ? ssow.ssow_status[
                                                      ssow.ssow_status.length -
                                                        1
                                                    ].status
                                                  : ""
                                              }
                                              readOnly
                                            >
                                              <option value="" disabled>
                                                Select Status
                                              </option>
                                              <option value="CANCELLED">
                                                Cancelled
                                              </option>
                                              <option value="CLOSE">
                                                Close
                                              </option>
                                              <option value="OPEN">Open</option>
                                              <option value="PARTIAL CLOSE">
                                                Partial Close
                                              </option>
                                            </Input>
                                            {this.state.can_edit_ssow ===
                                              true && (
                                              <Button
                                                value={idx}
                                                onClick={this.deleteSSOW}
                                                color="danger"
                                                size="sm"
                                                style={{ marginLeft: "5px" }}
                                              >
                                                <i className="fa fa-trash"></i>
                                              </Button>
                                            )}
                                          </div>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  )
                                )}
                            </Fragment>
                          ) : (
                            <Row>
                              <Col md="12">
                                <Table
                                  striped
                                  size="sm"
                                  className="assignment-list__table--center-non-border"
                                >
                                  <thead>
                                    <tr>
                                      <th>SSOW ID</th>
                                      <th>Activity Number</th>
                                      <th style={{ width: "400px" }}>
                                        Description
                                      </th>
                                      <th>SSOW Type</th>
                                      <th>Unit</th>
                                      <th>Qty</th>
                                      <th>Total Price</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.data_assignment.SSOW_List !==
                                      undefined &&
                                      this.state.data_assignment.SSOW_List.map(
                                        (ssow) => (
                                          <tr
                                            key={
                                              ssow.ssow_id +
                                              ssow.ssow_activity_number
                                            }
                                          >
                                            <td>{ssow.ssow_id}</td>
                                            <td>{ssow.ssow_activity_number}</td>
                                            <td style={{ textAlign: "left" }}>
                                              {ssow.ssow_description}
                                            </td>
                                            <td>{ssow.sow_type}</td>
                                            <td>{ssow.ssow_unit}</td>
                                            <td>{ssow.ssow_qty}</td>
                                            <td>{ssow.ssow_total_price}</td>
                                            <td>
                                              {
                                                ssow.ssow_status[
                                                  ssow.ssow_status.length - 1
                                                ].status
                                              }
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row>
                          )}
                          {(this.state.can_edit_ssow === true ||
                            this.state.can_edit_asp === true) && (
                            <Fragment>
                              <Row
                                style={{
                                  paddingLeft: "16px",
                                  paddingRight: "16px",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  {this.state.can_edit_ssow === true && (
                                    <Button
                                      color="primary"
                                      size="sm"
                                      onClick={this.addSSOW}
                                    >
                                      <i className="fa fa-plus">&nbsp;</i> SSOW
                                    </Button>
                                  )}
                                  <Button
                                    color="success"
                                    size="sm"
                                    style={{
                                      position: "relative",
                                      left: "350px",
                                    }}
                                    onClick={this.toggleWarningReviseASG}
                                  >
                                    <i className="fa fa-save">&nbsp;</i>Update
                                  </Button>
                                </div>
                              </Row>
                            </Fragment>
                          )}
                        </Fragment>
                      )} */}
                    {/* <h5 style={{ marginTop: "16px" }}>GR</h5>
                    <Row>
                      <Col md="4">
                        <Table responsive striped bordered size="sm">
                          <thead>
                            <tr>
                              <th>ASP BAST No.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data_assignment.BAST_No.map((bast) => (
                              <tr>
                                <td>{bast}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row> */}
                  </Form>
                </CardBody>
                <CardFooter>
                  {(this.state.data_assignment.Current_Status ===
                    "REQUEST PM APPROVAL" ||
                    this.state.data_assignment.Current_Status ===
                      "ASP ASSIGNMENT NEED REVISION" ||
                    (this.state.data_assignment.Current_Status ===
                      "ASP ASSIGNMENT RE-SCHEDULE" &&
                      (this.state.userRole.findIndex(
                        (e) => e === "BAM-Implementation Manager"
                      ) !== -1 ||
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-Implementation Coordinator"
                        ) !== -1 ||
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-Customer Project Manager"
                        ) !== -1 ||
                        this.state.userRole.findIndex((e) => e === "Admin") !==
                          -1))) && (
                    <Button
                      color="success"
                      style={{ float: "right" }}
                      id={this.state.data_assignment._id}
                      value={this.state.data_assignment._etag}
                      onClick={this.approveASGbyPM}
                    >
                      Approve
                    </Button>
                  )}
                  {/* {this.state.data_assignment.Current_Status !==
                    "ASP ASSIGNMENT REQUEST FOR CANCELATION" &&
                    this.state.data_assignment.Current_Status !==
                      "ASP ASSIGNMENT CANCEL APPROVED" &&
                    this.state.data_assignment.Current_Status !==
                      "ASP ASSIGNMENT CANCELED" &&
                    (this.state.data_assignment.SH_Assignment_No !== null ||
                      this.state.data_assignment.created_by ===
                        this.state.userId ||
                      this.state.userRole.findIndex((e) => e === "Admin") !==
                        -1) && (
                      <Button
                        color="danger"
                        size="sm"
                        style={{ float: "left" }}
                        id={this.state.data_assignment._id}
                        onClick={this.toggleWarningCancelASG}
                      >
                        Cancel ASG
                      </Button>
                    )} */}
                  {this.state.data_assignment.Current_Status ===
                    "ASP ASSIGNMENT REQUEST FOR CANCELATION" &&
                    (this.state.userRole.findIndex(
                      (e) => e === "BAM-Customer Project Manager"
                    ) !== -1 ||
                      this.state.userRole.findIndex((e) => e === "Admin") !==
                        -1) && (
                      <Button
                        color="danger"
                        size="sm"
                        style={{ float: "left" }}
                        id={this.state.data_assignment._id}
                        onClick={this.ApproveCancelASG}
                      >
                        Approve Cancellation ASG
                      </Button>
                    )}
                  {this.state.data_assignment.Current_Status ===
                    "ASP ASSIGNMENT REQUEST FOR CANCELATION" &&
                    (this.state.userRole.findIndex(
                      (e) => e === "BAM-Customer Project Manager"
                    ) !== -1 ||
                      this.state.userRole.findIndex((e) => e === "Admin") !==
                        -1) && (
                      <Button
                        color="warning"
                        size="sm"
                        style={{ float: "left", marginLeft: "10px" }}
                        id={this.state.data_assignment._id}
                        onClick={this.RejectCancelASG}
                      >
                        Reject Cancellation ASG
                      </Button>
                    )}
                  {this.state.data_assignment.Current_Status === "PM APPROVE" &&
                    (this.state.userRole.findIndex((e) => e === "Admin") !==
                      -1 ||
                      this.state.userRole.findIndex(
                        (e) => e === "BAM-Implementation Manager"
                      ) !== -1 ||
                      this.state.userRole.findIndex(
                        (e) => e === "BAM-Implementation Coordinator"
                      ) !== -1) && (
                      <Button
                        color="primary"
                        style={{ float: "right" }}
                        id={this.state.data_assignment._id}
                        value={this.state.data_assignment._etag}
                        onClick={this.notifyASP}
                      >
                        <i
                          className="fa fa-bell"
                          style={{ marginRight: "8px" }}
                        ></i>{" "}
                        Notify ASP
                      </Button>
                    )}
                  {this.state.data_assignment.Current_Status ===
                    "ASP ASSIGNMENT NOTIFIED TO ASP" && (
                    <Fragment>
                      <Modal
                        isOpen={this.state.modal_revision}
                        toggle={this.toggleModalRevision}
                        className={"modal-sm"}
                      >
                        <ModalHeader>Input Revision Note</ModalHeader>
                        <ModalBody>
                          <Input
                            type="textarea"
                            rows="9"
                            placeholder="Note..."
                            onChange={this.handleRevisionNote}
                            value={this.state.revision_note}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="warning"
                            style={{ float: "right", marginRight: "8px" }}
                            id={this.state.data_assignment._id}
                            value={this.state.data_assignment._etag}
                            onClick={this.revisionASG}
                          >
                            <i
                              className="fa fa-edit"
                              style={{ marginRight: "8px" }}
                            ></i>{" "}
                            Need Revision
                          </Button>
                          <Button
                            color="secondary"
                            onClick={this.toggleModalRevision}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                      <Modal
                        isOpen={this.state.modal_reschedule}
                        toggle={this.toggleModalReschedule}
                        className={"modal-sm"}
                      >
                        <ModalHeader>Input Reschedule Note</ModalHeader>
                        <ModalBody>
                          <Input
                            type="textarea"
                            rows="9"
                            placeholder="Note..."
                            onChange={this.handleRescheduleNote}
                            value={this.state.reschedule_note}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            style={{ float: "right", marginRight: "8px" }}
                            id={this.state.data_assignment._id}
                            value={this.state.data_assignment._etag}
                            onClick={this.rescheduleASG}
                          >
                            <i
                              className="fa fa-calendar-alt"
                              style={{ marginRight: "8px" }}
                            ></i>{" "}
                            Reschedule
                          </Button>
                          <Button
                            color="secondary"
                            onClick={this.toggleModalReschedule}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Fragment>
                  )}
                  {this.state.data_assignment.ASP_Assignment_Status !==
                    undefined &&
                    this.state.data_assignment.ASP_Assignment_Status.find(
                      (aas) =>
                        aas.status_value === "ACCEPTED" ||
                        aas.status_value === "CANCELED"
                    ) !== undefined &&
                    this.state.data_assignment.ASP_Assignment_Status.find(
                      (aas) => aas.status_value === "CANCELED"
                    ) === undefined && (
                      <Button
                        size="sm"
                        hidden
                        color="success"
                        style={{ float: "right" }}
                        id={this.state.data_assignment._id}
                        value={this.state.data_assignment._etag}
                        onClick={this.RevisePRPO}
                      >
                        Revise PR PO
                      </Button>
                    )}
                </CardFooter>
              </Card>
            )}
          </Col>
        </Row>

        {/* Modal confirmation Cancel */}
        <Modal
          isOpen={this.state.modal_warning_cancel_asg}
          toggle={this.toggleWarningCancelASG}
          className={"modal-sm modal-danger " + this.props.className}
        >
          <ModalHeader>Cancel Confirmation</ModalHeader>
          <ModalBody>
            <div style={{ textAlign: "center" }}>
              This action will cancel this Assignment. Are you sure ?
            </div>
            <div style={{ textAlign: "center" }}>Please select the reason</div>
            <div style={{ textAlign: "center" }}>
              <Input
                type="select"
                onChange={this.handleChangeReasonCancel}
                value={this.state.reason_cancel}
              >
                <option value="No Reason">No Reason</option>
                <option value="Change Scope of Work">
                  Change Scope of Work
                </option>
                <option value="Change ASP">Change ASP</option>
                <option value="Drop Site">Drop Site</option>
                <option value="Change NN ESTA to NN">
                  Change NN ESTA to NN
                </option>
                <option value="Change NN between Project">
                  Change NN between Project
                </option>
                <option value="Double Assignment (1 ASP --> 2 Assignment)">
                  Double Assignment (1 ASP --> 2 Assignment)
                </option>
                <option value="Double Assignment (1 same SOW --> 2 ASP)">
                  Double Assignment (1 same SOW --> 2 ASP)
                </option>
                <option value="Change Handle by FSO">
                  Change Handle by FSO
                </option>
                <option value="ASP Discontinued">ASP Discontinued</option>
                <option value="Purchase Order Expired">
                  Purchase Order Expired
                </option>
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.toggleWarningCancelASG}
              size="sm"
            >
              Close
            </Button>
            <Button
              color="danger"
              onClick={this.CancelASG}
              value="save"
              size="sm"
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal confirmation Cancel */}

        {/* Modal confirmation Revise */}
        <Modal
          isOpen={this.state.modal_warning_revise_asg}
          toggle={this.toggleWarningReviseASG}
          className={"modal-sm modal-warning " + this.props.className}
        >
          <ModalHeader>Revise Confirmation</ModalHeader>
          {this.state.data_assignment !== null && (
            <ModalBody>
              {this.state.data_assignment.Locked_For_Revision === undefined ||
              this.state.data_assignment.Locked_For_Revision === false ? (
                <div style={{ textAlign: "center" }}>
                  This action will revise this Assignment. Are you sure ?
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  Sorry can't update this Assignment
                </div>
              )}
            </ModalBody>
          )}
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.toggleWarningReviseASG}
              size="sm"
            >
              Close
            </Button>
            {this.state.data_assignment !== null &&
              (this.state.data_assignment.Locked_For_Revision === undefined ||
                this.state.data_assignment.Locked_For_Revision === false) && (
                <Button
                  color="warning"
                  onClick={this.updateSSOWList}
                  value="save"
                  size="sm"
                >
                  Revise
                </Button>
              )}
          </ModalFooter>
        </Modal>
        {/* Modal confirmation Revise */}

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
          <ModalFooter></ModalFooter>
        </Modal>
        {/* end Modal Loading */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar,
  };
};

export default connect(mapStateToProps)(AssignmentDetail);