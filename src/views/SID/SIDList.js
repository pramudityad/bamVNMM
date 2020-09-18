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
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import { getDatafromAPINODE, getDatafromAPINODEFile } from "../../helper/asyncFunction";
import Loading from '../components/Loading'

const arrayFilter = ["no_SID", "cust_del.cd_id", "created_by", "created_on"];

class SIDList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      all_data: [],
      filter_list: {},
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      modal_loading: false,
    };
    // bind
  }

  // function

  componentDidMount() {
    this.getPRTList();
    document.title = "SID List | BAM";
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPRTList();
    });
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  getPRTList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    this.state.filter_list["no_SID"] !== null &&
      this.state.filter_list["no_SID"] !== undefined &&
      filter_array.push(
        '"no_SID":{"$regex" : "' +
          this.state.filter_list["no_SID"] +
          '", "$options" : "i"}'
      );
    this.state.filter_list["cust_del.cd_id"] !== null &&
      this.state.filter_list["cust_del.cd_id"] !== undefined &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list["cust_del.cd_id"] +
          '", "$options" : "i"}'
      );
    this.state.filter_list["created_by"] !== null &&
      this.state.filter_list["created_by"] !== undefined &&
      filter_array.push(
        '"created_by":{"$regex" : "' +
          this.state.filter_list["created_by"] +
          '", "$options" : "i"}'
      );
    this.state.filter_list["created_on"] !== null &&
      this.state.filter_list["created_on"] !== undefined &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list["created_on"] +
          '", "$options" : "i"}'
      );
    let whereAnd = "{" + filter_array.join(",") + "}";
    getDatafromAPINODE(
      "/sidFile?srt=_id:-1&q=" +
        whereAnd +
        "&lmt=" +
        maxPage +
        "&pg=" +
        page,
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ all_data: items, totalData: totalData }, () =>
          console.log(this.state.all_data)
        );
      }
    });
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < arrayFilter.length; i++) {
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
                value={this.state.filter_list[arrayFilter[i]]}
                name={arrayFilter[i]}
                size="sm"
              />
              {/* <Input type="text" placeholder="Search" size="sm" /> */}
            </InputGroup>
          </div>
        </td>
      );
    }
    return searchBar;
  };

  handleFilterList = (e) => {
    const index = e.target.name;
    let value = e.target.value;
    if (value.length === 0) {
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[index] = value;
    this.setState({ filter_list: dataFilter, activePage: 1 }, () => {
      this.onChangeDebounced(e);
    });
  };

  onChangeDebounced = (e) => {
    this.getPRTList();
    // this.getAllMR();
  };

  getSIDFile = async (e) => {
    e.preventDefault()
    e.persist();
    const i = e.target.name  
    const id = e.target.value
    console.log(i, id)
    const data_prt = this.state.all_data;  
    console.log(data_prt[i])
    if(data_prt[i] !== undefined)  {
      const resFile = await getDatafromAPINODEFile('/sidFile/getDocument/' + id, this.props.dataLogin.token, data_prt[i].file_document.mime_type);
      if(resFile !== undefined){
        saveAs(new Blob([resFile.data], {type:data_prt[i].file_document.mime_type}), data_prt[i].file_document.system_name);
      }
    }
  }

  downloadAll = async () => {
    let allAssignmentList = this.state.all_data;

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
    saveAs(new Blob([allocexport]), "SID List.xlsx");
  };

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
                  SID List
                </span>
                <Link to={"/SID-list/uploader"}>
                  <Button color="success" style={{ float: "right" }} size="sm">
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create SID
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
                  Download SID List
                </Button>
                {/* <Button style={downloadAssignment} outline color="success" onClick={this.downloadAllAssignment} size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download SID List</Button> */}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Attachment
                      </th>
                      <th>SID ID</th>
                      <th>CD ID</th>
                      <th>Created By</th>
                      <th>Created On</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.all_data.length === 0 && (
                      <tr>
                        <td colSpan="10">No Data Available</td>
                      </tr>
                    )}
                    {this.state.all_data.map((list, i) => (
                      <tr key={i}>
                        <td>
                          <Button size="sm" value={list._id} name={i} onClick={this.getSIDFile}>
                            <i className="fa fa-download"></i>
                          </Button>
                        </td>
                        <td>{list.no_sid}</td>
                        <td>{list.cust_del.map((e) => e.cd_id)}</td>
                        <td>{list.created_by}</td>
                        <td>{list.created_on}</td>
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

                {/* Modal Loading */}
                <Loading isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}>
        </Loading>
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

export default connect(mapStateToProps)(SIDList);
