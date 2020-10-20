import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse, Input, FormGroup, Label} from 'reactstrap';
import axios from 'axios';
import './boqTechnical.css';
import { saveAs } from 'file-saver';
import Pagination from "react-js-pagination";
import {connect} from 'react-redux';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Excel from 'exceljs';
import Select from 'react-select';
import { Redirect, Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import jsonData from './TechnicalNewFormat.js';
import responseGet from './responseJson.js';

const API_EMAIL = 'https://prod-37.westeurope.logic.azure.com:443/workflows/7700be82ef7b4bdab6eb986e970e2fc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wndx4N_qNLEZ9fpCR73BBR-5T1QHjx7xxshdyrvJ20c';
const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_ISAT = 'https://api.isat.pdb.e-dpm.com/isatapi';
const usernameISAT = 'adminbamidsuper';
const passwordISAT = 'F760qbAg2sml';

const API_URL_NODE = 'https://api2.bam-id.e-dpm.com/bamidapi';

// const Config_group_type_DEFAULT = ["General Info", "General Info", "General Info", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "SERVICE", "SERVICE", "SERVICE", "SERVICE", "SERVICE", "SERVICE", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME"]
//
// const Config_group_DEFAULT = ["TowerID", "Program Name", "SOW", "Config Cabinet", "qty", "Config Add L9", "qty", "Config Add L10", "qty", "Config Add L18", "qty", "Config Add L21", "qty", "Config BB 5212 (Reuse)", "qty", "Config UPG BW 1800", "qty", "Swapped Module/BB", "qty", "Config UPG BW 2100", "qty", "Config Radio B0 MIMO 2T2R", "qty", "Config Kit Radio B1 MIMO 2T2R", "qty", "Config Radio B1 MIMO 2T2R", "qty", "Config Kit Radio B3 MIMO 2T2R", "qty", "Config Radio B3 MIMO 2T2R", "qty", "Config Radio B1 MIMO 4T4R", "qty", "Config Radio B3 MIMO 4T4R", "qty", "Config Radio B1 + B3 DUAL BAND 2T2R", "qty", "Config Radio B1 + B3 DUAL BAND 4T4R", "qty", "Config Multi Sector", "qty", "Config Antenna", "qty", "Config Service 1", "qty", "Config Service 2", "qty", "Config Service 3", "qty", "Material 1 Power", "qty 1", "Material 2 Power", "qty 2", "Material 3 Power", "qty 3", "Material 4 Power", "qty 4", "Material 5 Power", "qty 5", "Service 1 Power Qty 1", "Service 2 Power", "qty 2", "Service 3 Power Qty 3", "Material 1 CME", "qty 1", "Material 2 CME", "qty 2", "Material 3 CME", "qty 3", "Material 4 CME", "qty 4", "Material 5 CME", "qty 5", "Service 1 CME", "SAP Number 1", "qty 1", "Service 2 CME", "SAP Number 2", "qty 2", "Service 3 CME", "SAP Number 3", "qty 3"];

const Config_group_type_DEFAULT = ["HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "HW", "SERVICE", "SERVICE", "SERVICE", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "POWER", "CME", "CME", "CME", "CME", "CME", "CME", "CME", "CME"]

const Config_group_DEFAULT = ["Config Cabinet", "Config Add L9", "Config Add L10", "Config Add L18", "Config Add L21", "Config BB 5212 (Reuse)", "Config UPG BW 1800", "Swapped Module/BB", "Config UPG BW 2100", "Config Radio B0 MIMO 2T2R", "Config Kit Radio B1 MIMO 2T2R", "Config Radio B1 MIMO 2T2R", "Config Kit Radio B3 MIMO 2T2R", "Config Radio B3 MIMO 2T2R", "Config Radio B1 MIMO 4T4R", "Config Radio B3 MIMO 4T4R", "Config Radio B1 + B3 DUAL BAND 2T2R" ,"Config Radio B1 + B3 DUAL BAND 4T4R", "Config Multi Sector", "Config Antenna", "Config Service 2", "Config Service 3", "Config Service 4", "Material 1 Power", "Material 2 Power", "Material 3 Power", "Material 4 Power", "Material 5 Power", "Service 1 Power", "Service 2 Power", "Service 3 Power", "Material 1 CME", "Material 2 CME", "Material 3 CME", "Material 4 CME", "Material 5 CME", "Service 1 CME", "Service 2 CME", "Service 3 CME"];

class TableTechnicalItem extends React.Component{
  constructor(props) {
      super(props);
  }

  filterPerProductType(product_type){
    const dataTechItem = this.props.dataTechBoqItem;
    return dataTechItem.filter(e => e.product_type === product_type);
  }

  getSummaryRow(row_data_item, region, program){
    let qtyIdx;
    const dataItemIdx = row_data_item.qty_side.filter(e => e.region === region);
    if(dataItemIdx !== undefined){
      if(program !== undefined){
        const dataItemIdxPro = dataItemIdx.find(e => e.program === program);
        if(dataItemIdxPro !== undefined){
          qtyIdx = dataItemIdxPro.qty;
        }
      }else{
        const dataItemIdxReg = dataItemIdx.find(e => e.region === region && e.program === undefined);
        if(dataItemIdxReg !== undefined){
          qtyIdx = dataItemIdxReg.qty;
        }
      }
    }
    return (
      <Fragment>
        <td>{qtyIdx}</td>
      </Fragment>
    )
  };

  render(){
    return(
      <Table hover bordered striped responsive size="sm">
        <thead>
        <tr>
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            PP Type
          </th>
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            Product Description
          </th>
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            Ordering
          </th>
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            INF Code
          </th>
          <th rowSpan="2" style={{verticalAlign : "middle"}}>
            Total
          </th>
          {this.props.TechHeader.region.map(region =>
            <Fragment>
              <th rowSpan="2">Total {region}</th>
            </Fragment>
          )}
          {this.props.TechHeader.program.map(program =>
            <Fragment>
              <th colSpan={this.props.TechHeader.region.length}>{program}</th>
            </Fragment>
          )}
        </tr>
        <tr>
          {this.props.TechHeader.program.map(program =>
            <Fragment>
              {this.props.TechHeader.region.map(region =>
                <Fragment>
                  <th>{region}</th>
                </Fragment>
              )}
            </Fragment>
          )}
        </tr>
        </thead>
        <tbody>
        {this.props.productType.map(pt =>
          this.filterPerProductType(pt).map(item =>
            <tr>
              <td>{item.product_type}</td>
              <td>{item.product_name}</td>
              <td>{item.ordering}</td>
              <td>{item.inf_code}</td>
              <td>{item.total_qty}</td>
              {this.props.TechHeader.region.map(region =>
                <Fragment>
                  {this.getSummaryRow(item, region)}
                </Fragment>
              )}
              {this.props.TechHeader.program.map(program =>
                <Fragment>
                  {this.props.TechHeader.region.map(region =>
                    <Fragment>
                      {this.getSummaryRow(item, region, program )}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </tr>
          )
        )}

        </tbody>
      </Table>
    )
  }
}

class SummaryBoq extends Component {
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
      result_check_tech: null,
      data_tech_boq : null,
      data_tech_boq_sites : [],
      data_tech_boq_summary : [],
      data_tech_boq_summary_version : [],
      data_tech_boq_summary_pagination : [],
      view_tech_header_table : {"program" : [], "region" : [], "type" : [], "name" : [], "pp_id" : []},

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
      product_type_uniq : [],
      region_selected : null,
      list_region : [],
    };
    this.toggleUpdateInfo = this.toggleUpdateInfo.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.saveTechBoq = this.saveTechBoq.bind(this);
    this.updateTechBoq = this.updateTechBoq.bind(this);
    this.approvedBoqTech = this.approvedBoqTech.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeFieldNote = this.handleChangeFieldNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeShow = this.handleChangeShow.bind(this);
    this.handleChangeOpportunity = this.handleChangeOpportunity.bind(this);
    this.handleChangeVerComment = this.handleChangeVerComment.bind(this);
    this.saveProjecttoDB = this.saveProjecttoDB.bind(this);
    this.exportFormatTechnical = this.exportFormatTechnical.bind(this);
    this.exportFormatTechnicalCommercial = this.exportFormatTechnicalCommercial.bind(this);
    this.exportFormatTechnicalNew = this.exportFormatTechnicalNew.bind(this);
    this.exportTechnicalSummaryBOQ = this.exportTechnicalSummaryBOQ.bind(this);
    this.exportFormatTechnicalVertical = this.exportFormatTechnicalVertical.bind(this);
    this.approvalTechnical = this.approvalTechnical.bind(this);
    this.handleChangeOptionView = this.handleChangeOptionView.bind(this);
    this.handleChangeFormatUploader = this.handleChangeFormatUploader.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    // this.handleChangePersonal
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

  async getDataFromAPIXL(url) {
    try {
      let respond = await axios.get(API_URL_ISAT+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: usernameISAT,
          password: passwordISAT
        }
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
      // if(this.state.modal_loading === true){
      //   this.toggleLoading();
      // }
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

  getTechBoqData(_id_tech){
    this.getDataFromAPINODE('/techBoq/'+_id_tech+'?package=1').then(res => {
      if(res.data !== undefined){
        const dataTech = res.data;
        this.setState({data_tech_boq : dataTech.data});
        if(res.data.data !== undefined){
          this.setState({data_tech_boq_sites : dataTech.data.techBoqSite, list_version : new Array(parseInt(dataTech.data.version)+1).fill("0")}, () => {
            this.viewTechBoqDataSummary(dataTech.data.techBoqSite);
            // this.viewTechBoqDataISAT(dataTech.data.techBoqSite);
          });
        }
      }
    })
  }

  viewTechBoqDataISAT(data_sites){
    if(data_sites !== undefined && data_sites.length !== 0){
      const dataTechItem = data_sites.map( e => e.siteItem).reduce((l, n) => l.concat(n), []);
      const dataTechItemNSVC = dataTechItem.filter(e => e.product_type !== "SVC");
      let techItemUniqID = [...new Set(dataTechItemNSVC.map(({ pp_id }) => pp_id))];
      let techItemUniqType = [];
      let techItemUniqName = [];
      for(let i = 0; i < techItemUniqID.length; i++){
        let itemTechFind = dataTechItemNSVC.find(e => e.pp_id === techItemUniqID[i]);
        techItemUniqType.push(itemTechFind.product_type);
        techItemUniqName.push(itemTechFind.product_name);
      }
      const Header = {"type" : techItemUniqType, "name" : techItemUniqName, "pp_id" : techItemUniqID};
      this.setState({view_tech_header_table : Header}, () => {
        this.dataViewPagination(data_sites);
      });
    }else{
      this.setState({action_status : "failed", action_message : "There is error, please select other TSSR BOQ"});
    }
  }

  viewTechBoqDataSummary(data_sites){
    if(data_sites !== undefined && data_sites.length !== 0){
      let dataSummary = [];
      const dataTechItem = data_sites.map( e => e.siteItem).reduce((l, n) => l.concat(n), []);
      const dataTechItemNSVC = dataTechItem.filter(e => e.product_type !== "SVC");
      let product_type_uniq = [...new Set(dataTechItem.map(({ product_type }) => product_type))];
      product_type_uniq.push("Service");
      let techRegionUniq = [...new Set(data_sites.map(({ region }) => region))];
      let techProgramUniq = [...new Set(data_sites.map(({ program }) => program))];
      let techServiceUniqID = [...new Set(data_sites.map(({ service_product_id }) => service_product_id))];
      let techItemUniqID = [...new Set(dataTechItemNSVC.map(({ pp_id }) => pp_id))];
      let techItemUniqType = [];
      let techItemUniqName = [];
      this.setState({list_region : techRegionUniq});
      let dataTechSitePerRegional = [];
      for(let i = 0; i < techRegionUniq.length; i++){
        let dataFilterIdx = {};
        let regionProgram = [];
        let sitesTechFilterRegion = data_sites.filter(e => e.region === techRegionUniq[i]);
        const itemTechFilterRegion = sitesTechFilterRegion.map( e => e.siteItem).reduce((l, n) => l.concat(n), []);
        dataFilterIdx["region"] = techRegionUniq[i];
        dataFilterIdx["site_list"] = sitesTechFilterRegion;
        dataFilterIdx["item_list"] = itemTechFilterRegion;
        for(let j = 0; j < techProgramUniq.length; j++){
          let regionProgramIdx = {};
          let sitesTechFilterRegionProgram = sitesTechFilterRegion.filter(e => e.program === techProgramUniq[j]);
          const itemTechFilterRegionProgram = sitesTechFilterRegionProgram.map( e => e.siteItem).reduce((l, n) => l.concat(n), []);
          regionProgramIdx["region"] = techRegionUniq[i];
          regionProgramIdx["program"] = techProgramUniq[j];
          regionProgramIdx["site_list"] = sitesTechFilterRegionProgram;
          regionProgramIdx["item_list"] = itemTechFilterRegionProgram;
          regionProgram.push(regionProgramIdx);
        }
        dataFilterIdx["region_program"] = regionProgram;
        dataTechSitePerRegional.push(dataFilterIdx);
      }
      for(let i = 0; i < techItemUniqID.length; i++){
        let dataSummaryIdx = {};
        let dataQtyRegion = [];
        let itemTechFind = dataTechItemNSVC.find(e => e.pp_id === techItemUniqID[i]);
        let itemTechFilter = dataTechItemNSVC.filter(e => e.pp_id === techItemUniqID[i]);
        dataSummaryIdx["pp_id"] = techItemUniqID[i];
        dataSummaryIdx["product_type"] = itemTechFind.product_type;
        dataSummaryIdx["product_name"] = itemTechFind.product_name;
        dataSummaryIdx["ordering"] = itemTechFind.ordering;
        dataSummaryIdx["inf_code"] = itemTechFind.inf_code;
        dataSummaryIdx["total_qty"] = itemTechFilter.reduce((a,b) => a + b.qty, 0);
        for(let j = 0; j < dataTechSitePerRegional.length; j++){
          let regionItemIdx = dataTechSitePerRegional[j];
          let qtyItmReg = (regionItemIdx.item_list.filter(e => e.pp_id === techItemUniqID[i])).reduce((a,b) => a + b.qty, 0);
          dataQtyRegion.push({"region" : techRegionUniq[j], "qty" : qtyItmReg});
          for(let k = 0; k < regionItemIdx.region_program.length; k++){
            const qtyItmRegProgram = regionItemIdx.region_program[k].item_list.filter(e => e.pp_id === techItemUniqID[i]).reduce((a,b) => a + b.qty, 0);
            dataQtyRegion.push({"region" : techRegionUniq[j], "qty" : qtyItmReg, "program" : regionItemIdx.region_program[k].program});
          }
        }
        dataSummaryIdx["qty_side"] = dataQtyRegion;
        dataSummary.push(dataSummaryIdx);
      }
      for(let i = 0; i < techServiceUniqID.length; i++){
        let dataSummaryIdx = {};
        let dataQtyRegion = [];
        let itemTechFilterSVC = data_sites.filter(e => e.service_product_id === techServiceUniqID[i]);
        dataSummaryIdx["pp_id"] = techServiceUniqID[i];
        dataSummaryIdx["product_type"] = "Service";
        dataSummaryIdx["product_name"] = itemTechFilterSVC[0].service_product_name;
        dataSummaryIdx["source_material"] = null;
        dataSummaryIdx["total_qty"] = itemTechFilterSVC.length;
        for(let j = 0; j < dataTechSitePerRegional.length; j++){
          let regionItemIdx = dataTechSitePerRegional[j];
          let qtyItmReg = regionItemIdx.site_list.filter(e => e.service_product_id === techServiceUniqID[i]).length;
          dataQtyRegion.push({"region" : techRegionUniq[j], "qty" : qtyItmReg});
          for(let k = 0; k < regionItemIdx.region_program.length; k++){
            const qtyItmRegProgram = regionItemIdx.region_program[k].site_list.filter(e => e.service_product_id === techServiceUniqID[i]).length;
            dataQtyRegion.push({"region" : techRegionUniq[j], "qty" : qtyItmReg, "program" : regionItemIdx.region_program[k].program});
          }
        }
        dataSummaryIdx["qty_side"] = dataQtyRegion;
        dataSummary.push(dataSummaryIdx);
      }
      console.log("dataSummary", dataSummary);
      const Header = {"program" : techProgramUniq, "region" : techRegionUniq};
      this.setState({view_tech_header_table : Header, data_tech_boq_summary : dataSummary, product_type_uniq : product_type_uniq}, () => {
        this.dataViewPagination(dataSummary);
      });
    }else{
      this.setState({action_status : "failed", action_message : "There is error, please select other TSSR BOQ"});
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
    this.setState({data_tech_boq_summary_pagination : dataTechPage})
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.dataViewPagination(this.state.data_tech_boq_summary);
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
    const dataChecked = this.state.result_check_tech;
    const dataPatch = {
      "revision" : revision,
      "sites_data" : dataChecked.tech_data,
      "itemPackage" : true
    }
    let patchTech = await this.patchDatatoAPINODE('/techBoq/updateTechBoqData/'+this.state.data_tech_boq._id, dataPatch);
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
      if(value !== this.state.data_tech_boq.version){
        this.getVersionTechBoqData(this.props.match.params.id, value);
      }else{
        this.getTechBoqData(this.props.match.params.id);
      }
    });
  }

  getVersionTechBoqData(_id_tech, ver){
    this.getDataFromAPINODE('/techBoq/'+_id_tech+'/ver/'+ver+'?package=1').then(res => {
      if(res.data !== undefined){
        const dataTech = res.data;
        if(res.data.data !== undefined){
          this.setState({data_tech_boq_summary_version : dataTech.data.techBoqSiteVersion}, () => {
            this.viewTechBoqDataVersion(dataTech.data.techBoqSiteVersion);
          });
        }
      }
    })
  }

  viewTechBoqDataVersion(data_sites){
    if(data_sites !== undefined && data_sites.length !== 0){
      const dataTechItem = data_sites.map( e => e.siteItemVersion).reduce((l, n) => l.concat(n), []);
      const dataTechItemNSVC = dataTechItem.filter(e => e.product_type !== "SVC");
      let techItemUniqID = [...new Set(dataTechItemNSVC.map(({ pp_id }) => pp_id))];
      let techItemUniqType = [];
      let techItemUniqName = [];
      for(let i = 0; i < techItemUniqID.length; i++){
        let itemTechFind = dataTechItemNSVC.find(e => e.pp_id === techItemUniqID[i]);
        techItemUniqType.push(itemTechFind.product_type);
        techItemUniqName.push(itemTechFind.product_name);
      }
      const Header = {"type" : techItemUniqType, "name" : techItemUniqName, "pp_id" : techItemUniqID};
      this.setState({view_tech_header_table : Header}, () => {
        this.dataViewPagination(data_sites);
      });
    }else{
      this.setState({action_status : "failed", action_message : "There is error, please select other TSSR BOQ"});
    }
  }

  async approvalTechnical(e){
    let currValue = e.currentTarget.value;
    if(currValue !== undefined){
      currValue = parseInt(currValue);
    }
    let patchData = await this.patchDatatoAPINODE('/techBoq/approval/'+this.state.data_tech_boq._id, {"operation":currValue})
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

    getBOQTechAPI(_id_Tech){
      this.setState({})
      let url = '/boq_tech_audit/'+_id_Tech+'?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}';
      if(_id_Tech == undefined){
        url = '/boq_tech_audit?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}'
      }
      this.getDatafromAPI(url).then(res => {
        if(res !== undefined){
          if(res.data.list_of_id_site !== undefined){
            this.setState({ API_Tech : res.data});
            this.getCommTechAPI(_id_Tech);
            this.setState({ API_Tech_Sites : res.data.list_of_id_site, data_item : []}, () => {
              this.viewTech(this.state.API_Tech_Sites);
            });

            if(res.data.list_of_id_site.length === 0){
              this.setState({action_status : 'failed'});
            }
            // this.getSitesTechDataAPI(res.data.list_of_id_site);
            this.setState({version_now : res.data.version, version_selected : res.data.version});
            this.getListVersion(_id_Tech);
          }else{
            this.setState({action_status : 'failed'});
          }
        }
      })
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
          this.setState({action_message : "Your project have been assign to Technical BOQ ", action_status : 'success'}, () => {
            setTimeout(function(){ window.location.reload(); }, 3000);
          });
        }
      }
    })
  }

  getCommTechAPI(_id_Tech){
    let url = '/boq_tech_audit/'+_id_Tech+'?embedded={"list_of_id_boq_comm" : 1}&projection={"list_of_id_boq_comm" : 1}';
    this.getDatafromAPI(url).then(res => {
      if(res !== undefined){
        if(res.data !== undefined){
          this.setState({list_commercial_tech : res.data.list_of_id_boq_comm}, () => {
            console.log("list_commercial_tech", this.state.list_commercial_tech);
          })
        }
      }
    })
  }

  async getAllSites(array_sites){
    let dataSites = [];
    let arrayDataSites = array_sites;
    let getNumberPage = Math.ceil(arrayDataSites.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationSites = arrayDataSites.slice(i * 25, (i+1)*25);
      let arrayIdSites = '"'+DataPaginationSites.join('", "')+'"';
      arrayIdSites = arrayIdSites.replace("&", "%26");
      let where_id_Sites = '&where={"site_id" : {"$in" : ['+arrayIdSites+']}}';
      let resSites = await this.getDatafromAPI('/site_non_page?projection={"site_id" : 1, "site_name" : 1, "_id" : 1}'+where_id_Sites);
      if(resSites !== undefined){
        if(resSites.data !== undefined){
          dataSites = dataSites.concat(resSites.data._items);
        }
      }
    }
    return dataSites;
  }

  getSitesTechDataAPI(id_Sites){
    const arraySites = '"'+id_Sites.join('", "')+'"';
    const where_id_Sites = 'where={"_id" : {"$in" : ['+arraySites+']}}';
    this.getDatafromAPI('/boq_tech_sites_non_page?'+where_id_Sites).then(res => {
        this.setState({ API_Tech_Sites : res.data._items, data_item : []}, () => {
          this.viewTech(this.state.API_Tech_Sites);
        });
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
    if(this.props.match.params.id === undefined){
      this.getProjectAll();
    }else{
      this.getTechBoqData(this.props.match.params.id);
    }
  }

  getProjectAll(){
    this.getDataFromAPIXL('/project_sorted_non_page').then( resp => {
      if(resp !== undefined){
        this.setState({project_all : resp.data._items});
      }
    })
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
    this.checkingFormatTech(newDataXLS);
  }

  async checkingFormatTech(rowsTech){
    this.toggleLoading();
    let dataCheck = {
      "siteIdentifier": "site_id",
      "itemPackage": true,
      "techBoqData" : rowsTech
    }
    let urlCheck = '/techBoq/checkTechBoqData';
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
        this.setState({result_check_tech : dataCheck});
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
    const dataChecked = this.state.result_check_tech;
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
    let postTech = await this.postDatatoAPINODE('/techBoq/createTechBoqData', dataPost);
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

    const dataTech = this.state.data_tech_boq;
    const dataSites = this.state.data_tech_boq_summary;
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
    ws.getCell('A9').value = 'TECHNICAL BOQ';
    ws.getCell('A9').font  = { size: 14, bold : true };
    ws.getCell('A9').alignment  = {vertical: 'middle', horizontal: 'center' };
    ws.getCell('A9').border = {bottom: {style:'double'} };

    ws.addRow(["Project",": "+dataTech.project_name,"","","","", "", "",""]);
    ws.addRow(["Created On",": "+dataTech.created_on,"","","","", "Updated On", dataTech.updated_on,""]);
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
    saveAs(new Blob([techFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Report.xlsx')
  }

  toggleLoading(){
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

 getListVersion(_id){
    this.getDatafromAPI('/boq_tech_rev_all?where={"id_document":"'+_id+'"}&projection={"version":1, "rev":1, "_etag" : 1}').then(res => {
      if(res !== undefined){
        this.setState({list_version : res.data._items});
      }
    })
  }

  getBOQRevAPI(_id_Tech){
    let API_Tech = Object.assign({}, this.state.API_Tech);
    this.setState({API_Tech_prev : this.state.API_Tech});
    const version = this.state.version_selected;
    const where_id_Sites = '?where={"id_document" : "'+_id_Tech+'", "version" : "'+version+'"}';
    let url = '/boq_tech_rev'+where_id_Sites;
    this.getDatafromAPI(url).then(res => {
      if(res !== undefined){
        API_Tech["note_name_1"] = this.checkValue(res.data._items[0].note_name_1);
        API_Tech["note_1"] = this.checkValue(res.data._items[0].note_1);
        API_Tech["note_name_2"] = this.checkValue(res.data._items[0].note_name_2);
        API_Tech["note_2"] = this.checkValue(res.data._items[0].note_2);
        API_Tech["note_name_3"] = this.checkValue(res.data._items[0].note_name_3);
        API_Tech["note_3"] = this.checkValue(res.data._items[0].note_3);
        API_Tech["note_name_4"] = this.checkValue(res.data._items[0].note_name_4);
        API_Tech["note_4"] = this.checkValue(res.data._items[0].note_4);
        API_Tech["version_comment"] = this.checkValue(res.data._items[0].version_comment);
        if(res.data._items[0].list_of_id_site !== undefined){
          this.setState({API_Tech : API_Tech});
          this.getSitesTechRevAPI(_id_Tech, version);
        }
      }
    })
  }

  getSitesTechRevAPI(id_boq_tech_doc, version){
    // const arraySites = '"'+id_Sites.join('", "')+'"';
    const where_id_Sites = 'where={"id_boq_tech_doc" : "'+id_boq_tech_doc+'" , "version" : "'+version+'"}';
    this.getDatafromAPI('/boq_tech_sites_rev_all?'+where_id_Sites).then(res => {
        console.log("data_format Rev Res", res);
        this.formatDataRev(res.data._items);
        this.viewTech(res.data._items);
    })
  }

  formatDataRev(dataItems){
    let dataStoreRev = [];
    for(let i = 0; i < dataItems.length; i++){
      let dataStoreRevIndex = Object.assign({}, dataItems[i]);
      // dataStoreRevIndex["created_by"] = this.state.userId;
      dataStoreRevIndex["updated_by"] = this.state.userId;
      delete dataStoreRevIndex.id_document;
      delete dataStoreRevIndex._id;
      delete dataStoreRevIndex._etag;
      delete dataStoreRevIndex._links;
      delete dataStoreRevIndex.created_on;
      delete dataStoreRevIndex.updated_on;
      dataStoreRev.push(dataStoreRevIndex);
    }
    console.log("data_format Rev", dataStoreRev);
    this.setState({data_format : dataStoreRev});
    // return dataStoreRev;
  }

  checkIsEqual(dataXLS){
    const dataTech = this.state.data_item
    const TechSiteID = dataTech.map(e => e.site_id);
    const TechPPID = dataTech[0].list_of_site_items.map(e => e.pp_id);
    const uploadSiteID = dataXLS.map( e => e[this.getIndex(dataXLS[1],'site_id')]).filter( (e,n) => n>1 && e !== null);
    const dataHeaderUpload = dataXLS[1].filter((e,n) => n>1);
    if(TechSiteID.equals(uploadSiteID) === true){
      if(TechPPID.equals(dataHeaderUpload) === true){
      }else{
        this.setState({action_status : "failed", action_message : "PP ID for revision must equal with PP ID in saved Technical BOQ \n since this technical BOQ already linked with commercial BOQ"});
      }
    }else{
      this.setState({action_status : "failed", action_message : "Site ID for revision must equal with Site ID in saved Technical BOQ \n since this technical BOQ already linked with commercial BOQ"});
    }
  }

  async approvedBoqTech(e){
    this.toggleLoading();
    const statusValue = e.target.value;
    const date = new Date();
    const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    const dataTech = this.state.API_Tech;
    let EmailReceiver = [];
    if(statusValue === "WA"){
      const getUserApproval = await this.getDatafromAPI('/user_all?where={"roles" : "5d6ceb420dbae80ce6052751"}');
      if(getUserApproval !== undefined){
        if(getUserApproval.data !== undefined){
          if(getUserApproval.data._items.length !== 0){
            EmailReceiver = getUserApproval.data._items.map(e => e.email);
          }
        }
      }
    }
    let dataApprove = {
        "rev" : statusValue.toString()
    }
    dataApprove["rev_by"] = this.state.userEmail;
    dataApprove["rev_date"] = DateNow.toString();
    let revPatch = await this.patchDatatoAPI('/boq_tech_op/'+dataTech._id, dataApprove, dataTech._etag)
    if(revPatch !== undefined){
      if(revPatch.data !== undefined){
        if(EmailReceiver.length !== 0){
          let dataEmail = {};
          let bodyEmail = "<span style='font-size:30px;font-weight:800;'>Approval Request</span><br/><br/><span>You have a request for BOQ Management System Approval</span><br/><br/><span style='font-size:20px;font-weight:600;'>Approve or Reject rquest</span><br/><br/><span>This is automate generate email from BOQ Management system . Follow this link to approve request : <a href='https://smart.e-dpm.com/#/Boq/Technical/Approval/"+dataTech._id+"'>"+dataTech.no_boq_tech+"</a></span><br/><br/><span style='font-size:20px;font-weight:600;'>Don't know what this is?</span><br/><br/><span>This message is sent from DPM BOQ Management System, since you are registered as one of the approval role. Questions are welcome to dpm.notification@ericsson.com</span>";
          dataEmail = {
            "to": EmailReceiver.join("; "),
            "subject":"Request for Approval Technical BOQ "+dataTech.no_boq_tech,
            "body": bodyEmail
          }
          // let sendEmail = await this.apiSendEmail(dataEmail);
        }
          dataTech['rev'] = dataApprove.rev;
          dataTech['rev_by'] = dataApprove.rev_by;
          dataTech['rev_date'] = dataApprove.rev_date;
          dataTech['_etag'] = revPatch.data._etag;
          this.setState({action_status : 'succes', action_message : 'BOQ Technical '+dataTech.no_boq_tech+' has been approved', API_Tech : dataTech}, () => {

          });
      }
    }
    this.toggleLoading();
  }

  saveNote = () => {
    const techAPI = this.state.API_Tech;
    let updateNote = { };
    for(let numbNote = 1; numbNote <= 6; numbNote++){
      if(numbNote !== 5){
        updateNote["note_"+numbNote.toString()] = this.state.noteChange[parseInt(numbNote)];
        if(this.checkValuetoString(this.state.noteChange[parseInt(numbNote)]).length == 0){
          updateNote["note_"+numbNote.toString()] = this.checkValuetoString(techAPI["note_"+numbNote.toString()]);
        }
        updateNote["note_name_"+numbNote.toString()] = this.state.fieldNoteChange[parseInt(numbNote)];
        if(this.checkValuetoString(this.state.fieldNoteChange[parseInt(numbNote)]).length == 0){
          updateNote["note_name_"+numbNote.toString()] = this.checkValuetoString(techAPI["note_name_"+numbNote.toString()]);
        }
      }
    }
    console.log("updateNote", updateNote);
    return updateNote;
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

  handleChangeFieldNote(e){
    let fieldnoteArray = this.state.fieldNoteChange;
    const index = e.target.name;
    const value = e.target.value;
    fieldnoteArray[parseInt(index)] = value.toString();
    this.setState({
      fieldNoteChange: fieldnoteArray,
    });
  }

  handleChangeOpportunity(e){
    let value = e.target.value;
    if(value !== null){
      if(value.length === 0){
        value = null;
      }
    }
    this.setState({ opportunity_id : value});
  }

  handleChangeRegion(e){
    this.setState({region_selected : e.target.value})
  }

  exportFormatTechnical = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
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
    saveAs(new Blob([MRFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Uploader Template.xlsx');
  }

  exportFormatTechnicalCommercial = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
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
    saveAs(new Blob([MRFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Uploader Commercial Template.xlsx');
  }

  exportFormatTechnicalNew = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info"];
    let HeaderRow2 = ["tower_id","program", "sow", "priority"];

    Config_group_type_DEFAULT.map(e => HeaderRow1 = HeaderRow1.concat([e, e]));
    Config_group_DEFAULT.map(e => HeaderRow2 = HeaderRow2.concat([e, "qty"]));

    ws.addRow(HeaderRow1);
    ws.addRow(HeaderRow2);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Technical BOQ Uploader Template.xlsx');
  }

  exportTechnicalSummaryBOQ = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    const dataTechSummary = this.state.data_tech_boq_summary;
    const dataSummaryHeader = this.state.view_tech_header_table;
    const dataProductTypeUniq = this.state.product_type_uniq;

    let headerRow = ["PP Type", "Product Description", "Ordering", "INF Code", "Total"];
    dataSummaryHeader.region.map(reg => headerRow.push(reg));
    ws.addRow(headerRow);

    for(let i = 0; i < dataProductTypeUniq.length; i++){
      const dataSummaryType = dataTechSummary.filter(ts => ts.product_type === dataProductTypeUniq[i]);
      for(let j = 0; j < dataSummaryType.length; j++){
        let listRow = [dataSummaryType[j].product_type, dataSummaryType[j].product_name, dataSummaryType[j].ordering, dataSummaryType[j].inf_code, dataSummaryType[j].total_qty];
        for(let k = 0; k < dataSummaryHeader.region.length; k++){
          let qtyIdx = 0;
          const qtySiteIdx = dataSummaryType[j].qty_side.find(qs => qs.region === dataSummaryHeader.region[k] && qs.program === undefined);
          if(qtySiteIdx !== undefined){
            qtyIdx = qtySiteIdx.qty;
          }
          listRow.push(qtyIdx);
        }
        ws.addRow(listRow);
      }
    }


    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Technical Summary BOQ '+dataTech.no_tech_boq+'.xlsx');
  }

  exportFormatTechnicalHorizontal = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
    }

    const header_config = this.state.view_tech_header_table;

    let HeaderRow1 = ["General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "General Info", "Service", "Service"];
    let HeaderRow2 = ["region", "program", "batch", "site_id", "site_name", "ne_id", "new_config", "service_product_id", "service_product_name"];

    header_config.type.map(e => HeaderRow1.push(e));
    header_config.pp_id.map((e, i) => HeaderRow2.push(e +" /// "+ header_config.name[i]));

    ws.addRow(HeaderRow1);
    ws.addRow(HeaderRow2);
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
      ws.addRow([dataSites[i].region, dataSites[i].program, dataSites[i].batch, dataSites[i].site_id, dataSites[i].site_name, dataSites[i].ne_id, dataSites[i].new_config, dataSites[i].service_product_id, dataSites[i].service_product_name].concat(qtyItem));
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Format.xlsx');
  }

  exportFormatTechnicalVerticalUploader = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
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
    saveAs(new Blob([MRFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Vertical Uploader.xlsx');
  }

  exportFormatTechnicalVerticalUploaderCommercial = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
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
    saveAs(new Blob([MRFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Vertical Uploader.xlsx');
  }

  exportFormatTechnicalVertical = async () =>{
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTech = this.state.data_tech_boq;
    let dataSites = [];
    if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
      dataSites = this.state.data_tech_boq_summary_version;
    }else{
      dataSites = this.state.data_tech_boq_summary;
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
    saveAs(new Blob([MRFormat]), 'Technical BOQ '+dataTech.no_tech_boq+' Vertical.xlsx');
  }

  getTaxCode(product_type){
    if(product_type.toLowerCase() === "lcm" || product_type.toLowerCase() === "svc"){
      return "V1";
    }else{
      return "V0";
    }
  }

  saveCommtoAPI = async () => {
    this.toggleLoading();
    let dataCommNew = this.state.data_tech_boq;
    const regionSelected = this.state.region_selected;
    let dataTechperRegion = dataCommNew.techBoqSite.filter(ts => ts.region === regionSelected)
    let dataItemsPR = [];
    for(let i = 0; i < dataTechperRegion.length; i++){
      for(let j = 0; j < dataTechperRegion[i].siteItem.length; j++){
        const dataItemIdx = dataTechperRegion[i].siteItem[j];
        const dataItemNew = {
            "pr_item_type": dataItemIdx.product_type,
            "id_pp_doc": dataItemIdx.id_pp_doc,
            "pp_id": dataItemIdx.pp_id,
            "item_text": dataItemIdx.product_name,
            "tax_code": this.getTaxCode(dataItemIdx.product_type),
            "region" : regionSelected,
            "short_text": dataItemIdx.physical_group,
            "uom": dataItemIdx.uom,
            "site_list": [
                {
                    "site_name": dataTechperRegion[i].site_name,
                    "site_id": dataTechperRegion[i].site_id,
                    "ne_id": dataTechperRegion[i].ne_id,
                    "id_tech_boq_doc": dataTechperRegion[i].id_tech_boq_doc,
                    "id_tech_boq_site_doc": dataTechperRegion[i]._id,
                    "no_tech_boq": dataTechperRegion[i].no_tech_boq,
                    "id_site_doc": dataTechperRegion[i].id_site_doc
                }
            ],
            "material_quantity": parseFloat(dataItemIdx.qty)
        };
        dataItemsPR.push(dataItemNew);
      }
      if(dataTechperRegion[i].id_service_product_doc !== undefined && dataTechperRegion[i].id_service_product_doc !== null){
        const dataItemNew = {
            "pr_item_type": "SVC",
            "id_pp_doc": dataTechperRegion[i].id_service_product_doc,
            "pp_id": dataTechperRegion[i].service_product_id,
            "item_text": dataTechperRegion[i].service_product_name,
            "tax_code": this.getTaxCode("SVC"),
            "region" : regionSelected,
            "short_text": dataTechperRegion[i].site_name,
            "uom": "svc",
            "site_list": [
                {
                    "site_name": dataTechperRegion[i].site_name,
                    "site_id": dataTechperRegion[i].site_id,
                    "ne_id": dataTechperRegion[i].ne_id,
                    "id_tech_boq_doc": dataTechperRegion[i].id_tech_boq_doc,
                    "id_tech_boq_site_doc": dataTechperRegion[i]._id,
                    "no_tech_boq": dataTechperRegion[i].no_tech_boq,
                    "id_site_doc": dataTechperRegion[i].id_site_doc
                }
            ],
            "material_quantity": parseFloat(1)
        };
        dataItemsPR.push(dataItemNew);
      }
    }
    let dataInputan = {
      "id_project_doc": dataCommNew.id_project_doc,
      "project_name": dataCommNew.project_name,
      "region" : regionSelected,
      "list_of_tech": [
          {
              "id_tech_boq_doc": dataCommNew._id,
              "no_tech_boq": dataCommNew.no_tech_boq,
              "technical_version":dataCommNew.version
          }
      ],
      "item" : dataItemsPR
    }
    // console.log("dataInputan", dataInputan);
    let postComm = await this.postDatatoAPINODE('/commBoqIsat/createCommercial', {"data" : dataInputan});
    if(postComm.data !== undefined){
      this.setState({action_status : 'success'}, () => {
        // setTimeout(function() { this.setState({redirectSign : postComm.data.cboqInfo._id })}.bind(this), 2000 );
      });
    }else{
      if(postComm.response !== undefined){
        this.setState({action_status : 'failed', action_message : postComm.response.error });
      }else{
        this.setState({action_status : 'failed' });
      }
    }
    this.toggleLoading();
  }

    render() {
      if(this.state.redirectSign !== false){
        return (<Redirect to={'/detail-technical/'+this.state.redirectSign} />);
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
                      <span>Create Technical BOQ</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span style={{marginTop:'3px', position:'absolute'}}>Detail Technical BOQ</span>
                      <div className="card-header-actions" style={{display:'inline-flex'}}>
                        <Col>
                          <Input size="sm" type="select" onChange={this.handleChangeRegion} value={this.state.region_selected}>
                            <option></option>
                            {this.state.list_region.map(lr =>
                              <option value={lr}>{lr}</option>
                            )}
                          </Input>
                        </Col>
                        <Col>
                        {this.state.data_tech_boq !== null && (
                          <Button size="sm" className="btn-success" style={{'float' : 'left'}} color="success" value={"1"} disabled={this.state.region_selected === null} onClick={this.saveCommtoAPI}>
                              Create PR
                          </Button>
                        )}
                        </Col>
                        <Col>
                          <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}}>
                            <DropdownToggle caret color="secondary" size="sm">
                              <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download Technical File
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header> Technical File</DropdownItem>
                              <DropdownItem onClick={this.exportTechnicalSummaryBOQ}> <i className="fa fa-file-text-o" aria-hidden="true"></i> SUmmary BOQ Export</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </Col>
                      </div>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <React.Fragment>
                  <div>
                    {this.state.data_tech_boq !== null ? (
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
                            {this.state.data_tech_boq.list_of_commercial.filter(e => e.comm_boq_status !== "OBSOLETE").length !== 0 ? (
                              <Col>
                                <div>
                                  <React.Fragment>
                                    <Button style={{'float' : 'right'}} color="warning" onClick={this.toggleUpdateInfo} value="save" disabled={this.state.action_status === 'failed' || this.state.result_check_tech === null}>
                                    <i className="fa fa-paste">&nbsp;&nbsp;</i>
                                      {this.state.rowsTech.length === 0 ? 'Save' : this.state.result_check_tech !== null ? 'Save' : 'Loading..'}
                                    </Button>
                                  </React.Fragment>
                                  <Button style={{'float' : 'right',marginRight : '8px'}} color="secondary" onClick={this.toggleUpdateInfo} value="revision" disabled={this.state.action_status === 'failed' || this.state.result_check_tech === null}>
                                    <i className="fa fa-copy">&nbsp;&nbsp;</i>
                                    {this.state.rowsTech.length === 0 ? 'Revision' : this.state.result_check_tech !== null ? 'Revision' : 'Loading..'}
                                  </Button>
                                </div>
                              </Col>
                            ):(
                              <Col>
                                <div>
                                  <React.Fragment>
                                    <Button style={{'float' : 'right'}} color="warning" onClick={this.updateTechBoq} value="save" disabled={this.state.action_status === 'failed' || this.state.result_check_tech === null}>
                                    <i className="fa fa-paste">&nbsp;&nbsp;</i>
                                      {this.state.rowsTech.length === 0 ? 'Save' : this.state.result_check_tech !== null ? 'Save' : 'Loading..'}
                                    </Button>
                                  </React.Fragment>
                                  <Button style={{'float' : 'right',marginRight : '8px'}} color="secondary" onClick={this.updateTechBoq} value="revision" disabled={this.state.action_status === 'failed' || this.state.result_check_tech === null}>
                                    <i className="fa fa-copy">&nbsp;&nbsp;</i>
                                    {this.state.rowsTech.length === 0 ? 'Revision' : this.state.result_check_tech !== null ? 'Revision' : 'Loading..'}
                                  </Button>
                                </div>
                              </Col>
                            )}

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
                  {this.state.data_tech_boq !== null && (
                    <React.Fragment>
                    <Row>
                      <Col sm="12" md="12">
                      <table style={{width : '100%', marginBottom : '0px', marginLeft : '10px'}}>
                        <tbody>
                          <tr style={{fontWeight : '425', fontSize : '23px'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>TECHNICAL BOQ</td>
                          </tr>
                          <tr style={{fontWeight : '390', fontSize : '15px', fontStyle:'oblique'}}>
                            <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Doc : {this.state.data_tech_boq.no_tech_boq}</td>
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
                            <td style={{textAlign : 'left'}} colspan={2}>
                              <Input type="select" value={this.state.version_selected === null? this.state.data_tech_boq.version : this.state.version_selected} onChange={this.handleChangeVersion} style={{width : "100px", height : "30px"}}>
                                {this.state.list_version.map((e,i) =>
                                  <option value={i}>{i}</option>
                                )}
                              </Input>
                            </td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Created On &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{this.state.data_tech_boq.created_on}</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                              <td>&nbsp; </td>
                              <td></td>
                              <td></td>
                              <td style={{paddingLeft:'5px'}}></td>
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
                            <td style={{textAlign : 'left'}} colspan={2}>{this.state.data_tech_boq.project_name}</td>
                          </tr>
                          <tr style={{fontWeight : '425', fontSize : '15px'}}>
                            <td style={{textAlign : 'left'}}>Updated On </td>
                            <td style={{textAlign : 'left'}}>:</td>
                            <td style={{textAlign : 'left'}} colspan={2}>{this.state.data_tech_boq.updated_on}</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      </Col>
                    </Row>
                    </React.Fragment>
                    )}
                    {this.state.data_tech_boq_summary.length === 0 && this.state.data_tech_boq === null && this.props.match.params.id === undefined ? (
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
                      <TableTechnicalItem
                        dataTechBoqItem={this.state.data_tech_boq_summary_pagination}
                        TechHeader={this.state.view_tech_header_table}
                        dataTechSites={this.state.data_tech_boq_sites}
                        productType={this.state.product_type_uniq}
                      />
                      <nav>
                        <div>
                          <Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.perPage}
                              totalItemsCount={this.state.data_tech_boq_summary.length}
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
                  <CardFooter>
                  </CardFooter>
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
                <span style={{fontWeight : '500', fontSize : '15px'}}>Update this Technical BOQ can delete Commercial BOQ related with this Technical BOQ </span>
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

  export default connect(mapStateToProps)(SummaryBoq);
