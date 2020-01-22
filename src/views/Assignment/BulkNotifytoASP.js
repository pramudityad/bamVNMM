import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash"/>
);

class BulkNotifytoASP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action_message : null,
      action_status : null,
      assignment_list : [],
      assignment_all : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      asg_checked : new Map(),
      asg_checked_all : false,
      data_asg_checked : [],
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getAssignmentList = this.getAssignmentList.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeChecklistAll = this.handleChangeChecklistAll.bind(this);
    this.requestForNotifyBulk = this.requestForNotifyBulk.bind(this);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL_tsel+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: username_tsel,
          password: password_tsel
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

  async patchDatatoAPIBAM(url, data, _etag){
    try {
      let respond = await axios.patch(API_URL_tsel +url, data, {
        headers : {'Content-Type':'application/json', "If-Match" : _etag},
        auth: {
          username: username_tsel,
          password: password_tsel
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  getAssignmentList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    this.getDataFromAPI('/asp_assignment_sorted?max_results='+maxPage+'&page='+page+'&where={"Current_Status" : "ASP ASSIGNMENT CREATED"}').then(res => {
      console.log("Assignment List Sorted", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({assignment_list : items, totalData: totalData});
      }
    })
  }

  getAssignmentListAll() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    this.getDataFromAPI('/asp_assignment_sorted_non_page?where={"Current_Status" : "ASP ASSIGNMENT CREATED"}').then(res => {
      console.log("Assignment List Sorted All", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({assignment_all : items});
      }
    })
  }

  handleChangeChecklist(e){
    const item = e.target.name;
    const isChecked = e.target.checked;
    const mrList = this.state.assignment_list;
    let dataMRChecked = this.state.data_asg_checked;
    if(isChecked === true){
      const getMR = mrList.find(e => e._id === item);
      dataMRChecked.push(getMR);
    }else{
      dataMRChecked = dataMRChecked.filter(function( e ) {
        return e._id !== item;
      });
    }
    this.setState({ data_asg_checked : dataMRChecked});
    this.setState(prevState => ({ asg_checked: prevState.asg_checked.set(item, isChecked) }));
  }

  handleChangeChecklistAll(e){
    const isChecked = e.target.checked;
    const mrList = this.state.assignment_all;
    let dataMRChecked = this.state.data_asg_checked;
    if(isChecked === true){
      for(let i = 0; i < mrList.length; i++){
        if(this.state.asg_checked.get(mrList[i]._id) !== true){
          dataMRChecked.push(mrList[i]);
        }
        this.setState(prevState => ({ asg_checked: prevState.asg_checked.set(mrList[i]._id, true) }));
      }
      this.setState({ data_asg_checked : dataMRChecked, asg_checked_all : isChecked });
    }else{
      this.setState({asg_checked : new Map(), data_asg_checked : [] });
      this.setState({asg_checked_all : isChecked });
    }
  }

  async requestForNotifyBulk(){
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    let dataASGChecked = this.state.data_asg_checked;
    let sucPatch = [];
    for(let i = 0; i < dataASGChecked.length; i++){
      let dataASG = dataASGChecked[i];
      const notifyStatus = [
        {
          "status_name": "ASP_ASSIGNMENT",
          "status_value": "NOTIFIED TO ASP",
          "status_date": dateNow,
          "status_updater": this.state.userId,
          "status_updater_id": this.state.userId,
          "status_note": ""
        }
      ]
      let notifyASP = {};
      notifyASP['Current_Status'] = "ASP ASSIGNMENT NOTIFIED TO ASP";
      notifyASP['ASP_Assignment_Status'] = dataASG.ASP_Assignment_Status.concat(notifyStatus);
      const patchData = await this.patchDatatoAPIBAM('/asp_assignment_op/'+dataASG._id, notifyASP, dataASG._etag);
      if(patchData.data !== undefined){
        sucPatch.push(patchData.data._id);
      }
    }
    if(sucPatch.length === dataASGChecked.length){
      this.setState({action_status : 'success'}, () => {
        setTimeout(function(){ window.location.reload(); }, 3000);
      });
    }else{
      this.setState({action_status : 'failed'});
    }
  }

  componentDidMount() {
    this.getAssignmentListAll();
    this.getAssignmentList();
    document.title = 'Assignment List | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getAssignmentList();
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    console.log("data_asg_checked", this.state.data_asg_checked);
    const downloadAssignment = {
      float: 'right',
      marginRight: '10px'
    }

    const tableWidth = {
      width: '150px'
    }

    return (
      <div className="animated fadeIn">
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2'}}>
                  <i className="fa fa-align-justify" style={{marginRight: "8px"}}></i> Assignment List
                </span>
                <div style={{float : 'right', marginRight : '20px', display:'inline-flex', marginTop : '5px'}}>
                  <Checkbox checked={this.state.asg_checked_all} onChange={this.handleChangeChecklistAll} style={{float : 'right', marginRight: "8px"}}/>
                  <span style={{marginTop : '1px'}}>Select All</span>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2"></th>
                      <th>Assignment ID</th>
                      <th>Account Name</th>
                      <th>Project Name</th>
                      <th>SOW Type</th>
                      <th>NW</th>
                      <th>NW Activity</th>
                      <th>Terms of Payment</th>
                      <th>Item Status</th>
                      <th>Work Status</th>
                    </tr>
                    <tr>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={0} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={1} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={2} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={3} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={4} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={5} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={6} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={7} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls" style={tableWidth}>
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={8} size="sm"/>
                          </InputGroup>
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.assignment_list.length === 0 && (
                      <tr>
                        <td colSpan="10">No Data Available</td>
                      </tr>
                    )}
                    {this.state.assignment_list.map((list, i) =>
                      <tr key={list._id}>
                        <td>
                          <Checkbox name={list._id} checked={this.state.asg_checked.get(list._id)} onChange={this.handleChangeChecklist}/>
                        </td>
                        <td>{list.Assignment_No}</td>
                        <td>{list.Account_Name}</td>
                        <td>{list.Project}</td>
                        <td>{list.SOW_Type}</td>
                        <td>{list.NW}</td>
                        <td>{list.NW_Activity}</td>
                        <td>{list.Payment_Terms}</td>
                        <td>{list.Item_Status}</td>
                        <td>{list.Work_Status}</td>
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
              <CardFooter>
                {this.state.data_asg_checked.length !== 0 && (
                  <div>
                    <Button color='success' style={{float : 'right'}} onClick={this.requestForNotifyBulk}> Send Notify to ASP</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(BulkNotifytoASP);
