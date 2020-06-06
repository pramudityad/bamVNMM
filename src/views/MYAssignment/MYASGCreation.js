import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class MYASGCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      lmr_form : {},
      modal_loading : false,

      list_tower : [],
      list_project : [],
      list_tower_selection : [],
      list_project_selection : [],
      list_warehouse : [],
      form_checking : {},
        create_mr_form : new Array(9).fill(null),
        create_mr_name_form : new Array(9).fill(null),
        list_cd_id : [],
        cd_id_selected : null,
        data_cd_id_selected : null,
        project_selected : null,
        project_name_selected : null,
        list_tssr : [],
        list_tssr_for_selection : [],
        id_tssr_selected : null,
        data_tssr_selected : null,
        tssr_BOM_data_NE : null,
        tssr_BOM_data_FE : null,
        list_pp_material_tssr : [],
        redirectSign : false,
        action_status : null,
        action_message : null,
        toggle_display : "new",
        identifier_by : "tower_id",
        tower_selected_id : null,
        dsp_list : [],
        validation_form : {},
    };
    this.saveMRtoAPI = this.saveMRtoAPI.bind(this);
    this.handleChangeFormMRCreation = this.handleChangeFormMRCreation.bind(this);
    this.handleChangeMRType = this.handleChangeMRType.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeCD = this.handleChangeCD.bind(this);
    this.showHide = this.showHide.bind(this);
    this.handleChangeProjectXL = this.handleChangeProjectXL.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
    this.handleChangeIdentifierBy = this.handleChangeIdentifierBy.bind(this);
    this.loadOptionsTowerID = this.loadOptionsTowerID.bind(this);
    this.loadOptionsCDID = this.loadOptionsCDID.bind(this);

    this.handleChangeFormLMR = this.handleChangeFormLMR.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
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

  async getDatafromAPIBMS(url){
    try {
      let respond = await axios.get(API_URL_BMS_Phil +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
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

  getDataCD(){
    this.getDatafromAPIXL('/custdel_op').then( resCD => {
      if(resCD.data !== undefined){
        this.setState({ list_cd_id : resCD.data._items })
      }
    })
  }

  getDataCDProject(){
    const project_id = this.state.data_cd_id_selected.CD_Info_Project;
    this.getDatafromAPIXL('/project_op/'+project_id).then( resCD => {
      if(resCD.data !== undefined){
        this.setState({ project_selected : resCD.data._id, project_name_selected : resCD.data.Project })
      }
    })
  }

  handleChangeIdentifierBy(e){
    const value = e.target.value;
    this.setState({identifier_by : value});
  }

  handleChangeTSSR = (newValue) => {
    const _id_tssr = newValue.value;
    const data_tssr_selection = this.state.list_tssr.find(e => e._id === _id_tssr);
    this.setState({id_tssr_selected : _id_tssr, data_tssr_selected : data_tssr_selection }, () => {
      this.getTSSRBOM();
    });
  }

  handleChangeMRType(e) {
    const value = e.target.value;
    this.setState({mr_type : value });
  }

  handleChangeFormMRCreation(e){
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.create_mr_form;
    dataForm[parseInt(index)] = value;
    const indexOpt = e.target.selectedIndex;
    if(indexOpt !== undefined){
      let dataFormName = this.state.create_mr_name_form;
      const textOpt = e.target[indexOpt].text;
      dataFormName[parseInt(index)] = textOpt;
      this.setState({create_mr_name_form : dataFormName});
    }
    this.setState({create_mr_form : dataForm}, () => {
      console.log("PPForm", this.state.create_mr_form, this.state.create_mr_name_form);
    });
  }

  preparingDataMR(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100).toString().padStart(4, '0');
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString().padStart(2, '0')+dateNow.getDate().toString().padStart(2, '0')+dataRandom.toString();
    return numberTSSR;
  }

  selectedDatetoFormat(date){
    let dateSplit = date.split("-");
    return dateSplit[0]+"-"+dateSplit[1]+"-"+dateSplit[2]
  }

  handleCheckingForm() {
    const dataForm = this.state.create_mr_form;
    const dataFormName = this.state.create_mr_name_form;
    let dataValidate = {};
    let checkerror = [];
    let dataFormHeader = ["project_name", "mr_type", "mr_delivery_type", "origin_warehouse", "etd", "eta", "deliver_by", "created_based", "identifier"];
    let dataFormInputan = [this.state.project_name_selected, dataForm[3], dataForm[4], dataForm[8], dataForm[5], dataForm[6], dataForm[7], this.state.identifier_by, this.state.tower_selected_id];
    for (let i = 0; i < dataFormHeader.length; i++) {
      if (dataFormInputan[i] === undefined || dataFormInputan[i] === null) {
        dataValidate[dataFormHeader[i]] = false;
        checkerror.push(false);
      }
    }
    this.setState({ validation_form: dataValidate });
    console.log("dataValidate", dataValidate);
    if (checkerror.length !== 0) {
      return true
    } else {
      return false
    }
  }

  async saveMRtoAPI(){
    this.setState({action_status : null, action_message : null});
    const dataCD = this.state.data_cd_id_selected;
    const dataForm = this.state.create_mr_form;
    const dataFormName = this.state.create_mr_name_form;
    const dataValidation = await this.handleCheckingForm();
    if(dataValidation !== true){
      const numberingMR = this.preparingDataMR();
      const newDate = new Date();
      const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
      let list_site = [];
      let dataXLS = [
        ["id", "project_name", "mr_type", "mr_delivery_type", "origin_warehouse", "etd", "eta", "deliver_by", "mr_comment_project", "sent_mr_request", "created_based", "identifier"],
        ["new", this.state.project_name_selected, this.selectMRType(dataForm[3]), this.selectDeliveryType(dataForm[4]), dataForm[8], this.selectedDatetoFormat(dataForm[5]), this.selectedDatetoFormat(dataForm[6]), dataForm[7], "", "", this.state.identifier_by, this.state.tower_selected_id]
      ]
      const respondCheckingMR = await this.postDatatoAPINODE('/matreq/matreqByActivity', {"data" : dataXLS});
      if(respondCheckingMR.data !== undefined && respondCheckingMR.status >= 200 && respondCheckingMR.status <= 300 ) {
        const respondSaveMR = await this.postDatatoAPINODE('/matreq/saveMatreqByActivity', {"data" : respondCheckingMR.data.data });
        if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ) {
          this.setState({ action_status : 'success' });
        } else{
          if(respondSaveMR.response !== undefined && respondSaveMR.response.data !== undefined && respondSaveMR.response.data.error !== undefined){
            if(respondSaveMR.response.data.error.message !== undefined){
              this.setState({ action_status: 'failed', action_message: respondSaveMR.response.data.error.message });
            }else{
              this.setState({ action_status: 'failed', action_message: respondSaveMR.response.data.error });
            }
          }else{
            this.setState({ action_status: 'failed' });
          }
        }
      }else{
        if(respondCheckingMR.response !== undefined && respondCheckingMR.response.data !== undefined && respondCheckingMR.response.data.error !== undefined){
          if(respondCheckingMR.response.data.error.message !== undefined){
            this.setState({ action_status: 'failed', action_message: respondCheckingMR.response.data.error.message });
          }else{
            this.setState({ action_status: 'failed', action_message: respondCheckingMR.response.data.error });
          }
        }else{
          this.setState({ action_status: 'failed' });
        }
      }
    }
  }

  componentDidMount(){
    // this.getDataCD();
    // this.getDataTower();
    this.getDSPList();
    this.getDataProject();
    this.getDataWarehouse();
    document.title = "MR Creation | BAM"
  }

  getDSPList() {
    this.getDatafromAPIXL('/vendor_data_non_page?where={"Type":"ASP"}').then(res => {
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({dsp_list : items});
      }
    })
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

  getDataWarehouse(){
    this.getDataFromAPINODE('/whManagement/warehouse?q={"wh_type":{"$regex" : "internal", "$options" : "i"}}').then( resWH => {
      if(resWH.data !== undefined){
        this.setState({ list_warehouse : resWH.data.data })
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

  // handleChangeTowerXL(e){
  //   let dataForm = this.state.create_mr_form;
  //   let dataFormName = this.state.create_mr_name_form;
  //   dataForm[1] = e.value;
  //   dataFormName[1] = e.label;
  //   this.setState({create_mr_form : dataForm, create_mr_name_form : dataFormName });
  //   return e
  // }

  handleChangeProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_selected : value, project_name_selected : text});
  }

  handleChangeCD(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    const data_CD = this.state.list_cd_id.find(e => e._id === value);
    this.setState({cd_id_selected : value, data_cd_id_selected : data_CD}, () => {
      this.getDataCDProject();
    });
  }

  async loadOptionsTowerID(inputValue) {
    if(!inputValue || inputValue.length < 3 ) {
      return [];
    } else {
      let tower_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getTowerID = await this.getDatafromAPIXL('/tower_site_sorted_non_page?where={"tower_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
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
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getWPID = await this.getDatafromAPIXL('/custdel_sorted_non_page?where={"WP_ID":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getWPID !== undefined && getWPID.data !== undefined) {
        getWPID.data._items.map(wp =>
          wp_id_list.push({'value' : wp.WP_ID , 'label' : wp.WP_ID +" ( "+wp.WP_Name+" )"}))
      }
      return wp_id_list;
    }
  }

  handleChangeTowerXL(e){
    console.log(" e.value",  e.value);
    this.setState({tower_selected_id : e.value});
    return e
  }

  showHide(e) {
    if(e.target.value === "Relocation") {
      this.setState({toggle_display : "relocation"});
    } else if(e.target.value === "Return") {
      this.setState({toggle_display : "return"});
    } else {
      this.setState({toggle_display : "new"});
    }
  }

  selectMRType(TypeDel){
    let delType = null;
    switch(TypeDel) {
      case "New":
        delType = 1;
        break;
      case "Upgrade":
        delType = 2;
        break;
      case "Relocation":
        delType = 3;
        break;
      case "Return":
        delType = 4;
        break;
      default:
        delType = 1;
    }
    return delType
  }

  selectDeliveryType(TypeDel){
    let delType = null;
    switch(TypeDel) {
      case "Warehouse to Site":
        delType = 1;
        break;
      case "Site to Warehouse":
        delType = 2;
        break;
      case "Site to Site":
        delType = 3;
        break;
      case "Warehouse to Warehouse":
        delType = 4;
        break;
      default:
        delType = 1;
    }
    return delType
  }

  handleChangeFormLMR(e) {
    const name = e.target.name;
    let value = e.target.value;
    let lmr_form = this.state.lmr_form;
    if (value !== (null && undefined)) {
      value = value.toString();
    }
    lmr_form[name.toString()] = value;
    this.setState({ lmr_form: lmr_form });
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/mr-detail/'+this.state.redirectSign} />);
    }
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>Assignment LMR Creation </span>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>LMR Issued By</Label>
                    <Input type="text" name="lmr_issued_by" id="lmr_issued_by" value={this.state.lmr_form.lmr_issued_by} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>PGr</Label>
                    <Input type="text" name="pgr" id="pgr" value={this.state.lmr_form.pgr} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>GL Account</Label>
                    <Input type="text" name="gl_account" id="gl_account" value={this.state.lmr_form.gl_account} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Project Name</Label>
                    <Input type="text" name="project_name" id="project_name" value={this.state.lmr_form.project_name} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label>Header Text</Label>
                    <Input type="text" name="header_text" id="header_text" value={this.state.lmr_form.header_text} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Payment Term</Label>
                    <Input type="text" name="payment_term" id="payment_term" value={this.state.lmr_form.payment_term} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Vendor Code</Label>
                    <Input type="text" name="vendor_code" id="vendor_code" value={this.state.lmr_form.vendor_code} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Vendor Name</Label>
                    <Input type="text" name="vendor_name" id="vendor_name" value={this.state.lmr_form.vendor_name} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Vendor Address</Label>
                    <Input type="text" name="vendor_address" id="vendor_address" value={this.state.lmr_form.vendor_address} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>L1 Approver / PM</Label>
                    <Input type="text" name="l1_approver" id="l1_approver" value={this.state.lmr_form.l1_approver} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>L2 Approver / PM</Label>
                    <Input type="text" name="l2_approver" id="l2_approver" value={this.state.lmr_form.l2_approver} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>L1 Approver / PM</Label>
                    <Input type="text" name="l3_approver" id="l3_approver" value={this.state.lmr_form.l3_approver} onChange={this.handleChangeFormLMR}/>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Button color='success' style={{float : 'right'}} onClick={this.saveMRtoAPI}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i> Create MR</Button>
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

export default connect(mapStateToProps)(MYASGCreation);
