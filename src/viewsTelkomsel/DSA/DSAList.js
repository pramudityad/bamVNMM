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
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDSAList = this.getDSAList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
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
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE('/matreq?srt=_id:-1&q='+whereAnd+'&lmt=' + maxPage + '&pg=' + page).then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ dsa_list: items, totalData: totalData });
      }
    })
  }

  componentDidMount() {
    this.getDSAList();
    document.title = 'DSA List | BAM';
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
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> DSA List
                </span>
                <Link to={'/dsa-creation'}><Button color="success" style={{ float: 'right' }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create DSA</Button></Link>
                <Button style={downloadDSA} outline color="success" size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download DSA List</Button>
                {(this.state.userRole.findIndex(e => e === "Admin") !== -1) && (
                  <Link to={'/dsa-migration'}><Button color="success" style={{ float: 'right', marginRight: "8px" }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>DSA Migration</Button></Link>
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
                          <Link to={'/dsa-detail/' + list._id}>
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
