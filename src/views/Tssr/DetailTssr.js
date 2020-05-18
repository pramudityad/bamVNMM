import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {ExcelRenderer} from 'react-excel-renderer';
import {connect} from 'react-redux';
import Select from 'react-select';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_PDB_TSEL = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const usernameTselApi = 'adminbamidsuper';
const passwordTselApi = 'F760qbAg2sml';

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

class DetailTssr extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        tokenUser : this.props.dataLogin.token,
        rowsXLS : [],
        data_tssr : null,
        tssr_site_FE : null,
        tssr_site_NE : null,
        data_tssr_sites : [],
        data_tssr_sites_item : [],
        list_version : [],
        data_tssr_current : null,
        tssr_site_FE_current : null,
        tssr_site_NE_current : null,
        data_tssr_sites_current : [],
        data_tssr_sites_item_current : [],
        version_selected : null,
        version_current : null,
        list_pp_material_tssr : [],
        list_project : [],
        project_selected : null,
        project_name_selected : null,
        cd_id_selected : null,
        dataTssrUpload : [],
        dataTssrRevUpload : [],
        list_technical_ref : [],
        list_technical_ref_selection : [],
        technical_ref_selected : null,
        waiting_status : null,
        action_status : null,
        action_message : null,
        tssrData : null,
        material_wh : [],
        material_inbound : [],
        collapseUpload : false,
        dropdownOpen: new Array(1).fill(false),
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.saveProjecttoDB = this.saveProjecttoDB.bind(this);
    this.prepareEdit = this.prepareEdit.bind(this);
    this.prepareRevision = this.prepareRevision.bind(this);
    this.exportFormatTSSR = this.exportFormatTSSR.bind(this);
    this.handleChangeTechRef = this.handleChangeTechRef.bind(this);
    this.referenceWithTechBoq = this.referenceWithTechBoq.bind(this);
    this.submitTSSR = this.submitTSSR.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.saveUpdateMaterial = this.saveUpdateMaterial.bind(this);
    this.downloadMaterialTSSRUpload = this.downloadMaterialTSSRUpload.bind(this);
  }

  toggleUpload() {
    this.setState({ collapseUpload: !this.state.collapseUpload });
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  async getDatafromAPIBMS(url){
    try {
      let respond = await axios.get(API_URL_BMS_Phil +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
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

  async patchDatatoAPIBMS(url, data, _etag){
    try {
      let respond = await axios.patch(API_URL_BMS_Phil +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
        headers : {
          "If-Match" : _etag
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

  async getDatafromAPITSEL(url){
    try {
      let respond = await axios.get(API_URL_PDB_TSEL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameTselApi,
          password: passwordTselApi
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

  async getDatafromAPIBAM(url){
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

  async postDatatoAPIBAM(url, data){
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

  async patchDatatoAPIBAM(url, data, _etag){
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
      console.log("respond Patch data", err.response);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
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

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(API_URL_NODE+url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond post data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond post data", err.response);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data){
    try {
      let respond = await axios.patch(API_URL_NODE +url, data, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Post Data", err);
      return respond;
    }
  }

  checkValue(props){
    //Swap undefined to null
    if( typeof props === 'undefined' ) {
      return null;
    }else{
      return props;
    }
  }

  checkValuetoZero(props){
    //Swap undefined or null to 0
    if( typeof props == 'undefined' || props == null ) {
      return 0;
    }else{
      return props;
    }
  }

  checkValuetoString(props){
    //Swap undefined or null to ""
    if( typeof props == 'undefined' || props == null ) {
      return "";
    }else{
      return props;
    }
  }

  isSameValue(element,value){
    //function for FindIndex
    return element === value;
  }

  getIndex(data, value){
    //get index of value in Array
    return data.findIndex(e => this.isSameValue(e,value));
  }

  comparerDiffbyField(otherArray, field){
    //Compare Different between 2 array
    return function(current){
      return otherArray.filter(function(other){
        return other[field] == current[field]
      }).length == 0;
    }
  }

  comparerDiffbyValue(otherArray){
    //Compare Different between 2 array
    return function(current){
      return otherArray.filter(function(other){
        return other == current
      }).length == 0;
    }
  }

  fileHandlerTSSR = (event) => {
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

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[1].length; j++){
        col.push(this.checkValue(dataXLS[i][j]));
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
  }

  formatDataTSSR = async(dataXLS) => {
      let action_message = [];
      let actionStatus = null;
      let SitesOfTSSRNew = [];
      this.setState({waiting_status : 'loading'});
      const staticHeader = ["site_title", "site_id", "site_name"];
      const staticHeaderXLS = dataXLS[1].filter((e,n) => n < 3);
      if(staticHeaderXLS.equals(staticHeader) !== true){
        actionStatus = "failed";
        this.setState({action_status : "failed", action_message : "Please check your upload format or Package Number"});
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
            let siteTssrBOM = {
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
            if(siteTssrBOM.site_name !== null){
              siteTssrBOM["site_name"] = siteTssrBOM.site_name.toString();
            }
            if(siteTssrBOM.site_title !== null){
              siteTssrBOM["site_title"] = siteTssrBOM.site_title.toString();
            }
            // "site_name" : this.checkValuetoString(dataXLS[i][this.getIndex(dataXLS[1],'site_name')]).toString(),
            if(siteID.length === 0){
              siteIDNull.push(null);
            }
            if(siteSaveFormat.find(e => e === siteTssrBOM.site_id) !== undefined){
              siteError.push(siteTssrBOM.site_id);
            }
            siteSaveFormat.push(siteTssrBOM.site_id);
            SitesOfTSSRNew.push(siteTssrBOM);
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

  getDataTssr(_id_tssr) {
    this.getDataFromAPINODE('/plantspec/'+_id_tssr).then( res => {
      if(res.data !== undefined){
        this.setState({ tssrData : res.data.data }, () => {
          this.getDataWarehouse();
          this.getDataInbound();
        })
        console.log('tssrData', this.state.tssrData);
      }
    })
  }

  async getDataWarehouse() {
    let listSku = [];
    if(this.state.tssrData !== undefined) {
      this.state.tssrData.packages.map(pp => pp.materials.map(material => listSku.push(material.material_id)));
      listSku = [...new Set(listSku)];
      let skuData = {
        "sku" : listSku
      }
      const respondSKU = await this.postDatatoAPINODE('/whStock/getWhStockbySku', skuData);
      if(respondSKU.data !== undefined && respondSKU.status >= 200 && respondSKU.status <= 300 ){
        let array_sku = [];
        respondSKU.data.data.map(sku => sku.map(sku2 => array_sku.push({"sku":sku2.sku, "qty_sku":sku2.qty_sku})));
        this.setState({ material_wh : array_sku });
      }
    }
  }

  async getDataInbound() {
    let listSku = [];
    if(this.state.tssrData !== undefined) {
      this.state.tssrData.packages.map(pp => pp.materials.map(material => listSku.push(material.material_id)));
      listSku = [...new Set(listSku)];
      let skuData = {
        "sku" : listSku
      }
      const respondSKU = await this.postDatatoAPINODE('/whInboundPlan/getWhInboundPlanbySku', skuData);
      if(respondSKU.data !== undefined && respondSKU.status >= 200 && respondSKU.status <= 300 ){
        let array_sku = [];
        respondSKU.data.data.map(sku => sku.map(sku2 => array_sku.push({"sku":sku2.sku, "qty_sku":sku2.qty_sku})));
        this.setState({ material_inbound : array_sku });
      }
    }
  }

  async getPPandMaterial(array_id_package){
    let dataPP = [];
    let arrayDataPP = array_id_package;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
        let dataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
        let arrayIdPP = '"'+dataPaginationPP.join('", "')+'"';
        let where_id_PP = '?where={"_id" : {"$in" : ['+arrayIdPP+']}}';
        let resPP = await this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP);
        if(resPP !== undefined){
            if(resPP.data !== undefined){
              // eslint-disable-next-line
              dataPP = dataPP.concat(resPP.data._items);
            }
        }
    }
    this.getDataMaterial(dataPP);
  }

  async getDataMaterial(data_pp){
    let dataMat = [];
    let arrayDataPP = data_pp.map(e => e._id);
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
        let dataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
        let arrayIdPP = '"'+dataPaginationPP.join('", "')+'"';
        let where_id_PP = '?where={"id_pp_doc" : {"$in" : ['+arrayIdPP+']}}';
        let resMat = await this.getDatafromAPIBAM('/mc_op'+where_id_PP);
        if(resMat !== undefined){
            if(resMat.data !== undefined){
              // eslint-disable-next-line
              dataMat = dataMat.concat(resMat.data._items);
            }
        }
    }
    this.prepareDataPP(data_pp, dataMat);
  }

  prepareDataPP(data_pp, data_material){
    let product_package = data_pp;
    const material_catalogue = data_material;
    for(let i = 0; i < product_package.length; i++){
      const material = material_catalogue.filter(e => e.pp_id === product_package[i].pp_id);
      product_package[i]["list_of_material"] = material;
    }
    this.setState({list_pp_material_tssr : product_package});
  }

  prepareView(){
    let site_NE = this.state.data_tssr_sites.find(e => e.site_title === "NE");
    let site_FE = this.state.data_tssr_sites.find(e => e.site_title === "FE");
    if(site_NE !== undefined){
      site_NE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(e => e.id_tssr_boq_site_doc === site_NE._id);
      this.setState({tssr_site_NE : site_NE, tssr_site_NE_current : site_NE});
    }else{
      this.setState({tssr_site_NE : null, tssr_site_NE_current : null})
    }
    if(site_FE !== undefined){
      site_FE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(e => e.id_tssr_boq_site_doc === site_FE._id);
      this.setState({tssr_site_FE : site_FE, tssr_site_FE_current : site_FE});
    }else{
      this.setState({tssr_site_FE : null, tssr_site_FE_current : null})
    }
  }

  getDataProject(){
    this.getDatafromAPITSEL('/project_sorted_non_page').then( resProject => {
      if(resProject.data !== undefined){
        this.setState({ list_project : resProject.data._items })
      }
    })
  }

  componentDidMount(){
    this.getDataTssr(this.props.match.params.id);
    // this.getVersionTssr(this.props.match.params.id);
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

  getQtyTssrPPNE(pp_id){
    const itemTssrBom = this.state.tssr_site_NE.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find(e => e.pp_id === pp_id);
    if(getDataPPTssr !== undefined){
      return getDataPPTssr.qty;
    }else{
      return 0;
    }
  }

  getQtyTssrPPFE(pp_id){
    const itemTssrBom = this.state.tssr_site_FE.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find(e => e.pp_id === pp_id);
    if(getDataPPTssr !== undefined){
      return getDataPPTssr.qty;
    }else{
      return 0;
    }
  }

  handleChangeProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_selected : value, project_name_selected : text});
  }

  saveProjecttoDB(){
    let dataTssr = this.state.data_tssr;
    const _id_project = this.state.project_selected;
    const name_project = this.state.project_name_selected;
    const dataProject  = {
      "id_project_doc" : _id_project,
      "project_name" : name_project
    }
    this.patchDatatoAPIBAM('/tssr_op/'+dataTssr._id, dataProject, dataTssr._etag).then( resProject => {
      if(resProject.data !== undefined && resProject.status >= 200 && resProject.status <= 300 ){
        dataTssr["id_project_doc"] = _id_project;
        dataTssr["project_name"] = name_project;
        this.setState({ action_status : 'success', data_tssr : dataTssr });
      }else{
        this.setState({ action_status : 'failed'});
      }
    })
  }

  prepareEdit(){
    this.prepareEditData();
  }

  async prepareEditData(signSucRev, versionNew){
    let signSuc = [];
    let signRevSuc = signSucRev;
    let dataTSSR = this.state.data_tssr;
    let dataSiteNE = this.state.tssr_site_NE;
    let dataSiteFE = this.state.tssr_site_FE;
    let dataFormat = this.state.dataTssrUpload;
    let version = dataTSSR.version;
    if(signSucRev === undefined){
      signRevSuc = [];
    }else{
      if(versionNew !== undefined){
        version = versionNew;
      }
    }
    if(this.state.version_current !== this.state.version_selected){
      dataTSSR = this.state.data_tssr_current;
      dataSiteNE = this.state.tssr_site_NE_current;
      dataSiteFE = this.state.tssr_site_FE_current;
    }
    if(dataFormat.length === 0 && this.state.version_current !== this.state.version_selected){
      dataFormat = this.state.dataTssrRevUpload;
    }
    if(dataSiteNE !== null){
      const SiteNENew = dataFormat.find(e => e.site_id === dataSiteNE.site_id);
      if(SiteNENew !== undefined && dataSiteNE.site_id === SiteNENew.site_id){
        const itemFormatNew = SiteNENew.list_of_site_items;
        const itemNE = dataSiteNE.list_of_site_items;
        const itemNENew = itemFormatNew.filter(this.comparerDiffbyField(itemNE, "pp_id"));
        const itemNEDel = itemNE.filter(this.comparerDiffbyField(itemFormatNew, "pp_id"));
        const itemNESame = itemFormatNew.filter( e => itemNE.findIndex(i => e.pp_id === i.pp_id) !== -1);
        const patchDataSite = await this.patchDatatoAPIBAM('/tssr_sites_op/'+dataSiteNE._id, {"version" : version.toString() }, dataSiteNE._etag);
        const delItem = await this.delItemTssr(itemNEDel, version, dataSiteNE);
        const editItem = await this.editPP(itemNENew, itemNESame, version, dataTSSR, dataSiteNE);
        if(delItem.length === itemNEDel.length && editItem.length === (itemNENew.length + itemNESame.length) ){
          signSuc.push(true);
        }
      }
    }
    if(dataSiteFE !== null){
      const SiteFENew = dataFormat.find(e => e.site_id === dataSiteFE.site_id);
      if(SiteFENew !== undefined && dataSiteFE.site_id === SiteFENew.site_id){
        const itemFormatNew = SiteFENew.list_of_site_items;
        const itemFE = dataSiteFE.list_of_site_items;
        const itemFENew = itemFormatNew.filter(this.comparerDiffbyField(itemFE, "pp_id"));
        const itemFEDel = itemFE.filter(this.comparerDiffbyField(itemFormatNew, "pp_id"));
        const itemFESame = itemFormatNew.filter( e => itemFE.findIndex(i => e.pp_id === i.pp_id) !== -1);
        const patchDataSite = await this.patchDatatoAPIBAM('/tssr_sites_op/'+dataSiteFE._id, {"version" : version.toString() }, dataSiteFE._etag);
        const delItem = await this.delItemTssr(itemFEDel, version, dataSiteFE);
        const editItem = await this.editPP(itemFENew, itemFESame, version, dataTSSR, dataSiteFE);
        if(delItem.length === itemFEDel.length && editItem.length === (itemFENew.length + itemFESame.length) ){
          signSuc.push(true);
        }
      }
    }
    const patchDataParent = await this.patchDatatoAPIBAM('/tssr_op/'+dataTSSR._id, {"version" : version.toString() }, dataTSSR._etag);
    if(signSucRev === undefined){
      if(signSuc.length === 2 && patchDataParent.data !== undefined){
        this.setState({action_status : "success"}, () => {
          setTimeout(function(){ window.location.reload(); }, 3000);
        });
      }else{
        this.setState({action_status : "failed"});
      }
    }else{
      if((signSuc.length+signSucRev.length) === 5 && patchDataParent.data !== undefined){
        this.setState({action_status : "success"}, () => {
          setTimeout(function(){ window.location.reload(); }, 3000);
        });
      }else{
        this.setState({action_status : "failed"});
      }
    }
  }

  async editPP(itemNew, itemSame, version, dataTssr, dataSite){
    const date = new Date();
    const dateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let sucEdit = [];
    for(let i = 0; i < itemSame.length; i++){
      const dataItemIdx = dataSite.list_of_site_items.find(e => e.pp_id === itemSame[i].pp_id);
      const patchDataItem = await this.patchDatatoAPIBAM('/tssr_site_items_op/'+dataItemIdx._id, {"qty" : itemSame[i].qty, "version" : version.toString() }, dataItemIdx._etag);
      if(patchDataItem.data !== undefined && patchDataItem.status < 400){
        sucEdit.push(patchDataItem.data._id);
      }
    }
    if(itemNew.length !== 0){
      let tssrSitesItem = [];
      for(let j = 0; j < itemNew.length; j++){
        let itemSiteIdx = Object.assign(itemNew[j], {});
        itemSiteIdx["id_tssr_boq_doc"] = dataTssr._id;
        itemSiteIdx["no_tssr_boq"] = dataTssr.no_tssr_boq;
        itemSiteIdx["id_tssr_boq_site_doc"] = dataSite._id
        itemSiteIdx["no_tssr_boq_site"] = dataSite.no_tssr_boq_site;
        itemSiteIdx["version"] = version.toString();
        itemSiteIdx["created_on"] = dateNow.toString();
        itemSiteIdx["updated_on"] = dateNow.toString();
        tssrSitesItem.push(itemSiteIdx);
      }
      const respondSaveTSSRSitesItem = await this.postDatatoAPIBAM('/tssr_site_items_op', tssrSitesItem);
      if(respondSaveTSSRSitesItem.data !== undefined){
        if(itemNew.length > 1){
          sucEdit.push(respondSaveTSSRSitesItem.data._items.map(e => e._id));
        }else{
          sucEdit.push(respondSaveTSSRSitesItem.data._id);
        }
      }
    }
    return sucEdit;
  }

  async prepareRevision(){
    let signSuc = [];
    let dataTSSR = this.state.data_tssr;
    let dataSiteNE = this.state.tssr_site_NE;
    let dataSiteFE = this.state.tssr_site_FE;
    if(this.state.version_current !== this.state.version_selected){
      dataTSSR = this.state.data_tssr_current;
      dataSiteNE = this.state.tssr_site_NE_current;
      dataSiteFE = this.state.tssr_site_FE_current;
    }
    let version = parseInt(dataTSSR.version)+1;
    let version_current = parseInt(dataTSSR.version);
    let dataRevTssr = Object.assign({}, dataTSSR);
    dataRevTssr["id_document"] = dataTSSR._id;
    dataRevTssr["created_by"] = dataTSSR.created_by;
    dataRevTssr["updated_by"] = dataTSSR.updated_by;
    delete dataRevTssr._id;
    delete dataRevTssr._etag;
    delete dataRevTssr._links;
    const respondSaveTSSRRev = await this.postDatatoAPIBAM('/tssr_version_op', dataRevTssr);
    if(respondSaveTSSRRev.data !== undefined){
      signSuc.push(true);
      let dataItemRev = [];
      let dataSiteRev= [];
      let dataRevNE = Object.assign({}, dataSiteNE);
      let dataRevFE = Object.assign({}, dataSiteFE);
      const dataItemNE = dataSiteNE.list_of_site_items;
      const dataItemFE = dataSiteFE.list_of_site_items;
      for(let i = 0; i < dataItemNE.length; i++){
        let dataRevItemNE = Object.assign({}, dataItemNE[i]);
        dataRevItemNE["id_document"] = dataItemNE[i]._id;
        dataRevItemNE["created_by"] = dataItemNE[i].created_by;
        dataRevItemNE["updated_by"] = dataItemNE[i].updated_by;
        dataRevItemNE["version"] = version_current.toString();
        delete dataRevItemNE._id;
        delete dataRevItemNE._etag;
        delete dataRevItemNE._links;
        dataItemRev.push(dataRevItemNE);
      }
      for(let i = 0; i < dataItemFE.length; i++){
        let dataRevItemFE = Object.assign({}, dataItemFE[i]);
        dataRevItemFE["id_document"] = dataItemFE[i]._id;
        dataRevItemFE["created_by"] = dataItemFE[i].created_by;
        dataRevItemFE["updated_by"] = dataItemFE[i].updated_by;
        dataRevItemFE["version"] = version_current.toString();
        delete dataRevItemFE._id;
        delete dataRevItemFE._etag;
        delete dataRevItemFE._links;
        dataItemRev.push(dataRevItemFE);
      }
      dataRevNE["id_document"] = dataSiteNE._id;
      dataRevNE["created_by"] = dataSiteNE.created_by;
      dataRevNE["updated_by"] = dataSiteNE.updated_by;
      dataRevNE["version"] = version_current.toString();
      delete dataRevNE._id;
      delete dataRevNE._etag;
      delete dataRevNE._links;
      if(dataRevNE.list_of_site_items !== undefined){
        delete dataRevNE.list_of_site_items;
      }
      dataSiteRev.push(dataRevNE);
      dataRevFE["id_document"] = dataSiteFE._id;
      dataRevFE["created_by"] = dataSiteFE.created_by;
      dataRevFE["updated_by"] = dataSiteFE.updated_by;
      dataRevFE["version"] = version_current.toString();
      delete dataRevFE._id;
      delete dataRevFE._etag;
      delete dataRevFE._links;
      if(dataRevFE.list_of_site_items !== undefined){
        delete dataRevFE.list_of_site_items;
      }
      dataSiteRev.push(dataRevFE);
      const respondSaveSitesRev = await this.postDatatoAPIBAM('/tssr_sites_version_op', dataSiteRev);
      if(respondSaveSitesRev.data !== undefined){
        signSuc.push(true);
        const respondSaveItemsRev = await this.postDatatoAPIBAM('/tssr_site_items_version_op', dataItemRev);
        if(respondSaveItemsRev.data !== undefined){
          signSuc.push(true);
          console.log("version rev", version);
          this.prepareEditData(signSuc, version);
        }
      }
    }
  }

  async delItemTssr(itemDel, version, dataSite){
    let sucDel = [];
    for(let i = 0; i < itemDel.length; i++ ){
      const dataItemIdx = dataSite.list_of_site_items.find(e => e.pp_id === itemDel[i].pp_id);
      const delData = await this.patchDatatoAPIBAM('/tssr_site_items_op/'+dataItemIdx._id, {"deleted" : 1, "version" : version.toString() }, dataItemIdx._etag);
      if(delData.data !== undefined && delData.status < 400){
        sucDel.push(delData.data._id);
      }
    }
    return sucDel;
  }

  getVersionTssr(_id){
    this.getDatafromAPIBAM('/tssr_version_sorted_nonpage?where={"id_document":"'+_id+'"}&projection={"version":1, "_etag" : 1}').then(res => {
      if(res.data !== undefined){
        this.setState({list_version : res.data._items});
      }
    })
  }

  handleChangeVersion(e){
    const value = e.target.value;
    this.setState({version_selected : value}, () => {
      if(value !== this.state.version_current){
        this.getDataTssrVersion(this.props.match.params.id, value)
      }else{
        this.getDataTssr(this.props.match.params.id);
      }
    })
  }

  getDataTssrVersion(_id_tssr, version){
    this.getDatafromAPIBAM('/tssr_version_op?where={"id_document" : "'+_id_tssr+'", "version" : "'+version+'"}').then( resTssr => {
      if(resTssr.data !== undefined){
        // this.setState({ data_tssr : resTssr.data });
        this.getDatafromAPIBAM('/tssr_sites_version_op?where={"id_tssr_boq_doc" : "'+_id_tssr+'", "version" : "'+version+'"}').then( resSites => {
          if(resSites.data !== undefined){
            this.getDatafromAPIBAM('/tssr_site_items_version_op?where={"id_tssr_boq_doc" : "'+_id_tssr+'", "version" : "'+version+'"}').then( resItem => {
              if(resItem.data !== undefined && resItem.data._items.length !== 0){
                const itemsTssr = resItem.data._items;
                const itemUniq = [...new Set(itemsTssr.map(({ id_pp_doc}) => id_pp_doc))];
                this.setState({ data_tssr_sites : resSites.data._items, data_tssr_sites_item : resItem.data._items }, () => {
                  this.getPPandMaterial(itemUniq);
                  this.prepareViewRevision();
                });
              }
            })
          }
        })
      }
    })
  }

  prepareViewRevision(){
    let site_NE = this.state.data_tssr_sites.find(e => e.site_title === "NE");
    let site_FE = this.state.data_tssr_sites.find(e => e.site_title === "FE");
    if(site_NE !== undefined){
      site_NE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(e => e.id_tssr_boq_site_doc === site_NE.id_document);
      console.log("site NE", site_NE);
      this.setState({tssr_site_NE : site_NE});
    }else{
      site_NE = null;
      this.setState({tssr_site_NE : null});
    }
    if(site_FE !== undefined){
      site_FE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(e => e.id_tssr_boq_site_doc === site_FE.id_document);
      this.setState({tssr_site_FE : site_FE});
    }else{
      site_FE = null;
      this.setState({tssr_site_FE : null});
    }
    this.formatDataRev(site_NE, site_FE);
  }

  formatDataRev(siteNE, siteFE){
    console.log("siteNE rev", siteNE);
    let dataFormat = [];
    let listSites = [];
    if(siteNE !== null && siteNE !== undefined){
      listSites.push(siteNE);
    }
    if(siteFE !== null && siteFE !== undefined){
      listSites.push(siteFE);
    }
    for(let i = 0; i < listSites.length; i++){
      let itemsSite = [];
      let dataItem = listSites[i].list_of_site_items;
      for(let j = 0; j < dataItem.length; j++){
        let package_data = {
          "id_pp_doc" : dataItem[j].id_pp_doc,
          "pp_id" : dataItem[j].pp_id,
          "pp_group" : dataItem[j].pp_group,
          "pp_cust_number" : dataItem[j].pp_cust_number,
          "product_name" : dataItem[j].product_name,
          "physical_group" : dataItem[j].physical_group,
          "product_type" : dataItem[j].pp_group,
          "uom" : dataItem[j].uom,
          "qty" : dataItem[j].qty,
          "version" : "0",
          "deleted" : 0,
          "created_by" : this.state.userId,
          "updated_by" : this.state.userId
        }
        itemsSite.push(package_data);
      }
      let siteTssrBOM = {
        "account_id" : "1",
        "site_id" : listSites[i].site_id,
        "site_name" : listSites[i].site_id,
        "site_title" : listSites[i].site_id,
        "list_of_site_items" : itemsSite,
        "version" : "0",
        "created_by" : this.state.userId,
        "updated_by" : this.state.userId,
        "deleted" : 0
      }
      dataFormat.push(siteTssrBOM);
    }
    this.setState({ dataTssrRevUpload : dataFormat})
  }

  exportFormatTSSR = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataPP = this.state.list_pp_material_tssr;
    const dataNE = this.state.tssr_site_NE;
    const dataFE = this.state.tssr_site_FE;

    let ppIdRow = ["site_title", "site_id", "site_name"];
    let ppTypeRow = ["", "", ""];

    ppIdRow = ppIdRow.concat(dataPP.map(pp => pp.pp_id+" /// "+pp.product_name));
    ppTypeRow = ppTypeRow.concat(dataPP.map(pp => pp.product_type));

    ws.addRow(ppTypeRow);
    ws.addRow(ppIdRow);
    if(dataNE !== null){
      let rowNE = ["NE", dataNE.site_id, dataNE.site_name];
      rowNE = rowNE.concat(dataPP.map(e => this.getQtyTssrPPNE(e.pp_id)));
      ws.addRow(rowNE);
    }
    if(dataFE !== null){
      let rowFE = ["FE", dataFE.site_id, dataFE.site_name];
      rowFE = rowFE.concat(dataPP.map(e => this.getQtyTssrPPFE(e.pp_id)));
      ws.addRow(rowFE);
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Plant Spec '+this.state.data_tssr.no_tssr_boq+' Uploader Template.xlsx');
  }

  getListTechnicalForRef(){
    const dataPSParent = this.state.data_tssr;
    const dataTSSRBOM = this.state.data_tssr_sites;
    let whereTech = '';
    if(dataTSSRBOM.length > 1){
      whereTech = 'where={"$or" : [{"site_id" : "'+dataTSSRBOM[0].site_id+'"}, {"site_id" : "'+dataTSSRBOM[1].site_id+'"}] }';
    }else{
      whereTech = 'where={"site_id" : "'+dataTSSRBOM[0].site_id+'"}';
    }
    if(dataTSSRBOM.length > 0){
      this.getDatafromAPIBMS('/boq_tech_sites_op'+'?projection={"site_id" : 1, "site_name" : 1, "_etag" : 1, "id_boq_tech_doc" : 1,  "no_boq_tech" : 1, "tssr_boq_id" : 1}&'+whereTech).then( res => {
        if(res.data !== undefined){
          this.setState({list_technical_ref : res.data._items}, () => {
            this.prepareSelectionTechRef( res.data._items);
          });
        }
      })
    }
  }

  prepareSelectionTechRef(techRef){
    const dataTSSRBOM = this.state.data_tssr_sites;
    const techRefUniq = [...new Set(techRef.map(({ no_boq_tech }) => no_boq_tech))];
    let listTech = [];
    for(let i = 0; i < techRefUniq.length; i++){
      const getTech = techRef.filter(e => e.no_boq_tech === techRefUniq[i]);
      if(getTech.length >= dataTSSRBOM.length){
        listTech.push({"value" : getTech[0]._id, "label" : getTech[0].no_boq_tech });
      }
    }
    this.setState({list_technical_ref_selection : listTech});
  }

  handleChangeTechRef = (newValue) => {
    this.setState({technical_ref_selected : newValue.label});
    return newValue;
  }

  async referenceWithTechBoq(){
    const dataTSSRBOM = this.state.data_tssr_sites;
    const techSelected = this.state.list_technical_ref.filter(e => e.no_boq_tech === this.state.technical_ref_selected);
    let sucPatch = [];
    for(let i = 0; i < dataTSSRBOM.length; i++){
      const patchWill = techSelected.find(e => e.site_id === dataTSSRBOM[i].site_id);
      if(patchWill !== undefined){
        const patchData = await this.patchDatatoAPIBMS('/boq_tech_sites_op/'+patchWill._id, {"tssr_boq_id" : dataTSSRBOM[0].no_tssr_boq}, patchWill._etag);
        if(patchData.data !== undefined){
          sucPatch.push(patchData.data._id);
        }
      }
    }
    if(sucPatch.length === dataTSSRBOM.length){
      this.setState({ action_status : 'success' }, () => {
        setTimeout(function(){ window.location.reload(); }, 3000);
      });
    }else{
      this.setState({ action_status : 'failed' });
    }
  }

  submitTSSR(){
    this.patchDatatoAPINODE('/plantspec/submitPlantspec/'+this.props.match.params.id).then(res => {
      if(res.data !== undefined){
        this.setState({ action_status : "success" });
      }else{
        this.setState({ action_status : "failed" });
      }
    })
  }

  CompareArrayObject(arr, prop) {
    return arr.sort(function (a, b) {
        var nameA = a[prop].toLowerCase(),
            nameB = b[prop].toLowerCase();
        return nameA.localeCompare(nameB);
    });
  }

  async downloadMaterialTSSRUpload() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataTSSR = this.state.tssrData;
    const dataItemTSSR = this.state.tssrData.packages;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = ["bundle_id", "bundle_name", "program", "material_id_plan", "material_name_plan", "material_id_actual", "material_name_actual", "unit", "qty", "stock_warehouse", "inbound_warehouse", "availability"];
    ws.addRow(headerRow);
    let list_material_id = [];
    for(let i = 0; i < dataItemTSSR.length; i++){
      for(let j = 0; j < dataItemTSSR[i].materials.length; j++){
        let dataMatIdx = dataItemTSSR[i].materials[j];
        list_material_id.push(dataMatIdx.material_id);
        let qty_wh = stockWH.find(e => e.sku === dataMatIdx.material_id);
        let qty_inbound = inboundWH.find(e => e.sku === dataMatIdx.material_id);
        qty_wh = qty_wh !== undefined ? qty_wh.qty_sku : 0;
        qty_inbound = qty_inbound !== undefined ? qty_inbound.qty_sku : 0;
        ws.addRow([dataItemTSSR[i].pp_id, dataItemTSSR[i].product_name, dataItemTSSR[i].program, dataMatIdx.material_id_plan, dataMatIdx.material_name_plan, dataMatIdx.material_id, dataMatIdx.material_name, dataMatIdx.material_unit, dataMatIdx.qty, qty_wh, qty_inbound, (dataMatIdx.qty) < qty_wh ? "OK":"NOK"]);
      }
    }

    let listMatId = [...new Set(list_material_id)];
    let matIdData = {
      "list_material_id" : listMatId
    }

    const getMaterialVariant = await this.postDatatoAPINODE('/variants/materialId', matIdData);
    if(getMaterialVariant.data !== undefined && getMaterialVariant.status >= 200 && getMaterialVariant.status < 400 ) {
      dataMaterialVariant = getMaterialVariant.data.data;
    }

    dataMaterialVariant = this.CompareArrayObject(dataMaterialVariant, "description");

    let sku_list = [];
    for(let j = 0; j < dataMaterialVariant.length; j++){
      sku_list.push(dataMaterialVariant[j].material_id);
    }
    const list_qtySKU = [];
    const getQtyfromWHbySKU = await this.postDatatoAPINODE('/whStock/getWhStockbySku', {"sku": sku_list }).then((res) => {
      if(res.data !== undefined && res.status >= 200 && res.status < 400){
        const dataSKU = res.data.data;
        for (let i = 0; i < dataSKU.length; i++) {
          if (dataSKU[i][0] === undefined){
            list_qtySKU.push(0);
          } else {
            list_qtySKU.push(dataSKU[i][0].qty_sku);
          }
        }
      }
    });

    ws2.addRow(["Origin","Material ID","Material Name","Description", "Category", "QTY"]);
    for(let j = 0; j < dataMaterialVariant.length; j++){
      ws2.addRow([dataMaterialVariant[j].origin,dataMaterialVariant[j].material_id,dataMaterialVariant[j].material_name,dataMaterialVariant[j].description, dataMaterialVariant[j].category, list_qtySKU[j]]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Material TSSR '+dataTSSR.no_plantspec+' uploader.xlsx');
  }

  async saveUpdateMaterial(){
    const dataXLS = this.state.rowsXLS;
    const dataTSSR = this.state.tssrData;
    let patchDataMat = await this.patchDatatoAPINODE('/matreq/updatePlantSpecWithVariant/'+dataTSSR._id, {"identifier" : "PS" ,"data" : dataXLS});
    if(patchDataMat.data !== undefined && patchDataMat.status >= 200 && patchDataMat.status <= 300 ) {
      this.setState({ action_status : 'success'});
    } else{
      if(patchDataMat.response !== undefined && patchDataMat.response.data !== undefined && patchDataMat.response.data.error !== undefined){
        if(patchDataMat.response.data.error.message !== undefined){
          this.setState({ action_status: 'failed', action_message: patchDataMat.response.data.error.message });
        }else{
          this.setState({ action_status: 'failed', action_message: patchDataMat.response.data.error });
        }
      }else{
        this.setState({ action_status: 'failed' });
      }
    }
  }

  render() {
    let qty_wh = undefined, qty_inbound = undefined;
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
          <Col xl="12">
          <Card>
            <CardHeader>
              <span style={{lineHeight :'2', fontSize : '15px'}} >Detail Plant Spec</span>
              {this.state.tssrData !== null && this.state.tssrData.submission_status !== "SUBMITTED" ? (
                <Button style={{marginRight : '8px', float : 'right'}} color="success" onClick={this.submitTSSR} size="sm">Submit</Button>
              ) : (
                <Fragment></Fragment>
              )}
              <Button style={{marginRight : '8px', float : 'right'}} color="primary" onClick={this.toggleUpload} size="sm">Edit</Button>
              <Dropdown size="sm" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{float : 'right', marginRight : '10px'}}>
                <DropdownToggle caret color="secondary">
                  <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download File
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>TSSR File</DropdownItem>
                  <DropdownItem onClick={this.downloadMaterialTSSRUpload}> <i className="fa fa-file-text-o" aria-hidden="true"></i>PlantSpec Format</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* }<Button style={{marginRight : '8px', float : 'right', display: 'none'}} outline color="info" onClick={this.exportFormatTSSR} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download PS Format</Button> */}
            </CardHeader>
            <Collapse isOpen={this.state.collapseUpload}>
              <Card style={{ margin: '10px 10px 5px 10px' }}>
                <CardBody>
                  <div>
                    <Row>
                      <Col md="12">
                      {this.state.data_comm_boq !== null && this.props.match.params.id !== undefined && (
                        <React.Fragment>
                        <div style={{display : 'flex', "align-items": "baseline"}}>
                          <input type="file" onChange={this.fileHandlerTSSR.bind(this)} style={{"padding":"10px"}}/>
                          <Button style={{'float' : 'right',marginLeft : 'auto', order : "2"}} color="primary" onClick={this.saveUpdateMaterial} disabled={this.state.rowsXLS.length === 0}>
                            <i className="fa fa-paste">&nbsp;&nbsp;</i>
                            Save
                          </Button>
                        </div>
                        </React.Fragment>
                      )}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
            <CardBody>
            <input type="file" onChange={this.fileHandlerTSSR.bind(this)} style={{"padding":"10px","visiblity":"hidden","display":"none"}}/>
            <Button color="warning" onClick={this.prepareEdit} style={{float : 'right', display : 'none'}} >Edit</Button>
            <Button color="success" onClick={this.prepareRevision} style={{float : 'right', marginRight : '8px', display : 'none'}} >Revision</Button>
            {this.state.data_tssr !== null ?
              this.state.data_tssr.project_name === "" || this.state.data_tssr.project_name === null ? (
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
                        <Input style={{marginTop : '10px'}} name="project" type="select" onChange={this.handleChangeProject} value={this.state.project_selected}>
                          <option value={null}></option>
                          {this.state.list_project.map( project =>
                            <option value={project._id}>{project.Project}</option>
                          )}
                        </Input>
                      </td>
                      <td style={{paddingTop : '10px', paddingLeft : '20px'}}>
                        <Button color="success" size="sm" onClick={this.saveProjecttoDB}>Save</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (<Fragment></Fragment>) : (<Fragment></Fragment>)}
              <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{textAlign : 'center', color : 'rgba(59,134,134,1)', fontSize : '21px'}}>Plant Spec DETAIL</td>
                  </tr>
                  {this.state.tssrData !== null && (
                    <Fragment>
                    <tr>
                      <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Plant Spec ID : {this.state.tssrData.no_plantspec}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Project Name : {this.state.tssrData.project_name}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Site ID : {this.state.tssrData.site_info[0].site_id}</td>
                    </tr>
                    </Fragment>
                  )}
                </tbody>
              </table>
              <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : 'rgba(59,134,134,1)', marginTop: '5px'}}></hr>
              <Fragment>
                <Row>
                {this.state.tssr_site_NE !== null && (
                <Col style={{marginBottom : '20px'}}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Technical Ref</td>
                        <td>:</td>
                        {this.state.list_technical_ref !== null ? (
                          <Fragment>
                            <td style={{paddingLeft:'10px', width : '200px'}}>
                              <Select
                                cacheOptions
                                options={this.state.list_technical_ref_selection}
                                onChange={this.handleChangeTechRef}
                              />
                            </td>
                            <td style={{paddingLeft:'10px', width : '100px'}}>
                              <Button size="sm" color="primary" style={{float: "right"}} sm disabled={this.state.technical_ref_selected === null} onClick={this.referenceWithTechBoq}>Submit</Button>
                            </td>
                          </Fragment>
                        ) : (
                          <td style={{paddingLeft:'10px', width : '200px'}}>
                            {this.state.technical_ref_selected}
                          </td>
                        )}

                      </tr>
                    </tbody>
                  </table>
                </Col>
                )}
                </Row>
                <Row>
                {this.state.tssr_site_NE !== null && (
                  <Fragment>
                    <Col md="4">
                    <table className="table-header">
                      <tbody>
                          <tr>
                            <td>Site ID NE</td>
                            <td>: &nbsp;</td>
                            <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_NE.site_id}</td>
                          </tr>
                          <tr>
                            <td>Site Name NE</td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_NE.site_id}</td>
                          </tr>
                          <tr>
                            <td>Version</td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}}>
                              <Input style={{marginTop : '10px'}} type="select" onChange={this.handleChangeVersion} value={this.state.version_selected === null ? this.state.version_current : this.state.version_selected}>
                                <option value={this.state.data_tssr.version}>{this.state.data_tssr.version}</option>
                                {this.state.list_version.map( ver =>
                                  <option value={ver.version}>{ver.version}</option>
                                )}
                              </Input>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                    </Col>
                    {this.state.tssr_site_FE !== null ? (
                      <Col md="4">
                      <table className="table-header">
                        <tbody>
                          <tr>
                            <td>Site ID FE</td>
                            <td>: &nbsp;</td>
                            <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_FE.site_id}</td>
                          </tr>
                          <tr>
                            <td>Site Name FE</td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_FE.site_id}</td>
                          </tr>
                        </tbody>
                      </table>
                      </Col>
                    ) : (<Fragment></Fragment>)}
                  </Fragment>
                )}
                </Row>
                <hr className="upload-line-ordering"></hr>
                <div className='divtable2'>
                  <Table hover bordered striped responsive size="sm">
                    <thead style={{backgroundColor : '#0B486B', color : 'white'}}>
                      <tr>
                        <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>PP / Material Code</th>
                        <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>PP / Material Name</th>
                        <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Program</th>
                        <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Unit</th>
                        <th colSpan="3" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Total Qty per PP</th>
                        <th rowSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Availability</th>
                      </tr>
                      <tr>
                        <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Qty PS</th>
                        <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Material in Warehouse</th>
                        <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Material Plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.tssrData !== null && Array.isArray(this.state.tssrData.packages) && (
                        this.state.tssrData.packages.map(pp =>
                          <Fragment>
                            <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                              <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                              <td>{pp.product_name}</td>
                              <td>{pp.program}</td>
                              <td>{pp.uom}</td>
                              <td align='center'>{pp.qty.toFixed(2)}</td>
                              <td align='center'></td>
                              <td align='center'></td>
                              <td align='center'></td>
                            </tr>
                            {pp.materials.map(material =>
                              <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                                <td style={{textAlign : 'right'}}>{material.material_id}</td>
                                <td style={{textAlign : 'left'}}>{material.material_name}</td>
                                <td style={{textAlign : 'left'}}></td>
                                <td>{material.uom}</td>
                                <td align='center'>{(pp.qty*material.qty).toFixed(2)}</td>
                                <td align='center'>{qty_wh = this.state.material_wh.find(e => e.sku === material.material_id) !== undefined ? this.state.material_wh.find(e => e.sku === material.material_id).qty_sku.toFixed(2) : 0}</td>
                                <td align='center'>{qty_inbound = this.state.material_inbound.find(e => e.sku === material.material_id) !== undefined ? this.state.material_inbound.find(e => e.sku === material.material_id).qty_sku.toFixed(2) : 0}</td>
                                <td align='center'>{pp.qty*material.qty < qty_wh ? "OK":"NOK"}</td>
                              </tr>
                            )}
                          </Fragment>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              </Fragment>
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

export default connect(mapStateToProps)(DetailTssr);
