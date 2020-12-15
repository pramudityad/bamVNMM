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
import {convertDateFormatfull, convertDateFormat} from '../../helper/basicFunction'

import Loading from '../components/Loading'


const API_URL = 'https://api.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2.bam-id.e-dpm.com/bamidapi';

const array_field = ["no_plantspec_srn", "plantspec_srn_category", "project_name", "site_info.site_id", "site_info.site_name", "current_status", "mra_id", "site_info.region",  "created_on"]

class PSDisList extends Component {
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
      ps_dis_list: [],
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
    this.downloadPSDisList = this.downloadPSDisList.bind(this);
    this.downloadPSDisListFM = this.downloadPSDisListFM.bind(this);
    this.getPSDisList = this.getPSDisList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.getAllPSDis = this.getAllPSDis.bind(this);
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

  getPSDisList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = '{' + filter_array.join(',') + '}';
    this.getDataFromAPINODE('/plantspec-srn?srt=_id:-1&q=' + whereAnd + '&lmt=' + maxPage + '&pg=' + page).then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ ps_dis_list: items, totalData: totalData });
      }
    })
  }

  async getAllPSDis() {
    let PSDisList = [];
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = '{' + filter_array.join(',') + '}';
    let res = await this.getDataFromAPINODE('/plantspec-srn?srt=_id:-1&noPg=1&q=' + whereAnd)
    if (res.data !== undefined) {
      const items = res.data.data;
      PSDisList = res.data.data;
      return PSDisList;
    }else{
      return [];
    }
  }

  async getAllPSDisFM() {
    let PSDisList = [];
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    filter_array.push('"mra_id" : null')
    filter_array.push('"current_status" : "PS SRN SUBMITTED"')
    let whereAnd = '{' + filter_array.join(',') + '}';
    let res = await this.getDataFromAPINODE('/plantspec-srn?srt=_id:-1&noPg=1&q=' + whereAnd)
    if (res.data !== undefined) {
      const items = res.data.data;
      PSDisList = res.data.data;
      return PSDisList;
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
    this.getPSDisList();
    // this.getAllPSDis();
    document.title = 'PS SRN List | BAM';
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
    })
  }

  async downloadPSDisList() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allPSA = await this.getAllPSDis();

    let headerRow = ["PS SRN ID", "Category", "Project name", "Origin Tower ID", "Origin Tower Name", "Region", "Status", "Created On"];
    ws.addRow(headerRow);

    for (let i = 0; i < allPSA.length; i++) {
      ws.addRow([allPSA[i].no_plantspec_srn, allPSA[i].plantspec_srn_category, allPSA[i].project_name, allPSA[i].site_info.map(si => si.site_id).join(", "), allPSA[i].site_info.map(si => si.site_name).join(", "), allPSA[i].site_info.map(si => si.region).join(", "), allPSA[i].current_status, new Date(allPSA[i].created_on)])
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'PS SRN List.xlsx');
  }

  async downloadPSDisListFM() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allPSA = await this.getAllPSDisFM();

    let headerRow = ["ID BAM PSA", "PS SRN ID", "Category", "Project name", "Origin Tower ID", "Origin Tower Name", "Region", "Status", "Created On"];
    ws.addRow(headerRow);

    for (let i = 0; i < allPSA.length; i++) {
      ws.addRow([allPSA[i]._id, allPSA[i].no_plantspec_srn, allPSA[i].plantspec_srn_category, allPSA[i].project_name, allPSA[i].site_info.map(si => si.site_id).join(", "), allPSA[i].site_info.map(si => si.site_name).join(", "), allPSA[i].site_info.map(si => si.region).join(", "), allPSA[i].current_status, new Date(allPSA[i].created_on)])
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'PS SRN For Migration List.xlsx');
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
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> PS SRN List
                </span>
                {((this.state.userRole.findIndex(e => e === "BAM-ASP") === -1 && this.state.userRole.findIndex(e => e === "BAM-ASP Management") === -1 && this.state.userRole.findIndex(e => e === "BAM-Mover") === -1)) && (
                  <React.Fragment>
                  <Dropdown size="sm" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{ float: 'right', marginRight : '10px' }}>
                    <DropdownToggle caret color="secondary">
                      <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>File
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>MR File</DropdownItem>
                      <DropdownItem onClick={this.downloadPSDisList}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Download PS SRN List</DropdownItem>
                      <DropdownItem onClick={this.downloadPSDisListFM}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Download PS SRN List For Migration</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </React.Fragment>
                )}
                <Link to={'/srn/ps-srn-creation'}><Button color="success" style={{ float: 'right', marginRight: "8px" }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create PS SRN </Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>PS SRN ID</th>
                      <th>Category</th>
                      <th>Project Name</th>
                      <th>Tower ID</th>
                      <th>Tower Name</th>
                      <th>Status</th>
                      <th>MRA Related</th>
                      <th>Region</th>
                      <th>Created On</th>
                    </tr>
                    <tr>
                      {this.loopSearchBar()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.ps_dis_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.ps_dis_list.map((list, i) =>
                      <tr key={list._id}>
                        <td><Link to={'/srn/ps-srn-detail/'+list._id}>{list.no_plantspec_srn}</Link></td>
                        <td>{list.plantspec_srn_category}</td>
                        <td>{list.project_name}</td>
                        <td>{list.site_info.map(si => si.site_id).join(", ")}</td>
                        <td>{list.site_info.map(si => si.site_name).join(", ")}</td>
                        <td>{list.current_status}</td>
                        <td>{list.mra_id}</td>
                        <td>{list.site_info.map(si => si.region).join(", ")}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(PSDisList);
