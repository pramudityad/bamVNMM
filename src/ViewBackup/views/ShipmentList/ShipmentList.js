import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table, FormGroup, Label } from 'reactstrap';
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



const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" />
);

class ShipmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      shipment_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      filter_list : new Array(14).fill(""),
      mr_all : [],
      action_status : null,
      action_message : "",
      mr_checked : new Map(),
      mr_data_selected : [],
      shipment_detail : {},
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.getShipmentList = this.getShipmentList.bind(this);
    this.proceedShipment = this.proceedShipment.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeShipmentDetail = this.handleChangeShipmentDetail.bind(this);
    this.getShipmentDetail = this.getShipmentDetail.bind(this);
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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE+url, {
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

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(process.env.REACT_APP_API_URL_NODE+url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err.response);
      return respond;
    }
  }

  getShipmentList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    this.getDataFromAPINODE('/matreqShipment?&lmt='+maxPage+'&pg='+page).then(res => {
      if(res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({shipment_list : items, totalData: totalData});
      }
    })
  }

  getShipmentDetail(e){
    this.setState({shipment_detail : {}})
    if(e !== undefined){
      this.getDataFromAPINODE('/matreqShipment/'+e.target.value).then(res => {
        if(res.data !== undefined) {
          this.setState({shipment_detail : res.data.data})
        }
      })
    }
  }

  numToSSColumn(num){
    var s = '', t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t)/26 | 0;
    }
    return s || undefined;
  }

  async proceedShipment(e) {
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const id_doc = e.currentTarget.id;
    const inputanDetailShipment = this.state.shipment_detail;
    const dataMRSelected = this.state.mr_data_selected;
    let list_mr_shipment = [];
    for(let i = 0; i < dataMRSelected.length; i++){
      list_mr_shipment.push({"mrId": dataMRSelected[i].mr_id});
    }
    const dataShipment = {
      "mrList" : list_mr_shipment,
      "shipmentNumber" : inputanDetailShipment.shipment_number,
      "dspData": {
      	  "dsp_transporter": inputanDetailShipment.transporter,
          "dsp_name": inputanDetailShipment.driver_name,
          "dsp_phone": inputanDetailShipment.driver_phone_number,
          "dsp_truck": inputanDetailShipment.truck_number,
          "dsp_truck_type": inputanDetailShipment.truck_type
      }
    }
    let res = await this.patchDatatoAPINODE('/matreq/loadingProcess', dataShipment);
    if(res !== undefined) {
      if(res.data !== undefined) {
        this.setState({action_status : "success"}, () => {
          setTimeout(function(){ window.location.reload(); }, 2000);
        });
      }else{
        if(res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined){
          if(res.response.data.error.message !== undefined){
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          }else{
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        }else{
          this.setState({ action_status: 'failed' });
        }
      }
    }else{
      this.setState({ action_status: 'failed' });
    }
  }

  componentDidMount() {
    this.getShipmentList();
    document.title = 'Shipment | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getShipmentList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if(value !== "" && value.length === 0) {
      value = "";
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter, activePage: 1}, () => {
      this.onChangeDebounced(e);
    })
  }

  onChangeDebounced(e) {
    this.getShipmentList();
  }

  handleChangeShipmentDetail(e){
    const name = e.target.name;
    let value = e.target.value;
    let dataShipment = this.state.shipment_detail;
    if(value !== (null && undefined)){
      value = value.toString();
    }
    dataShipment[name.toString()] = value;
    this.setState({shipment_detail : dataShipment});
  }

  handleChangeChecklist(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const dataMR = this.state.shipment_list;
    let MRSelected = this.state.mr_data_selected;
    if (isChecked === true) {
      const getMR = dataMR.find(mr => mr._id === item);
      MRSelected.push(getMR);
    } else {
      MRSelected = MRSelected.filter(function (mr) {
        return mr._id !== item;
      });
    }
    this.setState({ mr_data_selected: MRSelected });
    this.setState(prevState => ({ mr_checked: prevState.mr_checked.set(item, isChecked) }));
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    function AlertProcess(props){
      const alert = props.alertAct;
      const message = props.messageAct;
      if(alert === 'failed'){
        return (
          <div className="alert alert-danger" role="alert">
            {message.length !== 0 ? message : 'Sorry, there was an error when we tried to save it, please reload your page and try again'}
          </div>
        )
      } else{
        if(alert === 'success'){
          return (
            <div className="alert alert-success" role="alert">
              {message}
              Your action was success, please reload your page
            </div>
          )
        } else{
          return (
            <div></div>
          )
        }
      }
    }

    const downloadMR = {
      float: 'right'
    }

    const tableWidth = {
      width: '150px'
    }

    return (
      <div className="animated fadeIn">
        <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                Shipment Detail {this.state.shipment_detail.no_shipment !== undefined ? "("+this.state.shipment_detail.no_shipment+")" : "" }
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="6" lg="6" md="6">
                    <FormGroup row size="sm">
                      <Col md="2">
                        <Label htmlFor="shipment_number" >Shipment Number</Label>
                      </Col>
                      <Col md="8">
                        <Input type="text" name="0" placeholder="" name="shipment_number" value={this.state.shipment_detail.shipment_id} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="transporter" >Transporter</Label>
                      </Col>
                      <Col md="8">
                        <Input type="text" name="1" placeholder="" name="transporter" value={this.state.shipment_detail.transporter} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="truck_type" >Truck Type</Label>
                      </Col>
                      <Col md="8">
                        <Input type="text" name="3" placeholder="" name="truck_type" value={this.state.shipment_detail.truck_type} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs="6" lg="6" md="6">
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="truck_number" >Truck No</Label>
                      </Col>
                      <Col md="8">
                        <Input type="text" name="2" placeholder="" name="truck_number" value={this.state.shipment_detail.truck_no} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="driver_name" >Driver Name</Label>
                      </Col>
                      <Col md="8">
                        <Input type="text" name="4" placeholder="" name="driver_name" value={this.state.shipment_detail.driver} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="driver_phone_number" >Driver Phone</Label>
                      </Col>
                      <Col md="8">
                        <Input type="text" name="5" placeholder="" name="driver_phone_number" value={this.state.shipment_detail.driver_phone} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.shipment_detail.mr_list !== undefined && (
                  <Row>
                    <Col xs="6" lg="6">
                      <h6></h6>
                      <Table responsive striped bordered size="sm">
                        <thead>
                          <tr>
                            <th>
                              MR ID
                            </th>
                            <th>
                              Total Box
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.shipment_detail.mr_list.map(mr =>
                            <tr>
                              <td style={{textAlign : 'left'}}>
                                {mr.mr_id}
                              </td>
                              <td>
                                {mr.total_boxes}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{lineHeight :'2'}}>
                  <i className="fa fa-align-justify" style={{marginRight: "8px"}}></i> Shipment List
                </span>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Shipment Number</th>
                      <th>Transporter</th>
                      <th>Plat Nomer</th>
                      <th>Driver</th>
                      <th>Driver Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.shipment_list.length === 0 && (
                      <tr>
                        <td colSpan="6">No Data Available</td>
                      </tr>
                    )}
                    {this.state.shipment_list.map((list, i) =>
                      <tr key={list._id}>
                        <td>
                          <Button size="sm" color="info" onClick={this.getShipmentDetail} value={list._id}>
                            Detail
                          </Button>
                        </td>
                        <td>{list.shipment_id}</td>
                        <td>{list.transporter}</td>
                        <td>{list.truck_no}</td>
                        <td>{list.driver}</td>
                        <td>{list.driver_phone}</td>
                      </tr>
                    )}
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
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(ShipmentList);
