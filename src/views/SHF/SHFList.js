import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';
import {convertDateFormatfull, convertDateFormat} from '../../helper/basicFunction';
import { getDatafromAPINODEFile } from "../../helper/asyncFunction";

import Loading from '../components/Loading'


const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const array_field = ["shf_no", "related_to", "related_no", "site_id", "site_name", "site_location.latitude", "site_location.longitude", "site_region", "distance", "amount_paid", "receiver_name", "receiver_email", "receiver_note",  "creator.email", "created_on"]

class SHFList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      vendor_name : this.props.dataLogin.vendor_name,
      vendor_code : this.props.dataLogin.vendor_code,
      shf_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: {},
      ps_dis_all: [],
      modal_loading: false,
      dropdownOpen: new Array(1).fill(false),
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadSHFList = this.downloadSHFList.bind(this);
    this.getSHFList = this.getSHFList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.downloafSHFFile = this.downloafSHFFile.bind(this);
    // this.getAllSHF = this.getAllSHF.bind(this);
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: username,
          password: password
        }
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
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
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
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== null && this.state.filter_list[array_field[i]] !== undefined){
        if(array_field[i] === 'related_no'){
          filter_array.push('"$or" : [{"mr_id":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}}, {"assignment_no":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}}]')
        }else if(array_field[i] === 'amount_paid'){
          filter_array.push('"amount_paid":{"$regex" : ' + this.state.filter_list[array_field[i]] + '}');
        }else{
          filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
        }
      }
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = '{' + filter_array.join(',') + '}';
    this.getDataFromAPINODE('/siteHandlingFee?srt=_id:-1&q=' + whereAnd + '&lmt=' + maxPage + '&pg=' + page).then(res => {
      console.log("SHF List Sorted", res);
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ shf_list: items, totalData: totalData });
      }
    })
  }

  async getAllSHF() {
    let shfList = [];
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== null && this.state.filter_list[array_field[i]] !== undefined){
        if(array_field[i] === 'related_no'){
          filter_array.push('"$or" : [{"mr_id":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}}, {"assignment_no":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}}]')
        }else if(array_field[i] === 'amount_paid'){
          filter_array.push('"amount_paid":{"$regex" : ' + this.state.filter_list[array_field[i]] + '}');
        }else{
          filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
        }
      }
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = '{' + filter_array.join(',') + '}';
    let res = await this.getDataFromAPINODE('/siteHandlingFee?srt=_id:-1&noPg=1&q=' + whereAnd)
    if (res.data !== undefined) {
      const items = res.data.data;
      shfList = res.data.data;
      return shfList;
    }else{
      return [];
    }
  }

  numToSSColumn(num) {
    var s = '', t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t) / 26 | 0;
    }
    return s || undefined;
  }

  componentDidMount() {
    this.props.SidebarMinimizer(true);
    this.getSHFList();
    // this.getAllSHF();
    document.title = 'SHF List | BAM';
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
    })
  }

  async downloadSHFList() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allSHF = await this.getAllSHF();

    let headerRow = ["SHF No.", "Related To", "Related No.", "Tower ID", "Tower Name", "Latitude", "Longitude", "Region", "Distance", "Amount Paid", "Receiver Name", "Receiver Email", "Note", "Receiver Phone", "Created By", "Created On"];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + '1').font = { size: 11, bold: true };
    }

    for (let i = 0; i < allSHF.length; i++) {
      ws.addRow([allSHF[i].shf_no, allSHF[i].related_to, allSHF[i].related_to === "MR" ? allSHF[i].mr_id : allSHF[i].assignment_no, allSHF[i].site_id, allSHF[i].site_name, allSHF[i].site_location.latitude, allSHF[i].site_location.longitude, allSHF[i].site_region, allSHF[i].distance, allSHF[i].amount_paid, allSHF[i].receiver_name, allSHF[i].receiver_email, allSHF[i].receiver_note, allSHF[i].receiver_phone_number, allSHF[i].created_by, allSHF[i].created_on])
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'SHF List.xlsx');
  }

  async downloafSHFFile(e){
    const id = e.currentTarget.value;
    const idFile = e.currentTarget.name;
    const data_shf = this.state.shf_list.find(e => e._id === id);
    if(data_shf !== undefined && data_shf.shf_images !== undefined && data_shf.shf_images !== null && data_shf.shf_images.length !== 0)  {
      const data_shf_file = data_shf.shf_images.find(si => si._id === idFile);
      const resFile = await getDatafromAPINODEFile('/siteHandlingFee/downloadShfDoc/'+id+'/file/' + idFile, this.props.dataLogin.token, data_shf_file.mime_type);
      if(resFile !== undefined){
        saveAs(new Blob([resFile.data], {type:data_shf_file.mime_type}), data_shf_file.file_name);
      }
    }

  }

  onChangeDebounced(e) {
    this.getSHFList();
    // this.getAllSHF();
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

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const downloadMR = {
      float: 'right',
      marginRight: '10px'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: '2' }}>
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> SHF List
                </span>
                {((this.state.userRole.findIndex(e => e === "BAM-ASP") === -1 && this.state.userRole.findIndex(e => e === "BAM-ASP Management") === -1 && this.state.userRole.findIndex(e => e === "BAM-Mover") === -1)) && (
                  <React.Fragment>
                  <Dropdown size="sm" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{ float: 'right', marginRight : '10px' }}>
                    <DropdownToggle caret color="secondary">
                      <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>File
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>MR File</DropdownItem>
                      <DropdownItem onClick={this.downloadSHFList}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Download SHF List</DropdownItem>
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
                      <th>Related to</th>
                      <th>Related No.</th>
                      <th>Tower ID</th>
                      <th>Tower Name</th>
                      <th>Lat</th>
                      <th>Long</th>
                      <th>Region</th>
                      <th>Distance</th>
                      <th>Amount Paid</th>
                      <th>Receiver</th>
                      <th>Receiver Email</th>
                      <th>Note</th>
                      <th>Created By</th>
                      <th>Created On</th>
                    </tr>
                    <tr>
                      {this.loopSearchBar()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.shf_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.shf_list.map((list, i) =>
                      <React.Fragment>
                      <tr key={list._id} style={{backgroundColor : 'rgba(31, 111, 139, 0.2)'}}>
                        <td>{list.shf_no}</td>
                        <td>{list.related_to}</td>
                        <td>{list.related_to === "MR" ? list.mr_id : list.assignment_no}</td>
                        <td>{list.site_id}</td>
                        <td>{list.site_name}</td>
                        <td>{list.site_location.latitude}</td>
                        <td>{list.site_location.longitude}</td>
                        <td>{list.site_region}</td>
                        <td>{list.distance}</td>
                        <td>{list.amount_paid}</td>
                        <td>{list.receiver_name}</td>
                        <td>{list.receiver_email}</td>
                        <td>{list.receiver_note}</td>
                        <td>{list.creator.map(e => e.email)}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
                      {list.shf_images.map(si =>
                        <tr key={list._id}>
                          <td>
                            <Button size="sm" value={list._id} name={si._id} onClick={this.downloafSHFFile}>
                              <i className="fa fa-download"></i>
                            </Button>
                          </td>
                          <td colSpan="14" style={{textAlign : 'left'}}>{si.file_name}</td>
                        </tr>
                      )}
                      </React.Fragment>
                    )}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }}>
                  <small>Showing {this.state.perPage} entries from {this.state.totalData} data</small>
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
    SidebarMinimize: state.minimizeSidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SidebarMinimizer: (minimize) => dispatch({ type: ActionType.MINIMIZE_SIDEBAR, minimize_sidebar: minimize }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SHFList);
