import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './boqTechnical.css';
import {connect} from 'react-redux';
import debounce from 'lodash.debounce';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class ListTechnical extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        Tech_All : [],
        prevPage : 0,
        activePage : 1,
        totalData : 0,
        perPage : 10,
        filter_list : new Array(8).fill(null),
        filter_createdBy : [],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
  }

  numberToAlphabet(number){
    const num = Number(number)+1
    if(num > 26){
      let mod = (num%26 + 9).toString(36).toUpperCase();
      return 'Z'+mod;
    }else{
      return (num + 9).toString(36).toUpperCase();
    }
  }

  componentDidMount(){

  }

  // componentDidUpdate(){
  //   if(this.state.prevPage !== this.state.activePage){
  //     this.getListBOQ();
  //   }
  // }

  handlePageChange(pageNumber) {

  }

  handleFilterList(e){
    const index = e.target.name;
    let value = e.target.value;
    if(value !== null && value.length === 0){
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter}, () => {
      this.onChangeDebounced();
    });
  }

  onChangeDebounced(e) {
    this.getListBOQ();
  }

  compareDate(input){
    const dateIn = input+' GMT+0000';
    const date = new Date(dateIn);
    const DateNow = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    const NowDate = new Date();
    const now_date = NowDate.getFullYear()+"/"+(NowDate.getMonth()+1)+"/"+NowDate.getDate();
    return DateNow;
  }

  render() {
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <React.Fragment>
              <span style={{marginTop:'8px'}}>Technical BOQ List</span>
            </React.Fragment>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <Table hover bordered striped responsive size="sm">
              <thead>
                  <tr>
                    <th>Technical BOQ Document</th>
                    <th>Project</th>
                    <th>Ver.</th>
                    <th style={{'width' : '150px', textAlign : 'center'}}>Status</th>
                    <th style={{'width' : '225px', textAlign : 'center'}}>Action</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="controls">
                        <InputGroup className="input-prepend">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Search" name={1} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[1]}/>
                        </InputGroup>
                      </div>
                    </td>
                    <td>
                      <div className="controls">
                        <InputGroup className="input-prepend">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Search" name={2} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[2]}/>
                        </InputGroup>
                      </div>
                    </td>
                    <td style={{width:'125px'}}>
                      <div className="controls">
                        <InputGroup className="input-prepend">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Search" name={4} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[4]}/>
                        </InputGroup>
                      </div>
                    </td>
                    <td>
                      <div className="controls">
                        <InputGroup className="input-prepend">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Search" name={5} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[5]}/>
                        </InputGroup>
                      </div>
                    </td>
                    <td>
                    </td>
                  </tr>
              </thead>
              <tbody>
                <tr>
                    <td style={{verticalAlign : 'middle'}}>TECBOQ-200120-0001</td>
                    <td style={{verticalAlign : 'middle'}}>LTE 2020</td>
                    <td style={{verticalAlign : 'middle'}}>0</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <span className="boq-tech-status-A">A</span>
                    </td>
                    <td style={{verticalAlign : 'middle'}}>
                      <Link to={'/detail-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="info" size="sm">Detail</Button>
                      </Link>
                      <Link to={'/approval-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="success" size="sm" style={{marginLeft : '10px'}}>Approval</Button>
                      </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign : 'middle'}}>TECBOQ-200120-0002</td>
                    <td style={{verticalAlign : 'middle'}}>LTE 2020</td>
                    <td style={{verticalAlign : 'middle'}}>0</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <span className="boq-tech-status-WA">WA</span>
                    </td>
                    <td style={{verticalAlign : 'middle'}}>
                      <Link to={'/detail-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="info" size="sm">Detail</Button>
                      </Link>
                      <Link to={'/approval-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="success" size="sm" style={{marginLeft : '10px'}}>Approval</Button>
                      </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign : 'middle'}}>TECBOQ-200120-0003</td>
                    <td style={{verticalAlign : 'middle'}}>LTE 2020</td>
                    <td style={{verticalAlign : 'middle'}}>0</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <span className="boq-tech-status-PA">R</span>
                    </td>
                    <td style={{verticalAlign : 'middle'}}>
                      <Link to={'/detail-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="info" size="sm">Detail</Button>
                      </Link>
                      <Link to={'/approval-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="success" size="sm" style={{marginLeft : '10px'}}>Approval</Button>
                      </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign : 'middle'}}>TECBOQ-200120-0004</td>
                    <td style={{verticalAlign : 'middle'}}>LTE 2020</td>
                    <td style={{verticalAlign : 'middle'}}>0</td>
                    <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                      <span className="boq-tech-status-PA">PA</span>
                    </td>
                    <td style={{verticalAlign : 'middle'}}>
                      <Link to={'/detail-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="info" size="sm">Detail</Button>
                      </Link>
                      <Link to={'/approval-technical/'+'1'}>
                        <Button style={{width: "90px"}} outline color="success" size="sm" style={{marginLeft : '10px'}}>Approval</Button>
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

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(ListTechnical);
