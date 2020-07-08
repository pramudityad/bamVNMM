import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './tssrModule.css';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { AppSwitch } from '@coreui/react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

const Config_group_type_DEFAULT = ["HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "SERVICE", "SERVICE", "SERVICE", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME"]

const Config_group_DEFAULT = ["Config Cabinet", "Config Add L9", "Config Add L10", "Config Add L18", "Config Add L21", "Config BB 5212 (Reuse)", "Config UPG BW 1800", "Swapped Module/BB", "Config UPG BW 2100", "Config Radio B0 MIMO 2T2R", "Config Kit Radio B1 MIMO 2T2R", "Config Radio B1 MIMO 2T2R", "Config Kit Radio B3 MIMO 2T2R", "Config Radio B3 MIMO 2T2R", "Config Radio B1 MIMO 4T4R", "Config Radio B3 MIMO 4T4R", "Config Radio B1 + B3 DUAL BAND 2T2R" ,"Config Radio B1 + B3 DUAL BAND 4T4R", "Config Multi Sector", "Config Antenna", "Config Service 2", "Config Service 3", "Config Service 4", "Material 1 Power", "Material 2 Power", "Material 3 Power", "Material 4 Power", "Material 5 Power", "Service 1 Power", "Service 2 Power", "Service 3 Power", "Material 1 CME", "Material 2 CME", "Material 3 CME", "Material 4 CME", "Material 5 CME", "Service 1 CME", "Service 2 CME", "Service 3 CME"];

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class TSSRBoq extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        tokenUser : this.props.dataLogin.token,
        data_tech_boq : null,
        data_tech_boq_sites : [],
        data_tech_boq_sites_pagination : [],
        tssr_config_comment : new Map(),
        tssr_config_qty : new Map(),
        tssr_comment : null,
        modal_loading : false,
        action_status : null,
        action_message : null,

        tssr_data_upload : null,

        data_comm_boq : null,
        data_comm_boq_version : null,
        data_comm_boq_items : [],
        data_comm_boq_items_version : [],
        list_tech_boq : [],
        list_tech_boq_selection : [],
        data_tech_boq_selected : null,
        data_tech_boq_sites_selected : [],
        list_version : [],

        activePage : 1,
        perPage : 10,

        boq_comm_API : null,
        pp_all : [],
        boq_tech_API : [],
        boq_tech_sites : [],
        bpq_comm_items : [],
        prev_boq_tech_select : null,
        Boq_Technical_Select : null,
        groupingView : [],
        commercialData : [],
        boq_comm_API_now : [],
        commercialDataGroup : [],
        commercialData_now : [],
        project_select : null,
        project_name_select : null,
        rowsTSSR : [],
        qty_cust : new Map(),
        qty_ericsson : new Map(),
        early_start : false,
        unit_price : new Map(),
        curr_rev : null,
        checkedCommItem : new Map(),
        checkedCommItem_all : false,
        get_item_ilang : [],
        email_created_by : null,
        list_po_number : [],
        po_selected : null,
        po_number_selected : null,
        project_all: [],
        version_now: null,
        version_selected : null,
        format_rev : [],
        dataPerGrouping : [],
        toggleShowGroup : false,
        redirectSign : false,
        collapse: false,
        dropdownOpen: new Array(1).fill(false),
        noteChange : new Array(7).fill(null),
        fieldNoteChange : new Array(7).fill(null),
        note_version : null,
        opportunity_id : null,
        inputValue : '',
        databoq : [],
        currencyChange : new Map(),
        currencyChangeAll : null,
        incentiveChange : new Map(),
        UnitPriceIDRChange : new Map(),
        UnitPriceUSDChange : new Map(),
        TotalPriceIDRChange : new Map(),
        TotalPriceUSDChange : new Map(),
        total_comm : {},
        boq_tech_select : {},
        modal_alert : false,
        drm_data : [],
        view_drm : 'tssr',
        format_uploader : "Horizontal",
        view_tech_header_table : {"config_group_header" : [], "config_group_type_header" : []},
        view_tech_all_header_table : {"config_group_header" : [], "config_group_type_header" : []},
        result_check_tssr : {},
      };
      this.saveDataTSSR = this.saveDataTSSR.bind(this);
      this.toggleAlert = this.toggleAlert.bind(this);
      this.exportFormatTSSRVertical = this.exportFormatTSSRVertical.bind(this);
      this.exportFormatTSSRUpdate = this.exportFormatTSSRUpdate.bind(this);
      this.toggleLoading = this.toggleLoading.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleUpload = this.toggleUpload.bind(this);
      this.handleChangeCommentConfig = this.handleChangeCommentConfig.bind(this);
      this.approvalTechnical = this.approvalTechnical.bind(this);
      this.handleChangeCommentTSSR = this.handleChangeCommentTSSR.bind(this);
      this.handleChangeQtyTSSRConfig = this.handleChangeQtyTSSRConfig.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.openDRMinPDB = this.openDRMinPDB.bind(this);
      this.handleChangeViewDRM = this.handleChangeViewDRM.bind(this);
      this.updateTSSRBoq = this.updateTSSRBoq.bind(this);
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

    toggleLoading(){
      this.setState(prevState => ({
        modal_loading: !prevState.modal_loading
      }));
    }

    toggleAlert(e){
      this.setState(prevState => ({
        modal_alert: !prevState.modal_alert
      }));
    }

    toggleUpload() {
      this.setState({ collapse: !this.state.collapse });
    }

    toggleDropdown(i) {
      const newArray = this.state.dropdownOpen.map((element, index) => {
        return (index === i ? !element : false);
      });
      this.setState({
        dropdownOpen: newArray,
      });
    }

    onEntering() {
      this.setState({ status: 'Opening...' });
    }

    onEntered() {
      this.setState({ status: 'Opened' });
    }

    onExiting() {
      this.setState({ status: 'Closing...' });
    }

    onExited() {
      this.setState({ status: 'Closed' });
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

    async saveAsExcel() {
      const wb = new Excel.Workbook()

      const ws = wb.addWorksheet()

      const row = ws.addRow(['a', 'b', 'c'])
      row.font = { bold: true }

      const buf = await wb.xlsx.writeBuffer()

      saveAs(new Blob([buf]), 'abc.xlsx')
    }

    checkValue(props){
      if( typeof props === 'undefined' ) {
        return null;
      }else{
        return props;
      }
    }

    checkValuetoZero(props){
      //Swap undefined or null to 0
      if( typeof props === 'undefined' || props === null || props === '' ) {
        return 0;
      }else{
        return props;
      }
    }

    checkValuetoString(props){
      //Swap undefined or null to 0
      if( typeof props == 'undefined' || props == null ) {
        return "";
      }else{
        return props;
      }
    }

    isSameValue(element,value){
      //function for FindIndex
      return element === value;
    }

    getIndex(data, value){
      //get index of value in Array
      return data.findIndex(e => this.isSameValue(e,value));
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

    async postDatatoAPINODE(url, data){
      try {
        let respond = await axios.post(API_URL_NODE +url, data, {
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

    fileHandlerTSSR = (event) => {
      let fileObj = event.target.files[0];
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      if(fileObj !== undefined){
        ExcelRenderer(fileObj, (err, rest) => {
          if(err){
            console.log(err);
          }
          else{
            console.log('rest.rows', JSON.stringify(rest.rows));
            this.ArrayEmptytoNull(rest.rows);
          }
        });
      }
    }

    ArrayEmptytoNull(dataXLS, DateNow){
      let newDataXLS = [];
      for(let i = 0; i < dataXLS.length; i++){
        let col = [];
        for(let j = 0; j < dataXLS[1].length; j++){
          col.push(this.checkValue(dataXLS[i][j]));
        }
        newDataXLS.push(col);
      }
      this.setState({
        rowsTSSR: newDataXLS
      });
      this.checkingFormatTech(newDataXLS);
    }

    async checkingFormatTech(rowsTech){
      this.toggleLoading();
      let dataCheck = {
        "techBoqData" : rowsTech
      }
      let urlCheck = '/tssr/checkTssr2';
      if(this.state.format_uploader === "Vertical"){
        urlCheck = 'bamidapi/tssr/checkTssrVertical'
      }
      let postCheck = await this.postDatatoAPINODE(urlCheck, dataCheck);
      if(postCheck.data !== undefined){
        const dataCheck = postCheck.data;
        let siteNew = [];
        const listSites = dataCheck.tech_data.map(e => e.site_info);
        for(let i = 0; i < listSites.length; i++){
          if(listSites[i].new_site === true){
            siteNew.push(listSites[i].site_id);
          }
        }
        if(siteNew.length !== 0){
          this.setState({action_status : 'failed', action_message : '[ '+siteNew.join(', ')+' ] => Not available, please create this sites in PDB'});
          this.toggleLoading();
        }else{
          this.setState({result_check_tssr : dataCheck});
          this.toggleLoading();
        }
      }else{
        if(postCheck.response !== undefined){
          if(postCheck.response.data !== undefined){
            if(postCheck.response.data.error !== undefined){
              if(postCheck.response.data.error.message !== undefined){
                this.setState({ action_status: 'failed', action_message: postCheck.response.data.error.message }, () => {
                  this.toggleLoading();
                });
              }else{
                this.setState({ action_status: 'failed', action_message: postCheck.response.data.error }, () => {
                  this.toggleLoading();
                });
              }
            }else{
              this.setState({ action_status: 'failed'}, () => {
                this.toggleLoading();
              });
            }
          }else{
            this.setState({ action_status: 'failed' }, () => {
              this.toggleLoading();
            });
          }
        }else{
          this.setState({ action_status: 'failed' }, () => {
              this.toggleLoading();
          });
        }
      }
      this.setState({loading_checking : null});
    }

    makeFormatintoMap(rowsXLS){
      let dataTechSites = this.state.data_tech_boq_sites;
      const dataHeader = rowsXLS[0];
      let notesTSSRConfig = new Map();
      let qtyTSSTConfig = new Map();
      for(let i = 1; i < rowsXLS.length; i++){
        let config_id_upload = this.checkValue(rowsXLS[i][this.getIndex(dataHeader, 'config_id')]);
        let tower_id_upload = this.checkValue(rowsXLS[i][this.getIndex(dataHeader, 'tower_id')]);
        let dataTowerIdx = dataTechSites.find(e => e.site_id === tower_id_upload);
        if(dataTowerIdx !== undefined){
          let dataConfigIdx = dataTowerIdx.siteItemConfig.find(e => e.config_id === config_id_upload);
          if(dataConfigIdx !== undefined){
            let qtyIdx = this.checkValueReturn(rowsXLS[i][this.getIndex(dataHeader, 'qty_tssr')], 0);
            let noteIdx = this.checkValue(rowsXLS[i][this.getIndex(dataHeader, 'note')]);
            qtyTSSTConfig.set(dataConfigIdx._id, qtyIdx);
            notesTSSRConfig.set(dataConfigIdx._id, noteIdx);
          }
        }
      }
      this.setState({tssr_config_comment : notesTSSRConfig , tssr_config_qty : qtyTSSTConfig})
    }

    toggleEdit() {
      this.setState(prevState => ({
        modalEdit: !prevState.modalEdit
      }));
    }

    componentDidMount(){
      this.getTechBoqData(this.props.match.params.id);
    }

    getTechBoqData(_id_tech){
      this.getDataFromAPINODE('/tssr/getTssrWithDelta/'+_id_tech).then(res => {
        if(res.data !== undefined){
          const dataTech = res.data;
          this.setState({data_tech_boq : dataTech.data});
          if(res.data.data !== undefined){
            this.setState({data_tech_boq_sites : dataTech.data.tssr_site}, () => {
              this.viewTechBoqData(dataTech.data.tssr_site);
              this.dataViewPagination(this.state.data_tech_boq_sites);
              this.getDRMData(dataTech.data.tssr_site, dataTech.data.project_name);
            });
          }
        }
      })
    }

    getDRMData(sites_tech, project){
      let drmGet = {
        "projectName": "XL BAM DEMO 2020",
      }
      let site_data = [];
      sites_tech.map(e => site_data.push({
         "tower_id": e.site_id,
         "program": e.program
      }));
      drmGet["towerList"] = site_data;
      this.postDatatoAPINODE('/drm/getDrmBySite', drmGet ).then((res) => {
        if (res.data !== undefined) {
          this.setState({
            drm_data: res.data.data
          });
        } else {
          this.setState({ drm_data: []});
        }
      });
    }

    viewTechBoqData(data_sites){
      if(data_sites.length !== 0){
        const configId = data_sites[0].siteItemConfig.map(e => e.config_id);
        const typeHeader = data_sites[0].siteItemConfig.map(e => "CONFIG");
        let all_config = data_sites.map(value => value.siteItemConfig.map(child => child)).reduce((l, n) => l.concat(n), []);
        let config_group_avail_uniq = [...new Set(all_config.map(({ config_group }) => config_group))];
        let config_group_non_default = [];
        let config_group_type_avail = [];
        let config_group_type_non_default = [];
        for(let i = 0 ; i < config_group_avail_uniq.length; i++){
          let findConfigGroupType = all_config.find(e => e.config_group === config_group_avail_uniq[i]).config_group_type;
          config_group_type_avail.push(findConfigGroupType);
          if(Config_group_DEFAULT.includes(config_group_avail_uniq[i])!== true){
            config_group_non_default.push(config_group_avail_uniq[i]);
            config_group_type_non_default.push(findConfigGroupType);
          }
        }
        let config_group_all = Config_group_DEFAULT.concat(config_group_non_default);
        let config_group_type_all = Config_group_type_DEFAULT.concat(config_group_type_non_default);

        this.setState({view_tech_header_table : {"config_group_header" : config_group_avail_uniq, "config_group_type_header" : config_group_type_avail }, view_tech_all_header_table : {"config_group_header" : config_group_all, "config_group_type_header" : config_group_type_all } }, () => {
          // this.dataViewPagination(data_sites);
        });
      }
    }

    dataViewPagination(dataTechView){
      let perPage = this.state.perPage;
      let dataTechPage = [];
      if(perPage !== dataTechView.length){
        let pageNow = this.state.activePage-1;
        dataTechPage = dataTechView.slice(pageNow * perPage, (pageNow+1)*perPage);
      }else{
        dataTechPage = dataTechView;
      }
      this.setState({data_tech_boq_sites_pagination : dataTechPage})
    }

    handlePageChange(pageNumber) {
      this.setState({activePage: pageNumber}, () => {
        this.dataViewPagination(this.state.data_tech_boq_sites);
      });
    }

    handleChangeCommentConfig = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ tssr_config_comment: prevState.tssr_config_comment.set(name, value) }));
    }

    handleChangeQtyTSSRConfig = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ tssr_config_qty: prevState.tssr_config_qty.set(name, value) }));
    }

    handleChangeCommentTSSR = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState({tssr_comment : value});
    }

    exportFormatTSSRVertical = async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = [];
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        dataSites = this.state.data_tech_boq_sites_version;
      }else{
        dataSites = this.state.data_tech_boq_sites;
      }
      const dataHeader = this.state.view_tech_header_table;

      let ppIdRow = ["Tower ID", "Program", "SOW", "BOQ Configuration", "SAP Number", "Qty Technical", "QTY TSSR", "Diff", "Note"];

      ws.addRow(ppIdRow);
      for(let i = 0; i < dataSites.length ; i++){
        let qtyConfig = []
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          let idx_config_comment = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? "" : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].note : "";
          let idx_config_qty = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? 0 : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].suggested_qty : 0;
          let diff = dataSites[i].siteItemConfig[j].qty - idx_config_qty
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfig[j].config_id, dataSites[i].siteItemConfig[j].sap_number, dataSites[i].siteItemConfig[j].qty, idx_config_qty, diff, idx_config_comment]);
        }
      }

      const MRFormat = await wb.xlsx.writeBuffer();
      saveAs(new Blob([MRFormat]), 'TSSR BOQ Vertical.xlsx');
    }

    exportFormatTSSRUpdate = async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = [];
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        dataSites = this.state.data_tech_boq_sites_version;
      }else{
        dataSites = this.state.data_tech_boq_sites;
      }
      const dataHeader = this.state.view_tech_header_table;

      let ppIdRow = ["tower_id", "program", "sow", "config_id", "qty_tssr", "note"];

      ws.addRow(ppIdRow);
      for(let i = 0; i < dataSites.length ; i++){
        let qtyConfig = []
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          let idx_config_comment = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? "" : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].note : "";
          let idx_config_qty = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? dataSites[i].siteItemConfig[j].qty : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].suggested_qty : dataSites[i].siteItemConfig[j].qty;
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfig[j].config_id, idx_config_qty, idx_config_comment]);
        }
      }

      const MRFormat = await wb.xlsx.writeBuffer();
      saveAs(new Blob([MRFormat]), 'TSSR BOQ Update Format.xlsx');
    }

    async approvalTechnical(e){
      this.toggleLoading()
      let currValue = e.currentTarget.value;
      if(currValue !== undefined){
        currValue = parseInt(currValue);
      }
      let tssrApproval = {
        "operation":currValue
      }
      let configNotes = [];
      let diffQty = [];
      const data_tech = this.state.data_tech_boq_sites;
      if(currValue === 5){
        tssrApproval["tssrNote"] = true;
        tssrApproval["techBoqNote"] = {};
        tssrApproval["techBoqNote"]["note_value"] = this.state.tssr_comment !== null ? this.state.tssr_comment : this.state.data_tech_boq === null ? "-" : this.state.data_tech_boq.notes === undefined ? " " : this.state.data_tech_boq.notes.length !== 0 ? this.state.data_tech_boq.notes[this.state.data_tech_boq.notes.length-1].note_value : " ";
        let config_comment = this.state.tssr_config_comment;
        let config_qty = this.state.tssr_config_qty;
        for(let i = 0; i < data_tech.length; i++){
          const data_tech_site = data_tech[i];
          for(let j = 0; j < data_tech_site.siteItemConfig.length ;j++ ){
            let conf = data_tech_site.siteItemConfig[j];
            let idx_config_comment = this.state.tssr_config_comment.has(conf._id) === true ? this.state.tssr_config_comment.get(conf._id) : conf.tssr_notes === undefined ? "" : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].note : "";
            let idx_config_qty = config_qty.has(conf._id) === true ? config_qty.get(conf._id) : conf.tssr_notes === undefined ? data_tech_site.siteItemConfig[j].qty : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].suggested_qty : data_tech_site.siteItemConfig[j].qty;
            let configNoteIdx = {
              "_id": conf._id,
              "tssr_note" : idx_config_comment,
              "suggested_qty": idx_config_qty.length === 0 ? 0 : parseFloat(idx_config_qty)
            }
            if(data_tech_site.siteItemConfig[j].qty !== configNoteIdx.suggested_qty ){
              diffQty.push("["+data_tech_site.siteItemConfig[j].site_id+"] => "+data_tech_site.siteItemConfig[j].config_id);
            }
            configNotes.push(configNoteIdx);
          }
        }
        tssrApproval["tssrItemConfigNotes"] = configNotes;
        if(diffQty.length !== 0){
          tssrApproval["isGap"] = true;
        }
      }
      this.toggleLoading();
      // console.log("tssrApproval", JSON.stringify(tssrApproval));
      this.setState({tssr_data_upload : tssrApproval}, () => {
        if(diffQty.length !== 0){
          this.toggleAlert();
        }else{
          this.saveDataTSSR();
        }
      });
    }

    async saveDataTSSR(){
      this.toggleLoading();
      if(this.state.modal_alert === true){
        this.setState({modal_alert : false});
      }
      let patchData = await this.patchDatatoAPINODE('/techBoq/approval/'+this.state.data_tech_boq._id, this.state.tssr_data_upload)
      if(patchData.data !== undefined){
        this.setState({action_status : 'success'});
      }else{
        if(patchData.response !== undefined){
          if(patchData.response.data !== undefined){
            if(patchData.response.data.error !== undefined){
              if(patchData.response.data.error.message !== undefined){
                this.setState({ action_status: 'failed', action_message: patchData.response.data.error.message }, () => {
                });
              }else{
                this.setState({ action_status: 'failed', action_message: patchData.response.data.error }, () => {
                });
              }
            }else{
              this.setState({ action_status: 'failed'}, () => {
              });
            }
          }else{
            this.setState({ action_status: 'failed' }, () => {
            });
          }
        }else{
          this.setState({ action_status: 'failed' }, () => {
          });
        }
      }
      this.toggleLoading();
    }

    async updateTSSRBoq(e){
      let revisionType = e.currentTarget.value;
      let revision = true;
      if(revisionType === "save"){
        revision = false;
      }
      if(this.state.modal_update_info === true){
        this.setState({modal_update_info : false});
      }
      this.toggleLoading();
      const dataChecked = this.state.result_check_tssr;
      const dataPatch = {
        "revision" : revision,
        "itemPackage": false,
        "sites_data" : dataChecked.tech_data,
        "configList" : dataChecked.configList
      }
      let patchTech = await this.patchDatatoAPINODE('/tssr/updateTssr/'+this.state.data_tech_boq._id, dataPatch);
      if(patchTech.data !== undefined){
        this.setState({action_status : 'success'});
      }else{
        if(patchTech.response !== undefined){
          if(patchTech.response.data !== undefined){
            if(patchTech.response.data.error !== undefined){
              if(patchTech.response.data.error.message !== undefined){
                this.setState({ action_status: 'failed', action_message: patchTech.response.data.error.message }, () => {

                });
              }else{
                this.setState({ action_status: 'failed', action_message: patchTech.response.data.error }, () => {

                });
              }
            }else{
              this.setState({ action_status: 'failed'}, () => {

              });
            }
          }else{
            this.setState({ action_status: 'failed' }, () => {

            });
          }
        }else{
          this.setState({ action_status: 'failed' }, () => {

          });
        }
      }
      this.toggleLoading();
      if(revisionType==='save'){
        this.toggleSave();
      }else{
        this.toggleRevised();
      }
    }

    // exportFormatTSSRHorizontalWithDRM = async () =>{
    //   const wb = new Excel.Workbook();
    //   const ws = wb.addWorksheet();
    //
    //   const dataTech = this.state.data_tech_boq;
    //   let dataSites = [];
    //   if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
    //     dataSites = this.state.data_tech_boq_sites_version;
    //   }else{
    //     dataSites = this.state.data_tech_boq_sites;
    //   }
    //
    //   const header_config = this.state.view_tech_header_table;
    //
    //   let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info"];
    //   let HeaderRow2 = ["Tower ID", "Program", "SOW", "Priority"];
    //
    //   let headerDRM = ["Actual RBS DATA", "Actual DU", "RU B0 (900)", "RU B1 (2100)", "RU B3 (1800) ", "RU B8 (900)", "RU B1B3", "RU Band Agnostic", "Remarks Need CR/Go as SoW Original", "Existing Antenna (type)", "ANTENNA_HEIGHT ", "Scenario RAN", "Dismantle Antenna", "Dismantle RU", "Dismantele Accessories", "Dismantle DU", "Dismantle RBS/Encl", "EXISTING DAN SCENARIO IMPLEMENTASI RBS ", "DRM FINAL (MODULE)", "DRM Final Radio", "DRM Final SOW Cabinet", "DRM FINAL (SOW G9/U9/L9)", "DRM FINAL (SOW G18/L18)", "DRM FINAL (SOW U21/L21)", "DRM FINAL (ANTENNA TYPE)", "PLAN ANTENNA AZIMUTH", "PLAN ANTENNA ET/MT", "Module", "Cabinet", "Radio", "Power RRU", "Antenna", "Dismantle", "System", "Optic RRU", "Area", "VERIFICATION (DATE)", "VERIFICATION (STATUS)", "VERIFICATION PIC", "ISSUED DETAIL", "CR Flag engineering"]
    //
    //   header_config.config_group_type_header.map(e => HeaderRow1 = HeaderRow1.concat([e, e]));
    //   header_config.config_group_header.map(e => HeaderRow2 = HeaderRow2.concat([e, "qty"]));
    //
    //   headerDRM.map(e => HeaderRow1.push("DRM"));
    //   HeaderRow2 = HeaderRow2.concat(headerDRM);
    //
    //   ws.addRow(HeaderRow1);
    //   ws.addRow(HeaderRow2);
    //   for(let i = 0; i < dataSites.length ; i++){
    //     let qtyConfig = []
    //     for(let j = 0; j < header_config.config_group_header.length; j++ ){
    //       let dataConfigIdx = dataSites[i].siteItemConfig.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
    //       if(dataConfigIdx !== undefined){
    //         let idx_config_qty = dataConfigIdx.tssr_notes === undefined ? dataConfigIdx.qty : dataConfigIdx.tssr_notes.length !== 0 ? dataConfigIdx.tssr_notes[dataConfigIdx.tssr_notes.length-1].suggested_qty : dataConfigIdx.qty;
    //         qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, idx_config_qty]);
    //       }else{
    //         qtyConfig = qtyConfig.concat([null, null]);
    //       }
    //     }
    //     let drm = this.getDataDRM(dataSites[i].site_id, dataSites[i].program);
    //     ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].priority, dataSites[i].sow]
    //       .concat(qtyConfig)
    //       .concat([drm.actual_rbs_data, drm.actual_du, drm.ru_b0_900, drm.ru_b1_2100, drm.ru_b3_1800, drm.ru_b8_900, drm.ru_b1b3, drm.ru_band_agnostic, drm.remarks_need_cr_go_as_sow_original, drm.existing_antenna_type, drm.antenna_height, drm.scenario_ran, drm.dismantle_antenna, drm.dismantle_ru, drm.dismantle_accessories, drm.dismantle_du, drm.dismantle_rbs_encl, drm.existing_dan_scenario_implementasi_rbs, drm.drm_final_module, drm.drm_final_radio, drm.drm_final_sow_cabinet, drm.drm_final_sow_g9_u9_l9, drm.drm_final_sow_g18_l18, drm.drm_final_sow_u21_l21, drm.drm_final_antenna_type, drm.plan_antenna_azimuth, drm.plan_antenna_et_mt, drm.module, drm.cabinet, drm.radio, drm.power_rru, drm.antenna, drm.dismantle, drm.system, drm.optic_rru, drm.area, drm.verification_date, drm.verification_status, drm.verification_pic, drm.issued_detail, drm.cr_flag_engineering])
    //     );
    //   }
    //
    //   const TSSRDRM = await wb.xlsx.writeBuffer();
    //   saveAs(new Blob([TSSRDRM]), 'TSSR '+dataTech.no_tech_boq+' Report with DRM.xlsx');
    // }

    exportFormatTSSRHorizontalWithDRM = async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = [];
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        dataSites = this.state.data_tech_boq_sites_version;
      }else{
        dataSites = this.state.data_tech_boq_sites;
      }

      const header_config = this.state.view_tech_header_table;

      let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info"];
      let HeaderRow2 = ["Tower ID", "Program", "SOW", "Priority"];

      let headerDRM = ["Actual RBS DATA", "Actual DU", "RU B0 (900)", "RU B1 (2100)", "RU B3 (1800) ", "RU B8 (900)", "RU B1B3", "RU Band Agnostic", "Remarks Need CR/Go as SoW Original", "Existing Antenna (type)", "ANTENNA_HEIGHT ", "Scenario RAN", "Dismantle Antenna", "Dismantle RU", "Dismantele Accessories", "Dismantle DU", "Dismantle RBS/Encl", "EXISTING DAN SCENARIO IMPLEMENTASI RBS ", "DRM FINAL (MODULE)", "DRM Final Radio", "DRM Final SOW Cabinet", "DRM FINAL (SOW G9/U9/L9)", "DRM FINAL (SOW G18/L18)", "DRM FINAL (SOW U21/L21)", "DRM FINAL (ANTENNA TYPE)", "PLAN ANTENNA AZIMUTH", "PLAN ANTENNA ET/MT", "Module", "Cabinet", "Radio", "Power RRU", "Antenna", "Dismantle", "System", "Optic RRU", "Area", "VERIFICATION (DATE)", "VERIFICATION (STATUS)", "VERIFICATION PIC", "ISSUED DETAIL", "CR Flag engineering"]

      header_config.config_group_type_header.map(e => HeaderRow1 = HeaderRow1.concat([e, e]));
      header_config.config_group_header.map(e => HeaderRow2 = HeaderRow2.concat([e, "qty"]));

      headerDRM.map(e => HeaderRow1.push("DRM"));
      HeaderRow2 = HeaderRow2.concat(headerDRM);

      ws.addRow(HeaderRow1);
      ws.addRow(HeaderRow2);
      for(let i = 0; i < dataSites.length ; i++){
        let qtyConfig = []
        for(let j = 0; j < header_config.config_group_header.length; j++ ){
          let dataConfigIdx = dataSites[i].siteItemConfig.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
          if(dataConfigIdx !== undefined){
            let idx_config_qty = dataConfigIdx.qty;
            qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, idx_config_qty]);
          }else{
            qtyConfig = qtyConfig.concat([null, null]);
          }
        }
        let drm = this.getDataDRM(dataSites[i].site_id, dataSites[i].program);
        ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].priority]
          .concat(qtyConfig)
          .concat([drm.actual_rbs_data, drm.actual_du, drm.ru_b0_900, drm.ru_b1_2100, drm.ru_b3_1800, drm.ru_b8_900, drm.ru_b1b3, drm.ru_band_agnostic, drm.remarks_need_cr_go_as_sow_original, drm.existing_antenna_type, drm.antenna_height, drm.scenario_ran, drm.dismantle_antenna, drm.dismantle_ru, drm.dismantle_accessories, drm.dismantle_du, drm.dismantle_rbs_encl, drm.existing_dan_scenario_implementasi_rbs, drm.drm_final_module, drm.drm_final_radio, drm.drm_final_sow_cabinet, drm.drm_final_sow_g9_u9_l9, drm.drm_final_sow_g18_l18, drm.drm_final_sow_u21_l21, drm.drm_final_antenna_type, drm.plan_antenna_azimuth, drm.plan_antenna_et_mt, drm.module, drm.cabinet, drm.radio, drm.power_rru, drm.antenna, drm.dismantle, drm.system, drm.optic_rru, drm.area, drm.verification_date, drm.verification_status, drm.verification_pic, drm.issued_detail, drm.cr_flag_engineering])
        );
      }

      const TSSRDRM = await wb.xlsx.writeBuffer();
      saveAs(new Blob([TSSRDRM]), 'TSSR '+dataTech.no_tech_boq+' Report with DRM.xlsx');
    }

    exportFormatTSSRHorizontal = async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = [];
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        dataSites = this.state.data_tech_boq_sites_version;
      }else{
        dataSites = this.state.data_tech_boq_sites;
      }

      const header_config = this.state.view_tech_header_table;

      let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info"];
      let HeaderRow2 = ["tower_id","program", "sow", "priority"];

      header_config.config_group_type_header.map(e => HeaderRow1 = HeaderRow1.concat([e, e]));
      header_config.config_group_header.map(e => HeaderRow2 = HeaderRow2.concat([e, "qty"]));

      ws.addRow(HeaderRow1);
      ws.addRow(HeaderRow2);
      for(let i = 0; i < dataSites.length ; i++){
        let qtyConfig = []
        for(let j = 0; j < header_config.config_group_header.length; j++ ){
          let dataConfigIdx = dataSites[i].siteItemConfig.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
          if(dataConfigIdx !== undefined){
            let idx_config_qty = dataConfigIdx.qty;
            qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, idx_config_qty]);
          }else{
            qtyConfig = qtyConfig.concat([null, null]);
          }
        }
        let drm = this.getDataDRM(dataSites[i].site_id, dataSites[i].program);
        ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].priority]
          .concat(qtyConfig));
      }

      const TSSRDRM = await wb.xlsx.writeBuffer();
      saveAs(new Blob([TSSRDRM]), 'TSSR '+dataTech.no_tssr_boq+' Format.xlsx');
    }

    exportDRMofTSSR= async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = this.state.data_tech_boq_sites;

      let headerDRM = ["Tower ID", "Program Name", "Project", "Actual RBS DATA", "Actual DU", "RU B0 (900)", "RU B1 (2100)", "RU B3 (1800) ", "RU B8 (900)", "RU B1B3", "RU Band Agnostic", "Remarks Need CR/Go as SoW Original", "Existing Antenna (type)", "ANTENNA_HEIGHT ", "Scenario RAN", "Dismantle Antenna", "Dismantle RU", "Dismantele Accessories", "Dismantle DU", "Dismantle RBS/Encl", "EXISTING DAN SCENARIO IMPLEMENTASI RBS ", "DRM FINAL (MODULE)", "DRM Final Radio", "DRM Final SOW Cabinet", "DRM FINAL (SOW G9/U9/L9)", "DRM FINAL (SOW G18/L18)", "DRM FINAL (SOW U21/L21)", "DRM FINAL (ANTENNA TYPE)", "PLAN ANTENNA AZIMUTH", "PLAN ANTENNA ET/MT", "Module", "Cabinet", "Radio", "Power RRU", "Antenna", "Dismantle", "System", "Optic RRU", "Area", "VERIFICATION (DATE)", "VERIFICATION (STATUS)", "VERIFICATION PIC", "ISSUED DETAIL", "CR Flag engineering"]

      ws.addRow(["TSSR No.", dataTech.no_tech_boq]);
      ws.addRow(["Project Name", dataTech.project_name]);
      ws.addRow([""]);

      ws.addRow(headerDRM);
      for(let i = 0; i < dataSites.length ; i++){
        let drm = this.getDataDRM(dataSites[i].site_id, dataSites[i].program);
        ws.addRow([drm.tower_id, drm.project_name, drm.program, drm.actual_rbs_data, drm.actual_du, drm.ru_b0_900, drm.ru_b1_2100, drm.ru_b3_1800, drm.ru_b8_900, drm.ru_b1b3, drm.ru_band_agnostic, drm.remarks_need_cr_go_as_sow_original, drm.existing_antenna_type, drm.antenna_height, drm.scenario_ran, drm.dismantle_antenna, drm.dismantle_ru, drm.dismantle_accessories, drm.dismantle_du, drm.dismantle_rbs_encl, drm.existing_dan_scenario_implementasi_rbs, drm.drm_final_module, drm.drm_final_radio, drm.drm_final_sow_cabinet, drm.drm_final_sow_g9_u9_l9, drm.drm_final_sow_g18_l18, drm.drm_final_sow_u21_l21, drm.drm_final_antenna_type, drm.plan_antenna_azimuth, drm.plan_antenna_et_mt, drm.module, drm.cabinet, drm.radio, drm.power_rru, drm.antenna, drm.dismantle, drm.system, drm.optic_rru, drm.area, drm.verification_date, drm.verification_status, drm.verification_pic, drm.issued_detail, drm.cr_flag_engineering]);
      }

      const DRMPrint = await wb.xlsx.writeBuffer();
      saveAs(new Blob([DRMPrint]), 'DRM of TSSR'+dataTech.no_tech_boq+'.xlsx');
    }

    getDataDRM(tower, program){
      const drmFind = this.state.drm_data.find(e => e.tower_id === tower && e.program === program);
      if(drmFind !== undefined){
        return drmFind;
      }else{
        return {}
      }
    }

    viewDataDRM(tower, program){
      let viewDRM = {}
      const drmFind = this.state.drm_data.find(e => e.tower_id === tower && e.program === program);
      if(drmFind !== undefined){
        viewDRM = drmFind;
      }else{
        viewDRM = {};
      }
      return(
        <Fragment>
            <td>{viewDRM.actual_rbs_data}</td>
            <td>{viewDRM.actual_du}</td>
            <td>{viewDRM.ru_b0_900}</td>
            <td>{viewDRM.ru_b1_2100}</td>
            <td>{viewDRM.ru_b3_1800}</td>
            <td>{viewDRM.ru_b8_900}</td>
            <td>{viewDRM.ru_b1b3}</td>
            <td>{viewDRM.ru_band_agnostic}</td>
            <td>{viewDRM.remarks_need_cr_go_as_sow_original}</td>
            <td>{viewDRM.existing_antenna_type}</td>
            <td>{viewDRM.antenna_height}</td>
            <td>{viewDRM.scenario_ran}</td>
            <td>{viewDRM.dismantle_antenna}</td>
            <td>{viewDRM.dismantle_ru}</td>
            <td>{viewDRM.dismantle_accessories}</td>
            <td>{viewDRM.dismantle_du}</td>
            <td>{viewDRM.dismantle_rbs_encl}</td>
            <td>{viewDRM.existing_dan_scenario_implementasi_rbs}</td>
            <td>{viewDRM.drm_final_module}</td>
            <td>{viewDRM.drm_final_radio}</td>
            <td>{viewDRM.drm_final_sow_cabinet}</td>
            <td>{viewDRM.drm_final_sow_g9_u9_l9}</td>
            <td>{viewDRM.drm_final_sow_g18_l18}</td>
            <td>{viewDRM.drm_final_sow_u21_l21}</td>
            <td>{viewDRM.drm_final_antenna_type}</td>
            <td>{viewDRM.plan_antenna_azimuth}</td>
            <td>{viewDRM.plan_antenna_et_mt}</td>
            <td>{viewDRM.module}</td>
            <td>{viewDRM.cabinet}</td>
            <td>{viewDRM.radio}</td>
            <td>{viewDRM.power_rru}</td>
            <td>{viewDRM.antenna}</td>
            <td>{viewDRM.dismantle}</td>
            <td>{viewDRM.system}</td>
            <td>{viewDRM.optic_rru}</td>
            <td>{viewDRM.area}</td>
            <td>{viewDRM.verification_date}</td>
            <td>{viewDRM.verification_status}</td>
            <td>{viewDRM.verification_pic}</td>
            <td>{viewDRM.issued_detail}</td>
            <td>{viewDRM.cr_flag_engineering}</td>
        </Fragment>
      )
    }

    handleChangeViewDRM(e){
      const value = e.target.value;
      this.setState({view_drm : value});
    }

    openDRMinPDB(){
      window.open("https://dev.xl.pdb.e-dpm.com/login/", "_blank");
      window.open("https://dev.xl.pdb.e-dpm.com/customerdeliverabledrmmenuxl/list/", "_blank")
    }

    render() {
      let viewDataDRM = {};
      return (
        <div>
          <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <span style={{lineHeight :'2', fontSize : '17px'}}> TSSR BOQ </span>
                  {this.state.data_tech_boq !== null && (
                    <React.Fragment>
                      {this.state.view_drm === "tssr" && (
                        <Button onClick={this.handleChangeViewDRM} value="drm" style={{float : 'right'}} color="primary">
                          View DRM
                        </Button>
                      )}
                      {this.state.view_drm === "drm" && (
                        <Button onClick={this.handleChangeViewDRM} value="tssr" style={{float : 'right'}} color="primary">
                          View TSSR
                        </Button>
                      )}
                      <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{float : 'right', marginRight : '10px'}}>
                        <DropdownToggle caret color="secondary">
                          <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download File
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header> TSSR File</DropdownItem>
                          <DropdownItem onClick={this.exportFormatTSSRVertical}> <i className="fa fa-file-text-o" aria-hidden="true"></i>TSSR Vertical</DropdownItem>
                          <DropdownItem onClick={this.exportFormatTSSRHorizontalWithDRM}> <i className="fa fa-file-text-o" aria-hidden="true"></i>TSSR with DRM Report</DropdownItem>
                          <DropdownItem onClick={this.exportDRMofTSSR}> <i className="fa fa-file-text-o" aria-hidden="true"></i>DRM of TSSR</DropdownItem>
                          <DropdownItem onClick={this.exportFormatTSSRUpdate}> <i className="fa fa-file-text-o" aria-hidden="true"></i>TSSR Update Vertical Format </DropdownItem>
                          <DropdownItem onClick={this.exportFormatTSSRHorizontal}> <i className="fa fa-file-text-o" aria-hidden="true"></i>TSSR Update Horizontal Format </DropdownItem>

                        </DropdownMenu>
                      </Dropdown>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <input type="file" onChange={this.fileHandlerTSSR.bind(this)} style={{"padding":"10px","visiblity":"hidden"}} />
                  <Button style={{'float' : 'right'}} color="warning" onClick={this.updateTSSRBoq} value="save" disabled={this.state.action_status === 'failed' || this.state.result_check_tssr.tech_data === undefined}>
                    <i className="fa fa-paste">&nbsp;&nbsp;</i>
                      {this.state.rowsTSSR.length === 0 ? 'Save' : this.state.result_check_tssr.tech_data !== undefined ? 'Save' : 'Loading..'}
                  </Button>
                  <Button style={{'float' : 'right',marginRight : '8px'}} color="success" onClick={this.updateTSSRBoq} value="revision" disabled={this.state.action_status === 'failed' || this.state.result_check_tssr.tech_data === undefined}>
                    <i className="fa fa-copy">&nbsp;&nbsp;</i>
                    {this.state.rowsTSSR.length === 0 ? 'Revision' : this.state.result_check_tssr.tech_data !== undefined ? 'Revision' : 'Loading..'}
                  </Button>
                  <Row>
                    <Col sm="12" md="12">
                    <table style={{width : '100%', marginBottom : '0px'}}>
                      <tbody>
                        <tr style={{fontWeight : '425', fontSize : '23px'}}>
                          <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>
                          {this.props.match.params.id === undefined ? "CREATE" : ""} TSSR BOQ
                          </td>
                        </tr>
                        {this.state.data_tech_boq !== null && (
                          <React.Fragment>
                            <tr style={{fontWeight : '390', fontSize : '12px', fontStyle:'oblique'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Technical BOQ Origin : {this.state.data_tech_boq.no_tech_boq}</td>
                            </tr>
                            <tr style={{fontWeight : '390', fontSize : '10px', fontStyle:'oblique'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Project : {this.state.data_tech_boq.project_name}</td>
                            </tr>
                            <tr style={{fontWeight : '390', fontSize : '10px', fontStyle:'oblique'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Status : {this.state.data_tech_boq.tssr_approval_status}</td>
                            </tr>
                          </React.Fragment>
                        )}
                      </tbody>
                    </table>
                    <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                    </Col>
                  </Row>
                  {this.state.view_drm === "tssr" && (
                    <div class='divtable'>
                      <Table hover bordered striped responsive size="sm" width="100%">
                          <thead class="table-tssr__header--fixed">
                          <tr>
                            <th>Tower ID</th>
                            <th>Program</th>
                            <th>SOW</th>
                            <th>Config</th>
                            <th>SAP Number</th>
                            <th>Qty TSSR</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.data_tech_boq_sites_pagination.map(site =>
                          site.siteItemConfig.map(conf =>
                              <tr>
                                <td>{site.site_id}</td>
                                <td>{site.program}</td>
                                <td>{site.sow}</td>
                                <td>{conf.config_id}</td>
                                <td>{conf.sap_number}</td>
                                <td>{conf.qty}</td>
                              </tr>
                          )
                        )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  {this.state.view_drm === "drm" && (
                    <div class='divtable'>
                      <Table hover bordered striped responsive size="sm" width="100%">
                          <thead class="table-tssr__header--fixed">
                          <tr>
                            <th>TowerID</th>
                            <th>Program</th>
                            <th>Actual RBS DATA</th>
                            <th>Actual DU</th>
                            <th>RU B0 (900)</th>
                            <th>RU B1 (2100)</th>
                            <th>RU B3 (1800) </th>
                            <th>RU B8 (900)</th>
                            <th>RU B1B3</th>
                            <th>RU Band Agnostic</th>
                            <th>Remarks Need CR/Go as SoW Original</th>
                            <th>Existing Antenna (type)</th>
                            <th>ANTENNA_HEIGHT </th>
                            <th>Scenario RAN</th>
                            <th>Dismantle Antenna</th>
                            <th>Dismantle RU</th>
                            <th>Dismantele Accessories</th>
                            <th>Dismantle DU</th>
                            <th>Dismantle RBS/Encl</th>
                            <th>EXISTING DAN SCENARIO IMPLEMENTASI RBS </th>
                            <th>DRM FINAL (MODULE)</th>
                            <th>DRM Final Radio</th>
                            <th>DRM Final SOW Cabinet</th>
                            <th>DRM FINAL (SOW G9/U9/L9)</th>
                            <th>DRM FINAL (SOW G18/L18)</th>
                            <th>DRM FINAL (SOW U21/L21)</th>
                            <th>DRM FINAL (ANTENNA TYPE)</th>
                            <th>PLAN ANTENNA AZIMUTH</th>
                            <th>PLAN ANTENNA ET/MT</th>
                            <th>Module</th>
                            <th>Cabinet</th>
                            <th>Radio</th>
                            <th>Power RRU</th>
                            <th>Antenna</th>
                            <th>Dismantle</th>
                            <th>System</th>
                            <th>Optic RRU</th>
                            <th>Area</th>
                            <th>VERIFICATION (DATE)</th>
                            <th>VERIFICATION (STATUS)</th>
                            <th>VERIFICATION PIC</th>
                            <th>ISSUED DETAIL</th>
                            <th>CR Flag engineering</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.data_tech_boq_sites_pagination.map(site =>
                          site.siteItemConfig.map(conf =>
                              <tr>
                                <td>{site.site_id}</td>
                                <td>{site.program}</td>
                                {this.viewDataDRM(site.site_id, site.program)}
                              </tr>
                          )
                        )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  <nav>
                    <div>
                      <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={this.state.perPage}
                          totalItemsCount={this.state.data_tech_boq_sites.length}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                      />
                    </div>
                  </nav>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          {/* Modal Loading */}
          <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className + ' loading-modal'}>
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

          {/* Modal Delete */}
          <Modal isOpen={this.state.modal_alert} toggle={this.toggleAlert} className={'modal-sm ' + this.props.className}>
            <ModalBody>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '15px'}}>There are some different Qty Config between TSSR and Techical </span>
              </div>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '12px'}}>Are sure to continue</span>
              </div>
              <div style={{textAlign : 'center'}}>
                {this.state.submission_number_selected}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.saveDataTSSR}>Save with Gap</Button>
              <Button color="secondary" onClick={this.toggleAlert}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Delete */}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      dataLogin : state.loginData,
      SidebarMinimize : state.minimizeSidebar
    }
  }

  export default connect(mapStateToProps)(TSSRBoq);
