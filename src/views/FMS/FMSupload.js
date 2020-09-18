import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
  ModalFooter,
} from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import ModalCreateNew from "../components/ModalCreateNew";
import Loading from '../components/Loading'

import { getDatafromAPIEXEL, postDatatoAPINODE, postDatatoAPINODEdata } from "../../helper/asyncFunction";
const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

const API_URL_tsel = "https://api-dev.tsel.pdb.e-dpm.com/tselpdbapi";
const username_tsel = "adminbamidsuper";
const password_tsel = "F760qbAg2sml";

const API_URL_XL = "https://api-dev.xl.pdb.e-dpm.com/xlpdbapi";
const usernameXL = "adminbamidsuper";
const passwordXL = "F760qbAg2sml";

const API_URL_NODE = "https://api2-dev.bam-id.e-dpm.com/bamidapi";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange,
  inValue = "",
  disabled = false,
}) => (
  <input
    type={type}
    name={name}
    checked={checked}
    onChange={onChange}
    value={inValue}
    className="checkmark-dash"
    disabled={disabled}
  />
);

class FMSupload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_list: [],
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      redirect_sign: false,
      action_status: null,
      action_message: null,
      filter_list: new Array(1).fill(""),
      activity_selected: null,
      list_activity_selection: [],
      list_activity_selected: null,
      project_name: null,
      asp_list: [],
      // creation_ssow_form : new Array(1).fill({}),
      list_cd_id: [],
      creation_ssow_form: [],
      project_selected: null,
      project_name_selected: null,
      preview_data_assignment: null,
      assignment_ssow_upload: null,
      can_edit_ssow: false,
      identifier_by: "cd_id",
      email_cpm: null,
      project_all : [],
      cd_selected: [
        // {
        //   id_cd_doc: "",
        //   cd_id: ""
        // },
      ],
      createModal: false,
      form_fms : {},
    };

    this.loadOptionsCDID = this.loadOptionsCDID.bind(this);
    this.handlemultipleCD = this.handlemultipleCD.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.selectProject = this.selectProject.bind(this);
  }

  componentDidMount() {
    document.title = "POD Upload | BAM";
    this.getDataProject();

  }

  getDataProject(){
    getDatafromAPIEXEL('/project_sorted_non_page').then( resp => {
      if(resp !== undefined){
        this.setState({project_all : resp.data._items});
      }
    })
  }

  selectProject(e){
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    this.setState({project_select : value, project_name_selected : text}, () => {
      console.log(this.state.project_select, this.state.project_name_selected)
    });
  }

  async postAssignment() {
    const dataForm = this.state.create_assignment_form;
  }

  async loadOptionsCDID(inputValue) {
    if(!inputValue) {
      return [];
    } else {
      let wp_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getWPID = await getDatafromAPIEXEL('/custdel_sorted_non_page?where={"WP_ID":{"$regex":"'+inputValue+'", "$options":"i"}, "CD_Info_Project_Name" : "'+this.state.project_name_selected+'"}');
      if(getWPID !== undefined && getWPID.data !== undefined) {
        this.setState({list_cd_id : getWPID.data._items});
        getWPID.data._items.map(wp =>
          wp_id_list.push({'value' : wp.WP_ID , 'label' : wp.WP_ID +" ( "+wp.WP_Name+" )", 'project' : wp.CD_Info_Project_Name, 'id' : wp._id}))
      }
      this.setState({project_name : wp_id_list[0].project})
      return wp_id_list;
    }
  }

  async loadOptionsSSOWID(inputValue) {
    if (!inputValue || inputValue.length < 2) {
      return [];
    } else {
      let ssow_id_list = [];
      // const getSSOWID = await this.getDataFromAPIEXEL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getSSOWID = await this.getDataFromAPIEXEL(
        '/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}'
      );
      if (getSSOWID !== undefined && getSSOWID.data !== undefined) {
        getSSOWID.data._items.map((ssow) =>
          ssow_id_list.push({
            label: "(" + ssow.sow_type + ") " + ssow.ssow_id,
            value: ssow.ssow_id,
            sow_type: ssow.sow_type,
            ssow_unit: ssow.ssow_type,
            description: ssow.description,
          })
        );
      }
      return ssow_id_list;
    }
  }

  async loadOptionsActivityNumber(inputValue) {
    if (!inputValue || inputValue.length < 2) {
      return [];
    } else {
      let act_number_list = [];
      const getActNumber = await this.getDataFromAPIEXEL(
        '/ssow_activity_number_sorted_nonpage?where={"activity_number":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}'
      );
      if (getActNumber !== undefined && getActNumber.data !== undefined) {
        getActNumber.data._items.map((act_number) =>
          act_number_list.push({
            label:
              act_number.activity_number !== undefined
                ? act_number.activity_number
                : null,
            value: act_number.activity_number,
          })
        );
      }
      return act_number_list;
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  togglecreateModal = () => {
    this.setState({
      createModal: !this.state.createModal,
    });
  };

  resettogglecreateModal = () => {
    this.setState({
      rowsXLS: [],
    });
  };

  handleInputFile = (e) => {
    let fileUpload = null;
    if (
      e !== undefined &&
      e.target !== undefined &&
      e.target.files !== undefined
    ) {
      fileUpload = e.target.files[0];
    }
    this.setState({ inputan_file: fileUpload }, () =>
      console.log(this.state.inputan_file)
    );
  };

  handlemultipleCD = (cdlist) => {
    let cd_array = [];
    if( cdlist !== undefined && cdlist !== null ){
      cdlist.map(e => cd_array.push({id_cd_doc: e.id, cd_id: e.value}));
      this.setState({ cd_selected: cd_array}, () => console.log(this.state.cd_selected))
    }else{
      this.setState({ cd_selected: [] }, () => console.log(this.state.cd_selected))
    }
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  };

  postPOD = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    let fileDocument = new FormData();
    await fileDocument.append('id_project_doc', this.state.project_selected);
    await fileDocument.append('project_name', this.state.project_name_selected);
    await fileDocument.append('ms_target', this.state.form_fms.milestone);
    await fileDocument.append('fileDocument', this.state.inputan_file);
    await fileDocument.append('cdIdList', JSON.stringify(this.state.cd_selected));
    const respostPOD = await postDatatoAPINODEdata('/erisitePodFile/createPodFile', fileDocument, this.state.tokenUser);
    if (
      respostPOD.data !== undefined &&
      respostPOD.status >= 200 &&
      respostPOD.status <= 300
    ) {
      this.setState({
        action_status: "success",
        action_message: "Upload Succeed, please check in POD List",
      });
      this.toggleLoading();
    } else {
      this.setState({ action_status: "failed" });
        this.toggleLoading();
    }
  }

  handleChangeForm(e){
    let dataForm = this.state.form_fms;
    const name = e.target.name;
    const value = e.target.value;
    dataForm[name] = value;
    this.setState({form_fms : dataForm});
  }

  render() {
    if (this.state.redirect_sign !== false) {
      return <Redirect to={"/assignment-list/"} />;
    }
    return (
      <div className="animated fadeIn">
        <DefaultNotif
          actionMessage={this.state.action_message}
          actionStatus={this.state.action_status}
        />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                  FMS Upload
                </span>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{ paddingLeft: "16px" }}>
                        <Label>Project</Label>
                        <Input name="project" type="select" onChange={this.selectProject} value={this.state.project_select}>
                            <option value=""></option>
                            {this.state.project_all.map( project =>
                              <option value={project._id}>{project.Project}</option>
                            )}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{ paddingLeft: "16px" }}>
                        <Label>CD ID</Label>
                        <AsyncSelect
                          isMulti
                          cacheOptions
                        loadOptions={this.loadOptionsCDID}
                        defaultOptions
                        onChange={this.handlemultipleCD}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup style={{ paddingLeft: "16px" }}>
                        <Label>Milestone</Label>
                        <Input
                          type="text"
                          name="milestone" value={this.state.form_fms.milestone} onChange={this.handleChangeForm}
                          id="milestone"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="success"
                  style={{ float: "right" }}
                  onClick={this.togglecreateModal}
                  disabled={this.state.cd_selected.length === 0}
                >
                  <i class="fas fa-upload"></i> Upload File
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* Modal create New */}
        <ModalCreateNew
          isOpen={this.state.createModal}
          toggle={this.togglecreateModal}
          className={this.props.className}
          onClosed={this.resettogglecreateModal}
          title={"Upload File"}
        >
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Upload File</td>
                  <td>:</td>
                  <td>
                    <input
                      type="file"
                      onChange={this.handleInputFile}
                      style={{ padding: "10px", visiblity: "hidden" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ModalFooter>
            <Button
              size="sm"
              block
              color="success"
              className="btn-pill"
              // disabled={this.state.rowsXLS.length === 0}
              onClick={this.postPOD}
              style={{ height: "30px", width: "100px" }}
            >
              Submit
            </Button>{" "}
          </ModalFooter>
        </ModalCreateNew>

        {/* Modal Loading */}
        <Loading isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}>
        </Loading>
        {/* end Modal Loading */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar,
  };
};

export default connect(mapStateToProps)(FMSupload);
