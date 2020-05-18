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
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';



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
      list_tower : [],
      list_project : [],
      list_tower_selection : [],
      list_project_selection : [],
      list_warehouse : [],
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
        toggle_display : "new"
    };
    this.saveMRtoAPI = this.saveMRtoAPI.bind(this);
    this.handleChangeFormMRCreation = this.handleChangeFormMRCreation.bind(this);
    this.handleChangeMRType = this.handleChangeMRType.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeCD = this.handleChangeCD.bind(this);
    this.showHide = this.showHide.bind(this);
    this.handleChangeProjectXL = this.handleChangeProjectXL.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
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
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE+url, {
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
    return dateSplit[0]+"-"+dateSplit[2]+"-"+dateSplit[1]
  }

  async saveMRtoAPI(){
    this.setState({action_status : null, action_message : null});
    const dataCD = this.state.data_cd_id_selected;
    const dataForm = this.state.create_mr_form;
    const dataFormName = this.state.create_mr_name_form;
    const numberingMR = this.preparingDataMR();
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    let list_site = [];
    //     "mr_type": dataForm[3],
    //     "mr_delivery_type": dataForm[4],
    let dataXLS = [
      ["id", "project_name", "mr_type", "mr_delivery_type", "origin_warehouse", "etd", "eta", "dsp_company", "mr_comment_project", "sent_mr_request", "identifier"],
      ["new", this.state.project_name_selected, this.selectMRType(dataForm[3]), this.selectDeliveryType(dataForm[4]), dataForm[8], this.selectedDatetoFormat(dataForm[5]), this.selectedDatetoFormat(dataForm[6]), dataFormName[7], "", "", dataForm[1]]
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

  // async saveMRtoAPI(){
  //   const dataCD = this.state.data_cd_id_selected;
  //   const dataForm = this.state.create_mr_form;
  //   const dataFormName = this.state.create_mr_name_form;
  //   const numberingMR = this.preparingDataMR();
  //   const newDate = new Date();
  //   const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
  //   let list_site = [];
  //   if(dataCD.Site_Info_SiteID_NE !== ""){
  //     let site_ne = {
  //         "site_id": dataCD.Site_Info_SiteID_NE,
  //         "site_title": "NE",
  //         "site_name" : dataCD.Site_Info_SiteName_NE,
  //         "site_address" : dataCD.Site_Info_Address_NE,
  //         "site_longitude" : parseFloat(dataCD.Site_Info_Longitude_NE),
  //         "site_latitude" : parseFloat(dataCD.Site_Info_Latitude_NE)
  //     }
  //     list_site.push(site_ne);
  //   }
  //   if(dataCD.Site_Info_SiteID_FE !== ""){
  //     let site_fe = {
  //         "site_id": dataCD.Site_Info_SiteID_FE,
  //         "site_title": "FE",
  //         "site_name" : dataCD.Site_Info_SiteName_FE,
  //         "site_address" : dataCD.Site_Info_Address_FE,
  //         "site_longitude" : parseFloat(dataCD.Site_Info_Longitude_FE),
  //         "site_latitude" : parseFloat(dataCD.Site_Info_Latitude_FE)
  //     }
  //     list_site.push(site_fe);
  //   }
  //   const origin_place = {
  //     "title" : dataFormName[4].split(" to ", 2)[0],
  //     "value" : dataFormName[8],
  //     "address" : "",
  //   };
  //   let destination_place = undefined;
  //   if(dataForm[3] === "Relocation" || dataForm[3] === "Return"){
  //     destination_place = {
  //       "title" : dataFormName[4].split(" to ", 2)[1],
  //       "value" : dataFormName[9],
  //       "address" : "",
  //     };
  //   }
  //
  //   const mr_data = {
  //     "operation": "New",
  //     "id_cd_doc": this.state.cd_id_selected,
  //     "cd_id": dataCD.WP_ID.toString(),
  //     "id_project_doc": this.state.project_selected,
  //     "project_name": this.state.project_name_selected,
  //     "dsp_company": dataFormName[7],
  //     "sow_type": dataCD.CD_Info_SOW_Type,
  //     "mr_type": dataForm[3],
  //     "mr_delivery_type": dataForm[4],
  //     "site_info": list_site,
  //     "tower_info": []
  //   };
  //   console.log("data new MR", mr_data);
  //   // const respondSaveMR = await this.postDatatoAPINODE('/matreq/saveMatreqByActivity', mr_data);
  //   // if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ) {
  //   //   this.setState({ action_status : 'success' }, () => {
  //   //     setTimeout(function(){ this.setState({ redirectSign : respondSaveMR.data._id}); }.bind(this), 3000);
  //   //   });
  //   // } else{
  //   //   this.setState({ action_status : 'failed' });
  //   // }
  // }

  componentDidMount(){
    // this.getDataCD();
    this.getDataTower();
    this.getDataProject();
    this.getDataWarehouse();
    document.title = "MR Creation | BAM"
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
    this.getDataFromAPINODE('/whManagement/warehouse').then( resWH => {
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

  handleChangeTowerXL(e){
    let dataForm = this.state.create_mr_form;
    let dataFormName = this.state.create_mr_name_form;
    dataForm[1] = e.value;
    dataFormName[1] = e.label;
    this.setState({create_mr_form : dataForm, create_mr_name_form : dataFormName });
    return e
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

  render() {
    console.log("list_cd_id", this.state.create_mr_form[6]);
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
              {/* }<Row form>
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
              </Row> */}
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Tower ID</Label>
                      <Select
                        cacheOptions
                        options={this.state.list_tower_selection}
                        onChange={this.handleChangeTowerXL}
                      />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Project</Label>
                      <Select
                        cacheOptions
                        options={this.state.list_project_selection}
                        onChange={this.handleChangeProjectXL}
                      />
                  </FormGroup>
                </Col>
              </Row>
              {/* }<Row form>
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
              </Row>*/}
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
                    <Label>Origin Warehouse</Label>
                    <Input type="select" name="8" value={this.state.create_mr_form[8]} onChange={this.handleChangeFormMRCreation} hidden={this.state.toggle_display === "return"}>
                      <option value="" disabled selected hidden>Select Origin</option>
                      {this.state.list_warehouse.map(e =>
                        <option value={e.wh_id}>{e.wh_id +" - "+e.wh_name}</option>
                      )}
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
