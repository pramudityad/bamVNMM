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
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";

const API_URL_tsel = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const username_tsel = "adminbamidsuper";
const password_tsel = "F760qbAg2sml";

const API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

class AssignmentListReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      assignment_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: new Array(8).fill(""),
      filter_date:{
        filter_list_date: null,
        filter_list_date2: null
      },
      asg_all: [],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getAssignmentList = this.getAssignmentList.bind(this);
    this.downloadASGList = this.downloadASGList.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.handleFilterDate = this.handleFilterDate.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    // this.getAssignmentList = this.getAssignmentList.bind(this);
    this.getAllAssignment = this.getAllAssignment.bind(this);
    this.downloadAllAssignment = this.downloadAllAssignment.bind(this);
    this.downloadAllAssignmentAcceptenceMigration = this.downloadAllAssignmentAcceptenceMigration.bind(
      this
    );
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

  async getDataFromAPI(url) {
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

  getAssignmentList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    let date =  this.state.filter_date.filter_list_date && this.state.filter_date.filter_list_date2 === null ? '{}' : '{"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 23:59:59"}}';
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"Assignment_No":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"Account_Name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"Project":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"Vendor_Name":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[4] !== "" &&
      filter_array.push(
        '"Payment_Terms":{"$regex" : "' +
          this.state.filter_list[4] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"Current_Status":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"Work_Status":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );
      let whereAnd = "{" + filter_array.join(",") + "}";
      this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&q="+ date + "&" +
        whereAnd +
        "&lmt=" +
        maxPage +
        "&pg=" +
        page
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ assignment_list: items, totalData: totalData });
      }
    });
  }

  getAllAssignment() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    // let date = this.state.filter_list_date && this.state.filter_list_date2 === null ? '{}' : '{"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 00:00:00"}}';
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"Assignment_No":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"Account_Name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"Project":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"Vendor_Name":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[4] !== "" &&
      filter_array.push(
        '"Payment_Terms":{"$regex" : "' +
          this.state.filter_list[4] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"Current_Status":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"Work_Status":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&noPg=1&q=" + whereAnd
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ asg_all: items });
        console.log("asg list", this.state.asg_all);
      }
    });
  }

  componentDidMount() {
    console.log('1 ',this.state.filter_date.filter_list_date)
    console.log('2 ',this.state.filter_date.filter_list_date2)
    this.getAssignmentList();
    // this.getAllAssignment();
    document.title = "Assignment List | BAM";
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getAssignmentList();
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

  handleFilterDate(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      (prevState) => ({
        filter_date: {
          ...prevState.filter_date,
          [name]: value,
        },
      }),
      () => this.onChangeDebounced(e)
      // () => console.log(this.state.filter_date)
    );
  }


  onChangeDebounced(e) {
    this.getAssignmentList();
    // this.getAllAssignment();
  }

  async downloadASGList() {
    let listASGAll = [];
    let getASG = await this.getDataFromAPI(
      "/asp_assignment_sorted_non_page?srt=_id:-1&"
    );
    if (getASG.data !== undefined) {
      listASGAll = getASG.data._items;
    }
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "Assignment ID",
      "Account Name",
      "Project Name",
      "SOW Type",
      "NW",
      "NW Activity",
      "Terms of Payment",
      "Item Status",
      "Work Status",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < listASGAll.length; i++) {
      let list = listASGAll[i];
      ws.addRow([
        list.Assignment_No,
        list.Account_Name,
        list.Project,
        list.SOW_Type,
        list.NW,
        list.NW_Activity,
        list.Payment_Terms,
        list.Item_Status,
        list.Work_Status,
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Assignment List.xlsx");
  }

  async downloadAllAssignment() {
    let allAssignmentList = [];
    let getASG = await this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&noPg=1"
    );
    if (getASG.data !== undefined) {
      allAssignmentList = getASG.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "assignment_id",
      "project",
      "sow_type",
      "created_based",
      "vendor_code",
      "vendor_name",
      "payment_terms",
      "identifier",
      "ssow_rbs_id_1",
      "ssow_rbs_activity_number_1",
      "ssow_rbs_unit_1",
      "ssow_rbs_quantity_1",
      "ssow_rbs_id_2",
      "ssow_rbs_activity_number_2",
      "ssow_rbs_unit_2",
      "ssow_rbs_quantity_2",
      "ssow_rbs_id_3",
      "ssow_rbs_activity_number_3",
      "ssow_rbs_unit_3",
      "ssow_rbs_quantity_3",
      "ssow_rbs_id_4",
      "ssow_rbs_activity_number_4",
      "ssow_rbs_unit_4",
      "ssow_rbs_quantity_4",
      "ssow_rbs_id_5",
      "ssow_rbs_activity_number_5",
      "ssow_rbs_unit_5",
      "ssow_rbs_quantity_5",
      "ssow_trm_id_1",
      "ssow_trm_activity_number_1",
      "ssow_trm_unit_1",
      "ssow_trm_quantity_1",
      "ssow_trm_id_2",
      "ssow_trm_activity_number_2",
      "ssow_trm_unit_2",
      "ssow_trm_quantity_2",
      "ssow_trm_id_3",
      "ssow_trm_activity_number_3",
      "ssow_trm_unit_3",
      "ssow_trm_quantity_3",
      "ssow_trm_id_4",
      "ssow_trm_activity_number_4",
      "ssow_trm_unit_4",
      "ssow_trm_quantity_4",
      "ssow_trm_id_5",
      "ssow_trm_activity_number_5",
      "ssow_trm_unit_5",
      "ssow_trm_quantity_5",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < allAssignmentList.length; i++) {
      let rowAdded = [
        allAssignmentList[i].Assignment_No,
        allAssignmentList[i].Project,
        allAssignmentList[i].SOW_Type,
        "tower_id",
        allAssignmentList[i].Vendor_Code_Number,
        allAssignmentList[i].Vendor_Name,
        allAssignmentList[i].Payment_Terms,
        allAssignmentList[i].Site_ID,
      ];
      let rbs_ssow = allAssignmentList[i].SSOW_List.filter(
        (item) => item.sow_type === "RBS"
      );
      for (let j = 0; j < rbs_ssow.length; j++) {
        rowAdded.push(
          rbs_ssow[j].ssow_id,
          rbs_ssow[j].ssow_activity_number,
          rbs_ssow[j].ssow_unit,
          rbs_ssow[j].ssow_qty
        );
      }
      for (let k = 0; k < 5 - rbs_ssow.length; k++) {
        rowAdded.push("", "", "", "");
      }
      let trm_ssow = allAssignmentList[i].SSOW_List.filter(
        (item) => item.sow_type === "TRM"
      );
      for (let j = 0; j < trm_ssow.length; j++) {
        rowAdded.push(
          trm_ssow[j].ssow_id,
          trm_ssow[j].ssow_activity_number,
          trm_ssow[j].ssow_unit,
          trm_ssow[j].ssow_qty
        );
      }
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Assignment List.xlsx");
  }

  async downloadAllAssignmentAcceptenceMigration() {
    let allAssignmentList = [];
    let getASG = await this.getDataFromAPINODE(
      '/aspAssignment/aspassign?srt=_id:-1&noPg=1&v={"Assignment_No" : 1, "SH_Assignment_No" : 1}'
    );
    if (getASG.data !== undefined) {
      allAssignmentList = getASG.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "bam_assignment_id",
      "sh_assignment_no",
      "notify_to_asp_date",
      "notify_to_asp_by",
      "asp_acceptance_date",
      "asp_acceptance_by",
      "asp_need_revise_date",
      "asp_need_revise_by",
      "assignment_cancel_date",
      "assignment_cancel_by",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < allAssignmentList.length; i++) {
      // let rowAdded = [allAssignmentList[i].Assignment_No, allAssignmentList[i].SH_Assignment_No, allAssignmentList[i].cust_del !== undefined ? allAssignmentList[i].cust_del.map(e => e.cd_id).join(', ') : null];
      let rowAdded = [
        allAssignmentList[i].Assignment_No,
        allAssignmentList[i].SH_Assignment_No,
      ];
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Assignment List For Acceptence Migration SH.xlsx"
    );
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < 7; i++) {
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
    const downloadAssignment = {
      float: "right",
      marginRight: "10px",
    };

    const tableWidth = {
      width: "150px",
    };

    // yang belom bisa :
    // 1. Technical BOQ Vertical format uploader
    // 2. SAP Desc effect to Config
    // 3. TSSR BOQ Horizontal

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
                  Assignment List
                </span>
                <Button
                  style={downloadAssignment}
                  outline
                  color="success"
                  onClick={this.downloadAllAssignment}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download Assignment List Report
                </Button>
              </CardHeader>
              <CardBody>
                <Label><b>Filter Date</b></Label>
                <Row>
                  <div className="controls" style={{ width: "150px", marginLeft: "10px" }}>
                    <div>Start Date</div>
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="date"
                        placeholder="Search"
                        name={"filter_list_date"}
                        onChange={this.handleFilterDate}
                        value={this.state.filter_list_date}
                        size="sm"
                      />
                    </InputGroup>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="controls" style={{ width: "150px" }}>
                    <div>End Date</div>
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="date"
                        placeholder="Search"
                        name={"filter_list_date2"}
                        onChange={this.handleFilterDate}
                        value={this.state.filter_list_date2}
                        size="sm"
                      />
                    </InputGroup>
                  </div>
                </Row>
                &nbsp;&nbsp;&nbsp;
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>Assignment ID</th>
                      <th>Account Name</th>
                      <th>Project Name</th>
                      <th>Vendor Name Type</th>
                      <th>Terms of Payment</th>
                      <th>Assignment Status</th>
                      <th>Work Status</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.assignment_list.length === 0 && (
                      <tr>
                        <td colSpan="10">Select Date First</td>
                      </tr>
                    )}
                    {this.state.assignment_list.map((list, i) => (
                      <tr key={list._id}>
                        <td>
                          <Link to={"/assignment-detail/" + list._id}>
                            <Button
                              style={{ width: "90px" }}
                              outline
                              color="info"
                              size="sm"
                            >
                              Detail
                            </Button>
                          </Link>
                        </td>
                        <td>{list.Assignment_No}</td>
                        <td>{list.Account_Name}</td>
                        <td>{list.Project}</td>
                        <td>{list.Vendor_Name}</td>
                        <td>{list.Payment_Terms}</td>
                        <td>{list.Current_Status}</td>
                        <td>{list.Work_Status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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

export default connect(mapStateToProps)(AssignmentListReport);
