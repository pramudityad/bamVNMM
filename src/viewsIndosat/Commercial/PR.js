import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Collapse,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./boqCommercial.css";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { AppSwitch } from "@coreui/react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { connect } from "react-redux";
import jsonData from "./jsonData.js";
import debounce from "lodash.debounce";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  inValue = "",
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={inValue}
    className="checkmark-dash"
  />
);

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL = "https://api-dev.smart.pdb.e-dpm.com/smartapi";
const usernamePhilApi = "pdbdash";
const passwordPhilApi = "rtkO6EZLkxL1";

const API_URL_BAM = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

const API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

class CommercialBoq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_comm_boq: null,
      data_comm_boq_version: null,
      data_comm_boq_items: [],
      data_comm_boq_items_version: [],
      list_tech_boq: [],
      list_tech_boq_selection: [],
      data_tech_boq_selected: null,
      data_tech_boq_sites_selected: [],
      list_version: [],
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      boq_comm_API: null,
      pp_all: [],
      boq_tech_API: [],
      boq_tech_sites: [],
      bpq_comm_items: [],
      prev_boq_tech_select: null,
      Boq_Technical_Select: null,
      groupingView: [],
      commercialData: [],
      boq_comm_API_now: [],
      commercialDataGroup: [],
      commercialData_now: [],
      project_select: null,
      project_name_select: null,
      rowsComm: [],
      qty_cust: new Map(),
      qty_ericsson: new Map(),
      early_start: false,
      unit_price: new Map(),
      curr_rev: null,
      action_status: null,
      action_message: null,
      checkedCommItem: new Map(),
      checkedCommItem_all: false,
      get_item_ilang: [],
      email_created_by: null,
      modal_loading: false,
      list_po_number: [],
      po_selected: null,
      po_number_selected: null,
      project_all: [],
      version_now: null,
      version_selected: null,
      format_rev: [],
      dataPerGrouping: [],
      toggleShowGroup: false,
      redirectSign: false,
      collapse: false,
      dropdownOpen: new Array(1).fill(false),
      noteChange: new Array(7).fill(null),
      fieldNoteChange: new Array(7).fill(null),
      note_version: null,
      opportunity_id: null,
      inputValue: "",
      databoq: [],
      currencyChange: new Map(),
      currencyChangeAll: null,
      incentiveChange: new Map(),
      UnitPriceIDRChange: new Map(),
      UnitPriceUSDChange: new Map(),
      TotalPriceIDRChange: new Map(),
      TotalPriceUSDChange: new Map(),
      total_comm: {},
      boq_tech_select: {},
      service_library : [],
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.showGroupToggle = this.showGroupToggle.bind(this);
    this.filterTechBoq = this.filterTechBoq.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeChecklistAll = this.handleChangeChecklistAll.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeincentive = this.handleChangeincentive.bind(this);
    this.handleChangeUnitPriceIDR = this.handleChangeUnitPriceIDR.bind(this);
    this.handleChangeUnitPriceUSD = this.handleChangeUnitPriceUSD.bind(this);
    this.handleChangeTotalPriceIDR = this.handleChangeTotalPriceIDR.bind(this);
    this.handleChangeTotalPriceUSD = this.handleChangeTotalPriceUSD.bind(this);
    this.updateCommercial = this.updateCommercial.bind(this);
    this.onChangeDebouncedTotalIDR = debounce(
      this.onChangeDebouncedTotalIDR,
      500
    );
    this.onChangeDebouncedTotalUSD = debounce(
      this.onChangeDebouncedTotalUSD,
      500
    );
  }

  checkValueReturn(value1, value2) {
    // if value undefined return Value2
    if (typeof value1 !== "undefined" && value1 !== null) {
      console.log("value1", value1);
      return value1;
    } else {
      console.log("value2", value2);
      return value2;
    }
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  toggleUpload() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  onEntering() {
    this.setState({ status: "Opening..." });
  }

  onEntered() {
    this.setState({ status: "Opened" });
  }

  onExiting() {
    this.setState({ status: "Closing..." });
  }

  onExited() {
    this.setState({ status: "Closed" });
  }

  numToAlphabet(num) {
    var s = "",
      t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = ((num - t) / 26) | 0;
    }
    return s || undefined;
  }

  showGroupToggle() {
    this.setState((prevState) => ({
      toggleShowGroup: !prevState.toggleShowGroup,
    }));
  }

  async saveAsExcel() {
    const wb = new Excel.Workbook();

    const ws = wb.addWorksheet();

    const row = ws.addRow(["a", "b", "c"]);
    row.font = { bold: true };

    const buf = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buf]), "abc.xlsx");
  }

  checkValue(props) {
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoZero(props) {
    //Swap undefined or null to 0
    if (typeof props === "undefined" || props === null || props === "") {
      return 0;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    //Swap undefined or null to 0
    if (typeof props == "undefined" || props == null) {
      return "";
    } else {
      return props;
    }
  }

  isSameValue(element, value) {
    //function for FindIndex
    return element === value;
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex((e) => this.isSameValue(e, value));
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

  async patchDatatoAPINODE(url, data) {
    try {
      let respond = await axios.patch(API_URL_NODE + url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      this.setState({
        action_status: "failed",
        action_message:
          "Sorry, There is something error, please refresh page and try again",
      });
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(API_URL_NODE + url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      this.setState({
        action_status: "failed",
        action_message:
          "Sorry, There is something error, please refresh page and try again",
      });
      console.log("respond Post Data", err);
      return respond;
    }
  }

  handleChangeChecklist(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      checkedCommItem: prevState.checkedCommItem.set(item, isChecked),
    }));
    this.setState({ get_item_ilang: [item] });
  }

  handleChangeChecklistAll(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const AllItem = this.state.commercialData;
    const OnlyGroup = [...new Set(AllItem.map(({ pp_id }) => pp_id))];
    if (isChecked === true) {
      for (let x = 0; x < OnlyGroup.length; x++) {
        this.setState((prevState) => ({
          checkedCommItem: prevState.checkedCommItem.set(OnlyGroup[x], true),
        }));
      }
      this.setState({ checkedCommItem_all: true });
    } else {
      for (let x = 0; x < OnlyGroup.length; x++) {
        this.setState((prevState) => ({
          checkedCommItem: prevState.checkedCommItem.set(OnlyGroup[x], false),
        }));
      }
      this.setState({ checkedCommItem_all: false });
    }
    this.setState({ get_item_ilang: [item] });
  }

  toggleEdit() {
    this.setState((prevState) => ({
      modalEdit: !prevState.modalEdit,
    }));
  }

  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      this.getCommBoqData(this.props.match.params.id);
    } else {
      this.getTechBoqList();
    }
  }

  async getCommBoqData(_id) {
    let getComm = await this.getDataFromAPINODE("/commBoqIsat/" + _id);
    if (getComm.data !== undefined) {
      this.setState({ data_comm_boq_items: getComm.data.data.items, data_comm_boq: getComm.data.data }, () =>
        this.getServiceLibrary()
      );
    }
  }

  async getServiceLibrary() {
    let getSvc = await this.getDataFromAPINODE("/libser/getLibSer?lmt=20&pg=1");
    if (getSvc.data !== undefined) {
      this.setState({ service_library: getSvc.data.data});
    }
  }

  handleChangeincentive = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({
      incentiveChange: prevState.incentiveChange.set(name, value),
    }));
  };

  handleChangeUnitPriceIDR = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        UnitPriceIDRChange: prevState.UnitPriceIDRChange.set(name, value),
      }),
      () => {
        this.onChangeDebouncedTotalIDR(name, value);
      }
    );
  };

  handleChangeUnitPriceUSD = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        UnitPriceUSDChange: prevState.UnitPriceUSDChange.set(name, value),
      }),
      () => {
        this.onChangeDebouncedTotalUSD(name, value);
      }
    );
  };

  onChangeDebouncedTotalIDR(name, value) {
    this.handleChangeTotalPriceIDR(name, value);
  }

  onChangeDebouncedTotalUSD(name, value) {
    this.handleChangeTotalPriceUSD(name, value);
  }

  handleChangeTotalPriceIDR = (name, value) => {
    // const name = e.target.name;
    // let value = e.target.value;
    if (
      this.state.version_selected !== null &&
      this.state.data_comm_boq.version !== this.state.version_selected
    ) {
      let findSite = this.state.data_comm_boq_items_version.find(
        (e) => e.site_id === name.split(" /// ")[0]
      );
      let findConfig = findSite.itemsVersion.find(
        (e) => e.config_id === name.split(" /// ")[1]
      );
      this.setState((prevState) => ({
        TotalPriceIDRChange: prevState.TotalPriceIDRChange.set(
          name,
          parseFloat(value) * findConfig.qty
        ),
      }));
    } else {
      let findSite = this.state.data_comm_boq_items.find(
        (e) => e.site_id === name.split(" /// ")[0]
      );
      let findConfig = findSite.items.find(
        (e) => e.config_id === name.split(" /// ")[1]
      );
      this.setState((prevState) => ({
        TotalPriceIDRChange: prevState.TotalPriceIDRChange.set(
          name,
          parseFloat(value) * findConfig.qty
        ),
      }));
    }
  };

  handleChangeTotalPriceUSD = (name, value) => {
    // const name = e.target.name;
    // let value = e.target.value;
    if (
      this.state.version_selected !== null &&
      this.state.data_comm_boq.version !== this.state.version_selected
    ) {
      let findSite = this.state.data_comm_boq_items_version.find(
        (e) => e.site_id === name.split(" /// ")[0]
      );
      let findConfig = findSite.itemsVersion.find(
        (e) => e.config_id === name.split(" /// ")[1]
      );
      this.setState((prevState) => ({
        TotalPriceUSDChange: prevState.TotalPriceUSDChange.set(
          name,
          parseFloat(value) * findConfig.qty
        ),
      }));
    } else {
      let findSite = this.state.data_comm_boq_items.find(
        (e) => e.site_id === name.split(" /// ")[0]
      );
      let findConfig = findSite.items.find(
        (e) => e.config_id === name.split(" /// ")[1]
      );
      this.setState((prevState) => ({
        TotalPriceUSDChange: prevState.TotalPriceUSDChange.set(
          name,
          parseFloat(value) * findConfig.qty
        ),
      }));
    }
  };

  updateCommercial = async (e) => {
    this.toggleLoading();
    let revisionType = e.currentTarget.value;
    let revision = true;
    if (revisionType === "save") {
      revision = false;
    }
    let dataComm = this.state.data_comm_boq;
    const incentive_amount = this.state.incentiveChange;
    const unit_price_idr_amount = this.state.UnitPriceIDRChange;
    const unit_price_usd_amount = this.state.UnitPriceUSDChange;
    const total_price_idr_amount = this.state.TotalPriceIDRChange;
    const total_price_usd_amount = this.state.TotalPriceUSDChange;
    for (const [key, value] of unit_price_idr_amount.entries()) {
      const siteKey = key.split(" /// ")[0];
      const configKey = key.split(" /// ")[1];
      const siteIndex = dataComm.site.findIndex((e) => e.site_id === siteKey);
      if (siteIndex !== -1) {
        const siteConfigIndex = dataComm.site[siteIndex].items.findIndex(
          (e) => e.config_id === configKey
        );
        if (siteConfigIndex !== -1) {
          dataComm.site[siteIndex].items[siteConfigIndex][
            "net_price_incentive"
          ] = parseFloat(value);
        }
      }
    }
    for (const [key, value] of unit_price_usd_amount.entries()) {
      const siteKey = key.split(" /// ")[0];
      const configKey = key.split(" /// ")[1];
      const siteIndex = dataComm.site.findIndex((e) => e.site_id === siteKey);
      if (siteIndex !== -1) {
        const siteConfigIndex = dataComm.site[siteIndex].items.findIndex(
          (e) => e.config_id === configKey
        );
        if (siteConfigIndex !== -1) {
          dataComm.site[siteIndex].items[siteConfigIndex][
            "net_price_incentive_usd"
          ] = parseFloat(value);
        }
      }
    }
    let updateCommBoq = {
      version_check: revision,
      data: dataComm,
    };
    let updateComm = await this.patchDatatoAPINODE(
      "/commBoq/updateCommercial/" + dataComm._id,
      updateCommBoq
    );
    if (updateComm.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      this.setState({ action_status: "success" });
    }
    this.toggleLoading();
  };

  handleChangeVersion(e) {
    const value = e.target.value;
    this.setState({ version_selected: value }, () => {
      if (value !== this.state.data_comm_boq.version) {
        this.setState({
          UnitPriceIDRChange: new Map(),
          UnitPriceUSDChange: new Map(),
          TotalPriceIDRChange: new Map(),
          TotalPriceUSDChange: new Map(),
        });
        this.getVersionCommBoqData(this.props.match.params.id, value);
      } else {
        this.setState({
          UnitPriceIDRChange: new Map(),
          UnitPriceUSDChange: new Map(),
          TotalPriceIDRChange: new Map(),
          TotalPriceUSDChange: new Map(),
        });
        this.getCommBoqData(this.props.match.params.id);
      }
    });
  }

  getVersionCommBoqData(_id_comm, ver) {
    this.toggleLoading();
    this.getDataFromAPINODE("/commBoq/" + _id_comm + "/ver/" + ver).then(
      (res) => {
        if (res.data !== undefined) {
          const dataComm = res.data;
          this.setState(
            { data_comm_boq_items_version: dataComm.data.siteVersion },
            () => {
              this.getDataFormCommBoq(dataComm.data.siteVersion);
            }
          );
        } else {
          this.toggleLoading();
        }
      }
    );
  }

  getDataFormCommBoq(itemsSite) {
    let UnitPriceIDRAmount = new Map();
    let UnitPriceUSDAmount = new Map();
    let TotalPriceIDRAmount = new Map();
    let TotalPriceUSDAmount = new Map();
    for (let i = 0; i < itemsSite.length; i++) {
      for (let j = 0; j < itemsSite[i].itemsVersion.length; j++) {
        let UnitPriceIDRAmountIdx =
          itemsSite[i].itemsVersion[j].net_price_incentive !== undefined
            ? itemsSite[i].itemsVersion[j].net_price_incentive
            : 0;
        UnitPriceIDRAmount.set(
          itemsSite[i].itemsVersion[j].site_id +
            " /// " +
            itemsSite[i].itemsVersion[j].config_id,
          UnitPriceIDRAmountIdx
        );
        let UnitPriceUSDAmountIdx =
          itemsSite[i].itemsVersion[j].net_price_incentive_usd !== undefined
            ? itemsSite[i].itemsVersion[j].net_price_incentive_usd
            : 0;
        UnitPriceUSDAmount.set(
          itemsSite[i].itemsVersion[j].site_id +
            " /// " +
            itemsSite[i].itemsVersion[j].config_id,
          UnitPriceUSDAmountIdx
        );
        let TotalPriceIDRAmountIdx =
          itemsSite[i].itemsVersion[j].total_price_incentive !== undefined
            ? itemsSite[i].itemsVersion[j].total_price_incentive
            : 0;
        TotalPriceIDRAmount.set(
          itemsSite[i].itemsVersion[j].site_id +
            " /// " +
            itemsSite[i].itemsVersion[j].config_id,
          TotalPriceIDRAmountIdx
        );
        let TotalPriceUSDAmountIdx =
          itemsSite[i].itemsVersion[j].total_price_incentive_usd !== undefined
            ? itemsSite[i].itemsVersion[j].total_price_incentive_usd
            : 0;
        TotalPriceUSDAmount.set(
          itemsSite[i].itemsVersion[j].site_id +
            " /// " +
            itemsSite[i].itemsVersion[j].config_id,
          TotalPriceUSDAmountIdx
        );
      }
    }
    this.toggleLoading();
    this.setState({
      UnitPriceIDRChange: UnitPriceIDRAmount,
      UnitPriceUSDChange: UnitPriceUSDAmount,
      TotalPriceIDRChange: TotalPriceIDRAmount,
      TotalPriceUSDChange: TotalPriceUSDAmount,
    });
  }

  prepareDataforSaveComm(dataTech) {
    const dataSelection = this.state.checkedCommItem;
    let dataCommNew = Object.assign({}, dataTech);
    for (let i = 0; i < dataCommNew.techBoqSite.length; i++) {
      for (
        let j = 0;
        j < dataCommNew.techBoqSite[i].siteItemConfig.length;
        j++
      ) {
        let conf = dataCommNew.techBoqSite[i].siteItemConfig[j];
        if (conf.qty_res !== undefined) {
          dataCommNew.techBoqSite[i].siteItemConfig[j]["qty"] = conf.qty_res;
          delete dataCommNew.techBoqSite[i].siteItemConfig[j].qty_rest;
        }
        if (
          dataSelection.get(
            conf.no_tech_boq + " /// " + conf.site_id + " /// " + conf.config_id
          ) !== true
        ) {
          dataCommNew.techBoqSite[i].siteItemConfig[j]["deleted"] = true;
        }
      }
      dataCommNew.techBoqSite[i]["siteItemConfig"] = dataCommNew.techBoqSite[
        i
      ].siteItemConfig.filter((e) => e.deleted !== true);
      if (dataCommNew.techBoqSite[i].siteItemConfig.length === 0) {
        dataCommNew.techBoqSite[i]["deleted"] = true;
      }
    }
    dataCommNew["techBoqSite"] = dataCommNew.techBoqSite.filter(
      (e) => e.deleted !== true
    );
    return dataCommNew;
  }

  saveCommtoAPI = async () => {
    this.toggleLoading();
    // let dataCommNew = await this.prepareDataforSaveComm(this.state.data_tech_boq_selected);
    let dataCommNew = this.state.data_tech_boq_selected;
    let postComm = await this.postDatatoAPINODE("/commBoq/createCommercial", {
      data: [dataCommNew],
    });
    if (postComm.data !== undefined) {
      this.setState({ action_status: "success" }, () => {
        setTimeout(
          function () {
            this.setState({ redirectSign: postComm.data.cboqInfo._id });
          }.bind(this),
          2000
        );
      });
    } else {
      if (postComm.response !== undefined) {
        this.setState({
          action_status: "failed",
          action_message: postComm.response.error,
        });
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  };

  fileHandlerCommercial = (event) => {
    let fileObj = event.target.files[0];
    const date = new Date();
    const DateNow =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        } else {
          console.log("rest.rows", JSON.stringify(rest.rows));
          this.setState(
            {
              rowsComm: rest.rows,
            },
            () => {
              this.makeFormatintoMap(rest.rows);
            }
          );
        }
      });
    }
  };

  makeFormatintoMap(rowsXLS) {
    let dataCommItem = this.state.data_comm_boq_items;
    const dataHeader = rowsXLS[0];
    let unitPriceIDR = new Map();
    let unitPriceUSD = new Map();
    let totalPriceIDR = new Map();
    let totalPriceUSD = new Map();
    for (let i = 1; i < rowsXLS.length; i++) {
      let config_id_upload = this.checkValue(
        rowsXLS[i][this.getIndex(dataHeader, "config_id")]
      );
      let tower_id_upload = this.checkValue(
        rowsXLS[i][this.getIndex(dataHeader, "tower_id")]
      );
      let unit_idr = this.checkValue(
        rowsXLS[i][this.getIndex(dataHeader, "unit_price_idr")]
      );
      let unit_usd = this.checkValue(
        rowsXLS[i][this.getIndex(dataHeader, "unit_price_usd")]
      );
      let dataTowerIdx = dataCommItem.find(
        (e) => e.site_id === tower_id_upload
      );
      if (dataTowerIdx !== undefined) {
        let dataConfigIdx = dataTowerIdx.items.find(
          (e) => e.config_id === config_id_upload
        );
        if (dataConfigIdx !== undefined) {
          unitPriceIDR.set(
            tower_id_upload + " /// " + config_id_upload,
            unit_idr
          );
          totalPriceIDR.set(
            tower_id_upload + " /// " + config_id_upload,
            parseFloat(unit_idr) * dataConfigIdx.qty
          );
          unitPriceUSD.set(
            tower_id_upload + " /// " + config_id_upload,
            unit_usd
          );
          totalPriceUSD.set(
            tower_id_upload + " /// " + config_id_upload,
            parseFloat(unit_usd) * dataConfigIdx.qty
          );
        }
      }
    }
    this.setState({
      UnitPriceIDRChange: unitPriceIDR,
      UnitPriceUSDChange: unitPriceUSD,
      TotalPriceIDRChange: totalPriceIDR,
      TotalPriceUSDChange: totalPriceUSD,
    });
  }

  checkFormat(dataXLS) {
    if (this.getIndex(dataXLS[0], "package_key") !== -1) {
      if (
        this.getIndex(dataXLS[0], "unit_price") !== -1 ||
        this.getIndex(dataXLS[0], "smart_stock") !== -1 ||
        this.getIndex(dataXLS[0], "qty_ericsson") !== -1
      ) {
        this.setState({ action_status: null });
      } else {
        this.setState({
          action_status: "failed",
          action_message: "Please Check your format data",
        });
      }
    } else {
      this.setState({
        action_status: "failed",
        action_message: "Please Check your format data",
      });
    }
  }

  filterTechBoq = (inputValue) => {
    const list = [];
    this.state.list_tech_boq.map((i) =>
      list.push({ label: i.no_tech_boq, value: i._id })
    );
    this.setState({ list_tech_boq_selection: list });
    if (inputValue.length === 0) {
      return list;
    } else {
      return this.state.list_tech_boq_selection.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  };

  loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(this.filterTechBoq(inputValue));
    }, 500);
  };

  handleInputChange = (newValue) => {
    this.setState({
      data_tech_boq_sites_selected: [],
      data_tech_boq_selected: null,
    });
    this.getTechBoqData(newValue.value);
    return newValue;
  };

  getTechBoqData(_id_tech) {
    this.getDataFromAPINODE("/techBoqForComm/" + _id_tech).then((res) => {
      if (res.data !== undefined) {
        const dataTech = res.data;
        this.setState({ data_tech_boq_selected: dataTech.data });
        if (res.data.data !== undefined) {
          this.setState({
            data_tech_boq_sites_selected: dataTech.data.techBoqSite,
          });
        }
      }
    });
  }

  exportCommercial = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataComm = this.state.data_comm_boq;
    let dataSites = [];
    if (
      this.state.version_selected !== null &&
      dataComm.version !== this.state.version_selected
    ) {
      dataSites = this.state.data_comm_boq_items_version;
    } else {
      dataSites = this.state.data_comm_boq_items;
    }

    const DatePrint = new Date();
    const DatePrintOnly =
      DatePrint.getFullYear() +
      "-" +
      (DatePrint.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      DatePrint.getDay().toString().padStart(2, "0");

    const prepared = ws.mergeCells("A4:E4");
    ws.getCell("A4").value = "prepared";
    ws.getCell("A4").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("A4").font = { size: 8 };
    ws.getCell("A4").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    const preparedEmail = ws.mergeCells("A5:E5");
    ws.getCell("A5").value = this.state.userEmail;
    ws.getCell("A5").alignment = { horizontal: "left" };
    ws.getCell("A5").border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    const DocumentNo = ws.mergeCells("F4:I4");
    ws.getCell("F4").value = "Document No.";
    ws.getCell("F4").font = { size: 8 };
    ws.getCell("F4").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("F4").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    const DocumentNum = ws.mergeCells("F5:I5");
    ws.getCell("F5").value = dataComm.no_comm_boq;
    ws.getCell("F5").alignment = { horizontal: "left" };
    ws.getCell("F5").border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    const Approved = ws.mergeCells("A6:C7");
    ws.getCell("A6").value = "Approved";
    ws.getCell("A6").font = { size: 8 };
    ws.getCell("A6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("A6").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
    };

    const Checked = ws.mergeCells("D6:E7");
    ws.getCell("D6").value = "Checked";
    ws.getCell("D6").font = { size: 8 };
    ws.getCell("D6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("D6").border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    const dateDoc = ws.mergeCells("F6:G6");
    ws.getCell("F6").value = "Date";
    ws.getCell("F6").font = { size: 8 };
    ws.getCell("F6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("F6").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    const dateDocument = ws.mergeCells("F7:G7");
    ws.getCell("F7").value = DatePrintOnly;
    ws.getCell("F7").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("F7").border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    const revDoc = ws.mergeCells("H6:I6");
    ws.getCell("H6").value = "Ver.";
    ws.getCell("H6").font = { size: 8 };
    ws.getCell("H6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("H6").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    const revDocNum = ws.mergeCells("H7:I7");
    ws.getCell("H7").value = dataComm.version;
    ws.getCell("H7").alignment = { horizontal: "left" };
    ws.getCell("H7").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    ws.mergeCells("A9:I9");
    ws.getCell("A9").value = "Commercial BOQ";
    ws.getCell("A9").font = { size: 14, bold: true };
    ws.getCell("A9").alignment = { vertical: "middle", horizontal: "center" };
    ws.getCell("A9").border = { bottom: { style: "double" } };

    ws.addRow(["Project", dataComm.project_name, "", "", "", "", "", "", ""]);
    ws.addRow([
      "Created On",
      dataComm.created_on,
      "",
      "",
      "",
      "",
      "Updated On",
      dataComm.updated_on,
      "",
    ]);
    ws.addRow([
      "Technical Ref",
      ": " + dataComm.list_of_tech.length !== 0
        ? dataComm.list_of_tech[0].no_tech_boq
        : "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    ws.mergeCells("B10:C10");
    ws.mergeCells("B11:C11");
    ws.mergeCells("B12:C12");
    ws.mergeCells("H10:I10");
    ws.mergeCells("H11:I11");
    ws.mergeCells("H12:I12");

    ws.addRow([""]);

    let ppIdRow = [
      "Tower ID",
      "Program",
      "SOW",
      "Category",
      "Config ID",
      "SAP",
      "SAP Description",
      "Qty",
      "Description",
      "Unit Price after Incentive (USD)",
      "Unit Price after Incentive (IDR)",
      "Total Price after Incentive (USD)",
      "Total Price after Incentive (IDR)",
    ];

    ws.addRow(ppIdRow);
    for (let i = 0; i < dataSites.length; i++) {
      let qtyConfig = [];
      if (
        this.state.version_selected !== null &&
        dataComm.version !== this.state.version_selected
      ) {
        for (let j = 0; j < dataSites[i].itemsVersion.length; j++) {
          ws.addRow([
            dataSites[i].site_id,
            dataSites[i].program,
            dataSites[i].sow,
            dataSites[i].itemsVersion[j].config_type,
            dataSites[i].itemsVersion[j].config_id,
            dataSites[i].itemsVersion[j].sap_number,
            dataSites[i].itemsVersion[j].sap_description,
            dataSites[i].itemsVersion[j].qty,
            dataSites[i].itemsVersion[j].description,
            dataSites[i].itemsVersion[j].net_price_incentive_usd,
            dataSites[i].itemsVersion[j].net_price_incentive,
            dataSites[i].itemsVersion[j].total_price_incentive_usd,
            dataSites[i].itemsVersion[j].total_price_incentive,
          ]);
        }
      } else {
        for (let j = 0; j < dataSites[i].items.length; j++) {
          ws.addRow([
            dataSites[i].site_id,
            dataSites[i].program,
            dataSites[i].sow,
            dataSites[i].items[j].config_type,
            dataSites[i].items[j].config_id,
            dataSites[i].items[j].sap_number,
            dataSites[i].items[j].sap_description,
            dataSites[i].items[j].qty,
            dataSites[i].items[j].description,
            dataSites[i].items[j].net_price_incentive_usd,
            dataSites[i].items[j].net_price_incentive,
            dataSites[i].items[j].total_price_incentive_usd,
            dataSites[i].items[j].total_price_incentive,
          ]);
        }
      }
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "Commercial BOQ " + dataComm.no_comm_boq + ".xlsx"
    );
  };

  exportCommercialTemplate = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const data_info_item = this.state.data_comm_boq_items;
    const data_non_svc = data_info_item.filter(function (row) {
      return row.pr_item_type !== "SVC";
    });
    const dataNonSVC = [...new Set(data_non_svc.map(({ pp_id }) => pp_id))]
    const data_svc = data_info_item.filter(function (row) {
      return row.pr_item_type === "SVC";
    });

    const headerPackage = [
      "PR Number",
      "PR Line Item",
      "PO No",
      "Project Name",
      "Purchasing Group",
      "Document Type",
      "Vendor Account Number",
      "Contact Person",
      "Term of Payment",
      "Incoterms Code",
      "Incoterms Location",
      "Currency",
      "Implementer",
      "Manager",
      "Document Text / Free Text (notes)",
      "Collective No.",
      "Discount Type (Header)",
      "Discount Amount / Percentage (Header)",
      "Line Item",
      "Requester",
      "RFx / Auction Number",
      "Contract Number",
      "Account Assignment Category",
      "Item Category",
      "Tax Code",
      "Material Number",
      "Short Text",
      "Item Text",
      "Limit",
      "Materials Quantity",
      "Material Price",
      "Material Group",
      "Plant",
      "Delivery Date",
      "Require GR?",
      "Invoice Receipt?",
      "Discount Type (Item)",
      "Amount / percentage (Item)",
      "Indicator",
      "Assigned to Line Item",
      "Service Number",
      "Services Quantity",
      "Gross Price",
      "GL Account Number",
      "Business Area",
      "Cost Center",
      "WBS",
      "Internal Order",
      "Assets Number",
      "Network Number",
      "Activity Number",
      "Assigned to Line Item",
      "Invoicing Plan Date",
      "Percentage (%) to be invoiced",
      "Values to be invoiced",
      "Buyer",
      "Basic Contract",
      "Site Name",
      "Site ID",
      "NE ID",
    ];

    ws.addRow(headerPackage);
    // non svc
    if ((data_non_svc !== null) & (data_non_svc !== undefined)) {
      for (let i = 0; i < dataNonSVC.length; i++) {
        const dataItem = data_non_svc.filter(dns => dns.pp_id === dataNonSVC[i]);
        if(dataItem.length !== 0){
          ws.addRow([
            "",
            "",
            "",
            this.state.data_comm_boq.project_name,
            "TPS",
            "ZCPX",
            "500199",
            "Anders Rian, Mr",
            "0021",
            "DDP",
            "Indosat",
            "",
            "30004416",
            "A10",
            "This PO is included in Collective no.:  XXXXX",
            "",
            "",
            "",
            "",
            "RAN / Access NSAS",
            "",
            "",
            "",
            "",
            dataItem[0].tax_code,
            "",
            data_svc[i].site_list[0].site_id,
            dataItem[0].item_text + "-" + data_non_svc[i].pp_id,
            "",
            dataItem.reduce((a,b) => a + b.material_quantity, 0),
            "",
            "",
            "1000",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "1920",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            null,
            null,
            null,
          ]);
        }
      }
    }

    // svc
    if ((data_svc !== null) & (data_svc !== undefined)) {
      for (let i = 0; i < data_svc.length; i++) {
        ws.addRow([
          "",
          "",
          "",
          this.state.data_comm_boq.project_name,
          "TPS",
          "ZCPX",
          "500199",
          "Anders Rian, Mr",
          "0021",
          "DDP",
          "Indosat",
          "",
          "30004416",
          "A10",
          "This PO is included in Collective no.:  XXXXX",
          "",
          "",
          "",
          "",
          "RAN / Access NSAS",
          "",
          "",
          "",
          "",
          data_svc[i].tax_code,
          "",
          data_non_svc[i].short_text,,
          "",
          "",
          data_svc[i].material_quantity,
          "",
          "",
          "1000",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "1920",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          data_svc[i].site_list[0].site_name,
          data_svc[i].site_list[0].site_id,
          data_svc[i].site_list[0].ne_id
        ]);
        const svcLib = this.getServiceLib(data_svc[i]);
        for(let j = 0; j < svcLib.length; j++){
          ws.addRow([
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            svcLib[j].pr_uploader_description,
            "",
            "",
            "",
            "",
            "1000",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "1920",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ]);
        }

      }
    }

    const comFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([comFormat]),
      "PR " + this.state.data_comm_boq.no_comm_boq +" "+data_info_item[0].region+ " Uploader.xlsx"
    );
  };

  getServiceLib(svc){
    let svcLib = svc;
    svcLib["pr_uploader_description"] = svc.pp_id + "-"+svc.item_text;
    const service_library = this.state.service_library;
    const filter = service_library.filter(e => e.boq_service_scope.toString().trim() === svc.item_text.toString().trim());
    if(filter.length === 0){
      return [svc];
    }else{
      return filter;
    }
  }

  getItemUniqandQtyTotal(pp_id){
    let row = {}
    const data_item = this.state.data_comm_boq_items.filter(e => e.pp_id === pp_id);
    if(data_item.length !== 0){
      row = data_item[0];
      row["material_qty_total"] = data_item.reduce((a,b) => a + b.material_quantity, 0);
      return (
        <tr key={row._id}>
          <td style={{ verticalAlign: "middle" }}>
            {this.state.data_comm_boq.project_name}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {row.region}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {row.tax_code}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {row.short_text}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {row.item_text}-{row.pp_id}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {row.material_qty_total}
          </td>
          <td style={{ verticalAlign: "middle" }}>

          </td>
          <td style={{ verticalAlign: "middle" }}>

          </td>
          <td style={{ verticalAlign: "middle" }}>

          </td>
        </tr>
      )
    }else{
      return <Fragment></Fragment>;
    }
  }

  render() {
    if (this.state.redirectSign !== false) {
      return <Redirect to={"/detail-commercial/" + this.state.redirectSign} />;
    }

    function AlertProcess(props) {
      const alert = props.alertAct;
      const message = props.messageAct;
      if (alert == "failed") {
        return (
          <div className="alert alert-danger" role="alert">
            {message}
            <br></br>
            Sorry, there was an error when we tried to save it, please reload
            your page and try again try again
          </div>
        );
      } else {
        if (alert == "success") {
          return (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          );
        } else {
          return <div></div>;
        }
      }
    }
    const data_non_svc = this.state.data_comm_boq_items.filter(function (row) {
      return row.pr_item_type !== "SVC";
    });
    const dataNonSVC = [...new Set(data_non_svc.map(({ pp_id }) => pp_id))]
    const data_svc = this.state.data_comm_boq_items.filter(function (row) {
      return row.pr_item_type === "SVC";
    });
    return (
      <div>
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}> PR Uploader</span>
                {this.state.data_comm_boq_items !== null && (
                  <React.Fragment>
                    <Dropdown
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
                        Download PR File
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header> PR File</DropdownItem>
                        {/* <DropdownItem onClick={this.exportCommercial}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Commercial File</DropdownItem> */}
                        <DropdownItem onClick={this.exportCommercialTemplate}>
                          {" "}
                          <i
                            className="fa fas-file-text-o"
                            aria-hidden="true"
                          ></i>
                          PR Template
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </React.Fragment>
                )}
              </CardHeader>
              <CardBody className="card-UploadBoq">
                <Row>
                  <Col md="12">
                    {/* Show Select BOQ Technical */}
                    {/* End Show Select BOQ Technical */}

                    {/* Show import XLS */}
                    {this.state.data_comm_boq !== null &&
                      this.props.match.params.id !== undefined && (
                        <React.Fragment>
                          <input
                            type="file"
                            onChange={this.fileHandlerCommercial.bind(this)}
                            style={{ padding: "10px", visiblity: "hidden" }}
                          />
                          <Button
                            style={{ float: "right", margin: "8px" }}
                            color="warning"
                            onClick={this.updateCommercial}
                            value="save"
                          >
                            <i className="fa fa-paste">&nbsp;&nbsp;</i>
                            Save
                          </Button>
                          <Button
                            style={{ float: "right", margin: "8px" }}
                            color="secondary"
                            onClick={this.updateCommercial}
                            value="revision"
                          >
                            <i className="fa fa-copy">&nbsp;&nbsp;</i>
                            Revision
                          </Button>
                        </React.Fragment>
                      )}
                    {/* End Show import XLS */}
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md="12">
                    <table style={{ width: "100%", marginBottom: "0px" }}>
                      <tbody>
                        <tr style={{ fontWeight: "425", fontSize: "23px" }}>
                          <td
                            colSpan="2"
                            style={{
                              textAlign: "center",
                              marginBottom: "10px",
                              fontWeight: "500",
                            }}
                          >
                            {this.props.match.params.id === undefined
                              ? "CREATE"
                              : ""}{" "}
                            PR Uploader
                          </td>
                        </tr>
                        {this.state.data_comm_boq !== null &&
                          this.props.match.params.id !== undefined && (
                            <React.Fragment>
                              <tr
                                style={{
                                  fontWeight: "390",
                                  fontSize: "15px",
                                  fontStyle: "oblique",
                                }}
                              >
                                <td
                                  colSpan="2"
                                  style={{
                                    textAlign: "center",
                                    marginBottom: "10px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Doc : {this.state.data_comm_boq.no_comm_boq}
                                </td>
                              </tr>
                            </React.Fragment>
                          )}
                      </tbody>
                    </table>
                    <hr
                      style={{
                        borderStyle: "double",
                        borderWidth: "0px 0px 3px 0px",
                        borderColor: " rgba(174,213,129 ,1)",
                        marginTop: "5px",
                      }}
                    ></hr>
                  </Col>
                </Row>

                <div style={{ padding: "10px", fontSize: "15px" }}>
                  {this.state.data_comm_boq !== null && (
                    <React.Fragment>
                      <Row>
                        <Col sm="6" md="6">
                          <table className="table-header">
                            <tbody>
                              <tr
                                style={{ fontWeight: "425", fontSize: "15px" }}
                              >
                                <td
                                  colSpan="4"
                                  style={{
                                    textAlign: "center",
                                    marginBottom: "10px",
                                    fontWeight: "500",
                                  }}
                                >
                                  PR UPLOADER INFORMATION
                                </td>
                              </tr>
                              <tr
                                style={{ fontWeight: "425", fontSize: "15px" }}
                              >
                                <td style={{ width: "150px" }}>Project </td>
                                <td>:</td>
                                <td colspan="2" style={{ paddingLeft: "10px" }}>
                                  {this.state.data_comm_boq.project_name}
                                </td>
                              </tr>
                              <tr
                                style={{ fontWeight: "425", fontSize: "15px" }}
                              >
                                <td>Technical Boq Ref</td>
                                <td>:</td>
                                <td colspan="2" style={{ paddingLeft: "10px" }}>
                                  {this.state.data_comm_boq.list_of_tech.map(
                                    (e) => e.no_tech_boq + "  "
                                  )}
                                </td>
                              </tr>
                              <tr
                                style={{ fontWeight: "425", fontSize: "15px" }}
                              >
                                <td>Region</td>
                                <td>:</td>
                                <td colSpan="2"style={{ paddingLeft: "10px" }}>
                                  {this.state.data_comm_boq_items.length > 0 ? this.state.data_comm_boq_items[0].region : null}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                </div>
                <div class="divtable">
                    <Table striped hover bordered responsive size="sm" width="100%">
                      <thead class="table-commercial__header--fixed">
                        <tr>
                          <th>Project Name</th>
                          <th>Region</th>
                          <th>Tax Code</th>
                          <th>Short Text</th>
                          <th>Item Text</th>
                          <th>Materials Quantity</th>
                          <th>Site Name</th>
                          <th>Site ID</th>
                          <th>NE ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataNonSVC.map((row, i) => (
                          this.getItemUniqandQtyTotal(row)
                        ))}
                        {data_svc.map((row, i) => (
                          <>
                            <tr key={row._id}>
                              <td style={{ verticalAlign: "middle" }}>
                                {this.state.data_comm_boq.project_name}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {row.region}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {row.tax_code}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {row.short_text}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td style={{ verticalAlign: "middle" }}>
                                {row.site_list.map((site) => site.site_id)}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {row.site_list.map((site) => site.ne_id)}
                              </td>
                            </tr>
                            {this.getServiceLib(row).map(svl => (
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {svl.pr_uploader_description}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            ))}
                          </>
                        ))}
                      </tbody>
                    </Table>
                </div>
                {this.state.boq_comm_API !== null && (
                  <React.Fragment>
                    <div style={{ marginBottom: "20px" }}>
                      <Row style={{ paddingLeft: "10px" }}>
                        <Col sm="6" md="7">
                          <table
                            className="table-footer"
                            style={{ float: "right", marginRight: "20px" }}
                          >
                            <tbody>
                              <tr
                                style={{ fontWeight: "425", fontSize: "12px" }}
                              >
                                <td>
                                  Technical Indentifier &nbsp;&nbsp;&nbsp;
                                </td>
                                <td>
                                  : &nbsp;{" "}
                                  {
                                    this.state.data_comm_boq.list_of_tech[0]
                                      .no_tech_boq
                                  }{" "}
                                </td>
                              </tr>
                              <tr
                                style={{ fontWeight: "425", fontSize: "12px" }}
                              >
                                <td>COM BOQ Created By &nbsp;</td>
                                <td>
                                  : &nbsp;{" "}
                                  {this.state.data_comm_boq.creator[0].email}
                                </td>
                              </tr>
                              <tr
                                style={{ fontWeight: "425", fontSize: "12px" }}
                              >
                                <td>COM BOQ Created Date </td>
                                <td>
                                  : &nbsp; {this.state.data_comm_boq.created_on}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                        <Col sm="6" md="5"></Col>
                      </Row>
                    </div>
                  </React.Fragment>
                )}
              </CardBody>
              <CardFooter>
                <Row></Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        {/* Modal Loading */}
        <Modal
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm " + this.props.className + " loading-modal"}
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
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleLoading}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}

        {/* Modal Loading */}
        <Modal
          isOpen={this.state.toggleShowGroup}
          toggle={this.showGroupToggle}
          className={"modal-sm " + this.props.className + " loading-modal"}
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
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleLoading}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}


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

export default connect(mapStateToProps)(CommercialBoq);
