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
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";

import Loading from "../components/Loading";
import {
  getDatafromAPINODE,
  patchDatatoAPINODE,
  getDatafromAPIEXEL,
} from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class EditPRPO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_data: [],
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
        SSOW_List: [
        ],
      },
      list_project: [],
      list_project_selection: [],
      creation_ssow_form: [],
      SSOW_List_out: [
        {
		  _id:"",
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
    this.updatePRT = this.updatePRT.bind(this);
    this.addSSOW = this.addSSOW.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);

  }
  // function
  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  componentDidMount() {
    document.title = "PRT Edit | BAM";
    this.getDataProject();
    this.getPRTDetail(this.props.match.params.id);
  }

  getPRTDetail(_id) {
    this.toggleLoading();
    getDatafromAPINODE("/prt/getPrt/" + _id, this.props.dataLogin.token).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ all_data: res.data.data, Dataform: res.data.data , SSOW_List_out: res.data.data.SSOW_List});
          // console.log("SSOW_List_out ", this.state.SSOW_List_out);
        }
      }
    );
    this.toggleLoading();
  }

  handleInput(e) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
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
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
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

  async updatePRT() {
    this.toggleLoading();
    let data = {
      prt_id: this.state.Dataform.prt_id,
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
    console.log("data prt", data);
    const patch = patchDatatoAPINODE(
      "/prt/UpdatePrt/" + this.props.match.params.id,
      { data },
      this.props.dataLogin.token
    ).then((res) => {
      console.log(" res patch single ", res);
      if (res.data !== undefined) {
        this.setState({ action_status: "success" });
        this.toggleLoading();
      } else {
        this.setState({
          action_status: "failed",
        });
        this.toggleLoading();
      }
    });
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
	const { all_data, SSOW_List_out} = this.state;	
    return (
      <div className="animated fadeIn">
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                  PR/PO Edit
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
                        <Label sm={2}>PRT ID</Label>
                        <Col sm={10}>
                          <Input
                            readOnly
                            type="text"
                            placeholder="PRT ID"
                            name={"prt_id"}
                            defaultValue={all_data.prt_id}
                            // onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site ID</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"site_id"}
                            defaultValue={all_data.site_id}
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
                            defaultValue={all_data.site_name}
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
                            defaultValue={all_data.quotation_number}
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
                            defaultValue={all_data.signum_pm}
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
                            value={all_data.approval_by}
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
                            // cacheOptions
                            value={this.state.list_project_selection.filter(
                              (option) => option.label === all_data.project_name
                            )}
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
                            defaultValue={all_data.area}
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
                            defaultValue={all_data.purchase_group}
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
                            defaultValue={all_data.asp_name}
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
                            defaultValue={all_data.term_of_payment}
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
                            defaultValue={all_data.network_number}
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
                            defaultValue={all_data.activity_code}
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
                            defaultValue={all_data.action_point}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Action Point
                            </option>
                            <option value="">New Assignment</option>
                            <option value="">Revise Assignment</option>
                            <option value="">Cancel Assignment</option>
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
                            defaultValue={all_data.currency}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Currency
                            </option>
                            <option value="IDR">IDR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
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
                {SSOW_List_out !== undefined &&
                  SSOW_List_out.map((ssow_data, idx) => (
                    <Row xs="4">
                      <Col md="4">
                        SSOW
                        <Input	
                        key={ssow_data._id}					
                          type="text"
                          placeholder={`SSOW #${idx + 1}`}
                          name={"ssow"}
                          defaultValue={ssow_data.ssow}
                          onChange={this.handleInputssow(idx)}
                        />
                      </Col>
                      <Col md="4">
                        Service Code
                        <Input
                        key={ssow_data._id}
                          type="text"
                          placeholder={`Service Code #${idx + 1}`}
                          name={"service_code"}
                          defaultValue={ssow_data.service_code}
                          onChange={this.handleInputssow(idx)}
                        />
                      </Col>
                      <Col md="2">
                        QTY
                        <Input
                        key={ssow_data._id}
                          type="number"
                          placeholder={`QTY #${idx + 1}`}
                          name={"ssow_qty"}
                          defaultValue={ssow_data.ssow_qty}
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
                            defaultValue={all_data.total_price}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* pr status */}
                <Row>
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
                            defaultValue={all_data.pr_number}
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
                            defaultValue={all_data.pr_date}
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
                            defaultValue={all_data.pr_inserted_by}
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
                            defaultValue={all_data.po_number}
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
                            defaultValue={all_data.po_date}
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
                            defaultValue={all_data.po_inserted_by}
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
                            defaultValue={all_data.po_item}
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
                      <b>GR Information</b>
                    </h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>BAST No DP</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="BAST No DP"
                            name={"bast_no_dp"}
                            defaultValue={all_data.bast_no_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR DP</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Req GR DP"
                            name={"req_gr_dp"}
                            defaultValue={all_data.req_gr_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR by DP</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Req GR by DP"
                            name={"req_gr_by_dp"}
                            defaultValue={all_data.req_gr_by_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR Date DP</Label>
                        <Col sm={10}>
                          <Input
                            type="date"
                            placeholder="Req GR Date DP"
                            name={"req_gr_date_dp"}
                            defaultValue={all_data.req_gr_date_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req Revision DP</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Req Revision DP"
                            name={"req_revision_dp"}
                            defaultValue={all_data.req_revision_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Revision Done DP</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Revision Done DP"
                            name={"revision_done_dp"}
                            defaultValue={all_data.revision_done_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>BAST No Final</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="BAST No Final"
                            name={"bast_no_final"}
                            defaultValue={all_data.bast_no_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* gr information */}
                <Row>
                  <Col>
                    {/* <h5>GR Information</h5> */}
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Req GR Final</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Req GR Final"
                            name={"req_gr_final"}
                            defaultValue={all_data.req_gr_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR by Final</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Req GR by Final"
                            name={"req_gr_by_final"}
                            defaultValue={all_data.req_gr_by_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR Date Final</Label>
                        <Col sm={10}>
                          <Input
                            type="date"
                            placeholder=""
                            name={"req_gr_date_final"}
                            defaultValue={all_data.req_gr_date_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req Revision Final</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Req Revision Final"
                            name={"req_revision_final"}
                            defaultValue={all_data.req_revision_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Revision Done</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Area"
                            name={"revision_done_final"}
                            defaultValue={all_data.revision_done_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.updatePRT}
                >
                  <i className="fa fa-plus" style={{ marginRight: "8px" }}></i>{" "}
                  Update PRT
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

export default connect(mapStateToProps)(EditPRPO);
