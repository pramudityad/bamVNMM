import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './boqCommercial.css';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import debounce from 'lodash.debounce';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

//const process.env.REACT_APP_API_URL = 'http://localhost:5000/smartapi';

//



const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);



class ListCommercial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      list_comm_boq : [],
        action_status : null,
        action_message : "",
        boq_comm_all : [],
        list_technical : [],
        BOQ_all : [],
        prevPage : 1,
        activePage : 1,
        totalData : 0,
        perPage : 10,
        modal_loading : false,
        modal_delete : false,
        modal_delete_noBOQ : null,
        filter_list : new Array(8).fill(null),
        filter_createdBy : [],
        userRole : JSON.parse(localStorage.getItem('user_Roles')),

    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.deleteBOQCOMM = this.deleteBOQCOMM.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
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

  toggleLoading(){
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  toggleDelete(e){
    let value = null;
    this.setState(prevState => ({
      modal_delete: !prevState.modal_delete
    }));
    if(e !== undefined){
      if(e.currentTarget.value === undefined){
        value = e.target.value;
      }else{
        value = e.currentTarget.value;
      }
    }
    this.setState({modal_delete_noBOQ : value})
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL + url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_usernamePhilApi,
          password: process.env.REACT_APP_passwordPhilApi
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Get Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async patchDatatoAPI(url, data, _etag){
    try {
      let respond = await axios.patch(process.env.REACT_APP_API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_usernamePhilApi,
          password: process.env.REACT_APP_passwordPhilApi
        },
        headers : {
          "If-Match" : _etag
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
      console.log("respond Patch data", err);
      return respond;
    }
  }

  getListBoQ(){
    const page = this.state.activePage;
    let filter_no_tech = this.state.filter_list[1] === null ? '"no_boq_tech":{"$exists" : 1}' : '"no_boq_tech":{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_no_comm = this.state.filter_list[2] === null ? '"no_boq_comm":{"$exists" : 1}' : '"no_boq_comm":{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_project = this.state.filter_list[3] === null ? '"project_name":{"$exists" : 1}' : '"project_name":{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
    let filter_po = this.state.filter_list[6] === null ? '"po_number":{"$exists" : 1}' : '"po_number":{"$regex" : "'+this.state.filter_list[6]+'", "$options" : "i"}';
    let filter_ver = this.state.filter_list[7] === null ? '"version":{"$exists" : 1}' : '"version":{"$regex" : "'+this.state.filter_list[5]+'", "$options" : "i"}';
    let filter_created_by = '"created_by":{"$exists" : 1}';
    if(this.state.filter_list[4] !== null){
      if(this.state.filter_createdBy.length !== 0){
        let arrayIdUser = '"'+this.state.filter_createdBy.join('", "')+'"';
        filter_created_by = '"created_by" : {"$in" : ['+arrayIdUser+']}';
      }else{
        filter_created_by = '"created_by":null';
      }
    }
    let where = 'where={"deleted" : 0, '+filter_no_tech+', '+filter_project+', '+filter_ver+', '+filter_po+', '+filter_no_comm+', '+filter_created_by+'}';
    this.getDatafromAPI('/boq_comm_audit?'+where+'&max_results='+this.state.perPage+'&page='+page+'&embedded={"created_by" : 1}').then(res => {
        if(res !== undefined){
            this.setState({boq_comm_all : res.data._items, totalData : res.data._meta}, () => {
              this.getTechnicalData(res.data._items.map(e => e.id_boq_tech_doc));
            })
        }
    })
  }

  getListUser(){
    if(this.state.filter_list[4] !== null){
      console.log(this.state.filter_list[4]);
      let filter_getName = this.state.filter_list[4] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
      let where = 'where={"$or" : [{"email" : '+filter_getName+'}, {"username" : '+filter_getName+'}] }';
      this.getDatafromAPI('/user_all?'+where).then(res => {
          const items = res.data._items;
          this.setState({ filter_createdBy : items.map(e => e._id)}, () => {
            this.getListBoQ();
          });
        });
    }else{
      this.setState({filter_createdBy : []}, () => {
        this.getListBoQ();
      });
    }
  }

  getTechnicalData(array_id_tech){
    let arrayIdTech = '"'+array_id_tech.join('", "')+'"';
    arrayIdTech = arrayIdTech.replace("&", "%26");
    let where_id_tech = 'where={"id_boq_tech" : {"$in" : ['+arrayIdTech+']}}';
    this.getDatafromAPI('/boq_tech_op?projection={"note_6" : 1}'+'&'+where_id_tech).then(res => {
      if(res !== undefined){
        this.setState({list_technical : res.data._items})
      }
    })
  }

  componentDidMount(){
    this.getCommBoqList();
  }

  getCommBoqList(){
    let filter_no_comm = this.state.filter_list[2] === null ? '"no_comm_boq":{"$exists" : 1}' : '"no_comm_boq":{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_project = this.state.filter_list[3] === null ? '"project_name":{"$exists" : 1}' : '"project_name":{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
    let filter_ver = this.state.filter_list[4] === null ? '"version":{"$exists" : 1}' : '"version":{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let where = '&q={'+filter_no_comm+', '+filter_project+', '+filter_ver+'}';
    this.getDataFromAPINODE('/commBoq?srt=_id:-1'+where).then(res => {
      if(res.data !== undefined){
        this.setState({list_comm_boq : res.data.data});
      }
    })
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber}, () => {
      this.getListBoQ();
    });
  }

  deleteBOQCOMM = async () => {
    this.toggleDelete();
    this.toggleLoading();
    const no_com = this.state.modal_delete_noBOQ;
    let indexCOM = this.state.boq_comm_all.find(e => e.no_boq_comm === no_com);
    const projection = 'projection={"_etag" : 1}';
    let getItemComm = await this.getDatafromAPI('/boq_comm_items_non_page?where={"id_boq_comm_doc" : "'+indexCOM._id+'"}'+'&'+projection);
    let dataItemsComm = [];
    if(getItemComm !== undefined){
      if(getItemComm.data !== undefined){
        dataItemsComm = getItemComm.data._items;
      }
    }
    if(indexCOM !== undefined){
      const dataTech = await this.getDatafromAPI('/boq_tech_op/'+indexCOM.id_boq_tech_doc);
      if(dataTech !== undefined){
        if(dataTech.data !== undefined){
          const updateTech = {
            "list_of_id_boq_comm" : dataTech.data.list_of_id_boq_comm.filter(id => id !== indexCOM._id)
          }
          const patchDataTech = await this.patchDatatoAPI('/boq_tech_op/'+dataTech.data._id, updateTech, dataTech.data._etag);
          if(patchDataTech !== undefined){
            if(patchDataTech.data !== undefined){
              const updateComm = {
                "deleted" : 1
              }
              for(let x = 0; x < dataItemsComm.length; x++){
                const itemsUpdate = await this.patchDatatoAPI('/boq_comm_items_op/'+dataItemsComm[x]._id, updateComm, dataItemsComm[x]._etag);
              }
              const patchComm = await this.patchDatatoAPI('/boq_comm_op/'+indexCOM._id, updateComm, indexCOM._etag);
                if(patchComm !== undefined){
                  if(patchComm.data !== undefined){
                    this.setState({action_status : 'success', action_message : 'Commercial BOQ '+no_com+' has been deleted'})
                    this.toggleLoading();
                    setTimeout(function(){ window.location.reload(); }, 1500);
                  }
                }else{
                  this.setState({action_status : 'failed', action_message : ''})
                  this.toggleLoading();
                }
            }
          }else{
            this.setState({action_status : 'failed', action_message : ''})
            this.toggleLoading();
          }
        }else{
          this.setState({action_status : 'failed', action_message : ''})
          this.toggleLoading();
        }
      }else{
        this.setState({action_status : 'failed', action_message : ''})
        this.toggleLoading();
      }
    }else{
      this.setState({action_status : 'failed', action_message : ''})
      this.toggleLoading();
    }
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
    this.getCommBoqList();
  }

  render() {

    function AlertProcess(props){
      const alert = props.alertAct;
      const message = props.messageAct;
      if(alert == 'failed'){
        return (
          <div className="alert alert-danger" role="alert">
            {message}
            <br></br>
            Sorry, there was an error when we tried to save it, please reload your page and try again try again
          </div>
        )
      }else{
        if(alert == 'success'){
          return (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )
        }else{
          return (
            <div></div>
          )
        }
      }
    }

    // console.log('data BoQ', this.state.boq_comm_all);
    console.log('data BoQ total', this.state.modal_delete_noBOQ);
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <React.Fragment>
              <span style={{position:'absolute',marginTop:'8px'}}>Commercial BOQ List</span>
              <div className="card-header-actions" style={{marginRight:'5px'}}>
                <Link to='/commercial-creation'>
                <Button className="btn-success"><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; New</Button>
                </Link>
              </div>
            </React.Fragment>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            {/* <div style={{float : 'right', marginBottom : '5px'}}>
              <span>Search : </span>
              <input onChange={this.handleFilterList} value={this.state.filter_list[0]} name={0}></input>
            </div> */}
            <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                      <th>Technical BOQ Origin</th>
                      <th>Commercial BOQ Document</th>
                      <th>Project</th>
                      <th>Ver.</th>
                      <th style={{'width' : '300px', textAlign : 'center'}}>Action</th>
                  </tr>
                  <tr>
                    <td>
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
                          <Input type="text" placeholder="Search" name={3} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[3]}/>
                        </InputGroup>
                      </div>
                    </td>
                    {/* }<td>
                      <div className="controls">
                        <InputGroup className="input-prepend">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Search" name={4} size="sm" onChange={this.handleFilterList} value={this.state.filter_list[6]}/>
                        </InputGroup>
                      </div>
                    </td> */}
                    <td>
                    </td>
                    <td>
                    </td>
                  </tr>
                </thead>
                <tbody>
                    {this.state.list_comm_boq.map((boq, i) =>
                        <tr key={boq._id}>

                            <td style={{verticalAlign : 'middle'}}>{boq.list_of_tech.map(e => e.no_tech_boq + "  ")}</td>
                            <td style={{verticalAlign : 'middle'}}>{boq.no_comm_boq}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{boq.project_name}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center", width : '100px'}}>{boq.version}</td>
                            {/* }<td style={{verticalAlign : 'middle'}}>
                              {boq.approval_status === "PRE APPROVAL" || boq.approval_status === "R" ? (
                                <span className="boq-tech-status-PA">{boq.approval_status}</span>
                              ) : boq.approval_status === "WA" ? (
                                <span className="boq-tech-status-WA">{boq.approval_status}</span>
                              ) : (
                                <span className="boq-tech-status-A">{boq.approval_status}</span>
                              )}
                            </td> */}
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                              <Link to={'/detail-commercial/'+boq._id}>
                                <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                                  <i className="fas fa-edit" aria-hidden="true"></i>&nbsp; Edit
                                </Button>
                              </Link>
                              {/* }<Link to={'/approval-commercial/'+boq._id}>
                                <Button size="sm" color="warning" style={{marginRight : '10px'}}>
                                  <i className="fa fa-check-square-o" aria-hidden="true"></i>&nbsp; Approval
                                </Button>
                              </Link> */}
                              <Link to={'/submission-commercial/'+boq._id}>
                                <Button size="sm" color="secondary" style={{marginRight : '10px'}}>
                                  <i className="fa fa-check-square-o" aria-hidden="true"></i>&nbsp; Submission
                                </Button>
                              </Link>
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

        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className + ' loading-modal'}>
            <ModalBody>
              <div style={{textAlign : 'center'}}>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>
              <div style={{textAlign : 'center'}}>
                Loading ...
              </div>
              <div style={{textAlign : 'center'}}>
                System is processing ...
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Loading */}

          {/* Modal Delete */}
          <Modal isOpen={this.state.modal_delete} toggle={this.toggleDelete} className={'modal-sm ' + this.props.className}>
            <ModalBody>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '15px'}}>Are You Sure wanna Delete </span>
              </div>
              <div style={{textAlign : 'center'}}>
                {this.state.modal_delete_noBOQ}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.deleteBOQCOMM}>Delete</Button>
              <Button color="secondary" onClick={this.toggleDelete}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Delete */}

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(ListCommercial);
