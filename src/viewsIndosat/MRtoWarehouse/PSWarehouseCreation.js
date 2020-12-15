import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import { getDatafromAPIISAT, postDatatoAPINODE, getDatafromAPINODE} from "../../helper/asyncFunction";
import * as XLSX from 'xlsx';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.isat.pdb.e-dpm.com/isatapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class PSWarehouseCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      redirectSign : false,
      action_status : null,
      action_message : null,
      form_creation_ps_wh : {},
      project_selected : null,
      project_selected_name : null,
      project_all : [],
      form_creation : {},
      site_list : [],
      rowsXLS : [],
      list_warehouse : [],
    };
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
    this.savePSWH = this.savePSWH.bind(this);
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  // PS to WH

  exportFormatPSDismantle = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["bundle_id","bundle_name","qty","category"]);
    ws.addRow(["bundle_id","bundle_name","qty","TST"]);
    ws.addRow(["bundle_id","bundle_name","qty","TWH"]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'PS to Warehouse Template.xlsx');
  }

  componentDidMount(){
    this.getProjectAll();
    this.getDataWarehouse();
    document.title = "PS to Warehouse Creation | BAM"
  }

  getProjectAll(){
    getDatafromAPIISAT('/project_sorted_non_page').then( resp => {
      if(resp !== undefined){
        this.setState({project_all : resp.data._items});
      }
    })
  }

  getDataWarehouse(){
    getDatafromAPINODE('/whManagement/warehouse?q={"wh_type":{"$regex" : "internal", "$options" : "i"}}', this.state.tokenUser).then( resWH => {
      if(resWH.data !== undefined){
        this.setState({ list_warehouse : resWH.data.data })
      }
    })
  }

  handleChangeDropdown(e){
    let form_creation_ps_wh = this.state.form_creation_ps_wh;
    const name = e.target.name;
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    form_creation_ps_wh[name] = value;
    form_creation_ps_wh[name+'_name'] = text;
    if(name === "origin_warehouse" || name === "destination_warehouse"){
      const dataWH = this.state.list_warehouse.find(lw => lw._id === value);
      form_creation_ps_wh[name+'_name'] = dataWH.wh_name;
      form_creation_ps_wh[name+'_whId'] = text;
    }
    this.setState({form_creation_ps_wh : form_creation_ps_wh});
  }

  handleChangeTowerXL(newValue){
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          ["id_site_doc"]: newValue.value,
          ["site_id"]: newValue.site_id,
          ["site_name"]: newValue.site_name,
        },
      })
    );
    return newValue
  }

  fileHandlerUpload = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
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
      // this.ArrayEmptytoNull(data);
      this.setState({ action_status: null, action_message: null }, () => {
        this.ArrayEmptytoNull(data);
      });
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
      rowsXLS : newDataXLS,
    });
  }

  checkValue(props){
    //Swap undefined to null
    if( typeof props === 'undefined' ) {
      return null;
    }else{
      return props;
    }
  }

  async savePSWH(){
    const dataForm = this.state.form_creation_ps_wh
    const dataPSCreate = {
        psData: this.state.rowsXLS,
        whOriginInfo: {
            id_wh_doc : dataForm.origin_warehouse,
            wh_id : dataForm.origin_warehouse_whId,
        },
        whDestInfo: {
          id_wh_doc : dataForm.destination_warehouse,
          wh_id : dataForm.destination_warehouse_whId,
        },
        psType: dataForm.delivery_type,
        projectInfo: {
            id_project_doc: dataForm.project_selected,
            project_name : dataForm.project_selected_name,
        }
    }
    const resPost = await postDatatoAPINODE('/plantspec/createPlantSpecWhtoWh', dataPSCreate, this.state.tokenUser)
    if(resPost !== undefined && resPost.data !== undefined){
      this.setState({action_status : 'success'})
    }else{
      if (resPost.response !== undefined && resPost.response.data !== undefined && resPost.response.data.error !== undefined) {
        if (resPost.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: resPost.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: resPost.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
    }
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/mr-detail/'+this.state.redirectSign} />);
    }
    return (
      <div>
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>PS to Warehouse Creation </span>
            <Button onClick={this.exportFormatPSDismantle} color="info" style={{ float: 'right', marginRight: "8px" }} size="sm">Download PS to WH Template</Button>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Delivery Type</Label>
                    <Input type="select" name="delivery_type" value={this.state.form_creation_ps_wh.delivery_type} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select Delivery Type</option>
                      <option value="A1">Port to Warehouse</option>
                      <option value="A2">Warehouse to Port</option>
                      <option value="B1">Warehouse to Warehouse</option>
                      <option value="C1">Warehouse to Scrap</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Project</Label>
                    <Input type="select" name="project_selected" value={this.state.form_creation_ps_wh.project_selected} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select Project</option>
                      {this.state.project_all.map(pa =>
                        <option value={pa._id}>{pa.Project}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Warehouse Origin</Label>
                    <Input type="select" name="origin_warehouse" value={this.state.origin_warehouse} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select Destination</option>
                      {this.state.list_warehouse.map(e =>
                        <option value={e._id}>{e.wh_id}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Warehouse Name Origin</Label>
                    <Input type="type" name="origin_warehouse_name" readOnly value={this.state.form_creation_ps_wh.origin_warehouse_name} onChange={this.handleChangeDropdown} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Warehouse Destination</Label>
                    <Input type="select" name="destination_warehouse" value={this.state.form_creation_ps_wh.destination_warehouse} onChange={this.handleChangeDropdown}>
                      <option value="" disabled selected hidden>Select Destination</option>
                      {this.state.list_warehouse.map(e =>
                        <option value={e._id}>{e.wh_id}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Warehouse Name Destination</Label>
                    <Input type="type" name="destination_warehouse_name" readOnly value={this.state.form_creation_ps_wh.destination_warehouse_name} onChange={this.handleChangeDropdown} />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Upload PS File</Label>
                    <Input type="file" onChange={this.fileHandlerUpload.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Table hover bordered responsive size="sm">
                  <tbody>
                  {this.state.rowsXLS.length !== 0 ? (
                    this.state.rowsXLS.map( (row, i) =>
                      <tr>
                        {row.map(col =>
                          <Fragment>
                          <td>{col}</td>
                          </Fragment>
                        )}
                      </tr>
                    )
                  ) : ""}
                  </tbody>
                  </Table>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Button color='success' style={{float : 'right'}} size="sm" onClick={this.savePSWH} disabled={this.state.modal_loading === true}><i className="fa fa-plus-square" style={{marginRight: "8px"}}></i> Create PS to Warehouse</Button>
          </CardFooter>
        </Card>
        </Col>
        </Row>
        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
          <ModalBody>
            <div style={{textAlign : 'center'}}>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
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

export default connect(mapStateToProps)(PSWarehouseCreation);
