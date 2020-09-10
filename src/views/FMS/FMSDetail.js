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

class DetailFMS extends Component {
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
    document.title = "POD Detail | BAM";
  }

  getPRTDetail(_id) {
    getDatafromAPINODE("/erisitePodFile/" + _id, this.props.dataLogin.token).then(
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
                  POD Detail
                </span> 
                
                &nbsp;&nbsp;&nbsp;
                <Button
                  style={{ marginRight: "8px", float: "right" }}
                  outline
                  color="info"
                  size="sm"
                  // onClick={this.exportPRT}
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  POD File
                </Button>
              </CardHeader>
              <CardBody>
                <Row >
                  <Col>
                    <h5><b>General Information</b></h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>POD ID</Label>
                        <Col sm={6}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"prt_id"}
                            value={all_data.no_pod}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      
                        
                        {all_data.cust_del !== undefined && all_data.cust_del !== null && all_data.cust_del.map((a, i) => (
                            <FormGroup row>
                            <Label sm={2}>CD ID {i+1}</Label>
                            <Col sm={6}>
                            <Input
                            readOnly
                            type="text"
                            //placeholder="Site ID"
                            name={"site_id"}
                            value={a.cd_id}
                            onChange={this.handleInput}
                            />
                            </Col>
                            </FormGroup>  
                        ))}                       
                                          
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

export default connect(mapStateToProps)(DetailFMS);
