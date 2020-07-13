import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter, FormText} from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
//import './boqtssr.css';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { thisTypeAnnotation } from '@babel/types';
import './boqtssr.css';
import Select from 'react-select';
import { connect } from 'react-redux';

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class TSSRbyTech extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        list_boq_tech : [],
        list_boq_tech_selection : [],
        list_boq_tssr : [],
        boq_tech_selected : null,
        boq_tech_API : null,
        boq_tech_sites_API : [],
        boq_tssr_API : null,
        action_status : null,
        action_message : null,
        modal_loading : false,
        redirectSign : false,

        site_tssr : [],
        prevPage : 1,
        activePage : 1,
        totalData : 0,
        perPage : 20,
        headerTable : {"product_type" : [], "product_name" : []},
        progress_note : false,
        progress_data : 0,
        progress_count : 0,
        progress_failed : 0,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);

    this.handleChangeTech = this.handleChangeTech.bind(this);
    this.prepareTSSR = this.prepareTSSR.bind(this);
    this.saveTSSRBoq = this.saveTSSRBoq.bind(this);
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(process.env.REACT_APP_API_URL +url, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Get Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Get Data", err);
      return respond;
    }
  }

  async postDatatoAPI(url, data){
    try {
      let respond = await axios.post(process.env.REACT_APP_API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Post Data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Post Data", err);
      return respond;
    }
  }

  async patchDatatoAPI(url, data, _etag){
    try {
      let respond = await axios.patch(process.env.REACT_APP_API_URL +url, data, {
        headers : {'Content-Type':'application/json'},
        auth: {
          username: usernamePhilApi,
          password: passwordPhilApi
        },
        headers : {
          "If-Match" : _etag
        },
      })
      if(respond.status >= 200 && respond.status < 300){
        console.log("respond Patch data", respond);
      }
      return respond;
    }catch (err) {
      let respond = undefined;
      this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
      console.log("respond Patch data", err);
      return respond;
    }
  }

  numberToAlphabet(number){
    const num = Number(number)+1
    if(num > 26){
      let mod = (num%26 + 9).toString(36).toUpperCase();
      return 'Z'+mod;
    }else{
      return (num + 9).toString(36).toUpperCase();
    }
  }

  toggleLoading(){
    this.setState(prevState => ({
      modal_loading: !prevState.modal_loading
    }));
  }

  getListTssr(){
    const projection = 'projection={"_id" : 1, "id_boq_tech_doc" : 1}';
      this.getDatafromAPI('/tssr_boq_matrix_sorted_non_page?'+projection+'&where={"rev" : "A"}').then(res => {
      if(res !== undefined){
          if(res.data !== undefined){
              const items = res.data._items;
              const totalData = res.data._meta;
              this.setState({ list_boq_tssr : items}, () => {
                this.getListTech();
              });
          }
      }
  })
}

  getListTech(){
    const projection = 'projection={"_id" : 1, "no_boq_tech" : 1}';
    this.getDatafromAPI('/boq_tech_sorted_non_page?'+projection).then(res => {
        if(res !== undefined){
            if(res.data !== undefined){
                let items = res.data._items
                if(items.length !== 0){
                  const idTechTssr  = this.state.list_boq_tssr.map(e => e.id_boq_tech_doc);
                  items = items.filter(e => idTechTssr.includes(e._id) !== true);
                }
                const totalData = res.data._meta;
                this.prepareListTech(items);
                //this.setState({ list_boq_tech : items});
            }
        }
    })
  }

  prepareListTech(ListApi){
    const ListProject = []
    ListApi.map(p =>
      ListProject.push({'label' : p.no_boq_tech, 'value' : p._id})
    )
    this.setState({list_boq_tech_selection : ListProject});
  }

  handleChangeTech=(e)=>{
    const value = e.value;
    this.setState({boq_tech_selected : value}, () => {
        this.getTechBoq(value);
    });
  }

  getTechBoq(_id){
    this.toggleLoading();
    const embedded='?embedded={"created_by" : 1, "updated_by" : 1, "list_of_id_site" : 1}';
    this.getDatafromAPI('/boq_tech_audit/'+_id+embedded).then(res => {
        if(res !== undefined){
            if(res.data !== undefined){
                const items = res.data;
                const totalData = res.data._meta;
                console.log("test data lala");
                this.setState({ boq_tech_API : items},() => {
                  if(items.list_of_id_site !== undefined){
                    if(items.list_of_id_site.length !== 0){
                      console.log("test data");
                      this.setState({boq_tech_sites_API : items.list_of_id_site});
                      this.viewTechTssr(items.list_of_id_site);
                    }else{
                      this.setState({ action_status : 'failed', action_message : 'Please Select Other Tech BOQ, there error in technical BOQ', site_tssr : []}, () => {
                        this.toggleLoading();
                      })
                    }
                  }else{
                    this.setState({ action_status : 'failed', action_message : 'Please Select Other Tech BOQ, there error in technical BOQ', site_tssr : []}, () => {
                      this.toggleLoading();
                    })
                  }
                });
            }else{
              this.setState({ action_status : 'failed'}, () => {
                this.toggleLoading();
              })
            }
        }else{
          this.setState({ action_status : 'failed'}, () => {
            this.toggleLoading();
          })
        }
    })
  }

  componentDidMount(){
    this.getListTssr();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  viewTechTssr(items){
    let techSite = items;
    let onlyItem = techSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    const dataHeaderID = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    const dataHeaderPPID = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
    const dataHeaderName = [...new Set(onlyItem.map(({ package_name}) => package_name))];
    const dataHeaderType = [...new Set(onlyItem.map(({ product_type}) => product_type))];
    for(let i = 0; i < techSite.length; i++){
        let list_of_qty = [];
        for(let j = 0; j < dataHeaderID.length; j++){
            let getPP = techSite[i].list_of_site_items.find( e => e.id_pp_doc === dataHeaderID[j]);
            if(getPP !== undefined){
                list_of_qty.push(getPP.qty);
            }else{
                list_of_qty.push(0);
            }
        }
        techSite[i]["list_of_qty"] = list_of_qty;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName}
    this.setState({headerTable : headerTable, site_tssr : techSite});
    this.toggleLoading();
  }

  async prepareTSSR(){
    let countTSSR = await this.getDatafromAPI('/amounttssrboq/5d24454a951c58496433be19');
    if(countTSSR === undefined){countTSSR["data"] = undefined}
    if(countTSSR.data !== undefined){
        let countTSSRdata = countTSSR.data.tssr_boq_data;
        let updateCount = await this.patchDatatoAPI('/amounttssrboq/5d24454a951c58496433be19', {"tssr_boq_data" : countTSSRdata+1}, countTSSR.data._etag );
        if(updateCount === undefined){updateCount = {}; updateCount["data"] = undefined}
        if(updateCount.data !== undefined){
            return countTSSRdata+1;
        }else{
            return undefined;
        }
    }else{
        return undefined;
    }
  }

  async saveTSSRBoq(){
    this.toggleLoading();
    if(this.state.boq_tech_API.project_name === null){
      this.setState({ action_message : "This Technical BOQ not yet have Project, You can't make tssr from it", action_status : 'failed' });
      this.toggleLoading();
    }else{
      this.setState({ progress_note : true, progress_count : 0});
      const count = await this.prepareTSSR();
      // const cekTech = await this.patchDatatoAPI('')
      if(count !== undefined){
        const date = new Date();
        const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        const ID_TSSR = "TSSRBOQ-"+date.getFullYear().toString().substr(-2)+(date.getMonth()+1).toString().padStart(2, '0')+date.getDate().toString().padStart(2, '0')+"-"+count.toString().padStart(4, '0');
        const BOQTssr = {
            "id_boq_tech_doc" : this.state.boq_tech_API._id,
            "no_boq_tech" : this.state.boq_tech_API.no_boq_tech,
            "no_tssr_boq" : ID_TSSR,
            "rev" : "PA",
            "rev_by" : this.state.userEmail,
            "rev_date" : DateNow.toString(),
            "created_by" : this.state.userId,
            "updated_by" : this.state.userId,
            "id_project_doc" : this.state.boq_tech_API.id_project_doc,
            "project_name" : this.state.boq_tech_API.project_name,
            "version" : "0",
            "deleted" : 0,
            "created_on" : DateNow.toString()
        }
        this.setState({progress_count : 10})
        let postTSSR = await this.postDatatoAPI('/tssr_boq_matrix_op', BOQTssr);
        if(postTSSR === undefined){postTSSR["data"] = undefined}
        if(postTSSR.data !== undefined){
            this.saveTSSRSite(postTSSR.data._id, BOQTssr.no_tssr_boq, postTSSR.data._etag, this.state.boq_tech_API.id_project_doc, this.state.boq_tech_API.project_name)
        }else{
          this.setState({action_status : 'failed'}, () => {
            this.toggleLoading();
          })
        }
      }else{
        this.setState({action_status : 'failed'}, () => {
          this.toggleLoading();
        })
      }
    }
  }

  async saveTSSRSite(_id_tssr, no_tssr, _etag_tssr, _id_project_tssr, project_name_tssr){
    const date = new Date();
    const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    const dataSites = this.state.boq_tech_sites_API;
    let dataSitesTSSR = [];
    let postTSSRSites = null;
    let count_progress = 10;
    let count_total = Math.ceil(80 / dataSites.length);
    for(let i = 0; i < dataSites.length; i++){
        let siteIndex = Object.assign({}, dataSites[i]);
        siteIndex["id_tssr_boq_doc"] = _id_tssr;
        siteIndex["no_tssr_boq"] = no_tssr;
        siteIndex["no_tssr_boq_site"] = no_tssr+"-"+(parseInt(i)+1);
        siteIndex["id_boq_tech_doc"] = this.state.boq_tech_API._id;
        siteIndex["no_boq_tech"] = this.state.boq_tech_API.no_boq_tech;
        siteIndex["id_project_doc"] = _id_project_tssr;
        siteIndex["project_name"] = project_name_tssr;
        siteIndex["created_on"] = DateNow.toString();
        siteIndex["updated_on"] = DateNow.toString();
        let SiteItem = []
        for(let j  = 0; j < siteIndex.list_of_site_items.length; j++){
            let itemIndex = siteIndex.list_of_site_items[j];
            itemIndex["ericsson_allocated"] = 0;
            itemIndex["qty_quotation_allocated"] = 0;
            itemIndex["smart_allocated"] = 0;
            SiteItem.push(itemIndex);
            if(itemIndex.status !== undefined){
              delete itemIndex.status;
            }
        }
        if(siteIndex.tssr_boq_id !== undefined){
          delete siteIndex.tssr_boq_id;
        }
        if(siteIndex.id_allocation_doc !== undefined){
          delete siteIndex.id_allocation_doc;
        }
        delete siteIndex.list_of_qty;
        delete siteIndex.version;
        delete siteIndex._etag;
        delete siteIndex._id;
        siteIndex["list_of_site_items"] = SiteItem;
        dataSitesTSSR.push(siteIndex);
        count_progress = count_progress + count_total;
        this.setState({progress_count : count_progress});
    }
    console.log("dataSitesTSSR", JSON.stringify(dataSitesTSSR));
    postTSSRSites = await this.postDatatoAPI('/tssr_boq_matrix_sites_op', dataSitesTSSR);
    if(postTSSRSites === undefined){postTSSRSites = {}; postTSSRSites["data"] = undefined;}
    if(postTSSRSites.data !== undefined){
      this.setState({progress_count : 100});
        let dataUpdateTssr = [];
        if(postTSSRSites.data._items !== undefined){
            dataUpdateTssr = {
            "list_of_id_site" : postTSSRSites.data._items.map(e => e._id)
          }
        }else{
            dataUpdateTssr = {
                "list_of_id_site" : [postTSSRSites.data._id]
            }
        }
        let updateTech = await this.patchDatatoAPI('/tssr_boq_matrix_op/'+_id_tssr, dataUpdateTssr, _etag_tssr);
        if(updateTech === undefined){updateTech["data"] = undefined}
        if(updateTech.data !== undefined){
          this.setState({action_status : 'success', action_message : "Your TSSR BOQ Has Been saved "}, () => {
            this.toggleLoading();
            // setTimeout(function(){ this.setState({ redirectSign : updateTech.data._id}); }.bind(this), 3000);
          });
        }else{
          this.setState({action_status : 'failed'}, () => {
            this.toggleLoading();
          })
        }
    }else{
      let action_message = null;
      this.setState({action_status : 'failed',action_message : action_message}, () => {
        this.toggleLoading();
      })
    }
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/detail-tssr-matix/'+this.state.redirectSign} />);
    }

    const selectStylesZindex3 = {
      container: (base, state) => ({
        ...base,
        zIndex: "3"
      })
    };
    function AlertProcess(props){
      const alert = props.alertAct;
      const message = props.messageAct;
      if(alert == 'failed'){
        return (
          <div className="alert alert-danger" role="alert">
            {message !== null ? message : 'Sorry, there was an error when we tried to save it, please reload your page and try again try again'}
          </div>
        )
      }else{
        if(alert == 'success'){
          return (
            <div className="alert alert-success" role="alert">
              {message} <br />
               Page will reload automatically
            </div>
          )
        }else{
          return (
            <div></div>
          )

        }
      }
    }

    return (
      <div>
        <AlertProcess alertAct={this.state.action_status} messageAct={this.state.action_message}/>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            {this.state.site_tssr.length !== 0 ? (
              <React.Fragment>
                <span style={{'position':'absolute',marginTop:'8px'}}>TSSR BOQ MATRIX</span>
                <div className="card-header-actions" style={{marginRight:'5px'}} disabled={this.state.boq_tech_API.project_name === null}>
                  <Button color="success" onClick={this.saveTSSRBoq}>Select & Save</Button>
                </div>
              </React.Fragment>
            ) : (<span>TSSR BOQ MATRIX</span>)}
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <table style={{width : '100%', marginBottom : '10px'}} className="table-header">
              <tbody>
                <tr>
                  <td style={{width : '125px'}}>Technical BOQ Identifier</td>
                  {/* <td>: &nbsp;
                    <select onChange={this.handleChangeTech} values={this.state.boq_tech_selected} style={{minWidth : '150px'}}>
                    <option value={null}>{null}</option>
                    {this.state.list_boq_tech.map( tec =>
                        <option value={tec._id}>{tec.no_boq_tech}</option>
                    )}
                    </select>
                  </td> */}
                  <td style={{width : '300px'}}>
                    <Select
                        options={this.state.list_boq_tech_selection}
                        onChange={this.handleChangeTech}
                        styles={selectStylesZindex3}
                      />
                  </td>
                  <td style={{width : '25%'}}></td>
                  <td style={{width : '25%'}}></td>
                </tr>
              </tbody>
            </table>
            <div class='divtable'>
            <table hover bordered striped responsive size="sm" class='fixed'>
                <thead>
                    <tr>
                        <th class="fixedheadtssrnew fixleft1tssrnew"  style={{textAlign : 'center', verticalAlign : 'middle'}}>Project</th>
                        <th class="fixedheadtssrnew fixleft2tssrnew"  style={{verticalAlign : 'middle'}}>Site ID</th>
                        <th class="fixedheadtssrnew fixleft3tssrnew"  style={{textAlign : 'center', verticalAlign : 'middle'}}>Site Name</th>
                        {this.state.headerTable.product_name.map(ht =>
                            <th class="fixedhead3" rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle', minWidth : '150px'}}>{ht}</th>
                        )}
                        {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                    </tr>
                    <tr>
                        {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.site_tssr.map((tssr,i) =>
                        <tr key={tssr._id} class='fixbody'>
                            <td class="datareg fixleft1tssrnew" style={{verticalAlign : 'middle', textAlign : "center"}}>{this.state.boq_tech_API.project_name}</td>
                            <td class="datareg fixleft2tssrnew" style={{verticalAlign : 'middle'}}>{tssr.site_id}</td>
                            <td class="datareg fixleft3tssrnew" style={{verticalAlign : 'middle', textAlign : "center"}}>{tssr.site_name}</td>
                            {tssr.list_of_qty.map(qty =>
                                <td class="datareg" style={{verticalAlign : 'middle', textAlign : "center"}}>{qty}</td>
                            )}
                            {/* <td style={{verticalAlign : 'middle', textAlign : "center"}}></td> */}
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            <nav>
                <div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.perPage}
                    totalItemsCount={this.state.totalData.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </div>
            </nav>
          </CardBody>
        </Card>
        </Col>
        </Row>
        <div>
        </div>
        {/* Modal Loading */}
        <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
            <ModalBody>
              <div style={{textAlign : 'center'}}>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>
              <div style={{textAlign : 'center'}}>
                Loading ...
              </div>
              <div style={{textAlign : 'center'}}>
                System is processing ...
              </div>
              {this.state.progress_note !== false ? (
              <div style={{textAlign : 'center'}}>
                {this.state.progress_count + '%'}
              </div>
              ) : ""}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Loading */}
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

export default connect(mapStateToProps)(TSSRbyTech);
