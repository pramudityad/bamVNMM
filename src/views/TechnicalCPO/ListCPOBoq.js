import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './CPOBoq.css';
import {connect} from 'react-redux';
import debounce from 'lodash.debounce';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class ListCPOBoq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      list_cpo_boq : [],
      modal_delete : false,
        Tech_All : [],
        prevPage : 1,
        activePage : 1,
        totalData : 0,
        perPage : 10,
        filter_list : new Array(8).fill(null),
        filter_createdBy : [],
        activity_list : [],
        filter_name : null,
        list_cpo_boq_filter : [],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.handleFilterListName = this.handleFilterListName.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.onChangeDebouncedName = debounce(this.onChangeDebouncedName, 1000);
    this.changeFilterName = debounce(this.changeFilterName, 1000);
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE+url, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
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

  async deleteDataFromAPINODE(url) {
    try {
      let respond = await axios.delete(API_URL_NODE+url, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
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

  numberToAlphabet(number){
    const num = Number(number)+1
    if(num > 26){
      let mod = (num%26 + 9).toString(36).toUpperCase();
      return 'Z'+mod;
    }else{
      return (num + 9).toString(36).toUpperCase();
    }
  }

  getCpoBoqList(){
    let filter_no_po = this.state.filter_name === null ? '"cpo_number":{"$exists" : 1}' : '"cpo_number":{"$regex" : "'+this.state.filter_name+'", "$options" : "i"}';
    this.getDataFromAPINODE('/cpoBoqList?srt=cpo_boq_id:-1&lmt='+this.state.perPage +
    "&pg=" + this.state.activePage+'&q={'+filter_no_po+'}').then(res => {
      if(res.data !== undefined){
        this.setState({list_cpo_boq : res.data.data, list_cpo_boq_filter : res.data.data, prevPage: this.state.activePage,
          totalData: res.data.totalResults});
      } else{
        this.setState({list_cpo_boq : [], list_cpo_boq_filter : [], prevPage: this.state.activePage,
          totalData: 0});
      }
      // console.log('totalData ', this.state.totalData)
    })
  }

  getListBOQ(){
    const page = this.state.activePage;
    let filter_no_tech = this.state.filter_list[1] === null ? '"no_boq_tech":{"$exists" : 1}' : '"no_boq_tech":{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_project = this.state.filter_list[2] === null ? '"project_name":{"$exists" : 1}' : '"project_name":{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_ver = this.state.filter_list[4] === null ? '"version":{"$exists" : 1}' : '"version":{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let filter_status = this.state.filter_list[5] === null ? '"rev":{"$exists" : 1}' : '"rev":{"$regex" : "'+this.state.filter_list[5]+'", "$options" : "i"}';
    let filter_project_note = this.state.filter_list[7] === null ? '' : ', "note_6":{"$regex" : "'+this.state.filter_list[7]+'", "$options" : "i"}';
    let filter_created_by = '"created_by":{"$exists" : 1}';
    if(this.state.filter_list[3] !== null){
      if(this.state.filter_createdBy.length !== 0){
        let arrayIdUser = '"'+this.state.filter_createdBy.join('", "')+'"';
        filter_created_by = '"created_by" : {"$in" : ['+arrayIdUser+']}';
      }else{
        filter_created_by = '"created_by":null';
      }
    }
    let where = 'where={"deleted" : 0, '+filter_no_tech+', '+filter_project+', '+filter_ver+', '+filter_status+', '+filter_created_by+''+filter_project_note+'}';
    axios.get(API_URL +'/boq_tech_audit?'+where+'&max_results='+this.state.perPage+'&page='+page+'&embedded={"created_by" :1}', {
        headers : {'Content-Type':'application/json'},
        auth: {
            username: usernamePhilApi,
            password: passwordPhilApi
        },
    })
    .then(res => {
        const items = res.data._items
        console.log(res);
        const totalData = res.data._meta;
        this.setState({ Tech_All : items, totalData : totalData, prevPage : this.state.activePage});
      })
  }

  getListUser(){
    if(this.state.filter_list[3] !== null){
      console.log(this.state.filter_list[3]);
      let filter_getName = this.state.filter_list[3] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
      let where = 'where={"$or" : [{"email" : '+filter_getName+'}, {"username" : '+filter_getName+'}] }';
      axios.get(API_URL +'/user_all?'+where, {
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

  componentDidMount(){
    this.getCpoBoqList();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getCpoBoqList();
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
    console.log("data filter", dataFilter);
    this.setState({filter_list : dataFilter}, () => {
      this.onChangeDebounced();
    });
  }

  onChangeDebounced(e) {
    this.getCpoBoqList();
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

  deleteTechBoq(e){
    const _id_tech = e.currentTarget.value;
    const delTech = this.deleteDataFromAPINODE('/techBoq/deleteOneTechBoq/'+_id_tech);
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if (value.length === 0) {
      value = null;
    }
    this.setState({ filter_name: value }, () => {
      this.onChangeDebounced(value);
    });
  }

  changeFilterName(value) {
    const dataCPOBOQ = this.state.list_cpo_boq;
    if(value !== null){
      const regexValue = '/'+value+'/g';
      const globalRegex = RegExp(value, 'gi');
      const dataFilter = dataCPOBOQ.filter(cpo => globalRegex.test(cpo.cpo_number));
      this.setState({list_cpo_boq_filter : dataFilter})
    }else{
      this.setState({list_cpo_boq_filter : this.state.list_cpo_boq})
    }
  }

  render() {
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <React.Fragment>
              <span style={{marginTop:'8px'}}>CPO BOQ List</span>
              {this.state.userRole.includes('Flow-PublicInternal') !== true ? (
                <div className="card-header-actions" style={{marginRight:'5px'}}>
                    <Link to='/list-cpo-boq/creation'>
                    <Button className="btn-success"><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; New</Button>
                    </Link>
                </div>
                ) : ""}
            </React.Fragment>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <Row>
              <Col>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                    <input className="search-box-material" type="text" name='filter' placeholder="Search CPO" onChange={this.handleChangeFilter} value={this.state.filter_name} />
                  </div>
                </div>
              </Col>
            </Row>
            <Table hover bordered striped responsive size="sm">
              <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>CPO BOQ</th>
                    <th>Creator</th>
                    <th style={{'width' : '225px', textAlign : 'center'}}>Action</th>
                  </tr>
              </thead>
              <tbody>
                    {this.state.list_cpo_boq_filter.sort((a, b) => b.created_on - a.created_on).map((boq,i) =>
                        <tr key={boq._id}>
                            <td style={{verticalAlign : 'middle'}}>{boq.cpo_number}</td>
                            <td style={{verticalAlign : 'middle'}}>{boq.cpo_boq_id}</td>
                            <td style={{verticalAlign : 'middle'}}>{boq.creator[0].email}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                              <Link to={'/list-cpo-boq/detail/'+boq.cpo_number}>
                                <Button color="primary" size="sm" style={{marginRight : '10px'}}> <i className="fa fa-info-circle" aria-hidden="true">&nbsp;</i> Detail</Button>
                              </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <nav>
                <div>
                <div style={{ margin: "8px 0px" }}>
                  <small>Showing {this.state.perPage} entries from {this.state.totalData} data</small>
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

export default connect(mapStateToProps)(ListCPOBoq);
