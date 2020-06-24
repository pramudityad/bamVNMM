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
import { Col, FormGroup, Label, Row, Table, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { ExcelRenderer } from "react-excel-renderer";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Select from "react-select";
import { saveAs } from "file-saver";
import Excel from "exceljs";
import { connect } from "react-redux";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import * as XLSX from "xlsx";
import {convertDateFormat, getDateonly} from '../../helper/basicFunction'
import "./CRcss.css";

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
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

class CRDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      search: null,
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      total_data_PO: 0,
      pp_all: [],
      rowsXLS: [],
      data_array: [],
      action_status: null,
      action_message: null,
      all_data: [],
      data_PO: [],
      packageSelected: [],
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      modalMatStockForm: false,
      modalMatStockEdit: false,
      MatStockForm: new Array(6).fill(null),
      collapse: false,
      danger: false,
      activeItemName: "",
      activeItemId: null,
      createModal: false,
      filter_list : {},
      cr_temp_aging : 0,
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
    this.downloadAllFilter = this.downloadAllFilter.bind(this);
    this.togglecreateModal = this.togglecreateModal.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
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

  toggleDelete(e) {
    const modalDelete = this.state.danger;
    this.setState({
      danger: !this.state.danger,
    });
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

  togglecreateModal() {
    this.setState({
      createModal: !this.state.createModal,
    });
  }


  async getDatafromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE + url, {
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
      let respond = await axios.post(API_URL_NODE + url, data, {
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
      let respond = await axios.patch(API_URL_NODE + url, data, {
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
      let respond = await axios.delete(API_URL_NODE + url, {
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
    this.getDRMDataList();
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

  SearchFilter = (e) => {
    let keyword = e.target.value;
    this.setState({ search: keyword });
  };


  getWHStockList() {
    this.getDatafromAPINODE("/variants/variants?lmt=" + this.state.perPage + '&pg=' + this.state.activePage).then((res) => {
      if (res.data !== undefined) {
        this.setState({
          all_data: res.data.data,
          prevPage: this.state.activePage,
          total_dataParent: res.data.totalResults,
        });
      } else {
        this.setState({ all_data: [], total_dataParent: 0, prevPage: this.state.activePage });
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
    // this.getWHStockList();();
    this.getDRMDataList();
    document.title = "CR Detail | BAM";
  }

  getDRMDataList() {
    let cr_system_number = this.state.filter_list.cr_system_number === null || this.state.filter_list.cr_system_number ===  undefined ? '"cr_system_number" : {"$exists" : 1}' : '"cr_system_number" : {"$regex" : "'+this.state.filter_list.cr_system_number+'", "$options" : "i"}';
    let sub_region_before = this.state.filter_list.sub_region_before === null || this.state.filter_list.sub_region_before ===  undefined ? '"sub_region_before" : {"$exists" : 1}' : '"sub_region_before" : {"$regex" : "'+this.state.filter_list.sub_region_before+'", "$options" : "i"}';
    let tower_id_before = this.state.filter_list.tower_id_before === null || this.state.filter_list.tower_id_before ===  undefined ? '"tower_id_before" : {"$exists" : 1}' : '"tower_id_before" : {"$regex" : "'+this.state.filter_list.tower_id_before+'", "$options" : "i"}';
    let site_id_before = this.state.filter_list.site_id_before === null || this.state.filter_list.site_id_before ===  undefined ? '"site_id_before" : {"$exists" : 1}' : '"site_id_before" : {"$regex" : "'+this.state.filter_list.site_id_before+'", "$options" : "i"}';
    let site_name_before = this.state.filter_list.site_name_before === null || this.state.filter_list.site_name_before ===  undefined ? '"site_name_before" : {"$exists" : 1}' : '"site_name_before" : {"$regex" : "'+this.state.filter_list.site_name_before+'", "$options" : "i"}';
    let sub_region_after = this.state.filter_list.sub_region_after === null || this.state.filter_list.sub_region_after ===  undefined ? '"sub_region_after" : {"$exists" : 1}' : '"sub_region_after" : {"$regex" : "'+this.state.filter_list.sub_region_after+'", "$options" : "i"}';
    let tower_id_after = this.state.filter_list.tower_id_after === null || this.state.filter_list.tower_id_after ===  undefined ? '"tower_id_after" : {"$exists" : 1}' : '"tower_id_after" : {"$regex" : "'+this.state.filter_list.tower_id_after+'", "$options" : "i"}';
    let site_id_after = this.state.filter_list.site_id_after === null || this.state.filter_list.site_id_after ===  undefined ? '"site_id_after" : {"$exists" : 1}' : '"site_id_after" : {"$regex" : "'+this.state.filter_list.site_id_after+'", "$options" : "i"}';
    let site_name_after = this.state.filter_list.site_name_after === null || this.state.filter_list.site_name_after ===  undefined ? '"site_name_after" : {"$exists" : 1}' : '"site_name_after" : {"$regex" : "'+this.state.filter_list.site_name_after+'", "$options" : "i"}';
    let remark = this.state.filter_list.remark === null || this.state.filter_list.remark ===  undefined ? '"remark" : {"$exists" : 1}' : '"remark" : {"$regex" : "'+this.state.filter_list.remark+'", "$options" : "i"}';
    let status = this.state.filter_list.status === null || this.state.filter_list.status ===  undefined ? '"status" : {"$exists" : 1}' : '"status" : {"$regex" : "'+this.state.filter_list.status+'", "$options" : "i"}';
    let whereAnd = 'q={'+cr_system_number+','+sub_region_before+','+tower_id_before+','+site_id_before+','+site_name_before+','+sub_region_after+','+tower_id_after+','+site_id_after+','+site_name_after+','+remark+','+status+'}';
    this.getDatafromAPINODE("/changeRequest/getCr?srt=_id:-1&lmt=" + this.state.perPage + '&pg=' + this.state.activePage+'&'+whereAnd).then((res) => {
      if (res.data !== undefined) {
        this.setState({
          all_data: res.data.data,
          prevPage: this.state.activePage,
          total_dataParent: res.data.totalResults,
        });
      } else {
        this.setState({ all_data: [], total_dataParent: 0, prevPage: this.state.activePage });
      }
    });
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

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getDRMDataList();
    });
  }

  async getMatStockFormat(dataImport) {
    const dataHeader = dataImport[0];
    const onlyParent = dataImport
      .map((e) => e)
      .filter((e) =>
        this.checkValuetoString(e[this.getIndex(dataHeader, "owner_id")])
      );
    let data_array = [];
    if (onlyParent !== undefined && onlyParent.length !== 0) {
      for (let i = 1; i < onlyParent.length; i++) {
        const aa = {
          owner_id: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "owner_id")]
          ),
          po_number: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "po_number")]
          ),
          arrival_date: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "arrival_date")]
          ),
          id_project_doc: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "id_project_doc")]
          ),
          sku: this.checkValue(onlyParent[i][this.getIndex(dataHeader, "sku")]),
        };
        if (aa.owner_id !== undefined && aa.owner_id !== null) {
          aa["owner_id"] = aa.owner_id.toString();
        }
        if (aa.po_number !== undefined && aa.po_number !== null) {
          aa["po_number"] = aa.po_number.toString();
        }
        if (aa.arrival_date !== undefined && aa.arrival_date !== null) {
          aa["arrival_date"] = aa.arrival_date.toString();
        }
        if (aa.id_project_doc !== undefined && aa.id_project_doc !== null) {
          aa["id_project_doc"] = aa.id_project_doc.toString();
        }
        if (aa.sku !== undefined && aa.sku !== null) {
          aa["sku"] = aa.sku.toString();
        }
        data_array.push(aa);
      }
      // console.log(JSON.stringify(data_array));
      return data_array;
    } else {
      this.setState(
        { action_status: "failed", action_message: "Please check your format" },
        () => {
          this.toggleLoading();
        }
      );
    }
  }

  saveDRMBulk = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    const dataXLS = this.state.rowsXLS;
    // const BulkData = await this.getMatStockFormat(BulkXLSX);
    const res = await this.postDatatoAPINODE("/changeRequest/createCr", {
      'crData': dataXLS,
    });
    // console.log('res bulk ', res.error.message);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      if(res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined){
        if(res.response.data.error.message !== undefined){
          this.setState({ action_status: 'failed', action_message: JSON.stringify(res.response.data.error.message) });
        }else{
          this.setState({ action_status: 'failed', action_message: JSON.stringify(res.response.data.error) });
        }
      }else{
        this.setState({ action_status: 'failed' });
      }
      this.toggleLoading();
    }
  };

  saveTruncateBulk = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    const BulkXLSX = this.state.rowsXLS;
    // const BulkData = await this.getMatStockFormat(BulkXLSX);
    // console.log('xlsx data', JSON.stringify(BulkXLSX));
    const res = await this.postDatatoAPINODE("/variants/createVariantsTruncate", {
      'materialData': BulkXLSX,
    });
    console.log('res bulk ', res);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" }, () => {
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

  countagingCR(e){
    const today = new Date();
    const dd =  today.getDate();
    const submission_date = getDateonly(e);
    const diff = dd - submission_date;
    // console.log('diff ',diff);
    // this.setState({ cr_temp_aging: diff });
    return diff;

  }

  countagingApproved(e, b){
    const approval_date = getDateonly(e);
    const submission_date = getDateonly(b);
    const diff = approval_date - submission_date;
    // console.log('diff ',diff);
    // this.setState({ cr_temp_aging: diff });
    return diff;

  }

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
        if(res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined){
          if(res.response.data.error.message !== undefined){
            this.setState({ action_status: 'failed', action_message: JSON.stringify(res.response.data.error.message) });
          }else{
            this.setState({ action_status: 'failed', action_message: JSON.stringify(res.response.data.error) });
          }
        }else{
          this.setState({ action_status: 'failed' });
        }
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
    this.toggleLoading();
    let download_all = [];
    let getAll_nonpage = await this.getDatafromAPINODE('/changeRequest/getCr?noPg=1');
    if (getAll_nonpage.data !== undefined) {
      download_all = getAll_nonpage.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["cr_system_number","sub_region_before","project_group","tower_id_before","site_id_before","site_name_before","project_definition_before","municipality_before","sow_before","site_base_type","wbs", "sub_region_after","tower_id_after","site_id_after", "site_name_after", "project_definition_after", "municipality_after", "sow_after", "cr_number","category","reason", "date_submission", "ageing", "duration", "date_approval", "remark","status","pic", "cr_announce_status","final_status","po_completeness"]);

    for (let i = 0; i < download_all.length; i++) {
      let cr = download_all[i];
      ws.addRow([cr.cr_system_number, cr.sub_region_before, cr.project_group, cr.tower_id_before, cr.site_id_before, cr.site_name_before, cr.project_definition_before, cr.municipality_before, cr.sow_before, cr.site_base_type, cr.wbs, cr.sub_region_after, cr.tower_id_after, cr.site_id_after, cr.site_name_after, cr.project_definition_after, cr.municipality_after, cr.sow_after, cr.cr_number, cr.category, cr.reason, cr.date_submission, cr.ageing, cr.duration, cr.date_approval, cr.remark, cr.status, cr.pic, cr.cr_announce_status, cr.final_status, cr.po_completeness]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "All CR Data.xlsx");
    this.toggleLoading();
  }

  async downloadAllFilter() {
    this.toggleLoading();
    let cr_system_number = this.state.filter_list.cr_system_number === null || this.state.filter_list.cr_system_number ===  undefined ? '"cr_system_number" : {"$exists" : 1}' : '"cr_system_number" : {"$regex" : "'+this.state.filter_list.cr_system_number+'", "$options" : "i"}';
    let sub_region_before = this.state.filter_list.sub_region_before === null || this.state.filter_list.sub_region_before ===  undefined ? '"sub_region_before" : {"$exists" : 1}' : '"sub_region_before" : {"$regex" : "'+this.state.filter_list.sub_region_before+'", "$options" : "i"}';
    let tower_id_before = this.state.filter_list.tower_id_before === null || this.state.filter_list.tower_id_before ===  undefined ? '"tower_id_before" : {"$exists" : 1}' : '"tower_id_before" : {"$regex" : "'+this.state.filter_list.tower_id_before+'", "$options" : "i"}';
    let site_id_before = this.state.filter_list.site_id_before === null || this.state.filter_list.site_id_before ===  undefined ? '"site_id_before" : {"$exists" : 1}' : '"site_id_before" : {"$regex" : "'+this.state.filter_list.site_id_before+'", "$options" : "i"}';
    let site_name_before = this.state.filter_list.site_name_before === null || this.state.filter_list.site_name_before ===  undefined ? '"site_name_before" : {"$exists" : 1}' : '"site_name_before" : {"$regex" : "'+this.state.filter_list.site_name_before+'", "$options" : "i"}';
    let sub_region_after = this.state.filter_list.sub_region_after === null || this.state.filter_list.sub_region_after ===  undefined ? '"sub_region_after" : {"$exists" : 1}' : '"sub_region_after" : {"$regex" : "'+this.state.filter_list.sub_region_after+'", "$options" : "i"}';
    let tower_id_after = this.state.filter_list.tower_id_after === null || this.state.filter_list.tower_id_after ===  undefined ? '"tower_id_after" : {"$exists" : 1}' : '"tower_id_after" : {"$regex" : "'+this.state.filter_list.tower_id_after+'", "$options" : "i"}';
    let site_id_after = this.state.filter_list.site_id_after === null || this.state.filter_list.site_id_after ===  undefined ? '"site_id_after" : {"$exists" : 1}' : '"site_id_after" : {"$regex" : "'+this.state.filter_list.site_id_after+'", "$options" : "i"}';
    let site_name_after = this.state.filter_list.site_name_after === null || this.state.filter_list.site_name_after ===  undefined ? '"site_name_after" : {"$exists" : 1}' : '"site_name_after" : {"$regex" : "'+this.state.filter_list.site_name_after+'", "$options" : "i"}';
    let remark = this.state.filter_list.remark === null || this.state.filter_list.remark ===  undefined ? '"remark" : {"$exists" : 1}' : '"remark" : {"$regex" : "'+this.state.filter_list.remark+'", "$options" : "i"}';
    let status = this.state.filter_list.status === null || this.state.filter_list.status ===  undefined ? '"status" : {"$exists" : 1}' : '"status" : {"$regex" : "'+this.state.filter_list.status+'", "$options" : "i"}';
    let whereAnd = 'q={'+cr_system_number+','+sub_region_before+','+tower_id_before+','+site_id_before+','+site_name_before+','+sub_region_after+','+tower_id_after+','+site_id_after+','+site_name_after+','+remark+','+status+'}';
    let download_all = [];
    let getAll_nonpage = await this.getDatafromAPINODE('/changeRequest/getCr?noPg=1&'+whereAnd);
    if (getAll_nonpage.data !== undefined) {
      download_all = getAll_nonpage.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["cr_system_number","sub_region_before","project_group","tower_id_before","site_id_before","site_name_before","project_definition_before","municipality_before","sow_before","site_base_type","wbs", "sub_region_after","tower_id_after","site_id_after", "site_name_after", "project_definition_after", "municipality_after", "sow_after", "cr_number","category","reason", "date_submission", "ageing", "duration", "date_approval", "remark","status","pic", "cr_announce_status","final_status","po_completeness"]);

    for (let i = 0; i < download_all.length; i++) {
      let cr = download_all[i];
      ws.addRow([cr.cr_system_number, cr.sub_region_before, cr.project_group, cr.tower_id_before, cr.site_id_before, cr.site_name_before, cr.project_definition_before, cr.municipality_before, cr.sow_before, cr.site_base_type, cr.wbs, cr.sub_region_after, cr.tower_id_after, cr.site_id_after, cr.site_name_after, cr.project_definition_after, cr.municipality_after, cr.sow_after, cr.cr_number, cr.category, cr.reason, cr.date_submission, cr.ageing, cr.duration, cr.date_approval, cr.remark, cr.status, cr.pic, cr.cr_announce_status, cr.final_status, cr.po_completeness]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "All CR Data Filter.xlsx");
    this.toggleLoading();
  }

  DeleteData = async () => {
    const objData = this.state.all_data.find((e) => e._id);
    this.toggleLoading();
    this.toggleDelete();
    const DelData = this.deleteDataFromAPINODE(
      "/variants/deleteVariants/" + objData._id
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.toggleLoading();
      } else {
        this.setState({ action_status: "failed" }, () => {
          this.toggleLoading();
        });
      }
    });
  }

  exportCRTemplate = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["cr_system_number","sub_region_before","project_group","tower_id_before","site_id_before","site_name_before","project_definition_before","municipality_before","sow_before","site_base_type","wbs", "sub_region_after","tower_id_after","site_id_after", "site_name_after", "project_definition_after", "municipality_after", "sow_after", "cr_number","category","reason", "date_submission", "ageing", "duration", "date_approval", "remark","status","pic", "cr_announce_status","final_status","po_completeness"]);

    ws.addRow(["new","Jabo 1 EXAMPLE","STP Sunrise Project B2","JAW-JT-SLW-3108","4431387E","SUDIRMAN SLAWI","XP/2427","JAKARTA SELATAN","Add L2100 5M+Swap RU to RRU Dualband 4T4R+Swap All Existing antenna to Penta Band","Site Base","-","Jabo 1","JAW-JK-KYB-1575","4431387E","CISANGGIRI_IV_RAWA_BARAT","New Prodeff", "Kab. Kodya Jakarta Selatan", "Add L2100 5M + Swap RU to RRU B0 + Swap RU to RRU Dualband 4T4R + Swap All Existing antenna to Quadband","","","Add Config : Config-30fa","","","","","Cancel CR, Back to Original Plan","Cancel CR","EID","","",""]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), "CR Template.xlsx");
  };

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if(value !== "" && value.length === 0) {
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[index] = value;
    this.setState({filter_list : dataFilter, activePage: 1}, () => {
      this.onChangeDebounced(e);
    })
  }

  onChangeDebounced(e) {
    this.getDRMDataList();
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
                <span style={{ marginTop: "5px", position: "absolute" }}>
                  {" "}CR Detail{" "}
                </span>
                <div className="card-header-actions" style={{ display: "inline-flex" }}>
                  <div>
                    <Button block color="success" onClick={this.togglecreateModal} size="sm">
                      <i className="fa fa-plus-square" aria-hidden="true">{" "}&nbsp;{" "}</i>{" "}New
                  </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0);}} size="sm">
                      <DropdownToggle caret color="light">
                        Download Template
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportCRTemplate}>{" "}CR Template</DropdownItem>
                        <DropdownItem onClick={this.downloadAll}>{" "}Download All</DropdownItem>
                        <DropdownItem onClick={this.downloadAllFilter}>{" "}Download All Filter</DropdownItem>
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
                      onClick={this.saveDRMBulk}
                    >
                      {" "}
                      <i className="fa fa-save" aria-hidden="true">
                        {" "}
                      </i>{" "}
                      &nbsp;SAVE{" "}
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      color="warning"
                      disabled={this.state.rowsXLS.length === 0}
                      onClick={this.saveTruncateBulk}
                    >
                      {" "}
                      <i className="fa fa-save" aria-hidden="true">
                        {" "}
                      </i>{" "}
                      &nbsp;SAVE2{" "}
                    </Button>
                    {/* <Button color="primary" style={{ float: 'right' }} onClick={this.toggleMatStockForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button>                     */}
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div className="divtable">
                      <Table bordered style={{
        height: "400px"
      }}>
                        <thead className=" table-drm__header--middle">
                          <tr align="center">
                            <th>CR System Number</th>
                            <th>Sub Region (Before)</th>
                            <th>XL Tower ID (before)</th>
                            <th>Site ID (before)</th>
                            <th>Site Name (before)</th>
                            <th>Sub Region (After)</th>
                            <th>XL Tower ID (after)</th>
                            <th>Site ID (after)</th>
                            <th>Site Name (after)</th>
                            <th>Remark</th>
                            <th>Status</th>

                            <th>Project Group</th>
                            <th>Project Definition (before)</th>
                            <th>Municipality (before)</th>
                            <th>SOW (Before)</th>
                            <th>Site Base Type</th>
                            <th>WBS</th>
                            <th>Project Definition (after)</th>
                            <th>Municipality (after)</th>
                            <th>SOW (After)</th>
                            <th>CR Number</th>
                            <th>Category</th>
                            <th>Reason Drop/Replace/Redesign</th>
                            <th>Date Submission</th>
                            <th>Ageing</th>
                            <th>Duration</th>
                            <th>Date Approval</th>
                            <th>PIC</th>
                            <th>CR Announce Status</th>
                            <th>Final Status</th>
                            <th>PO Completeness (Compare TSSR BOQ to CPO of the Site - SOW Code basis)</th>
                          </tr>
                          <tr>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.cr_system_number} name="cr_system_number" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.sub_region_before} name="sub_region_before" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '100px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.tower_id_before} name="tower_id_before" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.site_id_before} name="site_id_before" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.site_name_before} name="site_name_before" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '100px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.sub_region_after} name="sub_region_after" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.tower_id_after} name="tower_id_after" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.site_id_after} name="site_id_after" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '100px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.site_name_after} name="site_name_after" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.remark} name="remark" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th>
                              <div className="controls">
                                <InputGroup className="input-prepend" style={{width : '150px'}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list.status} name="status" size="sm"/>
                                </InputGroup>
                              </div>
                            </th>
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.all_data.map(cr =>
                          <tr>
                            <td>{cr.cr_system_number}</td>
                            <td>{cr.sub_region_before}</td>
                            <td>{cr.tower_id_before}</td>
                            <td>{cr.site_id_before}</td>
                            <td>{cr.site_name_before}</td>
                            <td>{cr.sub_region_after}</td>
                            <td>{cr.tower_id_after}</td>
                            <td>{cr.site_id_after}</td>
                            <td>{cr.site_name_after}</td>
                            <td>{cr.remark}</td>
                            <td>{cr.status}</td>

                            <td>{cr.project_group}</td>
                            <td>{cr.project_definition_before}</td>
                            <td>{cr.municipality_before}</td>
                            <td>{cr.sow_before}</td>
                            <td>{cr.site_base_type}</td>
                            <td>{cr.wbs}</td>
                            <td>{cr.project_definition_after}</td>
                            <td>{cr.municipality_after}</td>
                            <td>{cr.sow_after}</td>
                            <td>{cr.cr_number}</td>
                            <td>{cr.category}</td>
                            <td>{cr.reason}</td>
                            <td>{convertDateFormat(cr.date_submission)}</td>
                            {/* aging */}
                            <td>{cr.date_approval === null ? this.countagingCR(cr.date_submission) : this.countagingApproved(cr.date_approval, cr.date_submission)}</td>
                            {/* duration */}
                            <td>{cr.duration > 7 ? '> 7 Days' : '< 7 Days' }</td>
                            <td>{cr.date_approval === null ? null : convertDateFormat(cr.date_approval)}</td>
                            <td>{cr.pic}</td>
                            <td>{cr.cr_announce_status}</td>
                            <td>{cr.final_status}</td>
                            <td>{cr.po_completeness}</td>
                          </tr>
                        )}

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

        {/* Modal New PO */}
        <Modal
          isOpen={this.state.modalMatStockForm}
          toggle={this.toggleMatStockForm}
          className="modal--form-e"
        >
          <ModalHeader>Form Material Library</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="owner_id">Owner ID</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.MatStockForm[0]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder=""
                    value={this.state.MatStockForm[1]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="arrival_date">Arrival Date</Label>
                  <Input
                    type="datetime-local"
                    placeholder=""
                    value={this.state.MatStockForm[2]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="project_name">Project Name</Label>
                  <Input
                    type="text"
                    name="3"
                    placeholder=""
                    value={this.state.MatStockForm[3]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    type="text"
                    placeholder=""
                    value={this.state.MatStockForm[4]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="sku_description">SKU Description</Label>
                  <Input
                    type="text"
                    placeholder=""
                    value={this.state.MatStockForm[5]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="qty">Qty</Label>
                  <Input
                    type="number"
                    min="0"
                    name="6"
                    placeholder=""
                    value={this.state.MatStockForm[6]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNew}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PO*/}

        {/* Modal Edit PP */}
        <Modal
          isOpen={this.state.modalMatStockEdit}
          toggle={this.toggleEdit}
          className="modal--form"
        >
          <ModalHeader>Form Update Material Library</ModalHeader>
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

        {/* Modal confirmation delete */}
        <Modal
          isOpen={this.state.danger}
          toggle={this.toggleDelete}
          className={"modal-danger " + this.props.className}
        >
          <ModalHeader toggle={this.toggleDelete}>
            Delete Material Library Confirmation
          </ModalHeader>
          <ModalBody>Are you sure want to delete ?</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              // value={e._id}
              onClick={this.DeleteData}
            >
              Delete
            </Button>
            <Button color="secondary" onClick={this.toggleDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

         {/* Modal create New */}
         <Modal isOpen={this.state.createModal} toggle={this.togglecreateModal} className={this.props.className}>
         <ModalHeader toggle={this.togglecreateModal}>CR Uploader</ModalHeader>
         <ModalBody>
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
         </ModalBody>
         <ModalFooter>
           <Button block color="success" className="btn-pill" disabled={this.state.rowsXLS.length === 0} onClick={this.saveDRMBulk}>Save</Button>{' '}
           {/* }<Button block color="secondary" className="btn-pill" disabled={this.state.rowsXLS.length === 0} onClick={this.saveTruncateBulk}>Truncate</Button> */}
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

export default connect(mapStateToProps)(CRDetail);
