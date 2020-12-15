import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse, Input, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import './tssrModule.css';
import { saveAs } from 'file-saver';
import Pagination from "react-js-pagination";
import {connect} from 'react-redux';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Excel from 'exceljs';
import Select from 'react-select';
import { Redirect, Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {convertDateFormatfull} from '../../helper/basicFunction'
import {getDatafromAPINODE, postDatatoAPINODE, patchDatatoAPINODE, getDatafromAPIISAT} from '../../helper/asyncFunction'


const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_TSEL = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const usernameISAT = 'adminbamidsuper';
const passwordISAT = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class TableTechnicalItem extends React.Component{
  constructor(props) {
      super(props);
  }

  getTechnicalRow(site_data_item, item_id){
    const dataItemIdx = site_data_item.find(e => e.pp_id === item_id);
    if(dataItemIdx !== undefined){
      return ( <Fragment>
                  <td>{dataItemIdx.qty}</td>
                </Fragment>)
    }else{
      return ( <Fragment>
                  <td></td>
                </Fragment>)
    }
  }

  getDataCD(site_id, project_po, project){
    const dataCDIdx = this.props.dataCD.find(e => e.CD_Info_Project_Name === project && e.Site_Info_SiteID_NE_Actual === site_id && e.Project_PO === project_po);
    if(dataCDIdx !== undefined){
      return dataCDIdx.CD_Info_System_Key
    }else{
      return null
    }
  }

  render(){
    return(
      <Table hover bordered striped responsive size="sm">
        <thead>
        <tr>
          {this.props.boqType === "MW" && (
            <th rowSpan="2" style={{verticalAlign : "middle"}}>
              Link ID
            </th>
          )}
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            Region
          </th>
          {this.props.boqType === "MW" && (
            <th rowSpan="2" style={{verticalAlign : "middle"}}>
              Region FE
            </th>
          )}
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            Program
          </th>
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            Site ID
          </th>
          {this.props.boqType === "MW" && (
            <th rowSpan="2" style={{verticalAlign : "middle"}}>
              Site ID FE
            </th>
          )}
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            WP ID
          </th>
          {this.props.TechHeader.pp_id.map(pp_id =>
            <Fragment>
              <th>{pp_id}</th>
            </Fragment>
          )}
        </tr>
        <tr>
          {this.props.TechHeader.name.map(name =>
            <Fragment>
              <th>{name}</th>
            </Fragment>
          )}
        </tr>
        </thead>
        <tbody>
        {this.props.dataTechBoqSites.map(site =>
          <tr>
            {this.props.boqType === "MW" && (
              <td>{site.link_id}</td>
            )}
            <td>{site.region}</td>
            {this.props.boqType === "MW" && (
              <td>{site.region_fe}</td>
            )}
            <td>{site.program}</td>
            <td>{site.site_id}</td>
            {this.props.boqType === "MW" && (
              <td>{site.site_id_fe}</td>
            )}
            <td>{site.wp_id}</td>
            {(this.props.isVersion === "rollback") ? (
              this.props.TechHeader.pp_id.map((pp_id,i) =>
                this.getTechnicalRow(site.siteItemVersion, pp_id)
              )
            ): (
              this.props.TechHeader.pp_id.map((pp_id,i) =>
                this.getTechnicalRow(site.siteItem, pp_id)
              )
            )}

          </tr>
        )}
        </tbody>
      </Table>
    )
  }
}

class TSSRboq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_list : [],
      userRole : this.props.dataLogin.role,
      userId : this.props.dataLogin._id,
      userName : this.props.dataLogin.userName,
      userEmail : this.props.dataLogin.email,
      tokenUser : this.props.dataLogin.token,
      rowsTech: [],
      result_check_tssr: null,
      data_tssr_boq : null,
      data_tssr_boq_sites : [],
      data_tssr_boq_sites_version : [],
      data_tssr_boq_sites_pagination : [],
      view_tech_header_table : {"type" : [], "name" : [], "pp_id" : []},
      view_tech_all_header_table : {"config_group_header" : [], "config_group_type_header" : []},
      list_version : [],
      pp_all : [],
      sites_all : [],
      API_Tech : [],
      API_Tech_prev : null,
      API_Tech_Sites : [],
      dataPackage : [],
      action_status : null,
      action_message : "",
      checkedItems: new Map(),
      rowsTech: [],
      Package_Header : [],
      data_item : [],
      data_item_pagination : [],
      waiting_status : null,
      project_name : [],
      data_format : [],
      data_format_rev : [],
      current_rev : null,
      select_rev : null,
      modal_loading : false,
      version_now : null,
      version_selected : null,
      collapse: false,
      dropdownOpen: new Array(2).fill(false),
      redirectSign : false,
      noteChange : new Array(8).fill(null),
      fieldNoteChange : new Array(8).fill(null),
      perPage : 25,
      prevPage : 1,
      activePage : 1,
      opportunity_id : null,
      note_version : null,
      list_commercial_tech : [],
      summaryQTYTech : [],
      project_all : [],
      project_select : null,
      project_name_selected : null,
      progress_count : null,
      progress_data : 0,
      progress_count : 0,
      progress_failed : 0,
      option_tssr_header_view : 'only_filled',
      update_qty_for : 'new',
      update_type : 'revision',
      modal_update_info : false,
      loading_checking : null,
      format_uploader : null,
      data_from_cd : [],
      boq_type : 'nonMW',
    };
    this.toggleUpdateInfo = this.toggleUpdateInfo.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.saveTechBoq = this.saveTechBoq.bind(this);
    this.updateTechBoq = this.updateTechBoq.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeShow = this.handleChangeShow.bind(this);
    this.handleChangeVerComment = this.handleChangeVerComment.bind(this);
    this.saveProjecttoDB = this.saveProjecttoDB.bind(this);
    this.exportFormatTechnical = this.exportFormatTechnical.bind(this);
    this.exportFormatTechnicalCommercial = this.exportFormatTechnicalCommercial.bind(this);
    this.exportTechnicalHorizontal = this.exportTechnicalHorizontal.bind(this);
    this.exportFormatTechnicalVertical = this.exportFormatTechnicalVertical.bind(this);
    this.approvalTechnical = this.approvalTechnical.bind(this);
    this.handleChangeOptionView = this.handleChangeOptionView.bind(this);
    this.handleChangeFormatUploader = this.handleChangeFormatUploader.bind(this);
    }

  toggleUpload(e) {
    if(e !== undefined){
      if(e.target !== undefined){
        if(e.target.value !== undefined){
          this.setState({update_qty_for : e.target.value});
        }
      }
    }
    console.log()
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

  toggleUpdateInfo(e){
    const value = e.currentTarget.value;
    this.setState({update_type : value});
    this.setState(prevState => ({
      modal_update_info: !prevState.modal_update_info
    }));
  }

  getTechBoqData(_id_tech){
    getDatafromAPINODE('/tssr/getTssrWithDelta/'+_id_tech+'?package=1', this.props.dataLogin.token).then(res => {
      if(res.data !== undefined){
        const dataTech = res.data;
        this.setState({data_tssr_boq : dataTech.data, boq_type : dataTech.data.tech_boq_type});
        if(res.data.data !== undefined){
          this.setState({data_tssr_boq_sites : dataTech.data.tssr_site, list_version : new Array(parseInt(dataTech.data.version)+1).fill("0")}, () => {
            this.viewTechBoqDataISAT(dataTech.data.tssr_site);
            // this.getDataSystemKey(dataTech.data.tssr_site);
          });
        }
      }
    })
  }

  viewTechBoqDataISAT(data_sites){
    if(data_sites !== undefined && data_sites.length !== 0){
      const dataTechItem = data_sites.map( e => e.siteItem).reduce((l, n) => l.concat(n), []);
      const dataTechItemNSVC = dataTechItem;
      let techItemUniqID = [...new Set(dataTechItemNSVC.map(({ pp_id }) => pp_id))];
      let techItemUniqType = [];
      let techItemUniqName = [];
      let techItemUniq_ID = [];
      for(let i = 0; i < techItemUniqID.length; i++){
        let itemTechFind = dataTechItemNSVC.find(e => e.pp_id === techItemUniqID[i]);
        techItemUniqType.push(itemTechFind.product_type);
        techItemUniqName.push(itemTechFind.product_name);
        techItemUniq_ID.push(itemTechFind.id_pp_doc)
      }
      const Header = {"type" : techItemUniqType, "name" : techItemUniqName, "pp_id" : techItemUniqID, "id_pp_doc" : techItemUniq_ID};
      this.setState({view_tech_header_table : Header}, () => {
        this.dataViewPagination(data_sites);
      });
    }else{
      this.setState({action_status : "failed", action_message : "There is error, please select other BOQ Implementation"});
    }
  }

  // async getDataSystemKey(array_dataSite){
  //   let arraySite = array_dataSite.filter(ads => ads.project_po !== undefined && ads.project_po !== null && ads.project_po.length !== 0);
  //   let array_or = [];
  //   let dataSite =[];
  //   let getNumberPage = Math.ceil(arraySite.length / 10);
  //   for(let i = 0 ; i < getNumberPage; i++){
  //     let DataPaginationSite = arraySite.slice(i * 10, (i+1)*10);
  //     DataPaginationSite.map(ais => array_or.push('{"Project_PO" : "'+ais.project_po+'", "CD_Info_Project_Name" : "'+ais.project_name+'","Site_Info_SiteID_NE_Actual" : "'+ais.site_id+'"}'))
  //     let arrayIdSite = array_or.join(', ');
  //     let where_id_Site = '?where={"$or": ['+arrayIdSite+']}&projection={"Project_PO":1,"CD_Info_Project_Name":1,"Site_Info_SiteID_NE_Actual":1,"CD_Info_System_Key":1}';
  //     let resSite = await getDatafromAPIISAT('/custdel_op'+where_id_Site);
  //     if(resSite !== undefined){
  //       if(resSite.data !== undefined){
  //         dataSite = dataSite.concat(resSite.data._items);
  //       }
  //     }
  //   }
  //   this.setState({ data_from_cd:dataSite});
  //   // const getData = await this.getDatafromAPIISAT()
  // }

  dataViewPagination(dataTechView){
    let perPage = this.state.perPage;
    let dataTechPage = [];
    if(perPage !== dataTechView.length){
      let pageNow = this.state.activePage-1;
      dataTechPage = dataTechView.slice(pageNow * perPage, (pageNow+1)*perPage);
    }else{
      dataTechPage = dataTechView;
    }
    this.setState({data_tssr_boq_sites_pagination : dataTechPage})
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.dataViewPagination(this.state.data_tssr_boq_sites);
    });
  }

  async updateTechBoq(e){
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
      "itemPackage": true,
      "tssrBoqNote": "TSSR Updated",
      "sites_data" : dataChecked.tech_data
    };
    let patchTech = await patchDatatoAPINODE('/tssr/updateTssr/'+this.state.data_tssr_boq._id, dataPatch, this.props.dataLogin.token);
    if(patchTech.data !== undefined){
      this.setState({action_status : 'success'});
    }else{
      this.setState({action_status : 'failed'});
    }
    this.toggleLoading();
  }

  handleChangeVersion(e){
    const value = e.target.value;
    this.setState({version_selected : value}, () => {
      if(value !== this.state.data_tssr_boq.version){
        this.getVersionTechBoqData(this.props.match.params.id, value);
      }else{
        this.getTechBoqData(this.props.match.params.id);
      }
    });
  }

  getVersionTechBoqData(_id_tech, ver){
    getDatafromAPINODE('/techBoq/'+_id_tech+'/ver/'+ver+'?package=1', this.props.dataLogin.token).then(res => {
      if(res.data !== undefined){
        const dataTech = res.data;
        if(res.data.data !== undefined){
          this.setState({data_tssr_boq_sites_version : dataTech.data.techBoqSiteVersion}, () => {
            this.viewTechBoqDataVersion(dataTech.data.techBoqSiteVersion);
          });
        }
      }
    })
  }

  viewTechBoqDataVersion(data_sites){
    if(data_sites !== undefined && data_sites.length !== 0){
      const dataTechItem = data_sites.map( e => e.siteItemVersion).reduce((l, n) => l.concat(n), []);
      const dataTechItemNSVC = dataTechItem;
      let techItemUniqID = [...new Set(dataTechItemNSVC.map(({ pp_id }) => pp_id))];
      let techItemUniqType = [];
      let techItemUniqName = [];
      let techItemUniq_ID = [];
      for(let i = 0; i < techItemUniqID.length; i++){
        let itemTechFind = dataTechItemNSVC.find(e => e.pp_id === techItemUniqID[i]);
        techItemUniqType.push(itemTechFind.product_type);
        techItemUniqName.push(itemTechFind.product_name);
        techItemUniq_ID.push(itemTechFind.id_pp_doc);
      }
      const Header = {"type" : techItemUniqType, "name" : techItemUniqName, "pp_id" : techItemUniqID, 'id_pp_doc' : techItemUniq_ID};
      this.setState({view_tech_header_table : Header}, () => {
        this.dataViewPagination(data_sites);
      });
    }else{
      this.setState({action_status : "failed", action_message : "There is error, please select other BOQ Implementation"});
    }
  }

  async approvalTechnical(e){
    let currValue = e.currentTarget.value;
    if(currValue !== undefined){
      currValue = parseInt(currValue);
    }
    let patchData = await patchDatatoAPINODE('/techBoq/approval/'+this.state.data_tssr_boq._id, {"operation":currValue}, this.props.dataLogin.token)
    if(patchData.data !== undefined){
      this.setState({action_status : 'success'});
    }else{
      if(patchData.response !== undefined){
        if(patchData.response.data !== undefined){
          this.setState({action_status : 'failed', action_message : patchData.response.data.error })
        }else{
          this.setState({action_status : 'failed'});
        }
      }else{
        this.setState({action_status : 'failed'});
      }
    }
  }

  saveProjecttoDB(){
    const dataTech = this.state.API_Tech;
    const data_Project = {
      "id_project_doc" : this.state.project_select,
      "project_name" : this.state.project_name_selected
    }
    this.patchDatatoAPI('/boq_tech_op/'+dataTech._id, data_Project, dataTech._etag).then( res => {
      if(res !== undefined){
        if(res.data !== undefined){
          this.setState({action_message : "Your project have been assign to BOQ Implementation ", action_status : 'success'}, () => {
            setTimeout(function(){ window.location.reload(); }, 3000);
          });
        }
      }
    })
  }

  checkValue(props){
    //Swap undefined to null
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
    //Swap undefined or null to ""
    if( typeof props == 'undefined' || props == null ) {
      return "";
    }else{
      return props;
    }
  }

  comparerDiffSites(otherArray){
    //Compare Different between 2 array
    return function(current){
      return otherArray.filter(function(other){
        return other.site_id == current.site_id
      }).length == 0;
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

  componentDidMount(){
    this.getTechBoqData(this.props.match.params.id);

  }


  selectProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_select : value, project_name_selected : text});
  }

  fileHandlerTechnical = (event) => {
    this.setState({loading_checking : 'Checking'});
    this.setState({waiting_status : 'loading'});
    let fileObj = event.target.files[0];
    const date = new Date();
    const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    if(fileObj !== undefined){
      ExcelRenderer(fileObj, (err, rest) => {
        if(err){
          this.setState({loading_checking : null});
          console.log(err);
        }
        else{
          this.setState({action_status : null, action_message : "", data_format : []})
          this.ArrayEmptytoNull(rest.rows, DateNow);
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
      rowsTech: newDataXLS
    });
    this.checkingFormatTSSR(newDataXLS);
  }

  async checkingFormatTSSR(rowsTech){
    this.toggleLoading();
    let dataCheck = {
      "siteIdentifier": "site_id",
      "itemPackage": true,
      "techBoqData" : rowsTech
    }
    if(this.state.boq_type === "MW"){
      dataCheck = {...dataCheck, ...{"techBoqType":"MW"}}
    }
    let urlCheck = '/tssr/checkTssr';
    // if(this.state.format_uploader === "Vertical"){
    //   urlCheck = 'bamidapi/tssr/checkTssrVertical'
    // }
    let postCheck = await postDatatoAPINODE(urlCheck, dataCheck, this.props.dataLogin.token);
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

  handleChangeFormatUploader = (e) => {
    let format = e.target.value;
    this.setState({ format_uploader : format });
  }

  saveTechBoq = async () => {
    this.toggleLoading();
    const dataChecked = this.state.result_check_tssr;
    const projectData = {
		    "id_project_doc": this.state.project_select,
		    "project_name": this.state.project_name_selected,
	  }
    const dataPost = {
      "itemPackage": true,
      "tech_boq_info" : projectData,
      "sites_data" : dataChecked.tech_data,
      "configList" : dataChecked.configList
    }
    console.log("dataPost", JSON.stringify(dataPost));
    let postTech = await postDatatoAPINODE('/techBoq/createTechBoqData', dataPost, this.props.dataLogin.token);
    if(postTech.data !== undefined){
      this.setState({action_status : 'success'}, () => {
        setTimeout(function(){ this.setState({ redirectSign : postTech.data.techBoq._id}); }.bind(this), 3000);
      });
    }else{
      this.setState({action_status : 'failed'});
    }
    this.toggleLoading();
  }

  handleChangeOptionView(){
    let value = 'only_filled';
    if(this.state.option_tssr_header_view === 'only_filled'){
      this.setState({option_tssr_header_view : 'all'});
    }else{
      this.setState({option_tssr_header_view : 'only_filled'});
    }
  }

  handleChangeShow = (e) => {
    let show = e.target.value;
    this.setState({ perPage : show}, () => {
      this.dataViewPagination(this.state.data_item);
    });
  }

  handleChangeVerComment(e){
    const value = e.target.value;
    this.setState({note_version : value});
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

  exportTechnical = async () => {
    const wb = new Excel.Workbook()
    const ws = wb.addWorksheet()

    const dataTech = this.state.data_tssr_boq;
    const dataSites = this.state.data_tssr_boq_sites;
    const dataHeader = this.state.view_tech_header_table;
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

    const DocumentNo = ws.mergeCells('F4:I4');
    ws.getCell('F4').value = 'Document No.';
    ws.getCell('F4').font  = { size: 8 };
    ws.getCell('F4').alignment  = {vertical: 'top', horizontal: 'left' };
    ws.getCell('F4').border = {top: {style:'thin'}, left: {style:'thin'}, right: {style:'thin'} };

    const DocumentNum = ws.mergeCells('F5:I5');
    ws.getCell('F5').value = dataTech.no_tech_boq;
    ws.getCell('F5').alignment  = {horizontal: 'left' };
    ws.getCell('F5').border = {left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

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

    const revStatus = dataTech.rev !== 'A' ? "PA" : "A";

    const revDocNum = ws.mergeCells('H7:I7');
    ws.getCell('H7').value = dataTech.version;
    ws.getCell('H7').alignment  = {horizontal: 'left' };
    ws.getCell('H7').border = {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };

    ws.mergeCells('A9:I9');
    ws.getCell('A9').value = 'BOQ Implementation';
    ws.getCell('A9').font  = { size: 14, bold : true };
    ws.getCell('A9').alignment  = {vertical: 'middle', horizontal: 'center' };
    ws.getCell('A9').border = {bottom: {style:'double'} };

    ws.addRow(["Project",": "+dataTech.project_name,"","","","", "", "",""]);
    ws.addRow(["Created On",": "+convertDateFormatfull(dataTech.created_on),"","","","", "Updated On", convertDateFormatfull(dataTech.updated_on),""]);
    ws.mergeCells('B10:C10');
    ws.mergeCells('B11:C11');
    ws.mergeCells('B12:C12');
    ws.mergeCells('H10:I10');
    ws.mergeCells('H11:I11');
    ws.mergeCells('H12:I12');


    if(this.checkValuetoString(dataTech.note_1).length !== 0 || this.checkValuetoString(dataTech.note_2).length !== 0){
      let getlastnullrow = ws.lastRow._number+1;
      ws.mergeCells('B'+(getlastnullrow)+':C'+(getlastnullrow));
      ws.getCell('A'+(getlastnullrow)).value = dataTech.note_name_1;
      ws.getCell('B'+(getlastnullrow)).value = dataTech.note_1;
      ws.mergeCells('H'+(getlastnullrow)+':I'+(getlastnullrow));
      ws.getCell('G'+(getlastnullrow)).value = dataTech.note_name_2;
      ws.getCell('H'+(getlastnullrow)).value = dataTech.note_2;
    }
    if(this.checkValuetoString(dataTech.note_3).length !== 0 || this.checkValuetoString(dataTech.note_4).length !== 0){
      let getlastnullrow = ws.lastRow._number+1;
      ws.mergeCells('B'+(getlastnullrow)+':C'+(getlastnullrow));
      ws.getCell('A'+(getlastnullrow)).value = dataTech.note_name_3;
      ws.getCell('B'+(getlastnullrow)).value = dataTech.note_3;
      ws.mergeCells('H'+(getlastnullrow)+':I'+(getlastnullrow));
      ws.getCell('G'+(getlastnullrow)).value = dataTech.note_name_4;
      ws.getCell('H'+(getlastnullrow)).value = dataTech.note_4;
    }

    ws.addRow([""]);

    const rowHeader1 = ["",""].concat(dataHeader.config_group_type_header.map(e => e));
    const rowHeader2 = ["Tower ID","Tower Name"].concat(dataHeader.config_group_header.map(e => e));
    let getlastrowHeaderSum = ws.lastRow._number;
    ws.addRow(rowHeader1);
    let getlastrowHeader1 = ws.lastRow._number;
    for(let i = 3; i < rowHeader1.length+1; i++){
      ws.getCell(this.numToSSColumn(i)+getlastrowHeader1.toString()).fill = {
        type : 'pattern',
        pattern : 'solid',
        fgColor : {argb:'7F81C784'}
      }
    }
    ws.addRow(rowHeader2);
    let getlastrowHeader2 = ws.lastRow._number;
    for(let i = 1; i < rowHeader2.length+1; i++){
      ws.getCell(this.numToSSColumn(i)+getlastrowHeader2.toString()).fill = {
        type : 'pattern',
        pattern : 'solid',
        fgColor : {argb:'FF0ACD7D'}
      }
    }

    for(let i = 0; i < dataSites.length ; i++){
      ws.addRow([ dataSites[i].site_id, dataSites[i].site_name].concat(dataSites[i].siteItemConfig.map(e => e.qty)));
    }

    const techFormat = await wb.xlsx.writeBuffer()
    saveAs(new Blob([techFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' Report.xlsx')
  }

  toggleLoading(){
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  exportFormatTechnical = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }

    const header_config = this.state.view_tech_all_header_table;

    let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info"];
    let HeaderRow2 = ["tower_id","program", "sow", "priority"];

    header_config.config_group_type_header.map(e => HeaderRow1 = HeaderRow1.concat([e, e]));
    header_config.config_group_header.map(e => HeaderRow2 = HeaderRow2.concat([e, "qty"]));

    ws.addRow(HeaderRow1);
    ws.addRow(HeaderRow2);
    for(let i = 0; i < dataSites.length ; i++){
      let qtyConfig = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < header_config.config_group_header.length; j++ ){
          let dataConfigIdx = dataSites[i].siteItemConfigVersion.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
          if(dataConfigIdx !== undefined){
            qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, dataConfigIdx.qty]);
          }else{
            qtyConfig = qtyConfig.concat([null, null]);
          }
        }
      }else{
        for(let j = 0; j < header_config.config_group_header.length; j++ ){
          let dataConfigIdx = dataSites[i].siteItemConfig.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
          if(dataConfigIdx !== undefined){
            qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, dataConfigIdx.qty]);
          }else{
            qtyConfig = qtyConfig.concat([null, null]);
          }
        }
      }
      ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].priority].concat(qtyConfig));
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' Uploader Template.xlsx');
  }

  exportFormatTechnicalCommercial = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }

    const header_config = this.state.view_tech_all_header_table;

    let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info"];
    let HeaderRow2 = ["tower_id","program", "sow", "priority"];

    header_config.config_group_type_header.map(e => HeaderRow1 = HeaderRow1.concat([e, e]));
    header_config.config_group_header.map(e => HeaderRow2 = HeaderRow2.concat([e, "qty_commercial"]));

    ws.addRow(HeaderRow1);
    ws.addRow(HeaderRow2);
    for(let i = 0; i < dataSites.length ; i++){
      let qtyConfig = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < header_config.config_group_header.length; j++ ){
          let dataConfigIdx = dataSites[i].siteItemConfigVersion.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
          if(dataConfigIdx !== undefined){
            qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, dataConfigIdx.qty_commercial]);
          }else{
            qtyConfig = qtyConfig.concat([null, null]);
          }
        }
      }else{
        for(let j = 0; j < header_config.config_group_header.length; j++ ){
          let dataConfigIdx = dataSites[i].siteItemConfig.find(e => e.config_group === header_config.config_group_header[j] && e.config_group_type === header_config.config_group_type_header[j]);
          if(dataConfigIdx !== undefined){
            qtyConfig = qtyConfig.concat([dataConfigIdx.config_id, dataConfigIdx.qty_commercial]);
          }else{
            qtyConfig = qtyConfig.concat([null, null]);
          }
        }
      }
      ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].priority].concat(qtyConfig));
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' Uploader Commercial Template.xlsx');
  }

  getDataCD(site_id, project_po, project){
    const dataCDIdx = this.state.data_from_cd.find(e => e.CD_Info_Project_Name === project && e.Site_Info_SiteID_NE_Actual === site_id && e.Project_PO === project_po);
    if(dataCDIdx !== undefined){
      return dataCDIdx.CD_Info_System_Key
    }else{
      return null
    }
  }

  exportTechnicalHorizontal = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }

    const header_config = this.state.view_tech_header_table;

    if(this.state.boq_type === "MW"){
      let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info"];
      let HeaderRow2 = ["link_id" , "region", "region_fe", "program", "batch", "site_id", "site_name", "ne_id", "site_id_fe", "site_name_fe", "fe_id",  "new_config", "wp_id"];

      header_config.type.map(e => HeaderRow1.push(e));
      header_config.pp_id.map((e, i) => HeaderRow2.push(e +" /// "+ header_config.name[i]));

      ws.addRow(HeaderRow1);
      ws.addRow(HeaderRow2);
    }else{
      let HeaderRow1 = [ "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info"];
      let HeaderRow2 = ["region", "program", "batch", "site_id", "site_name", "ne_id", "new_config", "wp_id"];

      header_config.type.map(e => HeaderRow1.push(e));
      header_config.pp_id.map((e, i) => HeaderRow2.push(e +" /// "+ header_config.name[i]));

      ws.addRow(HeaderRow1);
      ws.addRow(HeaderRow2);
    }

    for(let i = 0; i < dataSites.length ; i++){
      let qtyItem = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < header_config.pp_id.length; j++ ){
          let dataItemIdx = dataSites[i].siteItemVersion.find(e => e.pp_id === header_config.pp_id[j]);
          if(dataItemIdx !== undefined){
            qtyItem.push(dataItemIdx.qty);
          }else{
            qtyItem.push(null);
          }
        }
      }else{
        for(let j = 0; j < header_config.pp_id.length; j++ ){
          let dataItemIdx = dataSites[i].siteItem.find(e => e.pp_id === header_config.pp_id[j]);
          if(dataItemIdx !== undefined){
            qtyItem.push(dataItemIdx.qty);
          }else{
            qtyItem.push(null);
          }
        }
      }
      if(this.state.boq_type === "MW"){
        ws.addRow([dataSites[i].link_id,dataSites[i].region,dataSites[i].region_fe, dataSites[i].program, dataSites[i].batch, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].ne_id,dataSites[i].site_id_fe, dataSites[i].site_name_fe, dataSites[i].fe_id, dataSites[i].new_config, dataSites[i].wp_id].concat(qtyItem));
      }else{
        ws.addRow([dataSites[i].region, dataSites[i].program, dataSites[i].batch, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].ne_id, dataSites[i].new_config, dataSites[i].wp_id].concat(qtyItem));
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tssr_boq+'.xlsx');
  }

  exportFormatTechnicalHorizontal = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }

    const header_config = this.state.view_tech_header_table;

    if(this.state.boq_type === "MW"){
      let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info"];
      let HeaderRow2 = ["region", "region_fe", "program", "batch", "site_id", "site_name", "ne_id", "site_id_fe", "site_name_fe", "fe_id",  "new_config", "wp_id"];

      header_config.type.map(e => HeaderRow1.push(e));
      header_config.pp_id.map((e, i) => HeaderRow2.push(e +" /// "+ header_config.name[i]));

      ws.addRow(HeaderRow1);
      ws.addRow(HeaderRow2);
    }else{
      let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info"];
      let HeaderRow2 = ["region", "program", "batch", "site_id", "site_name", "ne_id", "new_config", "wp_id"];

      header_config.type.map(e => HeaderRow1.push(e));
      header_config.pp_id.map((e, i) => HeaderRow2.push(e +" /// "+ header_config.name[i]));

      ws.addRow(HeaderRow1);
      ws.addRow(HeaderRow2);
    }
    for(let i = 0; i < dataSites.length ; i++){
      let qtyItem = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < header_config.pp_id.length; j++ ){
          let dataItemIdx = dataSites[i].siteItemVersion.find(e => e.pp_id === header_config.pp_id[j]);
          if(dataItemIdx !== undefined){
            qtyItem.push(dataItemIdx.qty);
          }else{
            qtyItem.push(null);
          }
        }
      }else{
        for(let j = 0; j < header_config.pp_id.length; j++ ){
          let dataItemIdx = dataSites[i].siteItem.find(e => e.pp_id === header_config.pp_id[j]);
          if(dataItemIdx !== undefined){
            qtyItem.push(dataItemIdx.qty);
          }else{
            qtyItem.push(null);
          }
        }
      }
      if(this.state.boq_type === "MW"){
        ws.addRow([dataSites[i].region,dataSites[i].region_fe, dataSites[i].program, dataSites[i].batch, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].ne_id,dataSites[i].site_id_fe, dataSites[i].site_name_fe, dataSites[i].fe_id, dataSites[i].new_config, dataSites[i].wp_id].concat(qtyItem));
      }else{
        ws.addRow([dataSites[i].region, dataSites[i].program, dataSites[i].batch, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].ne_id, dataSites[i].new_config, dataSites[i].wp_id].concat(qtyItem));
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tssr_boq+' Format.xlsx');
  }

  async getPPandMaterialTSSR(array_id_pp_doc){
    let arrayIDPPDOC = array_id_pp_doc;
    let array_or = [];
    let dataPP =[];
    let getNumberPage = Math.ceil(arrayIDPPDOC.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPP = arrayIDPPDOC.slice(i * 25, (i+1)*25);
      let arrayIdppdoc = DataPaginationPP.join('", "');
      let projection = '&v={"pp_id":1,"product_name":1,"product_type":1,"physical_group":1,"materials":1}'
      let where_id_pp_doc = '?q={"_id" : {"$in": ["'+arrayIdppdoc+'"]}}';
      let resPP = await getDatafromAPINODE('/productpackage'+where_id_pp_doc, this.state.tokenUser);
      if(resPP !== undefined){
        if(resPP.data !== undefined){
          dataPP = dataPP.concat(resPP.data.data);
        }
      }
    }
    return dataPP
    // const getData = await this.getDatafromAPIISAT()
  }

  exportImplementationWithMaterial = async () =>{
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }

    // const header_config = this.state.view_tech_all_header_table;
    const header_pp = this.state.view_tech_header_table;
    if(this.state.boq_type === "MW"){
      let HeaderRow1 = ["project_name", "tssr_id", "region","region_fe", "site_id", "site_name","site_id_fe", "site_name_fe", "wp_id", "pp_id", "product_name", "product_type", "physical_group", "product_qty", "program", "material_id", "material_name", "uom", "material_qty", "material_type"];
      ws.addRow(HeaderRow1);
    }else{
      let HeaderRow1 = ["project_name", "tssr_id", "region", "site_id", "site_name", "wp_id", "pp_id", "product_name", "product_type", "physical_group", "product_qty", "program", "material_id", "material_name", "uom", "material_qty", "material_type"];
      ws.addRow(HeaderRow1);
    }

    const dataPPMM = await this.getPPandMaterialTSSR(header_pp.id_pp_doc);

    if(this.state.boq_type === "MW"){
      for(let i = 0; i < dataSites.length ; i++){
        let qtyItem = []
        if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
          for(let j = 0; j < dataSites[i].siteItemVersion.length; j++ ){
            let dataSPPIdx = dataSites[i].siteItemVersion[j];
            let dataPPDb = dataPPMM.find(dp => dp._id === dataSPPIdx.id_pp_doc);
            if(dataPPDb !== undefined){
              for(let k = 0; k < dataPPDb.materials.length; k++){
                let dataMatSIdx = dataPPDb.materials[k];
                const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].region_fe, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].site_id_fe, dataSites[i].site_name_fe, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program, dataMatSIdx.material_id, dataMatSIdx.material_name, dataMatSIdx.uom, dataSPPIdx.qty*dataMatSIdx.qty, dataMatSIdx.material_type];
                ws.addRow(rowData);
              }
            }else{
              const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].region_fe, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].site_id_fe, dataSites[i].site_name_fe, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program];
              ws.addRow(rowData);
            }
          }
        }else{
          for(let j = 0; j < dataSites[i].siteItem.length; j++ ){
            let dataSPPIdx = dataSites[i].siteItem[j];
            let dataPPDb = dataPPMM.find(dp => dp._id === dataSPPIdx.id_pp_doc);
            if(dataPPDb !== undefined){
              for(let k = 0; k < dataPPDb.materials.length; k++){
                let dataMatSIdx = dataPPDb.materials[k];
                const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].region_fe, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].site_id_fe, dataSites[i].site_name_fe, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program, dataMatSIdx.material_id, dataMatSIdx.material_name, dataMatSIdx.uom, dataSPPIdx.qty*dataMatSIdx.qty, dataMatSIdx.material_type];
                ws.addRow(rowData);
              }
            }else{
              const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].region_fe, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].site_id_fe, dataSites[i].site_name_fe, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program];
              ws.addRow(rowData);
            }
          }
        }
      }
    }else{
      for(let i = 0; i < dataSites.length ; i++){
        let qtyItem = []
        if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
          for(let j = 0; j < dataSites[i].siteItemVersion.length; j++ ){
            let dataSPPIdx = dataSites[i].siteItemVersion[j];
            let dataPPDb = dataPPMM.find(dp => dp._id === dataSPPIdx.id_pp_doc);
            if(dataPPDb !== undefined){
              for(let k = 0; k < dataPPDb.materials.length; k++){
                let dataMatSIdx = dataPPDb.materials[k];
                const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program, dataMatSIdx.material_id, dataMatSIdx.material_name, dataMatSIdx.uom, dataSPPIdx.qty*dataMatSIdx.qty, dataMatSIdx.material_type];
                ws.addRow(rowData);
              }
            }else{
              const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program];
              ws.addRow(rowData);
            }
          }
        }else{
          for(let j = 0; j < dataSites[i].siteItem.length; j++ ){
            let dataSPPIdx = dataSites[i].siteItem[j];
            let dataPPDb = dataPPMM.find(dp => dp._id === dataSPPIdx.id_pp_doc);
            if(dataPPDb !== undefined){
              for(let k = 0; k < dataPPDb.materials.length; k++){
                let dataMatSIdx = dataPPDb.materials[k];
                const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program, dataMatSIdx.material_id, dataMatSIdx.material_name, dataMatSIdx.uom, dataSPPIdx.qty*dataMatSIdx.qty, dataMatSIdx.material_type];
                ws.addRow(rowData);
              }
            }else{
              const rowData = [dataSPPIdx.project_name, dataSPPIdx.no_tssr_boq, dataSites[i].region, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].wp_id, dataSPPIdx.pp_id, dataSPPIdx.product_name, dataSPPIdx.product_type, dataSPPIdx.physical_group, dataSPPIdx.qty,dataSites[i].program];
              ws.addRow(rowData);
            }
          }
        }
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' With Material.xlsx');
    this.toggleLoading();
  }

  exportFormatTechnicalVerticalUploader = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }
    const dataHeader = this.state.view_tech_header_table;

    let ppIdRow = ["tower_id", "program", "sow", "config_group", "config_id", "config_group_type", "qty"];

    ws.addRow(ppIdRow);
    for(let i = 0; i < dataSites.length ; i++){
      let qtyConfig = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < dataSites[i].siteItemConfigVersion.length; j++ ){
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfigVersion[j].config_group, dataSites[i].siteItemConfigVersion[j].config_id, dataSites[i].siteItemConfigVersion[j].config_group_type, dataSites[i].siteItemConfigVersion[j].qty]);
        }
      }else{
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfig[j].config_group, dataSites[i].siteItemConfig[j].config_id, dataSites[i].siteItemConfig[j].config_group_type, dataSites[i].siteItemConfig[j].qty]);
        }
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' Vertical Uploader.xlsx');
  }

  exportFormatTechnicalVerticalUploaderCommercial = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }
    const dataHeader = this.state.view_tech_header_table;

    let ppIdRow = ["tower_id", "program", "sow", "config_group", "config_id", "config_group_type", "qty_commercial"];

    ws.addRow(ppIdRow);
    for(let i = 0; i < dataSites.length ; i++){
      let qtyConfig = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < dataSites[i].siteItemConfigVersion.length; j++ ){
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfigVersion[j].config_group, dataSites[i].siteItemConfigVersion[j].config_id, dataSites[i].siteItemConfigVersion[j].config_group_type, dataSites[i].siteItemConfigVersion[j].qty_commercial]);
        }
      }else{
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          ws.addRow([dataSites[i].site_id, dataSites[i].site_name, dataSites[i].sow, dataSites[i].siteItemConfig[j].config_group, dataSites[i].siteItemConfig[j].config_id, dataSites[i].siteItemConfig[j].config_group_type, dataSites[i].siteItemConfig[j].qty_commercial]);
        }
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' Vertical Uploader.xlsx');
  }

  exportFormatTechnicalVertical = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tssr_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tssr_boq_sites_version;
    }else{
      dataSites = this.state.data_tssr_boq_sites;
    }
    const dataHeader = this.state.view_tech_header_table;

    let ppIdRow = ["tower_id", "tower_name", "Type", "Configuration BOQ", "SAP NUmber", "Qty"];

    ws.addRow(ppIdRow);
    for(let i = 0; i < dataSites.length ; i++){
      let qtyConfig = []
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        for(let j = 0; j < dataSites[i].siteItemConfigVersion.length; j++ ){
          ws.addRow([dataSites[i].site_id, dataSites[i].site_name, dataSites[i].siteItemConfigVersion[j].config_type, dataSites[i].siteItemConfigVersion[j].config_id, dataSites[i].siteItemConfigVersion[j].sap_number, dataSites[i].siteItemConfigVersion[j].qty]);
        }
      }else{
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          ws.addRow([dataSites[i].site_id, dataSites[i].site_name, dataSites[i].siteItemConfig[j].config_type, dataSites[i].siteItemConfig[j].config_id, dataSites[i].siteItemConfig[j].sap_number, dataSites[i].siteItemConfig[j].qty]);
        }
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'BOQ Implementation '+dataTech.no_tech_boq+' Vertical.xlsx');
  }

    render() {
      if(this.state.redirectSign !== false){
        return (<Redirect to={'/detail-BOQ Implementation/'+this.state.redirectSign} />);
      }

      function AlertProcess(props){
        const alert = props.alertAct;
        const message = props.messageAct;
        if(alert == 'failed'){
          return (
            <div className="alert alert-danger" role="alert">
              {message.length !== 0 ? message : 'Sorry, there was an error when we tried, please reload your page and try again try again'}
            </div>
          )
        }else{
          if(alert == 'success'){
            return (
              <div className="alert alert-success" role="alert">
                {message}
                Your Action was Success, please Reload your page
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
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  {this.state.data_item.length === 0 && this.state.API_Tech.no_boq_tech === undefined && this.props.match.params.id == undefined ? (
                    <React.Fragment>
                      <span>Create BOQ Implementation</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span style={{marginTop:'3px', position:'absolute'}}>Detail BOQ Implementation {this.state.boq_type === "MW" && 'Transmission'}</span>
                      <div className="card-header-actions" style={{display:'inline-flex'}}>
                        <Col>
                          <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}}>
                            <DropdownToggle caret color="secondary" size="sm">
                              <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download BOQ File
                            </DropdownToggle>
                            {this.state.data_tssr_boq !== null && (
                              <DropdownMenu>
                                <DropdownItem header> BOQ File</DropdownItem>
                                {/* }<DropdownItem onClick={this.exportTechnical}> <i className="fa fa-file-text-o" aria-hidden="true"></i> TSSR Report</DropdownItem> */}
                                <DropdownItem onClick={this.exportTechnicalHorizontal}> <i className="fa fa-file-text-o" aria-hidden="true"></i> BOQ Implementation Horizontal</DropdownItem>
                                <DropdownItem onClick={this.exportFormatTechnicalHorizontal}> <i className="fa fa-file-text-o" aria-hidden="true"></i> BOQ Implementation Format</DropdownItem>
                                <DropdownItem onClick={this.exportImplementationWithMaterial}> <i className="fa fa-file-text-o" aria-hidden="true"></i> BOQ Implementation With Material</DropdownItem>
                              </DropdownMenu>
                            )}
                          </Dropdown>
                        </Col>
                        {(this.state.userRole.includes('BAM-Engineering') === true || this.state.userRole.includes('BAM-Project Controller') === true || this.state.userRole.includes('Admin') === true ) && (
                        <Col>
                          <Button block color="primary" onClick={this.toggleUpload} id="toggleCollapse1" size="sm">
                            Update
                          </Button>
                        </Col>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <React.Fragment>
                  <div>

                    {this.state.data_item.length === 0 && this.state.API_Tech.no_boq_tech === undefined && this.props.match.params.id == undefined ? (
                      <React.Fragment>
                      <Row></Row>
                        <input type="file" onChange={this.fileHandlerTechnical.bind(this)} style={{"padding":"10px 10px 5px 10px","visiblity":"hidden"}} disable={this.state.format_uploader !== null}/>
                        <Button className="btn-success" style={{'float' : 'right',margin : '8px'}} color="success" onClick={this.saveTechBoq} disabled={this.state.action_status === 'failed' || this.state.result_check_tssr === null }>
                          {this.state.rowsTech.length == 0 ? 'Save' : this.state.result_check_tssr !== null ? 'Save' : 'Loading..'}
                        </Button>
                        <Row>
                        <Col md="4">
                          <div style={{display : 'flex', marginTop : '10px'}}>
                            <span style={{width : '135px', marginTop : '10px'}}>Project :</span>
                            <Input name="project" type="select" onChange={this.selectProject} value={this.state.project_select}>
                                <option value=""></option>
                                {this.state.project_all.map( project =>
                                  <option value={project._id}>{project.Project}</option>
                                )}
                            </Input>
                          </div>
                        </Col>
                        </Row>
                        <hr className="upload-line"></hr>
                      </React.Fragment>
                    ) : (<React.Fragment></React.Fragment>)}
                    {this.state.data_tssr_boq !== null ? (
                      <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                        <CardBody style={{padding: '5px'}}>
                          <Row>
                            <Col>
                              <div style={{display:'inline-flex'}}>
                                <span>
                                  <Input type="file" onChange={this.fileHandlerTechnical.bind(this)} />
                                </span>
                              </div>
                            </Col>
                            <Col>
                              <div>
                                <React.Fragment>
                                  <Button style={{'float' : 'right'}} color="warning" onClick={this.updateTechBoq} value="save" disabled={this.state.action_status === 'failed' || this.state.result_check_tssr === null}>
                                  <i className="fa fa-paste">&nbsp;&nbsp;</i>
                                    {this.state.rowsTech.length === 0 ? 'Save' : this.state.result_check_tssr !== null ? 'Save' : 'Loading..'}
                                  </Button>
                                </React.Fragment>
                                <Button style={{'float' : 'right',marginRight : '8px'}} color="secondary" onClick={this.updateTechBoq} value="revision" disabled={this.state.action_status === 'failed' || this.state.result_check_tssr === null}>
                                  <i className="fa fa-copy">&nbsp;&nbsp;</i>
                                  {this.state.rowsTech.length === 0 ? 'Revision' : this.state.result_check_tssr !== null ? 'Revision' : 'Loading..'}
                                </Button>
                              </div>
                            </Col>
                          </Row>
                          {this.state.API_Tech.project_name === null ? (
                          <Row style={{marginTop : '10px'}}>
                            <Col>
                              <div>
                                <Input name="project" type="select" onChange={this.selectProject} value={this.state.project_select}>
                                    <option value=""></option>
                                    {this.state.project_all.map( project =>
                                      <option value={project._id}>{project.Project}</option>
                                    )}
                                </Input>
                              </div>
                            </Col>
                            <Col>
                              <div>
                                <Button onClick={this.saveProjecttoDB}>Save Project</Button>
                              </div>
                            </Col>
                          </Row>
                          ) : ""}
                          <hr className="upload-line"></hr>
                        </CardBody>
                      </Collapse>
                    ) : (<React.Fragment></React.Fragment>)}
                  </div>

                  </React.Fragment>
                  {/*  )} */}
                  {this.state.data_tssr_boq !== null && (
                    <React.Fragment>
                    <Row>
                      <Col sm="12" md="12">
                      <table style={{width : '100%', marginBottom : '0px', marginLeft : '10px'}}>
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '23px'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>BOQ Implementation {this.state.boq_type === "MW" && 'Transmission'}</td>
                          </tr>
                          <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : {this.state.data_tssr_boq.no_tssr_boq}</td>
                          </tr>
                        </tbody>
                      </table>
                      <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" md="6">
                      <div style={{marginLeft : '10px'}}>
                      <table style={{width : '100%', marginBottom : '5px'}} className="table-header">
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Version</td>
                            <td style={{textAlign : 'left'}}>:</td>
                            {/* }<td style={{textAlign : 'left'}} colspan={2}>
                              <Input type="select" value={this.state.version_selected === null? this.state.data_tssr_boq.version : this.state.version_selected} onChange={this.handleChangeVersion} style={{width : "100px", height : "30px"}}>
                                {this.state.list_version.map((e,i) =>
                                  <option value={i}>{i}</option>
                                )}
                              </Input>
                            </td> */}
                            <td>
                              {this.state.data_tssr_boq.version}
                            </td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Created On &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{convertDateFormatfull(this.state.data_tssr_boq.created_on)}</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Created By </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{this.state.data_tssr_boq.creator[this.state.data_tssr_boq.creator.length-1].email}</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      </Col>
                      <Col sm="6" md="6">
                      <div style={{marginTop: '3px', marginLeft : '10px'}}>
                      <table style={{width : '100%', marginBottom : '5px'}} className="table-header">
                        <tbody>
                        <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Project </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{this.state.data_tssr_boq.project_name}</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Updated On </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{convertDateFormatfull(this.state.data_tssr_boq.updated_on)}</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Updated By </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{this.state.data_tssr_boq.updater[this.state.data_tssr_boq.updater.length-1].email}</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      </Col>
                    </Row>
                    </React.Fragment>
                    )}
                    {this.state.data_tssr_boq_sites.length === 0 && this.state.data_tssr_boq === null && this.props.match.params.id === undefined ? (
                    <Table hover bordered striped responsive size="sm">
                      <tbody>
                        {this.state.rowsTech.map(row =>
                          <tr>
                            {row.map(col =>
                              <td>{col}</td>
                            )}
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    ) : (<React.Fragment>
                      {(this.state.version_selected !== null && this.state.data_tssr_boq.version !== this.state.version_selected) ? (
                        <TableTechnicalItem
                          dataTechBoqSites={this.state.data_tssr_boq_sites_version}
                          TechHeader={this.state.option_tssr_header_view === 'only_filled' ?  this.state.view_tech_header_table : this.state.view_tech_all_header_table}
                          isVersion="rollback"
                          boqType={this.state.boq_type}
                          />
                      ): (
                        <TableTechnicalItem
                          dataTechBoqSites={this.state.data_tssr_boq_sites_pagination}
                          TechHeader={this.state.option_tssr_header_view === 'only_filled' ?  this.state.view_tech_header_table : this.state.view_tech_all_header_table}
                          dataCD={this.state.data_from_cd}
                          boqType={this.state.boq_type}
                        />
                      )}
                      <nav>
                        <div>
                          <Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.perPage}
                              totalItemsCount={this.state.data_tssr_boq_sites.length}
                              pageRangeDisplayed={5}
                              onChange={this.handlePageChange}
                              itemClass="page-item"
                              linkClass="page-link"
                          />
                        </div>
                      </nav>
                      </React.Fragment>
                    )}

                    </CardBody>
                  {/* <CardFooter>
                    <div style={{display : 'flex'}}>
                      {this.state.data_tssr_boq !== null && (
                      <Row>
                        <Col>
                          <Button size="sm" className="btn-success" style={{'float' : 'left'}} color="success" value={"1"} onClick={this.approvalTechnical} disabled={this.state.data_tssr_boq.approval_status !== "PRE APPROVAL"}>
                              {this.state.data_tssr_boq.approval_status === "PRE APPROVAL" ? "Submit" : "Tech Submitted"}
                          </Button>
                        </Col>
                       </Row>
                      )}
                      {(this.state.data_tssr_boq !== null && (this.state.data_tssr_boq.approval_status === "REQUEST FOR APPROVAL" || this.state.data_tssr_boq.approval_status === "APPROVED" )) && (
                      <Row>
                        <Col>
                          <Button size="sm" className="btn-success" style={{'float' : 'left', marginLeft : '10px'}} color="success" value={"2"} onClick={this.approvalTechnical} disabled={this.state.data_tssr_boq.approval_status !== 'REQUEST FOR APPROVAL'}>
                              {this.state.data_tssr_boq.approval_status === "REQUEST FOR APPROVAL" ? "Approve" : "Tech Approved"}
                          </Button>
                        </Col>
                       </Row>
                      )}
                      {this.state.data_tssr_boq !== null && (
                      <Row>
                        <Col>
                          <Button size="sm" className="btn-success" style={{'float' : 'left', marginLeft : '10px'}} color="success" value="4" onClick={this.approvalTechnical} disabled={this.state.data_tssr_boq.tssr_approval_status !== "NOT SUBMITTED"}>
                              {this.state.data_tssr_boq.tssr_approval_status === "NOT SUBMITTED" ? "Submit to TSSR" : "TSSR Submitted"}
                          </Button>
                        </Col>
                       </Row>
                      )}
                    </div>
                  </CardFooter> */}
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
                {this.state.loading_checking !== null ? this.state.loading_checking : "Loading..."}
              </div>
              <div style={{textAlign : 'center'}}>
                System is {this.state.loading_checking !== null ? "checking your upload file" : "processing ..."}
              </div>
              <div style={{textAlign : 'center'}}>
                {this.state.progress_count} / {this.state.progress_data}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Loading */}

          {/* Modal Delete */}
          <Modal isOpen={this.state.modal_update_info} toggle={this.toggleUpdateInfo} className={'modal-sm ' + this.props.className}>
            <ModalBody>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '15px'}}>Update this BOQ Implementation can delete Commercial BOQ related with this BOQ Implementation </span>
              </div>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '15px'}}></span>
              </div>
              <div style={{textAlign : 'center'}}>
                {this.state.submission_number_selected}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={this.updateTechBoq} value={this.state.update_type}>{this.state.update_type}</Button>
              <Button color="secondary" onClick={this.toggleUpdateInfo}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Delete */}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      dataLogin : state.loginData
    }
  }

  export default connect(mapStateToProps)(TSSRboq);
