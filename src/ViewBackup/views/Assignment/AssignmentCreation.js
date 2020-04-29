import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import debounce from 'lodash.debounce';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

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
      creation_ssow_form : new Array(7).fill({}),
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
    }

    this.handleFilterList = this.handleFilterList.bind(this);
    this.loadOptionsActivity = this.loadOptionsActivity.bind(this);
    this.loadOptionsSSOWID = this.loadOptionsSSOWID.bind(this);
    this.loadOptionsActivityNumber = this.loadOptionsActivityNumber.bind(this);
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleChangeFormAsyncSelect = this.handleChangeFormAsyncSelect.bind(this);
    this.postAssignment = this.postAssignment.bind(this);
    this.handleChangeProjectXL = this.handleChangeProjectXL.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
    this.previewData = this.previewData.bind(this);
    this.saveDataASG = this.saveDataASG.bind(this);
    this.handleChangeSSOWListReactSelect = this.handleChangeSSOWListReactSelect.bind(this);
    this.handleChangeSSOWList = this.handleChangeSSOWList.bind(this);

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

  async getDatafromAPIXL(url){
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
      let dataForm = this.state.create_assignment_form;
      dataForm[19] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "23") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[25] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "29") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[31] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "35") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[37] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "41") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[43] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "47") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[49] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "53") {
      const getDescription = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[55] = getDescription.data._items[0].description;
      this.setState({create_assignment_form : dataForm}, () => {
        console.log("Assignment Form", this.state.create_assignment_form);
      });
    } else if(e.name === "18") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[20] = getPriceUnit.data._items[0].ssow_type;
      dataForm[59] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
    } else if(e.name === "24") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[26] = getPriceUnit.data._items[0].ssow_type !== null ? getPriceUnit.data._items[0].ssow_type : "act";
      dataForm[60] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
    } else if(e.name === "30") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[32] = getPriceUnit.data._items[0].ssow_type;
      dataForm[61] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
    } else if(e.name === "36") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[38] = getPriceUnit.data._items[0].ssow_type;
      dataForm[62] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
    } else if(e.name === "42") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[44] = getPriceUnit.data._items[0].ssow_type;
      dataForm[63] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
    } else if(e.name === "48") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[50] = getPriceUnit.data._items[0].ssow_type;
      dataForm[64] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
    } else if(e.name === "54") {
      const getPriceUnit = await this.getDataFromAPI('/ssow_activity_number_op?where={"activity_number":"'+newValue.value+'"}');
      let dataForm = this.state.create_assignment_form;
      dataForm[56] = getPriceUnit.data._items[0].ssow_type;
      dataForm[65] = getPriceUnit.data._items[0].price !== null ? getPriceUnit.data._items[0].price : "0.0";
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
      // const getSSOWID = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getSSOWID = await this.getDataFromAPI('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
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
    this.getDatafromAPIXL('/vendor_data_non_page').then(res => {
      console.log("ASP List", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({asp_list : items});
      }
    })
  }

  componentDidMount() {
    document.title = 'Assignment Creation | BAM';
    this.getDataTower();
    this.getDataProject();
    this.loadOptionsASP();
  }

  getDataTower(){
    this.getDatafromAPIXL('/tower_site_sorted_non_page?projection={"tower_id" : 1}').then( resTower => {
      if(resTower.data !== undefined){
        this.setState({ list_tower : resTower.data._items }, () => {
          this.filterDataTower("");
        })
      }
    })
  }

  getDataProject(){
    this.getDatafromAPIXL('/project_sorted_non_page').then( resProject => {
      if(resProject.data !== undefined){
        this.setState({ list_project : resProject.data._items }, () => {
          this.filterDataProject("");
        })
      }
    })
  }

  async previewData(){
    const dataXLS = [
      ["id","project","sow_type","vendor_code","vendor_name","identifier","ssow_rbs_id_1","ssow_rbs_activity_number_1","ssow_rbs_unit_1","ssow_rbs_quantity_1","ssow_rbs_id_2","ssow_rbs_activity_number_2","ssow_rbs_unit_2","ssow_rbs_quantity_2","ssow_rbs_id_3","ssow_rbs_activity_number_3","ssow_rbs_unit_3","ssow_rbs_quantity_3","ssow_rbs_id_4","ssow_rbs_activity_number_4","ssow_rbs_unit_4","ssow_rbs_quantity_4","ssow_rbs_id_5","ssow_rbs_activity_number_5","ssow_rbs_unit_5","ssow_rbs_quantity_5","ssow_rbs_id_6","ssow_rbs_activity_number_6","ssow_rbs_unit_6","ssow_rbs_quantity_6","ssow_rbs_id_7","ssow_rbs_activity_number_7","ssow_rbs_unit_7","ssow_rbs_quantity_7"],
      ["new", this.state.project_name_selected, this.state.create_assignment_form[16], this.state.create_assignment_form[67], this.state.create_assignment_form[66], this.state.tower_selected_id]
    ];
    const respondCheckingASG = await this.postDatatoAPINODE('/aspAssignment/aspAssignmentByActivity', {"data" : dataXLS});
    if(respondCheckingASG.data !== undefined && respondCheckingASG.status >= 200 && respondCheckingASG.status <= 300 ) {
      let dataChecking = respondCheckingASG.data.data[0];
      if(dataChecking.operation === "INVALID"){
        this.setState({ action_status : 'failed', action_message : dataChecking.activity_status });
      }else{
        this.setState({assignment_ssow_upload : dataChecking});
      }

    } else{
      this.setState({ action_status : 'failed' });
    }
  }

  handleChangeCanEdit(){
    this.setState(prevState => ({ can_edit_ssow : !prevState.can_edit_ssow }));
  }

  handleChangeSSOWList(e){

  }

  handleChangeSSOWListReactSelect = async (newValue, e) =>{
    let dataSSOW = this.state.assignment_ssow_upload;
    let idxField = e.name.split(" /// ")
    let idx = idxField[0];
    let field = idxField[1];
    dataSSOW.SSOW_List[parseInt(idx)][field] = newValue.value;
    console.log("index plus field", parseInt(idx) , field);
  }

  async saveDataASG(){
    const dataXLS = [
      ["id","project","sow_type","vendor_code","vendor_name","identifier","ssow_rbs_id_1","ssow_rbs_activity_number_1","ssow_rbs_unit_1","ssow_rbs_quantity_1","ssow_rbs_id_2","ssow_rbs_activity_number_2","ssow_rbs_unit_2","ssow_rbs_quantity_2","ssow_rbs_id_3","ssow_rbs_activity_number_3","ssow_rbs_unit_3","ssow_rbs_quantity_3","ssow_rbs_id_4","ssow_rbs_activity_number_4","ssow_rbs_unit_4","ssow_rbs_quantity_4","ssow_rbs_id_5","ssow_rbs_activity_number_5","ssow_rbs_unit_5","ssow_rbs_quantity_5","ssow_rbs_id_6","ssow_rbs_activity_number_6","ssow_rbs_unit_6","ssow_rbs_quantity_6","ssow_rbs_id_7","ssow_rbs_activity_number_7","ssow_rbs_unit_7","ssow_rbs_quantity_7"],
      ["new", this.state.project_name_selected, this.state.create_assignment_form[16], this.state.create_assignment_form[67], this.state.create_assignment_form[66], this.state.tower_selected_id]
    ];
    const respondCheckingASG = await this.postDatatoAPINODE('/aspAssignment/aspAssignmentByActivity', {"data" : dataXLS});
    if(respondCheckingASG.data !== undefined && respondCheckingASG.status >= 200 && respondCheckingASG.status <= 300 ) {
      let dataChecking = respondCheckingASG.data.data[0];
      if(dataChecking.operation === "INVALID"){
        this.setState({ action_status : 'failed', action_message : dataChecking.activity_status });
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
        list.push({'label' : i.Project, 'value' : i.Project})
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
    this.setState({project_selected : e.value, project_name_selected : e.value })
    return e;
  }

  handleChangeTowerXL(e){
    this.setState({tower_selected_id : e.value});
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

  // async postAssignment(){
  //   const dataForm = this.state.create_assignment_form;
  //   const newDate = new Date();
  //   const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
  //
  //   let i = 17;
  //   let j = 10;
  //   let k = 59;
  //   let all_ssow = [];
  //   for(i; i <= 53; i = i+6) {
  //     let ssow_list = {
  //       "ssow_id" : dataForm[i],
  //       "sow_type" : dataForm[j],
  //       "ssow_description" : dataForm[i+2],
  //       "ssow_activity_number" : dataForm[i+1],
  //       "ssow_unit" : dataForm[i+3],
  //       "ssow_qty" : dataForm[i+4],
  //       "ssow_price" : dataForm[k],
  //       "ssow_total_price" : dataForm[k]*dataForm[i+4],
  //       "ssow_status" : [
  //         {
  //           "status" : dataForm[i+5],
  //           "status_update_date" : dateNow,
  //           "status_updater" : this.state.userEmail
  //         }
  //       ]
  //     }
  //     if(ssow_list.ssow_unit === null) {
  //       ssow_list["ssow_unit"] = "act";
  //     } else {
  //       if(ssow_list.ssow_unit.length === 0) {
  //         ssow_list["ssow_unit"] = "act";
  //       }
  //     }
  //     if(dataForm[i] !== null) {
  //       all_ssow.push(ssow_list);
  //     }
  //     k++;
  //   }
  //
  //   const assignment_data = {
  //     "Assignment_No" : "ASG"+this.getAssignmentID(),
  //     "Account_Name" : "TSEL",
  //     "CD_ID" : dataForm[0],
  //     "id_cd_doc" : this.state.activity_selected,
  //     "Project" : dataForm[1],
  //     "Plant" : "",
  //     "NW" : dataForm[11],
  //     "NW_Activity" : dataForm[13],
  //     "Requisitioner" : "",
  //     "SOW_Type" : dataForm[10],
  //     "Site_ID" : dataForm[2],
  //     "Site_Name" : dataForm[3],
  //     "Site_Longitude" : dataForm[5],
  //     "Site_Latitude" : dataForm[4],
  //     "Site_FE_ID" : dataForm[6],
  //     "Site_FE_Name" : dataForm[7],
  //     "Site_FE_Longitude" : dataForm[9],
  //     "Site_FE_Latitude" : dataForm[8],
  //     "Vendor_Code" : dataForm[66],
  //     "Vendor_Code_Number" : dataForm[67],
  //     "Vendor_Name" : dataForm[14],
  //     "Vendor_Email" : dataForm[68],
  //     "Payment_Terms" : dataForm[15],
  //     "SH_ID" : dataForm[0],
  //     "Assignment_Creation_Date" : dateNow,
  //     "Value_Assignment" : (dataForm[59]*dataForm[21])+(dataForm[60]*dataForm[27])+(dataForm[61]*dataForm[33])+(dataForm[62]*dataForm[39])+(dataForm[63]*dataForm[45])+(dataForm[64]*dataForm[51])+(dataForm[65]*dataForm[57]),
  //     "Requestor" : this.state.userEmail,
  //     "Payment_Term_Ratio" : null,
  //     "SSOW_List" : all_ssow,
  //     "Current_Status" : "ASP ASSIGNMENT CREATED",
  //     "ASP_Assignment_Status" : [
  //       {
  //         "status_name" : "ASP_ASSIGNMENT",
  //         "status_value" : "CREATED",
  //         "status_date" : dateNow,
  //         "status_updater" : this.state.userEmail,
  //         "status_updater_id" : this.state.userId
  //       }
  //     ],
  //     "deleted" : 0,
  //     "created_by" : this.state.userId,
  //     "updated_by" : this.state.userId,
  //     "created_on" : dateNow,
  //     "updated_on" : dateNow
  //   }
  //
  //   console.log('to be posted', JSON.stringify(assignment_data));
  //   const respondSaveAssignment = await this.postDatatoAPI('/asp_assignment_op', assignment_data);
  //   if(respondSaveAssignment.data !== undefined && respondSaveAssignment.status >= 200 && respondSaveAssignment.status <= 300 ) {
  //     console.log("Assignment Successfully Created");
  //     alert('New Assignment has been created!');
  //     this.setState({ action_status : 'success', action_message : 'New Assignment has been created!' }, () => {
  //       setTimeout(function(){ this.setState({ redirect_sign : respondSaveAssignment.data._id}); }.bind(this), 1000);
  //     });
  //   } else {
  //     alert('New Assignment cannot be created, please try again!');
  //     this.setState({ action_status : 'failed', action_message : 'New Assignment cannot be created, please try again!' });
  //   }
  // }

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
                        <Label>Tower ID</Label>
                        <Select
                          cacheOptions
                          options={this.state.list_tower_selection}
                          onChange={this.handleChangeTowerXL}
                        />
                      </FormGroup>
                    </Col>
                    {/*<Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WP ID</Label>
                        <Select
                          cacheOptions
                          options={this.state.list_tower_selection}
                          onChange={this.handleChangeTowerXL}
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SOW Type</Label>
                        <Input type="select" name="16" onChange={this.handleChangeForm}>
                          <option value="" disabled selected hidden>Select SOW</option>
                          <option value="RBS">RBS</option>
                          <option value="TRM">TRM</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
                  </Row>
                  {/* }<Row style={{marginTop: "16px"}}>
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
                  </Row> */}
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
                      {/* }<FormGroup style={{paddingLeft: "16px", display: "none"}}>
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
                        <Input type="text" name="16" value={this.state.list_activity_selected !== null ? this.state.list_activity_selected.CD_Info_SOW_Type : ""} readOnly />
                      </FormGroup>*/}
                    </Col>
                  </Row>
                  <Row style={{display: "none"}}>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PO LINE ITEM</Label>
                        <Input type="text" name="po_line_item" readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  {(this.state.assignment_ssow_upload !== null && this.state.assignment_ssow_upload !== undefined) && (
                    <Fragment>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>CD ID</Label>
                          <Input type="text" name="po_line_item" value={this.state.assignment_ssow_upload.cust_del !== undefined ? this.state.assignment_ssow_upload.cust_del.map(e => e.cd_id+ "; ") : ""} readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 style={{marginTop: "16px"}}>SSOW List</h5>
                    {this.state.assignment_ssow_upload.SSOW_List !== undefined ? this.state.assignment_ssow_upload.SSOW_List.map((ssow, idx) =>
                      <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                        <Col md="2" style={{margin:"0", padding:"4px"}}>
                          <FormGroup>
                            <Label>SSOW ID</Label>
                            <AsyncSelect
                              cacheOptions
                              loadOptions={debounce(this.loadOptionsSSOWID, 500)}
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
                              loadOptions={debounce(this.loadOptionsActivityNumber, 500)}
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
                            <Input type="textarea" name={idx + " /// ssow_description"} rows="1" value={ssow.ssow_description} disabled={!this.state.can_edit_ssow} />
                          </FormGroup>
                        </Col>
                        <Col md="1" style={{margin:"0", padding:"4px"}}>
                          <FormGroup>
                            <Label>Unit</Label>
                            <Input type="text" name={idx + " /// ssow_unit"} value={ssow.ssow_unit} disabled={!this.state.can_edit_ssow} />
                          </FormGroup>
                        </Col>
                        <Col md="1" style={{margin:"0", padding:"4px"}}>
                          <FormGroup>
                            <Label>Quantity</Label>
                            <Input type="number" name={idx + " /// ssow_qty"} onChange={this.handleChangeForm} value={ssow.ssow_qty} disabled={!this.state.can_edit_ssow}/>
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{margin:"0", padding:"4px"}}>
                          <FormGroup>
                            <Label>Status</Label>
                            <Input type="select" name={idx + " /// ssow_current_status"} onChange={this.handleChangeForm} value={ssow.ssow_current_status} disabled={!this.state.can_edit_ssow}>
                              <option value="" disabled selected hidden>Select Status</option>
                              <option value="SSOW CANCELLED">Cancelled</option>
                              <option value="SSOW CLOSE">Close</option>
                              <option value="SSOW OPEN">Open</option>
                              <option value="SSOW PARTIAL CLOSE">Partial Close</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : (<Fragment></Fragment>) }
                    </Fragment>
                  )}
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="success" style={{float: "right"}} onClick={this.saveDataASG}><i className="fa fa-plus" style={{marginRight: "8px"}}></i> Save</Button>
                <Button type="submit" color="primary" style={{float: "right"}} onClick={this.previewData}><i className="fa fa-eye" style={{marginRight: "8px"}}></i> Preview</Button>              </CardFooter>
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
