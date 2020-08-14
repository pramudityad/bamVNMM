import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter, Redirect, Router } from 'react-router-dom';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { connect } from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';
import App from '../../App';
import './LoginSSO.css';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


class BlanKPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
    };
  }

  render() {
    return(<div></div>)
  }

}

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDataUser : (dataUser) => dispatch({type : ActionType.LOGIN_DATA, data_user : dataUser }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlanKPage);
