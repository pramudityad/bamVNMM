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
import './boqtssrdelta.css';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class BoqTssrDeltaApproval extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fileUpload : null,
        action_status : null,
        action_message : null,

        delta_API : null,
        tech_sites_API : null,
        delta_sites_API : [],
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
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.viewTSSRReport = this.viewTSSRReport.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.approvedBoqDelta = this.approvedBoqDelta.bind(this);
    this.handleInputFile  = this.handleInputFile.bind(this);
    this.fileDownloadApproval = this.fileDownloadApproval.bind(this);
    this.SubmitFilte = this.SubmitFilte.bind(this);
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
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
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
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
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
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Patch data", err);
      return respond;
    }
  }

  async patchDataFiletoAPI(url, file, _etag){
    try {
      let respond = await axios.patch(API_URL +url, file, {
        headers : {'Content-Type':'multipart/form-data'},
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
      console.log("respond Patch data", respond);
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

  async getFilefromAPI(url){
    try {
      let respond = await axios.get(API_URL +url, {
        responseType : 'blob',
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

  async getDeltaMatrixbyTech(_id_tssr){
    let getMatrix = await this.getDatafromAPI('/boq_tech_audit/'+_id_tssr+'?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1 }');
    if(getMatrix === undefined){getMatrix = {}; getMatrix["data"] = undefined}
    if(getMatrix.data !== undefined){
        this.setState({delta_API : getMatrix.data}, () => {
          const items = getMatrix.data.list_of_id_site;
          if(items.length !== 0){
            this.setState({tech_sites_API : items});
          }
          this.getListSites(getMatrix.data._id);
        });
    }
  }

  getListSites(_id_tech){
    let where = 'where={"id_boq_tech_doc" : "'+_id_tech+'"}'
    this.getDatafromAPI('/delta_boq_tech_sites_sorted_non_page?'+where).then(res => {
      console.log("getDatafromAPI", res)
        if(res !== undefined){
            if(res.data !== undefined){
                const items = res.data._items;
                this.setState({delta_sites_API : items}, () => {
                    console.log("delta Sites", items);
                    if(items.length !== 0){
                        // this.viewTSSRReport(items);
                        this.viewTSSRBOQ(items);
                    }
                })
            }
        }
    })
  }

  handleChangeChecklist(e){
    const tssr = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ tssrchecked: prevState.tssrchecked.set(tssr, isChecked) }));
  }

  handleChangeProject=(e)=>{
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    console.log('value', value);
    this.setState({project_select : value, project_name_select : text, site_tssr : [], totalData : 0, prevPage : 1, activePage : 1, tssrchecked : new Map()}, () => {
        this.getListSites();
    });
  }

  componentDidMount(){
    // this.getListSites();
    this.getDeltaMatrixbyTech(this.props.match.params.id);
  }

  componentDidUpdate(){
    if(this.state.prevPage !== this.state.activePage){
      this.getListSites();
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  viewTSSRBOQ(tssrSiteAll){
    let tssrSiteDelta = JSON.stringify(tssrSiteAll);
    let tssrSite = JSON.parse(tssrSiteDelta);
    const delteTSSRSite = JSON.parse(tssrSiteDelta);
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
            const getPP = delteTSSRSite[i].list_of_site_items.find( e => e.id_pp_doc === onlyItem[j].id_pp_doc);
            // console.log()
            if(getPP !== undefined){
              list_of_item[j]["qty"] = getPP.qty
            }else{
              list_of_item[j]["qty"] = 0
            }
        }
        tssrSite[i]["list_of_site_items"] = list_of_item;
    }
    const siteUniq = [...new Set(tssrSite.map(({ site_id }) => site_id))];
    let deltaSites = [];
    if(siteUniq.length !== tssrSite.length){
      for(let i = 0; i < tssrSite.length; i++){
        if(deltaSites.find(e => e.site_id === tssrSite[i].site_id) === undefined){
          const filterDeltaSite = tssrSite.filter(e => e.site_id === tssrSite[i].site_id);
          if(filterDeltaSite.length > 1){
            tssrSite[i]["list_of_site_items"] = this.countTotalQTYperSite(filterDeltaSite);
          }
          deltaSites.push(tssrSite[i]);
        }
      }
    }else{
      deltaSites = tssrSite;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName};
    this.setState({headerTable : headerTable, site_tssr : deltaSites})
    console.log("tssrSite deltaSites", deltaSites);
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

  removeDuplicates(myArr, key) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
  }

  numToSSColumn(num){
    var s = '', t;
  
    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t)/26 | 0;
    }
    return s || undefined;
  }

  exportTSSR = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const header = this.state.headerTable;
    const tssrSite = this.state.site_tssr;
    const dataDelta = this.state.delta_API;
    const DatePrint = new Date(dataDelta.created_on.toString());
    const DatePrintOnly = DatePrint.getFullYear()+'-'+(DatePrint.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrint.getDay().toString().padStart(2, '0');
    const DatePrintNow = new Date();
    const DatePrintOnlyNow = DatePrintNow.getFullYear()+'-'+(DatePrintNow.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrintNow.getDay().toString().padStart(2, '0');

    const prepared = ws.mergeCells('A4:C4');
    ws.getCell('A4').value = 'Downloaded by.';
    ws.getCell('A4').alignment  = { vertical: 'top', horizontal: 'left' };
    ws.getCell('A4').font  = { size: 8 };
    ws.getCell('A4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

    const preparedEmail = ws.mergeCells('A5:C5');
    ws.getCell('A5').value = localStorage.getItem("user_Email"); 
    ws.getCell('A5').alignment  = {horizontal: 'left' };
    ws.getCell('A5').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
  
    const DocumentNo = ws.mergeCells('D4:E4');
    ws.getCell('D4').value = 'Document No.';
    ws.getCell('D4').font  = { size: 8 };
    ws.getCell('D4').alignment  = {vertical: 'top', horizontal: 'left' };
    ws.getCell('D4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

    const DocumentNum = ws.mergeCells('D5:E5');
    ws.getCell('D5').value = 'DELTA-'+dataDelta.no_boq_tech;
    ws.getCell('D5').alignment  = {horizontal: 'left' };
    ws.getCell('D5').border = {left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

    const DateHead = ws.mergeCells('F4');
    ws.getCell('F4').value = 'Date.';
    ws.getCell('F4').font  = { size: 8 };
    ws.getCell('F4').alignment  = {vertical: 'top', horizontal: 'left' };
    ws.getCell('F4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

    const DateVal = ws.mergeCells('F5');
    ws.getCell('F5').value = DatePrintOnlyNow;
    ws.getCell('F5').alignment  = {horizontal: 'left' };
    ws.getCell('F5').border = {left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

    const TSSRInfo = ws.mergeCells('A7:F7');
    ws.getCell('A7').value = 'Delta TSSR BOQ';
    ws.getCell('A7').font  = { size: 14, bold : true };
    ws.getCell('A7').alignment  = {vertical: 'middle', horizontal: 'center' };
    ws.getCell('A7').border = {bottom: {style:'double'} };

    ws.addRow(["Project Identifier", ": "+dataDelta.project_name, "", "",]);
    const TSSRInfoSub = ws.mergeCells('B8:C8');

    ws.addRow([""]);

    const rowHeader2 = ["Project","Site ID","Site Name"].concat(header.product_name);
    ws.addRow(rowHeader2);
    let getlastrowHeader2 = ws.lastRow._number;
    for(let i = 1; i < rowHeader2.length+1; i++){
      ws.getCell(this.numToSSColumn(i)+getlastrowHeader2.toString()).fill = {
        type : 'pattern',
        pattern : 'solid',
        fgColor : {argb:'FF0ACD7D'}
      }
    }
    for(let i = 0; i < tssrSite.length ; i++){
      const qtySiteItems = tssrSite[i].list_of_site_items.map(e => e.qty);
      ws.addRow([ dataDelta.project_name, tssrSite[i].site_id, tssrSite[i].site_name].concat(qtySiteItems));
    }

    const techFormat = await wb.xlsx.writeBuffer()
    saveAs(new Blob([techFormat]), 'Delta TSSR BOQ DELTA-'+dataDelta.no_boq_tech+' Report.xlsx')
  }

  handleInputFile = e => {
    const fileUpload = e.target.files[0];
    const dataDelta = this.state.delta_API;
    this.setState({fileUpload : fileUpload});
    
  }

  async fileDownloadApproval(){
    const dataDelta = this.state.delta_API;
    if(dataDelta.delta_rev_file !== undefined && dataDelta.delta_rev_file !== null){
      const urlFile = dataDelta.delta_rev_file.file;
      const urlDown = urlFile.replace('/smartapi', '');
      const dataUrl = await this.getFilefromAPI(urlDown);
      if(dataUrl !== undefined){
        let extension = dataUrl.data.type.split('/');
        extension = extension[1];
        if(extension === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'){extension = 'xlsx'};
        if(extension === 'vnd.openxmlformats-officedocument.presentationml.presentation'){extension = 'pptx'};
        saveAs(new Blob([dataUrl.data]), 'Approval File Delta TSSR BOQ BOQ DELTA-'+dataDelta.no_tssr_boq+'.'+extension);
      }
    }
  }

  async SubmitFilte(e){
    this.toggleLoading();
    const data = new FormData(); 
    await data.append('delta_rev_file', this.state.fileUpload);
    let dataDelta = this.state.delta_API;
    const patchFile = await this.patchDataFiletoAPI('/boq_tech_op/'+dataDelta._id, data, dataDelta._etag);
    if(patchFile !== undefined){
      if(patchFile.data !== undefined){
        this.setState({action_status : 'succes'}, () => {
          setTimeout(function(){ window.location.reload(); }, 1500);
        });
      }
    }
    this.toggleLoading();
  }

  async approvedBoqDelta(e){
    this.toggleLoading();
    const statusValue = e.target.value;
    let dataDelta = this.state.delta_API;
    const dataTechDelta = this.state.tech_sites_API.filter(e => e.delta_rev !== undefined);
    const data = new FormData(); 
    await data.append('delta_rev_file', this.state.fileUpload);
    const date = new Date();
    const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let dataApprove = {
        "delta_rev" : statusValue.toString()
    }
    if(statusValue !== 'WA'){
      dataApprove["delta_rev_by"] = localStorage.getItem('user_Email');
      dataApprove["delta_rev_date"] = DateNow.toString();
    }
    // for(let i = 0; i < dataTechDelta.length; i++){
    //   dataTechDelta
    // }
    let statusAprv = statusValue.toString() == "A" ? "Approved" : "Rejected";
    let revPatch = await this.patchDatatoAPI('/boq_tech_op/'+dataDelta._id, dataApprove, dataDelta._etag)
    if(revPatch !== undefined){
        if(revPatch.data !== undefined){
          if(statusValue === 'WA'){
            const patchFile = await this.patchDataFiletoAPI('/boq_tech_op/'+dataDelta._id, data, revPatch.data._etag);
          }
          let dataEmail = {};
          if(statusValue === "R"){
            dataEmail = {
              "to": dataDelta.delta_rev_by,
              "subject":"Request Rejected",
              "body": "Hello your request for Delta TSSR BOQ DELTA-"+dataDelta.no_boq_tech+ " is rejected"
            }
            let sendEmail = await this.apiSendEmail(dataEmail);
          }
          dataDelta['delta_rev'] = dataApprove.delta_rev;
          dataDelta['delta_rev_by'] = dataApprove.delta_rev_by;
          dataDelta['delta_rev_date'] = dataApprove.delta_rev_date;
          dataDelta['_etag'] = revPatch.data._etag;
          this.setState({delta_API : dataDelta, action_status : 'succes', action_message : 'TSSR BOQ '+dataDelta.no_tssr_boq+' has been '+statusAprv}, () => {
            setTimeout(function(){ window.location.reload(); }, 2000);
          });
        }
    }
    this.toggleLoading();
}

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/Boq/Technical/Detail/'+this.state.redirectSign} />);
    }
    return (
      <div>
        {this.state.previewBOQ === false ? (
        <Row>
          <Col xl="12">
          <Card>
            <CardHeader>
            {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') || this.state.userRole.includes('Engineering') ? (
                <React.Fragment>
                  <span style={{'position':'absolute',marginTop:'8px'}}>DELTA TSSR Approval</span>
                  <div className="card-header-actions" style={{marginRight:'5px'}}>
                    <Button onClick={this.exportTSSR}>Print Delta BOQ</Button>
                  </div>
                </React.Fragment>
            ):(<span>DELTA TSSR Approval</span>)}
            </CardHeader>
            <CardBody className='card-UploadBoq'>
              {this.state.delta_API !== null && (
              <React.Fragment>
                <Row>
                  <Col sm="12" md="12">
                    {this.state.delta_API.delta_rev === "R" ? (
                      <Button style={{margin : '8px'}} onClick={this.fileDownloadApproval}>Donwload Approval File</Button>
                    ) : ("")}
                    {this.state.delta_API.delta_rev !== "PA" && this.state.delta_API.delta_rev !== "R" ? (
                      <Button style={{margin : '8px'}} onClick={this.fileDownloadApproval}>Donwload Approval File</Button>
                    ) : (
                      <React.Fragment>
                      <input type="file" style={{"margin":"10px 10px 5px 20px","visiblity":"hidden"}} onChange={this.handleInputFile}/>
                      </React.Fragment>
                    )}
                    {(this.state.delta_API.delta_rev === 'R' || this.state.delta_API.delta_rev === 'WA') && this.state.delta_API.delta_rev !== null ? (
                    <Button style={{'float' : 'right',margin : '8px'}} color="warning" value="R" onClick={this.approvedBoqDelta} disabled={this.state.delta_API.delta_rev === "R"}>
                      {this.state.delta_API.delta_rev !== "R" ? "Reject" : "Rejected"}
                    </Button>
                    ) : ("")}
                    {(this.state.delta_API.delta_rev === 'A' || this.state.delta_API.delta_rev === 'WA') && this.state.delta_API.delta_rev !== null ? (
                    <Button style={{'float' : 'right',margin : '8px'}} color="success" value="A" onClick={this.approvedBoqDelta} disabled={this.state.delta_API.delta_rev === "A"}>
                      {this.state.delta_API.delta_rev !== "A" ? "Approve" : "Approved"}
                    </Button>
                    ) : ("")}
                    {(this.state.delta_API.delta_rev === 'PA' || this.state.delta_API.delta_rev === 'R')  && this.state.delta_API.delta_rev !== null ? (
                      <Button style={{'float' : 'right',margin : '8px'}} color="primary" value="WA" onClick={this.approvedBoqDelta} disabled={this.state.fileUpload === null}>
                        Submit
                      </Button>
                      ) : ("")}
                      {this.state.delta_API.delta_rev !== "PA" && this.state.delta_API.delta_rev !== "R" ? ("") : (
                      <div>
                        <span style={{fontSize : '10px', color:'red', marginLeft : '20px'}}>*please upload customer approval document, before you create Technical BOQ from Delta (Mandatory)</span>
                      </div>
                      )}
                      
                  </Col>                
                </Row>
              <Row>
                <Col sm="12" md="12">
                <table style={{width : '100%', marginBottom : '0px'}}>
                  <tbody>
                    <tr style={{fontWeight : '425', fontSize : '23px'}}>
                      <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Delta TSSR BOQ</td>
                    </tr>
                    <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                      <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : {'DELTA-'+this.state.delta_API.no_boq_tech}</td>
                    </tr>
                  </tbody>
                </table>
                <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                </Col>
              </Row>
              <Row>
                <Col sm="6" md="6">
                <div>
                <table style={{width : '100%', marginBottom : '20px'}} className="table-header">
                  <tbody>
                  <tr style={{fontWeight : '425', fontSize : '15px'}}>
                      <td style={{textAlign : 'left'}}>Project </td>
                      <td style={{textAlign : 'left'}}>:</td>
                      <td style={{textAlign : 'left'}} colspan={2}>{this.state.delta_API.project_name}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                </Col>
                <Col sm="6" md="6">
                <div>
                <table style={{width : '100%', marginBottom : '20px'}} className="table-header">
                  <tbody>
                  <tr style={{fontWeight : '425', fontSize : '15px'}}>
                      <td style={{textAlign : 'left'}}></td>
                      <td style={{textAlign : 'left'}}></td>
                      <td style={{textAlign : 'left'}} colspan={2}></td>
                    </tr>
                  </tbody>
                </table>
                </div>
                </Col>
              </Row>
              </React.Fragment>
              )}
              <div class='divtable'>
              <table hover bordered striped responsive size="sm" class='fixed'>
                  <thead>
                      <tr>
                          <th class="fixleft1deltaapproval fixedhead" rowSpan="2" style={{'width' : '150px', verticalAlign : 'middle'}}>Site ID</th>
                          <th class="fixleft2deltaapproval fixedhead" rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>Site Name</th>
                          {this.state.headerTable.product_name.map(ht => 
                              <th class='fixedheaddelta2' rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle', minWidth : '150px'}}>{ht}</th>
                          )}
                      </tr>
                      <tr>
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.site_tssr.map((tssr,i) =>
                          <tr key={tssr._id} class='fixbody'>
                              <td class="datareg fixleft1deltaapproval" style={{verticalAlign : 'middle'}}>{tssr.site_id}</td>
                              <td class="datareg fixleft2deltaapproval" style={{verticalAlign : 'middle', textAlign : "center"}}>{tssr.site_name}</td>
                              {tssr.list_of_site_items.map(qty => 
                                  <td class="datareg" style={{verticalAlign : 'middle', textAlign : "center"}}>{qty.qty}</td>
                              )}
                          </tr>
                      )}
                  </tbody>
              </table>
              </div>
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

export default BoqTssrDeltaApproval;
