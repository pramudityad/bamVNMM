import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {ExcelRenderer} from 'react-excel-renderer';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as XLSX from 'xlsx';

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

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};

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

class BulkMR extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        rowsXLS : [],
        list_data_activity : [],
        data : [],
        cols : [],
        project_name_selected : null,
        cd_id_selected : null,
        dataTssrUpload : [],
        waiting_status : null,
        action_status : null,
        action_message : null,
        redirectSign : false,
    };
    this.exportFormatBulkMR = this.exportFormatBulkMR.bind(this);
    this.saveDataMRBulk = this.saveDataMRBulk.bind(this);
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
        console.log("respond Patch data", err);
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
			this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        this.ArrayEmptytoNull(data);
      });
		};
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[0].length; j++){
        if(typeof dataXLS[i][j] === "object"){
          col.push(this.checkValue(JSON.stringify(dataXLS[i][j])));
        }else{
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS,
      action_status : null,
    });
    this.checkingDataMR(newDataXLS);
    // this.formatDataTSSR(newDataXLS);
  }

  async checkingDataMR(dataXLS){
    this.setState({waiting_status : true});
    let action_message = "";
    let errorData = [];
    let activity_error = [];
    let action_status = null;
    const staticHeader = ["id", "mr_project", "mr_type", "mr_delivery_type", "origin_warehouse", "etd", "eta", "eta_time", "mot_actual", "mr_dsp", "mr_asp", "pic_on_site", "ps_revision_type", "mr_comment_project", "sent_mr_request", "mr_activity_id", "mr_assignment"];
    const staticHeaderXLS = dataXLS[0];
    if(staticHeaderXLS.equals(staticHeader) !== true){
      action_status = "failed";
      this.setState({action_status : "failed", action_message : action_message + "Please check your format uploader"});
    }
    if(action_status !== "failed"){
      const array_mr_type = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'mr_type')]) ).filter( (e,n) => n>0);
      const array_mr_del_type = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'mr_delivery_type')]) ).filter( (e,n) => n>0);
      const array_mr_dsp = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'mr_dsp')]) ).filter( (e,n) => n>0);
      const array_mr_activity_id = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'mr_activity_id')]) ).filter( (e,n) => n>0);
      let array_mar_act_id_uniq = [...new Set(array_mr_activity_id)];
      if(array_mr_type.some( e => e > 2)){
        errorData.push("MR Type");
      }
      if(array_mr_del_type.some( e => e > 3)){
        errorData.push("MR Delivery Type");
      }
      if(array_mr_activity_id.some( e => e === null)){
        errorData.push("Activity ID");
      }
      if(errorData.length !== 0){
        action_status = "failed";
        action_message = "Please Check "+errorData.join(", ");
      }
      const getActivityID = await this.getAllActivityID(array_mar_act_id_uniq);
      if(getActivityID.length !== 0){
        const dataActivity = getActivityID;
        const id_activity = dataActivity.map(e => e.WP_ID);
        const act_none = array_mar_act_id_uniq.filter(this.comparerDiffbyValue(id_activity));
        this.setState({list_data_activity : dataActivity});
        if(act_none.length !== 0){
          const twoSentence = action_message.length !== 0 ? " and " : "";
          action_message = action_message+twoSentence+" Activity ID : "+act_none.join(", ")+" is undefined";
          action_status = "failed";
        }
      }else{
        action_message = null;
        action_status = "failed";
      }
      if(action_status === "failed"){
        if(action_message.length )
        this.setState({action_status : "failed", action_message : action_message});
      }
    }
    this.setState({waiting_status : false});
  }

  async getAllActivityID(array_activity_id){
    let dataAct = [];
    let arrayDataAct = array_activity_id;
    let getNumberPage = Math.ceil(arrayDataAct.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPP = arrayDataAct.slice(i * 25, (i+1)*25);
      let arrayIdAct = '"'+DataPaginationPP.join('","')+'"';
      arrayIdAct = arrayIdAct.replace("%BF", "");
      arrayIdAct = arrayIdAct.replace("%BB", "");
      arrayIdAct = arrayIdAct.replace("%EF", "");
      let where_id_Act = '?where={"WP_ID" : {"$in" : ['+arrayIdAct+']}}';
      let resAct = await this.getDatafromAPITSEL('/custdel_sorted_non_page'+where_id_Act);
      if(resAct !== undefined){
        if(resAct.data !== undefined){
          dataAct = dataAct.concat(resAct.data._items);
        }
      }
    }
    return dataAct;
  }

  async getDataProject(array_id_project){
    let dataProject = [];
    let arrayDataProject = array_id_project;
    let getNumberPage = Math.ceil(arrayDataProject.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPP = arrayDataProject.slice(i * 25, (i+1)*25);
      let arrayIdProject = '"'+DataPaginationPP.join('","')+'"';
      arrayIdProject = arrayIdProject.replace("%EF", "%BB", "%BF");
      let where_id_Project = '?where={"_id" : {"$in" : ['+arrayIdProject+']}}';
      let resProject = await this.getDatafromAPITSEL('/project_sorted_non_page'+where_id_Project);
      if(resProject !== undefined){
        if(resProject.data !== undefined){
          dataProject = dataProject.concat(resProject.data._items);
        }
      }
    }
    return dataProject;
  }

  async getAllDataApiPaginationMR(array_value, field, endpoint){
    let dataValue = [];
    let arrayDataValue = array_value;
    let getNumberPage = Math.ceil(arrayDataValue.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationValue = arrayDataValue.slice(i * 25, (i+1)*25);
      let arrayIdValue = '"'+DataPaginationValue.join('","')+'"';
      arrayIdValue = arrayIdValue.replace("%BF", "");
      arrayIdValue = arrayIdValue.replace("%BB", "");
      arrayIdValue = arrayIdValue.replace("%EF", "");
      let where_id_value = '?where={"mr_id" : {"$in" : ['+arrayIdValue+']}}&projection={"_etag" : 1, "eta" : 1, "requested_eta" : 1, "dsp_company" : 1, "mr_status" : 1, "mr_milestones" : 1, "mr_id" : 1}';
      let resValue = await this.getDatafromAPIBAM('/mr_sorted_nonpage'+where_id_value);
      if(resValue !== undefined){
        if(resValue.data !== undefined){
          dataValue = dataValue.concat(resValue.data._items);
        }
      }
    }
    return dataValue;
  }

  preparingDataMR(id){
    const dateNow = new Date();
    const dataRandom = ((Math.floor(Math.random() * 100)+id.toString())).padStart(4, '0');
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString().padStart(2, '0')+dateNow.getDate().toString().padStart(2, '0')+dataRandom.toString();
    return numberTSSR;
  }

  checkDSPbyID(id){
    switch(id.toString()) {
      case "BMS":
        return "PT BMS Delivery";
        break;
      case "MITT":
        return "PT MITT Delivery";
        break;
      case "IXT":
        return "PT IXT Delivery";
        break;
      case "ARA":
        return "PT ARA Delivery";
        break;
      default:
        return id.toString();
    }
  }

  checkDeliveryTypebyID(id){
    switch(id.toString()) {
      case "WTS":
        return "Warehouse to Site";
        break;
      case "STS":
        return "Site to Site";
        break;
      case "WTW":
        return "Warehouse to Warehouse";
        break;
      default:
        return null
    }
  }

  checkMRTypebyID(id){
    switch(id.toString()) {
      case "New":
        return "New";
        break;
      case "Upgrade":
        return "Upgrade";
        break;
      default:
        return null
    }
  }

  async saveDataMRBulk(){
    const dataXLS = this.state.rowsXLS;
    const dataActivity = this.state.list_data_activity;
    const data_idProjectUniq = [...new Set(dataActivity.map(({ CD_Info_Project }) => CD_Info_Project))];
    const array_mr_id = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'id')]) ).filter( (e,n) => n>0);
    let array_mr_id_uniq = [...new Set(array_mr_id)];
    array_mr_id_uniq = array_mr_id_uniq.filter(e => e !== null);
    const getProject = await this.getDataProject(data_idProjectUniq);
    const getMRID = await this.getAllDataApiPaginationMR(array_mr_id_uniq);
    let dataBulkMR = [];
    let dataBulkMRSuc = [];
    let dataPatchMRSuc = [];
    let dataPatchMRError = [];
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    for(let i = 1; i < dataXLS.length; i++){
      const id_delivery_type = dataXLS[i][this.getIndex(dataXLS[0],'mr_delivery_type')];
      const id_mr_type = dataXLS[i][this.getIndex(dataXLS[0],'mr_type')];
      const id_dsp = dataXLS[i][this.getIndex(dataXLS[0],'mr_dsp')];
      let id_etd = dataXLS[i][this.getIndex(dataXLS[0],'etd')];
      let id_eta = dataXLS[i][this.getIndex(dataXLS[0],'eta')];
      id_etd = id_etd.replace(/'/g, "").replace(/"/g, "").split("T")[0];
      id_eta = id_eta.replace(/'/g, "").replace(/"/g, "").split("T")[0];
      const id_upload = dataXLS[i][this.getIndex(dataXLS[0],'id')];
      const find_mr_id = getMRID.find(e => e.mr_id === id_upload);
      if(find_mr_id !== undefined){
        let patchData = {};
        patchData["eta"] = id_eta+" 23:59:59";
        patchData["requested_eta"] = id_eta+" 23:59:59";
        patchData["etd"] = id_etd+" 00:00:00";
        patchData["dsp_company"] = this.checkDSPbyID(id_dsp);
        const respondPatchMR = await this.patchDatatoAPIBAM('/mr_op/'+find_mr_id._id, patchData, find_mr_id._etag);
        if(respondPatchMR.data !== undefined && respondPatchMR.status >= 200 && respondPatchMR.status <= 300 ){
          dataPatchMRSuc.push(respondPatchMR.data._id);
        }else{
          dataPatchMRError.push(id_upload);
        }
      }else{
        const activity_id = dataXLS[i][this.getIndex(dataXLS[0],'mr_activity_id')];
        const dataCD = dataActivity.find(e => e.WP_ID === activity_id.toString());
        const dataProject = getProject.find(e => e._id === dataCD.CD_Info_Project );
        let numberingMR = this.preparingDataMR(i);
        let list_site = [];
        if(dataCD.Site_Info_SiteID_NE !== ""){
          let site_ne = {
              "id_site_doc": "",
              "site_id": dataCD.Site_Info_SiteID_NE,
              "site_title": "NE",
              "site_name" : dataCD.Site_Info_SiteName_NE,
              "site_address" : dataCD.Site_Info_Address_NE,
              "site_longitude" : parseFloat(dataCD.Site_Info_Longitude_NE),
              "site_latitude" : parseFloat(dataCD.Site_Info_Latitude_NE),
              "id_tssr_boq_site_doc" : null,
              "no_tssr_boq_site" : null,
              "tssr_version" : null
          }
          list_site.push(site_ne);
        }
        if(dataCD.Site_Info_SiteID_FE !== ""){
          let site_fe = {
              "id_site_doc": "",
              "site_id": dataCD.Site_Info_SiteID_FE,
              "site_title": "FE",
              "site_name" : dataCD.Site_Info_SiteName_FE,
              "site_address" : dataCD.Site_Info_Address_FE,
              "site_longitude" : parseFloat(dataCD.Site_Info_Longitude_FE),
              "site_latitude" : parseFloat(dataCD.Site_Info_Latitude_FE),
              "id_tssr_boq_site_doc" : null,
              "no_tssr_boq_site" : null,
              "tssr_version" : null
          }
          list_site.push(site_fe);
        }
        const mr_data = {
        	"mr_id" : "MR"+numberingMR.toString(),
          "implementation_id" : "IMP"+numberingMR.toString(),
          "scopes" : "",
          "mr_delivery_type" : this.checkDeliveryTypebyID(id_delivery_type),
          "mr_type" : this.checkMRTypebyID(id_mr_type),
          "id_tssr_doc" : null,
          "tssr_id" : null,
          "account_id" : "1",
          "id_project_doc" : dataProject._id,
          "project_name" : dataProject.Project,
          "id_cd_doc" : this.state.cd_id_selected,
          "cd_id" : dataCD.WP_ID.toString(),
          "sow_type" : dataCD.CD_Info_SOW_Type,
          "dsp_company" : this.checkDSPbyID(id_dsp),
          "etd" : id_etd+" 00:00:00",
          "requested_eta" : id_eta+" 23:59:59",
          "eta" : id_eta+" 23:59:00",
          "site_info" : list_site,
          "mr_milestones" : [],
          "mr_status" : [
            {
                "mr_status_name": "IMPLEMENTED",
                "mr_status_value": "IMPLEMENTED",
                "mr_status_date": dateNow,
                "mr_status_updater": this.state.userEmail,
                "mr_status_updater_id": this.state.userId
            },
            {
              "mr_status_name": "PLANTSPEC",
              "mr_status_value": "NOT ASSIGNED",
              "mr_status_date": dateNow,
              "mr_status_updater": this.state.userEmail,
              "mr_status_updater_id": this.state.userId,
            }
          ],
          "current_mr_status" : "PLANTSPEC NOT ASSIGNED",
          "current_milestones" : "",
          "deleted" : 0,
          "created_by" : this.state.userId,
          "updated_by" : this.state.userId
        }
        dataBulkMR.push(mr_data);
      }
    }
    const respondSaveMR = await this.postDatatoAPIBAM('/mr_op', dataBulkMR);
    if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ){
      if(dataBulkMR.length > 1){
        dataBulkMRSuc = dataBulkMRSuc.concat(respondSaveMR.data._items.map(e => e._id))
      }else{
        dataBulkMRSuc.push(respondSaveMR.data._id)
      }
    }
    if((dataXLS.length-1) === (dataBulkMRSuc.length + dataPatchMRSuc.length)){
      this.setState({ action_status : 'success', action_message : 'Created New : '+dataBulkMRSuc.length+' data, Update Data : '+dataPatchMRSuc.length+' data'}, () => {
        setTimeout(function(){ this.setState({ redirectSign : true}); }.bind(this), 3000);
      });
    }else{
      this.setState({ action_status : 'failed' });
    }
  }

  // getDataSites(){
  //   const respondSite = this.getDataFromAPI('/site_non_page?where')
  // }

  async getAllPP(array_PP, array_PP_sepcial){
    let dataPP = [];
    let arrayDataPP = array_PP;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
      let arrayIdPP = '"'+DataPaginationPP.join('", "')+'"';
      arrayIdPP = arrayIdPP.replace("&", "%26");
      let where_id_PP = '?where={"pp_id" : {"$in" : ['+arrayIdPP+']}}';
      let resPP = await this.getDatafromAPIBMS('/pp_sorted_non_page'+where_id_PP);
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
      let resPP = await this.getDatafromAPIBMS('/pp_sorted_non_page'+where_id_PP);
      if(resPP !== undefined){
        if(resPP.data !== undefined){
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    return dataPP;
  }

  exportFormatBulkMR = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["id", "mr_project", "mr_type", "mr_delivery_type", "origin_warehouse", "etd", "eta", "eta_time", "mot_actual", "mr_dsp", "mr_asp", "pic_on_site", "ps_revision_type", "mr_comment_project", "sent_mr_request", "mr_activity_id", "mr_assignment"]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'MR Uploader Template.xlsx');
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/mr-list'} />);
    }
    console.log("Excel Render", this.state.rowsXLS);
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '15px'}} >MR Creation Bulk </span>
            <Button style={{marginRight : '8px', float : 'right'}} outline color="info" onClick={this.exportFormatBulkMR} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download MR Format</Button>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
            <Button color="success" onClick={this.saveDataMRBulk} style={{float : 'right'}} disabled={this.state.rowsXLS.length === 0 || this.state.waiting_status === true || this.state.action_status === "failed" }>
              {this.state.rowsXLS.length === 0? "Save" : this.state.waiting_status === true ? "Loading..." : "Save"}
            </Button>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>MRs Preview</td>
                </tr>
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            {this.state.rowsXLS.length !== 0 ? (
              <Table hover bordered responsive size="sm">
                <tbody>
                {this.state.rowsXLS.length !== 0 ? (
                  this.state.rowsXLS.map( row =>
                    <tr>
                      {row.map( col =>
                        <td>{col}</td>
                      )}
                    </tr>
                  )
                ) : ""}
                </tbody>
              </Table>
            ) : (
              <div>
              <Row>
                <Col sm="6" lg="6">
                  <Table hover bordered responsive size="sm">
                    <thead>
                      <tr style={{backgroundColor : "rgb(11, 72, 107)", color: "white"}}>
                        <td colSpan="2">MR Type</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <th>Type Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>New</td>
                        <td>New</td>
                      </tr>
                      <tr>
                        <td>Upgrade</td>
                        <td>Upgrade</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col sm="6" lg="6">
                  <Table hover bordered responsive size="sm">
                    <thead>
                      <tr style={{backgroundColor : "rgb(11, 72, 107)", color: "white"}}>
                        <td colSpan="2">Delivery Type</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <th>Delivery Type Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>WTS</td>
                        <td>Warehouse to Site</td>
                      </tr>
                      <tr>
                        <td>STS</td>
                        <td>Site to Site</td>
                      </tr>
                      <tr>
                        <td>WTW</td>
                        <td>Warehouse to Warehouse</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col sm="6" lg="6">
                  <Table hover bordered responsive size="sm">
                    <thead>
                      <tr style={{backgroundColor : "rgb(11, 72, 107)", color: "white"}}>
                        <td colSpan="2">Delivery Company</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <th>Type Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>BMS</td>
                        <td>PT BMS Delivery</td>
                      </tr>
                      <tr>
                        <td>MITT</td>
                        <td>PT MITT Delivery</td>
                      </tr>
                      <tr>
                        <td>IXT</td>
                        <td>PT IXT Delivery</td>
                      </tr>
                      <tr>
                        <td>ARA</td>
                        <td>PT ARA Delivery</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              </div>
            )}
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

export default connect(mapStateToProps)(BulkMR);
