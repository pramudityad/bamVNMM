import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';

const API_URL_tsel = 'http://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

class AssignmentCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_list : [],
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      ssowType : null,
      filter_list : new Array(1).fill(""),
      activity_selected : null,
      list_activity_selection : [],
      list_activity_selected : null,
      project_name : null,
      asp_list : [],
      create_assignment_form : new Array(9).fill(null),
    }

    this.changeSSOW = this.changeSSOW.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.loadOptionsActivity = this.loadOptionsActivity.bind(this);
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
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

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if(value !== "" && value.length === 0) {
      value = "";
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter, activePage: 1}, () => {
      this.onChangeDebounced(e);
    })
  }

  handleChangeActivity = async (newValue) => {
    let dataActivity = this.state.list_activity_selection.find(e => e._id === newValue.value);
    this.setState({activity_selected : newValue.value, list_activity_selected : dataActivity});
    const getProject = await this.getDataFromAPI('/project_sorted/'+dataActivity.CD_Info_Project);
    this.setState({project_name : getProject.data.Project});
    let dataForm = this.state.create_assignment_form;
    dataForm[0] = dataActivity.WP_ID;
    dataForm[1] = getProject.data.Project;
    dataForm[2] = dataActivity.Site_Info_SiteID_NE;
    this.setState({create_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.create_assignment_form);
    });
    return newValue;
  };

  async loadOptionsActivity(inputValue) {
    if(!inputValue) {
      this.setState({list_activity_selection : []});
      return [];
    } else {
      let activity_list = [];
      const getActivity = await this.getDataFromAPI('/custdel_sorted_non_page?where={"WP_ID":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getActivity !== undefined && getActivity.data !== undefined) {
        this.setState({list_activity_selection : getActivity.data._items}, () => 
        getActivity.data._items.map(activity => 
          activity_list.push({'label' : activity.WP_ID !== undefined ? activity.WP_ID +" ("+activity.WP_Name +")" : null, 'value' :activity._id})))
      }
      return activity_list;
    }
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

  changeSSOW(e) {
    this.setState({ssowType: e.target.value});
  }

  componentDidMount() {
    document.title = 'Assignment Creation | BAM';
    this.loadOptionsASP();
  }

  async postDatatoAPI(url, data){
    try {
      let respond = await axios.post(API_URL_tsel+url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: username_tsel,
          password: password_tsel
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async postAssignment(){
    const dataForm = this.state.create_assignment_form;
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const assignment_data = {
      	"Assignment_No" : "030797",
        "Account_Name" : "TSEL",
        "CD_ID" : dataForm[0],
        "Project" : dataForm[1],
        "SOW_Type" : dataForm[4],
        "Site_ID" : "",
        "Site_Name" : "",
        "Site_Longitude" : "",
        "Site_Latitude" : "",
        "Site_FE_ID" : "",
        "Site_FE_Name" : "",
        "Site_FE_Longitude" : "",
        "Site_FE_Latitude" : "",
        "created_by" : this.state.userId,
        "updated_by" : this.state.userId,
        "created_on" : dateNow,
        "updated_on" : dateNow
      }
      const respondSaveAssignment = await this.postDatatoAPI('/assignment_data_op', assignment_data);
      if(respondSaveAssignment.data !== undefined && respondSaveAssignment.status >= 200 && respondSaveAssignment.status <= 300 ){
        console.log("Assignment Successfully Created");
      }
  }

  handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.create_assignment_form;
    dataForm[parseInt(index)] = value;
    this.setState({create_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.create_assignment_form);
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>Assignment Creation</span>
              </CardHeader>
              <CardBody>
                <Form>
                  <h5>ACTIVITY</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WP ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsActivity}
                          defaultOptions
                          onChange={this.handleChangeActivity}                
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>PROJECT</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Name</Label>
                        <Input type="text" name="0" readOnly value={this.state.project_name !== null ? this.state.project_name : ""} />
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
                        <Input type="text" name="site_id_ne" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_SiteID_NE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_ne" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_SiteName_NE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_ne" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Latitude_NE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Longitude</Label>
                        <Input type="text" name="site_long_ne" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Longitude_NE : ""} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site ID</Label>
                        <Input type="text" name="site_id_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Longitude_FE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Longitude_FE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Longitude_FE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Longitude</Label>
                        <Input type="text" name="site_long_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Longitude_FE : ""} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>SOW / CONFIG</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SOW / Config</Label>
                        <Input type="text" name="sow_config" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.CD_Info_SOW_Type : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>NN Service</Label>
                        <Input type="text" name="nn_service" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.CD_Info_Network_Number : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WBS</Label>
                        <Input type="text" name="wbs" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.CD_Info_WBS : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Act Code</Label>
                        <Input type="text" name="act_code" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.CD_Info_Activity_Code : ""} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>PR/PO INFORMATION</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP</Label>
                        <Input type="select" name="asp">
                          <option value="" disabled selected hidden>Select ASP</option>
                          {this.state.asp_list.map((list, i) => 
                            <option value={list.Name} key={list._id}>{list.Name}</option>)}
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
                        <Input type="select" name="top">
                          <option value="" disabled selected hidden>Select TOP</option>
                          <option value="100%">100%</option>
                          <option value="30%-70%">30%-70%</option>
                          <option value="40%-60%">40%-60%</option>
                          <option value="50%-50%">50%-50%</option>
                          <option value="60%-40%">60%-40%</option>
                          <option value="70%-30%">70%-30%</option>
                          <option value="80%-20%">80%-20%</option>
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SSOW Type</Label>
                        <Input type="select" name="ssow_type" onChange={this.changeSSOW}>
                          <option value="" disabled selected hidden>Select SSOW Type</option>
                          <option value="BSC">BSC</option>
                          <option value="DWDM">DWDM</option>
                          <option value="NDO">NDO</option>
                          <option value="RBS">RBS</option>
                          <option value="SACME">SACME</option>
                          <option value="Survey">Survey</option>
                          <option value="SV">SV</option>
                          <option value="TRM">TRM</option>
                        </Input>
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
                        <Input type="text" name="po" readOnly />
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
                  <h5 style={{marginTop: "16px"}}>SSOW {this.state.ssowType}</h5>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_1">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_1">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_1" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_1" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_1">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_2">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_2">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_2" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_2" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_2" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_2">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_3">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_3">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_3" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_3" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_3" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_3">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_4">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_4">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_4" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_4" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_4" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_4">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_5">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_5">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_5" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_5" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_5" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_5">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_6">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_6">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_6" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_6" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_6" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_6">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_7">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_7">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_7" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_7" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_7" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_7">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
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
                <Button type="submit" color="primary" style={{float: "right"}}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i> Create Assignment</Button>
              </CardFooter>
            </Card>
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

export default connect(mapStateToProps)(AssignmentCreation);