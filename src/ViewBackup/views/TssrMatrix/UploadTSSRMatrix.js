import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse, Input} from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter, FormText} from 'reactstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { async } from 'q';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Pagination from "react-js-pagination";
import './boqtssr.css';
import { connect } from 'react-redux';

const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

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

class UploadTSSRMatrix extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        list_project : [],
        project_select : null,
        project_name_select : null,
        project_name : null,
        boq_tech_API : null,
        boq_tech_sites_API : [],
        modal_delete : false,
        pp_all : [],
        sites_all : [],
        tssr_API : [],
        tssr_API_prev : null,
        API_TSSR_Sites : [],
        list_version : [],
        dataPackage : [],
        action_status : null,
        action_message : "",
        rowsTssr: [],
        Package_Header : [],
        data_item : [],
        data_item_pagination : [],
        waiting_status : null,
        project_name : [],
        data_format : [],
        modal_loading : false,
        collapse: false,
        dropdownOpen: new Array(1).fill(false),
        redirectSign : false,
        redirectDeleted : false,
        version_selected : null,
        version_now : null,
        perPage : 25,
        prevPage : 1,
        activePage : 1,
        opportunity_id : null,
        list_tech_tssr : [],
        progress_note : false,
        progress_data : 0,
        progress_count : 0,
        progress_failed : 0,
      };
      this.exportTSSR = this.exportTSSR.bind(this);
      this.toggleDelete = this.toggleDelete.bind(this);
      this.approvedBoqTech = this.approvedBoqTech.bind(this);
      this.toggleLoading = this.toggleLoading.bind(this);
      this.overwriteDataSites = this.overwriteDataSites.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleUpload = this.toggleUpload.bind(this);
      this.onEntering = this.onEntering.bind(this);
      this.onEntered = this.onEntered.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleChangeShow = this.handleChangeShow.bind(this);
      this.handleChangeProject = this.handleChangeProject.bind(this);
      this.deleteTSSR = this.deleteTSSR.bind(this);
      this.revisionTssr = this.revisionTssr.bind(this);
      this.handleChangeVersion = this.handleChangeVersion.bind(this);
      this.saveProjectToDB = this.saveProjectToDB.bind(this);
      }

      numberToAlphabet(number){
        const num = Number(number)+1
        if(num > 26){
          let mod = (num%26 + 9).toString(36).toUpperCase();
          return 'Z'+mod;
        }else{
          return (num + 9).toString(36).toUpperCase();
        }
      }

      toggleUpload() {
      this.setState({ collapse: !this.state.collapse });
    }

    toggleDropdown(i) {
      const newArray = this.state.dropdownOpen.map((element, index) => {
        return (index === i ? !element : false);
      });
      this.setState({
        dropdownOpen: newArray,
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

    async getDatafromAPI(url){
      try {
        let respond = await axios.get(API_URL +url, {
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
        let respond = undefined;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
        console.log("respond Get Data", err);
        return respond;
      }
    }

    async postDatatoAPI(url, data){
      try {
        let respond = await axios.post(API_URL +url, data, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: usernamePhilApi,
            password: passwordPhilApi
          },
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Post Data", respond);
        }
        return respond;
      }catch (err) {
        let respond = undefined;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
        console.log("respond Post Data", err);
        return respond;
      }
    }

    async patchDatatoAPI(url, data, _etag){
      try {
        let respond = await axios.patch(API_URL +url, data, {
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
        let respond = undefined;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
        console.log("respond Patch data", err);
        return respond;
      }
    }

    async apiSendEmail(data){
      try {
        let respond = await axios.post(API_EMAIL, data, {
          headers : {'Content-Type':'application/json'},
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Patch data", respond);
        }
        return respond;
      }catch (err) {
        let respond = undefined;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        console.log("respond Patch data", err);
        return respond;
      }
    }

    getTechBoqAPI(_id_Tech){
      console.log("getTechBoqAPI", _id_Tech);
      let url = '/boq_tech_audit/'+_id_Tech+'?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}';
      this.getDatafromAPI(url).then(res => {
        console.log("getTechBoqAPI", res);
        if(res !== undefined){
          if(res.data.list_of_id_site !== undefined){
            this.setState({ boq_tech_API : res.data});
            this.setState({ boq_tech_sites_API : res.data.list_of_id_site});

          }
        }
      })
    }

    getListVersion(_id){
      this.getDatafromAPI('/tssr_boq_matrix_rev?where={"id_document":"'+_id+'"}&projection={"version":1, "rev":1, "_etag" : 1}').then(res => {
        if(res !== undefined){
          this.setState({list_version : res.data._items});
        }
      })
    }

    async getTSSRBoqAPI(_id_Tssr){
      let url = '/tssr_boq_matrix_sorted/'+_id_Tssr+'?embedded={"created_by" : 1, "updated_by" : 1}';
      if(_id_Tssr == undefined){
        url = '/tssr_boq_matrix_sorted?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}'
      }
      let res = await this.getDatafromAPI(url)
      if(res !== undefined){
        let version = res.data.version;
        if(version === undefined || version === null){
          version ="0";
        }
        if(res.data.project_name === null){
          this.getListProject();
        }
        this.setState({ tssr_API : res.data, version_now : version });
        if(res.data.list_of_id_site !== undefined){

          if(res.data.id_boq_tech_doc !== null){
            this.getTechBoqAPI(res.data.id_boq_tech_doc);
          }
          this.getTechfromTSSR(res.data.no_tssr_boq);
          let dataSitesTSSR = await this.getTSSRSitesAPI(res.data.list_of_id_site);
          this.setState({ API_TSSR_Sites : dataSitesTSSR, data_item : []}, () => {
            if(dataSitesTSSR.length !== 0){
              this.viewTssr(dataSitesTSSR);
            }
          });
        }
      }
    }

    getTechfromTSSR(no_tssr){
      this.getDatafromAPI('/delta_boq_tech_sites_sorted_non_page?where={"no_tssr_boq" : "'+no_tssr+'", "no_boq_tech" : { "$ne" : null } }').then(res => {
        if(res !== undefined){
          if(res.data !== undefined){
            const dataTechTSSR = res.data._items;
            const dataUniqTech = [...new Set(dataTechTSSR.map(({ no_boq_tech}) => no_boq_tech))];
            this.setState({list_tech_tssr : dataUniqTech});
          }
        }
      })
    }

    async getTSSRSitesAPI(array_sites){
      let dataTssrSites = [];
      let arrayDataTssrSites = array_sites;
      let getNumberPage = Math.ceil(arrayDataTssrSites.length / 50);
      let count_progress = 10;
      let count_perLoop = 80 / getNumberPage;
      count_perLoop = Math.round(count_perLoop);
      this.setState({ progress_count : count_progress});
      for(let i = 0 ; i < getNumberPage; i++){
        count_progress = count_progress + count_perLoop;
        let DataPaginationSites = arrayDataTssrSites.slice(i * 50, (i+1)*50);
        let arrayIdSites = '"'+DataPaginationSites.join('", "')+'"';
        let where_id_Sites = '?where={"_id" : {"$in" : ['+arrayIdSites+']}}';
        let resSites = await this.getDatafromAPI('/tssr_boq_matrix_sites_sorted_non_page'+where_id_Sites);
        if(resSites !== undefined){
          if(resSites.data !== undefined){
            dataTssrSites = dataTssrSites.concat(resSites.data._items);
            this.setState({progress_count : count_progress});
          }
        }
      }
      return dataTssrSites;
    }

    getAllPP(){
      // const projection = '?projection={"_id" : 1,"pp_id" : 1, "pp_group" : 1, "name" :1, "product_type" :1, "phy_group" :1, "pp_key" : 1, "pp_cust_number" : 1, "unit" : 1 }';
      this.getDatafromAPI('/pp_sorted_non_page?projection={"name" : 1, "pp_cust_number" :1, "pp_id" : 1, "pp_key" : 1, "pp_group" : 1, "unit" : 1}').then( resPP => {
        if(resPP !== undefined){
          if(resPP.data._items.length !== 0){
            this.setState({ pp_all : resPP.data._items});
          }
        }
      })
    }

    // getAllSites(){
    //   this.getDatafromAPI('/site_non_page?projection={"site_id" : 1, "site_name" : 1, "_id" : 1}').then( resSites => {
    //     if(resSites !== undefined){
    //       if(resSites.data._items.length !== 0){
    //         this.setState({ sites_all : resSites.data._items});
    //       }
    //     }
    //   })
    // }

    async getAllSites(array_sites){
      let dataSites = [];
      let arrayDataSites = array_sites;
      let getNumberPage = Math.ceil(arrayDataSites.length / 50);
      for(let i = 0 ; i < getNumberPage; i++){
        let DataPaginationSites = arrayDataSites.slice(i * 50, (i+1)*50);
        let arrayIdSites = '"'+DataPaginationSites.join('", "')+'"';
        arrayIdSites = arrayIdSites.replace("&", "%26");
        let where_id_Sites = '&where={"site_id" : {"$in" : ['+arrayIdSites+']}}';
        let resSites = await this.getDatafromAPI('/site_non_page?projection={"site_id" : 1, "site_name" : 1, "_id" : 1}'+where_id_Sites);
        if(resSites !== undefined){
          if(resSites.data !== undefined){
            dataSites = dataSites.concat(resSites.data._items);
          }
        }
      }
      console.log("dataSites",dataSites);
      return dataSites;
    }

    getSitesTechDataAPI(id_Sites){
      const arraySites = '"'+id_Sites.join('", "')+'"';
      const where_id_Sites = 'where={"_id" : {"$in" : ['+arraySites+']}}';
      this.getDatafromAPI('/boq_tech_sites_non_page?'+where_id_Sites).then(res => {
          this.setState({ API_TSSR_Sites : res.data._items, data_item : []}, () => {
            // this.viewTssr(this.state.API_TSSR_Sites);
          });
      })
    }

    checkValue(props){
      //Swap undefined to null
      if( typeof props == 'undefined' ) {
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

    comparerDiffSites(otherArray){
      //Compare Different between 2 array
      return function(current){
        return otherArray.filter(function(other){
          return other.site_id == current.site_id
        }).length == 0;
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

    componentDidMount(){
      if(this.props.match.params.id === undefined){
        this.getListProject();
      }else{
        this.setState({progress_count : 0, progress_data : 100});
        this.getTSSRBoqAPI(this.props.match.params.id);
        this.getListVersion(this.props.match.params.id);
      }
    }

    getListProject(){
        this.getDatafromAPI('/project_all').then( resp => {
          if(resp !== undefined){
            this.setState({list_project : resp.data._items});
          }
        })
    }

    handleChangeProject(e){
        const value = e.target.value;
        const index = e.target.selectedIndex;
        const text = e.target[index].text;
        this.setState({project_select : value, project_name_select : text});
      }

    handleChangeFieldProject(e){
        const value = e.target.value;
        const index = e.target.selectedIndex;
        const text = e.target[index].text;
        this.setState({project_select : value, project_name_select : text});
    }

    fileHandlerTechnical = (event) => {
      let fileObj = event.target.files[0];
      if(fileObj !== undefined && fileObj !== null ){
        const date = new Date();
        const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        ExcelRenderer(fileObj, (err, rest) => {
          if(err){
            console.log(err);
          }
          else{
            this.setState({action_status : null, action_message : "", data_format : []})
            this.ArrayEmptytoNull(rest.rows, DateNow);
          }
        });
      }
    }

    ArrayEmptytoNull(dataXLS, DateNow){
      let newDataXLS = [];
      for(let i = 0; i < dataXLS.length; i++){
        let col = [];
        for(let j = 0; j < dataXLS[1].length; j++){
          col.push(this.checkValue(dataXLS[i][j]));
        }
        newDataXLS.push(col);
      }
      this.setState({
        rowsTssr: newDataXLS
      });
      this.formatDataTech(newDataXLS);
    }

    // formatDataTech = async (dataXLS) => {
    //   this.setState({waiting_status : 'loading'});
    //   const staticHeader = ["project", "site_id", "site_name"];
    //   const staticHeaderXLS = dataXLS[1].filter((e,n) => n < 3);
    //   if(staticHeaderXLS.equals(staticHeader) !== true){
    //     this.setState({action_status : "failed", action_message : action_message + "Please check your upload format or Package Number"});
    //   }
    //   let dataPackage = {};
    //   const index_item = 3;
    //   let RespondGetPP = [];
    //   const RespondGet_PP = await this.getDatafromAPI('/pp_sorted_non_page')
    //   RespondGetPP = RespondGet_PP.data._items;
    //   console.log("RespondGetPP",RespondGetPP);
    //   this.setState({waiting_status : null});
    //   if(RespondGetPP.length !== 0){
    //     dataPackage = RespondGetPP;
    //   }
    //   console.log("get_id_PP", RespondGetPP);
    //   let action_message = this.state.action_message;
    //   let SitesOfBOQTech = [];
    //   let _id_PP = new Map();
    //   let pp_key = new Map();
    //   let pp_name = new Map();
    //   let group_PP = new Map();
    //   let pp_cust_num = new Map();
    //   let phy_group = new Map();
    //   let pp_type = new Map();
    //   let pp_unit = new Map();
    //   for(let j = index_item ; j < dataXLS[1].length; j++){
    //     let idXLSIndex;
    //     if(dataXLS[1][j] !== null){
    //       idXLSIndex = dataXLS[1][j].toString().split(" /// ",1);
    //     }
    //     if(Array.isArray(idXLSIndex) == true){
    //       idXLSIndex = idXLSIndex.join();
    //     }
    //     let get_id_PP = dataPackage.find(PP => PP.pp_id == idXLSIndex);
    //     if(this.props.match.params.id === undefined){
    //       let cekAllZero = dataXLS.map( e => this.checkValuetoZero(e[j]) ).filter( (e,n) => n>1);
    //       if(cekAllZero.every( e => e == 0)){
    //         action_message = "Value of Product packages can not all zero or null"
    //       }
    //     }
    //     if(get_id_PP == undefined){
    //       let twoSentence = action_message.length !== 0 ? "and " : ""
    //       this.setState({action_status : "failed", action_message : "Please check your upload format or Package Number "+twoSentence+action_message });
    //     }else{
    //       pp_key.set(idXLSIndex, get_id_PP.pp_key);
    //       _id_PP.set(idXLSIndex, get_id_PP._id);
    //       group_PP.set(idXLSIndex, get_id_PP.pp_group)
    //       pp_name.set(idXLSIndex, get_id_PP.name);
    //       pp_cust_num.set(idXLSIndex, get_id_PP.pp_cust_number);
    //       phy_group.set(idXLSIndex, get_id_PP.phy_group)
    //       pp_type.set(idXLSIndex, get_id_PP.product_type);
    //       pp_unit.set(idXLSIndex, get_id_PP.unit);
    //     }
    //   }
    //   if(this.state.action_status !== 'failed' && action_message.length !== 0){
    //     this.setState({action_status : "failed", action_message : action_message});
    //   }
    //   for(let i = 2; i < dataXLS.length; i++){
    //     if(this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]) !== null && this.state.action_status !== "failed"){
    //       let packageDatas = []
    //       for(let j = index_item ; j < dataXLS[1].length; j++){
    //         let dataXLSIndex = dataXLS[1][j].split(" /// ",1).join();
    //         console.log("dataXLSIndex", dataXLSIndex);
    //         let package_data = {
    //           "id_pp_doc" : _id_PP.get(dataXLSIndex),
    //           "pp_id" : dataXLSIndex,
    //           "pp_key" : pp_key.get(dataXLSIndex),
    //           "package_name" : pp_name.get(dataXLSIndex).toString(),
    //           "pp_group" : group_PP.get(dataXLSIndex),
    //           "pp_cust_number" : pp_cust_num.get(dataXLSIndex),
    //           "phy_group" : phy_group.get(dataXLSIndex),
    //           "product_type" : pp_type.get(dataXLSIndex),
    //           "unit" : pp_unit.get(dataXLSIndex),
    //           "qty" : this.checkValuetoZero(dataXLS[i][j]),
    //           "ericsson_allocated" : 0,
    //           "qty_quotation_allocated" : 0,
    //           "smart_allocated" : 0
    //         }
    //         packageDatas.push(package_data);
    //       }
    //       let SiteBOQTech = {
    //         "site_id" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]).toString(),
    //         "site_name" : this.checkValuetoString(dataXLS[i][this.getIndex(dataXLS[1],'site_name')]).toString(),
    //         "list_of_site_items" : packageDatas,
    //         "created_by" : localStorage.getItem('user_ID'),
    //         "updated_by" : localStorage.getItem('user_ID'),
    //         "deleted" : 0
    //       }
    //       SitesOfBOQTech.push(SiteBOQTech);
    //     }
    //   }
    //   this.setState({data_format : SitesOfBOQTech});
    //   return SitesOfBOQTech;
    // }

    formatDataTech = async(dataXLS) => {
      let action_message = this.state.action_message;
      let actionStatus = null;
      this.setState({waiting_status : 'loading'});
      const staticHeader = ["project", "site_id", "site_name"];
      const staticHeaderXLS = dataXLS[1].filter((e,n) => n < 3);
      if(staticHeaderXLS.equals(staticHeader) !== true){
        this.setState({action_status : "failed", action_message : action_message + "la Please check your upload format or Package Number"});
      }
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
            console.log("idXLSIndex quot special", idXLSIndex);
          }else{
            ppid_upload.push(idXLSIndex);
            console.log("idXLSIndex quot", idXLSIndex);
          }
        }
      }
      RespondGetPP = await this.getAllPP(ppid_upload, pp_id_special);
      this.setState({waiting_status : null});
      if(RespondGetPP.length !== 0){
        dataPackage = RespondGetPP;
      }
      console.log('pp id upload', dataPackage);
      let SitesOfBOQTech = [];
      let id_PP = new Map();
      let _id_PP = new Map();
      let pp_key = new Map();
      let pp_name = new Map();
      let group_PP = new Map();
      let pp_cust_num = new Map();
      let phy_group = new Map();
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
          console.log("data XLS undefined", idXLSIndex );
          data_undefined.push(idXLSIndex)
        }else{
          if(id_PP.get(idXLSIndex) === undefined){
            id_PP.set(idXLSIndex, get_id_PP.pp_id);
            pp_key.set(idXLSIndex, get_id_PP.pp_key);
            _id_PP.set(idXLSIndex, get_id_PP._id);
            group_PP.set(idXLSIndex, get_id_PP.pp_group)
            pp_name.set(idXLSIndex, get_id_PP.name);
            pp_cust_num.set(idXLSIndex, get_id_PP.pp_cust_number);
            phy_group.set(idXLSIndex, get_id_PP.phy_group)
            pp_type.set(idXLSIndex, get_id_PP.product_type);
            pp_unit.set(idXLSIndex, get_id_PP.unit);
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
      let sitePPerror = [];
      for(let i = 2; i < dataXLS.length; i++){
        if(this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]) !== null && this.state.action_status !== "failed" && actionStatus !== "failed"){
          let packageDatas = [];
          let errorPP = [];
          for(let j = index_item ; j < dataXLS[1].length; j++){
            let dataXLSIndex = dataXLS[1][j].split(" /// ",1).join();
            if(dataAllnull.includes(dataXLSIndex) === false){
              let package_data = {
                "id_pp_doc" : _id_PP.get(dataXLSIndex),
                "pp_id" : dataXLSIndex,
                "pp_key" : pp_key.get(dataXLSIndex),
                "package_name" : pp_name.get(dataXLSIndex).toString(),
                "pp_group" : group_PP.get(dataXLSIndex),
                "pp_cust_number" : pp_cust_num.get(dataXLSIndex),
                "phy_group" : phy_group.get(dataXLSIndex),
                "product_type" : pp_type.get(dataXLSIndex),
                "unit" : pp_unit.get(dataXLSIndex),
                "qty" : this.checkValuetoZero(dataXLS[i][j]),
                "ericsson_allocated" : 0,
                "qty_quotation_allocated" : 0,
                "smart_allocated" : 0
              }
              packageDatas.push(package_data);
              if(isNaN(package_data.qty)){
                errorPP.push(1);
              }else{
                if(/\s/g.test(package_data.qty)){
                  errorPP.push(1);
                }
              }
            }
          }
          let siteID = this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]).toString();
          let SiteBOQTech = {
            "site_id" : siteID,
            "site_name" : this.checkValuetoString(dataXLS[i][this.getIndex(dataXLS[1],'site_name')]).toString(),
            "list_of_site_items" : packageDatas,
            "version" : "0",
            "created_by" : localStorage.getItem('user_ID'),
            "updated_by" : localStorage.getItem('user_ID'),
            "deleted" : 0
          }
          if(errorPP.length !== 0){
            sitePPerror.push(SiteBOQTech.site_id);
          }
          if(siteID.length === 0){
            siteIDNull.push(null);
          }
          if(siteSaveFormat.find(e => e === SiteBOQTech.site_id) !== undefined){
            siteError.push(SiteBOQTech.site_id);
          }
          siteSaveFormat.push(SiteBOQTech.site_id);
          SitesOfBOQTech.push(SiteBOQTech);
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
      if(sitePPerror.length !== 0){
        actionStatus = "failed";
        let twoSentence = action_message.length !== 0 ? "and " : "";
        action_message = action_message+twoSentence+"Please Check Qty in site "+sitePPerror.join(", ");
      }
      if(actionStatus === 'failed'){
        this.setState({action_status : "failed", action_message : action_message});
      }
      console.log("SitesOfBOQTech", SitesOfBOQTech);
      this.setState({data_format : SitesOfBOQTech});
      return SitesOfBOQTech;
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
        let resPP = await this.getDatafromAPI('/pp_sorted_non_page'+where_id_PP);
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
        let resPP = await this.getDatafromAPI('/pp_sorted_non_page'+where_id_PP);
        if(resPP !== undefined){
          if(resPP.data !== undefined){
            dataPP = dataPP.concat(resPP.data._items);
          }
        }
      }
      return dataPP;
    }

    saveBOQTSSR = async () => {
      this.toggleLoading();
      let resAmount = await this.getDatafromAPI('/amounttssrboq/5d24454a951c58496433be19');
      const data_Sites = this.state.data_format;
      const cekUndefined = data_Sites.find(e => e.list_of_site_items.id_pp_doc == undefined);
      if(cekUndefined.length !== 0){
        const Tssr_count = resAmount.data.tssr_boq_data+1;
        if(resAmount !== undefined){
          if(resAmount.data !== undefined){
            const update_amount = {
              "tssr_boq_data" : Tssr_count
            }
            this.updateAmount(update_amount, resAmount.data._etag);
          }
        }
        let getSites = await this.getAllSites(data_Sites.map(e => e.site_id));
        console.log('getSites', getSites);
        for(let i = 0; i < data_Sites.length; i++){
          let sitesIndex = getSites.find(site => site.site_id === data_Sites[i].site_id.toString());
          console.log('sitesIndex',sitesIndex);
          if(sitesIndex === undefined){
            let DataSite = {
              "site_id" : data_Sites[i].site_id,
              "site_name" : data_Sites[i].site_name,
              "longitude": null, "latitude": null, "customer_area": null, "province": null, "city": null, "address": null, "site_type": null, "search_ring_status": null, "lessor_type": null, "land_classification": null, "lessor_name": null, "lessor_contact": null, "distance_from_nominal_in_meter": null, "candidate_status": null, "tower_type": null, "tower_height_in_meter": null, "permanent_power_solution": null, "electrical_cooperative": null, "temporary_power_supplier": null, "tx_readiness_status": null, "tx_readiness_remarks": null, "tx_readiness_plan_date": null, "tx_readiness_actual": null, "ac_dc_power_status": null, "ac_dc_power_remarks": null, "ac_dc_power_plan_date": null, "ac_dc_power_actual_date": null, "tower_status": null, "tower_remarks": null, "tower_plan_date": null, "tower_actual_date": null, "access_status": null, "access_remarks": null, "access_plan_date": null, "access_actual_date": null,
              "deleted" : 0,
              "created_by" : localStorage.getItem('user_ID'),
              "updated_by" : localStorage.getItem('user_ID')
            }
            const postSites = await this.postDatatoAPI('/site_op', DataSite);
            if(postSites !== undefined){
              data_Sites[i]['site_name'] = data_Sites[i].site_name;
              data_Sites[i]['id_site_doc'] = postSites.data._id;
            }
            console.log('ste save', JSON.stringify(DataSite));
          }else{
            data_Sites[i]['site_name'] = sitesIndex.site_name;
            data_Sites[i]['id_site_doc'] = sitesIndex._id;
          }
        }
        if(resAmount !== undefined){
          this.saveTSSRtoDB(Tssr_count, data_Sites);
        }
      }else{
        this.setState({action_status : 'failed' , action_message : "" }, () => {this.toggleLoading()});
      }

    }

    prepareBOQTech = async () => {
      try {
        let respond = this.getDatafromAPI('/amounttssrboq/5d24454a951c58496433be19');
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Prepare PP", respond);
        }
        return respond;
      }catch (err) {
        let respond = undefined;
        console.log("respond Prepare PP", err);
        return respond;
      }
    }

    async updateAmount(data, _etag){
      try {
        let respond = await this.patchDatatoAPI('/amounttssrboq/5d24454a951c58496433be19', data, _etag)
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Update Amount", respond);
        }
        return respond;
      }catch (err) {
        let respond = undefined;
        console.error("respond Update Amount",err);
        return respond;
      }
    }
    saveTSSRtoDB(count, dataSites){
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      const ID_TSSR = "TSSRBOQ-"+date.getFullYear().toString().substr(-2)+(date.getMonth()+1).toString().padStart(2, '0')+date.getDate().toString().padStart(2, '0')+"-"+count.toString().padStart(4, '0');
      const BOQTssr = {
        "id_boq_tech_doc" : null,
        "no_boq_tech" : null,
        "no_tssr_boq" : ID_TSSR,
        "rev" : "PA",
        "rev_by" : localStorage.getItem('user_Email'),
        "rev_date" : DateNow.toString(),
        "created_by" : localStorage.getItem('user_ID'),
        "updated_by" : localStorage.getItem('user_ID'),
        "id_project_doc" : this.state.project_select,
        "project_name" : this.state.project_name_select,
        "version" : "0",
        "deleted" : 0,
        "created_on" : DateNow.toString()
      }
      console.log("BOQTssr", JSON.stringify(BOQTssr));
      this.postDatatoAPI('/tssr_boq_matrix_op', BOQTssr).then(res => {
          if(res !== undefined){
            this.saveSitesToDB(dataSites, ID_TSSR, res.data._id, res.data._etag);
          }else{
            this.setState({action_status : 'failed', action_message : ""}, () => {this.toggleLoading()});
            const dataUpdateTssr = {
              "deleted" : 1
            }
            this.updateTSSRToDB(dataUpdateTssr, res.data._id, res.data._etag);
          }
      })
    }

    async saveSitesToDB(dataSites, id_tssr, _id_Tssr, _etag_Tssr){
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      for(let i = 0; i < dataSites.length; i++){
        dataSites[i]["id_tssr_boq_doc"] = _id_Tssr;
        dataSites[i]["no_tssr_boq"] = id_tssr;
        dataSites[i]["no_tssr_boq_site"] = id_tssr+"-"+(parseInt(i)+1);
        dataSites[i]["id_boq_tech_doc"] = null;
        dataSites[i]["no_boq_tech"] = null;
        dataSites[i]["id_project_doc"] = this.state.project_select;
        dataSites[i]["project_name"] = this.state.project_name_select;
        dataSites[i]["version"] = "0";
        dataSites[i]["created_on"] = DateNow.toString();
        dataSites[i]["updated_on"] = DateNow.toString();
      }
      const daatSite1 = dataSites[0];
      // console.log("JSON.stringify(dataSites)",JSON.stringify(dataSites));
      let res = await this.postDatatoAPI('/tssr_boq_matrix_sites_op', dataSites)
        if(res === undefined){res = {}; res["data"] = undefined};
        if(res.data !== undefined){
            // let deltaTSSR = await this.TSSRDeltaPost(dataSites);
            let dataUpdateTssr = [];
            if(res.data._items !== undefined){
                dataUpdateTssr = {
                "list_of_id_site" : res.data._items.map(e => e._id)
              }
            }else{
                dataUpdateTssr = {
                    "list_of_id_site" : [res.data._id]
                }
            }
            this.updateTSSRToDB(dataUpdateTssr, _id_Tssr, _etag_Tssr, 0);
            this.setState({action_status : 'success', action_message : "Your TSSR BOQ has been saved"}, () => {this.toggleLoading()})
        }else{
            this.setState({action_status : 'failed', action_message : ""}, () => {this.toggleLoading()});
            const dataUpdateTssr = {
              "deleted" : 1
            }
            this.updateTSSRToDB(dataUpdateTssr, _id_Tssr, _etag_Tssr);
          }
    }

    async TSSRDeltaPost(dataSite){
        const date = new Date();
        const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        let dataSites = [];
        for(let i = 0; i < dataSite.length; i++){
          let siteIdx = Object.assign({}, dataSite[i]);
          siteIdx["id_boq_tech_doc"] = null;
          siteIdx["no_boq_tech"] = null;
          delete siteIdx.version;
          if(siteIdx.no_tssr_boq_site !== undefined){
            delete siteIdx.no_tssr_boq_site;
          }
          if(siteIdx.list_of_material_borrowing !== undefined){
            delete siteIdx.list_of_material_borrowing;
          }
          dataSites.push(siteIdx);
        }
        console.log("dataSites", JSON.stringify(dataSites));
        let resdelta = await this.postDatatoAPI('/delta_boq_tech_sites_op', dataSites);
        if(resdelta === undefined){resdelta = {}; resdelta["data"] = undefined}
        if(resdelta.data !== undefined){
          return resdelta;
        }else{
          return undefined;
        }
    }

    updateTSSRToDB(data, _id_Tssr, _etag_Tssr){
      this.patchDatatoAPI('/tssr_boq_matrix_op/'+_id_Tssr, data, _etag_Tssr).then(res => {
          console.log(res);
          if(res !== undefined){
            if(res.data._id !== undefined || res.data._id !== null){
                console.log("respond Tech update", res);
                  this.getTSSRBoqAPI(res.data._id);
                  //setTimeout(function(){ this.setState({ redirectSign : res.data._id}); }.bind(this), 3000);
            }
          }else{
            this.setState({action_status : 'failed', action_message : ""}, () => {this.toggleLoading()});
            console.log("respond Tech update", "Error");
          }
      })
    }

    async overwriteDataSites() {
      this.toggleLoading();
      const dataTssr = this.state.tssr_API;
      let dataTssrOld = this.state.data_item;
      const dataTssrNew = this.state.data_format;
      if(dataTssrNew.length === 0){
        this.setState({action_status : 'failed', action_message : "There are no data for updated"}, () => {this.toggleLoading()});
      }else{
        console.log("delay 1");
        const sitesTssrNew = dataTssrNew.filter(this.comparerDiffSites(dataTssrOld));
        const sitesTssrDel = dataTssrOld.filter(this.comparerDiffSites(dataTssrNew));
        const dataTssrSame = dataTssrNew.filter( e => dataTssrOld.findIndex(i => e.site_id === i.site_id) !== -1);
        console.log("delay 2");
        this.LoopEditTSSR(dataTssrSame, sitesTssrNew, dataTssr.version);
      }
    }

    async LoopEditTSSR(dataSitesSame, dataSitesNew, version){
      let progressData = dataSitesSame.length + dataSitesNew;
      this.setState({progress_data : progressData, progress_count : 0});
      const date = new Date();
      const siteSame = this.state.data_item;
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      let sitesNew = dataSitesNew;
      let arrayIDSiteUpdate = [];
      let arrayIDSiteNew = [];
      let siteUndefined = [];
      let arraySiteDelta = [];
      let siteTechNew = false;
      let action_message = '';
      let countDataProcess = 0;
      console.log("delay 3");
      for(let i = 0; i < dataSitesSame.length; i++){
        console.log("======== Matrix ============");
        let siteIndex = siteSame.find(e => e.site_id === dataSitesSame[i].site_id);
        siteIndex["list_of_site_items"] = dataSitesSame[i].list_of_site_items;
        const dataSiteUpdate = {
          "site_id" : siteIndex.site_id,
          "site_name" : siteIndex.site_name,
          "list_of_site_items" : dataSitesSame[i].list_of_site_items,
          "version" : version.toString(),
          "deleted" : 0
        }
        // console.log("dataSiteUpdate", JSON.stringify(dataSiteUpdate) );
        let dataUpdateSite = undefined
        if(this.state.version_selected !== null && this.state.version_selected !== this.state.version_now){
          const sitesNow = this.state.API_TSSR_Sites.find(e => e.site_id === dataSitesSame[i].site_id);
          dataUpdateSite = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+sitesNow._id, dataSiteUpdate, sitesNow._etag);
        }else{
          dataUpdateSite = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+siteIndex._id, dataSiteUpdate, siteIndex._etag);
        }
        if(dataUpdateSite === undefined){dataUpdateSite = {}; dataUpdateSite["data"] = undefined}{
          if(dataUpdateSite.data !== undefined){
            let dataDelta = await this.editDelta(siteIndex);
            if(dataDelta !== undefined){
              arraySiteDelta.push(dataDelta);
            }
            countDataProcess++;
            arrayIDSiteUpdate.push(siteIndex._id);
            this.setState({progress_count : countDataProcess});
          }
        }
        console.log("======== Matrix END ============");
      }
      if(dataSitesNew.length !== 0){
        let getSites = await this.getAllSites(sitesNew.map(e => e.site_id));
        console.log("getSites", getSites);
        const getLastNumber = this.state.tssr_API.list_of_id_site.length;
        for(let j = 0; j < sitesNew.length; j++){
          let _id_site_idx = getSites.find(e => e.site_id === sitesNew[j].site_id);
          if(_id_site_idx !== undefined){
            sitesNew[j]["id_site_doc"] = _id_site_idx._id;
          }else{
            siteUndefined.push(sitesNew[j].site_id);
            sitesNew[j]["id_site_doc"] = _id_site_idx;
          }
          sitesNew[j]["id_tssr_boq_doc"] = this.state.tssr_API._id;
          sitesNew[j]["no_tssr_boq"] = this.state.tssr_API.no_tssr_boq;
          sitesNew[j]["no_tssr_boq_site"] = this.state.tssr_API.no_tssr_boq+"-"+(getLastNumber+(parseInt(j)+1));
          sitesNew[j]["id_boq_tech_doc"] = this.state.tssr_API.id_boq_tech_doc;
          sitesNew[j]["no_boq_tech"] = this.state.tssr_API.no_boq_tech;
          sitesNew[j]["id_project_doc"] = this.state.tssr_API.id_project_doc;
          sitesNew[j]["project_name"] = this.state.tssr_API.project_name;
          sitesNew[j]["version"] = version.toString();
          sitesNew[j]["created_on"] = DateNow.toString();
          sitesNew[j]["updated_on"] = DateNow.toString();
        }
        let postTSSRsites = await this.postDatatoAPI('/tssr_boq_matrix_sites_op', sitesNew);
        //Update it
        if(postTSSRsites === undefined){postTSSRsites = {}; postTSSRsites["data"] = undefined}{
          if(postTSSRsites.data !== undefined){
            let resultUpdate = [];
            if(postTSSRsites.data._items !== undefined){
              resultUpdate = postTSSRsites.data._items.map( e => e._id);
            }else{
              resultUpdate = [postTSSRsites.data._id]
            }
            let id_sites = this.state.tssr_API.list_of_id_site.concat(resultUpdate);
            id_sites = [...new Set(id_sites)];
            const dataUpdateTSSR = {
                "list_of_id_site" : id_sites,
                "rev" : "PA",
                "rev_by" : localStorage.getItem('user_Email'),
                "rev_date" : DateNow.toString(),
                "version" : version.toString()
            }
            let updateTSSR = await this.patchDatatoAPI('/tssr_boq_matrix_op/'+this.state.tssr_API._id, dataUpdateTSSR, this.state.tssr_API._etag )
            let dataSites = [];
            for(let i = 0; i < sitesNew.length; i++){
              let siteIdx = Object.assign({}, sitesNew[i]);
              siteIdx["id_boq_tech_doc"] = null;
              siteIdx["no_boq_tech"] = null;
              delete siteIdx.version;
              if(siteIdx.no_tssr_boq_site !== undefined){
                delete siteIdx.no_tssr_boq_site;
              }
              if(siteIdx.list_of_material_borrowing !== undefined){
                delete siteIdx.list_of_material_borrowing;
              }
              dataSites.push(siteIdx);
            }
            console.log("delta_boq_tech_sites_op", JSON.stringify(dataSites));
            let postTSSRDelta = await this.postDatatoAPI('/delta_boq_tech_sites_op', dataSites);
            if(postTSSRDelta === undefined){postTSSRDelta = {}; postTSSRDelta["data"] = undefined}{
              if(postTSSRDelta.data !== undefined){
                countDataProcess = countDataProcess + sitesNew.length;
                this.setState({progress_count : countDataProcess});
                arrayIDSiteNew = arrayIDSiteNew.concat(resultUpdate);
              }
            }
          }
        }
      }else{
        const dataUpdateTSSR = {
          "rev" : "PA",
          "rev_by" : localStorage.getItem('user_Email'),
          "rev_date" : DateNow.toString(),
          "version" : version.toString()
      }
      let updateTSSR = await this.patchDatatoAPI('/tssr_boq_matrix_op/'+this.state.tssr_API._id, dataUpdateTSSR, this.state.tssr_API._etag );
        if(this.state.tssr_API.id_boq_tech_doc !== null && dataSitesNew.length !== 0){
          siteTechNew = true;
        }
      }
      if((dataSitesSame.length + dataSitesNew.length) === (arrayIDSiteUpdate.length + arrayIDSiteNew.length)){
        this.setState({action_status : 'success', action_message : 'Yout TSSR BOQ Has Been Updated '}, () => {
          this.toggleLoading();
          setTimeout(function(){ window.location.reload(); }, 1500);
        })
      }else{
        if(siteTechNew == true){
          action_message = action_message + 'TSSR From Technical cant add new sites; ';
        }
        this.setState({action_status : 'failed', action_message : action_message}, () => {
          this.toggleLoading();
        })
      }
    }

    revisionTssr  = async () => {
      this.toggleLoading();
      let dataTssr = this.state.tssr_API;
      this.setState({ progress_data : "pre Process"});
      this.setState({ progress_count : 1});
      const pickedVersion = this.state.list_version;
      if(this.state.version_selected !== null && this.state.version_selected !== this.state.version_now){
        dataTssr = this.state.tssr_API_prev;
      }
      const dataSites = this.state.API_TSSR_Sites;
      let dataRevTssr = Object.assign({}, dataTssr);
      const dataTssrNew = this.state.data_format;
      if(dataTssrNew.length === 0){
        this.setState({action_status : 'failed', action_message : "There are no data for updated"}, () => {this.toggleLoading()});
      }else{
        let getVerNumber = parseInt(dataTssr.version);
        const dataRev = await this.getDatafromAPI('/tssr_boq_matrix_rev?where={"id_document" : "'+dataTssr._id+'"}&projection={"version" : 1}');
        if(dataRev !== undefined){
          if(dataRev.data !== undefined){
            if(dataRev.data._items.length !== 0){
              getVerNumber = (Math.max.apply(Math, dataRev.data._items.map(e => parseInt(e.version))))+1;
            }else{
              if(pickedVersion.find(e => parseInt(e.version) === getVerNumber) === true){
                getVerNumber = (Math.max.apply(Math, pickedVersion.map(e => parseInt(e.version))))+1;
              }
            }
          }else{
            if(pickedVersion.find(e => parseInt(e.version) === getVerNumber) === true){
              getVerNumber = (Math.max.apply(Math, pickedVersion.map(e => parseInt(e.version))))+1;
            }
          }
        }else{
          if(pickedVersion.find(e => parseInt(e.version) === getVerNumber) === true){
            getVerNumber = (Math.max.apply(Math, pickedVersion.map(e => parseInt(e.version))))+1;
          }
        }
        this.setState({ progress_count : 2});
        dataRevTssr["id_document"] = dataTssr._id;
        if(dataTssr.created_by !== undefined){
          if(dataTssr.created_by._id !== undefined){
            dataRevTssr["created_by"] = dataTssr.created_by._id;
          }else{
            dataRevTssr["created_by"] = dataTssr.created_by;
          }
        }
        if(dataTssr.updated_by !== undefined){
          if(dataTssr.updated_by._id !== undefined){
            dataRevTssr["updated_by"] = dataTssr.updated_by._id;
          }else{
            dataRevTssr["updated_by"] = dataTssr.updated_by;
          }
        }
        dataRevTssr["updated_on"] = dataTssr.updated_on;
        dataRevTssr["list_of_id_site"] = dataTssr.list_of_id_site;
        if(dataRevTssr.rev_file !== null &&  dataRevTssr.rev_file !== undefined){
          const file = dataRevTssr.rev_file.file.split("/")
          dataRevTssr["rev_file"] = file[3];
        }
        dataRevTssr["version"] = getVerNumber.toString();
        delete dataRevTssr._id;
        delete dataRevTssr._etag;
        delete dataRevTssr._links;
        this.setState({ progress_count : 3});
        const ResPostTssrRev = await this.postDatatoAPI('/tssr_boq_matrix_rev', dataRevTssr);
        if(ResPostTssrRev !== undefined ){
          if(ResPostTssrRev.status >= 200 && ResPostTssrRev.status < 400){
            console.log("delay 4 rev");
          let dataSitesRev= []
          for(let i = 0; i < dataSites.length; i++){
            let dataRevIn = Object.assign({}, dataSites[i]);
            dataRevIn["id_document"] = dataRevIn._id;
            dataRevIn["version"] = getVerNumber.toString();
            delete dataRevIn._id;
            delete dataRevIn._etag;
            delete dataRevIn._links;
            delete dataRevIn.list_qty_items;
            if(dataRevIn.version === undefined || dataRevIn.version === null){
              dataRevIn["version"] = "0";
            }
            //remove later
            if(dataRevIn.list_of_material_borrowing !== undefined){
              delete dataRevIn.list_of_material_borrowing;
            }
            if(dataTssr.created_by !== undefined){
              if(dataTssr.created_by._id !== undefined){
                dataRevIn["created_by"] = dataTssr.created_by._id;
              }else{
                dataRevIn["created_by"] = dataTssr.created_by;
              }
            }
            if(dataTssr.updated_by !== undefined){
              if(dataTssr.updated_by._id !== undefined){
                dataRevIn["updated_by"] = dataTssr.updated_by._id;
              }else{
                dataRevIn["updated_by"] = dataTssr.updated_by;
              }
            }
            dataSitesRev.push(dataRevIn);
          }
          this.setState({ progress_count : 4});
          const ResPostSitesTssrRev = await this.postDatatoAPI('/tssr_boq_matrix_sites_rev', JSON.stringify(dataSitesRev));
          if(ResPostSitesTssrRev !== undefined){
            if(ResPostSitesTssrRev.status <400){
              let dataTssrOld = this.state.data_item;
              if(this.state.version_selected !== null && this.state.version_selected !== this.state.version_now){
                dataTssrOld = this.state.API_TSSR_Sites;
              }
              const sitesTssrNew = dataTssrNew.filter(this.comparerDiffSites(dataTssrOld));
              const sitesTssrDel = dataTssrOld.filter(this.comparerDiffSites(sitesTssrNew));
              const dataTssrSame = dataTssrNew.filter( e => dataTssrOld.findIndex(i => e.site_id === i.site_id) !== -1);
              // let getVerNumber = parseInt(dataTssr.version);
              this.setState({ progress_count : 5});
              this.LoopEditTSSR(dataTssrSame, sitesTssrNew, (getVerNumber+1));
            }else{
              this.toggleLoading();
            }
          }else{
            this.toggleLoading();
          }
        }else{
          this.toggleLoading();
        }
        }else{
          this.toggleLoading();
        }
      }
    }

    async editDelta(dataSiteTssr){
      let returnDelta = undefined;
      let sitesDelta = undefined;
      let whereDelta = '?where={"id_tssr_boq_doc" : "'+dataSiteTssr.id_tssr_boq_doc+'", "id_site_doc" : "'+dataSiteTssr.id_site_doc+'" }'
      let getDelta = await this.getDatafromAPI('/delta_boq_tech_sites_op'+whereDelta);
      if(getDelta !== undefined){
        if(getDelta.data._items !== undefined){
          sitesDelta = getDelta.data._items;
        }
      }
      const dataSitesTech = this.state.boq_tech_sites_API;
      let dataSiteTechIdx = dataSitesTech.find(e => e.id_site_doc === dataSiteTssr.id_site_doc);
      let deltaAlready = [];
      let deltaNotAlready = [];
      if(sitesDelta !== undefined){
        deltaAlready = sitesDelta.filter(e => e.no_boq_tech !== null);
        deltaNotAlready = sitesDelta.find(e => e.no_boq_tech === null);
        let siteItems = await this.countDeltaTSSR(dataSiteTechIdx, dataSiteTssr, deltaAlready);
        const dataSiteUpdate = {
          "list_of_site_items" : siteItems,
          "deleted" : 0
        }
        if(siteItems.length  === 0){
          dataSiteUpdate["deleted"] = 1;
        }
        let countProgress = 0;
        if(deltaNotAlready !== undefined){
          let updateDelta = await this.patchDatatoAPI('/delta_boq_tech_sites_op/'+deltaNotAlready._id, dataSiteUpdate, deltaNotAlready._etag);
          if(updateDelta !== undefined){
            if(updateDelta.data !== undefined){
              countProgress++;
              returnDelta = updateDelta.data;
              // this.setState({ progress_count : countProgress });
            }
          }
        }
        if(deltaNotAlready === undefined){
          if(siteItems.length !== 0){
            let dataPostTssr = Object.assign({}, dataSiteTssr);
            delete dataPostTssr.created_on;
            delete dataPostTssr._id;
            delete dataPostTssr._etag;
            delete dataPostTssr.list_qty_items;
            delete dataPostTssr.version;
            if(dataPostTssr.no_tssr_boq_site !== undefined){
              delete dataPostTssr.no_tssr_boq_site;
            }
            if(dataPostTssr.list_of_material_borrowing !== undefined){
              delete dataPostTssr.list_of_material_borrowing;
            }
            dataPostTssr["id_boq_tech_doc"] = null;
            dataPostTssr["no_boq_tech"] = null;
            dataPostTssr["list_of_site_items"] = siteItems;
            dataPostTssr["deleted"] = 0;
            dataPostTssr["created_by"] = localStorage.getItem("user_ID");
            dataPostTssr["updated_by"] = localStorage.getItem("user_ID");
            // console.log("delta_boq_tech_sites_op", JSON.stringify(dataPostTssr));
            console.log("======== Delta ============");
            let postDelta = await this.postDatatoAPI('/delta_boq_tech_sites_op', dataPostTssr);
            if(postDelta !== undefined){
              if(postDelta.data !== undefined){
                countProgress++;
                returnDelta = postDelta.data;
                // this.setState({ progress_count : countProgress });
              }
            }
          }
        }
      }
      console.log("kosong", returnDelta);
      return returnDelta;
    }

    // async editDelta(dataSiteTssr){
    //   let returnDelta = undefined;
    //   if(dataSiteTssr.id_boq_tech_doc === null){
    //     let whereDelta = '?where={"id_tssr_boq_doc" : "'+dataSiteTssr.id_tssr_boq_doc+'", "id_site_doc" : "'+dataSiteTssr.id_site_doc+'" }'
    //     let getDelta = await this.getDatafromAPI('/delta_boq_tech_sites_op'+whereDelta);
    //     if(getDelta !== undefined){
    //       if(getDelta.data._items.length !== 0){
    //         let deltaIndex = getDelta.data._items[0];
    //         const dataSiteUpdate = {
    //           "list_of_site_items" : dataSiteTssr.list_of_site_items,
    //           "deleted" : 0
    //         }
    //         let updateDelta = await this.patchDatatoAPI('/delta_boq_tech_sites_op/'+deltaIndex._id, dataSiteUpdate, deltaIndex._etag);
    //         if(updateDelta !== undefined){
    //           if(updateDelta.data !== undefined){
    //             returnDelta = updateDelta.data;
    //           }
    //         }
    //       }
    //     }
    //   }else{
    //     const dataSitesTech = this.state.boq_tech_sites_API;
    //     console.log("dataSitesTech", dataSitesTech);
    //     let dataSiteTechIdx = dataSitesTech.find(e => e.id_site_doc === dataSiteTssr.id_site_doc);
    //     let siteItems = await this.countDeltaTSSR(dataSiteTechIdx, dataSiteTssr, []);
    //     const dataSiteUpdate = {
    //       "list_of_site_items" : siteItems,
    //       "deleted" : 0
    //     }
    //     let whereDelta = '?where={"id_tssr_boq_doc" : "'+dataSiteTssr.id_tssr_boq_doc+'", "id_site_doc" : "'+dataSiteTssr.id_site_doc+'" }'
    //     let getDelta = await this.getDatafromAPI('/delta_boq_tech_sites_op'+whereDelta);
    //     if(getDelta !== undefined){
    //       if(getDelta.data._items.length !== 0){
    //         let deltaIndex = getDelta.data._items[0];
    //         console.log("diff dataSiteUpdate", JSON.stringify(dataSiteUpdate));
    //         let updateDelta = await this.patchDatatoAPI('/delta_boq_tech_sites_op/'+deltaIndex._id, dataSiteUpdate, deltaIndex._etag);
    //         if(updateDelta !== undefined){
    //           if(updateDelta.data !== undefined){
    //             returnDelta = updateDelta.data;
    //           }
    //         }
    //       }else{
    //         if(getDelta.data._items.length === 0 && siteItems.length !== 0){
    //           let dataPostTssr = Object.assign({}, dataSiteTssr);
    //           delete dataPostTssr.created_on;
    //           delete dataPostTssr._id;
    //           delete dataPostTssr._etag;
    //           delete dataPostTssr.list_qty_items;
    //           if(dataPostTssr.no_tssr_boq_site !== undefined){
    //             delete dataPostTssr.no_tssr_boq_site;
    //           }
    //           dataPostTssr["id_boq_tech_doc"] = null;
    //           dataPostTssr["no_boq_tech"] = null;
    //           dataPostTssr["list_of_site_items"] = siteItems;
    //           dataPostTssr["deleted"] = 0;
    //           dataPostTssr["created_by"] = localStorage.getItem("user_ID");
    //           dataPostTssr["updated_by"] = localStorage.getItem("user_ID");
    //           let postDelta = await this.postDatatoAPI('/delta_boq_tech_sites_op', dataPostTssr);
    //           if(postDelta !== undefined){
    //             if(postDelta.data !== undefined){
    //               returnDelta = postDelta.data;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   console.log("kosong", returnDelta);
    //   return returnDelta;
    // }

    countDeltaTSSR(siteTech, siteTSSR, deltaAlready){
      let itemTech = [];
      let itemDeltaAlrdy = [];
      if(siteTech !== undefined && siteTech !== null){
        itemTech = siteTech.list_of_site_items;
      }
      if(deltaAlready.length !== 0){
        itemDeltaAlrdy = deltaAlready.map( e=> e.list_of_site_items).reduce((l, n) => l.concat(n), []);
      }
      let onlyItemTssr = siteTSSR.list_of_site_items;
      let onlyItemAlready = itemTech.concat(itemDeltaAlrdy);
      let list_items = []
      let get_id_package = [...new Set(onlyItemTssr.map(({ id_pp_doc}) => id_pp_doc))];
      for(let i = 0;  i< get_id_package.length; i++){
        let diff = 0
        const alreadyQTYCount = onlyItemAlready.filter(d => d.id_pp_doc === get_id_package[i]);
        const alreadyQTY = alreadyQTYCount.reduce((a,b) => a + b.qty, 0);
        const tssrQTY = onlyItemTssr.find(d => d.id_pp_doc === get_id_package[i]);
        if(alreadyQTYCount.length !== 0){
          diff = tssrQTY.qty - alreadyQTY;
        }else{
          diff = tssrQTY.qty;
        }
        if(diff > 0){
          let itemsIdx = Object.assign({}, tssrQTY);
          itemsIdx['qty'] = diff;
          list_items.push(itemsIdx);
        }
      }
      console.log("list_items", list_items);
      return list_items;
    }

    async deletedSites(sitesTechDel){
      const updateDelete = {"deleted" : 1};
      let patchData = [];
      for(let i = 0; i < sitesTechDel.length; i++){
        let respondPatch = await this.patchDatatoAPI('/boq_tech_sites_op/'+sitesTechDel[i]._id, updateDelete, sitesTechDel[i]._etag);
        if(respondPatch === undefined){respondPatch["data"] = undefined}
        if(respondPatch.data !== undefined){
          patchData.push(respondPatch.data);
        }
      }
      return patchData;
    }

    countFromDataBase(dataTech){
      let onlyItem = dataTech.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
      let get_id_package = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
      let countData = {};
      for(let i = 0;  i< get_id_package.length; i++){
        const materialQTY = onlyItem.filter(d => d.pp_id === get_id_package[i]);
        countData[get_id_package[i]] = materialQTY.reduce((a,b) => a + b.qty, 0);
      }
    }

    getPPUniq(item){
      let PP = [];
      const map = new Map();
      const perPP = item;
      for (let i = 0; i < perPP.length;i++) {
        if(!map.has(perPP[i].pp_id)){
            map.set(perPP[i].pp_id, true);
            PP.push(perPP[i]);
        }
      }
      return PP;
    }

    async viewTssr(dataAPI){
      console.log("dataAPI", dataAPI);
      //Make from Data API format into View Format
      if(dataAPI !== undefined && dataAPI.length !== 0){
        let onlyItem = dataAPI.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
        let ItemUnique = this.getPPUniq(onlyItem);
        // let get_id_package = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
        // const arrayPPID = ItemUnique.map(e => e.id_pp_doc);
        const dataHeaderID = ItemUnique.map(e => e.id_pp_doc);
        const dataHeader = ItemUnique.map(e => e.package_name);
        // console.log("dataAPI", dataHeader);
        const dataGroupPP = ItemUnique.map(e => e.product_type);
        const dataIDPP = ItemUnique.map(e => e.pp_id);
        for(let i = 0; i < dataAPI.length; i++){
          let arrayItem = [];
          arrayItem = new Array(dataHeader.length+1).join('0').split('').map(parseFloat);
          for(let j = 0; j < dataAPI[i].list_of_site_items.length; j++){
            const indexItem = dataHeaderID.findIndex(d => d === dataAPI[i].list_of_site_items[j].id_pp_doc);
            arrayItem[indexItem] = this.checkValuetoZero(dataAPI[i].list_of_site_items[j].qty);
          }
          dataAPI[i]["list_qty_items"] = arrayItem;
        }
        const Header = {"type" : dataGroupPP, "name" : dataHeader, "IDPP" : dataIDPP};
        this.setState({ data_item : dataAPI, Package_Header : Header, progress_count : 0, progress_data : 0}, () => {
          this.dataViewPagination(dataAPI);
        });
      }else{
        this.setState({action_status : "failed", action_message : "There is error, please select other TSSR BOQ", progress_count : 0, progress_data : 0});
      }
    }

    // async viewTssr(dataAPI){
    //   console.log("dataAPI", dataAPI);
    //   //Make from Data API format into View Format
    //   if(dataAPI !== undefined && dataAPI.length !== 0){
    //     let onlyItem = dataTech.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    //     let ItemUnique = this.getPPUniq(onlyItem);
    //     // let get_id_package = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
    //     const arrayPPID = dataAPI[0].list_of_site_items.map(e => e.id_pp_doc);
    //     const dataHeaderID = dataAPI[0].list_of_site_items.map(e => e.id_pp_doc);
    //     const dataHeader = dataAPI[0].list_of_site_items.map(e => e.package_name);
    //     console.log("dataAPI", dataHeader);
    //     const dataGroupPP = dataAPI[0].list_of_site_items.map(e => e.product_type);
    //     const dataIDPP = dataAPI[0].list_of_site_items.map(e => e.pp_id);
    //     for(let i = 0; i < dataAPI.length; i++){
    //       let arrayItem = [];
    //       arrayItem = new Array(dataHeader.length).join('0').split('').map(parseFloat);
    //       for(let j = 0; j < dataAPI[i].list_of_site_items.length; j++){
    //         const indexItem = dataHeaderID.findIndex(d => d === dataAPI[i].list_of_site_items[j].id_pp_doc);
    //         arrayItem[indexItem] = this.checkValuetoZero(dataAPI[i].list_of_site_items[j].qty);
    //       }
    //       dataAPI[i]["list_qty_items"] = arrayItem;
    //     }
    //     const Header = {"type" : dataGroupPP, "name" : dataHeader, "IDPP" : dataIDPP};
    //     this.setState({ data_item : dataAPI, Package_Header : Header}, () => {
    //       this.dataViewPagination(dataAPI);
    //     });
    //   }else{
    //     this.setState({action_status : "failed", action_message : "There is error, please select other TSSR BOQ"});
    //   }
    // }

    SumPerPackageTechnicalXLS(XLS){
      const dataTech = XLS;
      let countData = {};
      for(let i= 4; i < dataTech[0].length; i++){
        const materialamount = dataTech.map( e => e[i] ).filter( (e,n) => n>1);
        countData[dataTech[1][i]] = materialamount.reduce((a,b) => a + b, 0);
      }
      return countData;
    }

    dataViewPagination(dataTechView){
      let perPage = this.state.perPage;
      let dataTechPage = [];
      if(perPage !== this.state.data_item.length){
        let pageNow = this.state.activePage-1;
        dataTechPage = dataTechView.slice(pageNow * perPage, (pageNow+1)*perPage);
      }else{
        dataTechPage = dataTechView;
      }
      this.setState({data_item_pagination : dataTechPage})
    }

    handlePageChange(pageNumber) {
      this.setState({activePage: pageNumber}, () => {
        this.dataViewPagination(this.state.data_item);
      });
    }

    handleChangeShow = (e) => {
      let show = e.target.value;
      this.setState({ perPage : show}, () => {
        this.dataViewPagination(this.state.data_item);
      });
    }

    numToSSColumn(num){
      var s = '', t;

      while (num > 0) {
        t = (num - 1) % 26;
        s = String.fromCharCode(65 + t) + s;
        num = (num - t)/26 | 0;
      }
      return s || undefined;
    }

    exportTSSR = async () => {
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const header = this.state.Package_Header;
      const tssrSite = this.state.data_item;
      const dataTSSR = this.state.tssr_API;
      const DatePrint = new Date(dataTSSR.created_on.toString());
      const DatePrintOnly = DatePrint.getFullYear()+'-'+(DatePrint.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrint.getDay().toString().padStart(2, '0');
      const DatePrintNow = new Date();
      const DatePrintOnlyNow = DatePrintNow.getFullYear()+'-'+(DatePrintNow.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrintNow.getDay().toString().padStart(2, '0');

      const prepared = ws.mergeCells('A4:C4');
      ws.getCell('A4').value = 'Downloaded by.';
      ws.getCell('A4').alignment  = { vertical: 'top', horizontal: 'left' };
      ws.getCell('A4').font  = { size: 8 };
      ws.getCell('A4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const preparedEmail = ws.mergeCells('A5:C5');
      ws.getCell('A5').value = localStorage.getItem("user_Email");
      ws.getCell('A5').alignment  = {horizontal: 'left' };
      ws.getCell('A5').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const DocumentNo = ws.mergeCells('D4:E4');
      ws.getCell('D4').value = 'Document No.';
      ws.getCell('D4').font  = { size: 8 };
      ws.getCell('D4').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('D4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const DocumentNum = ws.mergeCells('D5:E5');
      ws.getCell('D5').value = dataTSSR.no_tssr_boq;
      ws.getCell('D5').alignment  = {horizontal: 'left' };
      ws.getCell('D5').border = {left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const DateHead = ws.mergeCells('F4');
      ws.getCell('F4').value = 'Date.';
      ws.getCell('F4').font  = { size: 8 };
      ws.getCell('F4').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const DateVal = ws.mergeCells('F5');
      ws.getCell('F5').value = DatePrintOnlyNow;
      ws.getCell('F5').alignment  = {horizontal: 'left' };
      ws.getCell('F5').border = {left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const TSSRInfo = ws.mergeCells('A7:F7');
      ws.getCell('A7').value = 'TSSR BOQ';
      ws.getCell('A7').font  = { size: 14, bold : true };
      ws.getCell('A7').alignment  = {vertical: 'middle', horizontal: 'center' };
      ws.getCell('A7').border = {bottom: {style:'double'} };

      ws.addRow(["Project Identifier", ": "+dataTSSR.project_name, "", "", dataTSSR.id_boq_tech_doc !== null ? "Tech BOQ ref." : "", dataTSSR.id_boq_tech_doc !== null ? ": "+dataTSSR.no_boq_tech : ""]);
      const TSSRInfoSub = ws.mergeCells('B8:C8');

      ws.addRow([""]);

      const rowHeader1 = ["","",""].concat(header.type);
      const rowHeader2 = ["Project","Site ID","Site Name"].concat(header.name);
      ws.addRow(rowHeader1);
      let getlastrowHeader1 = ws.lastRow._number;
      for(let i = 4; i < rowHeader1.length+1; i++){
        ws.getCell(this.numToSSColumn(i)+getlastrowHeader1.toString()).fill = {
          type : 'pattern',
          pattern : 'solid',
          fgColor : {argb:'7F81C784'}
        }
      }
      ws.addRow(rowHeader2);
      let getlastrowHeader2 = ws.lastRow._number;
      for(let i = 1; i < rowHeader2.length+1; i++){
        ws.getCell(this.numToSSColumn(i)+getlastrowHeader2.toString()).fill = {
          type : 'pattern',
          pattern : 'solid',
          fgColor : {argb:'FF0ACD7D'}
        }
      }
      for(let i = 0; i < tssrSite.length ; i++){
        ws.addRow([ dataTSSR.project_name, tssrSite[i].site_id, tssrSite[i].site_name].concat(tssrSite[i].list_qty_items));
      }

      const techFormat = await wb.xlsx.writeBuffer()
      saveAs(new Blob([techFormat]), 'TSSR BOQ '+dataTSSR.no_tssr_boq+' Report.xlsx')
    }

    toggleLoading(){
      this.setState(prevState => ({
        modal_loading: !prevState.modal_loading
      }));
    }

    toggleDelete(e){
      let value = null;
      this.setState(prevState => ({
        modal_delete: !prevState.modal_delete
      }));
    }

    checkIsEqual(dataXLS){
      const dataTech = this.state.data_item
      const TechSiteID = dataTech.map(e => e.site_id);
      const TechPPID = dataTech[0].list_of_site_items.map(e => e.pp_id);
      console.log('data Package', TechPPID);
      const uploadSiteID = dataXLS.map( e => e[this.getIndex(dataXLS[1],'site_id')]).filter( (e,n) => n>1 && e !== null);
      const dataHeaderUpload = dataXLS[1].filter((e,n) => n>2);
      if(TechSiteID.equals(uploadSiteID) === true){
        console.log('data Package', 'Site Berhasil');
        if(TechPPID.equals(dataHeaderUpload) === true){
          console.log('data Package', 'berhasil');
        }else{
          this.setState({action_status : "failed", action_message : "PP ID for revision must equal with PP ID in saved TSSR BOQ \n since this TSSR BOQ already linked with commercial BOQ"});
        }
      }else{
        this.setState({action_status : "failed", action_message : "Site ID for revision must equal with Site ID in saved TSSR BOQ \n since this TSSR BOQ already linked with commercial BOQ"});
      }
    }

    approvedBoqTech(e){
      const statusValue = e.target.value;
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      console.log('jam tostring', DateNow.toString());
      const dataTech = this.state.tssr_API;
      let dataApprove = {
          "rev" : statusValue.toString()
      }
      if(statusValue.toString() == "A"){
        dataApprove["rev_by"] = localStorage.getItem('user_Email');
        dataApprove["rev_date"] = DateNow.toString();
      }
      this.patchDatatoAPI('/boq_tech_op/'+dataTech._id, dataApprove, dataTech._etag).then( revPatch => {
          if(revPatch !== undefined){
              if(revPatch.data !== undefined){
                  dataTech['rev'] = dataApprove.rev;
                  dataTech['rev_by'] = dataApprove.rev_by;
                  dataTech['rev_date'] = dataApprove.rev_date;
                  dataTech['_etag'] = revPatch.data._etag;
                  this.setState({action_status : 'succes', action_message : 'BOQ Technical '+dataTech.no_boq_tech+' has been approved', tssr_API : dataTech});
              }
          }
      })
  }

  handleChangeVersion(e){
    const value = e.target.value;
    this.setState({version_selected : value}, () => {
      if(value == this.state.version_now){
        this.getTSSRBoqAPI(this.props.match.params.id);
      }else{
        this.getBOQRevAPI(this.props.match.params.id);
      }
    });
  }

  getBOQRevAPI(_id_Tssr){
    let API_Tech = Object.assign({}, this.state.tssr_API);
    this.setState({tssr_API_prev : this.state.tssr_API});
    const version = this.state.version_selected;
    const where_id_Sites = '?where={"id_document" : "'+_id_Tssr+'", "version" : "'+version+'"}';
    let url = '/tssr_boq_matrix_rev'+where_id_Sites;
    this.getDatafromAPI(url).then(res => {
      if(res !== undefined){
        if(res.data._items[0].list_of_id_site !== undefined){
          this.setState({API_Tech : API_Tech});
          this.getSitesTSSRRevAPI(_id_Tssr, version);
        }
      }
    })
  }

  getSitesTSSRRevAPI(id_boq_tssr_doc, version){
    // const arraySites = '"'+id_Sites.join('", "')+'"';
    const where_id_Sites = 'where={"id_tssr_boq_doc" : "'+id_boq_tssr_doc+'" , "version" : "'+version+'"}';
    this.getDatafromAPI('/tssr_boq_matrix_sites_rev_all?'+where_id_Sites).then(res => {
        this.formatDataRev(res.data._items);
        this.viewTssr(res.data._items);
    })
  }

  formatDataRev(dataItems){
    let dataStoreRev = [];
    for(let i = 0; i < dataItems.length; i++){
      let dataStoreRevIndex = Object.assign({}, dataItems[i]);
      // dataStoreRevIndex["created_by"] = localStorage.getItem("user_ID");
      dataStoreRevIndex["updated_by"] = localStorage.getItem("user_ID");
      delete dataStoreRevIndex.id_document;
      delete dataStoreRevIndex._id;
      delete dataStoreRevIndex._etag;
      delete dataStoreRevIndex._links;
      delete dataStoreRevIndex.created_on;
      delete dataStoreRevIndex.updated_on;
      dataStoreRev.push(dataStoreRevIndex);
    }
    this.setState({data_format : dataStoreRev});
    // return dataStoreRev;
  }

  async deleteTSSR(){
    this.toggleDelete();
    this.toggleLoading();
    const dataSitesTSSR = this.state.API_TSSR_Sites;
    const delSucSites = [];
    const patchDelete = {"deleted" : 1};
    for(let i = 0; i < dataSitesTSSR.length; i++){
      let dataSiteTssr = dataSitesTSSR[i];
      let where = '?where={"id_tssr_boq_doc" : "'+dataSiteTssr.id_tssr_boq_doc+'", "id_site_doc" : "'+dataSiteTssr.id_site_doc+'" }';
      let getDelta = await this.getDatafromAPI('/delta_boq_tech_sites_op'+where);
      if(getDelta !== undefined){
        if(getDelta.data !== undefined){
        if(getDelta.data._items.length !== 0){
          let deltaIdx = getDelta.data._items[0];
          let delDelta = await this.patchDatatoAPI('/delta_boq_tech_sites_op/'+deltaIdx._id, patchDelete, deltaIdx._etag);
          if(delDelta !== undefined){
            if(delDelta.data !== undefined){
              let delSites = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+dataSiteTssr._id, patchDelete, dataSiteTssr._etag);
              if(delSites === undefined){delSites = {}; delSites["data"] = undefined}
              if(delSites.data !== undefined){
                delSucSites.push(delSites.data._id);
              }
            }
          }
        }else{
          let delSites = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+dataSiteTssr._id, patchDelete, dataSiteTssr._etag);
          if(delSites === undefined){delSites = {}; delSites["data"] = undefined}
          if(delSites.data !== undefined){
            delSucSites.push(delSites.data._id);
          }
        }
      }}
    }
    if(delSucSites.length === delSucSites.length){
      let delParent = await this.patchDatatoAPI('/tssr_boq_matrix_op/'+this.state.tssr_API._id, patchDelete, this.state.tssr_API._etag);
      if(delParent === undefined){delParent = {}; delParent["data"] = undefined}
      if(delParent.data !== undefined){
        this.setState({action_status : 'success', action_message : 'Your TSSR Has Been Deletesd'}, () => {
          setTimeout(function(){ this.setState({ redirectDeleted : delParent.data._id}); }.bind(this), 2000);
          this.toggleLoading();
        })
      }else{
        this.setState({action_status : 'failed'}, () => {
          this.toggleLoading();
        })
      }
    }else{
      if(this.state.tssr_API.list_of_id_site === undefined){
        let delParent = await this.patchDatatoAPI('/tssr_boq_matrix_op/'+this.state.tssr_API._id, patchDelete, this.state.tssr_API._etag);
        if(delParent === undefined){delParent = {}; delParent["data"] = undefined}
        if(delParent.data !== undefined){
          this.setState({action_status : 'success', action_message : 'Your TSSR Has Been Deletesd'}, () => {
            setTimeout(function(){ this.setState({ redirectDeleted : delParent.data._id}); }.bind(this), 2000);
            this.toggleLoading();
          })
        }else{
          this.setState({action_status : 'failed'}, () => {
            this.toggleLoading();
          })
        }
      }else{
        this.setState({action_status : 'failed'}, () => {
          this.toggleLoading();
        })
      }
    }
  }

  async saveProjectToDB(){
    this.toggleLoading();
    const successProgress = [];
    const dataParentTssr = this.state.tssr_API;
    const dataSitesTssr = this.state.API_TSSR_Sites;
    const project_id = this.state.project_select;
    const project_name = this.state.project_name_select;
    const project_data = {
      "id_project_doc" : project_id,
      "project_name" : project_name
    }
    for(let i = 0; i < dataSitesTssr.length; i++){
      const updateSites = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+dataSitesTssr[i]._id, project_data, dataSitesTssr[i]._etag );
      if(updateSites !== undefined){
        if(updateSites.data !== undefined){
          successProgress.push(updateSites.data._id);
        }
      }
    }
    if(successProgress.length === dataSitesTssr.length){
      const updateParent = await this.patchDatatoAPI('/tssr_boq_matrix_op/'+dataParentTssr._id, project_data, dataParentTssr._etag );
      if(updateParent !== undefined){
        if(updateParent.data !== undefined){
          successProgress.push(updateParent.data._id);
        }
      }
    }
    if(successProgress.length === dataSitesTssr.length+1){
      this.setState({ action_status : 'success', action_message : 'Project has been saved, please refresh your page' }, () => {
        this.toggleLoading();
      });
    }else{
      this.setState({ action_status : 'failed'}, () => {
        this.toggleLoading();
      });
    }
  }

    render() {
      if(this.state.redirectSign !== false){
        return (<Redirect to={'/Boq/Tssr/Detail/'+this.state.redirectSign} />);
      }

      if(this.state.redirectDeleted !== false){
        return (<Redirect to={'/Boq/Tssr/List'} />);
      }

      console.log('data BOQ Commercial', this.state.BOQ_Comm_Data);
      console.log('data BOQ Technical API', this.state.tssr_API);
      console.log('data BOQ Technical', this.state.data_item);
      console.log("Action Status", this.state.action_status);

      function AlertProcess(props){
        const alert = props.alertAct;
        let message = props.messageAct;
        if(message !== null){
          if(message.length === 0){message = null}
        }
        if(alert == 'failed'){
          return (
            <div className="alert alert-danger" role="alert">
              {message !== null ? message : 'Sorry, there was an error when we tried to save it, please reload your page and try again try again'}
            </div>
          )
        }else{
          if(alert == 'success'){
            return (
              <div className="alert alert-success" role="alert">
                {message}
                Your Action was Success, please Reload your page
              </div>
            )
          }else{
            return (
              <div></div>
            )

          }
        }
      }

      function PrintTSSR(props){
        const api_data = props.dataApi;
        const header_package = props.dataHeader;
        const dataTssr = props.Tssr_info;
        const name_project = props.Tssr_info.project_name;
        let arrayData = [];
        let row1 = [];
        if(api_data.length !== 0 && header_package.length !== 0 && header_package.type !== undefined){
          row1 = ["","",""].concat(header_package.type);
          const dataHeaderFormat = header_package.IDPP.map( (e,i) => e+" /// "+header_package.name[i])
          arrayData.push(["project","site_id","site_name"].concat(dataHeaderFormat));
          for(let i = 0; i < api_data.length ; i++){
            arrayData.push([ name_project, api_data[i].site_id, api_data[i].site_name].concat(api_data[i].list_qty_items));
          }
        }
        const multiDataSet = [
          {
            columns: row1,
            data: arrayData
          }
        ];
        const filename = "TSSR BOQ "+dataTssr.no_tssr_boq+" Format";
        return null;
      }

      function TableView(props){
        const api_data = props.dataApi;
        const xls_data = props.dataXLS;
        const header_package = props.dataHeader;
        const name_project = props.project_name;
        if(api_data.length !== 0){
          return (
            <div class='divtable'>
              <table hover bordered striped responsive size="sm" class='fixed'>
                <thead>
                  <tr style={{backgroundColor : "#c6f569", fontWeight : "500"}}>
                      <td class='fixleft1tssr fixedhead' rowSpan="2" style={{minWidth : '150px'}}>ID</td>
                      <td class='fixleft2tssr fixedhead' rowSpan="2" style={{minWidth : '150px'}}>Project</td>
                      <td class='fixleft3tssr fixedhead' rowSpan="2">Site ID</td>
                      <td class='fixleft4tssr fixedhead' rowSpan="2">Site Name</td>
                      {header_package.type.map( type =>
                        <td class='fixedhead2'>{type}</td>
                      )}
                  </tr>
                  <tr style={{backgroundColor: '#f8f6df'}}>
                    {header_package.name.map( name =>
                        <td class='fixed2tssr'>{name}</td>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {api_data.map((data,index) =>
                    <tr key={data.no_tssr_boq_site+index} class='fixbody'>
                      <td class="datareg fixleft1tssr"><a href={'#/Boq/Tssr/Site/'+data._id}>{data.no_tssr_boq_site}</a></td>
                      <td class="datareg fixleft2tssr">{name_project}</td>
                      <td class="datareg fixleft3tssr">{data.site_id}</td>
                      <td class="datareg fixleft4tssr">{data.site_name}</td>
                      {data.list_qty_items.map(qty =>
                        <td class="datareg">{qty}</td>
                      )}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        }else{
          if(xls_data.length !== 0){
            return (<React.Fragment>
              <div style={{marginLeft : '5px', fontSize : '10px', color : 'red'}}><span>Project will not be saved from uploader</span></div>
            <Table hover bordered responsive size="sm">
              <tbody>
              {xls_data.map(Tech =>
                <tr>
                  {Tech.map(qty =>
                    <td style={{verticalAlign : 'middle'}}>{qty}</td>
                  )}
                </tr>
              )}
              </tbody>
            </Table>
            </React.Fragment>)
          }else{
            if(props.paramsID !== undefined){
              return (<tbody>
                <tr colSpan="7" style={{textAlign : 'center'}}>
                  Please Wait, Loading Data...
                </tr>
              </tbody>)
            }else{
              return <tbody>
              <tr colSpan="7">Please Upload TSSR BOQ</tr>
            </tbody>
            }

          }
        }
      }

      return (
        <div>
          <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  {this.state.data_item.length === 0 && this.state.tssr_API.no_boq_tech === undefined && this.props.match.params.id == undefined ? (
                    <React.Fragment>
                      <span style={{marginTop:'8px', position:'absolute'}}>Upload TSSR BOQ</span>
                      <div className="card-header-actions" style={{display:'inline-flex'}}>
                      <Link to='/Boq/Tssr/Tech'>
                        <Button color="success"><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Create by BOQ Technical</Button>
                      </Link>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span style={{marginTop:'8px', position:'absolute'}}>Detail TSSR BOQ</span>
                      <div className="card-header-actions" style={{display:'inline-flex'}}>
                      <Col>
                        <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}}>
                          <DropdownToggle caret color="secondary">
                            <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download TSSR File
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header> TSSR File</DropdownItem>
                            <DropdownItem onClick={this.exportTSSR}> <i className="fa fa-file-text-o" aria-hidden="true"></i> TSSR Report</DropdownItem>
                            <PrintTSSR dataApi={this.state.data_item} dataHeader={this.state.Package_Header} Tssr_info={this.state.tssr_API}/>
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                      {this.state.userRole.includes('Flow-PublicInternal') !== true ? (
                        <div>
                          <Button block color="primary" onClick={this.toggleUpload} id="toggleCollapse1">
                              <i className="fa fa-pencil" aria-hidden="true"> </i> &nbsp;Edit
                          </Button>
                        </div>
                      ) : ("")}
                      </div>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <React.Fragment>
                  <div>
                    {this.state.data_item.length === 0 && this.state.tssr_API.no_tssr_boq === undefined && this.props.match.params.id == undefined ? (
                      <React.Fragment>
                        <input type="file" onChange={this.fileHandlerTechnical.bind(this)} style={{marginLeft : '5px', padding:"10px 10px 5px 10px", visiblity:"hidden"}} />
                        <Button className="btn-success" style={{'float' : 'right',margin : '8px'}} color="success" onClick={this.saveBOQTSSR} disabled={this.state.action_status === 'failed' || this.state.data_format.length == 0 || this.state.project_select === null}>
                          {this.state.rowsTssr.length == 0 ? 'Save' : this.state.data_format.length !== 0 ? 'Save' : 'Loading..'}
                        </Button>
                        <div style={{marginLeft : '15px', fontSize : '10px', color : 'red'}}><span>Please download TSSR format uploader in Material Menu or <Link to='/Material'>Click Here</Link></span></div>
                        <Col xs="12" md="6">
                            <Input style={{marginTop : '10px'}} name="project" type="select" onChange={this.handleChangeProject} value={this.state.project_select}>
                            <option value={null}></option>
                            {this.state.list_project.map( project =>
                                <option value={project._id}>{project.project_name}</option>
                            )}
                            </Input>
                            <FormText className="help-block">Please Select Project</FormText>
                        </Col>
                        <hr className="upload-line"></hr>
                      </React.Fragment>
                    ) : (<React.Fragment></React.Fragment>)}

                    {this.state.data_item.length !== 0 ? (
                      <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                        <CardBody style={{padding: '5px'}}>
                          <Row>
                            <Col>
                              <div>
                                  <Input type="file" onChange={this.fileHandlerTechnical.bind(this)} />
                              </div>
                            </Col>
                            <Col>
                              <div>
                                <React.Fragment>
                                  <Button style={{'float' : 'right'}} color="warning" onClick={this.overwriteDataSites} disabled={this.state.action_status === 'failed' || this.state.data_format.length === 0}>
                                    <i className="fa fa-paste">&nbsp;&nbsp;</i>
                                    {this.state.tssr_API.no_tssr_boq !== null && this.state.API_TSSR_Sites.length === 0 ? 'Loading..' : this.state.rowsTssr.length == 0 ? 'Edit' : this.state.data_format.length !== 0 ? 'Edit' : 'Loading..'}
                                  </Button>
                                  <Button style={{'float' : 'right', marginRight : '10px'}} color="success" onClick={this.revisionTssr} id="toggleCollapse1" disabled={this.state.action_status === 'failed' || this.state.data_format.length === 0}>
                                      <i className="fa fa-paste">&nbsp;&nbsp;</i>
                                      {this.state.tssr_API.no_tssr_boq !== null && this.state.API_TSSR_Sites.length === 0 ? 'Loading..' : this.state.rowsTssr.length == 0 ? 'Revision' : this.state.data_format.length !== 0 ? 'Revision' : 'Loading..'}
                                      {/* <i className="fa fa-pencil" aria-hidden="true"> </i> &nbsp;Revision */}
                                  </Button>
                                </React.Fragment>
                              </div>
                            </Col>
                          </Row>
                          {this.state.tssr_API.project_name === null && (
                            <Row style={{marginTop : '10px'}}>
                              <Col xs="12" md="6">
                                <Input style={{marginTop : '10px'}} name="project" type="select" onChange={this.handleChangeProject} value={this.state.project_select}>
                                <option value={null}></option>
                                {this.state.list_project.map( project =>
                                    <option value={project._id}>{project.project_name}</option>
                                )}
                                </Input>
                                <FormText className="help-block">Please Select Project</FormText>
                              </Col>
                              <Col>
                                <div>
                                  <React.Fragment>
                                    <Button style={{'float' : 'right', marginRight : '10px', marginTop : '10px'}} color="success" onClick={this.saveProjectToDB} id="toggleCollapse1" disabled={this.state.project_select === null}>
                                        <i className="fa fa-save">&nbsp;&nbsp;</i>
                                        save
                                        {/* <i className="fa fa-pencil" aria-hidden="true"> </i> &nbsp;Revision */}
                                    </Button>
                                  </React.Fragment>
                                </div>
                              </Col>
                            </Row>
                          )}
                          <hr className="upload-line"></hr>
                        </CardBody>
                      </Collapse>
                    ) : (<React.Fragment></React.Fragment>)}
                  </div>
                  </React.Fragment>
                  {/*  )} */}
                  {this.state.data_item.length !== 0 && (
                    <React.Fragment>
                    <Row>
                      <Col sm="12" md="12">
                      <table style={{width : '100%', marginBottom : '0px'}}>
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '23px'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>TSSR BOQ</td>
                          </tr>
                          <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : {this.state.tssr_API.no_tssr_boq}</td>
                          </tr>
                          <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500', fontSize : '10px'}}>Tech BOQ ref : {this.state.tssr_API.no_boq_tech !== null ? this.state.tssr_API.no_boq_tech + ' ; ' : '' + this.state.list_tech_tssr.map(e => e + ' ; ')}</td>
                          </tr>
                        </tbody>
                      </table>
                      <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" md="6">
                      <div>
                      <table style={{width : '100%', marginBottom : '20px'}} className="table-header">
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Project </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colSpan={2}>{this.state.tssr_API.project_name}</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Version </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colSpan={2}>
                              <Input type='select' style={{width:'80px'}} value={this.state.version_selected === null? this.state.version_now : this.state.version_selected} onChange={this.handleChangeVersion}>
                                {this.state.list_version.map( lv =>
                                  <option value={lv.version}>{lv.version}</option>
                                )}
                                <option value={this.state.version_now}>{this.state.version_now}</option>
                                {/* <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option> */}
                              </Input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      </Col>
                      <Col sm="6" md="6">
                      <div>
                      <table style={{width : '100%', marginBottom : '20px'}} className="table-header">
                        <tbody>
                        <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>{this.state.tssr_API.id_boq_tech_doc !== null ? "Technical BOQ" : ""}</td>
                            <td style={{textAlign : 'left'}}>{this.state.tssr_API.id_boq_tech_doc !== null ? ":" : ""}</td>
                            <td style={{textAlign : 'left'}} colSpan={2}>{this.state.tssr_API.id_boq_tech_doc !== null ? this.state.tssr_API.no_boq_tech : ""}</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      </Col>
                    </Row>
                    </React.Fragment>
                    )}
                    {this.state.data_item.length === 0 && this.state.tssr_API.no_tssr_boq === undefined && this.props.match.params.id == undefined ? (
                    <TableView dataApi={this.state.data_item} dataXLS={this.state.rowsTssr} dataHeader={this.state.Package_Header} project_name={this.state.tssr_API.project_name} paramsID={this.props.match.params.id}/>
                    ) : (<React.Fragment>
                      <div style={{display : 'inline-flex', marginBottom : '5px'}}>
                        <span style={{padding: '4px', minWidth : '125px'}}>Show per Page : </span>
                        <Input className="select-per-page" name="PO" type="select" onChange={this.handleChangeShow} value={this.state.perPage} >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value={this.state.data_item.length}>All</option>
                        </Input>
                      </div>
                      <TableView dataApi={this.state.data_item_pagination} dataXLS={this.state.rowsTssr} dataHeader={this.state.Package_Header} project_name={this.state.tssr_API.project_name} paramsID={this.props.match.params.id}/>
                      {this.props.match.params.id !== undefined && this.state.data_item_pagination.length === 0 && (
                        <table>
                          <tbody>
                            <tr>
                              <td style={{textAlign : 'center'}}>
                                {this.state.progress_count + '%'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                      <nav>
                        <div>
                          <Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.perPage}
                              totalItemsCount={this.state.data_item.length}
                              pageRangeDisplayed={5}
                              onChange={this.handlePageChange}
                              itemClass="page-item"
                              linkClass="page-link"
                          />
                        </div>
                      </nav>
                      </React.Fragment>
                    )}
                    </CardBody>
                  <CardFooter>
                    {this.state.data_item.length !== 0 ? (
                      <Button color="danger" onClick={this.toggleDelete}>Delete</Button>
                    ) : this.state.tssr_API !== null ? (
                      this.state.tssr_API.list_of_id_site === undefined && (<Button color="danger" onClick={this.toggleDelete}>Delete</Button>)
                    ) : ""}
                  </CardFooter>
              </Card>
            </Col>
          </Row>

          {/* Modal Delete */}
          <Modal isOpen={this.state.modal_delete} toggle={this.toggleDelete} className={'modal-sm ' + this.props.className}>
            <ModalBody>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '15px'}}>Are You Sure wanna Delete </span>
              </div>
              <div style={{textAlign : 'center'}}>
                {this.state.tssr_API.no_tssr_boq}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.deleteTSSR}>Delete</Button>
              <Button color="secondary" onClick={this.toggleDelete}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Delete */}

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
              <div style={{textAlign : 'center'}}>
                {this.state.progress_count} / {this.state.progress_data}
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
      dataLogin : state.loginData,
      SidebarMinimize : state.minimizeSidebar
    }
  }

  export default connect(mapStateToProps)(UploadTSSRMatrix);
