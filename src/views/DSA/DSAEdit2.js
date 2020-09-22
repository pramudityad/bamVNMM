import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import debounce from "debounce-promise";
import './DSA.css'

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';
const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

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
      destination: ""
    }

    this.submitDSA = this.submitDSA.bind(this);
    this.approveDSA = this.approveDSA.bind(this);
  }

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
      let respond = await axios.get(API_URL_XL + url, {
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

  loopSection1 = () => {
    let section_1 = [];
    for (let i = 0; i < this.state.data_dsa.primary_section.length; i++) {
      if (this.state.data_dsa.primary_section[i] !== undefined) {
        let label1, label2, label3, label4, label5, label6, label7;
        if (i === 0) {
          label1 = (<Label>Details</Label>);
          label2 = (<Label>Service Master</Label>);
          label3 = (<Label>Price</Label>);
          label4 = (<Label>Quantity</Label>);
          label5 = (<Label>Total Price</Label>);
          label6 = (<Label>Short Text</Label>);
          label7 = (<Label>Long Text</Label>);
        }
        section_1.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }} key={this.state.data_dsa.primary_section[i].service_master}>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input type="select" name="15" defaultValue={this.state.data_dsa.primary_section[i].category} onChange={this.handleChangeForm}>
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
              loadOptions={debounce(this.loadOptionsDSA, 500)}
              defaultOptions
              onChange={this.handleChangeDSA}
              name="16"
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
                <Input type="number" defaultValue={this.state.data_dsa.primary_section[i].qty} onChange={this.handleChangeForm}></Input>
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
                <Input type="text" name={i} defaultValue={this.state.data_dsa.third_section.service_details[i].type_of_cost} onChange={this.handleChangeForm}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input type="textarea" rows="1" name={i + 1} defaultValue={this.state.data_dsa.third_section.service_details[i].description} onChange={this.handleChangeForm}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input type="number" name={i + 2} defaultValue={this.state.data_dsa.third_section.service_details[i].price} onChange={this.handleChangeForm}></Input>
              </FormGroup>
            </Col>
          </Row>
        )
      }
    }
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
    // const _etag = e.target.value;
    // const _id = e.target.id;
    let successUpdate = [];

    let section_1 = [];
    if (dataForm[16] !== null) {
      section_1.push(
        {
          "category": "MOT",
          "sub_category": dataForm[15],
          "service_master": dataForm[16],
          "price": dataForm[17],
          "qty": dataForm[18],
          "total_price": dataForm[19],
          "short_text": dataForm[20],
          "long_text": dataForm[21]
        }
      )
    }
    let k = 58;
    for (let i = 22; i < 47; i = i + 6) {
      let data_section_1 = {
        "category": dataForm[k],
        "sub_category": null,
        "service_master": dataForm[i],
        "price": dataForm[i + 1],
        "qty": dataForm[i + 2],
        "total_price": dataForm[i + 3],
        "short_text": dataForm[i + 4],
        "long_text": dataForm[i + 5]
      }
      if (dataForm[i] !== null) {
        section_1.push(data_section_1);
      }
      k++;
    }
    let data_section_1b = {
      "category": "Flat Community",
      "sub_category": null,
      "service_master": dataForm[52],
      "price": dataForm[53],
      "qty": dataForm[54],
      "total_price": dataForm[55],
      "short_text": dataForm[56],
      "long_text": dataForm[57]
    }
    if (dataForm[52] !== null) {
      section_1.push(data_section_1b);
    }

    let section_2 = [];
    for (let i = 64; i < 142; i = i + 7) {
      let data_section_2 = {
        "category": dataForm[i],
        "sub_category": null,
        "service_master": dataForm[i + 1],
        "price": dataForm[i + 2],
        "qty": dataForm[i + 3],
        "total_price": dataForm[i + 4],
        "short_text": dataForm[i + 5],
        "long_text": dataForm[i + 6]
      }
      if (dataForm[i + 1] !== null) {
        section_2.push(data_section_2);
      }
    }

    let section_3 = [];
    for (let i = 162; i < 175; i = i + 3) {
      let data_section_3 = {
        "type_of_cost": dataForm[i],
        "description": dataForm[i + 1],
        "price": dataForm[i + 2]
      }
      if (dataForm[i] !== null) {
        section_3.push(data_section_3);
      }
    }

    let updateDSA = {
      "dsa_number": dataForm[0],
      "job_order_number": dataForm[3],
      "po_for_dsp": dataForm[4],
      "po_item_number": dataForm[6],
      "dimension_volume": dataForm[12],
      "dimension_weight": dataForm[13],
      "primary_section": section_1,
      "second_section": {
        "po_number": dataForm[63],
        "service_details": section_2,
      },
      "third_section": {
        "po_number": dataForm[160],
        "dac_number": dataForm[161],
        "service_details": section_3
      },
      "dsa_total_value": dataForm[197],
      "current_dsa_status": "DSA CREATED",
      "dsa_status": [
        {
          "dsa_status_name": "DSA",
          "dsa_status_value": "CREATED",
          "dsa_status_date": dateNow,
          "dsa_status_updater": this.state.userEmail,
          "dsa_status_updater_id": this.state.userId
        }
      ]
    };
    console.log('to be posted', JSON.stringify(updateDSA));
    let res = await this.patchDatatoAPINODE('/matreq/updateDsa/' + this.props.match.params.id, { "account_id": "2", "data": updateDSA });
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
                            <Input type="text" name="3" defaultValue={this.state.data_dsa.job_order_number} onChange={this.handleChangeForm}/>
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for DSP</Label>
                            <Input type="text" name="4" defaultValue={this.state.data_dsa.po_for_dsp} onChange={this.handleChangeForm}/>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Network Number</Label>
                            <Input type="text" name="network_number" readOnly value={this.state.network_number} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO Item Number</Label>
                            <Input type="text" name="6" defaultValue={this.state.data_dsa.po_item_number} onChange={this.handleChangeForm} />
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
                            <Label>To {this.state.data_dsa !== null && (this.state.data_dsa.mr_type === "New" || this.state.data_dsa.mr_type === null) ? "(Site NE)" : "(Warehouse)"}</Label>
                            <Input type="text" name="11" value={this.state.destination} onChange={this.handleChangeForm} readOnly />
                          </FormGroup>
                          {this.state.data_dsa !== null ? this.state.data_dsa.site_info[1] !== undefined && this.state.data_dsa.mr_type !== "Return" && this.state.data_dsa.mr_type !== "Relocation" ? (
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>To (Site FE)</Label>
                              <Input type="text" name="11" value={this.state.data_dsa !== null ? this.state.data_dsa.site_info[1].site_id : ""} onChange={this.handleChangeForm} readOnly />
                            </FormGroup>
                          ) : (<div></div>) : (<div></div>)}
                        </Col>
                        <Col md="3">
                          <h6>Dimension</h6>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Vol (m<sup>3</sup>)</Label>
                            <Input type="number" name="12" defaultValue={this.state.data_dsa.dimension_volume} onChange={this.handleChangeForm}/>
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Weight (Kg)</Label>
                            <Input type="number" name="13" defaultValue={this.state.data_dsa.dimension_weight} onChange={this.handleChangeForm}/>
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
                      <h5>SECTION 2 (For additional services which are not covered in PO and available in contract)</h5>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for Section 2</Label>
                            <Input type="text" name="63" defaultValue={this.state.data_dsa.second_section.po_number} onChange={this.handleChangeForm}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.loopSection2()}
                      <h5>SECTION 3 (For additional services which are not covered in PO and not available in contract)</h5>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for Section 3</Label>
                            <Input type="text" defaultValue={this.state.data_dsa.third_section.po_number} onChange={this.handleChangeForm} />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>DAC Number</Label>
                            <Input type="text" readOnly value={this.state.data_dsa.third_section.dac_number} />
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.loopSection3()}
                      <h5>RETURN TO WAREHOUSE DELIVERY</h5>
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
                      </Row>
                      <h5>POD FILE</h5>
                      <Row style={{ paddingLeft: "16px" }}>
                        <Col md="3">
                          <FormGroup>
                            <Input type="textarea" readOnly value="This field is reserved for POD file" />
                          </FormGroup>
                        </Col>
                      </Row>
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
                    <Button color="primary" id={this.state.data_dsa._id} value={this.state.data_dsa._etag} onClick={this.submitDSA} hidden={this.state.data_dsa.current_dsa_status === "DSA SUBMITTED" || this.state.data_dsa.current_dsa_status === "DSA APPROVED"}><i className="fa fa-check" style={{ marginRight: "8px" }}></i> Submit DSA</Button>
                    <Button color="primary" id={this.state.data_dsa._id} value={this.state.data_dsa._etag} onClick={this.approveDSA} hidden={this.state.data_dsa.current_dsa_status === "DSA CREATED" || this.state.data_dsa.current_dsa_status === "DSA UPDATED" || this.state.data_dsa.current_dsa_status === "DSA APPROVED" || this.state.data_dsa.current_dsa_status === "DSA NEED REVISION"}><i className="fa fa-check" style={{ marginRight: "8px" }}></i> Approve DSA</Button>
                    <Button type="submit" color="primary" onClick={this.updateDSA} ><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i> Update DSA</Button>
                  </CardFooter>
                </Card>
              )}
            </Col>
          </Row>
        </div>
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
