import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
} from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import { Redirect } from "react-router-dom";
import debounce from "debounce-promise";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const API_URL = "https://api-dev.bam-id.e-dpm.com/bamidapi";
const username = "bamidadmin@e-dpm.com";
const password = "F760qbAg2sml";

const API_URL_TSEL = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

//const process.env.REACT_APP_API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class DSADCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      list_mr_selection: [],
      list_mr_selected: {},
      create_dsa_form: new Array(200).fill(null),
      network_number: null,
      list_dsa_selection: [],
      list_po_selection: [],
      list_dsa_selected: new Array(10).fill(null),
      action_status: null,
      action_message: null,
      destination: "",
      section_1_form: [{}],
      section_2_form: [],
      section_3_form: [],
      po_selected: {},
      modal_loading: false,
      dsa_creation_status: null,
    };

    this.loadOptionsMR = this.loadOptionsMR.bind(this);
    this.loadOptionsDSA = this.loadOptionsDSA.bind(this);
    this.loadOptionsPO = this.loadOptionsPO.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.submitDSA = this.submitDSA.bind(this);
    this.handleChangeFormSection1 = this.handleChangeFormSection1.bind(this);
    this.handleChangeFormSection2 = this.handleChangeFormSection2.bind(this);
    this.handleChangeFormSection3 = this.handleChangeFormSection3.bind(this);
    this.addListSection1 = this.addListSection1.bind(this);
    this.addListSection2 = this.addListSection2.bind(this);
    this.addListSection3 = this.addListSection3.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
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

  async getDataFromAPITSEL(url) {
    try {
      let respond = await axios.get(API_URL_TSEL + url, {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: usernameXL,
          password: passwordXL,
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
        console.log("respond data node", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond data node", err);
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

  async loadOptionsMR(inputValue) {
    if (!inputValue) {
      this.setState({ list_mr_selection: [] });
      return [];
    } else {
      let mr_list = [];
      const getMR = await this.getDataFromAPINODE(
        '/matreq-srn?srt=_id:-1&q={"mra_id":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}&v={"mra_id":1, "dsa_number":1}'
      );
      if (getMR !== undefined && getMR.data !== undefined) {
        this.setState({ list_mr_selection: getMR.data.data }, () =>
          getMR.data.data.map((mr) =>
            mr_list.push({
              label: mr.mra_id !== undefined ? mr.mra_id : null,
              value: mr._id,
              dsa_number: mr.dsa_number,
            })
          )
        );
      }
      return mr_list;
    }
  }

  handleChangeMR = async (newValue) => {
    this.toggleLoading();
    const getMatreqDSA = await this.getDataFromAPINODE(
      "/matreq-srn-dsa/" + newValue.value
    );
    let dataMR = getMatreqDSA.data;
    this.setState({ list_mr_selected: dataMR });
    if (dataMR.mr_type === "Return" || dataMR.mr_type === "Relocation") {
      this.setState({ destination: dataMR.destination.value });
    } else {
      this.setState({ destination: dataMR.site_info[0].site_id });
    }
    this.setState({ dsa_creation_status: newValue.dsa_number });
    const getNN = await this.getDataFromAPITSEL(
      '/custdel_sorted_non_page?where={"WP_ID":"' +
        dataMR.cust_del[0].cd_id +
        '"}'
    );
    if (
      getNN !== undefined &&
      getNN.data !== undefined &&
      getNN.data._items.length !== 0
    ) {
      this.setState({
        network_number: getNN.data._items[0].CD_Info_Network_Number,
      });
    }
    let dataForm = this.state.create_dsa_form;
    dataForm[0] = dataMR.mra_id;
    dataForm[1] = dataMR.project_name;
    dataForm[2] = dataMR.dsp_company;
    dataForm[3] = dataMR.job_order_number;
    dataForm[4] = dataMR.po_for_dsp;
    dataForm[5] = this.state.network_number;
    dataForm[6] = dataMR.po_item_number;
    if (
      dataMR.primary_section !== undefined &&
      dataMR.primary_section.length !== 0
    ) {
      this.setState({ section_1_form: dataMR.primary_section });
    }
    // dataForm[7] = balanced value;
    // dataForm[8] = % utilization;
    // dataForm[9] = status;
    dataForm[14] = dataMR.origin.value;
    this.setState({ create_dsa_form: dataForm }, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
    this.toggleLoading();
  };

  async loadOptionsDSA(inputValue) {
    if (!inputValue) {
      this.setState({ list_dsa_selection: [] });
      return [];
    } else {
      let dsa_list = [];
      const getDSA = await this.getDataFromAPITSEL(
        '/dsa_price_sorted?where={"dsa_price_id":{"$regex":"' +
          inputValue +
          '", "$options":"i"}, "vendor_code_actual" : "' +
          this.state.list_mr_selected.dsp_company_code +
          '"}'
      );
      if (getDSA !== undefined && getDSA.data !== undefined) {
        this.setState({ list_dsa_selection: getDSA.data._items }, () =>
          getDSA.data._items.map((dsa) =>
            dsa_list.push({
              label: dsa.dsa_price_id !== undefined ? dsa.dsa_price_id : null,
              value: dsa._id,
            })
          )
        );
      }
      return dsa_list;
    }
  }

  async loadOptionsPO(inputValue) {
    if (!inputValue) {
      this.setState({ list_po_selection: [] });
      return [];
    } else {
      let po_list = [];
      const getPO = await this.getDataFromAPINODE(
        '/poDsa?where={"po_dsa_no":{"$regex":"' +
          inputValue +
          '", "$options":"i"}, "status": "Online"}'
      );
      if (getPO !== undefined && getPO.data !== undefined) {
        this.setState({ list_po_selection: getPO.data.data }, () =>
          getPO.data.data.map((dsa) =>
            po_list.push({
              label: dsa.no_po_dsa !== undefined ? dsa.no_po_dsa : null,
              value: dsa._id,
            })
          )
        );
      }
      return po_list;
    }
  }

  handleChangeDSA = async (newValue, e) => {
    let dataDSA = this.state.list_dsa_selection.find(
      (e) => e._id === newValue.value
    );
    let dataForm = this.state.create_dsa_form;
    dataForm[parseInt(e.name)] = dataDSA.dsa_price_id;
    dataForm[parseInt(e.name) + 1] = dataDSA.price;
    dataForm[parseInt(e.name) + 2] = 0;
    dataForm[parseInt(e.name) + 4] = dataDSA.short_text;
    dataForm[parseInt(e.name) + 5] = dataDSA.long_text;
    this.setState({ create_dsa_form: dataForm });
  };

  handleChangePO = async (newValue, e) => {
    let dataPO = this.state.list_po_selection.find(
      (e) => e._id === newValue.value
    );
    let dataForm = this.state.po_selected;
    dataForm["id_po_dsa_doc"] = dataPO._id;
    dataForm["no_po_dsa"] = dataPO.no_po_dsa;
    dataForm["po_for_dsp"] = dataPO.no_po_dsa_system;
    this.setState({ po_selected: dataForm });
  };

  async handleChangeForm(e) {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.create_dsa_form;
    dataForm[parseInt(index)] = value;
    for (let i = 18; i < 55; i = i + 6) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.create_dsa_form[i - 1];
      }
    }
    for (let i = 67; i < 146; i = i + 7) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.create_dsa_form[i - 1];
      }
    }
    for (let i = 185; i < 193; i = i + 7) {
      if (dataForm[i - 1] !== null && dataForm[i] !== null) {
        dataForm[i + 1] = dataForm[i] * this.state.create_dsa_form[i - 1];
      }
    }

    // to get the total value
    let totalValue = 0;
    for (let i = 19; i < 56; i = i + 6) {
      totalValue = totalValue + dataForm[i];
    }
    for (let i = 68; i < 146; i = i + 7) {
      totalValue = totalValue + dataForm[i];
    }
    for (let i = 164; i < 177; i = i + 3) {
      if (dataForm[i] !== null) {
        totalValue = totalValue + parseFloat(dataForm[i]);
      }
    }
    if (
      dataForm[197] !== undefined &&
      dataForm[197] !== null &&
      dataForm[197].length !== 0 &&
      !isNaN(dataForm[197])
    ) {
      totalValue = dataForm[197];
    }
    this.countTotalValue();
    totalValue = totalValue + dataForm[186] + dataForm[193];
    dataForm[197] = parseFloat(totalValue);

    this.setState({ create_dsa_form: dataForm }, () => {
      console.log("DSA Form", this.state.create_dsa_form);
    });
  }

  async handleChangeFormSection1(e) {
    let dataSec = this.state.section_1_form;
    let dataForm = this.state.create_dsa_form;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSec[parseInt(idx)][field] = value;
    if (field === "qty") {
      const total_price = parseFloat(value) * parseFloat(dataSec[idx]["price"]);
      dataSec[parseInt(idx)]["total_price"] = total_price;
      this.countTotalValue();
    }
    this.setState({ section_1_form: dataSec, create_dsa_form: dataForm });
  }

  handleChangeDSASection1 = async (newValue, e) => {
    let dataSec = this.state.section_1_form;
    let idxField = e.name.split(" /// ");
    let idx = idxField[0];
    let field = idxField[1];
    if (field === "service_master") {
      let dataDSA = this.state.list_dsa_selection.find(
        (e) => e._id === newValue.value
      );
      dataSec[parseInt(idx)]["service_master"] = dataDSA.dsa_price_id;
      dataSec[parseInt(idx)]["price"] = dataDSA.price;
      dataSec[parseInt(idx)]["qty"] = 0;
      dataSec[parseInt(idx)]["total_price"] = 0;
      dataSec[parseInt(idx)]["short_text"] = dataDSA.short_text;
      dataSec[parseInt(idx)]["long_text"] = dataDSA.long_text;
    }
    this.setState({ section_1_form: dataSec });
  };

  addListSection1() {
    let dataSec = this.state.section_1_form;
    dataSec.push({});
    this.setState({ section_1_form: dataSec });
  }

  loopSection1 = (form_list) => {
    console.log("section_1_form", form_list);
    let section_1 = [];
    section_1.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Details</Label>
            <Input
              type="select"
              name={"0 /// sub_category"}
              onChange={this.handleChangeFormSection1}
              value={form_list[0].sub_category}
            >
              <option value="" disabled selected hidden>
                Select MOT
              </option>
              <option value="MOT-Land">MOT-Land</option>
              <option value="MOT-Air">MOT-Air</option>
              <option value="MOT-Sea">MOT-Sea</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Service Master</Label>
            <AsyncSelect
              loadOptions={this.loadOptionsDSA}
              defaultOptions
              onChange={this.handleChangeDSASection1}
              name={"0 /// service_master"}
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Price</Label>
            <Input
              type="text"
              name={"0 /// price"}
              value={
                form_list[0].price !== undefined
                  ? form_list[0].price.toLocaleString()
                  : 0
              }
              readOnly
            />
          </FormGroup>
        </Col>
        <Col md="1" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Quantity</Label>
            <Input
              type="number"
              name={"0 /// qty"}
              value={form_list[0].qty}
              onChange={this.handleChangeFormSection1}
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Total Price</Label>
            <Input
              type="text"
              name={"0 /// total_price"}
              readOnly
              value={
                form_list[0].total_price !== undefined
                  ? form_list[0].total_price.toLocaleString()
                  : null
              }
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Short Text</Label>
            <Input
              type="text"
              name={"0 /// short_text"}
              value={form_list[0].short_text}
              readOnly
            />
          </FormGroup>
        </Col>
        <Col md="2" style={{ margin: "0", padding: "4px" }}>
          <FormGroup>
            <Label>Long Text</Label>
            <Input
              type="textarea"
              name={"0 /// long_text"}
              rows="1"
              value={form_list[0].long_text}
              readOnly
            />
          </FormGroup>
        </Col>
      </Row>
    );
    for (let i = 1; i < form_list.length; i++) {
      section_1.push(
        <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Details</Label>
              <Input
                type="select"
                name={i + " /// sub_category"}
                onChange={this.handleChangeFormSection1}
                value={form_list[i].sub_category}
              >
                <option disabled selected hidden>
                  Select
                </option>
                <option value="Additional Delivery">Additional Delivery</option>
                <option value="MOT-Air">MOT-Air</option>
                <option value="Crane">Crane</option>
                <option value="Custom">Custom</option>
                <option value="Custom Clearance">Custom Clearance</option>
                <option value="Delivery Service">Delivery Service</option>
                <option value="Flat Community">Flat Community</option>
                <option value="Flat Community Cost">Flat Community Cost</option>
                <option value="Forklift">Forklift</option>
                <option value="MOT-Land">MOT-Land</option>
                <option value="Manual Handling">Manual Handling</option>
                <option value="On Forwarding">On Forwarding</option>
                <option value="On Forwarding (Langsir)">
                  On Forwarding (Langsir)
                </option>
                <option value="Other Service">Other Service</option>
                <option value="Others">Others</option>
                <option value="Packing">Packing</option>
                <option value="Port to WH">Port to WH</option>
                <option value="MOT-Sea">MOT-Sea</option>
                <option value="Service">Service</option>
                <option value="Service (Seaport to WH)">
                  Service (Seaport to WH)
                </option>
                <option value="Service (WH to WH)">Service (WH to WH)</option>
                <option value="Standby On Site">Standby On Site</option>
                <option value="Temporary Storage">Temporary Storage</option>
                <option value="WH to WH">WH to WH</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Service Master</Label>
              <AsyncSelect
                loadOptions={this.loadOptionsDSA}
                defaultOptions
                onChange={this.handleChangeDSASection1}
                name={i + " /// service_master"}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="text"
                name={i + " /// price"}
                value={
                  form_list[i].price !== undefined
                    ? form_list[i].price.toLocaleString()
                    : null
                }
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Quantity</Label>
              <Input
                type="number"
                name={i + " /// qty"}
                value={form_list[i].qty}
                onChange={this.handleChangeFormSection1}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Total Price</Label>
              <Input
                type="text"
                name={i + " /// total_price"}
                readOnly
                value={
                  form_list[i].total_price !== undefined
                    ? form_list[i].total_price.toLocaleString()
                    : null
                }
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Short Text</Label>
              <Input
                type="text"
                name={i + " /// short_text"}
                value={form_list[i].short_text}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Long Text</Label>
              <Input
                type="textarea"
                name={i + " /// long_text"}
                rows="1"
                value={form_list[i].long_text}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>
      );
    }
    section_1.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col>
          <Button
            onClick={this.addListSection1}
            size="sm"
            color="success"
            style={{ margin: "-10px 0px 10px 0px" }}
          >
            Add List
          </Button>
        </Col>
      </Row>
    );
    return section_1;
  };

  async handleChangeFormSection2(e) {
    let dataSec = this.state.section_2_form;
    let dataForm = this.state.create_dsa_form;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSec[parseInt(idx)][field] = value;
    if (field === "qty") {
      const total_price = parseFloat(value) * parseFloat(dataSec[idx]["price"]);
      dataSec[parseInt(idx)]["total_price"] = total_price;
      this.countTotalValue();
    }
    this.setState({ section_2_form: dataSec, create_dsa_form: dataForm });
  }

  handleChangeDSASection2 = async (newValue, e) => {
    let dataSec = this.state.section_2_form;
    let idxField = e.name.split(" /// ");
    let idx = idxField[0];
    let field = idxField[1];
    if (field === "service_master") {
      let dataDSA = this.state.list_dsa_selection.find(
        (e) => e._id === newValue.value
      );
      dataSec[parseInt(idx)]["service_master"] = dataDSA.dsa_price_id;
      dataSec[parseInt(idx)]["price"] = dataDSA.price;
      dataSec[parseInt(idx)]["qty"] = 0;
      dataSec[parseInt(idx)]["total_price"] = 0;
      dataSec[parseInt(idx)]["short_text"] = dataDSA.short_text;
      dataSec[parseInt(idx)]["long_text"] = dataDSA.long_text;
    }
    this.setState({ section_2_form: dataSec });
  };

  addListSection2() {
    let dataSec = this.state.section_2_form;
    dataSec.push({});
    this.setState({ section_2_form: dataSec });
  }

  loopSection2 = (form_list) => {
    let section_2 = [];
    for (let i = 0; i < form_list.length; i++) {
      section_2.push(
        <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Additional Details</Label>
              <Input
                type="select"
                name={i + " /// sub_category"}
                onChange={this.handleChangeFormSection2}
                value={form_list[i].sub_category}
              >
                <option disabled selected hidden>
                  Select
                </option>
                <option value="Additional Delivery">Additional Delivery</option>
                <option value="MOT-Air">MOT-Air</option>
                <option value="Crane">Crane</option>
                <option value="Custom">Custom</option>
                <option value="Custom Clearance">Custom Clearance</option>
                <option value="Delivery Service">Delivery Service</option>
                <option value="Flat Community">Flat Community</option>
                <option value="Flat Community Cost">Flat Community Cost</option>
                <option value="Forklift">Forklift</option>
                <option value="MOT-Land">MOT-Land</option>
                <option value="Manual Handling">Manual Handling</option>
                <option value="On Forwarding">On Forwarding</option>
                <option value="On Forwarding (Langsir)">
                  On Forwarding (Langsir)
                </option>
                <option value="Other Service">Other Service</option>
                <option value="Others">Others</option>
                <option value="Packing">Packing</option>
                <option value="Port to WH">Port to WH</option>
                <option value="MOT-Sea">MOT-Sea</option>
                <option value="Service">Service</option>
                <option value="Service (Seaport to WH)">
                  Service (Seaport to WH)
                </option>
                <option value="Service (WH to WH)">Service (WH to WH)</option>
                <option value="Standby On Site">Standby On Site</option>
                <option value="Temporary Storage">Temporary Storage</option>
                <option value="WH to WH">WH to WH</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Service Master</Label>
              <AsyncSelect
                loadOptions={this.loadOptionsDSA}
                defaultOptions
                onChange={this.handleChangeDSASection2}
                name={i + " /// service_master"}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="text"
                name={i + " /// price"}
                value={
                  form_list[i].price !== undefined
                    ? form_list[i].price.toLocaleString()
                    : null
                }
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Quantity</Label>
              <Input
                type="number"
                name={i + " /// qty"}
                value={form_list[i].qty}
                onChange={this.handleChangeFormSection2}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Total Price</Label>
              <Input
                type="text"
                name={i + " /// total_price"}
                readOnly
                value={
                  form_list[i].total_price !== undefined
                    ? form_list[i].total_price.toLocaleString()
                    : null
                }
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Short Text</Label>
              <Input
                type="text"
                name={i + " /// short_text"}
                value={form_list[i].short_text}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              <Label>Long Text</Label>
              <Input
                type="textarea"
                name={i + " /// long_text"}
                rows="1"
                value={form_list[i].long_text}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>
      );
    }
    section_2.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col>
          <Button
            onClick={this.addListSection2}
            size="sm"
            color="success"
            style={{ margin: "-10px 0px 10px 0px" }}
          >
            Add List
          </Button>
        </Col>
      </Row>
    );
    return section_2;
  };

  async handleChangeFormSection3(e) {
    let dataSec = this.state.section_3_form;
    let dataForm = this.state.create_dsa_form;
    let idxField = e.target.name.split(" /// ");
    let value = e.target.value;
    let idx = idxField[0];
    let field = idxField[1];
    dataSec[parseInt(idx)][field] = value;
    if (field === "price") {
      this.countTotalValue();
    }
    this.setState({ section_3_form: dataSec, create_dsa_form: dataForm });
  }

  addListSection3() {
    let dataSec = this.state.section_3_form;
    dataSec.push({});
    this.setState({ section_3_form: dataSec });
  }

  countTotalValue() {
    let dataSection1 = this.state.section_1_form;
    let dataSection2 = this.state.section_2_form;
    let dataSection3 = this.state.section_3_form;
    let dataForm = this.state.create_dsa_form;
    let totalValue = 0;
    // if(dataForm[197] !== undefined && dataForm[197] !== null && dataForm[197].length !== 0 && !isNaN(dataForm[197])){
    //   totalValue = parseFloat(dataForm[197]);
    // }
    let totalSec1 = dataSection1
      .filter(
        (ds) =>
          ds.total_price !== undefined &&
          ds.total_price !== null &&
          ds.total_price.length !== 0 &&
          !isNaN(ds.total_price)
      )
      .reduce((a, b) => a + parseFloat(b.total_price), 0);
    let totalSec2 = dataSection2
      .filter(
        (ds) =>
          ds.total_price !== undefined &&
          ds.total_price !== null &&
          ds.total_price.length !== 0 &&
          !isNaN(ds.total_price)
      )
      .reduce((a, b) => a + parseFloat(b.total_price), 0);
    let totalSec3 = dataSection3
      .filter(
        (ds) =>
          ds.price !== undefined &&
          ds.price !== null &&
          ds.price.length !== 0 &&
          !isNaN(ds.price)
      )
      .reduce((a, b) => a + parseFloat(b.price), 0);
    totalValue = totalSec1 + totalSec2 + totalSec3;
    dataForm[197] = parseFloat(totalValue);
    this.setState({ create_dsa_form: totalValue });
  }

  loopSection3 = (form_list) => {
    let section_3 = [];
    const label0 = <Label>&nbsp;</Label>;
    const label1 = <Label>Type of Cost</Label>;
    const label2 = <Label>Description</Label>;
    const label3 = <Label>Price</Label>;
    for (let i = 0; i < form_list.length; i++) {
      section_3.push(
        <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <Col md="1" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label0}
              <div>Additional {i + 1}</div>
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label1}
              <Input
                type="text"
                name={i + " /// type_of_cost"}
                onChange={this.handleChangeFormSection3}
                value={form_list[i].type_of_cost}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label2}
              <Input
                type="textarea"
                name={i + " /// description"}
                rows="1"
                onChange={this.handleChangeFormSection3}
                value={form_list[i].description}
              />
            </FormGroup>
          </Col>
          <Col md="2" style={{ margin: "0", padding: "4px" }}>
            <FormGroup>
              {label3}
              <Input
                type="number"
                name={i + " /// price"}
                onChange={this.handleChangeFormSection3}
                value={form_list[i].price}
              />
            </FormGroup>
          </Col>
        </Row>
      );
    }
    section_3.push(
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col>
          <Button
            onClick={this.addListSection3}
            size="sm"
            color="success"
            style={{ margin: "-10px 0px 10px 0px" }}
          >
            Add List
          </Button>
        </Col>
      </Row>
    );
    return section_3;
  };

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

  async submitDSA(e) {
    const dataForm = this.state.create_dsa_form;
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
    let successUpdate = [];
    const dataSection1 = this.state.section_1_form;
    const dataSection2 = this.state.section_2_form;
    const dataSection3 = this.state.section_3_form;
    let section_1 = [];
    if (dataSection1[0].sub_category !== undefined) {
      section_1.push({
        category: "MOT",
        sub_category: dataSection1[0].sub_category,
        service_master: dataSection1[0].service_master,
        price: isNaN(dataSection1[0].price) ? 0 : dataSection1[0].price,
        qty: isNaN(dataSection1[0].qty) ? 0 : dataSection1[0].qty,
        total_price: isNaN(dataSection1[0].total_price)
          ? 0
          : dataSection1[0].total_price,
        short_text: dataSection1[0].short_text,
        long_text: dataSection1[0].long_text,
      });
    } else {
      section_1.push({
        category: "MOT",
        sub_category: null,
        service_master: null,
        price: 0,
        qty: 0,
        total_price: 0,
        short_text: null,
        long_text: null,
      });
    }
    for (let i = 1; i < dataSection1.length; i++) {
      let data_section_1 = {
        category: dataSection1[i].sub_category,
        sub_category: dataSection1[i].sub_category,
        service_master: dataSection1[i].service_master,
        price: isNaN(dataSection1[i].price) ? 0 : dataSection1[i].price,
        qty: isNaN(dataSection1[i].qty) ? 0 : dataSection1[i].qty,
        total_price: isNaN(dataSection1[i].total_price)
          ? 0
          : dataSection1[i].total_price,
        short_text: dataSection1[i].short_text,
        long_text: dataSection1[i].long_text,
      };
      if (
        dataSection1[i].sub_category !== undefined &&
        dataSection1[i].sub_category !== null &&
        dataSection1[i].sub_category.length !== 0 &&
        dataSection1[i].service_master !== undefined &&
        dataSection1[i].service_master !== null
      ) {
        section_1.push(data_section_1);
      }
    }
    let data_section_1b = {
      category: "Flat Community",
      sub_category: null,
      service_master: dataForm[52],
      price: isNaN(dataForm[53]) ? 0 : dataForm[53],
      qty: isNaN(dataForm[54]) ? 0 : dataForm[54],
      total_price: isNaN(dataForm[55]) ? 0 : dataForm[55],
      short_text: dataForm[56],
      long_text: dataForm[57],
    };
    if (dataForm[52] !== null && dataForm[52].length !== 0) {
      section_1.push(data_section_1b);
    }

    let section_2 = [];
    for (let i = 0; i < dataSection2.length; i++) {
      let data_section_2 = {
        category: dataSection2[i].sub_category,
        sub_category: null,
        service_master: dataSection2[i].service_master,
        price: isNaN(dataSection2[i].price) ? 0 : dataSection2[i].price,
        qty: isNaN(dataSection2[i].qty) ? 0 : dataSection2[i].qty,
        total_price: isNaN(dataSection2[i].total_price)
          ? 0
          : dataSection2[i].total_price,
        short_text: dataSection2[i].short_text,
        long_text: dataSection2[i].long_text,
      };
      if (
        dataSection2[i].sub_category !== undefined &&
        dataSection2[i].sub_category !== null &&
        dataSection2[i].sub_category.length !== 0 &&
        dataSection2[i].service_master !== undefined &&
        dataSection2[i].service_master !== null
      ) {
        section_2.push(data_section_2);
      }
    }

    let section_3 = [];
    for (let i = 0; i < dataSection3.length; i++) {
      let data_section_3 = {
        type_of_cost: dataSection3[i].type_of_cost,
        description: dataSection3[i].description,
        price: isNaN(dataSection3[i].price) ? 0 : dataSection3[i].price,
      };
      if (
        dataSection3[i].type_of_cost !== undefined &&
        dataSection3[i].type_of_cost !== null &&
        dataSection3[i].type_of_cost.length !== 0
      ) {
        section_3.push(data_section_3);
      }
    }
    if (
      this.state.list_mr_selected.po_dsa_list !== undefined &&
      this.state.list_mr_selected.po_dsa_list !== null &&
      this.state.list_mr_selected.po_dsa_list.length !== 0
    ) {
      let updateDSA = {
        dsa_number: dataForm[0],
        job_order_number: dataForm[3],
        id_po_dsa_doc: this.state.list_mr_selected.po_dsa_list[0]._id,
        no_po_dsa: this.state.list_mr_selected.po_dsa_list[0].no_po_dsa,
        po_for_dsp: this.state.list_mr_selected.po_dsa_list[0].no_po_dsa,
        po_dsa_status: this.state.list_mr_selected.po_dsa_status,
        po_dsa_status_message: this.state.list_mr_selected
          .po_dsa_status_message,
        po_item_number: dataForm[6],
        dimension_volume: dataForm[12],
        dimension_weight: dataForm[13],
        primary_section: section_1,
        second_section: {
          po_number: dataForm[63],
          service_details: section_2,
        },
        third_section: {
          po_number: dataForm[160],
          dac_number: dataForm[161],
          service_details: section_3,
        },
        dsa_total_value: dataForm[197],
        current_dsa_status: "DSA CREATED",
        dsa_status: [
          {
            dsa_status_name: "DSA",
            dsa_status_value: "CREATED",
            dsa_status_date: dateNow,
            dsa_status_updater: this.state.userEmail,
            dsa_status_updater_id: this.state.userId,
          },
        ],
      };
      if (updateDSA.primary_section.length === 0) {
        this.setState({
          action_status: "failed",
          action_message: "Please fill Section 1",
        });
      } else {
        if (
          updateDSA.primary_section[0].sub_category !== null &&
          updateDSA.primary_section[0].service_master === null
        ) {
          this.setState({
            action_status: "failed",
            action_message: "Please fill Section 1",
          });
        } else {
          let res = await this.patchDatatoAPINODE(
            "/matreq/dsaCreation/" + _id,
            {
              account_id: "2",
              mrCategory: "Return",
              submitType: 0,
              data: updateDSA,
            }
          );
          if (res !== undefined && res.data !== undefined) {
            this.setState({
              action_status: "success",
              action_message: "New DSA has been created!",
            });
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
        }
      }
    } else {
      this.setState({
        action_status: "failed",
        action_message: "There is no PO related to this DSA MR",
      });
    }

    // console.log('to be posted', JSON.stringify(updateDSA));
  }

  componentDidMount() {
    document.title = "DSA Creation | BAM";
    let dataForm = this.state.create_dsa_form;
    dataForm[197] = 0;
    this.setState({ create_dsa_form: dataForm });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn" style={{ overflow: "scroll" }}>
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif
              actionMessage={this.state.action_message}
              actionStatus={this.state.action_status}
            />
          </Col>
        </Row>
        <div style={{ width: "150%" }}>
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <span style={{ lineHeight: "2", fontSize: "17px" }}>
                    <i
                      className="fa fa-edit"
                      style={{ marginRight: "8px" }}
                    ></i>
                    DSA Creation
                  </span>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>MRA ID</Label>
                          <AsyncSelect
                            loadOptions={debounce(this.loadOptionsMR, 500)}
                            defaultOptions
                            onChange={this.handleChangeMR}
                          />
                        </FormGroup>
                      </Col>
                      {this.state.dsa_creation_status !== undefined &&
                        this.state.dsa_creation_status !== null && (
                          <Col md="3">
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>&nbsp;</Label>
                              <Input
                                readOnly
                                value={
                                  "DSA Already Created => " +
                                  this.state.dsa_creation_status
                                }
                                style={{
                                  color: "rgba(229,57,53 ,1)",
                                  fontWeight: "600",
                                }}
                              />
                            </FormGroup>
                          </Col>
                        )}
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>WP ID</Label>
                          <Input
                            readOnly
                            value={
                              this.state.list_mr_selected !== null &&
                              this.state.list_mr_selected.cust_del !== undefined
                                ? this.state.list_mr_selected.cust_del
                                    .map((e) => e.cd_id)
                                    .join(", ")
                                : ""
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Current Status MR</Label>
                          <Input
                            readOnly
                            value={
                              this.state.list_mr_selected !== null
                                ? this.state.list_mr_selected.current_mra_status
                                : ""
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>MR INFORMATION</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>DSA Number</Label>
                          <Input
                            type="text"
                            name="dsa_number"
                            readOnly
                            value={
                              this.state.list_mr_selected !== null
                                ? "DSA" + this.state.list_mr_selected.mra_id
                                : ""
                            }
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Project</Label>
                          <Input
                            type="text"
                            name="project"
                            readOnly
                            value={
                              this.state.list_mr_selected !== null
                                ? this.state.list_mr_selected.project_name
                                : ""
                            }
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>DSP</Label>
                          <Input
                            type="text"
                            name="dsp"
                            readOnly
                            value={
                              this.state.list_mr_selected !== null
                                ? this.state.list_mr_selected.dsp_company
                                : ""
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO for DSP</Label>
                          <Input
                            type="text"
                            value={
                              this.state.list_mr_selected.po_dsa_list !==
                              undefined
                                ? this.state.list_mr_selected.po_dsa_list
                                    .map((pdl) => pdl.no_po_dsa)
                                    .join(", ")
                                : null
                            }
                            readOnly
                          />
                          {this.state.list_mr_selected.po_dsa_status ===
                            "INVALID" && (
                            <span
                              style={{
                                color: "rgba(194,24,91 ,1)",
                                fontWeight: "600",
                              }}
                            >
                              {
                                this.state.list_mr_selected
                                  .po_dsa_status_message
                              }
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Network Number</Label>
                          <Input
                            type="text"
                            name="network_number"
                            readOnly
                            value={
                              this.state.network_number !== null
                                ? this.state.network_number
                                : ""
                            }
                          />
                        </FormGroup>
                        {/* }<FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>PO Item Number</Label>
                          <Input type="text" name="6" value={this.state.list_mr_selected !== null ? this.state.list_mr_selected.po_item_number : ""} onChange={this.handleChangeForm} />
                        </FormGroup> */}
                      </Col>
                    </Row>
                    <h5>PO UTILIZATION</h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Balanced Value</Label>
                          <Input type="text" name="balanced_value" readOnly />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>% Utilization</Label>
                          <Input
                            type="text"
                            name="percent_utilization"
                            readOnly
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Status</Label>
                          <Input type="text" name="status" readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>DETAIL</h5>
                    <Row>
                      <Col md="2">
                        <h6>Destination</h6>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>From</Label>
                          <Input
                            type="text"
                            name="10"
                            value={
                              this.state.list_mr_selected.origin !== undefined
                                ? this.state.list_mr_selected.origin.title +
                                  " " +
                                  this.state.list_mr_selected.origin.value
                                : ""
                            }
                            onChange={this.handleChangeForm}
                            readOnly
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>
                            To{" "}
                            {this.state.list_mr_selected.mr_type !==
                              undefined &&
                            (this.state.list_mr_selected.mr_type === "New" ||
                              this.state.list_mr_selected.mr_type === null)
                              ? "(Site ID NE)"
                              : "(Warehouse)"}
                          </Label>
                          <Input
                            type="text"
                            name="11"
                            value={
                              this.state.list_mr_selected.site_info !==
                                undefined &&
                              this.state.list_mr_selected.site_info.find(
                                (si) => si.site_title === "NE"
                              ) !== undefined
                                ? this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "NE"
                                  ).site_id
                                : null
                            }
                            onChange={this.handleChangeForm}
                            readOnly
                          />
                        </FormGroup>
                        {this.state.list_mr_selected.site_info !== undefined ? (
                          this.state.list_mr_selected.site_info[1] !==
                            undefined &&
                          this.state.list_mr_selected.mr_type !== "Return" &&
                          this.state.list_mr_selected.mr_type !==
                            "Relocation" ? (
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>To (Site ID FE)</Label>
                              <Input
                                type="text"
                                name="11"
                                value={
                                  this.state.list_mr_selected.site_info !==
                                    undefined &&
                                  this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "FE"
                                  ) !== undefined
                                    ? this.state.list_mr_selected.site_info.find(
                                        (si) => si.site_title === "FE"
                                      ).site_id
                                    : null
                                }
                                onChange={this.handleChangeForm}
                                readOnly
                              />
                            </FormGroup>
                          ) : (
                            <div></div>
                          )
                        ) : (
                          <div></div>
                        )}
                      </Col>
                      <Col md="3">
                        <h6>Destination</h6>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>From</Label>
                          <Input
                            type="text"
                            name="10"
                            value={
                              this.state.list_mr_selected.origin !== undefined
                                ? this.state.list_mr_selected.origin.title +
                                  " " +
                                  this.state.list_mr_selected.origin.value
                                : ""
                            }
                            onChange={this.handleChangeForm}
                            readOnly
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>
                            To{" "}
                            {this.state.list_mr_selected.mr_type !==
                              undefined &&
                            (this.state.list_mr_selected.mr_type === "New" ||
                              this.state.list_mr_selected.mr_type === null)
                              ? "(Site Name NE)"
                              : "(Warehouse)"}
                          </Label>
                          <Input
                            type="text"
                            name="11"
                            value={
                              this.state.list_mr_selected.site_info !==
                                undefined &&
                              this.state.list_mr_selected.site_info.find(
                                (si) => si.site_title === "NE"
                              ) !== undefined
                                ? this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "NE"
                                  ).site_name
                                : null
                            }
                            onChange={this.handleChangeForm}
                            readOnly
                          />
                        </FormGroup>
                        {this.state.list_mr_selected.site_info !== undefined ? (
                          this.state.list_mr_selected.site_info[1] !==
                            undefined &&
                          this.state.list_mr_selected.mr_type !== "Return" &&
                          this.state.list_mr_selected.mr_type !==
                            "Relocation" ? (
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>To (Site Name FE)</Label>
                              <Input
                                type="text"
                                name="11"
                                value={
                                  this.state.list_mr_selected.site_info !==
                                    undefined &&
                                  this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "FE"
                                  ) !== undefined
                                    ? this.state.list_mr_selected.site_info.find(
                                        (si) => si.site_title === "FE"
                                      ).site_name
                                    : null
                                }
                                onChange={this.handleChangeForm}
                                readOnly
                              />
                            </FormGroup>
                          ) : (
                            <div></div>
                          )
                        ) : (
                          <div></div>
                        )}
                      </Col>
                      <Col md="2">
                        <h6>Destination</h6>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>From</Label>
                          <Input
                            type="text"
                            name="10"
                            value={
                              this.state.list_mr_selected.origin !== undefined
                                ? this.state.list_mr_selected.origin.title +
                                  " " +
                                  this.state.list_mr_selected.origin.value
                                : ""
                            }
                            onChange={this.handleChangeForm}
                            readOnly
                          />
                        </FormGroup>
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>
                            To{" "}
                            {this.state.list_mr_selected.mr_type !==
                              undefined &&
                            (this.state.list_mr_selected.mr_type === "New" ||
                              this.state.list_mr_selected.mr_type === null)
                              ? "(Coordinate NE)"
                              : "(Warehouse)"}
                          </Label>
                          <Input
                            type="textarea"
                            name="11"
                            value={
                              this.state.list_mr_selected.site_info !==
                                undefined &&
                              this.state.list_mr_selected.site_info.find(
                                (si) => si.site_title === "NE"
                              ) !== undefined
                                ? "Lat : " +
                                  this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "NE"
                                  ).site_latitude +
                                  " ; Long : " +
                                  this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "NE"
                                  ).site_longitude
                                : null
                            }
                            onChange={this.handleChangeForm}
                            readOnly
                          />
                        </FormGroup>
                        {this.state.list_mr_selected.site_info !== undefined ? (
                          this.state.list_mr_selected.site_info[1] !==
                            undefined &&
                          this.state.list_mr_selected.mr_type !== "Return" &&
                          this.state.list_mr_selected.mr_type !==
                            "Relocation" ? (
                            <FormGroup style={{ paddingLeft: "16px" }}>
                              <Label>To (Coordinate FE)</Label>
                              <Input
                                type="textarea"
                                name="11"
                                value={
                                  this.state.list_mr_selected.site_info !==
                                    undefined &&
                                  this.state.list_mr_selected.site_info.find(
                                    (si) => si.site_title === "FE"
                                  ) !== undefined
                                    ? "Lat : " +
                                      this.state.list_mr_selected.site_info.find(
                                        (si) => si.site_title === "FE"
                                      ).site_latitude +
                                      " ; Long : " +
                                      this.state.list_mr_selected.site_info.find(
                                        (si) => si.site_title === "FE"
                                      ).site_longitude
                                    : null
                                }
                                onChange={this.handleChangeForm}
                                readOnly
                              />
                            </FormGroup>
                          ) : (
                            <div></div>
                          )
                        ) : (
                          <div></div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>
                            Vol (m<sup>3</sup>)
                          </Label>
                          <Input
                            type="number"
                            name="12"
                            onChange={this.handleChangeForm}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>Weight (Kg)</Label>
                          <Input
                            type="number"
                            name="13"
                            onChange={this.handleChangeForm}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection1(this.state.section_1_form)}
                    <h5>
                      SECTION 2 (For additional services which are covered in PO
                      and available in contract)
                    </h5>
                    <Row>
                      <Col md="12">
                        {this.loopSection2(this.state.section_2_form)}
                      </Col>
                    </Row>
                    <h5>
                      SECTION 3 (For additional services which are not covered
                      in PO and not available in contract)
                    </h5>
                    <Row>
                      <Col md="3">
                        <FormGroup style={{ paddingLeft: "16px" }}>
                          <Label>DAC Number</Label>
                          <Input
                            type="text"
                            name="161"
                            onChange={this.handleChangeForm}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.loopSection3(this.state.section_3_form)}
                    <h5 style={{ display: "none" }}>DSA UPDATE</h5>
                    <Row style={{ paddingLeft: "16px", display: "none" }}>
                      <Col md="1" style={{ paddingLeft: "16px" }}>
                        <FormGroup>
                          <Label>Submission Type</Label>
                        </FormGroup>
                      </Col>
                      <Col md="1" style={{ margin: "0", padding: "4px" }}>
                        <FormGroup>
                          <Input
                            type="select"
                            name="196"
                            onChange={this.handleChangeForm}
                          >
                            <option disabled selected hidden>
                              Select
                            </option>
                            <option value="Actual">Actual</option>
                            <option value="Prebook">Prebook</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>DSA SUMMARY</h5>
                    <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                      <Col md="2" style={{ margin: "0", paddingLeft: "16px" }}>
                        <FormGroup>
                          <Label>Total Value</Label>
                          <Input
                            type="text"
                            name="197"
                            value={
                              this.state.create_dsa_form[197] !== null
                                ? this.state.create_dsa_form[197].toLocaleString()
                                : ""
                            }
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={this.state.list_mr_selected === null}
                    onClick={this.submitDSA}
                    id={
                      this.state.list_mr_selected !== null
                        ? this.state.list_mr_selected._id
                        : ""
                    }
                    value={
                      this.state.list_mr_selected !== null
                        ? this.state.list_mr_selected._etag
                        : ""
                    }
                  >
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>{" "}
                    Create DSA
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
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
    SidebarMinimize: state.minimizeSidebar,
  };
};

export default connect(mapStateToProps)(DSADCreation);
