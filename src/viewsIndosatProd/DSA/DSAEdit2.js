import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import debounce from "debounce-promise";
import './DSA.css'
import ModalCreateNew from "../components/ModalCreateNew";

const API_URL = 'https://api.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const API_URL_ISAT = 'https://api.isat.pdb.e-dpm.com/isatapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2.bam-id.e-dpm.com/bamidapi';
const DefaultNotif = React.lazy(() => import('../../viewsIndosat/DefaultView/DefaultNotif'));

class DSAEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_dsa: null,
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      network_number: null,
      destination: "",
      list_dsa_selection : [],
      list_po_selection : [],
      inputan_file : null,
      actualModal : false,
      action_status : null,
      action_message : null,
    }
    this.toggleActualModal = this.toggleActualModal.bind(this);
    this.submitDSA = this.submitDSA.bind(this);
    this.approveDSA = this.approveDSA.bind(this);
    this.loadOptionsDSA = this.loadOptionsDSA.bind(this);
    this.handleChangeFormSection1 = this.handleChangeFormSection1.bind(this);
    this.handleChangeFormSection3 = this.handleChangeFormSection3.bind(this);
    this.loadOptionsPO = this.loadOptionsPO.bind(this);
    this.handleChangeFormSectionLevel2 = this.handleChangeFormSectionLevel2.bind(this);
    this.addListSection1 = this.addListSection1.bind(this);
    this.addListSection3 = this.addListSection3.bind(this);
  }

  toggleActualModal = () => {
    this.setState({
      actualModal: !this.state.actualModal,
    });
  };

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: username,
          password: password
        }
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async getDataFromAPI_tsel(url) {
    try {
      let respond = await axios.get(API_URL_tsel + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: username_tsel,
          password: password_tsel
        }
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async getDataFromAPIXL(url) {
    try {
      let respond = await axios.get(API_URL_ISAT + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: usernameXL,
          password: passwordXL
        }
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data node", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data node", err);
      return respond;
    }
  }

  componentDidMount() {
    this.getDataDSA(this.props.match.params.id);
    document.title = 'DSA Detail | BAM';
  }

  getDataDSA(_id_MR) {
    this.getDataFromAPINODE('/matreq/' + _id_MR).then(res => {
      if (res.data !== undefined) {
        this.setState({ data_dsa: res.data });
        if (this.state.data_dsa.mr_type === "Return" || this.state.data_dsa.mr_type === "Relocation") {
          this.setState({ destination: this.state.data_dsa.destination.value });
        } else {
          this.setState({ destination: this.state.data_dsa.site_info[0].site_id });
        }
        this.getDataFromAPIXL('/custdel_sorted_non_page?where={"WP_ID":"' + this.state.data_dsa.cust_del[0].cd_id + '"}').then(res => {
          let nn = res.data._items[0] !== undefined ? res.data._items[0].CD_Info_Network_Number : "";
          if (res.data !== undefined) {
            this.setState({ network_number: nn });
          }
        })
      }
    })
  }

  countTotalValue(){
    let dataSec = this.state.data_dsa;
    let dataSection1 = dataSec.primary_section;
    let dataSection2 = dataSec.second_section.service_details;
    let dataSection3 = dataSec.third_section.service_details;
    let dataForm = this.state.create_dsa_form;
    let totalValue = 0;
    let totalSec1 = dataSection1.filter(ds => ds.total_price !== undefined && ds.total_price !== null && ds.total_price.length !== 0).reduce((a,b) => a+parseFloat(b.total_price), 0);
    let totalSec2 = dataSection2.filter(ds => ds.total_price !== undefined && ds.total_price !== null && ds.total_price.length !== 0).reduce((a,b) => a+parseFloat(b.total_price), 0);
    let totalSec3 = dataSection3.filter(ds => ds.price !== undefined && ds.price !== null && ds.price.length !== 0 ).reduce((a,b) => a+parseFloat(b.price), 0);
    totalValue = parseFloat(totalSec1)+parseFloat(totalSec2)+parseFloat(totalSec3);
    dataSec["dsa_total_value"] = totalValue;
    this.setState({data_dsa : dataSec});
  }

  async handleChangeFormSection1(e) {
    let dataSec = this.state.data_dsa;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSec["primary_section"][parseInt(idx)][field] = value;
    if(parseInt(idx) === 0 && field === "sub_category"){
      dataSec["primary_section"][parseInt(idx)]["category"] = "MOT";
      dataSec["primary_section"][parseInt(idx)]["sub_category"] = value;
    }
    if(field === "qty"){
      const total_price = parseFloat(value)*parseFloat(dataSec["primary_section"][parseInt(idx)]["price"]);
      dataSec["primary_section"][parseInt(idx)]["total_price"] = total_price;
    }
    this.setState({ data_dsa: dataSec }, ()=> {
      console.log("primary_section", this.state.data_dsa);
      this.countTotalValue();
    });
  }

  handleChangeDSASection1 = async (newValue, e) => {
    let dataSec = this.state.data_dsa;
    let idxField = e.name.split(" /// ")
    let idx = idxField[0];
    let field = idxField[1];
    if (field === "service_master") {
      let dataDSA = this.state.list_dsa_selection.find(e => e._id === newValue.value);
      dataSec["primary_section"][parseInt(idx)]['service_master'] = dataDSA.dsa_price_id;
      dataSec["primary_section"][parseInt(idx)]['price'] = dataDSA.price;
      dataSec["primary_section"][parseInt(idx)]['qty'] = 0;
      dataSec["primary_section"][parseInt(idx)]['total_price'] = 0;
      dataSec["primary_section"][parseInt(idx)]['short_text'] = dataDSA.short_text;
      dataSec["primary_section"][parseInt(idx)]['long_text'] = dataDSA.long_text;
    }

    this.setState({ data_dsa: dataSec }, ()=>{
      this.countTotalValue();
    });
  };

  addListSection1(){
    let dataSec = this.state.data_dsa;
    dataSec["primary_section"].push({});
    this.setState({ section_1_form: dataSec });
  }

  loopSection1 = () => {
    let section_1 = [];
    let label1, label2, label3, label4, label5, label6, label7;
    label1 = (<Label>Details</Label>);
    label2 = (<Label>Service Master</Label>);
    label3 = (<Label>Price</Label>);
    label4 = (<Label>Quantity</Label>);
    label5 = (<Label>Total Price</Label>);
    label6 = (<Label>Short Text</Label>);
    label7 = (<Label>Long Text</Label>);
    if(this.state.data_dsa.primary_section.length > 0){
      section_1.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label1}
            <Input type="select" name={"0 /// sub_category"} defaultValue={this.state.data_dsa.primary_section[0].category} onChange={this.handleChangeFormSection1}>
              <option value="" disabled selected hidden>MOT</option>
              <option value="MOT-Land">MOT-Land</option>
              <option value="MOT-Air">MOT-Air</option>
              <option value="MOT-Sea">MOT-Sea</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label2}
            <AsyncSelect
              cacheOptions
              loadOptions={this.loadOptionsDSA}
              defaultOptions
              defaultInputValue={this.state.data_dsa.primary_section[0].service_master}
              onChange={this.handleChangeDSASection1}
              name={"0 /// service_master"}
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label3}
            <Input type="text" readOnly value={this.state.data_dsa.primary_section[0].price} ></Input>
          </FormGroup>
        </Col>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label4}
            <Input type="number" name={"0 /// qty"} defaultValue={this.state.data_dsa.primary_section[0].qty} onChange={this.handleChangeFormSection1}></Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label5}
            <Input type="text" readOnly value={this.state.data_dsa.primary_section[0].total_price}></Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label6}
            <Input type="text" readOnly value={this.state.data_dsa.primary_section[0].short_text}></Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            {label7}
            <Input type="textarea" rows="1" readOnly value={this.state.data_dsa.primary_section[0].long_text}></Input>
          </FormGroup>
        </Col>
      </Row>
    )
    }
    for (let i = 1; i < this.state.data_dsa.primary_section.length; i++) {
      if (this.state.data_dsa.primary_section[i] !== undefined) {
        section_1.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }} key={this.state.data_dsa.primary_section[i].service_master}>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input type="select" name={i+" /// sub_category"} defaultValue={this.state.data_dsa.primary_section[i].category} onChange={this.handleChangeFormSection1}>
                  <option disabled selected hidden>Select</option>
                  <option value="Additional Delivery">Additional Delivery</option>
                  <option value="MOT-Air">MOT-Air</option>
                  <option value="Crane">Crane</option>
                  <option value="Custom">Custom</option>
                  <option value="Custom Clearance">Custom Clearance</option>
                  <option value="Delivery Service">Delivery Service</option>
                  <option value="Flat Community">Flat Community</option>
                  <option value="Flat Community Cost">Flat Community Cost</option>
                  <option value="Forklift">Forklift</option>
                  <option value="MOT-Land">MOT-Land</option>
                  <option value="Manual Handling">Manual Handling</option>
                  <option value="On Forwarding">On Forwarding</option>
                  <option value="On Forwarding (Langsir)">On Forwarding (Langsir)</option>
                  <option value="Other Service">Other Service</option>
                  <option value="Others">Others</option>
                  <option value="Packing">Packing</option>
                  <option value="Port to WH">Port to WH</option>
                  <option value="MOT-Sea">MOT-Sea</option>
                  <option value="Service">Service</option>
                  <option value="Service (Seaport to WH)">Service (Seaport to WH)</option>
                  <option value="Service (WH to WH)">Service (WH to WH)</option>
                  <option value="Standby On Site">Standby On Site</option>
                  <option value="Temporary Storage">Temporary Storage</option>
                  <option value="WH to WH">WH to WH</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <AsyncSelect
                  cacheOptions
                  loadOptions={this.loadOptionsDSA}
                  defaultOptions
                  defaultInputValue={this.state.data_dsa.primary_section[i].service_master}
                  onChange={this.handleChangeDSASection1}
                  name={i+" /// service_master"}
                />
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].price} ></Input>
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label4}
                <Input type="number" name={i+" /// qty"} defaultValue={this.state.data_dsa.primary_section[i].qty} onChange={this.handleChangeFormSection1}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label5}
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].total_price}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label6}
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].short_text}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label7}
                <Input type="textarea" rows="1" readOnly value={this.state.data_dsa.primary_section[i].long_text}></Input>
              </FormGroup>
            </Col>
          </Row>
        )
      }
    }
    section_1.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col>
          <Button onClick={this.addListSection1} size="sm" color="success" style={{margin : '-10px 0px 10px 0px'}}>
            Add List
          </Button>
        </Col>
      </Row>
    )
    return section_1;
  }

  loopSection2 = () => {
    let section_2 = [];
    for (let i = 0; i < this.state.data_dsa.second_section.service_details.length; i++) {
      if (this.state.data_dsa.second_section.service_details[i] !== undefined) {
        let label1, label2, label3, label4, label5, label6, label7;
        if (i === 0) {
          label1 = (<Label><small>Additional Service</small></Label>);
          label2 = (<Label>Service Master</Label>);
          label3 = (<Label>Price</Label>);
          label4 = (<Label>Quantity</Label>);
          label5 = (<Label>Total Price</Label>);
          label6 = (<Label>Short Text</Label>);
          label7 = (<Label>Long Text</Label>);
        }
        section_2.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input type="select" name={i} defaultValue={this.state.data_dsa.second_section.service_details[i].category} onChange={this.handleChangeForm}>
                <option disabled selected hidden>Select</option>
                <option value="Additional Delivery">Additional Delivery</option>
                <option value="MOT-Air">MOT-Air</option>
                <option value="Crane">Crane</option>
                <option value="Custom">Custom</option>
                <option value="Custom Clearance">Custom Clearance</option>
                <option value="Delivery Service">Delivery Service</option>
                <option value="Flat Community">Flat Community</option>
                <option value="Flat Community Cost">Flat Community Cost</option>
                <option value="Forklift">Forklift</option>
                <option value="MOT-Land">MOT-Land</option>
                <option value="Manual Handling">Manual Handling</option>
                <option value="On Forwarding">On Forwarding</option>
                <option value="On Forwarding (Langsir)">On Forwarding (Langsir)</option>
                <option value="Other Service">Other Service</option>
                <option value="Others">Others</option>
                <option value="Packing">Packing</option>
                <option value="Port to WH">Port to WH</option>
                <option value="MOT-Sea">MOT-Sea</option>
                <option value="Service">Service</option>
                <option value="Service (Seaport to WH)">Service (Seaport to WH)</option>
                <option value="Service (WH to WH)">Service (WH to WH)</option>
                <option value="Standby On Site">Standby On Site</option>
                <option value="Temporary Storage">Temporary Storage</option>
                <option value="WH to WH">WH to WH</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <AsyncSelect
                  cacheOptions
                  // value={this.state.data_dsa.second_section.service_details[i].service_master}
                  loadOptions={debounce(this.loadOptionsDSA, 500)}
                  defaultOptions
                  onChange={this.handleChangeDSA}
                  name={i + 1}
                />
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input type="text" readOnly value={this.state.data_dsa.second_section.service_details[i].price}></Input>
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label4}
                <Input type="number" name={i + 3} defaultValue={this.state.data_dsa.second_section.service_details[i].qty} onChange={this.handleChangeForm}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label5}
                <Input type="text" readOnly value={this.state.data_dsa.second_section.service_details[i].total_price}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label6}
                <Input type="text" readOnly value={this.state.data_dsa.second_section.service_details[i].short_text}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label7}
                <Input type="textarea" rows="1" readOnly value={this.state.data_dsa.second_section.service_details[i].long_text}></Input>
              </FormGroup>
            </Col>
          </Row>
        )
      }
    }
    return section_2;
  }

  async handleChangeFormSectionNonDetail3(e) {
    let dataSec = this.state.data_dsa;
    let value = e.target.value;
    let field = e.target.name;
    dataSec["third_section"][field] = value;
    this.setState({ data_dsa: dataSec });
  }

  async handleChangeFormSection3(e) {
    let dataSec = this.state.data_dsa;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSec["third_section"]["service_details"][parseInt(idx)][field] = value;
    console.log("totalValue", dataSec);
    this.setState({ data_dsa: dataSec }, ()=> {
      this.countTotalValue();
    });
  }

  addListSection3(){
    let dataSec = this.state.data_dsa;
    dataSec["third_section"]["service_details"].push({});
    this.setState({ data_dsa: dataSec });
  }

  // handleChangeDSASection3 = async (newValue, e) => {
  //   let dataSec = this.state.data_dsa;
  //   let idxField = e.name.split(" /// ")
  //   let idx = idxField[0];
  //   let field = idxField[1];
  //   if (field === "service_master") {
  //     let dataDSA = this.state.list_dsa_selection.find(e => e._id === newValue.value);
  //     dataSec["primary_section"][parseInt(idx)]['service_master'] = dataDSA.dsa_price_id;
  //     dataSec["primary_section"][parseInt(idx)]['price'] = dataDSA.price;
  //     dataSec["primary_section"][parseInt(idx)]['qty'] = 0;
  //     dataSec["primary_section"][parseInt(idx)]['total_price'] = 0;
  //     dataSec["primary_section"][parseInt(idx)]['short_text'] = dataDSA.short_text;
  //     dataSec["primary_section"][parseInt(idx)]['long_text'] = dataDSA.long_text;
  //   }
  //   this.setState({ data_dsa: dataSec }, ()=>{
  //     this.countTotalValue();
  //   });
  // };

  loopSection3 = () => {
    let section_3 = [];
    for (let i = 0; i < this.state.data_dsa.third_section.service_details.length; i++) {
      if (this.state.data_dsa.third_section.service_details[i] !== undefined) {
        let label0, label1, label2, label3;
        if (i === 0) {
          label0 = (<Label>&nbsp;</Label>);
          label1 = (<Label>Type of Cost</Label>);
          label2 = (<Label>Description</Label>);
          label3 = (<Label>Price</Label>);
        }
        section_3.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label0}
                <div>
                  Additional {i + 1}
                </div>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input type="text" name={i+" /// type_of_cost"}  defaultValue={this.state.data_dsa.third_section.service_details[i].type_of_cost} onChange={this.handleChangeFormSection3}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input type="textarea" rows="1" name={i+" /// description"}  defaultValue={this.state.data_dsa.third_section.service_details[i].description} onChange={this.handleChangeFormSection3}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input type="number" name={i+" /// price"}  defaultValue={this.state.data_dsa.third_section.service_details[i].price} onChange={this.handleChangeFormSection3}></Input>
              </FormGroup>
            </Col>
          </Row>
        )
      }
    }
    section_3.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col>
          <Button onClick={this.addListSection3} size="sm" color="success" style={{margin : '-10px 0px 10px 0px'}}>
            Add List
          </Button>
        </Col>
      </Row>
    )
    return section_3;
  }

  async submitDSA(e) {
    const _id = e.target.id;
    let successUpdate = [];
    let res = await this.patchDatatoAPINODE('/matreq/submitDsa/' + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if (successUpdate.length !== 0) {
      alert('DSA has been submitted!');
      setTimeout(function () { window.location.reload(); }, 2000);
    } else {
      alert('Sorry there is an error, please try again!');
    }
  }

  updateDSA = async (e) => {
    const dataForm = this.state.data_dsa;
    const newDate = new Date();
    const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    let successUpdate = [];

    let section_1 = [];
    for(let i = 0; i < dataForm.primary_section.length; i++){
      if(dataForm.primary_section[i].category !== null){
        section_1.push(
          {
            "category": "MOT",
            "sub_category": dataForm.primary_section[i].sub_category,
            "service_master": dataForm.primary_section[i].service_master,
            "price": dataForm.primary_section[i].price,
            "qty": dataForm.primary_section[i].qty,
            "total_price": dataForm.primary_section[i].total_price,
            "short_text": dataForm.primary_section[i].short_text,
            "long_text": dataForm.primary_section[i].long_text
          }
        )
      }
    }

    let section_2 = [];


    let section_3 = [];
    for(let i = 0; i < dataForm.third_section.service_details.length; i++){
      if(dataForm.third_section.service_details[i].type_of_cost !== undefined){
        section_3.push(
          {
            "type_of_cost":  dataForm.third_section.service_details[i].type_of_cost,
            "description": dataForm.third_section.service_details[i].description,
            "price": dataForm.third_section.service_details[i].price
          }
        )
      }
    }

    let updateDSA = {
      "job_order_number": dataForm.job_order_number,
      "id_po_dsa_doc" : dataForm.id_po_dsa_doc,
      "no_po_dsa" : dataForm.no_po_dsa,
      "po_for_dsp": dataForm.no_po_dsa,
      "po_item_number": dataForm.po_item_number,
      "dimension_volume": dataForm.dimension_volume,
      "dimension_weight": dataForm.dimension_weight,
      "primary_section": section_1,
      "second_section": {
        "po_number": null,
        "service_details": section_2,
      },
      "third_section": {
        "po_number": dataForm.third_section.po_number,
        "dac_number": dataForm.third_section.dac_number,
        "service_details": section_3
      },
      "dsa_total_value": dataForm.dsa_total_value,
    };
    console.log('to be posted', JSON.stringify(updateDSA));
    let fileDocument = new FormData();
    await fileDocument.append('submitType', parseInt(0));
    await fileDocument.append('data', JSON.stringify(updateDSA));
    await fileDocument.append('account_id', "3");
    console.log('to be posted', this.state.inputan_file);
    let res = await this.patchDatatoAPINODE('/matreq/updateDsa/' + this.props.match.params.id, fileDocument);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
        if (res.response.data.error.message !== undefined) {

          this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
    }
  }

  updateDSAAcutalize = async (e) => {
    const dataForm = this.state.data_dsa;
    const newDate = new Date();
    const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    let successUpdate = [];

    let section_1 = [];
    for(let i = 0; i < dataForm.primary_section.length; i++){
      if(dataForm.primary_section[i].category !== null){
        section_1.push(
          {
            "category": "MOT",
            "sub_category": dataForm.primary_section[i].sub_category,
            "service_master": dataForm.primary_section[i].service_master,
            "price": dataForm.primary_section[i].price,
            "qty": dataForm.primary_section[i].qty,
            "total_price": dataForm.primary_section[i].total_price,
            "short_text": dataForm.primary_section[i].short_text,
            "long_text": dataForm.primary_section[i].long_text
          }
        )
      }
    }

    let section_2 = [];


    let section_3 = [];
    for(let i = 0; i < dataForm.third_section.service_details.length; i++){
      if(dataForm.third_section.service_details[i].type_of_cost !== undefined){
        section_3.push(
          {
            "type_of_cost":  dataForm.third_section.service_details[i].type_of_cost,
            "description": dataForm.third_section.service_details[i].description,
            "price": dataForm.third_section.service_details[i].price
          }
        )
      }
    }

    let updateDSA = {
      "job_order_number": dataForm.job_order_number,
      "id_po_dsa_doc" : dataForm.id_po_dsa_doc,
      "no_po_dsa" : dataForm.no_po_dsa,
      "po_for_dsp": dataForm.no_po_dsa,
      "po_item_number": dataForm.po_item_number,
      "dimension_volume": dataForm.dimension_volume,
      "dimension_weight": dataForm.dimension_weight,
      "primary_section": section_1,
      "second_section": {
        "po_number": null,
        "service_details": section_2,
      },
      "third_section": {
        "po_number": dataForm.third_section.po_number,
        "dac_number": dataForm.third_section.dac_number,
        "service_details": section_3
      },
      "dsa_total_value": dataForm.dsa_total_value,
    };
    console.log('to be posted', JSON.stringify(updateDSA));
    let fileDocument = new FormData();
    await fileDocument.append('submitType', parseInt(1));
    await fileDocument.append('data', JSON.stringify(updateDSA));
    await fileDocument.append('dsa_documents', this.state.inputan_file);
    await fileDocument.append('account_id', "3");
    console.log('to be posted', this.state.inputan_file);
    let res = await this.patchDatatoAPINODE('/matreq/updateDsa/' + this.props.match.params.id, fileDocument);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
        if (res.response.data.error.message !== undefined) {

          this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
    }
  }

  async approveDSA(e) {
    const _id = e.target.id;
    let successUpdate = [];
    let res = await this.patchDatatoAPINODE('/matreq/approveDSA/' + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if (successUpdate.length !== 0) {
      alert('DSA has been approved!');
      setTimeout(function () { window.location.reload(); }, 2000);
    } else {
      alert('Sorry there is an error, please try again!');
    }
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL + url, data, {
        headers: {
          'Content-Type': 'application/json',
          'If-Match': _etag
        },
        auth: {
          username: username,
          password: password
        }
      })
      if (respond.status >= 200 && respond.status < 300) {
        console.log('respond patch data', respond);
      }
      return respond;
    } catch (err) {
      let respond = undefined;
      this.setState({ action_status: 'failed', action_message: 'Sorry, there is something wrong, please try again!' });
      console.log('respond patch data', err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(API_URL_NODE + url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err.response);
      return respond;
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  handleChangeForm = async (e) => {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.data_dsa;
    dataForm[parseInt(index)] = value;
    for (let i = 18; i < 55; i = i + 6) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.data_dsa[i - 1];
      }
    }
    for (let i = 67; i < 146; i = i + 7) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.data_dsa[i - 1];
      }
    }
    for (let i = 185; i < 193; i = i + 7) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.data_dsa[i - 1];
      }
    }

    // to get the total value
    let totalValue = 0;
    for (let i = 19; i < 56; i = i + 6) {
      totalValue = totalValue + dataForm[i];
    }
    for (let i = 68; i < 146; i = i + 7) {
      totalValue = totalValue + dataForm[i];
    }
    for (let i = 164; i < 177; i = i + 3) {
      if (dataForm[i] !== null) {
        totalValue = totalValue + parseFloat(dataForm[i]);
      }
    }
    totalValue = totalValue + dataForm[186] + dataForm[193];
    dataForm[197] = parseFloat(totalValue);

    this.setState({ data_dsa: dataForm }, () => {
      console.log("DSA Form", this.state.data_dsa);
    });
  }

  handleChangeDSA = async (newValue, e) => {
    let dataDSA = this.state.list_dsa_selection.find(e => e._id === newValue.value);
    let dataForm = this.state.data_dsa;
    dataForm[parseInt(e.name)] = dataDSA.dsa_price_id;
    dataForm[parseInt(e.name) + 1] = dataDSA.price;
    dataForm[parseInt(e.name) + 2] = 0;
    dataForm[parseInt(e.name) + 4] = dataDSA.short_text;
    dataForm[parseInt(e.name) + 5] = dataDSA.long_text;
    this.setState({ data_dsa: dataForm }, () => {
      console.log("DSA Form", this.state.data_dsa);
    });
  };

  async loadOptionsDSA(inputValue) {
    if (!inputValue) {
      this.setState({ list_dsa_selection: [] });
      return [];
    } else {
      let dsa_list = [];
      const getDSA = await this.getDataFromAPIXL('/dsa_price_sorted?where={"dsa_price_id":{"$regex":"' + inputValue + '", "$options":"i"}}');
      if (getDSA !== undefined && getDSA.data !== undefined) {
        this.setState({ list_dsa_selection: getDSA.data._items }, () =>
          getDSA.data._items.map(dsa =>
            dsa_list.push({ 'label': dsa.dsa_price_id !== undefined ? dsa.dsa_price_id : null, 'value': dsa._id })))
      }
      return dsa_list;
    }
  }

  async loadOptionsPO(inputValue) {
    if (!inputValue) {
      this.setState({ list_po_selection: [] });
      return [];
    } else {
      let po_list = [];
      const getPO = await this.getDataFromAPINODE('/poDsa?where={"po_dsa_no":{"$regex":"' + inputValue + '", "$options":"i"}, "status": "Online"}');
      if (getPO !== undefined && getPO.data !== undefined) {
        this.setState({ list_po_selection: getPO.data.data }, () =>
          getPO.data.data.map(dsa =>
            po_list.push({ 'label': dsa.no_po_dsa !== undefined ? dsa.no_po_dsa : null, 'value': dsa._id })))
      }
      return po_list;
    }
  }

  async handleChangeFormSectionLevel2(e) {
    let dataSec = this.state.data_dsa;
    let value = e.target.value;
    let field = e.target.name;
    dataSec[field] = value;
    this.setState({ data_dsa: dataSec });
  }

  handleChangePO = async (newValue, e) => {
    let dataDSA = this.state.data_dsa;
    let dataPO = this.state.list_po_selection.find(e => e._id === newValue.value);
    let dataForm = this.state.po_selected;
    dataDSA["id_po_dsa_doc"] = dataPO._id;
    dataDSA["no_po_dsa"] = dataPO.no_po_dsa;
    dataDSA["po_for_dsp"] = dataPO.no_po_dsa_system;
    this.setState({ data_dsa: dataDSA });
  };

  handleInputFileDSA = (e) => {
    let fileUpload = null;
    if (e !== undefined && e.target !== undefined && e.target.files !== undefined ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload }, () =>
      console.log(this.state.inputan_file)
    );
  };

  render() {
    return (
      <div className="animated fadeIn" style={{ overflow: "scroll" }}>
        <div style={{ width: "150%" }}>
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
          <Row>
            <Col xs="12" lg="12">
              {this.state.data_dsa !== null && this.state.data_dsa !== undefined && (
                <Card>
                  <CardHeader>
                    <span style={{ lineHeight: '2', fontSize: '17px' }}><i className="fa fa-info-circle" style={{ marginRight: "8px" }}></i>DSA Detail ({this.state.data_dsa.dsa_number})</span>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>MR ID</Label>
                            <Input type="text" readOnly value={this.state.data_dsa.mr_id}></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <h5>MR INFORMATION</h5>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>DSA Number</Label>
                            <Input type="text" name="dsa_number" readOnly value={this.state.data_dsa.dsa_number} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Project</Label>
                            <Input type="text" name="project" readOnly value={this.state.data_dsa.project_name} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>DSP</Label>
                            <Input type="text" name="dsp" readOnly value={this.state.data_dsa.dsp_company} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Job Order Number</Label>
                            <Input type="text" name="job_order_number" defaultValue={this.state.data_dsa.job_order_number} onChange={this.handleChangeFormSectionLevel2}/>
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for DSP</Label>
                            <AsyncSelect
                              cacheOptions
                              loadOptions={this.loadOptionsPO}
                              defaultOptions
                              defaultInputValue={this.state.data_dsa.no_po_dsa}
                              onChange={this.handleChangePO}
                              name="16"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Network Number</Label>
                            <Input type="text" name="network_number" readOnly value={this.state.network_number} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO Item Number</Label>
                            <Input type="text" name="po_item_number" defaultValue={this.state.data_dsa.po_item_number} onChange={this.handleChangeFormSectionLevel2} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <h5>PO UTILIZATION</h5>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Balanced Value</Label>
                            <Input type="text" name="balanced_value" readOnly />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>% Utilization</Label>
                            <Input type="text" name="percent_utilization" readOnly />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Status</Label>
                            <Input type="text" name="status" readOnly />
                          </FormGroup>
                        </Col>
                      </Row>
                      <h5>DETAIL</h5>
                      <Row>
                        <Col md="3">
                          <h6>Destination</h6>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>From</Label>
                            <Input type="text" name="10" value={this.state.data_dsa.origin !== undefined ? this.state.data_dsa.origin.value : ""} onChange={this.handleChangeForm} readOnly />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>To {this.state.data_dsa !== null && (this.state.data_dsa.mr_type === "New" || this.state.data_dsa.mr_type === null) ? "(NE)" : "(Warehouse)"}</Label>
                            <Input type="text" name="11" value={this.state.destination} onChange={this.handleChangeForm} readOnly />
                          </FormGroup>
                          {this.state.data_dsa !== null ? this.state.data_dsa.site_info[1] !== undefined && this.state.data_dsa.mr_type !== "Return" && this.state.data_dsa.mr_type !== "Relocation" ? (
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>To (FE)</Label>
                              <Input type="text" name="11" value={this.state.data_dsa !== null ? this.state.data_dsa.site_info[1].site_id : ""} onChange={this.handleChangeForm} readOnly />
                            </FormGroup>
                          ) : (<div></div>) : (<div></div>)}
                        </Col>
                        <Col md="3">
                          <h6>Dimension</h6>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Vol (m<sup>3</sup>)</Label>
                            <Input type="dimension_volume" name="12" defaultValue={this.state.data_dsa.dimension_volume} onChange={this.handleChangeFormSectionLevel2}/>
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Weight (Kg)</Label>
                            <Input type="dimension_weight" name="13" defaultValue={this.state.data_dsa.dimension_weight} onChange={this.handleChangeFormSectionLevel2}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Address</Label>
                            <Input type="textarea" name="14" rows="3" readOnly value={this.state.data_dsa.origin !== undefined ? this.state.data_dsa.origin.value : ""} />
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.loopSection1()}
                      <h5>SECTION 2 (For additional services which are not covered in PO and not available in contract)</h5>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for Section 2</Label>
                            <Input type="text" name="po_number" defaultValue={this.state.data_dsa.third_section.po_number} onChange={this.handleChangeFormSectionNonDetail3} />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>DAC Number</Label>
                            <Input type="text" name="dac_number" value={this.state.data_dsa.third_section.dac_number} onChange={this.handleChangeFormSectionNonDetail3}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.loopSection3()}
                      <div></div>
                      {/* }<h5>RETURN TO WAREHOUSE DELIVERY</h5>
                      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                        <Col md="1" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Return Delivery</Label>
                            <Input type="text" onChange={this.handleChangeForm} />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Service Master</Label>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Price</Label>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="1" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Quantity</Label>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Total Price</Label>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Short Text</Label>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Label>Long Text</Label>
                            <Input type="textarea" rows="1" readOnly />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                        <Col md="1" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="1" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="text" readOnly />
                          </FormGroup>
                        </Col>
                        <Col md="2" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="textarea" rows="1" readOnly />
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <h5 style={{ display: "none" }}>DSA UPDATE</h5>
                      <Row style={{ paddingLeft: "16px", display: "none" }}>
                        <Col md="1" style={{ paddingLeft: "16px" }}>
                          <FormGroup>
                            <Label>Submission Type</Label>
                          </FormGroup>
                        </Col>
                        <Col md="1" style={{ margin: "0", padding: "4px" }}>
                          <FormGroup>
                            <Input type="select" name="196" onChange={this.handleChangeForm}>
                              <option disabled selected hidden>Select</option>
                              <option value="Actual">Actual</option>
                              <option value="Prebook">Prebook</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <h5>DSA SUMMARY</h5>
                      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                        <Col md="2" style={{ margin: "0", paddingLeft: "16px" }}>
                          <FormGroup>
                            <Label>Total Value</Label>
                            <Input type="text" readOnly value={this.state.data_dsa.dsa_total_value} />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" color="primary" onClick={this.updateDSA} size="sm" ><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i> Update DSA</Button>
                    <Button type="submit" color="primary" style={{marginLeft : '200px'}} onClick={this.toggleActualModal} size="sm" ><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i> Update DSA and state to Actual</Button>
                  </CardFooter>
                </Card>
              )}
            </Col>
          </Row>
        </div>
        {/* Modal Actualization */}
        <ModalCreateNew
          isOpen={this.state.actualModal}
          toggle={this.toggleActualModal}
          className={this.props.className}
          title={"Are you sure state this DSA to Actual?"}
        >
          <div>
            <table>
              <tbody>
                <tr>
                  <td colSpan="3">Please upload the document</td>
                </tr>
                <tr>
                  <td>Upload File</td>
                  <td>:</td>
                  <td>
                    <input
                      type="file"
                      onChange={this.handleInputFileDSA}
                      style={{ padding: "10px", visiblity: "hidden" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ModalFooter>
            <Button
              size="sm"
              block
              color="success"
              className="btn-pill"
              // disabled={this.state.rowsXLS.length === 0}
              onClick={this.updateDSAAcutalize}
              style={{ height: "30px", width: "100px" }}
            >
              State to Actual
            </Button>{" "}
          </ModalFooter>
        </ModalCreateNew>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(DSAEdit);
