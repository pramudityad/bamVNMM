import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {connect} from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';

const API_URL = 'https://api.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2.bam-id.e-dpm.com/bamidapi';

const arrayFilter = ["no_plantspec", "project_name", "current_status", "mr_id"];

class PSList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      tssr_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      filter_list : {},
      tssr_all : []
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
  }

  async getDataFromAPIBAM(url) {
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

  getTssrList(){
    const page = this.state.activePage;
    const maxPage = this.state.perPage
    let filter_array = [];
    (this.state.filter_list["no_plantspec"] !== null && this.state.filter_list["no_plantspec"] !== undefined) && (filter_array.push('"no_plantspec":{"$regex" : "' + this.state.filter_list["no_plantspec"] + '", "$options" : "i"}'));
    (this.state.filter_list["project_name"] !== null && this.state.filter_list["project_name"] !== undefined) && (filter_array.push('"project_name":{"$regex" : "' + this.state.filter_list["project_name"] + '", "$options" : "i"}'));
    (this.state.filter_list["current_status"] !== null && this.state.filter_list["current_status"] !== undefined) && (filter_array.push('"current_status":{"$regex" : "' + this.state.filter_list["current_status"] + '", "$options" : "i"}'));
    (this.state.filter_list["mr_id"] !== null && this.state.filter_list["mr_id"] !== undefined) && (filter_array.push('"mr_id":{"$regex" : "' + this.state.filter_list["mr_id"] + '", "$options" : "i"}'));
    let whereAnd = '{' + filter_array.join(',') + '}';
    this.getDataFromAPINODE('/plantspec?srt=_id:-1&q=' + whereAnd + '&lmt=' + maxPage + '&pg=' + page).then(res => {
    // this.getDataFromAPIBAM('/tssr_sorted?'+'max_results='+this.state.perPage+'&page='+page).then(res => {
      if(res.data !== undefined){
        const totalData = res.data.totalResults;
        this.setState({tssr_list : res.data.data, totalData : totalData})
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

  componentDidMount() {
    this.getTssrList();
    document.title = 'TSSR List | BAM';
  }

  componentWillUnmount(){
    this.props.SidebarMinimizer(false);
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getTssrList();
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  handleFilterList(e) {
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

  onChangeDebounced(e) {
    this.getTssrList();
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < arrayFilter.length; i++) {
      searchBar.push(
        <td>
          <div className="controls">
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText><i className="fa fa-search"></i></InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[arrayFilter[i]]} name={arrayFilter[i]} size="sm" />
            </InputGroup>
          </div>
        </td>
      )
    }
    return searchBar;
  }

  render() {
    const downloadMR = {
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
                <span style={{lineHeight :'2'}}>
                  <i className="fa fa-align-justify" style={{marginRight: "8px"}}></i> Plant Spec Group List
                </span>
                <Link to={'/ps-creation'}><Button color="success" style={{float : 'right'}} size="sm">Create PS</Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>No PS Group</th>
                      <th>Project</th>
                      <th>Status</th>
                      <th>MR Related</th>
                      <th rowSpan="2">Action</th>
                    </tr>
                    <tr>
                      {this.loopSearchBar()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tssr_list.map((list, i) =>
                      <tr key={list._id}>
                        <td>{list.no_plantspec}</td>
                        <td>{list.project_name}</td>
                        <td>{list.submission_status}</td>
                        <td>{list.mr_id}</td>
                        <td>
                          <Link to={'/ps-detail/'+list._id}>
                            <Button color="info" size="sm" outline>Detail</Button>
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Col>
                  <span> View {this.state.tssr_list.length} data from total {this.state.totalData} data </span>
                </Col>
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
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SidebarMinimizer : (minimize) => dispatch({type : ActionType.MINIMIZE_SIDEBAR, minimize_sidebar : minimize }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PSList);
