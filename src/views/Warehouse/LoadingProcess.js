import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class LoadingProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      mr_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      filter_list : new Array(14).fill(""),
      mr_all : [],
      action_status : null,
      action_message : ""
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadMRlist = this.downloadMRlist.bind(this);
    this.getMRList = this.getMRList.bind(this);
    this.getAllMR = this.getAllMR.bind(this);
    this.proceedMilestone = this.proceedMilestone.bind(this);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: username,
          password: password
        }
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(API_URL_Node+url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err.response);
      return respond;
    }
  }

  getMRList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_mr_id = this.state.filter_list[0] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[0]+'", "$options" : "i"}';
    let filter_implementation_id = this.state.filter_list[1] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_project_name = this.state.filter_list[2] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_cd_id = this.state.filter_list[3] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
    let filter_site_id = this.state.filter_list[4] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let filter_site_name = this.state.filter_list[5] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[5]+'", "$options" : "i"}';
    let filter_current_status = this.state.filter_list[6] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[6]+'", "$options" : "i"}';
    let filter_current_milestones = this.state.filter_list[7] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[7]+'", "$options" : "i"}';
    let filter_dsp = this.state.filter_list[8] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[8]+'", "$options" : "i"}';
    let filter_asp = this.state.filter_list[9] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[9]+'", "$options" : "i"}';
    let filter_eta = this.state.filter_list[10] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[10]+'", "$options" : "i"}';
    let filter_created_by = this.state.filter_list[11] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[11]+'", "$options" : "i"}';
    let filter_updated_on = this.state.filter_list[12] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[12]+'", "$options" : "i"}';
    let filter_created_on = this.state.filter_list[13] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[13]+'", "$options" : "i"}';
    let whereAnd = '{"mr_id": '+filter_mr_id+',"current_milestones": "MS_JOINT_CHECK"}';
    // let whereAnd = '{"mr_id": '+filter_mr_id+', "implementation_id": '+filter_implementation_id+', "project_name":'+filter_project_name+', "cd_id": '+filter_cd_id+', "current_mr_status": '+filter_current_status+', "current_milestones": "MS_LOADING_PROCESS", "dsp_company": '+filter_dsp+', "eta": '+filter_eta+', "updated_on": '+filter_updated_on+', "created_on": '+filter_created_on+'}';
    this.getDataFromAPI('/mr_sorted?where='+whereAnd+'&max_results='+maxPage+'&page='+page).then(res => {
      console.log("MR List Sorted", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({mr_list : items, totalData: totalData});
      }
    })
  }

  getAllMR() {
    let filter_mr_id = this.state.filter_list[0] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[0]+'", "$options" : "i"}';
    let filter_implementation_id = this.state.filter_list[1] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_project_name = this.state.filter_list[2] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_cd_id = this.state.filter_list[3] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
    let filter_site_id = this.state.filter_list[4] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let filter_site_name = this.state.filter_list[5] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[5]+'", "$options" : "i"}';
    let filter_current_status = this.state.filter_list[6] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[6]+'", "$options" : "i"}';
    let filter_current_milestones = this.state.filter_list[7] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[7]+'", "$options" : "i"}';
    let filter_dsp = this.state.filter_list[8] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[8]+'", "$options" : "i"}';
    let filter_asp = this.state.filter_list[9] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[9]+'", "$options" : "i"}';
    let filter_eta = this.state.filter_list[10] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[10]+'", "$options" : "i"}';
    let filter_created_by = this.state.filter_list[11] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[11]+'", "$options" : "i"}';
    let filter_updated_on = this.state.filter_list[12] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[12]+'", "$options" : "i"}';
    let filter_created_on = this.state.filter_list[13] === "" ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[13]+'", "$options" : "i"}';
    let whereAnd = '{"mr_id": '+filter_mr_id+', "implementation_id": '+filter_implementation_id+', "project_name":'+filter_project_name+', "cd_id": '+filter_cd_id+', "site_info.site_id": '+filter_site_id+', "site_info.site_name": '+filter_site_name+', "current_mr_status": '+filter_current_status+', "current_milestones": "MS_JOINT_CHECK", "dsp_company": '+filter_dsp+', "asp_company": '+filter_asp+', "eta": '+filter_eta+', "updated_on": '+filter_updated_on+', "created_on": '+filter_created_on+'}';
    // let whereAnd = '{"mr_id": '+filter_mr_id+', "implementation_id": '+filter_implementation_id+', "project_name":'+filter_project_name+', "cd_id": '+filter_cd_id+', "current_mr_status": '+filter_current_status+', "current_milestones": "MS_LOADING_PROCESS", "dsp_company": '+filter_dsp+', "eta": '+filter_eta+', "updated_on": '+filter_updated_on+', "created_on": '+filter_created_on+'}';
    this.getDataFromAPI('/mr_sorted_nonpage?where='+whereAnd).then(res => {
      console.log("MR List All", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({mr_all : items});
      }
    })
  }

  numToSSColumn(num){
    var s = '', t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t)/26 | 0;
    }
    return s || undefined;
  }

  async downloadMRlist() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = this.state.mr_all;

    let headerRow = ["MR ID", "Implementation ID", "Project Name", "CD ID", "Site ID", "Site Name", "Current Status", "Current Milestone", "DSP", "ASP", "ETA", "Created By", "Updated On", "Created On"];
    ws.addRow(headerRow);

    for(let i = 1; i < headerRow.length+1; i++){
      ws.getCell(this.numToSSColumn(i)+'1').font  = { size: 11, bold : true };
    }

    for(let i = 0; i < allMR.length; i++){
      ws.addRow([allMR[i].mr_id, allMR[i].implementation_id, allMR[i].project_name, allMR[i].cd_id, "", "", allMR[i].current_mr_status, allMR[i].current_milestones, allMR[i].dsp_company, "", allMR[i].eta, "", allMR[i].updated_on, allMR[i].created_on])
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Loading Process.xlsx');
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL+url, data, {
        headers: {
          'Content-Type':'application/json',
          'If-Match': _etag
        },
        auth: {
          username: username,
          password: password
        }
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log('respond patch data', respond);
      }
      return respond;
    } catch(err) {
      let respond = undefined;
      this.setState({action_status: 'failed', action_message: 'Sorry, there is something wrong, please try again!'});
      console.log('respond patch data', err);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE+url, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data){
    try {
      let respond = await axios.patch(API_URL_NODE +url, data, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async proceedMilestone2(e) {
    const _id = e.target.id;
    let successUpdate = [];
    let res = await this.patchDatatoAPINODE('/matreq/loadingProcess/'+_id);
    if(res !== undefined) {
      if(res.data !== undefined) {
        successUpdate.push(res.data);
      }
    }
    if(successUpdate.length !== 0){
      this.setState({action_status : "success"});
      setTimeout(function(){ window.location.reload(); }, 2000);
    }
  }

  async proceedMilestone(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const _etag = e.target.value;
    const id_doc = e.currentTarget.id;
    let res = await this.patchDatatoAPINODE('/matreq/loadingProcess/'+id_doc);
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"}, () => {
          setTimeout(function(){ window.location.reload(); }, 2000);
        });
      }else{
        if(res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined){
          if(res.response.data.error.message !== undefined){
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          }else{
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        }else{
          this.setState({ action_status: 'failed' });
        }
      }
    }else{
      this.setState({ action_status: 'failed' });
    }
  }

  // async proceedMilestone(e) {
  //   const newDate = new Date();
  //   const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
  //   const _etag = e.target.value;
  //   const _id = e.target.id;
  //   const dataMR = this.state.mr_list.find(e => e._id === _id);
  //   let currStatus = [
  //     {
  //         "mr_status_name": "LOADING_PROCESS",
  //         "mr_status_value": "FINISH",
  //         "mr_status_date": dateNow,
  //         "mr_status_updater": this.state.userEmail,
  //         "mr_status_updater_id": this.state.userId
  //     }
  //   ];
  //   let currMilestones = [
  //     {
  //         "ms_name": "MS_LOADING_PROCESS",
  //         "ms_date": dateNow,
  //         "ms_updater": this.state.userEmail,
  //         "ms_updater_id": this.state.userId
  //     }
  //   ];
  //   let successUpdate = [];
  //   let updateMR = {};
  //   updateMR['current_milestones'] = "MS_LOADING_PROCESS";
  //   updateMR['current_mr_status'] = "LOADING PROCESS FINISH";
  //   updateMR['mr_milestones'] = dataMR.mr_milestones.concat(currMilestones);
  //   updateMR['mr_status'] = dataMR.mr_status.concat(currStatus);
  //   let res = await this.patchDataToAPI('/mr_op/'+_id, updateMR, _etag);
  //   if(res !== undefined) {
  //     if(res.data !== undefined) {
  //       successUpdate.push(res.data);
  //     }
  //   }
  //   if(successUpdate.length !== 0){
  //     this.setState({action_status : "success"});
  //     setTimeout(function(){ window.location.reload(); }, 2000);
  //   }
  // }

  componentDidMount() {
    this.getMRList();
    this.getAllMR();
    document.title = 'Loading Process | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getMRList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if(value !== "" && value.length === 0) {
      value = "";
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter, activePage: 1}, () => {
      this.onChangeDebounced(e);
    })
  }

  onChangeDebounced(e) {
    this.getMRList();
    this.getAllMR();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    function AlertProcess(props){
      const alert = props.alertAct;
      const message = props.messageAct;
      if(alert === 'failed'){
        return (
          <div className="alert alert-danger" role="alert">
            {message.length !== 0 ? message : 'Sorry, there was an error when we tried to save it, please reload your page and try again'}
          </div>
        )
      } else{
        if(alert === 'success'){
          return (
            <div className="alert alert-success" role="alert">
              {message}
              Your action was success, please reload your page
            </div>
          )
        } else{
          return (
            <div></div>
          )
        }
      }
    }

    const downloadMR = {
      float: 'right'
    }

    const tableWidth = {
      width: '150px'
    }

    return (
      <div className="animated fadeIn">
        <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2'}}>
                  <i className="fa fa-align-justify" style={{marginRight: "8px"}}></i> Loading Process
                </span>
                <Button style={downloadMR} outline color="success" onClick={this.downloadMRlist} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download MR List</Button>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{verticalAlign: "middle"}}>Action</th>
                      <th>MR ID</th>
                      <th>Implementation ID</th>
                      <th>Project Name</th>
                      <th>CD ID</th>
                      <th>Site ID</th>
                      <th>Site Name</th>
                      <th>Current Status</th>
                      <th>Current Milestone</th>
                      <th>DSP</th>
                      <th>ASP</th>
                      <th>ETA</th>
                      <th>Created By</th>
                      <th>Updated On</th>
                      <th>Created On</th>
                    </tr>
                    <tr>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[0]} name={0} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[1]} name={1} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[2]} name={2} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[3]} name={3} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[4]} name={4} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[5]} name={5} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[6]} name={6} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[7]} name={7} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[8]} name={8} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[9]} name={9} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[10]} name={10} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[11]} name={11} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[12]} name={12} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[13]} name={13} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
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
                        <td><Button outline color="primary" size="sm" className="btn-pill" style={{width: "80px"}} id={list._id} value={list._etag} onClick={this.proceedMilestone}><i className="fa fa-angle-double-right" style={{marginRight: "8px"}}></i>Done</Button></td>
                        <td><Link to={'/mr-detail/'+list._id}>{list.mr_id}</Link></td>
                        <td>{list.implementation_id}</td>
                        <td>{list.project_name}</td>
                        <td>{list.cd_id}</td>
                        <td>{list.site_info[0].site_id}</td>
                        <td>{list.site_info[0].site_name}</td>
                        <td>{list.current_mr_status}</td>
                        <td>{list.current_milestones}</td>
                        <td>{list.dsp_company}</td>
                        <td>{list.asp_company}</td>
                        <td>{list.eta}</td>
                        <td></td>
                        <td>{list.updated_on}</td>
                        <td>{list.created_on}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={this.state.totalData.total}
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
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(LoadingProcess);
