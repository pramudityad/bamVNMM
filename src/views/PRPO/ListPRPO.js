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
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from "react-redux";
import { getDatafromAPINODE } from "../../helper/asyncFunction";

class ListPRPO extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole: this.props.dataLogin.role,
        userId: this.props.dataLogin._id,
        userName: this.props.dataLogin.userName,
        userEmail: this.props.dataLogin.email,
        tokenUser: this.props.dataLogin.token,
        all_data : [],
        prevPage: 0,
        activePage: 1,
        totalData: 0,
        perPage: 10,
    };
    // bind
  }

  // function

  componentDidMount() {
    this.getPRTList()
    document.title = 'PRT List | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPRTList();
    });
  }

  getPRTList(){
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    getDatafromAPINODE('/prt/getPrt?'+ 'lmt=' + maxPage + '&pg=' + page, this.props.dataLogin.token).then(res => {
        if(res.data !== undefined){
            const items = res.data.data;
            const totalData = res.data.totalResults;
            this.setState({ all_data: items, totalData: totalData });
        }
    })
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < 8; i++) {
      searchBar.push(
        <td>
          <div className="controls" style={{ width: "150px" }}>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              {/* <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[i]} name={i} size="sm" /> */}
              <Input type="text" placeholder="Search" size="sm" />
            </InputGroup>
          </div>
        </td>
      );
    }
    return searchBar;
  };

  downloadAll= async () => {
    let allAssignmentList = this.state.all_data;

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = ["assignment_id", "project", "sow_type", "created_based", "vendor_code", "vendor_name", "payment_terms", "identifier", "ssow_rbs_id_1", "ssow_rbs_activity_number_1", "ssow_rbs_unit_1", "ssow_rbs_quantity_1", "ssow_rbs_id_2", "ssow_rbs_activity_number_2", "ssow_rbs_unit_2", "ssow_rbs_quantity_2", "ssow_rbs_id_3", "ssow_rbs_activity_number_3", "ssow_rbs_unit_3", "ssow_rbs_quantity_3", "ssow_rbs_id_4", "ssow_rbs_activity_number_4", "ssow_rbs_unit_4", "ssow_rbs_quantity_4", "ssow_rbs_id_5", "ssow_rbs_activity_number_5", "ssow_rbs_unit_5", "ssow_rbs_quantity_5", "ssow_trm_id_1", "ssow_trm_activity_number_1", "ssow_trm_unit_1", "ssow_trm_quantity_1", "ssow_trm_id_2", "ssow_trm_activity_number_2", "ssow_trm_unit_2", "ssow_trm_quantity_2", "ssow_trm_id_3", "ssow_trm_activity_number_3", "ssow_trm_unit_3", "ssow_trm_quantity_3", "ssow_trm_id_4", "ssow_trm_activity_number_4", "ssow_trm_unit_4", "ssow_trm_quantity_4", "ssow_trm_id_5", "ssow_trm_activity_number_5", "ssow_trm_unit_5", "ssow_trm_quantity_5"];
    ws.addRow(headerRow);

    // for (let i = 0; i < allAssignmentList.length; i++) {
    //   let rowAdded = [allAssignmentList[i].Assignment_No, allAssignmentList[i].Project, allAssignmentList[i].SOW_Type, "tower_id", allAssignmentList[i].Vendor_Code_Number, allAssignmentList[i].Vendor_Name, allAssignmentList[i].Payment_Terms, allAssignmentList[i].Site_ID];
    //   let rbs_ssow = allAssignmentList[i].SSOW_List.filter(item => item.sow_type === "RBS");
    //   for (let j = 0; j < rbs_ssow.length; j++) {
    //     rowAdded.push(rbs_ssow[j].ssow_id, rbs_ssow[j].ssow_activity_number, rbs_ssow[j].ssow_unit, rbs_ssow[j].ssow_qty);
    //   }
    //   for (let k = 0; k < 5 - rbs_ssow.length; k++) {
    //     rowAdded.push("", "", "", "");
    //   }
    //   let trm_ssow = allAssignmentList[i].SSOW_List.filter(item => item.sow_type === "TRM");
    //   for (let j = 0; j < trm_ssow.length; j++) {
    //     rowAdded.push(trm_ssow[j].ssow_id, trm_ssow[j].ssow_activity_number, trm_ssow[j].ssow_unit, trm_ssow[j].ssow_qty);
    //   }
    //   ws.addRow(rowAdded);
    // }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'PRT List.xlsx');
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const downloadAssignment = {
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
                  PRT List
                </span>
                <Link to={"/prt-creation"}>
                  <Button color="success" style={{ float: "right" }} size="sm">
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create PRT
                  </Button>
                </Link>
                {/* <Link to={"/bulk-assignment-creation"}>
                  <Button
                    color="success"
                    style={{ float: "right", marginRight: "8px" }}
                    size="sm"
                  >
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create PRT Bulk
                  </Button>
                </Link> */}
                <Button
                  style={downloadAssignment}
                  outline
                  color="success"
                  size="sm"
                  onClick={this.downloadAll}
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download PRT List
                </Button>
                {/* <Button style={downloadAssignment} outline color="success" onClick={this.downloadAllAssignment} size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download PRT List</Button> */}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>PRT ID</th>
                      <th>Site Id</th>
                      <th>Site Name</th>
                      <th>Quotation number</th>
                      <th>SIGNUM PM</th>
                      <th>Approval By</th>
                      <th>Project Name</th>
                      <th>Area</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.all_data.length === 0 && (
                          <tr>
                            <td colSpan="10">No Data Available</td>
                          </tr>
                        )}
                        {this.state.all_data.map((list, i) =>
                          <tr key={i}>
                            <td>
                              <Link to={'/prt-detail/' + list._id}>
                                <Button style={{ width: "90px" }} outline color="info" size="sm">Detail</Button>
                              </Link>
                            </td>
                            <td>{list.prt_id}</td>
                            <td>{list.site_id}</td>
                            <td>{list.site_name}</td>
                            <td>{list.quotation_number}</td>
                            <td>{list.signum_pm}</td>
                            <td>{list.approval_by}</td>
                            <td>{list.project_name}</td>
                            <td>{list.area}</td>
                          </tr>
                        )}
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

export default connect(mapStateToProps)(ListPRPO);
