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

const API_URL_BAM = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

class PackageUpload extends React.Component {

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
      modalPPForm: false,
      PPForm: new Array(9).fill(null),
      accordion: [false],
      collapse: false,
      loadprojectdata: [],
      modalPPFedit: false,
    }
    this.togglePPForm = this.togglePPForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeChecklistAll = this.handleChangeChecklistAll.bind(this);
    this.toggleCheckout = this.toggleCheckout.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterDebounce = debounce(this.changeFilterName, 1000);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleSelectProjectChange = this.handleSelectProjectChange.bind(this);
    this.downloadAll = this.downloadAll.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.saveNewPP = this.saveNewPP.bind(this);
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

  async getDatafromAPIBAM(url) {
    try {
      let respond = await axios.get(API_URL_BAM + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
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
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
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

  async getDatatoAPINode(url) {
    try {
      let respond = await axios.get(API_URL_BAM + url, {
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

  async postDatatoAPINode(url, data) {
    try {
      let respond = await axios.post(API_URL_BAM + url, data, {
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

  async patchDatatoAPINode(url, data) {
    try {
      let respond = await axios.patch(API_URL_BAM + url, data, {
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
    this.getPackageDataAPI(value, this.state.project_filter);
    this.getAllPP();
  }

  handleChangeFilter = (e) => {
    const value = e.target.value;
    this.setState({ filter_name: value }, () => {
      this.changeFilterDebounce(value);
    });
  }

  handleChangeProjectFilter = (e) => {
    const value = e.target.value;
    this.setState({ project_filter: value }, () => {
      this.getAllPP();
    });
    this.getPackageDataAPI(this.state.filter_name, value);

  }

  handleChangeProjectTag = (e) => {
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState(prevState => ({ select_project_tag: prevState.select_project_tag.set(value, text) }));
  }

  // getPackageDataAPI(filter_name, project_filter){
  //   const page = this.state.activePage;
  //   let whereName = '';
  //   let whereProject = '';
  //   if(filter_name !== undefined && filter_name.length !== 0){
  //     whereName = '"$or" : [{"pp_id":{"$regex" : "'+filter_name+'", "$options" : "i"}}, {"name":{"$regex" : "'+filter_name+'", "$options" : "i"}}, {"product_type":{"$regex" : "'+filter_name+'", "$options" : "i"}}, {"physical_group":{"$regex" : "'+filter_name+'", "$options" : "i"}} ]';
  //   }
  //   if(project_filter !== undefined && project_filter !== null && project_filter.length !== 0){
  //     whereProject = '"list_of_project":{"$in" :["'+project_filter+'"]}'
  //   }
  //   if(project_filter === 'none'){
  //     whereProject = '"list_of_project":null'
  //   }
  //   if(project_filter === 'all'){
  //     whereProject = ''
  //   }
  //   let where = 'where={'+whereName+whereProject+'}'
  //   if(whereName.length !== 0 && whereProject.length !== 0){
  //     where = 'where={'+whereName+','+whereProject+'}'
  //   }
  //   // eslint-disable-next-line
  //   this.getDatafromAPIBAM('/pp_op?max_results='+this.state.perPage+'&page='+page+'&'+where).then(res => {
  //       if(res.data !== undefined){
  //         if(res.data._items !== undefined){
  //           this.getDataMaterial(res.data._items);
  //           this.setState({ total_dataParent : res.data._meta, prevPage : this.state.activePage});
  //       }else{
  //         this.setState({ product_package : [], total_dataParent : 0, prevPage : this.state.activePage});
  //       }
  //     }
  //   })
  // }

  getPackageDataAPI() { 
    this.getDatatoAPINode('/productpackage?lmt='+this.state.perPage+'&pg='+this.state.activePage)
      .then(res => {
        // console.log("res config data", res);
        if (res.data !== undefined) {
          console.log("res pp data", res.data);
          this.setState({ product_package: res.data.data, prevPage: this.state.activePage, total_dataParent : res.data.totalResults });
        } else {
          this.setState({ product_package: [], total_dataParent: 0, prevPage: this.state.activePage });
        }
      })
  }

  // getDataMaterial(data_pp){
  //   const array_id_doc = '"'+data_pp.map(e => e._id).join('", "')+'"';
  //   this.getDatafromAPIBAM('/mc_op?where={"id_pp_doc" : {"$in" : ['+array_id_doc+']}}').then( res => {
  //     if(res.data !== undefined){
  //       this.setState({material_catalogue : res.data._items}, () => {
  //         this.prepareView(data_pp);
  //       });
  //     }
  //   })
  // }

  // async prepareView(data_pp){
  //   let product_package = data_pp;
  //   const material_catalogue = this.state.material_catalogue;
  //   for(let i = 0; i < product_package.length; i++){
  //     const material = material_catalogue.filter(e => e.pp_id === product_package[i].pp_id);
  //     product_package[i]["list_of_material"] = material;
  //   }
  //   this.setState({product_package : product_package});
  // }

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

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        }
        else {
          // console.log("excel render", JSON.stringify(rest.rows));
          this.setState({
            rowsXLS: rest.rows
          }, () => {
            // this.formatJustChild();
          });
        }
      });
    }
  }

  checkFormatPackage(dataXLSHeader) {
    // cek the import data is for Product Package or Not
    if (this.getIndex(dataXLSHeader, 'PP / Material') !== -1 && this.getIndex(dataXLSHeader, 'pp_id') !== -1 && this.getIndex(dataXLSHeader, 'product_name') !== -1 && this.getIndex(dataXLSHeader, 'product_type') !== -1 && this.getIndex(dataXLSHeader, 'physical_group') !== -1 & this.getIndex(dataXLSHeader, 'uom') !== -1 && this.getIndex(dataXLSHeader, 'qty') !== -1 && this.getIndex(dataXLSHeader, 'pp_cust_number') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  checkFormatMaterial(dataXLSHeader){
    // cek the import data is for Material or Not
    if(this.getIndex(dataXLSHeader,'PP / Material') !== -1 && this.getIndex(dataXLSHeader,'pp_id') !== -1 && this.getIndex(dataXLSHeader,'material_id') !== -1 && (this.getIndex(dataXLSHeader,'material_name') !== -1 || this.getIndex(dataXLSHeader,'quantity') !== -1 || this.getIndex(dataXLSHeader,'uom') !== -1)){
      return true;
    }else{
      return false;
    }
  }

  saveProductPackage = async () => {
    this.toggleLoading();
    const productPackageXLS = this.state.rowsXLS;
    const isPackage = this.checkFormatPackage(productPackageXLS[0]);
    const isMaterial = this.checkFormatMaterial(productPackageXLS[0]);
    if (isPackage === true) {
      const ppData = await this.getPackageFormat(productPackageXLS);
      const postPackage = await this.postDatatoAPINode('/productpackage/manyProductPackage', { "ppData": ppData })
        .then(res => {
          if (res.data !== undefined) {
            this.setState({ action_status : 'success' });
            this.toggleLoading();
          } else {
            if(res.response !== undefined){
              if(res.response.error !== undefined){
                this.setState({ action_status: 'failed', action_message: res.response.data.error }, () => {
                  this.toggleLoading();
                });
              }else{
                this.setState({ action_status: 'failed'}, () => {
                  this.toggleLoading();
                });
              }
            }else{
              this.setState({ action_status: 'failed'}, () => {
                this.toggleLoading();
              });
            }
          }
        })
    } else if (isMaterial === true){
      let dataMat = await this.getMaterialFormat(productPackageXLS);
      console.log("dataMat", JSON.stringify(dataMat));
      const postMaterial = await this.postDatatoAPINode('/materialcatalogue/manyMaterialCatalogue', { "mcData": dataMat });
      if(postMaterial.data !== undefined){
        this.setState({ action_status : 'success' });
        this.toggleLoading();
      }else{
        if(postMaterial.response !== undefined){
          if(postMaterial.response.error !== undefined){
            this.setState({ action_status: 'failed', action_message: postMaterial.response.data.error }, () => {
              this.toggleLoading();
            });
          }else{
            this.setState({ action_status: 'failed'}, () => {
              this.toggleLoading();
            });
          }
        }else{
          this.setState({ action_status: 'failed'}, () => {
            this.toggleLoading();
          });
        }
      }
    }else{
      this.setState({ action_status: 'failed', action_message: 'Please check your format' }, () => {
        this.toggleLoading();
      });
    }
  }



  formatJustChild = async (newPackagePro) => {
    const dataXLS = this.state.rowsXLS;
    let materPP = [];
    let signSuc = [];
    const materialchild = dataXLS.map(e => e[this.getIndex(dataXLS[0], 'product_key')]).filter((e, n) => n > 0 && newPackagePro.includes(e) !== true);
    if (materialchild.length !== 0) {
      let materialchildUniq = [...new Set(materialchild)];
      materialchildUniq = materialchildUniq.filter(e => e !== undefined && e !== null && e !== '' && e !== "");
      const RespondGetPP = this.state.pp_all;
      if (RespondGetPP !== undefined) {
        if (RespondGetPP.length !== 0) {
          for (let i = 0; i < materialchildUniq.length; i++) {
            if (this.state.action_status !== null) {
              this.setState({ action_status: null });
            }
            let dataChild = dataXLS.map(e => e).filter(e => (this.checkValuetoString(e[this.getIndex(dataXLS[0], 'PP / Material')])).toLowerCase() === "material" && e[this.getIndex(dataXLS[0], 'product_key')] === materialchildUniq[i]);
            const dataParent = RespondGetPP.find(e => e.pp_id === materialchildUniq[i]);
            if (dataParent !== undefined) {
              for (let j = 0; j < dataChild.length; j++) {
                let cekChild = dataParent.list_of_material.find(i => i.material_id === dataChild[j][this.getIndex(dataXLS[0], 'material_code')]);
                if (cekChild !== undefined) {
                  let materialType = this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'material_type')], this.checkValueReturn(cekChild.material_type, "active_material"));
                  if (materialType === 'active' || materialType === 'active_material') {
                    materialType = "active_material";
                  } else {
                    if (materialType === 'passive' || materialType === 'passive_material') {
                      materialType = "passive_material";
                    } else {
                      materialType = "active_material";
                    }
                  }
                  let materialUpdate = {
                    "material_name": this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'material_name')], cekChild.material_name),
                    "uom": this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'unit')], cekChild.uom),
                    "qty": this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'quantity')], cekChild.qty),
                    "material_price": this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'price')], cekChild.material_price),
                    "material_type": materialType,
                    "updated_by": this.state.userId
                  }
                  console.log('material_type', JSON.stringify(materialUpdate));
                  let dataPatch = await this.patchDatatoAPIBAM('/mc_op/' + cekChild._id, materialUpdate, cekChild._etag);
                  if (dataPatch !== undefined && dataPatch.data !== undefined) {
                    signSuc.push(dataPatch);
                    console.log("dataPatch", dataPatch);
                  } else {
                    this.setState({ action_status: 'failed' })
                  }
                } else {
                  let materialType = this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'material_type')], 'active');
                  if (materialType === 'active' || materialType === 'active_material') {
                    materialType = "active_material";
                  } else {
                    if (materialType === 'passive' || materialType === 'passive_material') {
                      materialType = "passive_material";
                    } else {
                      materialType = "active_material";
                    }
                  }
                  let material = {
                    "id_pp_doc": dataParent._id,
                    "pp_id": dataParent.pp_id,
                    "material_id": dataChild[j][this.getIndex(dataXLS[0], 'material_code')],
                    "material_name": dataChild[j][this.getIndex(dataXLS[0], 'material_name')],
                    "material_type": materialType,
                    "uom": this.checkValue(dataChild[j][this.getIndex(dataXLS[0], 'unit')]),
                    "qty": dataChild[j][this.getIndex(dataXLS[0], 'quantity')],
                    "material_price": this.checkValueReturn(dataChild[j][this.getIndex(dataXLS[0], 'price')], 0),
                    "deleted": 0,
                    "created_by": this.state.userId,
                    "updated_by": this.state.userId
                  }
                  materPP.push(material);
                }
              }
            }
          }
        }
        if (materPP.length !== 0) {
          console.log('material_type', JSON.stringify(materPP));
          const PostMat = await this.postDatatoAPIBAM('/mc_op', materPP);
          if (PostMat.data !== undefined && PostMat.status < 400) {
            if (PostMat.data._items === undefined) {
              signSuc.push(PostMat.data);
            } else {
              signSuc = signSuc.concat(PostMat.data._items);
            }
          } else {
            this.setState({ action_status: 'failed' })
          }
        }
        if (signSuc.length === materialchild.filter(e => e !== undefined && e !== null && e !== '' && e !== "").length) {
          this.setState({ action_status: 'success' }, () => {
            this.toggleLoading();
            setTimeout(function () { window.location.reload(); }, 2000);
          });
        } else {
          if (signSuc.length !== 0) {
            this.setState({ action_status: 'success', action_message: 'your data has been saved, but some data not saved or there is some double material in the same package' }, () => {
              this.toggleLoading();
            });
          } else {
            this.setState({ action_status: 'failed' });
            this.toggleLoading();
          }
        }
      } else {
        this.setState({ action_status: 'success' }, () => {
          this.toggleLoading();
          setTimeout(function () { window.location.reload(); }, 2000);
        });
      }
    } else {
      this.setState({ action_status: 'success' }, () => {
        this.toggleLoading();
        setTimeout(function () { window.location.reload(); }, 2000);
      });
    }
  }

  async getPackageFormat(dataImport) {
    const dataHeader = dataImport[0];
    const onlyParent = dataImport.map(e => e).filter(e => (this.checkValuetoString(e[this.getIndex(dataHeader, 'PP / Material')])).toLowerCase() === "pp");
    // console.log(onlyParent);
    let product_package = [];
    let ppAlready = [];
    let ppError = [];
    let ppSpace = [];
    if (onlyParent !== undefined && onlyParent.length !== 0) {
      for (let i = 0; i < onlyParent.length; i++) {
        let pp_id = this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'pp_id')]);
        let pp_name = this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'product_name')]);
        if (pp_name === null || pp_name === undefined) { pp_name = pp_id }
        // const countPP = pp_count+i;
        const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
        // let pp_id_Gen = "PP"+ppcountID+" / "+pp_name;
        const pp = {
          "pp_id": pp_id,
          "product_name": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'product_name')]),
          "product_type": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'product_type')]),
          "physical_group": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'physical_group')]),
          "uom": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'unit')]),
          "qty": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'qty')]),
          "pp_cust_number": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'pp_cust_number')]),
          "pp_group": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'pp_group')]),
        }
        // console.log("pp data", pp);
        if (pp.physical_group !== undefined && pp.physical_group !== null) {
          pp["physical_group"] = pp.physical_group.toString();
        }
        if (pp.product_type !== undefined && pp.product_type !== null) {
          pp["product_type"] = pp.product_type.toString();
        }
        if (pp.pp_group === null || pp.pp_group === undefined) {
          pp["pp_group"] = pp.pp_id;
        }
        // let findPP = this.state.pp_all.find( e => e.pp_id === pp_id);
        // if(findPP === undefined && pp_id !== null){
        if (/\s/.test(pp_id) === true) {
          ppSpace.push(i + 2);
        } else {
          product_package.push(pp);
        }
      }
      return product_package;
      // }
      console.log('pp_id', JSON.stringify(product_package));
    } else {
      this.setState({ action_status: 'failed', action_message: 'Please check your format' }, () => {
        this.toggleLoading();
      });
    }
  }

  getMaterialFormat(dataImport){
    const dataHeader = dataImport[0];
    const onlyMaterial = dataImport.map(e => e).filter(e => (this.checkValuetoString(e[this.getIndex(dataHeader, 'PP / Material')])).toLowerCase() === "material");
    let materialList = [];
    let matErr = [];
    for (let i = 0; i < onlyMaterial.length; i++) {
      let pp_id = this.checkValue(onlyMaterial[i][this.getIndex(dataHeader, 'pp_id')]);
      let mat_id = this.checkValue(onlyMaterial[i][this.getIndex(dataHeader, 'material_id')]);
      let mat_name = this.checkValue(onlyMaterial[i][this.getIndex(dataHeader, 'material_name')]);
      if (mat_name === null || mat_name === undefined) { mat_name = mat_id }
      const matIdx = {
        "pp_id": pp_id,
        "material_id": mat_id,
        "material_name": mat_name,
        "material_type": this.checkValue(onlyMaterial[i][this.getIndex(dataHeader, 'material_type')]),
        "uom": this.checkValue(onlyMaterial[i][this.getIndex(dataHeader, 'uom')]),
        "qty": this.checkValue(onlyMaterial[i][this.getIndex(dataHeader, 'quantity')]),
        "po_number": ""
      }
      if (matIdx.material_id !== undefined && matIdx.material_id !== null) {
        matIdx["material_id"] = matIdx.material_id.toString();
      }
      if (matIdx.material_name !== undefined && matIdx.material_name !== null) {
        matIdx["material_name"] = matIdx.material_name.toString();
      }
      if (matIdx.qty === null || matIdx.qty === undefined) {
        matIdx["qty"] = parseInt(matIdx.qty);
      }
      if (matIdx.pp_id === null || matIdx.pp_id === undefined) {
        matIdx["pp_id"] = matIdx.pp_id;
      }
      if(pp_id !== null && mat_id !== null){
        materialList.push(matIdx);
      }else{
        matErr.push(i);
      }
    }
    return materialList;
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
    this.getDatafromAPIBAM('/pp_sorted_nonpage?' + where).then(resPP => {
      if (resPP.data !== undefined) {
        if (resPP.data._items.length !== 0) {
          this.prepareData(resPP.data._items);
        }
      }
    })
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
    this.getPackageDataAPI();
    // this.getAllPP();
    document.title = 'Product Package | BAM';
  }

  handleChangeChecklist(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const dataMaterial = this.state.product_package;
    let packageSelected = this.state.packageSelected;
    if (isChecked === true) {
      const getMaterial = dataMaterial.find(pp => pp._id === item);
      packageSelected.push(getMaterial);
    } else {
      packageSelected = packageSelected.filter(function (pp) {
        return pp._id !== item;
      });
    }
    this.setState({ packageSelected: packageSelected });
    this.setState(prevState => ({ packageChecked: prevState.packageChecked.set(item, isChecked) }));
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
    this.setState({ activePage: pageNumber, packageChecked_all: false }, () => {
      this.getPackageDataAPI();
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
			"pp_id": dataPPEdit[0],
			"product_name" : dataPPEdit[1],
			"product_type": dataPPEdit[3],
			"physical_group": dataPPEdit[4],
			"uom": dataPPEdit[2],
			"qty": 0,
			"pp_cust_number" : this.checkValue(dataPPEdit[5]),
			"pp_group" : this.checkValue(dataPPEdit[6])
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
    let patchData = await this.patchDatatoAPINode('/productpackage/updateManyProductPackage', {"ppData" : [pp]});
    if (patchData === undefined) { patchData = {}; patchData["data"] = undefined }
    if (patchData.data !== undefined) {
      this.setState({ action_status: 'success' }, () => {
        this.toggleLoading();
        setTimeout(function () { window.location.reload(); }, 2000);
      });
    }else{
      this.toggleLoading();
      this.setState({ action_status: 'failed' });
    }
  }

  async saveNewPP() {
    this.togglePPForm();
    this.toggleLoading();
    let respondSaveNew = undefined;
    let ppData = [];
    const dataPPNew = this.state.PPForm;
    const dataAllPP = this.state.pp_all;
    // console.log(dataAllPP);
    // if (dataAllPP.find(e => e.pp_id === dataPPNew[1]) !== undefined) {
      const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
      const pp_name = dataPPNew[1];
      let pp_id_Gen = "PP" + ppcountID + " / " + pp_name;
      let pp = {
        "pp_id": dataPPNew[0],
        "product_name": pp_name.toString(),
        "product_type": dataPPNew[2],
        "physical_group": dataPPNew[3],
        "uom": dataPPNew[4],
        "qty": dataPPNew[5],
        "pp_cust_number": this.checkValue(dataPPNew[8]),
        "pp_group": this.checkValue(dataPPNew[6])
        // "created_by": this.state.userId,
        // "updated_by": this.state.userId
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
      ppData.push(pp);
      // return ppData;
      // console.log('pp data', ppData);
      let postData = await this.postDatatoAPINode('/productpackage/manyProductPackage', {"ppData" : ppData})
        .then(res => {
          console.log('response postData', res);
          if(res.data !== undefined){
            this.toggleLoading();
            console.log('single PP success created');
          }else{
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
            this.toggleLoading();
          }
        });
      // console.log('postData Save', postData);
      // if (postData === undefined) { postData = {}; postData["data"] = undefined }
      // if (postData.data !== undefined) {
      //   respondSaveNew = postData.data;
      // }
      // if (respondSaveNew !== undefined) {
      //   this.setState({ action_status: 'success' }, () => {
      //     this.toggleLoading();
      //     setTimeout(function () { window.location.reload(); }, 2000);
      //   });
      // } else {
      //   this.setState({ action_status: 'failed' });
      //   this.toggleLoading();
      // }
    // } else {
    //   this.toggleLoading();
    //   this.setState({ action_status: 'failed', action_message: 'Duplicated PP ID' });
    // }
  }

  // componentDidUpdate() {
  //   if (this.state.prevPage !== this.state.activePage) {
  //     this.getPackageDataAPI(this.state.filter_name, this.state.project_filter);
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

    const datapackageSelected = this.state.packageSelected;

    let ppIdArray = ["project", "site_id", "site_name"];
    let phyGroupArray = ["", "", ""];

    ppIdArray = ppIdArray.concat(datapackageSelected.map(pp => pp.pp_id + " /// " + pp.product_name));
    phyGroupArray = phyGroupArray.concat(datapackageSelected.map(pp => pp.product_type));

    ws.addRow(phyGroupArray);
    ws.addRow(ppIdArray);

    const techFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([techFormat]), 'Technical BOQ Format.xlsx');
  }

  exportTSSRFormat = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const datapackageChecked = this.state.packageSelected;

    let ppIdArray = ["site_title", "site_id", "site_name"];
    let phyGroupArray = ["", "", ""];

    ppIdArray = ppIdArray.concat(datapackageChecked.map(pp => pp.pp_id + " /// " + pp.product_name));
    phyGroupArray = phyGroupArray.concat(datapackageChecked.map(pp => pp.product_type));

    ws.addRow(phyGroupArray);
    ws.addRow(ppIdArray);

    const tssrFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([tssrFormat]), 'PS BOQ Format.xlsx');
  }

  exportFormatPackage = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["PP / Material", "product_key", "product_package", "unit", "price", "product_package_physical_group", "product_package_type", "cust_product_number", "cust_product_name", "note"]);
    ws.addRow(["PP", "product key 1", "L1 Name 1", "pc", 0, "Radio", "HW", "customer product number 1", "customer product name 1", ""]);
    ws.addRow(["PP", "product key 2", "L2 Name 2", "pc", 0, "Radio", "HW", "customer product number 2", "customer product name 2", ""]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'PP Uploader Template.xlsx');
  }

  exportFormatMaterial = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataPrint = this.state.packageSelected;

    ws.addRow(["PP / Material", "material_id", "material_name", "quantity", "uom", "material_type", "pp_id", "product_package_name"]);

    for (let i = 0; i < dataPrint.length; i++) {
      ws.addRow(["Material", "child id", "child Name", "3", "pc", "active", dataPrint[i].pp_id, dataPrint[i].product_name])
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
                <span style={{ marginTop: '8px', position: 'absolute' }}>Product Package / Material</span>
                <div className="card-header-actions" style={{ display: 'inline-flex' }}>
                  <div style={{ marginRight: "10px" }}>
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                      <DropdownToggle caret color="light">
                        Download Template
                        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportFormatPackage}>> Product Package Template</DropdownItem>
                        <DropdownItem onClick={this.exportFormatMaterial} disabled={this.state.packageChecked.length === 0}>> Material Template</DropdownItem>
                        <DropdownItem onClick={this.downloadAll}>> Download All PP</DropdownItem>
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
                          {/* }<tr>
                      <td>Project Tag</td>
                      <td>:</td>
                      <td style={{paddingLeft:"7px"}}>
                        <Select
                          isMulti
                          name="ProjectTag"
                          options={this.state.loadprojectdata}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={this.handleSelectProjectChange}
                          isDisabled = {this.state.rowsXLS.length === 0}
                        />
                      </td>
                      </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.saveProductPackage}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE </Button>
                    <Button color="primary" style={{ float: 'right' }} onClick={this.togglePPForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button>
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '500' }}>Material List</span>
                      <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                        <span style={{ marginRight: '10px' }}>
                          <Checkbox name={"allPP"} checked={this.state.packageChecked_allPP} onChange={this.handleChangeChecklistAllPP} disabled={this.state.pp_all.length === 0} />
                          Select All
                    </span>
                        <span style={{ marginRight: '10px' }}>Project Tag : </span>
                        {/*}<select style={{marginRight: '10px', marginTop : '2.85px', borderBottomWidth : '2.5px'}} className="search-box-project" name="ProjectFilter" type="select" onChange={this.handleChangeProjectFilter} value={this.state.project_filter}>
                      <option value="all">All</option>
                      <option value="none">None</option>
                      {this.state.project_all.map( project =>
                        <option key={project._id} value={project._id}>{project.project_name}</option>
                      )}
                    </select>*/}
                        <input className="search-box-material" type="text" name='filter' placeholder="Search Package Name" onChange={this.handleChangeFilter} value={this.state.filter_name} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='divtable'>
                      <table hover bordered responsive size="sm" width='100%'>
                        <thead style={{ backgroundColor: '#c6f569' }} className='fixed'>
                          <tr align="center">
                            <th>
                              <Checkbox name={"all"} checked={this.state.packageChecked_all} onChange={this.handleChangeChecklistAll} />
                            </th>
                            <th style={{ minWidth: '150px' }}>Product Package</th>
                            <th>Material Name</th>
                            <th>PP / Material Code</th>
                            <th>Unit</th>
                            <th>Qty</th>
                            <th>Price</th>
                            {/* <th>Product Package</th> */}
                            <th>Physical Group</th>
                            <th>Product / Material Type</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.product_package.map(pp =>
                            <React.Fragment key={pp._id + "frag"}>
                              <tr style={{ backgroundColor: '#E5FCC2' }} className='fixbody' key={pp._id}>
                                <td align="center"><Checkbox name={pp._id} checked={this.state.packageChecked.get(pp._id)} onChange={this.handleChangeChecklist} value={pp} /></td>
                                <td colSpan="2" style={{ textAlign: 'left' }}>{pp.product_name}</td>
                                <td style={{ textAlign: 'left' }}>{pp.pp_id}</td>
                                <td style={{ textAlign: 'center' }}>{pp.uom}</td>
                                <td style={{ textAlign: 'left' }}></td>
                                <td style={{ textAlign: 'center' }}>{pp.price}</td>
                                {/* <td style={{textAlign : 'left'}}>{pp.pp_group}</td> */}
                                <td style={{ textAlign: 'center' }}>{pp.physical_group}</td>
                                <td style={{ textAlign: 'center' }}>{pp.product_type}</td>
                                <td>
                                  <Button size='sm' color="secondary" value={pp.pp_id} onClick={this.togglePPedit} title='Edit'>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                  </Button>
                                </td>
                              </tr>
                              {pp.materials.map(mat =>
                                <tr className='fixbodymat' key={mat._id}>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'left' }}>{mat.material_name}</td>
                                  <td style={{ textAlign: 'left' }}>{mat.material_id}</td>
                                  <td style={{ textAlign: 'center' }}>{mat.uom}</td>
                                  <td style={{ textAlign: 'center' }}>{mat.qty}</td>
                                  <td style={{ textAlign: 'left' }}></td>
                                  {/* }<td style={{textAlign : 'left'}}></td> */}
                                  <td style={{ textAlign: 'left' }}></td>
                                  <td style={{ textAlign: 'center' }}>{mat.material_type}</td>
                                  <td></td>
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
                      totalItemsCount={this.state.total_dataParent}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </Col>

                  <Col>
                    <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                      <Button color="warning" disabled={this.state.packageChecked.length === 0} onClick={this.exportTechnicalFormat}> <i className="fa fa-download" aria-hidden="true"> </i> &nbsp;Download Technical Format</Button>
                    </div>
                    <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                      <Button color="warning" disabled={this.state.packageChecked.length === 0} onClick={this.exportTSSRFormat}> <i className="fa fa-download" aria-hidden="true"> </i> &nbsp; Download PS Format</Button>
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

        {/* Modal New Single PP */}
        <Modal isOpen={this.state.modalPPForm} toggle={this.togglePPForm} className="formmaterial">
          <ModalHeader>Form Product Package</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="pp_id">PP ID</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.PPForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="product_name">Product Name</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.PPForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="product_type" >Product Type</Label>
                      <Input type="text" name="2" placeholder="" value={this.state.PPForm[2]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="physical_group" >Physical Group</Label>
                      <Input type="text" name="3" placeholder="" value={this.state.PPForm[3]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="uom" >Unit Of Measure</Label>
                      <Input type="text" name="4" placeholder="" value={this.state.PPForm[4]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="qty" >Quantity</Label>
                      <Input type="number" min="1" name="5" placeholder="" value={this.state.PPForm[5]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="pp_cust_number" >Product Number (Cust)</Label>
                      <Input type="text" name="8" placeholder="" value={this.state.PPForm[8]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pp_group" >PP Group</Label>
                  <Input type="text" name="6" placeholder="" value={this.state.PPForm[6]} onChange={this.handleChangeForm} />
                </FormGroup>
                {/* <FormGroup>
                  <Label htmlFor="note" >Note</Label>
                  <Input type="text" name="7" placeholder="" value={this.state.PPForm[7]} onChange={this.handleChangeForm} />
                </FormGroup> */}
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
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="pp_id" >Product Number (Cust)</Label>
                      <Input type="text" name="5" placeholder="" value={this.state.PPForm[5]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col>
                  {/* }<Col xs="4">
                    <FormGroup>
                      <Label htmlFor="price" >Price</Label>
                      <Input type="number" name="8" placeholder="" value={this.state.PPForm[8]} onChange={this.handleChangeForm} />
                    </FormGroup>
                  </Col> */}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pp_group" >Product Name (Cust)</Label>
                  <Input type="text" name="6" placeholder="" value={this.state.PPForm[6]} onChange={this.handleChangeForm} />
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

export default connect(mapStateToProps)(PackageUpload);
