import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
} from "reactstrap";
import { Form, FormGroup, Label, FormText } from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {
  getDatafromAPITSEL,
  postDatatoAPINODE,
} from "../../helper/asyncFunction";
import * as XLSX from "xlsx";
import Excel from "exceljs";
import { saveAs } from "file-saver";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL_BAM = "https://api.bam-id.e-dpm.com/bamidapi";
const usernameBAM = "bamidadmin@e-dpm.com";
const passwordBAM = "F760qbAg2sml";

const API_URL_XL = "https://api.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2.bam-id.e-dpm.com/bamidapi';

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

class PSDisCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      redirectSign: false,

      action_status: null,
      action_message: null,

      project_selected: null,
      project_name_selected: null,
      project_all: [],
      form_creation: {},
      site_list: [],
      rowsXLS: [],
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.loadOptionsTowerID = this.loadOptionsTowerID.bind(this);
    this.handleChangeTowerXL = this.handleChangeTowerXL.bind(this);
    this.savePSDis = this.savePSDis.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
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

  // PS DIS

  exportFormatPSDismantle = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(["bundle_id", "bundle_name", "qty", "category"]);
    ws.addRow(["bundle_id", "bundle_name", "qty", "TST"]);
    ws.addRow(["bundle_id", "bundle_name", "qty", "TWH"]);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), "PS SRN Template.xlsx");
  };

  componentDidMount() {
    this.getProjectAll();
    document.title = "PS SRN Creation | BAM";
  }

  getProjectAll() {
    getDatafromAPITSEL("/project_sorted_non_page").then((resp) => {
      if (resp !== undefined) {
        this.setState({ project_all: resp.data._items });
      }
    });
  }

  handleChangeProject(e) {
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({ project_selected: value, project_name_selected: text });
  }

  async loadOptionsTowerID(inputValue) {
    if (!inputValue || inputValue.length < 3) {
      return [];
    } else {
      let site_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getTowerID = await getDatafromAPITSEL(
        '/site_op?where={"site_id":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}'
      );
      if (getTowerID !== undefined && getTowerID.data !== undefined) {
        this.setState({ site_list: getTowerID.data._items });
        getTowerID.data._items.map((tower) =>
          site_id_list.push({
            label: tower.site_id,
            value: tower._id,
            site_id: tower.site_id,
            site_name: tower.site_name,
          })
        );
      }
      return site_id_list;
    }
  }

  handleChangeTowerXL(newValue) {
    this.setState((prevState) => ({
      form_creation: {
        ...prevState.form_creation,
        ["id_site_doc"]: newValue.value,
        ["site_id"]: newValue.site_id,
        ["site_name"]: newValue.site_name,
      },
    }));
    return newValue;
  }

  fileHandlerUpload = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
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
      // this.ArrayEmptytoNull(data);
      this.setState({ action_status: null, action_message: null }, () => {
        this.ArrayEmptytoNull(data);
      });
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

  checkValue(props) {
    //Swap undefined to null
    if (typeof props === "undefined") {
      return null;
    } else {
      return props;
    }
  }

  async savePSDis() {
    const dataPSCreate = {
      siteInfo: {
        id_site_doc: this.state.form_creation.id_site_doc,
        site_id: this.state.form_creation.site_id,
        site_name: this.state.form_creation.site_name,
      },
      projectInfo: {
        id_project_doc: this.state.project_selected,
        project_name: this.state.project_name_selected,
      },
      psData: this.state.rowsXLS,
    };
    const resPost = await postDatatoAPINODE(
      "/plantspec-srn/createPlantSpecSRN",
      dataPSCreate,
      this.state.tokenUser
    );
    if (resPost !== undefined && resPost.data !== undefined) {
      this.setState({ action_status: "success" });
    } else {
      if (
        resPost.response !== undefined &&
        resPost.response.data !== undefined &&
        resPost.response.data.error !== undefined
      ) {
        if (resPost.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: resPost.response.data.error.message,
          });
        } else {
          this.setState({
            action_status: "failed",
            action_message: resPost.response.data.error,
          });
        }
      } else {
        this.setState({ action_status: "failed" });
      }
    }
  }

  render() {
    if (this.state.redirectSign !== false) {
      return <Redirect to={"/mr-detail/" + this.state.redirectSign} />;
    }
    return (
      <div>
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif
              actionMessage={this.state.action_message}
              actionStatus={this.state.action_status}
            />
          </Col>
        </Row>
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                  PS SRN Creation{" "}
                </span>
                <Button
                  onClick={this.exportFormatPSDismantle}
                  color="info"
                  style={{ float: "right", marginRight: "8px" }}
                  size="sm"
                >
                  Download PS Dis Template
                </Button>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Project</Label>
                        <Input
                          type="select"
                          name="project_selected"
                          value={this.state.project_selected}
                          onChange={this.handleChangeProject}
                        >
                          <option value="" disabled selected hidden>
                            Select Project
                          </option>
                          {this.state.project_all.map((pa) => (
                            <option value={pa._id}>{pa.Project}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Site ID</Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsTowerID}
                          defaultOptions
                          onChange={this.handleChangeTowerXL}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Site Name</Label>
                        <Input
                          type="type"
                          name="site_name"
                          readOnly
                          value={this.state.form_creation.site_name}
                          onChange={this.handleChangeProject}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Upload PS File</Label>
                        <Input
                          type="file"
                          onChange={this.fileHandlerUpload.bind(this)}
                          style={{ padding: "10px", visiblity: "hidden" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Table hover bordered responsive size="sm">
                        <tbody>
                          {this.state.rowsXLS.length !== 0
                            ? this.state.rowsXLS.map((row, i) => (
                                <tr>
                                  {row.map((col) => (
                                    <Fragment>
                                      <td>{col}</td>
                                    </Fragment>
                                  ))}
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  color="success"
                  style={{ float: "right" }}
                  size="sm"
                  onClick={this.savePSDis}
                  disabled={this.state.modal_loading === true}
                >
                  <i
                    className="fa fa-plus-square"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  Create PS SRN
                </Button>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(PSDisCreation);
