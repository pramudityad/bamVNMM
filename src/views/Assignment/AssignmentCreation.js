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
      create_assignment_form : new Array(59).fill(null),
      ssow_description_list : new Array(7).fill(null),
    }

    this.changeSSOW = this.changeSSOW.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.loadOptionsActivity = this.loadOptionsActivity.bind(this);
    this.loadOptionsSSOWID = this.loadOptionsSSOWID.bind(this);
    this.loadOptionsActivityNumber = this.loadOptionsActivityNumber.bind(this);
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleChangeFormAsyncSelect = this.handleChangeFormAsyncSelect.bind(this);
    this.postAssignment = this.postAssignment.bind(this);
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
    dataForm[3] = dataActivity.Site_Info_SiteName_NE;
    dataForm[4] = dataActivity.Site_Info_Latitude_NE;
    dataForm[5] = dataActivity.Site_Info_Longitude_NE;
    dataForm[6] = dataActivity.Site_Info_SiteID_FE;
    dataForm[7] = dataActivity.Site_Info_SiteName_FE;
    dataForm[8] = dataActivity.Site_Info_Latitude_FE;
    dataForm[9] = dataActivity.Site_Info_Longitude_FE;
    dataForm[10] = dataActivity.CD_Info_SOW_Type;
    dataForm[11] = dataActivity.CD_Info_Network_Number;
    dataForm[12] = dataActivity.CD_Info_WBS;
    dataForm[13] = dataActivity.CD_Info_Activity_Code;
    this.setState({create_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.create_assignment_form);
    });
    return newValue;
  };

  handleChangeFormAsyncSelect = async (newValue, e) => {
    let dataForm = this.state.create_assignment_form;
    dataForm[parseInt(e.name)] = newValue.value;
    this.setState({create_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.create_assignment_form);
    });
    if(e.name === "17") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[0] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[19] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "23") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[1] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[25] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "29") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[2] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[31] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "35") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[3] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[37] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "41") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[4] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[43] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "47") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[5] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[49] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "53") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataDescription = this.state.ssow_description_list;
      dataDescription[6] = getDescription.data._items[0].description;
      this.setState({ssow_description_list : dataDescription}, () => {
        console.log("Description List", this.state.ssow_description_list);
      });
      let dataForm = this.state.create_assignment_form;
      dataForm[55] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    }
  }

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

  async loadOptionsSSOWID(inputValue) {
    if(!inputValue) {
      return [];
    } else {
      let ssow_id_list = [];
      const getSSOWID = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.ssowType+'"}');
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
      "Plant" : "wtf is plant?",
      "NW" : dataForm[11],
      "NW_Activity" : "NW Activity?",
      "Requisitioner" : "what is this?",
      "SOW_Type" : dataForm[10],
      "Site_ID" : dataForm[2],
      "Site_Name" : dataForm[3],
      "Site_Longitude" : dataForm[5],
      "Site_Latitude" : dataForm[4],
      "Site_FE_ID" : dataForm[6],
      "Site_FE_Name" : dataForm[7],
      "Site_FE_Longitude" : dataForm[9],
      "Site_FE_Latitude" : dataForm[8],
      "Vendor_Code_Number" : dataForm[14],
      "Vendor_Name" : dataForm[14],
      "Vendor_Email" : dataForm[14],
      "Payment_Terms" : dataForm[15],
      "SH_ID" : "shid?",
      "Assignment_Creation_Date" : dateNow,
      "Value_Assignment" : "11.11",
      "Requestor" : this.state.userId,
      "Payment_Term_Ratio" : "11.11",
      "SSOW_List" : [
        {
          "ssow_id" : dataForm[17],
          "ssow_description" : dataForm[19],
          "ssow_activity_number" : dataForm[18],
          "ssow_unit" : dataForm[20],
          "ssow_qty" : dataForm[21],
          "ssow_status" : [
            {
              "status" : dataForm[22],
              "status_update_date" : dateNow,
              "status_updater" : this.state.userId
            }
          ]
        }
      ],
      "Current_Status" : dataForm[22],
      "ASP_Assignment_Status" : null,
      "deleted" : null,
      "created_by" : this.state.userId,
      "updated_by" : this.state.userId,
      "created_on" : dateNow,
      "updated_on" : dateNow
    }
    console.log('to be posted', JSON.stringify(assignment_data));
    const respondSaveAssignment = await this.postDatatoAPI('/asp_assignment_op', assignment_data);
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
                        <Input type="text" name="project_name" readOnly value={this.state.project_name !== null ? this.state.project_name : ""} />
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
                        <Input type="text" name="site_id_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_SiteID_FE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_SiteName_FE : ""} />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_fe" readOnly value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.Site_Info_Latitude_FE : ""} />
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
                        <Input type="select" name="14" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select ASP</option>
                          {this.state.asp_list.map((list, i) => 
                            <option value={list.Name} key={list._id}>{list.Name}</option>
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
                        <Input type="select" name="15" onChange={this.handleChangeForm}>
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
                        <Input type="select" name="16" onChange={e => {this.changeSSOW(e); this.handleChangeForm(e)}}>
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
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="17"
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
                          name="18"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="19" rows="1" value={this.state.ssow_description_list[0]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="20" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="21" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="22" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="23"
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
                          name="24"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="25" rows="1" value={this.state.ssow_description_list[1]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="26" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="27" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="28" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="29"
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
                          name="30"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="31" rows="1" value={this.state.ssow_description_list[2]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="32" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="33" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="34" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="35"
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
                          name="36"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="37" rows="1" value={this.state.ssow_description_list[3]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="38" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="39" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="40" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="41"
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
                          name="42"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="43" rows="1" value={this.state.ssow_description_list[4]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="44" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="45" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="46" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="47"
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
                          name="48"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="49" rows="1" value={this.state.ssow_description_list[5]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="50" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="51" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="52" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsSSOWID}
                          defaultOptions
                          onChange={this.handleChangeFormAsyncSelect}
                          name="53"
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
                          name="54"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="55" rows="1" value={this.state.ssow_description_list[6]} readOnly />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="56" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="1" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="57" onChange={this.handleChangeForm} />
                      </FormGroup>
                    </Col>
                    <Col md="2" style={{margin:"0", padding:"4px"}}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="58" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Close">Close</option>
                          <option value="Open">Open</option>
                          <option value="Partial Close">Partial Close</option> 
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
                <Button type="submit" color="primary" style={{float: "right"}} disabled={this.state.list_activity_selected === null} onClick={this.postAssignment}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i> Create Assignment</Button>
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