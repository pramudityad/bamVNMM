import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import {connect} from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';
import axios from 'axios';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const LoaderPage = React.lazy(() => import('../../views/DefaultView/LoaderPage'));

const API_URL_BAM = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navMenu : navigation,
      minimize : this.props.SidebarMinimize,
    }
  }

  loadingPage = () => <LoaderPage />
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/');
    this.postDatatoAPILogout();
    this.props.keycloak.logout();
  }

  componentDidMount(){
    this.showMenuByRole();
  }

  async postDatatoAPILogout(){
    try {
      let respond = await axios.post(API_URL_BAM+'/logoutUser', {}, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.props.dataLogin.token,
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

  showMenuByRole(){
    console.log("showMenuByRole", navigation);
  }

  componentDidUpdate(){
    if(this.state.minimize !== this.props.SidebarMinimize){
      this.setState({minimize : this.props.SidebarMinimize});
    }
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {this.state.minimize !== true ? (
            <AppSidebar fixed display="lg" minimized={false}>
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
              <AppSidebarNav navConfig={this.state.navMenu} {...this.props} router={router}/>
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          ) : (
            <AppSidebar fixed display="lg" minimized={true}>
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          )}
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} className="breadcrumb--xl"/>
            <Container fluid>
              <Suspense fallback={this.loadingPage()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

export default connect(mapStateToProps)(DefaultLayout);
