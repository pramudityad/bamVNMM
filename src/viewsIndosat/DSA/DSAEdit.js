import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom';
import debounce from "debounce-promise";

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_ISAT = 'https://api-dev.isat.pdb.e-dpm.com/isatapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class DSACreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      list_mr_selection: [],
      list_mr_selected: null,
      create_dsa_form: new Array(200).fill(null),
      network_number: null,
      list_dsa_selection: [],
      list_dsa_selected: new Array(10).fill(null),
      action_status: null,
      action_message: "",
      destination: "",
    }

    this.loadOptionsMR = this.loadOptionsMR.bind(this);
    this.loadOptionsDSA = this.loadOptionsDSA.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.submitDSA = this.submitDSA.bind(this);
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

  async loadOptionsMR(inputValue) {
    if (!inputValue) {
      this.setState({ list_mr_selection: [] });
      return [];
    } else {
      let mr_list = [];
      const getMR = await this.getDataFromAPINODE('/matreq?srt=_id:-1&q={"mr_id":{"$regex":"' + inputValue + '", "$options":"i"}}');
      if (getMR !== undefined && getMR.data !== undefined) {
        this.setState({ list_mr_selection: getMR.data.data }, () =>
          getMR.data.data.map(mr =>
            mr_list.push({ 'label': mr.mr_id !== undefined ? mr.mr_id : null, 'value': mr._id })))
      }
      return mr_list;
    }
  }

  handleChangeMR = async (newValue) => {
    let dataMR = this.state.list_mr_selection.find(e => e._id === newValue.value);
    console.log("dataMR", dataMR);
    this.setState({ list_mr_selected: dataMR });
    if (dataMR.mr_type === "Return" || dataMR.mr_type === "Relocation") {
      this.setState({ destination: dataMR.destination.value });
    } else {
      this.setState({ destination: dataMR.site_info[0].site_id });
    }
    const getNN = await this.getDataFromAPIXL('/custdel_sorted_non_page?where={"WP_ID":"' + dataMR.cust_del[0].cd_id + '"}');
    this.setState({ network_number: getNN.data._items[0].CD_Info_Network_Number });
    // this.setState({network_number : "test1234971"});
    let dataForm = this.state.create_dsa_form;
    dataForm[0] = dataMR.mr_id + "D";
    dataForm[1] = dataMR.project_name;
    dataForm[2] = dataMR.dsp_company;
    dataForm[3] = dataMR.job_order_number;
    dataForm[4] = dataMR.po_for_dsp;
    dataForm[5] = this.state.network_number;
    dataForm[6] = dataMR.po_item_number;
    // dataForm[7] = balanced value;
    // dataForm[8] = % utilization;
    // dataForm[9] = status;
    dataForm[14] = dataMR.origin.value;
    this.setState({ create_dsa_form: dataForm }, () => {
      console.log("DSA Form", this.state.create_dsa_form);
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

  handleChangeDSA = async (newValue, e) => {
    let dataDSA = this.state.list_dsa_selection.find(e => e._id === newValue.value);
    let dataForm = this.state.create_dsa_form;
    dataForm[parseInt(e.name)] = dataDSA.dsa_price_id;
    dataForm[parseInt(e.name) + 1] = dataDSA.price;
    dataForm[parseInt(e.name) + 2] = 0;
    dataForm[parseInt(e.name) + 4] = dataDSA.short_text;
    dataForm[parseInt(e.name) + 5] = dataDSA.long_text;
    this.setState({ create_dsa_form: dataForm }, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
  };

  async handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.create_dsa_form;
    dataForm[parseInt(index)] = value;
    for (let i = 18; i < 55; i = i + 6) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.create_dsa_form[i - 1];
      }
    }
    for (let i = 67; i < 146; i = i + 7) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.create_dsa_form[i - 1];
      }
    }
    for (let i = 185; i < 193; i = i + 7) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.create_dsa_form[i - 1];
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

    this.setState({ create_dsa_form: dataForm }, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
  }

  loopSection1 = () => {
    let section_1 = [];
    section_1.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Details</Label>
            <Input type="select" name="15" onChange={this.handleChangeForm}>
              <option value="" disabled selected hidden>MOT</option>
              <option value="MOT-Land">MOT-Land</option>
              <option value="MOT-Air">MOT-Air</option>
              <option value="MOT-Sea">MOT-Sea</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Service Master</Label>
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
            <Label>Price</Label>
            <Input type="text" name="17" value={this.state.create_dsa_form[17] !== null ? this.state.create_dsa_form[17] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Quantity</Label>
            <Input type="number" name="18" value={this.state.create_dsa_form[18] !== null ? this.state.create_dsa_form[18] : ""} onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Total Price</Label>
            <Input type="text" name="19" readOnly value={this.state.create_dsa_form[17] !== null && this.state.create_dsa_form[18] !== null ? this.state.create_dsa_form[17] * this.state.create_dsa_form[18] : ""} onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Short Text</Label>
            <Input type="text" name="20" value={this.state.create_dsa_form[20] !== null ? this.state.create_dsa_form[20] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Long Text</Label>
            <Input type="textarea" name="21" rows="1" value={this.state.create_dsa_form[21] !== null ? this.state.create_dsa_form[21] : ""} readOnly />
          </FormGroup>
        </Col>
      </Row>
    );
    let k = 58;
    for (let i = 0; i < 25; i = i + 6) {
      section_1.push(
        <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <Input type="select" name={k} onChange={this.handleChangeForm}>
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
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <AsyncSelect
                cacheOptions
                loadOptions={debounce(this.loadOptionsDSA, 500)}
                defaultOptions
                onChange={this.handleChangeDSA}
                name={i + 22}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Input type="text" name={i + 23} value={this.state.create_dsa_form[i + 23] !== null ? this.state.create_dsa_form[i + 23] : ""} readOnly />
            </FormGroup>
          </Col>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Input type="number" name={i + 24} onChange={this.handleChangeForm} value={this.state.create_dsa_form[i + 24] !== null ? this.state.create_dsa_form[i + 24] : ""} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Input type="text" name={i + 25} readOnly value={this.state.create_dsa_form[i + 23] !== null && this.state.create_dsa_form[i + 24] !== null ? this.state.create_dsa_form[i + 23] * this.state.create_dsa_form[i + 24] : ""} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Input type="text" name={i + 26} value={this.state.create_dsa_form[i + 26] !== null ? this.state.create_dsa_form[i + 26] : ""} readOnly />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Input type="textarea" name={i + 27} rows="1" value={this.state.create_dsa_form[i + 27] !== null ? this.state.create_dsa_form[i + 27] : ""} readOnly />
            </FormGroup>
          </Col>
        </Row>
      )
      k++;
    }
    section_1.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          Flat Community
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <AsyncSelect
              cacheOptions
              loadOptions={debounce(this.loadOptionsDSA, 500)}
              defaultOptions
              onChange={this.handleChangeDSA}
              name="52"
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Input type="text" name="53" value={this.state.create_dsa_form[53] !== null ? this.state.create_dsa_form[53] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Input type="number" name="54" value={this.state.create_dsa_form[54] !== null ? this.state.create_dsa_form[54] : ""} onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Input type="text" name="55" readOnly value={this.state.create_dsa_form[53] !== null && this.state.create_dsa_form[54] !== null ? this.state.create_dsa_form[53] * this.state.create_dsa_form[54] : ""} onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Input type="text" name="56" value={this.state.create_dsa_form[56] !== null ? this.state.create_dsa_form[56] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Input type="textarea" name="57" rows="1" value={this.state.create_dsa_form[57] !== null ? this.state.create_dsa_form[57] : ""} readOnly />
          </FormGroup>
        </Col>
      </Row>
    )
    return section_1;
  }

  loopSection2 = () => {
    let section_2 = [];
    for (let i = 64; i < 142; i = i + 7) {
      let label1, label2, label3, label4, label5, label6, label7;
      if (i === 64) {
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
              <Input type="select" name={i} onChange={this.handleChangeForm}>
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
              <Input type="text" name={i + 2} value={this.state.create_dsa_form[i + 2] !== null ? this.state.create_dsa_form[i + 2] : ""} readOnly />
            </FormGroup>
          </Col>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label4}
              <Input type="number" name={i + 3} value={this.state.create_dsa_form[i + 3] !== null ? this.state.create_dsa_form[i + 3] : ""} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label5}
              <Input type="text" name={i + 4} readOnly value={this.state.create_dsa_form[i + 2] !== null && this.state.create_dsa_form[i + 3] !== null ? this.state.create_dsa_form[i + 2] * this.state.create_dsa_form[i + 3] : ""} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label6}
              <Input type="text" name={i + 5} readOnly value={this.state.create_dsa_form[i + 5] !== null ? this.state.create_dsa_form[i + 5] : ""} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label7}
              <Input type="textarea" name={i + 6} rows="1" readOnly value={this.state.create_dsa_form[i + 6] !== null ? this.state.create_dsa_form[i + 6] : ""} />
            </FormGroup>
          </Col>
        </Row>
      )
    }
    return section_2;
  }

  loopSection3 = () => {
    let section_3 = [];
    let k = 1;
    for (let i = 162; i < 175; i = i + 3) {
      let label0, label1, label2, label3;
      if (i === 162) {
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
                Additional {k}
              </div>
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label1}
              <Input type="text" name={i} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label2}
              <Input type="textarea" name={i + 1} rows="1" onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label3}
              <Input type="number" name={i + 2} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
        </Row>
      )
      k++;
    }
    return section_3;
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

  async submitDSA(e) {
    const dataForm = this.state.create_dsa_form;
    const newDate = new Date();
    const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
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
    let res = await this.patchDatatoAPINODE('/matreq/dsaCreation/' + _id, { "account_id": "3", "data": updateDSA });
    if (res !== undefined) {
      if (res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if (successUpdate.length !== 0) {
      alert('New DSA has been created!');
      this.setState({ action_status: "success", action_message: 'New DSA has been created!' });
      setTimeout(function () { window.location.reload(); }, 2000);
    } else {
      alert('Failed to create DSA, please try again!');
      this.setState({ action_status: "error", action_message: 'Failed to create DSA, please try again!' });
    }
  }

  componentDidMount() {
    document.title = 'DSA Creation | BAM';
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn" style={{ overflow: "scroll" }}>
        <div style={{ width: "150%" }}>
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <span style={{ lineHeight: '2', fontSize: '17px' }}><i className="fa fa-edit" style={{ marginRight: "8px" }}></i>DSA Creation</span>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>MR ID</Label>
                          <AsyncSelect
                            cacheOptions
                            loadOptions={debounce(this.loadOptionsMR, 500)}
                            defaultOptions
                            onChange={this.handleChangeMR}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>MR INFORMATION</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>DSA Number</Label>
                          <Input type="text" name="dsa_number" readOnly value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.mr_id + "D" : ""} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Project</Label>
                          <Input type="text" name="project" readOnly value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.project_name : ""} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>DSP</Label>
                          <Input type="text" name="dsp" readOnly value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.dsp_company : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Job Order Number</Label>
                          <Input type="text" name="3" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.job_order_number : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO for DSP</Label>
                          <Input type="text" name="4" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.po_for_dsp : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Network Number</Label>
                          <Input type="text" name="network_number" readOnly value={this.state.network_number !== null ? this.state.network_number : ""} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO Item Number</Label>
                          <Input type="text" name="6" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.po_item_number : ""} onChange={this.handleChangeForm} />
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
                          <Input type="text" name="10" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.origin.title + " " + this.state.list_mr_selected.origin.value : ""} onChange={this.handleChangeForm} readOnly />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>To {this.state.list_mr_selected !== null && (this.state.list_mr_selected.mr_type === "New" || this.state.list_mr_selected.mr_type === null) ? "(Site NE)" : "(Warehouse)"}</Label>
                          <Input type="text" name="11" value={this.state.destination} onChange={this.handleChangeForm} readOnly />
                        </FormGroup>
                        {this.state.list_mr_selected !== null ? this.state.list_mr_selected.site_info[1] !== undefined && this.state.list_mr_selected.mr_type !== "Return" && this.state.list_mr_selected.mr_type !== "Relocation" ? (
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>To (Site FE)</Label>
                            <Input type="text" name="11" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.site_info[1].site_id : ""} onChange={this.handleChangeForm} readOnly />
                          </FormGroup>
                        ) : (<div></div>) : (<div></div>)}
                      </Col>
                      <Col md="3">
                        <h6>Dimension</h6>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Vol (m<sup>3</sup>)</Label>
                          <Input type="number" name="12" onChange={this.handleChangeForm} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Weight (Kg)</Label>
                          <Input type="number" name="13" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection1()}
                    <h5>SECTION 2 (For additional services which are not covered in PO and available in contract)</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO for Section 2</Label>
                          <Input type="text" name="63" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection2()}
                    <h5>SECTION 3 (For additional services which are not covered in PO and not available in contract)</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO for Section 3</Label>
                          <Input type="text" name="160" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>DAC Number</Label>
                          <Input type="text" name="161" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection3()}
                    <h5>RETURN TO WAREHOUSE DELIVERY</h5>
                    <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                      <Col md="1" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Return Delivery</Label>
                          <Input type="text" name="182" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Service Master</Label>
                          <AsyncSelect
                            cacheOptions
                            loadOptions={debounce(this.loadOptionsDSA, 500)}
                            defaultOptions
                            onChange={this.handleChangeDSA}
                            name={183}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Price</Label>
                          <Input type="text" name="184" value={this.state.create_dsa_form[184] !== null ? this.state.create_dsa_form[184] : ""} readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Quantity</Label>
                          <Input type="number" name="185" value={this.state.create_dsa_form[185] !== null ? this.state.create_dsa_form[185] : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Total Price</Label>
                          <Input type="text" name="186" value={this.state.create_dsa_form[186] !== null ? this.state.create_dsa_form[186] : ""} readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Short Text</Label>
                          <Input type="text" name="187" value={this.state.create_dsa_form[187] !== null ? this.state.create_dsa_form[187] : ""} readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Label>Long Text</Label>
                          <Input type="textarea" name="188" rows="1" value={this.state.create_dsa_form[188] !== null ? this.state.create_dsa_form[188] : ""} readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                      <Col md="1" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input type="text" name="189" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <AsyncSelect
                            cacheOptions
                            loadOptions={debounce(this.loadOptionsDSA, 500)}
                            defaultOptions
                            onChange={this.handleChangeDSA}
                            name={190}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input type="text" name="191" value={this.state.create_dsa_form[191] !== null ? this.state.create_dsa_form[191] : ""} readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input type="number" name="192" value={this.state.create_dsa_form[192] !== null ? this.state.create_dsa_form[192] : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input type="text" name="193" value={this.state.create_dsa_form[193] !== null ? this.state.create_dsa_form[193] : ""} readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input type="text" name="194" value={this.state.create_dsa_form[194] !== null ? this.state.create_dsa_form[194] : ""} readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input type="textarea" name="195" rows="1" value={this.state.create_dsa_form[195] !== null ? this.state.create_dsa_form[195] : ""} readOnly />
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
                          <Input type="text" name="197" value={this.state.create_dsa_form[197] !== null ? this.state.create_dsa_form[197] : ""} readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary" disabled={this.state.list_mr_selected === null} onClick={this.submitDSA} id={this.state.list_mr_selected !== null ? this.state.list_mr_selected._id : ""} value={this.state.list_mr_selected !== null ? this.state.list_mr_selected._etag : ""}><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i> Create DSA</Button>
                </CardFooter>
              </Card>
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

export default connect(mapStateToProps)(DSACreation);
