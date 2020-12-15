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

import {apiSendEmail, patchDatatoAPINODE, getDatafromAPIEXEL} from '../../helper/asyncFunction';

const DefaultNotif = React.lazy(() => import('../../viewsTelkomsel/DefaultView/DefaultNotif'));

const API_URL_TSEL = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const usernameISAT = 'adminbamidsuper';
const passwordISAT = 'F760qbAg2sml';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

let headerFormatDSAMigration = ["MR_ID_BAM", "No_LCC", "No_PO_DSA", "Volume", "Weight", "Actualized_By", "Actualized_Date", "DSA_Creator", "DSA_Creation_Date", "LDM_Approved_By", "LDM_Approved_Date", "LDM_Admin_Approved_By", "LDM_Admin_Approved_Date", "GR_Number", "GR_Submit_By", "GR_Submit_Date", "Section_1_Details_1", "Section_1_Service_Master_1", "Section_1_Qty_1", "Section_1_Details_2", "Section_1_Service_Master_2", "Section_1_Qty_2", "Section_1_Details_3", "Section_1_Service_Master_3", "Section_1_Qty_3", "Section_1_Details_4", "Section_1_Service_Master_4", "Section_1_Qty_4", "Section_1_Details_5", "Section_1_Service_Master_5", "Section_1_Qty_5", "Section_1_Details_6", "Section_1_Service_Master_6", "Section_1_Qty_6", "Section_1_Details_7", "Section_1_Service_Master_7", "Section_1_Qty_7", "Section_1_Details_8", "Section_1_Service_Master_8", "Section_1_Qty_8", "Section_1_Details_9", "Section_1_Service_Master_9", "Section_1_Qty_9", "Section_1_Details_10", "Section_1_Service_Master_10", "Section_1_Qty_10", "Additional_Section_2_Details_1", "Additional_Section_2_Service_Master_1", "Additional_Section_2_Qty_1", "Additional_Section_2_Details_2", "Additional_Section_2_Service_Master_2", "Additional_Section_2_Qty_2", "Additional_Section_2_Details_3", "Additional_Section_2_Service_Master_3", "Additional_Section_2_Qty_3", "Additional_Section_2_Details_4", "Additional_Section_2_Service_Master_4", "Additional_Section_2_Qty_4", "Additional_Section_2_Details_5", "Additional_Section_2_Service_Master_5", "Additional_Section_2_Qty_5", "Additional_Section_2_Details_6", "Additional_Section_2_Service_Master_6", "Additional_Section_2_Qty_6", "Additional_Section_2_Details_7", "Additional_Section_2_Service_Master_7", "Additional_Section_2_Qty_7", "Additional_Section_2_Details_8", "Additional_Section_2_Service_Master_8", "Additional_Section_2_Qty_8", "Additional_Section_2_Details_9", "Additional_Section_2_Service_Master_9", "Additional_Section_2_Qty_9", "Additional_Section_2_Details_10", "Additional_Section_2_Service_Master_10", "Additional_Section_2_Qty_10", "Additional_Section_3_Type_Cost_1", "Additional_Section_3_Description_1", "Additional_Section_3_Price_1", "Additional_Section_3_Type_Cost_2", "Additional_Section_3_Description_2", "Additional_Section_3_Price_2", "Additional_Section_3_Type_Cost_3", "Additional_Section_3_Description_3", "Additional_Section_3_Price_3", "Additional_Section_3_Type_Cost_4", "Additional_Section_3_Description_4", "Additional_Section_3_Price_4", "Additional_Section_3_Type_Cost_5", "Additional_Section_3_Description_5", "Additional_Section_3_Price_5", "Additional_Section_3_Type_Cost_6", "Additional_Section_3_Description_6", "Additional_Section_3_Price_6", "Additional_Section_3_Type_Cost_7", "Additional_Section_3_Description_7", "Additional_Section_3_Price_7", "Additional_Section_3_Type_Cost_8", "Additional_Section_3_Description_8", "Additional_Section_3_Price_8", "Additional_Section_3_Type_Cost_9", "Additional_Section_3_Description_9", "Additional_Section_3_Price_9", "Additional_Section_3_Type_Cost_10", "Additional_Section_3_Description_10", "Additional_Section_3_Price_10"];

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const dataPercentage =[20, 30, 40, 50, 60, 70, 80, 90, 100];

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

