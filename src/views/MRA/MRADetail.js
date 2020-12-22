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
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Form, FormGroup, Label, Nav, NavItem, NavLink } from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { ExcelRenderer } from "react-excel-renderer";
import { connect } from "react-redux";
import Select from "react-select";
import ModalDelete from "../components/ModalDelete";
import ericssonLogoBlack from "../../assets/img/brand/ERI_horizontal_RGB_BLACK.svg";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { convertDateFormatfull } from "../../helper/basicFunction";
import "react-vertical-timeline-component/style.min.css";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL_BMS_Phil = "https://api-dev.smart.pdb.e-dpm.com/smartapi";
const usernamePhilApi = "pdbdash";
const passwordPhilApi = "rtkO6EZLkxL1";

const API_URL_BAM = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

const API_URL_PDB_TSEL = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameTselApi = "adminbamidsuper";
const passwordTselApi = "F760qbAg2sml";

const API_URL_XL = "https://api-dev.xl.pdb.e-dpm.com/xlpdbapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

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

if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

class MRADetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      rowsXLS: [],
      data_tower: {},
      data_tssr: null,
      tssr_site_FE: null,
      tssr_site_NE: null,
      data_tssr_sites: [],
      data_tssr_sites_item: [],
      list_version: [],
      data_tssr_current: null,
      tssr_site_FE_current: null,
      tssr_site_NE_current: null,
      data_tssr_sites_current: [],
      data_tssr_sites_item_current: [],
      version_selected: null,
      version_current: null,
      list_pp_material_tssr: [],
      list_project: [],
      project_selected: null,
      project_name_selected: null,
      cd_id_selected: null,
      dataTssrUpload: [],
      dataTssrRevUpload: [],
      list_technical_ref: [],
      list_technical_ref_selection: [],
      technical_ref_selected: null,
      waiting_status: null,
      action_status: null,
      action_message: null,
      mra_data: null,
      material_wh: [],
      material_inbound: [],
      collapseUpload: false,
      dropdownOpen: new Array(1).fill(false),
      wbs_cd_id_data: [],
      collapseUploadAdditonal: false,
      qty_ps: [
        [
          "bam_id",
          "tssr_id",
          "bundle_id",
          "bundle_name",
          "program",
          "material_id_plan",
          "material_name_plan",
          "material_id_actual",
          "material_name_actual",
          "uom",
          "qty",
        ],
      ],

      modalAdditionalForm: false,
      modal_loading: false,
      additional_material: [],
      modal_delete_warning: false,
      product_package: [],
      tabs_submenu: [true, false, false, false],
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeVersion = this.handleChangeVersion.bind(this);
    this.saveProjecttoDB = this.saveProjecttoDB.bind(this);
    this.exportFormatTSSR = this.exportFormatTSSR.bind(this);
    this.handleChangeTechRef = this.handleChangeTechRef.bind(this);
    this.referenceWithTechBoq = this.referenceWithTechBoq.bind(this);
    this.submitTSSR = this.submitTSSR.bind(this);
    this.deletePS = this.deletePS.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.toggleUploadAdditional = this.toggleUploadAdditional.bind(this);
    this.saveUpdateMaterial = this.saveUpdateMaterial.bind(this);
    this.saveUpdateMaterialAdditonal = this.saveUpdateMaterialAdditonal.bind(
      this
    );
    this.saveUpdateMaterialWeb = this.saveUpdateMaterialWeb.bind(this);
    this.downloadMaterialTSSRUpload = this.downloadMaterialTSSRUpload.bind(
      this
    );
    this.downloadMaterialTSSRUploadNOK = this.downloadMaterialTSSRUploadNOK.bind(
      this
    );
    this.exportMaterialPSReport = this.exportMaterialPSReport.bind(this);
    this.exportMaterialPSReportBundling = this.exportMaterialPSReportBundling.bind(
      this
    );
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleAdditionalForm = this.toggleAdditionalForm.bind(this);
    this.AdditionalForm = this.AdditionalForm.bind(this);

    this.addMaterialAdditional = this.addMaterialAdditional.bind(this);
    this.deleteMaterialAdditional = this.deleteMaterialAdditional.bind(this);
    this.downloadMaterialTSSRUploadAdditional = this.downloadMaterialTSSRUploadAdditional.bind(
      this
    );
    this.onChangeMaterialAdditional = this.onChangeMaterialAdditional.bind(
      this
    );
    this.saveAdditional = this.saveAdditional.bind(this);
    this.deleteAdditionalMaterialAll = this.deleteAdditionalMaterialAll.bind(
      this
    );
    this.toggleWarningDeleteAdditional = this.toggleWarningDeleteAdditional.bind(
      this
    );
    this.downloadEPODFormat = this.downloadEPODFormat.bind(this);
    this.changeTabsSubmenu = this.changeTabsSubmenu.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  toggleAdditionalForm() {
    this.setState((prevState) => ({
      modalAdditionalForm: !prevState.modalAdditionalForm,
    }));
  }

  toggleWarningDeleteAdditional() {
    this.setState((prevState) => ({
      modal_delete_warning: !prevState.modal_delete_warning,
    }));
  }

  toggleUpload() {
    this.setState({
      collapseUpload: !this.state.collapseUpload,
      collapseUploadAdditonal: false,
    });
  }

  toggleUploadAdditional() {
    this.setState({
      collapseUploadAdditonal: !this.state.collapseUploadAdditonal,
      collapseUpload: false,
    });
  }

  toggleDropdown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
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

  async patchDatatoAPIBMS(url, data, _etag) {
    try {
      let respond = await axios.patch(API_URL_BMS_Phil + url, data, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi,
        },
        headers: {
          "If-Match": _etag,
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

  async getDatafromAPITSEL(url) {
    try {
      let respond = await axios.get(API_URL_PDB_TSEL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameTselApi,
          password: passwordTselApi,
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
      console.log("respond Patch data", err.response);
      return respond;
    }
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL_NODE + url,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.tokenUser,
        },
        params: {},
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

  checkValue(props) {
    //Swap undefined to null
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoZero(props) {
    //Swap undefined or null to 0
    if (typeof props == "undefined" || props == null) {
      return 0;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    //Swap undefined or null to ""
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

  comparerDiffbyField(otherArray, field) {
    //Compare Different between 2 array
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other[field] == current[field];
        }).length == 0
      );
    };
  }

  comparerDiffbyValue(otherArray) {
    //Compare Different between 2 array
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other == current;
        }).length == 0
      );
    };
  }

  fileHandlerTSSR = (event) => {
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        } else {
          this.setState(
            {
              action_status: null,
              action_message: null,
            },
            () => {
              this.ArrayEmptytoNull(rest.rows);
            }
          );
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

  getDataMRA(_id_tssr) {
    this.getDataFromAPINODE("/matreq-ra/" + _id_tssr).then((res) => {
      if (res.data !== undefined) {
        this.setState({ mra_data: res.data }, () => {
          if (res.data.site_info !== undefined) {
            this.getDataTower(res.data.site_info[0].site_id);
          }
        });
      }
    });
  }

  getDataTower(tower_id) {
    this.getDatafromAPIXL(
      '/tower_site_op?where={"tower_id" :"' +
        tower_id +
        '"}&projection={"tower_id":1,"region":1}'
    ).then((res) => {
      if (res.data !== undefined) {
        if (res.data._items[0] !== undefined) {
          this.setState({ data_tower: res.data._items[0] });
        }
      }
    });
  }

  async getDataMaterial(data_pp) {
    let dataMat = [];
    let arrayDataPP = data_pp.map((e) => e._id);
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for (let i = 0; i < getNumberPage; i++) {
      let dataPaginationPP = arrayDataPP.slice(i * 25, (i + 1) * 25);
      let arrayIdPP = '"' + dataPaginationPP.join('", "') + '"';
      let where_id_PP = '?where={"id_pp_doc" : {"$in" : [' + arrayIdPP + "]}}";
      let resMat = await this.getDatafromAPIBAM("/mc_op" + where_id_PP);
      if (resMat !== undefined) {
        if (resMat.data !== undefined) {
          // eslint-disable-next-line
          dataMat = dataMat.concat(resMat.data._items);
        }
      }
    }
    this.prepareDataPP(data_pp, dataMat);
  }

  prepareDataPP(data_pp, data_material) {
    let product_package = data_pp;
    const material_catalogue = data_material;
    for (let i = 0; i < product_package.length; i++) {
      const material = material_catalogue.filter(
        (e) => e.pp_id === product_package[i].pp_id
      );
      product_package[i]["list_of_material"] = material;
    }
    this.setState({ list_pp_material_tssr: product_package });
  }

  prepareView() {
    let site_NE = this.state.data_tssr_sites.find((e) => e.site_title === "NE");
    let site_FE = this.state.data_tssr_sites.find((e) => e.site_title === "FE");
    if (site_NE !== undefined) {
      site_NE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(
        (e) => e.id_tssr_boq_site_doc === site_NE._id
      );
      this.setState({ tssr_site_NE: site_NE, tssr_site_NE_current: site_NE });
    } else {
      this.setState({ tssr_site_NE: null, tssr_site_NE_current: null });
    }
    if (site_FE !== undefined) {
      site_FE["list_of_site_items"] = this.state.data_tssr_sites_item.filter(
        (e) => e.id_tssr_boq_site_doc === site_FE._id
      );
      this.setState({ tssr_site_FE: site_FE, tssr_site_FE_current: site_FE });
    } else {
      this.setState({ tssr_site_FE: null, tssr_site_FE_current: null });
    }
  }

  getDataProject() {
    this.getDatafromAPITSEL("/project_sorted_non_page").then((resProject) => {
      if (resProject.data !== undefined) {
        this.setState({ list_project: resProject.data._items });
      }
    });
  }

  componentDidMount() {
    this.getDataMRA(this.props.match.params.id);
    // this.getPackageDataAPI();
  }

  preparingSaveTssr() {
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100);
    const numberTSSR =
      dateNow.getFullYear().toString() +
      (dateNow.getMonth() + 1).toString() +
      dateNow.getDate().toString() +
      "-" +
      dataRandom.toString().padStart(4, "0");
    return numberTSSR;
  }

  getQtyTssrPPNE(pp_id) {
    const itemTssrBom = this.state.tssr_site_NE.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find((e) => e.pp_id === pp_id);
    if (getDataPPTssr !== undefined) {
      return getDataPPTssr.qty;
    } else {
      return 0;
    }
  }

  getQtyTssrPPFE(pp_id) {
    const itemTssrBom = this.state.tssr_site_FE.list_of_site_items;
    const getDataPPTssr = itemTssrBom.find((e) => e.pp_id === pp_id);
    if (getDataPPTssr !== undefined) {
      return getDataPPTssr.qty;
    } else {
      return 0;
    }
  }

  handleChangeProject(e) {
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({ project_selected: value, project_name_selected: text });
  }

  saveProjecttoDB() {
    let dataTssr = this.state.data_tssr;
    const _id_project = this.state.project_selected;
    const name_project = this.state.project_name_selected;
    const dataProject = {
      id_project_doc: _id_project,
      project_name: name_project,
    };
    this.patchDatatoAPIBAM(
      "/tssr_op/" + dataTssr._id,
      dataProject,
      dataTssr._etag
    ).then((resProject) => {
      if (
        resProject.data !== undefined &&
        resProject.status >= 200 &&
        resProject.status <= 300
      ) {
        dataTssr["id_project_doc"] = _id_project;
        dataTssr["project_name"] = name_project;
        this.setState({ action_status: "success", data_tssr: dataTssr });
      } else {
        this.setState({ action_status: "failed" });
      }
    });
  }

  async delItemTssr(itemDel, version, dataSite) {
    let sucDel = [];
    for (let i = 0; i < itemDel.length; i++) {
      const dataItemIdx = dataSite.list_of_site_items.find(
        (e) => e.pp_id === itemDel[i].pp_id
      );
      const delData = await this.patchDatatoAPIBAM(
        "/tssr_site_items_op/" + dataItemIdx._id,
        { deleted: 1, version: version.toString() },
        dataItemIdx._etag
      );
      if (delData.data !== undefined && delData.status < 400) {
        sucDel.push(delData.data._id);
      }
    }
    return sucDel;
  }

  handleChangeVersion(e) {
    const value = e.target.value;
    this.setState({ version_selected: value }, () => {
      if (value !== this.state.version_current) {
        this.getDataMRAVersion(this.props.match.params.id, value);
      } else {
        this.getDataMRA(this.props.match.params.id);
      }
    });
  }

  handleChangeQTY(e, i, u) {
    const value_qty = e.target.value;
    const Data_tssr = this.state.mra_data;
    const Data_package = Data_tssr.packages[u];
    const Data_mat = Data_tssr.packages[u].materials[i];

    this.setState(
      (prevState) => ({
        qty_ps: [
          ...prevState.qty_ps,
          [
            Data_mat._id,
            Data_mat.no_tssr_boq_site,
            Data_package.pp_id,
            Data_package.product_name,
            Data_package.program,
            Data_mat.material_id_plan,
            Data_mat.material_name_plan,
            Data_mat.material_id_plan,
            Data_mat.material_name_plan,
            Data_mat.uom,
            value_qty,
          ],
        ],
      }),
      () => console.log(this.state.qty_ps)
    );
  }

  exportFormatTSSR = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataPP = this.state.list_pp_material_tssr;
    const dataNE = this.state.tssr_site_NE;
    const dataFE = this.state.tssr_site_FE;

    let ppIdRow = ["site_title", "site_id", "site_name"];
    let ppTypeRow = ["", "", ""];

    ppIdRow = ppIdRow.concat(
      dataPP.map((pp) => pp.pp_id + " /// " + pp.product_name)
    );
    ppTypeRow = ppTypeRow.concat(dataPP.map((pp) => pp.product_type));

    ws.addRow(ppTypeRow);
    ws.addRow(ppIdRow);
    if (dataNE !== null) {
      let rowNE = ["NE", dataNE.site_id, dataNE.site_name];
      rowNE = rowNE.concat(dataPP.map((e) => this.getQtyTssrPPNE(e.pp_id)));
      ws.addRow(rowNE);
    }
    if (dataFE !== null) {
      let rowFE = ["FE", dataFE.site_id, dataFE.site_name];
      rowFE = rowFE.concat(dataPP.map((e) => this.getQtyTssrPPFE(e.pp_id)));
      ws.addRow(rowFE);
    }

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([MRFormat]),
      "Plant Spec " +
        this.state.data_tssr.no_tssr_boq +
        " Uploader Template.xlsx"
    );
  };

  getListTechnicalForRef() {
    const dataPSParent = this.state.data_tssr;
    const dataTSSRBOM = this.state.data_tssr_sites;
    let whereTech = "";
    if (dataTSSRBOM.length > 1) {
      whereTech =
        'where={"$or" : [{"site_id" : "' +
        dataTSSRBOM[0].site_id +
        '"}, {"site_id" : "' +
        dataTSSRBOM[1].site_id +
        '"}] }';
    } else {
      whereTech = 'where={"site_id" : "' + dataTSSRBOM[0].site_id + '"}';
    }
    if (dataTSSRBOM.length > 0) {
      this.getDatafromAPIBMS(
        "/boq_tech_sites_op" +
          '?projection={"site_id" : 1, "site_name" : 1, "_etag" : 1, "id_boq_tech_doc" : 1,  "no_boq_tech" : 1, "tssr_boq_id" : 1}&' +
          whereTech
      ).then((res) => {
        if (res.data !== undefined) {
          this.setState({ list_technical_ref: res.data._items }, () => {
            this.prepareSelectionTechRef(res.data._items);
          });
        }
      });
    }
  }

  prepareSelectionTechRef(techRef) {
    const dataTSSRBOM = this.state.data_tssr_sites;
    const techRefUniq = [
      ...new Set(techRef.map(({ no_boq_tech }) => no_boq_tech)),
    ];
    let listTech = [];
    for (let i = 0; i < techRefUniq.length; i++) {
      const getTech = techRef.filter((e) => e.no_boq_tech === techRefUniq[i]);
      if (getTech.length >= dataTSSRBOM.length) {
        listTech.push({ value: getTech[0]._id, label: getTech[0].no_boq_tech });
      }
    }
    this.setState({ list_technical_ref_selection: listTech });
  }

  handleChangeTechRef = (newValue) => {
    this.setState({ technical_ref_selected: newValue.label });
    return newValue;
  };

  async referenceWithTechBoq() {
    const dataTSSRBOM = this.state.data_tssr_sites;
    const techSelected = this.state.list_technical_ref.filter(
      (e) => e.no_boq_tech === this.state.technical_ref_selected
    );
    let sucPatch = [];
    for (let i = 0; i < dataTSSRBOM.length; i++) {
      const patchWill = techSelected.find(
        (e) => e.site_id === dataTSSRBOM[i].site_id
      );
      if (patchWill !== undefined) {
        const patchData = await this.patchDatatoAPIBMS(
          "/boq_tech_sites_op/" + patchWill._id,
          { tssr_boq_id: dataTSSRBOM[0].no_tssr_boq },
          patchWill._etag
        );
        if (patchData.data !== undefined) {
          sucPatch.push(patchData.data._id);
        }
      }
    }
    if (sucPatch.length === dataTSSRBOM.length) {
      this.setState({ action_status: "success" }, () => {
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      });
    } else {
      this.setState({ action_status: "failed" });
    }
  }

  submitTSSR() {
    this.patchDatatoAPINODE(
      "/plantspec/submitPlantspec/" + this.props.match.params.id
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
      } else {
        this.setState({ action_status: "failed" });
      }
    });
  }

  deletePS() {
    this.toggleLoading();
    this.deleteDataFromAPINODE("/plantspec/deletePlantspec", {
      data: [this.props.match.params.id],
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

  CompareArrayObject(arr, prop) {
    return arr.sort(function (a, b) {
      var nameA = a[prop].toLowerCase(),
        nameB = b[prop].toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  async downloadMaterialTSSRUpload() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataTSSR = this.state.mra_data;
    const dataItemTSSR = this.state.mra_data.packages;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = [
      "bam_id",
      "tssr_id",
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
    for (let i = 0; i < dataItemTSSR.length; i++) {
      for (let j = 0; j < dataItemTSSR[i].materials.length; j++) {
        let dataMatIdx = dataItemTSSR[i].materials[j];
        list_material_id.push(dataMatIdx.material_id);
        let qty_wh = stockWH.find((e) => e.sku === dataMatIdx.material_id);
        let qty_inbound = inboundWH.find(
          (e) => e.sku === dataMatIdx.material_id
        );
        qty_wh = qty_wh !== undefined ? qty_wh.qty_sku : 0;
        qty_inbound = qty_inbound !== undefined ? qty_inbound.qty_sku : 0;
        ws.addRow([
          dataMatIdx._id,
          dataItemTSSR[i].no_tssr_boq_site,
          dataItemTSSR[i].pp_id,
          dataItemTSSR[i].product_name,
          dataItemTSSR[i].program,
          dataMatIdx.material_id_plan,
          dataMatIdx.material_name_plan,
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.uom,
          dataMatIdx.qty,
          qty_wh,
          qty_inbound,
          dataMatIdx.qty < qty_wh ? "OK" : "NOK",
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
      "Material TSSR " + dataTSSR.no_plantspec + " uploader.xlsx"
    );
  }

  // check_availability(availability){
  //   if (availability === "OK" ){ continue; }
  // }

  async downloadMaterialTSSRUploadNOK() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataTSSR = this.state.mra_data;
    const dataItemTSSR = this.state.mra_data.packages;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    let headerRow = [
      "bam_id",
      "tssr_id",
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
    for (let i = 0; i < dataItemTSSR.length; i++) {
      for (let j = 0; j < dataItemTSSR[i].materials.length; j++) {
        let dataMatIdx = dataItemTSSR[i].materials[j];
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
          dataItemTSSR[i].no_tssr_boq_site,
          dataItemTSSR[i].pp_id,
          dataItemTSSR[i].product_name,
          dataItemTSSR[i].program,
          dataMatIdx.material_id_plan,
          dataMatIdx.material_name_plan,
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.uom,
          dataMatIdx.qty,
          qty_wh,
          qty_inbound,
          dataMatIdx.qty < qty_wh ? "OK" : "NOK",
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
      "Material TSSR " + dataTSSR.no_plantspec + " uploader.xlsx"
    );
  }

  async downloadMaterialTSSRUploadAdditional() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataTSSR = this.state.mra_data;
    const dataItemTSSR = this.state.mra_data.packages;
    const addPP = dataItemTSSR.filter((e) => e.pp_id === "AdditionalMaterial");
    let dataMaterialVariant = [];

    let headerRow = [
      "material_id_actual",
      "material_name_actual",
      "material_type",
      "unit",
      "qty",
      "source_material",
    ];
    ws.addRow(headerRow);
    let list_material_id = [];
    for (let i = 0; i < addPP.length; i++) {
      for (let j = 0; j < addPP[i].materials.length; j++) {
        let dataMatIdx = addPP[i].materials[j];
        ws.addRow([
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.material_type,
          dataMatIdx.uom,
          dataMatIdx.qty,
          dataMatIdx.source_material,
        ]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Additional Material TSSR " + dataTSSR.no_plantspec + " uploader.xlsx"
    );
  }

  async exportMaterialPSReport() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataTSSR = this.state.mra_data;
    const dataItemTSSR = this.state.mra_data.packages;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

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

    const DocumentNo = ws.mergeCells("F4:H4");
    ws.getCell("F4").value = "Document No.";
    ws.getCell("F4").font = { size: 8 };
    ws.getCell("F4").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("F4").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    const DocumentNum = ws.mergeCells("F5:H5");
    ws.getCell("F5").value = dataTSSR.no_plantspec;
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

    // const revDoc = ws.mergeCells('H6:I6');
    ws.getCell("H6").value = "Rev";
    ws.getCell("H6").font = { size: 8 };
    ws.getCell("H6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("H6").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    // const revDocNum = ws.mergeCells('H7:I7');
    ws.getCell("H7").value = "-";
    ws.getCell("H7").alignment = { horizontal: "left" };
    ws.getCell("H7").border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    ws.mergeCells("I6:J6");
    ws.getCell("I6").value = "File";
    ws.getCell("I6").font = { size: 8 };
    ws.getCell("I6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("I6").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    ws.mergeCells("I7:J7");
    ws.getCell("I7").value = null;
    ws.getCell("I7").alignment = { horizontal: "left" };
    ws.getCell("I7").border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    ws.mergeCells("I4:J4");
    ws.getCell("I4").value = "PO Number";
    ws.getCell("I4").font = { size: 8 };
    ws.getCell("I4").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("I4").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    ws.mergeCells("I5:J5");
    ws.getCell("I5").value = null;
    ws.getCell("I5").alignment = { horizontal: "left" };
    ws.getCell("I5").border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    ws.addRow([""]);
    ws.addRow(["Project", null, ": " + dataTSSR.project_name]);
    ws.mergeCells("A9:B9");
    ws.addRow([""]);
    ws.addRow(["Tower ID", null, ": " + dataTSSR.site_info[0].site_id]);
    ws.addRow(["Tower Name", null, ": " + dataTSSR.site_info[0].site_name]);
    ws.mergeCells("A11:B11");
    ws.addRow([""]);

    let headerRow = [
      "NO.",
      "DENOMINATION",
      null,
      null,
      "PRODUCT CODE",
      null,
      "QTY PLAN",
      "QTY ACTUAL",
      "UNIT",
      "REMARKS",
    ];
    ws.addRow(headerRow);
    ws.mergeCells("B14:D14");
    ws.mergeCells("E14:F14");
    ws.getCell("A14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("B14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("F14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("G14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("H14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("I14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("J14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("A14").font = { bold: true };
    ws.getCell("B14").font = { bold: true };
    ws.getCell("F14").font = { bold: true };
    ws.getCell("G14").font = { bold: true };
    ws.getCell("H14").font = { bold: true };
    ws.getCell("I14").font = { bold: true };
    ws.getCell("J14").font = { bold: true };
    ws.addRow([""]);
    let dataItemTSSRConfig = [
      ...new Set(dataItemTSSR.map(({ config_id }) => config_id)),
    ];

    let numberPSItem = 0;

    for (let a = 0; a < dataItemTSSRConfig.length; a++) {
      let itemTSSRBundle = dataItemTSSR.filter(
        (e) =>
          e.config_id === dataItemTSSRConfig[a] &&
          e.product_type.toLowerCase() !== "svc"
      );
      ws.addRow([
        null,
        dataItemTSSRConfig[a],
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
      ws.addRow([""]);
      numberPSItem = numberPSItem + 1;
      ws.addRow([
        numberPSItem,
        dataItemTSSRConfig[a],
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        dataItemTSSRConfig[a],
      ]);
      ws.addRow([""]);
      for (let i = 0; i < itemTSSRBundle.length; i++) {
        numberPSItem = numberPSItem + 1;
        ws.addRow([
          numberPSItem,
          itemTSSRBundle[i].product_name,
          null,
          null,
          itemTSSRBundle[i].pp_id,
          null,
          itemTSSRBundle[i].qty,
          null,
          itemTSSRBundle[i].uom,
          null,
        ]);
        for (let j = 0; j < itemTSSRBundle[i].materials.length; j++) {
          let dataMatIdx = itemTSSRBundle[i].materials[j];
          ws.addRow([
            null,
            dataMatIdx.material_name,
            null,
            null,
            dataMatIdx.material_id,
            null,
            dataMatIdx.qty,
            dataMatIdx.qty,
            dataMatIdx.uom,
            null,
          ]);
        }
        ws.addRow([""]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Material TSSR " + dataTSSR.no_plantspec + " Report.xlsx"
    );
  }

  async exportMaterialPSReportBundling() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataTSSR = this.state.mra_data;
    const dataItemTSSR = this.state.mra_data.packages;
    const stockWH = this.state.material_wh;
    const inboundWH = this.state.material_inbound;
    let dataMaterialVariant = [];

    // const logoEricsson = wb.addImage({
    //   filename: '../../assets/img/brand/ERI_horizontal_RGB_BLACK.svg',
    //   extension: 'png',
    // });
    //
    // console.log("logoEricsson", logoEricsson);

    // ws.addImage(logoEricsson, 'A1:D2');

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
    ws.getCell("F5").value = dataTSSR.no_plantspec;
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
    ws.getCell("H6").value = "File";
    ws.getCell("H6").font = { size: 8 };
    ws.getCell("H6").alignment = { vertical: "top", horizontal: "left" };
    ws.getCell("H6").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    const revDocNum = ws.mergeCells("H7:I7");
    ws.getCell("H7").value = null;
    ws.getCell("H7").alignment = { horizontal: "left" };
    ws.getCell("H7").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    ws.addRow([""]);
    ws.addRow(["Project", null, ": " + dataTSSR.project_name]);
    ws.mergeCells("A9:B9");
    ws.addRow([""]);
    ws.addRow(["Tower ID", null, ": " + dataTSSR.site_info[0].site_id]);
    ws.addRow(["Tower Name", null, ": " + dataTSSR.site_info[0].site_name]);
    ws.mergeCells("A11:B11");
    ws.addRow([""]);

    let headerRow = [
      "No",
      "FUNCTIONAL DESCRIPTION",
      null,
      null,
      "SAP NUMBER",
      "Qty Plan",
      "Qty Built",
      "SLOC",
      "REMARKS",
    ];
    ws.addRow(headerRow);
    ws.mergeCells("B14:D14");
    ws.getCell("A14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("B14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("E14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("F14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("G14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("H14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("I14").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell("A14").font = { bold: true };
    ws.getCell("B14").font = { bold: true };
    ws.getCell("E14").font = { bold: true };
    ws.getCell("F14").font = { bold: true };
    ws.getCell("G14").font = { bold: true };
    ws.getCell("H14").font = { bold: true };
    ws.getCell("I14").font = { bold: true };
    ws.addRow([""]);
    let dataItemTSSRConfig = [
      ...new Set(dataItemTSSR.map(({ config_id }) => config_id)),
    ];

    let numberPSItem = 0;
    for (let a = 0; a < dataItemTSSRConfig.length; a++) {
      let itemTSSRBundle = dataItemTSSR.filter(
        (e) =>
          e.config_id === dataItemTSSRConfig[a] &&
          e.product_type.toLowerCase() !== "svc"
      );
      for (let i = 0; i < itemTSSRBundle.length; i++) {
        numberPSItem = numberPSItem + 1;
        ws.addRow([
          numberPSItem,
          itemTSSRBundle[i].product_name,
          null,
          null,
          null,
          itemTSSRBundle[i].qty,
          null,
          null,
          null,
        ]);
        for (let j = 0; j < itemTSSRBundle[i].materials.length; j++) {
          let dataMatIdx = itemTSSRBundle[i].materials[j];
          ws.addRow([
            null,
            dataMatIdx.material_name,
            null,
            null,
            null,
            dataMatIdx.qty,
            null,
            null,
            null,
          ]);
        }
        ws.addRow([""]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "Material TSSR " + dataTSSR.no_plantspec + " Report Bundling.xlsx"
    );
  }

  async downloadEPODFormat() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    const ws2 = wb.addWorksheet();

    const dataTSSR = this.state.mra_data;
    const dataItemTSSR = this.state.mra_data.packages;
    const dataCDWBS = this.state.wbs_cd_id_data;
    let dataMaterialVariant = [];

    let checkMaterialOrigin =
      this.state.mra_data.packages[0] !== undefined
        ? this.state.mra_data.packages[0].materials[0] !== undefined
          ? this.state.mra_data.packages[0].materials[0].material_origin !==
            undefined
            ? this.state.mra_data.packages[0].materials[0].material_origin
            : undefined
          : undefined
        : undefined;

    // let ppData = [];
    // if(checkMaterialOrigin === undefined){
    //   ppData = await this.ppData(dataItemTSSR.map(e => e.pp_id))
    // }

    let headerRow = [
      "BOM_ID",
      "Site_ID",
      "Material_ID",
      "Material_Name",
      "Material_Quantity",
      "BOM_Status",
      "WBS_ID",
      "CPO_ID",
      "BOM_Creation_Date",
      "SalesOrder_ID",
      "InternalPO_ID",
      "BOM_Approval_Date",
      "Configuration_ID",
      "Bundle_ID",
      "Program_Name",
      "Material_Category",
    ];
    ws.addRow(headerRow);
    let list_material_id = [];
    for (let i = 0; i < dataItemTSSR.length; i++) {
      let dataCD = null;
      let dataCDWBSbyCDID = dataCDWBS.find(
        (e) => e.WP_ID === dataTSSR.site_info[0].cd_id
      );
      if (dataCDWBSbyCDID !== undefined) {
        dataCD = dataCDWBSbyCDID;
      }
      let dataCDMaterial = null;
      let findCDMaterial = dataTSSR.site_info.find(
        (e) => e.no_tssr_boq_site === dataItemTSSR[i].no_tssr_boq_site
      );
      if (findCDMaterial !== undefined) {
        dataCDMaterial = findCDMaterial.cd_id;
      }
      for (let j = 0; j < dataItemTSSR[i].materials.length; j++) {
        let dataMatIdx = dataItemTSSR[i].materials[j];
        ws.addRow([
          dataTSSR.no_plantspec,
          dataCDMaterial,
          dataMatIdx.material_id,
          dataMatIdx.material_name,
          dataMatIdx.qty,
          "Approved",
          dataCD.C1003_WBS_HW,
          dataItemTSSR[i].cpo_number,
          null,
          null,
          null,
          null,
          dataItemTSSR[i].config_id,
          dataItemTSSR[i].pp_id,
          dataItemTSSR[i].program,
          dataMatIdx.material_origin,
        ]);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([allocexport]),
      "EPOD Format " + dataTSSR.no_plantspec + ".xlsx"
    );
  }

  async saveUpdateMaterialWeb() {
    this.toggleLoading();
    const dataWeb = this.state.qty_ps;
    const dataTSSR = this.state.mra_data;
    let patchDataMat = await this.patchDatatoAPINODE(
      "/matreq/updatePlantSpecWithVariant/" + dataTSSR._id,
      { identifier: "PS", data: dataWeb }
    );
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

  async saveUpdateMaterial() {
    this.toggleLoading();
    const dataXLS = this.state.rowsXLS;
    const dataTSSR = this.state.mra_data;
    let patchDataMat = await this.patchDatatoAPINODE(
      "/matreq/updatePlantSpecWithVariant/" + dataTSSR._id,
      { identifier: "PS", data: dataXLS }
    );
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

  async saveUpdateMaterialAdditonal() {
    this.toggleLoading();
    const dataXLS = this.state.rowsXLS;
    const dataTSSR = this.state.mra_data;
    let patchDataMat = await this.patchDatatoAPINODE(
      "/matreq/inputAdditionalMaterial/" + dataTSSR._id,
      {
        identifier: "PS",
        additionalMaterial: dataXLS,
        takeOutAdditional: false,
      }
    );
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

  async deleteAdditionalMaterialAll() {
    this.toggleLoading();
    const dataXLS = this.state.rowsXLS;
    const dataTSSR = this.state.mra_data;
    let patchDataMat = await this.patchDatatoAPINODE(
      "/matreq/inputAdditionalMaterial/" + dataTSSR._id,
      { identifier: "PS", additionalMaterial: dataXLS, takeOutAdditional: true }
    );
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
        if (patchDataMat.response.data.data !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: patchDataMat.response.data.data,
          });
        } else {
          this.setState({ action_status: "failed" });
        }
      }
    }
    this.setState({ modal_delete_warning: false });
    this.toggleLoading();
  }

  tableWBSPlantSpect(site_info) {
    const dataCDWBS = this.state.wbs_cd_id_data;
    if (site_info.cd_id !== undefined && site_info.cd_id !== null) {
      let dataCDWBSbyCDID = dataCDWBS.find((e) => e.WP_ID === site_info.cd_id);
      if (dataCDWBSbyCDID !== undefined) {
        return (
          <Fragment>
            <td>{site_info.cd_id}</td>
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
            <td>{site_info.cd_id}</td>
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
    } else {
      return (
        <Fragment>
          <td colSpan="11">Please Assign PS to MR</td>
        </Fragment>
      );
    }
  }

  addMaterialAdditional() {
    let addMaterial = this.state.additional_material;
    addMaterial.push({});
    this.setState({ additional_material: addMaterial });
  }

  deleteMaterialAdditional(index) {
    let addMaterial = this.state.additional_material;
    addMaterial.splice(index, 1);
    this.setState({ additional_material: addMaterial });
  }

  onChangeMaterialAdditional(e) {
    let addMaterial = this.state.additional_material;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[1];
    let field = idxField[0];
    if (field === "material_id_actual") {
      addMaterial[parseInt(idx)][field] = value;
      let material = this.state.product_package[0].materials.find(
        (mm) => mm.material_id === value
      );
      if (material !== undefined) {
        addMaterial[parseInt(idx)]["material_name_actual"] =
          material.material_name;
        addMaterial[parseInt(idx)]["material_type"] = material.material_type;
        addMaterial[parseInt(idx)]["unit"] = material.uom;
        addMaterial[parseInt(idx)]["qty"] = material.qty;
      } else {
        addMaterial[parseInt(idx)]["material_name_actual"] = null;
        addMaterial[parseInt(idx)]["material_type"] = null;
        addMaterial[parseInt(idx)]["unit"] = null;
        addMaterial[parseInt(idx)]["qty"] = null;
      }
    } else {
      addMaterial[parseInt(idx)][field] = value;
    }
    this.setState({ additional_material: addMaterial });
  }

  async saveAdditional() {
    this.toggleLoading();
    this.setState({ modalAdditionalForm: false });
    const addMaterial = this.state.additional_material;
    const dataTSSR = this.state.mra_data;
    const dataUpload = [
      [
        "material_id_actual",
        "material_name_actual",
        "material_type",
        "unit",
        "qty",
        "source_material",
      ],
    ];
    for (let i = 0; i < addMaterial.length; i++) {
      dataUpload.push([
        addMaterial[i].material_id_actual,
        addMaterial[i].material_name_actual,
        addMaterial[i].material_type,
        addMaterial[i].unit,
        parseFloat(addMaterial[i].qty),
        addMaterial[i].source_material,
      ]);
    }
    let patchDataMat = await this.patchDatatoAPINODE(
      "/matreq/inputAdditionalMaterial/" + dataTSSR._id,
      {
        identifier: "PS",
        additionalMaterial: dataUpload,
        takeOutAdditional: false,
      }
    );
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

  AdditionalForm() {
    // this.toggleLoading();
    let additionaMaterial = [];
    const addPP = this.state.mra_data.packages.filter(
      (e) => e.pp_id === "AdditionalMaterial"
    );
    const addMaterial = addPP
      .map((value) => value.materials.map((child) => child))
      .reduce((l, n) => l.concat(n), []);
    for (let i = 0; i < addMaterial.length; i++) {
      let addIdx = {
        material_id_actual: addMaterial[i].material_id,
        material_name_actual: addMaterial[i].material_name,
        material_type: addMaterial[i].material_type,
        unit: addMaterial[i].uom,
        qty: addMaterial[i].qty,
        source_material: addMaterial[i].source_material,
      };
      additionaMaterial.push(addIdx);
    }
    this.setState(
      { additional_material: additionaMaterial, modalAdditionalForm: true },
      () => {
        // this.toggleLoading();
      }
    );
  }

  getPackageDataAPI() {
    this.getDataFromAPINODE(
      '/productpackage?q={"pp_id": "AdditionalMaterial"}'
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ product_package: res.data.data });
      } else {
        this.setState({ product_package: [] });
      }
    });
  }

  changeTabsSubmenu(e) {
    let tab_submenu = new Array(4).fill(false);
    tab_submenu[parseInt(e)] = true;
    this.setState({ tabs_submenu: tab_submenu });
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

  render() {
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
                <span style={{ lineHeight: "2", fontSize: "15px" }}>
                  MRA Detail
                </span>
                {/* }<Dropdown size="sm" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{float : 'right', marginRight : '10px'}}>
                <DropdownToggle caret color="secondary">
                  <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download File
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>TSSR File</DropdownItem>
                  <DropdownItem onClick={this.exportMaterialPSReportBundling}> <i className="fa fa-file-text-o" aria-hidden="true"></i>PlantSpec Report Bundling</DropdownItem>
                  <DropdownItem onClick={this.exportMaterialPSReport}> <i className="fa fa-file-text-o" aria-hidden="true"></i>PlantSpec Report</DropdownItem>
                  <DropdownItem onClick={this.downloadEPODFormat}> <i className="fa fa-file-text-o" aria-hidden="true"></i>EPOD Format</DropdownItem>
                  <DropdownItem onClick={this.downloadMaterialTSSRUpload}> <i className="fa fa-file-text-o" aria-hidden="true"></i>PlantSpec Format</DropdownItem>
                  <DropdownItem onClick={this.downloadMaterialTSSRUploadNOK}> <i className="fa fa-file-text-o" aria-hidden="true"></i>PlantSpec Format NOK</DropdownItem>
                  <DropdownItem onClick={this.downloadMaterialTSSRUploadAdditional}> <i className="fa fa-file-text-o" aria-hidden="true"></i>Additional Material Format</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
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
                        value="2"
                        onClick={this.changeTabsSubmenu.bind(this, 1)}
                      >
                        Progress Overview
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
                        MRA DETAIL
                      </td>
                    </tr>
                    {this.state.mra_data !== null && (
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
                            MRA ID : {this.state.mra_data.mra_id}
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
                            PS Group ID : {this.state.mra_data.no_plantspec}
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
                            Project Name : {this.state.mra_data.project_name}
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
                            Tower ID :{" "}
                            {this.state.mra_data.site_info[0].site_id}
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
                            MR Related : {this.state.mra_data.mr_id}
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
                            Region : {this.state.data_tower.region}
                          </td>
                        </tr>
                      </Fragment>
                    )}
                  </tbody>
                </table>
                <hr
                  style={{
                    borderStyle: "double",
                    borderWidth: "0px 0px 3px 0px",
                    borderColor: "rgba(59,134,134,1)",
                    marginTop: "5px",
                  }}
                ></hr>
                {this.state.tabs_submenu[0] === true && (
                  <Fragment>
                    <hr className="upload-line-ordering"></hr>
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
                              style={{ width: "75px", verticalAlign: "middle" }}
                            >
                              UOM
                            </th>
                            <th
                              className="fixedhead"
                              style={{
                                width: "100px",
                                verticalAlign: "middle",
                              }}
                            >
                              Qty
                            </th>
                            <th
                              className="fixedhead"
                              style={{ width: "75px", verticalAlign: "middle" }}
                            >
                              Program
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.mra_data !== null &&
                            Array.isArray(
                              this.state.mra_data.return_packages
                            ) &&
                            this.state.mra_data.return_packages
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
                                    <td align="center">{pp.qty.toFixed(2)}</td>
                                    <td>{pp.program}</td>
                                  </tr>
                                  {pp.return_materials.map(
                                    (material, arr_mat) => (
                                      <tr
                                        key={arr_mat}
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
                                        <td>{material.qty}</td>
                                        <td></td>
                                      </tr>
                                    )
                                  )}
                                </Fragment>
                              ))}
                        </tbody>
                      </Table>
                    </div>
                  </Fragment>
                )}
                {this.state.tabs_submenu[1] === true && (
                  <Fragment>
                    <CardBody style={{ backgroundColor: "#e3e3e3" }}>
                      <VerticalTimeline>
                        {this.state.mra_data !== null &&
                          this.state.mra_data.mra_status.map((ms, i) => {
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
                  </Fragment>
                )}
              </CardBody>
              <CardFooter>
                {/* }<Button style={{'float' : 'left',marginLeft : 'auto', order : "2"}} color="danger" size="sm" onClick={this.deletePS}>
                <i className="fa fa-trash">&nbsp;&nbsp;</i>
                Complete
              </Button> */}
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

        {/* Modal confirmation Delete */}
        <ModalDelete
          isOpen={this.state.modal_delete_warning}
          toggle={this.toggleWarningDeleteAdditional}
          className={"modal-danger " + this.props.className}
          title={"Delete All Additional Material"}
          body={
            "This action will delete all additional material and its bundle in this PS. Are you sure ?"
          }
        >
          <Button
            color="danger"
            onClick={this.deleteAdditionalMaterialAll}
            value="save"
          >
            Yes
          </Button>
          <Button
            color="secondary"
            onClick={this.toggleWarningDeleteAdditional}
          >
            Cancel
          </Button>
        </ModalDelete>
        {/* Modal confirmation Delete */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(MRADetail);
