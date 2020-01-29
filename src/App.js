import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { connect } from 'react-redux';
import ActionType from './redux/reducer/globalActionType';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const API_URL_Node = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: null,
      userInfo: null,
      authenticated: false,
      dataLogin : null,
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
      "account_id" : "1",
      "cas_id" : keycloak.sub,
      "data" : {
        "first_name" : keycloak.given_name,
        "last_name" : keycloak.family_name,
        "email" : keycloak.email,
        "username" : keycloak.preferred_username
      }
    }
    const getLogin = await this.postDatatoAPILogin('/loginUser', dataReq)
    if(getLogin.data !== undefined){
      this.setState({dataLogin : getLogin.data});
      this.props.saveDataUser({
        "_id_user" : getLogin.data.validUser._id,
        "email_user" : getLogin.data.validUser.email,
        "roles_user" : getLogin.data.listRole,
        "user_name" : getLogin.data.validUser.username,
        "account_id" : "1",
        "token" : getLogin.data.token,
        "sso_id" : keycloak.sub,
        "name" : getLogin.data.validUser.first_name+" "+getLogin.data.validUser.last_name
      });
      return getLogin.data;
    }else{
      return undefined;
    }
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloakBAMID.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      keycloak.loadUserInfo().then(userInfo => {
        this.getDataLogin(userInfo).then(resLogin => {
          if(resLogin !== undefined){
            this.setState({ key: keycloak, authenticated: authenticated });
          }
        });
      });
    })
  }

  render() {
    if (this.state.key !== null) {
      if (this.state.authenticated){
        this.state.key.loadUserInfo().then(userInfo => {
          console.log("this.state.key", this.state.key);
        });
        return (
          <BrowserRouter>
              <React.Suspense fallback={loading()}>
                <Switch>
                  <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                  <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                  <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                  <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                  <Route path="/" name="Home" render={props => <DefaultLayout {...props} keycloak={this.state.key} dataLogin={this.state.dataLogin}/>} />
                </Switch>
              </React.Suspense>
          </BrowserRouter>
        );
      }else return (<div>Unable to authenticate!</div>)
    }
    return (<div></div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
