import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import {convertDateFormatfull, convertDateFormat} from '../../helper/basicFunction';
import {apiSendEmail, getDatafromAPINODE, patchDatatoAPINODE} from '../../helper/asyncFunction';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_ISAT = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameISAT = 'adminbamidsuper';
const passwordISAT = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const array_field = ["mr_id", "mr_delivery_type", "project_name", "origin.value", "destination.value", "current_mr_status", "creator.email", "created_on"]

class MRWHDismantle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      mr_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: new Array(14).fill(""),
      mr_all: [],
      action_status: null,
      action_message: null,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadMRlist = this.downloadMRlist.bind(this);
    this.getMRList = this.getMRList.bind(this);
    this.getAllMR = this.getAllMR.bind(this);
    this.proceedMilestone = this.proceedMilestone.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  getMRList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    filter_array.push('"current_mr_status":"MR APPROVED"');
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    filter_array.push('"$or" : [{"mr_delivery_type_code" : "A1"}, {"mr_delivery_type_code" : "A2"}, {"mr_delivery_type_code" : "B1"}, {"mr_delivery_type_code" : "C1"}]')
    let whereAnd = '{' + filter_array.join(',') + '}';
    getDatafromAPINODE('/matreq?srt=_id:-1&q=' + whereAnd + '&lmt=' + maxPage + '&pg=' + page, this.state.tokenUser).then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ mr_list: items, totalData: totalData });
      }
    })
  }

  getAllMR() {
    let filter_array = [];
    for(let i = 0; i < array_field.length; i++){
      if(this.state.filter_list[array_field[i]] !== undefined && this.state.filter_list[array_field[i]] !== null){
        filter_array.push('"'+array_field[i]+'":{"$regex" : "' + this.state.filter_list[array_field[i]] + '", "$options" : "i"}');
      }
    }
    filter_array.push('"current_mr_status":"PLANTSPEC NOT ASSIGNED"');
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1 || this.state.userRole.findIndex(e => e === "BAM-Mover") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"dsp_company" : "'+this.state.vendor_name+'"');
    }
    filter_array.push('"$or" : [{"mr_delivery_type_code" : "A1"}, {"mr_delivery_type_code" : "A2"}, {"mr_delivery_type_code" : "B1"}, {"mr_delivery_type_code" : "C1"}]')
    let whereAnd = '{' + filter_array.join(',') + '}';
    getDatafromAPINODE('/matreq?noPg=1&q=' + whereAnd, this.state.tokenUser).then(res => {
      console.log("MR List All", res);
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ mr_all: items });
      }
    })
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

  async downloadMRlist() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = this.state.mr_all;

    let headerRow = ["MR ID", "Project Name", "CD ID", "Site ID", "Site Name", "Current Status", "Current Milestone", "DSP", "ETA", "Created By", "Updated On", "Created On"];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + '1').font = { size: 11, bold: true };
    }

    for (let i = 0; i < allMR.length; i++) {
      ws.addRow([allMR[i].mr_id, allMR[i].project_name, allMR[i].cd_id, allMR[i].site_info[0].site_id, allMR[i].site_info[0].site_name, allMR[i].current_mr_status, allMR[i].current_milestones, allMR[i].dsp_company, allMR[i].eta, "", allMR[i].updated_on, allMR[i].created_on])
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'MR Warehouse Dismantle.xlsx');
  }

  async proceedMilestone(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let dataMR = this.state.mr_list.find(e => e._id === _id);
    let dataProject = undefined;
    if(dataMR !== undefined){
      // dataProject = await this.getDataProject(dataMR.project_name);
    }
    let res = await patchDatatoAPINODE('/matreq/confirmRTD/' + _id, {}, this.state.tokenUser);
    if (res !== undefined) {
      if (res.data !== undefined) {
        // if(dataProject !== undefined){
        //   // let linkImp = "https://dev.bam-id.e-dpm.com/mr-detail/"+id_doc;
        //   let linkImp = "#";
        //   const bodyEmail = "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following MR have reached the Joint Check stage<br/><br/><i>Site</i>: <b>"+dataMR.site_info.map(site_info => site_info.site_id).join(' , ')+"</b> <br/><i>Project</i>: <b>"+dataMR.project_name+"</b><br/><i>MR</i>: <b>"+dataMR.mr_id+"</b><br/><br/>RTD Milestone is done by "+this.state.userEmail+".</span><br/><br/><br/><br/>Please follow this link to see the MR detail:<br/><a href='"+linkImp+"'>"+linkImp+"</a>";
        //   let dataEmail = {
        //     "to": dataProject.Email_CPM_Name+' ;',
        //     "subject":"[MR Joint Checked] MR "+dataProject.mr_id,
        //     "body": bodyEmail
        //   }
        //   // console.log(dataEmail)
        //   const sendEmail = await apiSendEmail(dataEmail);
        // }
        this.setState({ action_status: "success" });
        this.getMRList();
      } else {
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  componentDidMount() {
    this.getMRList();
    // this.getAllMR();
    document.title = 'MR Warehouse Dismantle | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getMRList();
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
    })
  }

  onChangeDebounced(e) {
    this.getMRList();
    // this.getAllMR();
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
    }

    return (
      <div className="animated fadeIn">
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: '2' }}>
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> MR Warehouse Dismantle
                </span>
                <Button style={downloadMR} outline color="success" onClick={this.downloadMRlist} size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download MR List</Button>
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
                    <tr>
                      {this.loopSearchBar()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.mr_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.mr_list.map((list, i) =>
                      <tr key={list._id}>
                        <td><Button outline color="primary" size="sm" className="btn-pill" style={{ width: "80px" }} id={list._id} value={list._etag} onClick={this.proceedMilestone}><i className="fa fa-angle-double-right" style={{ marginRight: "8px" }}></i>GO</Button></td>
                        <td><Link to={'/mr-detail/'+list._id}>{list.mr_id}</Link></td>
                        <td>{list.mr_delivery_type}</td>
                        <td>{list.project_name}</td>
                        <td>{list.origin.value }</td>
                        <td>{list.destination.value}</td>
                        <td>{list.current_mr_status}</td>
                        <td>{list.creator.map(e => e.email)}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }}>
                  <small>Showing {this.state.mr_all.length} entries</small>
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
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
          <ModalBody>
            <div style={{textAlign : 'center'}}>
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            <div style={{textAlign : 'center'}}>
              Loading ...
            </div>
            <div style={{textAlign : 'center'}}>
              System is processing ...
            </div>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData
  }
}

export default connect(mapStateToProps)(MRWHDismantle);
