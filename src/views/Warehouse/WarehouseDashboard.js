import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget from './Widget';
import './wh_css.css';
import axios from 'axios';

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

class WarehouseDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      img_0: "../../assets/icon/dashboard/order-received.png",
      img_1: "../../assets/icon/dashboard/order-received.png",
      img_2: "../../assets/icon/dashboard/order-processing.png",
      img_3: "../../assets/icon/dashboard/ready-to-deliver.png",
      img_4: "../../assets/icon/dashboard/joint-check.png",
      img_5: "../../assets/icon/dashboard/loading-process.png",
      img_6: "../../assets/icon/dashboard/dispatch.png",
      img_7: "../../assets/icon/dashboard/lom-status.png",
      img_8: "../../assets/icon/dashboard/lom-status.png",
      img_9: "../../assets/icon/dashboard/lom-status.png",
      order_created: 0,
      order_received: 0,
      order_processing: 0,
      ready_to_deliver: 0,
      joint_check: 0,
      loading_process: 0,
      material_dispatch: 0
    }
    
    this.updateHover1 = this.updateHover1.bind(this);
    this.getOrderCreated = this.getOrderCreated.bind(this);
    this.getOrderReceived = this.getOrderReceived.bind(this);
    this.getOrderProcessing = this.getOrderProcessing.bind(this);
    this.getReadyToDeliver = this.getReadyToDeliver.bind(this);
    this.getJointCheck = this.getJointCheck.bind(this);
    this.getLoadingProcess = this.getLoadingProcess.bind(this);
    this.getMaterialDispatch = this.getMaterialDispatch.bind(this);
  }

  updateHover0(hover, img) {
    this.setState({
      variant0: hover,
      img_0: img
    })
  }

  updateHover1(hover, img) {
    this.setState({
      variant1: hover,
      img_1: img
    })
  }

  updateHover2(hover, img) {
    this.setState({
      variant2: hover,
      img_2: img
    })
  }
  
  updateHover3(hover, img) {
    this.setState({
      variant3: hover,
      img_3: img
    })
  }

  updateHover4(hover, img) {
    this.setState({
      variant4: hover,
      img_4: img
    })
  }

  updateHover5(hover, img) {
    this.setState({
      variant5: hover,
      img_5: img
    })
  }

  updateHover6(hover, img) {
    this.setState({
      variant6: hover,
      img_6: img
    })
  }

  updateHover7(hover, img) {
    this.setState({
      variant7: hover,
      img_7: img
    })
  }

  updateHover8(hover, img) {
    this.setState({
      variant8: hover,
      img_8: img
    })
  }

  updateHover9(hover, img) {
    this.setState({
      variant9: hover,
      img_9: img
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
    document.title = 'Warehouse Dashboard | BAM';
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: username,
          password: password
        }
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  getOrderCreated() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_mr_status":"MR REQUESTED"}').then(res => {
      console.log("Order Created xx", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({order_created : items.length});
      }
    })
  }
  
  getOrderReceived() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_milestones":"MS_ORDER_RECEIVED"}').then(res => {
      console.log("Order Received", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({order_received : items.length});
      }
    })
  }

  getOrderProcessing() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_milestones":"MS_ORDER_PROCESSING"}').then(res => {
      console.log("Order Processing", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({order_processing : items.length});
      }
    })
  }

  getReadyToDeliver() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_milestones":"MS_READY_TO_DELIVER"}').then(res => {
      console.log("Ready To Deliver", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({ready_to_deliver : items.length});
      }
    })
  }

  getJointCheck() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_milestones":"MS_JOINT_CHECK"}').then(res => {
      console.log("Joint Check", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({joint_check : items.length});
      }
    })
  }

  getLoadingProcess() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_milestones":"MS_LOADING_PROCESS"}').then(res => {
      console.log("Loading Process", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({loading_process : items.length});
      }
    })
  }

  getMaterialDispatch() {
    this.getDataFromAPI('/mr_sorted_nonpage?where={"current_milestones":"MS_MATERIAL_DISPATCH"}').then(res => {
      console.log("Material Dispatch", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({material_dispatch : items.length});
      }
    })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#/order-created" onMouseEnter={() => this.updateHover0("", "../../assets/icon/dashboard/order-received-blue.png")} onMouseLeave={() => this.updateHover0("inverse", "../../assets/icon/dashboard/order-received.png")}>
              <Widget color="primary" variant={this.state.variant0} header={this.state.order_created} mainText="Order Created" smallText="The initial status of the MR after being approved by the supply team and ready to be processed by the warehouse." imageSource={this.state.img_0}/>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#/order-received" onMouseEnter={() => this.updateHover1("", "../../assets/icon/dashboard/order-received-blue.png")} onMouseLeave={() => this.updateHover1("inverse", "../../assets/icon/dashboard/order-received.png")}>
              <Widget color="primary" variant={this.state.variant1} header={this.state.order_received} mainText="Order Received" smallText="The initial status of the MR after being approved by the supply team and ready to be processed by the warehouse." imageSource={this.state.img_1}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/order-processing" onMouseEnter={() => this.updateHover2("", "../../assets/icon/dashboard/order-processing-blue.png")} onMouseLeave={() => this.updateHover2("inverse", "../../assets/icon/dashboard/order-processing.png")}>
              <Widget color="primary" variant={this.state.variant2} header={this.state.order_processing} mainText="Order Processing" smallText="The status in which the warehouse prepares the material and will send notification for the project team when there is lack of material." imageSource={this.state.img_2}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/ready-to-deliver" onMouseEnter={() => this.updateHover3("", "../../assets/icon/dashboard/ready-to-deliver-blue.png")} onMouseLeave={() => this.updateHover3("inverse", "../../assets/icon/dashboard/ready-to-deliver.png")}>
              <Widget color="primary" variant={this.state.variant3} header={this.state.ready_to_deliver} mainText="Ready To Deliver" smallText="The status after MR has been processed or in the warehouse staging area. The MR in this status should have either complete material or not complete confirmed by the project team." imageSource={this.state.img_3}/>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#/joint-check" onMouseEnter={() => this.updateHover4("", "../../assets/icon/dashboard/joint-check-blue.png")} onMouseLeave={() => this.updateHover4("inverse", "../../assets/icon/dashboard/joint-check.png")}>
              <Widget color="primary" variant={this.state.variant4} header={this.state.joint_check} mainText="Joint Check"  smallText="The status in which the warehouse team conduct a verification together with DSP and ASP to make sure that the MR will be delivered according to the plant specification." imageSource={this.state.img_4}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/loading-process" onMouseEnter={() => this.updateHover5("", "../../assets/icon/dashboard/loading-process-blue.png")} onMouseLeave={() => this.updateHover5("inverse", "../../assets/icon/dashboard/loading-process.png")}>
              <Widget color="primary" variant={this.state.variant5} header={this.state.loading_process} mainText="Loading Process" smallText="The status in which the MR will be delivered and has been loaded to the delivery truck. The DSP driver is only able to submit delivery information when the MR is in this status." imageSource={this.state.img_5}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/material-dispatch" onMouseEnter={() => this.updateHover6("", "../../assets/icon/dashboard/dispatch-blue.png")} onMouseLeave={() => this.updateHover6("inverse", "../../assets/icon/dashboard/dispatch.png")}>
              <Widget color="primary" variant={this.state.variant6} header={this.state.material_dispatch} mainText="Material Dispatch" smallText="The status after the DSP driver submitted the delivery information to the server and the MR is being delivered by the DSP." imageSource={this.state.img_6}/>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#" onMouseEnter={() => this.updateHover7("", "../../assets/icon/dashboard/tile-7-red.png")} onMouseLeave={() => this.updateHover7("inverse", "../../assets/icon/dashboard/lom-status.png")}>
              <Widget color="danger" variant={this.state.variant7} header="999" mainText="Material On Hold" imageSource={this.state.img_7}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#" onMouseEnter={() => this.updateHover8("", "../../assets/icon/dashboard/tile-7-red.png")} onMouseLeave={() => this.updateHover8("inverse", "../../assets/icon/dashboard/lom-status.png")}>
              <Widget color="danger" variant={this.state.variant8} header="999" mainText="Wait For Completed" imageSource={this.state.img_8}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#" onMouseEnter={() => this.updateHover9("", "../../assets/icon/dashboard/tile-7-red.png")} onMouseLeave={() => this.updateHover9("inverse", "../../assets/icon/dashboard/lom-status.png")}>
              <Widget color="danger" variant={this.state.variant9} header="999" mainText="Sent With LOM" imageSource={this.state.img_9}/>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WarehouseDashboard;