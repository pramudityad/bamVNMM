import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import debounce from 'lodash.debounce';

import {apiSendEmail} from '../../helper/asyncFunction';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class AssignmentCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_list : [],
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      redirect_sign : false,
      action_status : null,
      action_message : null,
      filter_list : new Array(1).fill(""),
      activity_selected : null,
      list_activity_selection : [],
      list_activity_selected : null,
      project_name : null,
      asp_list : [],
      create_assignment_form : new Array(69).fill(null),
      // creation_ssow_form : new Array(1).fill({}),
      list_cd_id : [],
      creation_ssow_form : [],
      list_tower : [],
      list_project : [],
      list_tower_selection : [],
      list_project_selection : [],
      tower_selected_id : null,
      project_selected : null,
      project_name_selected : null,
      preview_data_assignment : null,
      assignment_ssow_upload : null,
      can_edit_ssow : false,
      identifier_by : "cd_id",
      email_cpm: null,
    }

    this.handleFilterList = this.handleFilterList.bind(this);
    this.loadOptionsActivity = this.loadOptionsActivity.bind(this);
    this.loadOptionsSSOWID = this.loadOptionsSSOWID.bind(this);
    this.loadOptionsTowerID = this.loadOptionsTowerID.bind(this);
    this.loadOptionsActivityNumber = this.loadOptionsActivityNumber.bind(this);
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.postAssignment = this.postAssignment.bind(this);
    this.handleChangeProjectXL = this.handleChangeProjectXL.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
    this.previewData = this.previewData.bind(this);
    this.saveDataASG = this.saveDataASG.bind(this);
    this.handleChangeSSOWListReactSelect = this.handleChangeSSOWListReactSelect.bind(this);
    this.handleChangeSSOWList = this.handleChangeSSOWList.bind(this);
    this.handleChangeCanEditSSOW = this.handleChangeCanEditSSOW.bind(this);
    this.deleteSSOW = this.deleteSSOW.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.handleChangeIdentifierBy = this.handleChangeIdentifierBy.bind(this);
    this.loadOptionsCDID = this.loadOptionsCDID.bind(this);

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

  async getDataFromAPIEXEL(url){
    console.log("url", url);
    try {
      let respond = await axios.get(API_URL_XL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameXL,
          password: passwordXL
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

  async postDatatoAPINODE(url, data){
    try {
      let respond = await axios.post(API_URL_NODE +url, data, {
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
    dataForm[4] = dataActivity.Site_Info_Latitude_NE !== "" ? dataActivity.Site_Info_Latitude_NE : "0.0";
    dataForm[5] = dataActivity.Site_Info_Longitude_NE !== "" ? dataActivity.Site_Info_Longitude_NE : "0.0";
    dataForm[6] = dataActivity.Site_Info_SiteID_FE;
    dataForm[7] = dataActivity.Site_Info_SiteName_FE;
    dataForm[8] = dataActivity.Site_Info_Latitude_FE !== "" ? dataActivity.Site_Info_Latitude_FE : "0.0";
    dataForm[9] = dataActivity.Site_Info_Longitude_FE !== "" ? dataActivity.Site_Info_Longitude_FE : "0.0";
    dataForm[10] = dataActivity.CD_Info_SOW_Type;
    dataForm[11] = dataActivity.CD_Info_Network_Number;
    dataForm[12] = dataActivity.CD_Info_WBS;
    dataForm[13] = dataActivity.CD_Info_Activity_Code;
    this.setState({create_assignment_form : dataForm});
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
    this.getDataFromAPIEXEL('/vendor_data_non_page').then(res => {
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({asp_list : items});
      }
    })
  }

  componentDidMount() {
    document.title = 'Assignment Creation | BAM';
    // this.getDataTower();
    this.getDataProject();
    this.loadOptionsASP();
  }

  getDataTower(){
    this.getDataFromAPIEXEL('/tower_site_sorted_non_page?projection={"tower_id" : 1}').then( resTower => {
      if(resTower.data !== undefined){
        this.setState({ list_tower : resTower.data._items }, () => {
          this.filterDataTower("");
        })
      }
    })
  }

  getDataProject(){
    this.getDataFromAPIEXEL('/project_sorted_non_page').then( resProject => {
      if(resProject.data !== undefined){
        this.setState({ list_project : resProject.data._items }, () => {
          this.filterDataProject("");
        })
      }
    })
  }

  async previewData(){
    const dataXLS = [
      ["id","project","sow_type", "created_based", "vendor_code","vendor_name","payment_terms","identifier"],
      ["new", this.state.project_name_selected, this.state.create_assignment_form[16], this.state.identifier_by, this.state.create_assignment_form[67], this.state.create_assignment_form[66],  this.state.create_assignment_form[15], this.state.tower_selected_id]
    ];
    const dataXLSASG = {
      "includeSsow" : this.state.can_edit_ssow === true ? true : false,
      "data" : dataXLS
    }
    const respondCheckingASG = await this.postDatatoAPINODE('/aspAssignment/aspAssignmentByActivity', dataXLSASG);
    if(respondCheckingASG.data !== undefined && respondCheckingASG.status >= 200 && respondCheckingASG.status <= 300 ) {
      let dataChecking = respondCheckingASG.data.data[0];
      if(dataChecking.operation === "INVALID"){
        this.setState({ action_status : 'failed', action_message : dataChecking.activity_status });
      }else{
        this.setState({assignment_ssow_upload : dataChecking, creation_ssow_form : []}, () => {
          if(dataChecking.SSOW_List !== undefined && dataChecking.SSOW_List.length !== 0){
            this.setState({creation_ssow_form : dataChecking.SSOW_List})
            this.setState({action_status : null, action_message : null})
          }else{
            this.setState({creation_ssow_form : [{}]})
          }
        });
      }
    } else{
      if(respondCheckingASG.response !== undefined && respondCheckingASG.response.data !== undefined && respondCheckingASG.response.data.error !== undefined){
        if(respondCheckingASG.response.data.error.message !== undefined){
          this.setState({ action_status: 'failed', action_message: respondCheckingASG.response.data.error.message });
        }else{
          this.setState({ action_status: 'failed', action_message: respondCheckingASG.response.data.error });
        }
      }else{
        this.setState({ action_status: 'failed' });
      }
    }
  }

  handleChangeCanEdit(){
    this.setState(prevState => ({ can_edit_ssow : !prevState.can_edit_ssow }));
  }

  async saveDataASG(){
    let dataXLS = [
      ["id","project","sow_type", "created_based", "vendor_code","vendor_name", "payment_terms","identifier"],
      ["new", this.state.project_name_selected, this.state.create_assignment_form[16], this.state.identifier_by, this.state.create_assignment_form[67], this.state.create_assignment_form[66], this.state.create_assignment_form[15], this.state.tower_selected_id]
    ];
    const listSSOW = this.state.creation_ssow_form;
    listSSOW.filter(e =>e.sow_type !== undefined).map((e,idx) => dataXLS[0].push("ssow_"+(e.sow_type.toLowerCase())+"_id_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_activity_number_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_unit_"+(idx+1).toString(), "ssow_"+(e.sow_type.toLowerCase())+"_quantity_"+(idx+1).toString() ));
    listSSOW.filter(e =>e.sow_type !== undefined).map(e => dataXLS[1].push(e.ssow_id, e.ssow_activity_number, e.ssow_unit, e.ssow_qty));
    const dataXLSASG = {
      "includeSsow" : this.state.can_edit_ssow === true ? true : false,
      "data" : dataXLS
    }
    const respondCheckingASG = await this.postDatatoAPINODE('/aspAssignment/aspAssignmentByActivity', dataXLSASG);
    if(respondCheckingASG.data !== undefined && respondCheckingASG.status >= 200 && respondCheckingASG.status <= 300 ) {
      let dataChecking = respondCheckingASG.data.data;
      if(dataChecking[0].operation === "INVALID"){
        this.setState({ action_status : 'failed', action_message : dataChecking[0].activity_status });
      }else{
        const respondSaveASG = await this.postDatatoAPINODE('/aspAssignment/createAspAssign', {"includeSsow" : this.state.can_edit_ssow === true ? true : false, "data" : dataChecking});
        if(respondSaveASG.data !== undefined && respondSaveASG.status >= 200 && respondSaveASG.status <= 300 ) {
          if(this.state.can_edit_ssow === true){
            const response = respondSaveASG.data.aspDocsp[0];
            let cpm_email = this.state.email_cpm;
            let linkImp = "https://bam-id.e-dpm.com/assignment-detail/"+response._id;
            const bodyEmail = "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been created and need approval because the assingment not using list SSOW from the mapping, <br/><br/><i>Site</i>: <b>"+response.Site_ID+"</b> <br/><i>Project</i>: <b>"+response.Project+"</b><br/><i>Assignment</i>: <b>"+response.Assignment_No+"</b><br/><br/>is created by "+this.state.userEmail+".</span><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='"+linkImp+"'>"+linkImp+"</a>";
            let dataEmail = {
              // "to": cpm_email+'; aminuddin.fauzan@ericsson.com',
              "to": cpm_email+' ;',
              "subject":"[Assignment Need Approval] Assignment "+response.Assignment_No,
              "body": bodyEmail
            }
            // console.log(dataEmail)
            const sendEmail = await apiSendEmail(dataEmail);
          }
          this.setState({ action_status : 'success' });
        } else{
          if(respondSaveASG.response !== undefined && respondSaveASG.response.data !== undefined && respondSaveASG.response.data.error !== undefined){
            if(respondSaveASG.response.data.error.message !== undefined){
              this.setState({ action_status: 'failed', action_message: JSON.stringify(respondSaveASG.response.data.error.message) });
            }else{
              this.setState({ action_status: 'failed', action_message: respondSaveASG.response.data.error });
            }
          }else{
            this.setState({ action_status: 'failed' });
          }
        }
      }
    } else{
      if(respondCheckingASG.response !== undefined && respondCheckingASG.response.data !== undefined && respondCheckingASG.response.data.error !== undefined){
        if(respondCheckingASG.response.data.error.message !== undefined){
          this.setState({ action_status: 'failed', action_message: respondCheckingASG.response.data.error.message });
        }else{
          this.setState({ action_status: 'failed', action_message: respondCheckingASG.response.data.error });
        }
      }else{
        this.setState({ action_status: 'failed' });
      }
    }
  }

  filterDataTower = (inputValue) => {
    const list = [];
    this.state.list_tower.map(i =>
        list.push({'label' : i.tower_id, 'value' : i.tower_id})
    )
    this.setState({list_tower_selection : list})
    if(inputValue.length === 0){
      return list;
    }else{
      return this.state.list_tower_selection.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  };

  filterDataProject = (inputValue) => {
    const list = [];
    this.state.list_project.map(i =>
        list.push({'label' : i.Project, 'value' : i.Project, 'id': i._id})
    )
    this.setState({list_project_selection : list})
    if(inputValue.length === 0){
      return list;
    }else{
      return this.state.list_project_selection.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  };

  handleChangeProjectXL(e){
    let obj = this.state.list_project.find((a) => a.Project === e.value);
    let email = obj.Email_CPM_Name;
    this.setState({project_selected : e.value, project_name_selected : e.value, email_cpm: email});
    return e;
  }

  handleChangeTowerXL(e){
    const cd_id_number = e.value;
    this.setState({tower_selected_id : cd_id_number});
    if(this.state.identifier_by === "cd_id"){
      let findCDID = this.state.list_cd_id.find(e => e.WP_ID === cd_id_number.trim());
      if(findCDID !== undefined){
        this.setState({project_selected : findCDID.CD_Info_Project, project_name_selected : findCDID.CD_Info_Project_Name });
        let obj = this.state.list_project.find((a) => a.Project === findCDID.CD_Info_Project_Name);
        let email = null;
        if(obj !== undefined){
          email = obj.Email_CPM_Name;
          this.setState({email_cpm: email})
        }
      }
    }
    return e
  }

  getAssignmentID(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100).toString().padStart(4, '0');
    const asgID = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString().padStart(2, '0')+dateNow.getDate().toString().padStart(2, '0')+dataRandom.toString();
    return asgID;
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

  }

  async handleChangeForm(e) {
    // const name = e.target.value;
    const index = e.target.name;
    const code = e.target.key;
    // const value = e.target.value;
    let dataForm = this.state.create_assignment_form;
    const value = e.target.value;
    const indexSel = e.target.selectedIndex;
    const name = e.target[indexSel].text;
    dataForm[parseInt(index)] = value;
    if(index === "14") {
      const getDataASP = this.state.asp_list.find(e => e.Vendor_Code === value);
      let dataForm = this.state.create_assignment_form;
      dataForm[66] = name;
      dataForm[67] = value;
      dataForm[68] = getDataASP !== undefined ? getDataASP.Email : "";
    }
    this.setState({create_assignment_form : dataForm}, () => {
      console.log("Assignment Form", this.state.create_assignment_form);
    });
  }

  async loadOptionsTowerID(inputValue) {
    if(!inputValue || inputValue.length < 3 ) {
      return [];
    } else {
      let tower_id_list = [];
      // const getSSOWID = await this.getDataFromAPIEXEL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getTowerID = await this.getDataFromAPIEXEL('/tower_site_sorted_non_page?where={"tower_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getTowerID !== undefined && getTowerID.data !== undefined) {
        getTowerID.data._items.map(tower =>
          tower_id_list.push({'label' : tower.tower_id, 'value' : tower.tower_id}))
      }
      return tower_id_list;
    }
  }

  async loadOptionsCDID(inputValue) {
    if(!inputValue) {
      return [];
    } else {
      let wp_id_list = [];
      // const getSSOWID = await this.getDataFromAPIEXEL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getWPID = await this.getDataFromAPIEXEL('/custdel_sorted_non_page?where={"WP_ID":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getWPID !== undefined && getWPID.data !== undefined) {
        this.setState({list_cd_id : getWPID.data._items});
        getWPID.data._items.map(wp =>
          wp_id_list.push({'value' : wp.WP_ID , 'label' : wp.WP_ID +" ( "+wp.WP_Name+" )", 'project' : wp.CD_Info_Project_Name }))
      }
      // console.log('project_name in arr ', wp_id_list[0])

      this.setState({project_name : wp_id_list[0].project})
      // console.log('project_name ', this.state.project_name)
      return wp_id_list;
    }
  }

  async loadOptionsSSOWID(inputValue) {
    if(!inputValue || inputValue.length < 2 ) {
      return [];
    } else {
      let ssow_id_list = [];
      // const getSSOWID = await this.getDataFromAPIEXEL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getSSOWID = await this.getDataFromAPIEXEL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getSSOWID !== undefined && getSSOWID.data !== undefined) {
        getSSOWID.data._items.map(ssow =>
          ssow_id_list.push({'label' :  "("+ssow.sow_type+") "+ssow.ssow_id, 'value' : ssow.ssow_id, 'sow_type' : ssow.sow_type, 'ssow_unit' : ssow.ssow_type, 'description' : ssow.description}))
      }
      return ssow_id_list;
    }
  }

  async loadOptionsActivityNumber(inputValue) {
    if(!inputValue || inputValue.length < 2) {
      return [];
    } else {
      let act_number_list = [];
      const getActNumber = await this.getDataFromAPIEXEL('/ssow_activity_number_sorted_nonpage?where={"activity_number":{"$regex":"'+inputValue+'", "$options":"i"}}');
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

  handleChangeSSOWList(e){
    let dataSSOW = this.state.creation_ssow_form;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSSOW[parseInt(idx)][field] = value;
    this.setState({creation_ssow_form : dataSSOW})
  }

  handleChangeSSOWListReactSelect = async (newValue, e) =>{
    let dataSSOW = this.state.creation_ssow_form;
    let idxField = e.name.split(" /// ")
    let idx = idxField[0];
    let field = idxField[1];
    if(field === "ssow_id"){
      dataSSOW[parseInt(idx)]['sow_type'] = newValue.sow_type;
      dataSSOW[parseInt(idx)]['ssow_description'] = newValue.description;
      dataSSOW[parseInt(idx)]['ssow_unit'] = newValue.ssow_unit;
    }
    dataSSOW[parseInt(idx)][field] = newValue.value;
    this.setState({creation_ssow_form : dataSSOW});
  }

  deleteSSOW(e){
    let index = e.currentTarget.value;
    let dataSSOW = this.state.creation_ssow_form;
    const dataSSOWDel = [];
    if(index !== undefined){
      dataSSOW.splice(parseInt(index), 1);
      this.setState({creation_ssow_form : []}, () => {
        this.setState({creation_ssow_form : dataSSOW});
      });
    }
  }

  addSSOW(){
    let dataSSOW = this.state.creation_ssow_form;
    dataSSOW.push({});
    this.setState({creation_ssow_form : dataSSOW});
  }

  handleChangeIdentifierBy(e){
    const value = e.target.value;
    this.setState({identifier_by : value});
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    if(this.state.redirect_sign !== false) {
      return (<Redirect to={'/assignment-list/'} />);
    }
    return (
      <div className="animated fadeIn">
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>Assignment Creation</span>
              </CardHeader>
              <CardBody>
                <Form>
                  <h5>General Info</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>
                          <select type="select" onChange={this.handleChangeIdentifierBy} value={this.state.identifier_by}>
                            <option value="cd_id">CD ID</option>
                            <option value="tower_id">Tower ID</option>
                          </select>
                        </Label>
                        {this.state.identifier_by === "tower_id" ? (
                          <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptionsTowerID}
                            defaultOptions
                            onChange={this.handleChangeTowerXL}
                          />
                        ) : (
                          <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptionsCDID}
                            defaultOptions
                            onChange={this.handleChangeTowerXL}
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SOW Type</Label>
                        <Input type="select" name="16" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select SOW</option>
                          <option value="RBS">RBS</option>
                          <option value="TRM">TRM</option>
                          <option value="NDO">NDO</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  {this.state.identifier_by === "tower_id" ? (
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Name</Label>
                        <Select
                          cacheOptions
                          options={this.state.list_project_selection}
                          onChange={this.handleChangeProjectXL}
                        />
                      </FormGroup>
                    </Col>
                  ) : (
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Name</Label>
                        <Input value={this.state.project_name_selected} readOnly/>
                      </FormGroup>
                    </Col>
                  )}
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP</Label>
                        <Input type="select" name="14" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select ASP</option>
                          {this.state.asp_list.map((list, i) =>
                            <option value={list.Vendor_Code}>{list.Name}</option>
                          )}
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>TOP</Label>
                        <Input type="select" name="15" onChange={this.handleChangeForm} value={this.state.create_assignment_form[15] === null ? "" : this.state.create_assignment_form[15]}>
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
                      </FormGroup>
                    </Col>
                  </Row>
                  {(this.state.assignment_ssow_upload !== null && this.state.assignment_ssow_upload !== undefined && this.state.identifier_by === "Tower ID") && (
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>CD ID</Label>
                        <Input type="text" name="po_line_item" value={this.state.assignment_ssow_upload.cust_del !== undefined ? this.state.assignment_ssow_upload.cust_del.map(e => e.cd_id+ "; ") : ""} readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  )}
                  <span>Please click check button for checking the form before save it and for checking availibilty of default SSOW</span>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <Col md="6">
                      <div style={{marginBottom : '10px'}}>
                        <Button color="primary" size="sm" onClick={this.previewData}><i className="fa fa-eye" style={{marginRight: "8px"}} size="sm"></i> Check</Button>
                      </div>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>SSOW List</h5>
                  <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                    <div style={{marginBottom : '10px'}}>
                      <Checkbox name="editable" checked={this.state.can_edit_ssow} onChange={this.handleChangeCanEditSSOW} />
                      <span>Editable</span>
                    </div>
                  </Row>
                  {this.state.creation_ssow_form.map((ssow, idx) =>
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
                      <Col md="5" style={{margin:"0", padding:"4px"}}>
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
                          <Input type="text" name={idx + " /// ssow_unit"} value={ssow.ssow_unit} onChange={this.handleChangeSSOWList} disabled={!this.state.can_edit_ssow} />
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Quantity</Label>
                          <div style={{display: "flex"}}>
                            <Input type="number" name={idx + " /// ssow_qty"} onChange={this.handleChangeSSOWList} value={ssow.ssow_qty} disabled={!this.state.can_edit_ssow}/>
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
                  {this.state.can_edit_ssow && (
                    <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                      <div style={{display : 'flex'}}>
                        {(this.state.can_edit_ssow === true) && (
                          <Button color="primary" size="sm" onClick={this.addSSOW}>
                            <i className="fa fa-plus">&nbsp;</i> SSOW
                          </Button>
                        )}
                      </div>
                    </Row>
                  )}
                </Form>
                <span style={{color : 'red'}}>Editable SSOW Need Approval from the authorized on the Assignment has been created</span>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="success" style={{float: "right"}} onClick={this.saveDataASG}><i className="fa fa-plus" style={{marginRight: "8px"}}></i> Save</Button>
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
