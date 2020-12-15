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
import { Form, FormGroup, Label, Table } from "reactstrap";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import ModalCreateNew from "../components/ModalCreateNew";
import Loading from "../components/Loading";

import {
  getDatafromAPIEXEL,
  postDatatoAPINODE,
  postDatatoAPINODEdata,
} from "../../helper/asyncFunction";
const DefaultNotif = React.lazy(() =>
  import("../../views/DefaultView/DefaultNotif")
);

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

class SIDupload extends Component {
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
      create_assignment_form: new Array(69).fill(null),
      // creation_ssow_form : new Array(1).fill({}),
      list_cd_id: [],
      creation_ssow_form: [],
      list_tower: [],
      list_project: [],
      list_tower_selection: [],
      list_project_selection: [],
      tower_selected_id: null,
      project_selected: null,
      project_name_selected: null,
      preview_data_assignment: null,
      assignment_ssow_upload: null,
      can_edit_ssow: false,
      identifier_by: "cd_id",
      email_cpm: null,
      cd_selected: {},
      createModal: false,
      type_uploader_selected : "SID",
    };

    this.loadOptionsCDID = this.loadOptionsCDID.bind(this);
    this.handlemultipleCD = this.handlemultipleCD.bind(this);
    this.handleChangeTypeUploader = this.handleChangeTypeUploader.bind(this);
  }

  componentDidMount() {
    document.title = "SID Upload | BAM";
  }

  async postAssignment() {
    const dataForm = this.state.create_assignment_form;
  }

  async loadOptionsCDID(inputValue) {
    if (!inputValue) {
      return [];
    } else {
      let wp_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getWPID = await getDatafromAPIEXEL(
        '/custdel_op?where={"WP_ID":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}&projection={"WP_ID":1,"CD_Info_Project_Name":1,"CD_Info_Project":1,"Project_Code":1,"Tower_Info_TowerID_NE":1,"Tower_Info_TowerName_NE":1,"WP_Name":1}'
      );
      if (getWPID !== undefined && getWPID.data !== undefined) {
        this.setState({ list_cd_id: getWPID.data._items });
        getWPID.data._items.map((wp) =>
          wp_id_list.push({
            value: wp.WP_ID,
            label: wp.WP_ID + " ( " + wp.WP_Name + " )",
            project: wp.CD_Info_Project_Name,
            id: wp._id,
          })
        );
      }
      this.setState({ project_name: wp_id_list[0].project });
      return wp_id_list;
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
    if (cdlist !== undefined && cdlist !== null) {
      // cdlist.map((e) => cd_array.push({ id_cd_doc: e.id, cd_id: e.value }));
      this.setState({ cd_selected: { id_cd_doc: cdlist.id, cd_id: cdlist.value,  } }, () =>
        console.log(this.state.cd_selected)
      );
    } else {
      this.setState({ cd_selected: {} }, () =>
        console.log(this.state.cd_selected)
      );
    }
  };

  displayCDInfo = () => {
    let _id = this.state.cd_selected.id_cd_doc;
    let cdInfo = this.state.list_cd_id.find(e => e._id === _id)
    console.log('cdInfo ', cdInfo)
    if (cdInfo === undefined){
      return(<></>)
    }else {
      return (
        <>
          <Table hover bordered responsive size="sm" width="100%">
            <thead class="table-commercial__header--fixed">
              <tr>
                <th>CD ID</th>
                <th>Project Name</th>
                <th>Project Code</th>
              </tr>
            </thead>
            <tbody>
                  <tr>
                    <td>{cdInfo.WP_ID}</td>
                    <td>{cdInfo.CD_Info_Project_Name}</td>
                    <td>{cdInfo.Project_Code}</td>
                  </tr>
            </tbody>
          </Table>
        </>
      );
    }
  };

  toggleLoading = () => {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  };

  postSID = async () => {
    this.toggleLoading();
    this.togglecreateModal();
    let _id = this.state.cd_selected.id_cd_doc;
    let cdInfo = this.state.list_cd_id.find(e => e._id === _id);
    const dataCDID = {
      id_cd_doc : _id,
      cd_id : cdInfo.WP_ID,
      id_project_doc : cdInfo.CD_Info_Project,
      project_name : cdInfo.CD_Info_Project_Name,
      project_code : cdInfo.Project_Code
    }
    const dataSite = {
      id_site_doc : null,
      site_id : cdInfo.Tower_Info_TowerID_NE,
      site_ne_id : cdInfo.Tower_Info_TowerID_NE,
      site_name : cdInfo.Tower_Info_TowerName_NE
    }
    let fileDocument = new FormData();
    await fileDocument.append("fileDocument", this.state.inputan_file);
    await fileDocument.append(
      "cdIdList",
      JSON.stringify([Object.assign({}, this.state.cd_selected, dataCDID)])
    );
    await fileDocument.append("site_info", JSON.stringify([dataSite]));
    await fileDocument.append("type", JSON.stringify(this.state.type_uploader_selected));
    const respostSID = await postDatatoAPINODEdata(
      "/sidFile/createSidFile",
      fileDocument,
      this.state.tokenUser
    );
    if (
      respostSID.data !== undefined &&
      respostSID.status >= 200 &&
      respostSID.status <= 300
    ) {
      this.setState({
        action_status: "success",
        action_message: "Upload Succeed",
      });
      this.toggleLoading();
    } else {
      if (respostSID.response !== undefined && respostSID.response.data !== undefined && respostSID.response.data.error !== undefined) {
        if (respostSID.response.data.error.message !== undefined) {
          this.setState({ action_status: 'failed', action_message: respostSID.response.data.error.message });
        } else {
          this.setState({ action_status: 'failed', action_message: respostSID.response.data.error });
        }
      } else {
        this.setState({ action_status: 'failed' });
      }
      this.toggleLoading();
    }
  };

  handleChangeTypeUploader(e){
    this.setState({type_uploader_selected : e.target.value});
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
                  SID Upload
                </span>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{ paddingLeft: "16px" }}>
                        <Label>Type</Label>
                          <Input type="select" onChange={this.handleChangeTypeUploader} value={this.state.type_uploader_selected}>
                            <option value="SID">
                              SID
                            </option>
                            <option value="ABD">
                              ABD
                            </option>
                          </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup style={{ paddingLeft: "16px" }}>
                        <Label>CD ID</Label>
                        <AsyncSelect
                        // isMulti
                          loadOptions={this.loadOptionsCDID}
                          defaultOptions
                          onChange={this.handlemultipleCD}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                {/* {this.state.cd_selected === undefined ? "" : this.displayCDInfo() } */}
                {this.state.cd_selected === {} ? "": this.displayCDInfo()}
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
              onClick={this.postSID}
              style={{ height: "30px", width: "100px" }}
            >
              Submit
            </Button>{" "}
          </ModalFooter>
        </ModalCreateNew>

        {/* Modal Loading */}
        <Loading
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm modal--loading "}
        ></Loading>
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

export default connect(mapStateToProps)(SIDupload);
