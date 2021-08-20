import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Row,
  Table,
  FormGroup,
  Label,
} from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import ActionType from "../../redux/reducer/globalActionType";
import {
  convertDateFormatfull,
  convertDateFormat,
} from "../../helper/basicFunction";
import {
  getDatafromAPI_PDB2,
  patchDatatoAPINODE,
  getDatafromAPI_PDB_dev
} from "../../helper/asyncFunction";
import ModalForm from "../components/ModalForm";


import Loading from "../components/Loading";

const API_URL = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";
const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

//const process.env.REACT_APP_API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

class MRList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      vendor_name: this.props.dataLogin.vendor_name,
      vendor_code: this.props.dataLogin.vendor_code,
      account_name : this.props.dataLogin.account_id === "1" ? "Telenor" : "Mobifone",
      tokenPDB: this.props.dataLogin.token_pdb,
      action_status: null,
      action_message: null,
      mr_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: new Array(14).fill(""),
      mr_all: [],
      modal_loading: false,
      vendor_list : [],
      modal_approve_ldm: false,
      dropdownOpen: new Array(1).fill(false),
      id_mr_selected: "",
      vendor_code_selected : "",
      _id_selected : ""
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadMRlist = this.downloadMRlist.bind(this);
    this.downloadSNReportAll = this.downloadSNReportAll.bind(this)
    this.downloadSNReportAll2 = this.downloadSNReportAll2.bind(this)
    this.toggleModalapprove = this.toggleModalapprove.bind(this);
    this.handleMRassign = this.handleMRassign.bind(this);
    this.AssignMR = this.AssignMR.bind(this);
    this.getMRList = this.getMRList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.downloadAllMRMigration = this.downloadAllMRMigration.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.getAllMR = this.getAllMR.bind(this);
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: username,
          password: password,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  getMRList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"mr_id":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"project_name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"site_info.site_id": "' +
          this.state.filter_list[3] +
          '"'
      );
    this.state.filter_list[4] !== "" &&
      filter_array.push(
        '"site_info.site_name":{"$regex" : "' +
          this.state.filter_list[4] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"current_mr_status":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"current_milestones":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );

    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"dsp_company":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[8] !== "" &&
      filter_array.push(
        '"eta":{"$regex" : "' +
          this.state.filter_list[8] +
          '", "$options" : "i"}'
      );
    // this.state.filter_list[8] !== "" && (filter_array.push('"created_by":{"$regex" : "' + this.state.filter_list[8] + '", "$options" : "i"}'));
    this.state.filter_list[11] !== "" &&
      filter_array.push(
        '"updated_on":{"$regex" : "' +
          this.state.filter_list[11] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[12] !== "" &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list[12] +
          '", "$options" : "i"}'
      );
    this.props.match.params.whid !== undefined &&
      filter_array.push(
        '"origin.value" : "' + this.props.match.params.whid + '"'
      );
    if (
      (this.state.userRole.findIndex((e) => e === "BAM-ASP") !== -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-ASP Management") !==
          -1 ||
        this.state.userRole.findIndex((e) => e === "BAM-Mover") !== -1) &&
      this.state.userRole.findIndex((e) => e === "Admin") === -1
    ) {
      filter_array.push('"dsp_company" : "' + this.state.vendor_name + '"');
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/matreq?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
    ).then((res) => {
      console.log("MR List Sorted", res);
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ mr_list: items, totalData: totalData });
      }
    });
  }

  async downloadSNReportAll(){
    this.toggleLoading();

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataMR = await this.getAllMR();
    // console.log('dataMR',dataMR)
    const dataItemMR = await dataMR.map(mr => mr.packages);
    // console.log('dataItemMR',dataItemMR)

    let headerRow = [
      "MR_ID",
      "SITE ID",
      "SKU",
      "SERIAL_NUMBER",
      "DESCRIPTION",
      "SCAN_BY",
      "LASTEST_UPDATE_DATE_SCAN",
      "ACCOUNT",
      "WAREHOUSE",
    ];
    ws.addRow(headerRow);
    let dateDispatch = null;
    let dispatchData = dataMR.map(mr => mr.mr_status).find(
      (e) => e.mr_status_value === "DISPATCH"
    );
    // console.log('dispatchData', dispatchData)
    if (
      dispatchData !== undefined && dispatchData.length !== 0
    ) {
      let dateDispatchNew = new Date(dispatchData.mr_status_date);
      dateDispatch =
        dateDispatchNew.getFullYear().toString() +
        (dateDispatchNew.getMonth() + 1).toString().padStart(2, "0") +
        dateDispatchNew.getDate().toString().padStart(2, "0");
    }
    for (let i = 0; i < dataItemMR.length; i++) {
      // console.log('dataItemMR['+i+']', dataItemMR[i]);
      for (let j = 0; j < dataItemMR[i].length; j++) {
      // console.log('package['+j+']', dataItemMR[i][j]);

        if(dataItemMR[i][j].materials !== undefined && dataItemMR[i][j].materials.length !== 0){          
          for (let k = 0; k < dataItemMR[i][j].materials.length; k++) {
            // console.log('dataItemMR[i][j].materials.length', dataItemMR[i][j].materials);
            let dataMatIdx = dataItemMR[i][j].materials[k];
            // console.log('dataMatIdx', dataMatIdx);
          if (
            dataMatIdx.serial_numbers !== undefined &&
            dataMatIdx.serial_numbers.length !== 0
          ) {
            let serial_number = dataMatIdx.serial_numbers.find(
              (e) => e.flag_name === "obd"
            );
            if (serial_number !== undefined) {
              for (let l = 0; l < serial_number.list_of_sn.length; l++) {
                ws.addRow([
                  dataMR[i].mr_id,
                  dataMR[i].site_info[0].site_id,
                  dataMatIdx.material_id,
                  serial_number.list_of_sn[l],
                  dataMatIdx.material_name,
                  serial_number.updated_by,
                  serial_number.updated_on,
                  this.state.account_name,
                  dataMR[i].origin.value,
                ]);
              }
            }
          } else {
            ws.addRow([
              dataMR[i].mr_id,
              dataMR[i].site_info[0].site_id,
              dataMatIdx.material_id,
              null,
              dataMatIdx.material_name,
              null,
              null,
              this.state.account_name,
              dataMR[i].origin.value,
            ]);
          }
          }  
        }
              
      }
    }
    this.toggleLoading();

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "SERIAL NUMBER Material REPORT WH.xlsx"
    );
  }

  async downloadSNReportAll2(){
    this.toggleLoading();

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataMR = await this.getAllMR();
    // console.log('dataMR',dataMR)
    const dataItemMR = await dataMR.map(mr => mr.packages);
    // console.log('dataItemMR',dataItemMR)

    let headerRow = [
      "MR_ID",
      "SITE ID",
      "SKU",
      "SERIAL_NUMBER",
      "DESCRIPTION",
      "SCAN_BY",
      "LASTEST_UPDATE_DATE_SCAN",
      "ACCOUNT",
      "WAREHOUSE",
    ];
    ws.addRow(headerRow);
    let dateDispatch = null;
    let dispatchData = dataMR.map(mr => mr.mr_status).find(
      (e) => e.mr_status_value === "DISPATCH"
    );
    // console.log('dispatchData', dispatchData)
    if (
      dispatchData !== undefined && dispatchData.length !== 0
    ) {
      let dateDispatchNew = new Date(dispatchData.mr_status_date);
      dateDispatch =
        dateDispatchNew.getFullYear().toString() +
        (dateDispatchNew.getMonth() + 1).toString().padStart(2, "0") +
        dateDispatchNew.getDate().toString().padStart(2, "0");
    }
    for (let i = 0; i < dataItemMR.length; i++) {
      // console.log('dataItemMR['+i+']', dataItemMR[i]);
      for (let j = 0; j < dataItemMR[i].length; j++) {
      // console.log('package['+j+']', dataItemMR[i][j]);

        if(dataItemMR[i][j].materials !== undefined && dataItemMR[i][j].materials.length !== 0){          
          for (let k = 0; k < dataItemMR[i][j].materials.length; k++) {
            // console.log('dataItemMR[i][j].materials.length', dataItemMR[i][j].materials);
            let dataMatIdx = dataItemMR[i][j].materials[k];
            // console.log('dataMatIdx', dataMatIdx);
          if (
            dataMatIdx.serial_numbers !== undefined &&
            dataMatIdx.serial_numbers.length !== 0
          ) {
            let serial_number = dataMatIdx.serial_numbers.find(
              (e) => e.flag_name === "mho"
            );
            if (serial_number !== undefined) {
              for (let l = 0; l < serial_number.list_of_sn.length; l++) {
                ws.addRow([
                  dataMR[i].mr_id,
                  dataMR[i].site_info[0].site_id,
                  dataMatIdx.material_id,                  
                  serial_number.list_of_sn[l],
                  dataMatIdx.material_name,
                  serial_number.updated_by,
                  serial_number.updated_on,
                  this.state.account_name,
                  dataMR[i].origin.value,
                ]);
              }
            }
          } else {
            ws.addRow([
              dataMR[i].mr_id,
              dataMR[i].site_info[0].site_id,
              dataMatIdx.material_id,
              null,
              dataMatIdx.material_name,
              null,
              null,
              this.state.account_name,
              dataMR[i].origin.value,
            ]);
          }
          }  
        }
              
      }
    }
    this.toggleLoading();

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "SERIAL NUMBER Material REPORT ASP.xlsx"
    );
  }

  async getAllMR() {
    let mrList = [];
    let filter_array = [];
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"mr_id":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"project_name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"site_info.site_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[4] !== "" &&
      filter_array.push(
        '"site_info.site_name":{"$regex" : "' +
          this.state.filter_list[4] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"current_mr_status":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"current_milestones":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );

    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"dsp_company":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[8] !== "" &&
      filter_array.push(
        '"eta":{"$regex" : "' +
          this.state.filter_list[8] +
          '", "$options" : "i"}'
      );
    // this.state.filter_list[8] !== "" && (filter_array.push('"created_by":{"$regex" : "' + this.state.filter_list[8] + '", "$options" : "i"}'));
    this.state.filter_list[11] !== "" &&
      filter_array.push(
        '"updated_on":{"$regex" : "' +
          this.state.filter_list[11] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[12] !== "" &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list[12] +
          '", "$options" : "i"}'
      );
    this.props.match.params.whid !== undefined &&
      filter_array.push(
        '"origin.value" : "' + this.props.match.params.whid + '"'
      );
    let whereAnd = "{" + filter_array.join(",") + "}";
    let res = await this.getDataFromAPINODE(
      "/matreq?srt=_id:-1&noPg=1&q=" + whereAnd
    );
    if (res.data !== undefined) {
      const items = res.data.data;
      mrList = res.data.data;
      return mrList;
      // this.setState({ mr_all: items });
    } else {
      return [];
    }
  }

  numToSSColumn(num) {
    var s = "",
      t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = ((num - t) / 26) | 0;
    }
    return s || undefined;
  }

  async downloadMRlist() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = await this.getAllMR();

    let headerRow = [
      "MR ID",
      "MR MITT ID",
      "MR Type",
      "MR Delivery Type",
      "Project Name",
      "WP ID",
      "Site ID",
      "Site Name",
      "Current Status",
      "Current Milestone",
      "DSP",
      "ETA",
      "MR MITT Created On",
      "MR MITT Created By",
      "Updated On",
      "Created On",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < allMR.length; i++) {
      const creator_mr_mitt = allMR[i].mr_status.find(
        (e) =>
          e.mr_status_name === "PLANTSPEC" &&
          e.mr_status_value === "NOT ASSIGNED"
      );
      ws.addRow([
        allMR[i].mr_id,
        allMR[i].mr_mitt_no,
        allMR[i].mr_type,
        allMR[i].mr_delivery_type,
        allMR[i].project_name,
        allMR[i].cust_del !== undefined
          ? allMR[i].cust_del.map((cd) => cd.cd_id).join(", ")
          : allMR[i].cd_id,
        allMR[i].site_info[0] !== undefined
          ? allMR[i].site_info[0].site_id
          : null,
        allMR[i].site_info[0] !== undefined
          ? allMR[i].site_info[0].site_name
          : null,
        allMR[i].current_mr_status,
        allMR[i].current_milestones,
        allMR[i].dsp_company,
        new Date(allMR[i].eta),
        creator_mr_mitt !== undefined
          ? new Date(creator_mr_mitt.mr_status_date)
          : null,
        creator_mr_mitt !== undefined
          ? creator_mr_mitt.mr_status_updater
          : null,
        new Date(allMR[i].updated_on),
        new Date(allMR[i].created_on),
      ]);
      const getRowLast = ws.lastRow._number;
      ws.getCell("M" + getRowLast).numFmt = "YYYY-MM-DD";
      ws.getCell("O" + getRowLast).numFmt = "YYYY-MM-DD";
      ws.getCell("P" + getRowLast).numFmt = "YYYY-MM-DD";
      if (creator_mr_mitt !== undefined && creator_mr_mitt !== null) {
        ws.getCell("L" + getRowLast).numFmt = "YYYY-MM-DD";
      }
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "MR List.xlsx");
  }

  componentDidMount() {
    this.props.SidebarMinimizer(true);
    this.getMRList();
    // this.getAllMR();
    document.title = "MR List | BAM";
  }

  componentWillUnmount() {
    this.props.SidebarMinimizer(false);
  }

  getDSPList() {
    getDatafromAPI_PDB2("/get-vendors").then((res) => {
      if (res.data !== undefined) {
        const items = res.data._items;
        this.setState({ vendor_list: items });
      }
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getMRList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if (value !== "" && value.length === 0) {
      value = "";
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({ filter_list: dataFilter, activePage: 1 }, () => {
      this.onChangeDebounced(e);
    });
  }

  async downloadAllMRMigration() {
    let allMRList = [];
    let getMR = await this.getDataFromAPINODE(
      '/matreq?noPg=1&srt=_id:-1&q={"mr_mitt_no" : {"$exists" : 1}, "mr_mitt_no" : {"$ne" : null}}'
    );
    if (getMR.data !== undefined) {
      allMRList = getMR.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "mr_bam_id",
      "mr_mitt_no",
      "ps_mitt_no",
      "plantspec_assigned_date",
      "plantspec_assigned_by",
      "mr_requested_date",
      "mr_requested_by",
      "mr_approved_date",
      "mr_approved_by",
      "order_processing_finish_date",
      "order_processing_finish_by",
      "rtd_confirmed_date",
      "rtd_confirmed_by",
      "joint_check_finish_date",
      "joint_check_finish_by",
      "loading_process_finish_date",
      "loading_process_finish_by",
      "mr_dispatch_date",
      "mr_dispatch_by",
      "mr_on_site_date",
      "mr_on_site_by",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < allMRList.length; i++) {
      let rowAdded = [allMRList[i].mr_id, allMRList[i].mr_mitt_no];
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "MR List For Status Migration from SH Template.xlsx"
    );
  }

  onChangeDebounced(e) {
    this.getMRList();
    // this.getAllMR();
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < 12; i++) {
      searchBar.push(
        <td>
          <div className="controls" style={{ width: "150px" }}>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Search"
                onChange={this.handleFilterList}
                value={this.state.filter_list[i]}
                name={i}
                size="sm"
              />
            </InputGroup>
          </div>
        </td>
      );
    }
    return searchBar;
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  toggleModalapprove(e) {
    this.getDSPList();
    this.setState((prevState) => ({
      modal_approve_ldm: !prevState.modal_approve_ldm,
    }));
    this.setState({
      id_mr_selected : e.currentTarget.value,
      _id_selected : e.currentTarget.name
    })
  }

  handleMRassign(e){
    this.setState({vendor_code_selected: e.currentTarget.value, })
  }

  AssignMR() {
    const _id = this.state._id_selected;
    patchDatatoAPINODE("/matreq/assignAspDspToMatReq/" + _id, {
      access_token_vnmm: this.state.tokenPDB,
      mrInfo: {dsp: this.state.vendor_code_selected} 
    }, this.state.tokenUser).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success", modal_approve_ldm : false });
        this.getMRList();
        // this.toggleModalapprove();
      } else {
        this.setState({ action_status: "failed", modal_approve_ldm : false });
        // this.toggleModalapprove();
      }
    });
  }

  render() {
    const downloadMR = {
      float: "right",
      marginRight: "10px",
    };

    return (
      <div className="animated fadeIn">
       <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2" }}>
                  <i
                    className="fa fa-align-justify"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  MR List
                </span>
                {this.state.userRole.findIndex((e) => e === "BAM-ASP") === -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-ASP Management"
                  ) === -1 &&
                  this.state.userRole.findIndex((e) => e === "BAM-Mover") ===
                    -1 && (
                    <React.Fragment>
                      {this.state.userRole.findIndex(
                        (e) => e === "BAM-Engineering"
                      ) === -1 &&
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-Project Planner"
                        ) === -1 &&
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-Warehouse"
                        ) === -1 &&
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-LDM"
                        ) === -1 && (
                          <React.Fragment>
                            <Link to={"/mr-creation"}>
                              <Button
                                color="success"
                                style={{ float: "right" }}
                                size="sm"
                              >
                                <i
                                  className="fa fa-plus-square"
                                  style={{ marginRight: "8px" }}
                                ></i>
                                Create MR
                              </Button>
                            </Link>
                            <Link to={'/bulk-mr-creation'}><Button color="success" style={{ float: 'right', marginRight: "8px" }} size="sm"><i className="fa fa-plus-square" style={{ marginRight: "8px" }}></i>Create MR Bulk</Button></Link>
                          </React.Fragment>
                        )}
                      <Dropdown
                        size="sm"
                        isOpen={this.state.dropdownOpen[0]}
                        toggle={() => {
                          this.toggleDropdown(0);
                        }}
                        style={{ float: "right", marginRight: "10px" }}
                      >
                        <DropdownToggle caret color="secondary">
                          <i className="fa fa-download" aria-hidden="true">
                            {" "}
                            &nbsp;{" "}
                          </i>
                          File
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>MR File</DropdownItem>
                          <DropdownItem onClick={this.downloadMRlist}>
                            {" "}
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            Download MR List
                          </DropdownItem>
                          <DropdownItem header>SN Report</DropdownItem>
                          <DropdownItem onClick={this.downloadSNReportAll}>
                            {" "}
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            Download SN List WH
                          </DropdownItem>
                          <DropdownItem onClick={this.downloadSNReportAll2}>
                            {" "}
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            Download SN List ASP
                          </DropdownItem>                     
                        </DropdownMenu>
                      </Dropdown>
                    </React.Fragment>
                  )}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2">Action</th>
                      <th>MR ID</th>
                      <th>Project Name</th>
                      <th>WP ID</th>
                      <th>Site ID</th>
                      <th>Site Name</th>
                      <th>Current Status</th>
                      <th>Current Milestone</th>
                      {/* <th>Region</th> */}
                      <th>DSP</th>
                      <th>ETA</th>
                      <th>Created By</th>
                      <th>Updated On</th>
                      <th>Created On</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.mr_list.length === 0 && (
                      <tr>
                        <td colSpan="15">No Data Available</td>
                      </tr>
                    )}
                    {this.state.mr_list.map((list, i) => (
                      <tr key={list._id}>
                      <td>
                      <Button
                            outline
                            color="default"
                            size="sm"
                            className="btn-pill"
                            style={{ width: "90px", marginBottom: "4px" }}
                            name={list._id}
                            value={list.mr_id}
                            onClick={this.toggleModalapprove}
                          >
                            <i
                              className="fa fa-truck"
                              style={{ marginRight: "8px" }}
                            ></i>
                            DSP
                          </Button>
                      </td>
                        <td>
                          <Link to={"/mr-detail/" + list._id}>
                            {list.mr_id}
                          </Link>
                        </td>
                        <td>{list.project_name}</td>
                        <td>
                          {list.cust_del !== undefined &&
                            list.cust_del
                              .map((custdel) => custdel.cd_id)
                              .join(" , ")}
                        </td>
                        <td>
                          {list.site_info !== undefined &&
                            list.site_info
                              .map((site_info) => site_info.site_id)
                              .join(" , ")}
                        </td>
                        <td>
                          {list.site_info !== undefined &&
                            list.site_info
                              .map((site_info) => site_info.site_name)
                              .join(" , ")}
                        </td>
                        <td>{list.current_mr_status}</td>
                        <td>{list.current_milestones}</td>
                        {/* <td>
                          {list.site_info !== undefined &&
                            list.site_info
                              .map((site_info) => site_info.site_region)
                              .join(" , ")}
                        </td> */}
                        <td>{list.dsp_company}</td>
                        <td>{convertDateFormat(list.eta)}</td>
                        <td>{list.creator.map((e) => e.email)}</td>
                        <td>{convertDateFormatfull(list.updated_on)}</td>
                        <td>{convertDateFormatfull(list.created_on)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ margin: "8px 0px" }}>
                  <small>
                    Showing{" "}
                    {this.state.totalData < 10
                      ? this.state.totalData
                      : this.state.perPage}{" "}
                    entries from {this.state.totalData} data
                  </small>
                </div>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={this.state.totalData}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal Loading */}
        <Loading
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}
        ></Loading>
        {/* end Modal Loading */}

         {/* modal form approve */}
         <ModalForm
          isOpen={this.state.modal_approve_ldm}
          toggle={this.toggleModalapprove}
          className={"modal-sm modal--box-input modal__delivery--ldm-approve"}
        >
          <Col>
              <React.Fragment>
                <FormGroup>
                  <Label htmlFor="total_box"> {this.state.id_mr_selected !== undefined ? this.state.id_mr_selected : ""} | ASP & DSP Company</Label>
                  <Input
                    type="select"
                    className=""
                    placeholder="Select ASP/DSP"
                    onChange={this.handleMRassign}
                    name={this.state.id_mr_selected}
                    value={this.state.vendor_code_selected}           
                  >
                    <option value="" disabled selected hidden></option>
                    {this.state.vendor_list.map((asp) => (
                      <option value={asp.Vendor_Code}>{asp.Name}</option>
                    ))}
                  </Input>
                </FormGroup>
                
              </React.Fragment>
          </Col>
          <div style={{ justifyContent: "center", alignSelf: "center" }}>
            <Button
              color="success"
              onClick={this.AssignMR}
              className="btn-pill"
            >
              <i className="icon-check icons"></i> Assign
            </Button>
          </div>
        </ModalForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SidebarMinimizer: (minimize) =>
      dispatch({
        type: ActionType.MINIMIZE_SIDEBAR,
        minimize_sidebar: minimize,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MRList);
