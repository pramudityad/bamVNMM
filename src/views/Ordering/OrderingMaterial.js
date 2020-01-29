import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardFooter, CardBody, Table, Row, Col, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import {slideDown, slideUp} from './slidetableanim';
import './slidetablecss.css';
import './boqOrdering.css';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

class MaterialRow extends React.Component{
    state = { expanded : false }
  
    toggleExpander = (e) => {
      if (e.target.type === 'checkbox') return;
      if (!this.state.expanded) {
        this.setState(
          {expanded : true},
          () => {
            if (this.refs.expanderBody) {
              slideDown(this.refs.expanderBody)
            }
          }
        )
      } else {
        slideUp(this.refs.expanderBody, {
          onComplete: () => {this.setState({ expanded: false })}
        })
      }
    }
  
    render(){
      const pp = this.props.pp
      const checked = this.props.checked
      const handlechecklist = this.props.handlechecklist
      const orderInfo = this.props.orderInfo
      const getqtyqommquotation = this.props.getqtyqommquotation
      const checkOrdering = this.props.checkOrdering
      return [
        <tr key='main' className="parent">
            <td style={{textAlign : 'center'}}>
              {checkOrdering === false ? (
                <Checkbox name={pp._id} checked={checked} onChange={handlechecklist} disabled={orderInfo !== null}/>
              ) : 'Ordered'}
            </td>
            {
              pp.list_of_material.length !== 0 ?
            <td colSpan="5" style={{fontWeight : '500', cursor: 'pointer'}} onClick={this.toggleExpander.bind(this)}>
            <span style={{float:'left', display:'inline-flex'}}>{pp.product_name}</span>
                {this.state.expanded ? 
                  <span style={{float:'right', marginRight: '15px', marginTop: '5px', display:'inline-flex', fontSize:'12px'}}><i className="fa fa-chevron-up"></i></span>
                  :
                  <div style={{float:'right', marginRight: '15px', display:'inline-flex'}}>
                      <span style={{fontSize:'12px'}}>Details &nbsp;</span> 
                      <span style={{fontSize:'12px'}}> <i className="fa fa-chevron-down"></i></span>
                  </div>
                }
            </td>
              :
                  <td colSpan="5" style={{fontWeight : '500'}}>
                    <span style={{float:'left', display:'inline-flex'}}>{pp.product_name}</span>
                    <span style={{float:'right', marginRight: '15px', display:'inline-flex', fontSize:'11px', fontStyle:'italic'}}>Package Only</span>
                  </td>
            }
            <td></td>
            <td style={{textAlign : 'center'}}>{getqtyqommquotation}</td>
            <td></td>
        </tr>,
        this.state.expanded && (
          pp.list_of_material.map(mat =>
            // <div ref="expanderBody">
              <tr className="expandable" key="tr-expander" ref="expanderBody">
                {/* <td colspan={8}> */}
                  <td colspan="2"></td>
                  <td>{mat.material_id}</td>
                  <td>{mat.material_name}</td>
                  <td style={{textAlign : 'center'}}>{mat.uom}</td>
                  <td style={{textAlign : 'center'}}>{mat.qty}</td>
                  <td style={{textAlign : 'center'}}>{mat.material_price}</td>
                  <td style={{textAlign : 'center'}}>{mat.qty * getqtyqommquotation}</td>
                  <td style={{textAlign : 'center'}}>{(mat.qty * getqtyqommquotation) * mat.material_price}</td>
                {/* </td> */}
              </tr>
            // </div>
          )
        )
      ]
    }
  }

