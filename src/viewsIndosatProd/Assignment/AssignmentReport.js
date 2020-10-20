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
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";

const API_URL_ISAT = 'https://api.isat.pdb.e-dpm.com/isatapi';
const usernameISAT = 'adminbamidsuper';
const passwordISAT = 'F760qbAg2sml';

const API_URL_NODE = "https://api2.bam-id.e-dpm.com/bamidapi";

class AssignmentListReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      vendor_name : this.props.dataLogin.vendor_name,
      vendor_code : this.props.dataLogin.vendor_code,
      assignment_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: new Array(8).fill(""),
      filter_date: {
        filter_list_date: null,
        filter_list_date2: null,
      },
      asg_all: [],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getAssignmentList = this.getAssignmentList.bind(this);
    this.downloadASGList = this.downloadASGList.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.handleFilterDate = this.handleFilterDate.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    // this.getAssignmentList = this.getAssignmentList.bind(this);
    this.getAllAssignment = this.getAllAssignment.bind(this);
    this.downloadAllAssignment = this.downloadAllAssignment.bind(this);
    this.downloadAllAssignmentAcceptenceMigration = this.downloadAllAssignmentAcceptenceMigration.bind(this);
    this.downloadAllAssignmentBAST = this.downloadAllAssignmentBAST.bind(this);
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE + url, {
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

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL_ISAT + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameISAT,
          password: passwordISAT,
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

  getAssignmentList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    // let date =  this.state.filter_date.filter_list_date && this.state.filter_date.filter_list_date2 === null ? '{}' : '{"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 23:59:59"}}';
    if(this.state.filter_date.filter_list_date && this.state.filter_date.filter_list_date2 === null){

    } else {
      filter_array.push(
        '"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 23:59:59"}'
      );
    }
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"Assignment_No":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"Account_Name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"Project":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"Payment_Terms":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"Current_Status":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"Work_Status":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
      if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
        filter_array.push('"Vendor_Code_Number" : "'+this.state.vendor_code+'"');
      }else{
        this.state.filter_list[4] !== "" &&
          filter_array.push(
            '"Vendor_Code_Number":{"$regex" : "' +
              this.state.filter_list[4] +
              '", "$options" : "i"}'
          );
      }
      let whereAnd = "{" + filter_array.join(",") + "}";
      this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&q="+ whereAnd +
        "&lmt=" +
        maxPage +
        "&pg=" +
        page
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ assignment_list: items, totalData: totalData });
      }
    });
  }

  getAllAssignment() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_array = [];
    // let date = this.state.filter_list_date && this.state.filter_list_date2 === null ? '{}' : '{"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 00:00:00"}}';
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"Assignment_No":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"Account_Name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"Project":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"Payment_Terms":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"Current_Status":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"Work_Status":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    if((this.state.userRole.findIndex("BAM-ASP") !== -1 || this.state.userRole.findIndex("BAM-ASP Management") !== -1) && this.state.userRole.findIndex("Admin") === -1){
      filter_array.push('"Vendor_Code_Number" : "'+this.state.vendor_code+'"');
    }else{
      this.state.filter_list[4] !== "" &&
        filter_array.push(
          '"Vendor_Code_Number":{"$regex" : "' +
            this.state.filter_list[4] +
            '", "$options" : "i"}'
        );
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&noPg=1&q=" + whereAnd
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        this.setState({ asg_all: items });
      }
    });
  }

  componentDidMount() {
    // this.getAssignmentList();
    // this.getAllAssignment();
    const dateNow = new Date();
    const dateToday = (dateNow.getFullYear().toString())+"-"+(dateNow.getMonth()+1).toString().padStart(2, '0')+"-"+(dateNow.getDate().toString().padStart(2, '0')) ;
    this.setState({filter_date: {
        filter_list_date: null,
        filter_list_date2: dateToday,
      }})
    document.title = "Assignment List | BAM";
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getAssignmentList();
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

  handleFilterDate(e) {
    const value = e.target.value;
    const name = e.target.name;
    let filterdate = this.state.filter_date;
    filterdate[name] = value;
    this.setState({filter_date : filterdate});
    if(this.state.filter_date.filter_list_date !== null && this.state.filter_date.filter_list_date2 !== null){
      this.onChangeDebounced(e)
    }
  }


  onChangeDebounced(e) {
    this.getAssignmentList();
    // this.getAllAssignment();
  }

  async downloadASGList() {
    let listASGAll = [];
    let getASG = await this.getDataFromAPI(
      "/asp_assignment_sorted_non_page?srt=_id:-1&"
    );
    if (getASG.data !== undefined) {
      listASGAll = getASG.data._items;
    }
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "Assignment ID",
      "Account Name",
      "Project Name",
      "SOW Type",
      "NW",
      "NW Activity",
      "Terms of Payment",
      "Item Status",
      "Work Status",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < listASGAll.length; i++) {
      let list = listASGAll[i];
      ws.addRow([
        list.Assignment_No,
        list.Account_Name,
        list.Project,
        list.SOW_Type,
        list.NW,
        list.NW_Activity,
        list.Payment_Terms,
        list.Item_Status,
        list.Work_Status,
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Assignment List.xlsx");
  }

  async getAssignmentPerPageGR(array_asg){
    let dataASG = [];
    let arrayDataASG = array_asg;
    let getNumberPage = Math.ceil(arrayDataASG.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
     let DataPaginationASG = arrayDataASG.slice(i * 25, (i+1)*25);
     let arrayIdASG = '"'+DataPaginationASG.join('", "')+'"';
     let where_id_ASG = '&where={"Assignment_No" : {"$in" : ['+arrayIdASG+']}}';
     let resASG = await this.getDataFromAPI('/gr_data?'+where_id_ASG);
     if(resASG !== undefined){
       if(resASG.data !== undefined){
         dataASG = dataASG.concat(resASG.data._items);
       }
     }
    }
    return dataASG;
  }

  // "2020-06-25T05:15:04.949Z"

  async downloadAllAssignment() {
    let allAssignmentList = [];
    let filter_array = [];
    if(this.state.filter_date.filter_list_date === null && this.state.filter_date.filter_list_date2 === null){

    } else {
      filter_array.push(
        '"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 23:59:59"}'
      );
    }
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"Assignment_No":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"Account_Name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"Project":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"Payment_Terms":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"Current_Status":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"Work_Status":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"Vendor_Code_Number" : "'+this.state.vendor_code+'"');
    }else{
      this.state.filter_list[4] !== "" &&
        filter_array.push(
          '"Vendor_Code_Number":{"$regex" : "' +
            this.state.filter_list[4] +
            '", "$options" : "i"}'
        );
    }
    let whereAnd = "{" + filter_array.join(",") + "}";
    let getASG = await this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&noPg=1&q=" + whereAnd
    );
    if (getASG.data !== undefined) {
      allAssignmentList = getASG.data.data;
    }

    let dataGRAsg = await this.getAssignmentPerPageGR(allAssignmentList.map(e => e.Assignment_No));

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "Assignment ID",
      "SH Assignment No.",
      "Project",
      "Sow Type",
      "Tower ID",
      "CD ID",
      "Vendor",
      "Payment Terms",
      "Total Amount",
      "Assignment Creator",
      "PO Number",
      "PO Item",
      "PO Date",
      "BAST Number (DP)",
      "BAST Number (Final)",
      "Request GR User (DP)", "Request GR Date (DP)", "GR Number (DP)", "GR Date (DP)", "Request GR User (Final)", "Request GR Date (Final)", "GR Number (FINAL)", "GR Date (FINAL)",
    ];
    let longestArraySSOW = Math.max.apply(Math, allAssignmentList.map(function (asg) { return asg.SSOW_List.length }));
    for(let i = 1; i <= longestArraySSOW; i++){headerRow.push("ssow id "+i, "ssow type "+i, "activity number "+i, "ssow unit "+i, "ssow qty "+i)};
    ws.addRow(headerRow);


    for (let i = 0; i < allAssignmentList.length; i++) {
      const custDel = allAssignmentList[i].cust_del !== undefined ?  allAssignmentList[i].cust_del.map(e => e.cd_id).join(", ") : null;
      const dataGR = dataGRAsg.filter(e => e.Assignment_No === allAssignmentList[i].Assignment_No);
      const totalAmount = allAssignmentList[i].SSOW_List.reduce((a,b) => a + b.ssow_total_price, 0);
      let dataCreator = undefined;
      dataCreator = allAssignmentList[i].ASP_Assignment_Status.find(st => st.status_value === "CREATED");
      if(dataCreator !== undefined){
        dataCreator = dataCreator.status_updater;
      }
      let rowAdded = [
        allAssignmentList[i].Assignment_No,
        allAssignmentList[i].SH_Assignment_No,
        allAssignmentList[i].Project,
        allAssignmentList[i].SOW_Type,
        allAssignmentList[i].Site_ID,
        custDel,
        allAssignmentList[i].Vendor_Name,
        allAssignmentList[i].Payment_Terms,
        totalAmount,
        dataCreator,
        allAssignmentList[i].PO_Number,
        allAssignmentList[i].PO_Item,
        allAssignmentList[i].PO_Date,
        allAssignmentList[i].BAST_No[0], allAssignmentList[i].BAST_No[1],
      ];
      if(dataGR[0] !== undefined){
        rowAdded.push(dataGR[0].Requestor, dataGR[0].created_on, dataGR[0].GR_Document_No, dataGR[0].GR_Document_Date)
      }else{
        rowAdded.push(null,null,null,null)
      }
      if(dataGR[1] !== undefined){
        rowAdded.push(dataGR[1].Requestor, dataGR[1].created_on, dataGR[1].GR_Document_No, dataGR[1].GR_Document_Date)
      }else{
        rowAdded.push(null,null,null,null)
      }
      const ssowList = allAssignmentList[i].SSOW_List;
      ssowList.map(ssow => rowAdded.push(
        ssow.ssow_id,
        ssow.sow_type,
        ssow.ssow_activity_number,
        ssow.ssow_unit,
        ssow.ssow_qty
      ))
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Assignment List.xlsx");
  }

  async downloadAllAssignmentBAST() {
    let allAssignmentList = [];
    let filter_array = [];
    if(this.state.filter_date.filter_list_date === null && this.state.filter_date.filter_list_date2 === null){

    } else {
      filter_array.push(
        '"created_on":{"$gte":"'+this.state.filter_date.filter_list_date+' 00:00:00", "$lte":"'+this.state.filter_date.filter_list_date2+' 23:59:59"}'
      );
    }
    this.state.filter_list[0] !== "" &&
      filter_array.push(
        '"Assignment_No":{"$regex" : "' +
          this.state.filter_list[0] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[1] !== "" &&
      filter_array.push(
        '"Account_Name":{"$regex" : "' +
          this.state.filter_list[1] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[2] !== "" &&
      filter_array.push(
        '"Project":{"$regex" : "' +
          this.state.filter_list[2] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[3] !== "" &&
      filter_array.push(
        '"cust_del.cd_id":{"$regex" : "' +
          this.state.filter_list[3] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[5] !== "" &&
      filter_array.push(
        '"Payment_Terms":{"$regex" : "' +
          this.state.filter_list[5] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[6] !== "" &&
      filter_array.push(
        '"Current_Status":{"$regex" : "' +
          this.state.filter_list[6] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[7] !== "" &&
      filter_array.push(
        '"Work_Status":{"$regex" : "' +
          this.state.filter_list[7] +
          '", "$options" : "i"}'
      );
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      filter_array.push('"Vendor_Code_Number" : "'+this.state.vendor_code+'"');
    }else{
      this.state.filter_list[7] !== "" &&
        filter_array.push(
          '"Work_Status":{"$regex" : "' +
            this.state.filter_list[4] +
            '", "$options" : "i"}'
        );
    }
    filter_array.push('"PO_Number" : {"$ne" : null}');
    let whereAnd = "{" + filter_array.join(",") + "}";
    let getASG = await this.getDataFromAPINODE(
      "/aspAssignment/aspassign?srt=_id:-1&q=" + whereAnd
    );
    if (getASG.data !== undefined) {
      allAssignmentList = getASG.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = ["id_assignment_doc", "Assignment_No", "sh_assignment_no",  "Account_Name", "ASP_Acceptance_Date", "WP_ID", "id_project_doc", "Project", "SOW_Type",
    "BAST_No", "GR_Type", "Payment_Terms", "Payment_Terms_Ratio", "GR_Percentage", "PO_Number", "PO_Item", "Item_Status", "Requestor"];
    ws.addRow(headerRow);

    for (let i = 0; i < allAssignmentList.length; i++) {
      let rowAdded = [allAssignmentList[i]._id, allAssignmentList[i].Assignment_No, allAssignmentList[i].SH_Assignment_No, "XL", allAssignmentList[i].ASP_Acceptance_Date !== null && allAssignmentList[i].ASP_Acceptance_Date !== undefined ? allAssignmentList[i].ASP_Acceptance_Date.slice(0, 10) : null, allAssignmentList[i].WP_ID, allAssignmentList[i].id_project_doc, allAssignmentList[i].Project, allAssignmentList[i].SOW_Type,
      null, null, allAssignmentList[i].Payment_Terms, null, null, allAssignmentList[i].PO_Number, allAssignmentList[i].PO_Item, null, null];
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), 'Assignment List For Migration BAST.xlsx');
  }

  async downloadAllAssignmentAcceptenceMigration() {
    let allAssignmentList = [];
    let getASG = await this.getDataFromAPINODE(
      '/aspAssignment/aspassign?srt=_id:-1&noPg=1&v={"Assignment_No" : 1, "SH_Assignment_No" : 1}'
    );
    if (getASG.data !== undefined) {
      allAssignmentList = getASG.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "bam_assignment_id",
      "sh_assignment_no",
      "notify_to_asp_date",
      "notify_to_asp_by",
      "asp_acceptance_date",
      "asp_acceptance_by",
      "asp_need_revise_date",
      "asp_need_revise_by",
      "assignment_cancel_date",
      "assignment_cancel_by",
    ];
    ws.addRow(headerRow);

    for (let i = 0; i < allAssignmentList.length; i++) {
      // let rowAdded = [allAssignmentList[i].Assignment_No, allAssignmentList[i].SH_Assignment_No, allAssignmentList[i].cust_del !== undefined ? allAssignmentList[i].cust_del.map(e => e.cd_id).join(', ') : null];
      let rowAdded = [
        allAssignmentList[i].Assignment_No,
        allAssignmentList[i].SH_Assignment_No,
      ];
      ws.addRow(rowAdded);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Assignment List For Acceptence Migration SH.xlsx"
    );
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < 8; i++) {
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

  render() {
    const downloadAssignment = {
      float: "right",
      marginRight: "10px",
    };

    const tableWidth = {
      width: "150px",
    };

    // yang belom bisa :
    // 1. Technical BOQ Vertical format uploader
    // 2. SAP Desc effect to Config
    // 3. TSSR BOQ Horizontal

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2" }}>
                  <i
                    className="fa fa-align-justify"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  Assignment List
                </span>
                <Button
                  style={downloadAssignment}
                  outline
                  color="success"
                  onClick={this.downloadAllAssignment}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download Assignment List Report
                </Button>
                {(this.state.userRole.findIndex(e => e === "BAM-Admin") !== -1) && (
                <Button
                  style={downloadAssignment}
                  outline
                  color="success"
                  onClick={this.downloadAllAssignmentBAST}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Template for BAST Bulk Migration
                </Button>
              )}
              </CardHeader>
              <CardBody>
                <Label><b>Filter Date</b></Label>
                <Row>
                  <div className="controls" style={{ width: "150px", marginLeft: "10px" }}>
                    <div>Start Date</div>
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="date"
                        placeholder="Search"
                        name={"filter_list_date"}
                        onChange={this.handleFilterDate}
                        value={this.state.filter_date.filter_list_date}
                        size="sm"
                      />
                    </InputGroup>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="controls" style={{ width: "150px" }}>
                    <div>End Date</div>
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="date"
                        placeholder="Search"
                        name={"filter_list_date2"}
                        onChange={this.handleFilterDate}
                        value={this.state.filter_date.filter_list_date2}
                        size="sm"
                      />
                    </InputGroup>
                  </div>
                </Row>
                &nbsp;&nbsp;&nbsp;
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>Assignment ID</th>
                      <th>Account Name</th>
                      <th>Project Name</th>
                      <th>CD ID</th>
                      <th>Vendor Name Type</th>
                      <th>Terms of Payment</th>
                      <th>Assignment Status</th>
                      <th>Work Status</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.assignment_list.length === 0 && (
                      <tr>
                        <td colSpan="10">Select Date First</td>
                      </tr>
                    )}
                    {this.state.assignment_list.map((list, i) => (
                      <tr key={list._id}>
                        <td>
                        {(this.state.userRole.findIndex(e => e === "BAM-ASP") === -1 && this.state.userRole.findIndex(e => e === "BAM-ASP Management") === -1) && (
                          <Link to={"/assignment-detail/" + list._id}>
                            <Button
                              style={{ width: "90px" }}
                              outline
                              color="info"
                              size="sm"
                            >
                              Detail
                            </Button>
                          </Link>
                        )}
                        </td>
                        <td>{list.Assignment_No}</td>
                        <td>{list.Account_Name}</td>
                        <td>{list.Project}</td>
                        <td>
                          {list.cust_del !== undefined && (list.cust_del.map(custdel => custdel.cd_id).join(' , '))}
                        </td>
                        <td>{list.Vendor_Name}</td>
                        <td>{list.Payment_Terms}</td>
                        <td>{list.Current_Status}</td>
                        <td>{list.Work_Status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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

export default connect(mapStateToProps)(AssignmentListReport);
