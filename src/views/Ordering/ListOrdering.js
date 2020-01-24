import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
// import ReactExport from 'react-data-export';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class ListOrdering extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : JSON.parse(localStorage.getItem('user_Roles')),
        Ordering_List : [],
        prevPage : 0,
        activePage : 1,
        totalData : 0,
        perPage : 10,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getListOrdering();
    });
  }

  render() {
    // if(this.state.prevPage !== this.state.activePage){
    //     this.getListOrdering();
    // }
    console.log("this.state.Ordering_List", this.state.Ordering_List);
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
              <span style={{'position':'absolute',marginTop:'8px'}}>List Ordering</span>
              <div className="card-header-actions" style={{marginRight:'5px'}}>
                <Link to='/new-ordering'>
                <Button className="btn-success"><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; New</Button>
                </Link>
              </div>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <Table hover bordered striped responsive size="sm">
              <thead>
                  <tr>
                      <th style={{textAlign : 'center'}}>Commercial BOQ</th>
                      <th>Order ID</th>
                      <th style={{'width' : '250px', textAlign : 'center'}}>Action</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>COMBOQ-200121-0002</td>
                    <td style={{verticalAlign : 'middle'}}>ORD-200124-0001</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <Link to={'/ordering-detail/'+'1'}>
                          <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                          </Button>
                      </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>COMBOQ-200121-0002</td>
                    <td style={{verticalAlign : 'middle'}}>ORD-200124-0002</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <Link to={'/ordering-detail/'+'1'}>
                          <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                          </Button>
                      </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>COMBOQ-200121-0001</td>
                    <td style={{verticalAlign : 'middle'}}>ORD-200124-0003</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <Link to={'/ordering-detail/'+'1'}>
                          <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                          </Button>
                      </Link>
                    </td>
                </tr>
              </tbody>
            </Table>
            <nav>
                <div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.perPage}
                    totalItemsCount={this.state.totalData.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </div>
            </nav>
          </CardBody>
        </Card>
        </Col>
        </Row>
        <div>
        </div>
      </div>

    );
  }
}

export default ListOrdering;
