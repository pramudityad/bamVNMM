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
  Form,
  FormGroup,
  Label,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import ModalDelete from "../components/ModalDelete";
import Loading from "../components/Loading";
import {
  postDatatoAPINODE,
  patchDatatoAPINODE,
  getDatafromAPINODE
} from "../../helper/asyncFunction";

class DetailLCC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_data: [],
      POdata: [

      ],
      danger: false,
      selected_id: "",
      selected_name: "",
      selected_vendor: "",
    };
    // bind
    this.handleInput = this.handleInput.bind(this);
    this.handleInputProject = this.handleInputProject.bind(this);
    this.postPO = this.postPO.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
  }

  componentDidMount() {
    document.title = "PRT Creation | BAM";
    this.getPRTDetail(this.props.match.params.id);
  }

  getPRTDetail(_id) {
    getDatafromAPINODE("/lccDsa/" + _id, this.props.dataLogin.token).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ all_data: res.data.data });
          console.log("getPRTDetail ", this.state.all_data);
        }
      }
    );
  }


  handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      (prevState) => ({
        Dataform: {
          ...prevState.Dataform,
          [name]: value,
        },
      }),
      () => console.log(this.state.Dataform)
    );
  }

  handleInputssow = (idx) => (e) => {
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

  handleInputProject(e) {
    const value = e.value;
    const _id = e._id;
    // const name = e.name;
    this.setState(
      (prevState) => ({
        Dataform: {
          ...prevState.Dataform,
          ["project_name"]: value,
          ["id_project_doc"]: _id,
        },
      }),
      () => console.log(this.state.Dataform)
    );
  }


  filterDataProject = (inputValue) => {
    const list = [];
    this.state.list_project.map((i) =>
      list.push({ label: i.Project, value: i.Project, _id: i._id })
    );
    this.setState({ list_project_selection: list });
    if (inputValue.length === 0) {
      return list;
    } else {
      return this.state.list_project_selection.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  };

  async postPO() {
    // const Dataform = this.state.Dataform
    // let po_data = {
    //   no_lcc: Dataform["no_lcc"],
    //   dsp_value: Dataform["dsp_value"],
    //   dsp_prebook: Dataform['dsp_prebook'],
    //   dsp_actual: Dataform["dsp_actual"],
    //   vendor_name: Dataform["vendor_name"],
    //   vendor_code: Dataform['vendor_code']
    // };
    // console.log("data prt", po_data);
    const post = postDatatoAPINODE(
      "/poDsa/createPo",
      { data: this.state.POdata },
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res post single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success" }, () => {});
      } else {
        this.setState({
          action_status: "failed",
        });
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
        this.setState({ action_status: "success" }, () => {});
      } else {
        this.setState({
          action_status: "failed",
        });
      }
    });
  }

  addSSOW() {
    const Dataform = this.state.all_data
    this.setState({
      POdata: this.state.POdata.concat([
        {
          no_lcc: Dataform["no_lcc"],
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

  toggleDelete=(e) => {
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

  DeleteData = async () => {
    let objData = {
      _id: this.state.selected_id
    }
    // this.toggleLoading();
    this.toggleDelete();
    const DelData = patchDatatoAPINODE(
      "/poDsa/updatePo",{data:[objData]}, this.props.dataLogin.token
    ).then((res) => {
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        // this.toggleLoading();
      } else {
        this.setState({ action_status: "failed" }, () => {
          // this.toggleLoading();
        });
      }
    });
  };

  render() {
    const { all_data } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                  LCC Creation
                </span>
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
                        <Label sm={2}>PO</Label>
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
                        <Label sm={2}>PO Desc</Label>
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
                            value={all_data.budget}
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
                            value={all_data.prebook}
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
                            value={all_data.actual}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>                                        
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <h5>
                      <b>PO Number</b>
                    </h5>
                    </Col>
                    <Col>
                    {all_data.status === "Approved" ? (<Button color="primary" size="sm" onClick={this.addSSOW}>
                  <i className="fa fa-plus">&nbsp;</i> PO
                </Button>):("")}
                    </Col>
                    
                    <div class='divtable'>

                    {this.state.POdata.map((ssow_data, idx) => (
                  <Row xs="4">
                    <Col md="4">
                      Value
                      <Input
                        type="number"
                        placeholder={`Value #${idx + 1}`}
                        name={"dsp_value"}
                        value={ssow_data.dsp_value}
                        onChange={this.handleInputssow(idx)}
                      />
                    </Col>
                    <Col md="4">
                      Prebook
                      <Input
                        type="number"
                        placeholder={`Prebook #${idx + 1}`}
                        name={"dsp_prebook"}
                        value={ssow_data.dsp_prebook}
                        onChange={this.handleInputssow(idx)}
                      />
                    </Col>
                    <Col md="2">
                      Actual
                      <Input
                        type="number"
                        placeholder={`Actual #${idx + 1}`}
                        name={"dsp_actual"}
                        value={ssow_data.dsp_actual}
                        onChange={this.handleInputssow(idx)}
                      />
                    </Col>
                    <Col md="2">
                      Vendor Name
                      <Input
                        type="text"
                        placeholder={`Vendor Name #${idx + 1}`}
                        name={"vendor_name"}
                        value={ssow_data.vendor_name}
                        onChange={this.handleInputssow(idx)}
                      />
                    </Col>
                    <Col md="4">
                      Vendor Code
                      <Input
                      readOnly
                        type="text"
                        placeholder={`Vendor Code #${idx + 1}`}
                        name={"vendor_code"}
                        value={ssow_data.vendor_code}
                        onChange={this.handleInputssow(idx)}
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
                  <Table hover bordered responsive size="sm" width="100%">
                    <thead class="table-commercial__header--fixed">
                      <tr>
                        <th>PO ID</th>
                        <th>Status</th>
                        <th>Vendor Name</th>
                        <th>Vendor Code</th>
                        <th>Value</th>
                        <th>Prebook</th>
                        <th>Actual</th> 
                        <th>Action</th>     
                      </tr>
                    </thead>
                    <tbody>
                    {all_data.po !== undefined && all_data.po.length === 0 && (
                      <tr>
                        <td colSpan="7">No Data Available</td>
                      </tr>
                    )} 
                    {all_data.po !== undefined && all_data.po.map(e =>
                      <tr>
                      <td>{e.no_po_dsa}</td>
                      <td>{e.status}</td>
                      <td>{e.vendor_name}</td>
                      <td>{e.vendor_code}</td>
                      <td>{e.dsp_value}</td>
                      <td>{e.dsp_prebook}</td>
                      <td>{e.dsp_actual}</td>
                      <td><Button
                                      size="sm"
                                      color="info"
                                      value={e._id}
                                      name={e.no_po_dsa}
                                      onClick={this.toggleDelete}
                                      title="Delete"
                                    >
                                      <i
                                        className="fa fa-check"
                                        aria-hidden="true"
                                      ></i>
                                    </Button></td>
                      </tr>
                    )}
                    </tbody>
                  </Table>
                </div>
                </Row>
              </CardBody>
              <CardFooter>
                {this.state.all_data.status !== "Approved" ? (<Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.approveLCC}
                  // disabled={this.state.POdata.length === 0}
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>{" "}
                  Approve
                </Button>):(<Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.postPO}
                  disabled={this.state.POdata.length === 0}
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>{" "}
                  Create PO
                </Button>)}   
              </CardFooter>
            </Card>
          </Col>
        </Row>

        {/* Modal confirmation appv po */}
        <ModalDelete
          isOpen={this.state.danger}
          toggle={this.toggleDelete}
          className={this.props.className}
          title={"Approve "+ this.state.selected_name+ " for " + this.state.selected_vendor}
          body={"Are you sure ?"}
        >
          <Button color="danger" onClick={this.DeleteData}>
            Yes
          </Button>
          <Button color="secondary" onClick={this.toggleDelete}>
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
