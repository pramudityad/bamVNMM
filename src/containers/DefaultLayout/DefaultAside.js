import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem,  } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import ActionType from "../../redux/reducer/globalActionType";

import { AppSwitch } from '@coreui/react'
import telenor from "../../assets/img/customer/Telenor_logo.png";
import mobifone from "../../assets/img/customer/logo-mobifone-1.png";
import {
  getDatafromAPITSEL,
  getDatafromAPIBHARTI,
  getDatafromAPI_PDB2,
  getDatafromAPINODE,
  postDatatoAPINODE,
  patchDatatoAPINODE,
} from "../../helper/asyncFunction";

const propTypes = {
  children: PropTypes.node,
};
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      tokenPDB: this.props.dataLogin.token_pdb,
      cas_id: this.props.dataLogin.sso_id,
      data_user : {}

    };
    this.toggeChangeAccount = this.toggeChangeAccount.bind(this)
    this.toggle = this.toggle.bind(this);

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggeChangeAccount(acc_no){
    console.log('acc_no', )
    postDatatoAPINODE('/logoutUser', {}, this.props.dataLogin.token).then((res) => {
      console.log(res)
      if(res.status === 200){
        const full_name = this.props.dataLogin.nameUser.split(" ")
        const tokenpdb = this.state.tokenPDB
        const casid = this.state.cas_id
        const dataReq = {
          access_token_vnmm: tokenpdb,
          account_id: acc_no,
          cas_id: casid,
          token_pdb: tokenpdb,
          data: {
            first_name: full_name[0],
            last_name: full_name[1],
            email: this.props.dataLogin.email,
            username: this.props.dataLogin.userName,
          },
        }
        postDatatoAPINODE('/loginUser', dataReq, {}).then((res2) => {
        localStorage.clear();

          if(res2.status === 200){
            console.log('res2',res2)
            localStorage.setItem("user_data_login", JSON.stringify(res2.data));
  
            // this.setState({data_user : res2.data})
            this.props.saveDataUser({
              token_pdb: this.state.tokenPDB,
              data_user: res2.data,
              _id_user: res2.data.validUser._id,
              email_user: res2.data.validUser.email,
              roles_user: res2.data.listRole,
              user_name: res2.data.validUser.username,
              account_id: acc_no,
              token: res2.data.token,
              sso_id: res2.data.validUser.sso_id,
              name:
                res2.data.validUser.first_name + " " + res2.data.validUser.last_name,
              vendor_code: null,
              vendor_name: null,
            });
          }         
        })
      }
    });
    // localStorage.clear();
    // window.location.reload();   
  }

  render() {
    
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              <i className="icon-speech"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '3' })}
                     onClick={() => {
                       this.toggle('3');
                     }}>
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ListGroup className="list-group-accent" tag={'div'}>
              <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Change Account</ListGroupItem>
              <ListGroupItem action tag="a" href="#" onClick={e => this.toggeChangeAccount("1")} className="list-group-item-accent-warning list-group-item-divider">
                <div className="avatar float-right">
                  <img className="img-avatar" src={telenor} alt="admin@bootstrapmaster.com"></img>
                </div>
               
                <div><strong>Telenor</strong></div>            
              </ListGroupItem>
              <ListGroupItem action tag="a" href="#" onClick={e => this.toggeChangeAccount("2")} className="list-group-item-accent-info list-group-item-divider">
                <div className="avatar float-right">
                  <img className="img-avatar" src={mobifone} alt="admin@bootstrapmaster.com"></img>
                </div>
                <div><strong>Mobifone</strong></div>
                
              </ListGroupItem>               
            </ListGroup>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    dataLogin : state.loginData,
    SidebarMinimize : state.minimizeSidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDataUser: (dataUser) =>
      dispatch({ type: ActionType.LOGIN_DATA, data_user: dataUser }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultAside);
