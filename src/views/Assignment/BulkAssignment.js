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

class BulkAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        assignment_ssow_upload : [],
        list_data_activity : [],
        sow_type_selected : null,
        rowsXLS : [],
        waiting_status : null,
        action_status : null,
        action_message : null,
        redirectSign : false,
    };
    this.saveDataAssignmentBulk = this.saveDataAssignmentBulk.bind(this);
    this.exportFormatBulkAssignment = this.exportFormatBulkAssignment.bind(this);
    this.handleChangeSOWType = this.handleChangeSOWType.bind(this);
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

    async postDatatoAPITSEL(url, data){
      try {
        let respond = await axios.post(API_URL_PDB_TSEL +url, data, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: usernameTselApi,
            password: passwordTselApi
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
      return props.toString();
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

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[0].length; j++){
        col.push(this.checkValue(dataXLS[i][j]));
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
    this.formatDataASP(newDataXLS);
  }

  formatDataASP = async(dataXLS) => {
    let action_message = [];
    let action_status = null;
    let actionStatus = null;
    let actionMessage = "";
    //Make Date
    const date = new Date();
    const dateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    //Check Format Static
    const staticHeader = ["id", "project", "sow_type", "vendor_code", "vendor_name"];
    const staticHeaderXLS = dataXLS[0].filter((e,n) => n < 5);
    if(staticHeaderXLS.equals(staticHeader) !== true){
      action_status = "failed";
      this.setState({action_status : "failed", action_message : action_message + "Please check your format uploader"});
    }
    if(action_status !== "failed"){
      // check can't null
      let errorRequired = [];
      const array_sow_type = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'sow_type')]) ).filter( (e,n) => n>0);
      const array_vendor_code = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'vendor_code')]) ).filter( (e,n) => n>0);
      const array_activity_id = dataXLS.map( e => this.checkValue(e[this.getIndex(dataXLS[0],'activity_id')]) ).filter( (e,n) => n>0);
      if(array_sow_type.some( e => e === null)){
        errorRequired.push("SOW Type");
      }
      if(array_vendor_code.some( e => e === null)){
        errorRequired.push("Vendor Code");
      }
      if(array_activity_id.some( e => e === null)){
        errorRequired.push("Activity ID");
      }
      // Get Activity ID from API;
      let array_act_id_uniq = [...new Set(array_activity_id)];
      // const getActivityID = await this.getAllActivityID(array_act_id_uniq);
      const getActivityID = await this.getAllDataApiPaginationTSEL(array_act_id_uniq, 'WP_ID', '/custdel_sorted_non_page');
      if(getActivityID.length !== 0){
        this.setState({list_data_activity : getActivityID});
      }
      //Make Data (SSOW) to format
      let err_ssow_id = [];
      let err_ssow_no = [];
      let err_ssow_row = [];
      let err_ssow_act_no = [];
      let dataAssignment = [];
      for(let i = 1 ; i < dataXLS.length; i++){
        const sow_type = this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'sow_type')]);
        let ssow_data = [];
        let len_ssow = 7;
        if(sow_type.toLowerCase() === "sacme"){
          len_ssow = 25;
        }
        for(let j = 1; j <= len_ssow; j++ ){
          const data_ssow = {
            "ssow_id" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'ssow_'+sow_type.toLowerCase()+'_id_'+j.toString())]),
            "ssow_activity_number" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'ssow_'+sow_type.toLowerCase()+'_activity_number_'+j.toString())]),
            "sow_type" : sow_type,
            "ssow_description" : "tes",
            "ssow_unit" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'ssow_'+sow_type.toLowerCase()+'_unit_'+j.toString())]),
            "ssow_qty" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'ssow_'+sow_type.toLowerCase()+'_quantity_'+j.toString())]),
            "ssow_status" : [
              {
                "status" : "Open",
                "status_update_date" : dateNow,
                "status_updater" : this.state.userEmail,
                "status_updater" : this.state.userId,
              }
            ]
          }
          if(data_ssow.ssow_id !== null){
            data_ssow["ssow_id"] = data_ssow.ssow_id.toString();
          }
          if(data_ssow.ssow_activity_number !== null){
            data_ssow["ssow_activity_number"] = data_ssow.ssow_activity_number.toString();
          }
          // 5010
          if(data_ssow.ssow_id !== null && data_ssow.ssow_activity_number !== null){
            ssow_data.push(data_ssow);
          }
          //Check not null of SSOW ID and SSOW Activity Number
          if((data_ssow.ssow_id === null && data_ssow.ssow_activity_number !== null) || (data_ssow.ssow_id !== null && data_ssow.ssow_activity_number === null) ){
            err_ssow_row.push(i);
            err_ssow_no.push(j.toString() + " in Row "+i.toString());
          }
        }
        let current_status = [
          {
            "status_name": "ASP_ASSIGNMENT",
            "status_value": "CREATED",
            "status_date": dateNow,
            "status_updater": this.state.userId,
            "status_updater_id": this.state.userId,
            "status_note": ""
          }
        ];
        const dataAssginment = {
          "CD_ID": this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'activity_id')]).toString(),
          "SH_ID": this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'activity_id')]).toString(),
          "Vendor_Code_Number": this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'vendor_code')]),
          "SOW_Type": this.checkValue(dataXLS[i][this.getIndex(dataXLS[0],'sow_type')]),
          "SSOW_List" : ssow_data,
          "ASP_Assignment_Status" : current_status,
          "Current_Status" : "ASP ASSIGNMENT CREATED",
          "Assignment_Creation_Date" : dateNow,
          "created_by" : this.state.userId,
          "updated_by" : this.state.userId
        }
        if(dataAssginment.Vendor_Code_Number !== null){
          dataAssginment["Vendor_Code_Number"] = dataAssginment.Vendor_Code_Number.toString();
        }
        dataAssignment.push(dataAssginment);
      }
      if(errorRequired.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = errorRequired.join(", ")+" Cannot Null"+twoSentence+actionMessage;
      }
      if(err_ssow_row.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = actionMessage+twoSentence+"SSOW ID or Activity Number Can't null, Please Check SSOW Number : "+err_ssow_no.join(", ");
      }
      if(actionStatus === 'failed'){
        this.setState({ action_status : 'failed', action_message : actionMessage});
      }else{
        this.setState({assignment_ssow_upload : dataAssignment});
      }
    }
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

  async getAllDataApiPaginationTSEL(array_value, field, endpoint){
    let dataValue = [];
    let arrayDataValue = array_value;
    let getNumberPage = Math.ceil(arrayDataValue.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationValue = arrayDataValue.slice(i * 25, (i+1)*25);
      let arrayIdValue = '"'+DataPaginationValue.join('","')+'"';
      arrayIdValue = arrayIdValue.replace("%BF", "");
      arrayIdValue = arrayIdValue.replace("%BB", "");
      arrayIdValue = arrayIdValue.replace("%EF", "");
      let where_id_value = '?where={"'+field+'" : {"$in" : ['+arrayIdValue+']}}';
      let resValue = await this.getDatafromAPITSEL(endpoint+where_id_value);
      if(resValue !== undefined){
        if(resValue.data !== undefined){
          dataValue = dataValue.concat(resValue.data._items);
        }
      }
    }
    return dataValue;
  }

  preparingDataAssignment(id){
    const dateNow = new Date();
    const dataRandom = ((Math.floor(Math.random() * 100)+id).toString()).padStart(4, '0');
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString().padStart(2, '0')+dateNow.getDate().toString().padStart(2, '0')+dataRandom.toString();
    return numberTSSR;
  }

  async saveDataAssignmentBulk(){
    let bulkAssignment = [];
    let errVendor = [];
    let errActId = [];
    let errSSOW = [];
    let errActNo = [];
    let errProject = [];
    let actionStatus = null;
    let actionMessage = "";
    const uploadSSOW = this.state.assignment_ssow_upload;
    const dataActivity = this.state.list_data_activity;
    const getAllSSOW = uploadSSOW.map(value => value.SSOW_List.map(child => child)).reduce((l, n) => l.concat(n), []);
    const getUniqProject = [...new Set(dataActivity.map(({ CD_Info_Project }) => CD_Info_Project))];
    const getUniqSSOWId = [...new Set(getAllSSOW.map(({ ssow_id }) => ssow_id))]; //get all ssow id from uploader (unique)
    const getUniqActNo = [...new Set(getAllSSOW.map(({ ssow_activity_number }) => ssow_activity_number))]; //get all activity number from uploader (unique)
    const getUniqVendorCode = [...new Set(uploadSSOW.map(({ Vendor_Code_Number }) => Vendor_Code_Number))];
    const dataVendorAPI = await this.getAllDataApiPaginationTSEL(getUniqVendorCode, 'Vendor_Code', '/vendor_data_non_page');
    const dataSSOWAPI = await this.getAllDataApiPaginationTSEL(getUniqSSOWId, 'ssow_id', '/ssow_sorted_nonpage');
    const dataSSOWActNoAPI = await this.getAllDataApiPaginationTSEL(getUniqActNo, 'activity_number', '/ssow_activity_number_sorted_nonpage');
    const dataProjectAPI = await this.getAllDataApiPaginationTSEL(getUniqProject, '_id', '/project_sorted_non_page');
    if(dataVendorAPI.length !== undefined && dataSSOWAPI.length !== undefined && dataSSOWActNoAPI.length !== undefined && dataProjectAPI.length !== undefined ){
      for(let i = 0; i < uploadSSOW.length; i++){
        let assignmentData = Object.assign(uploadSSOW[i], {});
        const getVendor = dataVendorAPI.find(e => e.Vendor_Code === assignmentData.Vendor_Code_Number);
        const getActId = dataActivity.find(e => e.WP_ID === assignmentData.CD_ID);
        if(getVendor !== undefined && getActId !== undefined){
          const getProject = dataProjectAPI.find(e => e._id === getActId.CD_Info_Project);
          if(getProject !== undefined){
            assignmentData["Assignment_No"] = "ASG"+this.preparingDataAssignment(i);
            assignmentData["Account_Name"] = "TSEL";
            assignmentData["Project"] = getProject.Project;
            assignmentData["Plant"] = "";
            assignmentData["NW"] = getActId.CD_Info_Network_Number;
            assignmentData["NW_Activity"] = getActId.CD_Info_Activity_Code;
            assignmentData["Requisitioner"] = "";
            assignmentData["SOW_Type"] = getActId.CD_Info_SOW_Type;
            assignmentData["Site_ID"] = getActId.Site_Info_SiteID_NE;
            assignmentData["Site_Name"] = getActId.Site_Info_SiteName_NE;
            assignmentData["Site_Longitude"] = getActId.Site_Info_Longitude_NE.length === 0 ? 0.0 : parseFloat(getActId.Site_Info_Longitude_NE);
            assignmentData["Site_Latitude"] = getActId.Site_Info_Latitude_NE.length === 0 ? 0.0 : parseFloat(getActId.Site_Info_Latitude_NE);
            assignmentData["Site_FE_ID"] = getActId.Site_Info_SiteID_FE;
            assignmentData["Site_FE_Name"] = getActId.Site_Info_SiteName_FE;
            assignmentData["Site_FE_Longitude"] = getActId.Site_Info_Longitude_FE.length === 0 ? 0.0 : parseFloat(getActId.Site_Info_Longitude_FE);
            assignmentData["Site_FE_Latitude"] = getActId.Site_Info_Latitude_FE.length === 0 ? 0.0 : parseFloat(getActId.Site_Info_Latitude_FE);
            assignmentData["Vendor_Code"] = getVendor._id;
            assignmentData["Vendor_Code_Number"] = getVendor.Vendor_Code;
            assignmentData["Vendor_Name"] = getVendor.Name;
            assignmentData["Vendor_Email"] = getVendor.Email;
            assignmentData["Payment_Terms"] = null;
            assignmentData["Requestor"] = this.state.userEmail;
            assignmentData["Payment_Term_Ratio"] = null;
            let list_ssow = [];
            let total_val_asg = 0;
            for(let j = 0; j < assignmentData.SSOW_List.length; j++ ){
              let ssowData = Object.assign(assignmentData.SSOW_List[j], {});
              const getSSOW = dataSSOWAPI.find(e => e.ssow_id === ssowData.ssow_id && e.sow_type === ssowData.sow_type);
              const getActNo = dataSSOWActNoAPI.find(e => e.activity_number === ssowData.ssow_activity_number);
              if(getSSOW !== undefined && getActNo !== undefined ){
                ssowData["ssow_description"] = getSSOW.description;
                ssowData["ssow_unit"] = getActNo.ssow_type;
                ssowData["ssow_price"] = getActNo.price === null ? 0 : getActNo.price;
                ssowData["ssow_total_price"] = ssowData.ssow_price * ssowData.ssow_qty;
                total_val_asg = total_val_asg + ssowData.ssow_total_price;
                list_ssow.push(ssowData);
              }else{
                if(getSSOW === undefined){
                  errSSOW.push(ssowData.ssow_id);
                }
                if(getActNo === undefined){
                  errActNo.push(ssowData.ssow_activity_number);
                }
              }
            }
            assignmentData["Value_Assignment"] = total_val_asg;
            assignmentData["SSOW_List"] = list_ssow;
            bulkAssignment.push(assignmentData);
          }else{
            if(getProject === undefined){
              errProject.push(assignmentData.CD_ID);
            }
          }
        }else{
          if(getActId === undefined){
            errActId.push(assignmentData.CD_ID);
          }
          if(getVendor === undefined){
            errVendor.push(assignmentData.Vendor_Code_Number);
          }
        }
      }
      errVendor = [...new Set(errVendor)];
      errActId = [...new Set(errActId)];
      errSSOW = [...new Set(errSSOW)];
      errActNo = [...new Set(errActNo)];
      errProject = [...new Set(errProject)];
      if(errActId.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = "Activity ID : "+errActId.join(", ")+" not exist"+twoSentence+actionMessage;
      }
      if(errVendor.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = actionMessage+twoSentence+"Vendor Code : "+errVendor.join(", ")+" not exist";
      }
      if(errSSOW.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = actionMessage+twoSentence+"SSOW Id : "+errSSOW.join(", ")+" not exist";
      }
      if(errActNo.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = actionMessage+twoSentence+"SSOW Activity Number : "+errActNo.join(", ")+" not exist";
      }
      if(errProject.length !== 0){
        actionStatus = 'failed';
        let twoSentence = actionMessage.length !== 0 ? " and " : "";
        actionMessage = actionMessage+twoSentence+"Activity ID : "+errProject.join(", ")+" haven't project";
      }
      console.log("bulkAssignment", bulkAssignment);
      if(actionStatus !== 'failed'){
        const postAssignment = await this.postDatatoAPITSEL('/asp_assignment_op', bulkAssignment);
        if(postAssignment.data !== undefined){
          this.setState({ action_status : 'success' }, () => {
            setTimeout(function(){ this.setState({ redirectSign : true}); }.bind(this), 3000);
          });
        }else{
          this.setState({action_status : 'failed'});
        }
      }else{
        this.setState({action_status : actionStatus, action_message : actionMessage});
      }

    }
  }

  handleChangeSOWType(e){
    const value = e.target.value;
    console.log("Excel Render e", e);
    this.setState({sow_type_selected : value});
  }

  exportFormatBulkAssignment = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const sow_type = this.state.sow_type_selected;
    let indexSSOW = 7;
    if(sow_type === "SACME"){
      indexSSOW = 25;
    }

    let headerRow = ["id", "project", "sow_type", "vendor_code", "vendor_name", "activity_id"];

    for(let i = 1; i <= indexSSOW; i++){
      headerRow.push("ssow_"+sow_type.toLowerCase()+"_id_"+i.toString());
      headerRow.push("ssow_"+sow_type.toLowerCase()+"_activity_number_"+i.toString());
      headerRow.push("ssow_"+sow_type.toLowerCase()+"_unit_"+i.toString());
    }

    ws.addRow(headerRow);
    ws.addRow(["","",sow_type]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'MR Uploader Template.xlsx');
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/assignment-list'} />);
    }
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >ASP Assignment Bulk </span>
            <Button style={{marginRight : '8px', float : 'right'}} outline color="info" onClick={this.exportFormatBulkAssignment} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download Assignment Format</Button>
            <select type="select" onChange={this.handleChangeSOWType} value={this.state.sow_type_selected} style={{marginRight : '8px', marginTop :'3px', float : 'right', width : '100px'}}>
              <option value="" disabled selected hidden>SOW Type</option>
              <option value="NDO">NDO</option>
              <option value="RBS">RBS</option>
              <option value="TRM">TRM</option>
              <option value="Power">Power</option>
              <option value="SACME">SACME</option>
              <option value="Survey">Survey</option>
              <option value="BSC">BSC</option>
              <option value="RNC">RNC</option>
            </select>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
            <Button color="success" onClick={this.saveDataAssignmentBulk} style={{float : 'right'}} >Save</Button>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>BULK ASP ASSIGNMENT PREVIEW</td>
                </tr>
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
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

export default connect(mapStateToProps)(BulkAssignment);
