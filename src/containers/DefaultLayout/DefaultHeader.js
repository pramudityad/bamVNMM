import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import './font-awesome-animation.min.css';
import axios from 'axios';
import {connect} from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/ERI_horizontal_RGB.svg';
import sygnet from '../../assets/img/brand/ECON_RGB.svg';
import '../../assets/fontawesome/css/all.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const API_URL = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const username = 'bamidadmin@e-dpm.com';
const password = 'F760qbAg2sml';

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      account: this.props.dataLogin.account_id === "1" ? "Telenor" : "Mobifone",
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      vendor_name : this.props.dataLogin.vendor_name,
      vendor_code : this.props.dataLogin.vendor_code,
      order_created : [],
      rtd : [],
      userRole: this.props.dataLogin.role,
    }

    this.getOrderCreated = this.getOrderCreated.bind(this);
    this.getRTD = this.getRTD.bind(this);
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
    let whereAnd = '{"current_mr_status": "MR REQUESTED"}';
    this.getDataFromAPI('/mr_sorted_nonpage?where='+whereAnd).then(res => {
      console.log("Order Created", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({order_created : items});
      }
    })
  }

  getRTD() {
    let whereAnd = '{"current_mr_status": "RTD REQUESTED"}';
    this.getDataFromAPI('/mr_sorted_nonpage?where='+whereAnd).then(res => {
      console.log("RTD", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        this.setState({rtd : items});
      }
    })
  }

  componentDidMount() {
    if((this.state.userRole.indexOf("BAM-ASP") !== -1 || this.state.userRole.indexOf("BAM-ASP Management") !== -1) && this.state.userRole.indexOf("Admin") === -1){

    }else{
      // this.getOrderCreated();
      // this.getRTD();
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <h2><span class="badge badge-secondary">{this.props.dataLogin.account_id === "1" ? "Telenor" : "Mobifone"}</span></h2>

        {(this.state.userRole.indexOf("BAM-ASP Management") !== 1 && this.state.userRole.indexOf("Admin") !== -1) && (
          <React.Fragment>
          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            </NavItem>
          </Nav>
          </React.Fragment>
        ) }
        <Nav className="ml-auto" navbar>
        {(this.state.userRole.indexOf("BAM-ASP Management") !== 1 && this.state.userRole.indexOf("Admin") !== -1) && (
          <React.Fragment>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className={this.state.order_created.length === 0 ? "fa fa-envelope" : "fa fa-envelope faa-ring animated"}></i>{this.state.order_created.length !== 0 && (<Badge pill color="danger">{this.state.order_created.length}</Badge>)}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Order Created</strong></DropdownItem>
              {
                this.state.order_created.length === 0 ?
                (<DropdownItem><center><i className="fa fa-check" style={{color:"green"}}></i>No Order Created</center></DropdownItem>) :
                this.state.order_created.map((list, i) => <Link to={'/order-created'}><DropdownItem><i className="fa fa-exclamation" style={{color:"red"}}></i>{list.mr_id} - {list.project_name}</DropdownItem></Link>)
              }
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className={this.state.rtd.length === 0 ? "fa fa-warning" : "fa fa-warning faa-ring animated"}></i>{this.state.rtd.length !== 0 && (<Badge pill color="danger">{this.state.rtd.length}</Badge>)}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Confirmation Go / No Go</strong></DropdownItem>
              {
                this.state.rtd.length === 0 ?
                (<DropdownItem><center><i className="fa fa-check" style={{color:"green"}}></i>No Requested RTD</center></DropdownItem>) :
                this.state.rtd.map((list, i) => <Link to={'/ready-to-deliver'}><DropdownItem><i className="fa fa-exclamation" style={{color:"red"}}></i>{list.mr_id} - {list.project_name}</DropdownItem></Link>)
              }
            </DropdownMenu>
          </UncontrolledDropdown>
          </React.Fragment>
        ) }
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.props.dataLogin.nameUser}
            </DropdownToggle>
            <DropdownMenu right>
              {/*}<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(DefaultHeader);
