import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Table, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './tssrModule.css';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { AppSwitch } from '@coreui/react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { connect } from 'react-redux';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="" }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash"/>
);

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';

class TSSRBoq extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        tokenUser : this.props.dataLogin.token,
        data_tech_boq : null,
        data_tech_boq_sites : [],
        tssr_config_comment : new Map(),
        tssr_config_qty : new Map(),
        tssr_comment : null,
        modal_loading : false,
        action_status : null,
        action_message : null,

        tssr_data_upload : null,

        data_comm_boq : null,
        data_comm_boq_version : null,
        data_comm_boq_items : [],
        data_comm_boq_items_version : [],
        list_tech_boq : [],
        list_tech_boq_selection : [],
        data_tech_boq_selected : null,
        data_tech_boq_sites_selected : [],
        list_version : [],

        boq_comm_API : null,
        pp_all : [],
        boq_tech_API : [],
        boq_tech_sites : [],
        bpq_comm_items : [],
        prev_boq_tech_select : null,
        Boq_Technical_Select : null,
        groupingView : [],
        commercialData : [],
        boq_comm_API_now : [],
        commercialDataGroup : [],
        commercialData_now : [],
        project_select : null,
        project_name_select : null,
        rowsComm : [],
        qty_cust : new Map(),
        qty_ericsson : new Map(),
        early_start : false,
        unit_price : new Map(),
        curr_rev : null,
        checkedCommItem : new Map(),
        checkedCommItem_all : false,
        get_item_ilang : [],
        email_created_by : null,
        list_po_number : [],
        po_selected : null,
        po_number_selected : null,
        project_all: [],
        version_now: null,
        version_selected : null,
        format_rev : [],
        dataPerGrouping : [],
        toggleShowGroup : false,
        redirectSign : false,
        collapse: false,
        dropdownOpen: new Array(1).fill(false),
        noteChange : new Array(7).fill(null),
        fieldNoteChange : new Array(7).fill(null),
        note_version : null,
        opportunity_id : null,
        inputValue : '',
        databoq : [],
        currencyChange : new Map(),
        currencyChangeAll : null,
        incentiveChange : new Map(),
        UnitPriceIDRChange : new Map(),
        UnitPriceUSDChange : new Map(),
        TotalPriceIDRChange : new Map(),
        TotalPriceUSDChange : new Map(),
        total_comm : {},
        boq_tech_select : {},
        modal_alert : false,
      };
      this.saveDataTSSR = this.saveDataTSSR.bind(this);
      this.toggleAlert = this.toggleAlert.bind(this);
      this.exportFormatTSSRVertical = this.exportFormatTSSRVertical.bind(this);
      this.exportFormatTSSRUpdate = this.exportFormatTSSRUpdate.bind(this);
      this.toggleLoading = this.toggleLoading.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleUpload = this.toggleUpload.bind(this);
      this.handleChangeCommentConfig = this.handleChangeCommentConfig.bind(this);
      this.approvalTechnical = this.approvalTechnical.bind(this);
      this.handleChangeCommentTSSR = this.handleChangeCommentTSSR.bind(this);
      this.handleChangeQtyTSSRConfig = this.handleChangeQtyTSSRConfig.bind(this);
    }

    checkValueReturn(value1, value2){
      // if value undefined return Value2
      if( typeof value1 !== 'undefined' && value1 !== null) {
        console.log('value1', value1);
        return value1;
      }else{
        console.log('value2', value2);
        return value2;
      }
    }

    toggleLoading(){
      this.setState(prevState => ({
        modal_loading: !prevState.modal_loading
      }));
    }

    toggleAlert(e){
      this.setState(prevState => ({
        modal_alert: !prevState.modal_alert
      }));
    }

    toggleUpload() {
      this.setState({ collapse: !this.state.collapse });
    }

    toggleDropdown(i) {
      const newArray = this.state.dropdownOpen.map((element, index) => {
        return (index === i ? !element : false);
      });
      this.setState({
        dropdownOpen: newArray,
      });
    }

    onEntering() {
      this.setState({ status: 'Opening...' });
    }

    onEntered() {
      this.setState({ status: 'Opened' });
    }

    onExiting() {
      this.setState({ status: 'Closing...' });
    }

    onExited() {
      this.setState({ status: 'Closed' });
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

    async saveAsExcel() {
      const wb = new Excel.Workbook()

      const ws = wb.addWorksheet()

      const row = ws.addRow(['a', 'b', 'c'])
      row.font = { bold: true }

      const buf = await wb.xlsx.writeBuffer()

      saveAs(new Blob([buf]), 'abc.xlsx')
    }

    checkValue(props){
      if( typeof props === 'undefined' ) {
        return null;
      }else{
        return props;
      }
    }

    checkValuetoZero(props){
      //Swap undefined or null to 0
      if( typeof props === 'undefined' || props === null || props === '' ) {
        return 0;
      }else{
        return props;
      }
    }

    checkValuetoString(props){
      //Swap undefined or null to 0
      if( typeof props == 'undefined' || props == null ) {
        return "";
      }else{
        return props;
      }
    }

    isSameValue(element,value){
      //function for FindIndex
      return element === value;
    }

    getIndex(data, value){
      //get index of value in Array
      return data.findIndex(e => this.isSameValue(e,value));
    }

    async getDataFromAPINODE(url) {
      try {
        let respond = await axios.get(API_URL_NODE+url, {
          headers : {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+this.state.tokenUser
          },
        });
        if(respond.status >= 200 && respond.status < 300) {
          console.log("respond data", respond);
        }
        return respond;
      } catch(err) {
        let respond = err;
        console.log("respond data", err);
        return respond;
      }
    }

    async patchDatatoAPINODE(url, data){
      try {
        let respond = await axios.patch(API_URL_NODE +url, data, {
          headers : {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+this.state.tokenUser
          },
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Post Data", respond);
        }
        return respond;
      }catch (err) {
        let respond = err;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
        console.log("respond Post Data", err);
        return respond;
      }
    }

    async postDatatoAPINODE(url, data){
      try {
        let respond = await axios.post(API_URL_NODE +url, data, {
          headers : {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+this.state.tokenUser
          },
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Post Data", respond);
        }
        return respond;
      }catch (err) {
        let respond = err;
        this.setState({action_status : 'failed', action_message : 'Sorry, There is something error, please refresh page and try again'})
        console.log("respond Post Data", err);
        return respond;
      }
    }

    fileHandlerTSSR = (event) => {
      let fileObj = event.target.files[0];
      const date = new Date();
      const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      if(fileObj !== undefined){
        ExcelRenderer(fileObj, (err, rest) => {
          if(err){
            console.log(err);
          }
          else{
            console.log('rest.rows', JSON.stringify(rest.rows));
            this.setState({
              rowsComm: rest.rows}, ()=> {
                this.makeFormatintoMap(rest.rows);
            });
          }
        });
      }
    }

    makeFormatintoMap(rowsXLS){
      let dataTechSites = this.state.data_tech_boq_sites;
      const dataHeader = rowsXLS[0];
      let notesTSSRConfig = new Map();
      let qtyTSSTConfig = new Map();
      for(let i = 1; i < rowsXLS.length; i++){
        let config_id_upload = this.checkValue(rowsXLS[i][this.getIndex(dataHeader, 'config_id')]);
        let tower_id_upload = this.checkValue(rowsXLS[i][this.getIndex(dataHeader, 'tower_id')]);
        let dataTowerIdx = dataTechSites.find(e => e.site_id === tower_id_upload);
        if(dataTowerIdx !== undefined){
          let dataConfigIdx = dataTowerIdx.siteItemConfig.find(e => e.config_id === config_id_upload);
          if(dataConfigIdx !== undefined){
            let qtyIdx = this.checkValueReturn(rowsXLS[i][this.getIndex(dataHeader, 'qty_tssr')], 0);
            let noteIdx = this.checkValue(rowsXLS[i][this.getIndex(dataHeader, 'note')]);
            qtyTSSTConfig.set(dataConfigIdx._id, qtyIdx);
            notesTSSRConfig.set(dataConfigIdx._id, noteIdx);
          }
        }
      }
      this.setState({tssr_config_comment : notesTSSRConfig , tssr_config_qty : qtyTSSTConfig})
    }

    toggleEdit() {
      this.setState(prevState => ({
        modalEdit: !prevState.modalEdit
      }));
    }

    componentDidMount(){
      this.getTechBoqData(this.props.match.params.id);
    }

    getTechBoqData(_id_tech){
      this.getDataFromAPINODE('/techBoq/'+_id_tech).then(res => {
        if(res.data !== undefined){
          const dataTech = res.data;
          this.setState({data_tech_boq : dataTech.data});
          if(res.data.data !== undefined){
            this.setState({data_tech_boq_sites : dataTech.data.techBoqSite});
          }
        }
      })
    }

    handleChangeCommentConfig = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ tssr_config_comment: prevState.tssr_config_comment.set(name, value) }));
    }

    handleChangeQtyTSSRConfig = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({ tssr_config_qty: prevState.tssr_config_qty.set(name, value) }));
    }

    handleChangeCommentTSSR = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      this.setState({tssr_comment : value});
    }

    exportFormatTSSRVertical = async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = [];
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        dataSites = this.state.data_tech_boq_sites_version;
      }else{
        dataSites = this.state.data_tech_boq_sites;
      }
      const dataHeader = this.state.view_tech_header_table;

      let ppIdRow = ["Tower ID", "Program", "SOW", "BOQ Configuration", "SAP Number", "Qty Technical", "QTY TSSR", "Diff", "Note"];

      ws.addRow(ppIdRow);
      for(let i = 0; i < dataSites.length ; i++){
        let qtyConfig = []
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          let idx_config_comment = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? "" : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].note : "";
          let idx_config_qty = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? 0 : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].suggested_qty : 0;
          let diff = dataSites[i].siteItemConfig[j].qty - idx_config_qty
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfig[j].config_id, dataSites[i].siteItemConfig[j].sap_number, dataSites[i].siteItemConfig[j].qty, idx_config_qty, diff, idx_config_comment]);
        }
      }

      const MRFormat = await wb.xlsx.writeBuffer();
      saveAs(new Blob([MRFormat]), 'TSSR BOQ Vertical.xlsx');
    }

    exportFormatTSSRUpdate = async () =>{
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet();

      const dataTech = this.state.data_tech_boq;
      let dataSites = [];
      if(this.state.version_selected !== null && dataTech.version !== this.state.version_selected){
        dataSites = this.state.data_tech_boq_sites_version;
      }else{
        dataSites = this.state.data_tech_boq_sites;
      }
      const dataHeader = this.state.view_tech_header_table;

      let ppIdRow = ["tower_id", "program", "sow", "config_id", "qty_tssr", "note"];

      ws.addRow(ppIdRow);
      for(let i = 0; i < dataSites.length ; i++){
        let qtyConfig = []
        for(let j = 0; j < dataSites[i].siteItemConfig.length; j++ ){
          let idx_config_comment = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? "" : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].note : "";
          let idx_config_qty = dataSites[i].siteItemConfig[j].tssr_notes === undefined ? dataSites[i].siteItemConfig[j].qty : dataSites[i].siteItemConfig[j].tssr_notes.length !== 0 ? dataSites[i].siteItemConfig[j].tssr_notes[dataSites[i].siteItemConfig[j].tssr_notes.length-1].suggested_qty : dataSites[i].siteItemConfig[j].qty;
          ws.addRow([dataSites[i].site_id, dataSites[i].program, dataSites[i].sow, dataSites[i].siteItemConfig[j].config_id, idx_config_qty, idx_config_comment]);
        }
      }

      const MRFormat = await wb.xlsx.writeBuffer();
      saveAs(new Blob([MRFormat]), 'TSSR BOQ Update Format.xlsx');
    }

    async approvalTechnical(e){
      this.toggleLoading()
      let currValue = e.currentTarget.value;
      if(currValue !== undefined){
        currValue = parseInt(currValue);
      }
      let tssrApproval = {
        "operation":currValue
      }
      let configNotes = [];
      let diffQty = [];
      const data_tech = this.state.data_tech_boq_sites;
      if(currValue === 3){
        tssrApproval["tssrNote"] = true;
        tssrApproval["techBoqNote"] = {};
        tssrApproval["techBoqNote"]["note_value"] = this.state.tssr_comment;
        let config_comment = this.state.tssr_config_comment;
        let config_qty = this.state.tssr_config_qty;
        for(let i = 0; i < data_tech.length; i++){
          const data_tech_site = data_tech[i];
          for(let j = 0; j < data_tech_site.siteItemConfig.length ;j++ ){
            let conf = data_tech_site.siteItemConfig[j];
            let idx_config_comment = this.state.tssr_config_comment.has(conf._id) === true ? this.state.tssr_config_comment.get(conf._id) : conf.tssr_notes === undefined ? "" : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].note : "";
            let idx_config_qty = config_qty.has(conf._id) === true ? config_qty.get(conf._id) : conf.tssr_notes === undefined ? data_tech_site.siteItemConfig[j].qty : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].suggested_qty : data_tech_site.siteItemConfig[j].qty;
            let configNoteIdx = {
              "_id": conf._id,
              "tssr_note" : idx_config_comment,
              "suggested_qty": idx_config_qty.length === 0 ? 0 : parseFloat(idx_config_qty)
            }
            if(data_tech_site.siteItemConfig[j].qty !== configNoteIdx.suggested_qty ){
              diffQty.push("["+data_tech_site.siteItemConfig[j].site_id+"] => "+data_tech_site.siteItemConfig[j].config_id);
            }
            configNotes.push(configNoteIdx);
          }
        }
        tssrApproval["tssrItemConfigNotes"] = configNotes;
        if(diffQty.length !== 0){
          tssrApproval["isGap"] = true;
        }
      }
      this.toggleLoading();
      // console.log("tssrApproval", JSON.stringify(tssrApproval));
      this.setState({tssr_data_upload : tssrApproval}, () => {
        if(diffQty.length !== 0){
          this.toggleAlert();
        }else{
          this.saveDataTSSR();
        }
      });
    }

    async saveDataTSSR(){
      this.toggleLoading();
      if(this.state.modal_alert === true){
        this.setState({modal_alert : false});
      }
      let patchData = await this.patchDatatoAPINODE('/techBoq/approval/'+this.state.data_tech_boq._id, this.state.tssr_data_upload)
      if(patchData.data !== undefined){
        this.setState({action_status : 'success'});
      }else{
        if(patchData.response !== undefined){
          if(patchData.response.data !== undefined){
            this.setState({action_status : 'failed', action_message : patchData.response.data.error })
          }else{
            this.setState({action_status : 'failed'});
          }
        }else{
          this.setState({action_status : 'failed'});
        }
      }
      this.toggleLoading();
    }

    render() {
      return (
        <div>
          <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <span style={{lineHeight :'2', fontSize : '17px'}}> TSSR BOQ </span>
                  {this.state.data_tech_boq !== null && (
                    <React.Fragment>
                      <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggleDropdown(0);}} style={{float : 'right', marginRight : '10px'}}>
                        <DropdownToggle caret color="secondary">
                          <i className="fa fa-download" aria-hidden="true"> &nbsp; </i>Download File
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header> TSSR File</DropdownItem>
                          <DropdownItem onClick={this.exportFormatTSSRVertical}> <i className="fa fa-file-text-o" aria-hidden="true"></i>TSSR Vertical</DropdownItem>
                          <DropdownItem onClick={this.exportFormatTSSRUpdate}> <i className="fa fa-file-text-o" aria-hidden="true"></i>TSSR Update Format</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </React.Fragment>
                  )}
                </CardHeader>
                <CardBody className='card-UploadBoq'>
                  <input type="file" onChange={this.fileHandlerTSSR.bind(this)} style={{"padding":"10px","visiblity":"hidden"}} />
                  <Row>
                    <Col sm="12" md="12">
                    <table style={{width : '100%', marginBottom : '0px'}}>
                      <tbody>
                        <tr style={{fontWeight : '425', fontSize : '23px'}}>
                          <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>
                          {this.props.match.params.id === undefined ? "CREATE" : ""} TSSR BOQ
                          </td>
                        </tr>
                        {this.state.data_tech_boq !== null && (
                          <React.Fragment>
                            <tr style={{fontWeight : '390', fontSize : '12px', fontStyle:'oblique'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Technical BOQ Origin Doc : {this.state.data_tech_boq.no_tech_boq}</td>
                            </tr>
                            <tr style={{fontWeight : '390', fontSize : '10px', fontStyle:'oblique'}}>
                              <td colSpan="2" style={{textAlign : 'center', marginBottom: '10px', fontWeight : '500'}}>Project : {this.state.data_tech_boq.project_name}</td>
                            </tr>
                          </React.Fragment>
                        )}
                      </tbody>
                    </table>
                    <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                    </Col>
                  </Row>

                  <div class='divtable'>
                    <Table hover bordered striped responsive size="sm" width="100%">
                        <thead class="table-commercial__header--fixed">
                        <tr>
                          <th>Tower ID</th>
                          <th>Program</th>
                          <th>SOW</th>
                          <th>Config</th>
                          <th>SAP Number</th>
                          <th>Qty Technical</th>
                          <th>Qty TSSR</th>
                          <th>Diff</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.data_tech_boq_sites.map(site =>
                        site.siteItemConfig.map(conf =>
                            <tr>
                              <td>{site.site_id}</td>
                              <td>{site.program}</td>
                              <td>{site.sow}</td>
                              <td>{conf.config_id}</td>
                              <td>{conf.sap_number}</td>
                              <td>{conf.qty}</td>
                              <td style={{width : '125px'}}>
                                <Input
                                  type="number"
                                  name={conf._id}
                                  className="BoQ-style-qty"
                                  placeholder=""
                                  onChange={this.handleChangeQtyTSSRConfig}
                                  value={this.state.tssr_config_qty.has(conf._id) === true ? this.state.tssr_config_qty.get(conf._id) : conf.tssr_notes === undefined ? conf.qty : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].suggested_qty : conf.qty}
                                />
                              </td>
                              <td>{conf.qty - (this.state.tssr_config_qty.has(conf._id) === true ? this.state.tssr_config_qty.get(conf._id) : conf.tssr_notes === undefined ? conf.qty : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].suggested_qty : conf.qty) }</td>
                              <td>
                                <Input
                                  type="text"
                                  name={conf._id}
                                  className="BoQ-style-qty"
                                  placeholder=""
                                  onChange={this.handleChangeCommentConfig}
                                  value={this.state.tssr_config_comment.has(conf._id) === true ? this.state.tssr_config_comment.get(conf._id) : conf.tssr_notes === undefined ? "" : conf.tssr_notes.length !== 0 ? conf.tssr_notes[conf.tssr_notes.length-1].note : ""}
                                />
                              </td>
                            </tr>
                        )
                      )}
                      </tbody>
                    </Table>
                  </div>
                  <div>
                    <FormGroup>
                      <Label htmlFor="tssr_comment" style={{ fontSize : '12px', marginBottom : '0px'}}>TSSR Note :</Label>
                      <Input
                        type="text"
                        name={'tssr'}
                        className="BoQ-style-qty"
                        placeholder=""
                        onChange={this.handleChangeCommentTSSR}
                        value={this.state.tssr_comment !== null ? this.state.tssr_comment : this.state.data_tech_boq === null ? "" : this.state.data_tech_boq.notes === undefined ? "" : this.state.data_tech_boq.notes.length !== 0 ? this.state.data_tech_boq.notes[this.state.data_tech_boq.notes.length-1].note_value : "" }
                      />
                    </FormGroup>
                  </div>
                </CardBody>
                <CardFooter>
                  <div>
                    <Button color="success" size="sm" value="2" onClick={this.approvalTechnical}>Approve</Button>
                    <Button color="danger" size="sm" style={{marginLeft : '10px'}} value="3" onClick={this.approvalTechnical}>Reject</Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          {/* Modal Loading */}
          <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className + ' loading-modal'}>
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
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Loading */}

          {/* Modal Delete */}
          <Modal isOpen={this.state.modal_alert} toggle={this.toggleAlert} className={'modal-sm ' + this.props.className}>
            <ModalBody>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '15px'}}>There are some different Qty Config between TSSR and Techical </span>
              </div>
              <div style={{textAlign : 'center', margin : '15px 0 20px 0'}}>
                <span style={{fontWeight : '500', fontSize : '12px'}}>Are sure to continue</span>
              </div>
              <div style={{textAlign : 'center'}}>
                {this.state.submission_number_selected}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.saveDataTSSR}>Save with Gap</Button>
              <Button color="secondary" onClick={this.toggleAlert}>Close</Button>
            </ModalFooter>
          </Modal>
          {/* end Modal Delete */}
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

  export default connect(mapStateToProps)(TSSRBoq);