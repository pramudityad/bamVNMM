import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {ExcelRenderer} from 'react-excel-renderer';
import {connect} from 'react-redux';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class TssrBOM extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        rowsXLS : [],
        project_name_selected : null,
        cd_id_selected : null,
        dataTssrUpload : [],
    };
  }

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if(fileObj !== undefined){
      ExcelRenderer(fileObj, (err, rest) => {
        if(err){
          console.log(err);
        }
        else{
          this.setState({
            rowsXLS: rest.rows
          });
        }
      });
    }
  }

  preparingDataTSSR(){
    //Before Show preview and user can click save button
    const dataTSSRXls = this.state.rowsXLS;
    for(let i = 2; i < dataTSSRXls.length; i++){

    }

  }

  preparingSaveTssr(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100);
    const numberTSSR = dateNow.getFullYear()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getDate()+dataRandom.toString();
    return numberTSSR;
  }

  saveTssrBOMParent(){
    const numberingTSSR = "TSSRBOM-"+this.preparingSaveTssr();
    const tssrData = {
      "no_tssr_boq" : numberingTSSR,
      "id_project_doc" : null,
      "project_name" : this.state.project_name_selected,
      "account_id" : "1",
      "current_status" : "CREATED",
      "version" : "0",
      "deleted" : 0,
      "created_by" : this.state.userId,
      "updated_by" : this.state.userId
    }
  }

  saveTSSRBOMSites(no_tssr_boq, _id_tssr_parent, _etag_tssr_parent){
    let bulkTssrSites = [];
    const dataSites = this.state.dataTssrUpload;
    const tssrSiteData = {
      "id_tssr_boq" : _id_tssr_parent,
      "no_tssr_boq" : no_tssr_boq,
      "no_tssr_boq_site" : "",
      "id_project_doc" : null,
      "project_name" : this.state.project_name_selected,
      "account_id" : "1",
      "id_site_doc" : null,
      "site_id" : "",
      "id_cd_doc" : null,
      "cd_id" : this.state.cd_id_selected,
      "version" : "0",
      "deleted" : 0,
      "created_by" : this.state.userId,
      "updated_by" : this.state.userId
    }
  }

  saveTSSRBOMSitesItem(){
    const tssrSitesItem = [];
  }

  render() {
    console.log("Excel Render", this.state.rowsXLS);
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >TSSR BOM </span>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>

            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>TSSR BOM DETAIL</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{fontSize : '15px', textAlign : 'center'}}>TSSR ID : TSSR BOM DUMMY</td>
                </tr>
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            <React.Fragment>
              <table style={{width : '35%'}} className="table-header">
                <tbody>
                    <tr>
                      <td>Project Identifier</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px'}}>PROJECT DUMMY</td>
                    </tr>
                    <tr>
                      <td>Site ID</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px'}}>DUMMY-1</td>
                    </tr>
                    <tr>
                      <td>Site Name</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px'}}>SITE DUMMY 01</td>
                    </tr>
                </tbody>
              </table>
              <hr className="upload-line-ordering"></hr>
              <div class='divtable2'>
                <Table hover bordered striped responsive size="sm" className="table-site-detail" class='fixed'>
                  <thead>
                    <tr>
                      <th class="fixedhead" style={{width : '200px'}}>PP / Material Code</th>
                      <th class="fixedhead">Material Name</th>
                      <th class="fixedhead" style={{width : '75px'}}>Unit</th>
                      <th class="fixedhead" style={{width : '100px'}}>Total Qty / PP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <React.Fragment>
                      <tr style={{backgroundColor : '#f8f6df'}} class="fixbody">
                        <td colSpan="3" style={{fontWeight : '500', textAlign : 'left', paddingLeft : '5px'}}>PP DUMMY 1</td>
                        <td align='center'> 0 </td>
                      </tr>
                      <tr class="fixbody">
                        <td class="dataregsite" style={{textAlign : 'left'}}>MAT DUMMY 1</td>
                        <td class="dataregsite" style={{textAlign : 'left'}}>MAT DUMMY 1</td>
                        <td class="dataregsite" style={{textAlign : 'center'}}>PC</td>
                        <td class="dataregsite" style={{textAlign : 'center'}}>0</td>
                      </tr>
                      <tr class="fixbody">
                        <td colspan='4' class="dataregsite"></td>
                      </tr>
                    </React.Fragment>
                  </tbody>
                </Table>
              </div>
            </React.Fragment>
          </CardBody>
        </Card>
        </Col>
        </Row>
        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
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
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(TssrBOM);
