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

const arrayFilter = ["no_sid", "cust_del.cd_id", "site_info.site_id", "site_info.site_name", "created_by", "created_on"];

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
      type_uploader_selected : "SID",
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadAllSIDFile = this.downloadAllSIDFile.bind(this);
    this.handleChangeTypeUploader = this.handleChangeTypeUploader.bind(this);
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
    for(let i = 0; i < arrayFilter.length; i++){
      this.state.filter_list[arrayFilter[i]] !== null &&
        this.state.filter_list[arrayFilter[i]] !== undefined &&
        filter_array.push(
          '"'+arrayFilter[i]+'":{"$regex" : "' +
            this.state.filter_list[arrayFilter[i]] +
            '", "$options" : "i"}'
        );
    }
    filter_array.push('"type" : "'+this.state.type_uploader_selected+'"');
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
    const i = e.target.name;
    const id = e.currentTarget.value;
    const data_prt = this.state.all_data.find(ad => ad._id === id);
    if(data_prt !== undefined)  {
      const resFile = await getDatafromAPINODEFile('/sidFile/getDocument/' + id, this.props.dataLogin.token, data_prt.file_document.mime_type);
      if(resFile !== undefined){
        saveAs(new Blob([resFile.data], {type:data_prt.file_document.mime_type}), data_prt.file_document.file_name);
      }
    }
  }

  async downloadAllSIDFile() {
    let allSIDList = [];
    let filter_array = [];
    // if(this.state.type_uploader_selected !== "SID"){
    //   filter_array.push('"type" : "'+this.state.type_uploader_selected+'"');
    // }else{
    //   filter_array.push('"type" : {"$ne" : "ABD"}');
    // }
    filter_array.push('"type" : "'+this.state.type_uploader_selected+'"');
    let whereAnd = "{" + filter_array.join(",") + "}";
    let getSID = await getDatafromAPINODE(
      "/sidFile?srt=_id:-1&noPg=1&q="+whereAnd, this.props.dataLogin.token
    );
    if (getSID.data !== undefined) {
      allSIDList = getSID.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = ["no_sid", "cd_id", "site_id", "site_name", "project", "created_by", "created_on", "file_name"];
    ws.addRow(headerRow);

    for (let i = 0; i < allSIDList.length; i++) {
      let rowAdded = [allSIDList[i].no_sid, allSIDList[i].cust_del.map((e) => e.cd_id).toString(), allSIDList[i].site_info !== undefined && allSIDList[i].site_info!== null && allSIDList[i].site_info.map((e) => e.site_id).join(", "), allSIDList[i].site_info !== undefined && allSIDList[i].site_info!== null && allSIDList[i].site_info.map((e) => e.site_name).join(", "), allSIDList[i].cust_del.map((e) => e.project_name).toString(), allSIDList.created_by,
      allSIDList[i].created_on.slice(0,10), allSIDList[i].file_document.file_name];
      ws.addRow(rowAdded);
    }
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), this.state.type_uploader_selected+' REPORT.xlsx');
  }

  handleChangeTypeUploader(e){
    this.setState({type_uploader_selected : e.target.value}, () => {
      this.getPRTList();
    });
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
                  {this.state.type_uploader_selected} List
                </span>
                <Link to={"/SID-list/uploader"}>
                  <Button color="success" style={{ float: "right" }} size="sm">
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create Uploader
                  </Button>
                </Link>
                <Button
                  style={{ float : 'right', marginRight: "8px" }}
                  outline
                  color="success"
                  size="sm"
                  onClick={this.downloadAllSIDFile}
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download {this.state.type_uploader_selected} List
                </Button>
              </CardHeader>
              <CardBody>
                <Row style={{marginBottom : '20px'}}>
                <Col md="1">
                  <span>Type : </span>
                </Col>
                <Col md="2">
                  <Input type="select" onChange={this.handleChangeTypeUploader} value={this.state.type_uploader_selected}>
                    <option value="SID">
                      SID
                    </option>
                    <option value="ABD">
                      ABD
                    </option>
                    <option value="PQR">
                      PQR
                    </option>
                  </Input>
                </Col>
                </Row>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Attachment
                      </th>
                      <th>{this.state.type_uploader_selected} ID</th>
                      <th>CD ID</th>
                      <th>Site ID</th>
                      <th>Site Name</th>
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
                          <br />
                          <span>{list.file_document.file_name}</span>
                        </td>
                        <td>{list.no_sid}</td>
                        <td>{list.cust_del.map((e) => e.cd_id)}</td>
                        <td>{list.site_info !== undefined && list.site_info!== null && list.site_info.map((e) => e.site_id).join(", ")}</td>
                        <td>{list.site_info !== undefined && list.site_info!== null && list.site_info.map((e) => e.site_name).join(", ")}</td>
                        <td>{list.created_by}</td>
                        <td>{list.created_on.slice(0,10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }} className="pagination">
                  <small>Showing {this.state.all_data.length} entries from {this.state.totalData} data</small>
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
