import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom';

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

class DSACreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list_mr_selection: [],
      list_mr_selected : null,
      create_dsa_form : new Array(200).fill(null),
      network_number : null,
      list_dsa_selection : [],
      list_dsa_selected : new Array(10).fill(null)
    }

    this.loadOptionsMR = this.loadOptionsMR.bind(this);
    this.loadOptionsDSA = this.loadOptionsDSA.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: username,
          password: password
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

  async getDataFromAPI_tsel(url) {
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

  async loadOptionsMR(inputValue) {
    if(!inputValue) {
      this.setState({list_mr_selection : []});
      return [];
    } else {
      let mr_list = [];
      const getMR = await this.getDataFromAPI('/mr_sorted_nonpage?where={"mr_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getMR !== undefined && getMR.data !== undefined) {
        this.setState({list_mr_selection : getMR.data._items}, () =>
        getMR.data._items.map(mr =>
          mr_list.push({'label' : mr.mr_id !== undefined ? mr.mr_id : null, 'value' :mr._id})))
      }
      return mr_list;
    }
  }

  handleChangeMR = async (newValue) => {
    let dataMR = this.state.list_mr_selection.find(e => e._id === newValue.value);
    this.setState({list_mr_selected : dataMR});
    const getNN = await this.getDataFromAPI_tsel('/custdel_sorted_non_page?where={"WP_ID":"'+dataMR.cd_id+'"}');
    this.setState({network_number : getNN.data._items[0].CD_Info_Network_Number});
    let dataForm = this.state.create_dsa_form;
    dataForm[0] = dataMR.mr_id+"D";
    dataForm[1] = dataMR.project_name;
    dataForm[2] = dataMR.dsp_company;
    dataForm[3] = dataMR.job_order_number;
    dataForm[4] = dataMR.po_for_dsp;
    dataForm[5] = this.state.network_number;
    dataForm[6] = dataMR.po_item_number;
    // dataForm[7] = balanced value;
    // dataForm[8] = % utilization;
    // dataForm[9] = status;
    this.setState({create_dsa_form : dataForm}, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
  };

  async loadOptionsDSA(inputValue) {
    if(!inputValue) {
      this.setState({list_dsa_selection : []});
      return [];
    } else {
      let dsa_list = [];
      const getDSA = await this.getDataFromAPI_tsel('/dsa_price_sorted?where={"dsa_price_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getDSA !== undefined && getDSA.data !== undefined) {
        this.setState({list_dsa_selection : getDSA.data._items}, () =>
        getDSA.data._items.map(dsa =>
          dsa_list.push({'label' : dsa.dsa_price_id !== undefined ? dsa.dsa_price_id : null, 'value' : dsa._id})))
      }
      return dsa_list;
    }
  }

  handleChangeDSA = async (newValue, e) => {
    let dataDSA = this.state.list_dsa_selection.find(e => e._id === newValue.value);
    let dataForm = this.state.create_dsa_form;
    dataForm[parseInt(e.name)] = dataDSA.dsa_price_id;
    dataForm[parseInt(e.name)+1] = dataDSA.price;
    dataForm[parseInt(e.name)+4] = dataDSA.short_text;
    dataForm[parseInt(e.name)+5] = dataDSA.long_text;
    this.setState({create_dsa_form : dataForm}, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
  };

  async handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.create_dsa_form;
    dataForm[parseInt(index)] = value;
    for(let i = 18; i < 55; i=i+6) {
      if(dataForm[i-1] !== null && dataForm[i] !== null) {
        dataForm[i+1] = dataForm[i]*this.state.create_dsa_form[i-1];
      }
    }
    for(let i = 67; i < 146; i=i+7) {
      if(dataForm[i-1] !== null && dataForm[i] !== null) {
        dataForm[i+1] = dataForm[i]*this.state.create_dsa_form[i-1];
      }
    }
    this.setState({create_dsa_form : dataForm}, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
  }

  loopSection1 = () => {
    let section_1 = [];
    section_1.push(
      <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
        <Col md="1" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Details</Label>
            <Input type="select" name="15" onChange={this.handleChangeForm}>
              <option value="" disabled selected hidden>MOT</option>
              <option value="Land">Land</option>
              <option value="Air">Air</option>
              <option value="Sea">Sea</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Service Master</Label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.loadOptionsDSA}
              defaultOptions
              onChange={this.handleChangeDSA}
              name="16"
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Price</Label>
            <Input type="text" name="17" value={this.state.create_dsa_form[17] !== null ? this.state.create_dsa_form[17] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="1" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Quantity</Label>
            <Input type="text" name="18" onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Total Price</Label>
            <Input type="text" name="19" readOnly value={this.state.create_dsa_form[17] !== null && this.state.create_dsa_form[18] !== null ? this.state.create_dsa_form[17]*this.state.create_dsa_form[18] : ""} onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Short Text</Label>
            <Input type="text" name="20" value={this.state.create_dsa_form[20] !== null ? this.state.create_dsa_form[20] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Label>Long Text</Label>
            <Input type="textarea" name="21" rows="1" value={this.state.create_dsa_form[21] !== null ? this.state.create_dsa_form[21] : ""} readOnly />
          </FormGroup>
        </Col>
      </Row>
    );
    for(let i = 0; i < 25; i=i+6) {
      section_1.push(
        <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <AsyncSelect
                cacheOptions
                loadOptions={this.loadOptionsDSA}
                defaultOptions
                onChange={this.handleChangeDSA}
                name={i+22}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Input type="text" name={i+23} value={this.state.create_dsa_form[i+23] !== null ? this.state.create_dsa_form[i+23] : ""} readOnly />
            </FormGroup>
          </Col>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Input type="text" name={i+24} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Input type="text" name={i+25} readOnly value={this.state.create_dsa_form[i+23] !== null && this.state.create_dsa_form[i+24] !== null ? this.state.create_dsa_form[i+23]*this.state.create_dsa_form[i+24] : ""} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Input type="text" name={i+26} value={this.state.create_dsa_form[i+26] !== null ? this.state.create_dsa_form[i+26] : ""} readOnly />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              <Input type="textarea" name={i+27} rows="1" value={this.state.create_dsa_form[i+27] !== null ? this.state.create_dsa_form[i+27] : ""} readOnly />
            </FormGroup>
          </Col>
        </Row>
      )
    }
    section_1.push(
      <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
        <Col md="1" style={{margin:"0", padding:"4px"}}>
          Flat Community
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <AsyncSelect
              cacheOptions
              loadOptions={this.loadOptionsDSA}
              defaultOptions
              onChange={this.handleChangeDSA}
              name="52"
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Input type="text" name="53" value={this.state.create_dsa_form[53] !== null ? this.state.create_dsa_form[53] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="1" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Input type="text" name="54" onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Input type="text" name="55" readOnly value={this.state.create_dsa_form[53] !== null && this.state.create_dsa_form[54] !== null ? this.state.create_dsa_form[53]*this.state.create_dsa_form[54] : ""} onChange={this.handleChangeForm} />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
          <FormGroup>
            <Input type="text" name="56" value={this.state.create_dsa_form[56] !== null ? this.state.create_dsa_form[56] : ""} readOnly />
          </FormGroup>
        </Col>
        <Col md="2" style={{margin:"0", padding:"4px"}}>
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
    let text;
    for(let i = 64; i < 142; i=i+7) {
      if(i === 64) {
        text = "Temp Storage <= 7 days";
      } else if(i === 71) {
        text = "Temp Storage > 7 days";
      } else if(i === 78) {
        text = "Packing Wooden +";
      } else if(i === 85) {
        text = "Packing Wooden";
      } else if(i === 92) {
        text = "Packing Crate";
      } else if(i === 99) {
        text = (<small>Packing Carton Box RBS/BBS/Recti</small>);
      } else if(i === 106) {
        text = "Packing Carton Accessories";
      } else if(i === 113) {
        text = "Manual Handling";
      } else if(i === 120) {
        text = "Hoisting Gear";
      } else if(i === 127) {
        text = "Crane";
      } else if(i === 134) {
        text = "Forklift";
      } else if(i === 141) {
        text = "Langsir";
      } 

      let label0, label1, label2, label3, label4, label5, label6, label7;
      if(i === 64) {
        label0 = (<Label>&nbsp;</Label>);
        label1 = (<Label>Additional Service</Label>);
        label2 = (<Label>Service Master</Label>);
        label3 = (<Label>Price</Label>);
        label4 = (<Label>Quantity</Label>);
        label5 = (<Label>Total Price</Label>);
        label6 = (<Label>Short Text</Label>);
        label7 = (<Label>Long Text</Label>);
      }
      section_2.push(
        <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label0}
              <div>
                {text}
              </div>
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label1}
              <Input type="text" name={i} readOnly />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label2}
              <AsyncSelect
                cacheOptions
                loadOptions={this.loadOptionsDSA}
                defaultOptions
                onChange={this.handleChangeDSA}
                name={i+1}
              />
            </FormGroup>
          </Col>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label3}
              <Input type="text" name={i+2} value={this.state.create_dsa_form[i+2] !== null ? this.state.create_dsa_form[i+2] : ""} readOnly />
            </FormGroup>
          </Col>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label4}
              <Input type="text" name={i+3} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label5}
              <Input type="text" name={i+4} readOnly value={this.state.create_dsa_form[i+2] !== null && this.state.create_dsa_form[i+3] !== null ? this.state.create_dsa_form[i+2]*this.state.create_dsa_form[i+3] : ""} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label6}
              <Input type="text" name={i+5} readOnly value={this.state.create_dsa_form[i+5] !== null ? this.state.create_dsa_form[i+5] : ""} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label7}
              <Input type="textarea" name={i+6} rows="1" readOnly value={this.state.create_dsa_form[i+6] !== null ? this.state.create_dsa_form[i+6] : ""} />
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
    for(let i = 162; i < 175; i=i+3) {
      let label0, label1, label2, label3;
      if(i === 162) {
        label0 = (<Label>&nbsp;</Label>);
        label1 = (<Label>Type of Cost</Label>);
        label2 = (<Label>Description</Label>);
        label3 = (<Label>Price</Label>);
      }
      section_3.push(
        <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
          <Col md="1" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label0}
              <div>
                Additional {k}
              </div>
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label1}
              <Input type="text" name={i} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label2}
              <Input type="textarea" name={i+1} rows="1" onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
          <Col md="2" style={{margin:"0", padding:"4px"}}>
            <FormGroup>
              {label3}
              <Input type="text" name={i+2} onChange={this.handleChangeForm} />
            </FormGroup>
          </Col>
        </Row>
      )
      k++;
    }
    return section_3;
  }

  componentDidMount() {
    document.title = 'DSA Creation | BAM';
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn" style={{height: "430px", overflow: "scroll"}}>
        <div style={{width: "150%"}}>
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>DSA Creation</span>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>MR ID</Label>
                          <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptionsMR}
                            defaultOptions
                            onChange={this.handleChangeMR}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>MR INFORMATION</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>DSA Number</Label>
                          <Input type="text" name="dsa_number" readOnly value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.mr_id+"D" : ""} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Project</Label>
                          <Input type="text" name="project" readOnly value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.project_name : ""} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>DSP</Label>
                          <Input type="text" name="dsp" readOnly value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.dsp_company : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Job Order Number</Label>
                          <Input type="text" name="3" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.job_order_number : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>PO for DSP</Label>
                          <Input type="text" name="4" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.po_for_dsp : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Network Number</Label>
                          <Input type="text" name="network_number" readOnly value={this.state.network_number !== null ? this.state.network_number : ""} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>PO Item Number</Label>
                          <Input type="text" name="6" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.po_item_number : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>PO UTILIZATION</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Balanced Value</Label>
                          <Input type="text" name="balanced_value" readOnly />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>% Utilization</Label>
                          <Input type="text" name="percent_utilization" readOnly />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Status</Label>
                          <Input type="text" name="status" readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>DETAIL</h5>
                    <Row>
                      <Col md="3">
                        <h6>Destination</h6>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>From</Label>
                          <Input type="text" name="10" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.origin_warehouse : ""} onChange={this.handleChangeForm} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>To</Label>
                          <Input type="text" name="11" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <h6>Dimension</h6>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Vol (m<sup>3</sup>)</Label>
                          <Input type="text" name="12" onChange={this.handleChangeForm} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Weight (Kg)</Label>
                          <Input type="text" name="13" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>Address</Label>
                          <Input type="textarea" name="14" rows="3" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection1()}
                    <h5>SECTION 2 (For additional services which are not covered in PO and available in contract)</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>PO for Section 2</Label>
                          <Input type="text" name="63" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection2()}
                    <h5>SECTION 3 (For additional services which are not covered in PO and not available in contract)</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>PO for Section 3</Label>
                          <Input type="text" name="160" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{paddingLeft: "16px"}}>
                          <Label>DAC Number</Label>
                          <Input type="text" name="161" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection3()}
                    <h5>RETURN TO WAREHOUSE DELIVERY</h5>
                    <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                      <Col md="1" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Return Delivery</Label>
                          <Input type="text" name="182" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Service Master</Label>
                          <Input type="text" name="183" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Price</Label>
                          <Input type="text" name="184" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Quantity</Label>
                          <Input type="text" name="185" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Total Price</Label>
                          <Input type="text" name="186" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Short Text</Label>
                          <Input type="text" name="187" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Label>Long Text</Label>
                          <Input type="textarea" name="188" rows="1" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                      <Col md="1" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="text" name="189" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="text" name="190" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="text" name="191" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="text" name="192" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="text" name="193" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="text" name="194" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                      <Col md="2" style={{margin:"0", padding:"4px"}}>
                        <FormGroup>
                          <Input type="textarea" name="195" rows="1" onChange={this.handleChangeForm} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>POD FILE</h5>
                    <Row style={{paddingLeft: "16px"}}>
                      <Col md="3">
                        <FormGroup>
                          <Input type="textarea" readOnly value="This field is reserved for POD file" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>DSA UPDATE</h5>
                    <Row style={{paddingLeft: "16px"}}>
                      <Col md="1" style={{paddingLeft: "16px"}}>
                        <FormGroup>
                          <Label>Submission Type</Label>
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{margin:"0", padding:"4px"}}>
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
                    <Row style={{paddingLeft: "16px", paddingRight: "16px"}}>
                      <Col md="2" style={{margin:"0", paddingLeft:"16px"}}>
                        <FormGroup>
                          <Label>Total Value</Label>
                          <Input type="text" name="total_value" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
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
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}
  
export default connect(mapStateToProps)(DSACreation);