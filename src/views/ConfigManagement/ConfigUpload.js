import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse } from 'reactstrap';
import { Col, FormGroup, Label, Row, Table, Input } from 'reactstrap';
import { ExcelRenderer } from 'react-excel-renderer';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import debounce from 'lodash.debounce';
import './product.css';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import { connect } from 'react-redux';
import mydata from './data/getAllPackage.json'
import mydata2 from './data/getAllPackage2.json'

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" />
);

const API_URL_BAM = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';


class ConfigUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      pp_all: [],
      filter_name: null,
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      rowsXLS: [],
      action_status: null,
      action_message: null,
      product_package: [],
      config_package: [],
      check_config_package: [],
      dataConfig: [],
      total_dataConfig: 0,
      packageChecked: new Map(),
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      modalPPForm: false,
      PPForm: new Array(9).fill(null),
      collapse: false,
      loadprojectdata: [],
      modalPPFedit: false,
      config_checked: new Map(),
      config_selected: [],
    }
    this.togglePPForm = this.togglePPForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterDebounce = debounce(this.changeFilterName, 1000);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.downloadAll = this.downloadAll.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.saveNewPP = this.saveNewPP.bind(this);
    this.togglePPedit = this.togglePPedit.bind(this);
    this.saveUpdatePP = this.saveUpdatePP.bind(this);
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

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  async getDatatoAPINode(url) {
    try {
      let respond = await axios.get(API_URL_BAM + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Get Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Get Data err", err);
      return respond;
    }
  }

  async postDatatoAPINode(url, data) {
    try {
      let respond = await axios.post(API_URL_BAM + url, data, {
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


  async getDatafromAPIBAM(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_BAM + url, data, {
        headers: { 'Content-Type': 'application/json', "If-Match": _etag },
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
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

  changeFilterName(value) {
    this.getConfigDataAPI();
  }

  handleChangeFilter = (e) => {
    const value = e.target.value;
    this.setState({ filter_name: value }, () => {
      this.changeFilterDebounce(value);
    });
  }

  getConfigDataAPI(){
    this.getDatatoAPINode('/packageconfig?lmt='+this.state.perPage+'&pg='+this.state.activePage)
    .then(res =>{
      if(res.data !== undefined){
        this.setState({ config_package : res.data.data, prevPage : this.state.activePage, total_dataConfig : res.data.totalResults })
      }else{
        this.setState({ config_package : [], total_dataConfig : 0, prevPage : this.state.activePage});
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
    // if value undefined return Value2
    if (typeof value1 !== 'undefined' && value1 !== null) {
      console.log('value1', value1);
      return value1;
    } else {
      console.log('value2', value2);
      return value2;
    }
  }

  // check Package Config
  fileHandlerMaterial = (event) => {
    this.toggleLoading();
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        }
        else {
          this.postDatatoAPINode('/packageConfig/checkPackageConfigXL', { "configData": rest.rows })
          .then(res => {
            if (res.data !== undefined) {
              this.setState({ check_config_package: res.data.configData, rowsXLS: rest.rows })
              this.toggleLoading();
            } else {
              if(res.response !== undefined){
                if(res.response.data !== undefined){
                  if(res.response.data.error !== undefined){
                    if(res.response.data.error.message !== undefined){
                      this.setState({ action_status: 'failed', action_message: res.response.data.error.message }, () => {
                        this.toggleLoading();
                      });
                    }else{
                      this.setState({ action_status: 'failed', action_message: res.response.data.error }, () => {
                        this.toggleLoading();
                      });
                    }
                  }else{
                    this.setState({ action_status: 'failed'}, () => {
                      this.toggleLoading();
                    });
                  }
                }else{
                  this.setState({ action_status: 'failed' }, () => {
                    this.toggleLoading();
                  });
                }
              }else{
                this.setState({ action_status: 'failed' }, () => {
                    this.toggleLoading();
                });
              }
            }
          })
        }
      });
    }
  }

  checkFormatConfig(dataXLSHeader) {
    // cek the import data is for Config or Not
    if (this.getIndex(dataXLSHeader, 'config_id') !== -1 && this.getIndex(dataXLSHeader, 'sap_number') !== -1 && this.getIndex(dataXLSHeader, 'pp_id') === -1 && (this.getIndex(dataXLSHeader, 'qty') !== -1 && this.getIndex(dataXLSHeader, 'price') !== -1 && this.getIndex(dataXLSHeader, 'currency') !== -1)) {
      return true;
    } else {
      return false;
    }
  }


  saveConfigBulk = async () => {
    this.toggleLoading();
    const isConfig = true;
    console.log(isConfig);
    if (isConfig === true) {
      const postConfig = await this.postDatatoAPINode('/packageConfig/saveConfigBulk', { "configData": this.state.check_config_package });
      this.setState({ action_status: 'success' }, () => {
        this.toggleLoading();
      });
      console.log(postConfig);
    } else {
      this.setState({ action_status: 'failed', action_message: 'There is something error' }, () => {
        this.toggleLoading();
      });
    }
  }

  componentDidMount() {
    this.getConfigDataAPI();
    document.title = 'Config Manager | BAM';
  }

  handleChangeChecklist(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const dataConfig = this.state.config_package;
    let configSelected = this.state.config_selected;
    if (isChecked === true) {
      const getConfig = dataConfig.find(conf => conf._id === item);
      configSelected.push(getConfig);
    } else {
      configSelected = configSelected.filter(function (conf) {
        return conf._id !== item;
      });
    }
    this.setState({ config_selected: configSelected });
    this.setState(prevState => ({ config_checked: prevState.config_checked.set(item, isChecked) }));
  }

  handlePageChange(pageNumber) {
    console.log(`active page ${pageNumber}`)
    this.setState({ activePage: pageNumber }, () => {
      this.getConfigDataAPI();
    });
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  togglePPForm() {
    this.setState(prevState => ({
      modalPPForm: !prevState.modalPPForm
    }));
  }

  togglePPedit(e) {
    const modalPPFedit = this.state.modalPPFedit;
    if (modalPPFedit === false) {
      const value = e.currentTarget.value;
      const ppEdit = this.state.product_package.find(e => e.pp_id === value);
      let dataForm = this.state.PPForm;
      dataForm[0] = ppEdit.pp_id;
      dataForm[1] = ppEdit.product_name;
      dataForm[2] = ppEdit.uom;
      dataForm[3] = ppEdit.product_type;
      dataForm[4] = ppEdit.physical_group;
      dataForm[5] = ppEdit.pp_cust_number;
      dataForm[6] = ppEdit.pp_group;
      dataForm[7] = ppEdit.notes;
      dataForm[8] = ppEdit.price;
      this.setState({ PPForm: dataForm });
    } else {
      this.setState({ PPForm: new Array(9).fill(null)});
    }
    this.setState(prevState => ({
      modalPPFedit: !prevState.modalPPFedit
    }));
  }

  handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.PPForm;
    dataForm[parseInt(index)] = value;
    this.setState({ PPForm: dataForm });
  }

  async saveUpdatePP() {
    let respondSaveEdit = undefined;
    const dataPPEdit = this.state.PPForm;
    const dataPP = this.state.product_package.find(e => e.pp_id === dataPPEdit[0]);
    let pp = {
      "pp_group": this.checkValue(dataPPEdit[6]),
      "product_name": dataPPEdit[1],
      "uom": dataPPEdit[2],
      "pp_cust_number": this.checkValue(dataPPEdit[5]),
      "physical_group": dataPPEdit[4],
      "product_type": dataPPEdit[3],
      "pricing_group": 0,
      "price": dataPPEdit[8],
      "year": "2020",
      "variant_name": null,
      "notes": dataPPEdit[7],
      "deleted": 0,
      "updated_by": this.state.userId
    }
    this.toggleLoading();
    this.togglePPedit();
    if (pp.pp_group === undefined || pp.pp_group === null) {
      pp["pp_group"] = pp.product_name;
    } else {
      if (pp.pp_group.length === 0) {
        pp["pp_group"] = pp.product_name;
      }
    }
    if (pp.pp_cust_number === null || pp.pp_cust_number === undefined) {
      pp["pp_cust_number"] = pp.pp_id;
    } else {
      if (pp.pp_cust_number.length === 0) {
        pp["pp_cust_number"] = pp.pp_id;
      }
    }
    let patchData = await this.patchDatatoAPIBAM('/pp_op/' + dataPP._id, pp, dataPP._etag);
    if (patchData === undefined) { patchData = {}; patchData["data"] = undefined }
    if (patchData.data !== undefined) {
      respondSaveEdit = patchData.data;
    }
    if (respondSaveEdit !== undefined) {
      this.setState({ action_status: 'success' }, () => {
        this.toggleLoading();
        setTimeout(function () { window.location.reload(); }, 2000);
      });
    }
  }

  async saveNewPP() {
    this.togglePPForm();
    this.toggleLoading();
    let respondSaveNew = undefined;
    const dataPPNew = this.state.PPForm;
    const dataAllPP = this.state.pp_all;
    if (dataAllPP.find(e => e.pp_id === dataPPNew[0]) !== undefined) {
      const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
      const pp_name = dataPPNew[1];
      let pp_id_Gen = "PP" + ppcountID + " / " + pp_name;
      let pp = {
        "pp_id": dataPPNew[0],
        "pp_key": pp_id_Gen,
        "pp_group": this.checkValue(dataPPNew[6]),
        "product_name": pp_name.toString(),
        "uom": dataPPNew[2],
        "pp_cust_number": this.checkValue(dataPPNew[5]),
        "physical_group": dataPPNew[4],
        "product_type": dataPPNew[3],
        "pricing_group": 0,
        "price": dataPPNew[8],
        "year": "2020",
        "variant_name": null,
        "notes": dataPPNew[7],
        "deleted": 0,
        "created_by": this.state.userId,
        "updated_by": this.state.userId
      }
      if (pp.pp_group === undefined || pp.pp_group === null) {
        pp["pp_group"] = pp.product_name;
      } else {
        if (pp.pp_group.length === 0) {
          pp["pp_group"] = pp.product_name;
        }
      }
      if (pp.pp_cust_number === null || pp.pp_cust_number === undefined) {
        pp["pp_cust_number"] = pp.pp_id;
      } else {
        if (pp.pp_cust_number.length === 0) {
          pp["pp_cust_number"] = pp.pp_id;
        }
      }
      let postData = await this.postDatatoAPIBAM('/pp_op', pp);
      if (postData === undefined) { postData = {}; postData["data"] = undefined }
      if (postData.data !== undefined) {
        respondSaveNew = postData.data;
      }
      if (respondSaveNew !== undefined) {
        this.setState({ action_status: 'success' }, () => {
          this.toggleLoading();
          setTimeout(function () { window.location.reload(); }, 2000);
        });
      } else {
        this.setState({ action_status: 'failed' });
        this.toggleLoading();
      }
    } else {
      this.toggleLoading();
      this.setState({ action_status: 'failed', action_message: 'Duplicated PP ID' });
    }
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

  async downloadAll() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataPP = this.state.conf_all;
    console.log('data conf all', dataPP);
    // console.log('data conf map', this.state.conf_all.map(e => e.sap_number));


    let headerRow = ["SAP Number", "Config ID",	"Account ID",	"ID Project Doc",	"Project Name",	"Total Price", "ID PP Doc",	"Qty",	"Qty Commercial",	"Currency",	"Price", "Description",	"PP ID",	"PP Group"]
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + '1').font = { size: 11, bold: true };
    }

    for (let i = 0; i < dataPP.length; i++) {
      // console.log('data conf sap num', dataPP[0].sap_number)
      ws.addRow([dataPP[i].sap_number, dataPP[i].config_id, dataPP[i].account_id, dataPP[i].id_project_doc, dataPP[i].project_name, dataPP[i].total_price])
      // let getlastrow = ws.lastRow._number;
      // ws.mergeCells('B' + getlastrow + ':D' + getlastrow);
      for (let j = 0; j < dataPP[i].package_list.length; j++) {
        let package_listIndex = dataPP[i].package_list[j];
        // console.log('data conf qty', package_listIndex.qty)
        ws.addRow(["", "", "", "", "", "", package_listIndex.id_pp_doc, package_listIndex.qty, package_listIndex.qty_commercial, package_listIndex.currency, package_listIndex.price, package_listIndex.description, package_listIndex.pp_id, package_listIndex.pp_group])
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Config Package.xlsx');
  }

  exportTechnicalFormat = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataConfigSelected = this.state.config_selected;
    console.log('conf selected', dataConfigSelected);

    let confArray = ["site_title", "site_id", "site_name", "Site Config", "Prioritization", "Condition"];
    let typeArray = ["", "", "", "NOTE", "NOTE", "NOTE"];

    typeArray = typeArray.concat(dataConfigSelected.map(e => "CONFIG"));
    confArray = confArray.concat(dataConfigSelected.map(e => e.config_id));

    ws.addRow(typeArray);
    ws.addRow(confArray);

    const techFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([techFormat]), 'Technical BOQ Format.xlsx');
  }

  // Config Template XLSX bulk upload
  exportFormatConfig = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["Config Name", "Program", "Config name + Program", "SAP Number", "SAP Description", "Category", "Config description", "dynamic_PP_ID", "dynamic_PP_ID"]);
    ws.addRow(["2020_Config-1D", "Coverage", "Cov_2020_Config-4_0610", "2515914", "RBS:COV_2020_CONFIG-4DC", "Service", "Add 1x Radio 2219 B3+ 1xRadio 2217 B1 + Ant 45 degree_Radio2219ExDismantle", "dynamic_PP_ID", "dynamic_PP_ID"]);
    ws.addRow(["2020_Config-5_0720", "Coverage", "Cov_2020_Config-5_0720", "1111111", "RBS:COV_2020_CONFIG-5B ", "Service", "Add 1x Radio 2219 B3+ 1xRadio 2217 B1 + Ant 90 degree_Radio2219", "dynamic_PP_ID", "dynamic_PP_ID"]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'Config Uploader Template.xlsx');
  }

  render() {
    return (
      <div className="animated fadeIn">
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: '8px', position: 'absolute' }}>Config</span>
                <div className="card-header-actions" style={{ display: 'inline-flex' }}>
                  <div style={{ marginRight: "10px" }}>
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                      <DropdownToggle caret color="light">
                        Download Template
                        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        {/* <DropdownItem onClick={this.exportFormatConfig}>> Config Template</DropdownItem> */}
                        <DropdownItem onClick={this.downloadAll}>> Download All Config</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  {this.state.userRole.includes('Flow-PublicInternal') !== true ? (
                    <div>
                      <Button block color="success" onClick={this.toggleAddNew} id="toggleCollapse1">
                        <i className="fa fa-plus-square" aria-hidden="true"> &nbsp; </i> New
                        </Button>
                    </div>
                  ) : ("")}
                </div>
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
                    <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.saveConfigBulk}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE </Button>
                    {/* <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.checkProductPackage}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;Check </Button>
                    <Button color="primary" style={{ float: 'right' }} onClick={this.togglePPForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button>*/}
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '500' }}>Config List</span>
                      <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                        {/* <span style={{ marginRight: '10px' }}>
                          <Checkbox name={"allPP"} checked={this.state.packageChecked_allPP} onChange={this.handleChangeChecklistAllPP} disabled={this.state.pp_all.length === 0} />
                          Select All
                        </span> */}
                        <input className="search-box-material" type="text" name='filter' placeholder="Search Config Name" onChange={this.handleChangeFilter} value={this.state.filter_name} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='divtable'>
                      <table hover bordered responsive size="sm" width='100%'>
                        <thead style={{ backgroundColor: '#73818f' }} className='fixed'>
                          <tr align="center">
                            <th>
                              {/* }<Checkbox name={"all"} checked={this.state.packageChecked_all} onChange={this.handleChangeChecklistAll} /> */}
                            </th>
                            <th style={{ minWidth: '150px' }}>Config</th>
                            <th>Config Name</th>
                            <th>SAP</th>
                            <th>SAP Description</th>
                            <th>Program</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            {/* <th>Unit</th> */}
                            <th>Qty</th>
                            {/* <th>Qty Comm</th>
                            <th>Price</th> */}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* dummy data */}
                          {this.state.config_package.map(pp =>
                            <React.Fragment key={pp._id + "frag"}>
                              <tr style={{ backgroundColor: '#d3d9e7', fontWeight : 700 }} className='fixbody' key={pp._id}>
                                <td align="center"><Checkbox name={pp._id} checked={this.state.config_checked.get(pp._id)} onChange={this.handleChangeChecklist} value={pp} /></td>
                                <td style={{ textAlign: 'center' }}>{pp.config_id}</td>
                                <td style={{ textAlign: 'center' }}>{}</td>
                                <td style={{ textAlign: 'center' }}>{pp.sap_number}</td>
                                <td style={{ textAlign: 'center' }}>{}</td>
                                <td style={{ textAlign: 'center' }}>{}</td>
                                <td style={{ textAlign: 'center' }}>{pp.config_type}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                  {/* }<Button size='sm' color="secondary" value={pp.pp_id} onClick={this.togglePPedit} title='Edit'>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                  </Button> */}
                                </td>
                              </tr>
                              {pp.package_list.map(pl =>
                                <tr className='fixbodymat' key={pl.id_pp_doc}>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'center' }}>{pl.pp_id}</td>
                                  <td style={{ textAlign: 'center' }}>{pl.pp_group}</td>
                                  <td style={{ textAlign: 'center' }}>{pl.qty}</td>
                                  {/* <td style={{ textAlign: 'center' }}>{pl.qty_commercial}</td>
                                  <td style={{ textAlign: 'center' }}>{pl.price}</td> */}
                                </tr>
                              )}
                            </React.Fragment>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.state.total_dataConfig}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </Col>

                  <Col>
                    <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                      <Button color="warning" disabled={this.state.config_checked.length === 0} onClick={this.exportTechnicalFormat}> <i className="fa fa-download" aria-hidden="true"> </i> &nbsp;Download Technical Format</Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <span style={{ color: 'red' }}>*</span><span>NOTE : Please select Product Package first, before download Technical Format or Material Template.</span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal New PP */}
        <Modal isOpen={this.state.modalPPForm} toggle={this.togglePPForm} className="formmaterial">
          <ModalHeader>Form Config</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="pp_key">Product Key</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.PPForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="package_name" >Name</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.PPForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="unit" >Unit</Label>
                      <Input type="text" name="2" placeholder="" value={this.state.PPForm[2]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="product_type" >Type</Label>
                      <Input type="text" name="3" placeholder="" value={this.state.PPForm[3]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="physical_group" >Physical Group</Label>
                      <Input type="text" name="4" placeholder="" value={this.state.PPForm[4]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="pp_id" >Product Number (Cust)</Label>
                      <Input type="text" name="5" placeholder="" value={this.state.PPForm[5]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="price" >Price</Label>
                      <Input type="number" name="8" placeholder="" value={this.state.PPForm[8]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pp_group" >Product Name (Cust)</Label>
                  <Input type="text" name="6" placeholder="" value={this.state.PPForm[6]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="note" >Note</Label>
                  <Input type="text" name="7" placeholder="" value={this.state.PPForm[7]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNewPP}>Submit</Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PP*/}

        {/* Modal Edit PP */}
        <Modal isOpen={this.state.modalPPFedit} toggle={this.togglePPedit}>
          <ModalHeader>Form Update Product Package</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="pp_key">Product Key</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.PPForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="package_name" >Name</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.PPForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="unit" >Unit</Label>
                      <Input type="text" name="2" placeholder="" value={this.state.PPForm[2]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="product_type" >Type</Label>
                      <Input type="text" name="3" placeholder="" value={this.state.PPForm[3]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="physical_group" >Physical Group</Label>
                      <Input type="text" name="4" placeholder="" value={this.state.PPForm[4]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="pp_id" >Product Number (Cust)</Label>
                      <Input type="text" name="5" placeholder="" value={this.state.PPForm[5]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="price" >Price</Label>
                      <Input type="number" name="8" placeholder="" value={this.state.PPForm[8]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pp_group" >Product Name (Cust)</Label>
                  <Input type="text" name="6" placeholder="" value={this.state.PPForm[6]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="note" >Note</Label>
                  <Input type="text" name="7" placeholder="" value={this.state.PPForm[7]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveUpdatePP}>Update</Button>
          </ModalFooter>
        </Modal>
        {/*  Modal Edit PP*/}

        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className + ' loading '}>
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

export default connect(mapStateToProps)(ConfigUpload);
