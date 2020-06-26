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
import { Link } from "react-router-dom";
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import Loading from "../components/Loading";
import { getDatafromAPINODE } from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class DetailPRPO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_data: [],
    };
    // bind
  }
  // function

  componentDidMount() {
    this.getPRTDetail(this.props.match.params.id);
    document.title = "PRT Detail | BAM";
  }

  getPRTDetail(_id) {
    getDatafromAPINODE("/prt/getPrt/" + _id, this.props.dataLogin.token).then(
      (res) => {
        if (res.data !== undefined) {
          this.setState({ all_data: res.data.data });
          console.log("getPRTDetail ", this.state.all_data);
        }
      }
    );
  }

  exportPRT = async () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const data_prt = this.state.all_data;
    let indexSSOW = 7;

    let headerRow = ["prt_id", "site_id", "site_name", "quotation_number", "signum_pm", "approval_by", "project_name", "area", "purchase_group","asp_name","term_of_payment","network_number","activity_code","action_point","currency","current_status","approval_status","approval_date","total_price","pr_number","pr_date", "pr_inserted_by", "po_number","po_date","po_inserted_by","po_item","bast_no_dp","req_gr_dp","req_gr_by_dp","req_gr_date_dp","req_revision_dp","revision_done_dp", "bast_no_final", "req_gr_final", "req_gr_by_final", "req_gr_date_final","req_revision_final","revision_done_final", "SSOW_List"];

    // data_prt.SSOW_List.map((e, idx) => headerRow.push("ssow_" + (e.sow_type.toLowerCase()) + "_id_" + (idx + 1).toString(), "ssow_" + (e.sow_type.toLowerCase()) + "_activity_number_" + (idx + 1).toString(), "ssow_" + (e.sow_type.toLowerCase()) + "_unit_" + (idx + 1).toString(), "ssow_" + (e.sow_type.toLowerCase()) + "_quantity_" + (idx + 1).toString()));

    let dataPRT = [data_prt.prt_id, data_prt.site_id, data_prt.site_name, data_prt.quotation_number, data_prt.signum_pm, data_prt.approval_by, data_prt.project_name, data_prt.area, data_prt.purchase_group, data_prt.asp_name, data_prt.term_of_payment, data_prt.network_number, data_prt.activity_code, data_prt.action_point, data_prt.currency, data_prt.current_status, data_prt.approval_status, data_prt.approval_date, data_prt.total_price, data_prt.pr_number, data_prt.pr_date, data_prt.pr_inserted_by, data_prt.po_number, data_prt.po_date, data_prt.po_inserted_by, data_prt.po_item, data_prt.bast_no_dp, data_prt.req_gr_dp, data_prt.req_gr_by_dp, data_prt.req_gr_date_dp, data_prt.req_revision_dp, data_prt.revision_done_dp, data_prt.bast_no_final, data_prt.req_gr_final, data_prt.req_gr_by_final, data_prt.req_gr_date_final, data_prt.req_revision_final, data_prt.revision_done_final];
    // data_prt.SSOW_List.map(e => dataPRT.push(e.ssow_id, e.ssow_activity_number, e.ssow_unit, e.ssow_qty));

    ws.addRow(headerRow);
    ws.addRow(dataPRT);

    const MRFormat = await wb.xlsx.writeBuffer();
    saveAs(new Blob([MRFormat]), 'Assignment ' + data_prt.prt_id + ' Template.xlsx');
  }

  render() {
    const { all_data } = this.state;
    return (
      <div className="animated fadeIn">
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif
              actionMessage={this.state.action_message}
              actionStatus={this.state.action_status}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i
                    className="fa fa-info-circle"
                    style={{ marginRight: "8px" }}
                  ></i>
                  PRT Detail ({all_data.prt_id})
                </span>
                <Link to={'/prt-list/edit/' + all_data._id}>
                <Button
                  style={{ marginRight: "8px", float: "right" }}                  
                  color="warning"
                  size="sm"
                >
                  <i
                    className="fas fa-edit"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Edit
                </Button>
                </Link>
                
                &nbsp;&nbsp;&nbsp;
                <Button
                  style={{ marginRight: "8px", float: "right" }}
                  outline
                  color="info"
                  size="sm"
                  onClick={this.exportPRT}
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  PRT Format
                </Button>
              </CardHeader>
              <CardBody>
                <Row >
                  <Col>
                    <h5><b>General Information</b></h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>PRT ID</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="PRT ID"
                            name={"prt_id"}
                            value={all_data.prt_id}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site ID</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Site ID"
                            name={"site_id"}
                            value={all_data.site_id}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site Name</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Site Name"
                            name={"site_name"}
                            value={all_data.site_name}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Quotation Number</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Quotation Number"
                            name={"quotation_number"}
                            value={all_data.quotation_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Signum PM</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Signum PM"
                            name={"signum_pm"}
                            value={all_data.signum_pm}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Approval By</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Select Approval by"
                            name={"approval_by"}
                            value={all_data.approval_by}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Project Name</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            name="project_name"                            
                            value={all_data.project_name}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Area</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Area"
                            name={"area"}
                            value={all_data.area}
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
                    <h5><b>PRPO Information</b></h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Purchase Group</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Purchase Group"
                            name={"purchase_group"}
                            value={all_data.purchase_group}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>ASP Name</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="ASP Name"
                            name={"asp_name"}
                            value={all_data.asp_name}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Term of Payment</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder=""
                            name={"term_of_payment"}
                            value={all_data.term_of_payment}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Network Number</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Network Number"
                            name={"network_number"}
                            value={all_data.network_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Activity Code</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Activity Code"
                            name={"activity_code"}
                            value={all_data.activity_code}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Action Point</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Action Point"
                            name={"action_point"}
                            value={all_data.action_point}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Currency</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Currency"
                            name={"currency"}
                            value={all_data.currency}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* ssow */}
                <h5><b>SSOW Detail</b></h5>
                {/* <Button color="primary" size="sm" onClick={this.addSSOW}>
                  <i className="fa fa-plus">&nbsp;</i> SSOW
                </Button> */}
                <Row>
                  <Col md="12">
                    <Table
                      striped
                      size="sm"
                      className="assignment-list__table--center-non-border"
                    >
                      <thead>
                        <tr>
                          <th>SSOW</th>
                          <th>Service Code</th>
                          <th>Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                      {all_data.SSOW_List !== undefined && all_data.SSOW_List.map((ssow_data, idx) => (
                          <tr key={ssow_data._id}>
                          <td>{ssow_data.ssow}</td>
                          <td>{ssow_data.service_code}</td>
                          <td>{ssow_data.ssow_qty}</td>
                          </tr>
                      ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <FormGroup row>
                  <Label sm={2}>Total Price</Label>
                  <Col sm={10}>
                    <Input
                    readOnly
                      type="text"
                      //placeholder="Total Price"
                      name={"total_price"}
                      value={all_data.total_price}
                      onChange={this.handleInput}
                    />
                  </Col>
                </FormGroup>
                {/* pr status */}
                <Row>
                  <Col>
                    <h5><b>PR Status</b></h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>PR Number</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="PR Number"
                            name={"pr_number"}
                            value={all_data.pr_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PR Date</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="date"
                            //placeholder="PR Date"
                            name={"pr_date"}
                            value={all_data.pr_date}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PR Inserted By</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="PR Inserted By"
                            name={"pr_inserted_by"}
                            value={all_data.pr_inserted_by}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Number</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="PO Number"
                            name={"po_number"}
                            value={all_data.po_number}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Date</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="date"
                            //placeholder="PO Date"
                            name={"po_date"}
                            value={all_data.po_date}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Inserted By</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="PO Inserted By"
                            name={"po_inserted_by"}
                            value={all_data.po_inserted_by}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>PO Item</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="PO Item"
                            name={"po_item"}
                            value={all_data.po_item}
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
                    <h5><b>GR Information</b></h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>BAST No DP</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="BAST No DP"
                            name={"bast_no_dp"}
                            value={all_data.bast_no_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR DP</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="checkbox"
                            //placeholder="Req GR DP"
                            name={"req_gr_dp"}
                            value={all_data.req_gr_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR by DP</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Req GR by DP"
                            name={"req_gr_by_dp"}
                            value={all_data.req_gr_by_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR Date DP</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="date"
                            //placeholder="Req GR Date DP"
                            name={"req_gr_date_dp"}
                            value={all_data.req_gr_date_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req Revision DP</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="checkbox"
                            //placeholder="Req Revision DP"
                            name={"req_revision_dp"}
                            value={all_data.req_revision_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Revision Done DP</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="checkbox"
                            //placeholder="Revision Done DP"
                            name={"revision_done_dp"}
                            value={all_data.revision_done_dp}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>BAST No Final</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="BAST No Final"
                            name={"bast_no_final"}
                            value={all_data.bast_no_final}
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
                          readOnly
                            type="checkbox"
                            //placeholder="Req GR Final"
                            name={"req_gr_final"}
                            value={all_data.req_gr_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR by Final</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="Req GR by Final"
                            name={"req_gr_by_final"}
                            value={all_data.req_gr_by_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req GR Date Final</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="date"
                            //placeholder=""
                            name={"req_gr_date_final"}
                            value={all_data.req_gr_date_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Req Revision Final</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="checkbox"
                            //placeholder="Req Revision Final"
                            name={"req_revision_final"}
                            value={all_data.req_revision_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Revision Done</Label>
                        <Col sm={10}>
                          <Input
                          readOnly
                            type="checkbox"
                            //placeholder="Area"
                            name={"revision_done_final"}
                            value={all_data.revision_done_final}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter></CardFooter>
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

export default connect(mapStateToProps)(DetailPRPO);
