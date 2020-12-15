import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input, CardFooter } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { getDatafromAPIEXEL, getDatafromAPINODE, postDatatoAPINODE, patchDatatoAPINODE} from "../../helper/asyncFunction";
import * as XLSX from 'xlsx';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class PSDisDetail extends Component {
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

      ps_dis_data : {},

      project_selected : null,
      project_name_selected : null,
      project_all : [],
      form_creation : {},
      site_list : [],
      rowsXLS : [],

      edit_qty_mat_dis : false,
      qty_material_new : new Map(),
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.loadOptionsTowerID = this.loadOptionsTowerID.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
    this.submitPSDis = this.submitPSDis.bind(this);

    this.handleChangeEditQty = this.handleChangeEditQty.bind(this);
    this.handleChangeQtyMaterial = this.handleChangeQtyMaterial.bind(this);
    this.updateMaterialQty = this.updateMaterialQty.bind(this);
  }

  toggleLoading() {
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }
  // PS DIS

  exportFormatPSDismantle = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["bundle_id","bundle_name","qty","category"]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'PS SRN Template.xlsx');
  }

  componentDidMount(){
    this.getDataPSDis(this.props.match.params.id);
    document.title = "PS SRN Creation | BAM"
  }

  async getDataPSDis(_id){
    const res = await getDatafromAPINODE('/plantspec-srn/'+_id, this.props.dataLogin.token);
    if(res !== undefined && res.data !== undefined){
      this.setState({ps_dis_data : res.data.data});
    }
  }

  handleChangeProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_selected : value, project_name_selected : text});
  }

  async loadOptionsTowerID(inputValue) {
    if(!inputValue || inputValue.length < 3 ) {
      return [];
    } else {
      let tower_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getTowerID = await getDatafromAPIEXEL('/tower_site_op?where={"tower_id":{"$regex":"'+inputValue+'", "$options":"i"}}');
      if(getTowerID !== undefined && getTowerID.data !== undefined) {
        this.setState({site_list : getTowerID.data._items});
        getTowerID.data._items.map(tower =>
          tower_id_list.push({'label' : tower.tower_id, 'value' : tower._id, 'tower_id' : tower.tower_id, 'tower_name' : tower.tower_name}))
      }
      return tower_id_list;
    }
  }

  handleChangeTowerXL(newValue){
    this.setState(
      (prevState) => ({
        form_creation: {
          ...prevState.form_creation,
          ["id_site_doc"]: newValue.value,
          ["site_id"]: newValue.tower_id,
          ["site_name"]: newValue.tower_name,
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

  async submitPSDis(){
    const res = await patchDatatoAPINODE('/plantspec-srn/submitPlantspecSRN/'+this.props.match.params.id, {}, this.state.tokenUser)
    if(res !== undefined && res.data !== undefined){
      this.setState({action_status : 'success'})
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
    }
  }

  handleChangeEditQty(){
    this.setState(prevState => ({
      edit_qty_mat_dis: !prevState.edit_qty_mat_dis
    }));
  }

  handleChangeQtyMaterial(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({ qty_material_new: prevState.qty_material_new.set(name, value) }));
  }

  async updateMaterialQty(){
    let dataQtyList = [];
    let headerRow = ["bam_id", "bundle_id", "bundle_name", "material_id", "material_name", "uom", "qty"];
    dataQtyList.push(headerRow)
    const dataPS = this.state.ps_dis_data;
    const dataPackage = dataPS.srn_packages;
    const dataQtyNew = this.state.qty_material_new;
    for(let i = 0; i < dataPackage.length; i++){
      for(let j = 0; j < dataPackage[i].srn_materials.length; j++){
        const dataMat = dataPackage[i].srn_materials[j];
        if(dataQtyNew.has(dataMat._id)){
          dataQtyList.push([dataMat._id, dataPackage[i].pp_id, dataPackage[i].product_name, dataMat.material_id, dataMat.material_name, dataMat.uom, dataQtyNew.get(dataMat._id) ])
        }
      }
    }
    const dataUpload = {
      data : dataQtyList,
      identifier : "PSD"
    }
    const resPatch = await patchDatatoAPINODE('/matreq-srn/updateMaterialPlantSpec/'+dataPS._id, dataUpload, this.state.tokenUser)
    if(resPatch !== undefined && resPatch.data !== undefined){
      this.setState({action_status : 'success'})
    }else{
      if (resPatch.response !== undefined && resPatch.response.data !== undefined && resPatch.response.data.error !== undefined) {
        if (resPatch.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: resPatch.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: resPatch.response.data.error });
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
            <span style={{lineHeight :'2', fontSize : '17px'}}>PS SRN </span>
            {this.state.ps_dis_data.submission_status !== "SUBMITTED" && (
              <Fragment>
                <Button size="sm" onClick={this.submitPSDis} color='primary' style={{float : 'right', margin : '0 10px 0 10px'}}>
                  Submit
                </Button>
                <Button color="info" style={{float : 'right', margin : '0px 10px'}} size="sm" onClick={this.handleChangeEditQty}>
                  Edit Material Qty
                </Button>
              </Fragment>
            )}
          </CardHeader>
          <CardBody>
            <div>
              <Row>
                <Col md="12">
                  <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
                    <tbody>
                      <tr>
                        <td colSpan="4" style={{textAlign : 'center', color : 'rgba(59,134,134,1)', fontSize : '21px'}}>Plant Spec Dismantle Detail</td>
                      </tr>
                      <Fragment>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Plant Spec Dismantle ID : {this.state.ps_dis_data.no_plantspec_srn}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Project Name : {this.state.ps_dis_data.project_name}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Tower ID : {this.state.ps_dis_data.site_info !== undefined ? this.state.ps_dis_data.site_info.map(psd => psd.site_id+" ("+psd.site_name+")") : null}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>MRA  Related : {this.state.ps_dis_data.mra_id}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Region : {this.state.ps_dis_data.site_info !== undefined ? this.state.ps_dis_data.site_info.map(psd => psd.region) : null}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Category Dis : {this.state.ps_dis_data.plantspec_srn_category}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Current Status : {this.state.ps_dis_data.current_status}</td>
                      </tr>
                      </Fragment>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : 'rgba(59,134,134,1)', marginTop: '5px'}}></hr>
              <Row>
                <Col md="12">
                  {this.state.edit_qty_mat_dis === true && (
                    <Button color="success" style={{float : 'right', margin : '0px 10px 10px 10px'}} size="sm" onClick={this.updateMaterialQty}>
                      Update Material Qty
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Table hover bordered striped responsive size="sm">
                    <thead style={{backgroundColor : '#0B486B', color : 'white'}}>
                      <tr>
                        <th className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>PP / Material Code</th>
                        <th className="fixedhead" style={{verticalAlign : 'middle'}}>PP / Material Name</th>
                        <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>UoM</th>
                        <th className="fixedhead" style={{width : '150px', verticalAlign : 'middle'}}>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ps_dis_data.srn_packages !== undefined && this.state.ps_dis_data.srn_packages.filter(e => e.product_type.toLowerCase() !== "svc").map((pp,arr_pp) =>
                        <Fragment>
                          <tr key={arr_pp} style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                            <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                            <td>{pp.product_name}</td>
                            <td>{pp.uom}</td>
                            <td align='center'>{pp.qty.toFixed(2)}</td>
                          </tr>
                          {pp.srn_materials.map((material, arr_mat) =>
                            <tr key={arr_pp+"/"+arr_mat} style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                              <td style={{textAlign : 'right'}}>{material.material_id}</td>
                              <td style={{textAlign : 'left'}}>{material.material_name}</td>
                              <td>{material.uom}</td>
                              {this.state.edit_qty_mat_dis === true ? (
                                <td key={arr_mat} align='center'>
                                  <Input type="number" name={material._id} value={this.state.qty_material_new.has(material._id) ? this.state.qty_material_new.get(material._id) : material.qty} onChange={this.handleChangeQtyMaterial}/>
                                </td>
                              ) : (
                                <td key={arr_mat} align='center'>{ material.qty }</td>
                              )}
                            </tr>
                          )}
                        </Fragment>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter>
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

export default connect(mapStateToProps)(PSDisDetail);
