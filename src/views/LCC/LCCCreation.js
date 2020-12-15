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
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";

import Loading from "../components/Loading";
import {
  postDatatoAPINODE,
  getDatafromAPIEXEL,
} from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class CreateLCC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Dataform: {
        budget : "",
        prebook : "",
        actual : "",
        po_cust_desc : "",
        desc : "",
        action_status : null,
        action_message : null,
      },
      list_project: [],
      list_project_selection: [],
      creation_ssow_form: [],
      modal_loading: false,
      inputan_file:null,
      action_status : null,
      action_message : null,
    };
    // bind
    this.handleInput = this.handleInput.bind(this);
    this.handleInputProject = this.handleInputProject.bind(this);
    this.postLCC = this.postLCC.bind(this);
  }

  componentDidMount() {
    document.title = "LCC Creation | BAM";
    this.getDataProject();
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
    const newSSOW = this.state.SSOW_List_out.map((ssow_data, sidx) => {
      if (idx !== sidx) return ssow_data;
      // return {...ssow_data, ssow: e.target.value, service_code: e.target.value, ssow_qty:e.target.value}
      return { ...ssow_data, [name]: value, [name]: value, [name]: value };
    });

    this.setState(
      {
        SSOW_List_out: newSSOW,
      },
      () => console.log(this.state.SSOW_List_out)
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
      })
    );
  }

  getDataProject() {
    getDatafromAPIEXEL("/project_sorted_non_page").then((resProject) => {
      if (resProject.data !== undefined) {
        this.setState({ list_project: resProject.data._items }, () => {
          this.filterDataProject("");
        });
      }
    });
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

  handleInputFileLCC = (e) => {
    let fileUpload = null;
    if (e !== undefined && e.target !== undefined && e.target.files !== undefined ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload });
  };

  async postLCC() {
    const Dataform = this.state.Dataform
    let prt_data = {
      budget: Dataform["budget"],
      prebook: Dataform['prebook'],
      actual: Dataform["actual"],
      po_cust_desc: Dataform["po_cust_desc"],
      desc: Dataform['desc']
    };
    let formDocument = new FormData();
    await formDocument.append('data', JSON.stringify([prt_data]));
    await formDocument.append('fileDocument', this.state.inputan_file);
    // console.log("data prt", prt_data);
    const post = postDatatoAPINODE(
      "/lccDsa/createLCC",
      formDocument,
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


  render() {
    const { Dataform, SSOW_List_out } = this.state;
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
                        <Label sm={2}>PO Cust Desc</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            // placeholder="LCC ID"
                            name={"po_cust_desc"}
                            value={Dataform.po_cust_desc}
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
                            value={Dataform.desc}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Budget</Label>
                        <Col sm={10}>
                          <Input
                            type="number"
                            // placeholder="Site Name"
                            name={"budget"}
                            value={Dataform.budget}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>File LCC</Label>
                        <Col sm={10}>
                          <input
                            type="file"
                            onChange={this.handleInputFileLCC}
                          />
                        </Col>
                      </FormGroup>

                      {/*}<FormGroup row>
                        <Label sm={2}>Prebook</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            // placeholder="Quotation Number"
                            name={"prebook"}
                            value={Dataform.prebook}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Actual</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            // placeholder="Signum PM"
                            name={"actual"}
                            value={Dataform.actual}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>*/}
                    </Form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.postLCC}
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>{" "}
                  Create
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
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

export default connect(mapStateToProps)(CreateLCC);
