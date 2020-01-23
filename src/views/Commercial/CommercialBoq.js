import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse, Input} from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './boqCommercial.css';
import { saveAs } from 'file-saver';
import Pagination from "react-js-pagination";
import Select from 'react-select';
import {connect} from 'react-redux';

class CommercialBoq extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userRole : JSON.parse(localStorage.getItem('user_Roles')),
        rowsXLS : [],
        perPage : 25,
        prevPage : 1,
        activePage : 1,
        collapse: false,
        status : null,
        dropdownOpen: new Array(1).fill(false),
        fieldNoteChange : new Array(8).fill(null),
      };
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleUpload = this.toggleUpload.bind(this);
      this.onEntering = this.onEntering.bind(this);
      this.onEntered = this.onEntered.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
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

    toggleUpload() {
      this.setState({ collapse: !this.state.collapse });
    }

    toggleDropdown(i) {
      const newArray = this.state.dropdownOpen.map((element, index) => {
        return (index === i ? !element : false);
      });
      this.setState({
        dropdownOpen: newArray,
      });
    }

    onEntering() {
      this.setState({ status: 'Opening...' });
    }

    onEntered() {
      this.setState({ status: 'Opened' });
    }

    onExiting() {
      this.setState({ status: 'Closing...' });
    }

    onExited() {
      this.setState({ status: 'Closed' });
    }

    checkValuetoZero(props){
      //Swap undefined or null to 0
      if( typeof props == 'undefined' || props == null ) {
        return 0;
      }else{
        return props;
      }
    }

    checkValuetoString(props){
      //Swap undefined or null to ""
      if( typeof props == 'undefined' || props == null ) {
        return "";
      }else{
        return props;
      }
    }

    comparerDiffSites(otherArray){
      //Compare Different between 2 array
      return function(current){
        return otherArray.filter(function(other){
          return other.site_id == current.site_id
        }).length == 0;
      }
    }

    isSameValue(element,value){
      //function for FindIndex
      return element === value;
    }

    getIndex(data, value){
      //get index of value in Array
      return data.findIndex(e => this.isSameValue(e,value));
    }

    componentDidMount(){

    }


    fileHandlerTechnical = (event) => {
      let fileObj = event.target.files[0];
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      if(fileObj !== undefined){
        ExcelRenderer(fileObj, (err, rest) => {
          if(err){
            console.log(err);
          }
          else{
            this.ArrayEmptytoNull(rest.rows, DateNow);
          }
        });
      }
    }

    ArrayEmptytoNull(dataXLS, DateNow){
      let newDataXLS = [];
      for(let i = 0; i < dataXLS.length; i++){
        let col = [];
        for(let j = 0; j < dataXLS[1].length; j++){
          col.push(this.checkValue(dataXLS[i][j]));
        }
        newDataXLS.push(col);
      }
      this.setState({
        rowsXLS: newDataXLS
      });
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

    editQtyCust = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ qty_cust: prevState.qty_cust.set(name, value) }));
    }

    editQtyEricsson = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ qty_ericsson: prevState.qty_ericsson.set(name, value) }));
    }

    editUnitPrice = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ unit_price: prevState.unit_price.set(name, value) }));
    }

    render() {
      return (
        <div>
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <React.Fragment>
                    <span style={{marginTop:'8px', position:'absolute'}}>Detail Commercial BOQ</span>
                    <div className="card-header-actions" style={{display:'inline-flex'}}>
                    <Col>
                      <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}}>
                        <DropdownToggle caret color="secondary">
                          <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download Commercial File
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header> Commercial File</DropdownItem>
                          <DropdownItem > <i className="fa fa-file-text-o" aria-hidden="true"></i> Commercial Report</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    </div>
                  </React.Fragment>
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                <React.Fragment>
                  <Row>
                    <Col sm="12" md="12">
                     <table style={{width : '100%', marginBottom : '0px'}}>
                       <tbody>
                         <tr style={{fontWeight : '425', fontSize : '23px'}}>
                           <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>COMMERCIAL BOQ</td>
                         </tr>
                         <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                           <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : COMBOQ-200121-0001</td>
                         </tr>
                       </tbody>
                     </table>
                     <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                    </Col>
                  </Row>
                  <div style={{padding:"10px 20px 10px 20px", marginBottom : '10px', fontSize:'15px'}}>
                  <Fragment>
                    <Row>
                      <Col sm="6" md="6">
                      <table className="table-header">
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '17px'}}>
                            <td colSpan="4" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '600'}}>COMMERCIAL INFORMATION</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{width : '150px'}}>Project Identifier </td>
                            <td>:</td>
                            <td colspan="2" style={{paddingLeft:'10px'}}>LTE 2020</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td>Version</td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}} colspan="2">0</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td>Early Start </td>
                            <td>:</td>
                            <td colspan="2">&nbsp;</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td></td>
                            <td></td>
                            <td style={{paddingLeft:'10px'}}></td>
                            <td  style={{paddingLeft:'5px'}}></td>
                          </tr>
                        </tbody>
                        </table>
                      </Col>
                      <Col sm="6" md="6">
                      <table style={{float : 'right', marginRight : '10px'}} className="table-header">
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '17px'}}>
                            <td colSpan="4" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '600'}}>PROJECT ORDER INFORMATION</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td>PO Identifier </td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}} colspan="2">PO2020001</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td>Updated By</td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}} colspan="2">adminbamid@bamid.com</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td>Date </td>
                            <td>:</td>
                            <td style={{paddingLeft:'10px'}} colspan="2">2020-01-20</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td></td>
                            <td></td>
                            <td style={{paddingLeft:'10px'}}></td>
                            <td style={{paddingLeft:'5px'}}></td>
                          </tr>
                        </tbody>
                        </table>
                      </Col>
                    </Row>
                  </Fragment>
                  </div>
                  <div>
                  </div>
                  </React.Fragment>
                    <Table hover bordered responsive size="sm" className="table-commercial">
                      <thead>
                        <tr style={{backgroundColor : "#c6f569", fontWeight : "500"}}>
                          <th style={{width :'100px'}} >PP ID</th>
                          <th style={{width :'300px'}} >Product Description</th>
                          <th>Unit</th>
                          <th>Qty in Technical</th>
                          <th>Existing Stock (Smart)</th>
                          <th>Existing Stock (Ericsson)</th>
                          <th>Quotation Qty</th>
                          <th>Unit Price</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{backgroundColor : 'rgb(248, 246, 223)'}}>
                          <td colSpan="9" style={{textAlign: 'left'}}>
                            <span style={{fontWeight : '700'}}>HW</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="9" style={{textAlign: 'left'}}>
                            <span style={{fontWeight : '500'}}>Radio</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pptest1</td>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pp Test Name 1</td>
                          <td style={{verticalAlign : 'middle'}}>pc</td>
                          <td style={{verticalAlign : 'middle'}}>4</td>
                          <td style={{verticalAlign : 'middle'}}>0</td>
                          <td style={{verticalAlign : 'middle'}}>1</td>
                          <td style={{verticalAlign : 'middle'}}>3</td>
                          <td style={{verticalAlign : 'middle'}}>300</td>
                          <td style={{verticalAlign : 'middle'}}>900</td>
                        </tr>
                        <tr>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pptest2</td>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pp Test Name 2</td>
                          <td style={{verticalAlign : 'middle'}}>pc</td>
                          <td style={{verticalAlign : 'middle'}}>10</td>
                          <td style={{verticalAlign : 'middle'}}>0</td>
                          <td style={{verticalAlign : 'middle'}}>3</td>
                          <td style={{verticalAlign : 'middle'}}>7</td>
                          <td style={{verticalAlign : 'middle'}}>300</td>
                          <td style={{verticalAlign : 'middle'}}>2100</td>
                        </tr>
                        <tr>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pptest4</td>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pp Test Name 4</td>
                          <td style={{verticalAlign : 'middle'}}>pc</td>
                          <td style={{verticalAlign : 'middle'}}>6</td>
                          <td style={{verticalAlign : 'middle'}}>0</td>
                          <td style={{verticalAlign : 'middle'}}>1</td>
                          <td style={{verticalAlign : 'middle'}}>5</td>
                          <td style={{verticalAlign : 'middle'}}>400</td>
                          <td style={{verticalAlign : 'middle'}}>2000</td>
                        </tr>
                        <tr>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pptest7</td>
                          <td style={{verticalAlign : 'middle', textAlign: 'left'}} >pp Test Name 7</td>
                          <td style={{verticalAlign : 'middle'}}>pc</td>
                          <td style={{verticalAlign : 'middle'}}>4</td>
                          <td style={{verticalAlign : 'middle'}}>0</td>
                          <td style={{verticalAlign : 'middle'}}>1</td>
                          <td style={{verticalAlign : 'middle'}}>3</td>
                          <td style={{verticalAlign : 'middle'}}>300</td>
                          <td style={{verticalAlign : 'middle'}}>900</td>
                        </tr>
                      </tbody>
                    </Table>
                    <nav>
                      <div>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={10}
                            pageRangeDisplayed={5}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                      </div>
                    </nav>
                    <div style={{marginBottom : "20px"}}>
                      <Row style={{paddingLeft : '10px'}}>
                        <Col sm="6" md="7">
                        <table className="table-footer">
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td>Approved By </td>
                              <td>:</td>
                              <td>adminbamid@bamid.com</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td>Approved Date </td>
                              <td>:</td>
                              <td>2020-01-22</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                        <Col sm="6" md="5">
                        <table className="table-footer" style={{float : 'right',marginRight : '20px'}}>
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td>Technical Indentifier</td>
                              <td>: &nbsp;</td>
                              <td>TECBOQ-200120-0001 - Ver0</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td>COM BOQ Created By</td>
                              <td>:</td>
                              <td>adminbamid@bamid.com</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                      </Row>
                    </div>
                </CardBody>
                <CardFooter>
                  <div>
                    <Button color="success" size="sm">Request Approve</Button>
                  </div>
                </CardFooter>
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

  export default connect(mapStateToProps)(CommercialBoq);
