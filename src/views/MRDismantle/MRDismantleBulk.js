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
  apiSendEmail,
  postDatatoAPINODE,
  getDatafromAPIEXEL,
  getDatafromAPINODE,
  patchDatatoAPINODE,
} from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../viewsTelkomsel/DefaultView/DefaultNotif")
);

const API_URL_TSEL = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameISAT = "adminbamidsuper";
const passwordISAT = "F760qbAg2sml";

const API_URL_BAM = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

let headerFormatDSAMigration = [
  "id",
  "activity_id",
  "project",
  "category",
  "eta",
  "etd",
  "deliver_by",
  "dismantle_by",
  "wh_destination",
  "activity_id_destination",
  "project_destination",
  "assignment_id",
  "mra_type",
  "mr_related",
  "note",
];

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

class MRDismantleBulk extends Component {
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
      list_warehouse: [],
      action_finish: false,
      process_bulk_message: [],
    };
    this.saveDataMRABulk = this.saveDataMRABulk.bind(this);
    this.exportFormatBulkMR = this.exportFormatBulkMR.bind(this);
    this.exportFormatBulkMRMigration = this.exportFormatBulkMRMigration.bind(
      this
    );
    this.handleChangeUploadType = this.handleChangeUploadType.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.saveDataPSAssignMRBulk = this.saveDataPSAssignMRBulk.bind(this);
    this.saveDataMRAStatusMigrationBulk = this.saveDataMRAStatusMigrationBulk.bind(
      this
    );
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  checkValue(props) {
    //Swap undefined to null
    if (typeof props === "undefined") {
      return null;
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

  fileHandlerMRBulk = (input) => {
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
    this.setState(
      {
        rowsXLS: newDataXLS,
      },
      () => {
        this.checkFormatDSA(newDataXLS);
      }
    );
    // this.checkingDataAssignment(newDataXLS);
  }

  checkFormatDSA(dataXLS) {
    let dataFalse = [];
    if (dataXLS.length > 0) {
      for (let i; i < dataXLS[0].length; i++) {
        if (
          headerFormatDSAMigration.find((hfd) => hfd === dataXLS[0][i]) ===
          undefined
        ) {
          dataFalse.push(dataXLS[0][i]);
        }
      }
    } else {
      this.setState({
        action_status: "failed",
        action_message: "Please check your format",
      });
    }
    if (dataFalse.length !== 0) {
      this.setState({
        action_status: "failed",
        action_message: "Please check your format",
      });
    }
  }

  componentDidMount() {
    this.getASPList();
    this.getDataWarehouse();
  }

  getASPList() {
    getDatafromAPIEXEL('/vendor_data_non_page?where={"Type":"ASP"}').then(
      (res) => {
        if (res.data !== undefined) {
          const items = res.data._items;
          this.setState({ asp_list: items });
        }
      }
    );
  }

  getDataWarehouse() {
    getDatafromAPINODE(
      '/whManagement/warehouse?q={"wh_type":{"$regex" : "internal", "$options" : "i"}}',
      this.state.tokenUser
    ).then((resWH) => {
      if (resWH.data !== undefined) {
        this.setState({ list_warehouse: resWH.data.data });
      }
    });
  }

  async getProjectinBulk(array_project) {
    let arrayProject = '"' + array_project.join('", "') + '"';
    const dataProject = await getDatafromAPIEXEL(
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

  async saveDataMRAStatusMigrationBulk() {
    this.toggleLoading();
    // const dataChecking = this.state.assignment_ssow_upload;
    const dataUploadMigration = {
      data: this.state.rowsXLS,
    };
    const respondSaveDSA = await patchDatatoAPINODE(
      "/matreq-srn/updateStatusMRDMigration",
      dataUploadMigration,
      this.state.tokenUser
    );
    if (
      respondSaveDSA.data !== undefined &&
      respondSaveDSA.status >= 200 &&
      respondSaveDSA.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      if (
        respondSaveDSA.response !== undefined &&
        respondSaveDSA.response.data !== undefined &&
        respondSaveDSA.response.data.error !== undefined
      ) {
        if (respondSaveDSA.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(
              respondSaveDSA.response.data.error.message
            ),
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(respondSaveDSA.response.data.error),
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async saveDataMRABulk() {
    this.toggleLoading();
    // const dataChecking = this.state.assignment_ssow_upload;
    const dataUploadMigration = {
      data: this.state.rowsXLS,
    };
    const respondSaveDSA = await postDatatoAPINODE(
      "/matreq-srn/createMatreqDismantle",
      dataUploadMigration,
      this.state.tokenUser
    );
    if (
      respondSaveDSA.data !== undefined &&
      respondSaveDSA.status >= 200 &&
      respondSaveDSA.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      if (
        respondSaveDSA.response !== undefined &&
        respondSaveDSA.response.data !== undefined &&
        respondSaveDSA.response.data.error !== undefined
      ) {
        if (respondSaveDSA.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(
              respondSaveDSA.response.data.error.message
            ),
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: JSON.stringify(respondSaveDSA.response.data.error),
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async saveDataPSAssignMRBulk() {
    this.toggleLoading();
    const dataXLS = this.state.rowsXLS;
    // const dataChecking = this.state.assignment_ssow_upload;
    let dataError = [];
    let actionMessage = [];
    for (let i = 1; i < dataXLS.length; i++) {
      let dataPSIDBAM = dataXLS[i][this.getIndex(dataXLS[0], "id_bam_psa")];
      let dataMRIDBAM = dataXLS[i][this.getIndex(dataXLS[0], "id_bam_mra")];
      let dataPSID = dataXLS[i][this.getIndex(dataXLS[0], "psa_id")];
      let dataMRID = dataXLS[i][this.getIndex(dataXLS[0], "mra_id")];
      let actionMessageIdx = {
        mra_id: dataMRID,
        psa_id: dataPSID,
      };
      if (
        (dataPSIDBAM === null || dataPSIDBAM === undefined) &&
        (dataMRIDBAM === null || dataMRIDBAM === undefined) &&
        (dataPSID === null || dataPSID === undefined) &&
        (dataMRID === null || dataMRID === undefined)
      ) {
        actionMessageIdx["message"] = null;
      } else {
        if (
          dataPSIDBAM === null ||
          dataPSIDBAM === undefined ||
          dataMRIDBAM === null ||
          dataMRIDBAM === undefined
        ) {
          actionMessageIdx["message"] = "id bam of both cannot be empty";
        } else {
          const assingPS = await patchDatatoAPINODE(
            "/matreq-srn/assignPsToMrd/" + dataMRIDBAM + "/psd/" + dataPSIDBAM,
            {},
            this.state.tokenUser
          );
          if (assingPS !== undefined && assingPS.data !== undefined) {
            actionMessageIdx["message"] = "Success";
          } else {
            if (
              assingPS.response !== undefined &&
              assingPS.response.data !== undefined &&
              assingPS.response.data.error !== undefined
            ) {
              if (assingPS.response.data.error.message !== undefined) {
                dataError.push(
                  "(" +
                    dataMRID +
                    " <=> " +
                    dataPSID +
                    ")-> " +
                    JSON.stringify(assingPS.response.data.error.message)
                );
                actionMessageIdx["message"] = JSON.stringify(
                  assingPS.response.data.error.message
                );
              } else {
                dataError.push(
                  "(" +
                    dataMRID +
                    " <=> " +
                    dataPSID +
                    ")-> " +
                    JSON.stringify(assingPS.response.data.error)
                );
                actionMessageIdx["message"] = JSON.stringify(
                  assingPS.response.data.error
                );
              }
            } else {
              dataError.push(
                "(" +
                  dataMRID +
                  " <=> " +
                  dataPSID +
                  ")-> There is error, please try again"
              );
              actionMessageIdx["message"] = "There is error, please try again";
            }
          }
        }
      }
      actionMessage.push(actionMessageIdx);
    }
    if (dataError.length === 0) {
      this.setState({ action_status: "success" });
    } else {
      this.setState({
        action_status: "failed",
        action_message:
          "[ " +
          dataError.map((eam) => eam).join("; ") +
          " ] => There is some error, MRA NOT ERROR ALREADY SAVED",
      });
    }
    this.setState({ process_bulk_message: actionMessage, action_finish: true });
    this.toggleLoading();
  }

  exportFormatBulkPSAssignMRWithMessage = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataXLS = this.state.rowsXLS;
    const actionMessage = this.state.process_bulk_message;
    console.log("actionMessage with", actionMessage);

    let headerRow = [
      "Action Message",
      "id_bam_psa",
      "psa_id",
      "id_bam_mra",
      "mra_id",
    ];
    ws.addRow(headerRow);
    for (let j = 1; j < dataXLS.length; j++) {
      ws.addRow([actionMessage[j - 1].message].concat(dataXLS[j]));
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "PS SRN Assign MRA Migration Uploader Template with Action Message.xlsx"
    );
  };

  exportFormatBulkMR = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "id",
      "activity_id",
      "project",
      "category",
      "eta",
      "etd",
      "deliver_by",
      "dismantle_by",
      "wh_destination",
      "activity_id_destination",
      "project_destination",
      "assignment_id",
      "mra_type",
      "mr_related",
      "note",
    ];
    ws.addRow(headerRow);
    let exRow1 = [
      "new",
      null,
      null,
      "TWH",
      "2020-10-02",
      "2020-10-06",
      "DSP",
      null,
      "JKT1",
      null,
      null,
      null,
      1,
      null,
      null,
    ];
    ws.addRow(exRow1);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), "MRA Uploader Template.xlsx");
  };

  exportFormatBulkPSAssignMR = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = ["id_bam_psa", "psa_id", "id_bam_mra", "mra_id"];
    ws.addRow(headerRow);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "PS SRN Assign MRA Migration Uploader Template.xlsx"
    );
  };

  exportFormatBulkMRMigration = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "id",
      "mra_sh_id",
      "mra_sh_created_on",
      "mra_sh_created_by",
      "activity_id",
      "project",
      "category",
      "eta",
      "etd",
      "deliver_by",
      "dismantle_by",
      "wh_destination",
      "activity_id_destination",
      "project_destination",
      "assignment_id",
      "mra_type",
      "mr_related",
      "note",
    ];
    ws.addRow(headerRow);
    let exRow1 = [
      "new",
      null,
      "2020-10-02",
      "test@email.com",
      null,
      null,
      "TWH",
      "2020-10-02",
      "2020-10-06",
      "DSP",
      null,
      "JKT1",
      null,
      null,
      null,
      1,
      null,
      null,
    ];
    ws.addRow(exRow1);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), "MRA Migration Uploader Template.xlsx");
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
                  MRA Bulk{" "}
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
                  Download MRA Format Bulk
                </Button>
                {this.state.userRole.findIndex((e) => e === "Admin") !== -1 && (
                  <Fragment>
                    <Button
                      style={{ marginRight: "8px", float: "right" }}
                      outline
                      color="info"
                      onClick={this.exportFormatBulkMRMigration}
                      size="sm"
                    >
                      <i
                        className="fa fa-download"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Download MRA Migration Format
                    </Button>
                    <Button
                      style={{ marginRight: "8px", float: "right" }}
                      outline
                      color="info"
                      onClick={this.exportFormatBulkPSAssignMR}
                      size="sm"
                    >
                      <i
                        className="fa fa-download"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Download PS SRN Assign MRA Migration Format
                    </Button>
                  </Fragment>
                )}
              </CardHeader>
              <CardBody className="card-UploadBoq">
                <Row>
                  <Col>
                    <input
                      type="file"
                      onChange={this.fileHandlerMRBulk.bind(this)}
                      style={{ padding: "10px", visiblity: "hidden" }}
                    />
                    <Button
                      color="success"
                      onClick={this.saveDataMRABulk}
                      style={{ float: "right" }}
                      disabled={
                        this.state.action_status === "failed" ||
                        this.state.rowsXLS.length === 0
                      }
                    >
                      {this.state.waiting_status === true
                        ? "loading.."
                        : "Save"}
                    </Button>
                  </Col>
                </Row>
                {this.state.userRole.findIndex((e) => e === "Admin") !== -1 && (
                  <Fragment>
                    <hr
                      style={{
                        borderStyle: "solid",
                        borderWidth: "0px 0px 1px 0px",
                        borderColor: " rgba(174,213,129 ,1)",
                        marginTop: "5px",
                      }}
                    ></hr>
                    <Row>
                      <Col>
                        <h6>MRA Migration SH Assign PS to MRA :</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <input
                          type="file"
                          onChange={this.fileHandlerMRBulk.bind(this)}
                          style={{ padding: "10px", visiblity: "hidden" }}
                        />
                        <Button
                          color="success"
                          onClick={this.saveDataPSAssignMRBulk}
                          style={{ float: "right" }}
                          disabled={
                            this.state.action_status === "failed" ||
                            this.state.rowsXLS.length === 0
                          }
                        >
                          {this.state.waiting_status === true
                            ? "loading.."
                            : "Save"}
                        </Button>
                      </Col>
                    </Row>
                    <hr
                      style={{
                        borderStyle: "solid",
                        borderWidth: "0px 0px 1px 0px",
                        borderColor: " rgba(174,213,129 ,1)",
                        marginTop: "5px",
                      }}
                    ></hr>
                    <Row>
                      <Col>
                        <h6>MRA Migration Status from SH :</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <input
                          type="file"
                          onChange={this.fileHandlerMRBulk.bind(this)}
                          style={{ padding: "10px", visiblity: "hidden" }}
                        />
                        <Button
                          color="success"
                          onClick={this.saveDataMRAStatusMigrationBulk}
                          style={{ float: "right" }}
                          disabled={
                            this.state.action_status === "failed" ||
                            this.state.rowsXLS.length === 0
                          }
                        >
                          {this.state.waiting_status === true
                            ? "loading.."
                            : "Save"}
                        </Button>
                      </Col>
                    </Row>
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
                        MRA UPLOADER PREVIEW
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
                {this.state.action_finish == true && (
                  <Button
                    color="info"
                    outline
                    size="sm"
                    onClick={this.exportFormatBulkPSAssignMRWithMessage}
                    style={{ float: "right", marginBottom: "10px" }}
                  >
                    Print Action Message
                  </Button>
                )}
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
                <Row>
                  <Col md="3">
                    <Table hover bordered responsive size="sm">
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "rgb(11, 72, 107)",
                            color: "white",
                          }}
                        >
                          <td colSpan="2">Category</td>
                        </tr>
                        <tr>
                          <th>Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>TWH</td>
                          <td>Site to Warehouse</td>
                        </tr>
                        <tr>
                          <td>TST</td>
                          <td>Site to Site</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md="3">
                    <Table hover bordered responsive size="sm">
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "rgb(11, 72, 107)",
                            color: "white",
                          }}
                        >
                          <td colSpan="2">MRA Type</td>
                        </tr>
                        <tr>
                          <th>Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Dismantle</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Return Excess</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Return Faulty</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Relocation</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col sm="3" lg="3">
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
                  <Col sm="3" lg="3">
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

export default connect(mapStateToProps)(MRDismantleBulk);
