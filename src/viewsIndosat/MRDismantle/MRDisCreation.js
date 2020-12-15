import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { getDatafromAPIISAT, postDatatoAPINODE, getDatafromAPINODE} from "../../helper/asyncFunction";
import * as XLSX from 'xlsx';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import debounce from "lodash.debounce";

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.isat.pdb.e-dpm.com/isatapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class MRDisCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      redirectSign : false,
      validation_form : {},
      action_status : null,
      action_message : null,

      project_selected : null,
      project_name_selected : null,
      project_all : [],
      form_creation : {},
      wp_list : [],
      rowsXLS : [],
      list_warehouse : [],
      list_dsp : [],
      list_asg_selection : [],
      inputan_file : null,
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.loadOptionsWPID = this.loadOptionsWPID.bind(this);
    this.loadOptionsWPIDDestination = this.loadOptionsWPIDDestination.bind(this);
    this.handleChangeWPID = this.handleChangeWPID.bind(this);
    this.handleChangeWPIDDestination = this.handleChangeWPIDDestination.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.saveMRDis = this.saveMRDis.bind(this);
    this.loadOptionsASG = this.loadOptionsASG.bind(this);
    this.handleChangeASG = this.handleChangeASG.bind(this);
    this.loadOptionsMR = this.loadOptionsMR.bind(this);
    this.handleChangeMR = this.handleChangeMR.bind(this);
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE+url, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
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

  // MR Dis

  exportFormatPSDismantle = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["bundle_id","bundle_name","qty","category"]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'MR Dismantle Template.xlsx');
  }

  componentDidMount(){
    this.getDataWarehouse();
    this.getDSPList();
    document.title = "MR Dismantle Creation | BAM"
  }

  getProjectAll(){
    getDatafromAPIISAT('/project_sorted_non_page').then( resp => {
      if(resp !== undefined){
        this.setState({project_all : resp.data._items});
      }
    })
  }

  getDataWarehouse(){
    getDatafromAPINODE('/whManagement/warehouse?q={"wh_type":{"$regex" : "internal", "$options" : "i"}}', this.state.tokenUser).then( resWH => {
      if(resWH.data !== undefined){
        this.setState({ list_warehouse : resWH.data.data })
      }
    })
  }

  getDSPList() {
    getDatafromAPIISAT('/vendor_data_non_page?where={"Type":"ASP"}').then(res => {
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({list_dsp : items});
      }
    })
  }

  handleChangeProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_selected : value, project_name_selected : text});
  }

  async loadOptionsWPID(inputValue) {
    if(!inputValue || inputValue.length < 3 ) {
      return [];
    } else {
      let site_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getTowerID = await getDatafromAPIISAT('/custdel_op?where={"WP_ID":{"$regex":"'+inputValue+'", "$options":"i"}}&projection={"WP_ID":1,"WP_Name":1,"CD_Info_Project_Name":1,"CD_Info_Project":1,"Site_Info_SiteID_Value_NE":1,"Site_Info_SiteName_NE":1}');
      if(getTowerID !== undefined && getTowerID.data !== undefined) {
        this.setState({wp_list : getTowerID.data._items});
        getTowerID.data._items.map(wp =>
          site_id_list.push({'label' : wp.WP_ID, 'value' : wp._id, 'WP_ID' : wp.WP_ID, 'WP_Name' : wp.WP_Name, 'Project_Name' : wp.CD_Info_Project_Name, 'id_project_doc' : wp.CD_Info_Project, 'site_id' : wp.Site_Info_SiteID_Value_NE, 'site_name' : wp.Site_Info_SiteName_NE}))
      }
      return site_id_list;
    }
  }

  async loadOptionsWPIDDestination(inputValue) {
    if(!inputValue || inputValue.length < 3 ) {
      return [];
    } else {
      let site_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getTowerID = await getDatafromAPIISAT('/custdel_op?where={"WP_ID":{"$regex":"'+inputValue+'", "$options":"i"}}&projection={"WP_ID":1,"WP_Name":1,"CD_Info_Project_Name":1,"CD_Info_Project":1,"Site_Info_SiteID_Value_NE":1,"Site_Info_SiteName_NE":1}');
      if(getTowerID !== undefined && getTowerID.data !== undefined) {
        this.setState({wp_list : getTowerID.data._items});
        getTowerID.data._items.map(wp =>
          site_id_list.push({'label' : wp.WP_ID, 'value' : wp._id, 'WP_ID' : wp.WP_ID, 'WP_Name' : wp.WP_Name, 'Project_Name' : wp.CD_Info_Project_Name, 'id_project_doc' : wp.CD_Info_Project, 'site_id' : wp.Site_Info_SiteID_Value_NE, 'site_name' : wp.Site_Info_SiteName_NE}))
      }
      return site_id_list;
    }
  }

  async loadOptionsASG(inputValue) {
    if (!inputValue) {
      this.setState({ list_asg_selection: [] });
      return [];
    } else {
      let asg_list = [];
      const getASG = await this.getDataFromAPINODE('/aspAssignment/aspassign?srt=_id:-1&q={"Assignment_No":{"$regex":"' + inputValue + '", "$options":"i"}}&v={"Assignment_No":1, "Site_ID" : 1}');
      if (getASG !== undefined && getASG.data !== undefined) {
        this.setState({ list_asg_selection: getASG.data.data }, () =>
          getASG.data.data.map(mr =>
            asg_list.push({ 'label': mr.Assignment_No !== undefined ? mr.Assignment_No : null, 'value': mr._id, 'site_id_asg' : mr.Site_ID })))
      }
      console.log("asg_list", asg_list);
      return asg_list;
    }
  }

  async loadOptionsMR(inputValue) {
    if (!inputValue) {
      this.setState({ list_asg_selection: [] });
      return [{ 'label': null, 'value': null }];
    } else {
      let asg_list = [{ 'label': null, 'value': null }];
      const getASG = await this.getDataFromAPINODE('/matreq?srt=_id:-1&q={"mr_id":{"$regex":"' + inputValue + '", "$options":"i"}}&v={"mr_id":1, "Site_ID" : 1}');
      if (getASG !== undefined && getASG.data !== undefined) {
        this.setState({ list_asg_selection: getASG.data.data }, () =>
          getASG.data.data.map(mr =>
            asg_list.push({ 'label': mr.mr_id !== undefined ? mr.mr_id : null, 'value': mr._id , 'mr_id': mr.mr_id })))
      }
      return asg_list;
    }
  }

  handleChangeWPID(newValue){
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          ["id_wp_doc"]: newValue.value,
          ["wp_id"]: newValue.WP_ID,
          ["wp_name"]: newValue.WP_Name,
          ["site_id"]: newValue.site_id,
          ["site_name"]: newValue.site_name,
          ["id_project_doc"]: newValue.id_project_doc,
          ["project_name"]: newValue.Project_Name,
        },
      })
    );
    return newValue
  }

  handleChangeWPIDDestination(newValue){
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          ["id_wp_doc_destination"]: newValue.value,
          ["wp_id_destination"]: newValue.WP_ID,
          ["wp_name_destination"]: newValue.WP_Name,
          ["site_id_destination"]: newValue.site_id,
          ["site_name_destination"]: newValue.site_name,
          ["id_project_doc_destination"]: newValue.id_project_doc,
          ["project_name_destination"]: newValue.Project_Name,
        },
      })
    );
    return newValue
  }

  fileHandlerUpload = (input) => {
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
    });
  }

  handleChangeText(e){
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          [name]: value,
        },
      })
    );
  }

  handleChangeDropdown(e){
    const value = e.target.value;
    const name = e.target.name;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          [name]: value,
          [name+'_name']: text,
        },
      })
    );
  }

  async saveMRDis(){
    const dataForm = this.state.form_creation;
    const dataMR = [
        ["id", "activity_id", "project", "category", "eta", "etd", "deliver_by", "dismantle_by", "wh_destination", "activity_id_destination", "project_destination", "assignment_id", "mra_type", "mr_related", "note"],
        ["new", dataForm.wp_id, dataForm.project_name, dataForm.destination, dataForm.eta, dataForm.etd, dataForm.deliver_by, dataForm.dismantle_by, dataForm.warehouse, dataForm.warehouse === "TWH" ? null : dataForm.wp_id_destination, dataForm.warehouse === "TWH" ? null : dataForm.project_name_destination, dataForm.assignment_id === undefined ? null : dataForm.assignment_id, dataForm.mra_type, dataForm.mr_id !== undefined ? dataForm.mr_id : null, dataForm.notes === undefined ? null : dataForm.notes],
    ];
    let fileDocument = new FormData();
    await fileDocument.append('data', JSON.stringify(dataMR));
    if(this.state.inputan_file !== null){
      await fileDocument.append('fileDocument', this.state.inputan_file);
    }
    const resPost = await postDatatoAPINODE('/matreq-srn/createMatreqDismantle', fileDocument, this.state.tokenUser)
    if(resPost !== undefined && resPost.data !== undefined){
      this.setState({action_status : 'success'})
    }else{
      if (resPost.response !== undefined && resPost.response.data !== undefined && resPost.response.data.error !== undefined) {
        if (resPost.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: resPost.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: resPost.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
    }
  }

  handleChangeASG = async (newValue) => {
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          ["assignment_id"]: newValue.label,
          ["site_id_asg"] : newValue.site_id_asg,
        },
      })
    );
  };

  handleChangeMR = async (newValue) => {
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          ["mr_id"]: newValue.mr_id
        },
      })
    );
  };

  handleInputFile = (e) => {
    let fileUpload = null;
    if ( e !== undefined && e.target !== undefined && e.target.files !== undefined ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload }, () =>
      console.log(this.state.inputan_file)
    );
  };

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/mr-detail/'+this.state.redirectSign} />);
    }
    return (
      <div>
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>MR Dismantle Creation </span>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>MRA Type</Label>
                    <Input type="select" name="mra_type" value={this.state.form_creation.mra_type} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select MRA Type</option>
                      <option value="1">Dismantle</option>
                      <option value="2">Return Excess</option>
                      <option value="3">Return Faulty</option>
                      <option value="4">Relocation</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>WP ID Source<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={this.loadOptionsWPID}
                      defaultOptions
                      onChange={this.handleChangeWPID}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>WP Name Source</Label>
                    <Input type="type" name="site_name" readOnly value={this.state.form_creation.wp_name} onChange={this.handleChangeProject} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label>Site ID Source</Label>
                    <Input type="type" name="site_id" readOnly value={this.state.form_creation.site_id} onChange={this.handleChangeProject} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Site Name Source</Label>
                    <Input type="type" name="site_name" readOnly value={this.state.form_creation.site_name} onChange={this.handleChangeProject} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Project Name Source</Label>
                    <Input type="type" name="project_name" readOnly value={this.state.form_creation.project_name} onChange={this.handleChangeProject} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Destination<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                    <Input type="select" name="destination" value={this.state.form_creation.destination} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select Destination</option>
                      <option value="TWH">Delivery to Warehouse</option>
                      <option value="TST">Delivery to Site</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Warehouse{this.state.form_creation.destination === "TWH" && (<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span>)}</Label>
                    <Input type="select" name="warehouse" value={this.state.form_creation.warehouse} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select Warehouse</option>
                      {this.state.list_warehouse.map(e =>
                        <option value={e.wh_id}>{e.wh_id +" - "+e.wh_name}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Dismantle by<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                    <Input type="select" name="dismantle_by" value={this.state.form_creation.dismantle_by} onChange={this.handleChangeDropdown} style={this.state.validation_form.dismantle_by === false ? {borderColor : 'red'} : {}}>
                      <option value="" disabled selected hidden>Select Dismantle Company</option>
                      {this.state.list_dsp.map(e =>
                        <option value={e.Vendor_Code}>{e.Name}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Deliver by<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                    <Input type="select" name="deliver_by" value={this.state.form_creation.deliver_by} onChange={this.handleChangeDropdown} style={this.state.validation_form.deliver_by === false ? {borderColor : 'red'} : {}}>
                      <option value="" disabled selected hidden>Select Delivery Company</option>
                      <option value="DSP">DSP</option>
                      {this.state.list_dsp.map(e =>
                        <option value={e.Vendor_Code}>{e.Name}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              {this.state.form_creation.destination === "TST" && (
                <Fragment>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>WP ID Destination<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsWPIDDestination}
                          defaultOptions
                          onChange={this.handleChangeWPIDDestination}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>WP Name Destination</Label>
                        <Input type="type" name="site_name" readOnly value={this.state.form_creation.wp_name_destination} onChange={this.handleChangeProject} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Site ID Destination</Label>
                        <Input type="type" name="site_id" readOnly value={this.state.form_creation.site_id_destination} onChange={this.handleChangeProject} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Site Name Destination</Label>
                        <Input type="type" name="site_name" readOnly value={this.state.form_creation.site_name_destination} onChange={this.handleChangeProject} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Project Name Destination</Label>
                        <Input type="type" name="project_name" readOnly value={this.state.form_creation.project_name_destination} onChange={this.handleChangeProject} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Fragment>
              )}
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label>ETD<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                    <Input type="date" name="etd" value={this.state.form_creation.etd} onChange={this.handleChangeText} />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>ETA<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                    <Input type="date" name="eta" value={this.state.form_creation.eta} onChange={this.handleChangeText} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label>Notes<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <Input type="textarea" name="notes" value={this.state.form_creation.notes} onChange={this.handleChangeText} />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>Assignemnt ID<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <AsyncSelect loadOptions={this.loadOptionsASG} defaultOptions onChange={this.handleChangeASG} />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>Assignment Site ID</Label>
                    <Input type="text" name="site_id_asg" value={this.state.form_creation.site_id_asg} readOnly />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>MR ID<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <AsyncSelect loadOptions={this.loadOptionsMR} defaultOptions onChange={this.handleChangeMR} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label>BAPA File<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <input type="file" onChange={this.handleInputFile} style={{visiblity: "hidden" }} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Button color='success' style={{float : 'right'}} size="sm" onClick={this.saveMRDis} disabled={this.state.modal_loading === true}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i> Create MRA</Button>
          </CardFooter>
        </Card>
        </Col>
        </Row>
        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
          <ModalBody>
            <div style={{textAlign : 'center'}}>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
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

export default connect(mapStateToProps)(MRDisCreation);
