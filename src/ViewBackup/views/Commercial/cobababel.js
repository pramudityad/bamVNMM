import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './boqCommercial.css';
import ReactExport from 'react-data-export';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import debounce from 'lodash.debounce';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

//const API_URL = 'http://localhost:5000/smartapi';
const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
//const API_URL = 'https://api.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const list =
  React.createElement('div', {},
    React.createElement('h1', {}, 'My favorite ice cream flavors'),
    React.createElement('ul', {},
      [
        React.createElement('li', { className: 'brown' }, 'Chocolate'),
        React.createElement('li', { className: 'white' }, 'Vanilla'),
        React.createElement('li', { className: 'yellow' }, 'Banana')
      ]
    )
  );

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class cobababel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        action_status : null,
        action_message : "",
        boq_comm_all : [],
        BOQ_all : [],
        prevPage : 1,
        activePage : 1,
        totalData : 0,
        perPage : 10,
        modal_loading : false,
        modal_delete : false,
        modal_delete_noBOQ : null,
        filter_list : new Array(3).fill(null),
        userRole : JSON.parse(localStorage.getItem('user_Roles')),

    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
  }

  toggleLoading(){
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(API_URL + url, {
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
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async patchDatatoAPI(url, data, _etag){
    try {
      let respond = await axios.patch(API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
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

  // getListBoQ(){
  //   const page = this.state.activePage;
  //   let filter_project = this.state.filter_list[2] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
  //   let filter_tech = this.state.filter_list[0] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[0]+'", "$options" : "i"}';
  //   let filter_comm = this.state.filter_list[1] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
  //   let where = 'where={"deleted" : 0, "no_boq_comm" : '+filter_comm+', "project_name" : '+filter_project+', "no_boq_tech" : '+filter_tech+'}';
  //   axios.get(API_URL +'/boq_comm_audit?'+where+'&max_results='+this.state.perPage+'&page='+page+'&embedded={"created_by" : 1}', {
  //       headers : {'Content-Type':'application/json'},
  //       auth: {
  //           username: usernamePhilApi,
  //           password: passwordPhilApi
  //       },
  //   })
  //   .then(res => {
  //       const items = res.data._items;
  //       const totalData = res.data._meta;
  //       this.setState({ BOQ_all : items, totalData : totalData, prevPage : this.state.activePage});
  //     })
  // }

  getListBoQ(){
    const page = this.state.activePage;
    //let filter_project = this.state.filter_list[2] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_table = this.state.filter_list[0] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[0]+'", "$options" : "i"}';
    //let filter_comm = this.state.filter_list[1] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    // let where = 'where={"deleted" : 0, "no_boq_comm" : '+filter_comm+', "project_name" : '+filter_project+', "no_boq_tech" : '+filter_tech+'}';
    let whereOr = '"$or" : [{"no_boq_tech": '+filter_table+' }, {"no_boq_comm": '+filter_table+' }, {"project_name": '+filter_table+' } ]';
    let where = 'where={"deleted" : 0, '+whereOr+'}';
    this.getDatafromAPI('/boq_comm_audit?'+where+'&max_results='+this.state.perPage+'&page='+page+'&embedded={"created_by" : 1}').then(res => {
        if(res !== undefined){
            this.setState({boq_comm_all : res.data._items, totalData : res.data._meta})
        }
    })
  }

  componentDidMount(){
    this.getListBoQ();
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber}, () => {
      this.getListBoQ();
    });
  }

  // componentDidUpdate(){
  //   if(this.state.prevPage !== this.state.activePage){
  //     this.getListBoQ();
  //   }
  // }

  handleFilterList(e){
    const index = e.target.name;
    let value = e.target.value;
    if(value !== null && value.length === 0){
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter}, () => {
      this.getListBoQ();
      console.log("filter_list", this.state.filter_list);
    });
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
        <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            { this.state.userRole.includes('PDB-Dash')|| this.state.userRole.includes('Admin') || this.state.userRole.includes('Flow-Commercial') ? (
              <React.Fragment>
                <span>Commercial BOQ List</span>
              </React.Fragment>
            ):(<span>List BOQ Commercial</span>)}
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <div style={{float : 'right', marginBottom : '5px'}}>
              <span>Search : </span>
              <input onChange={this.handleFilterList} value={this.state.filter_list[0]} name={0}></input>
            </div>
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                        <th>Tehnical BOQ Document</th>
                        <th>Commercial BOQ Document</th>
                        <th>Project</th>
                        <th>Created By</th>
                        <th>Ver.</th>
                        <th style={{'width' : '250px', textAlign : 'center'}}>Commercial BOQ Status</th>
                        <th style={{'width' : '150PX', textAlign : 'center'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.boq_comm_all.map((boq,i) =>
                        <tr key={boq._id}>
                            <td style={{verticalAlign : 'middle'}}>{boq.no_boq_tech}</td>
                            <td style={{verticalAlign : 'middle'}}>{boq.no_boq_comm}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{boq.project_name}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{boq.created_by !== undefined ? boq.created_by.email : ''}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{boq.version}</td>
                            <td style={{verticalAlign : 'middle'}}>
                              {boq.rev1 === "PA" ? (
                                <span className="boq-tech-status-PA">{boq.rev1}</span>
                              ) : boq.rev1 === "WA" ? (
                                <span className="boq-tech-status-WA">{boq.rev1}</span>
                              ) : (
                                <span className="boq-tech-status-A">{boq.rev1}</span>
                              )}
                              {boq.po_status === "PO-NR" ? (
                                <span className="boq-tech-status-PA">{boq.po_status}</span>
                              ) : boq.rev1 === "PO-WA" ? (
                                <span className="boq-tech-status-WA">{boq.po_status}</span>
                              ) : (
                                <span className="boq-tech-status-A">{boq.po_status}</span>
                              )}
                            </td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                { this.state.userRole.includes('PDB-Dash')|| this.state.userRole.includes('Admin') || this.state.userRole.includes('Flow-Commercial') ? (
                                  <Link to={'/Boq/Commercial/PO/'+boq._id}>
                                    <Button size="sm" color="secondary" style={{marginRight : '10px'}}>
                                      <i className="fas fa-edit-square-o" aria-hidden="true"></i>&nbsp; PO Assign
                                    </Button>
                                  </Link>
                                ) : (<React.Fragment></React.Fragment>)}
                                { this.state.userRole.includes('Flow-PublicInternal') ? (
                                  <Link to={'/Boq/Commercial/Approval/'+boq._id}>
                                    <Button size="sm" color="warning" style={{marginRight : '10px'}}>
                                      <i className="fa fa-check-square-o" aria-hidden="true"></i>&nbsp; View
                                    </Button>
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
ReactDOM.render(
    list,
    document.getElementById('root')
  );
// export default cobababel;
