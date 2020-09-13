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
import { getDatafromAPINODE, getDatafromAPINODEFile } from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class DetailFMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_data: [],
    };
    this.exportPRT = this.exportPRT.bind(this);
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
        }
      }
    );
  }

  async exportPRT() {
    const data_prt = this.state.all_data;
    const resFile = await getDatafromAPINODEFile('/erisitePodFile/getDocument/' + this.props.match.params.id, this.props.dataLogin.token, data_prt.file_document.mime_type);
    if(resFile !== undefined){
      saveAs(new Blob([resFile.data], {type:data_prt.file_document.mime_type}),  data_prt.file_document.system_name);
    }
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
                  onClick={this.exportPRT}
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
