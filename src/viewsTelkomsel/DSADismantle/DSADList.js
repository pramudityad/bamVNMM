import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const arrayFilter = ["dsa_number", "dsa_total_value", "current_dsa_status", "dsp_company", "dimension_volume", "dimension_weight"];

class DSAList extends Component {
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
      dsa_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list : [],
      modal_loading: false,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDSAList = this.getDSAList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.downloadDSAlist = this.downloadDSAlist.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
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
          'Authorization': 'Bearer ' + this.props.dataLogin.token
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

  getDSAList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    filter_array.push('"dsa_number":{"$exists" : 1, "$ne" : null}');
    for(let i = 0; i < arrayFilter.length; i++){
      this.state.filter_list[arrayFilter[i]] !== null && this.state.filter_list[arrayFilter[i]] !== undefined &&
        filter_array.push('"'+arrayFilter[i]+'":{"$regex" : "' +   this.state.filter_list[arrayFilter[i]] + '", "$options" : "i"}');
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE('/matreq-srn?srt=_id:-1&q='+whereAnd+'&lmt=' + maxPage + '&pg=' + page).then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ dsa_list: items, totalData: totalData });
      }
    })
  }

  async getDSAListAll() {
    let filter_array = [];
    let mrList = [];
    filter_array.push('"dsa_number":{"$exists" : 1, "$ne" : null}');
    for(let i = 0; i < arrayFilter.length; i++){
      this.state.filter_list[arrayFilter[i]] !== null && this.state.filter_list[arrayFilter[i]] !== undefined &&
        filter_array.push('"'+arrayFilter[i]+'":{"$regex" : "' +   this.state.filter_list[arrayFilter[i]] + '", "$options" : "i"}');
    }
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    let res = await this.getDataFromAPINODE('/matreq-srn?srt=_id:-1&noPg=1&q='+whereAnd);
    if (res.data !== undefined) {
      const items = res.data.data;
      mrList = res.data.data;
      return mrList;
      // this.setState({ mr_all: items });
    }else{
      return [];
    }
  }

  async downloadDSAlist() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = await this.getDSAListAll();

    let headerRow = ["DSA ID","MR ID", "MR Type","MR Delivery Type","Site ID 01", "Site Name 01", "Site ID 02", "Site Name 02", "MR Status", "Origin Warehouse", "MR For Project", "MR For Activity", "LCC Number", "LCC Budget", "LCC Date","PO"];
    let dsaStatus = ["Process - Sent MR Request Name (Rule)", "Process - Sent MR Request Time (Rule)", "Process - MR Receipt (DC) Name (Rule)", "Process - MR Receipt (DC) Time (Rule)"];
    let dsaDSAGeneral = ["MOT", "DSP", "MOS Date", "DSA Actual", "Cost MR Transportation ", "Cost MR Additional", "DSA Created Date", "DSA Created By", "LDM  Approval Name", "LDM  Approval Date", "LDM Admin Approval Name", "LDM Admin Approval Date", "GR By", "GR Date", "GR Number"];
    let dataSec1 = [];
    let dataSec2 = [];
    let dataSec3 = [];
    const btsSec1 = 5;
    const btsSec2 = 5;
    const btsSec3 = 5;
    for(let i = 0; i < btsSec1; i++){
      dataSec1.push("DSA - Category "+(i+1), "DSA - ServiceCode "+(i+1), "DSA - Price "+(i+1), "DSA - Quantity "+(i+1), "DSA - Total Price "+(i+1), "DSA - Long Text "+(i+1));
    }
    for(let i = 0; i < btsSec2; i++){
      dataSec2.push( "DSA - Additional Category "+(i+1), "DSA - Additional Service Code "+(i+1), "DSA - Additional Service Master "+(i+1) , "DSA - Additional Service Price "+(i+1), "DSA - Additional Service Quantity "+(i+1),  "DSA - Additional Service Total Price "+(i+1), "DSA - Additional Service Short Text "+(i+1), "DSA - Additional Service Long Text "+(i+1));
    }
    for(let i = 0; i < btsSec3; i++){
      dataSec2.push("DSA - Section 3 Description "+(i+1), "DSA - Section 3 Type of Cost "+(i+1), "DSA - Section 3 Price "+(i+1));
    }

    ws.addRow(headerRow.concat(dsaStatus).concat(dsaDSAGeneral).concat(dataSec1).concat(dataSec2).concat(dataSec3));

    for (let i = 0; i < allMR.length; i++) {
      const creator_mr_mitt = allMR[i].mr_status.find(e => e.mr_status_name === "PLANTSPEC" && e.mr_status_value === "NOT ASSIGNED");
      let site_info_1 = {};
      let site_info_2 = {};
      let lcc_data = {};
      if(allMR[i].site_info !== undefined && allMR[i].site_info[0] !== undefined){
        site_info_1 = allMR[i].site_info[0]
      }
      if(allMR[i].site_info !== undefined && allMR[i].site_info[1] !== undefined){
        site_info_2 = allMR[i].site_info[1]
      }
      let approved_ldm = {};
      let lastIndexApproved = allMR[i].mr_status.filter(lio => lio.mr_status_name === "MATERIAL_REQUEST" && lio.mr_status_value === "APPROVED");
      if(lastIndexApproved.length !== 0){
        approved_ldm = allMR[i].mr_status[lastIndexApproved.length-1];
      }
      let mr_mos = {};
      let lastIndexMOS = allMR[i].mr_status.filter(lio => lio.mr_status_name === "MATERIAL_REQUEST" && lio.mr_status_value === "ON SITE");
      if(lastIndexMOS.length !== 0){
        mr_mos = lastIndexMOS[lastIndexMOS.length-1];
      }
      let dsa_creation = {};
      let lastIndexDSAC = allMR[i].dsa_status.filter(lio => lio.dsa_status_name === "DSA" && lio.dsa_status_value === "CREATED");
      if(lastIndexDSAC.length !== 0){
        dsa_creation = lastIndexDSAC[lastIndexDSAC.length-1];
      }
      let dsa_ldma = {};
      let lastIndexLDMA = allMR[i].dsa_status.filter(lio => lio.dsa_status_name === "DSA_LDM_APPROVAL" && lio.dsa_status_value === "APPROVED");
      if(lastIndexLDMA.length !== 0){
        dsa_ldma = lastIndexLDMA[lastIndexLDMA.length-1];
      }
      let dsa_ldmaa = {};
      let lastIndexLDMAA = allMR[i].dsa_status.filter(lio => lio.dsa_status_name === "DSA_LDM_ADMIN_APPROVAL" && lio.dsa_status_value === "APPROVED");
      if(lastIndexLDMAA.length !== 0){
        dsa_ldmaa = lastIndexLDMAA[lastIndexLDMAA.length-1];
      }
      let dataMOT = {};
      let dsa_mr_row = [allMR[i].dsa_number, allMR[i].mr_id, allMR[i].mr_type, allMR[i].mr_delivery_type, site_info_1.site_id, site_info_1.site_name, site_info_2.site_id, site_info_2.site_name, allMR[i].current_mr_status, allMR[i].origin !== undefined ? allMR[i].origin.value : null, allMR[i].project_name, allMR[i].cust_del !== undefined ? allMR[i].cust_del.map(cd => cd.cd_id).join(", ") : null, lcc_data.no_lcc, lcc_data.budget, lcc_data.no_lcc !== undefined ? new Date(lcc_data.no_lcc) : null, allMR[i].no_po_dsa];
      let dsa_mr_row_status = [allMR[i].creator !== undefined ? allMR[i].creator.email : null, new Date(allMR[i].created_on), approved_ldm.mr_status_updater, approved_ldm.mr_status_date !== undefined ? new Date(approved_ldm.mr_status_date) : null ];
      let dsa_mr_row_das_general = ["MOT", allMR[i].dsp_company, mr_mos.mr_status_date !== undefined ? new Date(mr_mos.mr_status_date) : null, allMR[i].dsa_total_value, allMR[i].primary_section.filter(ps => ps.total_price !== undefined && ps.total_price !== null).reduce((a,b) => a+parseFloat(b.total_price), 0), allMR[i].second_section.service_details.filter(ps => ps.total_price !== undefined && ps.total_price !== null).reduce((a,b) => a+parseFloat(b.total_price), 0)+allMR[i].third_section.service_details.filter(ps => ps.price !== undefined && ps.price !== null).reduce((a,b) => a+parseFloat(b.price), 0), dsa_creation.dsa_status_updater, dsa_creation.dsa_status_date !== undefined ? new Date(dsa_creation.dsa_status_date) : null, dsa_ldma.dsa_status_updater, dsa_ldma.dsa_status_date !== undefined ? new Date(dsa_ldma.dsa_status_date) : null, dsa_ldmaa.dsa_status_updater, dsa_ldmaa.dsa_status_date !== undefined ? new Date(dsa_ldmaa.dsa_status_date) : null, allMR[i].dsa_gr_by, allMR[i].dsa_gr_date, allMR[i].dsa_gr_no];

      let rowSec1 = [];
      let rowSec2 = [];
      let rowSec3 = [];

      if(allMR[i].primary_section !== undefined){
        console.log("allMR[i].primary_section", allMR[i].primary_section);
        for(let j = 0; j < btsSec1; j++){
          let dataPrimaryIdx = allMR[i].primary_section[j];
          if(dataPrimaryIdx !== undefined){
            rowSec1.push(dataPrimaryIdx.sub_category, dataPrimaryIdx.service_master, dataPrimaryIdx.price, dataPrimaryIdx.qty, dataPrimaryIdx.total_price, dataPrimaryIdx.long_text);
          }else{
            rowSec1.push(null,null,null,null,null,null);
          }
        }
      }else{
        for(let j = 0; j < btsSec1; j++){
          rowSec1.push(null,null,null,null,null,null);
        }
      }

      if(allMR[i].second_section !== undefined && allMR[i].second_section.service_details !== undefined){
        for(let j = 0; j < btsSec2; j++){
          let dataSecondaryIdx = allMR[i].second_section.service_details[j];
          if(dataSecondaryIdx !== undefined){
            rowSec2.push(dataSecondaryIdx.sub_category, dataSecondaryIdx.service_master, dataSecondaryIdx.service_master, dataSecondaryIdx.price, dataSecondaryIdx.qty, dataSecondaryIdx.total_price, dataSecondaryIdx.short_text, dataSecondaryIdx.long_text);
          }else{
            rowSec2.push(null,null,null,null,null,null,null,null);
          }
        }
      }else{
        for(let j = 0; j < btsSec2; j++){
          rowSec2.push(null,null,null,null,null,null,null,null);
        }
      }

      if(allMR[i].third_section !== undefined && allMR[i].third_section.service_details !== undefined){
        for(let j = 0; j < btsSec3; j++){
          let dataThirdIdx = allMR[i].third_section.service_details[j];
          if(dataThirdIdx !== undefined){
            rowSec3.push(dataThirdIdx.description, dataThirdIdx.type_of_cost, dataThirdIdx.price);
          }else{
            rowSec3.push(null,null,null);
          }
        }
      }else{
        for(let j = 0; j < btsSec3; j++){
          rowSec3.push(null,null,null);
        }
      }
      ws.addRow(dsa_mr_row.concat(dsa_mr_row_status).concat(dsa_mr_row_das_general).concat(rowSec1).concat(rowSec2).concat(rowSec3));
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'DSA ReturnList Report.xlsx');
  }

  componentDidMount() {
    this.getDSAList();
    document.title = 'DSA ReturnList | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getDSAList();
    });
  }

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
    this.getDSAList();
  };

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
            </InputGroup>
          </div>
        </td>
      );
    }
    return searchBar;
  };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const downloadDSA = {
      float: 'right',
      marginRight: '10px'
    }

    const tableWidth = {
      width: '150px'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: '2' }}>
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> DSA ReturnList
                </span>
                <Link to={'/dsa-srn-creation'}><Button color="success" style={{ float: 'right' }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create DSAA</Button></Link>
                <Button style={downloadDSA} outline color="success" size="sm" onClick={this.downloadDSAlist}><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download DSA ReturnList</Button>
                {(this.state.userRole.findIndex(e => e === "Admin") !== -1) && (
                  <Link to={'/dsa-srn-migration'}><Button color="success" style={{ float: 'right', marginRight: "8px" }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>DSA Migration</Button></Link>
                )}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>Action</th>
                      <th>DSA Number</th>
                      <th>DSA Total Value</th>
                      <th>Current Status</th>
                      <th>Vendor</th>
                      <th>Volume</th>
                      <th>Weight</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.dsa_list.length === 0 && (
                      <tr>
                        <td colSpan="7">No Data Available</td>
                      </tr>
                    )}
                    {this.state.dsa_list.map((list, i) =>
                      <tr key={list._id}>
                        <td>
                          <Link to={'/dsa-srn-detail/' + list._id}>
                            <Button style={{ width: "90px" }} outline color="info" size="sm">Detail</Button>
                          </Link>
                        </td>
                        <td>{list.dsa_number}</td>
                        <td>{list.dsa_total_value}</td>
                        <td>{list.current_dsa_status}</td>
                        <td>{list.dsp_company}</td>
                        <td>{list.dimension_volume}</td>
                        <td>{list.dimension_weight}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }} className="pagination">
                  <small>Showing {this.state.dsa_list.length} entries from {this.state.totalData} data</small>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(DSAList);
