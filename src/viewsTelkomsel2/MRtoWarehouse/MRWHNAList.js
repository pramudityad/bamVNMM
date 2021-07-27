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
  "mr_id",
  "mr_delivery_type",
  "project_name",
  "origin.value",
  "destination.value",
  "current_mr_status",
  "creator.email",
  "created_on",
];

class MRWHNAList extends Component {
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
      mr_dis_list: [],
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
    this.downloadPSDisList = this.downloadPSDisList.bind(this);
    this.getPSDisList = this.getPSDisList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.getAllPSDis = this.getAllPSDis.bind(this);
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
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

  getPSDisList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for (let i = 0; i < array_field.length; i++) {
      if (
        this.state.filter_list[array_field[i]] !== undefined &&
        this.state.filter_list[array_field[i]] !== null
      ) {
        filter_array.push(
          '"' +
            array_field[i] +
            '":{"$regex" : "' +
            this.state.filter_list[array_field[i]] +
            '", "$options" : "i"}'
        );
      }
    }
    filter_array.push('"current_mr_status":"PLANTSPEC NOT ASSIGNED"');
    if (
      (this.state.userRole.findIndex((e) => e === "BAM-ASP") !== -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-ASP Management") !==
          -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-Mover") !== -1) &&
      this.state.userRole.findIndex((e) => e === "Admin") === -1
    ) {
      filter_array.push('"dsp_company" : "' + this.state.vendor_name + '"');
    }
    filter_array.push(
      '"$or" : [{"mr_delivery_type_code" : "A1"}, {"mr_delivery_type_code" : "A2"}, {"mr_delivery_type_code" : "B1"}, {"mr_delivery_type_code" : "C1"}]'
    );
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/matreq?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ mr_dis_list: items, totalData: totalData });
      }
    });
  }

  async getAllPSDis() {
    let PSDisList = [];
    let filter_array = [];
    for (let i = 0; i < array_field.length; i++) {
      if (
        this.state.filter_list[array_field[i]] !== undefined &&
        this.state.filter_list[array_field[i]] !== null
      ) {
        filter_array.push(
          '"' +
            array_field[i] +
            '":{"$regex" : "' +
            this.state.filter_list[array_field[i]] +
            '", "$options" : "i"}'
        );
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
      "/siteHandlingFee?srt=_id:-1&noPg=1&q=" + whereAnd
    );
    if (res.data !== undefined) {
      const items = res.data.data;
      PSDisList = res.data.data;
      return PSDisList;
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

  componentDidMount() {
    this.props.SidebarMinimizer(true);
    this.getPSDisList();
    // this.getAllPSDis();
    document.title = "MR Warehouse List | BAM";
  }

  componentWillUnmount() {
    this.props.SidebarMinimizer(false);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPSDisList();
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

  async downloadPSDisList() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allSHF = await this.getAllPSDis();

    let headerRow = [
      "SHF No.",
      "Related To",
      "Related No.",
      "Tower ID",
      "Tower Name",
      "Latitude",
      "Longitude",
      "Region",
      "Distance",
      "Amount Paid",
      "Receiver Name",
      "Receiver Email",
      "Note",
      "Receiver Phone",
      "Created By",
      "Created On",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < allSHF.length; i++) {
      ws.addRow([
        allSHF[i].shf_no,
        allSHF[i].related_to,
        allSHF[i].related_to === "MR"
          ? allSHF[i].mr_id
          : allSHF[i].assignment_no,
        allSHF[i].site_id,
        allSHF[i].site_name,
        allSHF[i].site_location.latitude,
        allSHF[i].site_location.longitude,
        allSHF[i].site_region,
        allSHF[i].distance,
        allSHF[i].amount_paid,
        allSHF[i].receiver_name,
        allSHF[i].receiver_email,
        allSHF[i].receiver_note,
        allSHF[i].receiver_phone_number,
        allSHF[i].created_by,
        allSHF[i].created_on,
      ]);
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "MR Warehouse List.xlsx");
  }

  onChangeDebounced(e) {
    this.getPSDisList();
    // this.getAllPSDis();
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
                  MR Warehouse Need Assign List
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
                          <DropdownItem header>MR WH File</DropdownItem>
                          <DropdownItem onClick={this.downloadPSDisList}>
                            {" "}
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            Download MR Warehouse List
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
                      <th rowSpan="2">Action</th>
                      <th>MR WH ID</th>
                      <th>Type</th>
                      <th>Project Name</th>
                      <th>Origin WH</th>
                      <th>Destination WH</th>
                      <th>Current Status</th>
                      <th>Created By</th>
                      <th>Created On</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.mr_dis_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.mr_dis_list.map((list, i) => (
                      <tr key={list._id}>
                        <td>
                          <Link to={"/toWH/mr-wh-na-detail/" + list._id}>
                            <Button size="sm" outline color="info">
                              Assign
                            </Button>
                          </Link>
                        </td>
                        <td>
                          <Link to={"/mr-detail/" + list._id}>
                            {list.mr_id}
                          </Link>
                        </td>
                        <td>{list.mr_delivery_type}</td>
                        <td>{list.project_name}</td>
                        <td>{list.origin.value}</td>
                        <td>{list.destination.value}</td>
                        <td>{list.current_mr_status}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(MRWHNAList);
