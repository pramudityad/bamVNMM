import React, { Component } from "react";
import axios from "axios";
import Keycloak from "keycloak-js";
import { connect } from "react-redux";
import ActionType from "../../redux/reducer/globalActionType";
import App from "../../App";
import "./LoginSSO.css";
import { Button, Col, Container, Row } from "reactstrap";
import telenor from "../../assets/img/customer/Telenor_logo.png";
import mobifone from "../../assets/img/customer/logo-mobifone-1.png";


import ericssonLogoBlack from "../../assets/img/brand/ERI_horizontal_RGB_BLACK.svg";
import { CollectionsBookmark } from "@material-ui/icons";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

class SSOLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      userInfo: null,
      authenticated: false,
      dataLogin: null,
      token: null,
      token_pdb: null,
      authenticatedLoginBAM: null,
      authenticatedLoginBAMStatus: null,
    };
    this.signOut = this.signOut.bind(this);
  }

  signOut(e) {
    e.preventDefault();
    this.state.key.logout();
    localStorage.clear();
    this.props.history.push("/");
    this.postDatatoAPILogout();
  }

  async postDatatoAPILogin(url, data) {
    try {
      let respond = await axios.post(
        process.env.REACT_APP_API_URL_NODE + url,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ",
          },
        }
      );
      if (respond.status >= 200 && respond.status < 300) {
        console.log("respond Post Data", respond);
      }
      return respond;
    } catch (err) {
      let respond = err;
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async getDataLogin(keycloak, account_id, token_pdb) {
    console.log('token_pdb ', token_pdb)
    const dataReq = {
      access_token_vnmm: token_pdb,
      account_id: account_id,
      cas_id: keycloak.sub,
      token_pdb: token_pdb,
      data: {
        first_name: keycloak.given_name,
        last_name: keycloak.family_name,
        email: keycloak.email,
        username: keycloak.preferred_username,
      },
    };
    const getLogin = await this.postDatatoAPILogin("/loginUser", dataReq);
    if (getLogin.data !== undefined) {
      localStorage.setItem("user_data_login", JSON.stringify(getLogin.data));
      this.setState({ dataLogin: getLogin.data, token: getLogin.data.token });
      let role_user = getLogin.data.listRole;
      if (
        getLogin.data.validUser.vendor_code !== undefined &&
        getLogin.data.validUser.vendor_code !== null &&
        getLogin.data.validUser.vendor_code.length !== 0
      ) {
        role_user.push("BAM-ASP");
      }
      this.props.saveDataUser({
        data_user: getLogin.data,
        _id_user: getLogin.data.validUser._id,
        email_user: getLogin.data.validUser.email,
        roles_user: role_user,
        user_name: getLogin.data.validUser.username,
        account_id: account_id,
        token: getLogin.data.token,
        sso_id: keycloak.sub,
        name:
          getLogin.data.validUser.first_name +
          " " +
          getLogin.data.validUser.last_name,
        vendor_code: getLogin.data.validUser.vendor_code,
        vendor_name: getLogin.data.validUser.vendor_name,
      });
      // console.log("getLogin.data", getLogin.data.validUser.vendor_code);
      localStorage.setItem(
        "keycloack_data_login",
        JSON.stringify(this.state.key)
      );
      localStorage.setItem(
        "authenticated_data_login",
        this.state.authenticated
      );
      localStorage.setItem("account_selected", account_id);
      this.setState({
        key: this.state.key,
        authenticated: this.state.authenticated,
        authenticatedLoginBAM: true,
      });
    } else {
      console.log("getLoginerror", getLogin);
      this.setState({
        key: this.state.key,
        authenticated: this.state.authenticated,
        authenticatedLoginBAM: false,
        authenticatedLoginBAMStatus: getLogin.response.data.error,
      });
    }
  }

  loginKeycloack() {
    const keycloak = Keycloak("/keycloakBAMID.json");
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        // console.log('ini ray',keycloak.token)
        keycloak.loadUserInfo().then((userInfo) => {
          this.setState({
            key: keycloak,
            authenticated: authenticated,
            userInfo: userInfo,
            token_pdb: keycloak.token,
          });
          if (localStorage.getItem("user_data_login") === null) {
          } else {
            console.log('getDatafromLocalStorage')
            this.getDatafromLocalStorage(keycloak, authenticated, this.state.token_pdb);
          }
        });
      });
  }

  componentDidMount() {
    this.loginKeycloack();
  }

  getDatafromLocalStorage(keycloak, authenticated, token_pdb) {
    const dataLogin = JSON.parse(localStorage.getItem("user_data_login"));
    let role_user = dataLogin.listRole;
    if (
      dataLogin.validUser.vendor_code !== undefined &&
      dataLogin.validUser.vendor_code !== null &&
      dataLogin.validUser.vendor_code.length !== 0
    ) {
      role_user.push("BAM-ASP");
    }
    this.props.saveDataUser({
      token_pdb: token_pdb,
      data_user: dataLogin,
      _id_user: dataLogin.validUser._id,
      email_user: dataLogin.validUser.email,
      roles_user: role_user,
      user_name: dataLogin.validUser.username,
      account_id: localStorage.getItem("account_selected"),
      token: dataLogin.token,
      sso_id: keycloak.sub,
      name:
        dataLogin.validUser.first_name + " " + dataLogin.validUser.last_name,
      vendor_code: dataLogin.validUser.vendor_code,
      vendor_name: dataLogin.validUser.vendor_name,
    });
    // console.log("getLogin.data", dataLogin.validUser.vendor_code);
    this.setState({ dataLogin: dataLogin });
    this.setState({ key: keycloak, authenticated: authenticated }, () => {
      if (dataLogin === null) {
        this.setState({ authenticatedLoginBAM: null });
      } else {
        this.setState({ authenticatedLoginBAM: true });
      }
    });
  }

  handleChangeAccount(account_id) {
    this.setState({ authenticatedLoginBAM: null });
    this.getDataLogin(this.state.userInfo, account_id, this.state.token_pdb);
  }

  render() {
    if (
      this.state.key !== null &&
      this.state.key !== undefined &&
      this.state.authenticatedLoginBAM === true
    ) {
      return (
        <App
          token={this.state.token}
          LoginData={this.state.dataLogin}
          keycloak={this.state.key}
          authenticatedBAM={this.state.authenticatedLoginBAM}
        />
      );
    }

    if (
      this.state.key !== null &&
      this.state.key !== undefined &&
      (this.state.authenticatedLoginBAM === null ||
        this.state.authenticatedLoginBAM === false)
    ) {
      return (
        <React.Fragment>
          <div className="app flex-row align-items-center page--select-account">
            <Container className="background-container--login-page">
              <Row
                style={{
                  display: "flex",
                  "justify-content": "space-between",
                  width: "inherit",
                  paddingLeft: "25px",
                }}
              >
                <Button
                  size="sm"
                  onClick={this.signOut}
                  style={{
                    float: "left",
                    marginRight: "auto",
                    height: "20px",
                    padding: "0px 5px 0px 5px",
                  }}
                >
                  <i class="fa fa-sign-out"></i>
                  Logout
                </Button>
                <img
                  src={ericssonLogoBlack}
                  alt="Ericsson logo"
                  style={{ width: "170px", float: "right", marginLeft: "auto" }}
                />
              </Row>
              <Row className="justify-content-center">
                <span style={{ fontWeight: "900", fontSize: "25px" }}>
                  Welcome to BAM
                </span>
              </Row>
              <Row className="justify-content-center">
                <h3>Please Select Account :</h3>
              </Row>
              <Row className="justify-content-center">
                <Col md="6" lg="6" xl="6">
                  <div className="flex--card-account">
                    <div
                      className="card-account--telkom"
                      onClick={() => this.handleChangeAccount("1")}
                    >
                      <div>
                        <img
                          src={telenor}
                          alt="telenor logo"
                          style={{ width: "50%" }}
                        />
                        {/* <h2>VN MM</h2> */}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="6" xl="6">
                  <div className="flex--card-account">
                    <div
                      className="card-account--telkom"
                      onClick={() => this.handleChangeAccount("2")}
                    >
                      <div>
                        <img
                          src={mobifone}
                          alt="mobifone logo"
                          style={{ width: "50%" }}
                        />
                        {/* <h2>Mobifone</h2> */}
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
        </React.Fragment>
      );
    }

    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDataUser: (dataUser) =>
      dispatch({ type: ActionType.LOGIN_DATA, data_user: dataUser }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SSOLogin);
