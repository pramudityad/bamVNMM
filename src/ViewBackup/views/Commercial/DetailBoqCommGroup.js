import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ReactExport from "react-data-export";
import axios from 'axios';
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { Link } from 'react-router-dom';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './boqCommercial.css';
import Excel from 'exceljs/modern.browser';
import { saveAs } from 'file-saver';
import { toTimeZone, checkValue } from "../../helper/basicFunction.js";

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

const StepFlow = React.lazy(() => import('../../views/Defaultview/StepFlow'));

//const process.env.REACT_APP_API_URL = 'http://localhost:5000/smartapi';
//const process.env.REACT_APP_API_URL = 'http://api-dev.smart.pdb.e-dpm.com/smartapi';
const process.env.REACT_APP_API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetailBoqCommGroup extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userRole : JSON.parse(localStorage.getItem('user_Roles')),
        boq_comm_API : null,
        boq_tech_API : [],
        boq_tech_sites : [],
        bpq_comm_items : [],
        prev_boq_tech_select : null,
        Boq_Technical_Select : null,
        groupingView : [],
        commercialData : [],
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
        action_message : "",
        checkedPackage : new Map(),
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
        total_comm : {},
      };
      this.toggleLoading = this.toggleLoading.bind(this);
      this.handleChangeEarlyStart = this.handleChangeEarlyStart.bind(this);
      this.handleChangePO = this.handleChangePO.bind(this);
      this.savePO = this.savePO.bind(this);
      this.showGroupToggle = this.showGroupToggle.bind(this);
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
      if( typeof props == 'undefined' ) {
        return null;
      }else{
        return props;
      }
    }

    checkValuetoZero(props){
      //Swap undefined or null to 0
      if( typeof props == 'undefined' || props == null ) {
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
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        console.log("respond Get Data", err);
        return respond;
      }
    }

    async postDatatoAPI(url, data){
      console.log("respond Post Data", JSON.stringify(data));
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
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        console.log("respond Patch data", err);
        return respond;
      }
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

    componentDidMount(){
      if(this.props.match.params.id !== undefined){
        this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1, "list_of_id_item" : 1}').then(resComm => {
          if(resComm == undefined){resComm ={}; resComm["data"] = undefined}
          if(resComm.data !== undefined){
            if(resComm.data.early_start !== undefined){
              this.setState({ early_start:  resComm.data.early_start, version_now : resComm.data.version, version_selected : resComm.data.version });
            }
            this.setState({commercialData : resComm.data.list_of_id_item, boq_comm_API : resComm.data, curr_rev : resComm.data.version, commercialData_now : resComm.data.list_of_id_item});
            this.countGroupFromComm(resComm.data.list_of_id_item);
          }else{
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
          }
        })
      }
    }

    DataGroupingView(itemsDatas, dataItemsPicked){
    console.log("arrayGroup", itemsDatas);
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
      let total_comm = {"totalPriceComm" : total_price_comm, "netTotalComm" : net_total_comm};
      this.setState({total_comm : total_comm});
      let OnlyGrouping = [];
      let OnlyTypeGroup = [...new Set(itemsDatas.map(({ product_type }) => product_type))];
      for(let i = 0; i < OnlyTypeGroup.length ; i++){
          const group_item = itemsDatas.filter(d => d.product_type === OnlyTypeGroup[i]);
          const dataGroup = {
            "product_type" : OnlyTypeGroup[i],
            "groups" : [...new Set(group_item.map(({ phy_group }) => phy_group))],
          }
          OnlyGrouping.push(dataGroup);
        }
        console.log("arrayGroup", itemsDatas);
      this.setState(prevState => ({ commercialData:  itemsDatas}));
      this.setState({groupingView : OnlyGrouping});
    }

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
        console.log("arrayGroup", packageData);
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

    exportCommercial = async () => {
      const wb = new Excel.Workbook()
      const ws = wb.addWorksheet()

      const dataComm = this.state.boq_comm_API;
      const dataPrint=this.state.commercialData;
      const dataGroup=this.state.groupingView;
      const prod_type = [...new Set(dataPrint.map(({ product_type }) => product_type))];
      const DatePrint = new Date();
      const DatePrintOnly = DatePrint.getFullYear()+'-'+(DatePrint.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrint.getDay().toString().padStart(2, '0');

      const prepared = ws.mergeCells('A4:E4');
      ws.getCell('A4').value = 'prepared';
      ws.getCell('A4').alignment  = { vertical: 'top', horizontal: 'left' };
      ws.getCell('A4').font  = { size: 8 };
      ws.getCell('A4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const preparedEmail = ws.mergeCells('A5:E5');
      ws.getCell('A5').value = dataComm.created_by.email;
      ws.getCell('A5').alignment  = {horizontal: 'left' };
      ws.getCell('A5').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const DocumentNo = ws.mergeCells('F4:I4');
      ws.getCell('F4').value = 'Document No.';
      ws.getCell('F4').font  = { size: 8 };
      ws.getCell('F4').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F4').border = {top: {style:'thin'}, left: {style:'thin'},  right: {style:'thin'} };

      const DocumentNum = ws.mergeCells('F5:I5');
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

      const dateDoc = ws.mergeCells('F6:G6');
      ws.getCell('F6').value = 'Date';
      ws.getCell('F6').font  = { size: 8 };
      ws.getCell('F6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F6').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

      const dateDocument = ws.mergeCells('F7:G7');
      ws.getCell('F7').value = DatePrintOnly;
      ws.getCell('F7').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F7').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const revDoc = ws.mergeCells('H6:I6');
      ws.getCell('H6').value = 'Rev';
      ws.getCell('H6').font  = { size: 8 };
      ws.getCell('H6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('H6').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const revDocNum = ws.mergeCells('H7:I7');
      ws.getCell('H7').value = (dataComm.rev1 !== 'A' ? 'PA' : 'A')+ dataComm.version;
      ws.getCell('H7').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('H7').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const CommInfoTitle = ws.mergeCells('A8:I8');
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
      ws.mergeCells('H10:I10');
      ws.getCell('H10').value = dataComm.po_number;
      ws.mergeCells('H11:11');
      ws.getCell('H11').value = dataComm.created_by.email;
      ws.mergeCells('H12:I12');
      ws.getCell('H12').value = toTimeZone(dataComm.created_on);

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
      ws.addRow(["Material Desciption", "Total Qty in Technical", "Existing Stock Qty (Smart)","Existing Stock Qty (Ericsson)", "Commercial Quotation Net Qty", "Currency", "Total Price", "Incentive", "Net Total" ]);
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
        ws.addRow([prod_type[h]]);
        let phy_item_group = dataPrint.filter(pp => pp.product_type === prod_type[h]);
        let phy_group = [...new Set(phy_item_group.map(({ phy_group }) => phy_group))];
        const getRowLast = ws.lastRow._number;
        ws.mergeCells('A'+(getRowLast)+':I'+(getRowLast));
        ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'FFF8F6DF'}};
        for(let i = 0; i < phy_group.length; i++){
          let phy_item = dataPrint.filter(pp => pp.phy_group === phy_group[i] && pp.product_type === prod_type[h]);
          ws.addRow([phy_group[i]]);
          const getRowLast = ws.lastRow._number;
          ws.mergeCells('A'+(getRowLast)+':I'+(getRowLast));
          // ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid'};
          for(let j=0; j < phy_item.length; j++){
            ws.addRow([phy_item[j].pp_group, phy_item[j].qty_tech, phy_item[j].smart_stock, phy_item[j].qty_ericsson, phy_item[j].qty_comm_quotation, phy_item[j].currency, phy_item[j].total_price, phy_item[j].incentive, phy_item[j].net_total ]);
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
        ws.mergeCells('A'+(getRowLastTotal)+':F'+(getRowLastTotal));
        ws.getCell('G'+(getRowLastTotal)).value = phyTotal[z];
        ws.getCell('I'+(getRowLastTotal)).value = phyNetTotal[z];
      }
      

      ws.addRow([""]);
      ws.addRow(["Total"]);
      let getRowLastTotal = ws.lastRow._number;
      ws.mergeCells('A'+(getRowLastTotal)+':F'+(getRowLastTotal));
      ws.getCell('G'+(getRowLastTotal)).value = this.state.total_comm.totalPriceComm;
      ws.getCell('I'+(getRowLastTotal)).value = this.state.total_comm.netTotalComm;
      ws.getCell('A'+(getRowLastTotal)).font  = {bold : true };
      ws.getCell('G'+(getRowLastTotal)).font  = {bold : true };
      ws.getCell('I'+(getRowLastTotal)).font  = {bold : true };

      const comFormat = await wb.xlsx.writeBuffer()
      saveAs(new Blob([comFormat]), 'Commercial BOQ '+dataComm.no_boq_comm+' Group Report.xlsx')
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
              this.setState({boq_comm_API : commAPI, action_status : 'success', action_message : 'PO Number have been saved'});
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

    approvedBoqComm = (e) => {
      const statusApp = e.target.value;
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      console.log('jam tostring', DateNow.toString());
      const dataComm = this.state.boq_comm_API;
      let dataApprove = {}
      dataApprove["rev1"] = statusApp.toString();
      dataApprove["rev1_by"] = localStorage.getItem('user_Email');
      dataApprove["rev1_date"] = DateNow.toString();
      console.log('dataApprove', dataApprove);
      this.patchDatatoAPI('/boq_comm_op/'+dataComm._id, dataApprove, dataComm._etag).then( revPatch => {
          if(revPatch !== undefined){
              if(revPatch.data !== undefined){
                  dataComm["rev1"] = dataApprove.rev1;
                  dataComm["rev1_by"] = dataApprove.rev1_by;
                  dataComm["rev1_date"] = dataApprove.rev1_date;
                  dataComm['_etag'] = revPatch.data._etag;
                  this.setState({action_status : 'succes', action_message : 'BOQ Technical '+dataComm.no_boq_comm+' has been approved', API_Tech : dataComm});
              }
          }
      })
    }

    countGroupFromComm(commData){
      let group_pp = [...new Set(commData.map(({pp_group}) => pp_group))];
      let arrayGroup = [];
      for(let i = 0; i < group_pp.length; i++){
        let groupQTY = commData.filter(d => d.pp_group === group_pp[i]);
        let GroupData = {
          "pp_group" : group_pp[i],
          "qty_tech" : groupQTY.reduce((a,b) => a + b.qty_tech, 0),
          "qty_early_start" : groupQTY.reduce((a,b) => a + b.qty_early_start, 0),
          "smart_stock" : groupQTY.reduce((a,b) => a + b.smart_stock, 0),
          "qty_ericsson" : groupQTY.reduce((a,b) => a + b.qty_ericsson, 0),
          "unit_price" : groupQTY.reduce((a,b) => a + b.unit_price, 0),
          "qty_comm_quotation" : groupQTY.reduce((a,b) => a + b.qty_comm_quotation, 0),
          "qty_po" : groupQTY.reduce((a,b) => a + b.qty_po, 0),
          "total_price" : groupQTY.reduce((a,b) => a + b.total_price, 0),
          "currency" : groupQTY[0].currency,
          "phy_group" : groupQTY[0].phy_group,
          "product_type" : groupQTY[0].product_type,
          "incentive" : groupQTY.reduce((a,b) => a + b.incentive, 0),
          "net_total" : groupQTY.reduce((a,b) => a + b.net_total, 0),
        }
        arrayGroup.push(GroupData);
      }
      console.log("arrayGroup", arrayGroup);
    //   this.setState({commercialDataGroup : arrayGroup});
      this.DataGroupingView(arrayGroup);
    //   this.setState({commercialDataGroup : arrayGroup});
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

    render() {
      console.log('data BOQ Commercial', this.state.boq_comm_API);
      console.log('arrayGroup', this.state.commercialData);
      console.log('data Excel Row BOQ Comm', this.state.rowsComm);
      console.log('data BOQ Tech', this.state.qty_cust);
      console.log('checked Package', this.state.checkedPackage);
      console.log('data PO', this.state.po_selected, '+', this.state.po_number_selected)

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
          <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
          {this.state.boq_comm_API === null ? (
            <StepFlow 
              nowSign={"com"} 
              commercialSign={true}
              commercialArr={[]}
            />
          ) : (
            <StepFlow 
              nowSign={"com"} 
              commercialSign={true}
              commercialArr={[this.state.boq_comm_API._id]}
            />
          )}
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <span style={{lineHeight :'2', fontSize : '17px'}}> Commercial BOQ (Product Package)</span>
                  {this.state.boq_comm_API !== null && (
                    <React.Fragment>
                      <Link to={'/Boq/Commercial/Approval/'+this.state.boq_comm_API._id}>
                          <Button color="primary" style={{float : 'right'}}  onClick={this.showGroupToggle}> <i className="fa fa-eye">&nbsp;&nbsp;</i> Variant</Button>
                      </Link>
                        <Button style={{float : 'right', marginRight : '10px'}} onClick={this.exportCommercial} color="secondary">
                          <i className="fa fa-download" aria-hidden="true"> &nbsp; </i> Download Commercial Report
                        </Button>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <Row>
                    <Col sm="12" md="12">
                    <table style={{width : '100%', marginBottom : '0px'}}>
                      <tbody>
                        <tr style={{fontWeight : '425', fontSize : '23px'}}>
                          <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>COMMERCIAL BOQ</td>
                        </tr>
                        <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                          <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : {this.state.boq_comm_API !== null ? this.state.boq_comm_API.no_boq_comm : ""}</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                    </Col>
                  </Row>
                  <div style={{padding:"10px", fontSize:'15px'}}>
                    {this.state.boq_comm_API !== null &&  (
                    <React.Fragment>
                      <Row>
                        <Col sm="6" md="7">
                        <table className="table-header">
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>COMMERCIAL INFORMATION</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td style={{width : '150px'}}>Project Identifier </td>
                              <td >: &nbsp; {!this.state.boq_comm_API.hasOwnProperty('project_name') ? "" : this.state.boq_comm_API.project_name }</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>Version &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                              <td>: &nbsp; {(this.state.boq_comm_API.rev1 !== 'A' ? 'PA' : 'A') +this.state.boq_comm_API.version}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >Early Start </td>
                              {this.state.early_start === true ? (
                                <td>: &nbsp; &nbsp;<i class="fa fa-check"></i></td>
                              ) : (
                                <td>: </td>
                              )}
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>Opportunity ID </td>
                              <td>: &nbsp; {this.state.boq_comm_API.opportunity_id}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>{this.state.boq_comm_API.note_name_1}</td>
                              <td>{this.checkValuetoString(this.state.boq_comm_API.note_1).length !== 0 ? ": "+this.state.boq_comm_API.note_1 : ""}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>{this.state.boq_comm_API.note_name_3}</td>
                              <td>{this.checkValuetoString(this.state.boq_comm_API.note_3).length !== 0 ? ": "+this.state.boq_comm_API.note_3 : ""}</td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                        <Col sm="6" md="5">
                        <table style={{float : 'right', marginRight : '10px'}} className="table-header">
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>PROJECT ORDER INFORMATION</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >CPO Identifier &nbsp;&nbsp;</td>
                              <td >: &nbsp;&nbsp;
                              { this.state.boq_comm_API.hasOwnProperty("po_number") === false ? "" : this.state.boq_comm_API.po_number }
                              </td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >Updated By &nbsp;</td>
                              <td >: &nbsp; {this.state.boq_comm_API.updated_by.email}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >Date </td>
                              <td >: &nbsp; {toTimeZone(this.state.boq_comm_API.created_on)}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>{this.state.boq_comm_API.note_name_2}</td>
                              <td>{this.checkValuetoString(this.state.boq_comm_API.note_2).length !== 0 ? ": "+this.state.boq_comm_API.note_2 : ""}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>{this.state.boq_comm_API.note_name_4}</td>
                              <td>{this.checkValuetoString(this.state.boq_comm_API.note_4).length !== 0 ? ": "+this.state.boq_comm_API.note_4 : ""}</td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                      </Row>
                    </React.Fragment>
                    )}
                  </div>
                  <div class='divtable'>
                    <table hover bordered responsive size="sm" width='100%'>
                      <thead class="fixed">
                        <tr style={{backgroundColor : '#c6f569'}}>
                          <th style={{width :'300px', verticalAlign : 'middle'}} >Commercial PP Name</th>
                          <th style={{verticalAlign : 'middle'}}>Qty in Technical</th>
                          <th style={{verticalAlign : 'middle'}}>Existing Stock (Smart)</th>
                          <th style={{verticalAlign : 'middle'}}>Existing Stock (Ericsson)</th>
                          {/* <th style={{verticalAlign : 'middle'}}>Unit Price</th> */}
                          <th style={{verticalAlign : 'middle'}}>Currency</th>
                          <th style={{verticalAlign : 'middle'}}>Quotation Qty</th>
                          {this.state.boq_comm_API !== null && (
                            <th style={{verticalAlign : 'middle'}}>{this.state.boq_comm_API.early_start === true ? "Early Start Qty" : "PO Qty" }</th>
                          )}
                          <th style={{verticalAlign : 'middle'}}>Total Price</th>
                          <th style={{verticalAlign : 'middle'}}>Incentive</th>
                          <th style={{verticalAlign : 'middle'}}>Net Price</th>
                        </tr>
                      </thead>
                      {this.state.groupingView.length !== 0 ?
                        this.state.groupingView.map(pt =>
                        <React.Fragment>
                          <tbody style={{borderTopWidth : '0px'}} class="fixbody">
                              <tr style={{backgroundColor : '#f8f6df'}}>
                                <td colSpan="10" style={{textAlign: 'left', borderLefttWidth : '0px'}}>Product Type :{pt.product_type}</td>
                              </tr>
                          </tbody>
                          {pt.groups.map(grp =>
                            <React.Fragment>
                              <tbody style={{borderTopWidth : '0px'}} class="fixbody">
                                  <tr>
                                    <td colSpan="10" style={{textAlign: 'left', fontWeight : '500'}}>Physical Group : {grp}</td>
                                  </tr>
                                {this.packageView(this.state.commercialData, pt.product_type, grp).map((itm) =>
                                  <React.Fragment>
                                  <tr>
                                      <td style={{verticalAlign :'middle', textAlign : 'left'}}>{itm.pp_group}</td>
                                      <td align='center' style={{verticalAlign :'middle'}}>{ itm.qty_tech.toLocaleString() }</td>
                                      <td align='center' style={{verticalAlign :'middle'}}>{itm.smart_stock.toLocaleString()}</td>
                                      <td align='center' style={{verticalAlign :'middle'}}>{itm.qty_ericsson.toLocaleString()}</td>
                                      {/* <td style={{verticalAlign :'middle'}}>{itm.unit_price.toLocaleString()}</td> */}
                                      <td align='center' style={{verticalAlign :'middle'}}>{itm.currency}</td>
                                      <td align='center' style={{verticalAlign :'middle'}}>{ (itm.qty_tech -  (itm.smart_stock+itm.qty_ericsson)).toLocaleString() }</td>
                                      {this.state.boq_comm_API !== null && (
                                        <td align='center' style={{verticalAlign :'middle'}}>
                                          {this.state.boq_comm_API.early_start === true ? itm.qty_early_start : this.state.boq_comm_API.po_number !== null ? itm.qty_po : "" }
                                        </td>
                                      )}
                                      <td align='center' style={{verticalAlign :'middle'}}>{ (itm.total_price).toLocaleString() }</td>
                                      <td align='center' style={{verticalAlign :'middle'}}>{ (itm.incentive).toLocaleString() }</td>
                                      <td align='center' style={{verticalAlign :'middle'}}>{ (itm.net_total).toLocaleString() }</td>
                                  </tr>
                                  </React.Fragment>
                                )}
                                {this.state.boq_comm_API !== null && (
                                <tr style={{backgroundColor:'#f3f3f3'}}>
                                  <td colSpan="7" style={{textAlign : 'left'}}>Physical group Total</td>
                                  <td align='center' >{this.countTotalPrice(this.state.commercialData, pt.product_type, grp).toLocaleString()}</td>
                                  <td></td>
                                  <td align='center' >{this.countNetTotal(this.state.commercialData, pt.product_type, grp).toLocaleString()}</td>
                                </tr>
                                )}
                                <tr><td colSpan="13"></td></tr>
                              </tbody>
                            </React.Fragment>
                          )}
                          {this.state.boq_comm_API !== null && (
                            <tr><td colSpan="10"></td></tr>
                          )}
                        </React.Fragment>
                        ) : (
                        <tbody>
                          <tr>
                            <td colSpan="10">Please wait..</td>
                          </tr>
                        </tbody>
                            )}
                            {this.state.boq_comm_API !== null && (
                        <tbody class="fixed2 fixbody">
                            <tr>
                              <td colSpan="7" style={{textAlign : 'left'}}>Total Commercial</td>
                              <td>{this.state.total_comm.totalPriceComm !== undefined ? this.state.total_comm.totalPriceComm.toLocaleString() : 0}</td>
                              <td></td>
                              <td>{this.state.total_comm.netTotalComm !== undefined ? this.state.total_comm.netTotalComm.toLocaleString() : 0}</td>
                            </tr>
                        </tbody>
                        )}
                      </table>
                  </div>
                  {this.state.boq_comm_API !== null &&  (
		               <React.Fragment>
                    <div style={{marginBottom : "20px"}}>
                      <Row style={{paddingLeft : '10px'}}>
                        <Col sm="6" md="7">
                        <table className="table-footer">
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td >Approved By </td>
                              <td >: &nbsp; {this.state.boq_comm_API.rev1 === "PA" ? "Pre Approved" : this.state.boq_comm_API.rev1 == "WA" ? "Waiting Approve" : this.state.boq_comm_API.rev1_by}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td >Submitted By </td>
                              <td >: &nbsp; {this.state.boq_comm_API.submitted === undefined ? "Not Submitted" : this.state.boq_comm_API.submitted == "NS" ? "Not Submitted" : this.state.boq_comm_API.submitted_by}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td >Submitted Date </td>
                              <td >: &nbsp; {this.state.boq_comm_API.submitted === undefined ? "Not Submitted" : this.state.boq_comm_API.submitted == "NS" ? "Not Submitted" : this.state.boq_comm_API.submitted_date}</td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                        <Col sm="6" md="5">
                        <table className="table-footer" style={{float : 'right',marginRight : '20px'}}>
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td >Technical Indentifier &nbsp;&nbsp;&nbsp;</td>
                              <td >: &nbsp; {this.state.boq_comm_API.no_boq_tech+" - Ver"+this.state.boq_comm_API.version_boq_tech} </td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td > Created By &nbsp;</td>
                              <td >: &nbsp; {this.state.boq_comm_API.created_by.email}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '12px'}}>
                              <td >Created Date </td>
                              <td >: &nbsp; {toTimeZone(this.state.boq_comm_API.created_on)}</td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                      </Row>
                    </div>
		                {/* <button onClick={this.exportCommercial} style={{marginRight: '10px'}}>Download Commercial Report</button> */}
		               </React.Fragment>
                    )}
                   </CardBody>
                <CardFooter>
                  <Row>
                    {/* <Col>
                        <Button onClick={this.exportCommercial} color="secondary">
                            <i className="fa fa-download" aria-hidden="true"> &nbsp; </i> Download Commercial Report
                        </Button>
                    </Col> */}
                    <Col>
                    {this.state.boq_comm_API !== null && this.state.boq_comm_API !== undefined &&
                      <div style={{float:'right', display:'inline-flex'}}>
                      {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') && this.state.boq_comm_API.rev1 === "PA" ? (
                        <Button className="btn-success" color="success" value="WA" onClick={this.approvedBoqComm} disabled={this.state.boq_comm_API.rev1 === "A"}>
                            {this.state.boq_comm_API.rev1 === "PA" ? "Request Approve" : "Approve"}
                        </Button>
                      ): this.state.userRole.includes('Flow-Commercial') && this.state.boq_comm_API.rev1 === "PA" ? (
                        <Button className="btn-success" color="success" value="WA" onClick={this.approvedBoqComm} disabled={this.state.boq_comm_API.rev1 === "A"}>
                            {this.state.boq_comm_API.rev1 === "PA" ? "Request Approve" : "Approve"}
                        </Button>
                      ) : ""}
                      {this.state.userRole.includes('Admin') || this.state.userRole.includes('PDB-Dash') && this.state.boq_comm_API.rev1 === "WA" || this.state.boq_comm_API.rev1 === "A"  ? (
                        <Button className="btn-success" color="success" value="A" onClick={this.approvedBoqComm} disabled={this.state.boq_comm_API.rev1 === "A"}>
                            {this.state.boq_comm_API.rev1 === "A" ? "Approved" : "Approve"}
                        </Button>
                      ): this.state.userRole.includes('Flow-comAprv1') == true && this.state.boq_comm_API.rev1 === "WA" ? (
                        <Button className="btn-success" color="success" value="A" onClick={this.approvedBoqComm} disabled={this.state.boq_comm_API.rev1 === "A"}>
                            {this.state.boq_comm_API.rev1 === "A" ? "Approved" : "Approve"}
                        </Button>
                      ) : ""}
                      </div>
                    }
                    </Col>
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

          {/* Modal Edit Commercial */}
          <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
            <ModalHeader toggle={this.toggleEdit}>Checkout</ModalHeader>
            <ModalBody>
            <div>
              <Row><Col md="12">
              <Form className="form-horizontal">
                <FormGroup row style={{"padding-left":"10px"}}>
                  <Col md="2">
                    <Label style={{marginTop : "10px"}}>Project</Label>
                  </Col>
                  <Col xs="12" md="10">
                    <Input name="project" type="select">
                      <option value=""></option>
                      <option value="Demo 1">Project Demo 1</option>
                      <option value="Demo 1">Project Demo 2</option>
                    </Input>
                    <FormText className="help-block">Please Select Project</FormText>
                  </Col>
                  <Col xs="12" md="6">
                  </Col>
                </FormGroup>
              </Form>
              </Col></Row>
              <Row><Col md="12">
                <input type="file" style={{"padding":"10px","visiblity":"hidden"}} />
              </Col></Row>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button className="btn-success" style={{'float' : 'right',margin : '8px'}} color="success">
                <i className="fa fa-save">&nbsp;&nbsp;</i>
                Revision and Save Project
              </Button>
              <Button className="btn-success" style={{'float' : 'right',margin : '8px'}} color="success">
                <i className="fa fa-save">&nbsp;&nbsp;</i>
                Revision BOQ
              </Button>
            </ModalFooter>
          </Modal>
          {/* End Modal Edit Commercial */}
        </div>
      );
    }
  }

  export default DetailBoqCommGroup;
