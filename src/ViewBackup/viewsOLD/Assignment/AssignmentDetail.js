import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter, Table } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import './assignment.css';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';



class AssignmentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_assignment : null,
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      action_message : null,
      action_message : null,
      bast_assign_form : new Map(),
      can_edit_ssow : false,
      can_edit_asp : false,
      asp_list : [],
      asp_selected : {},
    }
    this.notifyASP = this.notifyASP.bind(this);
    this.saveBastNumber = this.saveBastNumber.bind(this);
    this.acceptASG = this.acceptASG.bind(this);
    this.rescheduleASG = this.rescheduleASG.bind(this);
    this.revisionASG = this.revisionASG.bind(this);
    this.approveASGbyPM = this.approveASGbyPM.bind(this);
    this.exportFormatBulkAssignment = this.exportFormatBulkAssignment.bind(this);
    this.loadOptionsSSOWID = this.loadOptionsSSOWID.bind(this);
    this.loadOptionsActivityNumber = this.loadOptionsActivityNumber.bind(this);
    this.handleChangeSSOWListReactSelect = this.handleChangeSSOWListReactSelect.bind(this);
    this.handleChangeSSOWList = this.handleChangeSSOWList.bind(this);
    this.handleChangeCanEditSSOW = this.handleChangeCanEditSSOW.bind(this);
    this.handleChangeCanEditASP = this.handleChangeCanEditASP.bind(this);
    this.updateSSOWList = this.updateSSOWList.bind(this);
    this.handleChangeASP = this.handleChangeASP.bind(this);
    this.handleChangeTOP = this.handleChangeTOP.bind(this);
    this.getASPList = this.getASPList.bind(this);
    this.deleteSSOW = this.deleteSSOW.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.convertTOP = this.convertTOP.bind(this);
  }

  async getDataFromAPIXL(url) {
    try {
      let respond = await axios.get(API_URL_XL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: usernameXL,
          password: passwordXL
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

  async getDataFromAPIEXEL(url) {
    try {
      let respond = await axios.get(API_URL_XL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: usernameXL,
          password: passwordXL
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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE+url, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data node", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data node", err);
      return respond;
    }
  }

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE+url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond Post data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond Post data ", err);
      return respond;
    }
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_XL+url, data, {
        headers: {
          'Content-Type':'application/json',
          'If-Match': _etag
        },
        auth: {
          username: usernameXL,
          password: passwordXL
        }
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log('respond patch data', respond);
      }
      return respond;
    } catch(err) {
      let respond = undefined;
      this.setState({action_status: 'failed', action_message: 'Sorry, there is something wrong, please try again!'});
      console.log('respond patch data', err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data){
    try {
      let respond = await axios.patch(process.env.REACT_APP_API_URL_NODE +url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
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

  componentDidMount() {
    this.getDataAssignment(this.props.match.params.id);
    document.title = 'Assignment Detail | BAM';
  }

  getDataAssignment(_id_Assignment) {
    this.getDataFromAPINODE('/aspAssignment/aspassign/'+_id_Assignment).then(resAsg => {
      if(resAsg.data !== undefined) {
        this.setState({ data_assignment : resAsg.data.data });
      }
    })
  }

  handleBastAssign = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({ bast_assign_form: prevState.bast_assign_form.set(name, value) }));
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  async notifyASP(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE('/aspAssignment/notifyAspAssignment/'+_id);
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"})
      }else{
        this.setState({action_status : "failed"})
      }
    }else{
      this.setState({action_status : "failed"})
    }
  }

  async acceptASG(e) {
    let successUpdate = [];
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE('/aspAssignment/acceptAspAssignment/'+_id);
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"})
      }else{
        this.setState({action_status : "failed"})
      }
    }else{
      this.setState({action_status : "failed"})
    }
  }

  async revisionASG(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE('/aspAssignment/reviseAspAssignment/'+_id, {"note" : " "});
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"})
      }else{
        this.setState({action_status : "failed"})
      }
    }else{
      this.setState({action_status : "failed"})
    }
  }

  async rescheduleASG(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE('/aspAssignment/reScheduleAspAssignment/'+_id, {"note" : " "});
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"})
      }else{
        this.setState({action_status : "failed"})
      }
    }else{
      this.setState({action_status : "failed"})
    }
  }

  async saveBastNumber(){
    const dataAssignment = this.state.data_assignment;
    const formBast = this.state.bast_assign_form;
    const dataBast = {
      "Request_Type" : "New GR",
      "id_assignment_doc" : dataAssignment._id,
      "Assignment_No" : dataAssignment.Assignment_No,
      "Account_Name" : dataAssignment.Account_Name,
      "ASP_Acceptance_Date" : dataAssignment.ASP_Acceptance_Date,
      "id_cd_doc" : null,
      "CD_ID" : null,
      "id_project_doc" : dataAssignment.id_project_doc,
      "Project" : dataAssignment.Project,
      "SOW_Type" : dataAssignment.SOW_Type,
      "BAST_No" : formBast.get("bast_no"),
      "Payment_Terms" : dataAssignment.Payment_Terms,
      "Payment_Terms_Ratio" : formBast.get("ratio"),
      "PO_Qty" : 1,
      "PO_Number" : dataAssignment.PO_Number,
      "PO_Item" : dataAssignment.PO_Item,
      "Required_GR_Qty" : 1,
      "Item_Status" : formBast.get("item_status")
    }
    let assignBast = {
      "account_id" : null,
      "data" : [dataBast]
    };
    const respondAssignBast = await this.patchDatatoAPINODE('/aspAssignment/updateBastNumber/'+dataAssignment._id, assignBast);
    if(respondAssignBast.data !== undefined && respondAssignBast.status >= 200 && respondAssignBast.status <= 300 ){
      this.setState({action_status : 'success', action_message : 'BAST Number has been assign'});
    }else{
      this.setState({action_status : 'failed', action_message : respondAssignBast.response.data.error});
    }
  }

  exportFormatBulkAssignment = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const data_assingment = this.state.data_assignment;
    let indexSSOW = 7;

    let headerRow = ["id","project","sow_type", "created_based", "vendor_code","vendor_name","payment_terms","identifier"];

    data_assingment.SSOW_List.map((e,idx) => headerRow.push("ssow_"+(e.sow_type.toLowerCase())+"_id_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_activity_number_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_unit_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_quantity_"+(idx+1).toString() ));

    let dataASGPrint = [data_assingment.Assignment_No,data_assingment.Project,data_assingment.SOW_Type,"cd_id",data_assingment.Vendor_Code_Number,data_assingment.Vendor_Name,this.convertTOP(data_assingment.Payment_Terms),data_assingment.Site_ID];
    data_assingment.SSOW_List.map(e => dataASGPrint.push(e.ssow_id, e.ssow_activity_number, e.ssow_unit, e.ssow_qty));

    ws.addRow(headerRow);
    ws.addRow(dataASGPrint);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Assignment '+data_assingment.Assignment_No+' Template.xlsx');
  }

  async loadOptionsSSOWID(inputValue) {
    if(!inputValue || inputValue.length < 2 ) {
      return [];
    } else {
      let ssow_id_list = [];
      // const getSSOWID = await this.getDataFromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getSSOWID = await this.getDataFromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getSSOWID !== undefined && getSSOWID.data !== undefined) {
        getSSOWID.data._items.map(ssow =>
          ssow_id_list.push({'label' : ssow.ssow_id !== undefined ? ssow.ssow_id : null, 'value' : ssow.ssow_id, 'sow_type' : ssow.sow_type, 'ssow_unit' : ssow.ssow_type, 'description' : ssow.description}))
      }
      return ssow_id_list;
    }
  }

  async loadOptionsActivityNumber(inputValue) {
    if(!inputValue || inputValue.length < 2) {
      return [];
    } else {
      let act_number_list = [];
      const getActNumber = await this.getDataFromAPIXL('/ssow_activity_number_sorted_nonpage?where={"activity_number":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getActNumber !== undefined && getActNumber.data !== undefined) {
        getActNumber.data._items.map(act_number =>
          act_number_list.push({'label' : act_number.activity_number !== undefined ? act_number.activity_number : null, 'value' : act_number.activity_number}))
      }
      return act_number_list;
    }
  }

  handleChangeCanEditSSOW(){
    this.setState(prevState => ({
      can_edit_ssow: !prevState.can_edit_ssow
    }));
  }

  handleChangeCanEditASP(){
    this.getASPList();
    this.setState(prevState => ({
      can_edit_asp: !prevState.can_edit_asp
    }));
  }

  handleChangeASP(e){
    const value = e.target.value;
    const asp_name = this.state.asp_list.find(e => e.Vendor_Code === value);
    let asp_selected = this.state.data_assignment;
    if(asp_name !== undefined){
      asp_selected["Vendor_Code"] = asp_name._id
      asp_selected["Vendor_Code_Number"] = asp_name.Vendor_Code
      asp_selected["Vendor_Email"] = asp_name.Email
      asp_selected["Vendor_Name"] = asp_name.Name
    }
    this.setState({data_assignment : asp_selected});
  }

  handleChangeTOP(e){
    const value = e.target.value;
    let dataASG = this.state.data_assignment;
    if(value !== undefined){
      dataASG["Payment_Terms"] = value;
    }
    this.setState({data_assignment : dataASG});
  }

  convertTOP(e){
    if(e === "20%-80%"){
      return 2080
    }else if(e === "30%-70%"){
      return 3070
    }else if(e === "40%-60%"){
      return 4060
    }else if(e === "50%-50%"){
      return 5050
    }else if(e === "100%"){
      return 100
    }else if(e === "80%-20%"){
      return 8020
    }else if(e === "70%-30%"){
      return 7030
    }else if(e === "60%-40%"){
      return 6040
    }else{
      return e;
    }
  }

  getASPList() {
    this.getDataFromAPIEXEL('/vendor_data_non_page').then(res => {
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({asp_list : items});
      }
    })
  }

  handleChangeSSOWList(e){
    let dataSSOW = this.state.data_assignment;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSSOW.SSOW_List[parseInt(idx)][field] = value;
    this.setState({data_assignment : dataSSOW})
  }

  handleChangeSSOWListReactSelect = async (newValue, e) =>{
    let dataSSOW = this.state.data_assignment;
    let idxField = e.name.split(" /// ")
    let idx = idxField[0];
    let field = idxField[1];
    if(field === "ssow_id"){
      dataSSOW.SSOW_List[parseInt(idx)]['sow_type'] = newValue.sow_type;
      dataSSOW.SSOW_List[parseInt(idx)]['ssow_description'] = newValue.description;
      dataSSOW.SSOW_List[parseInt(idx)]['ssow_unit'] = newValue.ssow_unit;
    }
    dataSSOW.SSOW_List[parseInt(idx)][field] = newValue.value;
    this.setState({data_assignment : dataSSOW});
  }

  async updateSSOWList(){
    const data_assingment = this.state.data_assignment;

    let headerRow = ["id","project","sow_type", "created_based", "vendor_code","vendor_name","payment_terms","identifier"];

    let dataASGRow = [data_assingment.Assignment_No,data_assingment.Project,"RBS", "tower_id",data_assingment.Vendor_Code_Number,data_assingment.Vendor_Name,this.convertTOP(data_assingment.Payment_Terms),data_assingment.Site_ID];
    data_assingment.SSOW_List.map((e,idx) => headerRow.push("ssow_"+(e.sow_type.toLowerCase())+"_id_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_activity_number_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_unit_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_quantity_"+(idx+1).toString() ));
    data_assingment.SSOW_List.map(e => dataASGRow.push(e.ssow_id, e.ssow_activity_number, e.ssow_unit, e.ssow_qty));

    let dataXLS = [headerRow,dataASGRow];
    console.log("dataXLS", dataXLS);
    const dataXLSASG = {
      "includeSsow" : true,
      "data" : dataXLS
    }
    const respondCheckingASG = await this.postDatatoAPINODE('/aspAssignment/aspAssignmentByActivity', dataXLSASG);
    if(respondCheckingASG.data !== undefined && respondCheckingASG.status >= 200 && respondCheckingASG.status <= 300 ) {
      let dataChecking = respondCheckingASG.data.data;
      if(dataChecking[0].operation === "INVALID"){
        this.setState({ action_status : 'failed', action_message : dataChecking[0].activity_status });
      }else{
        const respondSaveASG = await this.postDatatoAPINODE('/aspAssignment/createAspAssign', {"data" : dataChecking});
        if(respondSaveASG.data !== undefined && respondSaveASG.status >= 200 && respondSaveASG.status <= 300 ) {
          this.setState({ action_status : 'success' });
        } else{
          this.setState({ action_status : 'failed' });
        }
      }
    } else{
      this.setState({ action_status : 'failed' });
    }
  }

  deleteSSOW(e){
    let index = e.target.value;
    let dataSSOW = this.state.data_assignment;
    dataSSOW.SSOW_List.splice(parseInt(index), 1);
    this.setState({data_assignment : dataSSOW});
  }

  addSSOW(){
    let dataSSOW = this.state.data_assignment;
    dataSSOW.SSOW_List.push({});
    this.setState({data_assignment : dataSSOW});
  }

  async approveASGbyPM(e){
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE('/aspAssignment/pmApproval/'+_id);
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"})
      }else{
        this.setState({action_status : "failed"})
      }
    }else{
      this.setState({action_status : "failed"})
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            {this.state.data_assignment !== null && (
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-info-circle" style={{marginRight: "8px"}}></i>Assignment Detail ({this.state.data_assignment.Assignment_No})</span>\
                <Button style={{marginRight : '8px', float : 'right'}} outline color="info" size="sm" onClick={this.exportFormatBulkAssignment} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Assignment Format</Button>
              </CardHeader>
              <CardBody>
                <Form>
                  <h5>ACTIVITY</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WP ID</Label>
                        <Input type="text" readOnly value={this.state.data_assignment.cust_del.map(e => e.cd_id+", ")}></Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Status</Label>
                        <Input type="text" readOnly value={this.state.data_assignment.Current_Status}></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>PROJECT</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Name</Label>
                        <Input type="text" name="project_name" readOnly value={this.state.data_assignment.Project} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{marginTop: "16px"}}>
                    <Col md="6">
                      <h5>SITE DETAILS NE</h5>
                    </Col>
                    <Col md="6">
                      <h5>SITE DETAILS FE</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site ID</Label>
                        <Input type="text" name="site_id_ne" readOnly value={this.state.data_assignment.Site_ID} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_ne" readOnly value={this.state.data_assignment.Site_Name} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_ne" readOnly value={this.state.data_assignment.Site_Latitude} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Longitude</Label>
                        <Input type="text" name="site_long_ne" readOnly value={this.state.data_assignment.Site_Longitude} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site ID</Label>
                        <Input type="text" name="site_id_fe" readOnly value={this.state.data_assignment.Site_FE_ID} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_fe" readOnly value={this.state.data_assignment.Site_FE_Name} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_fe" readOnly value={this.state.data_assignment.Site_FE_Latitude} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Longitude</Label>
                        <Input type="text" name="site_long_fe" readOnly value={this.state.data_assignment.Site_FE_Longitude} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>SOW / CONFIG</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SOW / Config</Label>
                        <Input type="text" name="sow_config" readOnly value={this.state.data_assignment.SOW_Type} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>NN Service</Label>
                        <Input type="text" name="nn_service" readOnly value={this.state.data_assignment.NW} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WBS</Label>
                        <Input type="text" name="wbs" readOnly value="" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Act Code</Label>
                        <Input type="text" name="act_code" readOnly value={this.state.data_assignment.NW_Activity} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>PR/PO INFORMATION</h5>
                  <Row>
                    <div style={{paddingLeft: "25px"}}>
                      <Checkbox name="editable" checked={this.state.can_edit_asp} onChange={this.handleChangeCanEditASP} />
                      <span>Editable</span>
                    </div>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP</Label>
                        {this.state.can_edit_asp ? (
                          <Input type="select" name="14" onChange={this.handleChangeASP} value={this.state.data_assignment.Vendor_Code_Number}>
                            <option value="" disabled hidden>Select ASP</option>
                            {this.state.asp_list.map((list, i) =>
                              <option value={list.Vendor_Code}>{list.Name}</option>
                            )}
                          </Input>
                        ) : (
                          <Input type="text" name="asp" readOnly value={this.state.data_assignment.Vendor_Name} />
                        )}
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>TOP</Label>
                        {this.state.can_edit_asp ? (
                          <Input type="select" name="14" onChange={this.handleChangeTOP} value={this.convertTOP(this.state.data_assignment.Payment_Terms)}>
                            <option value="" disabled hidden>Select TOP</option>
                            <option value="2080">20% - 80%</option>
                            <option value="3070">30% - 70%</option>
                            <option value="4060">40% - 60%</option>
                            <option value="5050">50% - 50%</option>
                            <option value="100">100% - 0%</option>
                            <option value="8020">80% - 20%</option>
                            <option value="7030">70% - 30%</option>
                            <option value="6040">60% - 40%</option>
                          </Input>
                        ) : (
                          <Input type="text" name="top" readOnly value={this.state.data_assignment.Payment_Terms} />
                        )}
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SSOW Type</Label>
                        <Input type="text" name="ssow_type" readOnly value={this.state.data_assignment.SOW_Type} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PR</Label>
                        <Input type="text" name="pr" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created By</Label>
                        <Input type="text" name="pr_created_by" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created On</Label>
                        <Input type="date" name="pr_created_on" readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PO</Label>
                        <Input type="text" name="po" readOnly value={this.state.data_assignment.PO_Number}/>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created By</Label>
                        <Input type="text" name="po_created_by" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created On</Label>
                        <Input type="date" name="po_created_on" readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PO LINE ITEM</Label>
                        <Input type="text" name="po_line_item" readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  {(this.state.data_assignment !== null && this.state.data_assignment !== undefined) && (
                    <Fragment>
                    <h5 style={{marginTop: "16px"}}>SSOW List</h5>
                    <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                      <div style={{marginBottom : '10px'}}>
                        <Checkbox name="editable" checked={this.state.can_edit_ssow} onChange={this.handleChangeCanEditSSOW} />
                        <span>Editable</span>
                      </div>
                    </Row>
                    {this.state.can_edit_ssow ? (
                      <Fragment>
                      {this.state.data_assignment.SSOW_List !== undefined && this.state.data_assignment.SSOW_List.map((ssow, idx) =>
                        <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                          <Col md="2" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>SSOW ID</Label>
                              <AsyncSelect
                                cacheOptions
                                loadOptions={this.loadOptionsSSOWID}
                                defaultOptions
                                defaultInputValue={ssow.ssow_id}
                                isDisabled={!this.state.can_edit_ssow}
                                onChange={this.handleChangeSSOWListReactSelect}
                                name={idx + " /// ssow_id"}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="2" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>Activity Number</Label>
                              <AsyncSelect
                                cacheOptions
                                loadOptions={this.loadOptionsActivityNumber}
                                defaultOptions
                                defaultInputValue={ssow.ssow_activity_number}
                                isDisabled={!this.state.can_edit_ssow}
                                onChange={this.handleChangeSSOWListReactSelect}
                                name={idx + " /// ssow_activity_number"}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>Description</Label>
                              <Input type="textarea" name={idx + " /// ssow_description"} rows="1" value={ssow.ssow_description} readOnly />
                            </FormGroup>
                          </Col>
                          <Col md="1" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>SSOW Type</Label>
                              <Input type="text" name={idx + " /// sow_type"} value={ssow.sow_type} onChange={this.handleChangeSSOWList} readOnly/>
                            </FormGroup>
                          </Col>
                          <Col md="1" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>Unit</Label>
                              <Input type="text" name={idx + " /// ssow_unit"} value={ssow.ssow_unit} disabled={!this.state.can_edit_ssow} onChange={this.handleChangeSSOWList}/>
                            </FormGroup>
                          </Col>
                          <Col md="1" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>Quantity</Label>
                              <Input type="number" name={idx + " /// ssow_qty"} value={ssow.ssow_qty} disabled={!this.state.can_edit_ssow} onChange={this.handleChangeSSOWList}/>
                            </FormGroup>
                          </Col>
                          <Col md="1" style={{margin:"0", padding:"4px"}}>
                            <FormGroup>
                              <Label>Status</Label>
                              <div style={{display: "flex"}}>
                                <Input type="select" name={idx + " /// ssow_current_status"} onChange={this.handleChangeForm} value={ssow.ssow_status!== undefined ? ssow.ssow_status[(ssow.ssow_status.length-1)].status : ""} readOnly>
                                  <option value="" disabled>Select Status</option>
                                  <option value="CANCELLED">Cancelled</option>
                                  <option value="CLOSE">Close</option>
                                  <option value="OPEN">Open</option>
                                  <option value="PARTIAL CLOSE">Partial Close</option>
                                </Input>
                                {this.state.can_edit_ssow === true && (
                                <Button value={idx} onClick={this.deleteSSOW} color="danger" size="sm" style={{marginLeft: "5px"}}>
                                  <i className="fa fa-trash"></i>
                                </Button>
                                )}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      )}
                      </Fragment>
                    ) : (
                      <Row>
                        <Col md="12">
                          <Table striped size="sm" className="assignment-list__table--center-non-border">
                            <thead>
                              <tr>
                                <th>SSOW ID</th><th>Activity Number</th><th style={{width : '400px'}}>Description</th><th>SSOW Type</th><th>Unit</th><th>Qty</th><th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(this.state.data_assignment.SSOW_List !== undefined) && this.state.data_assignment.SSOW_List.map(ssow =>
                                <tr key={ssow.ssow_id+ssow.ssow_activity_number}>
                                  <td>{ssow.ssow_id}</td>
                                  <td>{ssow.ssow_activity_number}</td>
                                  <td style={{textAlign : 'left'}}>{ssow.ssow_description}</td>
                                  <td>{ssow.sow_type}</td>
                                  <td>{ssow.ssow_unit}</td>
                                  <td>{ssow.ssow_qty}</td>
                                  <td>{ssow.ssow_status[(ssow.ssow_status.length-1)].status}</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    )}
                      {(this.state.can_edit_ssow === true || this.state.can_edit_asp === true) && (
                        <Fragment>
                          <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                            <div style={{display : 'flex'}}>
                              {(this.state.can_edit_ssow === true) && (
                                <Button color="primary" size="sm" onClick={this.addSSOW}>
                                  <i className="fa fa-plus">&nbsp;</i> SSOW
                                </Button>
                              )}
                              <Button color="success" size="sm" style={{position : 'relative', left : '350px'}} onClick={this.updateSSOWList}>
                                <i className="fa fa-save">&nbsp;</i>Update
                              </Button>
                            </div>
                          </Row>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                  <h5 style={{marginTop: "16px"}}>ASSIGN BAST</h5>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>BAST NO</Label>
                        <Input type="text" name="bast_no" onChange={this.handleBastAssign} value={!this.state.bast_assign_form.has("bast_no") ? null : this.state.bast_assign_form.get("bast_no")} />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Payment Ratio</Label>
                        <Input type="select" name="ratio" onChange={this.handleBastAssign} value={!this.state.bast_assign_form.has("ratio") ? null : this.state.bast_assign_form.get("ratio")}>
                          <option value="" disabled selected hidden>Select Ratio</option>
                          <option value={0.3}>30%</option>
                          <option value={0.4}>40%</option>
                          <option value={0.5}>50%</option>
                          <option value={0.6}>60%</option>
                          <option value={0.7}>70%</option>
                          <option value={1.0}>100%</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Status</Label>
                        <Input type="select" name="item_status" onChange={this.handleBastAssign} value={!this.state.bast_assign_form.has("item_status") ? null : this.state.bast_assign_form.get("item_status")}>
                          <option value="" disabled selected hidden></option>
                          <option value="Submit">Submit</option>
                          <option value="Submit and Urgent">Submit and Urgent</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <Button color='success' style={{float : 'right', marginRight : '20px', marginTop : '30px'}} onClick={this.saveBastNumber}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i>Assign</Button>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>GR</h5>
                  <Row>
                    <Col md="4">
                      <Table responsive striped bordered size="sm">
                        <thead>
                          <tr>
                            <th>
                              ASP BAST No.
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data_assignment.BAST_No.map(bast =>
                            <tr>
                              <td>
                                {bast}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                {(this.state.data_assignment.Current_Status === "REQUEST PM APPROVAL") && (
                  <Button color="success" style={{float: "right"}} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.approveASGbyPM}>Approve</Button>
                )}
                {(this.state.data_assignment.Current_Status === "PM APPROVE" || this.state.data_assignment.Current_Status === "ASP ASSIGNMENT NEED REVISION" || this.state.data_assignment.Current_Status === "ASP ASSIGNMENT RE-SCHEDULE") && (
                  <Button color="primary" style={{float: "right"}} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.notifyASP}><i className="fa fa-bell" style={{marginRight: "8px"}}></i> Notify ASP</Button>
                )}
                {(this.state.data_assignment.Current_Status === "ASP ASSIGNMENT NOTIFIED TO ASP") && (
                <Fragment>
                  <Button color="danger" style={{float: "right"}} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.rescheduleASG}><i className="fa fa-calendar-alt" style={{marginRight: "8px"}}></i> Reschedule</Button>
                  <Button color="warning" style={{float: "right", marginRight: "8px"}} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.revisionASG}><i className="fa fa-edit" style={{marginRight: "8px"}}></i> Need Revision</Button>
                  <Button color="success" style={{float: "right", marginRight: "8px"}} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.acceptASG}><i className="fa fa-check" style={{marginRight: "8px"}}></i> Accept</Button>
                </Fragment>
                )}
              </CardFooter>
            </Card>
            )}
          </Col>
        </Row>
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

export default connect(mapStateToProps)(AssignmentDetail);
