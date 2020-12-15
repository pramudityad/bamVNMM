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
import { getDatafromAPINODE, postDatatoAPINODE } from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const arrayFilter = ["cust_del.cd_id", "no_pod", "site_info.site_id", "site_info.site_name", "status", "status_erisite", "created_by", "created_on"];

const tokenErisite = "WU5IOFV5eUFZT0NaWU4yMXJkcUpKZ2V0UkhzYTpoUDgxZUkyRjRfTjZOOXlNZXJEWG5RTUJvZFlh";
const urlErisiteLogin = "https://api-nonprod.erisite.ericsson.net/token";

const urlErisiteStatus = "https://api-nonprod.erisite.ericsson.net/sb-erisite/1.0.0/api/activities/fullstructure?SystemRecordID="

class ListFMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      action_status : null,
      action_message : null,
      all_data: [],
      filter_list : {},
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    // bind
  }

  // function

  componentDidMount() {
    this.getPRTList();
    document.title = "POD List | BAM";
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPRTList();
    });
  }

  getPRTList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    (this.state.filter_list["no_pod"] !== null && this.state.filter_list["no_pod"] !== undefined) && (filter_array.push('"no_pod":{"$regex" : "' + this.state.filter_list["no_pod"] + '", "$options" : "i"}'));
    (this.state.filter_list["cust_del.cd_id"] !== null && this.state.filter_list["cust_del.cd_id"] !== undefined) && (filter_array.push('"cust_del.cd_id":{"$regex" : "' + this.state.filter_list["cust_del.cd_id"] + '", "$options" : "i"}'));
    (this.state.filter_list["site_info.site_id"] !== null && this.state.filter_list["site_info.site_id"] !== undefined) && (filter_array.push('"site_info.site_id":{"$regex" : "' + this.state.filter_list["site_info.site_id"] + '", "$options" : "i"}'));
    (this.state.filter_list["site_info.site_name"] !== null && this.state.filter_list["site_info.site_name"] !== undefined) && (filter_array.push('"site_info.site_name":{"$regex" : "' + this.state.filter_list["site_info.site_name"] + '", "$options" : "i"}'));
    (this.state.filter_list["created_by"] !== null && this.state.filter_list["created_by"] !== undefined) && (filter_array.push('"created_by":{"$regex" : "' + this.state.filter_list["created_by"] + '", "$options" : "i"}'));
    (this.state.filter_list["created_on"] !== null && this.state.filter_list["created_on"] !== undefined) && (filter_array.push('"created_on":{"$regex" : "' + this.state.filter_list["created_on"] + '", "$options" : "i"}'));
    let whereAnd = '{' + filter_array.join(',') + '}';
    getDatafromAPINODE(
      "/erisitePodFile?srt=_id:-1&q=" + whereAnd + '&lmt=' + maxPage + '&pg=' + page,
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ all_data: items, totalData: totalData }, () => console.log(this.state.all_data));
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
              <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[arrayFilter[i]]} name={arrayFilter[i]} size="sm" />
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
    })
  }

  onChangeDebounced = (e) => {
    this.getPRTList();
    // this.getAllMR();
  }

  async getPRTListAll() {
    let dataResult = [];
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    (this.state.filter_list["no_pod"] !== null && this.state.filter_list["no_pod"] !== undefined) && (filter_array.push('"no_pod":{"$regex" : "' + this.state.filter_list["no_pod"] + '", "$options" : "i"}'));
    (this.state.filter_list["cust_del.cd_id"] !== null && this.state.filter_list["cust_del.cd_id"] !== undefined) && (filter_array.push('"cust_del.cd_id":{"$regex" : "' + this.state.filter_list["cust_del.cd_id"] + '", "$options" : "i"}'));
    (this.state.filter_list["site_info.site_id"] !== null && this.state.filter_list["site_info.site_id"] !== undefined) && (filter_array.push('"site_info.site_id":{"$regex" : "' + this.state.filter_list["site_info.site_id"] + '", "$options" : "i"}'));
    (this.state.filter_list["site_info.site_name"] !== null && this.state.filter_list["site_info.site_name"] !== undefined) && (filter_array.push('"site_info.site_name":{"$regex" : "' + this.state.filter_list["site_info.site_name"] + '", "$options" : "i"}'));
    (this.state.filter_list["created_by"] !== null && this.state.filter_list["created_by"] !== undefined) && (filter_array.push('"created_by":{"$regex" : "' + this.state.filter_list["created_by"] + '", "$options" : "i"}'));
    (this.state.filter_list["created_on"] !== null && this.state.filter_list["created_on"] !== undefined) && (filter_array.push('"created_on":{"$regex" : "' + this.state.filter_list["created_on"] + '", "$options" : "i"}'));
    let whereAnd = '{' + filter_array.join(',') + '}';
    const res = await getDatafromAPINODE("/erisitePodFile?noPg=1&srt=_id:-1&q=" + whereAnd + '&lmt=' + maxPage + '&pg=' + page,this.props.dataLogin.token);
    if (res !== undefined && res.data !== undefined) {
      dataResult = res.data.data;
    }
    return dataResult;
  }

  downloadAll = async () => {
    let allAssignmentList = this.state.all_data;

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let dataPOD = await this.getPRTListAll();

    let headerRow = [
      "POD ID", "WP ID", "WP ID ERISITE", "Tower ID", "Tower Name", "STATUS", "PROJECT", "MILESTONE", "POD STATUS", "WP ID SYNC STATUS", "WP ID ERISITE STATUS", "CREATED BY", "CREATED ON"
    ];
    ws.addRow(headerRow);

    for(let i = 0; i < dataPOD.length; i++ ){
      for(let j = 0; j < dataPOD[i].cust_del.length; j++ ){
        ws.addRow([dataPOD[i].no_pod, dataPOD[i].cust_del[j].cd_id, dataPOD[i].cust_del[j].wp_id_erisite, dataPOD[i].site_info !== undefined ? dataPOD[i].site_info.map(e => e.site_id).join(", ") : null,
        dataPOD[i].site_info !== undefined ? dataPOD[i].site_info.map(e => e.site_name).join(", ") : null, dataPOD[i].status, dataPOD[i].project_name, dataPOD[i].ms_target, dataPOD[i].sync_status !== null && dataPOD[i].sync_status !== undefined ? dataPOD[i].sync_status : dataPOD[i].status, dataPOD[i].cust_del[j].sync_status, dataPOD[i].cust_del[j].status_erisite, dataPOD[i].created_by, dataPOD[i].created_on]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "POD List.xlsx");
  };

  syncErisitePOD = async () => {
    this.setState({action_status : null, action_message: null});
    const dataPODList = this.state.all_data;
    let dataPost = dataPODList.filter(dpl =>  dpl.status === "COMPLETE TO SYNC").map(dpl => dpl._id);
    if(dataPost.length === 0){
      this.setState({action_status : 'success', action_message : 'Cannot sync erisite status cause there are no POD already Sync to erisite'});
    }else{
      const post = await postDatatoAPINODE('/erisitePodFile/resyncErisiteStatus', {podId : dataPost} ,this.props.dataLogin.token);
      if(post !== undefined && post.data !== undefined){
        this.setState({action_status : 'success'});
      }else{
        this.setState({action_status : 'failed'})
      }
    }
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
                  ></i>{" "}
                  POD List
                </span>
                <Link to={"/pod-list/uploader"}>
                  <Button color="success" style={{ float: "right" }} size="sm">
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create POD
                  </Button>
                </Link>
                <Button style={{ float: "right",marginRight: "8px" }} size="sm" outline color="primary" size="sm" onClick={this.syncErisitePOD}>
                  <i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Erisite Sync Status
                </Button>
                <Button style={downloadAssignment} outline color="success" size="sm" onClick={this.downloadAll} >
                  <i className="fa fa-download" style={{ marginRight: "8px" }} ></i>
                  Download POD List
                </Button>
                {/* <Button style={downloadAssignment} outline color="success" onClick={this.downloadAllAssignment} size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download POD List</Button> */}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>POD ID</th>
                      <th>Tower ID</th>
                      <th>Tower Name</th>
                      <th>Status</th>
                      <th>Erisite Status</th>
                      <th>Milestone</th>
                      <th>Project</th>
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
                      <React.Fragment>
                      <tr key={i}>
                        <td>
                          <Link to={"/pod-list/detail/" + list._id}>
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
                        <td>{list.no_pod}</td>
                        <td>{list.site_info !== undefined && list.site_info.map(e => e.site_id).join(", ")}</td>
                        <td>{list.site_info !== undefined && list.site_info.map(e => e.site_name).join(", ")}</td>
                        <td>{list.sync_status !== undefined && list.sync_status !== null ? list.sync_status : list.status}</td>
                        <td>{list.status_erisite}</td>
                        <td>{list.ms_target}</td>
                        <td>{list.project_name}</td>
                        <td>{list.created_by}</td>
                        <td>{list.created_on}</td>
                      </tr>
                      {list.cust_del.map((ecd,i) =>
                        <tr style={{backgroundColor: 'rgba(88,153,217,0.3)'}}>
                          {i === 0 && (
                            <td rowSpan={list.cust_del.length}>WP ID</td>
                          )}
                          <td colSpan="3" style={{textAlign : 'left'}}>{ecd.cd_id}</td>
                          <td>{ecd.sync_status}</td>
                          <td>{ecd.status_erisite}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                      </React.Fragment>
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

export default connect(mapStateToProps)(ListFMS);
