import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import {
  postDatatoAPINODE,
  patchDatatoAPINODE,
  getDatafromAPINODE,
  getDatafromAPIISAT,
  getDatafromAPINODEFile
} from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_XL = "https://api-dev.isat.pdb.e-dpm.com/isatapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class AssingPStoMRWH extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
        data_mr : null,
        list_tssr : [],
        list_tssr_for_selection : [],
        id_tssr_selected : null,
        data_tssr : null,
        data_tssr_sites_item : [],
        data_tssr_sites : [],
        tssr_site_NE : null,
        tssr_site_FE : null,
        list_pp_material_tssr : [],
        mr_type : "RBS",
        qty_ne : new Map(),
        qty_fe : new Map(),
        redirectSign : false,
        action_status : null,
        action_message : null,
        material_wh : [],
        material_inbound : [],
        cd_id_to_tssr_selected : new Map(),
        cd_id_to_tssr : [],
        list_tssr_from_ps : [],
        list_cd_id_mr : [],
        modal_assign_ps : false,
        wbs_cd_id_data : [],
        ps_wh_data : {},
    };
    this.handleChangeTSSR = this.handleChangeTSSR.bind(this);
    this.getQtyTssrPPNE = this.getQtyTssrPPNE.bind(this);
    this.getQtyTssrPPFE = this.getQtyTssrPPFE.bind(this);
    this.editQtyNE = this.editQtyNE.bind(this);
    this.editQtyFE = this.editQtyFE.bind(this);
    this.connectMRtoPSWarehouse = this.connectMRtoPSWarehouse.bind(this);
    this.getDataWarehouse = this.getDataWarehouse.bind(this);
    this.getDataInbound = this.getDataInbound.bind(this);
    this.toggleAssign = this.toggleAssign.bind(this);
  }

  toggleAssign(e) {
    this.setState((prevState) => ({
      modal_assign_ps: !prevState.modal_assign_ps,
    }));
  }

  getListTssrAll(){
    getDatafromAPINODE('/plantspec?q={"mr_id" : null, "submission_status" : "SUBMITTED", "origin_wh.value" : "'+this.state.data_mr.origin.value+'", "destination_wh.value" : "'+this.state.data_mr.destination.value+'", "plantspec_type_code" : "'+this.state.data_mr.mr_delivery_type_code+'", "$or" : [{"plantspec_type_code" : "A1"}, {"plantspec_type_code" : "A2"}, {"plantspec_type_code" : "B1"}, {"plantspec_type_code" : "C1"}] }', this.state.tokenUser).then( res => {
    // this.getDatafromAPIBAM('/tssr_sorted_nonpage?projection={"project_name" : 1, "no_tssr_boq" : 1, "_id" : 1, "version" : 1 }').then( res => {
      if(res.data !== undefined){
        const items = res.data.data;
        this.setState({ list_tssr : items }, () => {
          this.prepareSelectionTSSR(items);
        });
      }
    })
  }

  prepareSelectionTSSR(list_tssr){
    const list_tssr_selection = [];
    const list_tssr_filter = list_tssr.filter(i =>
      i.no_plantspec.toLowerCase().includes(("PS").toLowerCase())
    )
    list_tssr_filter.map(tssr =>
        list_tssr_selection.push({'label' : tssr.no_plantspec, 'value' : tssr._id})
    )
    this.setState({ list_tssr_for_selection : list_tssr_selection});
  }

  handleChangeTSSR = (newValue) => {
    const _id_tssr = newValue.value;
    this.setState({id_tssr_selected : _id_tssr, data_tssr : null,tssr_site_NE : null, tssr_site_FE : null }, () => {
      this.getDataTssr(_id_tssr);
    });
  }

  getDataMR(_id_MR){
    getDatafromAPINODE('/matreq/' + _id_MR, this.state.tokenUser).then(resMR => {
      if(resMR.data !== undefined){
        this.setState({ data_mr : resMR.data }, () => {
          this.getListTssrAll();
          if(resMR.data.cust_del !== undefined){
            this.setState({list_cd_id_mr : resMR.data.cust_del }, () => {
              this.getDataCDID(resMR.data.cust_del.map(e => e.cd_id));
            })
          }else{
            this.setState({list_cd_id_mr : [] })
          }
        });
      }
    })
  }

  async getDataCDID(array_cd_id){
    if(array_cd_id.length !== 0){
      let array_in_cdid = '"'+array_cd_id.join('", "')+'"';
      const getWPID = await getDatafromAPIISAT('/custdel_sorted?where={"WP_ID":{"$in" : ['+array_in_cdid+']}}', this.state.tokenUser);
      if(getWPID !== undefined && getWPID.data !== undefined) {
        this.setState({ wbs_cd_id_data : getWPID.data._items});
      }
    }
  }

  getDataTssr(_id_tssr){
    getDatafromAPINODE('/plantspec/'+_id_tssr, this.state.tokenUser).then( resTssr => {
      if(resTssr.data !== undefined){
        this.setState({ ps_wh_data : resTssr.data.data });
      }
    })
  }

  async getDataWarehouse(listSku) {
    if(listSku !== null && listSku !== undefined) {
      let skuData = {
        "sku" : listSku
      }
      const respondSKU = await postDatatoAPINODE('/whStock/getWhStockbySku', skuData, this.state.tokenUser);
      if(respondSKU.data !== undefined && respondSKU.status >= 200 && respondSKU.status <= 300 ){
        let array_sku = [];
        respondSKU.data.data.map(sku => sku.map(sku2 => array_sku.push({"sku":sku2.sku, "qty_sku":sku2.qty_sku})));
        this.setState({ material_wh : array_sku });
      }
    }
  }

  async getDataInbound(listSku) {
    // let listSku = [];
    if(listSku !== null && listSku !== undefined) {
      // data_tssr.map(pp => pp.material_detail.map(material => listSku.push(material.material_id)));
      // listSku = [...new Set(listSku)];
      let skuData = {
        "sku" : listSku
      }
      const respondSKU = await postDatatoAPINODE('/whInboundPlan/getWhInboundPlanbySku', skuData, this.state.tokenUser);
      if(respondSKU.data !== undefined && respondSKU.status >= 200 && respondSKU.status <= 300 ){
        let array_sku = [];
        respondSKU.data.data.map(sku => sku.map(sku2 => array_sku.push({"sku":sku2.sku, "qty_sku":sku2.qty_sku})));
        this.setState({ material_inbound : array_sku });
      }
    }
  }

  countPSAllocated(data_mr_pp){
    let site_NE = this.state.data_tssr_sites.find(e => e.site_title === "NE");
    let site_FE = this.state.data_tssr_sites.find(e => e.site_title === "FE");
    // const
  }

  prepareDataPP(data_pp, data_material){
    let product_package = data_pp;
    const material_catalogue = data_material;
    for(let i = 0; i < product_package.length; i++){
      const material = material_catalogue.filter(e => e.pp_id === product_package[i].pp_id);
      product_package[i]["list_of_material"] = material;
    }
    this.setState({list_pp_material_tssr : product_package});
  }

  getQtyTssrPPNE(pp_id){
    const itemTssrBom = this.state.tssr_site_NE.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find(e => e.pp_id === pp_id);
    if(getDataPPTssr !== undefined){
      return getDataPPTssr.qty;
    }else{
      return 0;
    }
  }

  getQtyTssrPPFE(pp_id){
    const itemTssrBom = this.state.tssr_site_FE.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find(e => e.pp_id === pp_id);
    if(getDataPPTssr !== undefined){
      return getDataPPTssr.qty;
    }else{
      return 0;
    }
  }

  async connectMRtoPSWarehouse(){
    const dataMRParent = this.state.data_mr;
    const dataPS = this.state.ps_wh_data;
    patchDatatoAPINODE('/matreq/assignPlantSpecWhtoWh/'+dataMRParent._id+'/ps/'+this.state.id_tssr_selected, {}, this.state.tokenUser).then(res => {
      if(res.data !== undefined){
        if(dataMRParent.mr_delivery_type_code === "A1" || dataMRParent.mr_delivery_type_code === "A2"|| dataMRParent.mr_delivery_type_code === "B1"|| dataMRParent.mr_delivery_type_code === "C1"){
          patchDatatoAPINODE('/matreq/requestMatreq/'+dataMRParent._id, {}, this.state.tokenUser);
        }
        this.setState({ action_status : "success" }, () => {
          setTimeout(function() { this.setState({redirectSign : this.props.match.params.id })}.bind(this), 2000 );
        });
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
    })
  }

  editQtyNE = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({ qty_ne : prevState.qty_ne.set(name, value) }));
  }

  editQtyFE = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({ qty_fe : prevState.qty_fe.set(name, value) }));
  }

  componentDidMount(){
    this.getDataMR(this.props.match.params.id);
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/mr-detail/'+this.state.redirectSign} />);
    }
    let qty_wh = undefined, qty_inbound = undefined;
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >Assign PS Warehouse</span>
            <Button color='success' style={{float : 'right'}} disabled={this.state.ps_wh_data.packages === undefined} onClick={this.connectMRtoPSWarehouse}>Assign</Button>
          </CardHeader>
          <CardBody>
            <table>
              <tbody>
                <tr>
                  <td style={{width : '150px'}}>PlantSpec Warehouse</td>
                  <td>:</td>
                  <td style={{width : '300px'}}>
                    <Select
                      cacheOptions
                      options={this.state.list_tssr_for_selection}
                      onChange={this.handleChangeTSSR}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center', color : 'rgba(59,134,134,1)', fontSize : '21px'}}>MR DETAIL</td>
                </tr>
                {this.state.data_mr !== null && (
                  <Fragment>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>MR Warehouse ID : {this.state.data_mr.mr_id}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Project Name : {this.state.data_mr.project_name}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Category : {this.state.data_mr.mr_delivery_type}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Origin WH : {this.state.data_mr.origin !== undefined ? this.state.data_mr.origin.value : null}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Destination WH : {this.state.data_mr.destination !== undefined ? this.state.data_mr.destination.value : null}</td>
                  </tr>
                  </Fragment>
                )}
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : 'rgba(59,134,134,1)', marginTop: '5px'}}></hr>
            <Fragment>
              <hr className="upload-line-ordering"></hr>
              {this.state.data_mr !== null ?
                this.state.data_mr.sow_type === "RBS" && this.state.tssr_site_FE !== null ? (
                  <span style={{color : 'red'}}>You just can choose Plant Spec with same SOW type</span>
                ) : this.state.data_mr.sow_type === "TRM" && this.state.tssr_site_FE === null ? (
                  <span style={{color : 'red'}}>You just can choose Plant Spec with same SOW type</span>
                ) : (<Fragment></Fragment> ) : (<Fragment></Fragment>
              )}
              <div className='divtable2'>
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
                    {this.state.ps_wh_data.packages !== undefined && this.state.ps_wh_data.packages.filter(e => e.product_type.toLowerCase() !== "svc").map((pp,arr_pp) =>
                      <Fragment>
                        <tr key={arr_pp} style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                          <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                          <td>{pp.product_name}</td>
                          <td>{pp.uom}</td>
                          <td align='center'>{pp.qty.toFixed(2)}</td>
                        </tr>
                        {pp.materials.map((material, arr_mat) =>
                          <tr key={arr_pp+"/"+arr_mat} style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                            <td style={{textAlign : 'right'}}>{material.material_id}</td>
                            <td style={{textAlign : 'left'}}>{material.material_name}</td>
                            <td>{material.uom}</td>
                            <td key={arr_mat} align='center'>{ material.qty }</td>
                          </tr>
                        )}
                      </Fragment>
                    )}
                  </tbody>
                </Table>
              </div>
            </Fragment>
          </CardBody>
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

export default connect(mapStateToProps)(AssingPStoMRWH);
