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

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

class TssrList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tssr_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      filter_list : new Array(14).fill(""),
      tssr_all : []
    }
    this.handlePageChange = this.handlePageChange.bind(this);
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

  getTssrList(){
    const page = this.state.activePage;
    this.getDataFromAPIBAM('/tssr_sorted?'+'max_results='+this.state.perPage+'&page='+page).then(res => {
      if(res.data !== undefined){
        const totalData = res.data._meta;
        this.setState({tssr_list : res.data._items, totalData : totalData})
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
                  <i className="fa fa-align-justify" style={{marginRight: "8px"}}></i> PS List
                </span>
                <Link to={'/tssr-bom'}><Button color="success" style={{float : 'right'}} size="sm">Create PS</Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>No PS</th>
                      <th>Project</th>
                      <th>Site</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tssr_list.map((list, i) =>
                      <tr key={list._id}>
                        <td>{list.no_tssr_boq}</td>
                        <td>{list.project_name}</td>
                        <td></td>
                        <td>
                          <Link to={'/tssr-bom/'+list._id}>
                            <Button color="info" size="sm" outline>Detail</Button>
                          </Link>
                        </td>
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
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SidebarMinimizer : (minimize) => dispatch({type : ActionType.MINIMIZE_SIDEBAR, minimize_sidebar : minimize }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TssrList);
