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
import navigationXL from '../../_navXL';
import navigationIndosat from '../../_navIndosat';
import navigationTelkom from '../../_navTelkom';
// routes config
import routesXL from '../../routesXL';
import routesIndosat from '../../routesIndosat';
import routesTelkom from '../../routesTelkom';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const LoaderPage = React.lazy(() => import('../../views/DefaultView/LoaderPage'));

const API_URL_BAM = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navMenu : this.props.dataLogin.account_id === "3" ? navigationIndosat : this.props.dataLogin.account_id === "1" ? navigationTelkom : navigationXL,
      routes : this.props.dataLogin.account_id === "3" ? routesIndosat : this.props.dataLogin.account_id === "1" ? routesTelkom : routesXL,
      userRole : this.props.dataLogin.role,
      minimize : this.props.SidebarMinimize,
      vendor_name : this.props.dataLogin.vendor_name,
      vendor_code : this.props.dataLogin.vendor_code,
    }
  }

  loadingPage = () => <LoaderPage />
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.keycloak.logout();
    localStorage.clear();
    this.props.history.push('/');
    this.postDatatoAPILogout();
  }

  componentDidMount(){
    this.showMenuByRole();
    if((this.state.userRole.findIndex(e => e === "BAM-ASP") !== -1 || this.state.userRole.findIndex(e => e === "BAM-ASP Management") !== -1) && this.state.userRole.findIndex(e => e === "Admin") === -1){
      const dataRoutesASP = this.state.routes.filter(e => e.roles !== undefined && e.roles.includes("BAM-ASP"));
      this.setState({routes : dataRoutesASP })
    }
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
    // console.log("showMenuByRole", this.state.navMenu);
    let rolesUser = this.props.dataLogin.role;
    let dataMenu = this.state.navMenu.items;
    let dataMenuRoles = [];
    if(this.state.vendor_code !== undefined && this.state.vendor_code !== null && this.state.vendor_code.length !== 0){
      rolesUser.push("BAM-ASP");
    }
    if(dataMenu !== undefined && dataMenu.length !== 0 && rolesUser.indexOf("Admin") === -1){
      for(let i = 0; i < dataMenu.length; i++){
        let dataMenuIndex = Object.assign({}, dataMenu[i])
        if(dataMenu[i].roles !== undefined){
          let allowed = dataMenu[i].roles.some(e => rolesUser.includes(e));
          if(allowed === false){
            // dataMenuIndex.splice(i,1);
          }else{
            dataMenuRoles.push(dataMenuIndex);
            if(dataMenu[i].children !== undefined && dataMenu[i].children.length > 0){
              for(let j = 0; j < dataMenu[i].children.length; j++){
                if(dataMenu[i].children[j].roles !== undefined){
                  let allowedChild = dataMenu[i].children[j].roles.some(e => rolesUser.includes(e));
                  if(allowedChild === false){
                    // dataMenuIndex.children.splice(j,1);
                    dataMenuIndex.children = dataMenuIndex.children.filter(e => e.name !== dataMenu[i].children[j].name);
                  }
                }
              }
            }
          }
        }
      }
      this.setState({navMenu : {items : dataMenuRoles}});
    }
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
              <AppSidebarNav navConfig={this.state.navMenu} {...this.props} router={router}/>
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          )}
          <main className="main">
            <AppBreadcrumb appRoutes={this.state.routes} router={router} className={"breadcrumb--"+this.props.dataLogin.account_id}/>
            <Container fluid>
              <Suspense fallback={this.loadingPage()}>
                <Switch>
                  {this.state.routes.map((route, idx) => {
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
                  {((this.state.userRole.includes("BAM-ASP") !== false || this.state.userRole.includes("BAM-ASP Management") !== false) && this.state.userRole.includes("Admin") === false) ? (
                    <Redirect from="/" to="/assignment-list-asp" />
                  ) : (
                    <Redirect from="/" to="/dashboard" />
                  )}
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
