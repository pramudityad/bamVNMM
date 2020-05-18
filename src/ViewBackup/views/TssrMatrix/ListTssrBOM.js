import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import ReactExport from 'react-data-export';
import debounce from 'lodash.debounce';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const process.env.REACT_APP_API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class ListTSSRBOM extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Tssr_All : [],
        prevPage : 0,
        activePage : 1,
        totalData : 0,
        perPage : 10,
        filter_list : new Array(8).fill(null),
        filter_createdBy : [],
        list_tech_tssr : [],
        userRole : JSON.parse(localStorage.getItem('user_Roles')),
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.handleFilterListName = this.handleFilterListName.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.onChangeDebouncedName = debounce(this.onChangeDebouncedName, 1000);
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Get Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Get Data", err);
      return respond;
    }
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
    let filter_no_tssr = this.state.filter_list[1] === null ? '"no_tssr_boq_site":{"$exists" : 1}' : '"no_tssr_boq_site":{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_project = this.state.filter_list[2] === null ? '"project_name":{"$exists" : 1}' : '"project_name":{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_no_tech = this.state.filter_list[4] === null ? '"no_boq_tech":{"$exists" : 1}' : '"no_boq_tech":{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let filter_site_id = this.state.filter_list[5] === null ? '"site_id":{"$exists" : 1}' : '"site_id":{"$regex" : "'+this.state.filter_list[5]+'", "$options" : "i"}';
    let filter_site_name = this.state.filter_list[6] === null ? '"site_name":{"$exists" : 1}' : '"site_name":{"$regex" : "'+this.state.filter_list[6]+'", "$options" : "i"}';
    let filter_created_by = '"created_by":{"$exists" : 1}';
    if(this.state.filter_list[3] !== null){
      if(this.state.filter_createdBy.length !== 0){
        let arrayIdUser = '"'+this.state.filter_createdBy.join('", "')+'"';
        filter_created_by = '"created_by" : {"$in" : ['+arrayIdUser+']}';
      }else{
        filter_created_by = '"created_by":null';
      }
    }
    let where = 'where={"deleted" : 0, '+filter_no_tech+', '+filter_project+', '+filter_no_tssr+', '+filter_site_id+', '+filter_site_name+'}';
    axios.get(process.env.REACT_APP_API_URL +'/tssr_boq_matrix_sites_op?'+where+'&max_results='+this.state.perPage+'&page='+page, {
        headers : {'Content-Type':'application/json'},
        auth: {
            username: usernamePhilApi,
            password: passwordPhilApi
        },
    })
    .then(res => {
      console.log("res", res);
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({ Tssr_All : items, totalData : totalData, prevPage : this.state.activePage});
      })
  }
  
  getListUser(){
    if(this.state.filter_list[3] !== null){
      console.log(this.state.filter_list[3]);
      let filter_getName = this.state.filter_list[3] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
      let where = 'where={"$or" : [{"email" : '+filter_getName+'}, {"username" : '+filter_getName+'}] }';
      axios.get(process.env.REACT_APP_API_URL +'/user_all?'+where, {
        headers : {'Content-Type':'application/json'},
        auth: {
            username: usernamePhilApi,
            password: passwordPhilApi
        },
      })
      .then(res => {
          const items = res.data._items
          console.log(res);
          this.setState({ filter_createdBy : items.map(e => e._id)}, () => {
            this.getListBOQ();
          });
        })
    }else{
      this.setState({filter_createdBy : []}, () => {
        this.getListBOQ();
      });
    }
  }

  async getListTech(array_no_tssr){
    let arrayListTSSR = [];
    for(let i = 0; i < array_no_tssr.length; i++){
      let dataTechTSSR = await this.getDatafromAPI('/tssr_boq_matrix_tech_ref?aggregate={"$no_tssr_boq" : "'+array_no_tssr[i]+'"}');
      if(dataTechTSSR === undefined){dataTechTSSR = {}; dataTechTSSR["data"] = undefined}
      if(dataTechTSSR.data !== undefined){
        console.log("dataTSSR", array_no_tssr[i])
      }
    }
    this.setState({list_tech_tssr : arrayListTSSR}, () => {
      console.log("list_tech_tssr", arrayListTSSR);
    });
  }

  componentDidMount(){
    this.getListBOQ();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getListBOQ();
    });
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
      this.getListBOQ();
    });
  }
  
  onChangeDebounced(e) {
    this.getListBOQ();
  }
  
  handleFilterListName(e){
    const index = e.target.name;
    let value = e.target.value;
    if(value !== null && value.length === 0){
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    console.log("data filter", dataFilter);
    this.setState({filter_list : dataFilter}, () => {
      this.onChangeDebouncedName();
    });
  }

  onChangeDebouncedName(e){
    this.getListUser();
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
          {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Flow-Tssr') ? (
              <React.Fragment>
                <span style={{'position':'absolute',marginTop:'8px'}}>TSSR BOM List</span>
                <div className="card-header-actions" style={{marginRight:'5px'}}>
                  <Link to='/Boq/Tssr/Upload'>
                  <Button color="success"><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; New</Button>
                  </Link>
                </div>
              </React.Fragment>
          ):(<span>TSSR BOM List</span>)}
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            {/* <div style={{float : 'right', marginBottom : '5px'}}>
              <span>Search : </span>
              <input onChange={this.handleFilterList} value={this.state.filter_list[0]} name={0}></input>
            </div> */}
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                        <th style={{'width' : '250px', textAlign : 'center'}}>TSSR BOM Document</th>
                        <th style={{'width' : '250px', textAlign : 'center'}}>Project</th>
                        <th style={{'width' : '200px', textAlign : 'center'}}>Site ID</th>
                        <th>Site Name</th>
                        <th style={{'width' : '150px', textAlign : 'center'}}>Action</th>
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
                      <td style={{width:'125px'}}>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" name={6} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[6]}/>
                          </InputGroup>
                        </div>
                      </td>
                      <td>
                      </td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.Tssr_All.map((tssr,i) =>
                        <tr key={tssr._id}>
                            <td style={{verticalAlign : 'middle'}}>{tssr.no_tssr_boq}</td>
                            <td style={{verticalAlign : 'middle'}}>{tssr.project_name}</td>
                            <td style={{verticalAlign : 'middle'}}>{tssr.site_id}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{tssr.site_name}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Flow-Tssr') ? (
                                  <Link to={'/Boq/Tssr/Site/'+tssr._id}>
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

export default ListTSSRBOM;
