import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';

const API_URL_tsel = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const username_tsel = 'adminbamidsuper';
const password_tsel = 'F760qbAg2sml';

class AssignmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getAssignmentList = this.getAssignmentList.bind(this);
    this.downloadASGList = this.downloadASGList.bind(this);
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

  getAssignmentList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    this.getDataFromAPI('/asp_assignment_sorted?&max_results='+maxPage+'&page='+page).then(res => {
      if(res.data !== undefined) {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({assignment_list : items, totalData: totalData});
      }
    })
  }

  componentDidMount() {
    this.getAssignmentList();
    document.title = 'Assignment List | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getAssignmentList();
    });
  }

  async downloadASGList() {
    let listASGAll = [];
    let getASG = await this.getDataFromAPI('/asp_assignment_sorted_non_page');
    if(getASG.data !== undefined){
      listASGAll = getASG.data._items;
    }
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = ["Assignment ID", "Account Name", " Project Name", " SOW Type", " NW  NW Activity Terms of Payment", " Item Status Work Status"];
    ws.addRow(headerRow);

    for(let i = 0; i < listASGAll.length; i++){
      let list = listASGAll[i];
      ws.addRow([list.Assignment_No, list.Account_Name, list.Project, list.SOW_Type, list.NW, list.NW_Activity, list.Payment_Terms, list.Item_Status, list.Work_Status])
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Assignment List.xlsx');
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const downloadAssignment = {
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
                  <i className="fa fa-align-justify" style={{marginRight: "8px"}}></i> Assignment List
                </span>
                <Link to={'/assignment-creation'}><Button color="success" style={{float : 'right'}} size="sm"><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i>Create Assignment</Button></Link>
                <Link to={'/bulk-assignment-creation'}><Button color="success" style={{float : 'right', marginRight: "8px"}} size="sm"><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i>Create Assignment Bulk</Button></Link>
                <Button style={downloadAssignment} outline color="success" onClick={this.downloadASGList} size="sm"><i className="fa fa-download" style={{marginRight: "8px"}}></i>Download Assignment List</Button>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{verticalAlign : "middle"}}>Action</th>
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
                          <Link to={'/assignment-detail/'+list._id}>
                            <Button style={{width: "90px"}} outline color="info" size="sm">Detail</Button>
                          </Link>
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

export default connect(mapStateToProps)(AssignmentList);
