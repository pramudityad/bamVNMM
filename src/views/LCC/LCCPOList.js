import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { getDatafromAPINODE } from "../../helper/asyncFunction";
const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const arrayFilter = ["cust_del", "no_lcc", "no_po_dsa", "no_po_dsa_system", "status", "vendor_name"];

class LCCList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dsa_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list : [],
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getLCCList = this.getLCCList.bind(this);
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

  getLCCList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    for(let i = 0; i < arrayFilter.length; i++){
      this.state.filter_list[arrayFilter[i]] !== null && this.state.filter_list[arrayFilter[i]] !== undefined &&
        filter_array.push('"'+arrayFilter[i]+'":{"$regex" : "' +   this.state.filter_list[arrayFilter[i]] + '", "$options" : "i"}');
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
      getDatafromAPINODE('/poDsa?srt=_id:-1&q='+whereAnd+'&lmt=' + maxPage + '&pg=' + page, this.props.dataLogin.token).then(res => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ dsa_list: items, totalData: totalData });
      }
    })
  }

  componentDidMount() {
    this.getLCCList();
    document.title = 'LCC List | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getLCCList();
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
    this.getLCCList();
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
                  <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> LCC List
                </span>
                <Link to={'/lcc-creation'}><Button color="success" style={{ float: 'right' }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create LCC</Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th style={{ verticalAlign: "middle" }}>Action</th>
                      <th>LCC ID</th>
                      <th>PO Cust Desc</th>
                      <th>POS System Number</th>
                      <th>Status</th>
                      <th>Vendor Name</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.dsa_list !== undefined && this.state.dsa_list.length === 0 && (
                      <tr>
                        <td colSpan="6">No Data Available</td>
                      </tr>
                    )}
                    {this.state.dsa_list !== undefined && this.state.dsa_list.map((list, i) =>
                     <React.Fragment key={list._id + "frag"}>
                      <tr>
                        <td>
                          <Link to={'/lcc-detail/' + list._id}>
                            <Button style={{ width: "90px" }} outline color="info" size="sm">Detail</Button>
                          </Link>
                        </td>
                        <td>{list.no_lcc}</td>
                        <td>{list.no_po_dsa}</td>
                        <td>{list.no_po_dsa_system}</td>
                        <td>{list.status}</td>
                        <td>{list.vendor_name}</td>
                      </tr>
                      <tr>
                        <td>CD ID : </td>
                        <td colSpan="6">{list.cust_del != undefined ? list.cust_del.map(cd => cd.cd_id).join(", ") : null}</td>
                      </tr>
                      </React.Fragment>
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

export default connect(mapStateToProps)(LCCList);
