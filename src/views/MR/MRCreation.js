import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class MRCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        create_mr_form : new Array(9).fill(null),
        create_mr_name_form : new Array(9).fill(null),
        project_selected : null,
        project_name_selected : null,
        list_project : [],
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
    };
    this.saveMRtoAPI = this.saveMRtoAPI.bind(this);
    this.handleChangeFormMRCreation = this.handleChangeFormMRCreation.bind(this);
    this.handleChangeMRType = this.handleChangeMRType.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
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

  async getDatafromAPIBAM(url){
    try {
      let respond = await axios.get(API_URL_BAM +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
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

  async postDatatoAPIBAM(url, data){
    try {
      let respond = await axios.post(API_URL_BAM +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPIBAM(url, data, _etag){
    try {
      let respond = await axios.patch(API_URL_BAM +url, data, {
        headers : {'Content-Type':'application/json', "If-Match" : _etag},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  getDataProject(){
    this.getDatafromAPIBMS('/project_non_page').then( resProject => {
      if(resProject.data !== undefined){
        this.setState({ list_project : resProject.data._items })
      }
    })
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
      this.setState({create_mr_name_form : dataFormName})
    }
    this.setState({create_mr_form : dataForm}, () => {
      console.log("PPForm", this.state.create_mr_form, this.state.create_mr_name_form);
    });
  }

  preparingDataMR(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100).toString().padStart(4, '0');
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString()+dateNow.getDate().toString()+dataRandom.toString();
    return numberTSSR;
  }

  async saveMRtoAPI(){
    const dataForm = this.state.create_mr_form;
    const dataFormName = this.state.create_mr_name_form;
    const numberingMR = this.preparingDataMR();
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const mr_data = {
      	"mr_id" : "MR"+numberingMR,
        "implementation_id" : "IMP"+numberingMR,
        "scopes" : dataForm[1],
        "mr_category" : dataForm[4],
        "mr_type" : dataForm[3],
        "id_tssr_doc" : null,
        "tssr_id" : null,
        "account_id" : "1",
        "id_project_doc" : dataForm[2],
        "project_name" : dataFormName[2],
        "id_cd_doc" : null,
        "cd_id" : dataForm[0],
        "etd" : dataForm[5]+" 00:00:00",
        "requested_eta" : dataForm[6]+" 23:59:59",
        "eta" : dataForm[6]+" 23:59:00",
        "site_info" : [],
        "mr_milestones" : [],
        "mr_status" : [
          {
              "mr_status_name": "IMPLEMENTED",
              "mr_status_value": "IMPLEMENTED",
              "mr_status_date": dateNow,
              "mr_status_updater": this.state.userEmail,
              "mr_status_updater_id": this.state.userId
          },
          {
            "mr_status_name": "PLANTSPEC",
            "mr_status_value": "NOT ASSIGNED",
            "mr_status_date": dateNow,
            "mr_status_updater": this.state.userEmail,
            "mr_status_updater_id": this.state.userId,
          }
        ],
        "current_mr_status" : "NOT ASSIGNED",
        "current_milestones" : "",
        "deleted" : 0,
        "created_by" : this.state.userId,
        "updated_by" : this.state.userId
      }
      const respondSaveMR = await this.postDatatoAPIBAM('/mr_op', mr_data);
      if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ){
        setTimeout(function(){ this.setState({ redirectSign : respondSaveMR.data._id}); }.bind(this), 3000);
        console.log("success")
      }
  }

  componentDidMount(){
    this.getDataProject();
    document.title = "MR Creation | BAM"
  }

  handleChangeProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_selected : value, project_name_selected : text});
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
            <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>MR Creation </span>
            <Button color='success' style={{float : 'right'}} disable={this.state.list_pp_material_tssr.length === 0} onClick={this.saveMRtoAPI}>Create MR</Button>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>CD ID</Label>
                    <Input type="text" name="0" value={this.state.create_mr_form[0]} onChange={this.handleChangeFormMRCreation}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Scope</Label>
                    <Input type="text" name="1" value={this.state.create_mr_form[1]} onChange={this.handleChangeFormMRCreation}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Project</Label>
                    <Input type="select" name="2" value={this.state.create_mr_form[2]} onChange={this.handleChangeFormMRCreation}>
                      <option value={null}></option>
                      {this.state.list_project.map( project =>
                        <option value={project._id}>{project.project_name}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
                {/* }<Col md={6}>
                  <FormGroup>
                    <Label for="exampleState">Project Group</Label>
                    <Input type="text" name="state" id="exampleState"/>
                  </FormGroup>
                </Col> */}
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>MR Type</Label>
                    <Input type="select" name="3" value={this.state.create_mr_form[3]} onChange={this.handleChangeFormMRCreation}>
                      <option value={null}></option>
                      <option value="New">New</option>
                      <option value="Upgrade">Upgrade</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>MR Delivery Type</Label>
                    <Input type="select" name="4" value={this.state.create_mr_form[4]} onChange={this.handleChangeFormMRCreation}>
                      <option value={null}></option>
                      <option value="Warehouse to Site">Warehouse to Site</option>
                      <option value="Site to Site">Site to Site</option>
                      <option value="Warehouse to Warehouse">Warehouse to Warehouse</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>ETD</Label>
                    <Input
                      type="date"
                      name="5" value={this.state.create_mr_form[5]} onChange={this.handleChangeFormMRCreation}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>ETA</Label>
                    <Input
                      type="date"
                      name="6" value={this.state.create_mr_form[6]} onChange={this.handleChangeFormMRCreation}
                    />
                  </FormGroup>
                </Col>
              </Row>
              </Form>
          </CardBody>
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

export default connect(mapStateToProps)(MRCreation);
