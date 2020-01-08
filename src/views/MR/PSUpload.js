import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';

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

class PSUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
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
        action_status : null,
        action_message : null,
    };
    this.handleChangeTSSR = this.handleChangeTSSR.bind(this);
    this.getQtyTssrPPNE = this.getQtyTssrPPNE.bind(this);
    this.getQtyTssrPPFE = this.getQtyTssrPPFE.bind(this);
    this.saveMRtoAPI = this.saveMRtoAPI.bind(this);
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

  getListTssrAll(){
    this.getDatafromAPIBAM('/tssr_sorted_nonpage?projection={"project_name" : 1, "no_tssr_boq" : 1, "_id" : 1 }').then( res => {
      if(res.data !== undefined){
        const items = res.data._items;
        this.setState({ list_tssr : items }, () => {
          this.prepareSelectionTSSR(items);
        });
      }
    })
  }

  prepareSelectionTSSR(list_tssr){
    //Make list tssr from API to format for "Select" from React-select
    const list_tssr_selection = [];
    list_tssr.map(tssr =>
        list_tssr_selection.push({'label' : tssr.no_tssr_boq, 'value' : tssr._id})
    )
    this.setState({ list_tssr_for_selection : list_tssr_selection});
  }

  handleChangeTSSR = (newValue) => {
    const _id_tssr = newValue.value;
    const data_tssr_selection = this.state.list_tssr.find(e => e._id === _id_tssr);
    this.setState({id_tssr_selected : _id_tssr, data_tssr : data_tssr_selection }, () => {
      this.getDataTssr(_id_tssr);
    });
  }

  getDataMR(_id_MR){
    this.getDatafromAPIBAM('/mr_op/'+_id_MR).then(resMR => {
      if(resMR.data !== undefined){
        this.setState({ data_mr : resMR.data });
      }
    })
  }

  getDataTssr(_id_tssr){
    this.getDatafromAPIBAM('/tssr_op/'+_id_tssr).then( resTssr => {
      if(resTssr.data !== undefined){
        this.setState({ data_tssr : resTssr.data });
        this.getDatafromAPIBAM('/tssr_sites_sorted_nonpage?where={"id_tssr_boq_doc" : "'+_id_tssr+'"}').then( resSites => {
          if(resSites.data !== undefined){
            this.getDatafromAPIBAM('/tssr_site_items_sorted_nonpage?where={"id_tssr_boq_doc" : "'+_id_tssr+'"}').then( resItem => {
              if(resItem.data !== undefined){
                const itemsTssr = resItem.data._items;
                const itemUniq = [...new Set(itemsTssr.map(({ id_pp_doc}) => id_pp_doc))];
                this.setState({ data_tssr_sites : resSites.data._items, data_tssr_sites_item : resItem.data._items }, () => {
                  this.getPPandMaterial(itemUniq);
                  this.prepareView();
                });
              }
            })
          }
        })
      }
    })
  }

  prepareView(){
    let site_NE = this.state.data_tssr_sites.find(e => e.site_title === "NE");
    let site_FE = this.state.data_tssr_sites.find(e => e.site_title === "FE");
    console.log("site_NE", site_NE);
    if(site_NE !== undefined){
      site_NE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(e => e.id_tssr_boq_site_doc === site_NE._id);
      this.setState({tssr_site_NE : site_NE});
    }else{
      this.setState({tssr_site_NE : null})
    }
    if(site_FE !== undefined){
      site_FE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(e => e.id_tssr_boq_site_doc === site_FE._id);
      this.setState({tssr_site_FE : site_FE});
    }else{
      this.setState({tssr_site_FE : null})
    }
  }

  async getPPandMaterial(array_id_package){
    let dataPP = [];
    let arrayDataPP = array_id_package;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
        let dataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
        let arrayIdPP = '"'+dataPaginationPP.join('", "')+'"';
        let where_id_PP = '?where={"_id" : {"$in" : ['+arrayIdPP+']}}';
        let resPP = await this.getDatafromAPIBMS('/pp_non_page'+where_id_PP+'&'+'embedded={"list_of_id_material" : 1}');
        if(resPP !== undefined){
            if(resPP.data !== undefined){
              // eslint-disable-next-line
              dataPP = dataPP.concat(resPP.data._items);
            }
        }
    }
    this.setState({list_pp_material_tssr : dataPP});
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

  async saveMRtoAPI(){
    const dataMRParent = this.state.data_mr;
    const dataTSSRParent = this.state.data_tssr;
    const dataTSSRBOMNE = this.state.tssr_site_NE;
    const dataTSSRBOMFE = this.state.tssr_site_FE;
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    let mr_data = {
        "site_info" : [
            {
                "id_site_doc": dataTSSRBOMNE.id_site_doc,
                "site_id": dataTSSRBOMNE.site_id,
                "site_title": "NE",
                "id_tssr_boq_site_doc" : dataTSSRBOMNE._id,
                "no_tssr_boq_site" : dataTSSRBOMNE.no_tssr_boq_site,
                "tssr_version" : dataTSSRBOMNE.version === undefined ? "0" : dataTSSRBOMNE.version,
            }
        ],
        "mr_milestones" : [],
        "current_mr_status" : "PLANTSPEC ASSIGNED",
        "current_milestones" : "",
        "created_by" : this.state.userId,
        "updated_by" : this.state.userId
      };
      let currStatus = [
        {
            "mr_status_name": "PLANTSPEC",
            "mr_status_value": "ASSIGNED",
            "mr_status_date": dateNow,
            "mr_status_updater": this.state.userEmail,
            "mr_status_updater_id": this.state.userId
        }
      ];
      mr_data["mr_status"] = dataMRParent.mr_status.concat(currStatus);
      if(this.state.tssr_site_FE !== null){
        const dataSiteFE = {
            "id_site_doc": dataTSSRBOMFE.id_site_doc,
            "site_id": dataTSSRBOMFE.site_id,
            "site_title": "FE",
            "id_tssr_boq_site_doc" : dataTSSRBOMFE._id,
            "no_tssr_boq_site" : dataTSSRBOMFE.no_tssr_boq_site,
            "tssr_version" : dataTSSRBOMFE.version === undefined ? "0" : dataTSSRBOMFE.version,
        }
        mr_data["site_info"].push()
      }
      const respondSaveMR = await this.patchDatatoAPIBAM('/mr_op/'+dataMRParent._id, mr_data, dataMRParent._etag);
      if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ){
        this.saveMrPPtoAPI(dataMRParent._id, dataMRParent.mr_id, respondSaveMR.data._etag);
      }else{
        this.setState({action_status : 'failed'});
      }
  }

  async saveMrPPtoAPI(_id_mr, mr_id, _etag_mr){
    const dataPPTssr = this.state.list_pp_material_tssr;
    const dataTSSRBOMNE = this.state.tssr_site_NE;
    const dataTSSRBOMFE = this.state.tssr_site_FE;
    let ppMRsave = [];
    //PP for NE
    for(let i = 0; i < dataPPTssr.length; i++){
      let dataTSSRBomItemIndex = dataTSSRBOMNE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
      let ppSave = {
        "id_mr_doc" : _id_mr,
        "mr_id" : mr_id,
        "id_pp_doc" : dataPPTssr[i]._id,
        "pp_id" : dataPPTssr[i].pp_id,
        "id_site_doc" : dataTSSRBOMNE.id_site_doc,
        "site_id" : dataTSSRBOMNE.site_id,
        "product_name" : dataPPTssr[i].name,
        "product_type" : dataPPTssr[i].product_type,
        "physical_group" : dataPPTssr[i].phy_group,
        "uom" : dataPPTssr[i].unit,
        "qty" : dataTSSRBomItemIndex.qty,
        "qty_scan" : 0,
        "id_po_doc" : null,
        "po_number" : "demo PO 1",
        "deleted" : 0,
        "created_by" : this.state.userId,
        "updated_by" : this.state.userId
      }
      ppMRsave.push(ppSave);
    }
    //PP for FE
    if(this.state.tssr_site_FE !== null){
      for(let i = 0; i < dataPPTssr.length; i++){
        let dataTSSRBomItemIndex = dataTSSRBOMFE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
        let ppSave = {
          "id_mr_doc" : _id_mr,
          "mr_id" : mr_id,
          "id_pp_doc" : dataPPTssr[i]._id,
          "pp_id" : dataPPTssr[i].pp_id,
          "id_site_doc" : dataTSSRBOMFE.id_site_doc,
          "site_id" : dataTSSRBOMFE.site_id,
          "product_name" : dataPPTssr[i].name,
          "product_type" : dataPPTssr[i].product_type,
          "physical_group" : dataPPTssr[i].phy_group,
          "uom" : dataPPTssr[i].unit,
          "qty" : dataTSSRBomItemIndex.qty,
          "qty_scan" : 0,
          "id_po_doc" : null,
          "po_number" : "demo PO 1",
          "deleted" : 0,
          "created_by" : this.state.userId,
          "updated_by" : this.state.userId
        }
        ppMRsave.push(ppSave);
      }
    }
    const respondSaveMRPP = await this.postDatatoAPIBAM('/mr_pp_op', ppMRsave);
    if(respondSaveMRPP.data !== undefined && respondSaveMRPP.status >= 200 && respondSaveMRPP.status <= 300 ){
      if(ppMRsave.length === 1){
        this.saveMrMattoAPI(_id_mr, mr_id, _etag_mr, [respondSaveMRPP.data]);
      }else{
        this.saveMrMattoAPI(_id_mr, mr_id, _etag_mr, respondSaveMRPP.data._items);
      }
    }else{
      this.setState({action_status : 'failed'});
      this.patchDatatoAPIBAM('/mr_op/'+_id_mr, {"deleted" : 1}, _etag_mr);
    }
  }

  async saveMrMattoAPI(_id_mr, mr_id, _etag_mr, list_data_post_pp_mr){
    const dataPPTssr = this.state.list_pp_material_tssr;
    const dataTSSRBOMNE = this.state.tssr_site_NE;
    const dataTSSRBOMFE = this.state.tssr_site_FE;
    const list_id_pp_mr = list_data_post_pp_mr.map(e => e._id);
    let matMRsave = [];
    //Material for NE
    let indexNE = 0;
    for(let i = 0; i < dataPPTssr.length; i++){
      let dataTSSRBomItemIndex = dataTSSRBOMNE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
      for(let j = 0; j < dataPPTssr[i].list_of_id_material.length; j++){
        const dataMatIndex = dataPPTssr[i].list_of_id_material[j];
        let matSave = {
          "id_mr_doc" : _id_mr,
          "mr_id" : mr_id,
          "id_mr_pp_doc" : list_id_pp_mr[i],
          "id_pp_doc" : dataPPTssr[i]._id,
          "pp_id" : dataPPTssr[i].pp_id,
          "id_site_doc" : dataTSSRBOMNE.id_site_doc,
          "site_id" : dataTSSRBOMNE.site_id,
          "id_mc_doc" : dataMatIndex._id,
          "material_id" : dataMatIndex.material_id,
          "material_name" : dataMatIndex.material_name,
          "material_type" : dataMatIndex.material_type === undefined ? "passive_material" : dataMatIndex.material_type,
          "uom" : dataMatIndex.material_unit,
          "qty" : dataTSSRBomItemIndex.qty*dataMatIndex.material_qty,
          "qty_scan" : 0,
          "id_po_doc" : null,
          "po_number" : "demo PO 1",
          "serial_numbers": [],
          "deleted" : 0,
          "created_by" : this.state.userId,
          "updated_by" : this.state.userId
        }
        matMRsave.push(matSave);
      }
      indexNE = i;
    }
    //Material for FE
    if(this.state.tssr_site_FE !== null){
      for(let i = 0; i < dataPPTssr.length; i++){
        let dataTSSRBomItemIndex = dataTSSRBOMFE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
        for(let j = 0; j < dataPPTssr[i].list_of_id_material.length; j++){
          const dataMatIndex = dataPPTssr[i].list_of_id_material[j];
          let matSave = {
            "id_mr_doc" : _id_mr,
            "mr_id" : mr_id,
            "id_mr_pp_doc" : list_id_pp_mr[i+indexNE],
            "id_pp_doc" : dataPPTssr[i]._id,
            "pp_id" : dataPPTssr[i].pp_id,
            "id_site_doc" : dataTSSRBOMFE.id_site_doc,
            "site_id" : dataTSSRBOMFE.site_id,
            "id_mc_doc" : dataMatIndex._id,
            "material_id" : dataMatIndex.material_id,
            "material_name" : dataMatIndex.material_name,
            "material_type" : dataMatIndex.material_type === undefined ? "passive_material" : dataMatIndex.material_type,
            "uom" : dataMatIndex.material_unit,
            "qty" : dataTSSRBomItemIndex.qty*dataMatIndex.material_qty,
            "qty_scan" : 0,
            "id_po_doc" : null,
            "po_number" : "demo PO 1",
            "serial_numbers": [],
            "deleted" : 0,
            "created_by" : this.state.userId,
            "updated_by" : this.state.userId
          }
          matMRsave.push(matSave);
        }
      }
    }
    const respondSaveMRMat = await this.postDatatoAPIBAM('/mr_md_op', matMRsave);
    if(respondSaveMRMat.data !== undefined && respondSaveMRMat.status >= 200 && respondSaveMRMat.status <= 300 ){
      console.log("Success");
      this.setState({action_status : 'success'});
    }else{
      this.setState({action_status : 'failed'});
      this.patchDatatoAPIBAM('/mr_op/'+_id_mr, {"deleted" : 1}, _etag_mr);
    }
  }

  componentDidMount(){
    this.getDataMR(this.props.match.params.id);
    this.getListTssrAll();
  }

  render() {
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >Assign PS</span>
            <Button color='success' style={{float : 'right'}} disable={this.state.list_pp_material_tssr.length === 0} onClick={this.saveMRtoAPI}>Assign</Button>
          </CardHeader>
          <CardBody>
            <table>
              <tbody>
                <tr>
                  <td style={{width : '150px'}}>TSSR</td>
                  <td>:</td>
                  <td style={{width : '300px'}}>
                    <Select
                      cacheOptions
                      options={this.state.list_tssr_for_selection}
                      onChange={this.handleChangeTSSR}
                    />
                  </td>
                </tr>
                {/*<tr>
                  <td>CD ID</td>
                  <td>:</td>
                  <td style={{width : '300px'}}>
                    <Select
                      cacheOptions
                      options={this.state.list_tssr_for_selection}
                      onChange={this.handleChangeTSSR}
                    />
                  </td>
                </tr> */}
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
            <Fragment>
            <Row>
            {this.state.tssr_site_NE !== null && (
              <Fragment>
                <Col md="4">
                <table className="table-header">
                  <tbody>
                      <tr>
                        <td>Site ID NE</td>
                        <td>: &nbsp;</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_NE.site_id}</td>
                      </tr>
                      <tr>
                        <td>Site Name NE</td>
                        <td>:</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_NE.site_name}</td>
                      </tr>
                  </tbody>
                </table>
                </Col>
                {this.state.tssr_site_FE !== null ? (
                  <Col md="4">
                  <table className="table-header">
                    <tbody>
                      <tr>
                        <td>Site ID FE</td>
                        <td>: &nbsp;</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_FE.site_id}</td>
                      </tr>
                      <tr>
                        <td>Site Name FE</td>
                        <td>:</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_FE.site_name}</td>
                      </tr>
                    </tbody>
                  </table>
                  </Col>
                ) : (<Fragment></Fragment>)}
              </Fragment>
            )}
            </Row>
              <hr className="upload-line-ordering"></hr>
              <div className='divtable2'>
                <Table hover bordered striped responsive size="sm">
                  <thead style={{backgroundColor : '#0B486B', color : 'white'}}>
                    <tr>
                      <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>PP / Material Code</th>
                      <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>PP / Material Name</th>
                      <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Unit</th>
                      <th colSpan="2" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Total Qty per PP</th>
                    </tr>
                    <tr>
                      <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Site NE</th>
                      {this.state.data_tssr_sites[1] !== undefined ? (
                        <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>SITE FE</th>
                      ):(<Fragment></Fragment>)}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.list_pp_material_tssr.map( pp =>
                      <Fragment>
                        <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                          <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                          <td>{pp.name}</td>
                          <td>{pp.unit}</td>
                          <td align='center'>{this.getQtyTssrPPNE(pp.pp_id)}</td>
                          {this.state.tssr_site_FE !== null ? (
                            <td align='center'>{this.getQtyTssrPPFE(pp.pp_id)}</td>
                          ):(<Fragment></Fragment>)}
                        </tr>
                        {pp.list_of_id_material.map(material =>
                          <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                            <td style={{textAlign : 'right'}}>{material.material_id}</td>
                            <td style={{textAlign : 'left'}}>{material.material_name}</td>
                            <td>{material.material_unit}</td>
                            <td align='center'>{this.getQtyTssrPPNE(pp.pp_id)*material.material_qty}</td>
                            {this.state.tssr_site_FE !== null ? (
                              <td align='center'>{this.getQtyTssrPPFE(pp.pp_id)*material.material_qty}</td>
                            ):(<Fragment></Fragment>)}
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

export default connect(mapStateToProps)(PSUpload);