class OrderingMaterial extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          list_project : [],
          list_comm : [],
          project_select : null,
          comm_select : null,
          list_pp : [],
          commercialData : [],
          list_item_comm : [],
          pp_selected : new Map(),
          pp_selected_all : false,
          save_notif : null,
          Order_ID : null,
          OrderInfo : null,
          modal_loading : false,
          allocate_status : null,
          allocate_message : null,
          redirectSign : false,
          dropdownOpen: new Array(1).fill(false),
        };
        this.toggleLoading = this.toggleLoading.bind(this);
        this.handleChangeProject = this.handleChangeProject.bind(this);
        this.handleChangeComm = this.handleChangeComm.bind(this);
        this.handleChangeChecklistPP = this.handleChangeChecklistPP.bind(this);
        this.handleOrderID = this.handleOrderID.bind(this);
        this.handleChangeChecklistPPAll = this.handleChangeChecklistPPAll.bind(this);
        this.exportOrderingFormatPremium = this.exportOrderingFormatPremium.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
      }
    
      toggleDropdown(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => {
          return (index === i ? !element : false);
        });
        this.setState({
          dropdownOpen: newArray,
        });
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
    
      getOrdering(_id){
        this.getDatafromAPI('/ordering_all/'+_id).then( resp => {
          if(resp !== undefined){
            console.log("getDatafromAPI",  resp.data)
            this.setState({OrderInfo : resp.data}, () => {
              this.getCommercialItem(resp.data.list_of_id_item);
              this.getCommercial(resp.data.id_boq_comm_doc);
            });
          }
        })
      }
    
      getListProject(){
        this.getDatafromAPI('/project_all').then( resp => {
          if(resp !== undefined){
            this.setState({list_project : resp.data._items}, () => {
              this.getListCommercialbyProject(resp.data._items.project_name);
            });
          }
        })
      }
    
      getListCommercialbyProject(name){
        let where = '';
        if(name !== undefined && name.length !== 0){
          where = '?where={"id_project_doc": "'+name+'"}';
          this.getDatafromAPI('/boq_comm_op'+where).then( resp => {
            if(resp !== undefined){
              this.setState({list_comm : resp.data._items});
            }
          })
        }else{
          this.setState({list_comm : []});
        }
      }
    
      getCommercial(_id_comm){
        this.getDatafromAPI('/boq_comm_audit/'+_id_comm+'?embedded={"list_of_id_item":1, "created_by":1}').then( resp_comm => {
          if(resp_comm !== undefined){
            console.log("getDatafromAPI",  resp_comm.data)
            if(resp_comm.data !== undefined){
              const arrayPP = resp_comm.data.list_of_id_item.map(e => e.id_pp_doc);
              console.log("commercial item data", resp_comm.data);
              if(this.props.match.params.id === undefined && this.state.OrderInfo === null){
                this.setState({ commercialData : resp_comm.data, list_item_comm : resp_comm.data.list_of_id_item}, () => {
                  this.getCommercialItem(resp_comm.data.list_of_id_item.map(e => e._id));
                });
                // this.getProductPackage(arrayPP);
              }else{
                this.setState({ commercialData : resp_comm.data});
                this.countPerItemAllocatedCompareTech(resp_comm.data.id_boq_tech_doc);
              }
            }
          }
        })
      }
    
      async getCommercialItem(array_id){
        let dataCommItems = [];
        let arrayDataCommItems = array_id;
        let getNumberPage = Math.ceil(arrayDataCommItems.length / 50);
        for(let i = 0 ; i < getNumberPage; i++){
          let DataPaginationItems = arrayDataCommItems.slice(i * 50, (i+1)*50);
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
          this.setState({list_item_comm : dataCommItems} ,() => {
            this.getPPandMaterial(dataCommItems.map(e => e.id_pp_doc));
          })
        }
        // const arrayIdItem = '"'+array_id.join('", "')+'"';
        // const where_id_Item = '?where={"_id" : {"$in" : ['+arrayIdItem+']}}';
        // this.getDatafromAPI('/boq_comm_items_all'+where_id_Item).then( resp_Item => {
        //   if(resp_Item !== undefined){
        //     if(resp_Item.data !== undefined && resp_Item.data._items.length !== 0){
        //       this.setState({list_item_comm : resp_Item.data._items} ,() => {
        //         this.getProductPackage(resp_Item.data._items.map(e => e.id_pp_doc));
        //       })
        //     }
        //   }
        // })
      }
    
    //   getProductPackage(array_id_package){
    //     const arrayIdPP = '"'+array_id_package.join('", "')+'"';
    //     const where_id_PP = '?where={"_id" : {"$in" : ['+arrayIdPP+']}}';
    //     this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP).then( resp_PP => {
    //       if(resp_PP !== undefined){
    //         if(resp_PP.data !== undefined){
    //           this.setState({list_pp : resp_PP.data._items});
    //         }
    //         console.log('resp_PP', resp_PP);
    //       }
    //     })
    //   }

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
        this.setState({list_pp : product_package});
      }
    
      handleChangeProject=(e)=>{
        const value = e.target.value;
        this.setState({project_select : value});
        this.getListCommercialbyProject(value);
      }
    
      handleChangeComm=(e)=>{
        const value = e.target.value;
        this.setState({comm_select : value, list_item_comm : [], list_pp : [], pp_selected : new Map()});
        this.getCommercial(value);
      }
    
      handleOrderID = (e) => {
        const value = e.target.value;
        this.setState({Order_ID : value});
      }
    
      getPPbyID(_idPP){
        const list_item_comm = this.state.list_item_comm;
        const prodPack = list_item_comm.find(e => e.id_pp_doc === _idPP);
        // console.log('prodPack', prodPack);
        return prodPack;
      }
    
      handleChangeChecklistPP(e){
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ pp_selected: prevState.pp_selected.set(item, isChecked) }));
      }
    
      handleChangeChecklistPPAll(e){
        const item = e.target.name;
        const isChecked = e.target.checked;
        const commItem = this.state.list_item_comm;
        if(isChecked === true){
          for(let i = 0; i < commItem.length; i++){
            if(this.checkOrdering(commItem[i].id_pp_doc) === false){
              this.setState(prevState => ({ pp_selected: prevState.pp_selected.set(commItem[i].id_pp_doc, true) }));
            }
          }
        }else{
          for(let i = 0; i < commItem.length; i++){
            if(this.checkOrdering(commItem[i].id_pp_doc) === false){
              this.setState(prevState => ({ pp_selected: prevState.pp_selected.set(commItem[i].id_pp_doc, false) }));
            }
          }
        }
        this.setState({ pp_selected_all : isChecked});
      }
    
      componentDidMount(){
        this.getOrdering(this.props.match.params.id);
        if(this.props.match.params.id !== undefined){
    
        }else{
          this.getListProject();
        }
      }
    
      getIDItem(pp_selected){
        let ppSelected = [];
        pp_selected.forEach((value, key, map) => {if(pp_selected.get(key) === true){ppSelected.push(key)}});
        return ppSelected;
      }
    
      saveOrdering = async () => {
        this.toggleLoading();
        const pp_selected = this.state.pp_selected;
        const item_comm = [];
        pp_selected.forEach((value, key, map) => {if(pp_selected.get(key) === true){item_comm.push(this.state.list_item_comm.find(e=> e.id_pp_doc === key))}});
        //console.log("item_comm", item_comm);
        let list_id_item = item_comm.map(itm => itm._id);
        console.log("list_id_item", list_id_item)
        console.log("list_id_item", item_comm)
        const dataAmount = await this.getDatafromAPI('/amountordering/5d24454a951c58496433be19');
        if(dataAmount !== undefined){
          if(dataAmount.data !== undefined){
            const dataNumber = dataAmount.data.ordering_data;
            const date = new Date();
            const num_ordering = "ORDBOQ-"+date.getFullYear().toString().substr(-2)+(date.getMonth()+1).toString().padStart(2, '0')+date.getDate().toString().padStart(2, '0')+"-"+(dataNumber+1).toString().padStart(4, '0');
            const dataOrder = {
              "order_id" : num_ordering,
              "id_project_doc" : this.state.project_select,
              "id_boq_comm_doc" : this.state.comm_select,
              "list_of_id_item" : list_id_item,
              "deleted" : 0,
              "created_by" : localStorage.getItem('user_ID'),
              "updated_by" : localStorage.getItem('user_ID')
            }
            console.log('dataOrder',dataOrder);
            console.log('dataOrder',JSON.stringify(dataOrder));
            let resp = await this.postDatatoAPI('/ordering_op', dataOrder)
              if(resp !== undefined){
                if(resp.data !== undefined){
                  let j;
                  console.log("patchData", JSON.stringify({"id_order_doc" : resp.data._id}));
                  for(let i = 0; i < item_comm.length; i++){
                    const patchOrder = await this.patchDatatoAPI('/boq_comm_items_op/'+item_comm[i]._id, {"id_order_doc" : resp.data._id}, item_comm[i]._etag)
                      if(patchOrder !== undefined){
                        console.log('patching it', patchOrder.data);
                      }
                      j++;
                  }
                  // if(j == item_comm.length){
                  //   this.setState({list_pp : [], pp_selected : new Map()}, () => {
                  //     this.getOrdering( resp.data._id);
                  //   })
                  // }
                  let dataOrd = resp.data;
                  dataOrd["order_id"] = num_ordering;              
                  this.setState({OrderInfo : dataOrd});
                  this.patchDatatoAPI('/amountordering/5d24454a951c58496433be19', {"ordering_data" : (dataNumber+1).toString()}, dataAmount.data._etag).then( res => {
                    this.toggleLoading();
                    setTimeout(function(){this.setState({redirectSign : true})}.bind(this) , 2000);
                  });
                }
              }
          }
        }
      }
    
      checkOrdering(id_PP){
        if(id_PP !== undefined && id_PP !== null && this.state.list_item_comm.length !== 0){
          const item_comm = this.state.list_item_comm.find(e=> e.id_pp_doc === id_PP);
          if(item_comm.hasOwnProperty("id_order_doc") === true ){
            if(item_comm.id_order_doc !== null){
              return true
            }else{
              return false
            }
          }else{
            return false
          }
        }else{
          return false
        }
      }
    
      getBoqTechnicalSite(_id_Sites){
        const array_id_sites = '"'+_id_Sites.join('", "')+'"';
        const where_id_sites = '?where={"_id" : {"$in" : ['+array_id_sites+']}}';
        this.getDatafromAPI('/boq_tech_sites_non_page'+where_id_sites).then( res => {
          if(res !== undefined){
            if(res.data !== undefined){
              if(res.data._items.length !== 0){
                this.setState({ site_new : res.data._items});
                console.log('siteIndex sites', res.data._items);
              }
            }
          }
        })
      }
    
      async getBoqTechnicalSitesID(_id_Sites){
          let dataSites = [];
          let getNumberPage = Math.ceil(_id_Sites.length / 20);
          for(let i = 0 ; i < getNumberPage; i++){
            let DataPaginationItems = _id_Sites.slice(i * 20, (i+1)*20);
            const array_id_sites = '"'+DataPaginationItems.join('", "')+'"';
            const where_id_sites = '?where={"_id" : {"$in" : ['+array_id_sites+']}}';
            console.log('siteIndex sites', where_id_sites);
            let sitesData = await this.getDatafromAPI('/boq_tech_sites_non_page'+where_id_sites);
            if(sitesData !== undefined){
              if(sitesData.data !== undefined){
                dataSites = dataSites.concat(sitesData.data._items);
              }
            }
            if(dataSites.length !== 0){
              return dataSites
              this.setState({boq_tech_sites : dataSites});
              this.getBoqCommercialbyID(this.state.boq_tech.list_of_id_boq_comm);
            }else{
              return []
            }
          }
      }
    
      async countPerItemAllocatedCompareTech(_id_tech){
        let dataCommItems = this.state.list_item_comm;
        let list_of_id_site = [];
        let countDataQuot = [];
        let dataAllAllo = [];
        let message = "";
        let dataTec = await this.getDatafromAPI('/boq_tech_op/'+_id_tech);
        let get_id_package = [...new Set(dataCommItems.map(({ id_pp_doc}) => id_pp_doc))];
        if(dataTec !== undefined){
          if(dataTec.data !== undefined){
            const dataTech = dataTec.data;
            list_of_id_site = await this.getBoqTechnicalSitesID(dataTech.list_of_id_site);
            console.log("list_of_id_site", list_of_id_site);
            let onlyItem = list_of_id_site.map(child => child.list_of_site_items).reduce((l, n) => l.concat(n), []);
            console.log("data Count Tech", onlyItem);
            for(let i = 0;  i< get_id_package.length; i++){
              const materialQTY = onlyItem.filter(d => d.id_pp_doc === get_id_package[i]);
              let count = materialQTY.reduce((a,b) => a + b.qty_quotation_allocated, 0);
              countDataQuot[get_id_package[i]] = count;
              let qtyInComm = dataCommItems.find( e => e.id_pp_doc === get_id_package[i]).qty_comm_quotation;
              if(count === qtyInComm){
                dataAllAllo.push(get_id_package[i]);
              }
            }
          }
        }
        console.log("data Count Tech", countDataQuot);
        if(dataAllAllo.length === get_id_package.length){
          this.setState({allocate_status : 'success', allocate_message : 'Fully Allocated'})
        }else{
          this.setState({allocate_status : 'failed', allocate_message : 'Not Fully Allocated'})
        }
        return countDataQuot;
      }
    
      async exportOrderingFormatPremium(){
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet();
    
        const dataMaterial = this.state.list_pp;
        let firstMaterial = 2;
    
        ws.addRow(["Site", "Order Node", "Product Id", "Quantity", "Order  Price "]);
    
        for(let i = 0; i < dataMaterial.length; i++){
          let qty_po = this.checkValueReturn(this.getPPbyID(dataMaterial[i]._id).qty_po, 0);
          if(qty_po !== 0){
            ws.addRow(["", dataMaterial[i].name + " (1)", dataMaterial[i].pp_id, 1]);
            ws.getCell('A'+firstMaterial).value = dataMaterial[i].name;
            firstMaterial++;
            for(let j = 1; j < qty_po; j++ ){
              ws.addRow(["", dataMaterial[i].name + " ("+(j+1)+")", dataMaterial[i].pp_id, 1]);
              firstMaterial++;
            }
          }
          
        }
    
        const comFormat = await wb.xlsx.writeBuffer()
        saveAs(new Blob([comFormat]), 'Ordering Format Premium.xlsx')
      }
    
      exportOrdering = async () => {
          const wb = new Excel.Workbook()
          const ws = wb.addWorksheet()
    
          const dataComm = this.state.commercialData;
          const dataMaterial = this.state.list_pp;
          const dataSelected = this.state.pp_selected;
    
          const DatePrint = new Date(dataComm.created_on.toString());
          const DatePrintOnly = DatePrint.getFullYear()+'-'+(DatePrint.getMonth()+1).toString().padStart(2, '0')+'-'+DatePrint.getDay().toString().padStart(2, '0');
    
          const prepared = ws.mergeCells('A4:C4');
          ws.getCell('A4').value = 'prepared';
          ws.getCell('A4').alignment  = { vertical: 'top', horizontal: 'left' };
          ws.getCell('A4').font  = { size: 8 };
          ws.getCell('A4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
    
          const preparedEmail = ws.mergeCells('A5:C5');
          ws.getCell('A5').value = dataComm.created_by.email;
          ws.getCell('A5').alignment  = {horizontal: 'left' };
          ws.getCell('A5').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
    
          const DocumentNo = ws.mergeCells('D4:E4');
          ws.getCell('D4').value = 'Document No.';
          ws.getCell('D4').font  = { size: 8 };
          ws.getCell('D4').alignment  = {vertical: 'top', horizontal: 'left' };
          ws.getCell('D4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
    
          const DocumentNum = ws.mergeCells('D5:E5');
          ws.getCell('D5').value = this.state.OrderInfo.order_id;
          ws.getCell('D5').alignment  = {horizontal: 'left' };
          ws.getCell('D5').border = {left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
    
          const Approved = ws.mergeCells('A6:A7');
          ws.getCell('A6').value = 'Approved';
          ws.getCell('A6').font  = { size: 8 };
          ws.getCell('A6').alignment  = {vertical: 'top', horizontal: 'left' };
          ws.getCell('A6').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}};
    
          const Checked = ws.mergeCells('B6:C7');
          ws.getCell('B6').value = 'Checked';
          ws.getCell('B6').font  = { size: 8 };
          ws.getCell('B6').alignment  = {vertical: 'top', horizontal: 'left' };
          ws.getCell('B6').border = {top: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
    
          ws.getCell('D6').value = 'Date';
          ws.getCell('D6').font  = { size: 8 };
          ws.getCell('D6').alignment  = {vertical: 'top', horizontal: 'left' };
          ws.getCell('D6').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };
    
          ws.getCell('D7').value = DatePrintOnly;
          ws.getCell('D7').alignment  = {vertical: 'top', horizontal: 'left' };
          ws.getCell('D7').border = { left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
    
          const revDoc = ws.mergeCells('E6:E7');
          ws.getCell('E6').value = 'Rev';
          ws.getCell('E6').font  = { size: 8 };
          ws.getCell('E6').alignment  = {vertical: 'top', horizontal: 'left' };
          ws.getCell('E6').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
    
          const OrderingInfo = ws.mergeCells('A8:E8');
          ws.getCell('A8').value = 'ORDERING INFORMATION';
          ws.getCell('A8').font  = { size: 14, bold : true };
          ws.getCell('A8').alignment  = {vertical: 'middle', horizontal: 'center' };
          ws.getCell('A8').border = {bottom: {style:'double'} };
    
          let po_number = null;
          if(dataComm.hasOwnProperty("po_number")){
            po_number = dataComm.po_number;
          }
    
          ws.addRow(["Project Identifier", dataComm.project_name,"","",""]);
          ws.addRow(["Commercial Identifier", dataComm.no_boq_comm,"","",""]);
          ws.addRow(["Project Order Identifier", po_number,"","",""]);
          ws.addRow(["", "","","",""]);
    
          ws.addRow([]);
          ws.addRow(['Material Description','Material Code', 'Unit', 'Quantity PO / PP', 'Total Order']);
          ['A14','B14','C14','D14','E14'].map( key => {
            ws.getCell(key).fill = {
              type : 'pattern',
              pattern : 'solid',
              fgColor : {argb:'FF212121'}
            }
            ws.getCell(key).font = {color: {argb: '00FFFFFF'}, bold : true}
          })
          if(this.props.match.params.id === undefined ){
            for (const [key, value] of dataSelected.entries()) {
              if(dataSelected.get(key) == true){
                const PP_i = dataMaterial.find(e => e._id === key);
                const PPIndex = PP_i.list_of_material;
                ws.addRow([PP_i.name]);
                const getRowLast = ws.lastRow._number;
                ws.mergeCells('A'+(getRowLast)+':E'+(getRowLast));
                ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'7F81C784'}}
                ws.getCell('A'+(getRowLast)).value = PP_i.name;
                for(let  i = 0; i < PPIndex.length; i++){
                  ws.addRow([PPIndex[i].material_name,PPIndex[i].material_id, PPIndex[i].uom, PPIndex[i].qty, PPIndex[i].qty * this.checkValueReturn(this.getPPbyID(key).qty_po, 0)]);
                }
              }
            }
          }else{
            for(let j = 0 ; j < dataMaterial.length ; j++){
              const PPIndex = dataMaterial[j].list_of_material;
              ws.addRow([dataMaterial[j].name]);
              const getRowLast = ws.lastRow._number;
              ws.mergeCells('A'+(getRowLast)+':E'+(getRowLast));
              ws.getCell('A'+(getRowLast)).fill = {type : 'pattern', pattern : 'solid', fgColor : {argb:'7F81C784'}}
              for(let  i = 0; i < PPIndex.length; i++){
                ws.addRow([PPIndex[i].material_name,PPIndex[i].material_id, PPIndex[i].uom, PPIndex[i].qty, PPIndex[i].qty * this.checkValueReturn(this.getPPbyID(dataMaterial[j]._id).qty_po, 0)]);
              }
            }
          }
    
          const comFormat = await wb.xlsx.writeBuffer()
          saveAs(new Blob([comFormat]), 'Ordering Information.xlsx')
        }
    
      render() {
        if(this.state.redirectSign !== false){
          return (<Redirect to={'/detail-ordering/'+this.state.OrderInfo._id} />);
        }
        
        console.log('Project Selected', this.state.project_select);
        console.log('Commercial Selected', this.state.comm_select);
        console.log('PP Selected', this.state.pp_selected);
        console.log('data Comm ', this.state.list_pp);
        console.log('list_item_comm', this.state.list_item_comm);
    
        function LoaderData(props){
          if(props.dataView.length == 0){
            return <div className="load-bar">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
          }else{
            return <div></div>
          }
        }
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
        function HeaderDetail(props){
            if(props.BoM.length !== 0){
                return <div>
                        <table>
                          <tbody>
                            <tr style={{fontWeight : '400', fontSize : '17px'}}>
                              <td>ID</td>
                              <td>: {props.header}</td>
                            </tr>
                            <tr style={{fontWeight : '400', fontSize : '17px'}}>
                              <td>No. BOM &nbsp;</td>
                              <td>: {props.BoM[0].No_BOM}</td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
            }else{
                return <div></div>
            }
        }
        return (
          <div>
            <SuccessSaved notif={this.state.save_notif} />
            <Row>
            <Col xl="12">
            <Card>
            <CardHeader>
              {/* <span>Material Ordering BOQ</span> */}
              {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                <React.Fragment>
                Material Ordering BOQ
                <div className="card-header-actions" style={{marginRight:'5px'}} onClick={this.saveOrdering}>
                  {this.state.OrderInfo !== null && (
                    <React.Fragment>
                    <Button style={{float : 'right',margin : '3px'}} color="primary" onClick={this.exportOrdering}><i className="fa fa-print" aria-hidden="true">&nbsp;</i>Print Ordering</Button>
                    <Button style={{float : 'right',margin : '3px'}} color="primary" onClick={this.exportOrderingFormatPremium}><i className="fa fa-print" aria-hidden="true">&nbsp;</i>Print Ordering Format Premium</Button>
                    </React.Fragment>
                  )}
                  
                </div>
              </React.Fragment>) : (
                <React.Fragment>
                  <span style={{lineHeight :'2', fontSize : '17px'}} >Material Ordering BOQ</span>
                  {this.state.OrderInfo !== null && (
                    <React.Fragment>
                        <div className="card-header-actions" style={{display:'inline-flex'}}>
                          <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} size="sm">
                            <DropdownToggle caret color="warning">
                              <i className="fa fa-print" aria-hidden="true">&nbsp;</i>Print Ordering
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header> Print Ordering </DropdownItem>
                              <DropdownItem onClick={this.exportOrdering}> <i className="fa fa-print" aria-hidden="true"></i> Print Ordering</DropdownItem>
                              <DropdownItem onClick={this.exportOrderingFormatPremium}> <i className="fa fa-print" aria-hidden="true"></i> Print Ordering Format Premium</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                    </React.Fragment>
                  )}
    
                </React.Fragment>
              )}
            </CardHeader>
              <CardBody className='card-UploadBoq'>
                <table  style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
                  <tbody>
                    <tr>
                      <td colSpan="4" style={{textAlign : 'center'}}>ORDERING INFORMATION</td>
                    </tr>
                  </tbody>
                </table>
                <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                <table style={{width : '35%'}} className="table-header">
                  <tbody>
                    <tr>
                        <td style={{whiteSpace: 'nowrap'}}>Project Identifier</td>
                        <td>:</td>
                        <td style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>
                        {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                            <Input type="select" onChange={this.handleChangeProject} values={this.state.project_select} style={{minWidth : '150px'}}>
                                <option value=""></option>
                                {this.state.list_project.map( lp =>
                                <option value={lp._id}>{lp.project_name}</option>
                                )}
                            </Input>
                            ) : this.state.commercialData.length !== 0 && this.state.commercialData !== null ? this.state.commercialData.project_name : null}
                        </td>
                    </tr>
                    <tr>
                      <td style={{whiteSpace: 'nowrap'}}>Commercial Identifier</td>
                      <td>: </td>
                      <td style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>
                        {this.state.OrderInfo === null && this.props.match.params.id === undefined  ? (
                          <Input type="select" onChange={this.handleChangeComm} values={this.state.comm_select} style={{minWidth : '150px'}}>
                            <option value=""></option>
                            {this.state.list_comm.map( lc =>
                              <option value={lc._id}>{lc.no_boq_comm}</option>
                            )}
                          </Input>
                        ) : this.state.commercialData.length !== 0 && this.state.commercialData !== null ? this.state.commercialData.no_boq_comm : null}
                      </td>
                    </tr>
                    <tr>
                      <td style={{whiteSpace: 'nowrap'}}>PO Identifier</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>
                        {this.state.commercialData === null ? "" : this.state.commercialData.po_number === null ? "" : this.state.commercialData.po_number}
                      </td>
                    </tr>
                    <tr>
                      <td style={{whiteSpace: 'nowrap'}}>Order ID</td>
                      <td>:</td>
                      <td style={{paddingLeft:'10px', whiteSpace: 'nowrap'}}>
                        {this.state.OrderInfo !== null && this.props.match.params.id !== undefined ? this.state.OrderInfo.order_id : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr className="upload-line-ordering"></hr>
                <Table hover bordered responsive size="sm">
                  <thead>
                    <tr>
                      <th style={{width : '50px', backgroundColor:'#c6f569', color:'#000000'}}>
                      {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                        <Checkbox checked={this.state.pp_selected_all} onChange={this.handleChangeChecklistPPAll}/>
                      ) : (" ")}
                      </th>
                      <th style={{width : '200px', backgroundColor:'#c6f569', color:'#000000'}}>Package</th>
                      <th style={{width : '150px', backgroundColor:'#c6f569', color:'#000000'}}>Material Code</th>
                      <th style={{backgroundColor:'#c6f569', color:'#000000'}}>Material Name</th>
                      <th style={{width : '75px', backgroundColor:'#c6f569', color:'#000000'}}>Unit</th>
                      <th style={{width : '75px', backgroundColor:'#c6f569', color:'#000000'}}>Qty per PP</th>
                      <th style={{width : '75px', backgroundColor:'#c6f569', color:'#000000'}}>Price</th>
                      <th style={{width : '100px', backgroundColor:'#c6f569', color:'#000000'}}>Total PO Qty</th>
                      <th style={{width : '100px', backgroundColor:'#c6f569', color:'#000000'}}>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.list_item_comm.length !== 0 ? (
                    this.state.list_pp.map( pp =>
                      <React.Fragment>
                          <MaterialRow
                            pp = {pp}
                            checked = {this.state.pp_selected.get(pp._id)}
                            handlechecklist = {this.handleChangeChecklistPP}
                            orderInfo = {this.state.OrderInfo}
                            getqtyqommquotation = {this.checkValueReturn(this.getPPbyID(pp._id).qty_po,0)}
                            checkOrdering = {this.checkOrdering(pp._id)}
                          />
                      </React.Fragment>
                    ) ) : (<tr><td colSpan="9" style={{textAlign : 'center'}}>Please Wait</td></tr>)}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                <Button color="success" style={{ color: 'white', fontWeight : '400'}} disabled={this.state.pp_selected.size === 0} onClick={this.saveOrdering}><i className="fa fa-shopping-cart " aria-hidden="true">&nbsp;</i>Create Order</Button>
              ) : (<div></div>)}
              </CardFooter>
            </Card>
            </Col>
            </Row>
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

export default OrderingMaterial;
