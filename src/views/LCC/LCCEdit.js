import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Table, Modal, ModalFooter
} from "reactstrap";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Select from "react-select";
import ModalDelete from "../components/ModalDelete";
import ModalCreateNew from "../components/ModalCreateNew";

import Loading from "../components/Loading";
import {
  postDatatoAPINODE,
  patchDatatoAPINODE,
  getDatafromAPINODE,
  getDatafromAPIEXEL
} from "../../helper/asyncFunction";
import axios from 'axios';
const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value, style }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} className="checkmark-dash" style={style}/>
);

class EditLCC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_data: {},
      po_data: {},
      asp_data: [],
      POdata: [],
      danger: false,
      selected_id: "",
      selected_data: {},
      selected_vendor: "",
      edit_modal: false,
      action_status : null,
      action_message: null,
      amount_lcc : {},
      amount_po : [],
      inputan_file : null,
      cd_id_checked : new Map(),
    };
    // bind

    this.postPO = this.postPO.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.handleChangeCheckedCDID = this.handleChangeCheckedCDID.bind(this);
    this.removeCDIDfromPO = this.removeCDIDfromPO.bind(this);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: username,
          password: password
        }
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

  componentDidMount() {
    document.title = "LCC Edit | BAM";
    this.getLCCDetail(this.props.match.params.id);
    this.getASPList();

  }

  getASPList() {
    getDatafromAPIEXEL('/vendor_data_non_page?where={"Type": "DSP"}').then((res) => {
      if (res.data !== undefined) {
        this.setState({ asp_data: res.data._items });
      } else {
        this.setState({ asp_data: [] });
      }
    });
  }

  getLCCDetail(_id) {
    getDatafromAPINODE("/lccDsa/" + _id, this.props.dataLogin.token).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ all_data: res.data.data }, () => {
            this.preProcessingAmount(res.data.data.po)
          });
          console.log("getLCCDetail ", this.state.all_data);
        }
      }
    );
  }

  async preProcessingAmount(dataLCCPO){
    const dataDSAPO = await this.getDataPO(dataLCCPO.map(po => po.no_po_dsa));
    const dataDSAPOPrebook = dataDSAPO.filter(e => e.current_dsa_status === "DSA PRE BOOKED");
    const dataDSAPOActualize = dataDSAPO.filter(e => e.current_dsa_status === "DSA ACTUALIZED");
    const lccPredefined = dataDSAPOPrebook.reduce((a,b) => a+parseFloat(b.dsa_total_value), 0);
    const lccActualize = dataDSAPOActualize.reduce((a,b) => a+parseFloat(b.dsa_total_value), 0);
    let bucketAmount = [];
    for(let i=0; i<dataLCCPO.length; i++){
      let poPredefined = dataDSAPOPrebook.filter(dap => dap.po_for_dsp === dataLCCPO[i].no_po_dsa).reduce((a,b) => a+parseFloat(b.dsa_total_value), 0);
      let poActualize = dataDSAPOActualize.filter(dap => dap.po_for_dsp === dataLCCPO[i].no_po_dsa).reduce((a,b) => a+parseFloat(b.dsa_total_value), 0);
      bucketAmount.push({
        po_for_dsp : dataLCCPO[i].no_po_dsa,
        amount_prebook : poPredefined,
        amount_actualize : poActualize
      });
    }
    this.setState({amount_po : bucketAmount, amount_lcc:{amount_prebook : lccPredefined,amount_actualize :lccActualize} });
  }

  async getDataPO(arrayPO){
    let dataPO = [];
    let arrayDataPO = arrayPO.filter(ap => ap !== null && ap !== undefined && ap.length !== 0);
    let getNumberPage = Math.ceil(arrayDataPO.length / 10);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPO = arrayDataPO.slice(i * 10, (i+1)*10);
      let arrayIdPO = '"'+DataPaginationPO.join('", "')+'"';
      arrayIdPO = arrayIdPO.replace("&", "%26");
      let where_id_PO = '?where={"po_for_dsp" : {"$in" : ['+arrayIdPO+']}, "current_dsa_status" : {"$in" : ["DSA PRE BOOKED", "DSA ACTUALIZED"]} }';
      let resPO = await this.getDataFromAPI('/mr_sorted'+where_id_PO+'&projection={"current_dsa_status":1, "dsa_total_value":1, "po_for_dsp" :1}');
      if(resPO !== undefined){
        if(resPO.data !== undefined){
          dataPO = dataPO.concat(resPO.data._items);
        }
      }
    }
    return dataPO;
  }



  handleinputPO = (idx) => (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newSSOW = this.state.POdata.map((ssow_data, sidx) => {
      if (idx !== sidx) return ssow_data;
      // return {...ssow_data, ssow: e.target.value, service_code: e.target.value, ssow_qty:e.target.value}
      return { ...ssow_data, [name]: value, [name]: value, [name]: value };
    });

    this.setState(
      {
        POdata: newSSOW,
      },
      () => console.log(this.state.POdata)
    );
  };

  handleInputVendor= (idx) => (e) => {
    const value = e.target.value;
    const value_name = e.target.options[e.target.selectedIndex].text
    const name = e.target.name;

    const DataPO = this.state.POdata
    const newSSOW = this.state.POdata.map((ssow_data, sidx) => {
      if (idx !== sidx) return ssow_data;

      return { ...ssow_data, ["vendor_code"] :value, ["vendor_name"] :value_name};
    });

    this.setState(
      {
        POdata: newSSOW,
      },
      () => console.log(this.state.POdata)
    );
  };

  async postPO() {
    const post = postDatatoAPINODE(
      "/poDsa/createPo",
      { data: this.state.POdata },
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res post single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: "success" }, () => {});
      } else {
        this.setState({
          action_status: "failed", action_message: "failed"
        });
      }
    });
  }

  UpdateLCC = async () => {
    const Dataform = this.state.Dataform
    let lcc_data = {
      _id: this.props.match.params.id,
      desc: this.state.all_data.desc,
      budget: this.state.all_data.budget
    };
    let formDocument = new FormData();
    await formDocument.append('data', JSON.stringify([lcc_data]));
    if(this.state.inputan_file !== undefined){
      await formDocument.append('fileDocument', this.state.inputan_file);
    }
    const post = patchDatatoAPINODE(
      "/lccDsa/updateLcc",
      formDocument,
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res post single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: "success" }, () => {});
      } else {
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    });
  }

  UpdatePO= async () => {
    let ponew_data = {
      _id: this.state.selected_id,
      dsp_value: this.state.po_data.dsp_value,
      vendor_name: this.state.po_data.vendor_name,
      vendor_code: this.state.po_data.vendor_code
    };
    const post = patchDatatoAPINODE(
      "/poDsa/updatePo",
      { data:[ponew_data] },
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res post single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: "success" }, () => {});
      } else {
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    });
  }

  approveLCC = async () => {
    const Dataform = this.state.Dataform
    let po_data = {
      _id: this.props.match.params.id,
      status: "Approved"
    };
    console.log("data prt", po_data);
    const post = patchDatatoAPINODE(
      "/lccDsa/updateLcc",
      { data:[po_data] },
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res post single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: "success" }, () => {});
      } else {
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    });
  }

  addSSOW() {
    const Dataform = this.state.all_data
    this.setState({
      POdata: this.state.POdata.concat([
        {
          no_lcc: Dataform["no_lcc"],
          no_po_dsa: "",
          dsp_value: "",
          dsp_prebook: "",
          dsp_actual: "",
          vendor_name: "",
          vendor_code: ""
        },
      ]),
    });
  }

  deleteSSOW = (idx) => () => {
    this.setState({
      POdata: this.state.POdata.filter((s, sidx) => idx !== sidx),
    });
  };

  toogleConf=(e) => {
    const modalDelete = this.state.danger;
    if (modalDelete === false) {
      const _id = e.currentTarget.value;
      const name = this.state.all_data.po.find(e => e._id === _id)
      this.setState({
        danger: !this.state.danger,
        selected_id: _id,
        selected_name: name.no_po_dsa,
        selected_vendor: name.vendor_name
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

  toogleEdit=(e) => {
    const modalEdit = this.state.edit_modal;
    if (modalEdit === false) {
      const _id = e.currentTarget.value;
      const name = this.state.all_data.po.find(e => e._id === _id)
      this.setState({
        edit_modal: !this.state.edit_modal,
        selected_id: _id,
        selected_data: name,
      });
    } else {
      this.setState({
        edit_modal: false,
      });
    }
    this.setState({cd_id_checked : new Map()});
    this.setState((prevState) => ({
      modalEdit: !prevState.modalEdit,
    }));
  }

  ApprovePO = async () => {
    let objData = {
      _id: this.state.selected_id
    }
    // this.toggleLoading();
    this.toogleConf();
    const DelData = patchDatatoAPINODE(
      "/poDsa/approvalPo",{approval : true, data:[objData]}, this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: "success" });
      } else {
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    });
  };

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      (prevState) => ({
        all_data: {
          ...prevState.all_data,
          [name]: value,
        },
      }),
      () => console.log(this.state.all_data)
    );
  }

  handleInputPO = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      (prevState) => ({
        po_data: {
          ...prevState.po_data,
          [name]: value,
        },
      }),
      () => console.log(this.state.po_data)
    );
  }

  handleInputPOVendor = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const value_name = e.target.options[e.target.selectedIndex].text

    this.setState(
      (prevState) => ({
        po_data: {
          ...prevState.po_data,
          ["vendor_code"]: value, ["vendor_name"] : value_name
        },
      }),
      () => console.log(this.state.po_data)
    );
  }

  handleInputFileLCC = (e) => {
    let fileUpload = null;
    if (e !== undefined && e.target !== undefined && e.target.files !== undefined ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload });
  };

  handleChangeCheckedCDID(e){
    const name = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ cd_id_checked: prevState.cd_id_checked.set(name, isChecked) }));
  }

  removeCDIDfromPO(){
    let CDIDChecked = [];
    for (var [key, value] of this.state.cd_id_checked.entries()) {
      if(value === true){
        CDIDChecked.push(key);
      }
    }
    this.toogleEdit();
    const post = patchDatatoAPINODE(
      "/poDsa/takeOutCdId/"+this.state.selected_data._id,
      { cdIdList:CDIDChecked },
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: "success" }, () => {});
      } else {
        if (res.response !== undefined && res.response.data !== undefined && res.response.data.error !== undefined) {
          if (res.response.data.error.message !== undefined) {
            this.setState({ action_status: 'failed', action_message: res.response.data.error.message });
          } else {
            this.setState({ action_status: 'failed', action_message: res.response.data.error });
          }
        } else {
          this.setState({ action_status: 'failed' });
        }
      }
    });
  }

  render() {
    console.log(this.state.cd_id_checked)
    const { all_data } = this.state;
    return (
      <div className="animated fadeIn">
         <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                  LCC Edit
                </span>
                <Link to={'/lcc-detail/' + this.props.match.params.id}>
                  <Button style={{ width: "50px", float : 'right' }} outline color="secondary" size="sm">Back</Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Row>
                  {/* general info */}
                  <Col>
                    <h5>
                      <b>General Information</b>
                    </h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>PO Cust Desc</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            readOnly
                            // placeholder="PRT ID"
                            // name={"po_cust_desc"}
                            value={all_data.po_cust_desc}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Desc</Label>
                        <Col sm={10}>
                          <Input

                            type="text"
                            // placeholder="Site ID"
                            name={"desc"}
                            defaultValue={all_data.desc}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Budget</Label>
                        <Col sm={10}>
                          <Input

                            type="text"
                            // placeholder="Site Name"
                            name={"budget"}
                            defaultValue={all_data.budget}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Prebook</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            // placeholder="Quotation Number"
                            name={"prebook"}
                            value={this.state.amount_lcc.amount_prebook !== undefined && this.state.amount_lcc.amount_prebook.toLocaleString()}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Actual</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            // placeholder="Signum PM"
                            name={"actual"}
                            value={this.state.amount_lcc.amount_actualize !== undefined && this.state.amount_lcc.amount_actualize.toLocaleString()}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>File LCC</Label>
                        <Col sm={2}>
                          <input
                            type="file"
                            onChange={this.handleInputFileLCC}
                          />
                        </Col>
                        <Col sm={3}>
                          <span>Upload file if you wanna replace existing file</span>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <h5><b>PO Number</b></h5>
                  </Col>
                  <div class='divtable'>
                  <Col>
                  {this.state.POdata.map((ssow_data, idx) => (
                    <Row>
                      <Col md="2">
                        No PO
                        <Input
                          type="text"
                          placeholder={`No PO #${idx + 1}`}
                          name={"no_po_dsa"}
                          value={ssow_data.no_po_dsa}
                          onChange={this.handleinputPO(idx)}
                        />
                      </Col>
                      <Col md="2">
                        Amount
                        <Input
                          type="number"
                          placeholder={`Amount #${idx + 1}`}
                          name={"dsp_value"}
                          value={ssow_data.dsp_value}
                          onChange={this.handleinputPO(idx)}
                        />
                      </Col>
                      <Col md="4">
                        Vendor Name
                        <Input
                          type="select"
                          placeholder={`Vendor Name #${idx + 1}`}
                          name={"vendor_code"}
                          value={ssow_data.vendor_code}
                          onChange={this.handleInputVendor(idx)}
                        >
                            <option value="" disabled selected hidden>
                              Select Vendor Name
                            </option>
                        {this.state.asp_data.map((asp) => (
                        <option value={asp.Vendor_Code}>{asp.Name}</option>
                        ))}
                        </Input>
                      </Col>
                      <Col md="2">
                        Vendor Code
                        <Input
                        readOnly
                          type="text"
                          placeholder={`Vendor Code #${idx + 1}`}
                          name={"vendor_code"}
                          value={ssow_data.vendor_code}
                          onChange={this.handleinputPO(idx)}
                        />
                      </Col>
                      <Col>
                        <div>
                          <Button
                            onClick={this.deleteSSOW(idx)}
                            color="danger"
                            size="sm"
                            style={{
                              marginLeft: "5px",
                              marginTop: "5px",
                              display: "inline-block",
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  ))}
                  </Col>
                  <Col style={{marginBottom : '10px', marginTop : '10px'}}>
                  {/* {all_data.status === "Approved" ? (
                    <Button color="primary" size="sm" onClick={this.addSSOW}>
                      <i className="fa fa-plus">&nbsp;</i> PO
                    </Button>
                  ):("")} */}
                  </Col>
                {' '}
                  <Table hover bordered responsive size="sm" width="100%">
                    <thead class="table-commercial__header--fixed">
                      <tr>
                        <th>PO ID</th>
                        <th>Status</th>
                        <th>CD ID</th>
                        <th>Vendor Name</th>
                        <th>Vendor Code</th>
                        <th>Amount</th>
                        <th>Prebook</th>
                        <th>Actual</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {all_data.po !== undefined && all_data.po.length === 0 && (
                      <tr>
                        <td colSpan="7">No Data Available</td>
                      </tr>
                    )}
                    {all_data.po !== undefined && all_data.po.map(e =>
                      <Fragment>
                      <tr style={{backgroundColor : 'rgba(187,222,251 ,1)'}}>
                        <td>{e.no_po_dsa}</td>
                        <td>{e.status}</td>
                        <td></td>
                        <td>{e.vendor_name}</td>
                        <td>{e.vendor_code}</td>
                        <td>{e.dsp_value.toLocaleString()}</td>
                        <td>{this.state.amount_po.find(ap => ap.po_for_dsp == e.no_po_dsa) !== undefined ? this.state.amount_po.find(ap => ap.po_for_dsp == e.no_po_dsa).amount_prebook.toLocaleString() : null }</td>
                        <td>{this.state.amount_po.find(ap => ap.po_for_dsp == e.no_po_dsa) !== undefined ? this.state.amount_po.find(ap => ap.po_for_dsp == e.no_po_dsa).amount_actualize.toLocaleString() : null }</td>
                        <td>
                          {e.status !== "Online" && (
                            <Button size="sm" color="info" value={e._id} name={e.no_po_dsa} onClick={this.toogleConf} title="Online" >
                              <i className="fa fa-check" aria-hidden="true" ></i>
                            </Button>
                          )}
                          </td>
                          <td><Button
                              size="sm"
                              color="default"
                              value={e._id}
                              name={e.no_po_dsa}
                              onClick={this.toogleEdit}
                              title="Edit"
                            >
                              <i
                                className="fa fa-edit"
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>CD ID : </td>
                          <td colSpan="10">{e.cust_del != undefined ? e.cust_del.map(cd => cd.cd_id).join(", ") : null}</td>
                        </tr>
                      </Fragment>
                    )}
                    </tbody>
                  </Table>
                </div>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="warning"
                  style={{ float: "right" }}
                  onClick={this.UpdateLCC}
                >
                  Update LCC
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        {/* Modal confirmation appv po */}
        <ModalDelete
          isOpen={this.state.danger}
          toggle={this.toogleConf}
          className={this.props.className}
          title={"Approve "+ this.state.selected_name+ " for " + this.state.selected_vendor}
          body={"Are you sure ?"}
        >
          <Button color="success" onClick={this.ApprovePO}>
            Yes
          </Button>
          <Button color="secondary" onClick={this.toogleConf}>
            Cancel
          </Button>
        </ModalDelete>


        {/* Modal edit  po */}
        <ModalCreateNew
          isOpen={this.state.edit_modal}
          toggle={this.toogleEdit}
          className={this.props.className}
          title={"Edit "+ this.state.selected_data.no_po_dsa}
          // body={"Are you sure ?"}
        >
             <div>
             <Row form>
               <Col md={6}>
                 <FormGroup>
                   <Label>Vendor Name</Label>
                   <Input
                     type="select"
                     id={"vendor_code"}
                     name={"vendor_code"}
                     defaultValue={this.state.selected_data.vendor_name}
                     onChange={this.handleInputPOVendor}
                   >
                     <option value="" disabled selected hidden>
                           Select Vendor Name
                         </option>
                     {this.state.asp_data.map((asp) => (
                     <option value={asp.Vendor_Code}>{asp.Name}</option>
                     ))}
                   </Input>
                 </FormGroup>
               </Col>
               <Col md={6}>
                 <FormGroup>
                   <Label>Vendor Code</Label>
                   <Input
                   readOnly
                     type="text"
                     id={"vendor_code"}
                     name={"vendor_code"}
                     defaultValue={this.state.po_data.vendor_code}
                     onChange={this.handleInputPOVendor}
                   ></Input>
                 </FormGroup>
               </Col>
             </Row>
              <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        id={"dsp_value"}
                        name={"dsp_value"}
                        defaultValue={this.state.selected_data.dsp_value}
                        onChange={this.handleInputPO}
                      ></Input>
                    </FormGroup>
                  </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Please select CD ID to remove mapping from it</Label>
                    <Table hover bordered responsive size="sm">
                      <tbody>
                      {this.state.selected_data.cust_del !== undefined && this.state.selected_data.cust_del.map(cd =>
                        <tr>
                          <td><Checkbox name={cd.cd_id} checked={this.state.cd_id_checked.get(cd.cd_id)} onChange={this.handleChangeCheckedCDID} /></td>
                          <td>{cd.cd_id}</td>
                        </tr>
                      )}
                      </tbody>
                    </Table>
                    <Button size="sm" onClick={this.removeCDIDfromPO}>
                      Remove CD ID
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
          </div>
          <ModalFooter>
          <Button color="success" onClick={this.UpdatePO} size="sm">
            Update PO
          </Button>
          <Button color="secondary" onClick={this.toogleEdit} size="sm">
            Cancel
          </Button>
          </ModalFooter>

        </ModalCreateNew>
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

export default connect(mapStateToProps)(EditLCC);
