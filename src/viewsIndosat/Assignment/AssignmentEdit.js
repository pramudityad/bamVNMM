import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import './assignment.css';

const DefaultNotif = React.lazy(() => import('../DefaultView/DefaultNotif'));

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const API_URL_Node = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class AssignmentEdit extends Component {
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
      asp_list : [],
      edit_assignment_form : new Array(100).fill(null),
    }
    this.editAssignment = this.editAssignment.bind(this);
    this.saveBastNumber = this.saveBastNumber.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleChangeFormAsyncSelect = this.handleChangeFormAsyncSelect.bind(this);
    this.loadOptionsSSOWID = this.loadOptionsSSOWID.bind(this);
    this.loadOptionsActivityNumber = this.loadOptionsActivityNumber.bind(this);
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
    this.loadOptionsASP();
    document.title = 'Assignment Edit | BAM';
  }

  getDataAssignment(_id_Assignment) {
    this.getDataFromAPI('/asp_assignment_op/'+_id_Assignment).then(resAsg => {
      if(resAsg.data !== undefined) {
        this.setState({ data_assignment : resAsg.data });
        let dataForm = this.state.edit_assignment_form;
        let j = 5;
        for(let i = 0; i < 7; i++) {
          if(this.state.data_assignment.SSOW_List[i] !== undefined) {
            dataForm[j] = this.state.data_assignment.SSOW_List[i].ssow_id;
            dataForm[j+1] = this.state.data_assignment.SSOW_List[i].ssow_activity_number;
            dataForm[j+2] = this.state.data_assignment.SSOW_List[i].ssow_description;
            dataForm[j+3] = this.state.data_assignment.SSOW_List[i].ssow_unit;
            dataForm[j+4] = this.state.data_assignment.SSOW_List[i].ssow_qty;
            dataForm[j+5] = this.state.data_assignment.SSOW_List[i].ssow_status[0].status;
            dataForm[j+6] = this.state.data_assignment.SSOW_List[i].sow_type;
            dataForm[j+7] = this.state.data_assignment.SSOW_List[i].ssow_status[0].status_update_date;
            dataForm[j+8] = this.state.data_assignment.SSOW_List[i].ssow_status[0].status_updater;
            dataForm[j+9] = this.state.data_assignment.SSOW_List[i].ssow_price;
            j = j + 10;
          }
        }
        this.setState({edit_assignment_form : dataForm}, () => {
          console.log("Assignment Form", this.state.edit_assignment_form);
        });
      }
    })
  }

  handleBastAssign = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({ bast_assign_form: prevState.bast_assign_form.set(name, value) }));
  }

  loadOptionsASP() {
    this.getDataFromAPI('/vendor_data_non_page').then(res => {
      console.log("ASP List", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({asp_list : items});
      }
    })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  async loadOptionsSSOWID(inputValue) {
    if(!inputValue) {
      return [];
    } else {
      let ssow_id_list = [];
      const getSSOWID = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.data_assignment.SOW_Type+'"}');
      if(getSSOWID !== undefined && getSSOWID.data !== undefined) {
        getSSOWID.data._items.map(ssow =>
          ssow_id_list.push({'label' : ssow.ssow_id !== undefined ? ssow.ssow_id : null, 'value' : ssow.ssow_id}))
      }
      return ssow_id_list;
    }
  }

  async loadOptionsActivityNumber(inputValue) {
    if(!inputValue) {
      return [];
    } else {
      let act_number_list = [];
      const getActNumber = await this.getDataFromAPI('/ssow_activity_number_sorted_nonpage?where={"activity_number":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getActNumber !== undefined && getActNumber.data !== undefined) {
        getActNumber.data._items.map(act_number =>
          act_number_list.push({'label' : act_number.activity_number !== undefined ? act_number.activity_number : null, 'value' : act_number.activity_number}))
      }
      return act_number_list;
    }
  }

  handleChangeFormAsyncSelect = async (newValue, e) => {
    let dataForm = this.state.edit_assignment_form;
    dataForm[parseInt(e.name)] = newValue.value;
    this.setState({edit_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.edit_assignment_form);
    });
    for(let i = 5; i < 72; i=i+10) {
      if(e.name === i) {
        const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
        let dataForm = this.state.edit_assignment_form;
        dataForm[i+2] = getDescription.data._items[0].description;
        this.setState({edit_assignment_form : dataForm}, () => {
          console.log("Assignment Form", this.state.edit_assignment_form);
        });
      }
    }
    for(let i = 6; i < 73; i=i+10) {
      if(e.name === i) {
        const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
        let dataForm = this.state.edit_assignment_form;
        dataForm[i+2] = getPriceUnit.data._items[0].ssow_type;
        dataForm[i+8] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
        this.setState({edit_assignment_form : dataForm}, () => {
          console.log("Assignment Form", this.state.edit_assignment_form);
        });
      }
    }
  }

  loopSSOW = () => {
    let ssow_content = [];
    let j = 5;
    let k = 0;
    for(let i = 0; i < 7; i++) {
      if(this.state.data_assignment.SSOW_List[i] !== undefined) {
        ssow_content.push(
          <Row style={{paddingLeft: "16px", paddingRight: "16px"}} key={this.state.data_assignment.SSOW_List[i].ssow_id}>
            <Col md="2" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>SSOW ID</Label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={this.loadOptionsSSOWID}
                  defaultOptions
                  onChange={this.handleChangeFormAsyncSelect}
                  name={j}
                  placeholder={this.state.data_assignment.SSOW_List[i].ssow_id}
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
                  onChange={this.handleChangeFormAsyncSelect}
                  name={j+1}
                  placeholder={this.state.data_assignment.SSOW_List[i].ssow_activity_number}
                />
              </FormGroup>
            </Col>
            <Col md="4" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name={j+2} rows="1" readOnly value={this.state.edit_assignment_form[j+2]} />
              </FormGroup>
            </Col>
            <Col md="1" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Unit</Label>
                <Input type="text" name={j+3} value={this.state.edit_assignment_form[j+3]} readOnly />
              </FormGroup>
            </Col>
            <Col md="1" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Quantity</Label>
                <Input type="number" name={j+4} value={this.state.edit_assignment_form[j+4]} onChange={this.handleChangeForm} />
              </FormGroup>
            </Col>
            <Col md="2" style={{margin:"0", padding:"4px"}}>
              <FormGroup>
                <Label>Status</Label>
                <Input type="select" name={j+5} onChange={this.handleChangeForm}>
                  <option value="Cancelled" selected={this.state.edit_assignment_form[j+5] === "Cancelled"}>Cancelled</option>
                  <option value="Close" selected={this.state.edit_assignment_form[j+5] === "Close"}>Close</option>
                  <option value="Open" selected={this.state.edit_assignment_form[j+5] === "Open"}>Open</option>
                  <option value="Partial Close" selected={this.state.edit_assignment_form[j+5] === "Partial Close"}>Partial Close</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        );
        j = j + 10;
        k++;
      }
    }
    for(let i = 0; i < 7-k; i++) {
      ssow_content.push(
        <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Label>SSOW ID</Label>
              <AsyncSelect
                cacheOptions
                loadOptions={this.loadOptionsSSOWID}
                defaultOptions
                onChange={this.handleChangeFormAsyncSelect}
                name={j}
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
                onChange={this.handleChangeFormAsyncSelect}
                name={j+1}
              />
            </FormGroup>
          </Col>
          <Col md="4" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Label>Description</Label>
              <Input type="textarea" name={j+2} rows="1" readOnly value={this.state.edit_assignment_form[j+2]} />
            </FormGroup>
          </Col>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Label>Unit</Label>
              <Input type="text" name={j+3} value={this.state.edit_assignment_form[j+3]} readOnly />
            </FormGroup>
          </Col>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Label>Quantity</Label>
              <Input type="number" name={j+4} value={this.state.edit_assignment_form[j+4]} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Label>Status</Label>
              <Input type="select" name={j+5} onChange={this.handleChangeForm}>
                <option value="" disabled selected hidden>Select Status</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Close">Close</option>
                <option value="Open">Open</option>
                <option value="Partial Close">Partial Close</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      );
      j = j + 10;
    }
    return ssow_content;
  }

  async editAssignment(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let dataForm = this.state.edit_assignment_form;
    let successUpdate = [];
    let updateASG = {};
    if(dataForm[0] !== null) {
      updateASG['Vendor_Code'] = dataForm[1];
      updateASG['Vendor_Code_Number'] = dataForm[2];
      updateASG['Vendor_Name'] = dataForm[0];
      updateASG['Vendor_Email'] = dataForm[3];
    }
    if(dataForm[4] !== null) {
      updateASG['Payment_Terms'] = dataForm[4];
    }
    updateASG['SSOW_List'] = [];
    for(let i = 5; i < 66; i=i+10) {
      if(dataForm[i] !== null) {
        let ssow_list = {
          "ssow_id" : dataForm[i],
          "sow_type" : this.state.data_assignment.SOW_Type,
          "ssow_description" : dataForm[i+2],
          "ssow_activity_number" : dataForm[i+1],
          "ssow_unit" : dataForm[i+3],
          "ssow_qty" : dataForm[i+4],
          "ssow_price" : dataForm[i+9],
          "ssow_total_price" : dataForm[i+9]*dataForm[i+4],
          "ssow_status" : [{
            "status" : dataForm[i+5],
            "status_update_date" : dateNow,
            "status_updater" : this.state.userEmail
          }]
        }
        updateASG['SSOW_List'].push(ssow_list);
      }
    }
    console.log('isi update', updateASG);
    let res = await this.patchDataToAPI('/asp_assignment_op/'+_id, updateASG, _etag);
    if(res !== undefined) {
      if(res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if(successUpdate.length !== 0){
      alert('Assignment has been successfully edited!');
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

  async handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.edit_assignment_form;
    dataForm[parseInt(index)] = value;
    if(index === "0") {
      const getDataASP = await this.getDataFromAPI('/vendor_data_non_page?where={"Name":"'+value+'"}');
      let dataForm = this.state.edit_assignment_form;
      dataForm[1] = getDataASP.data._items[0]._id;
      dataForm[2] = getDataASP.data._items[0].Vendor_Code;
      dataForm[3] = getDataASP.data._items[0].Email;
    }
    this.setState({edit_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.edit_assignment_form);
    });
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
                <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>Assignment Edit ({this.state.data_assignment.Assignment_No})</span>
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
                        <Input type="select" name="0" onChange={this.handleChangeForm}>
                          {this.state.asp_list.map((list, i) =>
                            <option value={list.Name} selected={list.Name === this.state.data_assignment.Vendor_Name} key={list._id}>{list.Name}</option>
                          )}
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px", display: "none"}}>
                        <Label>MR ID</Label>
                        <Input type="select" name="mr_id">
                          <option value="" disabled selected hidden>Select MR ID</option>
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>TOP</Label>
                        <Input type="select" name="4" onChange={this.handleChangeForm}>
                          <option value="100%" selected={this.state.data_assignment.Payment_Terms === "100%"}>100%</option>
                          <option value="30%-70%" selected={this.state.data_assignment.Payment_Terms === "30%-70%"}>30%-70%</option>
                          <option value="40%-60%" selected={this.state.data_assignment.Payment_Terms === "40%-60%"}>40%-60%</option>
                          <option value="50%-50%" selected={this.state.data_assignment.Payment_Terms === "50%-50%"}>50%-50%</option>
                          <option value="60%-40%" selected={this.state.data_assignment.Payment_Terms === "60%-40%"}>60%-40%</option>
                          <option value="70%-30%" selected={this.state.data_assignment.Payment_Terms === "70%-30%"}>70%-30%</option>
                          <option value="80%-20%" selected={this.state.data_assignment.Payment_Terms === "80%-20%"}>80%-20%</option>
                        </Input>
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
                </Form>
              </CardBody>
              <CardFooter>
                {(this.state.data_assignment.Current_Status === "ASP ASSIGNMENT CREATED" || this.state.data_assignment.Current_Status === "ASP ASSIGNMENT NEED REVISION" || this.state.data_assignment.Current_Status === "ASP ASSIGNMENT RE-SCHEDULE") && (
                  <Button color="primary" style={{float: "right"}} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.editAssignment}><i className="fa fa-edit" style={{marginRight: "8px"}}></i> Edit Assignment</Button>
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

export default connect(mapStateToProps)(AssignmentEdit);
