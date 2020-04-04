import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter, Redirect, Router } from 'react-router-dom';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { connect } from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';
import App from '../../App';

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

  async getDataLogin(keycloak){
    const dataReq = {
      "account_id" : "2",
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
        "account_id" : "2",
        "token" : getLogin.data.token,
        "sso_id" : keycloak.sub,
        "name" : getLogin.data.validUser.first_name+" "+getLogin.data.validUser.last_name
      });
      return getLogin.data;
    }else{
      return undefined;
    }
  }

  loginKeycloack(){
    const keycloak = Keycloak('/keycloakBAMID.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      keycloak.loadUserInfo().then(userInfo => {
        if(localStorage.getItem('user_data_login') === null){
          this.getDataLogin(userInfo).then(resLogin => {
            if(resLogin !== undefined){
              localStorage.setItem('keycloack_data_login', JSON.stringify(keycloak));
              localStorage.setItem('authenticated_data_login', authenticated);
              this.setState({ key: keycloak, authenticated: authenticated });
            }else{
              this.setState({ key: keycloak, authenticated: authenticated, authenticatedLoginBAM : false });
            }
          });
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
      "account_id" : "3",
      "account_id" : "xl",
      "token" : dataLogin.token,
      "sso_id" : keycloak.sub,
      "name" : dataLogin.validUser.first_name+" "+dataLogin.validUser.last_name
    });
    this.setState({dataLogin : dataLogin});
    this.setState({ key: keycloak, authenticated: authenticated }, () => {
      if(dataLogin === null){
        this.setState({authenticatedLoginBAM : false})
      }
    });
  }

  render() {
    if((this.state.key !== null || this.state.key !== undefined)  && this.state.authenticatedLoginBAM === false){
      console.log("authenticatedLoginBAM", this.state.key, this.state.authenticatedLoginBAM);
      return <Redirect to="/LoginError" />
      // this.setState({authenticatedLoginBAM : null});
    }
    if(this.state.key !== null && this.state.key !== undefined){
      return(
        <App token={this.state.token} LoginData={this.state.dataLogin} keycloak={this.state.key} authenticated={this.state.authenticated}/>
      )
    }

    return ( <div></div>)
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
