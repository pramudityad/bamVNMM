import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Row,
  Table,
  FormGroup,
  Label,
  ModalFooter,
  Modal,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
// import './project_css.css'

import ModalForm from "../components/ModalForm";
import {
  convertDateFormatfull,
  convertDateFormat,
} from "../../helper/basicFunction";

const API_URL = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";

const API_URL_XL = "https://api-dev.xl.pdb.e-dpm.com/xlpdbapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class MRANeedConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      mr_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: new Array(14).fill(""),
      mr_all: [],
      asp_data: [],
      action_status: null,
      action_message: null,
      modal_approve_ldm: false,
      id_mra_selected: null,
      selected_dsp: "",
      data_mr_selected: null,
      modal_confirm_input: false,
      rejectNote: "",
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadMRlist = this.downloadMRlist.bind(this);
    this.getMRAList = this.getMRAList.bind(this);
    this.getAllMR = this.getAllMR.bind(this);
    this.ApproveMR = this.ApproveMR.bind(this);
    this.confirmMRA = this.confirmMRA.bind(this);
    this.toggleModalapprove = this.toggleModalapprove.bind(this);
    this.toggleMRAConfirmInput = this.toggleMRAConfirmInput.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
  }

  toggleMRAConfirmInput(e) {
    if (e !== undefined) {
      const id_doc = e.currentTarget.id;
      this.setState({ id_mra_selected: id_doc });
    }
    this.setState((prevState) => ({
      modal_confirm_input: !prevState.modal_confirm_input,
    }));
  }

  handleChangeNote = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (value !== null && value.length !== 0 && value !== 0) {
      this.setState({ rejectNote: value });
    }
  };

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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
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
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      this.setState({
        action_status: "failed",
        action_message:
          "Sorry, There is something error, please refresh page and try again",
      });
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async getDatafromAPIEXEL(url) {
    try {
      let respond = await axios.get(API_URL_XL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameXL,
          password: passwordXL,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Get Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  toggleModalapprove(e) {
    this.getASPList();
    if (e !== undefined) {
      const id_doc = e.currentTarget.id;
      const dataMR = this.state.mr_list.find((e) => e._id === id_doc);
      if (
        dataMR !== undefined &&
        dataMR.dsp_company !== null &&
        dataMR.dsp_company !== undefined
      ) {
        this.setState({
          selected_dsp: {
            dsp_company_code: dataMR.dsp_company_code,
            dsp_company: dataMR.dsp_company,
          },
        });
      }
      this.setState({ id_mra_selected: id_doc, data_mr_selected: dataMR });
    } else {
      this.setState({ id_mra_selected: null, data_mr_selected: null });
    }
    this.setState((prevState) => ({
      modal_approve_ldm: !prevState.modal_approve_ldm,
    }));
  }

  getASPList() {
    // switch (this.props.dataLogin.account_id) {
    //   case "xl":
    this.getDatafromAPIEXEL('/vendor_data_non_page?where={"Type":"DSP"}').then(
      (res) => {
        console.log("asp data ", res.data);
        if (res.data !== undefined) {
          this.setState({ asp_data: res.data._items });
        } else {
          this.setState({ asp_data: [] });
        }
      }
    );
    //     break;
    //   default:
    //     break;
    // }
  }

  handleLDMapprove = (e) => {
    // this.getASPList();
    let value = e.target.value;
    let name = e.target.options[e.target.selectedIndex].text;
    let bodymrApprove = {
      dsp_company_code: value,
      dsp_company: name,
    };
    if (value !== 0) {
      this.setState({ selected_dsp: bodymrApprove });
    }
  };

  getMRAList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"mra_id":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"mr_id":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"project_name":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[4] !== "" &&
      filter_array.push(
        '"site_info.site_id":{"$regex" : "' +
          this.state.filter_list[4] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"site_info.site_name":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    filter_array.push('"current_mra_status":"MRA FINISH DELIVERY"');
    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"dsp_company":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    // this.state.filter_list[9] !== "" && (filter_array.push('"created_by":{"$regex" : "' + this.state.filter_list[9] + '", "$options" : "i"}'));
    this.state.filter_list[8] !== "" &&
      filter_array.push(
        '"updated_on":{"$regex" : "' +
          this.state.filter_list[8] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[9] !== "" &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list[9] +
          '", "$options" : "i"}'
      );
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/matreq-ra/?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
    ).then((res) => {
      console.log("MR List Sorted", res);
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ mr_list: items, totalData: totalData });
      }
    });
  }

  getAllMR() {
    let filter_array = [];
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"mra_id":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"mr_id":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"project_name":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[4] !== "" &&
      filter_array.push(
        '"site_info.site_id":{"$regex" : "' +
          this.state.filter_list[4] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"site_info.site_name":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    filter_array.push('"current_mra_status":"MRA FINISH DELIVERY"');
    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"dsp_company":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    // this.state.filter_list[9] !== "" && (filter_array.push('"created_by":{"$regex" : "' + this.state.filter_list[9] + '", "$options" : "i"}'));
    this.state.filter_list[8] !== "" &&
      filter_array.push(
        '"updated_on":{"$regex" : "' +
          this.state.filter_list[8] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[9] !== "" &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list[9] +
          '", "$options" : "i"}'
      );
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE("/matreq?noPg=1&q=" + whereAnd).then((res) => {
      console.log("MR List All", res);
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ mr_all: items });
      }
    });
  }

  numToSSColumn(num) {
    var s = "",
      t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = ((num - t) / 26) | 0;
    }
    return s || undefined;
  }

  async downloadMRlist() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = this.state.mr_all;

    let headerRow = [
      "MR ID",
      "Project Name",
      "CD ID",
      "Site ID",
      "Site Name",
      "Current Status",
      "Current Milestone",
      "DSP",
      "ETA",
      "Created By",
      "Updated On",
      "Created On",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < allMR.length; i++) {
      ws.addRow([
        allMR[i].mr_id,
        allMR[i].project_name,
        allMR[i].cd_id,
        allMR[i].site_info[0].site_id,
        allMR[i].site_info[0].site_name,
        allMR[i].current_mr_status,
        allMR[i].current_milestones,
        allMR[i].dsp_company,
        allMR[i].eta,
        "",
        allMR[i].updated_on,
        allMR[i].created_on,
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Order Created.xlsx");
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

  async proceedMilestone(e) {
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
    const _etag = e.target.value;
    const _id = e.target.id;
    let successUpdate = [];
    let updateMR = {};
    const dataMR = this.state.mr_list.find((e) => e._id === _id);
    if (dataMR.mr_type === "Relocation") {
      let currStatus = [
        {
          mr_status_name: "READY_TO_DELIVER",
          mr_status_value: "CONFIRMED",
          mr_status_date: dateNow,
          mr_status_updater: this.state.userEmail,
          mr_status_updater_id: this.state.userId,
        },
      ];
      let currMilestones = [
        {
          ms_name: "MS_READY_TO_DELIVER",
          ms_date: dateNow,
          ms_updater: this.state.userEmail,
          ms_updater_id: this.state.userId,
        },
      ];
      updateMR["current_milestones"] = "MS_READY_TO_DELIVER";
      updateMR["current_mr_status"] = "READY TO DELIVER";
      updateMR["mr_milestones"] = dataMR.mr_milestones.concat(currMilestones);
      updateMR["mr_status"] = dataMR.mr_status.concat(currStatus);
    } else {
      let currStatus = [
        {
          mr_status_name: "MATERIAL_REQUEST",
          mr_status_value: "APPROVED",
          mr_status_date: dateNow,
          mr_status_updater: this.state.userEmail,
          mr_status_updater_id: this.state.userId,
        },
      ];
      let currMilestones = [
        {
          ms_name: "MS_ORDER_RECEIVED",
          ms_date: dateNow,
          ms_updater: this.state.userEmail,
          ms_updater_id: this.state.userId,
        },
      ];
      updateMR["current_milestones"] = "MS_ORDER_RECEIVED";
      updateMR["current_mr_status"] = "MR APPROVED";
      updateMR["mr_milestones"] = dataMR.mr_milestones.concat(currMilestones);
      updateMR["mr_status"] = dataMR.mr_status.concat(currStatus);
    }
    let res = await this.patchDataToAPI("/mr_op/" + _id, updateMR, _etag);
    if (res !== undefined) {
      if (res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if (successUpdate.length !== 0) {
      this.setState({ action_status: "success" });
      this.getMRAList();
      // setTimeout(function(){ window.location.reload(); }, 2000);
    }
  }

  ApproveMR(e) {
    const _id = this.state.id_mra_selected;
    const body = this.state.selected_dsp;
    // console.log('_id ',_id);
    // console.log('body ',body);
    this.patchDatatoAPINODE("/matreq/approveMatreq/" + _id, body).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
          this.getMRAList();
          this.toggleModalapprove();
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
          this.toggleModalapprove();
        }
      }
    );
  }

  confirmMRA(e) {
    const id_doc = e.currentTarget.id;
    let reason = this.state.rejectNote;
    this.patchDatatoAPINODE("/matreq-ra/confirmMRA/" + id_doc, {
      data: { note: reason },
    }).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.getMRAList();
        this.toggleMRAConfirmInput();
      } else {
        this.setState({ action_status: "failed" });
        this.toggleMRAConfirmInput();
      }
    });
  }

  componentDidMount() {
    this.getMRAList();
    // this.getAllMR();
    document.title = "MRA List | BAM";
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getMRAList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if (value !== "" && value.length === 0) {
      value = "";
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({ filter_list: dataFilter, activePage: 1 }, () => {
      this.onChangeDebounced(e);
    });
  }

  onChangeDebounced(e) {
    this.getMRAList();
    // this.getAllMR();
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < 10; i++) {
      searchBar.push(
        <td>
          <div className="controls" style={{ width: "150px" }}>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Search"
                onChange={this.handleFilterList}
                value={this.state.filter_list[i]}
                name={i}
                size="sm"
              />
            </InputGroup>
          </div>
        </td>
      );
    }
    return searchBar;
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const downloadMR = {
      float: "right",
    };

    return (
      <div className="animated fadeIn">
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2" }}>
                  <i
                    className="fa fa-align-justify"
                    style={{ marginRight: "8px" }}
                  ></i>
                  MRA List
                </span>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>MRA ID</th>
                      <th>MR ID</th>
                      <th>Project Name</th>
                      <th>CD ID</th>
                      <th>Tower ID</th>
                      <th>Tower Name</th>
                      <th>Current Status</th>
                      <th>DSP</th>
                      <th>Updated On</th>
                      <th>Created On</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.mr_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.mr_list.map((list, i) => (
                      <tr key={list._id}>
                        <td>
                          {list.current_mra_status ===
                            "MRA FINISH DELIVERY" && (
                            <Button
                              outline
                              color="success"
                              size="sm"
                              className="btn-pill"
                              style={{ width: "90px" }}
                              id={list._id}
                              value={list._etag}
                              onClick={this.toggleMRAConfirmInput}
                            >
                              >> Confirm
                            </Button>
                          )}
                          {/* <Button outline color="success" size="sm" className="btn-pill" style={{ width: "90px", marginBottom: "4px" }} id={list._id} value={list._etag} onClick={this.ApproveMR}><i className="fa fa-check" style={{ marginRight: "8px" }}></i>Approve</Button> */}
                        </td>
                        <td>
                          <Link to={"/mra-list/detail/" + list._id}>
                            {list.mra_id}
                          </Link>
                        </td>
                        <td>{list.mr_id}</td>
                        <td>{list.project_name}</td>
                        <td>
                          {list.cust_del !== undefined &&
                            list.cust_del
                              .map((custdel) => custdel.cd_id)
                              .join(" , ")}
                        </td>
                        <td>
                          {list.site_info !== undefined &&
                            list.site_info
                              .map((site_info) => site_info.site_id)
                              .join(" , ")}
                        </td>
                        <td>
                          {list.site_info !== undefined &&
                            list.site_info
                              .map((site_info) => site_info.site_name)
                              .join(" , ")}
                        </td>
                        <td>{list.current_mra_status}</td>
                        <td>{list.dsp_company}</td>
                        <td>{convertDateFormatfull(list.updated_on)}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }}>
                  <small>
                    Showing {this.state.mr_list.length} entries from{" "}
                    {this.state.totalData} data
                  </small>
                </div>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={this.state.totalData}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal Loading */}
        <Modal
          isOpen={this.state.modal_confirm_input}
          toggle={this.toggleMRAConfirmInput}
          className={"modal-sm modal--box-input"}
        >
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label>Confirm Note</Label>
                  <Input
                    type="text"
                    name={this.state.id_mra_selected}
                    placeholder="Write Confirm Note"
                    onChange={this.handleChangeNote}
                    value={this.state.rejectNote}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={!this.state.rejectNote}
              outline
              color="success"
              size="sm"
              style={{ width: "80px" }}
              id={this.state.id_mra_selected}
              onClick={this.confirmMRA}
            >
              Confirm MRA
            </Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}

        {/* modal form approve */}
        <ModalForm
          isOpen={this.state.modal_approve_ldm}
          toggle={this.toggleModalapprove}
          className={"modal-sm modal--box-input modal__delivery--ldm-approve"}
        >
          <Col>
            {this.state.data_mr_selected !== null &&
            this.state.data_mr_selected !== undefined &&
            this.state.data_mr_selected.dsp_company !== null ? (
              <FormGroup>
                <Label htmlFor="total_box">Delivery Company</Label>
                <Input
                  type="text"
                  className=""
                  placeholder=""
                  value={this.state.data_mr_selected.dsp_company}
                  readOnly
                />
              </FormGroup>
            ) : (
              <FormGroup>
                <Label htmlFor="total_box">DSP Company</Label>
                <Input
                  type="select"
                  className=""
                  placeholder=""
                  onChange={this.handleLDMapprove}
                  name={this.state.id_mra_selected}
                >
                  {this.state.asp_data.map((asp) => (
                    <option value={asp.Vendor_Code}>{asp.Name}</option>
                  ))}
                </Input>
              </FormGroup>
            )}
          </Col>
          <div style={{ justifyContent: "center", alignSelf: "center" }}>
            <Button
              color="success"
              onClick={this.ApproveMR}
              className="btn-pill"
            >
              <i className="icon-check icons"></i> Approve
            </Button>
          </div>
        </ModalForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(MRANeedConfirm);
