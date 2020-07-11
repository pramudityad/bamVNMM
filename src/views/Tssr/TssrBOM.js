import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, Spinner } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {ExcelRenderer} from 'react-excel-renderer';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
// import debounce from 'lodash.debounce';
import debounce from "debounce-promise";

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_PDB_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXLApi = 'adminbamidsuper';
const passwordXLApi = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

if(Array.prototype.equals)
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length)
    return false;

  for (var i = 0, l=this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

class TssrBOM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      rowsXLS : [],
      project_name_selected : null,
      cd_id_selected : null,
      dataTssrUpload : [],
      waiting_status : null,
      action_status : null,
      action_message : null,
      redirectSign : false,
      project_selected : null,
      project_name_selected : null,
      list_site_selected : null,
      list_site_tech_boq_selected : null,
      list_project : [],
      list_site : [],
      list_site_selection : [],
      dataTech : [],
      change_qty_ps : new Map(),
      list_tssr_selected : [],
      data_tssr_selected : [],
    };
    this.saveTssrBOM = this.saveTssrBOM.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeSiteTSSR = this.handleChangeSiteTSSR.bind(this);
    this.handleChangeQtyPS = this.handleChangeQtyPS.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.previewTSSRtoPS = this.previewTSSRtoPS.bind(this);
    this.removeSiteTSSR = this.removeSiteTSSR.bind(this);
  }

  async getDataFromAPINODEWithParams(url) {
    try {
      let respond = await axios({
        method : "get",
        url : API_URL_NODE+url,
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
        params :{

        }
      })
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

  async getDatafromAPIXL(url) {
    try {
      let respond = await axios.get(API_URL_PDB_XL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameXLApi,
          password: passwordXLApi
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Get Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async getDatafromAPIBAM(url) {
    try {
      let respond = await axios.get(API_URL_BAM +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Get Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async postDatatoAPIBAM(url, data) {
    try {
      let respond = await axios.post(API_URL_BAM +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(API_URL_NODE+url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data Node", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data Node", err.response);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE+url, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data Node", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data Node", err);
      return respond;
    }
  }

  async patchDatatoAPIBAM(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_BAM +url, data, {
        headers : {'Content-Type':'application/json', "If-Match" : _etag},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  checkValue(props) {
    //Swap undefined to null
    if(typeof props === 'undefined') {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoZero(props) {
    //Swap undefined or null to 0
    if(typeof props == 'undefined' || props == null) {
      return 0;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    //Swap undefined or null to ""
    if( typeof props == 'undefined' || props == null ) {
      return "";
    } else {
      return props;
    }
  }

  isSameValue(element,value) {
    //function for FindIndex
    return element === value;
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex(e => this.isSameValue(e,value));
  }

  componentDidMount() {
    this.getDataProject();
    // this.getDataTech();
  }

  getDataProject() {
    this.getDatafromAPIXL('/project_sorted_non_page').then( resProject => {
      if(resProject.data !== undefined){
        this.setState({ list_project : resProject.data._items })
      }
    })
  }

  getDataTech() {
    this.getDataFromAPINODEWithParams('/plantspec/tssrBom/'+this.state.list_site_tech_boq_selected+'/siteId/'+this.state.list_site_selected).then( resTech => {
      if(resTech.data !== undefined){
        this.setState({ dataTech : resTech.data.data });
        this.prepareView(resTech.data.data);
      }
    })
  }

  prepareView(dataSiteTech){
    let dataTech = dataSiteTech;
    let dataPackage = dataTech.listOfPackage;
    let dataPackageUniqID = [...new Set(dataPackage.map(({ pp_id}) => pp_id))];
    let dataPackageUniqSum = [];
    for(let i = 0; i < dataPackageUniqID.length; i++){
      let dataPackageId = dataPackage.filter(e => e.pp_id === dataPackageUniqID[i]);
      dataPackageId[0]["qty"] = dataPackageId.reduce((a,b) => a + b.qty, 0);
      dataPackageUniqSum.push(dataPackageId[0]);
    }
    dataTech["listOfPackage"] = dataPackageUniqSum;
    this.setState({dataTech :dataTech });
  }

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if(fileObj !== undefined){
      ExcelRenderer(fileObj, (err, rest) => {
        if(err){
          console.log(err);
        }
        else{
          this.setState({
            action_status : null,
            action_message : null
          }, () => {
            this.ArrayEmptytoNull(rest.rows);
          });
        }
      });
    }
  }

  ArrayEmptytoNull(dataXLS) {
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++) {
      let col = [];
      for(let j = 0; j < dataXLS[1].length; j++) {
        col.push(this.checkValue(dataXLS[i][j]));
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
    this.formatDataTSSR(newDataXLS);
  }

  handleChangeProject(e) {
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_selected : value, project_name_selected : text}, () => {
      // this.getListSiteTechforPS(value);
    });
  }

  handleChangeSiteTSSR(e) {
    const value = e.value;
    const text = e.label;
    const list_site_idx = this.state.list_site.find(e => e._id === value);
    let dataArrayTssr = this.state.list_tssr_selected;
    dataArrayTssr.push({"site_selected" : value, "id_tssr_boq_doc" : e.id_tssr_boq_doc, "label" : text});
    this.setState({list_site_selected : value, list_site_tech_boq_selected : e.id_tssr_boq_doc, list_tssr_selected : dataArrayTssr }, () => {
      // this.getDataTech();
    });
  }

  removeSiteTSSR(_id_site){
    // const _id_site = e.target.value;
    console.log("_id_site", _id_site);
    let dataArrayTssr = this.state.list_tssr_selected;
    dataArrayTssr = dataArrayTssr.filter(e => e.site_selected != _id_site);
    this.setState({list_tssr_selected : dataArrayTssr});
  }

  formatDataTSSR = async(dataXLS) => {
    let action_message = "";
    let actionStatus = null;
    let SitesOfTSSRNew = [];
    this.setState({waiting_status : 'loading'});
    const staticHeader = ["site_title", "site_id", "site_name"];
    const staticHeaderXLS = dataXLS[1].filter((e,n) => n < 3);
    if(staticHeaderXLS.equals(staticHeader) !== true){
      actionStatus = "failed"
      this.setState({action_status : "failed", action_message : action_message + "Please check your upload format or Package Number"});
    }
    if(actionStatus !== "failed"){
      let dataPackage = [];
      const index_item = 3;
      let RespondGetPP = [];
      const ppid_upload = [];
      let pp_id_special = [];
      for(let j = index_item ; j < dataXLS[1].length; j++){
        let idXLSIndex = dataXLS[1][j].toString().split(" /// ",1);
        if(Array.isArray(idXLSIndex) == true){
          idXLSIndex = idXLSIndex.join();
          if(idXLSIndex.includes("\"")){
            pp_id_special.push(idXLSIndex);
          }else{
            ppid_upload.push(idXLSIndex);
          }
        }
      }
      RespondGetPP = await this.getAllPP(ppid_upload, pp_id_special);
      this.setState({waiting_status : null});
      if(RespondGetPP.length !== 0){
        dataPackage = RespondGetPP;
      }
      let id_PP = new Map();
      let _id_PP = new Map();
      let pp_key = new Map();
      let pp_name = new Map();
      let group_PP = new Map();
      let pp_cust_num = new Map();
      let physical_group = new Map();
      let pp_type = new Map();
      let pp_unit = new Map();
      let data_duplicated = [];
      let data_undefined = [];
      let dataAllnull = [];
      let siteIDNull = [];
      for(let j = index_item ; j < dataXLS[1].length; j++){
        let idXLSIndex = dataXLS[1][j].toString().split(" /// ",1);
        if(Array.isArray(idXLSIndex) == true){
          idXLSIndex = idXLSIndex.join();
        }
        let get_id_PP = dataPackage.find(PP => PP.pp_id === idXLSIndex);
        let cekAllZero = dataXLS.map( e => this.checkValuetoZero(e[j]) ).filter( (e,n) => n>1);
        if(cekAllZero.every( e => e == 0)){
          dataAllnull.push(idXLSIndex);
        }
        if(get_id_PP === undefined){
          data_undefined.push(idXLSIndex)
        }else{
          if(id_PP.get(idXLSIndex) === undefined){
            id_PP.set(idXLSIndex, get_id_PP.pp_id);
            pp_key.set(idXLSIndex, get_id_PP.pp_key);
            _id_PP.set(idXLSIndex, get_id_PP._id);
            group_PP.set(idXLSIndex, get_id_PP.pp_group)
            pp_name.set(idXLSIndex, get_id_PP.product_name);
            pp_cust_num.set(idXLSIndex, get_id_PP.pp_cust_number);
            physical_group.set(idXLSIndex, get_id_PP.physical_group)
            pp_type.set(idXLSIndex, get_id_PP.product_type);
            pp_unit.set(idXLSIndex, get_id_PP.uom);
          }else{
            data_duplicated.push(idXLSIndex);
          }
        }
      }
      if(data_undefined.length !== 0){
        actionStatus = "failed";
        let twoSentence = action_message.length !== 0 ? "and <br />" : "";
        action_message = "Please check your upload format or Package Number in "+data_undefined.join(", ")+twoSentence+action_message;
      }
      if(data_duplicated.length !== 0){
        actionStatus = "failed";
        let twoSentence = action_message.length !== 0 ? "and <br />" : "";
        action_message = action_message+twoSentence+" There are Duplicated PP in "+data_duplicated.join(", ");
      }
      let siteSaveFormat = [];
      let siteError = [];
      for(let i = 2; i < dataXLS.length; i++){
        if(this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]) !== null && this.state.action_status !== "failed" && actionStatus !== "failed"){
          let packageDatas = []
          for(let j = index_item ; j < dataXLS[1].length; j++){
            let dataXLSIndex = dataXLS[1][j].split(" /// ",1).join();
            if(dataAllnull.includes(dataXLSIndex) === false){
              let package_data = {
                "id_pp_doc" : _id_PP.get(dataXLSIndex),
                "pp_id" : dataXLSIndex,
                "pp_group" : group_PP.get(dataXLSIndex),
                "pp_cust_number" : pp_cust_num.get(dataXLSIndex),
                "product_name" : pp_name.get(dataXLSIndex).toString(),
                "physical_group" : physical_group.get(dataXLSIndex),
                "product_type" : pp_type.get(dataXLSIndex),
                "uom" : pp_unit.get(dataXLSIndex),
                "qty" : this.checkValuetoZero(dataXLS[i][j]),
                "version" : "0",
                "deleted" : 0,
                "created_by" : this.state.userId,
                "updated_by" : this.state.userId
              }
              packageDatas.push(package_data);
            }
          }
          let siteID = this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]).toString();
          let SiteBOQTech = {
            "account_id" : "1",
            "site_id" : siteID,
            "site_name" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_name')]),
            "site_title" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_title')]),
            "list_of_site_items" : packageDatas,
            "version" : "0",
            "created_by" : this.state.userId,
            "updated_by" : this.state.userId,
            "deleted" : 0
          }
          if(SiteBOQTech.site_name !== null){
            SiteBOQTech["site_name"] = SiteBOQTech.site_name.toString();
          }
          if(SiteBOQTech.site_title !== null){
            SiteBOQTech["site_title"] = SiteBOQTech.site_title.toString();
          }
          if(siteID.length === 0){
            siteIDNull.push(null);
          }
          if(siteSaveFormat.find(e => e === SiteBOQTech.site_id) !== undefined){
            siteError.push(SiteBOQTech.site_id);
          }
          siteSaveFormat.push(SiteBOQTech.site_id);
          SitesOfTSSRNew.push(SiteBOQTech);
        }
      }
      if(siteIDNull.length !== 0){
        actionStatus = "failed";
        let twoSentence = action_message.length !== 0 ? "and " : "";
        action_message = action_message+twoSentence+"Site ID cant NULL";
      }
      if(siteError.length !== 0){
        actionStatus = "failed";
        let twoSentence = action_message.length !== 0 ? "and " : "";
        action_message = action_message+twoSentence+"There are duplicate site";
      }
      if(actionStatus === 'failed'){
        if(action_message.length === 0){
          action_message = null;
        }
        this.setState({action_status : "failed", action_message : action_message});
      }
      if(actionStatus !== 'failed'){
        this.setState({action_message : null});
      }
    }
    this.setState({dataTssrUpload : SitesOfTSSRNew});
    return SitesOfTSSRNew;
  }

  async getAllPP(array_PP, array_PP_sepcial){
    let dataPP = [];
    let arrayDataPP = array_PP;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
      let arrayIdPP = '"'+DataPaginationPP.join('", "')+'"';
      arrayIdPP = arrayIdPP.replace("&", "%26");
      let where_id_PP = '?where={"pp_id" : {"$in" : ['+arrayIdPP+']}}';
      let resPP = await this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP);
      if(resPP !== undefined){
        if(resPP.data !== undefined){
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    for(let i = 0 ; i < array_PP_sepcial.length; i++){
      let dataPPIndex = array_PP_sepcial[i];
      dataPPIndex = dataPPIndex.replace("\"", "");
      let where_id_PP = '?where={"pp_id":{"$regex" : "'+dataPPIndex+'", "$options" : "i"}}';
      let resPP = await this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP);
      if(resPP !== undefined){
        if(resPP.data !== undefined){
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    return dataPP;
  }

  preparingDataTSSR(){
    //Before Show preview and user can click save button
    const dataTSSRXls = this.state.rowsXLS;
    for(let i = 2; i < dataTSSRXls.length; i++){

    }

  }

  preparingSaveTssr(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100);
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString()+dateNow.getDate().toString()+"-"+dataRandom.toString().padStart(4, '0');
    return numberTSSR;
  }

  // async saveTssrBOM(){
  //   let site_items = [], each_site_item = {};
  //   this.state.dataTech.listOfPackage.map(pp => {
  //     each_site_item = {
  //       "id_pp_doc": pp.id_pp_doc,
  //       "pp_id": pp.pp_id,
  //       "product_name": pp.product_name,
  //       "pp_group": pp.product_name,
  //       "pp_cust_number": pp.pp_id,
  //       "physical_group": pp.physical_group,
  //       "product_type": pp.product_type,
  //       "uom": pp.uom,
  //       "qty": !this.state.change_qty_ps.has(pp.pp_id) ? pp.qty : this.state.change_qty_ps.get(pp.pp_id).length === 0 ? 0 : this.state.change_qty_ps.get(pp.pp_id),
  //     }
  //     site_items.push(each_site_item);
  //   })
  //   let tssrData = {
  //     "tssr_info" : {
  //       "no_tssr_boq": "",
  //       "id_boq_tech_doc" : this.state.dataTech.id_tssr_boq_doc,
  //       "no_boq_tech" : this.state.dataTech.no_tech_boq,
  //       "id_project_doc" : this.state.dataTech.id_project_doc,
  //       "project_name" : this.state.dataTech.project_name
  //     },
  //     "sites_data" : [
  //       {
  //         "site_info" : {
  //           "site_title" : "NE",
  //           "site_id" : this.state.dataTech.site_id,
  //           "site_name" : this.state.dataTech.site_name,
  //           "id_site_doc" : "5e99545b8c02d7501b1ae8bf"
  //         },
  //         "site_items" : site_items
  //       }
  //     ]
  //   }
  //   const respondSaveTSSR = await this.postDatatoAPINODE('/createTssrData', tssrData);
  //   if(respondSaveTSSR.data !== undefined && respondSaveTSSR.status >= 200 && respondSaveTSSR.status <= 300 ){
  //     this.setState({ action_status : 'success', action_message : 'PS has been saved successfully!' });
  //   } else{
  //     this.setState({ action_status : 'failed' });
  //   }
  // }

  async saveTssrBOM(){
    // setTimeout(function () { this.setState({redirectSign : "5ec2d5bb5ac433f42df7401a"}); }.bind(this), 2000);
    const respondSaveTSSR = await this.postDatatoAPINODE('/plantspec/createPlantspec2', {"psData" : this.state.data_tssr_selected});
    if(respondSaveTSSR.data !== undefined && respondSaveTSSR.status >= 200 && respondSaveTSSR.status <= 300 ){
      this.setState({ action_status : 'success', action_message : 'PS has been saved successfully!' });
      setTimeout(function () { this.setState({redirectSign : respondSaveTSSR.data.objMrPs._id}); }.bind(this), 2000);
    } else{
      if(respondSaveTSSR.response !== undefined && respondSaveTSSR.response.data !== undefined && respondSaveTSSR.response.data.error !== undefined){
        if(respondSaveTSSR.response.data.error.message !== undefined){
          this.setState({ action_status: 'failed', action_message: respondSaveTSSR.response.data.error.message });
        }else{
          this.setState({ action_status: 'failed', action_message: respondSaveTSSR.response.data.error });
        }
      }else{
        this.setState({ action_status: 'failed' });
      }
    }
  }

  handleChangeQtyPS(e){
    const name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({ change_qty_ps: prevState.change_qty_ps.set(name, value) }));
  }

  // filterSiteTSSR = (inputValue) => {
  //   const list = [];
  //   let list_site_api = this.state.list_site.filter(i =>
  //     i.site_id.toLowerCase().includes(inputValue.toLowerCase()) || i.no_tech_boq.toLowerCase().includes(inputValue.toLowerCase())
  //   )
  //   list_site_api.map(site =>
  //       list.push({'value' : site._id, 'label' : site.site_id +" ("+site.no_tech_boq+")"})
  //   )
  //   this.setState({list_site_selection : list});
  //   return this.state.list_site_selection.filter(i =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  filterSiteTSSR = async(inputValue) => {
    if(!inputValue || inputValue.length < 3 ) {
      return [];
    } else {
      let site_tssr_list = [];
      const getSiteTSSR = await this.getDataFromAPINODE('/plantspec/getTechnicalByProjectId2/'+this.state.project_selected+'?siteId='+inputValue);
      if(getSiteTSSR !== undefined && getSiteTSSR.data !== undefined) {
        getSiteTSSR.data.data.map(site =>
          site_tssr_list.push({'value' : site._id, 'label' : "PS "+site.no_tssr_boq+"-"+site.site_id +" ("+site.program+")", 'id_tssr_boq_doc' : site.id_tssr_boq_doc })
        );
      }
      console.log("site_tssr_list", site_tssr_list);
      return site_tssr_list;
    }
  };

  loadOptions = async(inputValue, callback) => {
    return this.filterSiteTSSR(inputValue);
  };

  async previewTSSRtoPS(){
    this.setState({ action_status: null, action_message: null });
    let tssrSelected = this.state.list_tssr_selected;
    let dataTSSRforGet = [];
    tssrSelected.map( e =>
      dataTSSRforGet.push(
        {
          "techBoqId": e.id_tssr_boq_doc,
          "siteId": e.site_selected
        }
      )
    );
    this.postDatatoAPINODE('/plantspec/getTssrData2', {"data" : dataTSSRforGet}).then(res => {
      if(res.data !== undefined){
        this.setState({data_tssr_selected : res.data.psData})
      }else{
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    });
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/ps-list/'+this.state.redirectSign} />);
    }
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >Plant Spec Group</span>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <table style={{marginBottom : '20px'}}>
              <tbody>
                <tr>
                  <td style={{paddingTop : '10px', width : '150px'}}>
                    Project Name
                  </td>
                  <td style={{paddingTop : '10px', paddingRight : '10px'}}>
                    :
                  </td>
                  <td>
                    <Input style={{marginTop : '10px', marginBottom : '10px'}} name="project" type="select" onChange={this.handleChangeProject} value={this.state.project_selected}>
                      <option value={null} selected disabled hidden></option>
                      {this.state.list_project.map( project =>
                        <option value={project._id}>{project.Project}</option>
                      )}
                    </Input>
                  </td>
                </tr>
                <tr>
                  <td style={{paddingTop : '10px', width : '150px'}}>
                    Site
                  </td>
                  <td style={{paddingTop : '10px', paddingRight : '10px'}}>
                    :
                  </td>
                  <td style={{width : '400px'}}>
                    {this.state.list_tssr_selected.map(e =>
                      <tr>
                        <td>
                          {e.label} <i className="fa fa-window-close" style={{ marginLeft: "8px", color : '#ef5350' }} value={e.site_selected} onClick={() => this.removeSiteTSSR(e.site_selected)}></i>
                        </td>
                      </tr>
                    )}
                    <tr>
                      {this.state.project_selected === null ? (
                        <td style={{paddingTop : '10px'}}></td>
                      ) : (
                        <td style={{width : '400px'}}>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={debounce(this.loadOptions, 500)}
                          defaultOptions
                          onChange={this.handleChangeSiteTSSR}
                          isDisabled={this.state.list_tssr_selected.length >= 2}
                        />
                        </td>
                      )}
                    </tr>
                    {(this.state.project_selected !== null) && (
                      <tr>
                        <td>
                          <Button onClick={this.previewTSSRtoPS} size="sm" color="success">
                            Preview
                          </Button>
                        </td>
                      </tr>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button color="success" onClick={this.saveTssrBOM} style={{float : 'right'}} disabled={this.state.data_tssr_selected.length === 0}>Save</Button>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>PLANT SPEC GROUP PREVIEW</td>
                </tr>
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            <div className='divtable2'>
              <Table hover bordered striped responsive size="sm">
                <thead style={{backgroundColor : '#0B486B', color : 'white'}}>
                  <tr>
                    <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>Tech No.</th>
                    <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>Bundle / Material Code</th>
                    <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>Bundle / Material Name</th>
                    <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>Config ID</th>
                    <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>Program</th>
                    <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Unit</th>
                    <th colSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Total Qty</th>
                  </tr>
                  <tr>
                    <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Qty PS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data_tssr_selected.map( tssr =>
                      tssr.listOfPackage.map( pp =>
                        <Fragment>
                        <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                          <td>{tssr.no_tech_boq}</td>
                          <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                          <td>{pp.product_name}</td>
                          <td>{pp.config_id}</td>
                          <td>{pp.program}</td>
                          <td>{pp.uom}</td>
                          <td align='center'>{pp.qty}</td>
                        </tr>
                        {pp.list_material.map(material =>
                          <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                            <td></td>
                            <td style={{textAlign : 'right'}}>{material.material_id}</td>
                            <td style={{textAlign : 'left'}}>{material.material_name}</td>
                            <td></td>
                            <td></td>
                            <td>{material.uom}</td>
                            <td align='center'>{pp.qty*material.qty}</td>
                          </tr>
                        )}
                        </Fragment>
                      )
                  )}
                </tbody>
                {/* <tbody>
                  {Array.isArray(this.state.dataTech.listOfPackage) && (
                    this.state.dataTech.listOfPackage.map(pp =>
                      <Fragment>
                        <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                          <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                          <td>{pp.product_name}</td>
                          <td>{pp.uom}</td>
                          <td align='center'>{pp.qty}</td>
                          <td align='center'><Input type="number" name={pp.pp_id} value={(this.state.change_qty_ps.has(pp.pp_id) ? this.state.change_qty_ps.get(pp.pp_id) : pp.qty)} max={pp.qty} onChange={this.handleChangeQtyPS}/></td>
                        </tr>
                        {pp.list_material.map(material =>
                          <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                            <td style={{textAlign : 'right'}}>{material.material_id}</td>
                            <td style={{textAlign : 'left'}}>{material.material_name}</td>
                            <td>{material.uom}</td>
                            <td align='center'>{pp.qty*material.qty}</td>
                            <td align='center'>{(this.state.change_qty_ps.has(pp.pp_id) ? this.state.change_qty_ps.get(pp.pp_id) : pp.qty)*material.qty}</td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                </tbody> */}
              </Table>
            </div>
          </CardBody>
        </Card>
        </Col>
        </Row>
        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
          <ModalBody>
            <div style={{textAlign : 'center'}}>
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            <div style={{textAlign : 'center'}}>
              Loading ...
            </div>
            <div style={{textAlign : 'center'}}>
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
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(TssrBOM);
