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
} from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import ActionType from "../../redux/reducer/globalActionType";
import {
  convertDateFormatfull,
  convertDateFormat,
} from "../../helper/basicFunction";

import Loading from "../components/Loading";

const API_URL = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const array_field = [
  "shf_no",
  "related_to",
  "site_id",
  "site_name",
  "site_location.latitude",
  "site_location.longitude",
  "distance",
  "amount_paid",
  "receiver_name",
  "receiver_email",
  "receiver_note",
  "created_by",
  "created_on",
];

class SHFList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      vendor_name: this.props.dataLogin.vendor_name,
      vendor_code: this.props.dataLogin.vendor_code,
      ps_dis_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: {},
      ps_dis_all: [],
      modal_loading: false,
      dropdownOpen: new Array(1).fill(false),
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadPSDislist = this.downloadPSDislist.bind(this);
    this.getSHFList = this.getSHFList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.downloadAllMRMigration = this.downloadAllMRMigration.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.getAllMR = this.getAllMR.bind(this);
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
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

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  getSHFList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for (let i = 0; i < array_field.length; i++) {
      if (
        this.state.filter_list[array_field[i]] !== null &&
        this.state.filter_list[array_field[i]] !== undefined
      ) {
        if (array_field[i] === "related_to") {
          filter_array.push(
            '"$or" : [{"mr_id":{"$regex" : "' +
              this.state.filter_list[array_field[i]] +
              '", "$options" : "i"}}, {"assignment_no":{"$regex" : "' +
              this.state.filter_list[array_field[i]] +
              '", "$options" : "i"}}]'
          );
        } else if (array_field[i] === "amount_paid") {
          filter_array.push(
            '"amount_paid":{"$regex" : ' +
              this.state.filter_list[array_field[i]] +
              "}"
          );
        } else {
          filter_array.push(
            '"' +
              array_field[i] +
              '":{"$regex" : "' +
              this.state.filter_list[array_field[i]] +
              '", "$options" : "i"}'
          );
        }
      }
    }
    if (
      (this.state.userRole.findIndex((e) => e === "BAM-ASP") !== -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-ASP Management") !==
          -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-Mover") !== -1) &&
      this.state.userRole.findIndex((e) => e === "Admin") === -1
    ) {
      filter_array.push('"dsp_company" : "' + this.state.vendor_name + '"');
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/siteHandlingFee?srt=_id:-1&q=" +
        whereAnd +
        "&lmt=" +
        maxPage +
        "&pg=" +
        page
    ).then((res) => {
      console.log("SHF List Sorted", res);
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ ps_dis_list: items, totalData: totalData });
      }
    });
  }

  async getAllMR() {
    let mrList = [];
    let filter_array = [];
    for (let i = 0; i < array_field.length; i++) {
      if (
        this.state.filter_list[array_field[i]] !== null &&
        this.state.filter_list[array_field[i]] !== undefined
      ) {
        if (array_field[i] === "related_to") {
          filter_array.push(
            '"$or" : [{"mr_id":{"$regex" : "' +
              this.state.filter_list[array_field[i]] +
              '", "$options" : "i"}}, {"assignment_no":{"$regex" : "' +
              this.state.filter_list[array_field[i]] +
              '", "$options" : "i"}}]'
          );
        } else {
          filter_array.push(
            '"' +
              array_field[i] +
              '":{"$regex" : "' +
              this.state.filter_list[array_field[i]] +
              '", "$options" : "i"}'
          );
        }
      }
    }
    if (
      (this.state.userRole.findIndex((e) => e === "BAM-ASP") !== -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-ASP Management") !==
          -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-Mover") !== -1) &&
      this.state.userRole.findIndex((e) => e === "Admin") === -1
    ) {
      filter_array.push('"dsp_company" : "' + this.state.vendor_name + '"');
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    let res = await this.getDataFromAPINODE(
      "/matreq?srt=_id:-1&noPg=1&q=" + whereAnd
    );
    if (res.data !== undefined) {
      const items = res.data.data;
      mrList = res.data.data;
      return mrList;
      // this.setState({ ps_dis_all: items });
    } else {
      return [];
    }
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

  async downloadPSDislist() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = await this.getAllMR();

    let headerRow = [
      "MR ID",
      "MR MITT ID",
      "MR Type",
      "MR Delivery Type",
      "Project Name",
      "CD ID",
      "Site ID",
      "Site Name",
      "Current Status",
      "Current Milestone",
      "DSP",
      "ETA",
      "MR MITT Created On",
      "MR MITT Created By",
      "Updated On",
      "Created On",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < allMR.length; i++) {
      const creator_mr_mitt = allMR[i].mr_status.find(
        (e) =>
          e.mr_status_name === "PLANTSPEC" &&
          e.mr_status_value === "NOT ASSIGNED"
      );
      ws.addRow([
        allMR[i].mr_id,
        allMR[i].mr_mitt_no,
        allMR[i].mr_type,
        allMR[i].mr_delivery_type,
        allMR[i].project_name,
        allMR[i].cust_del !== undefined
          ? allMR[i].cust_del.map((cd) => cd.cd_id).join(", ")
          : allMR[i].cd_id,
        allMR[i].site_info[0] !== undefined
          ? allMR[i].site_info[0].site_id
          : null,
        allMR[i].site_info[0] !== undefined
          ? allMR[i].site_info[0].site_name
          : null,
        allMR[i].current_mr_status,
        allMR[i].current_milestones,
        allMR[i].dsp_company,
        allMR[i].eta,
        creator_mr_mitt !== undefined ? creator_mr_mitt.mr_status_date : null,
        creator_mr_mitt !== undefined
          ? creator_mr_mitt.mr_status_updater
          : null,
        allMR[i].updated_on,
        allMR[i].created_on,
      ]);
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "SHF List.xlsx");
  }

  componentDidMount() {
    this.props.SidebarMinimizer(true);
    this.getSHFList();
    // this.getAllMR();
    document.title = "SHF List | BAM";
  }

  componentWillUnmount() {
    this.props.SidebarMinimizer(false);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getSHFList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if (value !== null && value.length === 0) {
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[index] = value;
    this.setState({ filter_list: dataFilter, activePage: 1 }, () => {
      this.onChangeDebounced(e);
    });
  }

  async downloadAllMRMigration() {
    let allMRList = [];
    let getMR = await this.getDataFromAPINODE(
      '/matreq?noPg=1&srt=_id:-1&q={"mr_mitt_no" : {"$exists" : 1}, "mr_mitt_no" : {"$ne" : null}}'
    );
    if (getMR.data !== undefined) {
      allMRList = getMR.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "mr_bam_id",
      "mr_mitt_no",
      "ps_mitt_no",
      "plantspec_assigned_date",
      "plantspec_assigned_by",
      "mr_requested_date",
      "mr_requested_by",
      "mr_approved_date",
      "mr_approved_by",
      "order_processing_finish_date",
      "order_processing_finish_by",
      "rtd_confirmed_date",
      "rtd_confirmed_by",
      "joint_check_finish_date",
      "joint_check_finish_by",
      "loading_process_finish_date",
      "loading_process_finish_by",
      "mr_dispatch_date",
      "mr_dispatch_by",
      "mr_on_site_date",
      "mr_on_site_by",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < allMRList.length; i++) {
      let rowAdded = [allMRList[i].mr_id, allMRList[i].mr_mitt_no];
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "SHF List For Status Migration from SH Template.xlsx"
    );
  }

  onChangeDebounced(e) {
    this.getSHFList();
    // this.getAllMR();
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < array_field.length; i++) {
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
                value={this.state.filter_list[array_field[i]]}
                name={array_field[i]}
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
      marginRight: "10px",
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2" }}>
                  <i
                    className="fa fa-align-justify"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  SHF List
                </span>
                {this.state.userRole.findIndex((e) => e === "BAM-ASP") === -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-ASP Management"
                  ) === -1 &&
                  this.state.userRole.findIndex((e) => e === "BAM-Mover") ===
                    -1 && (
                    <React.Fragment>
                      <Dropdown
                        size="sm"
                        isOpen={this.state.dropdownOpen[0]}
                        toggle={() => {
                          this.toggleDropdown(0);
                        }}
                        style={{ float: "right", marginRight: "10px" }}
                      >
                        <DropdownToggle caret color="secondary">
                          <i className="fa fa-download" aria-hidden="true">
                            {" "}
                            &nbsp;{" "}
                          </i>
                          File
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>MR File</DropdownItem>
                          <DropdownItem onClick={this.downloadPSDislist}>
                            {" "}
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            Download SHF List
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </React.Fragment>
                  )}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>SHF ID</th>
                      <th>Related No</th>
                      <th>Tower ID</th>
                      <th>Tower Name</th>
                      <th>Lat</th>
                      <th>Long</th>
                      <th>Distance</th>
                      <th>Amount Paid</th>
                      <th>Receiver</th>
                      <th>Receiver Email</th>
                      <th>Note</th>
                      <th>Created By</th>
                      <th>Created On</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.ps_dis_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.ps_dis_list.map((list, i) => (
                      <tr key={list._id}>
                        <td>{list.shf_no}</td>
                        <td>
                          {list.related_to === "MR"
                            ? list.mr_id
                            : list.assignment_no}
                        </td>
                        <td>{list.site_id}</td>
                        <td>{list.site_name}</td>
                        <td>{list.site_location.latitude}</td>
                        <td>{list.site_location.longitude}</td>
                        <td>{list.distance}</td>
                        <td>{list.amount_paid}</td>
                        <td>{list.receiver_name}</td>
                        <td>{list.receiver_email}</td>
                        <td>{list.receiver_note}</td>
                        <td>{list.creator.map((e) => e.email)}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }}>
                  <small>
                    Showing {this.state.perPage} entries from{" "}
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
        <Loading
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}
        ></Loading>
        {/* end Modal Loading */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    SidebarMinimizer: (minimize) =>
      dispatch({
        type: ActionType.MINIMIZE_SIDEBAR,
        minimize_sidebar: minimize,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SHFList);
