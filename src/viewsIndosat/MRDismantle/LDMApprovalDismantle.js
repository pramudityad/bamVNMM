import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table, FormGroup, Label, ModalFooter, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";

import ModalForm from "../components/ModalForm";
import {convertDateFormatfull, convertDateFormat} from '../../helper/basicFunction'

const API_URL = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";

const API_URL_XL = "https://api-dev.isat.pdb.e-dpm.com/isatapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

const API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const array_field = ["mra_id", "mra_type", "mrd_category", "project_name", "site_info.site_id", "site_info.site_name", "destination.value", "site_info.site_name", "current_mra_status", "creator.email", "created_on"];

class OrderCreated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      mr_dis_list: [],
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
      id_mr_selected: null,
      selected_dsp: "",
      data_mr_selected: null,
      modal_box_input: false,
      rejectNote: "",
      mot_type : null,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadMRlist = this.downloadMRlist.bind(this);
    this.getMRDisList = this.getMRDisList.bind(this);
    this.ApproveMR = this.ApproveMR.bind(this);
    this.rejectMR = this.rejectMR.bind(this);
    this.toggleModalapprove = this.toggleModalapprove.bind(this);
    this.toggleBoxInput = this.toggleBoxInput.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleMotType = this.handleMotType.bind(this);
  }

  toggleBoxInput(e) {
    if(e !== undefined){
      const id_doc = e.currentTarget.id;
      this.setState({ id_mr_selected: id_doc });
    }
    this.setState(prevState => ({
      modal_box_input: !prevState.modal_box_input
    }));
  }

  handleChangeNote = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (value !== null && value.length !== 0 && value !== 0) {
      this.setState({ rejectNote: value });
    }
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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE + url, {
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
      let respond = await axios.patch(API_URL_NODE + url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
      });
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

  async getDatafromAPIISAT(url) {
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
      const dataMR = this.state.mr_dis_list.find((e) => e._id === id_doc);
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
      this.setState({ id_mr_selected: id_doc, data_mr_selected: dataMR });
    } else {
      this.setState({ id_mr_selected: null, data_mr_selected: null });
    }
    this.setState((prevState) => ({
      modal_approve_ldm: !prevState.modal_approve_ldm,
    }));
  }

  getASPList() {
    this.getDatafromAPIISAT('/vendor_data_non_page?where={"Type":"DSP"}').then(
      (res) => {
        console.log("asp data ", res.data);
        if (res.data !== undefined) {
          this.setState({ asp_data: res.data._items });
        } else {
          this.setState({ asp_data: [] });
        }
      }
    );
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

  getMRDisList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    filter_array.push('"$or" : [{"current_mra_status":"PLANTSPEC SRN ASSIGNED"}, {"current_mra_status":"MR REQUESTED"}]');
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = '{' + filter_array.join(',') + '}';
    this.getDataFromAPINODE('/matreq-srn?srt=_id:-1&q=' + whereAnd + '&lmt=' + maxPage + '&pg=' + page).then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ mr_dis_list: items, totalData: totalData });
      }
    })
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

  ApproveMR(e) {
    const _id = this.state.id_mr_selected;
    let body = this.state.selected_dsp;
    let dataMot = this.state.mot_type;
    const dataMR = this.state.mr_dis_list.find(mrd => mrd._id === _id);
    if(dataMR.dsp_company !== null && dataMR.dsp_company !== undefined){
      body = {"dsp_company_code" : dataMR.dsp_company_code, "dsp_company": dataMR.dsp_company}
    }
    body = {...body, ...{"approve": true}, ...{"motType" : dataMot}}
    this.patchDatatoAPINODE("/matreq-srn/approveMrd/" + _id,  {data : body} ).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
          this.toggleModalapprove();
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
          this.toggleModalapprove();
        }
      }
    );
  }

  rejectMR(e) {
    this.toggleLoading();
    const _id = this.state.id_mr_selected;
    let body = this.state.selected_dsp;
    const dataMR = this.state.mr_dis_list.find(mrd => mrd._id === _id);
    if(dataMR.dsp_company !== null && dataMR.dsp_company !== undefined){
      body = {"dsp_company_code" : dataMR.dsp_company_code, "dsp_company": dataMR.dsp_company}
    }
    body = {...body, ...{"approve": true}}
    // console.log('_id ',_id);
    this.patchDatatoAPINODE("/matreq-srn/approveMrd/" + _id,  {data : body} ).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
          this.getMRDisList();
          this.toggleLoading();
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
          this.toggleLoading();
        }
      }
    );
  }

  componentDidMount() {
    this.getMRDisList();
    // this.getAllMR();
    document.title = "MRA  Approval | BAM";
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getMRDisList();
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
    this.getMRDisList();
    // this.getAllMR();
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < array_field.length; i++) {
      searchBar.push(
        <td>
          <div className="controls" style={{ width: '150px' }}>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText><i className="fa fa-search"></i></InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[array_field[i]]} name={array_field[i]} size="sm" />
            </InputGroup>
          </div>
        </td>
      )
    }
    return searchBar;
  }

  handleMotType(e){
    this.setState({mot_type : e.target.value});
  }

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
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }} ></i>
                  LDM Approval MRA
                </span>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <tr>
                    <th rowSpan="2">Action</th>
                    <th>MRA  ID</th>
                    <th>MRA Type</th>
                    <th>Category</th>
                    <th>Project Name</th>
                    <th>Site ID Origin</th>
                    <th>Site Name Origin</th>
                    <th>Destination ID</th>
                    <th>Destination Name</th>
                    <th>Current Status</th>
                    <th>Created By</th>
                    <th>Created On</th>
                  </tr>
                  <tr>
                    {this.loopSearchBar()}
                  </tr>
                  <tbody>
                    {this.state.mr_dis_list.length === 0 && (
                      <tr>
                        <td colSpan="16">No Data Available</td>
                      </tr>
                    )}
                    {this.state.mr_dis_list.map((list, i) =>
                      <tr key={list._id}>
                        <td>
                          {/* <Button outline color="success" size="sm" className="btn-pill" style={{ width: "90px", marginBottom: "4px" }} id={list._id} value={list._etag} onClick={this.ApproveMR}><i className="fa fa-check" style={{ marginRight: "8px" }}></i>Approve</Button> */}
                          <Button outline color="success" size="sm" className="btn-pill" style={{ width: "90px", marginBottom: "4px" }} id={list._id} value={list._etag} onClick={this.toggleModalapprove} >
                            <i className="fa fa-check" style={{ marginRight: "8px" }} ></i>
                            Approve
                          </Button>
                          <Button outline color="danger" size="sm" className="btn-pill" style={{ width: "90px" }} id={list._id} value={list._etag} onClick={this.toggleBoxInput} >
                            <i className="fa fa-times" style={{ marginRight: "8px" }} ></i>
                            Reject
                          </Button>
                        </td>
                        <td><Link to={'/srn/mr-srn-detail/'+list._id}>{list.mra_id}</Link></td>
                        <td>{list.mra_type}</td>
                        <td>{list.mrd_category}</td>
                        <td>{list.project_name}</td>
                        <td>{list.site_info.find(si => si.srn_title === "Origin") !== undefined ? list.site_info.find(si => si.srn_title === "Origin").site_id : null }</td>
                        <td>{list.site_info.find(si => si.srn_title === "Origin") !== undefined ? list.site_info.find(si => si.srn_title === "Origin").site_name : null}</td>
                        <td>{list.mrd_category === "To Warehouse" ? list.destination.value : list.site_info.find(si => si.srn_title === "Destination") !== undefined ? list.site_info.find(si => si.srn_title === "Destination").site_id : null }</td>
                        <td>{list.mrd_category === "To Warehouse" ? null : list.site_info.find(si => si.srn_title === "Destination") !== undefined ? list.site_info.find(si => si.srn_title === "Destination").site_name : null}</td>
                        <td>{list.current_mra_status}</td>
                        <td>{list.creator.map(e => e.email)}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }}>
                  <small>Showing {this.state.mr_all.length} entries from {this.state.totalData} data</small>
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
<Modal isOpen={this.state.modal_box_input} toggle={this.toggleBoxInput} className={'modal-sm modal--box-input'}>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label>Reject Note</Label>
                  <Input
                    type="text"
                    name={this.state.id_mr_selected}
                    placeholder="Write Reject Note"
                    onChange={this.handleChangeNote}
                    value={this.state.rejectNote}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!this.state.rejectNote} outline color="danger" size="sm" style={{ width: "80px" }} id={this.state.id_mr_selected} onClick={this.rejectMR}>Reject MR</Button>
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
              <React.Fragment>
              <FormGroup>
                <Label htmlFor="total_box">DSP Company</Label>
                <Input
                  type="select"
                  className=""
                  placeholder=""
                  onChange={this.handleLDMapprove}
                  name={this.state.id_mr_selected}
                >
                  <option value="" disabled selected hidden></option>
                  {this.state.asp_data.map((asp) => (
                    <option value={asp.Vendor_Code}>{asp.Name}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="total_box">MOT Type</Label>
                <Input type="select" name={"0 /// sub_category"} onChange={this.handleMotType} value={this.state.mot_type}>
                  <option value="" disabled selected hidden></option>
                  <option value="MOT-Land">MOT-Land</option>
                  <option value="MOT-Air">MOT-Air</option>
                  <option value="MOT-Sea">MOT-Sea</option>
                </Input>
              </FormGroup>
              </React.Fragment>
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

export default connect(mapStateToProps)(OrderCreated);
