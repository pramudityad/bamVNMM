import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import './assignment.css';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const API_URL_Node = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

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
    }
    this.notifyASP = this.notifyASP.bind(this);
    this.saveBastNumber = this.saveBastNumber.bind(this);
    this.acceptASG = this.acceptASG.bind(this);
    this.rescheduleASG = this.rescheduleASG.bind(this);
    this.revisionASG = this.revisionASG.bind(this);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL_tsel+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: username_tsel,
          password: password_tsel
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

  async getDataFromAPINode(url) {
    try {
      let respond = await axios.get(API_URL_Node+url, {
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

  async postDatatoAPINode(url, data) {
    try {
      let respond = await axios.post(API_URL_Node+url, data, {
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
      let respond = await axios.patch(API_URL_tsel+url, data, {
        headers: {
          'Content-Type':'application/json',
          'If-Match': _etag
        },
        auth: {
          username: username_tsel,
          password: password_tsel
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

  async patchDatatoAPINode(url, data){
    try {
      let respond = await axios.patch(API_URL_Node +url, data, {
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
    this.getDataFromAPI('/asp_assignment_op/'+_id_Assignment).then(resAsg => {
      if(resAsg.data !== undefined) {
        this.setState({ data_assignment : resAsg.data });
      }
    })
  }

  handleBastAssign = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({ bast_assign_form: prevState.bast_assign_form.set(name, value) }));
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  loopSSOW = () => {
    let ssow_content = [];
    for(let i = 0; i < 7; i++) {
      if(this.state.data_assignment.SSOW_List[i] !== undefined) {
        ssow_content.push(
          <Row style={{paddingLeft: "16px", paddingRight: "16px"}} key={this.state.data_assignment.SSOW_List[i].ssow_id}>
            <Col md="2" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>SSOW ID</Label>
                <Input type="text" name="17" value={this.state.data_assignment.SSOW_List[i].ssow_id} readOnly />
              </FormGroup>
            </Col>
            <Col md="2" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Activity Number</Label>
                <Input type="textarea" rows="1" name="18" value={this.state.data_assignment.SSOW_List[i].ssow_activity_number} readOnly />
              </FormGroup>
            </Col>
            <Col md="4" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name="19" rows="1" readOnly value={this.state.data_assignment.SSOW_List[i].ssow_description} />
              </FormGroup>
            </Col>
            <Col md="1" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Unit</Label>
                <Input type="text" name="20" value={this.state.data_assignment.SSOW_List[i].ssow_unit} readOnly />
              </FormGroup>
            </Col>
            <Col md="1" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Quantity</Label>
                <Input type="number" name="21" value={this.state.data_assignment.SSOW_List[i].ssow_qty} readOnly />
              </FormGroup>
            </Col>
            <Col md="2" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Status</Label>
                <Input type="text" name="22" value={this.state.data_assignment.SSOW_List[i].ssow_status[0].status} readOnly />
              </FormGroup>
            </Col>
          </Row>
        );
      }
    }
    return ssow_content;
  }

  async notifyASP(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let currStatus = [
      {
        "status_name": "ASP_ASSIGNMENT",
        "status_value": "NOTIFIED TO ASP",
        "status_date": dateNow,
        "status_updater": this.state.userEmail,
        "status_updater_id": this.state.userId
      }
    ];
    let successUpdate = [];
    let updateASG = {};
    updateASG['Current_Status'] = "ASP ASSIGNMENT NOTIFIED TO ASP";
    updateASG['ASP_Assignment_Status'] = this.state.data_assignment.ASP_Assignment_Status.concat(currStatus);
    let res = await this.patchDataToAPI('/asp_assignment_op/'+_id, updateASG, _etag);
    if(res !== undefined) {
      if(res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if(successUpdate.length !== 0){
      alert('Assignment has been notified to ASP!');
      setTimeout(function(){ window.location.reload(); }, 2000);
    } else {
      alert('Sorry there is an error, please try again!');
    }
  }

  async acceptASG(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let currStatus = [
      {
        "status_name": "ASP_ASSIGNMENT",
        "status_value": "ACCEPTED",
        "status_date": dateNow,
        "status_updater": this.state.userEmail,
        "status_updater_id": this.state.userId
      }
    ];
    let successUpdate = [];
    let updateASG = {};
    updateASG['Current_Status'] = "ASP ASSIGNMENT ACCEPT";
    updateASG['ASP_Assignment_Status'] = this.state.data_assignment.ASP_Assignment_Status.concat(currStatus);
    updateASG['ASP_Acceptance_Date'] = dateNow;
    let res = await this.patchDataToAPI('/asp_assignment_op/'+_id, updateASG, _etag);
    if(res !== undefined) {
      if(res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if(successUpdate.length !== 0){
      alert('Assignment has been accepted!');
      setTimeout(function(){ window.location.reload(); }, 2000);
    } else {
      alert('Sorry there is an error, please try again!');
    }
  }

  async revisionASG(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let currStatus = [
      {
        "status_name": "ASP_ASSIGNMENT",
        "status_value": "NEED REVISION",
        "status_date": dateNow,
        "status_updater": this.state.userEmail,
        "status_updater_id": this.state.userId
      }
    ];
    let successUpdate = [];
    let updateASG = {};
    updateASG['Current_Status'] = "ASP ASSIGNMENT NEED REVISION";
    updateASG['ASP_Assignment_Status'] = this.state.data_assignment.ASP_Assignment_Status.concat(currStatus);
    let res = await this.patchDataToAPI('/asp_assignment_op/'+_id, updateASG, _etag);
    if(res !== undefined) {
      if(res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if(successUpdate.length !== 0){
      alert('Assignment status has been changed to need revision!');
      setTimeout(function(){ window.location.reload(); }, 2000);
    } else {
      alert('Sorry there is an error, please try again!');
    }
  }

  async rescheduleASG(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let currStatus = [
      {
        "status_name": "ASP_ASSIGNMENT",
        "status_value": "RE-SCHEDULE",
        "status_date": dateNow,
        "status_updater": this.state.userEmail,
        "status_updater_id": this.state.userId
      }
    ];
    let successUpdate = [];
    let updateASG = {};
    updateASG['Current_Status'] = "ASP ASSIGNMENT RE-SCHEDULE";
    updateASG['ASP_Assignment_Status'] = this.state.data_assignment.ASP_Assignment_Status.concat(currStatus);
    let res = await this.patchDataToAPI('/asp_assignment_op/'+_id, updateASG, _etag);
    if(res !== undefined) {
      if(res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if(successUpdate.length !== 0){
      alert('Assignment status has been changed to reschedule!');
      setTimeout(function(){ window.location.reload(); }, 2000);
    } else {
      alert('Sorry there is an error, please try again!');
    }
  }

  async saveBastNumber(){
    const dataAssignment = this.state.data_assignment;
    const formBast = this.state.bast_assign_form;
    const dataBast = {
      "Request_Type" : "New GR",
      "id_assignment_doc" : dataAssignment._id,
      "Assignment_No" : dataAssignment.Assignment_No,
      "Account_Name" : "TSEL",
      "ASP_Acceptance_Date" : null,
      "id_cd_doc" : "5e16d4f204d37218d18ba956",
      "CD_ID" : dataAssignment.CD_ID,
      "id_project_doc" : "5e16cb7cd0ec1a27e0acded6",
      "Project" : dataAssignment.Project,
      "SOW_Type" : dataAssignment.SOW_Type,
      "BAST_No" : formBast.get("bast_no"),
      "Payment_Terms" : dataAssignment.Payment_Terms,
      "Payment_Terms_Ratio" : formBast.get("ratio"),
      "PO_Qty" : null,
      "PO_Number" : "4519514908",
      "PO_Item" : null,
      "Required_GR_Qty" : formBast.get("ratio"),
      "Item_Status" : formBast.get("item_status")
    }
    let assignBast = {
      "account_id" : "1",
      "data" : [dataBast]
    };
    const respondAssignBast = await this.patchDatatoAPINode('/aspAssignment/updateBastNumber/'+dataAssignment._id, assignBast);
    if(respondAssignBast.data !== undefined && respondAssignBast.status >= 200 && respondAssignBast.status <= 300 ){
      this.setState({action_status : 'success', action_message : 'BAST Number has been assign'});
    }else{
      console.log("respondAssignBast.response", respondAssignBast.response);
      this.setState({action_status : 'failed', action_message : respondAssignBast.response.data.error});
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
                <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-info-circle" style={{marginRight: "8px"}}></i>Assignment Detail ({this.state.data_assignment.Assignment_No})</span>
              </CardHeader>
              <CardBody>
                <Form>
                  <h5>ACTIVITY</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WP ID</Label>
                        <Input type="text" readOnly value={this.state.data_assignment.CD_ID}></Input>
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
                    <Col md="6" style={{display: "none"}}>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Group</Label>
                        <Input type="select" name="project_group">
                          <option>Select Project Group</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Input>
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
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP</Label>
                        <Input type="text" name="asp" readOnly value={this.state.data_assignment.Vendor_Name} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px", display: "none"}}>
                        <Label>MR ID</Label>
                        <Input type="select" name="mr_id">
                          <option value="" disabled selected hidden>Select MR ID</option>
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>TOP</Label>
                        <Input type="text" name="top" readOnly value={this.state.data_assignment.Payment_Terms} />
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
                  <h5 style={{marginTop: "16px"}}>SSOW {this.state.data_assignment.SOW_Type}</h5>
                  {this.loopSSOW()}
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
                  <h5 style={{marginTop: "16px"}}>GR (PARTIAL)</h5>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP BAST NO (DP)</Label>
                        <Input type="text" name="partial_asp_bast_no" readOnly />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Doc No (DP)</Label>
                        <Input type="text" name="partial_gr_doc_no" readOnly />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Release Date (DP)</Label>
                        <Input type="date" name="partial_gr_release_date" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>On</Label>
                        <Input type="date" name="partial_asp_bast_no_on" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>By</Label>
                        <Input type="text" name="partial_asp_bast_no_by" readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup check inline style={{paddingLeft: "16px", verticalAlign: "center"}}>
                        <Input className="form-check-input" type="checkbox" name="partial_request_revision_check" readOnly />
                        <Label className="form-check-label" check>Request Revision</Label>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>On</Label>
                            <Input type="date" name="partial_request_revision_on" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>By</Label>
                            <Input type="text" name="partial_request_revision_by" readOnly />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>GR (FINAL)</h5>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP BAST NO</Label>
                        <Input type="text" name="final_asp_bast_no" readOnly />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Doc No</Label>
                        <Input type="text" name="final_gr_doc_no" readOnly />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Release Date</Label>
                        <Input type="date" name="final_gr_release_date" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>On</Label>
                        <Input type="date" name="final_asp_bast_no_on" readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>By</Label>
                        <Input type="text" name="final_asp_bast_no_by" readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup check inline style={{paddingLeft: "16px", verticalAlign: "center"}}>
                        <Input className="form-check-input" type="checkbox" name="final_request_revision_check"/>
                        <Label className="form-check-label" check>Request Revision</Label>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>On</Label>
                            <Input type="date" name="final_request_revision_on" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>By</Label>
                            <Input type="text" name="final_request_revision_by" readOnly />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="4">
                      <FormGroup check inline style={{paddingLeft: "16px", verticalAlign: "center"}}>
                        <Input className="form-check-input" type="checkbox" name="final_revision_done_check" readOnly />
                        <Label className="form-check-label" check>Revision Done</Label>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>On</Label>
                            <Input type="date" name="final_revision_done_on" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>By</Label>
                            <Input type="text" name="final_revision_done_by" readOnly />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                {(this.state.data_assignment.Current_Status === "ASP ASSIGNMENT CREATED" || this.state.data_assignment.Current_Status === "ASP ASSIGNMENT NEED REVISION" || this.state.data_assignment.Current_Status === "ASP ASSIGNMENT RE-SCHEDULE") && (
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
