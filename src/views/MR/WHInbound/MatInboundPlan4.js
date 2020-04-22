import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse } from 'reactstrap';
import { Col, FormGroup, Label, Row, Table, Input } from 'reactstrap';
import { ExcelRenderer } from 'react-excel-renderer';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
import debounce from 'lodash.debounce';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

import '../MatStyle.css';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" />
);

const DefaultNotif = React.lazy(() => import('../../DefaultView/DefaultNotif'));

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameBAM = 'adminbamidsuper';
const passwordBAM = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';


class MatInboundPlan extends React.Component {

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
      cpo_array: [],
      action_status: null,
      action_message: null,
      all_data: [],
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
    // this.saveNewPO = this.saveNewPO.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
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

  async getDatafromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data err", err);
      return respond;
    }
  }

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(API_URL_NODE + url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
      if (respond.status >= 200 && respond.status < 300) {
        // console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      // console.log("respond Post Data err", err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(API_URL_NODE + url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
      })
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data err", err);
      return respond;
    }
  }


  changeFilterName(value) {
    this.getWHInboundList();
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if (value.length === 0) {
      value = null;
    }
    this.setState({ filter_name: value }, () => {
      this.changeFilterDebounce(value);
    });
  }

  getWHInboundList() {
    this.getDatafromAPINODE('/whInboundPlan/getWhInboundPlan')
      .then(res => {
        // console.log('all cpoDB', res.data)
        if (res.data !== undefined) {
          this.setState({ all_data: res.data.data })
        } else {
          this.setState({ all_data: []});
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


  fileHandlerMaterial = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    console.log("rABS");
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates:true});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header:1, devfal : null});
      /* Update state */
      this.ArrayEmptytoNull(data);
    };
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[0].length; j++){
        if(typeof dataXLS[i][j] === "object"){
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if(dataObject !== null){
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        }else{
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
  }

  componentDidMount() {
    this.getWHInboundList();
    document.title = 'Material Inbound Plan | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getWHInboundList();
    });
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  toggleEdit(e) {
    const modalMatStockForm = this.state.modalMatStockForm;
    if (modalMatStockForm === false) {
      const value = e.currentTarget.value;
      const aEdit = this.state.all_data.find(e => e.owner_id === value);
      let dataForm = this.state.POForm;
      dataForm[0] = aEdit.owner_id;
      dataForm[1] = aEdit.po_number;
      dataForm[2] = aEdit.arrival_date;
      dataForm[3] = aEdit.project_name;
      dataForm[4] = aEdit.sku;
      this.setState({ POForm: dataForm });
    } else {
      this.setState({ POForm: new Array(6).fill(null) });
    }
    this.setState(prevState => ({
      modalMatStockEdit: !prevState.modalMatStockEdit
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

  async getMatInboundFormat(dataImport) {
    const dataHeader = dataImport[0];
    const onlyParent = dataImport.map(e => e).filter(e => (this.checkValuetoString(e[this.getIndex(dataHeader, 'po_number')])));
    let cpo_array = [];
    if (onlyParent !== undefined && onlyParent.length !== 0) {
      for (let i = 1; i < onlyParent.length; i++) {
        const cpo = {
          "po_number": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'po_number')]),
          "date": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'date')]),
          "currency": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'currency')]),
          "payment_terms": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'payment_terms')]),
          "shipping_terms": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'shipping_terms')]),
          "contract": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'contract')]),
          "contact": this.checkValue(onlyParent[i][this.getIndex(dataHeader, 'contact')]),
        }
        if (cpo.po_number !== undefined && cpo.po_number !== null) {
          cpo["po_number"] = cpo.po_number.toString();
        }
        if (cpo.year !== undefined && cpo.year !== null) {
          cpo["po_year"] = cpo.year.toString();
        }
        if (cpo.currency !== undefined && cpo.currency !== null) {
          cpo["currency"] = cpo.currency.toString();
        }
        cpo_array.push(cpo);
      }
      // console.log(JSON.stringify(cpo_array));
      return cpo_array;
    } else {
      this.setState({ action_status: 'failed', action_message: 'Please check your format' }, () => {
        this.toggleLoading();
      });
    }
  }

  saveCPOBulk = async () => {
    this.toggleLoading();
    const BulkXLSX = this.state.rowsXLS;
    // const cpoData = await this.getMatInboundFormat(BulkXLSX);
    const res = await this.postDatatoAPINODE('/whInboundPlan/createWhInboundPlan', { 'inboundPlanData': BulkXLSX });
    if (res.data !== undefined) {
      this.setState({ action_status: 'success' });
      this.toggleLoading();
    } else {
      this.setState({ action_status: 'failed' }, () => {
        this.toggleLoading();
      });
    }
  }

  async saveUpdate() {
    let respondSaveEdit = undefined;
    const dataPPEdit = this.state.PPForm;
    const dataPP = this.state.all_data.find(e => e.pp_id === dataPPEdit[0]);
    let pp = {
      "owner_id": dataPPEdit[0],
      "po_number": dataPPEdit[1],
      "arrival_date": dataPPEdit[2],
      "project_name": dataPPEdit[3],
      "sku": dataPPEdit[4]
    }
    this.toggleLoading();
    this.toggleEdit();
    // if (pp.owner_id === undefined || pp.owner_id === null) {
    //   pp["owner_id"] = pp.product_name;
    // } else {
    //   if (pp.pp_group.length === 0) {
    //     pp["pp_group"] = pp.product_name;
    //   }
    // }
    // if (pp.pp_cust_number === null || pp.pp_cust_number === undefined) {
    //   pp["pp_cust_number"] = pp.pp_id;
    // } else {
    //   if (pp.pp_cust_number.length === 0) {
    //     pp["pp_cust_number"] = pp.pp_id;
    //   }
    // }
    let patchData = await this.patchDatatoAPINODE('/whInboundPlan/UpdateOneWhInboundPlan/', { "data": [pp] });
    if (patchData === undefined) { patchData = {}; patchData["data"] = undefined }
    if (patchData.data !== undefined) {
      this.setState({ action_status: 'success' }, () => {
        this.toggleLoading();
        setTimeout(function () { window.location.reload(); }, 2000);
      });
    } else {
      this.toggleLoading();
      this.setState({ action_status: 'failed' });
    }
  }

  async saveNew() {
    this.toggleMatStockForm();
    this.toggleLoading();
    let poData = [];
    let respondSaveNew = undefined;
    const dataPPEdit = this.state.POForm;
    const ppcountID = Math.floor(Math.random() * 1000).toString().padStart(6, '0');
    let pp = {
      "owner_id": dataPPEdit[0],
      "po_number": dataPPEdit[1],
      "arrival_date": dataPPEdit[2],
      "project_name": dataPPEdit[3],
      "sku": dataPPEdit[4]
    }
    poData.push(pp);
    let postData = await this.postDatatoAPIEXEL('/whInboundPlan/createOneWhInboundPlan', pp)
      .then(res => {
        if (res.data !== undefined) {
          this.toggleLoading();
        } else {
          this.setState({ action_status: 'failed', action_message: res.response.data.error });
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

  exportMatInbound = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["owner_id","po_number","arrival_date","project_name","sku"]);
    ws.addRow(["XL1","PO0001","2020-04-17","XL BAM DEMO 2020","MB-G7W92U9X65V-00"]);
    ws.addRow(["XL2","PO0001","2020-04-17","XL BAM DEMO 2020","1/TSR 484 21/3000"]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'Material Inbound Template.xlsx');
  }


  render() {
    return (
      <div className="animated fadeIn">
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: '8px', position: 'absolute' }}>Material Inbound Plan</span>
                <div className="card-header-actions" style={{ display: 'inline-flex' }}>
                  <div style={{ marginRight: "10px" }}>
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                      <DropdownToggle caret color="light">
                        Download Template
                        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportMatInbound}> Material Inbound Template</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    {this.state.userRole.includes('Flow-PublicInternal') !== true ? (
                      <div>
                        <Button block color="success" onClick={this.toggleAddNew} id="toggleCollapse1">
                          <i className="fa fa-plus-square" aria-hidden="true"> &nbsp; </i> New
                          </Button>
                      </div>
                    ) : ("")}
                  </div>
                </div>
                {/* <div>
                  <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}>
                    <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form
                  </Button>
                </div> */}

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
                    <Button color="success" disabled={this.state.rowsXLS.length === 0} onClick={this.saveCPOBulk}> <i className="fa fa-save" aria-hidden="true"> </i> &nbsp;SAVE </Button>
                    <Button color="primary" style={{ float: 'right' }} onClick={this.togglePOForm}> <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form</Button>
                  </CardFooter>
                </Card>
              </Collapse>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '500' }}>Material Inbound List</span>
                      <div style={{ float: 'right', margin: '5px', display: 'inline-flex' }}>
                        <input className="search-box-material" type="text" name='filter' placeholder="Search SKU" onChange={this.handleChangeFilter} value={this.state.filter_name} />
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
                          <th style={{ minWidth: '150px' }}> Owner ID</th>
                            <th>PO Number</th>
                            <th>Project Name</th>
                            <th>Arrival Date</th>
                            <th>SKU</th>
                            <th>SKU Desc</th>
                            <th>Qty</th>
                            <th>Aging</th>
                            <th>Serial Number</th>
                            <th>Box Number</th>
                            <th>Condition</th>
                            <th>Notes</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.all_data.map(e =>
                            <React.Fragment key={e._id + "frag"}>
                              <tr style={{ backgroundColor: '#d3d9e7' }} className='fixbody' key={e._id}>
                                <td style={{ textAlign: 'center' }}>{e.owner_id}</td>
                                <td style={{ textAlign: 'center' }}>{e.po_number}</td>
                                <td style={{ textAlign: 'center' }}>{e.project_name}</td>
                                <td style={{ textAlign: 'center' }}>{e.arrival_date}</td>
                                <td style={{ textAlign: 'center' }}>{e.sku}</td>
                                <td style={{ textAlign: 'center' }}>{e.sku_description}</td>
                                <td style={{ textAlign: 'center' }}>{e.qty}</td>
                                <td style={{ textAlign: 'center' }}>{e.ageing}</td>
                                <td style={{ textAlign: 'center' }}>{e.serial_number}</td>
                                <td style={{ textAlign: 'center' }}>{e.box_number}</td>
                                <td style={{ textAlign: 'center' }}>{e.condition}</td>
                                <td style={{ textAlign: 'center' }}>{e.notes}</td>
                                <td>
                                  <Button size='sm' color="secondary" value={e._id} onClick={this.toggleEdit} title='Edit'>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                  </Button>
                                </td>
                                <td>
                                  <Button size='sm' color="danger" value={e._id} onClick={r => this.DeleteData(r, "value")} title='Delete'>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                  </Button>
                                </td>
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
        <Modal isOpen={this.state.modalPOForm} toggle={this.togglePOForm} className="modal--form-e">
          <ModalHeader>Form CPO</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
              <FormGroup>
                  <Label htmlFor="po_number">Owner ID</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.POForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year" >PO Number</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.POForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="arrival_date" >Arrival Date</Label>
                  <Input type="datetime-local" placeholder="" value={this.state.POForm[2]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="project_name" >Project Name</Label>
                  <Input type="text" name="3" placeholder="" value={this.state.POForm[3]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="sku" >SKU</Label>
                  <Input type="text" min="0" name="4" placeholder="" value={this.state.POForm[4]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNew}>Submit</Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PO*/}

         {/* Modal Edit PP */}
         <Modal isOpen={this.state.modalMatStockEdit} toggle={this.toggleEdit} className="modal--form">
          <ModalHeader>Form Update Product Package</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="po_number">Owner ID</Label>
                  <Input type="text" name="0" placeholder="" value={this.state.POForm[0]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="po_year" >PO Number</Label>
                  <Input type="text" name="1" placeholder="" value={this.state.POForm[1]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="arrival_date" >Arrival Date</Label>
                  <Input type="datetime-local" placeholder="" value={this.state.POForm[2]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="project_name" >Project Name</Label>
                  <Input type="text" name="3" placeholder="" value={this.state.POForm[3]} onChange={this.handleChangeForm} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="sku" >SKU</Label>
                  <Input type="text" min="0" name="4" placeholder="" value={this.state.POForm[4]} onChange={this.handleChangeForm} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveUpdate}>Update</Button>
          </ModalFooter>
        </Modal>
        {/*  Modal Edit PP*/}

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

export default connect(mapStateToProps)(MatInboundPlan);
