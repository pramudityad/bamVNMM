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
    };
    this.handleChangeTSSR = this.handleChangeTSSR.bind(this);
    this.getQtyTssrPPNE = this.getQtyTssrPPNE.bind(this);
    this.getQtyTssrPPFE = this.getQtyTssrPPFE.bind(this);
    // this.saveMRtoAPI = this.saveMRtoAPI.bind(this);
    this.editQtyNE = this.editQtyNE.bind(this);
    this.editQtyFE = this.editQtyFE.bind(this);
    this.connectPlantSpectoTSSR = this.connectPlantSpectoTSSR.bind(this);
    this.getDataWarehouse = this.getDataWarehouse.bind(this);
    this.getDataInbound = this.getDataInbound.bind(this);
  }

  async getDataFromAPINODEWithParams(url) {
    try {
      let respond = await axios({
        method : "get",
        url : process.env.REACT_APP_API_URL_NODE+url,
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
        params :{

        }
      })
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

  async getDatafromAPIBMS(url){
    try {
      let respond = await axios.get(API_URL_BMS_Phil +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_usernamePhilApi,
          password: process.env.REACT_APP_passwordPhilApi
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
      let respond = await axios.get(process.env.REACT_APP_API_URL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_username,
          password: process.env.REACT_APP_password
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
      let respond = await axios.post(process.env.REACT_APP_API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: process.env.REACT_APP_username,
          password: process.env.REACT_APP_password
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
      let respond = await axios.patch(process.env.REACT_APP_API_URL +url, data, {
        headers : {'Content-Type':'application/json', "If-Match" : _etag},
        auth: {
          username: process.env.REACT_APP_username,
          password: process.env.REACT_APP_password
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
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE+url, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data node", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data node", err);
      return respond;
    }
  }

  async patchDatatoAPINODE(url, data){
    try {
      let respond = await axios.patch(process.env.REACT_APP_API_URL_NODE +url, data, {
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

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE+url, data, {
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

  getListTssrAll(){
    this.getDataFromAPINODE('/plantspec?q={"id_mr_doc" : null}').then( res => {
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
    //Make list tssr from API to format for "Select" from React-select
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
    this.getDatafromAPIBAM('/mr_op/'+_id_MR).then(resMR => {
      if(resMR.data !== undefined){
        this.setState({ data_mr : resMR.data });
      }
    })
  }

  getDataTssr(_id_tssr){
    this.getDataFromAPINODE('/plantspec/'+_id_tssr).then( resTssr => {
      if(resTssr.data !== undefined){
        this.setState({ data_tssr : resTssr.data.data });
        this.prepareView(resTssr.data.data)
      }
    })
  }

  prepareView(dataTSSR){
    const dataMR = this.state.data_mr;
    let listSku = [];
    const dataTSSRMaterial = dataTSSR.packages.map(pp => pp.materials.map(material => listSku.push(material.material_id)));
    listSku = [...new Set(listSku)];
    let site_mr_NE = dataMR.site_info.find(e => e.site_title === "NE");
    let site_mr_FE = dataMR.site_info.find(e => e.site_title === "FE");
    let site_NE;
    let site_FE;
    if(site_mr_NE !== undefined){
      site_NE = dataTSSR.site_info.find(e => e.site_id === site_mr_NE.site_id);
    }
    if(site_mr_FE !== undefined){
      site_FE = dataTSSR.site_info.find(e => e.site_id === site_mr_FE.site_id);
    }
    if(site_NE !== undefined){
      this.setState({tssr_site_NE : site_NE})
    }
    if(site_FE !== undefined){
      this.setState({tssr_site_FE : site_FE})
    }
    this.getDataWarehouse(listSku);
    this.getDataInbound(listSku);
  }

  async getDataWarehouse(listSku) {
    if(listSku !== null && listSku !== undefined) {
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

  async getDataInbound(listSku) {
    // let listSku = [];
    if(listSku !== null && listSku !== undefined) {
      // data_tssr.map(pp => pp.material_detail.map(material => listSku.push(material.material_id)));
      // listSku = [...new Set(listSku)];
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

  async getPSAllocated(){
    const data_tssr_id = this.state.id_tssr_selected;
    const getDataMR = await this.getDatafromAPIBAM('/mr_op?where={"id_tssr_doc" : "'+data_tssr_id+'"}');
    if(getDataMR.data !== undefined){
      const dataIDMR = getDataMR.data._items.map(e => e._id);
      if(dataIDMR.length !== 0){
        const getDataMR = await this.getDatafromAPIBAM('/mr_pp_op?where={"id_mr_doc" : {"$in" : ['+dataIDMR+']}}');
        if(getDataMR.data !== undefined){

        }
      }
    }
  }

  countPSAllocated(data_mr_pp){
    let site_NE = this.state.data_tssr_sites.find(e => e.site_title === "NE");
    let site_FE = this.state.data_tssr_sites.find(e => e.site_title === "FE");
    // const
  }

  async getPPandMaterial(array_id_package){
    let dataPP = [];
    let arrayDataPP = array_id_package;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
        let dataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
        let arrayIdPP = '"'+dataPaginationPP.join('", "')+'"';
        let where_id_PP = '?where={"_id" : {"$in" : ['+arrayIdPP+']}}';
        let resPP = await this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP);
        if(resPP !== undefined){
            if(resPP.data !== undefined){
              // eslint-disable-next-line
              dataPP = dataPP.concat(resPP.data._items);
            }
        }
    }
    this.getDataMaterial(dataPP);
  }


  async getDataMaterial(data_pp){
    let dataMat = [];
    let arrayDataPP = data_pp.map(e => e._id);
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
        let dataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
        let arrayIdPP = '"'+dataPaginationPP.join('", "')+'"';
        let where_id_PP = '?where={"id_pp_doc" : {"$in" : ['+arrayIdPP+']}}';
        let resMat = await this.getDatafromAPIBAM('/mc_op'+where_id_PP);
        if(resMat !== undefined){
            if(resMat.data !== undefined){
              // eslint-disable-next-line
              dataMat = dataMat.concat(resMat.data._items);
            }
        }
    }
    this.prepareDataPP(data_pp, dataMat);
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

    // async saveMRtoAPI(){
    //   const dataMRParent = this.state.data_mr;
    //   const dataTSSRParent = this.state.data_tssr;
    //   const dataTSSRBOMNE = this.state.tssr_site_NE;
    //   const dataTSSRBOMFE = this.state.tssr_site_FE;
    //   const newDate = new Date();
    //   const dateNow = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
    //   let site_info = [];
    //   let mr_data = {
    //     "site_info" : [],
    //     "mr_milestones" : [],
    //     "current_mr_status" : "PLANTSPEC ASSIGNED",
    //     "current_milestones" : "",
    //     "created_by" : this.state.userId,
    //     "updated_by" : this.state.userId
    //   };
    //   //Add Site Info
    //   if(dataMRParent.site_info.length !== 0){
    //     let dataSiteNE = dataMRParent.site_info.find(e => e.site_id === dataTSSRBOMNE.site_id);
    //     if(dataSiteNE !== undefined){
    //       dataSiteNE["id_tssr_boq_site_doc"] = dataTSSRBOMNE._id;
    //       dataSiteNE["no_tssr_boq_site"] = dataTSSRBOMNE.no_tssr_boq_site;
    //       dataSiteNE["tssr_version"] = dataTSSRBOMNE.version === undefined ? "0" : dataTSSRBOMNE.version;
    //       mr_data["site_info"].push(dataSiteNE);
    //     }else{
    //       const dataNewSiteNE = {
    //           "id_site_doc" : dataTSSRBOMNE.id_site_doc,
    //           "site_id" : dataTSSRBOMNE.site_id,
    //           "site_name" : dataTSSRBOMNE.site_name,
    //           "site_title": "NE",
    //           "id_tssr_boq_site_doc" : dataTSSRBOMNE._id,
    //           "no_tssr_boq_site" : dataTSSRBOMNE.no_tssr_boq_site,
    //           "tssr_version" : dataTSSRBOMNE.version === undefined ? "0" : dataTSSRBOMNE.version,
    //       };
    //       mr_data["site_info"].push(dataNewSiteNE);
    //     };
    //     //IF There is Site FE
    //     if(this.state.tssr_site_FE !== null){
    //       let dataSiteFE = dataMRParent.site_info.find(e => e.site_id === dataTSSRBOMFE.site_id);
    //       if(dataSiteFE !== undefined){
    //         dataSiteFE["id_tssr_boq_site_doc"] = dataTSSRBOMFE._id;
    //         dataSiteFE["no_tssr_boq_site"] = dataTSSRBOMFE.no_tssr_boq_site;
    //         dataSiteFE["tssr_version"] = dataTSSRBOMFE.version === undefined ? "0" : dataTSSRBOMFE.version;
    //         mr_data["site_info"].push(dataSiteFE);
    //       }else{
    //         const dataNewSiteFE = {
    //             "id_site_doc": dataTSSRBOMFE.id_site_doc,
    //             "site_id": dataTSSRBOMFE.site_id,
    //             "site_name" : dataTSSRBOMFE.site_name,
    //             "site_title": "FE",
    //             "id_tssr_boq_site_doc" : dataTSSRBOMFE._id,
    //             "no_tssr_boq_site" : dataTSSRBOMFE.no_tssr_boq_site,
    //             "tssr_version" : dataTSSRBOMFE.version === undefined ? "0" : dataTSSRBOMFE.version,
    //         }
    //         mr_data["site_info"].push(dataNewSiteFE)
    //       }
    //     }
    //   }
    //   let currStatus = [
    //     {
    //         "mr_status_name": "PLANTSPEC",
    //         "mr_status_value": "ASSIGNED",
    //         "mr_status_date": dateNow,
    //         "mr_status_updater": this.state.userEmail,
    //         "mr_status_updater_id": this.state.userId
    //     }
    //   ];
    //   mr_data["mr_status"] = dataMRParent.mr_status.concat(currStatus);
    //   const respondSaveMR = await this.patchDatatoAPIBAM('/mr_op/'+dataMRParent._id, mr_data, dataMRParent._etag);
    //   if(respondSaveMR.data !== undefined && respondSaveMR.status >= 200 && respondSaveMR.status <= 300 ){
    //     this.saveMrPPtoAPI(dataMRParent._id, dataMRParent.mr_id, respondSaveMR.data._etag);
    //   }else{
    //     this.setState({action_status : 'failed'});
    //   }
    // }

  // async saveMrPPtoAPI(_id_mr, mr_id, _etag_mr){
  //   const dataPPTssr = this.state.list_pp_material_tssr;
  //   const dataTSSRBOMNE = this.state.tssr_site_NE;
  //   const dataTSSRBOMFE = this.state.tssr_site_FE;
  //   let ppMRsave = [];
  //   //PP for NE
  //   for(let i = 0; i < dataPPTssr.length; i++){
  //     let dataTSSRBomItemIndex = dataTSSRBOMNE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
  //     let ppSave = {
  //       "id_mr_doc" : _id_mr,
  //       "mr_id" : mr_id,
  //       "id_pp_doc" : dataPPTssr[i]._id,
  //       "pp_id" : dataPPTssr[i].pp_id,
  //       "id_site_doc" : dataTSSRBOMNE.id_site_doc,
  //       "site_id" : dataTSSRBOMNE.site_id,
  //       "site_name" : dataTSSRBOMNE.site_name,
  //       "product_name" : dataPPTssr[i].product_name,
  //       "product_type" : dataPPTssr[i].product_type,
  //       "physical_group" : dataPPTssr[i].physical_group,
  //       "uom" : dataPPTssr[i].uom,
  //       "qty" : (!this.state.qty_ne.has(dataPPTssr[i].pp_id) ? dataTSSRBomItemIndex.qty : this.state.qty_ne.get(dataPPTssr[i].pp_id)),
  //       "qty_scan" : 0,
  //       "id_po_doc" : null,
  //       "po_number" : "demo PO 1",
  //       "deleted" : 0,
  //       "created_by" : this.state.userId,
  //       "updated_by" : this.state.userId
  //     }
  //     ppMRsave.push(ppSave);
  //   }
  //   //PP for FE
  //   if(this.state.tssr_site_FE !== null){
  //     for(let i = 0; i < dataPPTssr.length; i++){
  //       let dataTSSRBomItemIndex = dataTSSRBOMFE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
  //       let ppSave = {
  //         "id_mr_doc" : _id_mr,
  //         "mr_id" : mr_id,
  //         "id_pp_doc" : dataPPTssr[i]._id,
  //         "pp_id" : dataPPTssr[i].pp_id,
  //         "id_site_doc" : dataTSSRBOMFE.id_site_doc,
  //         "site_id" : dataTSSRBOMFE.site_id,
  //         "site_name" : dataTSSRBOMFE.site_name,
  //         "product_name" : dataPPTssr[i].product_name,
  //         "product_type" : dataPPTssr[i].product_type,
  //         "physical_group" : dataPPTssr[i].physical_group,
  //         "uom" : dataPPTssr[i].uom,
  //         "qty" : (!this.state.qty_fe.has(dataPPTssr[i].pp_id) ? dataTSSRBomItemIndex.qty : this.state.qty_fe.get(dataPPTssr[i].pp_id)),
  //         "qty_scan" : 0,
  //         "id_po_doc" : null,
  //         "po_number" : "demo PO 1",
  //         "deleted" : 0,
  //         "created_by" : this.state.userId,
  //         "updated_by" : this.state.userId
  //       }
  //       ppMRsave.push(ppSave);
  //     }
  //   }
  //   const respondSaveMRPP = await this.postDatatoAPIBAM('/mr_pp_op', ppMRsave);
  //   if(respondSaveMRPP.data !== undefined && respondSaveMRPP.status >= 200 && respondSaveMRPP.status <= 300 ){
  //     if(ppMRsave.length === 1){
  //       ppMRsave[0]["id_mr_pp_doc"] = respondSaveMRPP.data;
  //       this.saveMrMattoAPI(_id_mr, mr_id, _etag_mr, ppMRsave);
  //     }else{
  //       for(let i = 0; i < ppMRsave.length; i++){
  //         ppMRsave[i]["id_mr_pp_doc"] = respondSaveMRPP.data._items[i];
  //       }
  //       this.saveMrMattoAPI(_id_mr, mr_id, _etag_mr, ppMRsave);
  //     }
  //   }else{
  //     this.setState({action_status : 'failed'});
  //     this.patchDatatoAPIBAM('/mr_op/'+_id_mr, {"deleted" : 1}, _etag_mr);
  //   }
  // }

  // async saveMrMattoAPI(_id_mr, mr_id, _etag_mr, list_data_post_pp_mr){
  //   const dataPPTssr = this.state.list_pp_material_tssr;
  //   const dataTSSRBOMNE = this.state.tssr_site_NE;
  //   const dataTSSRBOMFE = this.state.tssr_site_FE;
  //   const list_id_pp_mr = list_data_post_pp_mr.map(e => e._id);
  //   let matMRsave = [];
  //   //Material for NE
  //   let indexNE = 0;
  //   for(let i = 0; i < dataPPTssr.length; i++){
  //     let dataTSSRBomItemIndex = dataTSSRBOMNE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
  //     let getdataFromSavePPMR = list_data_post_pp_mr.find(e => e.id_pp_doc === dataPPTssr[i]._id && e.site_id === dataTSSRBOMNE.site_id);
  //     for(let j = 0; j < dataPPTssr[i].list_of_material.length; j++){
  //       const dataMatIndex = dataPPTssr[i].list_of_material[j];
  //       let matSave = {
  //         "id_mr_doc" : _id_mr,
  //         "mr_id" : mr_id,
  //         "id_mr_pp_doc" : getdataFromSavePPMR.id_mr_pp_doc._id,
  //         "id_pp_doc" : dataPPTssr[i]._id,
  //         "pp_id" : dataPPTssr[i].pp_id,
  //         "id_site_doc" : dataTSSRBOMNE.id_site_doc,
  //         "site_id" : dataTSSRBOMNE.site_id,
  //         "site_name" : dataTSSRBOMNE.site_name,
  //         "id_mc_doc" : dataMatIndex._id,
  //         "material_id" : dataMatIndex.material_id,
  //         "material_name" : dataMatIndex.material_name,
  //         "material_type" : dataMatIndex.material_type === undefined ? "passive_material" : dataMatIndex.material_type,
  //         "uom" : dataMatIndex.uom,
  //         "qty" : (!this.state.qty_ne.has(dataPPTssr[i].pp_id) ? dataTSSRBomItemIndex.qty : this.state.qty_ne.get(dataPPTssr[i].pp_id))*dataMatIndex.qty,
  //         "qty_scan" : 0,
  //         "id_po_doc" : null,
  //         "po_number" : "demo PO 1",
  //         "serial_numbers": [],
  //         "deleted" : 0,
  //         "created_by" : this.state.userId,
  //         "updated_by" : this.state.userId
  //       }
  //       matMRsave.push(matSave);
  //     }
  //     indexNE = i;
  //   }
  //   //Material for FE
  //   if(this.state.tssr_site_FE !== null){
  //     for(let i = 0; i < dataPPTssr.length; i++){
  //       let dataTSSRBomItemIndex = dataTSSRBOMFE.list_of_site_items.find(e => e.id_pp_doc === dataPPTssr[i]._id);
  //       let getdataFromSavePPMR = list_data_post_pp_mr.find(e => e.id_pp_doc === dataPPTssr[i]._id && e.site_id === dataTSSRBOMFE.site_id);
  //       for(let j = 0; j < dataPPTssr[i].list_of_material.length; j++){
  //         const dataMatIndex = dataPPTssr[i].list_of_material[j];
  //         let matSave = {
  //           "id_mr_doc" : _id_mr,
  //           "mr_id" : mr_id,
  //           "id_mr_pp_doc" : getdataFromSavePPMR.id_mr_pp_doc._id,
  //           "id_pp_doc" : dataPPTssr[i]._id,
  //           "pp_id" : dataPPTssr[i].pp_id,
  //           "id_site_doc" : dataTSSRBOMFE.id_site_doc,
  //           "site_id" : dataTSSRBOMFE.site_id,
  //           "site_name" : dataTSSRBOMFE.site_name,
  //           "id_mc_doc" : dataMatIndex._id,
  //           "material_id" : dataMatIndex.material_id,
  //           "material_name" : dataMatIndex.material_name,
  //           "material_type" : dataMatIndex.material_type === undefined ? "passive_material" : dataMatIndex.material_type,
  //           "uom" : dataMatIndex.uom,
  //           "qty" : (!this.state.qty_fe.has(dataPPTssr[i].pp_id) ? dataTSSRBomItemIndex.qty : this.state.qty_fe.get(dataPPTssr[i].pp_id))*dataMatIndex.qty,
  //           "qty_scan" : 0,
  //           "id_po_doc" : null,
  //           "po_number" : "demo PO 1",
  //           "serial_numbers": [],
  //           "deleted" : 0,
  //           "created_by" : this.state.userId,
  //           "updated_by" : this.state.userId
  //         }
  //         matMRsave.push(matSave);
  //       }
  //     }
  //   }
  //   if(matMRsave.length !== 0){
  //     const respondSaveMRMat = await this.postDatatoAPIBAM('/mr_md_op', matMRsave);
  //     if(respondSaveMRMat.data !== undefined && respondSaveMRMat.status >= 200 && respondSaveMRMat.status <= 300 ){
  //       this.setState({action_status : 'success'}, () => {
  //         setTimeout(function(){ this.setState({ redirectSign : _id_mr}); }.bind(this), 3000);
  //       });
  //     }else{
  //       this.setState({action_status : 'failed'});
  //       // this.patchDatatoAPIBAM('/mr_op/'+_id_mr, {"deleted" : 1}, _etag_mr);
  //     }
  //   }else{
  //     this.setState({action_status : 'success'}, () => {
  //       setTimeout(function(){ this.setState({ redirectSign : _id_mr}); }.bind(this), 3000);
  //     });
  //   }
  // }

  // async connectPlantSpectoTSSR(){
  //   const dataMRParent = this.state.data_mr;
  //   const dataTSSRParent = this.state.data_tssr;
  //   const dataTSSRBOMNE = this.state.tssr_site_NE;
  //   const dataTSSRBOMFE = this.state.tssr_site_FE;
  //   const dataTSSRItems = this.state.data_tssr_sites_item;
  //   const dataPP = this.state.list_pp_material_tssr;
  //   console.log("dataTSSRBOMNE", dataTSSRBOMNE);
  //   console.log("dataTSSRParent", dataTSSRParent);
  //   const dataTssrHeader = {
  //     "id_tssr_doc": dataTSSRParent._id,
  //     "tssr_id": dataTSSRParent.no_tssr_boq,
  //     "tssr_version": dataTSSRParent.version,
  //   }
  //   const site_info_ne = {
  //     "id_tssr_boq_site_doc": dataTSSRBOMNE.site_info.id_tssr_boq_doc,
  //     "no_tssr_boq_site": dataTSSRBOMNE.site_info.no_tssr_boq_site,
  //     "id_site_doc": null,
  //     "site_id": dataTSSRBOMNE.site_info.site_id,
  //     "site_name": dataTSSRBOMNE.site_info.site_name,
  //     "tssr_version": dataTSSRBOMNE.site_info.version
  //   }
  //   let dataPPNE = [];
  //   const dataTSSRItemsNE = dataTSSRBOMNE.site_items;
  //   for(let i = 0; i < dataTSSRItemsNE.length; i++){
  //     let itemIdx = Object.assign({}, dataTSSRItemsNE[i].product_packages);
  //     if(itemIdx._etag !== undefined){
  //       delete itemIdx._etag;
  //     }
  //     let dataMatPPIdx = [];
  //     let dataPPIdx = dataTSSRItemsNE[i];
  //     if(dataPPIdx !== undefined){
  //       for(let j = 0; j < dataPPIdx.material_detail.length; j++){
  //         let dataMatIdx = Object.assign({}, dataPPIdx.material_detail[j]);
  //         dataMatIdx["__v"] = dataMatIdx.version;
  //         // dataMatIdx["qty"] = itemIdx.qty * dataMatIdx.qty;
  //         dataMatIdx["deleted"] = 0;
  //         if(dataMatIdx._etag !== undefined){
  //           delete dataMatIdx._etag;
  //         }
  //         dataMatPPIdx.push(dataMatIdx);
  //       }
  //     }
  //     dataPPNE.push({"product_packages" : itemIdx, "material_detail" : dataMatPPIdx});
  //   }
  //   const dataNE = {
  //     "site_info_ne" : site_info_ne,
  //     "mr_ne_items" : dataPPNE,
  //   }
  //   const dataTSSRConnectMR = {
  //     "tssr_info" : dataTssrHeader,
  //     "mr_site_ne" : dataNE,
  //   }
  //   if(dataMRParent.sow_type === "TRM"){
  //     const site_info_fe = {
  //       "id_tssr_boq_site_doc": dataTSSRBOMFE.id_tssr_boq_doc,
  //       "no_tssr_boq_site": dataTSSRBOMFE.no_tssr_boq_site,
  //       "id_site_doc": null,
  //       "site_id": dataTSSRBOMFE.site_id,
  //       "site_name": dataTSSRBOMFE.site_name,
  //       "tssr_version": dataTSSRBOMFE.version === undefined ? 0 : dataTSSRBOMFE.version
  //     }
  //     let dataPPFE = [];
  //     const dataTSSRItemsFE = dataTSSRBOMFE.site_items;
  //     for(let i = 0; i < dataTSSRItemsFE.length; i++){
  //       let itemIdx = Object.assign({}, dataTSSRItemsFE[i].product_packages);
  //       itemIdx["__v"] = itemIdx.version;
  //       itemIdx["deleted"] = 0;
  //       if(itemIdx._etag !== undefined){
  //         delete itemIdx._etag;
  //       }
  //       let dataMatPPIdx = [];
  //       let dataPPIdx = dataTSSRItemsFE[i];;
  //       if(dataPPIdx !== undefined){
  //         for(let j = 0; j < dataPPIdx.material_detail.length; j++){
  //           let dataMatIdx = Object.assign({}, dataPPIdx.material_detail[i]);
  //           dataMatIdx["__v"] = dataMatIdx.version;
  //           dataMatIdx["deleted"] = 0;
  //           if(dataMatIdx._etag !== undefined){
  //             delete dataMatIdx._etag;
  //           }
  //           dataMatPPIdx.push(dataMatIdx);
  //         }
  //       }
  //       dataPPNE.push({"product_packages" : itemIdx, "material_detail" : dataMatPPIdx});
  //     }
  //     const dataFE = {
  //       "site_info_fe" : site_info_fe,
  //       "mr_fe_items" : dataPPFE,
  //     }
  //     dataTSSRConnectMR["mr_site_fe"] = dataFE;
  //   }
  //   this.patchDatatoAPINODE('/matreq/updatePlantSpecByTssr/'+dataMRParent._id, dataTSSRConnectMR).then(res => {
  //     if(res.data !== undefined){
  //       this.setState({ action_status : "success" });
  //     }else{
  //       this.setState({ action_status : "failed" });
  //     }
  //   })
  //   // console.log("dataTSSRConnectMR JSON", JSON.stringify(dataTSSRConnectMR));
  //   // console.log("dataTSSRConnectMR", dataTSSRConnectMR);
  // }

  async connectPlantSpectoTSSR(){
    const dataMRParent = this.state.data_mr;
    this.patchDatatoAPINODE('/matreq/assignPlantSpecByTssr/'+dataMRParent._id+'/ps/'+this.state.id_tssr_selected).then(res => {
      if(res.data !== undefined){
        this.setState({ action_status : "success" });
      }else{
        this.setState({ action_status : "failed" });
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
    this.getListTssrAll();
  }

  render() {
    console.log("this.state.data_tssr", this.state.data_tssr);
    if(this.state.data_tssr !== null){
      console.log("this.state.data_tssr stei list", this.state.data_tssr.siteList);
    }
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
            <span style={{lineHeight :'2', fontSize : '17px'}} >Assign PS</span>
            <Button color='success' style={{float : 'right'}} disable={this.state.list_pp_material_tssr.length === 0} onClick={this.connectPlantSpectoTSSR}>Assign</Button>
          </CardHeader>
          <CardBody>
            <table>
              <tbody>
                <tr>
                  <td style={{width : '150px'}}>PlantSpec</td>
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
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>MR ID : {this.state.data_mr.mr_id}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>Project Name : {this.state.data_mr.project_name}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>SOW Type : {this.state.data_mr.sow_type}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{fontSize : '15px', textAlign : 'center', color : 'rgba(59,134,134,1)'}}>MR Site NE : {this.state.data_mr.site_info[0].site_id}</td>
                  </tr>
                  </Fragment>
                )}
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : 'rgba(59,134,134,1)', marginTop: '5px'}}></hr>
            <Fragment>
            <Row>
            {this.state.data_tssr !== null && (
              <Fragment>
                <Col md="4">
                <table className="table-header">
                  <tbody>
                    <Fragment>
                      {this.state.data_mr.mr_type === "Relocation" || this.state.data_mr.mr_type === "Return" ? (
                        <tr>
                          <td style={{width : '200px'}}>Destination {this.state.data_mr.destination.title}</td>
                          <td>:</td>
                          <td style={{width : '200px'}}>{this.state.data_mr.destination.value}</td>
                        </tr>
                      ) : (
                        <Fragment>
                        <tr>
                          <td style={{width : '200px'}}>TSSR Site ID NE</td>
                          <td>:</td>
                          <td>{this.state.data_tssr.siteList !== undefined ? this.state.data_tssr.siteList[0].site_info.site_id : ""}</td>
                        </tr>
                        <tr>
                          <td style={{width : '200px'}}>TSSR Site Name NE</td>
                          <td>:</td>
                          <td>{this.state.data_tssr.siteList !== undefined ? this.state.data_tssr.siteList[0].site_info.site_name : ""}</td>
                        </tr>
                        </Fragment>
                      )}
                    </Fragment>
                  </tbody>
                </table>
                </Col>
                {this.state.tssr_site_FE !== null && this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                  <Col md="4">
                  <table className="table-header">
                    <tbody>
                      <tr>
                        <td>Site ID FE</td>
                        <td>: &nbsp;</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_FE.site_info.site_id}</td>
                      </tr>
                      <tr>
                        <td>Site Name FE</td>
                        <td>:</td>
                        <td style={{paddingLeft:'10px'}}>{this.state.tssr_site_FE.site_info.site_name}</td>
                      </tr>
                    </tbody>
                  </table>
                  </Col>
                ) : (<Fragment></Fragment>)}
              </Fragment>
            )}
            </Row>
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
                      <th rowSpan="2" className="fixedhead" style={{width : '200px', verticalAlign : 'middle'}}>PP / Material Code</th>
                      <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>PP / Material Name</th>
                      <th rowSpan="2" className="fixedhead" style={{verticalAlign : 'middle'}}>Program</th>
                      <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Unit</th>
                      <th colSpan="3" className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Total Qty per PP</th>
                      <th rowSpan="2" className="fixedhead" style={{width : '75px', verticalAlign : 'middle'}}>Availability</th>
                    </tr>
                    {this.state.data_mr !== null ?
                      this.state.data_mr.mr_type !== "Relocation" && this.state.data_mr.mr_type !== "Return" ? (
                        <tr>
                          <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>Site NE</th>
                          {this.state.tssr_site_FE !== null ? (
                            <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>SITE FE</th>
                          ):(<Fragment></Fragment>)}
                          <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>WH Stock</th>
                          <th className="fixedhead" style={{width : '100px', verticalAlign : 'middle'}}>WH Plan</th>
                        </tr>
                      ) : <Fragment></Fragment> : <Fragment></Fragment>}
                  </thead>
                  <tbody>
                  {this.state.data_tssr !== null ? (
                    <Fragment>
                      {this.state.data_tssr.packages.map( pp =>
                        <Fragment>
                          <tr style={{backgroundColor : '#E5FCC2'}} className="fixbody">
                            <td style={{textAlign : 'left'}}>{pp.pp_id}</td>
                            <td>{pp.product_name}</td>
                            <td>{pp.program}</td>
                            <td>{pp.uom}</td>
                            <td>{pp.qty.toFixed(2)}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          {pp.materials.map(material =>
                            <tr style={{backgroundColor : 'rgba(248,246,223, 0.5)'}} className="fixbody">
                              <td style={{textAlign : 'right'}}>{material.material_id}</td>
                              <td style={{textAlign : 'left'}}>{material.material_name}</td>
                              <td></td>
                              <td>{material.uom}</td>
                              <td align='center'>{(pp.qty * material.qty).toFixed(2)}</td>
                              <td align='center'>{qty_wh = this.state.material_wh.find(e => e.sku === material.material_id) !== undefined ? this.state.material_wh.find(e => e.sku === material.material_id).qty_sku.toFixed(2) : 0}</td>
                              <td align='center'>{qty_inbound = this.state.material_inbound.find(e => e.sku === material.material_id) !== undefined ? this.state.material_inbound.find(e => e.sku === material.material_id).qty_sku.toFixed(2) : 0}</td>
                              <td align='center'>{pp.qty*material.qty < qty_wh ? "OK":"NOK"}</td>
                            </tr>
                          ) }
                        </Fragment>)}
                    </Fragment>
                  ): (<Fragment></Fragment>)}
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
