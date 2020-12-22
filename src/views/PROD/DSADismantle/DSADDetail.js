import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Table,
  Col,
  Button,
  Input,
  CardFooter,
} from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import {
  postDatatoAPINODEdata,
  getDatafromAPINODEFile,
} from "../../helper/asyncFunction";
import ModalCreateNew from "../components/ModalCreateNew";
import { saveAs } from "file-saver";

const API_URL = "https://api.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";

const API_URL_tsel = "https://api.tsel.pdb.e-dpm.com/tselpdbapi";
const username_tsel = "adminbamidsuper";
const password_tsel = "F760qbAg2sml";

const API_URL_XL = "https://api.xl.pdb.e-dpm.com/xlpdbapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2.bam-id.e-dpm.com/bamidapi';

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class DSADDetail extends Component {
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
      inputan_file: null,
      actualModal: false,
      role_approval_selected: null,
      approveModal: false,
      rejectModal: false,
      reject_note: null,
      action_message: null,
      action_status: null,
      gr_data: {},
      view_dsa_timeline: "Hide",
      reactual_note: " ",
    };

    this.submitDSA = this.submitDSA.bind(this);
    this.approveDSA = this.approveDSA.bind(this);
    this.toggleActualModal = this.toggleActualModal.bind(this);
    this.toggleApproveModal = this.toggleApproveModal.bind(this);
    this.toggleRejectModal = this.toggleRejectModal.bind(this);
    this.handleRejectNote = this.handleRejectNote.bind(this);
    this.handleChangeGR = this.handleChangeGR.bind(this);
    this.handleChangeTimeline = this.handleChangeTimeline.bind(this);
    this.handleChangeReactualNote = this.handleChangeReactualNote.bind(this);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: username,
          password: password,
        },
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
        headers: { "Content-Type": "application/json" },
        auth: {
          username: username_tsel,
          password: password_tsel,
        },
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
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameXL,
          password: passwordXL,
        },
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
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
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
    document.title = "DSA Detail | BAM";
  }

  getDataDSA(_id_MR) {
    this.getDataFromAPINODE("/matreq-srn/" + _id_MR).then((res) => {
      if (res.data !== undefined) {
        this.setState({ data_dsa: res.data });
        if (
          this.state.data_dsa.mr_type === "Return" ||
          this.state.data_dsa.mr_type === "Relocation"
        ) {
          this.setState({ destination: this.state.data_dsa.destination.value });
        } else {
          this.setState({
            destination: this.state.data_dsa.site_info[0].site_id,
          });
        }
        this.getDataFromAPIXL(
          '/custdel_sorted_non_page?where={"WP_ID":"' +
            this.state.data_dsa.cust_del[0].cd_id +
            '"}'
        ).then((res) => {
          let nn =
            res.data._items[0] !== undefined
              ? res.data._items[0].CD_Info_Network_Number
              : "";
          if (res.data !== undefined) {
            this.setState({ network_number: nn });
          }
        });
      }
    });
  }

  loopSection1 = () => {
    let section_1 = [];
    for (let i = 0; i < this.state.data_dsa.primary_section.length; i++) {
      if (this.state.data_dsa.primary_section[i] !== undefined) {
        let label1, label2, label3, label4, label5, label6, label7;
        if (i === 0) {
          label1 = <Label>Details</Label>;
          label2 = <Label>Service Master</Label>;
          label3 = <Label>Price</Label>;
          label4 = <Label>Quantity</Label>;
          label5 = <Label>Total Price</Label>;
          label6 = <Label>Short Text</Label>;
          label7 = <Label>Long Text</Label>;
        }
        section_1.push(
          <Row
            style={{ paddingLeft: "16px", paddingRight: "16px" }}
            key={this.state.data_dsa.primary_section[i].service_master}
          >
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.primary_section[i].category}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.primary_section[i].service_master}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.primary_section[
                    i
                  ].price.toLocaleString()}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label4}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.primary_section[i].qty}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label5}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.primary_section[
                    i
                  ].total_price.toLocaleString()}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label6}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.primary_section[i].short_text}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label7}
                <Input
                  type="textarea"
                  rows="1"
                  readOnly
                  value={this.state.data_dsa.primary_section[i].long_text}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
        );
      }
    }
    return section_1;
  };

  loopSection2 = () => {
    let section_2 = [];
    for (
      let i = 0;
      i < this.state.data_dsa.second_section.service_details.length;
      i++
    ) {
      if (this.state.data_dsa.second_section.service_details[i] !== undefined) {
        let label1, label2, label3, label4, label5, label6, label7;
        if (i === 0) {
          label1 = (
            <Label>
              <small>Additional Service</small>
            </Label>
          );
          label2 = <Label>Service Master</Label>;
          label3 = <Label>Price</Label>;
          label4 = <Label>Quantity</Label>;
          label5 = <Label>Total Price</Label>;
          label6 = <Label>Short Text</Label>;
          label7 = <Label>Long Text</Label>;
        }
        section_2.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input
                  type="text"
                  readOnly
                  value={
                    this.state.data_dsa.second_section.service_details[i]
                      .category
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input
                  type="text"
                  readOnly
                  value={
                    this.state.data_dsa.second_section.service_details[i]
                      .service_master
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.second_section.service_details[
                    i
                  ].price.toLocaleString()}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label4}
                <Input
                  type="text"
                  readOnly
                  value={
                    this.state.data_dsa.second_section.service_details[i].qty
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label5}
                <Input
                  type="text"
                  readOnly
                  value={this.state.data_dsa.second_section.service_details[
                    i
                  ].total_price.toLocaleString()}
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label6}
                <Input
                  type="text"
                  readOnly
                  value={
                    this.state.data_dsa.second_section.service_details[i]
                      .short_text
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label7}
                <Input
                  type="textarea"
                  rows="1"
                  readOnly
                  value={
                    this.state.data_dsa.second_section.service_details[i]
                      .long_text
                  }
                ></Input>
              </FormGroup>
            </Col>
          </Row>
        );
      }
    }
    return section_2;
  };

  loopSection3 = () => {
    let section_3 = [];
    for (
      let i = 0;
      i < this.state.data_dsa.third_section.service_details.length;
      i++
    ) {
      if (this.state.data_dsa.third_section.service_details[i] !== undefined) {
        let label0, label1, label2, label3;
        if (i === 0) {
          label0 = <Label>&nbsp;</Label>;
          label1 = <Label>Type of Cost</Label>;
          label2 = <Label>Description</Label>;
          label3 = <Label>Price</Label>;
        }
        section_3.push(
          <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <Col md="1" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label0}
                <div>Additional {i + 1}</div>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label1}
                <Input
                  type="text"
                  readOnly
                  value={
                    this.state.data_dsa.third_section.service_details[i]
                      .type_of_cost
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label2}
                <Input
                  type="textarea"
                  rows="1"
                  readOnly
                  value={
                    this.state.data_dsa.third_section.service_details[i]
                      .description
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col md="2" style={{ margin: "0", padding: "4px" }}>
              <FormGroup>
                {label3}
                <Input
                  type="text"
                  readOnly
                  value={
                    this.state.data_dsa.third_section.service_details[i].price
                  }
                ></Input>
              </FormGroup>
            </Col>
          </Row>
        );
      }
    }
    return section_3;
  };

  async submitDSA(e) {
    const _id = e.target.id;
    let successUpdate = [];
    let res = await this.patchDatatoAPINODE("/matreq/submitDsa/" + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if (successUpdate.length !== 0) {
      alert("DSA has been submitted!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      alert("Sorry there is an error, please try again!");
    }
  }

  async approveDSA(e) {
    const _id = e.target.id;
    let successUpdate = [];
    let res = await this.patchDatatoAPINODE("/matreq/approveDSA/" + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if (successUpdate.length !== 0) {
      alert("DSA has been approved!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      alert("Sorry there is an error, please try again!");
    }
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL + url, data, {
        headers: {
          "Content-Type": "application/json",
          "If-Match": _etag,
        },
        auth: {
          username: username,
          password: password,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = undefined;
      this.setState({
        action_status: "failed",
        action_message: "Sorry, there is something wrong, please try again!",
      });
      console.log("respond patch data", err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(
        process.env.REACT_APP_API_URL_NODE + url,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.tokenUser,
          },
        }
      );
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

  toggleActualModal = () => {
    this.setState({
      actualModal: !this.state.actualModal,
    });
  };

  toggleApproveModal = (e) => {
    if (this.state.approveModal === false && e !== undefined) {
      this.setState({ role_approval_selected: e.target.value });
    }
    this.setState({
      approveModal: !this.state.approveModal,
    });
  };

  toggleRejectModal = (e) => {
    if (this.state.approveModal === false && e !== undefined) {
      this.setState({ role_approval_selected: e.target.value });
    }
    this.setState({
      rejectModal: !this.state.rejectModal,
    });
  };

  handleInputFileDSA = (e) => {
    let fileUpload = null;
    if (
      e !== undefined &&
      e.target !== undefined &&
      e.target.files !== undefined
    ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload });
  };

  async patchDataFiletoAPINode(url, file, _etag) {
    try {
      let respond = await axios.patch(
        process.env.REACT_APP_API_URL_NODE + url,
        file,
        {
          headers: {
            Authorization: "Bearer " + this.state.tokenUser,
          },
        }
      );
      console.log("respond Patch data", respond);
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  actualizeDSA = async (e) => {
    const dataForm = this.state.data_dsa;
    const newDate = new Date();
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    let fileDocument = new FormData();
    await fileDocument.append("submitType", parseInt(1));
    await fileDocument.append("data", JSON.stringify({}));
    await fileDocument.append("dsa_documents", this.state.inputan_file);
    await fileDocument.append("account_id", "2");
    await fileDocument.append("mrCategory", "Return");
    if (
      dataForm.dsa_status.find((ds) => ds.dsa_status_value === "REJECTED") !==
      undefined
    ) {
      await fileDocument.append("updateNote", this.state.reactual_note);
    }
    this.setState({ actualModal: false });
    let res = await this.patchDataFiletoAPINode(
      "/matreq/updateDsa/" + this.props.match.params.id,
      fileDocument
    );
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  };

  handleRejectNote(e) {
    let value = e.target.value;
    this.setState({ reject_note: value });
  }

  approvalDSA = async (e) => {
    const dataForm = this.state.data_dsa;
    const newDate = new Date();
    const typeApproval = e.target.value;
    if (typeApproval === "reject") {
      this.toggleRejectModal();
    } else {
      this.toggleApproveModal();
    }
    const approveDSA = {
      valueApprove: typeApproval === "reject" ? 0 : 1,
      roleApprove: this.state.role_approval_selected,
      notesValue: this.state.reject_note,
      mrCategory: "Return",
    };
    let res = await this.patchDatatoAPINODE(
      "/matreq/approveDsa/" + this.props.match.params.id,
      approveDSA
    );
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  };

  getDSAFile = async (e) => {
    e.preventDefault();
    e.persist();
    const i = e.target.name;
    const id = e.currentTarget.value;
    const data_dsa = this.state.data_dsa;
    if (
      data_dsa.dsa_documents !== undefined &&
      data_dsa.dsa_documents.length !== 0
    ) {
      const resFile = await getDatafromAPINODEFile(
        "/matreq/getDsaDocument/" + data_dsa._id + "?mrCategory=Return",
        this.props.dataLogin.token,
        data_dsa.dsa_documents[0].mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], {
            type: data_dsa.dsa_documents[0].mime_type,
          }),
          data_dsa.dsa_documents[0].file_name
        );
      }
    }
  };

  handleChangeGR(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      gr_data: {
        ...prevState.gr_data,
        [name]: value,
      },
    }));
  }

  submitGRNumber = async (e) => {
    let res = await this.patchDatatoAPINODE(
      "/matreq/updateGRDsa/" + this.props.match.params.id,
      { mrCategory: "Return", data: this.state.gr_data }
    );
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        res.response !== undefined &&
        res.response.data !== undefined &&
        res.response.data.error !== undefined
      ) {
        if (res.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: res.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  };

  handleChangeTimeline(e) {
    const value = e.target.value;
    this.setState({ view_dsa_timeline: value });
  }

  handleChangeReactualNote(e) {
    const value = e.target.value;
    this.setState({ reactual_note: value });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn" style={{ overflow: "scroll" }}>
        <div style={{ width: "150%" }}>
          <Row className="row-alert-fixed">
            <Col xs="12" lg="12">
              <DefaultNotif
                actionMessage={this.state.action_message}
                actionStatus={this.state.action_status}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="12">
              {this.state.data_dsa !== null && (
                <Card>
                  <CardHeader>
                    <span style={{ lineHeight: "2", fontSize: "15px" }}>
                      <i
                        className="fa fa-info-circle"
                        style={{ marginLeft: "8px" }}
                      ></i>
                      DSA Detail ({this.state.data_dsa.dsa_number})
                    </span>
                    {(this.state.userRole.findIndex((e) => e === "Admin") !==
                      -1 ||
                      this.state.userRole.findIndex(
                        (e) => e === "BAM-Mover"
                      ) !== -1) && (
                      <Link to={"/dsa-edit/" + this.props.match.params.id}>
                        <Button
                          style={{ marginLeft: "100px" }}
                          color="warning"
                          size="sm"
                        >
                          <i
                            className="fas fa-edit"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Edit
                        </Button>
                      </Link>
                    )}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <Form>
                          <Row>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Current DSA Status</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={this.state.data_dsa.current_dsa_status}
                                ></Input>
                              </FormGroup>
                            </Col>

                            <Col md="2">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Note</Label>
                                <Input
                                  type="textarea"
                                  readOnly
                                  value={this.state.data_dsa.dsa_remark}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md="2">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Reactualized Note</Label>
                                <Input
                                  type="textarea"
                                  readOnly
                                  value={this.state.data_dsa.dsa_update_note}
                                ></Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>MRA ID</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={this.state.data_dsa.mra_id}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>WP ID</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={this.state.data_dsa.cust_del
                                    .map((cd) => cd.cd_id)
                                    .join(", ")}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Current MR Status</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={this.state.data_dsa.current_mra_status}
                                ></Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <h5>MR INFORMATION</h5>
                          <Row>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>DSA Number</Label>
                                <Input
                                  type="text"
                                  name="dsa_number"
                                  readOnly
                                  value={this.state.data_dsa.dsa_number}
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Project</Label>
                                <Input
                                  type="text"
                                  name="project"
                                  readOnly
                                  value={this.state.data_dsa.project_name}
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>DSP</Label>
                                <Input
                                  type="text"
                                  name="dsp"
                                  readOnly
                                  value={this.state.data_dsa.dsp_company}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Job Order Number</Label>
                                <Input
                                  type="text"
                                  name="3"
                                  readOnly
                                  value={this.state.data_dsa.job_order_number}
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>PO for DSP</Label>
                                <Input
                                  type="text"
                                  name="4"
                                  readOnly
                                  value={this.state.data_dsa.po_for_dsp}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Network Number</Label>
                                <Input
                                  type="text"
                                  name="network_number"
                                  readOnly
                                  value={this.state.network_number}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <h5>PO UTILIZATION</h5>
                          <Row>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Balanced Value</Label>
                                <Input
                                  type="text"
                                  name="balanced_value"
                                  readOnly
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>% Utilization</Label>
                                <Input
                                  type="text"
                                  name="percent_utilization"
                                  readOnly
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Status</Label>
                                <Input type="text" name="status" readOnly />
                              </FormGroup>
                            </Col>
                          </Row>
                          <h5>DETAIL</h5>
                          <Row>
                            <Col md="2">
                              <h6>Destination</h6>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>From</Label>
                                <Input
                                  type="text"
                                  name="10"
                                  value={
                                    this.state.data_dsa.origin !== undefined
                                      ? this.state.data_dsa.origin.value
                                      : ""
                                  }
                                  onChange={this.handleChangeForm}
                                  readOnly
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>
                                  To{" "}
                                  {this.state.data_dsa !== null &&
                                  (this.state.data_dsa.mr_type === "New" ||
                                    this.state.data_dsa.mr_type === null)
                                    ? "(Site ID NE)"
                                    : "(Warehouse)"}
                                </Label>
                                <Input
                                  type="text"
                                  name="11"
                                  value={
                                    this.state.data_dsa.site_info.find(
                                      (si) => si.site_title === "NE"
                                    ) !== undefined
                                      ? this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "NE"
                                        ).site_id
                                      : null
                                  }
                                  onChange={this.handleChangeForm}
                                  readOnly
                                />
                              </FormGroup>
                              {this.state.data_dsa !== null ? (
                                this.state.data_dsa.site_info[1] !==
                                  undefined &&
                                this.state.data_dsa.mr_type !== "Return" &&
                                this.state.data_dsa.mr_type !== "Relocation" ? (
                                  <FormGroup style={{ paddingLeft: "16px" }}>
                                    <Label>To (Site ID FE)</Label>
                                    <Input
                                      type="text"
                                      name="11"
                                      value={
                                        this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "FE"
                                        ) !== undefined
                                          ? this.state.data_dsa.site_info.find(
                                              (si) => si.site_title === "FE"
                                            ).site_id
                                          : null
                                      }
                                      onChange={this.handleChangeForm}
                                      readOnly
                                    />
                                  </FormGroup>
                                ) : (
                                  <div></div>
                                )
                              ) : (
                                <div></div>
                              )}
                            </Col>
                            <Col md="3">
                              <h6>Destination</h6>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>From</Label>
                                <Input
                                  type="text"
                                  name="10"
                                  value={
                                    this.state.data_dsa.origin !== undefined
                                      ? this.state.data_dsa.origin.value
                                      : ""
                                  }
                                  onChange={this.handleChangeForm}
                                  readOnly
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>
                                  To{" "}
                                  {this.state.data_dsa !== null &&
                                  (this.state.data_dsa.mr_type === "New" ||
                                    this.state.data_dsa.mr_type === null)
                                    ? "(Site Name NE)"
                                    : "(Warehouse)"}
                                </Label>
                                <Input
                                  type="textarea"
                                  name="11"
                                  value={
                                    this.state.data_dsa.site_info.find(
                                      (si) => si.site_title === "NE"
                                    ) !== undefined
                                      ? this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "NE"
                                        ).site_name
                                      : null
                                  }
                                  onChange={this.handleChangeForm}
                                  readOnly
                                />
                              </FormGroup>
                              {this.state.data_dsa !== null ? (
                                this.state.data_dsa.site_info[1] !==
                                  undefined &&
                                this.state.data_dsa.mr_type !== "Return" &&
                                this.state.data_dsa.mr_type !== "Relocation" ? (
                                  <FormGroup style={{ paddingLeft: "16px" }}>
                                    <Label>To (Site Name FE)</Label>
                                    <Input
                                      type="textarea"
                                      name="11"
                                      value={
                                        this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "FE"
                                        ) !== undefined
                                          ? this.state.data_dsa.site_info.find(
                                              (si) => si.site_title === "FE"
                                            ).site_name
                                          : null
                                      }
                                      onChange={this.handleChangeForm}
                                      readOnly
                                    />
                                  </FormGroup>
                                ) : (
                                  <div></div>
                                )
                              ) : (
                                <div></div>
                              )}
                            </Col>
                            <Col md="2">
                              <h6>Destination</h6>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>From</Label>
                                <Input
                                  type="text"
                                  name="10"
                                  value={
                                    this.state.data_dsa.origin !== undefined
                                      ? this.state.data_dsa.origin.value
                                      : ""
                                  }
                                  onChange={this.handleChangeForm}
                                  readOnly
                                />
                              </FormGroup>
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>
                                  To{" "}
                                  {this.state.data_dsa !== null &&
                                  (this.state.data_dsa.mr_type === "New" ||
                                    this.state.data_dsa.mr_type === null)
                                    ? "(Coordinate NE)"
                                    : "(Warehouse)"}
                                </Label>
                                <Input
                                  type="textarea"
                                  name="11"
                                  value={
                                    this.state.data_dsa.site_info.find(
                                      (si) => si.site_title === "NE"
                                    ) !== undefined
                                      ? "Lat : " +
                                        this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "NE"
                                        ).site_latitude +
                                        " ; Long : " +
                                        this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "NE"
                                        ).site_longitude
                                      : null
                                  }
                                  onChange={this.handleChangeForm}
                                  readOnly
                                />
                              </FormGroup>
                              {this.state.data_dsa !== null ? (
                                this.state.data_dsa.site_info[1] !==
                                  undefined &&
                                this.state.data_dsa.mr_type !== "Return" &&
                                this.state.data_dsa.mr_type !== "Relocation" ? (
                                  <FormGroup style={{ paddingLeft: "16px" }}>
                                    <Label>To (Site FE)</Label>
                                    <Input
                                      type="textarea"
                                      name="11"
                                      value={
                                        this.state.data_dsa.site_info.find(
                                          (si) => si.site_title === "FE"
                                        ) !== undefined
                                          ? "Lat : " +
                                            this.state.data_dsa.site_info.find(
                                              (si) => si.site_title === "FE"
                                            ).site_latitude +
                                            " ; Long : " +
                                            this.state.data_dsa.site_info.find(
                                              (si) => si.site_title === "FE"
                                            ).site_longitude
                                          : null
                                      }
                                      onChange={this.handleChangeForm}
                                      readOnly
                                    />
                                  </FormGroup>
                                ) : (
                                  <div></div>
                                )
                              ) : (
                                <div></div>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Address</Label>
                                <Input
                                  type="textarea"
                                  name="14"
                                  rows="3"
                                  readOnly
                                  value={
                                    this.state.data_dsa.origin !== undefined
                                      ? this.state.data_dsa.origin.value
                                      : ""
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="2">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>
                                  Vol (m<sup>3</sup>)
                                </Label>
                                <Input
                                  type="number"
                                  name="12"
                                  readOnly
                                  value={this.state.data_dsa.dimension_volume}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="2">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>Weight (Kg)</Label>
                                <Input
                                  type="number"
                                  name="13"
                                  readOnly
                                  value={this.state.data_dsa.dimension_weight}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">{this.loopSection1()}</Col>
                          </Row>
                          <h5>
                            SECTION 2 (For additional services which are covered
                            in PO and available in contract)
                          </h5>
                          <Row>
                            <Col md="12">{this.loopSection2()}</Col>
                          </Row>
                          <h5>
                            SECTION 3 (For additional services which are not
                            covered in PO and not available in contract)
                          </h5>
                          <Row>
                            <Col md="3">
                              <FormGroup style={{ paddingLeft: "16px" }}>
                                <Label>DAC Number</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={
                                    this.state.data_dsa.third_section.dac_number
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          {this.loopSection3()}
                          <h5>POD FILE</h5>
                          <Row style={{ paddingLeft: "16px" }}>
                            <Col md="3">
                              <Button
                                size="sm"
                                color="info"
                                onClick={this.getDSAFile}
                              >
                                File Download
                              </Button>
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
                                <Input
                                  type="select"
                                  name="196"
                                  onChange={this.handleChangeForm}
                                >
                                  <option disabled selected hidden>
                                    Select
                                  </option>
                                  <option value="Actual">Actual</option>
                                  <option value="Prebook">Prebook</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <h5 style={{ marginTop: "10px" }}>DSA SUMMARY</h5>
                          <Row
                            style={{
                              paddingLeft: "16px",
                              paddingRight: "16px",
                            }}
                          >
                            <Col
                              md="2"
                              style={{ margin: "0", paddingLeft: "16px" }}
                            >
                              <FormGroup>
                                <Label>Total Value</Label>
                                <Input
                                  type="text"
                                  readOnly
                                  value={this.state.data_dsa.dsa_total_value.toLocaleString()}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <h5 style={{ marginTop: "10px" }}>GR</h5>
                          <Row
                            style={{
                              paddingLeft: "16px",
                              paddingRight: "16px",
                            }}
                          >
                            <Col
                              md="2"
                              style={{ margin: "0", paddingLeft: "16px" }}
                            >
                              <FormGroup>
                                <Label>GR Number</Label>
                                {this.state.data_dsa.dsa_gr_no !== undefined &&
                                this.state.data_dsa.dsa_gr_no !== null ? (
                                  <Input
                                    type="text"
                                    name="grNumber"
                                    value={this.state.data_dsa.dsa_gr_no}
                                    readOnly
                                  />
                                ) : this.state.userRole.findIndex(
                                    (e) => e === "Admin"
                                  ) !== -1 ||
                                  this.state.userRole.findIndex(
                                    (e) => e == "BAM-LDM Admin"
                                  ) !== -1 ? (
                                  <Input
                                    type="text"
                                    name="grNumber"
                                    value={this.state.gr_data.grNumber}
                                    onChange={this.handleChangeGR}
                                  />
                                ) : (
                                  <Input
                                    type="text"
                                    name="grNumber"
                                    value={this.state.data_dsa.dsa_gr_no}
                                    readOnly
                                  />
                                )}
                              </FormGroup>
                              {this.state.data_dsa.current_dsa_status ===
                                "DSA LDM ADMIN APPROVED" && (
                                <Button
                                  size="sm"
                                  onClick={this.submitGRNumber}
                                  color="primary"
                                  disabled={
                                    this.state.gr_data.grNumber === undefined ||
                                    this.state.gr_data.grNumber.length === 0
                                  }
                                >
                                  Submit GR Number
                                </Button>
                              )}
                            </Col>
                          </Row>
                          <h5 style={{ marginTop: "10px" }}>DSA Timeline</h5>
                          {this.state.view_dsa_timeline === "Hide" ? (
                            <Fragment>
                              <Button
                                size="sm"
                                value="Show"
                                style={{ marginLeft: "16px" }}
                                onClick={this.handleChangeTimeline}
                              >
                                Show DSA Timeline
                              </Button>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <Row
                                style={{
                                  paddingLeft: "16px",
                                  paddingRight: "16px",
                                }}
                              >
                                <Col
                                  md="6"
                                  style={{ margin: "0", paddingLeft: "16px" }}
                                >
                                  <Table responsive striped bordered size="sm">
                                    <thead>
                                      <tr>
                                        <th>Status</th>
                                        <th>Actor</th>
                                        <th>Date</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.data_dsa.dsa_status !==
                                        undefined &&
                                        this.state.data_dsa.dsa_status.map(
                                          (ds) => (
                                            <tr>
                                              <td>
                                                {ds.dsa_status_name +
                                                  " " +
                                                  ds.dsa_status_value}
                                              </td>
                                              <td>{ds.dsa_status_updater}</td>
                                              <td>
                                                {ds.dsa_status_date.slice(
                                                  0,
                                                  10
                                                )}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                              <Button
                                size="sm"
                                value="Hide"
                                style={{ marginLeft: "16px" }}
                                onClick={this.handleChangeTimeline}
                              >
                                Hide DSA Timeline
                              </Button>
                            </Fragment>
                          )}
                        </Form>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    {(this.state.userRole.findIndex((e) => e === "Admin") !==
                      -1 ||
                      this.state.userRole.findIndex(
                        (e) => e === "BAM-LDM Admin"
                      ) !== -1 ||
                      this.state.userRole.findIndex((e) => e === "BAM-LDM") !==
                        -1 ||
                      this.state.userRole.findIndex(
                        (e) => e === "BAM-Mover"
                      ) !== -1) &&
                      this.state.data_dsa.current_dsa_status !==
                        "DSA ACTUALIZED" &&
                      this.state.data_dsa.current_dsa_status !==
                        "DSA LDM APPROVED" &&
                      this.state.data_dsa.current_dsa_status !==
                        "DSA LDM ADMIN APPROVED" &&
                      this.state.data_dsa.current_dsa_status !== "GR DONE" && (
                        <Button
                          color="primary"
                          size="sm"
                          id={this.state.data_dsa._id}
                          value={this.state.data_dsa._etag}
                          onClick={this.toggleActualModal}
                          hidden={
                            this.state.data_dsa.current_dsa_status ===
                              "DSA CREATED" ||
                            this.state.data_dsa.current_dsa_status ===
                              "DSA UPDATED" ||
                            this.state.data_dsa.current_dsa_status ===
                              "DSA APPROVED" ||
                            this.state.data_dsa.current_dsa_status ===
                              "DSA NEED REVISION"
                          }
                        >
                          <i
                            className="fa fa-check"
                            style={{ marginRight: "8px" }}
                          ></i>{" "}
                          State to Actual
                        </Button>
                      )}
                    {(this.state.userRole.findIndex((e) => e === "Admin") !==
                      -1 ||
                      this.state.userRole.findIndex(
                        (e) => e === "BAM-LDM Admin"
                      ) !== -1 ||
                      this.state.userRole.findIndex((e) => e === "BAM-LDM") !==
                        -1) && (
                      <Fragment>
                        {this.state.data_dsa.current_dsa_status ===
                          "DSA ACTUALIZED" &&
                          (this.state.userRole.findIndex(
                            (e) => e === "Admin"
                          ) !== -1 ||
                            this.state.userRole.findIndex(
                              (e) => e === "BAM-LDM"
                            ) !== -1) && (
                            <React.Fragment>
                              <Button
                                color="primary"
                                id={this.state.data_dsa._id}
                                size="sm"
                                value={"LDM"}
                                onClick={this.toggleApproveModal}
                                style={{ margin: "0px 5px 0px 5px" }}
                              >
                                Approve LDM
                              </Button>
                              <Button
                                color="primary"
                                id={this.state.data_dsa._id}
                                size="sm"
                                value={"LDM"}
                                onClick={this.toggleRejectModal}
                                style={{ margin: "0px 5px 0px 5px" }}
                              >
                                Reject LDM
                              </Button>
                            </React.Fragment>
                          )}
                        {this.state.data_dsa.current_dsa_status ===
                          "DSA LDM APPROVED" &&
                          (this.state.userRole.findIndex(
                            (e) => e === "Admin"
                          ) !== -1 ||
                            this.state.userRole.findIndex(
                              (e) => e === "BAM-LDM Admin"
                            ) !== -1) && (
                            <React.Fragment>
                              <Button
                                color="primary"
                                id={this.state.data_dsa._id}
                                size="sm"
                                value={"LDM-Admin"}
                                onClick={this.toggleApproveModal}
                                style={{ margin: "0px 5px 0px 5px" }}
                              >
                                Approve LDM Admin
                              </Button>
                              <Button
                                color="primary"
                                id={this.state.data_dsa._id}
                                size="sm"
                                value={"LDM-Admin"}
                                onClick={this.toggleRejectModal}
                                style={{ margin: "0px 5px 0px 5px" }}
                              >
                                Reject LDM Admin
                              </Button>
                            </React.Fragment>
                          )}
                      </Fragment>
                    )}
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
                {this.state.data_dsa !== null &&
                  this.state.data_dsa.dsa_status !== undefined &&
                  this.state.data_dsa.dsa_status.find(
                    (ds) => ds.dsa_status_value === "REJECTED"
                  ) !== undefined && (
                    <Fragment>
                      <tr>
                        <td>Reactual Note</td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <Input
                            type="textarea"
                            style={{ marginBottom: "20px" }}
                            onChange={this.handleChangeReactualNote}
                            value={this.state.reactual_note}
                          />
                        </td>
                      </tr>
                    </Fragment>
                  )}
                <tr>
                  <td></td>
                </tr>
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
              onClick={this.actualizeDSA}
              style={{ height: "30px", width: "100px" }}
            >
              State to Actual
            </Button>{" "}
          </ModalFooter>
        </ModalCreateNew>
        {/* Modal Reject DSA */}
        <Modal
          isOpen={this.state.rejectModal}
          toggle={this.toggleRejectModal}
          className={"modal-sm"}
        >
          <ModalHeader>Reject DSA</ModalHeader>
          <ModalBody>
            <div>Are You Sure Reject this DSA?</div>
            <Input
              type="textarea"
              rows="9"
              placeholder="Note..."
              onChange={this.handleRejectNote}
              value={this.state.reject_note}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="warning"
              style={{ float: "right", marginRight: "8px" }}
              value={"reject"}
              onClick={this.approvalDSA}
            >
              Reject
            </Button>
            <Button color="secondary" onClick={this.toggleRejectModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* End Modal Reject DSA */}
        {/* Modal Approve DSA */}
        <Modal
          isOpen={this.state.approveModal}
          toggle={this.toggleApproveModal}
          className={"modal-sm"}
        >
          <ModalHeader>Approve DSA</ModalHeader>
          <ModalBody>
            <div>Are You Sure Approve this DSA?</div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              style={{ float: "right", marginRight: "8px" }}
              value={"approve"}
              onClick={this.approvalDSA}
            >
              Approve
            </Button>
            <Button color="secondary" onClick={this.toggleApproveModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* End Modal Approve DSA */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar,
  };
};

export default connect(mapStateToProps)(DSADDetail);
