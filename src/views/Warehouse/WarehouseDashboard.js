import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget from './Widget';
import './wh_css.css';

class WarehouseDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variant1: "inverse",
      variant2: "inverse",
      variant3: "inverse",
      variant4: "inverse",
      variant5: "inverse",
      variant6: "inverse",
      variant7: "inverse",
      variant8: "inverse",
      variant9: "inverse",
      img_1: "../../assets/icon/dashboard/order-received.png",
      img_2: "../../assets/icon/dashboard/order-processing.png",
      img_3: "../../assets/icon/dashboard/ready-to-deliver.png",
      img_4: "../../assets/icon/dashboard/joint-check.png",
      img_5: "../../assets/icon/dashboard/loading-process.png",
      img_6: "../../assets/icon/dashboard/dispatch.png",
      img_7: "../../assets/icon/dashboard/lom-status.png",
      img_8: "../../assets/icon/dashboard/lom-status.png",
      img_9: "../../assets/icon/dashboard/lom-status.png",
    }
    
    this.updateHover1 = this.updateHover1.bind(this)
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

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#/order-received" onMouseEnter={() => this.updateHover1("", "../../assets/icon/dashboard/order-received-blue.png")} onMouseLeave={() => this.updateHover1("inverse", "../../assets/icon/dashboard/order-received.png")}>
              <Widget color="primary" variant={this.state.variant1} header="999" mainText="Order Received" imageSource={this.state.img_1}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/order-processing" onMouseEnter={() => this.updateHover2("", "../../assets/icon/dashboard/order-processing-blue.png")} onMouseLeave={() => this.updateHover2("inverse", "../../assets/icon/dashboard/order-processing.png")}>
              <Widget color="primary" variant={this.state.variant2} header="999" mainText="Order Processing" imageSource={this.state.img_2}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/ready-to-deliver" onMouseEnter={() => this.updateHover3("", "../../assets/icon/dashboard/ready-to-deliver-blue.png")} onMouseLeave={() => this.updateHover3("inverse", "../../assets/icon/dashboard/ready-to-deliver.png")}>
              <Widget color="primary" variant={this.state.variant3} header="999" mainText="Ready To Deliver" imageSource={this.state.img_3}/>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <a href="#/joint-check" onMouseEnter={() => this.updateHover4("", "../../assets/icon/dashboard/joint-check-blue.png")} onMouseLeave={() => this.updateHover4("inverse", "../../assets/icon/dashboard/joint-check.png")}>
              <Widget color="primary" variant={this.state.variant4} header="999" mainText="Joint Check" imageSource={this.state.img_4}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/loading-process" onMouseEnter={() => this.updateHover5("", "../../assets/icon/dashboard/loading-process-blue.png")} onMouseLeave={() => this.updateHover5("inverse", "../../assets/icon/dashboard/loading-process.png")}>
              <Widget color="primary" variant={this.state.variant5} header="999" mainText="Loading Process" imageSource={this.state.img_5}/>
            </a>
          </Col>
          <Col xs="12" sm="6" lg="4">
            <a href="#/material-dispatch" onMouseEnter={() => this.updateHover6("", "../../assets/icon/dashboard/dispatch-blue.png")} onMouseLeave={() => this.updateHover6("inverse", "../../assets/icon/dashboard/dispatch.png")}>
              <Widget color="primary" variant={this.state.variant6} header="999" mainText="Material Dispatch" imageSource={this.state.img_6}/>
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