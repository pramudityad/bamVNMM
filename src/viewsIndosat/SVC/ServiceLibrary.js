import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Collapse,
} from "reactstrap";
import { Col, FormGroup, Label, Row, Table, Input } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Pagination from "react-js-pagination";
import debounce from "lodash.debounce";
import { saveAs } from "file-saver";
import Excel from "exceljs";
import { connect } from "react-redux";
import * as XLSX from "xlsx";

import Loading from "../components/Loading";
import ModalCreateNew from "../components/ModalCreateNew";
import ModalDelete from "../components/ModalDelete";

import {
  getDatafromAPINODE,
  postDatatoAPINODE,
  deleteDataFromAPINODE,
  patchDatatoAPINODE,
} from "../../helper/asyncFunction";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  value,
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={value}
    className="checkmark-dash"
  />
);

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class SVCLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      search: null,
      filter_list: null,
      perPage: 10,
      prevPage: 1,
      activePage: 1,
      total_data_PO: 0,
      pp_all: [],
      rowsXLS: [],
      data_array: [],
      action_status: null,
      action_message: null,
      all_data: [],
      data_PO: [],
      packageSelected: [],
      modal_loading: false,
      dropdownOpen: new Array(6).fill(false),
      modalMatStockForm: false,
      modalEdit: false,
      modalNew: new Array(6).fill(null),
      collapse: false,
      danger: false,
      activeItemName: "",
      activeItemId: null,
      createModal: false,
      selected_id: "",
      selected_name: "",
      sortType: 0,
      sortField: "",
    };
    this.toggleMatStockForm = this.toggleMatStockForm.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeFilterName = debounce(this.changeFilterName, 500);
    this.toggle = this.toggle.bind(this);
    this.toggleAddNew = this.toggleAddNew.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChangeLimit = this.handleChangeLimit.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.downloadAll = this.downloadAll.bind(this);
    this.togglecreateModal = this.togglecreateModal.bind(this);
    this.resettogglecreateModal = this.resettogglecreateModal.bind(this);
    this.requestSort = this.requestSort.bind(this);
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggleAddNew() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleDelete(e) {
    const modalDelete = this.state.danger;
    if (modalDelete === false) {
      const _id = e.currentTarget.value;
      const name = e.currentTarget.name;
      this.setState({
        danger: !this.state.danger,
        selected_id: _id,
        selected_name: name,
      });
    } else {
      this.setState({
        danger: false,
      });
    }
    this.setState((prevState) => ({
      modalDelete: !prevState.modalDelete,
    }));
  }

  resettogglecreateModal() {
    this.setState({
      rowsXLS: [],
    });
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  toggleEdit(e) {
    const modalEdit = this.state.modalEdit;
    if (modalEdit === false) {
      const value = e.currentTarget.value;
      const aEdit = this.state.all_data.find((e) => e._id === value);
      let dataForm = this.state.modalNew;
      dataForm[0] = aEdit.boq_service_scope;
      dataForm[1] = aEdit.service_id;
      dataForm[2] = aEdit.description;
      dataForm[3] = aEdit.pr_uploader_description;
      dataForm[4] = aEdit.unit_price;
      this.setState({ modalNew: dataForm, selected_id: value });
    } else {
      this.setState({ modalNew: new Array(5).fill(null) });
    }
    this.setState((prevState) => ({
      modalEdit: !prevState.modalEdit,
    }));
  }

  toggleMatStockForm() {
    this.setState((prevState) => ({
      modalMatStockForm: !prevState.modalMatStockForm,
    }));
  }

  togglecreateModal() {
    this.setState({
      createModal: !this.state.createModal,
    });
  }

  changeFilterName(value) {
    this.getList();
  }

  handleChangeFilter = (e) => {
    let value = e.target.value;
    if (value.length === 0) {
      value = null;
    }
    this.setState({ filter_list: value }, () => {
      this.changeFilterName(value);
    });
  };

  getList() {
    this.toggleLoading();
    let filter =
      this.state.filter_list === null
        ? '{"$exists" : 1}'
        : '{"$regex" : "' + this.state.filter_list + '", "$options" : "i"}';
    let whereAnd = '{"service_id": ' + filter + "}";
    // console.log("filter whereand ".whereAnd);
    getDatafromAPINODE(
      "/libser/getLibSer?q=" +
        whereAnd +
        "&lmt=" +
        this.state.perPage +
        "&pg=" +
        this.state.activePage,
      this.props.dataLogin.token
    ).then((res) => {
      // console.log("List All", res.data);
      if (res.data !== undefined) {
        this.setState({
          all_data: res.data.data,
          prevPage: this.state.activePage,
          total_dataParent: res.data.totalResults,
        });
        this.toggleLoading();
      } else {
        this.setState({
          all_data: [],
          total_dataParent: 0,
          prevPage: this.state.activePage,
        });
        this.toggleLoading();
      }
    });
  }

  isSameValue(element, value) {
    //function for FindIndex
    return (
      this.checkValuetoString(element).toLowerCase() ===
      this.checkValuetoString(value).toLowerCase()
    );
  }

  getIndex(data, value) {
    //get index of value in Array
    return data.findIndex((e) => this.isSameValue(e, value));
  }

  checkValue(props) {
    // if value undefined return null
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  checkValuetoString(props) {
    // if value undefined return ""
    if (typeof props === "undefined" || props === null) {
      return "";
    } else {
      return props;
    }
  }

  checkValueReturn(value1, value2) {
    // if value undefined or null return Value2
    if (typeof value1 !== "undefined" && value1 !== null) {
      return value1;
    } else {
      return value2;
    }
  }

  fileHandlerMaterial = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    // console.log("rABS");
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, devfal: null });
      /* Update state */
      this.ArrayEmptytoNull(data);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  ArrayEmptytoNull(dataXLS) {
    let newDataXLS = [];
    for (let i = 0; i < dataXLS.length; i++) {
      let col = [];
      for (let j = 0; j < dataXLS[0].length; j++) {
        if (typeof dataXLS[i][j] === "object") {
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if (dataObject !== null) {
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        } else {
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS,
    });
  }

  componentDidMount() {
    this.getList();
    document.title = "Service  Library | BAM";
  }

  handleChangeLimit(e) {
    let limitpg = e.currentTarget.value;
    let sortType = this.state.sortType;
    switch (sortType) {
      case 1:
        this.setState({ perPage: limitpg }, () => {
          this.getListSort();
        });
        break;
      case -1:
        this.setState({ perPage: limitpg }, () => {
          this.getListSort();
        });
        break;
      case 0:
        this.setState({ perPage: limitpg }, () => {
          this.getList();
        });
        break;
      default:
        // nothing
        break;
    }
  }

  handlePageChange(pageNumber) {
    let sortType = this.state.sortType;
    // console.log("page handle sort ", sortType);
    switch (sortType) {
      case 1:
        this.setState({ activePage: pageNumber }, () => {
          this.getListSort();
        });
        break;
      case -1:
        this.setState({ activePage: pageNumber }, () => {
          this.getListSort();
        });
        break;
      case 0:
        this.setState({ activePage: pageNumber }, () => {
          this.getList();
        });
        break;
      default:
        // nothing
        break;
    }
  }

  postBulk = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    const BulkXLSX = this.state.rowsXLS;
    // const BulkData = await this.getFormat(BulkXLSX);
    const res = await postDatatoAPINODE(
      "/libser/createLibSer",
      {
        library_service: BulkXLSX,
      },
      this.props.dataLogin.token
    );
    // console.log('res bulk ', res.error.message);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" }, () => {
        this.toggleLoading();
      });
    }
  };

  saveUpdate = async () => {
    this.toggleLoading();
    this.toggleEdit();
    const dataEdit = this.state.modalNew;
    const _id = this.state.selected_id;
    let pp = {
      boq_service_scope: dataEdit[0],
      service_id: dataEdit[1],
      description: dataEdit[2],
      pr_uploader_description: dataEdit[3],
      unit_price: dataEdit[4],
    };
    const res = await patchDatatoAPINODE(
      "/libser/UpdateLibSer/" + _id,
      {
        data: pp,
      },
      this.props.dataLogin.token
    );
    // console.log('res bulk ', res.error.message);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" }, () => {
        this.toggleLoading();
      });
    }
  };

  saveNew = async () => {
    this.toggleLoading();
    this.toggleMatStockForm();
    const dataEdit = this.state.modalNew;
    let pp = {
      boq_service_scope: dataEdit[0],
      service_id: dataEdit[1],
      description: dataEdit[2],
      pr_uploader_description: dataEdit[3],
      unit_price: dataEdit[4],
    };
    const res = await postDatatoAPINODE(
      "/libser/createOneLibSer/",
      {
        library_service: pp,
      },
      this.props.dataLogin.token
    );
    // console.log('res bulk ', res.error.message);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" }, () => {
        this.toggleLoading();
      });
    }
  };

  async getFormat(dataImport) {
    const dataHeader = dataImport[0];
    const onlyParent = dataImport
      .map((e) => e)
      .filter((e) =>
        this.checkValuetoString(e[this.getIndex(dataHeader, "id")])
      );
    let data_array = [];
    if (onlyParent !== undefined && onlyParent.length !== 0) {
      for (let i = 1; i < onlyParent.length; i++) {
        const aa = {
          _id: this.checkValue(onlyParent[i][this.getIndex(dataHeader, "id")]),
          boq_service_scope: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "Boq Service Scope")]
          ),
          service_id: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "Service ID")]
          ),
          service_product: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "Service Product")]
          ),
          pr_uploader_description: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "PR Uploader Description")]
          ),
          unit_price: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "Unit Price")]
          ),
          description: this.checkValue(
            onlyParent[i][this.getIndex(dataHeader, "Description")]
          ),
        };
        // if (aa._id !== undefined && aa._id !== null) {
        //   aa["_id"] = aa._id.toString();
        // }
        // if (aa.boq_service_scope !== undefined && aa.boq_service_scope !== null) {
        //   aa["boq_service_scope"] = aa.boq_service_scope.toString();
        // }
        // if (aa.service_id !== undefined && aa.service_id !== null) {
        //   aa["service_id"] = aa.service_id.toString();
        // }
        // if (aa.service_product !== undefined && aa.service_product !== null) {
        //   aa["service_product"] = aa.service_product.toString();
        // }
        // if (aa.pr_uploader_description !== undefined && aa.pr_uploader_description !== null) {
        //   aa["pr_uploader_description"] = aa.pr_uploader_description.toString();
        // }
        // if (aa.unit_price !== undefined && aa.unit_price !== null) {
        //   aa["unit_price"] = aa.unit_price();
        // }
        // if (aa.description !== undefined && aa.description !== null) {
        //   aa["description"] = aa.description.toString();
        // }
        data_array.push(aa);
      }
      console.log('data xlsx ',JSON.stringify(data_array));
      return data_array;
    } else {
      this.setState(
        { action_status: "failed", action_message: "Please check your format" },
      );
    }
  }

  updateBulk = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    const BulkXLSX = this.state.rowsXLS;
    const BulkData = await this.getFormat(BulkXLSX);
    const res = await patchDatatoAPINODE(
      "/libser/UpdateLibSer",
      {
        data: BulkData,
      },
      this.props.dataLogin.token
    );
    // console.log('res bulk ', res.error.message);
    if (res.data !== undefined) {
      this.setState({ action_status: "success" });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" }, () => {
        this.toggleLoading();
      });
    }
  };

  handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.modalNew;
    dataForm[parseInt(index)] = value;
    this.setState({ modalNew: dataForm });
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

  async downloadAll() {
    let download_all = [];
    let getAll_nonpage = await getDatafromAPINODE(
      "/libser/getLibSer?noPg=1",
      this.props.dataLogin.token
    );
    if (getAll_nonpage.data !== undefined) {
      download_all = getAll_nonpage.data.data;
    }

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "id",
      "Boq Service Scope",
      "Service ID",
      "Service Product",
      "Description",
      "PR Uploader Description",
      "Unit Price",
    ];
    ws.addRow(headerRow);

    for (let i = 1; i < headerRow.length + 1; i++) {
      ws.getCell(this.numToSSColumn(i) + "1").font = { size: 11, bold: true };
    }

    for (let i = 0; i < download_all.length; i++) {
      let list = download_all[i];
      ws.addRow([
        list._id,
        list.boq_service_scope,
        list.service_id,
        list.service_product,
        list.description,
        list.pr_uploader_description,
        list.unit_price,
      ]);
    }

    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "All Service Library.xlsx");
  }

  DeleteData = async () => {
    const objData = this.state.selected_id;
    this.toggleLoading();
    this.toggleDelete();
    const DelData = deleteDataFromAPINODE(
      "/libser/deleteLibSer/" + objData,
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.getList();
        this.toggleLoading();
      } else {
        this.setState({ action_status: "failed" }, () => {
          this.toggleLoading();
        });
      }
    });
  };

  exportMatStatus = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow([
      "boq_service_scope",
      "service_id",
      "description",
      "pr_uploader_description",
      "unit_price",
    ]);
    ws.addRow([
      "Swap Radio B3 to 4499B3, 4T4R Activation [U2100 L2100] Swap Radio B1 to 4499B1, 4T4R Activation; Dismantle Swap Material and Send to WH for Redeployment",
      "BTSS7",
      "Hybrid Trunk Cables Installation Greenfield 2 Sectors Site",
      "BTSS7-Hybrid Trunk Cables Installation Greenfield 2 Sectors Site",
      100,
    ]);
    ws.addRow([
      "Swap Radio B3 to 4499B3, 4T4R Activation [U2100 L2100] Swap Radio B1 to 4499B1, 4T4R Activation; Dismantle Swap Material and Send to WH for Redeployment",
      "BTSS8",
      "Hybrid Trunk Cables Installation Greenfield 3 Sectors Site",
      "BTSS8-Hybrid Trunk Cables Installation Greenfield 3 Sectors Site",
      100,
    ]);

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), "Service Library Template.xlsx");
  };

  getListSort() {
    this.toggleLoading();
    getDatafromAPINODE(
      "/libser/getLibSer?srt=" +
        this.state.sortField +
        ":" +
        this.state.sortType +
        "&lmt=" +
        this.state.perPage +
        "&pg=" +
        this.state.activePage,
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({
          all_data: res.data.data,
          prevPage: this.state.activePage,
          total_dataParent: res.data.totalResults,
          // sortType: -1
        });
        this.toggleLoading();
      } else {
        this.setState({
          all_data: [],
          total_dataParent: 0,
          prevPage: this.state.activePage,
        });
        this.toggleLoading();
      }
    });
  }

  requestSort(e) {
    let sortType = this.state.sortType;
    if (sortType === 0) {
      sortType = 1;
    }
    let sort = e;
    const ascending = 1;
    const descending = -1;
    if (sortType === -1) {
      this.setState({ sortType: ascending, sortField: sort }, () => {
        this.getListSort();
      });
    } else {
      this.setState({ sortType: descending, sortField: sort }, () => {
        this.getListSort();
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xl="12">
            <Card style={{}}>
              <CardHeader>
                <span style={{ marginTop: "8px", position: "absolute" }}>
                  {" "}
                  Service Library{" "}
                </span>
                <div
                  className="card-header-actions"
                  style={{ display: "inline-flex" }}
                >
                  <div>
                    {this.state.userRole.includes("Flow-PublicInternal") !==
                    true ? (
                      <div>
                        <Dropdown
                          isOpen={this.state.dropdownOpen[0]}
                          toggle={() => {
                            this.toggle(0);
                          }}
                        >
                          <DropdownToggle block color="success">
                            <i className="fa fa-plus-square" aria-hidden="true">
                              {" "}
                              &nbsp;{" "}
                            </i>{" "}
                            Create New
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={this.toggleMatStockForm}>
                              > Form{" "}
                            </DropdownItem>
                            <DropdownItem onClick={this.togglecreateModal}>
                              > Bulk{" "}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        {/* <Button
                          block
                          color="success"
                          onClick={this.togglecreateModal}
                          // id="toggleCollapse1"
                        >
                          <i className="fa fa-plus-square" aria-hidden="true">
                            {" "}
                            &nbsp;{" "}
                          </i>{" "}
                          New
                        </Button> */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div>
                    <Dropdown
                      isOpen={this.state.dropdownOpen[1]}
                      toggle={() => {
                        this.toggle(1);
                      }}
                    >
                      <DropdownToggle block color="ghost-warning">
                        <i className="fa fa-download" aria-hidden="true">
                          {" "}
                          &nbsp;{" "}
                        </i>{" "}
                        Export
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Uploader Template</DropdownItem>
                        <DropdownItem onClick={this.exportMatStatus}>
                          {" "}
                          Service Library Template
                        </DropdownItem>
                        <DropdownItem onClick={this.downloadAll}>
                          > Download All{" "}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                {/* <div>
                  <Button color="primary" style={{ float: 'right' }} onClick={this.toggleMatStockForm}>
                    <i className="fa fa-file-text-o" aria-hidden="true"> </i> &nbsp;Form
                  </Button>
                </div> */}
              </CardHeader>

              <CardBody>
                <Row>
                  <Col>
                    <div style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          float: "left",
                          margin: "5px",
                          display: "inline-flex",
                        }}
                      >
                        <Input
                          type="select"
                          name="select"
                          id="selectLimit"
                          onChange={this.handleChangeLimit}
                        >
                          <option value={"10"}>10</option>
                          <option value={"25"}>25</option>
                          <option value={"50"}>50</option>
                          <option value={"100"}>100</option>
                          <option value={"noPg=1"}>All</option>
                        </Input>
                      </div>
                      <div
                        style={{
                          float: "right",
                          margin: "5px",
                          display: "inline-flex",
                        }}
                      >
                        <input
                          className="search-box-material"
                          type="text"
                          name="filter"
                          placeholder="Search Service "
                          onChange={this.handleChangeFilter}
                          value={this.state.filter_list}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="divtable">
                      <Table responsive bordered>
                        <thead
                          style={{ backgroundColor: "#73818f" }}
                          className="fixed-matlib"
                        >
                          <tr align="center">
                            <th>
                              <Button
                                color="ghost-dark"
                                onClick={() => this.requestSort("origin")}
                              >
                                <b>BoQ Service Scope</b>
                              </Button>
                            </th>
                            <th>
                              <Button
                                color="ghost-dark"
                                onClick={() => this.requestSort("material_id")}
                              >
                                <b>ID</b>
                              </Button>
                            </th>
                            <th>
                              <Button
                                color="ghost-dark"
                                onClick={() =>
                                  this.requestSort("material_name")
                                }
                              >
                                <b>Description</b>
                              </Button>
                            </th>
                            <th>PR Uploader Service Description</th>
                            <th>Unit Price</th>
                            {/* <th></th> */}
                            <th colSpan="2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.all_data.map((e) => (
                            <React.Fragment key={e._id + "frag"}>
                              <tr
                                style={{ backgroundColor: "#d3d9e7" }}
                                className="fixbody"
                                key={e._id}
                              >
                                {/* <td align="center"><Checkbox name={e._id} checked={this.state.packageChecked.get(e._id)} onChange={this.handleChangeChecklist} value={e} /></td> */}
                                {/* <td style={{ textAlign: "center" }}> */}
                                <td>{e.boq_service_scope}</td>
                                <td style={{ textAlign: "center" }}>
                                  {e.service_id}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.description}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.pr_uploader_description}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.unit_price}
                                </td>

                                <td>
                                  <Button
                                    size="sm"
                                    color="secondary"
                                    value={e._id}
                                    onClick={this.toggleEdit}
                                    title="Edit"
                                  >
                                    <i
                                      className="fas fa-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    size="sm"
                                    color="danger"
                                    value={e._id}
                                    name={e.service_id}
                                    onClick={this.toggleDelete}
                                    title="Delete"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.state.total_dataParent}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal New PO */}
        <Modal
          isOpen={this.state.modalMatStockForm}
          toggle={this.toggleMatStockForm}
          className="modal--form-e"
        >
          <ModalHeader>Form Service Library</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="boq_service_scope">BOQ Service Scope</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.modalNew[0]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="service_id">ID</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder=""
                    value={this.state.modalNew[1]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    name="2"
                    placeholder=""
                    value={this.state.modalNew[2]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pr_uploader_description">PR Uploader Description</Label>
                  <Input
                    type="text"
                    name="3"
                    placeholder=""
                    value={this.state.modalNew[3]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="unit_price">Unit Price</Label>
                  <Input
                    type="text"
                    name="4"
                    placeholder=""
                    value={this.state.modalNew[4]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>                
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveNew}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
        {/*  Modal New PO*/}

        {/* Modal Edit PP */}
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          className="modal--form"
        >
          <ModalHeader>Form Update Service Library</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
              <FormGroup>
                  <Label htmlFor="boq_service_scope">BOQ Service Scope</Label>
                  <Input
                    type="text"
                    name="0"
                    placeholder=""
                    value={this.state.modalNew[0]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="service_id">ID</Label>
                  <Input
                    type="text"
                    name="1"
                    placeholder=""
                    value={this.state.modalNew[1]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    placeholder=""
                    name="2"
                    value={this.state.modalNew[2]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="pr_uploader_description">PR Uploader Description</Label>
                  <Input
                    type="text"
                    name="3"
                    placeholder=""
                    value={this.state.modalNew[3]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="unit_price">Unit Price</Label>
                  <Input
                    type="text"
                    name="4"
                    placeholder=""
                    value={this.state.modalNew[4]}
                    onChange={this.handleChangeForm}
                  />
                </FormGroup>  
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveUpdate}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
        {/*  Modal Edit PP*/}

        {/* Modal confirmation delete */}
        <ModalDelete
          isOpen={this.state.danger}
          toggle={this.toggleDelete}
          className={"modal-danger " + this.props.className}
          title={"Delete Service ID " + this.state.selected_name}
          body={"Are you sure ?"}
        >
          <Button color="danger" onClick={this.DeleteData}>
            Delete
          </Button>
          <Button color="secondary" onClick={this.toggleDelete}>
            Cancel
          </Button>
        </ModalDelete>

        {/* Modal create New */}
        <ModalCreateNew
          isOpen={this.state.createModal}
          toggle={this.togglecreateModal}
          className={this.props.className}
          onClosed={this.resettogglecreateModal}
          title="Create Service "
        >
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Upload File</td>
                  <td>:</td>
                  <td>
                    <input
                      type="file"
                      onChange={this.fileHandlerMaterial.bind(this)}
                      style={{ padding: "10px", visiblity: "hidden" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ModalFooter>
            {/* <Button
              block
              color="link"
              className="btn-pill"
              onClick={this.exportMatStatus}
              size="sm"
            >
              Download Template
            </Button>{" "} */}
            <Button
              block
              color="success"
              className="btn-pill"
              disabled={this.state.rowsXLS.length === 0}
              onClick={this.postBulk}
            >
              Save
            </Button>{" "}
            <Button
              block
              color="warning"
              className="btn-pill"
              disabled={this.state.rowsXLS.length === 0}
              onClick={this.updateBulk}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalCreateNew>

        {/* Modal Loading */}
        <Loading
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}
        ></Loading>
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

export default connect(mapStateToProps)(SVCLibrary);
