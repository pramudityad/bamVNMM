import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './boqCommercial.css';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { AppSwitch } from '@coreui/react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { connect } from 'react-redux';
import jsonData from './jsonData.js';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_XL = 'https://api-dev.xl.pdb.e-dpm.com/xlpdbapi';
const usernameXL = 'adminbamidsuper';
const passwordXL = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class POAssign extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data_comm_boq : null,
        data_comm_boq_items : [],
        list_po_data : [],
        list_po_data_selection : [],
        data_po_data_selected : null,
        list_po_data_selected : [],
        list_tech_boq : [],
        list_tech_boq_selection : [],
        data_tech_boq_selected : null,
        data_tech_boq_sites_selected : [],

        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        tokenUser : this.props.dataLogin.token,
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
        rowsComm : [],
        qty_cust : new Map(),
        qty_ericsson : new Map(),
        early_start : false,
        unit_price : new Map(),
        curr_rev : null,
        action_status : null,
        action_message : null,
        checkedPackage : new Map(),
        checkedPackage_all : false,
        get_item_ilang : [],
        email_created_by : null,
        modal_loading : false,
        list_po_number : [],
        po_selected : null,
        po_number_selected : null,
        project_all: [],
        list_version : [],
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
        total_comm : {},
        boq_tech_select : {},
      };
      this.toggleLoading = this.toggleLoading.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleUpload = this.toggleUpload.bind(this);
      this.editQtyCust = this.editQtyCust.bind(this);
      this.editUnitPrice = this.editUnitPrice.bind(this);
      this.editQtyEricsson = this.editQtyEricsson.bind(this);
      this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
      this.handleChangeEarlyStart = this.handleChangeEarlyStart.bind(this);
      this.handleChangeOpportunity = this.handleChangeOpportunity.bind(this);
      this.handleChangeNote = this.handleChangeNote.bind(this);
      this.handleChangeFieldNote = this.handleChangeFieldNote.bind(this);
      this.selectBoqTechnical = this.selectBoqTechnical.bind(this);
      this.getDataCommfromTech = this.getDataCommfromTech.bind(this);
      this.selectProject = this.selectProject.bind(this);
      this.overwriteDataItems = this.overwriteDataItems.bind(this);
      this.handleChangeVersion = this.handleChangeVersion.bind(this);
      this.handleChangePO = this.handleChangePO.bind(this);
      this.savePO = this.savePO.bind(this);
      this.showGroupToggle = this.showGroupToggle.bind(this);
      this.filterPOData = this.filterPOData.bind(this);
      this.loadOptions = this.loadOptions.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.saveNote = this.saveNote.bind(this);
      this.handleChangeChecklistAll = this.handleChangeChecklistAll.bind(this);
      this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
      this.handleChangeincentive = this.handleChangeincentive.bind(this);
      this.handleChangeVerComment = this.handleChangeVerComment.bind(this);
      this.handleChangeCurrencyAll = this.handleChangeCurrencyAll.bind(this);
      this.updateCommercial = this.updateCommercial.bind(this);
      this.updatePOAssign = this.updatePOAssign.bind(this);
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

    showGroupToggle(){
      this.setState(prevState => ({
        toggleShowGroup: !prevState.toggleShowGroup
      }));
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

    async getDatafromAPIEXEL(url){
      try {
        let respond = await axios.get(API_URL_XL +url, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: usernameXL,
            password: passwordXL
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
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        console.log("respond Get Data", err);
        return respond;
      }
    }

    async postDatatoAPI(url, data){
      console.log("respond Post Data", JSON.stringify(data));
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
        console.log("respond Post Data", respond);
        return respond;
      }catch (err) {
        let respond = undefined;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
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
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        console.log("respond Patch data", err);
        return respond;
      }
    }

    handleChangeChecklist(e){
      const item = e.target.name;
      const isChecked = e.target.checked;
      this.setState(prevState => ({ checkedPackage: prevState.checkedPackage.set(item, isChecked) }));
      this.setState({get_item_ilang : [item]});
    }

    handleChangeChecklistAll(e){
      const item = e.target.name;
      const isChecked = e.target.checked;
      const AllItem = this.state.commercialData;
      const OnlyGroup = [...new Set(AllItem.map(({ pp_id }) => pp_id))];
      if(isChecked === true){
        for(let x = 0; x < OnlyGroup.length; x++){
          this.setState(prevState => ({ checkedPackage: prevState.checkedPackage.set(OnlyGroup[x], true) }));
        }
        this.setState({checkedPackage_all : true});
      }else{
        for(let x = 0; x < OnlyGroup.length; x++){
          this.setState(prevState => ({ checkedPackage: prevState.checkedPackage.set(OnlyGroup[x], false) }));
        }
        this.setState({checkedPackage_all : false});
      }
      this.setState({get_item_ilang : [item]});
    }

    handleChangeEarlyStart(e){
      const isChecked = e.target.checked;
      const commItems = this.state.commercialData;
      if(isChecked !== false){
        this.setState({ early_start:  isChecked });
        this.LoopEarlyQTY(0, commItems);
      }
    }

    handleChangePO(e){
      const value = e.target.value;
      const index = e.target.selectedIndex;
      const text = e.target[index].text;
      this.setState({po_selected : value, po_number_selected : text});
    }

    LoopEarlyQTY(index, dataCommItem, isChecked){
      if(index >= dataCommItem.length){
        let dataUpdateComm = {
          "early_start" : true
        }
        this.patchDatatoAPI('/boq_comm_op/'+this.state.boq_comm_API._id, dataUpdateComm, this.state.boq_comm_API._etag).then( resp => {})
      }else{
        let dataUpdate = {
          "qty_early_start" : dataCommItem[index].qty_comm_quotation
        }
        this.patchDatatoAPI('/boq_comm_items_op/'+dataCommItem[index]._id, dataUpdate, dataCommItem[index]._etag).then( resp => {
          if(resp !== undefined){
            if(resp.status < 400){
              this.LoopEarlyQTY(index+1, dataCommItem);
            }
          }
        })
      }
    }

    getProjectAll(){
      this.getDatafromAPI('/project_all').then( resp => {
        if(resp !== undefined){
          this.setState({project_all : resp.data._items});
        }
      })
    }

    getPOList(){
      this.getDatafromAPI('/po_non_page').then(resp => {
        if(resp !== undefined){
          this.setState({list_po_number : resp.data._items});
        }
      })
    }

    renderRedirect = (id_boq_comm) => {
        return <Redirect to={'/Boq/Commercial/Detail/'+id_boq_comm} />
    }

    saveSmartStockorPrice = async (verNumber, _id_Comm, _etag_Comm) => {
      // this.toggleLoading();
      console.log("_id_Comm", _id_Comm, _etag_Comm);
      const qty_smart = this.state.qty_cust;
      const edit_price = this.state.unit_price;
      const qty_ericsson = this.state.qty_ericsson;
      const curr_item = this.state.currencyChange;
      const insen_item = this.state.incentiveChange;
      const dataComm = this.state.boq_comm_API;
      const commItems = this.state.commercialData;
      const AllEdit = new Map([...qty_smart, ...edit_price, ...qty_ericsson, ...curr_item, ...insen_item]);
      let respondStockPrice = [];
      let dataProject = undefined;
      for (const [key, value] of AllEdit.entries()) {
        const dataIndex = commItems.find(e => e._id === key);
        if(dataIndex !== undefined){
          let idxSmart = qty_smart.has(key) ? parseFloat(this.checkValuetoZero(qty_smart.get(key))) : dataIndex.smart_stock;
          let idxErics = qty_ericsson.has(key) ? parseFloat(this.checkValuetoZero(qty_ericsson.get(key))) : dataIndex.qty_ericsson;
          let idxPrice = edit_price.has(key) ? parseFloat(this.checkValuetoZero(edit_price.get(key))) : dataIndex.unit_price;
          let idxCurr = curr_item.has(key) ? curr_item.get(key) : dataIndex.currency;
          let idxInsen = insen_item.has(key) ? parseFloat(this.checkValuetoZero(insen_item.get(key))) : dataIndex.incentive;
          let total_price = (dataIndex.qty_tech - (idxSmart + idxErics))*idxPrice;
          let net_total = ((dataIndex.qty_tech - (idxSmart + idxErics))*idxPrice)-idxInsen;
          let dataUpdate = {
            "smart_stock" : idxSmart,
            "qty_ericsson" : idxErics,
            "unit_price" : idxPrice,
            "currency" : idxCurr,
            "total_price" : total_price,
            "incentive" : idxInsen,
            "net_total" : net_total
          }
          const respondPatchQTY = await this.patchDatatoAPI('/boq_comm_items_op/'+key, dataUpdate, dataIndex._etag);
          if(respondPatchQTY !== undefined){
            if(respondPatchQTY.status >= 200 && respondPatchQTY.status < 300){
              respondStockPrice.push(respondPatchQTY.status);
              commItems[commItems.findIndex(e => e._id === key)]["_etag"] = respondPatchQTY.data._etag;
            }
          }
        }

      }

      for(let j = 0; j < commItems.length; j++){
        let dataVersion= {"version" : verNumber}
        const respondPatchVersion = await this.patchDatatoAPI('/boq_comm_items_op/'+commItems[j]._id, dataVersion, commItems[j]._etag);
        if(respondPatchVersion !== undefined){
          if(respondPatchVersion.status >= 200 && respondPatchVersion.status < 300){
            commItems[j]["version"] = verNumber;
            commItems[j]["_etag"] = respondPatchVersion.data._etag;
          }
        }
      }
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      if(respondStockPrice.length === (AllEdit.size)){
        let updateComm = {
          "rev1" : "PA",
          "rev1_by" : this.state.userEmail,
          "rev1_date" : DateNow.toString(),
        }
        const respondUpdateComm = await this.patchDatatoAPI('/boq_comm_op/'+_id_Comm, updateComm, _etag_Comm);
        this.setState({action_status : 'success', action_message : 'Your Commercial BOQ has been updated'}, () => {
          this.toggleLoading();
          setTimeout(function(){ window.location.reload(); }, 2000);
        })
      }else{
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'}, () => {this.toggleLoading()})
      }
      this.setState({commercialData : commItems});
    }

    countPerItemFromDataBase(dataTech){
      let onlyItem = dataTech.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
      let get_id_package = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
      let countData = {};
      for(let i = 0;  i< get_id_package.length; i++){
        const materialQTY = onlyItem.filter(d => d.id_pp_doc === get_id_package[i]);
        countData[get_id_package[i]] = materialQTY.reduce((a,b) => a + b.qty, 0);
      }
      return countData;
    }

    countPerItemGroupFromDataBase(dataTech){
      let onlyItem = dataTech.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
      let get_id_package = [...new Set(onlyItem.map(({ pp_group }) => pp_group))];
      let countData = {};
      for(let i = 0;  i< get_id_package.length; i++){
        const materialQTY = onlyItem.filter(d => d.pp_group === get_id_package[i]);
        countData[get_id_package[i]] = materialQTY.reduce((a,b) => a + b.qty, 0);
      }
      return countData;
    }

    toggleEdit() {
      this.setState(prevState => ({
        modalEdit: !prevState.modalEdit
      }));
    }

    selectBoqTechnical(e){
      const value = e.target.value;
      this.setState({Boq_Technical_Select : value, groupingView : [], commercialData : []});
    }

    selectProject(e){
      const value = e.target.value;
      const index = e.target.selectedIndex;
      const text = e.target[index].text;
      this.setState({project_select : value, project_name_select : text});
    }

    getAllPP(){
      this.getDatafromAPIEXEL('/pp_sorted_nonpage?projection={"_id" : 1,"pp_id" : 1, "pp_group" : 1, "product_name" :1, "uom" : 1, "physical_group" : 1, "product_type" : 1, "pp_key" : 1, "pp_cust_number" : 1}').then( resPP => {
        if(resPP !== undefined){
          if(resPP.data !== undefined){
            console.log("resPP.data", resPP.data);
            if(resPP.data._items.length !== 0){
              this.setState({ pp_all : resPP.data._items});
            }
          }
        }
      })
    }
    async getDataCommAPI(){
      let resComm = await this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1}')
        if(resComm === undefined){ resComm["data"] = undefined }
        if(resComm.data !== undefined){
          if(resComm.data.early_start !== undefined){
            this.setState({ early_start:  resComm.data.early_start, version_now : resComm.data.version, version_selected : resComm.data.version });
          }
          let dataCommItems = [];
          let arrayDataCommItems = resComm.data.list_of_id_item;
          let getNumberPage = Math.ceil(arrayDataCommItems.length / 20);
          for(let i = 0 ; i < getNumberPage; i++){
            let DataPaginationItems = arrayDataCommItems.slice(i * 20, (i+1)*20);
            let arrayIdItems = '"'+DataPaginationItems.join('", "')+'"';
            let where_id_Items = '?where={"_id" : {"$in" : ['+arrayIdItems+']}}';
            let resItems = await this.getDatafromAPI('/boq_comm_items_non_page'+where_id_Items);
            if(resItems !== undefined){
              if(resItems.data !== undefined){
                dataCommItems = dataCommItems.concat(resItems.data._items);
              }
            }
          }
          if(dataCommItems.length !== 0){
            this.DataGroupingView(dataCommItems);
            console.log("data Comm resComm");
            this.getListVersion(this.props.match.params.id);
            this.setState({commercialData : dataCommItems, boq_comm_API_now : resComm.data, boq_comm_API : resComm.data, curr_rev : resComm.data.version, commercialData_now : dataCommItems});
          }
        }else{
          this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        }
    }

    componentDidMount(){
      if(this.props.match.params.id !== undefined){
        // this.getDataCommAPI();
        this.getDataCommercial(this.props.match.params.id);
        this.getPODataList();
      }
    }

    async getPODataList(){
      let getPOList = await this.getDatafromAPIEXEL('/po_op');
      if(getPOList.data !== undefined){
        console.log("list_po_data 1", getPOList.data);
        this.setState({list_po_data : getPOList.data._items });
        this.filterPOData("");
      }
    }

    filterPOData = (inputValue) => {
      const list = [];
      console.log("list_po_data 2", this.state.list_po_data);
      this.state.list_po_data.map(i =>
          list.push({'label' : i.po_number, 'value' : i._id})
      )
      this.setState({list_po_data_selection : list})
      if(inputValue.length === 0){
        return list;
      }else{
        return this.state.list_po_data_selection.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
    }

    loadOptions = (inputValue, callback) => {
      setTimeout(() => {
        callback(this.filterTechBoq(inputValue));
      }, 500);
    };

    async getDataCommercial(_id){
      // const getComm1 = jsonData.data;
      // this.setState({data_comm_boq : getComm1, data_comm_boq_items : getComm1.site});
      let getComm = await this.getDataFromAPINODE('/commBoq/'+_id)
      if(getComm.data !== undefined){
        const dataComm = getComm.data;
        this.setState({data_comm_boq : dataComm.data, data_comm_boq_items : dataComm.data.site});
      }
    }

    handleChangeincentive = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ incentiveChange: prevState.incentiveChange.set(name, value) }));
    }

    updateCommercial = async (e) => {
      this.toggleLoading();
      let revisionType = e.currentTarget.value;
      let revision = true;
      if(revisionType === "save"){
        revision = false;
      }
      let dataComm = this.state.data_comm_boq;
      const incentive_amount = this.state.incentiveChange;
      for (const [key, value] of incentive_amount.entries()) {
        const siteKey = key.split(" /// ")[0]
        const configKey = key.split(" /// ")[1]
        const siteIndex = dataComm.site.findIndex(e => e.site_id === siteKey);
        if(siteIndex !== -1){
          const siteConfigIndex = dataComm.site[siteIndex].items.findIndex(e => e.config_id === configKey);
          if(siteConfigIndex !== -1){
            dataComm.site[siteIndex].items[siteConfigIndex]["incentive"] = parseFloat(value);
          }
        }
      }
      let updateCommBoq = {
        "version_check": revision,
        "data" : dataComm
      }
      console.log("dataComm Update", updateCommBoq);
      this.toggleLoading();
    }

    async getDataCommfromTech(boqTechSelect){
      this.toggleLoading();
      let embeddedTech = '?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}';
      const res = await this.getDatafromAPI('/boq_tech_sorted/'+boqTechSelect+embeddedTech);
      if(res !== undefined){
        if(res.data !== undefined){
          if(res.data.list_of_id_site !== undefined){
            const sumPackage = this.countPerItemFromDataBase(res.data.list_of_id_site);
            console.log("sumPackage", sumPackage);
            const resPP = this.state.pp_all;
            const getProject = this
            const commView = this.dataComm(resPP, sumPackage, res.data.list_of_id_site[0].list_of_site_items);
            this.getDatafromAPI('/boq_tech_sorted/'+boqTechSelect+'?embedded={"list_of_id_boq_comm":1,"list_of_id_boq_comm.list_of_id_item":1}').then(resTech => {
              if(resTech !== undefined){
                if(resTech.data.list_of_id_boq_comm !== undefined){
                  let listPicked = []
                  resTech.data.list_of_id_boq_comm.map(e => e.list_of_id_item.map( i => listPicked.push(i.id_pp_doc)))
                  console.log("data APUI TECh", listPicked)
                  this.DataGroupingView(commView, listPicked);
                }else{
                  this.DataGroupingView(commView);
                }
              }
            })
            this.setState({prev_boq_tech_select : this.state.Boq_Technical_Select});
            this.toggleLoading();
            // this.setState({commercialData : commView}, () => {
            //   this.setState({prev_boq_tech_select : this.state.Boq_Technical_Select});
            // });
          }else{
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'});
            this.toggleLoading();
          }
        }else{
          this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'});
          this.toggleLoading();
        }
      }else{
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'});
        this.toggleLoading();
      }

    }

    componentDidUpdate(){
      if(this.state.prev_boq_tech_select !== this.state.Boq_Technical_Select){
        if(this.state.Boq_Technical_Select !== ""){
          //this.getDataCommfromTech(this.state.Boq_Technical_Select);
        }
      }
    }

    dataCommGroup(dataPP, sumPPGroup){
      let dataGroupSumm = [];
      for(let i = 0 ; i < Object.keys(sumPPGroup).length; i++){
        let PPindex = dataPP.filter(PP => PP.pp_group === Object.keys(sumPPGroup)[i]);
        const dataGroupComm = {
          "pp_group" : Object.keys(sumPPGroup)[i],
          "product_type" : PPindex[0].product_type,
          "phy_group" : PPindex[0].physical_group,
          "unit" : PPindex[0].unit,
          "unit_price" : PPindex[0].price,
          "qty_tech" : Object.values(sumPPGroup)[i],
          "qty_early_start" : null,
          "smart_stock" : 0,
          "qty_ericsson" : 0,
          "qty_comm_quotation" : Object.values(sumPPGroup)[i],
          "qty_po" : null,
          "total_price" : 0,
          "incentive" : 0,
          "net_total" : 0,
          "list_of_id_pp" : PPindex.map(e => e._id),
          "created_by" : this.state.userId,
          "updated_by" : this.state.userId,
          "deleted" : 0
        }
        dataGroupSumm.push(dataGroupComm);
      }
      console.log("sumPackage", dataGroupSumm);
      return dataGroupSumm;
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

    dataComm(dataPP, SummPP, dataPPTech){
      let dataSumm = [];
      for(let i = 0 ; i < dataPP.length; i++){
        let PPindex = dataPP.find(PP => PP._id === Object.keys(SummPP)[i]);
        let PPTechIndex = dataPPTech.find( PP => PP.id_pp_doc === Object.keys(SummPP)[i]);
        if(PPindex !== undefined){
          const dataItemsComm = {
            "id_pp_doc" : PPindex._id,
            "pp_id" :  PPindex.pp_id,
            "pp_key" :  PPTechIndex.pp_key !== undefined ? PPTechIndex.pp_key : this.checkValueReturn(PPindex.pp_key, PPindex.pp_id),
            "pp_group" : PPTechIndex.pp_group !== undefined ? PPTechIndex.pp_group : PPindex.pp_group,
            "package_name" : PPTechIndex.package_name !== undefined ? PPTechIndex.package_name : PPindex.product_name,
            "product_type" : PPTechIndex.product_type !== undefined ? PPTechIndex.product_type : PPindex.product_type,
            "pp_cust_number" : PPTechIndex.pp_cust_number !== undefined ? PPTechIndex.pp_cust_number : this.checkValueReturn(PPindex.pp_cust_number, PPindex.name),
            "phy_group" : PPTechIndex.phy_group !== undefined ? PPTechIndex.phy_group : PPindex.physical_group,
            "unit" : PPTechIndex.unit !== undefined ? PPTechIndex.unit :  PPindex.uom,
            "unit_price" : PPindex.price == null ? 0 : PPindex.price,
            "qty_tech" : Object.values(SummPP)[i],
            "qty_early_start" : null,
            "currency" : "USD",
            "smart_stock" : 0,
            "qty_ericsson" : 0,
            "qty_comm_quotation" : Object.values(SummPP)[i],
            "qty_po" : null,
            "incentive" : 0,
            "net_total" : 0,
            "fas_assignment_id" : PPindex.fas_category !== undefined ? PPindex.fas_category : null,
            "total_price" : Object.values(SummPP)[i] * (PPindex.price == null ? 0 : PPindex.price),
            "created_by" : this.state.userId,
            "updated_by" : this.state.userId,
            "deleted" : 0
          }
          dataSumm.push(dataItemsComm);
        }
      }
      console.log("dataSumm", dataSumm);
      return dataSumm;
    }

    DataGroupingView(itemsDatas, dataItemsPicked){
      let item_nonCom = [];
      let total_price_comm = 0;
      let net_total_comm = 0;
      if(dataItemsPicked !== undefined && dataItemsPicked.length !== 0){
        itemsDatas = itemsDatas.filter(i_d => dataItemsPicked.includes(i_d.id_pp_doc) !== true);
        total_price_comm = itemsDatas.reduce((a,b) => a + b.total_price, 0);
        net_total_comm = itemsDatas.reduce((a,b) => a + b.net_total, 0);
      }else{
        total_price_comm = itemsDatas.reduce((a,b) => a + b.total_price, 0);
        net_total_comm = itemsDatas.reduce((a,b) => a + b.net_total, 0);
      }
      let total_comm = {"totalPriceComm" : total_price_comm, "netTotalComm" : net_total_comm}
      this.setState({total_comm : total_comm});
      let OnlyGrouping = [];
      let OnlyTypeGroup = [...new Set(itemsDatas.map(({ product_type }) => product_type))];
      // OnlyTypeGroup = OnlyTypeGroup.filter(e => e !== "LCM");
      // OnlyTypeGroup.push("LCM");
      for(let i = 0; i < OnlyTypeGroup.length ; i++){
          const group_item = itemsDatas.filter(d => d.product_type === OnlyTypeGroup[i]);
          const dataGroup = {
            "product_type" : OnlyTypeGroup[i],
            "groups" : [...new Set(group_item.map(({ phy_group }) => phy_group))],
          }
          OnlyGrouping.push(dataGroup);
        }
      this.setState(prevState => ({ commercialData:  itemsDatas}));
      this.setState({groupingView : OnlyGrouping});
      // this.toggleLoading();
    }

    saveCommtoAPI = async () => {
      this.toggleLoading();
      console.log("Comm Data", JSON.stringify(this.state.data_tech_boq_selected));
      let postComm = await this.postDatatoAPINODE('/commBoq/createCommercial', {"data" : this.state.data_tech_boq_selected});
      if(postComm.data !== undefined){
        this.setState({action_status : 'success'});
      }else{
        if(postComm.response !== undefined){
          this.setState({action_status : 'failed', action_message : postComm.response.error });
        }else{
          this.setState({action_status : 'failed' });
        }
      }
      this.toggleLoading();
    }

    saveProjecttoDB = async () =>{
      this.toggleLoading();
      const dataComm = this.state.boq_comm_API;
      const data_Project = {
        "id_project_doc" : this.state.project_select,
        "project_name" : this.state.project_name_select
      }
      const respondGetTech = await this.getDatafromAPI('/boq_tech_op/'+ dataComm.id_boq_tech_doc+'?embedded={"list_of_id_site" :1, "list_of_id_boq_comm" :1}');
      console.log("respondGetTech", respondGetTech);
      const respondUpdateTech = await this.patchDatatoAPI('/boq_tech_op/'+respondGetTech.data._id, data_Project, respondGetTech.data._etag);
      if(respondUpdateTech !== undefined){
        if(respondUpdateTech.data !== undefined){
          const list_of_id_boq_comm = respondGetTech.data.list_of_id_boq_comm;
          console.log("respondGetTech", list_of_id_boq_comm);
          if(list_of_id_boq_comm.length > 1){
            for(let j = 0; j < list_of_id_boq_comm.length; j++){
              if(list_of_id_boq_comm[j]._id !== dataComm._id){
                let respondUpdateCommList = await this.patchDatatoAPI('/boq_comm_op/'+list_of_id_boq_comm[j]._id, data_Project, list_of_id_boq_comm[j]._etag);
              }
            }
          }
          const dataSitesTech = respondGetTech.data.list_of_id_site;
          // for(let i = 0; i < dataSitesTech.length; i++){
          //   let respondUpdateTechList = await this.patchDatatoAPI('/boq_tech_sites_op/'+dataSitesTech[i]._id, data_Project, dataSitesTech[i]._etag)
          // }
          const respondUpdateComm = await this.patchDatatoAPI('/boq_comm_op/'+dataComm._id, data_Project, dataComm._etag);
          if(respondUpdateComm.status < 400){
            this.getDatafromAPI('/boq_comm_audit/'+dataComm._id+'?embedded={"created_by":1, "updated_by" : 1}').then(respondAPIGetComm => {
              this.setState({boq_comm_API : respondAPIGetComm.data}, () => {
                this.toggleLoading();
                if(this.props.match.params.id !== undefined){
                  setTimeout(function(){ window.location.reload(); }, 2000);
                }else{
                  setTimeout(function() { this.setState({redirectSign : 2000})}.bind(this), 2000 );
                  // this.setState({redirectSign : 2000})
                }

              });
            })
          }
        }
      }else{
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'}, () => {this.toggleLoading()})
      }
    }

    handleChangeOpportunity(e){
      this.setState({ opportunity_id : e.target.value});
    }

    overwriteDataItems(){
      this.toggleLoading();
      const dataComm = this.state.boq_comm_API;
      const getVerNumber = parseInt(dataComm.version);
      if(this.state.rowsComm.length !== 0){
        const dataXLS = this.state.rowsComm;
        let dataItems = this.state.commercialData;
        if(this.state.version_selected !== this.state.version_now){
          dataItems = this.state.commercialData_now;
        }
        // const getverNumber = Math.max.apply(Math, dataItems.map( o => o.version));
        this.LoopOverwrite(1, dataXLS, dataItems, getVerNumber);
      }else{
        this.saveSmartStockorPrice(getVerNumber.toString(), dataComm._id, dataComm._etag);
      }
    }

    revisionDataItems = async () => {
      this.toggleLoading();
      let dataStoreRev = [];
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      const dataXLS = this.state.rowsComm;
      let dataComm = this.state.boq_comm_API;
      let dataItems = this.state.commercialData;
      if(this.state.version_selected.toString() !== this.state.version_now.toString()){
        dataComm = this.state.boq_comm_API_now;
        dataItems = this.state.commercialData_now;
      }
      let commDataRev = Object.assign({}, dataComm);
      // const getVerNumber = Math.max.apply(Math, dataItems.map( o => o.version));
      const getVerNumber = parseInt(dataComm.version);
      for(let i = 0; i < dataItems.length; i++){
        let dataStoreRevIndex = Object.assign({}, dataItems[i]);
        dataStoreRevIndex["id_document"] = dataStoreRevIndex._id
        delete dataStoreRevIndex._id;
        delete dataStoreRevIndex._etag;
        delete dataStoreRevIndex._links;
        delete dataStoreRevIndex.created_on;
        dataStoreRev.push(dataStoreRevIndex);
      }
      commDataRev["id_document"] = commDataRev._id;
      if(commDataRev["created_by"] !== null && commDataRev["created_by"] !== undefined){
        if(commDataRev["created_by"]._id !== undefined){
          commDataRev["created_by"] = this.state.userId;
        }else{
          commDataRev["created_by"] = this.state.userId;
        }
      }
      if(commDataRev["updated_by"] !== null && commDataRev["updated_by"] !== undefined){
        if(commDataRev["updated_by"]._id !== undefined){
          commDataRev["updated_by"] = this.state.userId;
        }else{
          commDataRev["updated_by"] = this.state.userId;
        }
      }
      commDataRev["version_comment"] = this.state.note_version;
      delete commDataRev._id;
      delete commDataRev._etag;
      delete commDataRev._links;
      delete commDataRev.created_on;
      console.log("commDataRev", JSON.stringify(dataStoreRev));
      const respondRevComm = await this.postDatatoAPI('/boq_comm_items_rev', dataStoreRev);
      const respondRevItem = await this.postDatatoAPI('/boq_comm_rev', commDataRev);
      const dataUpdateComm = {
        "version" : (getVerNumber+1).toString(),
        "version_comment" : null,
        "rev1" : "PA",
        "rev1_by" : this.state.userEmail,
        "rev1_date" : DateNow.toString(),
        "updated_by" : this.state.userId
      }
      const respondUpdateComm = await this.patchDatatoAPI('/boq_comm_op/'+dataComm._id, dataUpdateComm, dataComm._etag);
      if(this.state.rowsComm.length !== 0){
        const respondRevLoop = await this.LoopOverwrite(1, dataXLS, dataItems, dataUpdateComm.version);
        if(respondRevLoop !== undefined){
          this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1}').then(resComm => {
            if(resComm !== undefined){
              this.setState({boq_comm_API : resComm.data});
              this.setState({action_status : 'success', action_message : 'Your Commercial BOQ has been save, please Refresh your page'}, () => {this.toggleLoading()});
            }
          })
        }
      }else{
        this.saveSmartStockorPrice(dataUpdateComm.version.toString(), dataComm._id, respondUpdateComm.data._etag);
      }
    }

    async LoopOverwrite(indexXLS, dataNewXLS, dataOld, verNumber){
      if(indexXLS >= dataNewXLS.length){
        const resComm = await this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1}')
          if(resComm !== undefined){
            if(resComm.data !== undefined){
              let dataCommItems = [];
              let arrayDataCommItems = resComm.data.list_of_id_item;
              let getNumberPage = Math.ceil(arrayDataCommItems.length / 20);
              for(let i = 0 ; i < getNumberPage; i++){
                let DataPaginationItems = arrayDataCommItems.slice(i * 20, (i+1)*20);
                let arrayIdItems = '"'+DataPaginationItems.join('", "')+'"';
                let where_id_Items = '?where={"_id" : {"$in" : ['+arrayIdItems+']}}';
                let resItems = await this.getDatafromAPI('/boq_comm_items_non_page'+where_id_Items);
                if(resItems !== undefined){
                  if(resItems.data !== undefined){
                    dataCommItems = dataCommItems.concat(resItems.data._items);
                  }
                }
              }
              if(dataCommItems.length !== 0){
                this.DataGroupingView(dataCommItems);
                this.setState({action_status : 'success', action_message : 'Your Commercial BOQ has been updated, please Refresh your page'}, () => {
                  this.toggleLoading();
                  setTimeout(function(){ window.location.reload(); }, 3000);
                })
                this.setState({commercialData : dataCommItems, boq_comm_API : resComm.data});
                return resComm.data;
              }
            }else{
              return undefined;
            }
          }else{
            return undefined;
          }
      }else{
        const findData = dataOld.find(d => d.pp_id === dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'package_key')]);
        // console.log("findData", (dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'package_key')]).split(" /// ",1));
        if(findData !== undefined && dataNewXLS.length > 1){
          let price = this.checkValuetoZero(dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'unit_price')]);
          let qtyCust = this.checkValuetoZero(dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'smart_stock')]);
          let qtyEricsson = this.checkValuetoZero(dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'qty_ericsson')]);
          let currency = this.checkValue(dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'currency')]);
          let incentive = this.checkValuetoZero(dataNewXLS[indexXLS][this.getIndex(dataNewXLS[0],'incentive')]);
          if(price === undefined || price === null){
            price = findData.unit_price
          }
          if(qtyCust === undefined || qtyCust === null){
            qtyCust = findData.qty_cust
          }
          const updateData = {
            "unit_price" : price,
            "smart_stock" : qtyCust,
            "qty_ericsson" : qtyEricsson,
            "currency" : currency,
            "qty_comm_quotation" : (findData.qty_tech - (qtyCust + qtyEricsson)),
            "total_price" : (findData.qty_tech - (qtyCust + qtyEricsson)) * price,
            "incentive" : incentive,
            "net_total" : ((findData.qty_tech - (qtyCust + qtyEricsson)) * price)-incentive,
            "version" : verNumber.toString()
          }
          const respondUpdate = this.patchDatatoAPI('/boq_comm_items_op/'+findData._id, updateData, findData._etag);
          if(respondUpdate.status >= 400){
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please check your format data and try again'}, () => {this.toggleLoading()})
          }else{
            this.LoopOverwrite(indexXLS+1, dataNewXLS, dataOld, verNumber);
          }
        }else{
          if(dataNewXLS[indexXLS].length === 0){
            this.LoopOverwrite(indexXLS+1, dataNewXLS, dataOld, verNumber);
          }else{
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please check your format data and try again'}, () => {this.toggleLoading()})
          }

          // this.LoopOverwrite(indexXLS+1, dataNewXLS, dataOld, verNumber);
        }
      }
    }

    editQtyCust = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ qty_cust: prevState.qty_cust.set(name, value) }));
    }

    editQtyEricsson = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ qty_ericsson: prevState.qty_ericsson.set(name, value) }));
    }

    editUnitPrice = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ unit_price: prevState.unit_price.set(name, value) }));
    }

    handleChangeCurrency = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevState => ({ currencyChange: prevState.currencyChange.set(name, value) }));
    }

    handleChangeCurrencyAll = (e) => {
      let currAll = new Map();
      const value = e.target.value;
      const commData = this.state.commercialData;
      for(let i = 0; i < commData.length; i++){
        currAll.set(commData[i]._id, value);
      }
      console.log("currencyChangeAll", currAll );
      this.setState({ currencyChange : currAll, currencyChangeAll : value });
    }

    fileHandlerCommercial = (event) => {
      let fileObj = event.target.files[0];
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      if(fileObj !== undefined){
        ExcelRenderer(fileObj, (err, rest) => {
          if(err){
            console.log(err);
          }
          else{
            console.log('rest.rows', rest.rows);
            this.checkFormat(rest.rows);
            this.setState({
              rowsComm: rest.rows}, ()=> {
            });
          }
        });
      }
    }

    checkFormat(dataXLS){
      if(this.getIndex(dataXLS[0],'package_key') !== -1){
        if(this.getIndex(dataXLS[0],'unit_price') !== -1 || this.getIndex(dataXLS[0],'smart_stock') !== -1 || this.getIndex(dataXLS[0],'qty_ericsson') !== -1){
          this.setState({action_status : null});
        }else{
          this.setState({action_status : 'failed', action_message : 'Please Check your format data'})
        }
      }else{
        this.setState({action_status : 'failed', action_message : 'Please Check your format data'})
      }
    }

    // packageView(packageData, pt, group){
    //   let items = [];
    //   if(packageData.length !== 0){
    //     return items = packageData.filter(d => d.product_type === pt && d.phy_group === group);
    //   }else{
    //     return items = [];
    //   }
    // }

    SortCompare( a, b ) {
      if ( a < b ){
        return -1;
      }
      if ( a > b ){
        return 1;
      }
      return 0;
    }

    packageView(packageData, pt, group){
      let items = [];
      if(packageData.length !== 0){
        let itemsget = packageData.filter(d => d.product_type === pt && d.phy_group === group);
        if(itemsget.length !== 0){
          itemsget.sort((a,b) => this.SortCompare(a.pp_group, b.pp_group));
        }
        return items = itemsget;
      }else{
        return items = [];
      }
    }

    exportCommercialTemplate = async () => {
      const wb = new Excel.Workbook()
      const ws = wb.addWorksheet()

      const dataComm=this.state.boq_comm_API;
      const dataPrint=this.state.commercialData;
      const dataGroup=this.state.groupingView

      const headerPackage = ["package_key", "product_package", "unit", "quantity", "smart_stock", "qty_ericsson","unit_price", "currency","total_quantity", "total_price", "product_type"];
      let dataforPrint = [];
      const header = ws.addRow(headerPackage);
      header.font = { bold: true }
      for(let i = 0; i < dataPrint.length; i++){
        const total_price = (dataPrint[i].qty_tech - (dataPrint[i].qty_ericsson + dataPrint[i].smart_stock)) * dataPrint[i].unit_price;
        let dataIndex = [dataPrint[i].pp_id, dataPrint[i].package_name, dataPrint[i].unit, dataPrint[i].qty_tech, dataPrint[i].smart_stock, dataPrint[i].qty_ericsson, dataPrint[i].unit_price, dataPrint[i].currency, (dataPrint[i].qty_tech - (dataPrint[i].qty_ericsson + dataPrint[i].smart_stock)), total_price, dataPrint[i].product_type];
        ws.addRow(dataIndex);
        dataforPrint.push(dataIndex);
      }
      const comFormat = await wb.xlsx.writeBuffer()
      saveAs(new Blob([comFormat]), 'Commercial BOQ '+dataComm.no_boq_comm+' Format.xlsx')
    }

    exportCommercial = async () => {
      const wb = new Excel.Workbook()
      const ws = wb.addWorksheet()

      const dataComm = this.state.boq_comm_API;
      const dataPrint=this.state.commercialData;
      const dataGroup=this.state.groupingView;
      const prod_type = [...new Set(dataPrint.map(({ product_type }) => product_type))];
      //const phy_group = [...new Set(dataPrint.map(({ phy_group }) => phy_group))];
      const DatePrint = new Date();
      const DatePrintOnly = DatePrint.getFullYear()+'-'+(DatePrint.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrint.getDay().toString().padStart(2, '0');

      const prepared = ws.mergeCells('A4:E4');
      ws.getCell('A4').value = 'prepared';
      ws.getCell('A4').alignment  = { vertical: 'top', horizontal: 'left' };
      ws.getCell('A4').font  = { size: 8 };
      ws.getCell('A4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const preparedEmail = ws.mergeCells('A5:E5');
      ws.getCell('A5').value = this.state.userEmail;
      ws.getCell('A5').alignment  = {horizontal: 'left' };
      ws.getCell('A5').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      // const DocumentNo = ws.mergeCells('F4:K4');
      ws.getCell('F4').value = 'Document No.';
      ws.getCell('F4').font  = { size: 8 };
      ws.getCell('F4').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F4').border = {top: {style:'thin'}, left: {style:'thin'},  right: {style:'thin'} };

      // const DocumentNum = ws.mergeCells('F5:K5');
      ws.getCell('F5').value = dataComm.no_boq_comm;
      ws.getCell('F5').alignment  = {horizontal: 'left' };
      ws.getCell('F5').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const Approved = ws.mergeCells('A6:C7');
      ws.getCell('A6').value = 'Approved';
      ws.getCell('A6').font  = { size: 8 };
      ws.getCell('A6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('A6').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}};

      const Checked = ws.mergeCells('D6:E7');
      ws.getCell('D6').value = 'Checked';
      ws.getCell('D6').font  = { size: 8 };
      ws.getCell('D6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('D6').border = {top: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const dateDoc = ws.mergeCells('F6:H6');
      ws.getCell('F6').value = 'Date';
      ws.getCell('F6').font  = { size: 8 };
      ws.getCell('F6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F6').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const dateDocument = ws.mergeCells('F7:H7');
      ws.getCell('F7').value = DatePrintOnly;
      ws.getCell('F7').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F7').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      // const revDoc = ws.mergeCells('I6:K6');
      ws.getCell('I6').value = 'Rev';
      ws.getCell('I6').font  = { size: 8 };
      ws.getCell('I6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('I6').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const revDocNum = ws.mergeCells('I7:K7');
      ws.getCell('I7').value = dataComm.version;
      ws.getCell('I7').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('I7').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const CommInfoTitle = ws.mergeCells('A8:K8');
      ws.getCell('A8').value = 'COMMERCIAL BOQ';
      ws.getCell('A8').font  = { size: 16, bold : true };
      ws.getCell('A8').alignment  = {vertical: 'middle', horizontal: 'center' };

      const CommInfo = ws.mergeCells('A9:C9');
      ws.getCell('A9').value = 'Commercial Information';
      ws.getCell('A9').font  = { size: 14, bold : true };
      ws.getCell('A9').alignment  = {vertical: 'middle', horizontal: 'center' };
      ws.getCell('A9').border = {bottom: {style:'double'}, };

      const POInfo = ws.mergeCells('G9:I9');
      ws.getCell('G9').value = 'Project Order Information';
      ws.getCell('G9').font  = { size: 14, bold : true };
      ws.getCell('G9').alignment  = {vertical: 'middle', horizontal: 'center' };
      ws.getCell('G9').border = {bottom: {style:'double'} };

      ws.addRow(["Project ID", dataComm.project_name,"","","","", "PO ID"]);
      ws.addRow(["Opportunity ID", dataComm.opportunity_id,"","","","", "Update By"]);
      if(dataComm.early_start === true){
        ws.addRow(["Early Start", "", "","","","", "Update Time"]);
      }else{
        ws.addRow(["", "", "","","","", "Update Time"]);
      }

      ws.mergeCells('B10:C10');
      ws.mergeCells('B11:C11');

      ws.mergeCells('G10:H10');
      ws.mergeCells('G11:H11');
      ws.mergeCells('G12:H12');

      // ws.mergeCells('I10:K10');
      ws.getCell('I10').value = dataComm.po_number;
      ws.getCell('I11').value = this.state.userEmail;
      // ws.mergeCells('I12:K12');
      ws.getCell('I12').value = dataComm.created_on;

      if(this.checkValuetoString(dataComm.note_1).length !== 0 && this.checkValuetoString(dataComm.note_name_1).length !== 0 || this.checkValuetoString(dataComm.note_2).length !== 0 && this.checkValuetoString(dataComm.note_name_2).length !== 0){
        let getlastnullrow = ws.lastRow._number+1;
        ws.getCell('A'+(getlastnullrow)).value = dataComm.note_name_1;
        ws.mergeCells('B'+(getlastnullrow)+':C'+(getlastnullrow));
        ws.getCell('B'+(getlastnullrow)).value = dataComm.note_1;
        ws.getCell('G'+(getlastnullrow)).value = dataComm.note_name_2;
        ws.mergeCells('H'+(getlastnullrow)+':I'+(getlastnullrow));
        ws.getCell('H'+(getlastnullrow)).value = dataComm.note_2;
      }
      if(this.checkValuetoString(dataComm.note_3).length !== 0 && this.checkValuetoString(dataComm.note_name_3).length !== 0 || this.checkValuetoString(dataComm.note_4).length !== 0 && this.checkValuetoString(dataComm.note_name_4).length !== 0){
        let getlastnullrow = ws.lastRow._number+1;
        ws.getCell('A'+(getlastnullrow)).value = dataComm.note_name_3;
        ws.mergeCells('B'+(getlastnullrow)+':C'+(getlastnullrow));
        ws.getCell('B'+(getlastnullrow)).value = dataComm.note_3;
        ws.getCell('G'+(getlastnullrow)).value = dataComm.note_name_4;
        ws.mergeCells('H'+(getlastnullrow)+':I'+(getlastnullrow));
        ws.getCell('H'+(getlastnullrow)).value = dataComm.note_4;
      }

      ws.addRow([""]);
      ws.addRow(["Material Desciption", "Total Qty in Technical", "Existing Stock Qty (Smart)","Existing Stock Qty (Ericsson)", "Quotation Net Qty", dataComm.early_start === true ? "Early Start Qty" : "In PO Qty", "Unit Price", "Currency", "Total Price"]);
      ['A','B','C','D','E','F','G','H','I'].map( key => {
        ws.getCell(key+(ws.lastRow._number)).fill = {
          type : 'pattern',
          pattern : 'solid',
          fgColor : {argb:'FF0ACD7D'}
        }
      })

      let phyNameTotal = [];
      let phyNetTotal = [];
      let phyTotal = [];
      for(let h = 0; h < prod_type.length; h++){
        ws.addRow(["Product Type : "+prod_type[h]]);
        let phy_item_group = dataPrint.filter(pp => pp.product_type === prod_type[h]);
        let phy_group = [...new Set(phy_item_group.map(({ phy_group }) => phy_group))];
        const getRowLast = ws.lastRow._number;
        ws.mergeCells('A'+(getRowLast)+':I'+(getRowLast));
        ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'FFF8F6DF'}};
        for(let i = 0; i < phy_group.length; i++){
          let phy_item = dataPrint.filter(pp => pp.phy_group === phy_group[i] && pp.product_type === prod_type[h]);
          ws.addRow(["Physical Group : "+phy_group[i]]);
          const getRowLast = ws.lastRow._number;
          ws.mergeCells('A'+(getRowLast)+':I'+(getRowLast));
          // ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'7F81C784'}}
          if(dataComm.early_start === true){
            for(let j=0; j < phy_item.length; j++){
              ws.addRow([phy_item[j].package_name, phy_item[j].qty_tech, phy_item[j].smart_stock, phy_item[j].qty_ericsson, phy_item[j].qty_comm_quotation, phy_item[j].qty_early_start, phy_item[j].unit_price, phy_item[j].currency, phy_item[j].total_price]);
            }
          }else{
            for(let j=0; j < phy_item.length; j++){
              ws.addRow([phy_item[j].package_name, phy_item[j].qty_tech, phy_item[j].smart_stock, phy_item[j].qty_ericsson, phy_item[j].qty_comm_quotation, phy_item[j].qty_po, phy_item[j].unit_price, phy_item[j].currency, phy_item[j].total_price]);
            }
          }
          let total_prc = phy_item.reduce((a,b) => a + b.total_price, 0);
          let net_total = phy_item.reduce((a,b) => a + b.net_total, 0);
          phyNameTotal.push(phy_group[i]+" ("+prod_type[h]+")");
          phyNetTotal.push(net_total);
          phyTotal.push(total_prc);

        }
      }
      ws.addRow([""]);
      for(let z = 0; z < phyNameTotal.length; z++){
        ws.addRow([phyNameTotal[z]+" Total"]);
        let getRowLastTotal = ws.lastRow._number;
        ws.getCell('A'+(getRowLastTotal)).font  = {bold : true };
        ws.mergeCells('A'+(getRowLastTotal)+':H'+(getRowLastTotal));
        ws.getCell('I'+(getRowLastTotal)).value = phyTotal[z];

      }

      ws.addRow([""]);
      ws.addRow(["Total"]);
      let getRowLastTotal = ws.lastRow._number;
      ws.mergeCells('A'+(getRowLastTotal)+':H'+(getRowLastTotal));
      ws.getCell('I'+(getRowLastTotal)).value = this.state.total_comm.totalPriceComm;
      ws.getCell('A'+(getRowLastTotal)).font  = {bold : true };
      ws.getCell('I'+(getRowLastTotal)).font  = {bold : true };

      const comFormat = await wb.xlsx.writeBuffer()
      saveAs(new Blob([comFormat]), 'Commercial BOQ '+dataComm.no_boq_comm+' Report.xlsx')
    }

    savePO(){
      let commAPI = this.state.boq_comm_API;
      if(this.state.po_number_selected.length !== 0 && this.state.po_number_selected !== null){
        const savePO = {
          "id_po_doc" : this.state.po_selected,
          "po_number" : this.state.po_number_selected.toString()
        }
        this.patchDatatoAPI('/boq_comm_op/'+commAPI._id, savePO, commAPI._etag).then(res => {
          if(res !== undefined){
            if(res.status < 400){
              commAPI["id_po_doc"] = this.state.po_selected;
              commAPI["po_number"] = this.state.po_number_selected.toString();
              commAPI["_etag"] = res.data._etag;
              this.setState({boq_comm_API : commAPI, action_status : 'success', action_message : 'PO Number has been saved'});
            }
          }
        })
    }else{
      this.setState({action_status : 'failed', action_message : 'Please Select PO Number'})
    }
    }

    toggleLoading(){
      this.setState(prevState => ({
        modal_loading: !prevState.modal_loading
      }));
    }

    getListVersion(_id){
      this.getDatafromAPI('/boq_comm_rev_all?where={"id_document":"'+_id+'"}&projection={"version":1, "rev1":1}').then(res => {
        console.log("rev", res);
        if(res !== undefined){
          this.setState({list_version : res.data._items});
        }
      })
    }

    handleChangeVersion(e){
      const value = e.target.value;
      this.setState({version_selected : value}, () => {
        if(value == this.state.version_now){
          this.getDataCommAPI(this.props.match.params.id);
          this.setState({rowsComm : []});
        }else{
          this.getBOQRevAPI(this.props.match.params.id);
        }
      });
    }

    getBOQRevAPI(_id_Comm){
      const version = this.state.version_selected;
      let dataComm = this.state.boq_comm_API;
      const where_id_Sites = '?where={"id_document" : "'+_id_Comm+'", "version" : "'+version+'"}';
      let url = '/boq_comm_rev'+where_id_Sites;
      this.getDatafromAPI(url).then(res => {
        if(res !== undefined){
          console.log('respond Comm API Rev',res);
          dataComm["note_name_1"] = res.data._items[0].note_name_1;
          dataComm["note_1"] = res.data._items[0].note_1;
          dataComm["note_name_2"] = res.data._items[0].note_name_2;
          dataComm["note_2"] = res.data._items[0].note_2;
          dataComm["note_name_3"] = res.data._items[0].note_name_3;
          dataComm["note_3"] = res.data._items[0].note_3;
          dataComm["note_name_4"] = res.data._items[0].note_name_4;
          dataComm["note_4"] = res.data._items[0].note_4;
          dataComm["version_comment"] = res.data._items[0].version_comment;
          this.setState({boq_comm_API : dataComm}, () =>{
            console.log("boq_comm_API rev", this.state.boq_comm_API);
          });
          if(res.data._items[0].list_of_id_item !== undefined){
            // this.getItemsCommRevAPI(res.data._items[0].list_of_id_item, version);
            this.getItemsCommRevAPI(_id_Comm, version);
          }
        }
      })
    }

    formatRev(dataRev){
      let format_rev = [];
      let header = ["package_key", "smart_stock", "qty_ericsson", "unit_price"];
      format_rev.push(header);
      for(let  i = 0; i < dataRev.length; i++){
        format_rev.push([dataRev[i].pp_id, dataRev[i].smart_stock, dataRev[i].qty_ericsson, dataRev[i].unit_price])
      }
      this.setState({format_rev: format_rev, rowsComm : format_rev});
      console.log("format_rev",format_rev);
    }

    getItemsCommRevAPI(id_comm, version){
      // const arraySites = '"'+id_Sites.join('", "')+'"';
      const where_id_Comm = 'where={"id_boq_comm_doc" : "'+id_comm+'" , "version" : "'+version+'"}';
      this.getDatafromAPI('/boq_comm_items_rev_all?'+where_id_Comm).then(res => {
          console.log('respond Items COmm API Rev',res);
          this.formatRev(res.data._items);
          this.DataGroupingView(res.data._items);
      })
    }

    handleInputChange = (newValue) => {
      // const inputValue = newValue.replace(/\W/g, '');
      // this.setState({inputValue});
      this.setState({data_po_data_selected : {"_id" : newValue.value, "po_number" : newValue.label} });
      return newValue;
    };

    getTechBoqData(_id_tech){
      this.getDataFromAPINODE('/techBoq/'+_id_tech).then(res => {
        if(res.data !== undefined){
          const dataTech = res.data;
          this.setState({data_tech_boq_selected : dataTech.data});
          if(res.data.data !== undefined){
            this.setState({data_tech_boq_sites_selected : dataTech.data.techBoqSite});
          }
        }
      })
    }

    // saveNote = (e) => {
    //   const commAPI = this.state.boq_comm_API;
    //   const numbNote = e;
    //   let updateNote = { };
    //   updateNote["note_"+numbNote.toString()] = this.state.noteChange[parseInt(numbNote)];
    //   if(this.checkValuetoString(this.state.noteChange[parseInt(numbNote)]).length == 0){
    //     updateNote["note_"+numbNote.toString()] = this.checkValuetoString(commAPI["note_"+numbNote.toString()]);
    //   }
    //   updateNote["note_name_"+numbNote.toString()] = this.state.fieldNoteChange[parseInt(numbNote)];
    //   if(this.checkValuetoString(this.state.fieldNoteChange[parseInt(numbNote)]).length == 0){
    //     updateNote["note_name_"+numbNote.toString()] = this.checkValuetoString(commAPI["note_name_"+numbNote.toString()]);
    //   }
    //   this.patchDatatoAPI('/boq_comm_op/'+commAPI._id, updateNote, commAPI._etag).then(res => {
    //     if(res !== undefined){
    //       if(res.data !== undefined){
    //         commAPI["note_"+numbNote.toString()] = this.state.noteChange[parseInt(numbNote)];
    //         commAPI["_etag"] = res.data._etag;
    //         this.setState({ boq_comm_API : commAPI, action_status : 'success', action_message : 'Your Commercial BOQ Note '+numbNote.toString()+' has been updated'});
    //       }
    //     }
    //   })
    //   console.log("numbNote", JSON.stringify(updateNote));
    // }

    saveNote = () => {
      const commAPI = this.state.boq_comm_API;
      let updateNote = { };
      for(let numbNote = 1; numbNote <= 6; numbNote++){
        if(numbNote !== 5){
          updateNote["note_"+numbNote.toString()] = this.state.noteChange[parseInt(numbNote)];
          if(this.checkValuetoString(this.state.noteChange[parseInt(numbNote)]).length == 0){
            updateNote["note_"+numbNote.toString()] = this.checkValuetoString(commAPI["note_"+numbNote.toString()]);
          }
          updateNote["note_name_"+numbNote.toString()] = this.state.fieldNoteChange[parseInt(numbNote)];
          if(this.checkValuetoString(this.state.fieldNoteChange[parseInt(numbNote)]).length == 0){
            updateNote["note_name_"+numbNote.toString()] = this.checkValuetoString(commAPI["note_name_"+numbNote.toString()]);
          }
        }
      }
      this.patchDatatoAPI('/boq_comm_op/'+commAPI._id, updateNote, commAPI._etag).then(res => {
        if(res !== undefined){
          if(res.data !== undefined){
            this.setState({ boq_comm_API : commAPI, action_status : 'success', action_message : 'Your Commercial BOQ Note has been updated'}, () => {
              setTimeout(function(){ window.location.reload(); }, 2000);
            });
          }
        }
      })
      // console.log("numbNote", JSON.stringify(updateNote));
    }

    handleChangeNote(e){
      let noteArray = this.state.noteChange;
      const index = e.target.name;
      const value = e.target.value;
      noteArray[parseInt(index)] = value.toString();
      this.setState({
        noteChange: noteArray,
      });
    }

    handleChangeVerComment(e){
      const value = e.target.value;
      this.setState({note_version : value});
    }

    handleChangeFieldNote(e){
      let fieldnoteArray = this.state.fieldNoteChange;
      const index = e.target.name;
      const value = e.target.value;
      fieldnoteArray[parseInt(index)] = value.toString();
      console.log("note name", fieldnoteArray);
      this.setState({
        fieldNoteChange: fieldnoteArray,
      });
    }

    packageView(packageData, pt, group){
      let items = [];
      if(packageData.length !== 0){
        let itemsget = packageData.filter(d => d.product_type === pt && d.phy_group === group);
        if(itemsget.length !== 0){
          itemsget.sort((a,b) => this.SortCompare(a.pp_group, b.pp_group));
        }
        return items = itemsget;
      }else{
        return items = [];
      }
    }

    countTotalPrice(packageData, pt, group){
      let count = 0;
      if(packageData.length !== 0){
        let itemsget = packageData.filter(d => d.product_type === pt && d.phy_group === group);
        if(itemsget.length !== 0){
          count = itemsget.reduce((a,b) => a + b.total_price, 0);
        }
        return count;
      }else{
        return count;
      }
    }

    countNetTotal(packageData, pt, group){
      let count = 0;
      if(packageData.length !== 0){
        let itemsget = packageData.filter(d => d.product_type === pt && d.phy_group === group);
        if(itemsget.length !== 0){
          count = itemsget.reduce((a,b) => a + b.net_total, 0);
        }
        return count;
      }else{
        return count;
      }
    }

    async updatePOAssign(){
      this.toggleLoading();
      let dataComm = Object.assign({}, this.state.data_comm_boq);
      let poSelected = this.state.data_po_data_selected;
      if(dataComm.site !== undefined){
        delete dataComm.site;
      }
      const dataPO = [{
        "id_po_doc" : poSelected._id,
        "po_number" : poSelected.po_number
      }];
      dataComm["po_data"] = dataComm.po_data.concat(dataPO);
      let updateCommBoq = {
        "version_check": false,
        "data" : dataComm
      }
      let updateComm = await this.patchDatatoAPINODE('/commBoq/updateCommercial/'+dataComm._id, updateCommBoq );
      if(updateComm.data !== undefined){
        this.setState({action_status : 'success'});
      }else{
        if(updateComm.response !== undefined){
          this.setState({action_status : 'failed', action_message : updateComm.response.error });
        }else{
          this.setState({action_status : 'failed' });
        }
        this.setState({action_status : 'success'});
      }
      this.toggleLoading();
    }

    render() {

      function AlertProcess(props){
        const alert = props.alertAct;
        const message = props.messageAct;
        if(alert == 'failed'){
          return (
            <div className="alert alert-danger" role="alert">
              {message}
              <br></br>
              Sorry, there was an error when we tried to save it, please reload your page and try again try again
            </div>
          )
        }else{
          if(alert == 'success'){
            return (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )
          }else{
            return (
              <div></div>
            )
          }
        }
      }

      return (
        <div>
          <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <span style={{lineHeight :'2', fontSize : '17px'}}> Commercial BOQ </span>
                  {this.state.boq_comm_API !== null && (
                    <React.Fragment>
                      <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{float : 'right', marginRight : '10px'}}>
                        <DropdownToggle caret color="secondary">
                          <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download Commercial File
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header> Commercial File</DropdownItem>
                          <DropdownItem onClick={this.exportCommercial}> <i className="fa fa-file-text-o" aria-hidden="true"></i> Commercial Report</DropdownItem>
                          <DropdownItem onClick={this.exportCommercialTemplate}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Commercial Format</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <Row>
                    <Col sm="12" md="12">
                    <table style={{width : '100%', marginBottom : '0px'}}>
                      <tbody>
                        <tr style={{fontWeight : '425', fontSize : '23px'}}>
                          <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>
                          {this.props.match.params.id === undefined ? "CREATE" : ""} COMMERCIAL BOQ
                          </td>
                        </tr>
                        {this.state.data_comm_boq !== null && this.props.match.params.id !== undefined && (
                          <React.Fragment>
                            <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : {this.state.data_comm_boq.no_comm_boq}</td>
                            </tr>
                          </React.Fragment>
                        )}
                      </tbody>
                    </table>
                    <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                    </Col>
                  </Row>

                  <div style={{padding:"10px", fontSize:'15px'}}>
                    {this.state.data_comm_boq !== null && (
                      <React.Fragment>
                        <Row>
                          <Col sm="6" md="6">
                            <table className="table-header">
                              <tbody>
                                <tr style={{fontWeight : '425', fontSize : '15px'}}>
                                  <td colSpan="4" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>COMMERCIAL INFORMATION</td>
                                </tr>
                                <tr style={{fontWeight : '425', fontSize : '15px'}}>
                                  <td style={{width : '150px'}}>Project </td>
                                  <td>:</td>
                                  <td colspan="2" style={{paddingLeft:'10px'}}>{this.state.data_comm_boq.project_name}</td>
                                </tr>
                                <tr style={{fontWeight : '425', fontSize : '15px'}}>
                                  <td>Version</td>
                                  <td>:</td>
                                  <td colspan="2" style={{paddingLeft:'10px'}}>{this.state.data_comm_boq.version}</td>
                                </tr>
                                <tr style={{fontWeight : '425', fontSize : '15px'}}>
                                  <td>Technical Boq Ref</td>
                                  <td>:</td>
                                  <td colspan="2" style={{paddingLeft:'10px'}}>{this.state.data_comm_boq.list_of_tech.map(e => e.no_tech_boq + "  ")}</td>
                                </tr>
                                <tr style={{fontWeight : '425', fontSize : '15px'}}>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                          <Col sm="6" md="6">
                            <tbody style={{float : 'right', 'marginRight' : '50px'}}>
                              <tr style={{fontWeight : '425', fontSize : '15px'}}>
                                <td colSpan="4" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>PO INFORMATION</td>
                              </tr>
                              <tr>
                                <td style={{width : '100px', verticalAlign : 'top'}}>PO Number </td>
                                <td style={{verticalAlign : 'top'}} > : &nbsp; &nbsp;</td>
                                <td>
                                  {this.state.data_comm_boq.po_data.map(po =>
                                    <tr>
                                      <td colSpan="2" style={{textAlign : 'left', border : '1px solid #c8ced3', paddingLeft : '10px'}}>{po.po_number}</td>
                                    </tr>
                                  )}
                                  <tr>
                                    <td style={{width : '200px', border : '1px solid #c8ced3', borderRight : '0px', paddingLeft : '10px'}}>
                                      <Select
                                        cacheOptions
                                        options={this.state.list_po_data_selection}
                                        // defaultOptions
                                        onChange={this.handleInputChange}
                                      />
                                    </td>
                                    <td style={{border : '1px solid #c8ced3', borderLeft : '0px'}}>
                                      <Button className="btn-success" style={{margin : '10px'}} color="success" onClick={this.updatePOAssign} disabled={this.state.data_po_data_selected === null} >
                                        Save
                                      </Button>
                                    </td>
                                  </tr>
                                </td>
                              </tr>
                            </tbody>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </div>
                  <div class='divtable'>
                    <Table hover bordered responsive size="sm" width="100%">
                        <thead>
                        <tr>
                          <th>Tower ID</th>
                          <th>Tower Name</th>
                          <th>Config ID</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total Price</th>
                          <th>Incentive</th>
                          <th>Total Price after Incentive</th>
                        </tr>
                      </thead>
                      {this.state.data_comm_boq_items.map(site =>
                        <tbody>
                          {site.items.map(item =>
                            <tr>
                              <td>{item.site_id}</td>
                              <td>{item.site_name}</td>
                              <td>{item.config_id}</td>
                              <td>{item.qty}</td>
                              <td>{item.price}</td>
                              <td>{item.total_price}</td>
                              <td style={{width : '150px'}}>{item.incentive}</td>
                              <td style={{width : '250px'}}>{item.net_price_incentive}</td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </Table>
                  </div>
                  {this.state.boq_comm_API !== null &&  (
		               <React.Fragment>
                    <div style={{marginBottom : "20px"}}>
                      <Row style={{paddingLeft : '10px'}}>
                        <Col sm="6" md="7">
                          <table className="table-footer" style={{float : 'right',marginRight : '20px'}}>
                            <tbody>
                              <tr style={{fontWeight : '425', fontSize : '12px'}}>
                                <td >Technical Indentifier &nbsp;&nbsp;&nbsp;</td>
                                <td >: &nbsp; {this.state.data_comm_boq.list_of_tech[0].no_tech_boq} </td>
                              </tr>
                              <tr style={{fontWeight : '425', fontSize : '12px'}}>
                                <td >COM BOQ Created By &nbsp;</td>
                                <td >: &nbsp; {this.state.data_comm_boq.creator[0].email}</td>
                              </tr>
                              <tr style={{fontWeight : '425', fontSize : '12px'}}>
                                <td >COM BOQ Created Date </td>
                                <td >: &nbsp; {this.state.data_comm_boq.created_on}</td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                        <Col sm="6" md="5">

                        </Col>
                      </Row>
                    </div>
		               </React.Fragment>
                    )}

                  {/* <Button className="btn-success" style={{'float' : 'right'}} onClick={this.saveSmartStockorPrice} color="success" disabled={this.state.boq_comm_API == null}>
                    <i className="fa fa-save">&nbsp;&nbsp;</i>
                    Save Smart Stock
                  </Button> */}
                </CardBody>
                <CardFooter>
                  <Row>
                  </Row>
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

          {/* Modal Loading */}
          <Modal isOpen={this.state.toggleShowGroup} toggle={this.showGroupToggle} className={'modal-sm ' + this.props.className + ' loading-modal'}>
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

  const mapStateToProps = (state) => {
    return {
      dataLogin : state.loginData,
      SidebarMinimize : state.minimizeSidebar
    }
  }

  export default connect(mapStateToProps)(POAssign);
