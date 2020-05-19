import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './boqCommercial.css';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import CreatableSelect from 'react-select/creatable';
import { connect } from 'react-redux';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);





class BoqCommPO extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
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
        qty_po : new Map(),
        qty_esta : new Map(),
        collapse: false,
        dropdownOpen: new Array(1).fill(false),
        list_po_number_selection : [],
      };
      this.toggleLoading = this.toggleLoading.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleUpload = this.toggleUpload.bind(this);
      this.handleChangeEarlyStart = this.handleChangeEarlyStart.bind(this);
      this.handleChangePO = this.handleChangePO.bind(this);
      this.handleCreatePO = this.handleCreatePO.bind(this);
      this.savePO = this.savePO.bind(this);
      this.editQtyPO = this.editQtyPO.bind(this);
      this.saveEstaQty = this.saveEstaQty.bind(this);
      this.showGroupToggle = this.showGroupToggle.bind(this);
      this.prepareListPOSelection = this.prepareListPOSelection.bind(this);
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

    checkValuetoString(props){
      //Swap undefined or null to 0
      if( typeof props == 'undefined' || props == null ) {
        return "";
      }else{
        return props;
      }
    }

    toggleUpload() {
    this.setState({ collapse: !this.state.collapse });
  }

    showGroupToggle(){
      this.setState(prevState => ({
        toggleShowGroup: !prevState.toggleShowGroup
      }));
    }

    editQtyPO = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({ qty_po : prevState.qty_po.set(name, value) }));
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
            username: process.env.REACT_APP_usernamePhilApi,
            password: process.env.REACT_APP_passwordPhilApi
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
      try {
        let respond = await axios.post(process.env.REACT_APP_API_URL +url, data, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: process.env.REACT_APP_usernamePhilApi,
            password: process.env.REACT_APP_passwordPhilApi
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
            username: process.env.REACT_APP_usernamePhilApi,
            password: process.env.REACT_APP_passwordPhilApi
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
      this.toggleLoading();
      const isChecked = e.target.checked;
      const commItems = this.state.commercialData;
      if(isChecked === true){
        this.setState({ early_start:  isChecked });
        this.LoopEarlyQTY(0, commItems);
      }else{
        this.setState({ early_start:  isChecked });
        this.LoopEarlyQTY(0, commItems, null);
      }
    }

    handleChangePO(e){
      // const value = e.target.value;
      // const index = e.target.selectedIndex;
      // let text = e.target[index].text;
      // if(text.length == 0){
      //   text = null;
      // }
      // this.setState({po_selected : value, po_number_selected : text});
      let value = null;
      let label = null;
      if(e !== null && e !== undefined){
        value = e.value;
        label = e.label;
      }
      this.setState({po_selected : value, po_number_selected : label}, () => {
        console.log("PO Selected", value, "   ", label);
      });
    }

    LoopEarlyQTY(index, dataCommItem, value){
      if(index >= dataCommItem.length){
        let DataComm = this.state.boq_comm_API;
        let dataUpdateComm = {
          "early_start" : true,
          "po_status" : "Estar-A"
        }
        if(DataComm.early_start === true){
          if(DataComm.po_status === "PO-A"){
            dataUpdateComm["early_start"] = "false";
            dataUpdateComm["po_status"] = "PO-A";
          }else{
            dataUpdateComm["early_start"] = "false";
            dataUpdateComm["po_status"] = "PO-NR";
          }
        }
        this.patchDatatoAPI('/boq_comm_op/'+this.state.boq_comm_API._id, dataUpdateComm, this.state.boq_comm_API._etag).then( resp => {
          if(resp !== undefined){
            DataComm["early_start"] = dataUpdateComm.early_start;
            DataComm["po_status"] = dataUpdateComm.po_status;
            DataComm["_etag"] = resp.data._etag;
            // this.setState()
            this.setState({action_status : 'success', action_message : 'Your Early Start status has been updated'}, () => {
              this.toggleLoading();
              // setTimeout(function(){ window.location.reload(); }, 2500);
            })
            // this.toggleLoading();
            // setTimeout(function(){ window.location.reload(); }, 2000);
          }
        })
      }else{
        if(value !== undefined && value === null ){
          let dataUpdate = {
            "qty_early_start" : null
          }
          this.patchDatatoAPI('/boq_comm_items_op/'+dataCommItem[index]._id, dataUpdate, dataCommItem[index]._etag).then( resp => {
            if(resp !== undefined){
              if(resp.status < 400){
                this.LoopEarlyQTY(index+1, dataCommItem);
              }
            }
          })
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
    }

    getPOList(){
      this.getDatafromAPI('/po_non_page').then(resp => {
        if(resp !== undefined){
          this.setState({list_po_number : resp.data._items}, () => {
            this.prepareListPOSelection(resp.data._items);
          });
        }
      })
    }

    prepareListPOSelection(listPO){
      let dataPOSelection = [];
      listPO.map( po =>
        dataPOSelection.push({'label' : po.po_number, 'value' : po._id})
      )
      this.setState({list_po_number_selection : dataPOSelection}, () => {
        console.log("list_po_number_selection", this.state.list_po_number_selection);
      });
    }

    // getDataCommAPI(){
    //   this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1}').then(resComm => {
    //     if(resComm.data !== undefined){
    //       if(resComm.data.early_start !== undefined){
    //         this.setState({ early_start:  resComm.data.early_start, version_now : resComm.data.version, version_selected : resComm.data.version });
    //       }
    //       const arrayIdItems = '"'+resComm.data.list_of_id_item.join('", "')+'"';
    //       const where_id_Items = '?where={"_id" : {"$in" : ['+arrayIdItems+']}}';
    //       this.getDatafromAPI('/boq_comm_items_non_page'+where_id_Items).then(resItems =>{
    //         if(resItems.data._items.length !== 0){
    //           this.DataGroupingView(resItems.data._items);
    //           console.log("data Comm resComm");
    //           this.getListVersion(this.props.match.params.id);
    //           this.setState({commercialData : resItems.data._items, boq_comm_API : resComm.data, curr_rev : resComm.data.version, commercialData_now : resItems.data._items});
    //         }
    //       })
    //     }else{
    //       this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
    //     }
    //   })
    // }

    componentDidMount(){
      if(this.props.match.params.id !== undefined){
        this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1, "list_of_id_item" : 1}').then(resComm => {
          if(resComm == undefined){resComm["data"] = undefined}
          if(resComm.data !== undefined){
            if(resComm.data.early_start !== undefined){
              this.setState({ early_start:  resComm.data.early_start, version_now : resComm.data.version, version_selected : resComm.data.version });
              if(resComm.data.hasOwnProperty("po_number") === false && resComm.data.rev1 === "A"){
                this.getPOList();
              }else{
                if(resComm.data.po_number === null && resComm.data.rev1 === "A"){
                  this.getPOList();
                }
              }
            }
            this.setState({commercialData : resComm.data.list_of_id_item, boq_comm_API : resComm.data, curr_rev : resComm.data.version, commercialData_now : resComm.data.list_of_id_item});
            this.DataGroupingView(resComm.data.list_of_id_item);
          }else{
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
          }
        })
      }
    }

    componentDidMount(){
      if(this.props.match.params.id !== undefined){
        this.getDatafromAPI('/boq_comm_audit/'+this.props.match.params.id+'?embedded={"created_by":1, "updated_by" : 1}').then(resComm => {
          if(resComm !== undefined){
          if(resComm.data !== undefined){
            if(resComm.data.early_start !== undefined){
              this.setState({ early_start:  resComm.data.early_start, version_now : resComm.data.version, version_selected : resComm.data.version });
              if(resComm.data.hasOwnProperty("po_number") === false && resComm.data.rev1 === "A"){
                this.getPOList();
              }else{
                if(resComm.data.po_number === null && resComm.data.rev1 === "A"){
                  this.getPOList();
                }
              }
            }
            const arrayIdItems = '"'+resComm.data.list_of_id_item.join('", "')+'"';
            const where_id_Items = '?where={"_id" : {"$in" : ['+arrayIdItems+']}}';
            this.getDatafromAPI('/boq_comm_items_non_page'+where_id_Items).then(resItems =>{
              if(resItems.data._items.length !== 0){
                this.DataGroupingView(resItems.data._items);
                this.setState({commercialData : resItems.data._items, boq_comm_API : resComm.data, curr_rev : resComm.data.version, commercialData_now : resItems.data._items});
              }
            })
          }else{
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
          }
        }else{
          this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'})
        }
        })
      }
    }

    DataGroupingView(itemsDatas, dataItemsPicked){
      let item_nonCom = [];
      if(dataItemsPicked !== undefined && dataItemsPicked.length !== 0){
        itemsDatas = itemsDatas.filter(i_d => dataItemsPicked.includes(i_d.id_pp_doc) !== true);
      }
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
      const phy_group = [...new Set(dataPrint.map(({ phy_group }) => phy_group))];
      const DatePrint = new Date(dataComm.created_on.split(" ")[0]);
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

      const DocumentNo = ws.mergeCells('F4:J4');
      ws.getCell('F4').value = 'Document No.';
      ws.getCell('F4').font  = { size: 8 };
      ws.getCell('F4').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('F4').border = {top: {style:'thin'}, left: {style:'thin'},  right: {style:'thin'} };

      const DocumentNum = ws.mergeCells('F5:J5');
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

      const revDoc = ws.mergeCells('I6:J6');
      ws.getCell('I6').value = 'Rev';
      ws.getCell('I6').font  = { size: 8 };
      ws.getCell('I6').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('I6').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const revDocNum = ws.mergeCells('I7:J7');
      ws.getCell('I7').value = dataComm.version;
      ws.getCell('I7').alignment  = {vertical: 'top', horizontal: 'left' };
      ws.getCell('I7').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

      const CommInfoTitle = ws.mergeCells('A8:J8');
      ws.getCell('A8').value = 'COMMERCIAL BOQ';
      ws.getCell('A8').font  = { size: 16, bold : true };
      ws.getCell('A8').alignment  = {vertical: 'middle', horizontal: 'center' };

      const CommInfo = ws.mergeCells('A9:C9');
      ws.getCell('A9').value = 'Commercial Information';
      ws.getCell('A9').font  = { size: 14, bold : true };
      ws.getCell('A9').alignment  = {vertical: 'middle', horizontal: 'center' };
      ws.getCell('A9').border = {bottom: {style:'double'}, };

      const POInfo = ws.mergeCells('G9:J9');
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
      ws.mergeCells('H10:J10');
      ws.getCell('H10').value = dataComm.po_number;
      ws.mergeCells('H11:J11');
      ws.getCell('H11').value = this.state.userEmail;
      ws.mergeCells('H12:J12');
      ws.getCell('H12').value = dataComm.created_on.split(" ")[0];

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
      ws.addRow(["Material Desciption", "Unit", "Total Qty in Technical", "Early Start Qty", "Existing Stock Qty (Smart)","Existing Stock Qty (Ericsson)", "Quotation Net Qty", "In PO Qty", "Total Price", "Currency"]);
      ['A','B','C','D','E','F','G','H','I', 'J'].map( key => {
        ws.getCell(key+(ws.lastRow._number)).fill = {
          type : 'pattern',
          pattern : 'solid',
          fgColor : {argb:'FF0ACD7D'}
        }
      })

      for(let h = 0; h < prod_type.length; h++){
        ws.addRow(["Product Type : "+prod_type[h]]);
        let phy_item_group = dataPrint.filter(pp => pp.product_type === prod_type[h]);
        let phy_group = [...new Set(phy_item_group.map(({ phy_group }) => phy_group))];
        const getRowLast = ws.lastRow._number;
        ws.mergeCells('A'+(getRowLast)+':J'+(getRowLast));
        ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'FFF8F6DF'}};
        for(let i = 0; i < phy_group.length; i++){
          let phy_item = dataPrint.filter(pp => pp.phy_group === phy_group[i] && pp.product_type === prod_type[h]);
          ws.addRow(["Physical Group : "+phy_group[i]]);
          const getRowLast = ws.lastRow._number;
          ws.mergeCells('A'+(getRowLast)+':J'+(getRowLast));
          // ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'7F81C784'}}
          if(dataComm.early_start === true){
            for(let j=0; j < phy_item.length; j++){
              ws.addRow([phy_item[j].package_name, phy_item[j].unit, phy_item[j].qty_tech, dataComm.early_start === true ? phy_item[j].qty_early_start : null, phy_item[j].smart_stock, phy_item[j].qty_ericsson, phy_item[j].qty_comm_quotation, dataComm.po_number !== null ? phy_item[j].qty_po : null, phy_item[j].total_price, phy_item[j].currency]);
            }
          }else{
            for(let j=0; j < phy_item.length; j++){
              ws.addRow([phy_item[j].package_name, phy_item[j].unit, phy_item[j].qty_tech, dataComm.early_start === true ? phy_item[j].qty_early_start : null, phy_item[j].smart_stock, phy_item[j].qty_ericsson, phy_item[j].qty_comm_quotation, dataComm.po_number !== null ? phy_item[j].qty_po : null, phy_item[j].total_price, phy_item[j].currency]);
            }
          }
          let total_qty = phy_item.reduce((a,b) => a + b.total_price, 0);
          ws.addRow(["Physical Group Total"]);
          let getRowLastTotal = ws.lastRow._number;
          ws.getCell('A'+(getRowLastTotal)).font  = {bold : true };
          ws.mergeCells('A'+(getRowLastTotal)+':H'+(getRowLastTotal));
          ws.getCell('I'+(getRowLastTotal)).value = total_qty;
        }
      }

      const comFormat = await wb.xlsx.writeBuffer()
      saveAs(new Blob([comFormat]), 'Commercial BOQ '+dataComm.no_boq_comm+' Report.xlsx')
    }

    savePO(){
        this.toggleLoading();
        if(this.state.po_selected === null && this.state.boq_comm_API.early_start === true){
          this.saveEstaQty();
        }else{
          if(this.state.boq_comm_API.po_number == null){
            this.savePONumber();
          }else{
              this.savePOQty();
          }
        }

    }

    savePONumber = async () => {
      let commAPI = this.state.boq_comm_API;
      let commItemAPI = this.state.commercialData;
      if(this.state.po_number_selected.length !== 0 && this.state.po_number_selected !== null){
        const savePO = {
          "id_po_doc" : this.state.po_selected,
          "po_number" : this.state.po_number_selected.toString(),
          "po_status" : "PO-A",
          "early_start" : false
        }
        const res = await this.patchDatatoAPI('/boq_comm_op/'+commAPI._id, savePO, commAPI._etag)
        if(res !== undefined){
            if(res.status < 400){
                commAPI["id_po_doc"] = this.state.po_selected;
                commAPI["po_number"] = this.state.po_number_selected.toString();
                commAPI["po_status"] = "PO-A";
                commAPI["_etag"] = res.data._etag;
                for(let i = 0; i < commItemAPI.length; i++){
                  let respondPatchPO = await this.patchDatatoAPI('/boq_comm_items_op/'+commItemAPI[i]._id, {"qty_po" : commItemAPI[i].qty_comm_quotation, "id_po_doc" : this.state.po_selected, "po_number" : this.state.po_number_selected.toString()}, commItemAPI[i]._etag);
                  if(respondPatchPO !== undefined){
                      if(respondPatchPO < 400){

                        commItemAPI[i]["qty_po"] = commItemAPI[i].qty_comm_quotation;
                        commItemAPI[i]["_etag"] = respondPatchPO.data._etag;
                      }
                  }
                }
                this.setState({commercialData : commItemAPI, boq_comm_API : commAPI, action_status : 'success', action_message : 'PO Number has been saved'}, () => {
                  this.toggleLoading();
                  // setTimeout(function(){ window.location.reload(); }, 2000);
                });
            }
        }
    }else{
      this.setState({action_status : 'failed', action_message : 'Please Select PO Number'}, () => {this.toggleLoading()})
    }
    }

    savePOQty = async () => {
        const po_qty = this.state.qty_po;
        const commItems = this.state.commercialData;
        let respondPOsaving = []
        for (const [key, value] of po_qty.entries()) {
            const dataIndex = commItems.find(e => e._id === key);
            let dataQTY = {"qty_po" : value}
            const respondPatchQTY = await this.patchDatatoAPI('/boq_comm_items_op/'+key, dataQTY, dataIndex._etag);
            if(respondPatchQTY !== undefined){
                if(respondPatchQTY.status >= 200 && respondPatchQTY.status < 300){
                    respondPOsaving.push(respondPatchQTY.status);
                    commItems[commItems.findIndex(e => e._id === key)]["qty_po"] = parseFloat(value);
                    commItems[commItems.findIndex(e => e._id === key)]["_etag"] = respondPatchQTY.data._etag;
                }
            }
        }
        if(respondPOsaving.length === po_qty.size){
            this.setState({action_status : 'success', action_message : 'PO QTY has been saved'}, () => {
              this.toggleLoading();
              // setTimeout(function(){ window.location.reload(); }, 2000);
            })
        }else{
            this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'}, () => {this.toggleLoading()})
        }
        this.setState({commercialData : commItems});
    }

    saveEstaQty = async () => {
      const po_qty = this.state.qty_po;
      const commItems = this.state.commercialData;
      let respondPOsaving = []
      for (const [key, value] of po_qty.entries()) {
          const dataIndex = commItems.find(e => e._id === key);
          let dataQTY = {"qty_early_start" : value}
          const respondPatchQTY = await this.patchDatatoAPI('/boq_comm_items_op/'+key, dataQTY, dataIndex._etag);
          if(respondPatchQTY !== undefined){
              if(respondPatchQTY.status >= 200 && respondPatchQTY.status < 300){
                  respondPOsaving.push(respondPatchQTY.status);
                  commItems[commItems.findIndex(e => e._id === key)]["qty_early_start"] = parseFloat(value);
                  commItems[commItems.findIndex(e => e._id === key)]["_etag"] = respondPatchQTY.data._etag;
              }
          }
      }
      if(respondPOsaving.length === po_qty.size){
          this.setState({action_status : 'success', action_message : 'Early Start QTY has been saved'}, () => {
            this.toggleLoading();
            // setTimeout(function(){ window.location.reload(); }, 2000);
          })
      }else{
          this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please try again'}, () => {this.toggleLoading()})
      }
      this.setState({commercialData : commItems});
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

  handleCreatePO = async (inputValue) => {
    this.toggleLoading();
    let dataPO = this.state.list_po_number_selection;
    const dateNow = new Date();
    let dataPONew = {
      "po_number" : inputValue.toString(),
      "po_year" : (dateNow.getFullYear()).toString(),
      "created_by" : this.state.userEmail,
      "updated_by" : this.state.userEmail
    }
    let dataCreatePO = await this.postDatatoAPI('/po_op', dataPONew );
    if(dataCreatePO === undefined){dataCreatePO = {}}
    if(dataCreatePO.data !== undefined){
      console.log("dataPONew", JSON.stringify(dataPONew) )
      dataPO.push({'value' : dataCreatePO.data._id, 'label' : dataPONew["po_number"] })
    }
    this.toggleLoading();
    this.setState({list_po_number_selection : dataPO}, () => {

    });
  }

    render() {
      console.log('data BOQ Commercial', this.state.boq_comm_API);
      console.log('data BOQ Commercial Item', this.state.commercialData);
      console.log('data Excel Row BOQ Comm', this.state.rowsComm);
      console.log('data BOQ Tech', this.state.qty_po);
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
          <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <span style={{lineHeight :'2', fontSize : '17px'}}> Commercial BOQ </span>
                  {this.state.boq_comm_API !== null && (
                    <React.Fragment>
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
                              <td colSpan="3" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>COMMERCIAL INFORMATION</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td style={{width : '150px'}}>Project Identifier </td>
                              <td>:</td>
                              <td style={{paddingLeft:'10px'}}> {!this.state.boq_comm_API.hasOwnProperty('project_name') ? "" : this.state.boq_comm_API.project_name }</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>Version &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                              <td>:</td>
                              <td style={{paddingLeft:'10px'}}> {this.state.boq_comm_API.version}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >Early Start </td>
                              {this.state.boq_comm_API.rev1 !== 'A' && this.state.boq_comm_API.po_status == 'PO-NR' ? (
                                <React.Fragment><td>:</td><td style={{paddingLeft:'10px'}}> <span style={{fontSize : '12px', color: 'red'}}>CBOQ not yet approved</span></td></React.Fragment>
                              ) : this.state.boq_comm_API.rev1 !== 'A' && this.state.boq_comm_API.po_number === null ? (
                                <React.Fragment><td>:</td><td style={{paddingLeft:'10px'}}><Checkbox name='early_start' checked={this.state.early_start} onChange={this.handleChangeEarlyStart} disabled={this.state.boq_comm_API.early_start == true}/></td></React.Fragment>
                              ) : this.state.boq_comm_API.po_status == 'PO-A' ? (<td></td>) : (
                                (<React.Fragment><td>:</td><td style={{paddingLeft:'10px'}}><Checkbox name='early_start' checked={this.state.early_start} onChange={this.handleChangeEarlyStart} disabled={this.state.boq_comm_API.early_start == true}/></td></React.Fragment>)
                              )}
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>Opportunity ID </td>
                              <td>:</td>
                              <td style={{paddingLeft:'10px'}}> {this.state.boq_comm_API.opportunity_id}</td>
                            </tr>
                          </tbody>
                        </table>
                        </Col>
                        <Col sm="6" md="5">
                        <table style={{float : 'right', marginRight : '10px'}} className="table-header">
                          <tbody>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td colSpan="3" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>PROJECT ORDER INFORMATION</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >CPO Identifier </td>
                              <td>:</td>
                              <td style={{paddingLeft:'10px'}}>
                              {this.state.boq_comm_API.po_number === null && this.state.boq_comm_API.rev1 === "A" && this.state.boq_comm_API.po_status !== "PO-A" ? (
                                <React.Fragment>
                                  {/* <select name="PO" type="select" onChange={this.handleChangePO} value={this.state.po_selected}> */}
                                  <CreatableSelect
                                    isClearable
                                    options={this.state.list_po_number_selection}
                                    onChange={this.handleChangePO}
                                    onCreateOption={this.handleCreatePO}
                                  />
                                  {/* </select> */}
                                </React.Fragment>
                              ) : this.state.boq_comm_API.po_number === null && this.state.boq_comm_API.rev1 !== "A" ? (
                                <span style={{fontSize : '12px', color: 'red'}}>CBOQ not yet approved</span>
                              ) : this.state.boq_comm_API.po_number}
                              </td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >Updated By &nbsp;</td>
                              <td>:</td>
                              <td style={{paddingLeft:'10px'}}>{"bamidadmin@e-dpm.com"}</td>
                            </tr>
                            <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td >Date </td>
                              <td>:</td>
                              <td style={{paddingLeft:'10px'}}> {this.state.boq_comm_API.created_on.split(" ")[0]}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td>
                              </td>
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
                      <thead class='fixed'>
                        <tr style={{backgroundColor : '#c6f569'}}>
                          <th style={{width :'100px', verticalAlign : 'middle'}} >ID</th>
                          <th style={{width :'300px', verticalAlign : 'middle'}} >Material Description</th>
                          <th style={{verticalAlign : 'middle'}}>Qty in Technical</th>
                          <th style={{verticalAlign : 'middle'}}>Early Start Qty</th>
                          <th style={{verticalAlign : 'middle'}}>Existing Stock (Smart)</th>
                          <th style={{verticalAlign : 'middle'}}>Existing Stock (Ericsson)</th>
                          <th style={{verticalAlign : 'middle'}}>PP Price</th>
                          <th style={{verticalAlign : 'middle'}}>Currency</th>
                          <th style={{verticalAlign : 'middle'}}>Quotation Qty</th>
                          <th style={{verticalAlign : 'middle'}}>In PO Quotation Qty</th>
                          <th style={{verticalAlign : 'middle'}}>Total Price</th>
                          <th style={{verticalAlign : 'middle'}}>Net Price</th>
                        </tr>
                      </thead>
                      {this.state.groupingView.length !== 0 ?
                        this.state.groupingView.map(pt =>
                        <React.Fragment>
                          <tbody style={{borderTopWidth : '0px'}} class='fixbody'>
                              <tr style={{backgroundColor : '#f8f6df'}}>
                                <td colSpan="12" style={{textAlign: 'left', borderLefttWidth : '0px'}}>Product Type : {pt.product_type}</td>
                              </tr>
                          </tbody>
                          {pt.groups.map(grp =>
                            <React.Fragment>
                              <tbody style={{borderTopWidth : '0px'}} class='fixbody'>
                                  <tr>
                                    <td colSpan="12" style={{textAlign: 'left', fontWeight : '500'}}>Physical Group : {grp}</td>
                                  </tr>
                                {this.packageView(this.state.commercialData, pt.product_type, grp).map((itm) =>
                                  <React.Fragment>
                                  <tr>
                                      <td style={{verticalAlign :'middle', textAlign : 'left'}}>{ itm.pp_id }</td>
                                      <td style={{verticalAlign :'middle', textAlign : 'left'}}>{ itm.package_name }</td>
                                      <td style={{verticalAlign :'middle'}}>{ itm.qty_tech.toLocaleString() }</td>
                                      <td style={{verticalAlign :'middle'}}>
                                        {this.state.boq_comm_API === null ? "" : this.state.early_start === true ? (
                                          <Input type="number" name={itm._id} className="BoQ-style-qty" placeholder="qty" onChange={this.editQtyPO} value={!this.state.qty_po.has(itm._id) ? itm.qty_early_start : this.state.qty_po.get(itm._id) } />
                                        ) : null}
                                      </td>
                                      <td style={{verticalAlign :'middle'}}>{itm.smart_stock.toLocaleString()}</td>
                                      <td style={{verticalAlign :'middle'}}>{itm.qty_ericsson.toLocaleString()}</td>
                                      <td style={{verticalAlign :'middle'}}>{itm.unit_price.toLocaleString()}</td>
                                      <td style={{verticalAlign :'middle'}}>{itm.currency}</td>
                                      <td style={{verticalAlign :'middle'}}>{ (itm.qty_tech -  (itm.smart_stock+itm.qty_ericsson)).toLocaleString() }</td>
                                      <td style={{verticalAlign :'middle'}}>
                                        {this.state.boq_comm_API === null ? "" : this.state.boq_comm_API.po_number !== null ? (
                                          <Input type="number" name={itm._id} className="BoQ-style-qty" placeholder="qty" onChange={this.editQtyPO} value={!this.state.qty_po.has(itm._id) ? itm.qty_po : this.state.qty_po.get(itm._id) } />
                                        ) : null}
                                      </td>
                                      <td style={{verticalAlign :'middle'}}>{ ((itm.qty_tech -  (itm.smart_stock+itm.qty_ericsson)) * itm.unit_price).toLocaleString() }</td>
                                      <td style={{verticalAlign :'middle'}}>{ (((itm.qty_tech -  (itm.smart_stock+itm.qty_ericsson)) * itm.unit_price)-itm.incentive).toLocaleString() }</td>
                                  </tr>
                                  </React.Fragment>
                                )}
                                <tr><td colSpan="12"></td></tr>
                              </tbody>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                        ) : (
                          <tbody class="fixbody">
                            <tr>
                              {this.props.match.params.id == undefined? (
                                <td colSpan="12">Please Select BOQ Technical</td>
                              ) : (
                                <td colSpan="12">Please Wait, Loading Data...</td>
                              )}

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
                             <tr style={{fontWeight : '425', fontSize : '12px'}}>
                               <td >Clarified By </td>
                               <td >: &nbsp; {this.state.boq_comm_API.clarified === undefined ? "Not Submitted" : this.state.boq_comm_API.clarified == "NS" ? "Not Submitted" : this.state.boq_comm_API.clarified_by}</td>
                             </tr>
                             <tr style={{fontWeight : '425', fontSize : '12px'}}>
                               <td >Clarified Date </td>
                               <td >: &nbsp; {this.state.boq_comm_API.clarified === undefined ? "Not Submitted" : this.state.boq_comm_API.clarified == "NS" ? "Not Submitted" : this.state.boq_comm_API.clarified_date}</td>
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
                               <td >COM BOQ Created By &nbsp;</td>
                               <td >: &nbsp; bamidadmin@e-dpm.com</td>
                             </tr>
                             <tr style={{fontWeight : '425', fontSize : '12px'}}>
                               <td >COM BOQ Created Date </td>
                               <td >: &nbsp; {this.state.boq_comm_API.created_on}</td>
                             </tr>
                           </tbody>
                         </table>
                         </Col>
                       </Row>
                     </div>
 		               </React.Fragment>
                    )}
                </CardBody>
                <CardFooter>
                  <Row>
                    {/* <Col>
                      <Button onClick={this.exportCommercial} style={{marginRight: '10px'}} color="secondary">
                        <i className="fa fa-download" aria-hidden="true"> &nbsp; </i> Download Commercial Report
                      </Button>
                    </Col> */}
                    <Col>
                      <div style={{float:'right', display:'inline-flex'}}>
                      {this.state.boq_comm_API !== null && this.state.boq_comm_API !== undefined && this.state.boq_comm_API.po_number === null && this.state.boq_comm_API.early_start !== true?(
                      <React.Fragment>
                        <Button className="btn-success" color="success" value="A" onClick={this.savePO} disabled={this.state.po_number_selected === null}>
                            Save PO
                        </Button>
                      </React.Fragment>
                      ): this.state.boq_comm_API !== null && this.state.boq_comm_API !== undefined && this.state.boq_comm_API.po_number !== null ? (
                        <Button className="btn-success" color="success" value="A" onClick={this.savePO} disabled={this.state.qty_po.size == 0}>
                            Save PO
                        </Button>
                      ) : this.state.boq_comm_API !== null && this.state.boq_comm_API !== undefined && this.state.boq_comm_API.early_start == true && this.state.po_number_selected === null ? (
                        <Button className="btn-success"  color="success" value="A" onClick={this.savePO} disabled={this.state.qty_po.size == 0}>
                            Save Estar QTY
                        </Button>
                      ) : this.state.boq_comm_API !== null && this.state.boq_comm_API !== undefined && this.state.boq_comm_API.po_number === null ? (
                        <React.Fragment>
                          <Button className="btn-success" color="success" value="A" onClick={this.savePO} disabled={this.state.po_number_selected === null}>
                              Save PO
                          </Button>
                        </React.Fragment>
                      ) : ""}
                    </div>
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

  const mapStateToProps = (state) => {
    return {
      dataLogin : state.loginData,
      SidebarMinimize : state.minimizeSidebar
    }
  }

  export default connect(mapStateToProps)(BoqCommPO);
