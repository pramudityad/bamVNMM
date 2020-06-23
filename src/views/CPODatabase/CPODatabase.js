import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse } from 'reactstrap';
import { Col, FormGroup, Label, Row, Table, Input } from 'reactstrap';
import { ExcelRenderer } from 'react-excel-renderer';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import debounce from 'lodash.debounce';
import './poStyle.css';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import { connect } from 'react-redux';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" />
);






class CPODatabase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      filter_name: null,
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      total_data_PO: 0,
      rowsXLS: [],
      action_status: null,
      action_message: null,
      po_op_data: [],
      data_PO: [],
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      modalPOForm: false,
      POForm: new Array(5).fill(null),
      collapse: false,
    }
    this.togglePOForm = this.togglePOForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterDebounce = debounce(this.changeFilterName, 500);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.saveNewPO = this.saveNewPO.bind(this);
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggleAddNew() {
    this.setState({ collapse: !this.state.collapse });
  }

  async getDatatoAPIEXEL(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_XL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_username,
          password: process.env.REACT_APP_password
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

  async postDatatoAPIEXEL(url, data) {
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL_XL+url, data, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_username,
          password: process.env.REACT_APP_password
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

  changeFilterName(value) {
    this.getPODataList();
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if(value.length === 0){
      value = null;
    }
    this.setState({ filter_name: value }, () => {
      this.changeFilterDebounce(value);
    });
  }

  getPODataList(){
    let po_number = this.state.filter_name === null ? '"po_number":{"$exists" : 1}' : '"po_number":{"$regex" : "'+this.state.filter_name+'", "$options" : "i"}';
    this.getDatatoAPIEXEL('/po_op?max_results='+this.state.perPage+'&page='+this.state.activePage+'&where={'+po_number+'}')
    .then(res =>{
      if(res.data !== undefined){
        this.setState({ po_op_data : res.data._items, prevPage : this.state.activePage, total_data_PO : res.data._meta.total })
      }else{
        this.setState({ po_op_data : [], total_data_PO : 0, prevPage : this.state.activePage});
      }
    })
  }

  isSameValue(element, value) {
    //function for FindIndex
    return this.checkValuetoString(element).toLowerCase() === this.checkValuetoString(value).toLowerCase();
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex(e => this.isSameValue(e, value));
  }

  checkValue(props) {
    // if value undefined return null
    if (typeof props === 'undefined') {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    // if value undefined return ""
    if (typeof props === 'undefined' || props === null) {
      return "";
    } else {
      return props;
    }
  }

  checkValueReturn(value1, value2) {
    // if value undefined or null return Value2
    if (typeof value1 !== 'undefined' && value1 !== null) {
      return value1;
    } else {
      return value2;
    }
  }

  // check Package Config
  fileHandlerMaterial = (event) => {
    this.toggleLoading();
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        }
        else {
          this.setState({ rowsXLS: rest.rows })
        }
      });
    }
  }

  componentDidMount() {
    this.getPODataList();
    document.title = 'CPO Database | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPODataList();
    });
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  togglePOForm() {
    this.setState(prevState => ({
      modalPOForm: !prevState.modalPOForm
    }));
  }

  handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.POForm;
    dataForm[parseInt(index)] = value;
    this.setState({ POForm: dataForm });
  }

  async saveNewPO() {
    this.togglePOForm();
    this.toggleLoading();
    let poData = [];
    let respondSaveNew = undefined;
    const dataPPNew = this.state.POForm;
      const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
      const po_num = dataPPNew[0];
      let pp = {
        "po_number": po_num.toString(),
        "po_year": dataPPNew[1],
        "currency": dataPPNew[2],
        "value": dataPPNew[3],
        "number_of_sites": dataPPNew[4]
      }
      poData.push(pp);
      let postData = await this.postDatatoAPIEXEL('/po_op', pp)
      .then(res => {
        if(res.data !== undefined){
          this.setState({ action_status: 'success', action_message: null });
          this.toggleLoading();
        }else{
          if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
            if (res.response.data.error.message !== undefined) {
              this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
            } else {
              this.setState({ action_status: 'failed', action_message: res.response.data.error });
            }
          } else {
            this.setState({ action_status: 'failed' });
          }
          this.toggleLoading();
        }
      });
  }

  numToSSColumn(num) {
    var s = '', t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t) / 26 | 0;
    }
    return s || undefined;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: '8px', position: 'absolute' }}>CPO Database</span>
                <div>
                  <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}>
                    <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form
                  </Button>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <Card style={{ margin: '10px 10px 5px 10px' }}>
                  <CardBody>
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>Upload File</td>
                            <td>:</td>
                            <td>
                              <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{ "padding": "10px", "visiblity": "hidden" }} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.saveProductPackage}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE </Button>
                    {/* <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.checkProductPackage}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;Check </Button> */}
                    <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button>
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '500' }}>CPO List</span>
                      <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                        <input className="search-box-material" type="text" name='filter' placeholder="Search CPO" onChange={this.handleChangeFilter} value={this.state.filter_name} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='divtable'>
                      <table hover bordered responsive size="sm" width='100%'>
                        <thead style={{ backgroundColor: '#73818f' }} className='fixed'>
                          <tr align="center">
                            <th style={{ minWidth: '150px' }}>PO Number</th>
                            <th>Year</th>
                            <th>Currency</th>
                            <th>Price</th>
                            <th>Number of Sites</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.po_op_data.map(po =>
                            <React.Fragment key={po._id + "frag"}>
                              <tr style={{backgroundColor: '#d3d9e7'}} className='fixbody' key={po._id}>
                                <td style={{ textAlign: 'center' }}>{po.po_number}</td>
                                <td style={{ textAlign: 'center' }}>{po.po_year}</td>
                                <td style={{ textAlign: 'center' }}>{po.currency}</td>
                                <td style={{ textAlign: 'center' }}>{po.value}</td>
                                <td style={{ textAlign: 'center' }}>{po.number_of_sites}</td>
                              </tr>
                            </React.Fragment>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.state.total_data_PO}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal New PO */}
        <Modal isOpen={this.state.modalPOForm} toggle={this.togglePOForm} className="modal--form-po">
          <ModalHeader>Form Config</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="po_number">PO Number</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.POForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year" >Year</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.POForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency" >Currency</Label>
                  <Input type="text" name="2" placeholder="" value={this.state.POForm[2]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="value" >Price</Label>
                  <Input type="number" min="0" name="3" placeholder="" value={this.state.POForm[3]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="number_of_sites" >Number of Sites</Label>
                  <Input type="number" min="0" name="4" placeholder="" value={this.state.POForm[4]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNewPO}>Submit</Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PO*/}

        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm modal--loading '}>
          <ModalBody>
            <div style={{ textAlign: 'center' }}>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              Loading ...
            </div>
            <div style={{ textAlign: 'center' }}>
              System is processing ...
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData
  }
}

export default connect(mapStateToProps)(CPODatabase);
