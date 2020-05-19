import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';













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
      tokenUser : this.props.dataLogin.token,
        create_mr_form : new Array(9).fill(null),
        create_mr_name_form : new Array(9).fill(null),
        list_cd_id : [],
        cd_id_selected : null,
        data_cd_id_selected : null,
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
        toggle_display : "new"
    };
    this.saveMRtoAPI = this.saveMRtoAPI.bind(this);
    this.handleChangeFormMRCreation = this.handleChangeFormMRCreation.bind(this);
    this.handleChangeMRType = this.handleChangeMRType.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeCD = this.handleChangeCD.bind(this);
    this.showHide = this.showHide.bind(this);
  }

  async postDatatoAPINODE(url, data){
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE +url, data, {
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
          username: process.env.REACT_APP_usernamePhilApi,
          password: process.env.REACT_APP_passwordPhilApi
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
      let respond = await axios.get(process.env.REACT_APP_API_URL_XL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_usernameXL,
          password: process.env.REACT_APP_passwordXL
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

  async saveMRtoAPI(){
    const dataCD = this.state.data_cd_id_selected;
    const dataForm = this.state.create_mr_form;
    const dataFormName = this.state.create_mr_name_form;
    const numberingMR = this.preparingDataMR();
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    let list_site = [];
    if(dataCD.Site_Info_SiteID_NE !== ""){
      let site_ne = {
          "site_id": dataCD.Site_Info_SiteID_NE,
          "site_title": "NE",
          "site_name" : dataCD.Site_Info_SiteName_NE,
          "site_address" : dataCD.Site_Info_Address_NE,
          "site_longitude" : parseFloat(dataCD.Site_Info_Longitude_NE),
          "site_latitude" : parseFloat(dataCD.Site_Info_Latitude_NE)
      }
      list_site.push(site_ne);
    }
    if(dataCD.Site_Info_SiteID_FE !== ""){
      let site_fe = {
          "site_id": dataCD.Site_Info_SiteID_FE,
          "site_title": "FE",
          "site_name" : dataCD.Site_Info_SiteName_FE,
          "site_address" : dataCD.Site_Info_Address_FE,
          "site_longitude" : parseFloat(dataCD.Site_Info_Longitude_FE),
          "site_latitude" : parseFloat(dataCD.Site_Info_Latitude_FE)
      }
      list_site.push(site_fe);
    }
    const origin_place = {
      "title" : dataFormName[4].split(" to ", 2)[0],
      "value" : dataFormName[8],
      "address" : "",
    };
    let destination_place = undefined;
    if(dataForm[3] === "Relocation" || dataForm[3] === "Return"){
      destination_place = {
        "title" : dataFormName[4].split(" to ", 2)[1],
        "value" : dataFormName[9],
        "address" : "",
      };
    }

    const mr_data = {
      "operation": "New",
      "id_cd_doc": this.state.cd_id_selected,
      "cd_id": dataCD.WP_ID.toString(),
      "id_project_doc": this.state.project_selected,
      "project_name": this.state.project_name_selected,
      "dsp_company": dataFormName[7],
      "sow_type": dataCD.CD_Info_SOW_Type,
      "mr_type": dataForm[3],
      "mr_delivery_type": dataForm[4],
      "site_info": list_site,
      "tower_info": []
    };
    console.log("data new MR", mr_data);
    // const respondSaveMR = await this.postDatatoAPINODE('/matreq/saveMatreqByActivity', mr_data);
    // if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ) {
    //   this.setState({ action_status : 'success' }, () => {
    //     setTimeout(function(){ this.setState({ redirectSign : respondSaveMR.data._id}); }.bind(this), 3000);
    //   });
    // } else{
    //   this.setState({ action_status : 'failed' });
    // }
  }

  componentDidMount(){
    this.getDataCD();
    document.title = "MR Creation | BAM"
  }

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

  showHide(e) {
    if(e.target.value === "Relocation") {
      this.setState({toggle_display : "relocation"});
    } else if(e.target.value === "Return") {
      this.setState({toggle_display : "return"});
    } else {
      this.setState({toggle_display : "new"});
    }
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

  render() {
    console.log("list_cd_id", this.state.data_cd_id_selected);
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
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>MR Type</Label>
                    <Input type="select" name="3" value={this.state.create_mr_form[3]} onChange={e => {this.handleChangeFormMRCreation(e); this.showHide(e)}}>
                      <option value="" disabled selected hidden>Select MR Type</option>
                      <option value="New">New</option>
                      <option value="Upgrade">Upgrade</option>
                      <option value="Relocation">Relocation</option>
                      <option value="Return">Return</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>MR Delivery Type</Label>
                    <Input type="select" name="4" value={this.state.create_mr_form[4]} onChange={this.handleChangeFormMRCreation}>
                      <option value="" disabled selected hidden>Select MR Delivery Type</option>
                      <option value="Warehouse to Site" hidden={this.state.toggle_display !== "new"}>Warehouse to Site</option>
                      <option value="Site to Warehouse" hidden={this.state.toggle_display !== "return"}>Site to Warehouse</option>
                      <option value="Site to Site" hidden={this.state.toggle_display !== "relocation"}>Site to Site</option>
                      <option value="Warehouse to Warehouse" hidden={this.state.toggle_display !== "relocation"}>Warehouse to Warehouse</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>CD ID</Label>
                    <Input type="select" name="0" value={this.state.cd_id_selected} onChange={this.handleChangeCD}>
                      <option value="" disabled selected hidden>Select CD ID</option>
                      {this.state.list_cd_id.map( cd_id =>
                        <option value={cd_id._id}>{cd_id.WP_ID +" ("+cd_id.WP_Name+")"}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Project</Label>
                    <Input type="text" value={this.state.project_name_selected} disabled/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>SOW Type</Label>
                    <Input type="text" name="2" value={this.state.data_cd_id_selected !== null ? this.state.data_cd_id_selected.CD_Info_SOW_Type : ""} disabled/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form hidden={this.state.toggle_display === "return" || this.state.toggle_display === "relocation"}>
                <Col md={6}>
                  <FormGroup>
                    <Label>Site NE</Label>
                    <Input type="text" value={this.state.data_cd_id_selected !== null ? this.state.data_cd_id_selected.Site_Info_SiteID_NE : ""} disabled/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Site FE</Label>
                    <Input type="text" value={this.state.data_cd_id_selected !== null ? this.state.data_cd_id_selected.Site_Info_SiteID_FE : ""} disabled/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>DSP Company</Label>
                    <Input type="select" name="7" value={this.state.create_mr_form[7]} onChange={this.handleChangeFormMRCreation}>
                      <option value="" disabled selected hidden>Select DSP Company</option>
                      <option value={1}>PT BMS Delivery</option>
                      <option value={2}>PT MITT Delivery</option>
                      <option value={3}>PT IXT Delivery</option>
                      <option value={4}>PT ARA Delivery</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Origin</Label>
                    <Input type="select" name="8" value={this.state.create_mr_form[8]} onChange={this.handleChangeFormMRCreation} hidden={this.state.toggle_display === "return"}>
                      <option value="" disabled selected hidden>Select Origin</option>
                      <option value={"JKT"}>Jakarta</option>
                      <option value={"MKS"}>Makassar</option>
                      <option value={"PLB"}>Palembang</option>
                      <option value={"PKB"}>Pekanbaru</option>
                      <option value={"PDG"}>Padang</option>
                      <option value={"MND"}>Manado</option>
                    </Input>
                    <Input type="text" name="8" onChange={this.handleChangeFormMRCreation} hidden={this.state.toggle_display !== "return"} />
                  </FormGroup>
                </Col>
                <Col md={6} hidden={this.state.toggle_display === "new"}>
                  <FormGroup>
                    <Label>Destination</Label>
                    <Input type="select" name="9" value={this.state.create_mr_form[9]} onChange={this.handleChangeFormMRCreation}>
                      <option value="" disabled selected hidden>Select Destination</option>
                      <option value={"JKT"}>Jakarta</option>
                      <option value={"MKS"}>Makassar</option>
                      <option value={"PLB"}>Palembang</option>
                      <option value={"PKB"}>Pekanbaru</option>
                      <option value={"PDG"}>Padang</option>
                      <option value={"MND"}>Manado</option>
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

export default connect(mapStateToProps)(MRCreation);
