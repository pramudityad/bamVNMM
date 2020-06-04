import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import { connect } from "react-redux";

class ListPRPO extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
        // bind

    }

    // function

    loopSearchBar = () => {
        let searchBar = [];
        for (let i = 0; i < 7; i++) {
          searchBar.push(
            <td>
              <div className="controls" style={{ width: '150px' }}>
                <InputGroup className="input-prepend">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                  </InputGroupAddon>
                  {/* <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[i]} name={i} size="sm" /> */}
                  <Input type="text" placeholder="Search" size="sm" />
                </InputGroup>
              </div>
            </td>
          )
        }
        return searchBar;
      }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render(){
        const downloadAssignment = {
            float: 'right',
            marginRight: '10px'
          }

        return(
            <div className="animated fadeIn">
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <span style={{ lineHeight: '2' }}>
                      <i className="fa fa-align-justify" style={{ marginRight: "8px" }}></i> PRT List
                    </span>
                    <Link to={'/prt-creation'}><Button color="success" style={{ float: 'right' }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create PRT</Button></Link>
                    <Link to={'/bulk-assignment-creation'}><Button color="success" style={{ float: 'right', marginRight: "8px" }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create PRT Bulk</Button></Link>
                    <Button style={downloadAssignment} outline color="success" size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download PRT List</Button>
                    {/* <Button style={downloadAssignment} outline color="success" onClick={this.downloadAllAssignment} size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download PRT List</Button> */}
                  </CardHeader>
                  <CardBody>
                    <Table responsive striped bordered size="sm">
                      <thead>
                        <tr>
                          <th rowSpan="2" style={{ verticalAlign: "middle" }}>Action</th>
                          <th>Assignment ID</th>
                          <th>Account Name</th>
                          <th>Project Name</th>
                          <th>Vendor Name Type</th>
                          <th>Terms of Payment</th>
                          <th>Assignment Status</th>
                          <th>Work Status</th>
                        </tr>
                        <tr>
                          {this.loopSearchBar()}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {this.state.assignment_list.length === 0 && (
                          <tr>
                            <td colSpan="10">No Data Available</td>
                          </tr>
                        )}
                        {this.state.assignment_list.map((list, i) =>
                          <tr key={list._id}>
                            <td>
                              <Link to={'/assignment-detail/' + list._id}>
                                <Button style={{ width: "90px" }} outline color="info" size="sm">Detail</Button>
                              </Link>
                            </td>
                            <td>{list.Assignment_No}</td>
                            <td>{list.Account_Name}</td>
                            <td>{list.Project}</td>
                            <td>{list.Vendor_Name}</td>
                            <td>{list.Payment_Terms}</td>
                            <td>{list.Current_Status}</td>
                            <td>{list.Work_Status}</td>
                          </tr>
                        )} */}
                      </tbody>
                    </Table>
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
      dataLogin: state.loginData,
      SidebarMinimize: state.minimizeSidebar,
    };
  };

export default connect(mapStateToProps)(ListPRPO);