import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class MRCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        list_tssr : [],
        list_tssr_for_selection : [],
        id_tssr_selected : null,
        data_tssr_selected : null,
        tssr_BOM_data : null,
        list_pp_material_tssr : [],
    };
    this.handleChangeTSSR = this.handleChangeTSSR.bind(this);
    this.getQtyTssrPP = this.getQtyTssrPP.bind(this);
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
    this.getDatafromAPIBMS('/tssr_boq_matrix_sorted_non_page?projection={"project_name" : 1, "no_tssr_boq" : 1, "_id" : 1 }').then( res => {
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
    this.setState({id_tssr_selected : _id_tssr, data_tssr_selected : data_tssr_selection }, () => {
      this.getTSSRBOM();
    });
  }

  getTSSRBOM(){
    //for demo just get one site from each TSSR (for represent TSSR BOM)
    this.getDatafromAPIBMS('/tssr_boq_matrix_sites_op?where={"id_tssr_boq_doc" : "'+this.state.id_tssr_selected+'"}&max_results=1&page=1').then(res => {
      if(res.data !== undefined){
        const items = res.data._items[0];
        if(items !== undefined){
          this.setState({ tssr_BOM_data : items}, () => {
            this.getPPandMaterial(items.list_of_site_items.filter(pp => pp.qty !== 0).map(pp => pp.id_pp_doc));
          });
        }
      }
    })
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

  getQtyTssrPP(pp_id){
    const itemTssrBom = this.state.tssr_BOM_data.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find(e => e.pp_id === pp_id);
    if(getDataPPTssr !== undefined){
      return getDataPPTssr.qty;
    }else{
      return 0;
    }
  }

  preparingDataMR(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100);
    const numberTSSR = dateNow.getFullYear()+(dateNow.getMonth()+1)+dateNow.getDate()+dataRandom.toString();
    return numberTSSR;
  }

  async saveMRtoAPI(){
    const dataTSSRParent = this.state.data_tssr_selected;
    const dataTSSRBOM = this.state.tssr_BOM_data;
    const numberingMR = this.preparingDataMR();
    const newDate = new Date();
    const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    const mr_data = {
      	"mr_id" : "MR"+numberingMR,
        "implementation_id" : "IMP"+numberingMR,
        "id_tssr_doc" : dataTSSRParent._id,
        "tssr_id" : dataTSSRParent.no_tssr_boq,
        "account_id" : "1",
        "id_project_doc" : dataTSSRParent.id_project_doc,
        "project_name" : dataTSSRParent.project_name,
        "id_cd_doc" : null,
        "cd_id" : "TSEL0001",
        "site_info" : [
            {
                "id_site_doc": dataTSSRBOM.id_site_doc,
                "site_id": dataTSSRBOM.site_id,
                "site_title": "NE",
                "id_tssr_boq_site_doc" : dataTSSRBOM._id,
                "no_tssr_boq_site" : dataTSSRBOM.no_tssr_boq_site,
                "tssr_version" : dataTSSRBOM.version === undefined ? "0" : dataTSSRBOM.version,
            }
        ],
        "mr_milestones" : [],
        "mr_status" : [
            {
                "mr_status_name": "Implemented",
                "mr_status_value": "Implemented",
                "mr_status_date": dateNow,
                "mr_status_updater": this.state.userEmail,
                "mr_status_updater_id": null
            }
        ],
        "current_mr_status" : "Implemented",
        "current_milestones" : null,
        "deleted" : 0,
        "created_by" : this.state.userId,
        "updated_by" : this.state.userId
      }

      const respondSaveMR = await this.postDatatoAPIBAM('/mr_op', mr_data);
      if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ){
        this.saveMrPPtoAPI(respondSaveMR.data._id, mr_data.mr_id, respondSaveMR.data._etag);
      }
  }

  async saveMrPPtoAPI(_id_mr, mr_id, _etag_mr){
    const dataPPTssr = this.state.list_pp_material_tssr;
    const dataTSSRBom = this.state.tssr_BOM_data;
    let ppMRsave = [];
    for(let i = 0; i < dataPPTssr.length; i++){
      let dataTSSRBomItemIndex = dataTSSRBom.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
      let ppSave = {
        "id_mr_doc" : _id_mr,
        "mr_id" : mr_id,
        "id_pp_doc" : dataPPTssr[i]._id,
        "pp_id" : dataPPTssr[i].pp_id,
        "id_site_doc" : dataTSSRBom.id_site_doc,
        "site_id" : dataTSSRBom.site_id,
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

    const respondSaveMRPP = await this.postDatatoAPIBAM('/mr_pp_op', ppMRsave);
    if(respondSaveMRPP.data !== undefined && respondSaveMRPP.status >= 200 && respondSaveMRPP.status <= 300 ){
      if(ppMRsave.length === 1){
        this.saveMrMattoAPI(_id_mr, mr_id, _etag_mr, [respondSaveMRPP.data]);
      }else{
        this.saveMrMattoAPI(_id_mr, mr_id, _etag_mr, respondSaveMRPP.data._items);
      }
    }else{
      this.patchDatatoAPIBAM('/mr_op/'+_id_mr, {"deleted" : 1}, _etag_mr);
    }
  }

  async saveMrMattoAPI(_id_mr, mr_id, _etag_mr, list_data_post_pp_mr){
    const dataPPTssr = this.state.list_pp_material_tssr;
    const dataTSSRBom = this.state.tssr_BOM_data;
    const list_id_pp_mr = list_data_post_pp_mr.map(e => e._id);
    console.log()
    let matMRsave = [];
    for(let i = 0; i < dataPPTssr.length; i++){
      console.log("dataPPTssr", i, dataPPTssr[i]);
      let dataTSSRBomItemIndex = dataTSSRBom.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
      for(let j = 0; j < dataPPTssr[i].list_of_id_material.length; j++){
        const dataMatIndex = dataPPTssr[i].list_of_id_material[j];
        let matSave = {
          "id_mr_doc" : _id_mr,
          "mr_id" : mr_id,
          "id_mr_pp_doc" : list_id_pp_mr[i],
          "id_pp_doc" : dataPPTssr[i]._id,
          "pp_id" : dataPPTssr[i].pp_id,
          "id_site_doc" : dataTSSRBom.id_site_doc,
          "site_id" : dataTSSRBom.site_id,
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

    const respondSaveMRMat = await this.postDatatoAPIBAM('/mr_md_op', matMRsave);
    if(respondSaveMRMat.data !== undefined && respondSaveMRMat.status >= 200 && respondSaveMRMat.status <= 300 ){
      console.log("Success");
    }else{
      this.patchDatatoAPIBAM('/mr_op/'+_id_mr, {"deleted" : 1}, _etag_mr);
    }
  }

  componentDidMount(){
    this.getListTssrAll();
  }

  render() {
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >MR Creation </span>
            <Button color='success' style={{float : 'right'}} disable={this.state.list_pp_material_tssr.length === 0} onClick={this.saveMRtoAPI}><i className="fa fa-edit" style={{marginRight: "8px"}}></i>Create MR</Button>
          </CardHeader>
          <CardBody>
            <table>
              <tbody>
                <tr>
                  <td>TSSR</td>
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
                  <td colSpan="4" style={{textAlign : 'center', color : 'rgba(59,134,134,1)', fontSize : '21px'}}>TSSR BOM DETAIL</td>
                </tr>
                {this.state.data_tssr_selected !== null && (
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>TSSR ID : {this.state.data_tssr_selected.no_tssr_boq}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : 'rgba(59,134,134,1)', marginTop: '5px'}}></hr>
            <Fragment>
            {this.state.tssr_BOM_data !== null && (
              <table style={{width : '40%'}} className="table-header">
                <tbody>
                    <tr>
                      <td>Project Identifier</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px'}}>{this.state.tssr_BOM_data.project_name}</td>
                    </tr>
                    <tr>
                      <td>Site ID</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px'}}>{this.state.tssr_BOM_data.site_id}</td>
                    </tr>
                    <tr>
                      <td>Site Name</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px'}}>{this.state.tssr_BOM_data.site_name}</td>
                    </tr>
                </tbody>
              </table>
            )}
              <hr className="upload-line-ordering"></hr>
              <div className='divtable2'>
                <Table hover bordered striped responsive size="sm">
                  <thead style={{backgroundColor : '#0B486B', color : 'white'}}>
                    <tr>
                      <th className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>PP / Material Code</th>
                      <th className="fixedhead" style={{verticalAlign : 'middle'}}>PP / Material Name</th>
                      <th className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Unit</th>
                      <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Total Qty per PP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.list_pp_material_tssr.map( pp =>
                      <Fragment>
                        <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                          <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                          <td>{pp.name}</td>
                          <td>{pp.unit}</td>
                          <td align='center'>{this.getQtyTssrPP(pp.pp_id)}</td>
                        </tr>
                        {pp.list_of_id_material.map(material =>
                          <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                            <td style={{textAlign : 'right'}}>{material.material_id}</td>
                            <td style={{textAlign : 'left'}}>{material.material_name}</td>
                            <td>{material.material_unit}</td>
                            <td align='center'>{this.getQtyTssrPP(pp.pp_id)*material.material_qty}</td>
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

export default connect(mapStateToProps)(MRCreation);
