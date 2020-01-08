import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

class AssignmentCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      ssowType : null,
    }

    this.changeSSOW = this.changeSSOW.bind(this);
  }

  changeSSOW(e) {
    this.setState({ssowType: e.target.value});
  }

  componentDidMount() {
    document.title = 'Assignment Creation | BAM';
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>Assignment Creation </span>
              </CardHeader>
              <CardBody>
                <Form>
                  <h5>ACTIVITY</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WP ID</Label>
                        <Input type="select" name="wp_id">
                          <option>Select WP ID</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>PROJECT</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Name</Label>
                        <Input type="select" name="project_name">
                          <option>Select Project Name</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Project Group</Label>
                        <Input type="select" name="project_group">
                          <option>Select Project Group</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{marginTop: "16px"}}>
                    <Col md="6">
                      <h5>SITE DETAILS NE</h5>
                    </Col>
                    <Col md="6">
                      <h5>SITE DETAILS FE</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site ID</Label>
                        <Input type="text" name="site_id_ne" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_ne" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_ne" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Longitude</Label>
                        <Input type="text" name="site_long_ne" />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site ID</Label>
                        <Input type="text" name="site_id_fe" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Site Name</Label>
                        <Input type="text" name="site_name_fe" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Latitude</Label>
                        <Input type="text" name="site_lat_fe" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Longitude</Label>
                        <Input type="text" name="site_long_fe" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>SOW / CONFIG</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SOW / Config</Label>
                        <Input type="textarea" name="sow_config" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>NN Service</Label>
                        <Input type="text" name="nn_service" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>WBS</Label>
                        <Input type="text" name="wbs" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Act Code</Label>
                        <Input type="text" name="act_code" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>PR/PO INFORMATION</h5>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP</Label>
                        <Input type="select" name="asp">
                          <option>Select ASP</option>
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>MR ID</Label>
                        <Input type="select" name="mr_id">
                          <option>Select MR ID</option>
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>TOP</Label>
                        <Input type="select" name="top">
                          <option>Select TOP</option>
                        </Input>
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>SSOW Type</Label>
                        <Input type="select" name="ssow_type" onChange={this.changeSSOW}>
                          <option>Select SSOW Type</option>
                          <option value="BSC">BSC</option>
                          <option value="DWDM">DWDM</option>
                          <option value="NDO">NDO</option>
                          <option value="RBS">RBS</option>
                          <option value="SACME">SACME</option>
                          <option value="Survey">Survey</option>
                          <option value="SV">SV</option>
                          <option value="TRM">TRM</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PR</Label>
                        <Input type="text" name="pr" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created By</Label>
                        <Input type="text" name="pr_created_by" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created On</Label>
                        <Input type="date" name="pr_created_on" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PO</Label>
                        <Input type="text" name="po" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created By</Label>
                        <Input type="text" name="po_created_by" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>Created On</Label>
                        <Input type="date" name="po_created_on" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>PO LINE ITEM</Label>
                        <Input type="text" name="po_line_item" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>SSOW {this.state.ssowType}</h5>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_1">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_1">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_1" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_1" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_1">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_2">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_2">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_2" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_2" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_2" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_2">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_3">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_3">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_3" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_3" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_3" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_3">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_4">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_4">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_4" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_4" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_4" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_4">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_5">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_5">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_5" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_5" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_5" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_5">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_6">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_6">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_6" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_6" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_6" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_6">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft: "16px"}}>
                    <Col md="2">
                      <FormGroup>
                        <Label>SSOW ID</Label>
                        <Input type="select" name="ssow_id_7">
                          <option>Select SSOW ID</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Activity Number</Label>
                        <Input type="select" name="activity_number_7">
                          <option>Select Activity Number</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description_7" rows="1" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Unit</Label>
                        <Input type="text" name="unit_7" />
                      </FormGroup>
                    </Col>
                    <Col md="1">
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="number" name="quantity_7" />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status_7">
                          <option>Select Status</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>GR (PARTIAL)</h5>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP BAST NO (DP)</Label>
                        <Input type="text" name="partial_asp_bast_no" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Doc No (DP)</Label>
                        <Input type="text" name="partial_gr_doc_no" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Release Date (DP)</Label>
                        <Input type="date" name="partial_gr_release_date" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>On</Label>
                        <Input type="date" name="partial_asp_bast_no_on" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>By</Label>
                        <Input type="text" name="partial_asp_bast_no_by" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup check inline style={{paddingLeft: "16px", verticalAlign: "center"}}>
                        <Input className="form-check-input" type="checkbox" name="partial_request_revision_check"/>
                        <Label className="form-check-label" check>Request Revision</Label>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>On</Label>
                            <Input type="date" name="partial_request_revision_on" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>By</Label>
                            <Input type="text" name="partial_request_revision_by" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <h5 style={{marginTop: "16px"}}>GR (FINAL)</h5>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>ASP BAST NO</Label>
                        <Input type="text" name="final_asp_bast_no" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Doc No</Label>
                        <Input type="text" name="final_gr_doc_no" />
                      </FormGroup>
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>GR Release Date</Label>
                        <Input type="date" name="final_gr_release_date" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>On</Label>
                        <Input type="date" name="final_asp_bast_no_on" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup style={{paddingLeft: "16px"}}>
                        <Label>By</Label>
                        <Input type="text" name="final_asp_bast_no_by" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup check inline style={{paddingLeft: "16px", verticalAlign: "center"}}>
                        <Input className="form-check-input" type="checkbox" name="final_request_revision_check"/>
                        <Label className="form-check-label" check>Request Revision</Label>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>On</Label>
                            <Input type="date" name="final_request_revision_on" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>By</Label>
                            <Input type="text" name="final_request_revision_by" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="4">
                      <FormGroup check inline style={{paddingLeft: "16px", verticalAlign: "center"}}>
                        <Input className="form-check-input" type="checkbox" name="final_revision_done_check"/>
                        <Label className="form-check-label" check>Revision Done</Label>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>On</Label>
                            <Input type="date" name="final_revision_done_on" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup style={{paddingLeft: "16px"}}>
                            <Label>By</Label>
                            <Input type="text" name="final_revision_done_by" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" style={{float: "right"}}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i> Create Assignment</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(AssignmentCreation);