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
import { Link } from "react-router-dom";
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import Loading from "../components/Loading";
import { getDatafromAPINODE, getDatafromAPINODEFile, getDatafromAPIISAT, patchDatatoAPINODE } from "../../helper/asyncFunction";

const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

class DetailFMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_data: [],
      cd_id_data : [],
      ready_to_sync_true : [],
      action_message : null,
    };
    this.exportPRT = this.exportPRT.bind(this);
    this.ReadyToSync = this.ReadyToSync.bind(this);
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
          this.setState({ all_data: res.data.data }, () => {
            if(res.data.data.cust_del !== undefined){
              this.getDataCDID(res.data.data.cust_del.map(cd => cd.cd_id), res.data.data.source_ms_date );
            }
          });
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

  async getDataCDID(array_cd_id, source_ms_date){
    let array_in_cdid = '"'+array_cd_id.join('", "')+'"';
    let projection = '&projection={"WP_ID" : 1, "CD_Info_Project_Name" : 1, "'+source_ms_date+'" : 1}'
    const getWPID = await getDatafromAPIISAT('/custdel_sorted?where={"WP_ID":{"$in" : ['+array_in_cdid+']}}'+projection);
    if(getWPID !== undefined && getWPID.data !== undefined) {
      const dataCD_ID = getWPID.data._items;
      let dataArrayTrue = [];
      this.setState({ cd_id_data : getWPID.data._items}, () => {
        for(let i = 0; i < dataCD_ID.length; i++){
          const dataCDID = dataCD_ID[i];
          if(dataCDID[source_ms_date] !== undefined && dataCDID[source_ms_date] !== null && dataCDID[source_ms_date].length > 0){
            dataArrayTrue.push(true);
            this.setState({ready_to_sync_true : dataArrayTrue})
          }
        }
      });
    }
  }

  viewCDIDTable(cd_id, sync_status, status_erisite, source_ms_date){
    const dataCDID = this.state.cd_id_data.find(cd => cd.WP_ID === cd_id);
    if(dataCDID !== undefined){
      let dataArrayTrue = this.state.ready_to_sync_true;
      return(
        <tr>
          <td>{cd_id}</td>
          <td>{dataCDID.CD_Info_Project_Name}</td>
          <td>{dataCDID[source_ms_date]}</td>
          <td>{sync_status}</td>
          <td>{status_erisite}</td>
        </tr>
      )
    }else{
      return (
        <tr>
          <td>{cd_id}</td>
          <td></td>
          <td></td>
        </tr>
      )
    }
  }

  async ReadyToSync(){
    const dataSync = await patchDatatoAPINODE('/erisitePodFile/readyToSync/'+this.props.match.params.id, {}, this.props.dataLogin.token);
    if(dataSync !== undefined && dataSync.data !== undefined){
      this.setState({action_status : 'success'})
    }else{
      this.setState({action_status : 'failed'})
    }
  }

  render() {
    console.log()
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
                        <Label sm={2}>Project</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"project"}
                            value={all_data.project_name}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>POD ID</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"prt_id"}
                            value={all_data.no_pod}
                            onChange={this.handleInput}
                          />
                        </Col>
                        <Label sm={2}>Status</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"status"}
                            value={all_data.status}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Sync Status</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"status"}
                            value={all_data.sync_status}
                          />
                        </Col>
                        <Label sm={2}>Erisite Status</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"status"}
                            value={all_data.status_erisite}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site ID</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"site_id"}
                            value={all_data.site_info !== undefined && all_data.site_info.map(si => si.site_id)}
                            onChange={this.handleInput}
                          />
                        </Col>
                        <Label sm={2}>Site Name</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            //placeholder="POD ID"
                            name={"site_name"}
                            value={all_data.site_info !== undefined && all_data.site_info.map(si => si.site_name)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Milestone</Label>
                        <Col sm={4}>
                          <Input
                          readOnly
                            type="text"
                            name={"project"}
                            value={all_data.ms_target}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                    <Table responsive striped bordered size="sm">
                      <thead>
                        <tr>
                          <th>WP ID</th>
                          <th>Project</th>
                          <th>{all_data.source_ms_date}</th>
                          <th>Status</th>
                          <th>Erisite Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {all_data.cust_del !== undefined && all_data.cust_del !== null && all_data.cust_del.map((a, i) =>
                          this.viewCDIDTable(a.cd_id, a.sync_status, a.status_erisite, all_data.source_ms_date)
                        )}
                      </tbody>
                    </Table>
                    </Col>
                  </Row>
              </CardBody>
              <CardFooter>
              {(all_data.status === "POD FILE SAVED" || all_data.status === "FILE SAVED") && (
                <Fragment>
                {this.state.cd_id_data.length !== 0 && (
                  <Button color={this.state.ready_to_sync_true.length !== all_data.cust_del.length ? "warning" : "success"} size="sm" onClick={this.ReadyToSync} disabled={this.state.ready_to_sync_true.length !== all_data.cust_del.length}>
                    {this.state.ready_to_sync_true.length !== all_data.cust_del.length ? "Can't Sync to erisite because "+all_data.source_ms_date+" from some WP ID not yet filled" : "Ready to Sync" }
                  </Button>
                )}
                </Fragment>
              )}
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

export default connect(mapStateToProps)(DetailFMS);
