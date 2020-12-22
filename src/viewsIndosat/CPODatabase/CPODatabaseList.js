import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Collapse,
} from "reactstrap";
import { Col, FormGroup, Label, Row, Table, Input } from "reactstrap";
import { ExcelRenderer } from "react-excel-renderer";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import "./poStyle.css";
import Select from "react-select";
import { saveAs } from "file-saver";
import Excel from "exceljs";
import { connect } from "react-redux";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import * as XLSX from "xlsx";

import { getDatafromAPINODEFile } from "../../helper/asyncFunction";

import {
  convertDateFormatfull,
  convertDateFormat,
} from "../../helper/basicFunction";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  value,
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={value}
    className="checkmark-dash"
  />
);

const DefaultNotif = React.lazy(() =>
  import("../../viewsIndosat/DefaultView/DefaultNotif")
);

const API_URL_ISAT = "https://api-dev.isat.pdb.e-dpm.com/isatapi";
const usernameISAT = "adminbamidsuper";
const passwordISAT = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class CPODatabase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      filter_name: null,
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      total_data_PO: 0,
      rowsXLS: [],
      cpo_array: [],
      action_status: null,
      action_message: null,
      po_op_data: [],
      data_PO: [],
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      DataForm: new Array(7).fill(false),
      modalPOForm: false,
      modalEdit: false,
      POForm: new Array(5).fill(null),
      collapse: false,
      selected_id: "",
      inputan_file: null,
      list_project: [],
      modal_detail: false,
    };
    this.togglePOForm = this.togglePOForm.bind(this);
    this.togglePODetail = this.togglePODetail.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterDebounce = debounce(this.changeFilterName, 500);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.saveNewPO = this.saveNewPO.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.handleInputFile = this.handleInputFile.bind(this);
    this.exportPRT = this.exportPRT.bind(this);
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggleAddNew() {
    this.setState({ collapse: !this.state.collapse });
  }

  async getDatafromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
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
        // console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      // console.log("respond Post Data err", err);
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
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data err", err);
      return respond;
    }
  }

  async getDatafromAPIISAT(url) {
    try {
      let respond = await axios.get(API_URL_ISAT + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameISAT,
          password: passwordISAT,
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

  async postDataFormData(url, form) {
    for (var value of form.values()) {
      console.log("test api", value);
    }
    try {
      let respond = await axios.post(
        process.env.REACT_APP_API_URL_NODE + url,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.state.tokenUser,
          },
        }
      );
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Form data", respond);
      }
      console.log("respond Post Form data", respond);
      return respond;
    } catch (err) {
      let respond = undefined;
      console.log("respond Post Form data", err);
      return respond;
    }
  }

  changeFilterName(value) {
    this.getPODataList();
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if (value.length === 0) {
      value = null;
    }
    this.setState({ filter_name: value }, () => {
      this.changeFilterDebounce(value);
    });
  };

  getPODataList() {
    this.getDatafromAPINODE(
      "/cpodb/getCpoDb?srt=_id:-1&lmt=" +
        this.state.perPage +
        "&pg=" +
        this.state.activePage
    ).then((res) => {
      // console.log('all cpoDB', res.data)
      if (res.data !== undefined) {
        this.setState({
          po_op_data: res.data.data,
          prevPage: this.state.activePage,
          total_data_PO: res.data.totalResults,
        });
      } else {
        this.setState({
          po_op_data: [],
          total_data_PO: 0,
          prevPage: this.state.activePage,
        });
      }
    });
  }

  isSameValue(element, value) {
    //function for FindIndex
    return (
      this.checkValuetoString(element).toLowerCase() ===
      this.checkValuetoString(value).toLowerCase()
    );
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex((e) => this.isSameValue(e, value));
  }

  checkValue(props) {
    // if value undefined return null
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    // if value undefined return ""
    if (typeof props === "undefined" || props === null) {
      return "";
    } else {
      return props;
    }
  }

  checkValueReturn(value1, value2) {
    // if value undefined or null return Value2
    if (typeof value1 !== "undefined" && value1 !== null) {
      return value1;
    } else {
      return value2;
    }
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
      this.ArrayEmptytoNull(data);
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
  }

  componentDidMount() {
    this.getPODataList();
    this.getDataProject();
    document.title = "CPO Database | BAM";
  }

  getDataProject() {
    this.getDatafromAPIISAT("/project_sorted_non_page").then((resProject) => {
      if (resProject.data !== undefined) {
        this.setState({ list_project: resProject.data._items });
      }
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPODataList();
    });
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  togglePOForm() {
    this.setState((prevState) => ({
      modalPOForm: !prevState.modalPOForm,
    }));
  }

  togglePODetail(e) {
    const modalDetail = this.state.modal_detail;
    if (modalDetail === false) {
      const dataForm = this.state.POForm;
      const value = e.currentTarget.value;
      const aEdit = this.state.po_op_data.find((e) => e._id === value);
      dataForm[0] = aEdit.po_number;
      dataForm[1] = aEdit.date;
      dataForm[2] = aEdit.revision_number;
      dataForm[3] = aEdit.contract_number;
      dataForm[4] = aEdit.pr_sc_number;
      dataForm[5] = aEdit.delivery_term_location;
      dataForm[6] = aEdit.expired_date;
      dataForm[7] = aEdit.id_project_doc;
      dataForm[8] = aEdit.idr_price;
      dataForm[9] = aEdit.exchange_rate;
      dataForm[10] = aEdit.usd_price;
      dataForm[11] = aEdit.description;
      dataForm[12] = aEdit.account_manager;
      dataForm[13] = aEdit.remark;
      dataForm[14] = aEdit.po_revision;
      dataForm[15] = aEdit.project_name;
      dataForm[16] = aEdit.project_child_name;
      dataForm[17] = aEdit.consignee;
      this.setState({ POForm: dataForm });
    }
    this.setState((prevState) => ({
      modal_detail: !prevState.modal_detail,
    }));
  }

  toggleEdit(e) {
    const modalEdit = this.state.modalEdit;
    if (modalEdit === false) {
      const value = e.currentTarget.value;
      const aEdit = this.state.po_op_data.find((e) => e._id === value);
      // console.log('aEdit ',aEdit);
      const dataForm = this.state.DataForm;
      // console.log('dataForm ',dataForm);
      dataForm[0] = aEdit.po_number;
      dataForm[1] = convertDateFormat(aEdit.date);
      dataForm[2] = aEdit.currency;
      dataForm[3] = aEdit.payment_terms;
      dataForm[4] = aEdit.shipping_terms;
      dataForm[5] = aEdit.contract;
      dataForm[6] = aEdit.contact;
      this.setState({ DataForm: dataForm, selected_id: value });
      // console.log('state dataForm ',this.state.DataForm);
    } else {
      this.setState({ DataForm: new Array(7).fill(null) });
    }
    this.setState((prevState) => ({
      modalEdit: !prevState.modalEdit,
    }));
  }

  handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.POForm;
    dataForm[parseInt(index)] = value;
    if (parseInt(index) === 7) {
      const indexDrop = e.target.selectedIndex;
      const text = e.target[indexDrop].text;
      dataForm[7] = value;
      dataForm[15] = text;
    }
    if (parseInt(index) === 8 || parseInt(index) === 9) {
      dataForm[10] = parseFloat(dataForm[8]) / parseFloat(dataForm[9]);
    }
    this.setState({ DataForm: dataForm });
  }

  async saveUpdate() {
    const dataPPEdit = this.state.DataForm;
    const objData = this.state.selected_id;
    // console.log('obj data ', objData);
    let pp = {
      po_number: dataPPEdit[0],
      date: dataPPEdit[1],
      currency: dataPPEdit[2],
      payment_terms: dataPPEdit[3],
      shipping_terms: dataPPEdit[4],
      contract: dataPPEdit[5],
      contact: dataPPEdit[6],
    };
    this.toggleLoading();
    this.toggleEdit();
    let patchData = await this.patchDatatoAPINODE(
      "/cpodb/UpdateOneCpoDb/" + objData,
      { data: pp }
    );
    console.log("patch data ", pp);
    if (patchData === undefined) {
      patchData = {};
      patchData["data"] = undefined;
    }
    if (patchData.data !== undefined) {
      this.setState({ action_status: "success" }, () => {
        this.toggleLoading();
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      });
    } else {
      this.toggleLoading();
      this.setState({ action_status: "failed" });
    }
  }

  async getCPOFormat(dataImport) {
    const dataHeader = dataImport[0];
    const onlyParent = dataImport
      .map((e) => e)
      .filter((e) =>
        this.checkValuetoString(e[this.getIndex(dataHeader, "po_number")])
      );
    let cpo_array = [];
    if (onlyParent !== undefined && onlyParent.length !== 0) {
      for (let i = 1; i < onlyParent.length; i++) {
        const cpo = {
          po_number: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "po_number")]
          ),
          date: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "date")]
          ),
          currency: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "currency")]
          ),
          payment_terms: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "payment_terms")]
          ),
          shipping_terms: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "shipping_terms")]
          ),
          contract: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "contract")]
          ),
          contact: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "contact")]
          ),
        };
        if (cpo.po_number !== undefined && cpo.po_number !== null) {
          cpo["po_number"] = cpo.po_number.toString();
        }
        if (cpo.year !== undefined && cpo.year !== null) {
          cpo["po_year"] = cpo.year.toString();
        }
        if (cpo.currency !== undefined && cpo.currency !== null) {
          cpo["currency"] = cpo.currency.toString();
        }
        cpo_array.push(cpo);
      }
      // console.log(JSON.stringify(cpo_array));
      return cpo_array;
    } else {
      this.setState(
        { action_status: "failed", action_message: "Please check your format" },
        () => {
          this.toggleLoading();
        }
      );
    }
  }

  saveCPOBulk = async () => {
    this.toggleLoading();
    const cpobulkXLS = this.state.rowsXLS;
    const cpoData = await this.getCPOFormat(cpobulkXLS);
    const res = await this.postDatatoAPINODE("/cpodb/createCpoDb", {
      poData: cpobulkXLS,
    });
    if (res.data !== undefined) {
      this.setState({ action_status: "success", action_message: null });
      this.toggleLoading();
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
      this.toggleLoading();
    }
  };

  handleInputFile = (e) => {
    let fileUpload = null;
    if (
      e !== undefined &&
      e.target !== undefined &&
      e.target.files !== undefined
    ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload });
  };

  async saveNewPO() {
    this.togglePOForm();
    this.toggleLoading();
    let poData = [];
    let respondSaveNew = undefined;
    const dataPPNew = this.state.POForm;
    const ppcountID = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(6, "0");
    let po = {
      byForm: true,
      dataForm: {
        po_number: dataPPNew[0],
        date: dataPPNew[1],
        revision_number: dataPPNew[2],
        contract_number: dataPPNew[3],
        pr_sc_number: dataPPNew[4],
        delivery_term_location: dataPPNew[5],
        expired_date: dataPPNew[6],
        id_project_doc: dataPPNew[7],
        project_name: dataPPNew[15],
        project_child_name: dataPPNew[16],
        consignee: dataPPNew[17],
        idr_price: dataPPNew[8],
        exchange_rate: dataPPNew[9],
        usd_price: dataPPNew[10],
        description: dataPPNew[11],
        account_manager: dataPPNew[12],
        remark: dataPPNew[13],
        po_delivery_date: dataPPNew[1],
        po_revision: dataPPNew[14],
      },
      fileDocument: this.state.inputan_file,
    };
    const dataForm = new FormData();
    await dataForm.append("byForm", true);
    await dataForm.append("dataForm", JSON.stringify(po.dataForm));
    await dataForm.append("fileDocument", this.state.inputan_file);

    // poData.push(pp);
    let postData = await this.postDataFormData(
      "/cpodb/createCpoDbIsat",
      dataForm
    ).then((res) => {
      if (res.data !== undefined) {
        this.toggleLoading();
      } else {
        this.setState({
          action_status: "failed",
          action_message: res.response.data.error,
        });
        this.toggleLoading();
      }
    });
  }

  numToSSColumn(num) {
    var s = "",
      t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = ((num - t) / 26) | 0;
    }
    return s || undefined;
  }

  exportFormatCPO_level1 = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow([
      "po_number",
      "date",
      "currency",
      "payment_terms",
      "shipping_terms",
      "contract",
      "contact",
    ]);
    ws.addRow([
      "PO0001",
      "2020-02-21",
      "idr",
      7030,
      "DDP",
      "103-EID RAN 2020",
      "lale@gmail.com",
    ]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), "CPO Level 1 Template.xlsx");
  };

  async exportPRT(_id) {
    const data_po = this.state.po_op_data.find((po) => po._id === _id);
    const resFile = await getDatafromAPINODEFile(
      "/cpodb/getCpoDbDocument/" + _id + "?fileId=" + data_po.documents[0]._id,
      this.props.dataLogin.token,
      data_po.documents[0].mime_type
    );
    if (resFile !== undefined) {
      saveAs(
        new Blob([resFile.data], { type: data_po.documents[0].mime_type }),
        data_po.documents[0].file_name
      );
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: "8px", position: "absolute" }}>
                  CPO Database
                </span>
                <div
                  className="card-header-actions"
                  style={{ display: "inline-flex" }}
                >
                  {/*}<div style={{ marginRight: "10px" }}>
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                      <DropdownToggle caret color="light">
                        Download Template
                        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportFormatCPO_level1}> CPO Level 1 Template</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>*/}
                  <div>
                    {this.state.userRole.includes("Flow-PublicInternal") !==
                    true ? (
                      <div>
                        <Button
                          block
                          color="success"
                          onClick={this.togglePOForm}
                          id="toggleCollapse1"
                        >
                          <i className="fa fa-plus-square" aria-hidden="true">
                            {" "}
                            &nbsp;{" "}
                          </i>{" "}
                          New
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </CardHeader>
              <Collapse
                isOpen={this.state.collapse}
                onEntering={this.onEntering}
                onEntered={this.onEntered}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <Card style={{ margin: "10px 10px 5px 10px" }}>
                  <CardBody>
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>Upload File</td>
                            <td>:</td>
                            <td>
                              <input
                                type="file"
                                onChange={this.fileHandlerMaterial.bind(this)}
                                style={{ padding: "10px", visiblity: "hidden" }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="success"
                      disabled={this.state.rowsXLS.length === 0}
                      onClick={this.saveCPOBulk}
                    >
                      {" "}
                      <i className="fa fa-save" aria-hidden="true">
                        {" "}
                      </i>{" "}
                      &nbsp;SAVE{" "}
                    </Button>
                    {/* <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button> */}
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: "10px" }}>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        CPO List
                      </span>
                      <div
                        style={{
                          float: "right",
                          margin: "5px",
                          display: "inline-flex",
                        }}
                      >
                        <input
                          className="search-box-material"
                          type="text"
                          name="filter"
                          placeholder="Search CPO"
                          onChange={this.handleChangeFilter}
                          value={this.state.filter_name}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="divtable">
                      <Table hover bordered responsive size="sm" width="100%">
                        <thead
                          style={{ backgroundColor: "#73818f" }}
                          className="fixed-cpo"
                        >
                          <tr align="center">
                            <th style={{ minWidth: "150px" }}>PO Number</th>
                            <th>Date</th>
                            <th>Contract Number</th>
                            <th>Delivery Terms Loc</th>
                            <th>PR SC Number</th>
                            <th>Rev. Number</th>
                            <th>Creator</th>
                            <th colSpan="2"></th>
                            {/* <th></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.po_op_data.map((po) => (
                            <React.Fragment key={po._id + "frag"}>
                              <tr
                                style={{ backgroundColor: "#d3d9e7" }}
                                className="fixbody"
                                key={po._id}
                              >
                                <td style={{ textAlign: "center" }}>
                                  {po.po_number}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {convertDateFormat(po.date)}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {po.contract_number}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {po.delivery_term_location}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {po.pr_sc_number}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {po.revision_number}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {po.creator[0].email}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => this.exportPRT(po._id)}
                                    style={{
                                      marginRight: "10px",
                                      fontSize: "9px",
                                    }}
                                  >
                                    {" "}
                                    <i
                                      className="fa fa-download"
                                      aria-hidden="true"
                                    >
                                      &nbsp;
                                    </i>{" "}
                                    PO File
                                  </Button>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <Button
                                    size="sm"
                                    color="secondary"
                                    value={po._id}
                                    onClick={this.togglePODetail}
                                    title="Edit"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.state.total_data_PO}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal New PO */}
        <Modal
          isOpen={this.state.modalPOForm}
          toggle={this.togglePOForm}
          className="modal--form-po modal--form modal-lg"
        >
          <ModalHeader>Form CPO</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.POForm[0]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">PO Delivery Date</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder="YYYY-MM-DD"
                    value={this.state.POForm[1]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency">Revision Number</Label>
                  <Input
                    type="text"
                    name="2"
                    placeholder=""
                    value={this.state.POForm[2]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Contact Number</Label>
                  <Input
                    type="text"
                    name="3"
                    value={this.state.POForm[3]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">PR SC Number</Label>
                  <Input
                    type="text"
                    name="4"
                    value={this.state.POForm[4]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Delivery Term Loc</Label>
                  <Input
                    type="text"
                    name="5"
                    value={this.state.POForm[5]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">Expired Date</Label>
                  <Input
                    type="text"
                    name="6"
                    placeholder="YYYY-MM-DD"
                    value={this.state.POForm[6]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Account Manager</Label>
                  <Input
                    type="text"
                    name="12"
                    value={this.state.POForm[12]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="number_of_sites">File</Label>
                  <input
                    type="file"
                    style={{
                      margin: "10px 10px 5px 20px",
                      visiblity: "hidden",
                    }}
                    onChange={this.handleInputFile}
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="po_number">Project</Label>
                  <Input
                    type="select"
                    name="7"
                    onChange={this.handleChangeForm}
                    value={this.state.POForm[7]}
                  >
                    <option value="">Select Project</option>
                    {this.state.list_project.map((lp) => (
                      <option value={lp._id}>{lp.Project}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Project PO</Label>
                  <Input
                    type="text"
                    name="16"
                    value={this.state.POForm[16]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Consignee</Label>
                  <Input
                    type="text"
                    name="17"
                    value={this.state.POForm[17]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">IDR Price</Label>
                  <Input
                    type="number"
                    name="8"
                    placeholder=""
                    value={this.state.POForm[8]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency">Exchange Rate</Label>
                  <Input
                    type="number"
                    name="9"
                    placeholder=""
                    value={this.state.POForm[9]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">USD Price</Label>
                  <Input
                    type="number"
                    name="10"
                    value={this.state.POForm[10]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Description</Label>
                  <Input
                    type="text"
                    name="11"
                    value={this.state.POForm[11]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">Remark</Label>
                  <Input
                    type="textarea"
                    name="13"
                    placeholder=""
                    value={this.state.POForm[13]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="number_of_sites">PO Revision</Label>
                  <Input
                    type="text"
                    name="14"
                    value={this.state.POForm[14]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNewPO}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PO*/}

        {/* Modal Detail PO */}
        <Modal
          isOpen={this.state.modal_detail}
          toggle={this.togglePODetail}
          className="modal--form-po modal--form modal-lg"
        >
          <ModalHeader>Detail PO</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.POForm[0]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">PO Delivery Date</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder="YYYY-MM-DD"
                    value={this.state.POForm[1]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency">Revision Number</Label>
                  <Input
                    type="text"
                    name="2"
                    placeholder=""
                    value={this.state.POForm[2]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Contact Number</Label>
                  <Input
                    type="text"
                    name="3"
                    value={this.state.POForm[3]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">PR SC Number</Label>
                  <Input
                    type="text"
                    name="4"
                    value={this.state.POForm[4]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Delivery Term Loc</Label>
                  <Input
                    type="text"
                    name="5"
                    value={this.state.POForm[5]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">Expired Date</Label>
                  <Input
                    type="text"
                    name="6"
                    placeholder="YYYY-MM-DD"
                    value={this.state.POForm[6]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Account Manager</Label>
                  <Input
                    type="text"
                    name="12"
                    value={this.state.POForm[12]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="po_number">Project</Label>
                  <Input
                    type="select"
                    name="7"
                    onChange={this.handleChangeForm}
                    value={this.state.POForm[7]}
                    readOnly
                  >
                    <option value="">Select Project</option>
                    {this.state.list_project.map((lp) => (
                      <option value={lp._id}>{lp.Project}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Project PO</Label>
                  <Input
                    type="text"
                    name="16"
                    value={this.state.POForm[16]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Consignee</Label>
                  <Input
                    type="text"
                    name="17"
                    value={this.state.POForm[17]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">IDR Price</Label>
                  <Input
                    type="number"
                    name="8"
                    placeholder=""
                    value={this.state.POForm[8]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency">Exchange Rate</Label>
                  <Input
                    type="number"
                    name="9"
                    placeholder=""
                    value={this.state.POForm[9]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">USD Price</Label>
                  <Input
                    type="number"
                    name="10"
                    value={this.state.POForm[10]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value">Description</Label>
                  <Input
                    type="text"
                    name="11"
                    value={this.state.POForm[11]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year">Remark</Label>
                  <Input
                    type="textarea"
                    name="13"
                    placeholder=""
                    value={this.state.POForm[13]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="number_of_sites">PO Revision</Label>
                  <Input
                    type="text"
                    name="14"
                    value={this.state.POForm[14]}
                    onChange={this.handleChangeForm}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {/* }<Button color="success" onClick={this.saveNewPO}>Submit</Button> */}
          </ModalFooter>
        </Modal>
        {/*  Modal Detail PO*/}

        {/* Modal Edit PP */}
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          className="modal--form modal-lg"
        >
          <ModalHeader>Form Update CPO Database</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.DataForm[0]}
                    disabled
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="data">Date</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder=""
                    value={this.state.DataForm[1]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    type="text"
                    name="2"
                    placeholder=""
                    value={this.state.DataForm[2]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="payment_terms">Payment Terms</Label>
                  <Input
                    type="text"
                    name="3"
                    placeholder=""
                    value={this.state.DataForm[3]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="shipping_terms">Shipping Terms</Label>
                  <Input
                    type="text"
                    name="4"
                    placeholder=""
                    value={this.state.DataForm[4]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="contract">Contract</Label>
                  <Input
                    type="text"
                    name="5"
                    placeholder=""
                    value={this.state.DataForm[5]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    type="text"
                    name="6"
                    placeholder=""
                    value={this.state.DataForm[6]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveUpdate}>
              Update
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal Loading */}
        <Modal
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}
        >
          <ModalBody>
            <div style={{ textAlign: "center" }}>
              <div className="lds-ring">
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

export default connect(mapStateToProps)(CPODatabase);
