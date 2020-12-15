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

const array_field = ["mra_id", "mrd_category", "project_name", "site_info.site_id", "site_info.site_name", "site_info.site_region", "destination.value", "site_info.site_name", "site_info.site_region", "creator.email", "created_on"]

class MRDisNAList extends Component {
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
      mr_dis_list: [],
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
    this.downloadMRNAList = this.downloadMRNAList.bind(this);
    this.getMRAList = this.getMRAList.bind(this);
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

  getMRAList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    filter_array.push('"current_mra_status":"PLANTSPEC SRN NOT ASSIGNED"');
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

  async getAllMRAList() {
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    filter_array.push('"current_mra_status":"PLANTSPEC SRN NOT ASSIGNED"');
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = '{' + filter_array.join(',') + '}';
    const res = await this.getDataFromAPINODE('/matreq-srn?srt=_id:-1&q=' + whereAnd)
    if (res !== undefined && res.data !== undefined) {
      const items = res.data.data;
      return items
    }else{
      return []
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
    this.getMRAList();
    // this.getAllPSDis();
    document.title = 'MRA List | BAM';
  }

  componentWillUnmount() {
    this.props.SidebarMinimizer(false);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getMRAList();
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

  async downloadMRNAList() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = await this.getAllMRAList();

    let headerRow = ["ID BAM MR", "MRA ID", "MRA SH ID", "MRA Type","MRA Category", "Project Name", "CD ID", "Origin ID", "Origin Name",  "Destination ID", "Destination Name", "Current Status", "Current Milestone", "Dismantle By", "Delivery By", "ETA", "MRA SH Created On", "MRA SH Created By","Updated On", "Created On"];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + '1').font = { size: 11, bold: true };
    }

    for (let i = 0; i < allMR.length; i++) {
      const creator_mr_mitt = allMR[i].mra_status.find(e => e.mra_status_name === "PLANTSPEC SRN" && e.mra_status_value === "NOT ASSIGNED");
      const dataPrimary = [allMR[i]._id, allMR[i].mra_id, allMR[i].mra_sh_id, allMR[i].mra_type, allMR[i].mrd_category, allMR[i].project_name, allMR[i].cust_del !== undefined ? allMR[i].cust_del.map(cd => cd.cd_id).join(', ') : allMR[i].cd_id]
      const dataOrigin = [allMR[i].site_info.find(si => si.srn_title === "Origin") !== undefined ? allMR[i].site_info.find(si => si.srn_title === "Origin").site_id : null, allMR[i].site_info.find(si => si.srn_title === "Origin") !== undefined ? allMR[i].site_info.find(si => si.srn_title === "Origin").site_name : null];
      const dataDestination = [allMR[i].mrd_category === "To Warehouse" ? allMR[i].destination.value : allMR[i].site_info.find(si => si.srn_title === "Destination") !== undefined ? allMR[i].site_info.find(si => si.srn_title === "Destination").site_id : null, allMR[i].mrd_category === "To Warehouse" ? null : allMR[i].site_info.find(si => si.srn_title === "Destination") !== undefined ? allMR[i].site_info.find(si => si.srn_title === "Destination").site_name : null];
      const dataCommon = [allMR[i].current_mra_status, allMR[i].current_milestones, allMR[i].asp_company_dismantle, allMR[i].dsp_company, allMR[i].eta !== undefined ? new Date(allMR[i].eta) : null, creator_mr_mitt !== undefined ? new Date(creator_mr_mitt.mra_status_date) : null, creator_mr_mitt !== undefined ? creator_mr_mitt.mra_status_updater : null, new Date(allMR[i].updated_on), new Date(allMR[i].created_on)];
      ws.addRow(dataPrimary.concat(dataOrigin).concat(dataDestination).concat(dataCommon));
      const getRowLast = ws.lastRow._number;
      ws.getCell("M"+getRowLast).numFmt = "YYYY-MM-DD";
      ws.getCell("O"+getRowLast).numFmt = "YYYY-MM-DD";
      ws.getCell("P"+getRowLast).numFmt = "YYYY-MM-DD";
      if(creator_mr_mitt !== undefined && creator_mr_mitt !== null){
        ws.getCell("L"+getRowLast).numFmt = "YYYY-MM-DD";
      }
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'MRA List.xlsx');
  }

  onChangeDebounced(e) {
    this.getMRAList();
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
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> MRA List
                </span>
                {((this.state.userRole.findIndex(e => e === "BAM-ASP") === -1 && this.state.userRole.findIndex(e => e === "BAM-ASP Management") === -1 && this.state.userRole.findIndex(e => e === "BAM-Mover") === -1)) && (
                  <React.Fragment>
                  <Dropdown size="sm" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{ float: 'right', marginRight : '10px' }}>
                    <DropdownToggle caret color="secondary">
                      <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>File
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>MRA File</DropdownItem>
                      <DropdownItem onClick={this.downloadMRNAList}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Download MRA Need Assign List</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </React.Fragment>
                )}
                <Link to={'/srn/mr-srn-creation'}><Button color="success" style={{ float: 'right', marginRight: "8px" }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create MRA </Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2">Action</th>
                      <th>MR Dis ID</th>
                      <th>MRA Type</th>
                      <th>Category</th>
                      <th>Project Name</th>
                      <th>Tower ID Origin</th>
                      <th>Tower Name Origin</th>
                      <th>Region Origin</th>
                      <th>Destination ID</th>
                      <th>Destination Name</th>
                      <th>Destination Region</th>
                      <th>Created By</th>
                      <th>Created On</th>
                    </tr>
                    <tr>
                      {this.loopSearchBar()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.mr_dis_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.mr_dis_list.map((list, i) =>
                      <tr key={list._id}>
                        <td><Link to={'/srn/mr-srn-na-list/'+list._id}><Button size="sm" outline color="info">Assign</Button></Link></td>
                        <td><Link to={'/srn/mr-srn-detail/'+list._id}>{list.mra_id}</Link></td>
                        <td>{list.mra_type}</td>
                        <td>{list.mrd_category}</td>
                        <td>{list.project_name}</td>
                        <td>{list.site_info.find(si => si.srn_title === "Origin") !== undefined ? list.site_info.find(si => si.srn_title === "Origin").site_id : null }</td>
                        <td>{list.site_info.find(si => si.srn_title === "Origin") !== undefined ? list.site_info.find(si => si.srn_title === "Origin").site_name : null}</td>
                        <td>{list.site_info.find(si => si.srn_title === "Origin") !== undefined ? list.site_info.find(si => si.srn_title === "Origin").site_region : null}</td>
                        <td>{list.mrd_category === "To Warehouse" ? list.destination.value : list.site_info.find(si => si.srn_title === "Destination") !== undefined ? list.site_info.find(si => si.srn_title === "Destination").site_id : null }</td>
                        <td>{list.mrd_category === "To Warehouse" ? null : list.site_info.find(si => si.srn_title === "Destination") !== undefined ? list.site_info.find(si => si.srn_title === "Destination").site_name : null}</td>
                        <td>{list.mrd_category === "To Warehouse" ? null : list.site_info.find(si => si.srn_title === "Destination") !== undefined ? list.site_info.find(si => si.srn_title === "Destination").site_region : null}</td>
                        <td>{list.creator.map(e => e.email)}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(MRDisNAList);
