import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse } from 'reactstrap';
import { Col, FormGroup, Label, Row, Table, Input } from 'reactstrap';
import { ExcelRenderer } from 'react-excel-renderer';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import debounce from 'lodash.debounce';
import './poStyle.css';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

import {convertDateFormatfull, convertDateFormat} from '../../helper/basicFunction';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" />
);

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameBAM = 'adminbamidsuper';
const passwordBAM = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';


class CPODatabase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      filter_name: "",
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
      modalEdit:false,
      POForm: new Array(5).fill(null),
      collapse: false,
      selected_id: "",
    }
    this.togglePOForm = this.togglePOForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterName = debounce(this.changeFilterName, 1000);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.saveNewPO = this.saveNewPO.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);

  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
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
      let respond = await axios.get(API_URL_NODE + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
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
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
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
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
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


  changeFilterName(value) {
    this.getPODataList();
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if (value.length === 0) {
      value = "";
    }
    this.setState({ filter_name: value }, () => {
      this.changeFilterName(value);
    });
  }

  getPODataList() {
    let queryDate = ''
    // if(this.props.location.search.length !== 0){
    //   queryDate = ", "+this.props.location.search.replace("?q=", "").replace("{", "").replace("}", "")
    // }
    let po_number = this.state.filter_name === null ? '"po_number":{"$exists" : 1}' : '"po_number":{"$regex" : "' + this.state.filter_name + '", "$options" : "i"}';
    // this.getDatatoAPIEXEL('/po_op?max_results=' + this.state.perPage + '&page=' + this.state.activePage + '&where={' + po_number + '}')
    this.getDatafromAPINODE('/cpodb/getCpoDb?srt=_id:-1&lmt='+this.state.perPage +
    "&pg=" + this.state.activePage+ '&q={' + po_number+queryDate + '}')
      .then(res => {
        // console.log('all cpoDB', res.data)
        if (res.data !== undefined) {
          this.setState({ po_op_data: res.data.data, prevPage: this.state.activePage,
            total_data_PO: res.data.totalResults})
        } else {
          this.setState({ po_op_data: [], total_data_PO: 0,
            prevPage: this.state.activePage,});
        }
      })
  }

  isSameValue(element, value) {
    //function for FindIndex
    return this.checkValuetoString(element).toLowerCase() === this.checkValuetoString(value).toLowerCase();
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex(e => this.isSameValue(e, value));
  }

  checkValue(props) {
    // if value undefined return null
    if (typeof props === 'undefined') {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    // if value undefined return ""
    if (typeof props === 'undefined' || props === null) {
      return "";
    } else {
      return props;
    }
  }

  checkValueReturn(value1, value2) {
    // if value undefined or null return Value2
    if (typeof value1 !== 'undefined' && value1 !== null) {
      return value1;
    } else {
      return value2;
    }
  }

  // check Package Config
  // fileHandlerMaterial = (event) => {
  //   // this.toggleLoading();
  //   let fileObj = event.target.files[0];
  //   if (fileObj !== undefined) {
  //     ExcelRenderer(fileObj, (err, rest) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       else {
  //         console.log('excel arr ', rest.rows)
  //         this.setState({ rowsXLS: rest.rows })
  //       }
  //     });
  //   }
  // }

  fileHandlerMaterial = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    console.log("rABS");
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates:true});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header:1, devfal : null});
      /* Update state */
      this.ArrayEmptytoNull(data);
    };
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    const idxEM = dataXLS.length > 0 ? dataXLS[0].findIndex(e => e === "expired_month") : 0;
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[0].length; j++){
        if(typeof dataXLS[i][j] === "object"){
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if(dataObject !== null){
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        }else{
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      if(i > 0 && idxEM !== -1){
        const dataED = dataXLS[i][idxEM];
        if(/^\d+$/.test(dataED)){
          col[idxEM] = parseFloat(dataED);
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
  }

  componentDidMount() {
    this.getPODataList();
    document.title = 'CPO Database | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPODataList();
    });
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  togglePOForm() {
    this.setState(prevState => ({
      modalPOForm: !prevState.modalPOForm
    }));
  }

  toggleEdit(e){
    const modalEdit = this.state.modalEdit;
    if(modalEdit === false){
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
    console.log("value ", value, index);
    let dataForm = this.state.DataForm;
    dataForm[parseInt(index)] = value;
    this.setState({ DataForm: dataForm });
  }

  async saveUpdate() {
    const dataPPEdit = this.state.DataForm;
    const objData = this.state.selected_id;
    // console.log('obj data ', objData);
    let pp = {
      po_number: dataPPEdit[0],
      date: dataPPEdit[1],
      expired_date : dataPPEdit[7],
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
    const onlyParent = dataImport.map(e => e).filter(e => (this.checkValuetoString(e[this.getIndex(dataHeader, 'po_number')])));
    let cpo_array = [];
    if (onlyParent !== undefined && onlyParent.length !== 0) {
      for (let i = 1; i < onlyParent.length; i++) {
        const cpo = {
          "po_number": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'po_number')]),
          "date": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'date')]),
          "currency": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'currency')]),
          "payment_terms": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'payment_terms')]),
          "shipping_terms": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'shipping_terms')]),
          "contract": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'contract')]),
          "contact": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'contact')]),
        }
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
      this.setState({ action_status: 'failed', action_message: 'Please check your format' }, () => {
        this.toggleLoading();
      });
    }
  }

  saveCPOBulk = async () => {
    this.toggleLoading();
    const cpobulkXLS = this.state.rowsXLS;
    const cpoData = await this.getCPOFormat(cpobulkXLS);
    const res = await this.postDatatoAPINODE('/cpodb/createCpoDb', { 'poData': cpobulkXLS });
    // const res = await this.postDatatoAPINODE('/cpodb/createCpoDbWithDetail', { 'poData': cpobulkXLS });
    if (res.data !== undefined) {
      this.setState({ action_status: 'success', action_message : null });
      this.toggleLoading();
    } else {
      if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
        if (res.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
      this.toggleLoading();
    }
  }

  saveCPOBulkWithDetail = async () => {
    this.toggleLoading();
    const cpobulkXLS = this.state.rowsXLS;
    const cpoData = await this.getCPOFormat(cpobulkXLS);
    // const res = await this.postDatatoAPINODE('/cpodb/createCpoDb', { 'poData': cpobulkXLS });
    const res = await this.postDatatoAPINODE('/cpodb/createCpoDbWithDetail', { 'poData': cpobulkXLS });
    if (res.data !== undefined) {
      this.setState({ action_status: 'success', action_message : null });
      this.toggleLoading();
    } else {
      if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
        if (res.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
      this.toggleLoading();
    }
  }

  async saveNewPO() {
    this.togglePOForm();
    this.toggleLoading();
    let poData = [];
    let respondSaveNew = undefined;
    const dataPPNew = this.state.POForm;
    const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
    const po_num = dataPPNew[0];
    let pp = {
      "po_number": po_num.toString(),
      "po_year": dataPPNew[1],
      "currency": dataPPNew[2],
      "value": dataPPNew[3],
      "number_of_sites": dataPPNew[4]
    }
    poData.push(pp);
    let postData = await this.postDatatoAPIEXEL('/po_op', pp)
      .then(res => {
        if (res.data !== undefined) {
          this.toggleLoading();
        } else {
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
          this.toggleLoading();
        }
      });
  }

  numToSSColumn(num) {
    var s = '', t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t) / 26 | 0;
    }
    return s || undefined;
  }

  exportFormatCPO_level1 = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["po_number","date","currency","payment_terms","shipping_terms", "contract", "contact"]);
    ws.addRow(["PO0001","2020-02-21","idr",7030, "DDP", "103-EID RAN 2020", "lale@gmail.com"]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'CPO Level 1 Template.xlsx');
  }

  exportFormatCPOWithDetail = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["po_number","date","expired_month", "currency","payment_terms","shipping_terms", "contract", "contact", "config_id", "description", "mm_id", "need_by_date", "qty", "unit", "price"]);
    ws.addRow(["PO0001","2020-02-21","6","idr",7030, "DDP", "103-EID RAN 2020", "lale@gmail.com","INSTALL:CONFIG SERVICE 11_1105A","3416315 |  INSTALL:CONFIG SERVICE 11_1105A  | YYYY:2019 | MM:12","desc","2020-08-21",1,"Performance Unit",1000000]);
    ws.addRow(["PO0001","2020-02-21","6","idr",7030, "DDP", "103-EID RAN 2020", "lale@gmail.com","Cov_2020_Config-4a","330111 | Cov_2020_Config-4a | YYYY : 2020 | MM : 04","desc","2020-12-12",200,"Performance Unit",15000000]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'CPO with Detail Template.xlsx');
  }

  Aging(date){
    let today = new Date();
    today.setDate(today.getDate()-120);
    let dateExpired = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString().padStart(2, '0')+"-"+today.getDate().toString().padStart(2, '0');
    let aging = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return aging.toFixed(0);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: '8px', position: 'absolute' }}>CPO Database</span>
                <div className="card-header-actions" style={{ display: 'inline-flex' }}>
                  <div style={{ marginRight: "10px" }}>
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                      <DropdownToggle caret color="light">
                        Download Template
                        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportFormatCPO_level1}> CPO Level 1 Template</DropdownItem>
                        <DropdownItem onClick={this.exportFormatCPOWithDetail}> CPO With Detail Template</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                  {this.state.userRole.findIndex(e => e === "BAM-CpoDB-Create") !== -1 || this.state.userRole.findIndex(e => e === "Admin") !== -1 ? (
                      <div>
                        <Button block color="success" onClick={this.toggleAddNew} id="toggleCollapse1">
                          <i className="fa fa-plus-square" aria-hidden="true"> &nbsp; </i> New
                          </Button>
                      </div>
                    ) : ("")}
                  </div>
                </div>
                {/* <div>
                  <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}>
                    <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form
                  </Button>
                </div> */}

              </CardHeader>
              <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <Card style={{ margin: '10px 10px 5px 10px' }}>
                  <CardBody>
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>Upload File</td>
                            <td>:</td>
                            <td>
                              <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{ "padding": "10px", "visiblity": "hidden" }} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="success" size="sm" disabled={this.state.rowsXLS.length === 0} onClick={this.saveCPOBulk}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE </Button>
                    <Button style={{marginLeft : '20px'}} color="success" size="sm" disabled={this.state.rowsXLS.length === 0} onClick={this.saveCPOBulkWithDetail}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE With Detail</Button>
                    {/* <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button> */}
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '500' }}>CPO List</span>
                      <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                        <input className="search-box-material" type="text" name='filter' placeholder="Search CPO" onChange={this.handleChangeFilter} value={this.state.filter_name} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='divtable'>
                      <Table hover bordered responsive size="sm" width='100%'>
                        <thead style={{ backgroundColor: '#73818f' }} className='fixed-cpo'>
                          <tr align="center">
                            <th style={{ minWidth: '150px' }}>PO Number</th>
                            <th>Date</th>
                            <th>Aging</th>
                            <th>Expired Date</th>
                            <th>Currency</th>
                            <th>Payment Terms</th>
                            <th>Shipping Terms</th>
                            <th>Contract</th>
                            <th>Contact</th>
                            <th colspan="2"></th>
                            {/* <th></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.po_op_data.map(po =>
                            <React.Fragment key={po._id + "frag"}>
                              <tr style={{ backgroundColor: '#d3d9e7' }} className='fixbody' key={po._id}>
                                <td style={{ textAlign: 'center' }}>{po.po_number}</td>
                                <td style={{ textAlign: 'center' }}>{convertDateFormat(po.date)}</td>
                                {this.Aging(convertDateFormat(po.date)) >= 120 ? (
                                  <td style={{ textAlign: 'center', backgroundColor: 'rgba(255,112,67 ,1)' }}>{this.Aging(convertDateFormat(po.date))}</td>
                                ) : (
                                  <td style={{ textAlign: 'center' }}>{this.Aging(convertDateFormat(po.date))}</td>
                                )}
                                <td style={{ textAlign: 'center' }}>{po.expired_date !== null && po.expired_date !== undefined ? convertDateFormat(po.expired_date) : null}</td>
                                <td style={{ textAlign: 'center' }}>{po.currency}</td>
                                <td style={{ textAlign: 'center' }}>{po.payment_terms}</td>
                                <td style={{ textAlign: 'center' }}>{po.shipping_terms}</td>
                                <td style={{ textAlign: 'center' }}>{po.contract}</td>
                                <td style={{ textAlign: 'center' }}>{po.contact}</td>
                                <td style={{ textAlign: 'center' }}>
                                {this.state.userRole.findIndex(e => e === "BAM-CpoDB-View") !== -1 || this.state.userRole.findIndex(e => e === "Admin") !== -1 ? (
                                  <Link to={'/detail-list-cpo-database/' + po._id}>
                                    <Button color="primary" size="sm" style={{ marginRight: '10px' }}> <i className="fa fa-info-circle" aria-hidden="true">&nbsp;</i> Detail</Button>
                                  </Link>
                                   ):""}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                {this.state.userRole.findIndex(e => e === "BAM-CpoDB-Edit") !== -1 || this.state.userRole.findIndex(e => e === "Admin") !== -1 ? (
                                <Button
                                      size="sm"
                                      color="secondary"
                                      value={po._id}
                                      onClick={this.toggleEdit}
                                      title="Edit"
                                    >
                                      <i className="fas fa-edit"></i>
                                      </Button>
                                      ):""}
                                </td>
                              </tr>
                            </React.Fragment>
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
        <Modal isOpen={this.state.modalPOForm} toggle={this.togglePOForm} className="modal--form-po">
          <ModalHeader>Form CPO</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.POForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year" >Year</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.POForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency" >Currency</Label>
                  <Input type="text" name="2" placeholder="" value={this.state.POForm[2]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value" >Price</Label>
                  <Input type="number" min="0" name="3" placeholder="" value={this.state.POForm[3]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="number_of_sites" >Number of Sites</Label>
                  <Input type="number" min="0" name="4" placeholder="" value={this.state.POForm[4]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNewPO}>Submit</Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PO*/}

        {/* Modal Edit PP */}
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          className="modal--form"
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
                  <Label htmlFor="data">Expired Date</Label>
                  <Input
                    type="text"
                    name="7"
                    placeholder=""
                    value={this.state.DataForm[7]}
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
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm modal--loading '}>
          <ModalBody>
            <div style={{ textAlign: 'center' }}>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              Loading ...
            </div>
            <div style={{ textAlign: 'center' }}>
              System is processing ...
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData
  }
}

export default connect(mapStateToProps)(CPODatabase);
