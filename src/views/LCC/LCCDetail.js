import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

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

class LCCDetail extends Component {
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
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].category}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].service_master}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].price}></Input>
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label4}
                <Input type="text" readOnly value={this.state.data_dsa.primary_section[i].qty}></Input>
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
                <Input type="text" readOnly value={this.state.data_dsa.second_section.service_details[i].category}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input type="text" readOnly value={this.state.data_dsa.second_section.service_details[i].service_master}></Input>
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
                <Input type="text" readOnly value={this.state.data_dsa.second_section.service_details[i].qty}></Input>
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
                <Input type="text" readOnly value={this.state.data_dsa.third_section.service_details[i].type_of_cost}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input type="textarea" rows="1" readOnly value={this.state.data_dsa.third_section.service_details[i].description}></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input type="text" readOnly value={this.state.data_dsa.third_section.service_details[i].price}></Input>
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

  render() {
    return (
      <div className="animated fadeIn" style={{ overflow: "scroll" }}>
        <div style={{ width: "150%" }}>
          <Row>
            <Col xs="12" lg="12">
              {this.state.data_dsa !== null && (
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
                            <Input type="text" name="3" readOnly value={this.state.data_dsa.job_order_number} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for DSP</Label>
                            <Input type="text" name="4" readOnly value={this.state.data_dsa.po_for_dsp} />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Network Number</Label>
                            <Input type="text" name="network_number" readOnly value={this.state.network_number} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO Item Number</Label>
                            <Input type="text" name="6" readOnly value={this.state.data_dsa.po_item_number} />
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
                            <Input type="number" name="12" readOnly value={this.state.data_dsa.dimension_volume} />
                          </FormGroup>
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>Weight (Kg)</Label>
                            <Input type="number" name="13" readOnly value={this.state.data_dsa.dimension_weight} />
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
                            <Input type="text" name="63" readOnly value={this.state.data_dsa.second_section.po_number} />
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.loopSection2()}
                      <h5>SECTION 3 (For additional services which are not covered in PO and not available in contract)</h5>
                      <Row>
                        <Col md="3">
                          <FormGroup style={{ paddingLeft: "16px" }}>
                            <Label>PO for Section 3</Label>
                            <Input type="text" readOnly value={this.state.data_dsa.third_section.po_number} />
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
                            <Input type="text" readOnly />
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

export default connect(mapStateToProps)(LCCDetail);
