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
  Input,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import Select from "react-select";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { withScriptjs } from "react-google-maps";
import GMap from "./MapComponent";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { ExcelRenderer } from "react-excel-renderer";
import "./MatStyle.css";
import ModalForm from "../components/ModalForm";
import { getDatafromAPINODEFile } from "../../helper/asyncFunction";

import { convertDateFormatfull } from "../../helper/basicFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL_BMS_Phil = "https://api.smart.pdb.e-dpm.com/smartapi";
const usernamePhilApi = "pdbdash";
const passwordPhilApi = "rtkO6EZLkxL1";

const API_URL_BAM = "https://api.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

const API_URL_XL = "https://api.isat.pdb.e-dpm.com/isatapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  inValue = "",
  disabled = false,
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={inValue}
    className="checkmark-dash"
    disabled={disabled}
  />
);

//const process.env.REACT_APP_API_URL_NODE = "https://api2.bam-id.e-dpm.com/bamidapi";

const status_can_edit_material = [
  "PLANTSPEC ASSIGNED",
  "PLANTSPEC UPDATED",
  "MR REQUESTED",
  "MR CANCELED",
  "MR APPROVED",
  "MR REJECTED",
  "MR UPDATED",
  "ORDER PROCESSING START",
  "MR NEED REVISION",
  "PS NEED REVISION",
];

class MRDisDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      list_mr_item: [],
      rowsXLS: [],
      data_mr: null,
      data_wh: {},
      mr_site_NE: null,
      mr_site_FE: null,
      update_mr_form: {},
      update_mr_name_form: new Array(9).fill(null),
      mr_pp: [],
      mr_md: [],
      mr_item: [],
      tabs_submenu: [true, false, false, false],
      edit_detail: false,
      action_status: null,
      action_message: null,
      material_wh: [],
      material_inbound: [],
      modal_approve_ldm: false,
      id_mr_selected: null,
      selected_dsp: "",
      asp_data: [],
      modal_revision: false,
      revision_note: "",
      wbs_cd_id_data: [],
      location_mr: {},
      dropdownOpen: new Array(2).fill(false),
      modal_loading: false,
      dsp_list: [],
      sid_file: [],
      abd_file: [],
      mot_type: null,
      edit_qty_mat_dis: false,
      qty_material_new: new Map(),
    };
    this.getQtyMRPPNE = this.getQtyMRPPNE.bind(this);
    this.getQtyMRPPFE = this.getQtyMRPPFE.bind(this);
    this.getQtyMRMDNE = this.getQtyMRMDNE.bind(this);
    this.getQtyMRMDFE = this.getQtyMRMDFE.bind(this);
    this.changeTabsSubmenu = this.changeTabsSubmenu.bind(this);
    this.requestForApproval = this.requestForApproval.bind(this);
    this.ApproveMR = this.ApproveMR.bind(this);
    this.changeEditable = this.changeEditable.bind(this);
    this.handleChangeFormMRUpdate = this.handleChangeFormMRUpdate.bind(this);
    this.updateDataMR = this.updateDataMR.bind(this);
    this.downloadMaterialMRUpload = this.downloadMaterialMRUpload.bind(this);
    this.downloadMaterialMRUpload2 = this.downloadMaterialMRUpload2.bind(this);
    this.saveUpdateMaterial = this.saveUpdateMaterial.bind(this);
    this.downloadMaterialMRReport = this.downloadMaterialMRReport.bind(this);
    this.needReviseMR = this.needReviseMR.bind(this);
    this.takeoutPS = this.takeoutPS.bind(this);
    this.cancelMR = this.cancelMR.bind(this);
    this.toggleModalapprove = this.toggleModalapprove.bind(this);
    this.toggleModalRevision = this.toggleModalRevision.bind(this);
    this.handleRevisionNote = this.handleRevisionNote.bind(this);
    this.downloadMaterialMRTRACY = this.downloadMaterialMRTRACY.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.exportMRFormat = this.exportMRFormat.bind(this);
    this.updateMR = this.updateMR.bind(this);
    this.downloadMaterialSerialNumberReport = this.downloadMaterialSerialNumberReport.bind(
      this
    );
    this.handleMotType = this.handleMotType.bind(this);
    this.handleChangeEditQty = this.handleChangeEditQty.bind(this);
    this.handleChangeQtyMaterial = this.handleChangeQtyMaterial.bind(this);
    this.updateMaterialQty = this.updateMaterialQty.bind(this);
    this.requestMRDismantle = this.requestMRDismantle.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  toggleModalapprove(e) {
    // const id_doc = e.currentTarget.id;
    // this.setState({ id_mr_selected: id_doc });
    this.setState((prevState) => ({
      modal_approve_ldm: !prevState.modal_approve_ldm,
    }));
  }

  toggleModalRevision(e) {
    this.setState((prevState) => ({
      modal_revision: !prevState.modal_revision,
    }));
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  handleRevisionNote(e) {
    let value = e.target.value;
    this.setState({ revision_note: value });
  }

  async getDatafromAPIISAT(url) {
    try {
      let respond = await axios.get(API_URL_XL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameXL,
          password: passwordXL,
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

  getASPList() {
    // switch (this.props.dataLogin.account_id) {
    //   case "xl":
    this.getDatafromAPIISAT('/vendor_data_non_page?where={"Type":"DSP"}').then(
      (res) => {
        // console.log("asp data ", res.data);
        if (res.data !== undefined) {
          this.setState({ asp_data: res.data._items });
        } else {
          this.setState({ asp_data: [] });
        }
      }
    );
    //     break;
    //   default:
    //     break;
    // }
  }

  handleLDMapprove = (e) => {
    // this.getASPList();
    let value = e.target.value;
    let name = e.target.options[e.target.selectedIndex].text;
    let bodymrApprove = {
      dsp_company_code: value,
      dsp_company: name,
    };
    console.log("bodymrApprove ", bodymrApprove);
    if (value !== 0) {
      this.setState({ selected_dsp: bodymrApprove });
    }
  };

  checkValue(props) {
    //Swap undefined to null
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  async getDatafromAPIBMS(url) {
    try {
      let respond = await axios.get(API_URL_BMS_Phil + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi,
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

  async getDatafromAPIBAM(url) {
    try {
      let respond = await axios.get(API_URL_BAM + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameBAM,
          password: passwordBAM,
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

  async postDatatoAPIBAM(url, data) {
    try {
      let respond = await axios.post(API_URL_BAM + url, data, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameBAM,
          password: passwordBAM,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPIBAM(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_BAM + url, data, {
        headers: { "Content-Type": "application/json", "If-Match": _etag },
        auth: {
          username: usernameBAM,
          password: passwordBAM,
        },
      });
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Patch data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Patch data", err);
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

  async postDatatoAPINODE(url, data) {
    try {
      let respond = await axios.post(
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
        console.log("respond post data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond post data", err.response);
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

  async getDatafromAPIXL(url) {
    try {
      let respond = await axios.get(API_URL_XL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameXL,
          password: passwordXL,
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

  async deleteDataFromAPINODE(url, data) {
    try {
      let respond = await axios.delete(
        process.env.REACT_APP_API_URL_NODE + url,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.tokenUser,
          },
          data: data,
        }
      );
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond delete Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond delete Data err", err);
      return respond;
    }
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

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        } else {
          this.ArrayEmptytoNull(rest.rows);
        }
      });
    }
  };

  ArrayEmptytoNull(dataXLS) {
    let newDataXLS = [];
    for (let i = 0; i < dataXLS.length; i++) {
      let col = [];
      for (let j = 0; j < dataXLS[0].length; j++) {
        col.push(this.checkValue(dataXLS[i][j]));
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS,
    });
  }

  getDataMR(_id_MR) {
    this.getDataFromAPINODE("/matreq-srn/" + _id_MR).then((resMR) => {
      if (resMR.data !== undefined) {
        this.getMRLocation(_id_MR);
        if (resMR.data.dsp_company === null) {
          this.getASPList();
        }
        this.setState({ data_mr: resMR.data }, () => {
          if (
            resMR.data.origin !== undefined &&
            resMR.data.mrd_category_code === "TWH"
          ) {
            this.getWHOrigin(resMR.data.destination.value);
          }
          if (this.state.data_mr.cust_del !== undefined) {
            this.getDataCDID(this.state.data_mr.cust_del.map((e) => e.cd_id));
            this.getSIDNumber(this.state.data_mr.cust_del.map((e) => e.cd_id));
          }
          this.setState({ mr_pp: resMR.data.packages }, () => {
            if (
              status_can_edit_material.includes(resMR.data.current_mr_status)
            ) {
              this.getDataWarehouse(resMR.data.packages);
              this.getDataInbound(resMR.data.packages);
            }
            // this.prepareView();
          });
        });
      }
    });
  }

  async getSIDNumber(arrayCDID) {
    const page = 1;
    const maxPage = 1;
    let dataSID = [];
    let dataABD = [];
    for (let i = 0; i < arrayCDID.length; i++) {
      let filter_array = [];
      filter_array.push('"cust_del.cd_id":"' + arrayCDID[i] + '"');
      filter_array.push('"type" : {"$ne" : "ABD"}');
      let whereAnd = "{" + filter_array.join(",") + "}";
      const res = await this.getDataFromAPINODE(
        "/sidFile?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
      );
      if (
        res.data !== undefined &&
        res.data.data !== undefined &&
        res.data.data.length !== 0
      ) {
        dataSID.push(res.data.data[0]);
      }
    }
    for (let i = 0; i < arrayCDID.length; i++) {
      let filter_array = [];
      filter_array.push('"cust_del.cd_id":"' + arrayCDID[i] + '"');
      filter_array.push('"type" : "ABD"');
      let whereAnd = "{" + filter_array.join(",") + "}";
      const res = await this.getDataFromAPINODE(
        "/sidFile?srt=_id:-1&q=" + whereAnd + "&lmt=" + maxPage + "&pg=" + page
      );
      if (
        res.data !== undefined &&
        res.data.data !== undefined &&
        res.data.data.length !== 0
      ) {
        dataABD.push(res.data.data[0]);
      }
    }
    this.setState({ sid_file: dataSID, abd_file: dataABD });
  }

  getWHOrigin(wh_id) {
    this.getDataFromAPINODE(
      '/whManagement/warehouse?q={"wh_id" : "' + wh_id + '"}'
    ).then((resWH) => {
      if (resWH.data !== undefined) {
        if (resWH.data.data[0] !== undefined) {
          this.setState({ data_wh: resWH.data.data[0] });
        }
      }
    });
  }

  getMRLocation(_id_MR) {
    this.getDataFromAPINODE("/getMRLocationById/" + _id_MR).then((resLocMR) => {
      if (resLocMR.data !== undefined) {
        this.setState({ location_mr: resLocMR.data });
      }
    });
  }

  async getDataCDID(array_cd_id) {
    let array_in_cdid = '"' + array_cd_id.join('", "') + '"';
    let projection =
      '&projection={"WP_ID" : 1, "C1003_WBS_HW" : 1, "C1008_WBS_HWAC" : 1, "C1013_WBS_LCM" : 1, "C1018_WBS_PNRO" : 1, "C1024_WBS_PNDO" : 1, "C1032_WBS_HW_Bulk" : 1, "C1033_WBS_LCM_Bulk" : 1, "C1034_WBS_PowHW_Site_Basis" : 1, "C1035_WBS_PowLCM_Site_Basis" : 1, "C1036_WBS_Kathrein" : 1}';
    const getWPID = await this.getDatafromAPIXL(
      '/custdel_sorted?where={"WP_ID":{"$in" : [' +
        array_in_cdid +
        "]}}" +
        projection
    );
    if (getWPID !== undefined && getWPID.data !== undefined) {
      this.setState({ wbs_cd_id_data: getWPID.data._items });
    }
  }

  async getDataWarehouse(data_ps) {
    let listSku = [];
    if (data_ps !== null && data_ps !== undefined) {
      data_ps.map((pp) =>
        pp.materials.map((material) => listSku.push(material.material_id))
      );
      listSku = [...new Set(listSku)];
      let skuData = {
        sku: listSku,
      };
      const respondSKU = await this.postDatatoAPINODE(
        "/whStock/getWhStockbySku",
        skuData
      );
      if (
        respondSKU.data !== undefined &&
        respondSKU.status >= 200 &&
        respondSKU.status <= 300
      ) {
        let array_sku = [];
        respondSKU.data.data.map((sku) =>
          sku.map((sku2) =>
            array_sku.push({ sku: sku2.sku, qty_sku: sku2.qty_sku })
          )
        );
        this.setState({ material_wh: array_sku });
      }
    }
  }

  async getDataInbound(data_ps) {
    let listSku = [];
    if (data_ps !== null && data_ps !== undefined) {
      data_ps.map((pp) =>
        pp.materials.map((material) => listSku.push(material.material_id))
      );
      listSku = [...new Set(listSku)];
      let skuData = {
        sku: listSku,
      };
      const respondSKU = await this.postDatatoAPINODE(
        "/whInboundPlan/getWhInboundPlanbySku",
        skuData
      );
      if (
        respondSKU.data !== undefined &&
        respondSKU.status >= 200 &&
        respondSKU.status <= 300
      ) {
        let array_sku = [];
        respondSKU.data.data.map((sku) =>
          sku.map((sku2) =>
            array_sku.push({ sku: sku2.sku, qty_sku: sku2.qty_sku })
          )
        );
        this.setState({ material_inbound: array_sku });
      }
    }
  }

  prepareView() {
    const mr_data = this.state.data_mr;
    const data_pp = this.state.mr_pp;
    // let list_mr_id_item = [...new Set(data_pp.map(({ pp_id}) => pp_id))];
    let list_mr_item = [];
    let site_NE = undefined;
    let site_FE = undefined;
    // const data_pp_uniq = [...new Set(data_pp.map(({ id_pp_doc}) => id_pp_doc))];
    // for(let i = 0; i < list_mr_id_item.length; i++){
    //   let idxItem = data_pp.find(e => e.pp_id === list_mr_id_item[i]);
    //   if(idxItem !== undefined){
    //     list_mr_item.push(idxItem);
    //   }
    // }
    this.setState({ list_mr_item: data_pp });
    if (mr_data.site_info.length !== 0) {
      site_NE = mr_data.site_info.find((e) => e.site_title === "NE");
      site_FE = mr_data.site_info.find((e) => e.site_title === "FE");
    }
    if (site_NE !== undefined) {
      let data_pp_NE = data_pp.filter((e) => e.site_id === site_NE.site_id);
      site_NE["mr_pp"] = data_pp_NE;
      this.setState({ mr_site_NE: site_NE });
    }
    if (site_FE !== undefined) {
      let data_pp_FE = data_pp.filter((e) => e.site_id === site_FE.site_id);
      site_FE["mr_pp"] = data_pp_FE;
      this.setState({ mr_site_FE: site_FE });
    }
  }

  getQtyMRPPNE(pp_id) {
    const itemMRBom = this.state.mr_site_NE.mr_pp;
    const getDataPPMR = itemMRBom.find((e) => e.pp_id === pp_id);
    if (getDataPPMR !== undefined) {
      return getDataPPMR.qty;
    } else {
      return 0;
    }
  }

  getQtyMRPPFE(pp_id) {
    const itemMRBom = this.state.mr_site_FE.mr_pp;
    const getDataPPMR = itemMRBom.find((e) => e.pp_id === pp_id);
    if (getDataPPMR !== undefined) {
      return getDataPPMR.qty;
    } else {
      return 0;
    }
  }

  getQtyMRMDNE(pp_id, mr_id) {
    const itemMRBom = this.state.mr_site_NE.mr_pp;
    const getDataPPMR = itemMRBom.find((e) => e.pp_id === pp_id);
    if (getDataPPMR !== undefined) {
      const getDataMDMR = getDataPPMR.materials.find(
        (e) => e.material_id === mr_id
      );
      if (getDataMDMR !== undefined) {
        return getDataMDMR.qty;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  getQtyMRMDFE(pp_id, mr_id) {
    const itemMRBom = this.state.mr_site_FE.mr_pp;
    const getDataPPMR = itemMRBom.find((e) => e.pp_id === pp_id);
    if (getDataPPMR !== undefined) {
      const getDataMDMR = getDataPPMR.materials.find(
        (e) => e.material_id === mr_id
      );
      if (getDataMDMR !== undefined) {
        return getDataMDMR.qty;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  changeEditable(e) {
    if (this.state.edit_detail === false) {
      this.getDSPList();
      let dataForm = this.state.update_mr_form;
      dataForm["vendor_code"] = this.state.data_mr.dsp_company_code;
      dataForm["vendor_name"] = this.state.data_mr.dsp_company;
      this.setState({ update_mr_form: dataForm });
    }
    this.setState((prevState) => ({
      edit_detail: !prevState.edit_detail,
    }));
  }

  getDSPList() {
    this.toggleLoading();
    this.getDatafromAPIXL('/vendor_data_non_page?where={"Type":"ASP"}').then(
      (res) => {
        if (res.data !== undefined) {
          const items = res.data._items;
          this.setState({ dsp_list: items });
        }
        this.toggleLoading();
      }
    );
  }

  changeTabsSubmenu(e) {
    let tab_submenu = new Array(4).fill(false);
    tab_submenu[parseInt(e)] = true;
    this.setState({ tabs_submenu: tab_submenu });
  }

  handleChangeFormMRUpdate(e) {
    const value = e.target.value;
    const field = e.target.name;
    let dataForm = this.state.update_mr_form;
    dataForm[field] = value;
    const indexOpt = e.target.selectedIndex;
    if (field === "vendor_code") {
      let vendoridx = this.state.dsp_list.find((v) => v.Vendor_Code === value);
      if (vendoridx !== undefined) {
        dataForm["vendor_name"] = vendoridx.Name;
      }
    }
    this.setState({ update_mr_form: dataForm });
  }

  milestoneStat(ms_name, ms_status, ms_date, ms_updater, ms_notes, index) {
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={convertDateFormatfull(ms_date)}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title">
          {ms_name + " " + ms_status}
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          initiated by <b>{ms_updater}</b>
        </h4>
        {ms_notes !== undefined && ms_notes !== null && (
          <h6 className="vertical-timeline-element-subtitle">
            Notes : {ms_notes}
          </h6>
        )}
      </VerticalTimelineElement>
    );
  }

  componentDidMount() {
    this.getDataMR(this.props.match.params.id);
    document.title = "MRA  Detail | BAM";
  }

  // async plantSpecUnassigned(){
  //   const dataMR = this.state.data_mr;
  //   const dataMRPP = this.state.mr_pp;
  //   const dataMRMD = this.state.mr_md;
  //   for(let i = 0; i < dataMRMD.length; i++){
  //   }
  // }

  submitTSSR(_id_ps) {
    this.patchDatatoAPINODE("/plantspec/submitPlantspec/" + _id_ps).then(
      (res) => {
        if (res.data !== undefined) {
          // this.setState({ action_status : "success" });
        } else {
          // this.setState({ action_status : "failed" });
        }
      }
    );
  }

  requestForApproval() {
    this.toggleLoading();
    let dataMR = this.state.data_mr;
    this.patchDatatoAPINODE("/matreq/requestMatreq/" + dataMR._id).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
          this.toggleLoading();
        } else {
          this.setState({ action_status: "failed" });
          this.toggleLoading();
        }
      }
    );
  }

  ApproveMR(e) {
    this.toggleLoading();
    const _id = this.props.match.params.id;
    let body = this.state.selected_dsp;
    let dataMot = this.state.mot_type;
    if (
      this.state.data_mr.dsp_company !== null &&
      this.state.data_mr.dsp_company !== undefined
    ) {
      body = {
        dsp_company_code: this.state.data_mr.dsp_company_code,
        dsp_company: this.state.data_mr.dsp_company,
      };
    }
    body = { ...body, ...{ approve: true }, ...{ motType: dataMot } };
    // console.log('_id ',_id);
    this.patchDatatoAPINODE("/matreq-srn/approveMrd/" + _id, {
      data: body,
    }).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.toggleModalapprove();
        this.toggleLoading();
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
        this.toggleModalapprove();
        this.toggleLoading();
      }
    });
  }

  async updateDataMR() {
    const dataForm = this.state.update_mr_name_form;
    const dataMR = this.state.data_mr;
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
    const dataStatus = [
      {
        mr_status_name: "MATERIAL_REQUEST",
        mr_status_value: "UPDATED",
        mr_status_date: dateNow,
        mr_status_updater: this.state.userEmail,
        mr_status_updater_id: this.state.userId,
      },
    ];
    let patchData = {};
    patchData["eta"] =
      dataForm[3] !== null ? dataForm[3] + " 23:59:59" : dataMR.eta;
    patchData["requested_eta"] =
      dataForm[3] !== null ? dataForm[3] + " 23:59:59" : dataMR.requested_eta;
    patchData["etd"] =
      dataForm[2] !== null ? dataForm[2] + " 23:59:59" : dataMR.etd;
    patchData["dsp_company"] =
      dataForm[1] !== null ? dataForm[1] : dataMR.dsp_company;
    patchData["current_mr_status"] = "MR UPDATED";
    patchData["mr_status"] = dataMR.mr_status.concat(dataStatus);
    const respondPatchMR = await this.patchDatatoAPIBAM(
      "/mr_op/" + dataMR._id,
      patchData,
      dataMR._etag
    );
    if (
      respondPatchMR.data !== undefined &&
      respondPatchMR.status >= 200 &&
      respondPatchMR.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  CompareArrayObject(arr, prop) {
    return arr.sort(function (a, b) {
      var nameA = a[prop].toLowerCase(),
        nameB = b[prop].toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  async downloadMaterialMRUpload() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataMR = this.state.data_mr;
    const dataItemMR = this.state.list_mr_item;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = [
      "bam_id",
      "ps_number",
      "bundle_id",
      "bundle_name",
      "program",
      "material_id_plan",
      "material_name_plan",
      "material_id_actual",
      "material_name_actual",
      "uom",
      "qty",
      "stock_warehouse",
      "inbound_warehouse",
      "availability",
      "source_material",
    ];
    ws.addRow(headerRow);
    let list_material_id = [];
    for (let i = 0; i < dataItemMR.length; i++) {
      for (let j = 0; j < dataItemMR[i].materials.length; j++) {
        let dataMatIdx = dataItemMR[i].materials[j];
        list_material_id.push(dataMatIdx.material_id);
        let qty_wh = stockWH.find((e) => e.sku === dataMatIdx.material_id);
        let qty_inbound = inboundWH.find(
          (e) => e.sku === dataMatIdx.material_id
        );
        qty_wh = qty_wh !== undefined ? qty_wh.qty_sku : 0;
        qty_inbound = qty_inbound !== undefined ? qty_inbound.qty_sku : 0;
        ws.addRow([
          dataMatIdx._id,
          dataItemMR[i].no_tssr_boq_site,
          dataItemMR[i].pp_id,
          dataItemMR[i].product_name,
          dataItemMR[i].program,
          dataMatIdx.material_id_plan,
          dataMatIdx.material_name_plan,
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.uom,
          dataMatIdx.qty,
          qty_wh,
          qty_inbound,
          dataMatIdx.qty < qty_wh ? "OK" : "NOK",
          dataMatIdx.source_material,
        ]);
      }
    }

    let listMatId = [...new Set(list_material_id)];
    let matIdData = {
      list_material_id: listMatId,
    };

    const getMaterialVariant = await this.postDatatoAPINODE(
      "/variants/materialId",
      matIdData
    );
    if (
      getMaterialVariant.data !== undefined &&
      getMaterialVariant.status >= 200 &&
      getMaterialVariant.status < 400
    ) {
      dataMaterialVariant = getMaterialVariant.data.data;
    }

    dataMaterialVariant = this.CompareArrayObject(
      dataMaterialVariant,
      "description"
    );

    // dataMaterialVariant.sort(function(a, b){return a.description.toLowerCase() - b.description.toLowerCase()});
    let sku_list = [];
    for (let j = 0; j < dataMaterialVariant.length; j++) {
      sku_list.push(dataMaterialVariant[j].material_id);
    }
    const list_qtySKU = [];
    const getQtyfromWHbySKU = await this.postDatatoAPINODE(
      "/whStock/getWhStockbySku",
      { sku: sku_list }
    ).then((res) => {
      if (res.data !== undefined && res.status >= 200 && res.status < 400) {
        const dataSKU = res.data.data;
        // console.log('dataSKU ', dataSKU);
        for (let i = 0; i < dataSKU.length; i++) {
          if (dataSKU[i][0] === undefined) {
            list_qtySKU.push(0);
          } else {
            list_qtySKU.push(dataSKU[i][0].qty_sku);
          }
        }
      }
    });

    ws2.addRow([
      "Origin",
      "Material ID",
      "Material Name",
      "Description",
      "Category",
      "Qty Available",
    ]);
    for (let j = 0; j < dataMaterialVariant.length; j++) {
      ws2.addRow([
        dataMaterialVariant[j].origin,
        dataMaterialVariant[j].material_id,
        dataMaterialVariant[j].material_name,
        dataMaterialVariant[j].description,
        dataMaterialVariant[j].category,
        list_qtySKU[j],
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Material MR " + dataMR.mr_id + " uploader.xlsx"
    );
  }

  async downloadMaterialMRUpload2() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataMR = this.state.data_mr;
    const dataItemMR = this.state.list_mr_item;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = [
      "bam_id",
      "ps_number",
      "bundle_id",
      "bundle_name",
      "program",
      "material_id_plan",
      "material_name_plan",
      "material_id_actual",
      "material_name_actual",
      "uom",
      "qty",
      "stock_warehouse",
      "inbound_warehouse",
      "availability",
      "source_material",
    ];
    ws.addRow(headerRow);
    let list_material_id = [];
    for (let i = 0; i < dataItemMR.length; i++) {
      for (let j = 0; j < dataItemMR[i].materials.length; j++) {
        let dataMatIdx = dataItemMR[i].materials[j];
        list_material_id.push(dataMatIdx.material_id);
        let qty_wh = stockWH.find((e) => e.sku === dataMatIdx.material_id);
        let qty_inbound = inboundWH.find(
          (e) => e.sku === dataMatIdx.material_id
        );
        qty_wh = qty_wh !== undefined ? qty_wh.qty_sku : 0;
        qty_inbound = qty_inbound !== undefined ? qty_inbound.qty_sku : 0;
        if (dataMatIdx.qty < qty_wh) {
          continue;
        }
        ws.addRow([
          dataMatIdx._id,
          dataItemMR[i].no_tssr_boq_site,
          dataItemMR[i].pp_id,
          dataItemMR[i].product_name,
          dataItemMR[i].program,
          dataMatIdx.material_id_plan,
          dataMatIdx.material_name_plan,
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.uom,
          dataMatIdx.qty,
          qty_wh,
          qty_inbound,
          dataMatIdx.qty < qty_wh ? "OK" : "NOK",
          dataMatIdx.source_material,
        ]);
      }
    }

    let listMatId = [...new Set(list_material_id)];
    let matIdData = {
      list_material_id: listMatId,
    };

    const getMaterialVariant = await this.postDatatoAPINODE(
      "/variants/materialId",
      matIdData
    );
    if (
      getMaterialVariant.data !== undefined &&
      getMaterialVariant.status >= 200 &&
      getMaterialVariant.status < 400
    ) {
      dataMaterialVariant = getMaterialVariant.data.data;
    }

    dataMaterialVariant = this.CompareArrayObject(
      dataMaterialVariant,
      "description"
    );

    // dataMaterialVariant.sort(function(a, b){return a.description.toLowerCase() - b.description.toLowerCase()});
    let sku_list = [];
    for (let j = 0; j < dataMaterialVariant.length; j++) {
      sku_list.push(dataMaterialVariant[j].material_id);
    }
    const list_qtySKU = [];
    const getQtyfromWHbySKU = await this.postDatatoAPINODE(
      "/whStock/getWhStockbySku",
      { sku: sku_list }
    ).then((res) => {
      if (res.data !== undefined && res.status >= 200 && res.status < 400) {
        const dataSKU = res.data.data;
        // console.log('dataSKU ', dataSKU);
        for (let i = 0; i < dataSKU.length; i++) {
          if (dataSKU[i][0] === undefined) {
            list_qtySKU.push(0);
          } else {
            list_qtySKU.push(dataSKU[i][0].qty_sku);
          }
        }
      }
    });

    ws2.addRow([
      "Origin",
      "Material ID",
      "Material Name",
      "Description",
      "Category",
      "Qty Available",
    ]);
    for (let j = 0; j < dataMaterialVariant.length; j++) {
      ws2.addRow([
        dataMaterialVariant[j].origin,
        dataMaterialVariant[j].material_id,
        dataMaterialVariant[j].material_name,
        dataMaterialVariant[j].description,
        dataMaterialVariant[j].category,
        list_qtySKU[j],
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Material MR " + dataMR.mr_id + " uploader NOK.xlsx"
    );
  }

  async downloadMaterialMRReport() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataMR = this.state.data_mr;
    const dataItemMR = this.state.list_mr_item;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    ws.addRow(["MR ID", dataMR.mr_id]);
    ws.addRow(["Project", dataMR.project_name]);
    ws.addRow(["Site", this.state.mr_site_NE.site_id]);

    ws.addRow([""]);

    let headerRow = [
      "Bundle ID",
      "Bundle Name",
      "Material ID",
      "Material Name",
      "Unit",
      "Qty",
      "Material Source",
      "CPO Number",
      "PS No.",
      "Program",
    ];
    ws.addRow(headerRow);
    ws.getCell("A5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("B5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("C5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("D5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("E5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("F5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("G5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("H5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("I5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("J5").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("A5").font = { bold: true };
    ws.getCell("B5").font = { bold: true };
    ws.getCell("C5").font = { bold: true };
    ws.getCell("D5").font = { bold: true };
    ws.getCell("E5").font = { bold: true };
    ws.getCell("F5").font = { bold: true };
    ws.getCell("G5").font = { bold: true };
    ws.getCell("H5").font = { bold: true };
    ws.getCell("I5").font = { bold: true };
    ws.getCell("J5").font = { bold: true };
    ws.addRow([]);
    for (let i = 0; i < dataItemMR.length; i++) {
      ws.addRow([
        dataItemMR[i].pp_id,
        dataItemMR[i].product_name,
        null,
        null,
        dataItemMR[i].uom,
        null,
        null,
        null,
        dataItemMR[i].no_tssr_boq_site,
        dataItemMR[i].program,
      ]);
      for (let j = 0; j < dataItemMR[i].materials.length; j++) {
        let dataMatIdx = dataItemMR[i].materials[j];
        ws.addRow([
          null,
          null,
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.uom,
          dataMatIdx.qty,
          dataMatIdx.source_material,
          dataMatIdx.cpo_number,
        ]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Material MR PS " + dataMR.mr_id + " Report.xlsx"
    );
  }

  async downloadMaterialMRTRACY() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataMR = this.state.data_mr;
    const dataItemMR = this.state.list_mr_item;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = [
      "REC_TYPE",
      "FILLER",
      "COMP_CD",
      "CUST_DELIV_NO",
      "CUST_ID",
      "CUST_CNTRY_CD",
      "ETA_SHP_DT",
      "SHP_DT",
      "SITE_LOC_ID",
      "SITE_CNTRY_CD",
      "SEND_SYSTEM",
      "SEND_UNIT",
      "SALES_GRP",
      "PRNO ",
      "SHP_NO",
      "END_CUST_NM",
      "END_CUST_ID",
      "CUST_NM",
      "SALES_ORD_NO",
      "PACK_ID",
      "PURCH_ORD_NO",
      "SER_NO",
      "CIN",
      "GI_Type",
      "Shp_Pnt",
      "Plant_ID",
    ];
    ws.addRow(headerRow);
    let dateDispatch = null;
    const dispatchData = dataMR.mr_status.find(
      (e) => e.mr_status_value === "DISPATCH"
    );
    if (
      dispatchData.mr_status_date !== undefined &&
      dispatchData.mr_status_date !== null
    ) {
      let dateDispatchNew = new Date(dispatchData.mr_status_date);
      dateDispatch =
        dateDispatchNew.getFullYear().toString() +
        (dateDispatchNew.getMonth() + 1).toString().padStart(2, "0") +
        dateDispatchNew.getDate().toString().padStart(2, "0");
    }
    const dataSite = dataMR.site_info[0].site_id;
    let shipTrim = dataMR.no_shipment.split("-");
    shipTrim.splice(0, 2);
    const shipTracy = shipTrim.join("");
    for (let i = 0; i < dataItemMR.length; i++) {
      for (let j = 0; j < dataItemMR[i].materials.length; j++) {
        let dataMatIdx = dataItemMR[i].materials[j];
        if (
          dataMatIdx.serial_numbers !== undefined &&
          dataMatIdx.serial_numbers.length !== 0
        ) {
          let serial_number = dataMatIdx.serial_numbers.find(
            (e) => e.flag_name === "obd"
          );
          if (serial_number !== undefined) {
            for (let k = 0; k < serial_number.list_of_sn.length; k++) {
              ws.addRow([
                "K",
                null,
                2089,
                dataMR.mr_id,
                "XL",
                "ID",
                null,
                dateDispatch,
                dataMR.site_info[0].site_id,
                "ID",
                "DPM",
                1105,
                null,
                dataMatIdx.material_id,
                shipTracy,
                "XL Axiata",
                "XL",
                "XL Axiata",
                null,
                null,
                dataMatIdx.cpo_number,
                serial_number.list_of_sn[k],
                null,
                null,
                null,
                null,
              ]);
            }
          }
        } else {
          ws.addRow([
            "K",
            null,
            2089,
            dataMR.mr_id,
            "XL",
            "ID",
            null,
            dateDispatch,
            dataMR.site_info[0].site_id,
            "ID",
            "DPM",
            1105,
            null,
            dataMatIdx.material_id,
            shipTracy,
            "XL Axiata",
            "XL",
            "XL Axiata",
            null,
            null,
            dataMatIdx.cpo_number,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "TRACY Material MR " + dataMR.mr_id + ".xlsx"
    );
  }

  async downloadMaterialSerialNumberReport() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataMR = this.state.data_mr;
    const dataItemMR = this.state.list_mr_item;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = [
      "MR_ID",
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
    const dispatchData = dataMR.mr_status.find(
      (e) => e.mr_status_value === "DISPATCH"
    );
    if (
      dispatchData !== undefined &&
      dispatchData.mr_status_date !== undefined &&
      dispatchData.mr_status_date !== null
    ) {
      let dateDispatchNew = new Date(dispatchData.mr_status_date);
      dateDispatch =
        dateDispatchNew.getFullYear().toString() +
        (dateDispatchNew.getMonth() + 1).toString().padStart(2, "0") +
        dateDispatchNew.getDate().toString().padStart(2, "0");
    }
    const dataSite = dataMR.site_info[0].site_id;
    for (let i = 0; i < dataItemMR.length; i++) {
      for (let j = 0; j < dataItemMR[i].materials.length; j++) {
        let dataMatIdx = dataItemMR[i].materials[j];
        if (
          dataMatIdx.serial_numbers !== undefined &&
          dataMatIdx.serial_numbers.length !== 0
        ) {
          let serial_number = dataMatIdx.serial_numbers.find(
            (e) => e.flag_name === "obd"
          );
          if (serial_number !== undefined) {
            for (let k = 0; k < serial_number.list_of_sn.length; k++) {
              ws.addRow([
                dataMR.mr_id,
                dataMatIdx.material_id,
                serial_number.list_of_sn[k],
                dataMatIdx.material_name,
                serial_number.updated_by,
                serial_number.updated_on,
                "XL",
                dataMR.origin.value,
              ]);
            }
          }
        } else {
          ws.addRow([
            dataMR.mr_id,
            dataMatIdx.material_id,
            null,
            dataMatIdx.material_name,
            null,
            null,
            "XL",
            dataMR.origin.value,
          ]);
        }
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "SERIAL NUMBER Material MR " + dataMR.mr_id + " REPORT.xlsx"
    );
  }

  async saveUpdateMaterial() {
    this.toggleLoading();
    const dataXLS = this.state.rowsXLS;
    const dataMR = this.state.data_mr;
    let patchDataMat = await this.patchDatatoAPINODE(
      "/matreq/updatePlantSpecWithVariant/" + dataMR._id,
      { identifier: "MR", data: dataXLS }
    );
    if (dataMR.id_plantspec_doc !== undefined) {
      let submitPS = this.submitTSSR(dataMR.id_plantspec_doc);
    }
    if (
      patchDataMat.data !== undefined &&
      patchDataMat.status >= 200 &&
      patchDataMat.status <= 300
    ) {
      this.setState({ action_status: "success" });
    } else {
      if (
        patchDataMat.response !== undefined &&
        patchDataMat.response.data !== undefined &&
        patchDataMat.response.data.error !== undefined
      ) {
        if (patchDataMat.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: patchDataMat.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: patchDataMat.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async needReviseMR() {
    this.toggleLoading();
    const dataMR = this.state.data_mr;
    let patchDataMR = await this.patchDatatoAPINODE(
      "/matreq/needReviseMRFromWH/" + dataMR._id,
      { note_value: this.state.revision_note }
    );
    if (
      patchDataMR.data !== undefined &&
      patchDataMR.status >= 200 &&
      patchDataMR.status <= 300
    ) {
      this.setState({ action_status: "success", modal_revision: false });
    } else {
      if (
        patchDataMR.response !== undefined &&
        patchDataMR.response.data !== undefined &&
        patchDataMR.response.data.error !== undefined
      ) {
        if (patchDataMR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: patchDataMR.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: patchDataMR.response.data.error,
            modal_revision: false,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  async takeoutPS() {
    this.toggleLoading();
    const dataMR = this.state.data_mr;
    this.patchDatatoAPINODE("/matreq/takeOutPlantSpec/" + dataMR._id).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ action_status: "success" });
          this.toggleLoading();
        } else {
          this.setState({ action_status: "failed" });
          this.toggleLoading();
        }
      }
    );
  }

  async cancelMR() {
    this.toggleLoading();
    const dataMR = this.state.data_mr;
    this.patchDatatoAPINODE("/matreq/cancelMatreq/" + dataMR._id, {
      cancelNote: "Cancel MR",
    }).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.toggleLoading();
      } else {
        this.setState({ action_status: "failed" });
        this.toggleLoading();
      }
    });
  }

  tableViewWBSCDID(cd_id) {
    const dataCDWBS = this.state.wbs_cd_id_data;
    let dataCDWBSbyCDID = dataCDWBS.find((e) => e.WP_ID === cd_id);
    if (dataCDWBSbyCDID !== undefined) {
      return (
        <Fragment>
          <td>{dataCDWBSbyCDID.C1003_WBS_HW}</td>
          <td>{dataCDWBSbyCDID.C1008_WBS_HWAC}</td>
          <td>{dataCDWBSbyCDID.C1013_WBS_LCM}</td>
          <td>{dataCDWBSbyCDID.C1018_WBS_PNRO}</td>
          <td>{dataCDWBSbyCDID.C1024_WBS_PNDO}</td>
          <td>{dataCDWBSbyCDID.C1032_WBS_HW_Bulk}</td>
          <td>{dataCDWBSbyCDID.C1033_WBS_LCM_Bulk}</td>
          <td>{dataCDWBSbyCDID.C1034_WBS_PowHW_Site_Basis}</td>
          <td>{dataCDWBSbyCDID.C1035_WBS_PowLCM_Site_Basis}</td>
          <td>{dataCDWBSbyCDID.C1036_WBS_Kathrein}</td>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </Fragment>
      );
    }
  }

  async exportMRFormat() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataMR = this.state.data_mr;

    ws.addRow([
      "id",
      "project_name",
      "mr_type",
      "mr_delivery_type",
      "origin_warehouse",
      "etd",
      "eta",
      "deliver_by",
      "mr_comment_project",
      "sent_mr_request",
      "created_based",
      "identifier",
    ]);

    ws.addRow([
      dataMR.mr_id,
      dataMR.project_name,
      1,
      1,
      dataMR.origin.value,
      dataMR.etd.slice(0, 10),
      dataMR.eta.slice(0, 10),
      dataMR.dsp_company_code,
      null,
      null,
      "cd_id",
      dataMR.cust_del[0].cd_id,
    ]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "MR Uploader Template " + dataMR.mr_id + ".xlsx"
    );
  }

  async updateMR() {
    this.toggleLoading();
    let success = true;
    this.setState({ action_status: null, action_message: null });
    const dataMR = this.state.data_mr;
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
    let list_site = [];
    let dataXLS = [
      [
        "id",
        "project_name",
        "mr_type",
        "mr_delivery_type",
        "origin_warehouse",
        "etd",
        "eta",
        "deliver_by",
        "mr_comment_project",
        "sent_mr_request",
        "created_based",
        "identifier",
      ],
      [
        dataMR.mr_id,
        dataMR.project_name,
        1,
        1,
        dataMR.origin.value,
        dataMR.etd.slice(0, 10),
        dataMR.eta.slice(0, 10),
        this.state.update_mr_form.vendor_code,
        null,
        null,
        "cd_id",
        dataMR.cust_del[0].cd_id,
      ],
    ];
    const respondCheckingMR = await this.postDatatoAPINODE(
      "/matreq/matreqByActivity",
      { data: dataXLS }
    );
    if (
      respondCheckingMR.data !== undefined &&
      respondCheckingMR.status >= 200 &&
      respondCheckingMR.status <= 300
    ) {
      const respondSaveMR = await this.postDatatoAPINODE(
        "/matreq/saveMatreqByActivity",
        { data: respondCheckingMR.data.data }
      );
      if (
        respondSaveMR.data !== undefined &&
        respondSaveMR.status >= 200 &&
        respondSaveMR.status <= 300
      ) {
        this.setState({ action_status: "success", action_message: null });
      } else {
        if (
          respondSaveMR.response !== undefined &&
          respondSaveMR.response.data !== undefined &&
          respondSaveMR.response.data.error !== undefined
        ) {
          if (respondSaveMR.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: respondSaveMR.response.data.error.message,
            });
          } else {
            this.setState({
              action_status: "failed",
              action_message: respondSaveMR.response.data.error,
            });
          }
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    } else {
      if (
        respondCheckingMR.response !== undefined &&
        respondCheckingMR.response.data !== undefined &&
        respondCheckingMR.response.data.error !== undefined
      ) {
        if (respondCheckingMR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondCheckingMR.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondCheckingMR.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
    this.toggleLoading();
  }

  getSIDFile = async (e) => {
    e.preventDefault();
    e.persist();
    const _id = e.currentTarget.value;
    const dataSID = this.state.sid_file.find((sf) => sf._id === _id);
    if (dataSID !== undefined) {
      const resFile = await getDatafromAPINODEFile(
        "/sidFile/getDocument/" + _id,
        this.props.dataLogin.token,
        dataSID.file_document.mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], { type: dataSID.file_document.mime_type }),
          dataSID.file_document.file_name
        );
      }
    }
  };

  getABDFile = async (e) => {
    e.preventDefault();
    e.persist();
    const _id = e.currentTarget.value;
    const dataSID = this.state.abd_file.find((sf) => sf._id === _id);
    if (dataSID !== undefined) {
      const resFile = await getDatafromAPINODEFile(
        "/sidFile/getDocument/" + _id,
        this.props.dataLogin.token,
        dataSID.file_document.mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], { type: dataSID.file_document.mime_type }),
          dataSID.file_document.file_name
        );
      }
    }
  };

  getBAPAFile = async (e) => {
    e.preventDefault();
    e.persist();
    const _id = e.currentTarget.value;
    const dataBAPA = this.state.data_mr.bapa_document;
    if (dataBAPA !== undefined && dataBAPA !== null) {
      const resFile = await getDatafromAPINODEFile(
        "/matreq-srn/getBapaDocument/" + _id,
        this.props.dataLogin.token,
        dataBAPA.mime_type
      );
      if (resFile !== undefined) {
        saveAs(
          new Blob([resFile.data], { type: dataBAPA.mime_type }),
          dataBAPA.file_name
        );
      }
    }
  };

  handleMotType(e) {
    this.setState({ mot_type: e.target.value });
  }

  handleChangeEditQty() {
    this.setState((prevState) => ({
      edit_qty_mat_dis: !prevState.edit_qty_mat_dis,
    }));
  }

  handleChangeQtyMaterial(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      qty_material_new: prevState.qty_material_new.set(name, value),
    }));
  }

  async updateMaterialQty() {
    let dataQtyList = [];
    let headerRow = [
      "bam_id",
      "bundle_id",
      "bundle_name",
      "material_id",
      "material_name",
      "uom",
      "qty",
    ];
    dataQtyList.push(headerRow);
    const dataMR = this.state.data_mr;
    const dataPackage = dataMR.srn_packages;
    const dataQtyNew = this.state.qty_material_new;
    for (let i = 0; i < dataPackage.length; i++) {
      for (let j = 0; j < dataPackage[i].srn_materials.length; j++) {
        const dataMat = dataPackage[i].srn_materials[j];
        if (dataQtyNew.has(dataMat._id)) {
          dataQtyList.push([
            dataMat._id,
            dataPackage[i].pp_id,
            dataPackage[i].product_name,
            dataMat.material_id,
            dataMat.material_name,
            dataMat.uom,
            dataQtyNew.get(dataMat._id),
          ]);
        }
      }
    }
    const dataUpload = {
      data: dataQtyList,
      identifier: "MRD",
    };
    const resPatch = await this.patchDatatoAPINODE(
      "/matreq-srn/updateMaterialPlantSpec/" + dataMR._id,
      dataUpload
    );
    if (resPatch !== undefined && resPatch.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        resPatch.response !== undefined &&
        resPatch.response.data !== undefined &&
        resPatch.response.data.error !== undefined
      ) {
        if (resPatch.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: resPatch.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: resPatch.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  }

  async requestMRDismantle() {
    const resPatch = await this.patchDatatoAPINODE(
      "/matreq-srn/requestMatreqDismantle/" + this.props.match.params.id,
      {}
    );
    if (resPatch !== undefined && resPatch.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        resPatch.response !== undefined &&
        resPatch.response.data !== undefined &&
        resPatch.response.data.error !== undefined
      ) {
        if (resPatch.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: resPatch.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: resPatch.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  }

  render() {
    const background = {
      backgroundColor: "#e3e3e3",
    };

    function MapsTrekking(props) {
      return <GMap />;
    }

    // const MapLoader = withScriptjs(MapsTrekking);

    let qty_wh = undefined,
      qty_inbound = undefined;
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
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i
                    className="fa fa-info-circle"
                    style={{ marginRight: "8px" }}
                  ></i>
                  MRA Detail
                </span>
                {this.state.data_mr !== null &&
                  this.state.data_mr.current_mr_status !== "MR CANCELED" &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-Project Planner"
                  ) === -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-Warehouse"
                  ) === -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-ASP Management"
                  ) === -1 &&
                  this.state.userRole.findIndex((e) => e === "BAM-ASP") ===
                    -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-ASPWarehouse"
                  ) === -1 && (
                    <Fragment>
                      {/* }<Button style={{float : 'right', marginRight: "8px"}} size="sm" color="warning" onClick={this.changeEditable}>Edit MRA  Detail</Button> */}
                    </Fragment>
                  )}
                {this.state.data_mr !== null &&
                (this.state.sid_file.length !== 0 ||
                  this.state.abd_file.length !== 0 ||
                  (this.state.data_mr.bapa_document !== undefined &&
                    this.state.data_mr.bapa_document !== null)) ? (
                  <Dropdown
                    size="sm"
                    isOpen={this.state.dropdownOpen[1]}
                    toggle={() => {
                      this.toggleDropdown(1);
                    }}
                    style={{ float: "right", marginRight: "10px" }}
                  >
                    <DropdownToggle caret color="secondary">
                      <i className="fa fa-download" aria-hidden="true">
                        {" "}
                        &nbsp;{" "}
                      </i>
                      Download File
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>BAPA File</DropdownItem>
                      {this.state.data_mr.bapa_document !== undefined &&
                        this.state.data_mr.bapa_document !== null && (
                          <DropdownItem
                            value={this.state.data_mr._id}
                            onClick={this.getBAPAFile}
                          >
                            <span>
                              {this.state.data_mr.bapa_document.file_name}
                            </span>
                          </DropdownItem>
                        )}
                      <DropdownItem header>SID File</DropdownItem>
                      {this.state.sid_file.map((sf) => (
                        <DropdownItem value={sf._id} onClick={this.getSIDFile}>
                          <span>{sf.file_document.file_name}</span> (
                          {sf.cust_del[0].cd_id})
                        </DropdownItem>
                      ))}
                      <DropdownItem header>ABD File</DropdownItem>
                      {this.state.userRole.findIndex(
                        (e) => e === "BAM-ASP Management"
                      ) === -1 &&
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-ASP"
                        ) === -1 &&
                        this.state.userRole.findIndex(
                          (e) => e === "BAM-ASPWarehouse"
                        ) === -1 &&
                        this.state.abd_file.map((sf) => (
                          <DropdownItem
                            value={sf._id}
                            onClick={this.getABDFile}
                          >
                            <span>{sf.file_document.file_name}</span> (
                            {sf.cust_del[0].cd_id})
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <Button
                    size="sm"
                    style={{ float: "right", marginRight: "10px" }}
                  >
                    no data SID or ABD
                  </Button>
                )}
                <Button
                  style={{ marginRight: "8px", float: "right" }}
                  outline
                  color="info"
                  size="sm"
                  onClick={this.exportMRFormat}
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  MR Format
                </Button>
              </CardHeader>
              <CardBody>
                <div style={{ marginBottom: "10px" }}>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        href="#"
                        active={this.state.tabs_submenu[0]}
                        value="0"
                        onClick={this.changeTabsSubmenu.bind(this, 0)}
                      >
                        MR Info
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#"
                        active={this.state.tabs_submenu[1]}
                        value="1"
                        onClick={this.changeTabsSubmenu.bind(this, 1)}
                      >
                        MR Material
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#"
                        active={this.state.tabs_submenu[2]}
                        value="2"
                        onClick={this.changeTabsSubmenu.bind(this, 2)}
                      >
                        Progress Overview
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#"
                        active={this.state.tabs_submenu[3]}
                        value="2"
                        onClick={this.changeTabsSubmenu.bind(this, 3)}
                      >
                        Map View
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <table
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          color: "rgba(59,134,134,1)",
                          fontSize: "21px",
                        }}
                      >
                        MRA Detail
                      </td>
                    </tr>
                    {this.state.data_mr !== null && (
                      <Fragment>
                        <tr>
                          <td
                            colSpan="4"
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                              color: "rgba(59,134,134,1)",
                            }}
                          >
                            MRA ID : {this.state.data_mr.mra_id}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="4"
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                              color: "rgba(59,134,134,1)",
                            }}
                          >
                            Project Name : {this.state.data_mr.project_name}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="4"
                            style={{
                              fontSize: "15px",
                              textAlign: "center",
                              color: "rgba(59,134,134,1)",
                            }}
                          >
                            MRA Type : {this.state.data_mr.mra_type}
                          </td>
                        </tr>
                        {this.state.data_mr.mra_sh_id != undefined &&
                          this.state.data_mr.mra_sh_id !== null && (
                            <tr>
                              <td
                                colSpan="4"
                                style={{
                                  fontSize: "13px",
                                  textAlign: "center",
                                  color: "rgba(59,134,134,1)",
                                }}
                              >
                                MRA SH Migration ID :{" "}
                                {this.state.data_mr.mra_sh_id}
                              </td>
                            </tr>
                          )}
                      </Fragment>
                    )}
                  </tbody>
                </table>
                <hr
                  style={{
                    borderStyle: "double",
                    borderWidth: "0px 0px 4px 0px",
                    borderColor: "rgba(59,134,134,1)",
                    marginTop: "5px",
                  }}
                ></hr>
                {this.state.tabs_submenu[0] === true && (
                  <Fragment>
                    {this.state.data_mr !== null && (
                      <Fragment>
                        <div className="mr-detail__body--flex">
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>CD ID</span>
                            </div>
                            <div>
                              <ul className="mr-detail__ul--cd-id">
                                {this.state.data_mr.cust_del !== undefined ? (
                                  <li>
                                    {this.state.data_mr.cust_del
                                      .map((cd) => cd.cd_id)
                                      .join(", ")}
                                  </li>
                                ) : (
                                  <li>{this.state.data_mr.cd_id}</li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Category</span>
                            </div>
                            <div>{this.state.data_mr.mrd_category}</div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Current Milestone</span>
                            </div>
                            <div>{this.state.data_mr.current_milestones}</div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Current Status</span>
                            </div>
                            <div>{this.state.data_mr.current_mra_status}</div>
                          </div>
                        </div>

                        <div className="mr-detail__body--flex">
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>ETD</span>
                            </div>
                            <div>{this.state.data_mr.etd}</div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>ETA</span>
                            </div>
                            <div>{this.state.data_mr.eta}</div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Dismantle Company</span>
                            </div>
                            <div>
                              {this.state.data_mr.asp_company_dismantle}
                            </div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Delivery Company</span>
                            </div>
                            {this.state.edit_detail === true ? (
                              <Input
                                type="select"
                                name="vendor_code"
                                value={this.state.update_mr_form.vendor_code}
                                onChange={this.handleChangeFormMRUpdate}
                              >
                                <option value="" disabled selected hidden>
                                  Select Delivery Company
                                </option>
                                <option value="DSP">DSP</option>
                                {this.state.dsp_list.map((e) => (
                                  <option value={e.Vendor_Code}>
                                    {e.Name}
                                  </option>
                                ))}
                              </Input>
                            ) : (
                              <div>{this.state.data_mr.dsp_company}</div>
                            )}
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Note</span>
                            </div>
                            <div>{this.state.data_mr.note}</div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>Assignment ID</span>
                            </div>
                            <div>{this.state.data_mr.assignment_id}</div>
                          </div>
                          <div>
                            <div className="mr-detail__body--header-detail">
                              <span>MR Related</span>
                            </div>
                            <div>{this.state.data_mr.assignment_id}</div>
                          </div>
                        </div>

                        <hr className="mr-detail__line" />

                        <div className="mr-detail__body--flex">
                          {this.state.data_mr !== null && (
                            <Fragment>
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>Origin Site ID</span>
                                </div>
                                <div>
                                  {this.state.data_mr.origin !== null &&
                                  this.state.data_mr.site_info.find(
                                    (si) => si.srn_title === "Origin"
                                  ) !== undefined
                                    ? this.state.data_mr.site_info.find(
                                        (si) => si.srn_title === "Origin"
                                      ).site_id
                                    : null}
                                </div>
                              </div>
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>Origin Site Name</span>
                                </div>
                                <div>
                                  {this.state.data_mr.origin !== null &&
                                  this.state.data_mr.site_info.find(
                                    (si) => si.srn_title === "Origin"
                                  ) !== undefined
                                    ? this.state.data_mr.site_info.find(
                                        (si) => si.srn_title === "Origin"
                                      ).site_name
                                    : null}
                                </div>
                              </div>
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>Origin Site Coordinat</span>
                                </div>
                                <div>
                                  <span style={{ fontWeight: "700" }}>
                                    Lat :{" "}
                                  </span>
                                  {this.state.data_mr.origin !== null &&
                                  this.state.data_mr.site_info.find(
                                    (si) => si.srn_title === "Origin"
                                  ) !== undefined
                                    ? this.state.data_mr.site_info.find(
                                        (si) => si.srn_title === "Origin"
                                      ).site_latitude
                                    : null}
                                  <br />
                                  <span style={{ fontWeight: "700" }}>
                                    Long :{" "}
                                  </span>
                                  {this.state.data_mr.origin !== null &&
                                  this.state.data_mr.site_info.find(
                                    (si) => si.srn_title === "Origin"
                                  ) !== undefined
                                    ? this.state.data_mr.site_info.find(
                                        (si) => si.srn_title === "Origin"
                                      ).site_longitude
                                    : null}
                                </div>
                              </div>
                            </Fragment>
                          )}
                        </div>
                        <div className="mr-detail__body--flex">
                          {this.state.data_mr !== null && (
                            <Fragment>
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>Destination ID</span>
                                </div>
                                <div>
                                  {this.state.data_mr.origin !== null &&
                                    this.state.data_mr.destination.value}
                                </div>
                              </div>
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>Destination Name</span>
                                </div>
                                {this.state.data_mr.mrd_category_code ===
                                "TWH" ? (
                                  <div>{this.state.data_wh.wh_name}</div>
                                ) : (
                                  <div>
                                    {this.state.data_mr.origin !== null &&
                                    this.state.data_mr.site_info.find(
                                      (si) => si.srn_title === "Destination"
                                    ) !== undefined
                                      ? this.state.data_mr.site_info.find(
                                          (si) => si.srn_title === "Destination"
                                        ).site_name
                                      : null}
                                  </div>
                                )}
                              </div>
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>Destination Coordinat</span>
                                </div>
                                {this.state.data_mr.mrd_category_code ===
                                "TWH" ? (
                                  <div>
                                    <span style={{ fontWeight: "700" }}>
                                      Lat :{" "}
                                    </span>
                                    {this.state.data_wh.latitude}
                                    <br />
                                    <span style={{ fontWeight: "700" }}>
                                      Long :{" "}
                                    </span>
                                    {this.state.data_wh.longitude}
                                  </div>
                                ) : (
                                  <div>
                                    <span style={{ fontWeight: "700" }}>
                                      Lat :{" "}
                                    </span>
                                    {this.state.data_mr.origin !== null &&
                                    this.state.data_mr.site_info.find(
                                      (si) => si.srn_title === "Destination"
                                    ) !== undefined
                                      ? this.state.data_mr.site_info.find(
                                          (si) => si.srn_title === "Destination"
                                        ).site_latitude
                                      : null}
                                    <br />
                                    <span style={{ fontWeight: "700" }}>
                                      Long :{" "}
                                    </span>
                                    {this.state.data_mr.origin !== null &&
                                    this.state.data_mr.site_info.find(
                                      (si) => si.srn_title === "Destination"
                                    ) !== undefined
                                      ? this.state.data_mr.site_info.find(
                                          (si) => si.srn_title === "Destination"
                                        ).site_longitude
                                      : null}
                                  </div>
                                )}
                              </div>
                            </Fragment>
                          )}
                        </div>

                        <hr className="mr-detail__line" />

                        <div className="mr-detail__body--flex-long">
                          <Fragment>
                            {this.state.data_mr.cust_del !== undefined ? (
                              this.state.data_mr.cust_del.map((e) => (
                                <div className="mr-detail__flex-body--25">
                                  <div className="mr-detail__body--header-detail">
                                    <span>WBS of CD ID {e.cd_id}</span>
                                  </div>
                                  <div>
                                    <Table
                                      responsive
                                      striped
                                      bordered
                                      size="sm"
                                    >
                                      <thead>
                                        <tr style={{ fontSize: "10.5px" }}>
                                          <th>WBS HW</th>
                                          <th>WBS HWAC (License)</th>
                                          <th>WBS LCM</th>
                                          <th>WBS PNRO</th>
                                          <th>WBS PNDO</th>
                                          <th>WBS HW Bulk</th>
                                          <th>WBS LCM Bulk</th>
                                          <th>WBS PowHW Site Basis</th>
                                          <th>WBS PowLCM Site Basis</th>
                                          <th>WBS Kathrein</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr style={{ fontSize: "10.5px" }}>
                                          {this.tableViewWBSCDID(e.cd_id)}
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="mr-detail__flex-body--25">
                                <div className="mr-detail__body--header-detail">
                                  <span>
                                    WBS of CD ID {this.state.data_mr.cd_id}
                                  </span>
                                </div>
                                <div>{this.state.mr_site_NE.site_id}</div>
                              </div>
                            )}
                          </Fragment>
                        </div>

                        <hr className="mr-detail__line" />

                        <div className="mr-detail__body--flex"></div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
                {this.state.tabs_submenu[1] === true && (
                  <Fragment>
                    <Row>
                      <Col md="6">
                        <div>
                          <Button
                            color="info"
                            style={{ margin: "0px 10px" }}
                            size="sm"
                            onClick={this.handleChangeEditQty}
                          >
                            Edit Material Qty
                          </Button>
                          {this.state.edit_qty_mat_dis === true && (
                            <Button
                              color="success"
                              style={{ float: "right", margin: "0px 10px" }}
                              size="sm"
                              onClick={this.updateMaterialQty}
                            >
                              Update Material Qty
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <hr className="upload-line-ordering"></hr>
                    <div>
                      PlantSpec Group No :{" "}
                      {this.state.data_mr !== null ? (
                        <Link
                          to={
                            "/srn/ps-srn-detail/" +
                            this.state.data_mr.id_plantspec_doc
                          }
                        >
                          {this.state.data_mr.srn_plantspec.length !== 0
                            ? this.state.data_mr.srn_plantspec[0]
                                .no_plantspec_srn
                            : null}
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="divtable2">
                      <Table hover bordered striped responsive size="sm">
                        <thead
                          style={{ backgroundColor: "#0B486B", color: "white" }}
                        >
                          <tr>
                            <th
                              className="fixedhead"
                              style={{
                                width: "200px",
                                verticalAlign: "middle",
                              }}
                            >
                              PP / Material Code
                            </th>
                            <th
                              className="fixedhead"
                              style={{ verticalAlign: "middle" }}
                            >
                              PP / Material Name
                            </th>
                            <th
                              className="fixedhead"
                              style={{
                                width: "100px",
                                verticalAlign: "middle",
                              }}
                            >
                              UoM
                            </th>
                            <th
                              className="fixedhead"
                              style={{
                                width: "150px",
                                verticalAlign: "middle",
                              }}
                            >
                              Qty
                            </th>
                            <th
                              className="fixedhead"
                              style={{
                                width: "150px",
                                verticalAlign: "middle",
                              }}
                            >
                              Qty Actual
                            </th>
                          </tr>
                        </thead>
                        {this.state.data_mr !== null && (
                          <tbody>
                            {this.state.data_mr.srn_packages !== undefined &&
                              this.state.data_mr.srn_packages
                                .filter(
                                  (e) => e.product_type.toLowerCase() !== "svc"
                                )
                                .map((pp, arr_pp) => (
                                  <Fragment>
                                    <tr
                                      key={arr_pp}
                                      style={{ backgroundColor: "#E5FCC2" }}
                                      className="fixbody"
                                    >
                                      <td style={{ textAlign: "left" }}>
                                        {pp.pp_id}
                                      </td>
                                      <td>{pp.product_name}</td>
                                      <td>{pp.uom}</td>
                                      <td align="center">
                                        {pp.qty.toFixed(2)}
                                      </td>
                                      <td align="center">
                                        {pp.qty.toFixed(2)}
                                      </td>
                                    </tr>
                                    {pp.srn_materials.map(
                                      (material, arr_mat) => (
                                        <tr
                                          key={arr_pp + "/" + arr_mat}
                                          style={{
                                            backgroundColor:
                                              "rgba(248,246,223, 0.5)",
                                          }}
                                          className="fixbody"
                                        >
                                          <td style={{ textAlign: "right" }}>
                                            {material.material_id}
                                          </td>
                                          <td style={{ textAlign: "left" }}>
                                            {material.material_name}
                                          </td>
                                          <td>{material.uom}</td>
                                          {this.state.edit_qty_mat_dis ===
                                          true ? (
                                            <td key={arr_mat} align="center">
                                              <Input
                                                type="number"
                                                name={material._id}
                                                value={
                                                  this.state.qty_material_new.has(
                                                    material._id
                                                  )
                                                    ? this.state.qty_material_new.get(
                                                        material._id
                                                      )
                                                    : material.qty
                                                }
                                                onChange={
                                                  this.handleChangeQtyMaterial
                                                }
                                              />
                                            </td>
                                          ) : (
                                            <td key={arr_mat} align="center">
                                              {material.qty}
                                            </td>
                                          )}
                                          <td align="center">
                                            {this.state.data_mr
                                              .lom_srn_packages !== undefined &&
                                            this.state.data_mr.lom_srn_packages.find(
                                              (lsp) => lsp.pp_id === pp.pp_id
                                            ) !== undefined
                                              ? this.state.data_mr.lom_srn_packages
                                                  .find(
                                                    (lsp) =>
                                                      lsp.pp_id === pp.pp_id
                                                  )
                                                  .lom_srn_materials.find(
                                                    (lsm) =>
                                                      lsm.material_id ===
                                                      material.material_id
                                                  ) !== undefined
                                                ? material.qty -
                                                  this.state.data_mr.lom_srn_packages
                                                    .find(
                                                      (lsp) =>
                                                        lsp.pp_id === pp.pp_id
                                                    )
                                                    .lom_srn_materials.find(
                                                      (lsm) =>
                                                        lsm.material_id ===
                                                        material.material_id
                                                    ).qty
                                                : material.qty
                                              : material.qty}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </Fragment>
                                ))}
                          </tbody>
                        )}
                      </Table>
                    </div>
                  </Fragment>
                )}
                {this.state.tabs_submenu[2] === true && (
                  <Fragment>
                    <div className="animated fadeIn">
                      {this.state.data_mr !== null && (
                        <Row>
                          <Col md="6">
                            <table style={{ marginBottom: "10px" }}>
                              <tbody>
                                <tr>
                                  <td style={{ width: "150px" }}>
                                    Current Milestone
                                  </td>
                                  <td> : </td>
                                  <td>
                                    {this.state.data_mr.current_milestones}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "150px" }}>
                                    Current Status
                                  </td>
                                  <td> : </td>
                                  <td>
                                    {this.state.data_mr.current_mr_status}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col xs="12" lg="12">
                          <Card>
                            <CardHeader>
                              {this.state.data_mr !== null && (
                                <span>
                                  {" "}
                                  Progress Overview for{" "}
                                  <b>{this.state.data_mr.mr_id}</b>{" "}
                                </span>
                              )}
                            </CardHeader>
                            <CardBody style={background}>
                              <VerticalTimeline>
                                {this.state.data_mr !== null &&
                                  this.state.data_mr.mra_status
                                    .filter(
                                      (e) =>
                                        e.mra_status_name !== "IMPLEMENTATION"
                                    )
                                    .map((ms, i) => {
                                      return this.milestoneStat(
                                        ms.mra_status_name,
                                        ms.mra_status_value,
                                        ms.mra_status_date,
                                        ms.mra_status_updater,
                                        ms.mra_status_note,
                                        i
                                      );
                                    })}
                              </VerticalTimeline>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Fragment>
                )}
                {this.state.tabs_submenu[3] === true && (
                  <Fragment>
                    {this.state.data_mr !== null ? (
                      this.state.location_mr.updated_location !== undefined ? (
                        <Fragment>
                          {console.log("dataWH", this.state.data_wh)}
                          <GMap
                            wh_lat={this.state.data_wh.latitude}
                            wh_lng={this.state.data_wh.longitude}
                            dsp_lat={
                              this.state.location_mr.updated_location.latitude
                            }
                            dsp_lng={
                              this.state.location_mr.updated_location.longitude
                            }
                            site_lat={
                              this.state.data_mr.site_info[0].site_latitude
                            }
                            site_lng={
                              this.state.data_mr.site_info[0].site_longitude
                            }
                          />
                        </Fragment>
                      ) : (
                        <GMap
                          wh_lat={
                            this.state.data_wh.latitude === null
                              ? undefined
                              : this.state.data_wh.latitude
                          }
                          wh_lng={
                            this.state.data_wh.longitude === null
                              ? undefined
                              : this.state.data_wh.longitude
                          }
                          dsp_lat={
                            this.state.data_wh.latitude === null
                              ? undefined
                              : this.state.data_wh.latitude
                          }
                          dsp_lng={
                            this.state.data_wh.longitude === null
                              ? undefined
                              : this.state.data_wh.longitude
                          }
                          site_lat={
                            this.state.data_mr.site_info[0].site_latitude
                          }
                          site_lng={
                            this.state.data_mr.site_info[0].site_longitude
                          }
                        />
                      )
                    ) : (
                      <div></div>
                    )}
                  </Fragment>
                )}
              </CardBody>
              <CardFooter>
                {this.state.data_mr !== null &&
                  this.state.data_mr.current_mr_status !== "MR CANCELED" &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-Project Planner"
                  ) === -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-Warehouse"
                  ) === -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-ASP Management"
                  ) === -1 &&
                  this.state.userRole.findIndex((e) => e === "BAM-ASP") ===
                    -1 &&
                  this.state.userRole.findIndex(
                    (e) => e === "BAM-ASPWarehouse"
                  ) === -1 && (
                    <React.Fragment>
                      {this.state.data_mr !== null && (
                        <div>
                          {(this.state.userRole.findIndex(
                            (e) => e === "BAM-LDM"
                          ) !== -1 ||
                            this.state.userRole.findIndex(
                              (e) => e === "Admin"
                            ) !== -1) &&
                          this.state.data_mr.current_mra_status ===
                            "MR REQUESTED" ? (
                            <Button
                              color="success"
                              style={{ float: "right" }}
                              size="sm"
                              onClick={this.toggleModalapprove}
                            >
                              Approve
                            </Button>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  )}
                {this.state.data_mr !== null &&
                  this.state.data_mr.current_mra_status ===
                    "PLANTSPEC SRN UPDATED" && (
                    <Button
                      color="info"
                      style={{ float: "right" }}
                      size="sm"
                      onClick={this.requestMRDismantle}
                    >
                      Request MRD
                    </Button>
                  )}
              </CardFooter>
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
              <div className="lds-ring">
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

        <Modal
          isOpen={this.state.modal_revision}
          toggle={this.toggleModalRevision}
          className={"modal-sm"}
        >
          <ModalHeader>Note for Revision</ModalHeader>
          <ModalBody>
            <Input
              type="textarea"
              rows="9"
              placeholder="Note..."
              onChange={this.handleRevisionNote}
              value={this.state.revision_note}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="warning"
              style={{ float: "right", marginRight: "8px" }}
              onClick={this.needReviseMR}
            >
              <i className="fa fa-edit" style={{ marginRight: "8px" }}></i> Need
              Revision
            </Button>
            <Button color="secondary" onClick={this.toggleModalRevision}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* modal form approve */}
        <ModalForm
          isOpen={this.state.modal_approve_ldm}
          toggle={this.toggleModalapprove}
          className={"modal-sm modal--box-input"}
        >
          <Col>
            {this.state.data_mr !== null &&
            this.state.data_mr !== undefined &&
            this.state.data_mr.dsp_company !== null ? (
              <FormGroup>
                <Label htmlFor="total_box">Delivery Company</Label>
                <Input
                  type="text"
                  className=""
                  placeholder=""
                  value={this.state.data_mr.dsp_company}
                  readOnly
                />
              </FormGroup>
            ) : (
              <Fragment>
                <FormGroup>
                  <Label htmlFor="total_box">DSP Company</Label>
                  <Input
                    type="select"
                    className=""
                    placeholder=""
                    onChange={this.handleLDMapprove}
                  >
                    <option value="" disabled selected hidden></option>
                    {this.state.asp_data.map((asp) => (
                      <option value={asp.Vendor_Code}>{asp.Name}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="total_box">MOT Type</Label>
                  <Input
                    type="select"
                    name={"0 /// sub_category"}
                    onChange={this.handleMotType}
                    value={this.state.mot_type}
                  >
                    <option value="" disabled selected hidden></option>
                    <option value="MOT-Land">MOT-Land</option>
                    <option value="MOT-Air">MOT-Air</option>
                    <option value="MOT-Sea">MOT-Sea</option>
                  </Input>
                </FormGroup>
              </Fragment>
            )}
          </Col>
          <div style={{ justifyContent: "center", alignSelf: "center" }}>
            <Button
              color="success"
              onClick={this.ApproveMR}
              className="btn-pill"
            >
              <i className="icon-check icons"></i> Approve
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
  };
};

export default connect(mapStateToProps)(MRDisDetail);