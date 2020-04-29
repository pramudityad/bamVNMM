import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { withScriptjs } from "react-google-maps";
import GMap from './MapComponent';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {ExcelRenderer} from 'react-excel-renderer';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class MRDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      list_mr_item : [],
      rowsXLS : [],
        data_mr : null,
        mr_site_NE : null,
        mr_site_FE : null,
        update_mr_form : new Array(9).fill(null),
        update_mr_name_form : new Array(9).fill(null),
        mr_pp : [],
        mr_md : [],
        mr_item : [],
        tabs_submenu : [true, false, false, false],
        edit_detail : false,
        action_status : null,
        action_message : null,
        material_wh : [],
        material_inbound : [],
    };
    this.getQtyMRPPNE = this.getQtyMRPPNE.bind(this);
    this.getQtyMRPPFE = this.getQtyMRPPFE.bind(this);
    this.getQtyMRMDNE = this.getQtyMRMDNE.bind(this);
    this.getQtyMRMDFE = this.getQtyMRMDFE.bind(this);
    this.changeTabsSubmenu = this.changeTabsSubmenu.bind(this);
    this.requestForApproval = this.requestForApproval.bind(this);
    this.ApproveMR = this.ApproveMR.bind(this);
    this.changeEditable = this.changeEditable.bind(this);
    this.handleChangeFormMRUpdate = this.handleChangeFormMRUpdate.bind(this);
    this.updateDataMR = this.updateDataMR.bind(this);
    this.downloadMaterialMRUpload = this.downloadMaterialMRUpload.bind(this);
  }

  async getDatafromAPIBMS(url){
    try {
      let respond = await axios.get(API_URL_BMS_Phil +url, {
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
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async getDatafromAPIBAM(url){
    try {
      let respond = await axios.get(API_URL_BAM +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Get Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async postDatatoAPIBAM(url, data){
    try {
      let respond = await axios.post(API_URL_BAM +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPIBAM(url, data, _etag){
    try {
      let respond = await axios.patch(API_URL_BAM +url, data, {
        headers : {'Content-Type':'application/json', "If-Match" : _etag},
        auth: {
          username: usernameBAM,
          password: passwordBAM
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE+url, {
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

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(API_URL_NODE+url, data, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond post data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond post data", err.response);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data){
    try {
      let respond = await axios.patch(API_URL_NODE +url, data, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Post Data", err);
      return respond;
    }
  }

  checkValueReturn(value1, value2){
    // if value undefined return Value2
    if( typeof value1 !== 'undefined' && value1 !== null) {
      console.log('value1', value1);
      return value1;
    }else{
      console.log('value2', value2);
      return value2;
    }
  }

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if(fileObj !== undefined){
      ExcelRenderer(fileObj, (err, rest) => {
        if(err){
          console.log(err);
        }
        else{
          this.ArrayEmptytoNull(rest.rows);
        }
      });
    }
  }

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[0].length; j++){
        col.push(this.checkValue(dataXLS[i][j]));
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
  }

  getDataMR(_id_MR){
    this.getDataFromAPINODE('/matreq/'+_id_MR).then(resMR => {
      if(resMR.data !== undefined){
        this.setState({ data_mr :  resMR.data}, () => {
          this.setState({mr_pp : resMR.data.packages.filter(e => e.qty !== 0)}, () => {
            if(resMR.data.current_milestones === "MS_JOINT_CHECK"){
              this.getDataWarehouse(resMR.data.packages);
              this.getDataInbound(resMR.data.packages)
            }
            this.prepareView();
          });
        });
      }
    })
  }

  async getDataWarehouse(data_ps) {
    let listSku = [];
    if(data_ps !== null && data_ps !== undefined) {
      data_ps.map(pp => pp.materials.map(material => listSku.push(material.material_id)));
      listSku = [...new Set(listSku)];
      let skuData = {
        "sku" : listSku
      }
      const respondSKU = await this.postDatatoAPINODE('/whStock/getWhStockbySku', skuData);
      if(respondSKU.data !== undefined && respondSKU.status >= 200 && respondSKU.status <= 300 ){
        let array_sku = [];
        respondSKU.data.data.map(sku => sku.map(sku2 => array_sku.push({"sku":sku2.sku, "qty_sku":sku2.qty_sku})));
        this.setState({ material_wh : array_sku });
      }
    }
  }

  async getDataInbound(data_ps) {
    let listSku = [];
    if(data_ps !== null && data_ps !== undefined) {
      data_ps.map(pp => pp.materials.map(material => listSku.push(material.material_id)));
      listSku = [...new Set(listSku)];
      let skuData = {
        "sku" : listSku
      }
      const respondSKU = await this.postDatatoAPINODE('/whInboundPlan/getWhInboundPlanbySku', skuData);
      if(respondSKU.data !== undefined && respondSKU.status >= 200 && respondSKU.status <= 300 ){
        let array_sku = [];
        respondSKU.data.data.map(sku => sku.map(sku2 => array_sku.push({"sku":sku2.sku, "qty_sku":sku2.qty_sku})));
        this.setState({ material_inbound : array_sku });
      }
    }
  }

  prepareView(){
    const mr_data = this.state.data_mr;
    const data_pp = this.state.mr_pp;
    let list_mr_id_item = [...new Set(data_pp.map(({ pp_id}) => pp_id))];
    let list_mr_item = [];
    let site_NE = undefined;
    let site_FE = undefined;
    const data_pp_uniq = [...new Set(data_pp.map(({ id_pp_doc}) => id_pp_doc))];
    for(let i = 0; i < list_mr_id_item.length; i++){
      let idxItem = data_pp.find(e => e.pp_id === list_mr_id_item[i]);
      if(idxItem !== undefined){
        list_mr_item.push(idxItem);
      }
    }
    this.setState({list_mr_item : list_mr_item});
    if(mr_data.site_info.length !== 0){
      site_NE = mr_data.site_info.find( e => e.site_title === "NE");
      site_FE = mr_data.site_info.find( e => e.site_title === "FE");
    }
    if(site_NE !== undefined){
      let data_pp_NE = data_pp.filter(e => e.site_id === site_NE.site_id);
      site_NE["mr_pp"] = data_pp_NE;
      this.setState({ mr_site_NE : site_NE });
    }
    if(site_FE !== undefined){
      let data_pp_FE = data_pp.filter(e => e.site_id === site_FE.site_id);
      site_FE["mr_pp"] = data_pp_FE;
      this.setState({ mr_site_FE : site_FE });
    }
  }

  getQtyMRPPNE(pp_id){
    const itemMRBom = this.state.mr_site_NE.mr_pp;
    const getDataPPMR = itemMRBom.find(e => e.pp_id === pp_id);
    if(getDataPPMR !== undefined){
      return getDataPPMR.qty;
    }else{
      return 0;
    }
  }

  getQtyMRPPFE(pp_id){
    const itemMRBom = this.state.mr_site_FE.mr_pp;
    const getDataPPMR = itemMRBom.find(e => e.pp_id === pp_id);
    if(getDataPPMR !== undefined){
      return getDataPPMR.qty;
    }else{
      return 0;
    }
  }

  getQtyMRMDNE(pp_id, mr_id){
    const itemMRBom = this.state.mr_site_NE.mr_pp;
    const getDataPPMR = itemMRBom.find(e => e.pp_id === pp_id);
    if(getDataPPMR !== undefined){
      const getDataMDMR = getDataPPMR.materials.find(e => e.material_id === mr_id);
      if(getDataMDMR !== undefined){
        return getDataMDMR.qty;
      }else{
        return 0;
      }
    }else{
      return 0;
    }
  }

  getQtyMRMDFE(pp_id, mr_id){
    const itemMRBom = this.state.mr_site_FE.mr_pp;
    const getDataPPMR = itemMRBom.find(e => e.pp_id === pp_id);
    if(getDataPPMR !== undefined){
      const getDataMDMR = getDataPPMR.materials.find(e => e.material_id === mr_id);
      if(getDataMDMR !== undefined){
        return getDataMDMR.qty;
      }else{
        return 0;
      }
    }else{
      return 0;
    }
  }

  changeEditable(e){
    this.setState(prevState => ({
      edit_detail: !prevState.edit_detail
    }));
  }

  changeTabsSubmenu(e){
    console.log("tabs_submenu", e);
    let tab_submenu = new Array(4).fill(false);
    tab_submenu[parseInt(e)] = true;
    this.setState({ tabs_submenu : tab_submenu });
  }

  handleChangeFormMRUpdate(e){
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.update_mr_form;
    dataForm[parseInt(index)] = value;
    const indexOpt = e.target.selectedIndex;
    if(indexOpt !== undefined){
      let dataFormName = this.state.update_mr_name_form;
      const textOpt = e.target[indexOpt].text;
      dataFormName[parseInt(index)] = textOpt;
      this.setState({update_mr_name_form : dataFormName});
    }
    this.setState({update_mr_form : dataForm}, () => {
      console.log("PPForm", this.state.update_mr_form, this.state.update_mr_name_form);
    });
  }

  milestoneStat(ms_name, ms_date, ms_updater, index)
  {
    switch ( ms_name )
    {
      case 'MS_ORDER_CREATED':
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={ms_date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Order Created</h3>
          <h4 className="vertical-timeline-element-subtitle">by <b>{ms_updater}</b></h4>
        </VerticalTimelineElement>;
      case 'MS_ORDER_RECEIVED':
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={ms_date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Order Received</h3>
          <h4 className="vertical-timeline-element-subtitle">by <b>{ms_updater}</b></h4>
        </VerticalTimelineElement>;
      case 'MS_ORDER_PROCESSING':
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={ms_date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Order Processing</h3>
          <h4 className="vertical-timeline-element-subtitle">by <b>{ms_updater}</b></h4>
        </VerticalTimelineElement>;
      case 'MS_READY_TO_DELIVER':
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={ms_date}
          iconStyle={{ background: 'rgb(227, 30, 16)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Ready to Deliver</h3>
          <h4 className="vertical-timeline-element-subtitle">confirmed by <b>{ms_updater}</b></h4>
        </VerticalTimelineElement>;
      case 'MS_JOINT_CHECK':
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={ms_date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Joint Check</h3>
          <h4 className="vertical-timeline-element-subtitle">initiated by <b>{ms_updater}</b></h4>
        </VerticalTimelineElement>;
      case 'MS_LOADING_PROCESS':
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={ms_date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Loading Process</h3>
          <h4 className="vertical-timeline-element-subtitle">initiated by <b>{ms_updater}</b></h4>
        </VerticalTimelineElement>;
      default:
        return <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date=""
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}

      >
          <h3 className="vertical-timeline-element-title">Data not available</h3>
        </VerticalTimelineElement>;
    }
  }

  componentDidMount(){
    this.getDataMR(this.props.match.params.id);
    document.title = 'MR Detail | BAM';
  }

  // async plantSpecUnassigned(){
  //   const dataMR = this.state.data_mr;
  //   const dataMRPP = this.state.mr_pp;
  //   const dataMRMD = this.state.mr_md;
  //   for(let i = 0; i < dataMRMD.length; i++){
  //   }
  // }

  requestForApproval(){
    let dataMR = this.state.data_mr;
    this.patchDatatoAPINODE('/matreq/requestMatreq/'+dataMR._id).then(res => {
      if(res.data !== undefined){
        this.setState({ action_status : "success" });
      }else{
        this.setState({ action_status : "failed" });
      }
    })
  }

  ApproveMR(){
    let dataMR = this.state.data_mr;
    this.patchDatatoAPINODE('/matreq/approveMatreq/'+dataMR._id).then(res => {
      if(res.data !== undefined){
        this.setState({ action_status : "success" });
      }else{
        this.setState({ action_status : "failed" });
      }
    })
  }

  async updateDataMR(){
    const dataForm = this.state.update_mr_name_form;
    const dataMR = this.state.data_mr;
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const dataStatus = [{
      "mr_status_name": "MATERIAL_REQUEST",
      "mr_status_value": "UPDATED",
      "mr_status_date": dateNow,
      "mr_status_updater": this.state.userEmail,
      "mr_status_updater_id": this.state.userId
    }];
    let patchData = {};
    patchData["eta"] = dataForm[3] !== null ? dataForm[3]+" 23:59:59" : dataMR.eta;
    patchData["requested_eta"] = dataForm[3] !== null ? dataForm[3]+" 23:59:59" : dataMR.requested_eta;
    patchData["etd"] = dataForm[2] !== null ? dataForm[2]+" 23:59:59" : dataMR.etd;
    patchData["dsp_company"] = dataForm[1] !== null ? dataForm[1] : dataMR.dsp_company;
    patchData["current_mr_status"] = "MR UPDATED";
    patchData["mr_status"] = dataMR.mr_status.concat(dataStatus);
    const respondPatchMR = await this.patchDatatoAPIBAM('/mr_op/'+dataMR._id, patchData, dataMR._etag);
    if(respondPatchMR.data !== undefined && respondPatchMR.status >= 200 && respondPatchMR.status <= 300 ){
      this.setState({action_status : 'success'});
    }else{
      this.setState({action_status : 'failed'});
    }
  }

  async downloadMaterialMRUpload() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataMR = this.state.data_mr;
    const dataItemMR = this.state.list_mr_item;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;

    let headerRow = ["bundle_id", "bundle_name", "material_id_plan", "material_name_plan", "material_id_actual", "material_name_actual", "unit", "qty", "stock_warehouse", "inbound_warehouse", "availability"];
    ws.addRow(headerRow);

    for(let i = 0; i < dataItemMR.length; i++){
      for(let j = 0; j < dataItemMR[i].materials.length; j++){
        let dataMatIdx = dataItemMR[i].materials[j];
        let qty_wh = stockWH.find(e => e.sku === dataMatIdx.material_id);
        let qty_inbound = inboundWH.find(e => e.sku === dataMatIdx.material_id)
        qty_wh = qty_wh !== undefined ? qty_wh.qty_sku : 0;
        qty_inbound = qty_inbound !== undefined ? qty_inbound.qty_sku : 0;
        ws.addRow([dataItemMR[i].pp_id, dataItemMR[i].product_name, dataMatIdx.material_id, dataMatIdx.material_name, dataMatIdx.material_id, dataMatIdx.material_name, dataMatIdx.material_unit, this.getQtyMRMDNE(dataItemMR[i].pp_id, dataMatIdx.material_id), qty_wh, qty_inbound, (this.getQtyMRMDNE(dataItemMR[i].pp_id, dataMatIdx.material_id)) < qty_wh ? "OK":"NOK"]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Material MR '+dataMR.mr_id+' uploader.xlsx');
  }

  render() {
    const background = {
      backgroundColor: '#e3e3e3',
    };

    const MapLoader = withScriptjs(GMap);

    console.log("tabs_submenu", this.state.tabs_submenu);
    let qty_wh = undefined, qty_inbound = undefined;
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}}><i className="fa fa-info-circle" style={{marginRight: "8px"}}></i>MR Detail</span>
            {/* }<Button style={{float : 'right'}} color="warning" onClick={this.changeEditable}>Editable</Button> */}
            {this.state.edit_detail !== false && (
              <Button style={{float : 'right', marginRight : '10px'}} color="success" onClick={this.updateDataMR}>Save</Button>
            )}
          </CardHeader>
          <CardBody>
            <div style={{marginBottom : '10px'}}>
            <Nav tabs>
              <NavItem>
              <NavLink href="#" active={this.state.tabs_submenu[0]} value="0" onClick={this.changeTabsSubmenu.bind(this, 0)}>MR Info</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" active={this.state.tabs_submenu[1]} value="1" onClick={this.changeTabsSubmenu.bind(this, 1)}>MR Material</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" active={this.state.tabs_submenu[2]} value="2" onClick={this.changeTabsSubmenu.bind(this, 2)}>Progress Overview</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" active={this.state.tabs_submenu[3]} value="2" onClick={this.changeTabsSubmenu.bind(this, 3)}>Map View</NavLink>
              </NavItem>
            </Nav>
            </div>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center', color : 'rgba(59,134,134,1)', fontSize : '21px'}}>MR DETAIL</td>
                </tr>
                {this.state.data_mr !== null && (
                  <Fragment>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>MR ID : {this.state.data_mr.mr_id}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Project Name : {this.state.data_mr.project_name}</td>
                  </tr>
                  </Fragment>
                )}
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : 'rgba(59,134,134,1)', marginTop: '5px'}}></hr>
            {this.state.tabs_submenu[0] === true && (
              <Row>
                <Col md="6">
                  <table style={{marginBottom : '10px', fontSize : '15px'}}>
                    <tbody>
                      {this.state.data_mr !== null && (
                        <Fragment>
                        <tr>
                          <td style={{width : '175px'}}>CD ID</td>
                          <td>: </td>
                          {this.state.data_mr.cust_del !== undefined ? (
                            <td>{this.state.data_mr.cust_del.map(e => e.cd_id+", ")}</td>
                          ) : (
                            <td>{this.state.data_mr.cd_id}</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>Project</td>
                          <td>: </td>
                          <td>{this.state.data_mr.project_name}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>MR Delivery Type</td>
                          <td>: </td>
                          <td>{this.state.data_mr.mr_delivery_type}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>DSP Company</td>
                          <td>: </td>
                          <td>
                            {this.state.edit_detail === false ? this.state.data_mr.dsp_company : (
                              <Input type="select" name="1" value={this.state.update_mr_form[1] === null ? this.state.data_mr.dsp_company : this.state.update_mr_form[1] } onChange={this.handleChangeFormMRUpdate}>
                                <option value="" disabled selected hidden>Select DSP Company</option>
                                <option value="PT BMS Delivery">PT BMS Delivery</option>
                                <option value="PT MITT Delivery">PT MITT Delivery</option>
                                <option value="PT IXT Delivery">PT IXT Delivery</option>
                                <option value="PT ARA Delivery">PT ARA Delivery</option>
                              </Input>
                            )}
                          </td>
                        </tr>
                        {/* }<tr>
                          <td style={{width : '200px'}}>Origin {this.state.data_mr.origin_warehouse.title}</td>
                          <td>: </td>
                          <td>{this.state.data_mr.origin_warehouse.value}</td>
                        </tr> */}
                        <tr>
                          <td style={{width : '200px'}}>ETD</td>
                          <td>: </td>
                          <td>
                            {this.state.edit_detail === false ? this.state.data_mr.etd : (
                              <Input
                                type="date"
                                name="2"
                                value={this.state.update_mr_form[2] === null ? this.state.data_mr.etd : this.state.update_mr_form[2]} onChange={this.handleChangeFormMRUpdate}
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>ASP Company</td>
                          <td>: </td>
                          <td>{this.state.data_mr.asp_company}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>Current Status</td>
                          <td>: </td>
                          <td>{this.state.data_mr.current_mr_status}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>Current Milestone</td>
                          <td>: </td>
                          <td>{this.state.data_mr.current_milestones}</td>
                        </tr>
                        {this.state.mr_site_NE !== null && (
                          <Fragment>
                          <tr>
                            {this.state.data_mr.mr_type === "Relocation" || this.state.data_mr.mr_type === "Return" ? (
                              <td style={{width : '200px'}}>Destination {this.state.data_mr.destination.title}</td>
                            ) : (
                              <td style={{width : '200px'}}>Site ID NE</td>
                            )}
                            <td>: &nbsp;</td>
                            {this.state.data_mr.mr_type === "Relocation" || this.state.data_mr.mr_type === "Return" ? (
                              <td style={{width : '200px'}}>{this.state.data_mr.destination.value}</td>
                            ) : (
                              <td>{this.state.mr_site_NE.site_id}</td>
                            )}
                          </tr>
                          {this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                            <tr>
                              <td style={{width : '200px'}}>Site Name NE</td>
                              <td>:</td>
                              <td>{this.state.mr_site_NE.site_name}</td>
                            </tr>
                          ) : ""}
                          </Fragment>
                        )}
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </Col>
                <Col md="6">
                  <table style={{marginBottom : '0px', fontSize : '15px'}}>
                    <tbody>
                      {this.state.data_mr !== null && (
                        <Fragment>
                        <tr>
                          <td style={{width : '175px'}}>SOW Type</td>
                          <td>: </td>
                          <td>{this.state.data_mr.sow_type}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>&nbsp;</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style={{width : '175px'}}>MR Type</td>
                          <td>: </td>
                          <td>{this.state.data_mr.mr_type}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>&nbsp;</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>&nbsp;</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>ETA</td>
                          <td>: </td>
                          <td>
                            {this.state.edit_detail === false ? this.state.data_mr.eta : (
                              <Input
                                type="date"
                                name="3"
                                value={this.state.update_mr_form[3] === null ? this.state.data_mr.eta : this.state.update_mr_form[3]} onChange={this.handleChangeFormMRUpdate}
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>&nbsp;</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>&nbsp;</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>&nbsp;</td>
                          <td></td>
                          <td></td>
                        </tr>
                        {this.state.mr_site_FE !== null && this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                          <Fragment>
                          <tr>
                            <td style={{width : '200px'}}>Site ID FE</td>
                            <td>: &nbsp;</td>
                            <td>{this.state.mr_site_FE.site_id}</td>
                          </tr>
                          <tr>
                            <td style={{width : '200px'}}>Site Name FE</td>
                            <td>:</td>
                            <td>{this.state.mr_site_FE.site_name}</td>
                          </tr>
                          </Fragment>
                        ) : ("")}
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </Col>
              </Row>
            ) }
            {this.state.tabs_submenu[1] === true && (
            <Fragment>
              <Row>
                <Col md="6">
                  <table>
                    <tbody>
                      {this.state.data_mr !== null && (
                        <Fragment>
                        {this.state.mr_site_NE !== null && (
                          <Fragment>
                          <tr>
                            {this.state.data_mr.mr_type === "Relocation" || this.state.data_mr.mr_type === "Return" ? (
                              <td style={{width : '200px'}}>Destination {this.state.data_mr.destination.title}</td>
                            ) : (
                              <td style={{width : '200px'}}>Site ID NE</td>
                            )}
                            <td>: &nbsp;</td>
                            {this.state.data_mr.mr_type === "Relocation" || this.state.data_mr.mr_type === "Return" ? (
                              <td style={{width : '200px'}}>{this.state.data_mr.destination.value}</td>
                            ) : (
                              <td>{this.state.mr_site_NE.site_id}</td>
                            )}
                          </tr>
                          {this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                            <tr>
                              <td style={{width : '200px'}}>Site Name NE</td>
                              <td>:</td>
                              <td>{this.state.mr_site_NE.site_name}</td>
                            </tr>
                          ) : ""}
                          <tr>
                            <td style={{width : '200px'}}>Total Box</td>
                            <td>:</td>
                            <td>{this.state.data_mr.total_boxes}</td>
                          </tr>
                          <tr>
                            <td style={{width : '200px'}}>Box ID</td>
                            <td>:</td>
                            <td>{this.state.data_mr.list_of_box_id !== undefined ? this.state.data_mr.list_of_box_id.map(e => e+", ") : ""}</td>
                          </tr>

                          </Fragment>
                        )}
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </Col>
                <Col md="6">
                  <table style={{marginBottom : '0px'}}>
                    <tbody>
                      {this.state.data_mr !== null && (
                        <Fragment>
                        <tr>
                          <td style={{width : '550px'}}>
                            <Button size="sm" color="secondary" style={{float : 'right'}} onClick={this.downloadMaterialMRUpload}>
                              Download Format
                            </Button>
                          </td>
                        </tr>
                        {this.state.mr_site_FE !== null && this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                          <Fragment>
                          <tr>
                            <td style={{width : '200px'}}>Site ID FE</td>
                            <td>: &nbsp;</td>
                            <td>{this.state.mr_site_FE.site_id}</td>
                          </tr>
                          <tr>
                            <td style={{width : '200px'}}>Site Name FE</td>
                            <td>:</td>
                            <td>{this.state.mr_site_FE.site_name}</td>
                          </tr>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <tr>
                              <td>&nbsp;</td>
                            </tr>
                          </Fragment>
                        )}
                        <tr>
                          <td style={{width : '550px'}}>
                            <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{"visiblity":"hidden"}}/>
                            <Button size="sm" color="secondary" style={{float : 'right'}} onClick={this.downloadMaterialMRUpload} disabled={this.state.rowsXLS.length === 0}>
                              Save
                            </Button>
                          </td>
                        </tr>
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </Col>
              </Row>
              <hr className="upload-line-ordering"></hr>
              <div className='divtable2'>
                <Table hover bordered striped responsive size="sm">
                  <thead style={{backgroundColor : '#0B486B', color : 'white'}} className="table-mr__header--fixed">
                    <tr>
                      <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>PP / Material Code</th>
                      <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>PP / Material Name</th>
                      <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Unit</th>
                      <th colSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Total Qty per PP</th>
                      {this.state.data_mr !== null && this.state.data_mr.current_milestones === "MS_JOINT_CHECK" ? (
                        <Fragment>
                          <th rowSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Material in Warehouse</th>
                          <th rowSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Material Plan</th>
                          <th rowSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Availability</th>
                        </Fragment>
                      ) : (<Fragment></Fragment>)}
                    </tr>
                    {this.state.data_mr !== null && this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                      <tr>
                        <th className="fixedhead" colSpan={this.state.mr_site_FE !== null ? 1 : 2} style={{width : '100px', verticalAlign : 'middle'}}>Site NE</th>
                        {this.state.mr_site_FE !== null ? (
                          <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>SITE FE</th>
                        ):(<Fragment></Fragment>)}
                      </tr>
                    ) : ""}
                  </thead>
                  {this.state.data_mr !== null && this.state.data_mr.current_milestones === "MS_JOINT_CHECK" ? (
                    <tbody>
                    {this.state.mr_site_NE !== null && (
                      this.state.list_mr_item.map( pp =>
                        <Fragment>
                          <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                            <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                            <td>{pp.product_name}</td>
                            <td>{pp.unit}</td>
                            <td align='center' colSpan={this.state.mr_site_FE !== null ? 1 : 2}>{this.getQtyMRPPNE(pp.pp_id).toFixed(2)}</td>
                            {this.state.mr_site_FE !== null ? (
                              <td align='center'>{this.getQtyMRPPFE(pp.pp_id)}</td>
                            ):(<Fragment></Fragment>)}
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          {pp.materials.map(material =>
                            <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                              <td style={{textAlign : 'right'}}>{material.material_id}</td>
                              <td style={{textAlign : 'left'}}>{material.material_name}</td>
                              <td>{material.material_unit}</td>
                              <td align='center' colSpan={this.state.mr_site_FE !== null ? 1 : 2}>{this.getQtyMRMDNE(pp.pp_id, material.material_id).toFixed(2)}</td>
                              {this.state.mr_site_FE !== null ? (
                                <td align='center'>{this.getQtyMRMDFE(pp.pp_id, material.material_id)}</td>
                              ):(<Fragment></Fragment>)}
                              <td align='center'>{qty_wh = this.state.material_wh.find(e => e.sku === material.material_id) !== undefined ? this.state.material_wh.find(e => e.sku === material.material_id).qty_sku.toFixed(2) : 0}</td>
                              <td align='center'>{qty_inbound = this.state.material_inbound.find(e => e.sku === material.material_id) !== undefined ? this.state.material_inbound.find(e => e.sku === material.material_id).qty_sku.toFixed(2) : 0}</td>
                              <td align='center'>{(this.getQtyMRMDNE(pp.pp_id, material.material_id)) < qty_wh ? "OK":"NOK"}</td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    )}
                    {this.state.data_mr === null ?
                      (<tr><td colSpan="5">Loading...</td></tr>)
                      : this.state.data_mr.current_mr_status === "NOT ASSIGNED" && (
                        <tr><td colSpan="5">PS not Assigned</td></tr>
                      )}
                    </tbody>
                  ) : (<tbody>
                  {this.state.mr_site_NE !== null && (
                    this.state.list_mr_item.map( pp =>
                      <Fragment>
                        <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                          <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                          <td>{pp.name}</td>
                          <td>{pp.unit}</td>
                          <td align='center'>{this.getQtyMRPPNE(pp.pp_id)}</td>
                          {this.state.mr_site_FE !== null ? (
                            <td align='center'>{this.getQtyMRPPFE(pp.pp_id)}</td>
                          ):(<Fragment></Fragment>)}
                        </tr>
                        {pp.materials.map(material =>
                          <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                            <td style={{textAlign : 'right'}}>{material.material_id}</td>
                            <td style={{textAlign : 'left'}}>{material.material_name}</td>
                            <td>{material.material_unit}</td>
                            <td align='center'>{this.getQtyMRMDNE(pp.pp_id, material.material_id)}</td>
                            {this.state.mr_site_FE !== null ? (
                              <td align='center'>{this.getQtyMRMDFE(pp.pp_id, material.material_id)}</td>
                            ):(<Fragment></Fragment>)}
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                  {this.state.data_mr === null ?
                    (<tr><td colSpan="5">Loading...</td></tr>)
                    : this.state.data_mr.current_mr_status === "NOT ASSIGNED" && (
                      <tr><td colSpan="5">PS not Assigned</td></tr>
                    )}
                  </tbody>)}
                </Table>
              </div>
            </Fragment>
          )}
          {this.state.tabs_submenu[2] === true && (
            <Fragment>
              <div className="animated fadeIn">
                <Row>
                  <Col xs="12" lg="12">
                    <Card>
                      <CardHeader>
                        {this.state.data_mr !== null &&
                          <span> Progress Overview for <b>{this.state.data_mr.mr_id}</b> </span>
                        }
                      </CardHeader>
                      <CardBody
                        style={background}
                      >
                        <VerticalTimeline>
                          {this.state.data_mr !== null &&
                            this.state.data_mr.mr_milestones.map((ms, i) => {
                              return this.milestoneStat(ms.ms_name, ms.ms_date, ms.ms_updater, i)
                            })
                          }
                        </VerticalTimeline>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Fragment>
          )}
          {this.state.tabs_submenu[3] === true && (
            <Fragment>
                {/* <GoogleMap site_lat={-6.3046027} site_lng={106.7951936} /> */}
                <MapLoader
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAoCmcgwc7MN40js68RpcZdSzh9yLrmLF4"
                  loadingElement={<div style={{ height: '100%' }} />}
                />
            </Fragment>
          )}
          </CardBody>
          <CardFooter>
            {this.state.data_mr !== null && (
              <div>
                {this.state.data_mr.current_mr_status === "PLANTSPEC ASSIGNED" ? (
                  <Button color='success' style={{float : 'right'}} onClick={this.requestForApproval}> Send Request</Button>
                ) : (<div></div>)}
                {this.state.data_mr.current_mr_status === "MR REQUESTED" ? (
                  <Button color='success' style={{float : 'right'}} onClick={this.ApproveMR}>Approve</Button>
                ) : (<div></div>)}
              </div>
            )}
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

export default connect(mapStateToProps)(MRDetail);
