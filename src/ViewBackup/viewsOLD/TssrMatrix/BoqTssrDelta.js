import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
// import './boqTechnical.css';
import ReactExport from 'react-data-export';
import Excel from 'exceljs/modern.browser';
import { saveAs } from 'file-saver';
import { updateEvents } from 'react-mapbox-gl/lib/map-events';
import Select from 'react-select';
import { AppSwitch } from '@coreui/react'
import './boqtssrdelta.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const process.env.REACT_APP_API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class BoqTssrDelta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action_status : null,
      action_message : null,
        Tech_All : [],
        site_tssr : [],
        site_tssr_all : [],
        tssrchecked : new Map(),
        list_project : [],
        project_select : null,
        project_name_select : null,
        prevPage : 1,
        activePage : 1,
        totalData : 0,
        perPage : 20,
        userRole : JSON.parse(localStorage.getItem('user_Roles')),
        headerTable : {"product_type" : [], "product_name" : []},
        headerTableBOQ : {"product_type" : [], "product_name" : []},
        site_tssr_BOQ : [],
        previewBOQ : false,
        modal_loading : false,
        redirectSign : false,
        project_selection : [],
        deltaChecked : [],
        onlyNotCreated : false,
        tssrCheckedPage : false,
        tssrNotCreated : false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.viewTSSRReport = this.viewTSSRReport.bind(this);
    this.TSSRReport = this.TSSRReport.bind(this);
    this.xlsExportMatrix = this.xlsExportMatrix.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.viewTSSRBOQ = this.viewTSSRBOQ.bind(this);
    this.saveTSSRtoBOQ = this.saveTSSRtoBOQ.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleChangeChecklistPage = this.handleChangeChecklistPage.bind(this);
    this.handleChangeNotCreated = this.handleChangeNotCreated.bind(this);
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL +url, {
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
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async postDatatoAPI(url, data){
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL +url, data, {
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
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPI(url, data, _etag){
    try {
      let respond = await axios.patch(process.env.REACT_APP_API_URL +url, data, {
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
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
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

  getListBOQ(){
    const page = this.state.activePage;
    axios.get(process.env.REACT_APP_API_URL +'/boq_tech_sorted?where={"deleted" : 0}&max_results='+this.state.perPage+'&page='+page+'&where={"id_project_doc" : "'+this.state.project_select+'"}', {
        headers : {'Content-Type':'application/json'},
        auth: {
            username: usernamePhilApi,
            password: passwordPhilApi
        },
    })
    .then(res => {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({ Tech_All : items, totalData : totalData, prevPage : this.state.activePage}, () => {
            this.viewTSSRReport();
        });
      })
  }

  getListSites(){
    const page = this.state.activePage;
    const project = this.state.project_select;
    let where = '';
    let whereNotCreated = this.state.tssrNotCreated === true ? ', "no_boq_tech" : null' : '';
    if(project !== null && project !== 'All' ){
        where = 'where={"id_project_doc" : "'+this.state.project_select+'"'+whereNotCreated+'}&';
        console.log("project", project)
    }else{
        where = ''
    }
    if(this.state.project_name_select === "Not Assign"){
      where = 'where={"project_name" : ""'+whereNotCreated+'}&'
    }    
    this.getDatafromAPI('/delta_boq_tech_sites_sorted?'+where+'max_results='+this.state.perPage+'&page='+page).then(res => {
        if(res !== undefined){
            if(res.data !== undefined){
                const items = res.data._items;
                const totalData = res.data._meta;
                this.setState({ totalData : totalData, prevPage : this.state.activePage}, () => {
                    this.viewTSSRReport(items);
                });
            }
        }
    })
  }

  // getListSitesAll(){
  //   const project = this.state.project_select;
  //   let where = '';
  //   if(project !== null && project !== 'All' ){
  //       where = 'where={"id_project_doc" : "'+this.state.project_select+'"}'
  //   }else{
  //       where = ''
  //   }
  //   this.getDatafromAPI('/delta_boq_tech_sites_sorted_non_page?'+where).then(res => {
  //       if(res !== undefined){
  //           if(res.data !== undefined){
  //               const items = res.data._items;
  //               const totalData = res.data._meta;
  //               this.setState({ site_tssr_all : items});
  //           }
  //       }
  //   })
  // }

  getListProject(){
    this.getDatafromAPI('/project_all').then( resp => {
      if(resp !== undefined){
        this.setState({list_project : resp.data._items}, () => {
          this.prepareListProject(resp.data._items);
        });
      }
    })
  }

  handleChangeNotCreated(e){
    console.log("coba e", e.target.checked);
    const isChecked = e.target.checked;
    this.setState({tssrNotCreated : isChecked}, () => {
      if(this.state.project_select !== null){
        this.setState({site_tssr : [], totalData : 0, prevPage : 1, activePage : 1}, () => {
          this.getListSites();
          // this.getListSitesAll();
        });
      }
    });
  }

  handleChangeChecklist(e){
    const tssr = e.target.name;
    const isChecked = e.target.checked;
    const dataDelta = this.state.site_tssr;
    let deltaSelected = this.state.deltaChecked;
    if(isChecked === true){
      const getDelta = dataDelta.find(dlt => dlt._id === tssr);
      deltaSelected.push(getDelta);
    }else{
      deltaSelected = deltaSelected.filter(function( dlt ) {
        return dlt._id !== tssr;
      });
    }
    this.setState({deltaChecked : deltaSelected});
    this.setState(prevState => ({ tssrchecked: prevState.tssrchecked.set(tssr, isChecked) }));
  }

  handleChangeChecklistPage(e){
    const isChecked = e.target.checked;
    const dataDelta = this.state.site_tssr;
    const checkedDeltaSite = this.state.tssrchecked;
    let deltaSelected = this.state.deltaChecked;
    for(let i = 0; i < dataDelta.length; i++){
      if(isChecked == true){
        if(checkedDeltaSite.get(dataDelta[i]._id) !== true && dataDelta[i].no_boq_tech === null){
          deltaSelected.push(dataDelta[i]);
          this.setState(prevState => ({ tssrchecked: prevState.tssrchecked.set(dataDelta[i]._id, isChecked) }));
        }
      }else{
        if(dataDelta[i].no_boq_tech === null){
          deltaSelected = deltaSelected.filter(function( dlt ) {
            return dlt._id !== dataDelta[i]._id;
          });
          this.setState(prevState => ({ tssrchecked: prevState.tssrchecked.set(dataDelta[i]._id, isChecked) }));
        }
      }
    }
    this.setState({deltaChecked : deltaSelected, tssrCheckedPage : isChecked});
  }

  handleChangeProject=(e)=>{
    const value = e.value;
    const label = e.label;
    console.log('value', value);
    this.setState({project_select : value, project_name_select : label, site_tssr : [], totalData : 0, prevPage : 1, activePage : 1, tssrchecked : new Map()}, () => {
        this.getListSites();
        // this.getListSitesAll();
    });
  }

  componentDidMount(){
    this.getListProject();
  }

  componentDidUpdate(){
    if(this.state.prevPage !== this.state.activePage){
      this.getListSites();
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  viewTSSRReport(items){
    let tssrSite = items;
    let onlyItem = tssrSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    console.log("onlyItem", onlyItem);
    const dataHeaderID = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    const dataHeaderPPID = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
    const dataHeaderName = [...new Set(onlyItem.map(({ package_name}) => package_name))];
    const dataHeaderType = [...new Set(onlyItem.map(({ product_type}) => product_type))];
    for(let i = 0; i < tssrSite.length; i++){
        let list_of_qty = [];
        for(let j = 0; j < dataHeaderID.length; j++){
            let getPP = tssrSite[i].list_of_site_items.find( e => e.id_pp_doc === dataHeaderID[j]);
            if(getPP !== undefined){
                list_of_qty.push(getPP.qty);
            }else{
                list_of_qty.push(0);
            }
        }
        tssrSite[i]["list_of_qty"] = list_of_qty;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName}
    this.setState({headerTable : headerTable, site_tssr : tssrSite})
    console.log("tssrSite", tssrSite);
  }

  TSSRReport(items){
    let tssrSite = items;
    let onlyItem = tssrSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    console.log("onlyItem", onlyItem);
    const dataHeaderID = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    const dataHeaderPPID = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
    const dataHeaderName = [...new Set(onlyItem.map(({ package_name}) => package_name))];
    const dataHeaderType = [...new Set(onlyItem.map(({ product_type}) => product_type))];
    for(let i = 0; i < tssrSite.length; i++){
        let list_of_qty = [];
        for(let j = 0; j < dataHeaderID.length; j++){
            let getPP = tssrSite[i].list_of_site_items.find( e => e.id_pp_doc === dataHeaderID[j]);
            if(getPP !== undefined){
                list_of_qty.push(getPP.qty);
            }else{
                list_of_qty.push(0);
            }
        }
        tssrSite[i]["list_of_qty"] = list_of_qty;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName, "site_tssr" : tssrSite};
    console.log("tssrSite", tssrSite);
    return headerTable;
  }

  async xlsExportMatrix(){
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const header = this.state.headerTable;
    const tssrSite = this.state.site_tssr;
    const tssrSiteAll = this.state.site_tssr_all;
    const tssrCheck = this.state.tssrchecked;

    let keyChecked = [];

    let headerRow1 = ["", "", ""];
    let headerRow2 = ["TSSR ID", "Site ID", "Site Name"];

    for (const [key, value] of tssrCheck.entries()) {
      if(value === true){
        keyChecked.push(key);
      }
    }

    if(keyChecked.length !== 0){
      let tssrAllChecked = tssrSiteAll.filter(e => keyChecked.includes( e._id) == true);
      console.log("tssrAllChecked", tssrAllChecked);
      
      let dataPrint = await this.TSSRReport(tssrAllChecked);
      let tssrSiteChecked = dataPrint.site_tssr;

      dataPrint.product_name.map( e => headerRow2.push(e));
      ws.addRow(headerRow1);
      ws.addRow(headerRow2);
      for(let i = 0; i < tssrSiteChecked.length; i++){
        let dataSiteIdx = ["TSSBOM190925000"+(i+1), tssrSiteChecked[i].site_id, tssrSiteChecked[i].site_name];
        tssrSiteChecked[i].list_of_qty.map(e => dataSiteIdx.push(e));
        // dataSiteIdx.push(arrayQTY);
        ws.addRow(dataSiteIdx);
    }
    }else{
      header.product_name.map( e => headerRow2.push(e));
      ws.addRow(headerRow1);
      ws.addRow(headerRow2);
      for(let i = 0; i < tssrSite.length; i++){
          let dataSiteIdx = ["TSSBOM190925000"+(i+1), tssrSite[i].site_id, tssrSite[i].site_name];
          tssrSite[i].list_of_qty.map(e => dataSiteIdx.push(e));
          // dataSiteIdx.push(arrayQTY);
          ws.addRow(dataSiteIdx);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer()
    saveAs(new Blob([allocexport]), 'TSSR BOQ Matrix.xlsx')
  }

  removeDuplicates(myArr, key) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
  }

  togglePreview(){
    this.setState(prevState => ({
      previewBOQ: !prevState.previewBOQ
    }));
  }

  prepareListProject(ListApi){
    const ListProject = [];
    ListProject.push({'label' : "Not Assign", 'value' : "{ $exists: false }"});
    ListApi.map(p => 
      ListProject.push({'label' : p.project_name, 'value' : p._id})    
    )
    this.setState({project_selection : ListProject});
  }

  viewTSSRBOQ(){
    // this.toggleLoading();
    // const tssrSiteAll = this.state.site_tssr_all;
    const tssrSelected = this.state.deltaChecked;
    console.log("tssrSiteAll", tssrSelected);
    const tssrCheck = this.state.tssrchecked;
    let keyChecked = [];
    for (const [key, value] of tssrCheck.entries()) {
      if(value === true){
        keyChecked.push(key);
      }
    }
    let tssrDataSelect = [];
    for(let i =0; i < tssrSelected.length; i++){
      let deltaIdx = Object.assign({}, tssrSelected[i]);
      delete deltaIdx.list_of_qty;
      tssrDataSelect.push(deltaIdx);
    }
    let tssrSiteCheck = tssrDataSelect;
    let tssrSite = tssrDataSelect;
    // const tssrSiteCheckParse = JSON.parse(tssrSiteCheck);
    console.log("tssrSiteCheck", tssrSite);
    let onlyItem = tssrSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    onlyItem = this.removeDuplicates(onlyItem, "id_pp_doc");
    const dataHeaderID = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    const dataHeaderName = [...new Set(onlyItem.map(({ package_name}) => package_name))];
    const dataHeaderType = [...new Set(onlyItem.map(({ product_type}) => product_type))];
    for(let i = 0; i < tssrSite.length; i++){
        let list_of_item = [];
        for(let j = 0; j < onlyItem.length; j++){
            list_of_item.push(JSON.parse(JSON.stringify(onlyItem[j])));
            list_of_item[j]["ericsson_allocated"] = 0
            list_of_item[j]["smart_allocated"] = 0
            list_of_item[j]["qty_quotation_allocated"] = 0
            const getPP = tssrSelected[i].list_of_site_items.find( e => e.id_pp_doc === onlyItem[j].id_pp_doc);
            // console.log()
            if(getPP !== undefined){
              list_of_item[j]["qty"] = getPP.qty
            }else{
              list_of_item[j]["qty"] = 0
            }
            console.log("tes ",i," ", j)
        }
        tssrSite[i]["list_of_site_items"] = list_of_item;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName}
    this.setState({headerTableBOQ : headerTable, site_tssr_BOQ : tssrSite}, () => {
      this.togglePreview();
      // this.toggleLoading();
    })
    console.log("tssrSite", tssrSite);
  }

  async saveTSSRtoBOQ(){
    this.toggleLoading();
    const dataSiteTSSR = this.state.site_tssr_BOQ;
    let statusPost = undefined;
    if(dataSiteTSSR.length !== 0){
      let respondAmount = await this.getDatafromAPI('/amountboqtech/5d24454a951c58496433be19');
      if(respondAmount == undefined){respondAmount["data"] = undefined}
      if(respondAmount.data !== undefined){
        const numberTech = parseInt(respondAmount.data.boq_tech_data)+1;
        let updatedAmount = await this.patchDatatoAPI('/amountboqtech/5d24454a951c58496433be19', {"boq_tech_data" : numberTech.toString()}, respondAmount.data._etag);
        if(updatedAmount == undefined){updatedAmount["data"] = undefined}
        if(updatedAmount.data !== undefined){
          const date = new Date();
          const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
          const ID_Tech = "TECBOQ-"+date.getFullYear().toString().substr(-2)+(date.getMonth()+1).toString().padStart(2, '0')+date.getDate().toString().padStart(2, '0')+"-"+numberTech.toString().padStart(4, '0');
          const BOQTech = {
            "no_boq_tech" : ID_Tech,
            "rev" : "PA",
            "rev_by" : localStorage.getItem('user_Email'),
            "rev_date" : DateNow.toString(),
            "created_by" : localStorage.getItem('user_ID'),
            "updated_by" : localStorage.getItem('user_ID'),
            "no_boq_comm" : null,
            "id_project_doc" : dataSiteTSSR[0].id_project_doc,
            "project_name" : dataSiteTSSR[0].project_name,
            "list_of_id_boq_comm" : [],
            "delta_rev" : "PA",
            "delta_rev_by" : localStorage.getItem('user_Email'),
            "delta_rev_date" : DateNow.toString(),
            "delta_rev_file" : null,
            "version" : "0",
            "deleted" : 0,
            "created_on" : DateNow.toString()
          }
          let respondpostboq = await this.postDatatoAPI('/boq_tech_op', BOQTech);
          if(respondpostboq == undefined){respondpostboq["data"] = undefined}
          if(respondpostboq.data !== undefined){
            let siteTSSR = [];
            for(let i = 0; i < dataSiteTSSR.length;i++){
              if(siteTSSR.find(e => e.id_site_doc === dataSiteTSSR[i].id_site_doc) === undefined){
                let siteIdx = Object.assign({}, dataSiteTSSR[i]);
                siteIdx["id_boq_tech_doc"] = respondpostboq.data._id;
                siteIdx["no_boq_tech"] = ID_Tech;
                siteIdx["version"] = "0";
                siteIdx["tssr_boq_id"] = siteIdx.no_tssr_boq;
                delete siteIdx._id;
                delete siteIdx._etag;
                delete siteIdx._links;
                delete siteIdx.id_allocation_doc;
                delete siteIdx.id_tssr_boq_doc;
                delete siteIdx.no_tssr_boq;
                siteIdx["created_on"] = DateNow.toString();
                siteIdx["created_by"] = localStorage.getItem("user_ID");
                siteIdx["updated_by"] = localStorage.getItem("user_ID");
                const dataSiteFilter = dataSiteTSSR.filter(e => e.id_site_doc === dataSiteTSSR[i].id_site_doc);
                if(dataSiteFilter.length > 1){
                  siteIdx["list_of_site_items"] = await this.countTotalQTYperSite(dataSiteFilter);
                }
                siteTSSR.push(siteIdx);
              }
              const tssrDataUp = {
                "id_boq_tech_doc" : respondpostboq.data._id,
                "no_boq_tech" : ID_Tech
              }
              let tssrupdate = await this.patchDatatoAPI('/delta_boq_tech_sites_op/'+dataSiteTSSR[i]._id, tssrDataUp, dataSiteTSSR[i]._etag);
            }
            console.log("siteTSSR", JSON.stringify(siteTSSR));
            let siteUniq = [...new Set(dataSiteTSSR.map(({ id_site_doc }) => id_site_doc))];
            let respondpostsites = await this.postDatatoAPI('/boq_tech_sites_op', siteTSSR);
            if(respondpostsites == undefined){respondpostsites ={}; respondpostsites["data"] = undefined}
            if(respondpostsites.data !== undefined){
              let dataUpdateTech = {};
              if(respondpostsites.data._items !== undefined){
                dataUpdateTech = {
                  "list_of_id_site" : respondpostsites.data._items.map(e => e._id)
                }
              }else{
                dataUpdateTech = {
                  "list_of_id_site" : [respondpostsites.data._id]
                }
              }
              this.patchDatatoAPI('/boq_tech_op/'+respondpostboq.data._id, dataUpdateTech, respondpostboq.data._etag).then( res => {
                if(res !== undefined){
                  if(res.data !== undefined){
                    statusPost = true;
                    if(statusPost === undefined){
                      this.setState({action_status : 'failed'});
                    }else{
                      this.setState({action_status : 'success'});
                      setTimeout(function(){ this.setState({ redirectSign : res.data._id}); }.bind(this), 3000);
                    }
                  }
                }
              })
            }
          }
        }
      }
    }else{
      this.setState({action_status : 'failed', action_message : 'Please select delta'});
    }
    this.toggleLoading();
  }

  countTotalQTYperSite(dataSite){
    let ListItem = JSON.stringify(dataSite[0].list_of_site_items);
    ListItem = JSON.parse(ListItem);
    let onlyItem = dataSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    let get_id_package = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    let countData = {};
    for(let i = 0;  i< get_id_package.length; i++){
      const materialQTY = onlyItem.filter(d => d.id_pp_doc === get_id_package[i]);
      const getIndexPP = ListItem.findIndex(e => e.id_pp_doc === get_id_package[i]);
      ListItem[getIndexPP]["qty"] = materialQTY.reduce((a,b) => a + b.qty, 0);
    }
    return ListItem;
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/Approval/Tssr/Delta/'+this.state.redirectSign} />);
    }

    const selectStylesZindex3 = {
      container: (base, state) => ({
        ...base,
        zIndex: "3"
      })
    };

    function AlertProcess(props){
      const alert = props.alertAct;
      const message = props.messageAct;
      if(alert == 'failed'){
        return (
          <div className="alert alert-danger" role="alert">
            {message}
            <br />
            Sorry, there was an error when we tried to save it, please reload your page and try again try again
          </div>
        )
      }else{
        if(alert == 'success'){
          return (
            <div className="alert alert-success" role="alert">
              Your data has been saved, page will reload automatically
            </div>
          )
        }else{
          return (
            <div></div>
          )
        }
      }
    }

    console.log("coba tes", [...this.state.tssrchecked.keys()])
    return (
      <div>
        <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
        {this.state.previewBOQ === false ? (
        <Row>
          <Col xl="12">
          <Card>
            <CardHeader>
            {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Engineering') ? (
                <React.Fragment>
                  <span style={{'position':'absolute',marginTop:'8px'}}>TSSR Delta</span>
                  <div className="card-header-actions" style={{marginRight:'5px'}}>
                    <Button color="success" onClick={this.viewTSSRBOQ}>Preview BOQ</Button>
                  </div>
                </React.Fragment>
            ):(<span>TSSR Delta</span>)}
            </CardHeader>
            <CardBody className='card-UploadBoq'>
              <table style={{marginBottom : '10px'}} className="table-header">
                <tbody>
                  <tr>
                    <td style={{width : '125px'}}>Project Identifier</td>
                    <td style={{padding:'10px 0px', width : '400px'}}>
                      <Select
                        options={this.state.project_selection}
                        onChange={this.handleChangeProject}
                        styles={selectStylesZindex3}
                      />
                      {/* <select onChange={this.handleChangeProject} values={this.state.project_select} style={{minWidth : '150px'}}>
                      <option value={null}>{null}</option>
                      {this.state.list_project.map( lp =>
                          <option value={lp._id}>{lp.project_name}</option>
                      )}
                      </select> */}
                    </td>
                  </tr>
                  <tr>
                      <td>
                        Not Created
                      </td>
                      <td style={{verticalAlign:'middle'}}>
                        {/* <Checkbox checked={this.state.tssrNotCreated}  />
                         */}
                         <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} label dataOn={'\u2713'} dataOff={'\u2715'} onChange={this.handleChangeNotCreated}/>
                      </td>
                    </tr>
                </tbody>
              </table>
              <div>
              </div>
              <div class="divtable">
              <table hover bordered striped responsive size="sm" class="fixed">
                  <thead>
                      <tr>
                          <th class="fixleft1delta fixedhead" rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>
                            <Checkbox checked={this.state.tssrCheckedPage} onChange={this.handleChangeChecklistPage} />
                          </th>
                          <th class="fixleft2delta fixedhead" rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>TSSR ID</th>
                          <th class="fixleft3delta fixedhead" rowSpan="2" style={{'width' : '150px', verticalAlign : 'middle'}}>Site ID</th>
                          <th class="fixleft4delta fixedhead" rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>Site Name</th>
                          {this.state.headerTable.product_name.map(ht => 
                              <th rowSpan="2" class="fixedhead2" style={{textAlign : 'center', verticalAlign : 'middle', minWidth : '150px'}}>{ht}</th>
                          )}
                          {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                      </tr>
                      <tr>
                          {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.site_tssr.map((tssr,i) =>
                          <tr key={tssr._id} class="fixbody">
                              <td style={{verticalAlign : 'middle', textAlign : "center"}} class="datareg fixleft1delta">
                                {tssr.id_boq_tech_doc === null ? ( 
                                  <Checkbox name={tssr._id} checked={this.state.tssrchecked.get(tssr._id)} onChange={this.handleChangeChecklist}/>
                                ): "Created"}
                              </td>
                              <td style={{verticalAlign : 'middle', textAlign : "center"}} class="datareg fixleft2delta">{tssr.no_tssr_boq}</td>
                              <td style={{verticalAlign : 'middle'}} class="datareg fixleft3delta">{tssr.site_id}</td>
                              <td style={{verticalAlign : 'middle', textAlign : "center"}} class="datareg fixleft4delta">{tssr.site_name}</td>
                              {tssr.list_of_qty.map(qty => 
                                  <td class='datareg' style={{verticalAlign : 'middle', textAlign : "center"}}>{qty}</td>
                              )}
                          </tr>
                      )}
                  </tbody>
              </table>
              </div>
              <nav>
                  <div>
                  <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.state.totalData.total}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                  />
                  </div>
              </nav>
            </CardBody>
          </Card>
          </Col>
        </Row>
        ) : (<div></div>)}
        {this.state.previewBOQ === true ? (
        <Row>
          <Col xl="12">
          <Card>
            <CardHeader>
            {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Engineering') ? (
                <React.Fragment>
                  <span style={{'position':'absolute',marginTop:'8px'}}>TSSR BOQ Delta</span>
                  <div className="card-header-actions" style={{marginRight:'5px'}}>
                    <Button color="warning" onClick={this.togglePreview} style={{marginRight : '5px'}}>Back</Button>
                    <Button color="success" onClick={this.saveTSSRtoBOQ}>Create Tech BOQ</Button>
                  </div>
                </React.Fragment>
            ):(<span>TSSR BOQ Delta</span>)}
            </CardHeader>
            <CardBody className='card-UploadBoq'>
              <Table hover bordered striped responsive size="sm">
                  <thead>
                      <tr>
                          <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>TSSR ID</th>
                          <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle', minWidth : '175px'}}>Project</th>
                          <th rowSpan="2" style={{'width' : '150px', verticalAlign : 'middle'}}>Site ID</th>
                          <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>Site Name</th>
                          {this.state.headerTableBOQ.product_name.map(ht => 
                              <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle', minWidth : '150px'}}>{ht}</th>
                          )}
                          {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                      </tr>
                      <tr>
                          {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.site_tssr_BOQ.map((tssr,i) =>
                          <tr key={tssr._id}>
                              <td style={{verticalAlign : 'middle', textAlign : "center"}}>{"TSSBOM190925000"+(i+1)}</td>
                              <td style={{verticalAlign : 'middle', textAlign : "center"}}>{this.state.project_name_select}</td>
                              <td style={{verticalAlign : 'middle'}}>{tssr.site_id}</td>
                              <td style={{verticalAlign : 'middle', textAlign : "center"}}>{tssr.site_name}</td>
                              {tssr.list_of_site_items.map(qty => 
                                  <td style={{verticalAlign : 'middle', textAlign : "center"}}>{qty.qty}</td>
                              )}
                              {/* <td style={{verticalAlign : 'middle', textAlign : "center"}}></td> */}
                          </tr>
                      )}
                  </tbody>
              </Table>
            </CardBody>
          </Card>
          </Col>
        </Row>
        ) : (<div></div>)}
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

export default BoqTssrDelta;
