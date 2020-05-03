import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import ReactExport from 'react-data-export';
import './boqtssr.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class ListBoqDelta extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Tssr_All : [],
        prevPage : 0,
        activePage : 1,
        totalData : 0,
        perPage : 10,
        userRole : JSON.parse(localStorage.getItem('user_Roles')),
    };
    this.handlePageChange = this.handlePageChange.bind(this);
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

  getListBOQ(){
    const page = this.state.activePage;
    axios.get(API_URL +'/boq_tech_sorted?where={"deleted" : 0, "delta_rev" : {"$exists" : 1}}&max_results='+this.state.perPage+'&page='+page, {
        headers : {'Content-Type':'application/json'},
        auth: {
            username: usernamePhilApi,
            password: passwordPhilApi
        },
    })
    .then(res => {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({ Tssr_All : items, totalData : totalData, prevPage : this.state.activePage});
      })
  }
  componentDidMount(){
    this.getListBOQ();
  }

  componentDidUpdate(){
    if(this.state.prevPage !== this.state.activePage){
      this.getListBOQ();
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  render() {
    
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
          {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Engineering') ? (
              <React.Fragment>
                <span>List TSSR BOQ (Delta)</span>
              </React.Fragment>
          ):(<span>List TSSR BOQ (Delta)</span>)}
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                        <th>TSSR BOQ Document</th>
                        <th>Project</th>
                        <th style={{'width' : '200px', textAlign : 'center'}}>Tech BOQ ref.</th>
                        <th style={{textAlign : 'center'}}>Status</th>
                        <th style={{'width' : '300px', textAlign : 'center'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.Tssr_All.map((tssr,i) =>
                        <tr key={tssr._id}>
                            <td style={{verticalAlign : 'middle'}}>{"DELTA-"+tssr.no_boq_tech}</td>
                            <td style={{verticalAlign : 'middle'}}>{tssr.project_name}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{tssr.no_boq_tech}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                            {tssr.delta_rev === "PA" || tssr.delta_rev === "R" ? (
                                <span className="boq-tech-status-PA">{tssr.delta_rev}</span>
                              ) : tssr.delta_rev === "WA" ? (
                                <span className="boq-tech-status-PA">{tssr.delta_rev}</span>
                              ) : (
                                <span className="boq-tech-status-A">{tssr.delta_rev}</span>
                              )}
                            </td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Engineering') ? (
                                  <Link to={'/Approval/Tssr/Delta/'+tssr._id}>
                                    <Button color="primary" size="sm" style={{marginRight : '10px'}}> <i className="fa fa-info-circle" aria-hidden="true">&nbsp;</i> Detail</Button>
                                  </Link>
                                ) : (<React.Fragment></React.Fragment>)}
                            </td>
                        </tr>
                    )}
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

export default ListBoqDelta;
