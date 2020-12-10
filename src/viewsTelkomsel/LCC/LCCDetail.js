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
  Table
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import ModalDelete from "../components/ModalDelete";
import Loading from "../components/Loading";
import {
  postDatatoAPINODE,
  patchDatatoAPINODE,
  getDatafromAPINODE,
  getDatafromAPITSEL,
  getDatafromAPINODEFile
} from "../../helper/asyncFunction";
import axios from 'axios';
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import * as XLSX from 'xlsx';

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class DetailLCC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      all_data: [],
      asp_data: [],
      action_status : null,
      action_message: null,
      amount_lcc : {},
      amount_po : [],
      POdata: [],
      danger: false,
      selected_id: "",
      selected_name: "",
      selected_vendor: "",
      file_po_mapping:[],
      dangerOffline : false,
    };
    // bind

    this.postPO = this.postPO.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.exportFormatMappingCDIDtoPO = this.exportFormatMappingCDIDtoPO.bind(this);
    this.fileHandlerPOMapping = this.fileHandlerPOMapping.bind(this);
    this.poMapping = this.poMapping.bind(this);
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
    document.title = "LCC Detail | BAM";
    this.getLCCDetail(this.props.match.params.id);
    this.getASPList();

  }

  getASPList() {
    getDatafromAPITSEL('/vendor_data_non_page?where={"Type": "DSP"}').then((res) => {
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
      let where_id_PO = '?q={"po_for_dsp" : {"$in" : ['+arrayIdPO+']}, "current_dsa_status" : {"$in" : ["DSA PRE BOOKED", "DSA ACTUALIZED"]} }';
      let resPO = await getDatafromAPINODE('/matreq'+where_id_PO+'&v={"current_dsa_status":1, "dsa_total_value":1, "po_for_dsp" :1}', this.props.dataLogin.token);
      if(resPO !== undefined){
        if(resPO.data !== undefined){
          dataPO = dataPO.concat(resPO.data.data);
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
        this.setState({ action_status: "success" }, () => {});
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
    };
    const post = patchDatatoAPINODE(
      "/lccDsa/approvalLcc",
      { approvalCheck : true, data:[po_data] },
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success", action_message: null }, () => {});
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
        this.setState({ action_status: "success", action_message: null });
        // this.toggleLoading();
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

  getDSAFile = async (e) => {
    e.preventDefault()
    e.persist();
    const i = e.target.name;
    const id = e.currentTarget.value;
    const data_lcc = this.state.all_data;
    if(data_lcc.file_document !== undefined && data_lcc.file_document !== null)  {
      const resFile = await getDatafromAPINODEFile('/lccDsa/getLccDocument/' + data_lcc._id, this.props.dataLogin.token, data_lcc.file_document.mime_type);
      if(resFile !== undefined){
        saveAs(new Blob([resFile.data], {type:data_lcc.file_document.mime_type}), data_lcc.file_document.file_name);
      }
    }
  }

  exportFormatMappingCDIDtoPO = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const dataPO = this.state.all_data.po;

    ws.addRow(["po_dsa","cd_id"]);
    if(dataPO !== undefined){
      for(let i =0; i < dataPO.length; i++){
        ws.addRow([dataPO[i].no_po_dsa, null]);
      }
    }

    const PPFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([PPFormat]), 'LCC '+this.state.all_data.no_lcc+' CD ID mapping to PO.xlsx');
  }

  checkValue(props){
    //Swap undefined to null
    if( typeof props === 'undefined' ) {
      return null;
    }else{
      return props;
    }
  }

  fileHandlerPOMapping = (input) => {
    const file = input.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates:true});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header:1, devfal : null});
      /* Update state */
      this.setState({ action_status: null, action_message: null }, () => {
        this.ArrayEmptytoNull(data);
      });
    };
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[0].length; j++){
        if(typeof dataXLS[i][j] === "object"){
          let dataObject = this.checkValue(JSON.stringify(dataXLS[i][j]));
          if(dataObject !== null){
            dataObject = dataObject.replace(/"/g, "");
          }
          col.push(dataObject);
        }else{
          col.push(this.checkValue(dataXLS[i][j]));
        }
      }
      newDataXLS.push(col);
    }
    this.setState({
      file_po_mapping : newDataXLS,
    });
  }

  async poMapping() {
    const post = patchDatatoAPINODE(
      "/lccDsa/mapPoCdId/"+this.props.match.params.id,
      {data : this.state.file_po_mapping},
      this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" }, () => {});
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

  toogleOffline=(e) => {
    const modalDelete = this.state.dangerOffline;
    if (modalDelete === false) {
      const _id = e.currentTarget.value;
      const name = this.state.all_data.po.find(e => e._id === _id)
      this.setState({
        dangerOffline: !this.state.dangerOffline,
        selected_id: _id,
        selected_name: name.no_po_dsa,
        selected_vendor: name.vendor_name
      });
    } else {
      this.setState({
        dangerOffline: false,
      });
    }
    this.setState((prevState) => ({
      modalDelete: !prevState.modalDelete,
    }));
  }

  OfflinePO = async () => {
    let objData = {
      _id: this.state.selected_id
    }
    this.toogleOffline();
    const DelData = patchDatatoAPINODE(
      "/poDsa/offlinePo/"+this.state.selected_id, {}, this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success"});
        // this.toggleLoading();
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

  render() {
    console.log(this.state.file_po_mapping);
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
                  LCC Detail {all_data.no_lcc}
                </span>
                <Link to={'/lcc-edit/' + all_data._id}>
                  <Button style={{ marginRight: "8px", float: "right" }} color="warning" size="sm" >
                    <i className="fas fa-edit" style={{ marginRight: "8px" }} ></i>
                    Edit
                  </Button>
                </Link>
                <Button style={{ marginRight: "8px", float: "right" }} size="sm" color="secondary" onClick={this.exportFormatMappingCDIDtoPO}>
                  Download Format Mapping
                </Button>
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
                          readOnly
                            type="text"
                            // placeholder="Site ID"
                            name={"desc"}
                            value={all_data.desc}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Budget</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            // placeholder="Site Name"
                            name={"budget"}
                            value={all_data.budget !== undefined && all_data.budget.toLocaleString()}
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
                        <Label sm={2}>LCC File</Label>
                        <Col sm={10}>
                        <Button size="sm" color="info" onClick={this.getDSAFile}>
                          File Download
                        </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <h5><b>PO Number</b></h5>
                  </Col>
                  <br />
                  <div class='divtable'>
                {' '}
                <Col>
                <FormGroup row>
                  <Label sm={2}>PO Mapping</Label>
                  <Col sm={5}>
                    <input
                      type="file"
                      onChange={this.fileHandlerPOMapping}
                    />
                  </Col>
                  <Col sm={5}>
                    <Button onClick={this.poMapping} size="sm">
                      PO Mapping
                    </Button>
                  </Col>

                </FormGroup>
                </Col>
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {all_data.po !== undefined && all_data.po.length === 0 && (
                      <tr>
                        <td colSpan="8">No Data Available</td>
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
                          {e.status === "Online" && (
                            <Button size="sm" color="danger" value={e._id} name={e.no_po_dsa} onClick={this.toogleOffline} title="Online" >
                              <i className="fa fa-times" aria-hidden="true" ></i>
                            </Button>
                          )}
                          </td>
                        </tr>
                        <tr>
                          <td>CD ID : </td>
                          <td colSpan="9">{e.cust_del != undefined ? e.cust_del.map(cd => cd.cd_id).join(", ") : null}</td>
                        </tr>
                      </Fragment>
                    )}
                    </tbody>
                  </Table>
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
                  {all_data.status === "Approved" && (
                  <Col style={{marginBottom : '10px', marginTop : '10px'}}>
                    <Button color="primary" size="sm" onClick={this.addSSOW}>
                      <i className="fa fa-plus">&nbsp;</i> PO
                    </Button>
                  </Col>
                )}
                </div>
                </Row>
              </CardBody>
              <CardFooter>
              {(all_data.status !== "Approved" && (this.state.userRole.findIndex(ur => ur === "Admin") !== -1 || this.state.userRole.findIndex(ur => ur === "BAM-LDM") !== -1 || this.state.userRole.findIndex(ur => ur === "BAM-LDM Admin") !== -1) )&& (
                <Button
                  type="submit"
                  color="success"
                  style={{ float: "left" }}
                  onClick={this.approveLCC}
                  size="sm"
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>
                  Approve
                </Button>
              )}
              {all_data.status === "Approved" && (
                <Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.postPO}
                  disabled={this.state.POdata.length === 0}
                  size="sm"
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>{" "}
                  Create PO
                </Button>
              )}
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

        {/* Modal confirmation Offline po */}
        <ModalDelete
          isOpen={this.state.dangerOffline}
          toggle={this.toogleOffline}
          className={this.props.className}
          title={"Offline "+ this.state.selected_name+ " for " + this.state.selected_vendor}
          body={"Are you sure ?"}
        >
          <Button color="success" onClick={this.OfflinePO}>
            Yes
          </Button>
          <Button color="secondary" onClick={this.toogleOffline}>
            Cancel
          </Button>
        </ModalDelete>
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

export default connect(mapStateToProps)(DetailLCC);
