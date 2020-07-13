import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, Input, CardFooter, Table, ModalBody, ModalHeader, Modal, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import './assignment.css';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';



const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';

class AssignmentDetailASP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_assignment: null,
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      action_message: null,
      action_message: null,
      bast_assign_form: new Map(),
      modal_revision: false,
      revision_note: "",
      modal_reschedule: false,
      reschedule_note: ""
    }
    this.notifyASP = this.notifyASP.bind(this);
    this.saveBastNumber = this.saveBastNumber.bind(this);
    this.acceptASG = this.acceptASG.bind(this);
    this.rescheduleASG = this.rescheduleASG.bind(this);
    this.revisionASG = this.revisionASG.bind(this);
    this.exportFormatBulkAssignment = this.exportFormatBulkAssignment.bind(this);
    this.toggleModalRevision = this.toggleModalRevision.bind(this);
    this.handleRevisionNote = this.handleRevisionNote.bind(this);
    this.toggleModalReschedule = this.toggleModalReschedule.bind(this);
    this.handleRescheduleNote = this.handleRescheduleNote.bind(this);
  }

  async getDataFromAPI(url) {
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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
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

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE + url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post data ", err);
      return respond;
    }
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_tsel + url, data, {
        headers: {
          'Content-Type': 'application/json',
          'If-Match': _etag
        },
        auth: {
          username: username_tsel,
          password: password_tsel
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
      let respond = await axios.patch(process.env.REACT_APP_API_URL_NODE + url, data, {
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

  async apiSendEmail(data){
    try {
      let respond = await axios.post(API_EMAIL, data, {
        headers : {'Content-Type':'application/json'},
      })
      return respond;
    }catch (err) {
      let respond = undefined;
      return respond;
    }
  }

  componentDidMount() {
    this.getDataAssignment(this.props.match.params.id);
    document.title = 'Assignment Detail | BAM';
  }

  getDataAssignment(_id_Assignment) {
    this.getDataFromAPINODE('/aspAssignment/aspassign/' + _id_Assignment).then(resAsg => {
      if (resAsg.data !== undefined) {
        this.setState({ data_assignment: resAsg.data.data });
      }
    })
  }

  handleBastAssign = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({ bast_assign_form: prevState.bast_assign_form.set(name, value) }));
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  loopSSOW = () => {
    let ssow_content = [];
    for (let i = 0; i < 7; i++) {
      if (this.state.data_assignment.SSOW_List[i] !== undefined) {
        ssow_content.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }} key={this.state.data_assignment.SSOW_List[i].ssow_id}>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                <Label>SSOW ID</Label>
                <Input type="text" name="17" value={this.state.data_assignment.SSOW_List[i].ssow_id} readOnly />
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                <Label>Activity Number</Label>
                <Input type="textarea" rows="1" name="18" value={this.state.data_assignment.SSOW_List[i].ssow_activity_number} readOnly />
              </FormGroup>
            </Col>
            <Col md="4" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name="19" rows="1" readOnly value={this.state.data_assignment.SSOW_List[i].ssow_description} />
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                <Label>Unit</Label>
                <Input type="text" name="20" value={this.state.data_assignment.SSOW_List[i].ssow_unit} readOnly />
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                <Label>Quantity</Label>
                <Input type="number" name="21" value={this.state.data_assignment.SSOW_List[i].ssow_qty} readOnly />
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                <Label>Status</Label>
                <Input type="text" name="22" value={this.state.data_assignment.SSOW_List[i].ssow_status[(this.state.data_assignment.SSOW_List[i].ssow_status.length - 1)].status} readOnly />
              </FormGroup>
            </Col>
          </Row>
        );
      }
    }
    return ssow_content;
  }

  async notifyASP(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let res = await this.patchDatatoAPINODE('/aspAssignment/notifyAspAssignment/' + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" })
      } else {
        this.setState({ action_status: "failed" })
      }
    } else {
      this.setState({ action_status: "failed" })
    }
  }

  async acceptASG(e) {
    let successUpdate = [];
    const _id = e.target.id;
    const dataAssignment = this.state.data_assignment;
    let res = await this.patchDatatoAPINODE('/aspAssignment/acceptAspAssignment/' + _id);
    let creatorEmail = null;
    let creator = dataAssignment.ASP_Assignment_Status.find(e => e.status_value === "CREATED" && e.status_name === "ASP_ASSIGNMENT");
    if(creator !== undefined){
      creatorEmail = creator.status_updater;
    }
    if (res !== undefined) {
      if (res.data !== undefined) {
        let linkImp = "https://bam-id.e-dpm.com/assignment-detail/"+_id;
        const bodyEmail = "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been approved by ASP, <br/><br/><i>Site</i>: <b>"+dataAssignment.Site_ID+"</b> <br/><i>Project</i>: <b>"+dataAssignment.Project+"</b><br/><i>Assignment</i>: <b>"+dataAssignment.Assignment_No+"</b><br/><br/>is approved by "+this.state.userEmail+".</span><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='"+linkImp+"'>"+linkImp+"</a>";
        let dataEmail = {
          "to": creatorEmail,
          // "to" : "a.rakha.ahmad.taufiq@ericsson.com",
          "subject":"[APPROVED by ASP] Assignment "+dataAssignment.Assignment_No,
          "body": bodyEmail
        }
        // let sendEmail = await this.apiSendEmail(dataEmail);
        this.setState({ action_status: "success", action_status : null })
      } else {
        this.setState({ action_status: "failed" })
      }
    } else {
      this.setState({ action_status: "failed" })
    }
  }

  async revisionASG(e) {
    if (this.state.revision_note === "") {
      alert("Note cannot be empty!");
    } else {
      const newDate = new Date();
      const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
      const _etag = e.target.value;
      const _id = e.target.id;
      const dataAssignment = this.state.data_assignment;
      let creatorEmail = null;
      let creator = dataAssignment.ASP_Assignment_Status.find(e => e.status_value === "CREATED" && e.status_name === "ASP_ASSIGNMENT");
      if(creator !== undefined){
        creatorEmail = creator.status_updater;
      }
      let res = await this.patchDatatoAPINODE('/aspAssignment/reviseAspAssignment/' + _id, { "note": this.state.revision_note });
      if (res !== undefined) {
        if (res.data !== undefined) {
          let linkImp = "https://bam-id.e-dpm.com/assignment-detail/"+_id;
          const bodyEmail = "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been requested for Revision by ASP, <br/><br/><i>Site</i>: <b>"+dataAssignment.Site_ID+"</b> <br/><i>Project</i>: <b>"+dataAssignment.Project+"</b><br/><i>Assignment</i>: <b>"+dataAssignment.Assignment_No+"</b><br/><br/>is requested for revision by "+this.state.userEmail+".</span><br/><i>Note from ASP</i>: <b>"+this.state.revision_note+"</b><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='"+linkImp+"'>"+linkImp+"</a>";
          let dataEmail = {
            "to": creatorEmail,
            // "to" : "a.rakha.ahmad.taufiq@ericsson.com",
            "subject":"[Request Revision by ASP] Assignment "+dataAssignment.Assignment_No,
            "body": bodyEmail
          }
          // let sendEmail = await this.apiSendEmail(dataEmail);
          this.setState({ action_status: "success" })
        } else {
          this.setState({ action_status: "failed" })
        }
      } else {
        this.setState({ action_status: "failed" })
      }
      this.toggleModalRevision();
    }
  }

  async rescheduleASG(e) {
    if (this.state.reschedule_note === "") {
      alert("Note cannot be empty!");
    } else {
      const newDate = new Date();
      const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
      const _etag = e.target.value;
      const _id = e.target.id;
      const dataAssignment = this.state.data_assignment;
      let creatorEmail = null;
      let creator = dataAssignment.ASP_Assignment_Status.find(e => e.status_value === "CREATED" && e.status_name === "ASP_ASSIGNMENT");
      if(creator !== undefined){
        creatorEmail = creator.status_updater;
      }
      let res = await this.patchDatatoAPINODE('/aspAssignment/reScheduleAspAssignment/' + _id, { "note": this.state.reschedule_note });
      if (res !== undefined) {
        if (res.data !== undefined) {
          let linkImp = "https://bam-id.e-dpm.com/assignment-detail/"+_id;
          const bodyEmail = "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following Assignment has been requested for Reschedule by ASP, <br/><br/><i>Site</i>: <b>"+dataAssignment.Site_ID+"</b> <br/><i>Project</i>: <b>"+dataAssignment.Project+"</b><br/><i>Assignment</i>: <b>"+dataAssignment.Assignment_No+"</b><br/><br/>is requested for reschedule by "+this.state.userEmail+".</span><br/><i>Note from ASP</i>: <b>"+this.state.reschedule_note+"</b><br/><br/><br/><br/>Please follow this link to see the Assignment detail:<br/><a href='"+linkImp+"'>"+linkImp+"</a>";
          let dataEmail = {
            "to": creatorEmail,
            // "to" : "a.rakha.ahmad.taufiq@ericsson.com",
            "subject":"[Request Reschedule by ASP] Assignment "+dataAssignment.Assignment_No,
            "body": bodyEmail
          }
          // let sendEmail = await this.apiSendEmail(dataEmail);
          this.setState({ action_status: "success" })
        } else {
          this.setState({ action_status: "failed" })
        }
      } else {
        this.setState({ action_status: "failed" })
      }
      this.toggleModalReschedule();
    }
  }

  async saveBastNumber() {
    const dataAssignment = this.state.data_assignment;
    const formBast = this.state.bast_assign_form;
    const dataBast = {
      "Request_Type": "New GR",
      "id_assignment_doc": dataAssignment._id,
      "Assignment_No": dataAssignment.Assignment_No,
      "Account_Name": dataAssignment.Account_Name,
      "ASP_Acceptance_Date": dataAssignment.ASP_Acceptance_Date,
      "id_cd_doc": null,
      "CD_ID": null,
      "id_project_doc": dataAssignment.id_project_doc,
      "Project": dataAssignment.Project,
      "SOW_Type": dataAssignment.SOW_Type,
      "BAST_No": formBast.get("bast_no"),
      "Payment_Terms": dataAssignment.Payment_Terms,
      "Payment_Terms_Ratio": formBast.get("ratio"),
      "PO_Qty": 1,
      "PO_Number": dataAssignment.PO_Number,
      "PO_Item": dataAssignment.PO_Item,
      "Required_GR_Qty": 1,
      "Item_Status": formBast.get("item_status")
    }
    let assignBast = {
      "account_id": null,
      "data": [dataBast]
    };
    console.log("assignBast", assignBast);
    const respondAssignBast = await this.patchDatatoAPINODE('/aspAssignment/updateBastNumber/' + dataAssignment._id, assignBast);
    if (respondAssignBast.data !== undefined && respondAssignBast.status >= 200 && respondAssignBast.status <= 300) {
      this.setState({ action_status: 'success', action_message: 'BAST Number has been assign' });
    } else {
      console.log("respondAssignBast.response", respondAssignBast.response);
      this.setState({ action_status: 'failed', action_message: respondAssignBast.response.data.error });
    }
  }

  exportFormatBulkAssignment = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const data_assingment = this.state.data_assignment;
    let indexSSOW = 7;

    let headerRow = ["id", "project", "sow_type", "vendor_code", "vendor_name", "identifier", "ssow_rbs_id_1", "ssow_rbs_activity_number_1", "ssow_rbs_unit_1", "ssow_rbs_quantity_1", "ssow_rbs_id_2", "ssow_rbs_activity_number_2", "ssow_rbs_unit_2", "ssow_rbs_quantity_2", "ssow_rbs_id_3", "ssow_rbs_activity_number_3", "ssow_rbs_unit_3", "ssow_rbs_quantity_3", "ssow_rbs_id_4", "ssow_rbs_activity_number_4", "ssow_rbs_unit_4", "ssow_rbs_quantity_4", "ssow_rbs_id_5", "ssow_rbs_activity_number_5", "ssow_rbs_unit_5", "ssow_rbs_quantity_5", "ssow_rbs_id_6", "ssow_rbs_activity_number_6", "ssow_rbs_unit_6", "ssow_rbs_quantity_6", "ssow_rbs_id_7", "ssow_rbs_activity_number_7", "ssow_rbs_unit_7", "ssow_rbs_quantity_7"];

    let dataASGPrint = [data_assingment.Assignment_No, data_assingment.Project, "RBS", data_assingment.Vendor_Code_Number, data_assingment.Vendor_Name, data_assingment.Site_ID];
    data_assingment.SSOW_List.map(e => dataASGPrint.push(e.ssow_id, e.ssow_activity_number, e.ssow_unit, e.ssow_qty));

    ws.addRow(headerRow);
    ws.addRow(dataASGPrint);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Assignment ' + data_assingment.Assignment_No + ' Template.xlsx');
  }

  toggleModalRevision(e) {
    this.setState((prevState) => ({
      modal_revision: !prevState.modal_revision
    }));
  }

  handleRevisionNote(e) {
    let value = e.target.value;
    this.setState({ revision_note: value })
  }

  toggleModalReschedule(e) {
    this.setState((prevState) => ({
      modal_reschedule: !prevState.modal_reschedule
    }));
  }

  handleRescheduleNote(e) {
    let value = e.target.value;
    this.setState({ reschedule_note: value })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            {this.state.data_assignment !== null && (
              <Card>
                <CardHeader>
                  <span style={{ lineHeight: '2', fontSize: '17px' }}><i className="fa fa-info-circle" style={{ marginRight: "8px" }}></i>Assignment Detail ({this.state.data_assignment.Assignment_No})</span>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h5>ACTIVITY</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>WP ID</Label>
                          <Input type="text" readOnly value={this.state.data_assignment.cust_del.map(e => e.cd_id + ", ")}></Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Status</Label>
                          <Input type="text" readOnly value={this.state.data_assignment.Current_Status}></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 style={{ marginTop: "16px" }}>PROJECT</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Project Name</Label>
                          <Input type="text" name="project_name" readOnly value={this.state.data_assignment.Project} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "16px" }}>
                      <Col md="6">
                        <h5>SITE DETAILS NE</h5>
                      </Col>
                      <Col md="6">
                        <h5>SITE DETAILS FE</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site ID</Label>
                          <Input type="text" name="site_id_ne" readOnly value={this.state.data_assignment.Site_ID} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site Name</Label>
                          <Input type="text" name="site_name_ne" readOnly value={this.state.data_assignment.Site_Name} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Latitude</Label>
                          <Input type="text" name="site_lat_ne" readOnly value={this.state.data_assignment.Site_Latitude} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Longitude</Label>
                          <Input type="text" name="site_long_ne" readOnly value={this.state.data_assignment.Site_Longitude} />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site ID</Label>
                          <Input type="text" name="site_id_fe" readOnly value={this.state.data_assignment.Site_FE_ID} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Site Name</Label>
                          <Input type="text" name="site_name_fe" readOnly value={this.state.data_assignment.Site_FE_Name} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Latitude</Label>
                          <Input type="text" name="site_lat_fe" readOnly value={this.state.data_assignment.Site_FE_Latitude} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Longitude</Label>
                          <Input type="text" name="site_long_fe" readOnly value={this.state.data_assignment.Site_FE_Longitude} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 style={{ marginTop: "16px" }}>SOW / CONFIG</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>SOW / Config</Label>
                          <Input type="text" name="sow_config" readOnly value={this.state.data_assignment.SOW_Type} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>NN Service</Label>
                          <Input type="text" name="nn_service" readOnly value={this.state.data_assignment.NW} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>WBS</Label>
                          <Input type="text" name="wbs" readOnly value="" />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Act Code</Label>
                          <Input type="text" name="act_code" readOnly value={this.state.data_assignment.NW_Activity} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 style={{ marginTop: "16px" }}>PR/PO INFORMATION</h5>
                    <Row>
                      <Col md="6">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>ASP</Label>
                          <Input type="text" name="asp" readOnly value={this.state.data_assignment.Vendor_Name} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px", display: "none" }}>
                          <Label>MR ID</Label>
                          <Input type="select" name="mr_id">
                            <option value="" disabled selected hidden>Select MR ID</option>
                          </Input>
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>TOP</Label>
                          <Input type="text" name="top" readOnly value={this.state.data_assignment.Payment_Terms} />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>SSOW Type</Label>
                          <Input type="text" name="ssow_type" readOnly value={this.state.data_assignment.SOW_Type} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PR</Label>
                          <Input type="text" name="pr" readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created By</Label>
                          <Input type="text" name="pr_created_by" readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created On</Label>
                          <Input type="date" name="pr_created_on" readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO</Label>
                          <Input type="text" name="po" readOnly value={this.state.data_assignment.PO_Number} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created By</Label>
                          <Input type="text" name="po_created_by" readOnly />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Created On</Label>
                          <Input type="date" name="po_created_on" readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO LINE ITEM</Label>
                          <Input type="text" name="po_line_item" readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 style={{ marginTop: "16px" }}>SSOW {this.state.data_assignment.SOW_Type}</h5>
                    <Row>
                      <Col md="12">
                        <Table striped size="sm" className="assignment-list__table--center-non-border">
                          <thead>
                            <tr>
                              <th>
                                SSOW ID
                            </th>
                              <th>
                                Activity Number
                            </th>
                              <th>
                                Description
                            </th>
                              <th>
                                Unit
                            </th>
                              <th>
                                Qty
                            </th>
                              <th>
                                Status
                            </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(this.state.data_assignment.SSOW_List !== undefined) && this.state.data_assignment.SSOW_List.map(ssow =>
                              <tr key={ssow.ssow_id + ssow.ssow_activity_number}>
                                <td>{ssow.ssow_id}</td>
                                <td>{ssow.ssow_activity_number}</td>
                                <td style={{ textAlign: 'left' }}>{ssow.ssow_description}</td>
                                <td>{ssow.ssow_unit}</td>
                                <td>{ssow.ssow_qty}</td>
                                <td>{ssow.ssow_status[(ssow.ssow_status.length - 1)].status}</td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <h5 style={{ marginTop: "16px" }}>GR</h5>
                    <Row>
                      <Col md="4">
                        <Table responsive striped bordered size="sm">
                          <thead>
                            <tr>
                              <th>
                                ASP BAST No.
                            </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data_assignment.BAST_No.map(bast =>
                              <tr>
                                <td>
                                  {bast}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  {(this.state.data_assignment.Current_Status === "ASP ASSIGNMENT NOTIFIED TO ASP") && (
                    <Fragment>
                      <Button color="danger" style={{ float: "right" }} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.toggleModalReschedule}><i className="fa fa-calendar-alt" style={{ marginRight: "8px" }}></i> Reschedule</Button>
                      <Button color="warning" style={{ float: "right", marginRight: "8px" }} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.toggleModalRevision}><i className="fa fa-edit" style={{ marginRight: "8px" }}></i> Need Revision</Button>
                      <Button color="success" style={{ float: "right", marginRight: "8px" }} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.acceptASG}><i className="fa fa-check" style={{ marginRight: "8px" }}></i> Accept</Button>
                      <Modal isOpen={this.state.modal_revision} toggle={this.toggleModalRevision} className={"modal-sm"}>
                        <ModalHeader>Input Revision Note</ModalHeader>
                        <ModalBody>
                          <Input type="textarea" rows="9" placeholder="Note..." onChange={this.handleRevisionNote} value={this.state.revision_note} />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="warning" style={{ float: "right", marginRight: "8px" }} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.revisionASG}><i className="fa fa-edit" style={{ marginRight: "8px" }}></i> Need Revision</Button>
                          <Button color="secondary" onClick={this.toggleModalRevision}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <Modal isOpen={this.state.modal_reschedule} toggle={this.toggleModalReschedule} className={"modal-sm"}>
                        <ModalHeader>Input Reschedule Note</ModalHeader>
                        <ModalBody>
                          <Input type="textarea" rows="9" placeholder="Note..." onChange={this.handleRescheduleNote} value={this.state.reschedule_note} />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" style={{ float: "right", marginRight: "8px" }} id={this.state.data_assignment._id} value={this.state.data_assignment._etag} onClick={this.rescheduleASG}><i className="fa fa-calendar-alt" style={{ marginRight: "8px" }}></i> Reschedule</Button>
                          <Button color="secondary" onClick={this.toggleModalReschedule}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </Fragment>
                  )}
                </CardFooter>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(AssignmentDetailASP);
