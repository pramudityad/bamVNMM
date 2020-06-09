import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter, Redirect, Router } from 'react-router-dom';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { connect } from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';
import App from '../../App';
import './LoginSSO.css';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const API_URL_Node = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class SSOLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      userInfo: null,
      authenticated: false,
      dataLogin : null,
      token : null,
      authenticatedLoginBAM : null,
      authenticatedLoginBAMStatus : null,
    };
  }

  async postDatatoAPILogin(url, data){
    try {
      let respond = await axios.post(API_URL_Node +url, data, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async getDataLogin(keycloak, account_id){
    const dataReq = {
      "account_id" : account_id,
      "cas_id" : keycloak.sub,
      "data" : {
        "first_name" : keycloak.given_name,
        "last_name" : keycloak.family_name,
        "email" : keycloak.email,
        "username" : keycloak.preferred_username
      }
    }
    const getLogin = await this.postDatatoAPILogin('/loginUser', dataReq);
    if(getLogin.data !== undefined){
      localStorage.setItem('user_data_login', JSON.stringify(getLogin.data));
      this.setState({dataLogin : getLogin.data, token : getLogin.data.token});
      this.props.saveDataUser({
        "_id_user" : getLogin.data.validUser._id,
        "email_user" : getLogin.data.validUser.email,
        "roles_user" : getLogin.data.listRole,
        "user_name" : getLogin.data.validUser.username,
        "account_id" : account_id,
        "token" : getLogin.data.token,
        "sso_id" : keycloak.sub,
        "name" : getLogin.data.validUser.first_name+" "+getLogin.data.validUser.last_name
      });
      localStorage.setItem('keycloack_data_login', JSON.stringify(this.state.key));
      localStorage.setItem('authenticated_data_login', this.state.authenticated);
      localStorage.setItem('account_selected', account_id);
      this.setState({ key: this.state.key, authenticated: this.state.authenticated, authenticatedLoginBAM : true  });
    }else{
        this.setState({ key: this.state.key, authenticated: this.state.authenticated, authenticatedLoginBAM : false, authenticatedLoginBAMStatus : getLogin.response.data.error });
    }
  }

  loginKeycloack(){
    const keycloak = Keycloak('/keycloakBAMID.json');
    keycloak.init({onLoad: 'login-required',checkLoginIframe : false}).then(authenticated => {
      keycloak.loadUserInfo().then(userInfo => {
        this.setState({ key: keycloak, authenticated: authenticated, userInfo : userInfo});
        if(localStorage.getItem('user_data_login') === null){

        }else{
          this.getDatafromLocalStorage(keycloak, authenticated);
        }
      });
    })
  }

  componentDidMount() {
    this.loginKeycloack();
  }

  getDatafromLocalStorage(keycloak, authenticated){
    const dataLogin = JSON.parse(localStorage.getItem('user_data_login'));
    this.props.saveDataUser({
      "_id_user" : dataLogin.validUser._id,
      "email_user" : dataLogin.validUser.email,
      "roles_user" : dataLogin.listRole,
      "user_name" : dataLogin.validUser.username,
      "account_id" : localStorage.getItem('account_selected'),
      "token" : dataLogin.token,
      "sso_id" : keycloak.sub,
      "name" : dataLogin.validUser.first_name+" "+dataLogin.validUser.last_name
    });
    this.setState({dataLogin : dataLogin});
    this.setState({ key: keycloak, authenticated: authenticated }, () => {
      if(dataLogin === null){
        this.setState({authenticatedLoginBAM : null})
      }else{
        this.setState({authenticatedLoginBAM : true})
      }
    });
  }

  handleChangeAccount(account_id){
    this.setState({authenticatedLoginBAM : null});
    this.getDataLogin(this.state.userInfo, account_id);
  }

  render() {
    console.log("authenticatedLoginBAM", this.state.authenticatedLoginBAM,  this.state.authenticatedLoginBAMStatus)
    if(this.state.key !== null && this.state.key !== undefined && this.state.authenticatedLoginBAM === true){
      return(
        <App token={this.state.token} LoginData={this.state.dataLogin} keycloak={this.state.key} authenticatedBAM={this.state.authenticatedLoginBAM}/>
      )
    }

    if(this.state.key !== null && this.state.key !== undefined && (this.state.authenticatedLoginBAM === null || this.state.authenticatedLoginBAM === false)){
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <h4>Welcome to BAM</h4>
            </Row>
            <Row className="justify-content-center">
              <h3>Please Select Party :</h3>
            </Row>
            <Row className="justify-content-center">
              <Col md="12" lg="12" xl="12">
                <div className="flex--card-account" >
                  <div className="card-account--telkom" onClick={()=>this.handleChangeAccount("1")}>
                    <div>
                      <h2>PSI</h2>
                    </div>
                  </div>
                  <div className="card-account--xl" onClick={()=>this.handleChangeAccount("2")}>
                    <div>
                      <h2>P Demokrat</h2>
                    </div>
                  </div>
                  <div className="card-account--indosat" onClick={()=>this.handleChangeAccount("3")}>
                    <div>
                      <h2>PKS</h2>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {this.state.authenticatedLoginBAM === false && (
              <Row className="justify-content-center">
                <div className="card--error">
                  <h5>{this.state.authenticatedLoginBAMStatus}</h5>
                </div>
              </Row>
            )}
          </Container>
        </div>
      )
    }

    return (<div></div>)

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

export default connect(mapStateToProps, mapDispatchToProps)(SSOLogin);
