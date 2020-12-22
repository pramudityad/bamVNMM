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
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import {
  convertDateFormatfull,
  convertDateFormat,
} from "../../helper/basicFunction";
import { apiSendEmail, getDatafromAPIISAT } from "../../helper/asyncFunction";

const API_URL = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";

const API_URL_ISAT = "https://api-dev.isat.pdb.e-dpm.com/isatapi";
const usernameISAT = "adminbamidsuper";
const passwordISAT = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class ReadyToDeliver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      mr_list: [],
      prevPage: 0,
      activePage: 1,
      totalData: 0,
      perPage: 10,
      filter_list: new Array(14).fill(""),
      mr_all: [],
      action_status: null,
      action_message: "",
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
    this.downloadMRlist = this.downloadMRlist.bind(this);
    this.getMRList = this.getMRList.bind(this);
    this.getAllMR = this.getAllMR.bind(this);
    this.proceedMilestone = this.proceedMilestone.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  async getDataFromAPIEXEL(url) {
    console.log("url", url);
    try {
      let respond = await axios.get(API_URL_ISAT + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameISAT,
          password: passwordISAT,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Get Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Get Data", err);
      return respond;
    }
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

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(
        process.env.REACT_APP_API_URL_NODE + url,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.tokenUser,
          },
        }
      );
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err.response);
      return respond;
    }
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
    filter_array.push('"current_milestones":"MS_ORDER_PROCESSING"');
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
    // this.state.filter_list[9] !== "" && (filter_array.push('"creator.email":{"$regex" : "' + this.state.filter_list[9] + '", "$options" : "i"}'));
    this.state.filter_list[10] !== "" &&
      filter_array.push(
        '"updated_on":{"$regex" : "' +
          this.state.filter_list[10] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[11] !== "" &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list[11] +
          '", "$options" : "i"}'
      );
    this.props.match.params.whid !== undefined &&
      filter_array.push(
        '"origin.value" : "' + this.props.match.params.whid + '"'
      );
    filter_array.push(
      '"$or" : [{"current_mr_status": "LOM CONFIRMED (WAIT FOR COMPLETION)"}]'
    );
    let whereAnd = "{" + filter_array.join(",") + "}";
    this.getDataFromAPINODE(
      "/matreq?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
    ).then((res) => {
      if (res.data !== undefined) {
        const items = res.data.data;
        const totalData = res.data.totalResults;
        this.setState({ mr_list: items, totalData: totalData });
      }
    });
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
    filter_array.push('"current_milestones":"MS_ORDER_PROCESSING"');
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
    // this.state.filter_list[9] !== "" && (filter_array.push('"creator.email":{"$regex" : "' + this.state.filter_list[9] + '", "$options" : "i"}'));
    this.state.filter_list[10] !== "" &&
      filter_array.push(
        '"updated_on":{"$regex" : "' +
          this.state.filter_list[10] +
          '", "$options" : "i"}'
      );
    this.state.filter_list[11] !== "" &&
      filter_array.push(
        '"created_on":{"$regex" : "' +
          this.state.filter_list[11] +
          '", "$options" : "i"}'
      );
    this.props.match.params.whid !== undefined &&
      filter_array.push(
        '"origin.value" : "' + this.props.match.params.whid + '"'
      );
    filter_array.push(
      '"$or" : [{"current_mr_status": "LOM CONFIRMED (WAIT FOR COMPLETION)"}]'
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

  async getDataCDID(data_mr) {
    let arrayCD = [];
    arrayCD = data_mr.map((e) => e.cust_del).reduce((l, n) => l.concat(n), []);
    let array_cd_id = [...new Set(arrayCD.map(({ cd_id }) => cd_id))];
    let dataCDID = [];
    let getNumberPage = Math.ceil(array_cd_id.length / 20);
    for (let i = 0; i < getNumberPage; i++) {
      let DataPaginationWPID = array_cd_id.slice(i * 20, (i + 1) * 20);
      let array_in_cdid = '"' + DataPaginationWPID.join('", "') + '"';
      let projection =
        '&projection={"WP_ID" : 1, "C1043_WBS_HW" : 1, "C1023_WBS_HWAC" : 1, "C1033_WBS_LCM" : 1, "C1003_WBS_PNRO" : 1, "C1053_WBS_SW" : 1, "C1063_C1053_WBS_PS" : 1, "C1066_C1053_WBS_ANC" : 1, "C1034_WBS_PowHW_Site_Basis" : 1, "C1035_WBS_PowLCM_Site_Basis" : 1, "C1036_WBS_Kathrein" : 1}';
      const getWPID = await getDatafromAPIISAT(
        '/custdel_sorted?where={"WP_ID":{"$in" : [' +
          array_in_cdid +
          "]}}" +
          projection,
        this.state.tokenUser
      );
      if (getWPID !== undefined && getWPID.data !== undefined) {
        dataCDID = dataCDID.concat(getWPID.data._items);
      }
    }
    return dataCDID;
  }

  async downloadMRlist() {
    this.toggleLoading();
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const allMR = await this.getAllMR();

    let dataCDID = [];
    if (allMR.cust_del !== undefined) {
      dataCDID = await this.getDataCDID(allMR);
    }

    let headerRow = [
      "MR ID",
      "MR MITT ID",
      "MR Type",
      "MR Delivery Type",
      "Project Name",
      "CD ID",
      "Project PO",
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
      "WBS HW",
      "WBS HWAC (License)",
      "WBS LCM",
      "WBS PNRO",
      "WBS SW",
      "WBS PS",
      "WBS ANC",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < allMR.length; i++) {
      let dataCDIDIdx = {};
      if (allMR[i].cust_del[0] !== undefined) {
        dataCDIDIdx = dataCDID.find(
          (dc) => dc.WP_ID === allMR[i].cust_del[0].cd_id
        );
        if (dataCDIDIdx === undefined) {
          dataCDIDIdx = {};
        }
      }

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
        allMR[i].project_po,
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
        dataCDIDIdx.C1043_WBS_HW,
        dataCDIDIdx.C1023_WBS_HWAC,
        dataCDIDIdx.C1033_WBS_LCM,
        dataCDIDIdx.C1003_WBS_PNRO,
        dataCDIDIdx.C1053_WBS_SW,
        dataCDIDIdx.C1063_C1053_WBS_PS,
        dataCDIDIdx.C1066_C1053_WBS_ANC,
      ]);
      const getRowLast = ws.lastRow._number;
      ws.getCell("M" + getRowLast).numFmt = "YYYY-MM-DD";
      ws.getCell("Q" + getRowLast).numFmt = "YYYY-MM-DD";
      ws.getCell("P" + getRowLast).numFmt = "YYYY-MM-DD";
      if (creator_mr_mitt !== undefined && creator_mr_mitt !== null) {
        ws.getCell("N" + getRowLast).numFmt = "YYYY-MM-DD";
      }
    }
    this.toggleLoading();
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "MR List Ready To Delivery.xlsx");
  }

  async patchDataToAPI(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL + url, data, {
        headers: {
          "Content-Type": "application/json",
          "If-Match": _etag,
        },
        auth: {
          username: username,
          password: password,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = undefined;
      this.setState({
        action_status: "failed",
        action_message: "Sorry, there is something wrong, please try again!",
      });
      console.log("respond patch data", err);
      return respond;
    }
  }

  async proceedMilestone(e) {
    const newDate = new Date();
    const dateNow =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate() +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();
    const _etag = e.target.value;
    const _id = e.target.id;
    let dataMR = this.state.mr_list.find((e) => e._id === _id);
    let dataProject = undefined;
    if (dataMR !== undefined) {
      // dataProject = await this.getDataProject(dataMR.project_name);
    }
    let res = await this.patchDatatoAPINODE("/matreq/confirmRTD/" + _id);
    if (res !== undefined) {
      if (res.data !== undefined) {
        if (dataProject !== undefined) {
          // let linkImp = "https://dev.bam-id.e-dpm.com/mr-detail/"+id_doc;
          let linkImp = "#";
          const bodyEmail =
            "<h2>DPM - BAM Notification</h2><br/><span>Please be notified that the following MR have reached the Joint Check stage<br/><br/><i>Site</i>: <b>" +
            dataMR.site_info.map((site_info) => site_info.site_id).join(" , ") +
            "</b> <br/><i>Project</i>: <b>" +
            dataMR.project_name +
            "</b><br/><i>MR</i>: <b>" +
            dataMR.mr_id +
            "</b><br/><br/>RTD Milestone is done by " +
            this.state.userEmail +
            ".</span><br/><br/><br/><br/>Please follow this link to see the MR detail:<br/><a href='" +
            linkImp +
            "'>" +
            linkImp +
            "</a>";
          let dataEmail = {
            // "to": cpm_email+'; aminuddin.fauzan@ericsson.com',
            to: dataProject.Email_CPM_Name + " ;",
            subject: "[MR Joint Checked] MR " + dataProject.mr_id,
            body: bodyEmail,
          };
          // console.log(dataEmail)
          const sendEmail = await apiSendEmail(dataEmail);
        }
        this.setState({ action_status: "success" });
        this.getMRList();
        // setTimeout(function(){this.setState({action_status : null, action_message : null}) }, 2000);
      } else {
        if (
          res.response !== undefined &&
          res.response.data !== undefined &&
          res.response.data.error !== undefined
        ) {
          if (res.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error.message,
            });
          } else {
            this.setState({
              action_status: "failed",
              action_message: res.response.data.error,
            });
          }
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  componentDidMount() {
    this.getMRList();
    // this.getAllMR();
    document.title = "Ready To Deliver | BAM";
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

  render() {
    function AlertProcess(props) {
      const alert = props.alertAct;
      const message = props.messageAct;
      if (alert === "failed") {
        return (
          <div className="alert alert-danger" role="alert">
            {message.length !== 0
              ? message
              : "Sorry, there was an error when we tried to save it, please reload your page and try again"}
          </div>
        );
      } else {
        if (alert === "success") {
          return (
            <div className="alert alert-success" role="alert">
              {message}
              Your action was success, please reload your page
            </div>
          );
        } else {
          return <div></div>;
        }
      }
    }

    const downloadMR = {
      float: "right",
    };

    return (
      <div className="animated fadeIn">
        <AlertProcess
          alertAct={this.state.action_status}
          messageAct={this.state.action_message}
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
                  Ready To Deliver
                </span>
                <Button
                  style={downloadMR}
                  outline
                  color="success"
                  onClick={this.downloadMRlist}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download MR List
                </Button>
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>MR ID</th>
                      <th>Project Name</th>
                      <th>CD ID</th>
                      <th>Site ID</th>
                      <th>Site Name</th>
                      <th>Current Status</th>
                      <th>Current Milestone</th>
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
                            color="primary"
                            size="sm"
                            className="btn-pill"
                            style={{ width: "80px" }}
                            id={list._id}
                            value={list._etag}
                            onClick={this.proceedMilestone}
                          >
                            <i
                              className="fa fa-angle-double-right"
                              style={{ marginRight: "8px" }}
                            ></i>
                            Done
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
                    Showing {this.state.mr_list.length} entries from{" "}
                    {this.state.totalData} data
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
        <Modal
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm " + this.props.className}
        >
          <ModalBody>
            <div style={{ textAlign: "center" }}>
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>Loading ...</div>
            <div style={{ textAlign: "center" }}>System is processing ...</div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
        {/* end Modal Loading */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(ReadyToDeliver);
