import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import {ExcelRenderer} from 'react-excel-renderer';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const DefaultNotif = React.lazy(() => import('../../views/DefaultView/DefaultNotif'));

const API_URL_BMS_Phil = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

const API_URL_BAM = 'https://api-dev.bam-id.e-dpm.com/bamidapi';
const usernameBAM = 'bamidadmin@e-dpm.com';
const passwordBAM = 'F760qbAg2sml';

const API_URL_PDB_TSEL = 'https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi';
const usernameTselApi = 'adminbamidsuper';
const passwordTselApi = 'F760qbAg2sml';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

class TssrBOM extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole : this.props.dataLogin.role,
        userId : this.props.dataLogin._id,
        userName : this.props.dataLogin.userName,
        userEmail : this.props.dataLogin.email,
        rowsXLS : [],
        project_name_selected : null,
        cd_id_selected : null,
        dataTssrUpload : [],
        waiting_status : null,
        action_status : null,
        action_message : null,
        redirectSign : false,
    };
    this.saveTssrBOMParent = this.saveTssrBOMParent.bind(this);
  }

    async getDatafromAPITSEL(url){
      try {
        let respond = await axios.get(API_URL_PDB_TSEL +url, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: usernameTselApi,
            password: passwordTselApi
          },
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Get Data", respond);
        }
        return respond;
      }catch (err) {
        let respond = err;
        console.log("respond Get Data", err);
        return respond;
      }
    }

    async getDatafromAPIBAM(url){
      try {
        let respond = await axios.get(API_URL_BAM +url, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: usernameBAM,
            password: passwordBAM
          },
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Get Data", respond);
        }
        return respond;
      }catch (err) {
        let respond = err;
        console.log("respond Get Data", err);
        return respond;
      }
    }

    async postDatatoAPIBAM(url, data){
      try {
        let respond = await axios.post(API_URL_BAM +url, data, {
          headers : {'Content-Type':'application/json'},
          auth: {
            username: usernameBAM,
            password: passwordBAM
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

    async patchDatatoAPIBAM(url, data, _etag){
      try {
        let respond = await axios.patch(API_URL_BAM +url, data, {
          headers : {'Content-Type':'application/json', "If-Match" : _etag},
          auth: {
            username: usernameBAM,
            password: passwordBAM
          },
        })
        if(respond.status >= 200 && respond.status < 300){
          console.log("respond Patch data", respond);
        }
        return respond;
      }catch (err) {
        let respond = err;
        console.log("respond Patch data", err);
        return respond;
      }
    }

  checkValue(props){
    //Swap undefined to null
    if( typeof props === 'undefined' ) {
      return null;
    }else{
      return props;
    }
  }

  checkValuetoZero(props){
    //Swap undefined or null to 0
    if( typeof props == 'undefined' || props == null ) {
      return 0;
    }else{
      return props;
    }
  }

  checkValuetoString(props){
    //Swap undefined or null to ""
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

  fileHandlerMaterial = (event) => {
    let fileObj = event.target.files[0];
    if(fileObj !== undefined){
      ExcelRenderer(fileObj, (err, rest) => {
        if(err){
          console.log(err);
        }
        else{
          this.setState({
            action_status : null,
            action_message : null
          }, () => {
            this.ArrayEmptytoNull(rest.rows);
          });
        }
      });
    }
  }

  ArrayEmptytoNull(dataXLS){
    let newDataXLS = [];
    for(let i = 0; i < dataXLS.length; i++){
      let col = [];
      for(let j = 0; j < dataXLS[1].length; j++){
        col.push(this.checkValue(dataXLS[i][j]));
      }
      newDataXLS.push(col);
    }
    this.setState({
      rowsXLS: newDataXLS
    });
    this.formatDataTSSR(newDataXLS);
  }

  formatDataTSSR = async(dataXLS) => {
      let action_message = "";
      let actionStatus = null;
      let SitesOfTSSRNew = [];
      this.setState({waiting_status : 'loading'});
      const staticHeader = ["site_title", "site_id", "site_name"];
      const staticHeaderXLS = dataXLS[1].filter((e,n) => n < 3);
      if(staticHeaderXLS.equals(staticHeader) !== true){
        actionStatus = "failed"
        this.setState({action_status : "failed", action_message : action_message + "Please check your upload format or Package Number"});
      }
      if(actionStatus !== "failed"){
        let dataPackage = [];
        const index_item = 3;
        let RespondGetPP = [];
        const ppid_upload = [];
        let pp_id_special = [];
        for(let j = index_item ; j < dataXLS[1].length; j++){
          let idXLSIndex = dataXLS[1][j].toString().split(" /// ",1);
          if(Array.isArray(idXLSIndex) == true){
            idXLSIndex = idXLSIndex.join();
            if(idXLSIndex.includes("\"")){
              pp_id_special.push(idXLSIndex);
            }else{
              ppid_upload.push(idXLSIndex);
            }
          }
        }
        RespondGetPP = await this.getAllPP(ppid_upload, pp_id_special);
        this.setState({waiting_status : null});
        if(RespondGetPP.length !== 0){
          dataPackage = RespondGetPP;
        }
        let id_PP = new Map();
        let _id_PP = new Map();
        let pp_key = new Map();
        let pp_name = new Map();
        let group_PP = new Map();
        let pp_cust_num = new Map();
        let physical_group = new Map();
        let pp_type = new Map();
        let pp_unit = new Map();
        let data_duplicated = [];
        let data_undefined = [];
        let dataAllnull = [];
        let siteIDNull = [];
        for(let j = index_item ; j < dataXLS[1].length; j++){
          let idXLSIndex = dataXLS[1][j].toString().split(" /// ",1);
          if(Array.isArray(idXLSIndex) == true){
            idXLSIndex = idXLSIndex.join();
          }
          let get_id_PP = dataPackage.find(PP => PP.pp_id === idXLSIndex);
          let cekAllZero = dataXLS.map( e => this.checkValuetoZero(e[j]) ).filter( (e,n) => n>1);
          if(cekAllZero.every( e => e == 0)){
            dataAllnull.push(idXLSIndex);
          }
          if(get_id_PP === undefined){
            data_undefined.push(idXLSIndex)
          }else{
            if(id_PP.get(idXLSIndex) === undefined){
              id_PP.set(idXLSIndex, get_id_PP.pp_id);
              pp_key.set(idXLSIndex, get_id_PP.pp_key);
              _id_PP.set(idXLSIndex, get_id_PP._id);
              group_PP.set(idXLSIndex, get_id_PP.pp_group)
              pp_name.set(idXLSIndex, get_id_PP.product_name);
              pp_cust_num.set(idXLSIndex, get_id_PP.pp_cust_number);
              physical_group.set(idXLSIndex, get_id_PP.physical_group)
              pp_type.set(idXLSIndex, get_id_PP.product_type);
              pp_unit.set(idXLSIndex, get_id_PP.uom);
            }else{
              data_duplicated.push(idXLSIndex);
            }
          }
        }
        if(data_undefined.length !== 0){
          actionStatus = "failed";
          let twoSentence = action_message.length !== 0 ? "and <br />" : "";
          action_message = "Please check your upload format or Package Number in "+data_undefined.join(", ")+twoSentence+action_message;
        }
        if(data_duplicated.length !== 0){
          actionStatus = "failed";
          let twoSentence = action_message.length !== 0 ? "and <br />" : "";
          action_message = action_message+twoSentence+" There are Duplicated PP in "+data_duplicated.join(", ");
        }
        let siteSaveFormat = [];
        let siteError = [];
        for(let i = 2; i < dataXLS.length; i++){
          if(this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]) !== null && this.state.action_status !== "failed" && actionStatus !== "failed"){
            let packageDatas = []
            for(let j = index_item ; j < dataXLS[1].length; j++){
              let dataXLSIndex = dataXLS[1][j].split(" /// ",1).join();
              if(dataAllnull.includes(dataXLSIndex) === false){
                let package_data = {
                  "id_pp_doc" : _id_PP.get(dataXLSIndex),
                  "pp_id" : dataXLSIndex,
                  "pp_group" : group_PP.get(dataXLSIndex),
                  "pp_cust_number" : pp_cust_num.get(dataXLSIndex),
                  "product_name" : pp_name.get(dataXLSIndex).toString(),
                  "physical_group" : physical_group.get(dataXLSIndex),
                  "product_type" : pp_type.get(dataXLSIndex),
                  "uom" : pp_unit.get(dataXLSIndex),
                  "qty" : this.checkValuetoZero(dataXLS[i][j]),
                  "version" : "0",
                  "deleted" : 0,
                  "created_by" : this.state.userId,
                  "updated_by" : this.state.userId
                }
                packageDatas.push(package_data);
              }
            }
            let siteID = this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_id')]).toString();
            let SiteBOQTech = {
              "account_id" : "1",
              "site_id" : siteID,
              "site_name" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_name')]),
              "site_title" : this.checkValue(dataXLS[i][this.getIndex(dataXLS[1],'site_title')]),
              "list_of_site_items" : packageDatas,
              "version" : "0",
              "created_by" : this.state.userId,
              "updated_by" : this.state.userId,
              "deleted" : 0
            }
            if(SiteBOQTech.site_name !== null){
              SiteBOQTech["site_name"] = SiteBOQTech.site_name.toString();
            }
            if(SiteBOQTech.site_title !== null){
              SiteBOQTech["site_title"] = SiteBOQTech.site_title.toString();
            }
            if(siteID.length === 0){
              siteIDNull.push(null);
            }
            if(siteSaveFormat.find(e => e === SiteBOQTech.site_id) !== undefined){
              siteError.push(SiteBOQTech.site_id);
            }
            siteSaveFormat.push(SiteBOQTech.site_id);
            SitesOfTSSRNew.push(SiteBOQTech);
          }
        }
        if(siteIDNull.length !== 0){
          actionStatus = "failed";
          let twoSentence = action_message.length !== 0 ? "and " : "";
          action_message = action_message+twoSentence+"Site ID cant NULL";
        }
        if(siteError.length !== 0){
          actionStatus = "failed";
          let twoSentence = action_message.length !== 0 ? "and " : "";
          action_message = action_message+twoSentence+"There are duplicate site";
        }
        if(actionStatus === 'failed'){
          if(action_message.length === 0){
            action_message = null;
          }
          this.setState({action_status : "failed", action_message : action_message});
        }
        if(actionStatus !== 'failed'){
          this.setState({action_message : null});
        }
      }
      this.setState({dataTssrUpload : SitesOfTSSRNew});
      return SitesOfTSSRNew;
  }

  async getAllPP(array_PP, array_PP_sepcial){
    let dataPP = [];
    let arrayDataPP = array_PP;
    let getNumberPage = Math.ceil(arrayDataPP.length / 25);
    for(let i = 0 ; i < getNumberPage; i++){
      let DataPaginationPP = arrayDataPP.slice(i * 25, (i+1)*25);
      let arrayIdPP = '"'+DataPaginationPP.join('", "')+'"';
      arrayIdPP = arrayIdPP.replace("&", "%26");
      let where_id_PP = '?where={"pp_id" : {"$in" : ['+arrayIdPP+']}}';
      let resPP = await this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP);
      if(resPP !== undefined){
        if(resPP.data !== undefined){
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    for(let i = 0 ; i < array_PP_sepcial.length; i++){
      let dataPPIndex = array_PP_sepcial[i];
      dataPPIndex = dataPPIndex.replace("\"", "");
      let where_id_PP = '?where={"pp_id":{"$regex" : "'+dataPPIndex+'", "$options" : "i"}}';
      let resPP = await this.getDatafromAPIBAM('/pp_sorted_nonpage'+where_id_PP);
      if(resPP !== undefined){
        if(resPP.data !== undefined){
          dataPP = dataPP.concat(resPP.data._items);
        }
      }
    }
    return dataPP;
  }

  preparingDataTSSR(){
    //Before Show preview and user can click save button
    const dataTSSRXls = this.state.rowsXLS;
    for(let i = 2; i < dataTSSRXls.length; i++){

    }

  }

  preparingSaveTssr(){
    const dateNow = new Date();
    const dataRandom = Math.floor(Math.random() * 100);
    const numberTSSR = dateNow.getFullYear().toString()+(dateNow.getMonth()+1).toString()+dateNow.getDate().toString()+"-"+dataRandom.toString().padStart(4, '0');
    return numberTSSR;
  }

  async saveTssrBOMParent(){
    const numberingTSSR = "TSSRBOM-"+this.preparingSaveTssr();
    const date = new Date();
    const dateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    const tssrData = {
      "no_tssr_boq" : numberingTSSR,
      "id_project_doc" : null,
      "project_name" : this.state.project_name_selected,
      "account_id" : "1",
      "current_status" : "CREATED",
      "id_boq_tech_doc" : null,
      "no_boq_tech" : "",
      "version" : "0",
      "deleted" : 0,
      "created_on" : dateNow.toString(),
      "created_by" : this.state.userId,
      "updated_on" : dateNow.toString(),
      "updated_by" : this.state.userId
    }
    console.log("tssr op", JSON.stringify(tssrData))
    const respondSaveTSSR = await this.postDatatoAPIBAM('/tssr_op', tssrData);
    if(respondSaveTSSR.data !== undefined && respondSaveTSSR.status >= 200 && respondSaveTSSR.status <= 300 ){
      this.saveTSSRBOMSites(respondSaveTSSR.data._id, tssrData.no_tssr_boq, respondSaveTSSR.data._etag);
    }else{
      this.setState({ action_status : 'failed' });
    }
  }

  async saveTSSRBOMSites(_id_tssr_parent, no_tssr_boq, _etag_tssr_parent){
    let bulkTssrSites = [];
    const date = new Date();
    const dateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    const dataSites = this.state.dataTssrUpload;
    for(let i = 0; i < dataSites.length; i++){
      let siteTssrIdx = JSON.parse(JSON.stringify(dataSites[i]));
      siteTssrIdx["id_tssr_boq_doc"] = _id_tssr_parent;
      siteTssrIdx["no_tssr_boq"] = no_tssr_boq;
      siteTssrIdx["no_tssr_boq_site"] = no_tssr_boq+"-"+i.toString();
      siteTssrIdx["id_site_doc"] = null;
      siteTssrIdx["id_project_doc"] = null;
      siteTssrIdx["project_name"] = this.state.project_name_selected === null ? "" : this.state.project_name_selected;
      siteTssrIdx["id_boq_tech_doc"] = null;
      siteTssrIdx["no_boq_tech"] = "";
      if(siteTssrIdx.site_title === null){
        siteTssrIdx["site_title"] = ((i+1) % 2) === 1 ? "NE" : "FE";
      }
      siteTssrIdx["created_on"] = dateNow.toString();
      siteTssrIdx["updated_on"] = dateNow.toString();
      siteTssrIdx["created_by"] = this.state.userId;
      siteTssrIdx["updated_by"] = this.state.userId;
      if(siteTssrIdx.list_of_site_items !== undefined){
        delete siteTssrIdx.list_of_site_items;
      }
      bulkTssrSites.push(siteTssrIdx);
    }
    console.log("tssr sites op", JSON.stringify(bulkTssrSites))
    const respondSaveTSSRSites = await this.postDatatoAPIBAM('/tssr_sites_op', bulkTssrSites);
    if(respondSaveTSSRSites.data !== undefined && respondSaveTSSRSites.status >= 200 && respondSaveTSSRSites.status <= 300 ){
      if(bulkTssrSites.length === 1){
        this.saveTSSRBOMSitesItem(_id_tssr_parent, no_tssr_boq, _etag_tssr_parent, [respondSaveTSSRSites.data], bulkTssrSites);
      }else{
        this.saveTSSRBOMSitesItem(_id_tssr_parent, no_tssr_boq, _etag_tssr_parent, respondSaveTSSRSites.data._items, bulkTssrSites);
      }
    }else{
      const delData = await this.patchDatatoAPIBAM('/tssr_op/'+_id_tssr_parent, {"deleted" : 0}, _etag_tssr_parent);
      this.setState({ action_status : 'failed' });

    }
  }

  async saveTSSRBOMSitesItem(_id_tssr_parent, no_tssr_boq, _etag_tssr_parent, _id_sites_tssr, no_sites_tssr){
    const tssrSitesItem = [];
    const dataSites = this.state.dataTssrUpload;
    const date = new Date();
    const dateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    console.log("dataTSSRSites", dataSites)
    for(let i = 0; i < dataSites.length; i++){
      const dataSiteIdxItem = dataSites[i].list_of_site_items;
      for(let j = 0; j < dataSiteIdxItem.length; j++){
        let itemSiteIdx = Object.assign(dataSiteIdxItem[j], {});
        itemSiteIdx["id_tssr_boq_doc"] = _id_tssr_parent;
        itemSiteIdx["no_tssr_boq"] = no_tssr_boq;
        itemSiteIdx["id_tssr_boq_site_doc"] = _id_sites_tssr[i]._id
        itemSiteIdx["no_tssr_boq_site"] = no_sites_tssr[i].no_tssr_boq_site;
        itemSiteIdx["created_on"] = dateNow.toString();
        itemSiteIdx["updated_on"] = dateNow.toString();
        itemSiteIdx["created_by"] = this.state.userId;
        itemSiteIdx["updated_by"] = this.state.userId;
        tssrSitesItem.push(itemSiteIdx);
      }
    }
    console.log("tssr sites item op", JSON.stringify(tssrSitesItem))
    const respondSaveTSSRSitesItem = await this.postDatatoAPIBAM('/tssr_site_items_op', tssrSitesItem);
    if(respondSaveTSSRSitesItem.data !== undefined && respondSaveTSSRSitesItem.status >= 200 && respondSaveTSSRSitesItem.status <= 300 ){
      this.setState({ action_status : 'success' }, () => {
        setTimeout(function(){ this.setState({ redirectSign : _id_tssr_parent}); }.bind(this), 3000);
      });
    }else{
      const delData = await this.patchDatatoAPIBAM('/tssr_op/'+_id_tssr_parent, {"deleted" : 0}, _etag_tssr_parent);
      this.setState({ action_status : 'failed' });
    }
  }

  render() {
    if(this.state.redirectSign !== false){
      return (<Redirect to={'/tssr-bom/'+this.state.redirectSign} />);
    }
    console.log("Excel Render", this.state.rowsXLS);
    return (
      <div>
        <DefaultNotif actionMessage={this.state.action_message} actionStatus={this.state.action_status} />
        <Row>
        <Col xl="12">
        <Card>
          <CardHeader>
            <span style={{lineHeight :'2', fontSize : '17px'}} >TSSR BOM </span>
          </CardHeader>
          <CardBody className='card-UploadBoq'>
            <input type="file" onChange={this.fileHandlerMaterial.bind(this)} style={{"padding":"10px","visiblity":"hidden"}}/>
            <Button color="success" onClick={this.saveTssrBOMParent} style={{float : 'right'}} >Save</Button>
            <table style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
              <tbody>
                <tr>
                  <td colSpan="4" style={{textAlign : 'center'}}>TSSR BOM PREVIEW</td>
                </tr>
              </tbody>
            </table>
            <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
            <Table hover bordered responsive size="sm">
              <tbody>
              {this.state.rowsXLS.length !== 0 ? (
                this.state.rowsXLS.map( row =>
                  <tr>
                    {row.map( col =>
                      <td>{col}</td>
                    )}
                  </tr>
                )
              ) : ""}
            </tbody>
          </Table>
          </CardBody>
        </Card>
        </Col>
        </Row>
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
    dataLogin : state.loginData
  }
}

export default connect(mapStateToProps)(TssrBOM);
