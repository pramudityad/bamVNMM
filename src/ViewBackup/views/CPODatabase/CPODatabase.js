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
// const StepFlow = React.lazy(() => import('../../views/Defaultview/StepFlow'));


const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" />
);

// const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
// const usernamePhilApi = 'pdbdash';
// const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameBAM = 'adminbamidsuper';
const passwordBAM = 'F760qbAg2sml';


class CPODatabase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      pp_all: [],
      material_all: [],
      project_all: [],
      project_filter: undefined,
      filter_name: "",
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      rowsXLS: [],
      action_status: null,
      action_message: "",
      product_package: [],
      config_package: [],
      po_op_data: [],
      check_config_package: [],
      material_catalogue: [],
      dataParent: [],
      total_dataParent: 0,
      dataChild: [],
      modalCheckout: false,
      packageSelected: [],
      packageChecked: new Map(),
      packageChecked_all: false,
      packageChecked_allPP: false,
      indexLoopSave: null,
      select_project_tag: new Map(),
      select_project_tag_new: [],
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      modalPOForm: false,
      PPForm: new Array(5).fill(null),
      accordion: [false],
      collapse: false,
      loadprojectdata: [],
      modalPPFedit: false,
      config_checked : new Map(),
      config_selected : [],
    }
    this.togglePOForm = this.togglePOForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeChecklistAll = this.handleChangeChecklistAll.bind(this);
    this.toggleCheckout = this.toggleCheckout.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterDebounce = debounce(this.changeFilterName, 500);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleSelectProjectChange = this.handleSelectProjectChange.bind(this);
    this.downloadAll = this.downloadAll.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.saveNewPO = this.saveNewPO.bind(this);
    this.togglePPedit = this.togglePPedit.bind(this);
    this.saveUpdatePP = this.saveUpdatePP.bind(this);
    this.getAllPP = this.getAllPP.bind(this);
    this.handleChangeChecklistAllPP = this.handleChangeChecklistAllPP.bind(this);
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

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
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
      let respond = await axios.get(API_URL_BAM+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        }
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async postDatatoAPINode(url, data) {
    try {
      let respond = await axios.post(API_URL_BAM+url, data, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        }
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data", err);
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
    this.getPODataList();
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if(value.length === 0){
      value = null;
    }
    this.setState({ filter_name: value }, () => {
      this.changeFilterDebounce(value);
    });
  }

  getPODataList(){
    let po_number = this.state.filter_name === null ? '"po_number":{"$exists" : 1}' : '"po_number":{"$regex" : "'+this.state.filter_name+'", "$options" : "i"}';
    this.getDatatoAPINode('/po_op?max_results='+this.state.perPage+'&page='+this.state.activePage+'&where={'+po_number+'}')
    .then(res =>{
      if(res.data !== undefined){
        this.setState({ po_op_data : res.data._items, prevPage : this.state.activePage, total_dataParent : res.data._meta.total })
      }else{
        this.setState({ po_op_data : [], total_dataParent : 0, prevPage : this.state.activePage});
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
          console.log("excel render", JSON.stringify(rest.rows));
          this.postDatatoAPINode('/packageConfig/checkPackageConfig', { "configData": rest.rows })
            .then(res => {
              console.log("res.data", res);
              if (res.data !== undefined) {
                this.setState({ check_config_package: res.data.configData, rowsXLS: rest.rows })
                this.toggleLoading();
              } else {
                console.log("res.data", res.response.data.error);
                this.setState({ action_status: 'failed', action_message: res.response.data.error }, () => {
                  this.toggleLoading();
                });
              }
            })
          // this.setState({ rowsXLS: rest.rows })
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


  saveProductPackage = async () => {
    this.toggleLoading();
    const isConfig = true;
    console.log(isConfig);
    if (isConfig === true) {
      console.log("this.state.check_config_package", JSON.stringify(this.state.check_config_package));
      const postConfig = await this.postDatatoAPINode('/packageConfig/saveConfigBulk', { "configData": this.state.check_config_package });
      this.setState({ action_status: 'success'}, () => {
        this.toggleLoading();
      });
      this.toggleLoading();
      console.log(postConfig);
    } else {
        this.setState({ action_status: 'failed', action_message: 'There is something error' }, () => {
          this.toggleLoading();
        });
    }
  }

  getAllPP() {
    const filter_name = this.state.filter_name;
    const project_filter = this.state.project_filter;
    let whereName = '';
    let whereProject = '';
    if (filter_name !== undefined && filter_name.length !== 0) {
      whereName = '"$or" : [{"pp_id":{"$regex" : "' + filter_name + '", "$options" : "i"}}, {"name":{"$regex" : "' + filter_name + '", "$options" : "i"}}, {"product_type":{"$regex" : "' + filter_name + '", "$options" : "i"}}, {"physical_group":{"$regex" : "' + filter_name + '", "$options" : "i"}} ]';
    }
    if (project_filter !== undefined && project_filter !== null && project_filter.length !== 0) {
      whereProject = '"list_of_project":{"$in" :["' + project_filter + '"]}'
    }
    if (project_filter === 'none') {
      whereProject = '"list_of_project":null'
    }
    if (project_filter === 'all') {
      whereProject = ''
    }
    let where = 'where={' + whereName + whereProject + '}'
    if (whereName.length !== 0 && whereProject.length !== 0) {
      where = 'where={' + whereName + ',' + whereProject + '}'
    }
    // this.getDatafromAPIBAM('/pp_sorted_nonpage?' + where).then(resPP => {
    //   if (resPP.data !== undefined) {
    //     if (resPP.data._items.length !== 0) {
    //       this.prepareData(resPP.data._items);
    //     }
    //   }
    // })
  }

  async prepareData(data_pp) {
    let product_package = data_pp;
    let material_catalogue = [];
    const dataMaterial = await this.getDatafromAPIBAM('/mc_sorted_nonpage');
    if (dataMaterial.data !== undefined) {
      material_catalogue = dataMaterial.data._items;
    }
    for (let i = 0; i < product_package.length; i++) {
      const material = material_catalogue.filter(e => e.pp_id === product_package[i].pp_id);
      product_package[i]["list_of_material"] = material;
    }
    this.setState({ pp_all: product_package });
  }

  componentDidMount() {
    this.getPODataList();
    // this.getAllPP();
    document.title = 'CPO Database | BAM';
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
    // console.log("packageSelected", dataMaterial);
  }

  handleChangeChecklistAll(e) {
    const isChecked = e.target.checked;
    const dataMaterial = this.state.product_package;
    let packageSelected = this.state.packageSelected;
    for (let i = 0; i < dataMaterial.length; i++) {
      if (isChecked === true) {
        if (this.state.packageChecked.get(dataMaterial[i]._id) !== true) {
          packageSelected.push(dataMaterial[i]);
        }
        this.setState(prevState => ({ packageChecked: prevState.packageChecked.set(dataMaterial[i]._id, true) }));
      } else {
        this.setState(prevState => ({ packageChecked: prevState.packageChecked.set(dataMaterial[i]._id, false) }));
        packageSelected = packageSelected.filter(function (pp) {
          return pp._id !== dataMaterial[i]._id;
        });
      }
    }
    this.setState({ packageSelected: packageSelected, packageChecked_all: isChecked });
    console.log("packageSelected", packageSelected);
  }

  handleChangeChecklistAllPP(e) {
    const isChecked = e.target.checked;
    const dataPPAll = this.state.pp_all;
    let packageSelected = this.state.packageSelected;
    if (isChecked === true) {
      for (let i = 0; i < dataPPAll.length; i++) {
        if (this.state.packageChecked.get(dataPPAll[i]._id) !== true) {
          packageSelected.push(dataPPAll[i]);
        }
        this.setState(prevState => ({ packageChecked: prevState.packageChecked.set(dataPPAll[i]._id, true) }));
      }
      this.setState({ packageSelected: packageSelected, packageChecked_allPP: isChecked });
    } else {
      this.setState({ packageChecked: new Map(), packageSelected: [] });
      this.setState({ packageChecked_allPP: isChecked });
    }
  }

  toggleCheckout() {
    this.setState(prevState => ({
      modalCheckout: !prevState.modalCheckout
    }));
  }

  handlePageChange(pageNumber) {
    console.log(`active page ${pageNumber}`)
    this.setState({ activePage: pageNumber, packageChecked_all: false }, () => {
      this.getPODataList();
    });
  }

  viewProjectSelected(select_project_tag) {
    let proSelected = [];
    select_project_tag.forEach((value, key, map) => proSelected.push({ "name_project": value, "id_project": key }));
    return proSelected;
  }

  deleteProjectSelected = (e) => {
    let project_key = e.target.value;
    let select_project_tag = this.state.select_project_tag;
    select_project_tag.delete(project_key);
    this.setState({ select_project_tag: select_project_tag });
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
      let select_project_tag_edit = [];
      if (ppEdit.list_of_project !== null && ppEdit.list_of_project !== undefined) {
        select_project_tag_edit = ppEdit.list_of_project.map(e => e._id);
      } else {
        select_project_tag_edit = [];
      }
      this.setState({ PPForm: dataForm, select_project_tag_new: select_project_tag_edit });
    } else {
      this.setState({ PPForm: new Array(9).fill(null), select_project_tag_new: [] });
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
    this.setState({ PPForm: dataForm }, () => {
      console.log("PPForm", this.state.PPForm);
    });
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

  async saveNewPO() {
    this.togglePOForm();
    this.toggleLoading();
    let poData = [];
    let respondSaveNew = undefined;
    const dataPPNew = this.state.PPForm;
    const dataAllPP = this.state.pp_all;
    // if (dataAllPP.find(e => e.pp_id === dataPPNew[0]) !== undefined) {
      const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
      const po_num = dataPPNew[0];
      // let pp_id_Gen = "PP" + ppcountID + " / " + pp_name;
      let pp = {
        "po_number": po_num.toString(),
        "po_year": dataPPNew[1],
        "currency": dataPPNew[2],
        "value": dataPPNew[3],
        "number_of_sites": dataPPNew[4]
        // "created_by": this.state.userId,
        // "updated_by": this.state.userId
      }
      poData.push(pp);
      console.log(pp);
      let postData = await this.postDatatoAPINode('/po_op', pp)
      .then(res => {
        console.log('response postData', res);
        if(res.data !== undefined){
          this.toggleLoading();
          console.log('single PO success created');
        }else{
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
          this.toggleLoading();
        }
      });
    // } else {
    //   this.toggleLoading();
    //   this.setState({ action_status: 'failed', action_message: 'Duplicated PP ID' });
    // }
  }

  // componentDidUpdate() {
  //   if (this.state.prevPage !== this.state.activePage) {
  //     this.getPODataList(this.state.filter_name, this.state.project_filter);
  //   }
  // }

  handleSelectProjectChange = (newValue) => {
    if (newValue !== null) {
      const selectProject = [];
      newValue.forEach(i => {
        selectProject.push(i.value)
      })
      this.setState({ select_project_tag_new: selectProject });
    } else {
      this.setState({ select_project_tag_new: [] })
    }
    return newValue;
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

    const dataPP = this.state.pp_all;

    let headerRow = ["Product Package Variant Code", "Product Package Variant", "Material Code", "Material Name", "Unit", "Qty", "Price", "Material Type", "Product Package (Customer) Code", "Product Package (Customer)", "Physical Group", "Product Type", "Note"]
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + '1').font = { size: 11, bold: true };
    }

    for (let i = 0; i < dataPP.length; i++) {
      ws.addRow([dataPP[i].pp_id, dataPP[i].product_name, "", "", dataPP[i].uom, "", "", "", dataPP[i].pp_cust_number, dataPP[i].pp_group, dataPP[i].physical_group, dataPP[i].product_type, dataPP[i].note])
      let getlastrow = ws.lastRow._number;
      ws.mergeCells('B' + getlastrow + ':D' + getlastrow);
      for (let j = 0; j < dataPP[i].list_of_material.length; j++) {
        let matIndex = dataPP[i].list_of_material[j];
        ws.addRow(["", "", matIndex.material_id, matIndex.material_name, matIndex.uom, matIndex.qty, matIndex.material_price, matIndex.material_type, "", "", "", "", ""])
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Product Package.xlsx');
  }

  exportTechnicalFormat = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataConfigSelected = this.state.config_selected;

    let confArray = ["site_title", "site_id", "site_name", "Site Config","Prioritization","Condition"];
    let typeArray = ["", "", "", "NOTE", "NOTE", "NOTE"];

    typeArray = typeArray.concat(dataConfigSelected.map(e => "CONFIG"));
    confArray = confArray.concat(dataConfigSelected.map(e => e.config_id));

    ws.addRow(typeArray);
    ws.addRow(confArray);

    const techFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([techFormat]), 'Technical BOQ Format.xlsx');
  }

  exportTSSRFormat = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const datapackageChecked = this.state.packageSelected;
    console.log("datapackageChecked", datapackageChecked);

    let ppIdArray = ["site_title", "site_id", "site_name", "Site Config","Prioritization","Condition"];
    let phyGroupArray = ["", "", "", "NOTE", "NOTE", "NOTE"];

    ppIdArray = ppIdArray.concat(datapackageChecked.map(pp => pp.pp_id + " /// " + pp.product_name));
    phyGroupArray = phyGroupArray.concat(datapackageChecked.map(pp => pp.product_type));

    ws.addRow(ppIdArray);
    ws.addRow(ppIdArray);

    const tssrFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([tssrFormat]), 'PS BOQ Format.xlsx');
  }

  // Config Template XLSX bulk upload
  exportFormatConfig = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["config_id", "sap_number", "pp_id", "qty", "price", "currency", "config_description", "config_type", "qty_commercial"]);
    ws.addRow(["CONFIG_TEST01", "SAP_TEST01", "PPID01", 2, 2400, "USD", "conf_desc_example", "conf_type_example", 235]);
    ws.addRow(["CONFIG_TEST01", "SAP_TEST01", "PPID02", 4, 1300, "USD", "conf_desc_example", "conf_type_example", 127]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'Config Uploader Template.xlsx');
  }

  exportFormatMaterial = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataPrint = this.state.packageSelected;

    ws.addRow(["PP / Material", "material_code", "material_name", "quantity", "unit", "material_type", "product_key", "product_package"]);

    for (let i = 0; i < dataPrint.length; i++) {
      ws.addRow(["Material", "child Code", "child Name", "3", "pc", "active", dataPrint[i].pp_id, dataPrint[i].product_name])
    }

    const MaterialFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MaterialFormat]), 'Material Uploader Template.xlsx');
  }

  render() {
    function AlertProcess(props) {
      const alert = props.alertAct;
      let message = props.messageAct;
      if (message === null || message === undefined) { message = "" }
      if (alert === 'failed') {
        return (
          <div className="alert alert-danger" role="alert">
            {message.length !== 0 ? message : "Sorry, there was an error when we tried to save it, please reload your page and try again"}
          </div>
        )
      } else {
        if (alert === 'success') {
          return (
            <div className="alert alert-success" role="alert">
              {message.length !== 0 ? message : "Your data has been saved"}
            </div>
          )
        } else {
          return (
            <div></div>
          )
        }
      }
    }

    return (
      <div className="animated fadeIn">
        <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message} />
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: '8px', position: 'absolute' }}>CPO Database</span>
                <div>
                  <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}>
                    <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form
                  </Button>
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
                    <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.saveProductPackage}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE </Button>
                    {/* <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.checkProductPackage}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;Check </Button> */}
                    <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button>
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
                      <table hover bordered responsive size="sm" width='100%'>
                        <thead style={{ backgroundColor: '#73818f' }} className='fixed'>
                          <tr align="center">
                            <th style={{ minWidth: '150px' }}>PO Number</th>
                            <th>Year</th>
                            <th>Currency</th>
                            <th>Price</th>
                            <th>Number of Sites</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.po_op_data.map(po =>
                            <React.Fragment key={po._id + "frag"}>
                              <tr style={{backgroundColor: '#d3d9e7'}} className='fixbody' key={po._id}>
                                <td style={{ textAlign: 'center' }}>{po.po_number}</td>
                                <td style={{ textAlign: 'center' }}>{po.po_year}</td>
                                <td style={{ textAlign: 'center' }}>{po.currency}</td>
                                <td style={{ textAlign: 'center' }}>{po.value}</td>
                                <td style={{ textAlign: 'center' }}>{po.number_of_sites}</td>
                              </tr>
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

        {/* Modal New PP */}
        <Modal isOpen={this.state.modalPOForm} toggle={this.togglePOForm} className="formmaterial">
          <ModalHeader>Form Config</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.PPForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year" >Year</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.PPForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency" >Currency</Label>
                  <Input type="text" name="2" placeholder="" value={this.state.PPForm[2]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value" >Price</Label>
                  <Input type="number" min="0" name="3" placeholder="" value={this.state.PPForm[3]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="number_of_sites" >Number of Sites</Label>
                  <Input type="number" min="0" name="4" placeholder="" value={this.state.PPForm[4]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNewPO}>Submit</Button>
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

        {/* Modal Checkout Material */}
        <Modal isOpen={this.state.modalCheckout} toggle={this.toggleCheckout} className={this.props.className}>
          <ModalHeader toggle={this.toggleCheckout}>Checkout</ModalHeader>
          <ModalBody>
            <Table hover bordered striped responsive size="sm">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th style={{ width: '50px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.product_package.filter(e => this.state.packageChecked.get(e.product_name) === true).map(pp => {
                  return (
                    <tr key={pp.product_name}>
                      <td >{pp.product_name}</td>
                      <td>
                        <Checkbox name={pp.product_name} checked={this.state.packageChecked.get(pp.product_name)} onChange={this.handleChangeChecklist} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.SubmitBoQ}>Submit</Button>
            <Button color="secondary" onClick={this.toggleCheckout}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* End Modal Checkout Material */}

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

export default connect(mapStateToProps)(CPODatabase);
