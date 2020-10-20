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
import Loading from "../components/Loading";
import Select from "react-select";
import './prpo.css';
import {
  postDatatoAPINODE,
  getDatafromAPIEXEL,
} from "../../helper/asyncFunction";
const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);


class CreatePRPO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action_status : null,
      action_message : null,
      Dataform: {
        prt_id: "",
        site_id: "",
        site_name: "",
        quotation_number: "",
        signum_pm: "",
        approval_by: "",
        id_project_doc: "",
        project_name: "",
        area: "",
        purchase_group: "",
        asp_name: "",
        term_of_payment: "",
        network_number: "",
        activity_code: "",
        action_point: "",
        currency: "",
        current_status: "",
        approval_status: "",
        approval_date: "",
        total_price: "",
        pr_number: "",
        pr_date: "",
        pr_inserted_by: "",
        po_number: "",
        po_date: "",
        po_inserted_by: "",
        po_item: "",
        bast_no_dp: "",
        req_gr_dp: "",
        req_gr_by_dp: "",
        req_gr_date_dp: "",
        req_revision_dp: "",
        revision_done_dp: "",
        bast_no_final: "",
        req_gr_final: "",
        req_gr_by_final: "",
        req_gr_date_final: "",
        req_revision_final: "",
        revision_done_final: "",
        deleted: "",
        SSOW_List: [],
      },
      list_project: [],
      list_project_selection: [],
      creation_ssow_form: [],
      SSOW_List_out: [
        {
          ssow: "",
          service_code: "",
          ssow_qty: "",
        },
      ],
      modal_loading: false,
    };
    // bind
    this.handleInput = this.handleInput.bind(this);
    this.handleInputProject = this.handleInputProject.bind(this);
    this.postPRT = this.postPRT.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  componentDidMount() {
    document.title = "PRT Creation | BAM";
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
      }),
      () => console.log(this.state.Dataform)
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

  async postPRT() {
    this.toggleLoading();
    let prt_data = {
      site_id: this.state.Dataform.site_id,
      site_name: this.state.Dataform.site_name,
      quotation_number: this.state.Dataform.quotation_number,
      signum_pm: this.state.Dataform.signum_pm,
      approval_by: this.state.Dataform.approval_by,
      id_project_doc: this.state.Dataform.id_project_doc,
      project_name: this.state.Dataform.project_name,
      area: this.state.Dataform.area,
      purchase_group: this.state.Dataform.purchase_group,
      asp_name: this.state.Dataform.asp_name,
      term_of_payment: this.state.Dataform.term_of_payment,
      network_number: this.state.Dataform.network_number,
      activity_code: this.state.Dataform.activity_code,
      action_point: this.state.Dataform.action_point,
      currency: this.state.Dataform.currency,
      current_status: "PRT CREATED",
      approval_status: "NOT APPROVED",
      approval_date: "",
      total_price: this.state.Dataform.total_price,
      pr_number: this.state.Dataform.pr_number,
      pr_date: this.state.Dataform.pr_date,
      pr_inserted_by: this.state.Dataform.pr_inserted_by,
      po_number: this.state.Dataform.po_number,
      po_date: this.state.Dataform.po_date,
      po_inserted_by: this.state.Dataform.po_inserted_by,
      po_item: this.state.Dataform.po_item,
      bast_no_dp: this.state.Dataform.bast_no_dp,
      req_gr_dp: this.state.Dataform.req_gr_dp,
      req_gr_by_dp: this.state.Dataform.req_gr_by_dp,
      req_gr_date_dp: this.state.Dataform.req_gr_date_dp,
      req_revision_dp: this.state.Dataform.req_revision_dp,
      revision_done_dp: this.state.Dataform.revision_done_dp,
      bast_no_final: this.state.Dataform.bast_no_final,
      req_gr_final: this.state.Dataform.req_gr_by_final,
      req_gr_by_final: this.state.Dataform.req_gr_by_final,
      req_gr_date_final: this.state.Dataform.req_gr_date_final,
      req_revision_final: this.state.Dataform.req_revision_final,
      revision_done_final: this.state.Dataform.revision_done_final,
      deleted: 0,
      SSOW_List: this.state.SSOW_List_out,
    };
    console.log("data prt", prt_data);
    const post = postDatatoAPINODE(
      "/prt/createOnePrt",
      { prt_data },
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res post single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success" }, () => {});
      } else {
        if(post.response !== undefined && post.response.data !== undefined && post.response.data.error !== undefined){
          if(post.response.data.error.message !== undefined){
            this.setState({ action_status: 'failed', action_message: post.response.data.error.message });
          }else{
            this.setState({ action_status: 'failed', action_message: post.response.data.error });
          }
        }else{
          this.setState({ action_status: 'failed' });
        }
      }
    });
    this.toggleLoading();
  }

  addSSOW() {
    this.setState({
      SSOW_List_out: this.state.SSOW_List_out.concat([
        { ssow: "", service_code: "", ssow_qty: "" },
      ]),
    });
  }

  deleteSSOW = (idx) => () => {
    this.setState({
      SSOW_List_out: this.state.SSOW_List_out.filter((s, sidx) => idx !== sidx),
    });
  };

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
                  PR/PO Creation
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
                        <Label sm={2}>Site ID</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"site_id"}
                            value={Dataform.site_id}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site Name"
                            name={"site_name"}
                            value={Dataform.site_name}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Quotation Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Quotation Number"
                            name={"quotation_number"}
                            value={Dataform.quotation_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Signum PM</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Signum PM"
                            name={"signum_pm"}
                            value={Dataform.signum_pm}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Approval By</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Select Approval by"
                            name={"approval_by"}
                            value={Dataform.approval_by}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Approval by
                            </option>
                            <option value="TPM">TPM</option>
                            <option value="KAM">KAM</option>
                            <option value="Head of Finance">
                              Head of Finance
                            </option>
                            <option value="Head Of Cu">Head Of Cu</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Project Name</Label>
                        <Col sm={10}>
                          <Select
                            cacheOptions
                            options={this.state.list_project_selection}
                            name={"project_name"}
                            onChange={this.handleInputProject.bind(
                              "project_name"
                            )}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Area</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Area"
                            name={"area"}
                            value={Dataform.area}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* prpo info */}
                <Row>
                  <Col>
                    <h5>
                      <b>PRPO Information</b>
                    </h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Purchase Group</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Purchase Group"
                            name={"purchase_group"}
                            value={Dataform.purchase_group}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>ASP Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="ASP Name"
                            name={"asp_name"}
                            value={Dataform.asp_name}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Term of Payment</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder=""
                            name={"term_of_payment"}
                            value={Dataform.term_of_payment}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled hidden>
                              Select TOP
                            </option>
                            <option value="2080">20% - 80%</option>
                            <option value="3070">30% - 70%</option>
                            <option value="4060">40% - 60%</option>
                            <option value="5050">50% - 50%</option>
                            <option value="100">100% - 0%</option>
                            <option value="8020">80% - 20%</option>
                            <option value="7030">70% - 30%</option>
                            <option value="6040">60% - 40%</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Network Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Network Number"
                            name={"network_number"}
                            value={Dataform.network_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Activity Code</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Activity Code"
                            name={"activity_code"}
                            value={Dataform.activity_code}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Action Point</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Action Point"
                            name={"action_point"}
                            value={Dataform.action_point}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Action Point
                            </option>
                            <option value="New Assignment">New Assignment</option>
                            <option value="Revise Assignment">Revise Assignment</option>
                            <option value="Cancel Assignment">Cancel Assignment</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Currency</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Currency"
                            name={"currency"}
                            value={Dataform.currency}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Currency
                            </option>
                            <option value="IDR">IDR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="CNY">CNY</option>
                            <option value="SEK">SEK</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* ssow */}
                <h5>
                  <b>SSOW Detail</b>
                </h5>
                <Button color="primary" size="sm" onClick={this.addSSOW}>
                  <i className="fa fa-plus">&nbsp;</i> SSOW
                </Button>
                {SSOW_List_out.map((ssow_data, idx) => (
                  <Row xs="4">
                    <Col md="4">
                      SSOW
                      <Input
                        type="text"
                        placeholder={`SSOW #${idx + 1}`}
                        name={"ssow"}
                        value={ssow_data.ssow}
                        onChange={this.handleInputssow(idx)}
                      />
                    </Col>
                    <Col md="4">
                      Service Code
                      <Input
                        type="text"
                        placeholder={`Service Code #${idx + 1}`}
                        name={"service_code"}
                        value={ssow_data.service_code}
                        onChange={this.handleInputssow(idx)}
                      />
                    </Col>
                    <Col md="2">
                      QTY
                      <Input
                        type="number"
                        placeholder={`QTY #${idx + 1}`}
                        name={"ssow_qty"}
                        value={ssow_data.ssow_qty}
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
                &nbsp;&nbsp;&nbsp;
                <Row>
                  <Col>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Total Price</Label>
                        <Col sm={6}>
                          <Input
                            type="number"
                            placeholder="Total Price"
                            name={"total_price"}
                            value={Dataform.total_price}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* pr status */}
                {/*}<Row>
                  <Col>
                    <h5>
                      <b>PR Status</b>
                    </h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>PR Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="PR Number"
                            name={"pr_number"}
                            value={Dataform.pr_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PR Date</Label>
                        <Col sm={10}>
                          <Input
                            type="date"
                            placeholder="PR Date"
                            name={"pr_date"}
                            value={Dataform.pr_date}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PR Inserted By</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="PR Inserted By"
                            name={"pr_inserted_by"}
                            value={Dataform.pr_inserted_by}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="PO Number"
                            name={"po_number"}
                            value={Dataform.po_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Date</Label>
                        <Col sm={10}>
                          <Input
                            type="date"
                            placeholder="PO Date"
                            name={"po_date"}
                            value={Dataform.po_date}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Inserted By</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="PO Inserted By"
                            name={"po_inserted_by"}
                            value={Dataform.po_inserted_by}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Item</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="PO Item"
                            name={"po_item"}
                            value={Dataform.po_item}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row> */}
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.postPRT}
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>{" "}
                  Create
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* Modal Loading */}
        <Loading isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}>
        </Loading>
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

export default connect(mapStateToProps)(CreatePRPO);
