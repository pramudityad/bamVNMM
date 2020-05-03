import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import ReactExport from "react-data-export";
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import Excel from 'exceljs/modern.browser';
import { saveAs } from 'file-saver';

import {ExcelRenderer} from 'react-excel-renderer';
import './boqtssr.css';

const StepFlow = React.lazy(() => import('../../views/Defaultview/StepFlow'));

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class SiteTSSR extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tssr_site : null,
        list_pp_API : [],
        list_pp : [],
        modal_loading : false,
        qty_tssr : new Map(),
        action_status : null,
        action_message : null,
        boq_tech_site_API : null,
        view_non_zero : false,
        list_pp_LCM : [],
        list_pp_nonLCM : [],
        modal_addnew : false,
        pp_selected : null,
        list_pp_selected : [],
        list_pp_selection : [],
        qty_new_pp : new Map(),
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.editQtyTSSR = this.editQtyTSSR.bind(this);
    this.updateTSSRQTY = this.updateTSSRQTY.bind(this);
    this.handleChangeNonZero = this.handleChangeNonZero.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.handleChangePP = this.handleChangePP.bind(this);
    this.loadOptionsPP = this.loadOptionsPP.bind(this);
    this.handleChangeQtyNewPP = this.handleChangeQtyNewPP.bind(this);
    this.saveNewPP = this.saveNewPP.bind(this);
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

  toggleLoading(){
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  toggleAddNew(){
    this.setState({qty_new_pp : new Map()});
    this.setState(prevState => ({
      modal_addnew: !prevState.modal_addnew
    }));
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(API_URL +url, {
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
      let respond = undefined;
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async postDatatoAPI(url, data){
    try {
      let respond = await axios.post(API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPI(url, data, _etag){
    try {
      let respond = await axios.patch(API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
        headers : {
          "If-Match" : _etag
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      console.log("respond Patch data", err);
      return respond;
    }
  }

  async apiSendEmail(data){
    try {
      let respond = await axios.post(API_EMAIL, data, {
        headers : {'Content-Type':'application/json'},
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
      console.log("respond Patch data", err);
      return respond;
    }
  }
  
  getTSSRperSite(_id){
    this.getDatafromAPI('/tssr_boq_matrix_sites_all/'+_id).then( resp => {
      if(resp !== undefined){
        this.setState({tssr_site : resp.data}, () => {
            if(resp.data.list_of_site_items !== undefined){
                this.getProductPackage(resp.data.list_of_site_items.map(e => e.id_pp_doc));
                this.getTechBoqAPI(resp.data.id_boq_tech_doc, resp.data.id_site_doc);
            }
        });
      }
    })
  }

  async getProductPackage(array_id_package){
    let dataPP = [];
    let arrayDataPP = array_id_package;
    let getNumberPage = Math.ceil(arrayDataPP.length / 20);
    for(let i = 0 ; i < getNumberPage; i++){
        let DataPaginationPP = arrayDataPP.slice(i * 20, (i+1)*20);
        let arrayIdPP = '"'+DataPaginationPP.join('", "')+'"';
        let where_id_PP = '?where={"_id" : {"$in" : ['+arrayIdPP+']}}';
        let resPP = await this.getDatafromAPI('/pp_non_page'+where_id_PP+'&'+'embedded={"list_of_id_material" : 1}');
        if(resPP !== undefined){
            if(resPP.data !== undefined){
                dataPP = dataPP.concat(resPP.data._items);
            }
        }
    }
    let dataPPnonLCM = dataPP.filter(e => e.product_type !== "LCM");
    let dataPPLCM = dataPP.filter(e => e.product_type === "LCM");
    dataPP = dataPPnonLCM.concat(dataPPLCM);
    this.setState({list_pp_API : dataPP, list_pp: dataPP, list_pp_LCM : dataPPLCM, list_pp_nonLCM : dataPPnonLCM});
  }

  getTechBoqAPI(_id_Tech, _id_site){
    console.log("getTechBoqAPI", _id_Tech);
    const where = 'where={"id_boq_tech_doc" : "'+_id_Tech+'", "id_site_doc" : "'+_id_site+'"}';
    // let url = '/boq_tech_sites_all/'+_id_Tech+'?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}';
    let url = '/boq_tech_sites_all?'+where;
    this.getDatafromAPI(url).then(res => {
      console.log("getTechBoqAPI", res);
      if(res !== undefined){
        if(res.data !== undefined){
          this.setState({ boq_tech_site_API : res.data._items[0]});
        }
      }
    })
  }

  getPPTSSRbyID(_idPP){
    const list_item_tssr = this.state.tssr_site.list_of_site_items;
    const prodPack = list_item_tssr.find(e => e.id_pp_doc === _idPP);
    // console.log('prodPack', prodPack);
    return prodPack;
  }

  editQtyTSSR = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({ qty_tssr : prevState.qty_tssr.set(name, value) }));
  }

  componentDidMount(){
      this.getTSSRperSite(this.props.match.params.id);
  }

  async updateTSSRQTY(){
    this.toggleLoading();
    let returnDelta = undefined;
    const dataSite = this.state.tssr_site;
    let dataSiteTssr = Object.assign({}, dataSite);
    let item_site = dataSiteTssr.list_of_site_items;
    const tssrQty = this.state.qty_tssr;
    for (const [key, value] of tssrQty.entries()) {
        let itemIDX = item_site.findIndex(e => e.id_pp_doc === key);
        if(itemIDX !== -1){
          item_site[itemIDX]["qty"] = parseInt(value);
        }
    }
    let sitesDelta = undefined;
    let whereDelta = '?where={"id_tssr_boq_doc" : "'+dataSiteTssr.id_tssr_boq_doc+'", "id_site_doc" : "'+dataSiteTssr.id_site_doc+'" }'
    let getDelta = await this.getDatafromAPI('/delta_boq_tech_sites_op'+whereDelta);
    if(getDelta !== undefined){
      if(getDelta.data !== undefined){
        sitesDelta = getDelta.data._items;
      }
    }
    let dataSiteTechIdx = this.state.boq_tech_site_API;
    let deltaAlready = [];
    let deltaNotAlready = [];
    if(sitesDelta !== undefined){
      deltaAlready = sitesDelta.filter(e => e.no_boq_tech !== null);
      deltaNotAlready = sitesDelta.find(e => e.no_boq_tech === null);
      console.log("test")
      let siteItems = await this.countDeltaTSSR(dataSiteTechIdx, dataSiteTssr, deltaAlready);
      const dataSiteUpdate = {
        "list_of_site_items" : siteItems,
        "deleted" : 0
      }
      if(siteItems.length  === 0){
        dataSiteUpdate["deleted"] = 1;
      }
      if(deltaNotAlready !== undefined){
        let updateDelta = await this.patchDatatoAPI('/delta_boq_tech_sites_op/'+deltaNotAlready._id, dataSiteUpdate, deltaNotAlready._etag);
        if(updateDelta !== undefined){
          if(updateDelta.data !== undefined){
            let dataUpdateSite = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+dataSiteTssr._id, {"list_of_site_items" : item_site, "deleted" : 0}, dataSiteTssr._etag);
            if(dataUpdateSite === undefined){dataUpdateSite = {}; dataUpdateSite["data"] = undefined}
            if(dataUpdateSite.data !== undefined){
              returnDelta = updateDelta.data;
            }
          }
        }
      }
      if(deltaNotAlready === undefined){
        if(siteItems.length !== 0){
          let dataPostTssr = Object.assign({}, dataSiteTssr);
          delete dataPostTssr.created_on;
          delete dataPostTssr._id;
          delete dataPostTssr._etag;
          delete dataPostTssr.list_qty_items;
          delete dataPostTssr.version;
          if(dataPostTssr.no_tssr_boq_site !== undefined){
            delete dataPostTssr.no_tssr_boq_site;
          }
          if(dataPostTssr.list_of_material_borrowing !== undefined){
            delete dataPostTssr.list_of_material_borrowing;
          }
          dataPostTssr["id_boq_tech_doc"] = null;
          dataPostTssr["no_boq_tech"] = null;
          dataPostTssr["list_of_site_items"] = siteItems;
          dataPostTssr["deleted"] = 0;
          dataPostTssr["created_by"] = localStorage.getItem("user_ID");
          dataPostTssr["updated_by"] = localStorage.getItem("user_ID");
          let postDelta = await this.postDatatoAPI('/delta_boq_tech_sites_op', dataPostTssr);
          if(postDelta !== undefined){
            if(postDelta.data !== undefined){
              let dataUpdateSite = await this.patchDatatoAPI('/tssr_boq_matrix_sites_op/'+dataSiteTssr._id, {"list_of_site_items" : item_site, "deleted" : 0}, dataSiteTssr._etag);
              if(dataUpdateSite === undefined){dataUpdateSite = {}; dataUpdateSite["data"] = undefined}
              if(dataUpdateSite.data !== undefined){
                returnDelta = postDelta.data;
              }
            }
          }
        }
      }
    }
    if(returnDelta !== undefined){
      this.setState({action_status : 'success', action_message : 'Yout TSSR BOQ Has Been Updated '}, () => {
        this.toggleLoading();
        setTimeout(function(){ window.location.reload(); }, 2000);
      })
    }else{
      this.setState({action_status : 'failed'}, () => {
        this.toggleLoading();
      })
    }
  }

  countDeltaTSSR(siteTech, siteTSSR, deltaAlready){
    let itemTech = [];
    let itemDeltaAlrdy = [];
    if(siteTech !== undefined && siteTech !== null){
      itemTech = siteTech.list_of_site_items;
    }
    if(deltaAlready.length !== 0){
      itemDeltaAlrdy = deltaAlready.map( e=> e.list_of_site_items).reduce((l, n) => l.concat(n), []);
    }
    let onlyItemTssr = siteTSSR.list_of_site_items;
    let onlyItemAlready = itemTech.concat(itemDeltaAlrdy);
    let list_items = []
    let get_id_package = [...new Set(onlyItemTssr.map(({ id_pp_doc}) => id_pp_doc))];
    for(let i = 0;  i< get_id_package.length; i++){
      let diff = 0
      const alreadyQTYCount = onlyItemAlready.filter(d => d.id_pp_doc === get_id_package[i]);
      const alreadyQTY = alreadyQTYCount.reduce((a,b) => a + b.qty, 0);
      const tssrQTY = onlyItemTssr.find(d => d.id_pp_doc === get_id_package[i]);
      if(alreadyQTYCount.length !== 0){
        diff = tssrQTY.qty - alreadyQTY;
      }else{
        diff = tssrQTY.qty;
      }
      if(diff > 0){
        let itemsIdx = Object.assign({}, tssrQTY);
        itemsIdx['qty'] = diff;
        list_items.push(itemsIdx);
      }
    }
    console.log("list_items", list_items);
    return list_items;
  }

  // countDeltaTSSR(siteTech, siteTSSR){
  //   let onlyItemTssr = siteTSSR.list_of_site_items;
  //   let onlyItemTech = siteTech.list_of_site_items;
  //   let list_items = []
  //   let get_id_package = [...new Set(onlyItemTssr.map(({ id_pp_doc}) => id_pp_doc))];
  //   for(let i = 0;  i< get_id_package.length; i++){
  //     let diff = 0
  //     const techQTY = onlyItemTech.find(d => d.id_pp_doc === get_id_package[i]);
  //     const tssrQTY = onlyItemTssr.find(d => d.id_pp_doc === get_id_package[i]);
  //     if(techQTY !== undefined){
  //       diff = tssrQTY.qty - techQTY.qty;
  //     }else{
  //       diff = tssrQTY.qty;
  //     }
  //     if(diff > 0){
  //       let itemsIdx = Object.assign({}, tssrQTY);
  //       itemsIdx['qty'] = diff;
  //       list_items.push(itemsIdx);
  //     }
  //   }
    
  //   return list_items;
  // }

  handleChangeNonZero(){
    this.setState(prevState => ({
      view_non_zero: !prevState.view_non_zero
    }), () => {
      this.viewNonZero();
    });
  }

  viewNonZero(){
    const dataSiteTSSR = this.state.tssr_site;
    const dataItem = dataSiteTSSR.list_of_site_items;
    const dataPP = this.state.list_pp_API;
    if(this.state.view_non_zero === true ){
      let DataItemNonZero = dataItem.filter(e => e.qty === 0);
      DataItemNonZero = DataItemNonZero.map(e => e.pp_id);
      const ItemNonZero = dataPP.filter(e => DataItemNonZero.includes( e.pp_id) !== true );
      let dataPPnonLCM = ItemNonZero.filter(e => e.product_type !== "LCM");
      let dataPPLCM = ItemNonZero.filter(e => e.product_type === "LCM");
      this.setState({list_pp : ItemNonZero, list_pp_LCM : dataPPLCM, list_pp_nonLCM : dataPPnonLCM});
    }else{
      let dataPPnonLCM = dataPP.filter(e => e.product_type !== "LCM");
      let dataPPLCM = dataPP.filter(e => e.product_type === "LCM");
      this.setState({list_pp : dataPP, list_pp_LCM : dataPPLCM, list_pp_nonLCM : dataPPnonLCM});
    }   
  }

  onChangeDebounced(){
    console.log("debounce");
  }

  async loadOptionsPP(inputValue) {
    if (!inputValue) {
      this.setState({list_pp_selection : []});
      return [];
    }
      const searchBy = this.state.searchSiteBy;
      let pp_list = [];
      let arraySite = [];
      if(inputValue !== null){
        const getPP = await this.getDatafromAPI('/pp_sorted_non_page?where={"name":{"$regex" : "'+inputValue+'", "$options" : "i"}}&embedded={"list_of_id_material" : 1}');
        if(getPP !== undefined){
          if(getPP.data !== undefined){
            this.setState({list_pp_selection : getPP.data._items}, () => {
              getPP.data._items.map(pp => 
                pp_list.push({'label' : pp.pp_id !== undefined ? pp.pp_id +" ("+pp.name +")" : null, 'value' : pp._id}) 
              );
            });
          }
        }
      }
      return pp_list;
  };

  handleChangePP = (newValue) => {
    let text = newValue.label;
    // let dataPPselected = this.state.list_pp_selected;
    let dataPPselected = [];
    let dataPP = this.state.list_pp_selection.find(e => e._id === newValue.value);
    dataPPselected.push(dataPP);
    this.setState({pp_selected : newValue.value, list_pp_selected : dataPPselected, qty_new_pp : new Map()})
    return newValue;
  };

handleChangeQtyNewPP = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({ qty_new_pp : prevState.qty_new_pp.set(name, value) }));
  };

  saveNewPP(){
    const ppNew = this.state.list_pp_selected[0];
    let dataPPTssr = this.state.list_pp_API;
    let dataSite = this.state.tssr_site;
    let dataSiteTssr = Object.assign({}, dataSite);
    let item_site = dataSiteTssr.list_of_site_items;
    const dataPPNew = {
      "id_pp_doc": ppNew._id,
      "pp_id": ppNew.pp_id,
      "pp_key": ppNew.pp_key,
      "package_name": ppNew.name,
      "pp_group": ppNew.pp_group,
      "pp_cust_number": ppNew.pp_cust_number,
      "phy_group": ppNew.phy_group,
      "product_type": ppNew.product_type,
      "unit": ppNew.unit,
      "qty": parseInt(this.state.qty_new_pp.get(ppNew._id)),
      "ericsson_allocated": 0,
      "qty_quotation_allocated": 0,
      "smart_allocated": 0,
    };
    item_site.push(dataPPNew);
    dataSiteTssr["list_of_site_items"] = item_site;
    dataPPTssr.push(ppNew);
    const qtyAll = new Map([...this.state.qty_tssr, this.state.qty_new_pp])
    this.setState({list_pp_API : dataPPTssr, tssr_site : dataSiteTssr, qty_new_pp : new Map(), qty_tssr : qtyAll }, () => {
      this.viewNonZero();
      this.toggleAddNew();
    })
    console.log("dataPPNew dataSiteTssr", dataSiteTssr);
    console.log("dataPPNew dataPPTssr", dataPPTssr);
    console.log("dataPPNew", dataPPNew);
    // let dataPPNew;
  }

  render() {
    function SuccessSaved(props){
      if(props.notif == 'success' && props.notif !== null){
        return <div className="alert alert-success" role="alert">
                  Your BOM has been saved
                </div>
      }else{
        if(props.notif == 'update' && props.notif !== null){
          return <div className="alert alert-success" role="alert">
                    Your order BOQ has been Updated, Please reload your page
                  </div>
        }else{
          if(props.notif !== null){
            return <div className="alert alert-danger" role="alert">
                    Sorry, there was an error when we tried to save it, please reload your page and try again try again
                  </div>
          }else{
            return <div></div>
          }
        }
      }
    }

    return (
      <div>
        {/* <SuccessSaved notif={this.state.save_notif} /> */}
        <Row>
        <Col xl="12">
        <Card>
        <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >TSSR BOM Site</span>
              {this.state.qty_tssr.size !== 0 && (
                <React.Fragment>
                  
                  <Button style={{float : 'right',margin : '3px'}} onClick={this.updateTSSRQTY} color="success">Save</Button>
                </React.Fragment>
            )}
            <Button style={{float : 'right',margin : '3px'}} onClick={this.toggleAddNew} color='success'>Add New PP</Button>
            <Button style={{float : 'right',margin : '3px'}} onClick={this.handleChangeNonZero} color='secondary'>Hidden / Show Zero</Button>
        </CardHeader>
          <CardBody className='card-UploadBoq'>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>TSSR BOM SITE DETAIL</td>
                </tr>
                {this.state.tssr_site !== null && this.state.tssr_site !== undefined ?(
                <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center'}}>TSSR ID : {this.state.tssr_site.no_tssr_boq_site}</td>
                </tr>
                ) : (<div></div>)}
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            {this.state.tssr_site !== null && this.state.tssr_site !== undefined ? (
            <React.Fragment>
                <table style={{width : '35%'}} className="table-header">
                <tbody>
                    <tr>
                    <td>Project Identifier</td>
                    <td>:</td>
                    <td style={{paddingLeft:'10px'}}>{this.state.tssr_site.project_name}</td>
                    </tr>
                    <tr>
                    <td>Site ID</td>
                    <td>:</td>
                    <td style={{paddingLeft:'10px'}}>{this.state.tssr_site.site_id}</td>
                    </tr>
                    <tr>
                    <td>Site Name</td>
                    <td>:</td>
                    <td style={{paddingLeft:'10px'}}>{this.state.tssr_site.site_name}</td>
                    </tr>
                    {this.state.tssr_site.id_boq_tech_doc !== null ? (
                      <tr>
                        <td>Boq Tech ref.</td>
                        <td>:</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site.no_boq_tech}</td>
                      </tr>
                    ) : (<div></div>)}
                </tbody>
                </table>
                <hr className="upload-line-ordering"></hr>
            </React.Fragment>)
            : (<idv></idv>)}
            <div class='divtable2'>
              {this.state.qty_tssr.size !== 0 && (
                <span style={{color : 'red'}}>your change will lost if you not save it</span>
              )}
              <table hover bordered striped responsive size="sm" className="table-site-detail" class='fixed'>
                <thead>
                  <tr>
                    <th class="fixedhead" style={{width : '200px'}}>PP / Material Code</th>
                    <th class="fixedhead">Material Name</th>
                    <th class="fixedhead" style={{width : '75px'}}>Unit</th>
                    <th class="fixedhead" style={{width : '100px'}}>Total Qty / PP</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list_pp_nonLCM.map( pp =>
                    <React.Fragment>
                    <tr style={{backgroundColor : '#f8f6df'}} class="fixbody">
                      <td colSpan="3" style={{fontWeight : '500', textAlign : 'left', paddingLeft : '5px'}}>[Package] {pp.name}</td>
                      <td align='center'>
                      {/* {this.getPPTSSRbyID(pp._id).qty} */}
                      <Input style={{textAlign: 'center', maxWidth : '80px'}} name={pp._id} type="number" className="BoQ-style-qty" placeholder="qty" value={!this.state.qty_tssr.has(pp._id) ? this.getPPTSSRbyID(pp._id).qty : this.state.qty_tssr.get(pp._id) } onChange={this.editQtyTSSR} />
                      </td>
                    </tr>
                    {pp.list_of_id_material.map(mat =>
                      <tr class="fixbody">
                        <td class="dataregsite" style={{textAlign : 'left'}}>{mat.material_id}</td>
                        <td class="dataregsite" style={{textAlign : 'left'}}>{mat.material_name}</td>
                        <td class="dataregsite" style={{textAlign : 'center'}}>{mat.material_unit}</td>
                        <td class="dataregsite" style={{textAlign : 'center'}}>{mat.material_qty * this.getPPTSSRbyID(pp._id).qty}</td>
                      </tr>
                    )}
                      <tr class="fixbody">
                        <td colspan='4' class="dataregsite"> &nbsp;</td>
                      </tr>
                    </React.Fragment>
                  )}
                  {this.state.list_pp_LCM.length !== 0 && (
                    <tr>
                      <td colSpan="4" style={{textAlign : 'left', backgroundColor : 'rgb(10, 205, 125)'}}>LCM</td>
                    </tr>
                  )}
                  {this.state.list_pp_LCM.map( pp =>
                    <React.Fragment>
                    <tr style={{backgroundColor : '#f8f6df'}} class="fixbody">
                      <td colSpan="3" style={{fontWeight : '500', textAlign : 'left', paddingLeft : '5px'}}>[Package] {pp.name}</td>
                      <td align='center'>
                      {/* {this.getPPTSSRbyID(pp._id).qty} */}
                      <Input style={{textAlign: 'center', maxWidth : '80px'}} name={pp._id} type="number" className="BoQ-style-qty" placeholder="qty" value={!this.state.qty_tssr.has(pp._id) ? this.getPPTSSRbyID(pp._id).qty : this.state.qty_tssr.get(pp._id) } onChange={this.editQtyTSSR} />
                      </td>
                    </tr>
                    {pp.list_of_id_material.map(mat =>
                      <tr class="fixbody">
                        <td class="dataregsite" style={{textAlign : 'left'}}>{mat.material_id}</td>
                        <td class="dataregsite" style={{textAlign : 'left'}}>{mat.material_name}</td>
                        <td class="dataregsite" style={{textAlign : 'center'}}>{mat.material_unit}</td>
                        <td class="dataregsite" style={{textAlign : 'center'}}>{mat.material_qty * this.getPPTSSRbyID(pp._id).qty}</td>
                      </tr>
                    )}
                      <tr class="fixbody">
                        <td colspan='4' class="dataregsite"> &nbsp;</td>
                      </tr>
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        </Col>
        </Row>
        {/* Add New*/}
        <Modal isOpen={this.state.modal_addnew} toggle={this.toggleAddNew} className={"modal-lg"}>
          <ModalBody>
            <div style={{marginTop : '10px'}}>
              <span>Variant Name :</span>
              <AsyncSelect
                  isDisabled={this.state.project_selected === null}
                  cacheOptions
                  loadOptions={this.loadOptionsPP}
                  defaultOptions
                  onChange={this.handleChangePP}                
              />  
            </div>
            <div style={{marginTop : '10px'}}>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <td>PP ID</td>
                    <td>Variant Name</td>
                    <td>Qty</td>
                  </tr>
                </thead>
                <tbody>
                    {this.state.list_pp_selected.map(pp => 
                      <tr>
                        <td>{pp.pp_id}</td>
                        <td>{pp.name}</td>
                        <td>
                          <input type="number" style={{width : '60px'}} name={pp._id} onChange={this.handleChangeQtyNewPP} value={this.state.qty_new_pp.get(pp._id)}></input>
                        </td>
                      </tr>
                    )}
                </tbody>
              </Table>
            </div>
            <div style={{textAlign : 'center'}}>
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.qty_new_pp.size !== 0 && (
              <Button color="success" onClick={this.saveNewPP}>Add</Button>
            )}
            <Button color="secondary" onClick={this.toggleAddNew}>Close</Button>
          </ModalFooter>
        </Modal>
        {/* end Add New*/}
        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm loading-modal ' + this.props.className}>
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

export default SiteTSSR;
