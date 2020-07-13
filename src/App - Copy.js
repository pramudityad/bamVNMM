import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter, Redirect, Router } from 'react-router-dom';
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
const LogError = React.lazy(() => import('./views/Pages/LogError'));



class SSOLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      userInfo: null,
      authenticated: false,
      dataLogin : null,
      authenticatedLoginBAM : null,
    };
  }

  async postDatatoAPILogin(url, data){
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE +url, data, {
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
      this.setState({dataLogin : getLogin.data});
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
              this.setState({ key: keycloak, authenticated: authenticated, authenticatedLoginBAM : false }, () => {
                return (<BrowserRouter><Redirect to={'/LoginError'} /></BrowserRouter>);
              });

              // this.setState({ key: keycloak, authenticated: authenticated });
              // keycloak.logout();
            }
          });
        }else{
          this.getDatafromLocalStorage(keycloak, authenticated);
        }
      });
    })
  }

  // componentDidMount() {
  //   this.loginKeycloack();
  // }

  getDatafromLocalStorage(keycloak, authenticated){
    const dataLogin = JSON.parse(localStorage.getItem('user_data_login'));
    this.props.saveDataUser({
      "_id_user" : dataLogin.validUser._id,
      "email_user" : dataLogin.validUser.email,
      "roles_user" : dataLogin.listRole,
      "user_name" : dataLogin.validUser.username,
      "account_id" : "2",
      "token" : dataLogin.token,
      "sso_id" : keycloak.sub,
      "name" : dataLogin.validUser.first_name+" "+dataLogin.validUser.last_name,
      "sso_data" : keycloak
    });
    this.setState({dataLogin : dataLogin});
    this.setState({ key: keycloak, authenticated: authenticated }, () => {
      if(dataLogin === null){
        this.setState({authenticatedLoginBAM : false});
      }
    });
  }

  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState(() => ({
  //       redirectToReferrer: true
  //     }))
  //   })
  // }
  render() {
    if(this.state.authenticatedLoginBAM === false){
      return <Redirect to="/LoginError" />
    }
    console.log("LOGIN COK", this.props.location);
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    // const { redirectToReferrer } = this.state
    //
    // if (redirectToReferrer === true) {
    //   return <Redirect to={from} />
    // }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

connect(mapStateToProps, mapDispatchToProps)(SSOLogin)

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/LoginSSO',
//           state: { from: props.location }
//         }} />
//   )} />
// )

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
      let respond = await axios.post(process.env.REACT_APP_API_URL_NODE +url, data, {
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
    console.log("get again");
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
    console.log("getLogin", getLogin);
    if(getLogin.data !== undefined){
      localStorage.setItem('user_data_login', JSON.stringify(getLogin.data));
      this.setState({dataLogin : getLogin.data});
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
              this.setState({ key: keycloak, authenticated: authenticated }, () => {
                return (<BrowserRouter><Redirect to={'/LoginError'} /></BrowserRouter>);
              });

              // this.setState({ key: keycloak, authenticated: authenticated });
              // keycloak.logout();
            }
          });
        }else{
          this.getDatafromLocalStorage(keycloak, authenticated);
        }
      });
    })
  }

  // componentDidMount() {
  //   this.loginKeycloack();
  // }

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
        console.log("local");
        return (<BrowserRouter><Redirect to={'/LoginError'} /></BrowserRouter>);
      }
    });
  }

  render() {
    console.log("data Login key", this.state.key);
    console.log("data Login auth", this.state.authenticated);
    console.log("data Login", this.state.dataLogin);
    // if(this.state.key !== null && this.state.authenticated && this.state.dataLogin === null ){
    //   return (<BrowserRouter>
    //     <React.Suspense fallback={loading()}>
    //     <Route exact path="/LoginError" name="Login Error" render={props => <LogError {...props} keycloak={this.state.key}/>} />
    //     <Redirect to={'/LoginError'} />
    //     </React.Suspense>
    //   </BrowserRouter>);
    // }
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/LoginError" name="Login Error" render={props => <LogError {...props} keycloak={this.state.key}/>} />
              {this.props.dataLogin.token === null ? (
                <Route path="/" name="Login SSO" render={props => <SSOLogin {...props}/>}/>
              ) : (
                <Route path="/" name="Home" render={props => <DefaultLayout {...props} keycloak={this.state.key} dataLogin={this.state.dataLogin}/>} />
              )}

            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
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
