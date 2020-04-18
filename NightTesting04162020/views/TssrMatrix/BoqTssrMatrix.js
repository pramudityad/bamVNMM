import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";
// import './boqTechnical.css';
import ReactExport from 'react-data-export';
import Excel from 'exceljs/modern.browser';
import { saveAs } from 'file-saver';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

class BoqTssrMatrix extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Tech_All : [],
        site_tssr : [],
        site_tssr_all : [],
        tssrchecked : new Map(),
        list_project : [],
        project_select : null,
        prevPage : 1,
        activePage : 1,
        totalData : 0,
        perPage : 20,
        userRole : JSON.parse(localStorage.getItem('user_Roles')),
        headerTable : {"product_type" : [], "product_name" : []}
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeChecklist = this.handleChangeChecklist.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.viewTSSRReport = this.viewTSSRReport.bind(this);
    this.TSSRReport = this.TSSRReport.bind(this);
    this.xlsExportMatrix = this.xlsExportMatrix.bind(this);
  }

  async getDatafromAPI(url){
    try {
      let respond = await axios.get(API_URL +url, {
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
      let respond = await axios.post(API_URL +url, data, {
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
      let respond = await axios.patch(API_URL +url, data, {
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

  getListSites(){
    const page = this.state.activePage;
    const project = this.state.project_select;
    let where = '';
    if(project !== null && project !== 'All' ){
        where = 'where={"id_project_doc" : "'+this.state.project_select+'"}&'
    }else{
        where = ''
    }
    this.getDatafromAPI('/tssr_boq_matrix_sorted?'+where+'max_results='+this.state.perPage+'&page='+page).then(res => {
        if(res !== undefined){
            if(res.data !== undefined){
                const items = res.data._items;
                const totalData = res.data._meta;
                this.setState({ totalData : totalData, prevPage : this.state.activePage}, () => {
                    this.viewTSSRReport(items);
                    this.getListSitesAll();
                });
            }
        }
    })
  }

  getListSitesAll(){
    const project = this.state.project_select;
    let where = '';
    if(project !== null && project !== 'All' ){
        where = 'where={"id_project_doc" : "'+this.state.project_select+'"}'
    }else{
        where = ''
    }
    this.getDatafromAPI('/tssr_boq_matrix_sorted_non_page?'+where).then(res => {
        if(res !== undefined){
            if(res.data !== undefined){
                const items = res.data._items;
                const totalData = res.data._meta;
                this.setState({ site_tssr_all : items});
            }
        }
    })
  }

  getListProject(){
    this.getDatafromAPI('/project_all').then( resp => {
      if(resp !== undefined){
        this.setState({list_project : resp.data._items});
      }
    })
  }

  handleChangeChecklist(e){
    const tssr = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ tssrchecked: prevState.tssrchecked.set(tssr, isChecked) }));
  }

  handleChangeProject=(e)=>{
    const value = e.target.value;
    console.log('value', value);
    this.setState({project_select : value, site_tssr : [], totalData : 0, prevPage : 1, activePage : 1, tssrchecked : new Map()}, () => {
        this.getListSites();
    });
  }

  componentDidMount(){
    // this.getListSites();
    this.getListProject();
  }

  componentDidUpdate(){
    if(this.state.prevPage !== this.state.activePage){
      this.getListSites();
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  viewTSSRReport(items){
    let tssrSite = items;
    let onlyItem = tssrSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    console.log("onlyItem", onlyItem);
    const dataHeaderID = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    const dataHeaderPPID = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
    const dataHeaderName = [...new Set(onlyItem.map(({ package_name}) => package_name))];
    const dataHeaderType = [...new Set(onlyItem.map(({ product_type}) => product_type))];
    for(let i = 0; i < tssrSite.length; i++){
        let list_of_qty = [];
        for(let j = 0; j < dataHeaderID.length; j++){
            let getPP = tssrSite[i].list_of_site_items.find( e => e.id_pp_doc === dataHeaderID[j]);
            if(getPP !== undefined){
                list_of_qty.push(getPP.qty);
            }else{
                list_of_qty.push(0);
            }
        }
        tssrSite[i]["list_of_qty"] = list_of_qty;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName}
    this.setState({headerTable : headerTable, site_tssr : tssrSite})
    console.log("tssrSite", tssrSite);
  }

  TSSRReport(items){
    let tssrSite = items;
    let onlyItem = tssrSite.map(value => value.list_of_site_items.map(child => child)).reduce((l, n) => l.concat(n), []);
    console.log("onlyItem", onlyItem);
    const dataHeaderID = [...new Set(onlyItem.map(({ id_pp_doc}) => id_pp_doc))];
    const dataHeaderPPID = [...new Set(onlyItem.map(({ pp_id}) => pp_id))];
    const dataHeaderName = [...new Set(onlyItem.map(({ package_name}) => package_name))];
    const dataHeaderType = [...new Set(onlyItem.map(({ product_type}) => product_type))];
    for(let i = 0; i < tssrSite.length; i++){
        let list_of_qty = [];
        for(let j = 0; j < dataHeaderID.length; j++){
            let getPP = tssrSite[i].list_of_site_items.find( e => e.id_pp_doc === dataHeaderID[j]);
            if(getPP !== undefined){
                list_of_qty.push(getPP.qty);
            }else{
                list_of_qty.push(0);
            }
        }
        tssrSite[i]["list_of_qty"] = list_of_qty;
    }
    let headerTable = {"product_type" : dataHeaderType, "product_name" : dataHeaderName, "site_tssr" : tssrSite};
    console.log("tssrSite", tssrSite);
    return headerTable;
  }

  async xlsExportMatrix(){
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    const header = this.state.headerTable;
    const tssrSite = this.state.site_tssr;
    const tssrSiteAll = this.state.site_tssr_all;
    const tssrCheck = this.state.tssrchecked;

    let keyChecked = [];

    let headerRow1 = ["", "", ""];
    let headerRow2 = ["TSSR ID", "Site ID", "Site Name"];

    for (const [key, value] of tssrCheck.entries()) {
      if(value === true){
        keyChecked.push(key);
      }
    }

    if(keyChecked.length !== 0){
      let tssrAllChecked = tssrSiteAll.filter(e => keyChecked.includes( e._id) == true);
      console.log("tssrAllChecked", tssrAllChecked);
      
      let dataPrint = await this.TSSRReport(tssrAllChecked);
      let tssrSiteChecked = dataPrint.site_tssr;

      dataPrint.product_name.map( e => headerRow2.push(e));
      ws.addRow(headerRow1);
      ws.addRow(headerRow2);
      for(let i = 0; i < tssrSiteChecked.length; i++){
        let dataSiteIdx = ["TSSBOM190925000"+(i+1), tssrSiteChecked[i].site_id, tssrSiteChecked[i].site_name];
        tssrSiteChecked[i].list_of_qty.map(e => dataSiteIdx.push(e));
        // dataSiteIdx.push(arrayQTY);
        ws.addRow(dataSiteIdx);
    }
    }else{
      header.product_name.map( e => headerRow2.push(e));
      ws.addRow(headerRow1);
      ws.addRow(headerRow2);
      for(let i = 0; i < tssrSite.length; i++){
          let dataSiteIdx = ["TSSBOM190925000"+(i+1), tssrSite[i].site_id, tssrSite[i].site_name];
          tssrSite[i].list_of_qty.map(e => dataSiteIdx.push(e));
          // dataSiteIdx.push(arrayQTY);
          ws.addRow(dataSiteIdx);
      }
    }

    const allocexport = await wb.xlsx.writeBuffer()
    saveAs(new Blob([allocexport]), 'TSSR BOQ Matrix.xlsx')
  }

  render() {
    console.log("coba tes", [...this.state.tssrchecked.keys()])
    return (
      <div>
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <React.Fragment>
              <span style={{'position':'absolute',marginTop:'8px'}}>TSSR BOQ MATRIX</span>
              <div className="card-header-actions" style={{marginRight:'5px'}}>
                <Button color="success" onClick={this.xlsExportMatrix}>Print Report</Button>
              </div>
            </React.Fragment>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <table style={{width : '100%', marginBottom : '10px'}} className="table-header">
              <tbody>
                <tr>
                  <td>Project Identifier</td>
                  <td>: &nbsp; 
                    <select onChange={this.handleChangeProject} values={this.state.project_select} style={{minWidth : '150px'}}>
                    <option value={null}>{null}</option>
                    <option value={null}>All</option>
                    {this.state.list_project.map( lp =>
                        <option value={lp._id}>{lp.project_name}</option>
                    )}
                    </select>
                  </td>
                  <td style={{width : '25%'}}></td>
                  <td style={{width : '25%'}}></td>
                </tr>
              </tbody>
            </table>
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                        <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}></th>
                        <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>TSSR ID</th>
                        <th rowSpan="2" style={{'width' : '150px', verticalAlign : 'middle'}}>Site ID</th>
                        <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle'}}>Site Name</th>
                        {this.state.headerTable.product_name.map(ht => 
                            <th rowSpan="2" style={{textAlign : 'center', verticalAlign : 'middle', minWidth : '150px'}}>{ht}</th>
                        )}
                        {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                    </tr>
                    <tr>
                        {/* <th style={{'width' : '150px', textAlign : 'center'}}>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.site_tssr.map((tssr,i) =>
                        <tr key={tssr._id}>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                <Checkbox name={tssr._id} checked={this.state.tssrchecked.get(tssr._id)} onChange={this.handleChangeChecklist}/>
                            </td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{"TSSBOM190925000"+(i+1)}</td>
                            <td style={{verticalAlign : 'middle'}}>{tssr.site_id}</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>{tssr.site_name}</td>
                            {tssr.list_of_qty.map(qty => 
                                <td style={{verticalAlign : 'middle', textAlign : "center"}}>{qty}</td>
                            )}
                            {/* <td style={{verticalAlign : 'middle', textAlign : "center"}}></td> */}
                        </tr>
                    )}
                </tbody>
            </Table>
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
      </div>

    );
  }
}

export default BoqTssrMatrix;
