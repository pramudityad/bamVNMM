import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';

const API_URL = 'http://api.smart.pdb.e-dpm.com/smartapi';
const username = 'usermitt';
const password = 'Z4icVgFQp3D1';

class MR_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mr_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      filter_list : new Array(5).fill(null),
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
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

  getMRList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_mr_id = this.state.filter_list[0] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[0]+'", "$options" : "i"}';
    let filter_cd_id = this.state.filter_list[1] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_current_status = this.state.filter_list[2] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_updated_on = this.state.filter_list[3] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
    let filter_created_on = this.state.filter_list[4] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let whereAnd = '{"mr_id": '+filter_mr_id+', "cd_id": '+filter_cd_id+', "current_status": '+filter_current_status+', "updated_on": '+filter_updated_on+', "created_on": '+filter_created_on+'}';
    this.getDataFromAPI('/mrf_sorted?where='+whereAnd+'&max_results='+maxPage+'&page='+page).then(res => {
      console.log("MRF List Sorted", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({mr_list : items, totalData: totalData});
      }
    })
  }

  componentDidMount() {
    this.getMRList();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getMRList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if(value !== null && value.length === 0) {
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter, activePage: 1}, () => {
      this.onChangeDebounced(e);
    })
  }

  onChangeDebounced(e) {
    this.getMRList();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> MR List
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered>
                  <thead>
                    <tr>
                      <th>MR ID</th>
                      <th>CD ID</th>
                      <th>Current Status</th>
                      <th>Updated On</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[0]} name={0}/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[1]} name={1}/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[2]} name={2}/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[3]} name={3}/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[4]} name={4}/>
                          </InputGroup>
                        </div>
                      </td>
                    </tr>
                    {this.state.mr_list.map((list, i) => 
                      <tr key={list._id}>
                        <td>{list.mr_id}</td>
                        <td>{list.cd_id}</td>
                        <td>{list.current_status}</td>
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

export default MR_list;