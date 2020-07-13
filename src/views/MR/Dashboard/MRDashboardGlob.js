import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget from './Widget';
import './wh_css.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Loading from '../../components/Loading'







class MRDashboardGlob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      variant0: "inverse",
      variant1: "inverse",
      variant2: "inverse",
      variant3: "inverse",
      variant4: "inverse",
      variant5: "inverse",
      variant6: "inverse",
      variant7: "inverse",
      variant8: "inverse",
      variant9: "inverse",
      variant10: "inverse",
      variant11: "inverse",
      img_1: "fa fa-warehouse",
      img_2: "fa fa-clipboard-list",
      img_3: "fa fa-arrow-right",
      img_4: "fa fa-box-open",
      img_5: "fa fa-truck-loading",
      img_6: "fa fa-truck-moving",
      img_7: "fa fa-stop-circle",
      img_8: "fa fa-stop-circle",
      img_9: "fa fa-stop-circle",
      img_10: "icon-arrow-up-circle",
      img_11: "icon-arrow-down-circle",
      order_received: 0,
      order_processing: 0,
      ready_to_deliver: 0,
      joint_check: 0,
      loading_process: 0,
      material_dispatch: 0,
      material_on_hold: 0,
      gi_count: 0,
      gr_count: 0,
      modal_loading: false,
    }

    this.updateHover1 = this.updateHover1.bind(this);
    this.getOrderCreated = this.getOrderCreated.bind(this);
    this.getOrderReceived = this.getOrderReceived.bind(this);
    this.getOrderProcessing = this.getOrderProcessing.bind(this);
    this.getReadyToDeliver = this.getReadyToDeliver.bind(this);
    this.getJointCheck = this.getJointCheck.bind(this);
    this.getLoadingProcess = this.getLoadingProcess.bind(this);
    this.getMaterialDispatch = this.getMaterialDispatch.bind(this);
    this.getMaterialOnHold = this.getMaterialOnHold.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  }

  updateHover1(hover) {
    this.setState({
      variant1: hover
    })
  }

  updateHover2(hover) {
    this.setState({
      variant2: hover
    })
  }

  updateHover3(hover) {
    this.setState({
      variant3: hover
    })
  }

  updateHover4(hover) {
    this.setState({
      variant4: hover
    })
  }

  updateHover5(hover) {
    this.setState({
      variant5: hover
    })
  }

  updateHover6(hover) {
    this.setState({
      variant6: hover
    })
  }

  updateHover7(hover) {
    this.setState({
      variant7: hover
    })
  }

  updateHover8(hover) {
    this.setState({
      variant8: hover
    })
  }

  updateHover9(hover) {
    this.setState({
      variant9: hover
    })
  }

  updateHover10(hover) {
    this.setState({
      variant10: hover
    })
  }

  updateHover11(hover) {
    this.setState({
      variant11: hover
    })
  }

  componentDidMount() {
    this.getOrderCreated();
    this.getOrderReceived();
    this.getOrderProcessing();
    this.getReadyToDeliver();
    this.getJointCheck();
    this.getLoadingProcess();
    this.getMaterialDispatch();
    this.getMaterialOnHold();
    this.getGICount()
    this.getGRCount()
    document.title = 'Material Request Dashboard | BAM';
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL + url, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: process.env.REACT_APP_username,
          password: process.env.REACT_APP_password
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

  async getDataFromAPINode(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
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

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL_NODE + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.tokenUser
        },
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

  getOrderCreated() {
    this.getDataFromAPI('/mr_op?where={"current_mr_status":"MR REQUESTED"}').then(res => {
      console.log("Order Created", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ order_created: items.total });
      }
    })
  }

  getOrderReceived() {
    this.getDataFromAPI('/mr_op?where={"current_mr_status": "MR APPROVED", "current_milestones":"MS_ORDER_RECEIVED"}').then(res => {
      console.log("Order Received", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ order_received: items.total });
      }
    })
  }

  getOrderProcessing() {
    this.getDataFromAPI('/mr_op?where={"current_mr_status": "ORDER PROCESSING START", "current_milestones": "MS_ORDER_RECEIVED"}').then(res => {
      console.log("Order Processing", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ order_processing: items.total });
      }
    })
  }

  getReadyToDeliver() {
    this.getDataFromAPI('/mr_op?where={"$or" : [{"current_mr_status": "LACK OF MATERIAL"}, {"current_mr_status": "LOM CONFIRMED (WAIT FOR COMPLETION)"}], "current_milestones": "MS_READY_TO_DELIVER"}').then(res => {
      console.log("Ready To Deliver", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ ready_to_deliver: items.total });
      }
    })
  }

  getJointCheck() {
    this.getDataFromAPI('/mr_op?where={"current_milestones": "MS_READY_TO_DELIVER"}').then(res => {
      console.log("Joint Check", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ joint_check: items.total });
      }
    })
  }

  getLoadingProcess() {
    this.getDataFromAPI('/mr_op?where={"current_milestones": "MS_JOINT_CHECK"}').then(res => {
      console.log("Loading Process", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ loading_process: items.total });
      }
    })
  }

  getMaterialDispatch() {
    this.getDataFromAPI('/mr_op?where={"$or" : [{"current_milestones": "MS_DISPATCH"}, {"current_milestones": "MS_LOADING_PROCESS", "current_mr_status": "LOADING PROCESS FINISH"}]}').then(res => {
      console.log("Material Dispatch", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ material_dispatch: items.total });
      }
    })
  }

  getMaterialOnHold() {
    this.getDataFromAPI('/mr_op?where={"current_mr_status":"LACK OF MATERIAL"}').then(res => {
      console.log("Material On Hold", res);
      if (res.data !== undefined) {
        const items = res.data._meta;
        this.setState({ material_on_hold: items.total });
      }
    })
  }

  getGICount() {
    this.getDataFromAPINODE('/matreq?q={"current_mr_status": "MR GI CONFIRMED (ASP)"}').then(res => {
      console.log("GI Count ", res);
      if (res.data !== undefined) {
        const items = res.data;
        this.setState({ gi_count: items.totalResults });
      }
    })
  }

  getGRCount() {
    this.getDataFromAPINODE('/matreq?q={"dsp_handover.location":"warehouse"}').then(res => {
      console.log("GR Count ", res);
      if (res.data !== undefined) {
        const items = res.data;
        this.setState({ gr_count: items.totalResults });
      }
    })
  }

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Loading isOpen={this.state.modal_loading}
            toggle={this.toggleLoading}
            className={"modal-sm modal--loading "}>
          </Loading>
          <Col xs="12" sm="6" lg="4">
            <a href="order-received" onMouseEnter={() => this.updateHover1("")} onMouseLeave={() => this.updateHover1("inverse")}>
              <Widget color="primary" variant={this.state.variant1} header={this.state.order_received} value={this.state.order_received} mainText="Order Received" smallText="The initial status of the MR after being approved by the supply team and ready to be processed by the warehouse." imageSource={this.state.img_1} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="order-processing" onMouseEnter={() => this.updateHover2("")} onMouseLeave={() => this.updateHover2("inverse")}>
              <Widget color="primary" variant={this.state.variant2} header={this.state.order_processing} value={this.state.order_processing} mainText="Order Processing" smallText="The status in which the warehouse prepares the material and will send notification for the project team when there is lack of material." imageSource={this.state.img_2} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="ready-to-deliver" onMouseEnter={() => this.updateHover3("")} onMouseLeave={() => this.updateHover3("inverse")}>
              <Widget color="primary" variant={this.state.variant3} header={this.state.ready_to_deliver} value={this.state.ready_to_deliver} mainText="Ready To Deliver" smallText="The status after MR has been processed or in the warehouse staging area. The MR in this status should have either complete material or not complete confirmed by the project team." imageSource={this.state.img_3} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="joint-check" onMouseEnter={() => this.updateHover4("")} onMouseLeave={() => this.updateHover4("inverse")}>
              <Widget color="primary" variant={this.state.variant4} header={this.state.joint_check} value={this.state.joint_check} mainText="Joint Check" smallText="The status in which the warehouse team conduct a verification together with DSP and ASP to make sure that the MR will be delivered according to the plant specification." imageSource={this.state.img_4} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="loading-process" onMouseEnter={() => this.updateHover5("")} onMouseLeave={() => this.updateHover5("inverse")}>
              <Widget color="primary" variant={this.state.variant5} header={this.state.loading_process} value={this.state.loading_process} mainText="Loading Process" smallText="The status in which the MR will be delivered and has been loaded to the delivery truck. The DSP driver is only able to submit delivery information when the MR is in this status." imageSource={this.state.img_5} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="material-dispatch" onMouseEnter={() => this.updateHover6("")} onMouseLeave={() => this.updateHover6("inverse")}>
              <Widget color="primary" variant={this.state.variant6} header={this.state.material_dispatch} value={this.state.material_dispatch} mainText="Material Dispatch" smallText="The status after the DSP driver submitted the delivery information to the server and the MR is being delivered by the DSP." imageSource={this.state.img_6} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#" onMouseEnter={() => this.updateHover7("")} onMouseLeave={() => this.updateHover7("inverse")}>
              <Widget color="danger" variant={this.state.variant7} header={this.state.material_on_hold} value={this.state.material_on_hold} mainText="Material On Hold" smallText="The status when the MR is in LOM and has not been confirmed by project whether to send with LOM or wait until it's completed" imageSource={this.state.img_7} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#" onMouseEnter={() => this.updateHover8("")} onMouseLeave={() => this.updateHover8("inverse")}>
              <Widget color="danger" variant={this.state.variant8} header="999" mainText="Wait For Completed" value="999" smallText="The status when the MR is in LOM and needs to wait until the materials are completed" imageSource={this.state.img_8} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#" onMouseEnter={() => this.updateHover9("")} onMouseLeave={() => this.updateHover9("inverse")}>
              <Widget color="danger" variant={this.state.variant9} header="999" mainText="Sent With LOM" value="999" smallText="The status when the MR is in LOM but the project decided to send with LOM" imageSource={this.state.img_9} />
            </a>
          </Col>
          {/*  */}
          <Col xs="12" sm="6" lg="4">
            <a href="wh-gr-ext" onMouseEnter={() => this.updateHover10("")} onMouseLeave={() => this.updateHover10("inverse")}>
              <Widget color="success" variant={this.state.variant10} header={this.state.gr_count} value={this.state.gr_count} mainText="GR" smallText="The amount of GR List on the project" imageSource={this.state.img_10} />
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="wh-gi-ext" onMouseEnter={() => this.updateHover11("")} onMouseLeave={() => this.updateHover11("inverse")}>
              <Widget color="warning" variant={this.state.variant11} header={this.state.gi_count} value={this.state.gi_count} mainText="GI" smallText="The amount of GI List on the project" imageSource={this.state.img_11} />
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData
  }
}

export default connect(mapStateToProps)(MRDashboardGlob);