class DSAMigration extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        tokenUser : this.props.dataLogin.token,
        assignment_ssow_upload : [],
        list_data_activity : [],
        sow_type_selected : "RBS",
        rowsXLS : [],
        rowsXLSMigration : [],
        waiting_status : null,
        action_status : null,
        action_message : null,
        redirectSign : false,
        asp_list : [],
        uploadan_type : "without Predefined SSOW",
        modal_loading : false,
        project_in_bulk : [],
    };
    this.saveDataDSAMigrationBulk = this.saveDataDSAMigrationBulk.bind(this);
    this.exportFormatBulkDSAMigration = this.exportFormatBulkDSAMigration.bind(this);
    this.handleChangeUploadType = this.handleChangeUploadType.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

	toggleLoading(){
	  this.setState(prevState => ({
	    modal_loading: !prevState.modal_loading
	  }));
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

  fileHandlerDSAMigration = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
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
      // this.ArrayEmptytoNull(data);
      this.setState({ action_status: null, action_message: null }, () => {
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
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if(dataObject !== null){
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        }else{
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS : newDataXLS,
    }, () => {
      this.checkFormatDSA(newDataXLS);
    });
    // this.checkingDataAssignment(newDataXLS);
  }

  checkFormatDSA(dataXLS){
    let dataFalse = [];
    if(dataXLS.length > 0){
      for(let i; i < dataXLS[0].length; i++){
        if(headerFormatDSAMigration.find(hfd => hfd === dataXLS[0][i]) === undefined){
          dataFalse.push(dataXLS[0][i]);
        }
      }
    }else{
      this.setState({action_status : 'failed', action_message : 'Please check your format'});
    }
    if(dataFalse.length !== 0){
      this.setState({action_status : 'failed', action_message : 'Please check your format'});
    }
  }

  componentDidMount(){
    this.getASPList();
  }

  getASPList() {
    getDatafromAPIEXEL('/vendor_data_non_page?where={"Type":"ASP"}').then(res => {
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({asp_list : items});
      }
    })
  }

  async getProjectinBulk(array_project){
    let arrayProject = '"'+array_project.join('", "')+'"';
    const dataProject = await getDatafromAPIEXEL('/project_sorted_non_page?where={"Project" : {"$in" : ['+arrayProject+']}}');
    if(dataProject.data !== undefined){
      return dataProject.data._items;
    }else{
      return []
    }
  }

  async checkingDataAssignment(dataXLS){
    this.setState({waiting_status : true});
    let wp_invalid = [];
    const dataXLSASG = {
      "includeSsow" : this.state.uploadan_type === "without Predefined SSOW" ? true : false,
      "data" : dataXLS
    }
    const respondCheckingASG = await patchDatatoAPINODE('/aspAssignment/aspAssignmentByActivity', dataXLSASG, this.state.tokenUser);
    if(respondCheckingASG.data !== undefined && respondCheckingASG.status >= 200 && respondCheckingASG.status <= 300 ) {
      let dataChecking = respondCheckingASG.data.data;
      this.setState({assignment_ssow_upload : dataChecking});
      if(dataChecking.filter(e => e.operation === "INVALID").length !== 0){
        this.setState({ action_status : 'failed', action_message : 'Please check INVALID row in preview' });
      }else{
        const dataProject = await this.getProjectinBulk(respondCheckingASG.data.data.map(e => e.Project));
        this.setState({project_in_bulk : dataProject}, () => {
          console.log("this.state.project_in_bulk", this.state.project_in_bulk);
        });
      }
    } else{
      if(respondCheckingASG.response !== undefined && respondCheckingASG.response.data !== undefined && respondCheckingASG.response.data.error !== undefined){
        if(respondCheckingASG.response.data.error.message !== undefined){
          this.setState({ action_status: 'failed', action_message: JSON.stringify(respondCheckingASG.response.data.error.message) });
        }else{
          this.setState({ action_status: 'failed', action_message: JSON.stringify(respondCheckingASG.response.data.error) });
        }
      }else{
        this.setState({ action_status: 'failed' });
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

  preparingDataAssignment(id){
    const dateNow = new Date();
    const dataRandom = ((Math.floor(Math.random() * 100)+id).toString()).padStart(4, '0');
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString().padStart(2, '0')+dateNow.getDate().toString().padStart(2, '0')+dataRandom.toString();
    return numberTSSR;
  }

  async saveDataDSAMigrationBulk(){
  	this.toggleLoading();
    // const dataChecking = this.state.assignment_ssow_upload;
    const dataUploadMigration = {
      "data" : this.state.rowsXLS
    }
    const respondSaveDSA = await patchDatatoAPINODE('/matreq/uploadMigrationDsa', dataUploadMigration, this.state.tokenUser);
    if(respondSaveDSA.data !== undefined && respondSaveDSA.status >= 200 && respondSaveDSA.status <= 300 ) {
      this.setState({ action_status : 'success' });
    } else{
      if (respondSaveDSA.response !== undefined && respondSaveDSA.response.data !== undefined && respondSaveDSA.response.data.error !== undefined) {
        if (respondSaveDSA.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: JSON.stringify(respondSaveDSA.response.data.error.message) });
        } else {
          this.setState({ action_status: 'failed', action_message: JSON.stringify(respondSaveDSA.response.data.error) });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
    }
    this.toggleLoading();
  }

  exportFormatBulkDSAMigration = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = ["MR_ID_BAM", "No_LCC", "No_PO_DSA", "Volume", "Weight", "Actualized_By", "Actualized_Date", "DSA_Creator", "DSA_Creation_Date", "LDM_Approved_By", "LDM_Approved_Date", "LDM_Admin_Approved_By", "LDM_Admin_Approved_Date", "GR_Number", "GR_Submit_By", "GR_Submit_Date", "Section_1_Details_1", "Section_1_Service_Master_1", "Section_1_Qty_1", "Section_1_Details_2", "Section_1_Service_Master_2", "Section_1_Qty_2", "Section_1_Details_3", "Section_1_Service_Master_3", "Section_1_Qty_3", "Section_1_Details_4", "Section_1_Service_Master_4", "Section_1_Qty_4", "Section_1_Details_5", "Section_1_Service_Master_5", "Section_1_Qty_5", "Section_1_Details_6", "Section_1_Service_Master_6", "Section_1_Qty_6", "Section_1_Details_7", "Section_1_Service_Master_7", "Section_1_Qty_7", "Section_1_Details_8", "Section_1_Service_Master_8", "Section_1_Qty_8", "Section_1_Details_9", "Section_1_Service_Master_9", "Section_1_Qty_9", "Section_1_Details_10", "Section_1_Service_Master_10", "Section_1_Qty_10", "Additional_Section_2_Details_1", "Additional_Section_2_Service_Master_1", "Additional_Section_2_Qty_1", "Additional_Section_2_Details_2", "Additional_Section_2_Service_Master_2", "Additional_Section_2_Qty_2", "Additional_Section_2_Details_3", "Additional_Section_2_Service_Master_3", "Additional_Section_2_Qty_3", "Additional_Section_2_Details_4", "Additional_Section_2_Service_Master_4", "Additional_Section_2_Qty_4", "Additional_Section_2_Details_5", "Additional_Section_2_Service_Master_5", "Additional_Section_2_Qty_5", "Additional_Section_2_Details_6", "Additional_Section_2_Service_Master_6", "Additional_Section_2_Qty_6", "Additional_Section_2_Details_7", "Additional_Section_2_Service_Master_7", "Additional_Section_2_Qty_7", "Additional_Section_2_Details_8", "Additional_Section_2_Service_Master_8", "Additional_Section_2_Qty_8", "Additional_Section_2_Details_9", "Additional_Section_2_Service_Master_9", "Additional_Section_2_Qty_9", "Additional_Section_2_Details_10", "Additional_Section_2_Service_Master_10", "Additional_Section_2_Qty_10", "Additional_Section_3_Type_Cost_1", "Additional_Section_3_Description_1", "Additional_Section_3_Price_1", "Additional_Section_3_Type_Cost_2", "Additional_Section_3_Description_2", "Additional_Section_3_Price_2", "Additional_Section_3_Type_Cost_3", "Additional_Section_3_Description_3", "Additional_Section_3_Price_3", "Additional_Section_3_Type_Cost_4", "Additional_Section_3_Description_4", "Additional_Section_3_Price_4", "Additional_Section_3_Type_Cost_5", "Additional_Section_3_Description_5", "Additional_Section_3_Price_5", "Additional_Section_3_Type_Cost_6", "Additional_Section_3_Description_6", "Additional_Section_3_Price_6", "Additional_Section_3_Type_Cost_7", "Additional_Section_3_Description_7", "Additional_Section_3_Price_7", "Additional_Section_3_Type_Cost_8", "Additional_Section_3_Description_8", "Additional_Section_3_Price_8", "Additional_Section_3_Type_Cost_9", "Additional_Section_3_Description_9", "Additional_Section_3_Price_9", "Additional_Section_3_Type_Cost_10", "Additional_Section_3_Description_10", "Additional_Section_3_Price_10"];
    ws.addRow(headerRow);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'DSA Uploader Template For Migration.xlsx');
  }

  handleChangeUploadType(e){
    const value = e.target.value;
    this.setState({uploadan_type : value});
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
            <span style={{lineHeight :'2', fontSize : '17px'}} >DSA Migration Bulk </span>
            <Button style={{marginRight : '8px', float : 'right'}} outline color="info" onClick={this.exportFormatBulkDSAMigration} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download DSA Format Migration</Button>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <Row>
              <Col>
                <input type="file" onChange={this.fileHandlerDSAMigration.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
                <Button color="success" onClick={this.saveDataDSAMigrationBulk} style={{float : 'right'}} disabled={this.state.action_status === "failed" || this.state.rowsXLS.length === 0}>
                  {this.state.waiting_status === true ? "loading.." : "Save"}
                </Button>
              </Col>
            </Row>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>DSA MIGRATION UPLOADER PREVIEW</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center', fontSize : '15px', color : 'red'}}>{this.state.uploadan_type === "without Predefined SSOW" ? "It will need approval from authoried": "SSOW List get from default mapping of SSOW to CD ID" }</td>
                </tr>
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            <Table hover bordered responsive size="sm">
              <tbody>
              {this.state.rowsXLS.length !== 0 ? (
                this.state.rowsXLS.map( (row, i) =>
                  <tr>
                    {(this.state.assignment_ssow_upload.length !== 0 && i === 0) && (
                      <Fragment>
                        <td>
                          Operation
                        </td>
                        <td>
                          Status
                        </td>
                      </Fragment>
                    )}
                    {this.state.assignment_ssow_upload[(i-1)] !== undefined && (
                      <Fragment>
                        <td>
                          {this.state.assignment_ssow_upload[(i-1)].operation}
                        </td>
                        <td>
                          {this.state.assignment_ssow_upload[(i-1)].activity_status}
                        </td>
                      </Fragment>
                    )}
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

export default connect(mapStateToProps)(DSAMigration);
