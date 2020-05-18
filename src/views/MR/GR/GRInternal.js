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
import Select from "react-select";
import { saveAs } from "file-saver";
import Excel from "exceljs";
import { connect } from "react-redux";
import { Redirect, Route, Switch, Link, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import queryString from "query-string";

import ModalCreateNew from "../../components/ModalCreateNew";
import ModalDelete from "../../components/ModalDelete";

import "../MatStyle.css";

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

const DefaultNotif = React.lazy(() => import("../../DefaultView/DefaultNotif"));

const API_URL_XL = "https://api-dev.xl.pdb.e-dpm.com/xlpdbapi";
const usernameBAM = "adminbamidsuper";
const passwordBAM = "F760qbAg2sml";



class GRInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      filter_name: null,
      search: null,
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      selected_wh: null,
      total_data_PO: 0,
      pp_all: [],
      rowsXLS: [],
      data_array: [],
      action_status: null,
      action_message: null,
      all_data: [],
      wh_data: {},
      wh_id: null,
      wh_name: null,
      wh_manager: null,
      wh_address: null,
      wh_owner: null,
      data_PO: [],
      packageSelected: [],
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      modalMatStockForm: false,
      modalMatStockEdit: false,
      MatStockForm: new Array(6).fill(null),
      warehouse_selected: null,
      collapse: false,
      danger: false,
      activeItemName: "",
      activeItemId: null,
      createModal: false,
      selected_id: "",
      sortType: 0,
      sortField: "",
    };
    this.toggleMatStockForm = this.toggleMatStockForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterDebounce = debounce(this.changeFilterName, 500);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.downloadAll = this.downloadAll.bind(this);
    this.togglecreateModal = this.togglecreateModal.bind(this);
    this.resettogglecreateModal = this.resettogglecreateModal.bind(this);
    this.requestSort = this.requestSort.bind(this);
    this.handleChangeLimit = this.handleChangeLimit.bind(this);

  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  togglecreateModal() {
    this.setState({
      createModal: !this.state.createModal,
    });
  }

  resettogglecreateModal() {
    this.setState({
      rowsXLS: [],
    });
  }

  toggleAddNew() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleDelete(e) {
    const modalDelete = this.state.danger;
    if (modalDelete === false) {
      const _id = e.currentTarget.value;
      this.setState({
        danger: !this.state.danger,
        selected_id: _id,
      });
    } else {
      this.setState({
        danger: false,
      });
    }
    this.setState((prevState) => ({
      modalDelete: !prevState.modalDelete,
    }));
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  toggleEdit(e) {
    const modalMatStockEdit = this.state.modalMatStockEdit;
    if (modalMatStockEdit === false) {
      const value = e.currentTarget.value;
      const aEdit = this.state.all_data.find((e) => e.owner_id === value);
      let dataForm = this.state.MatStockForm;
      dataForm[0] = aEdit.sku_description;
      dataForm[1] = aEdit.serial_number;
      dataForm[2] = aEdit.project_name;
      dataForm[3] = aEdit.box_number;
      dataForm[4] = aEdit.condition;
      dataForm[5] = aEdit.notes;
      this.setState({ MatStockForm: dataForm });
    } else {
      this.setState({ MatStockForm: new Array(6).fill(null) });
    }
    this.setState((prevState) => ({
      modalMatStockEdit: !prevState.modalMatStockEdit,
    }));
  }

  toggleMatStockForm() {
    this.setState((prevState) => ({
      modalMatStockForm: !prevState.modalMatStockForm,
    }));
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
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE + url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
      });
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
      let respond = await axios.patch(process.env.REACT_APP_API_URL_NODE + url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
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
  }

  async deleteDataFromAPINODE(url) {
    try {
      let respond = await axios.delete(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
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
  }

  changeFilterName(value) {
    this.getWHStockList();
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

  getWHStockListNext() {
    this.toggleLoading();
    // let get_wh_id = new URLSearchParams(window.location.search).get("wh_id");
    // console.log("wh id ", get_wh_id);
    let getbyWH =
      '{"wh_id":"' +
      this.props.match.params.slug +
      '","transaction_type":"Inbound"}';
    this.getDatafromAPINODE(
      "/whStock/getWhStock?q=" +
        getbyWH +
        "&lmt=" +
        this.state.perPage +
        "&pg=" +
        this.state.activePage
    ).then((res) => {
      // console.log("all data ", res.data);
      if (res.data !== undefined) {
        this.setState({
          all_data: res.data.data,
          prevPage: this.state.activePage,
          total_dataParent: res.data.totalResults,
          selected_wh: this.props.match.params.slug,
        });
        this.toggleLoading();
      } else {
        this.setState({
          all_data: [],
          total_dataParent: 0,
          prevPage: this.state.activePage,
        });
        this.toggleLoading();
      }
    });
  }

  getWHManagementID() {
    // let _id = new URLSearchParams(window.location.search).get("_id");
    // let getbyWH = '{"wh_id":"' + this.props.match.params.slug + '"}';
    this.getDatafromAPINODE(
      '/whManagement/warehouse?q={"wh_id":"' +
        this.props.match.params.slug +
        '"}'
    ).then((res) => {
      // console.log("all data ", res.data);
      if (res.data !== undefined) {
        if (res.data.data !== undefined) {
          this.setState({ wh_data: res.data.data[0] });
        }
      } else {
        this.setState({ wh_data: [] });
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
    // console.log("rABS");
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
    this.getWHStockListNext();
    this.getWHManagementID();
    document.title = "Material Stock | BAM";
  }

  handleChangeChecklist(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const mrList = this.state.assignment_list;
    let dataMRChecked = this.state.data_asg_checked;
    if (isChecked === true) {
      const getMR = mrList.find((e) => e._id === item);
      dataMRChecked.push(getMR);
    } else {
      dataMRChecked = dataMRChecked.filter(function (e) {
        return e._id !== item;
      });
    }
    this.setState({ data_asg_checked: dataMRChecked });
    this.setState((prevState) => ({
      asg_checked: prevState.asg_checked.set(item, isChecked),
    }));
  }

  convertDateFormat(jsondate) {
    let date = new Date(jsondate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  }

  handleChangeChecklistAll(e) {
    const isChecked = e.target.checked;
    const mrList = this.state.assignment_all;
    let dataMRChecked = this.state.data_asg_checked;
    if (isChecked === true) {
      for (let i = 0; i < mrList.length; i++) {
        if (this.state.asg_checked.get(mrList[i]._id) !== true) {
          dataMRChecked.push(mrList[i]);
        }
        this.setState((prevState) => ({
          asg_checked: prevState.asg_checked.set(mrList[i]._id, true),
        }));
      }
      this.setState({
        data_asg_checked: dataMRChecked,
        asg_checked_all: isChecked,
      });
    } else {
      this.setState({ asg_checked: new Map(), data_asg_checked: [] });
      this.setState({ asg_checked_all: isChecked });
    }
  }

  handleChangeLimit(e) {
    let limitpg = e.currentTarget.value;
    let sortType = this.state.sortType;
    switch (sortType) {
      case 1:
        this.setState({ perPage: limitpg }, () => {
          this.getListSort();
        });
        break;
      case -1:
        this.setState({ perPage: limitpg }, () => {
          this.getListSort();
        });
        break;
      case 0:
        this.setState({ perPage: limitpg }, () => {
          this.getWHStockListNext();
        });
        break;
      default:
        // nothing
        break;
    }
  }

  handlePageChange(pageNumber) {
    let sortType = this.state.sortType;
    // console.log("page handle sort ", sortType);
    switch (sortType) {
      case 1:
        this.setState({ activePage: pageNumber }, () => {
          this.getListSort();
        });
        break;
      case -1:
        this.setState({ activePage: pageNumber }, () => {
          this.getListSort();
        });
        break;
      case 0:
        this.setState({ activePage: pageNumber }, () => {
          this.getWHStockListNext();
        });
        break;
      default:
        // nothing
        break;
    }
  }

  saveMatStockWHBulk = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    const BulkXLSX = this.state.rowsXLS;
    // const BulkData = await this.getMatStockFormat(BulkXLSX);
    const res = await this.postDatatoAPINODE("/whStock/createWhStock", {
      stockData: BulkXLSX,
    });
    // console.log('res bulk ', res.error.message);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" }, () => {
        this.toggleLoading();
      });
    }
  };

  saveTruncateBulk = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    const BulkXLSX = this.state.rowsXLS;
    // const BulkData = await this.getMatStockFormat(BulkXLSX);
    console.log("xlsx data", JSON.stringify(BulkXLSX));
    const res = await this.postDatatoAPINODE("/whStock/createWhStockTruncate", {
      stockData: BulkXLSX,
    });
    console.log("res bulk ", res);
    if (res.data !== undefined) {
      this.setState({ action_status: "success", rowsXLS: [] });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed", rowsXLS: [] }, () => {
        this.toggleLoading();
      });
    }
  };

  handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.MatStockForm;
    dataForm[parseInt(index)] = value;
    this.setState({ MatStockForm: dataForm });
  }

  SearchFilter = (e) => {
    let keyword = e.target.value;
    this.setState({ search: keyword });
  };

  async saveUpdate() {
    let respondSaveEdit = undefined;
    const dataPPEdit = this.state.MatStockForm;
    const dataPP = this.state.all_data.find(
      (e) => e.owner_id === dataPPEdit[0]
    );
    const objData = this.state.all_data.find((e) => e._id);
    let pp = {
      sku_description: dataPPEdit[0],
      serial_number: dataPPEdit[1],
      project_name: dataPPEdit[2],
      box_number: dataPPEdit[3],
      condition: dataPPEdit[4],
      notes: dataPPEdit[5],
      id_project_doc: objData.id_project_doc,
      arrival_date: objData.arrival_date,
      po_number: objData.po_number,
      owner_id: objData.owner_id,
      sku: objData.sku,
    };
    console.log("patch data ", pp);
    this.toggleLoading();
    this.toggleEdit();
    let patchData = await this.patchDatatoAPINODE(
      "/whStock/updateOneWhStockwithDelete/" + objData._id,
      { data: [pp] }
    );
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

  async saveNew() {
    this.toggleMatStockForm();
    this.toggleLoading();
    let poData = [];
    let respondSaveNew = undefined;
    const dataPPEdit = this.state.MatStockForm;
    let pp = {
      owner_id: dataPPEdit[0],
      po_number: dataPPEdit[1],
      arrival_date: dataPPEdit[2],
      project_name: dataPPEdit[3],
      sku: dataPPEdit[4],
      sku_description: dataPPEdit[5],
      qty: dataPPEdit[6],
    };
    poData.push(pp);
    let postData = await this.postDatatoAPINODE("/whStock/createOneWhStockp", {
      stockData: pp,
    }).then((res) => {
      console.log("res save one ", res);
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

  async downloadAll() {
    let download_all = [];
    let getAll_nonpage = await this.getDatafromAPINODE(
      "/whStock/getWhStock?noPg=1"
    );
    if (getAll_nonpage.data !== undefined) {
      download_all = getAll_nonpage.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "Owner ID",
      "WH ID",
      "PO Number",
      "Project Name",
      "Arrival Date",
      "SKU",
      "SKU Desc",
      "Qty",
      "Aging",
      "Serial Number",
      "Box Number",
      "Condition",
      "Notes",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < download_all.length; i++) {
      let list = download_all[i];
      ws.addRow([
        list.owner_id,
        this.state.selected_wh,
        list.po_number,
        list.project_name,
        list.sku,
        list.sku_description,
        list.arrival_date,
        list.qty,
        list.ageing,
        list.serial_number,
        list.box_number,
        list.condition,
        list.notes,
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "All Material Stock.xlsx");
  }

  DeleteData = async () => {
    const objData = this.state.selected_id;
    this.toggleLoading();
    this.toggleDelete();
    const DelData = this.deleteDataFromAPINODE(
      "/whStock/deleteWhStock/" + objData
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.getWHStockListNext();
        this.toggleLoading();
      } else {
        this.setState({ action_status: "failed" }, () => {
          this.toggleLoading();
        });
      }
    });
  };

  exportMatStatus = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow([
      "owner_id",
      "po_number",
      "arrival_date",
      "project_name",
      "sku",
      "qty",
      "wh_id",
      "serial_number",
      "box_number",
      "condition",
      "notes",
      "transaction_type",
    ]);
    ws.addRow([
      "Jabo",
      "PO0001",
      "2020-04-17",
      "XL BAM DEMO 2021",
      "1",
      100,
      this.state.selected_wh,
      ,
      "serial_number",
      "box_number",
      "condition",
      "notes",
      "Inbound",
    ]);
    ws.addRow([
      "CJ",
      "PO0001",
      "2020-04-17",
      "XL BAM DEMO 2021",
      "1",
      100,
      this.state.selected_wh,
      ,
      "serial_number",
      "box_number",
      "condition",
      "notes",
      "Inbound",
    ]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), "GR Internal Template.xlsx");
  };

  getListSort() {
    this.toggleLoading();
    let getbyWH =
      '{"wh_id":"' +
      this.props.match.params.slug +
      '","transaction_type":"Inbound"}';
    this.getDatafromAPINODE(
      "/whStock/getWhStock?srt=" +
        this.state.sortField +
        ":" +
        this.state.sortType +
        "&q=" +
        getbyWH +
        "&lmt=" +
        this.state.perPage +
        "&pg=" +
        this.state.activePage
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({
          all_data: res.data.data,
          prevPage: this.state.activePage,
          total_dataParent: res.data.totalResults,
          // sortType: -1
        });
        this.toggleLoading();
      } else {
        this.setState({
          all_data: [],
          total_dataParent: 0,
          prevPage: this.state.activePage,
        });
        this.toggleLoading();
      }
    });
  }

  requestSort(e) {
    let sortType = this.state.sortType;
    // console.log('sortType atas', this.state.sortType)
    let sort = e;
    const ascending = 1;
    const descending = -1;
    if (sortType === -1) {
      this.setState({ sortType: ascending, sortField: sort }, () => {
        // console.log('sortType 1 ', this.state.sortType)
        this.getListSort();
      });
    } else {
      this.setState({ sortType: descending, sortField: sort }, () => {
        // console.log('sortType -1 ', this.state.sortType)
        this.getListSort();
      });
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
                  {" "}
                  GR Internal {this.state.wh_data.wh_id} -{" "}
                  {this.state.wh_data.wh_name}{" "}
                </span>
                <div
                  className="card-header-actions"
                  style={{ display: "inline-flex" }}
                >
                  <div>
                    {/* Open modal for create new */}
                    {this.state.userRole.includes("Flow-PublicInternal") !==
                    true ? (
                      <div>
                        <Button
                          block
                          color="success"
                          onClick={this.togglecreateModal}
                          // id="toggleCollapse1"
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
                  &nbsp;&nbsp;&nbsp;
                  <div>
                    <Button
                      block
                      color="info"
                      onClick={this.toggleAddNew}
                      id="toggleCollapse1"
                    >
                      <i className="icon-info" aria-hidden="true">
                        {" "}
                        &nbsp;{" "}
                      </i>{" "}
                      Info
                    </Button>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div style={{ marginRight: "10px" }}>
                    <Dropdown
                      isOpen={this.state.dropdownOpen[1]}
                      toggle={() => {
                        this.toggle(1);
                      }}
                    >
                      <DropdownToggle block color="ghost-warning">
                        <i className="fa fa-download" aria-hidden="true">
                          {" "}
                          &nbsp;{" "}
                        </i>{" "}
                        Export
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportMatStatus}>
                          {" "}
                          GR Template
                        </DropdownItem>
                        <DropdownItem onClick={this.downloadAll}>
                          > Download All{" "}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
                            <td><b>Warehouse Name</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.wh_name}</td>
                          </tr>
                          <tr>
                            <td><b>Warehouse ID</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.wh_id}</td>
                          </tr>
                          <tr>
                            <td><b>Warehouse Manager</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.wh_manager}</td>
                          </tr>
                          <tr>
                            <td><b>Warehouse Address</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.address}</td>
                          </tr>
                          <tr>
                            <td><b>Latitude</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.latitude}</td>
                          </tr>
                          <tr>
                            <td><b>Longitude</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.longitude}</td>
                          </tr>
                          <tr>
                            <td><b>Warehouse Owner</b></td>
                            <td>:</td>
                            <td>{this.state.wh_data.owner}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          float: "left",
                          margin: "5px",
                          display: "inline-flex",
                        }}
                      >
                        <Input
                          type="select"
                          name="select"
                          id="selectLimit"
                          onChange={this.handleChangeLimit}
                        >
                          <option value={"10"}>10</option>
                          <option value={"25"}>25</option>
                          <option value={"50"}>50</option>
                          <option value={"100"}>100</option>
                          <option value={"noPg=1"}>All</option>
                        </Input>
                      </div>
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
                          placeholder="Search"
                          onChange={(e) => this.SearchFilter(e)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="divtable">
                      <Table responsive size="sm">
                        <thead
                          style={{ backgroundColor: "#73818f" }}
                          className="fixed"
                        >
                          <tr align="center">
                            <th>Owner ID</th>
                            <th>WH ID</th>
                            <th>PO Number</th>
                            <th>Project Name</th>
                            <th>Arrival Date</th>
                            <th>SKU</th>
                            <th>SKU Desc</th>
                            <th>Qty</th>
                            <th>Aging</th>
                            <th>Serial Number</th>
                            <th>Box Number</th>
                            <th>Condition</th>
                            <th>Notes</th>
                            <th>Transaction Type</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.all_data
                            .filter((e) => {
                              if (this.state.search === null) {
                                return e;
                              } else if (
                                e.owner_id
                                  .toLowerCase()
                                  .includes(this.state.search.toLowerCase()) ||
                                e.po_number
                                  .toLowerCase()
                                  .includes(this.state.search.toLowerCase()) ||
                                e.project_name
                                  .toLowerCase()
                                  .includes(this.state.search.toLowerCase())
                                //   ||
                                // e.serial_number
                                //   .toLowerCase()
                                //   .includes(this.state.search.toLowerCase()) ||
                                // e.box_number
                                //   .toLowerCase()
                                //   .includes(this.state.search.toLowerCase())
                              ) {
                                return e;
                              }
                            })
                            .map((e) => (
                              <React.Fragment key={e._id + "frag"}>
                                <tr
                                  style={{ backgroundColor: "#d3d9e7" }}
                                  className="fixbody"
                                  key={e._id}
                                >
                                  <td style={{ textAlign: "center" }}>
                                    {e.owner_id}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.wh_id}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.po_number}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.project_name}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {this.convertDateFormat(e.arrival_date)}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.sku}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.sku_description}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.qty}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.ageing}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.serial_number}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.box_number}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.condition}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.notes}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {e.transaction_type}
                                  </td>
                                  <td>
                                    <Button
                                      size="sm"
                                      color="danger"
                                      value={e._id}
                                      onClick={this.toggleDelete}
                                      title="Delete"
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
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
                      totalItemsCount={this.state.total_dataParent}
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

        {/* Modal Edit PP */}
        <Modal
          isOpen={this.state.modalMatStockEdit}
          toggle={this.toggleEdit}
          className="modal--form"
        >
          <ModalHeader>Form Update Material Stock</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="sku_description">SKU Description</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.MatStockForm[0]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="serial_number">Serial Number</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder=""
                    value={this.state.MatStockForm[1]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="project_name">Project Name</Label>
                  <Input
                    type="datetime-local"
                    placeholder=""
                    value={this.state.MatStockForm[2]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="box_number">Box Number</Label>
                  <Input
                    type="text"
                    name="3"
                    placeholder=""
                    value={this.state.MatStockForm[3]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    type="text"
                    min="0"
                    name="4"
                    placeholder=""
                    value={this.state.MatStockForm[4]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    type="number"
                    min="0"
                    name="6"
                    placeholder=""
                    value={this.state.MatStockForm[5]}
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
        {/*  Modal Edit PP*/}

        {/* Modal create New */}
        <ModalCreateNew
          isOpen={this.state.createModal}
          toggle={this.togglecreateModal}
          className={this.props.className}
          onClosed={this.resettogglecreateModal}
          title="Create New GR"
        >
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
          <ModalFooter>
            {/* <Button
              block
              color="link"
              className="btn-pill"
              onClick={this.exportMatStatus}
              size="sm"
            >
              Download Template
            </Button>{" "} */}
            <Button
              block
              color="success"
              className="btn-pill"
              disabled={this.state.rowsXLS.length === 0}
              onClick={this.saveMatStockWHBulk}
              size="sm"
            >
              Save
            </Button>{" "}
            <Button
              block
              color="secondary"
              className="btn-pill"
              disabled={this.state.rowsXLS.length === 0}
              onClick={this.saveTruncateBulk}
              size="sm"
            >
              Truncate
            </Button>
          </ModalFooter>
        </ModalCreateNew>

        {/* Modal confirmation delete */}
        <ModalDelete
          isOpen={this.state.danger}
          toggle={this.toggleDelete}
          className={"modal-danger " + this.props.className}
          title="Delete GR"
        >
          <Button color="danger" onClick={this.DeleteData}>
            Delete
          </Button>
          <Button color="secondary" onClick={this.toggleDelete}>
            Cancel
          </Button>
        </ModalDelete>

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

export default connect(mapStateToProps)(GRInternal);
