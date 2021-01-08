import React, { Component, Fragment, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
} from "reactstrap";
import {
  Form,
  FormGroup,
  Label,
  FormText,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Stepper from "react-stepper-horizontal";
import { ExcelRenderer } from "react-excel-renderer";

import {
  getDatafromAPITSEL,
  getDatafromAPIBHARTI,
  getDatafromAPINODE,
  postDatatoAPINODE,
  patchDatatoAPINODE,
} from "../../helper/asyncFunction";
import { filterUnique } from "../../helper/basicFunction";
import Excel from "exceljs";
import { saveAs } from "file-saver";

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

class WizardMR extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      datawizard: {},
      currentStep: 1,
      dsp_list: [],
      project_list: [],
      list_cd_options: [],
      vendor_list: [],
      asp_list: [],
      list_tower_selection_ne: [],
      list_tower_selection_fe: [],
      modal_loading: false,
      dataPS: [],
      steps: [{ title: "PS Creation" }, { title: "MR Creation" }],
      page: 0,
      dataMR: new Array(8).fill(""),
      project_name: "",
      cd_id: "",
      id_project_doc: "",
      id_cd_doc: "",
      site_ne_select: "",
      site_fe_select: "",
    };
  }

  componentDidMount() {
    // this.loadOptionsCDID();
    // this.getDataTower();
    this.getDSPList();
    // this.getDataProject();
    this.getDataWarehouse();
    // console.log("masuk");
    document.title = "MR Creation | BAM";
  }

  getDSPList() {
    getDatafromAPITSEL("/vendor_non_page").then((res) => {
      if (res.data !== undefined) {
        const items = res.data._items;
        this.setState({ vendor_list: items }, () => this.getASPList(items));
      }
    });
  }

  getASPList(datalist) {
    const aspData = datalist.filter((asp) => asp.type === "ASP");
    this.setState({ asp_list: aspData });
  }

  //   getDataProject() {
  //     getDatafromAPIBHARTI("/delhi_custdel_op").then((res) => {
  //       if (res.data !== undefined) {
  //         const items = res.data._items;
  //         this.setState({ project_list: items }, () =>
  //           this.filterDataProject(this.state.project_list)
  //         );
  //       }
  //     });
  //   }
  getDataWarehouse() {
    getDatafromAPINODE(
      '/whManagement/warehouse?q={"wh_type":{"$regex" : "internal", "$options" : "i"}}',
      this.state.tokenUser
    ).then((resWH) => {
      if (resWH.data !== undefined) {
        this.setState({ list_warehouse: resWH.data.data });
      }
    });
  }

  loadOptionsCDID = async (inputValue) => {
    if (!inputValue) {
      return [];
    } else {
      let wp_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getWPID = await getDatafromAPITSEL(
        '/custdel_tlnr_sorted_non_page?where={"WP_ID":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}'
      );
      if (getWPID !== undefined && getWPID.data !== undefined) {
        this.setState({ list_cd_options: getWPID.data._items });
        getWPID.data._items.map((wp) =>
          wp_id_list.push({
            value: wp.WP_ID,
            label: wp.WP_ID + " ( " + wp.WP_Name + " )",
            project: wp.CD_Info_Project_Name,
            id_project_doc: wp.CD_Info_Project,
            id_cd_doc: wp._id,
          })
        );
      }
      // this.setState({ project_name: wp_id_list[0].project });
      return wp_id_list;
    }
  };

  filterDataTower = (inputValue) => {
    const list = [];
    const uniqueTower = [
      ...new Set(this.state.tower_list.map((item) => item.SITE_ID_2G)),
    ];
    uniqueTower.map((i) =>
      list.push({ label: i, value: i, field: "site_id_ne" })
    );
    this.setState({
      list_tower_selection_ne: list,
    });
  };

  handleChange = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    let dataForm = this.state.dataMR;
    dataForm[parseInt(index)] = value;
    this.setState({ dataMR: dataForm }, () => console.log(this.state.dataMR));
  };

  handleChangeCD = (e) => {
    this.setState(
      {
        cd_id: e.value,
        project_name: e.project,
        id_project_doc: e.id_project_doc,
        id_cd_doc: e.id_cd_doc,
      },
      () =>
        console.log("project and cd", this.state.project_name, this.state.cd_id)
    );
  };

  toggleLoading = () => {
    this.setState((prevState) => ({
      modal_loading: !prevState.modal_loading,
    }));
  };

  fileHandler = (event) => {
    let fileObj = event.target.files[0];
    if (fileObj !== undefined) {
      ExcelRenderer(fileObj, (err, rest) => {
        if (err) {
          console.log(err);
        } else {
          // console.log("rest.rows", JSON.stringify(rest.rows));
          this.setState({
            dataPS: rest.rows,
          });
        }
      });
    }
  };

  async DownloadPStemplate() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "pp_id",
      "product_name",
      "product_type",
      "physical_group",
      "package_unit",
      "pp_group",
      "material_id",
      "material_name",
      "material_type",
      "ordering",
      "material_unit",
      "material_qty",
      "inf_code",
    ];
    const row1 = [
      "PPID2001s",
      "Package Satu",
      "HW",
      "Radio",
      "unit",
      "Radio 2",
      "MDID001",
      "Material 1",
      "active",
      "EAB",
      "pc",
      3,
      "INF 903 6083/02",
    ];

    ws.addRow(headerRow);
    ws.addRow(row1);
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Template PS RBS.xlsx");
  }

  async DownloadPStemplateTRM() {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();

    let headerRow = [
      "pp_id",
      "product_name",
      "product_type",
      "physical_group",
      "package_unit",
      "pp_group",
      "material_id",
      "material_name",
      "material_type",
      "ordering",
      "material_unit",
      "material_qty",
      "material_qty_fe",
      "inf_code",
    ];
    const row1 = [
      "PPID2001s",
      "Package Satu",
      "HW",
      "Radio",
      "unit",
      "Radio 2",
      "MDID001",
      "Material 1",
      "active",
      "EAB",
      "pc",
      3,
      1,
      "INF 903 6083/02",
    ];

    ws.addRow(headerRow);
    ws.addRow(row1);
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Template PS TRM.xlsx");
  }

  saveMRtoAPI = async () => {
    this.toggleLoading();
    let body_MR = {
      id_cd_doc: this.state.id_cd_doc,
      cd_id: this.state.cd_id,
      mr_type: 1,
      id_project_doc: this.state.id_project_doc,
      project_name: this.state.project_name,
      eta: this.state.dataMR[6],
      etd: this.state.dataMR[5],
      dsp: this.state.dataMR[7],
      asp: this.state.dataMR[4],
      wh_origin: this.state.dataMR[8],
    };
    // post ps
    const respondSaveTSSR = await postDatatoAPINODE(
      "/matreq/createMatreqWithPs",
      {
        mrInfo: body_MR,
        psData: this.state.dataPS,
        sowType: this.state.dataMR[2],
      },
      this.state.tokenUser
    );
    if (
      respondSaveTSSR.data !== undefined &&
      respondSaveTSSR.status >= 200 &&
      respondSaveTSSR.status <= 300
    ) {
      // this.setState({
      //   action_status: "success",
      //   action_message: "MR Created, please check in MR List",
      // });
      // this.toggleLoading();

      // const idps = respondSaveTSSR.data.id_plantspec_doc;
      // const nops = respondSaveTSSR.data.no_plantspec;
      // // post MR
      // let MRdata = [
      //   [
      //     "id",
      //     "project_name",
      //     "created_based",
      //     "mr_type",
      //     "mr_delivery_type",
      //     "origin_warehouse",
      //     "etd",
      //     "eta",
      //     "mr_comment_project",
      //     "sent_mr_request",
      //     "identifier",
      //     "site_id_ne",
      //     "site_id_fe",
      //     "asp_company",
      //     "asp_company_code",
      //     "dsp_company",
      //     "dsp_company_code",
      //   ],
      //   [
      //     "new",
      //     this.state.project_select,
      //     "dpr",
      //     this.state.dataMR[0],
      //     1,
      //     this.state.dataMR[4],
      //     this.state.dataMR[5],
      //     this.state.dataMR[6],
      //     null,
      //     "",
      //     "DSP",
      //     this.state.site_ne_select,
      //     this.state.site_fe_select,
      //     this.state.dataMR[7],
      //     this.state.dataMR[7],
      //     this.state.dataMR[8],
      //     this.state.dataMR[8],
      //   ],
      // ];
      // const respondCheckingMR = await postDatatoAPINODE(
      //   "/matreq/matreqByActivityNew",
      //   { id_plantspec_doc: idps, no_plantspec: nops, data: MRdata },
      //   this.state.tokenUser
      // );
      // // console.log("respondCheckingMR ", respondCheckingMR.data);
      // if (
      //   respondCheckingMR.data !== undefined &&
      //   respondCheckingMR.status >= 200 &&
      //   respondCheckingMR.status <= 300
      // ) {

      const respondSaveASG = await postDatatoAPINODE(
        "/aspAssignment/createAspAssignWithMr",
        { aspaData: respondSaveTSSR.data.aspaData },
        this.state.tokenUser
      );
      if (
        respondSaveASG.data !== undefined &&
        respondSaveASG.status >= 200 &&
        respondSaveASG.status <= 300
      ) {
        this.setState({
          action_status: "success",
          action_message: "MR & Asignment Created Succesfully",
        });
        this.toggleLoading();

        // const idmr = respondSaveASG.data.new[0]._id;
        // const no_mr = respondSaveASG.data.new[0].mr_id;
        // // Assing PS to MR
        // const respondAssignMR = await patchDatatoAPINODE(
        //   "/matreq/assignPlantSpecByTssr2/" + idmr + "/ps/" + idps,
        //   {
        //     mr_type: this.state.dataMR[0],
        //   },
        //   this.state.tokenUser
        // );
        // if (
        //   respondAssignMR.data !== undefined &&
        //   respondAssignMR.status >= 200 &&
        //   respondAssignMR.status <= 300
        // ) {
        //   this.setState({
        //     action_status: "success",
        //     action_message: "MR Created, please check in MR List",
        //   });
        //   this.toggleLoading();
        // } else {
        //   if (
        //     respondAssignMR.response !== undefined &&
        //     respondAssignMR.response.data !== undefined &&
        //     respondAssignMR.response.data.error !== undefined
        //   ) {
        //     if (respondAssignMR.response.data.error.message !== undefined) {
        //       this.setState({
        //         action_status: "failed",
        //         action_message: respondAssignMR.response.data.error.message,
        //       });
        //       this.toggleLoading();
        //     } else {
        //       this.setState({
        //         action_status: "failed",
        //         action_message: respondAssignMR.response.data.error,
        //       });
        //       this.toggleLoading();
        //     }
        //   } else {
        //     this.setState({ action_status: "failed" });
        //     this.toggleLoading();
        //   }
        // }
      } else {
        if (
          respondSaveASG.response !== undefined &&
          respondSaveASG.response.data !== undefined &&
          respondSaveASG.response.data.error !== undefined
        ) {
          if (respondSaveASG.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: respondSaveASG.response.data.error.message,
            });
            this.toggleLoading();
          } else {
            this.setState({
              action_status: "failed",
              action_message: respondSaveASG.response.data.error,
            });
            this.toggleLoading();
          }
        } else {
          this.setState({ action_status: "failed" });
          this.toggleLoading();
        }
      }
      // } else {
      //   if (
      //     respondCheckingMR.response !== undefined &&
      //     respondCheckingMR.response.data !== undefined &&
      //     respondCheckingMR.response.data.error !== undefined
      //   ) {
      //     if (respondCheckingMR.response.data.error.message !== undefined) {
      //       this.setState({
      //         action_status: "failed",
      //         action_message: respondCheckingMR.response.data.error.message,
      //       });
      //       this.toggleLoading();
      //     } else {
      //       this.setState({
      //         action_status: "failed",
      //         action_message: respondCheckingMR.response.data.error,
      //       });
      //       this.toggleLoading();
      //     }
      //   } else {
      //     this.setState({ action_status: "failed" });
      //     this.toggleLoading();
      //   }
      // }
    } else {
      if (
        respondSaveTSSR.response !== undefined &&
        respondSaveTSSR.response.data !== undefined &&
        respondSaveTSSR.response.data.error !== undefined
      ) {
        if (respondSaveTSSR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondSaveTSSR.response.data.error.message,
          });
          this.toggleLoading();
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondSaveTSSR.response.data.error,
          });
          this.toggleLoading();
        }
      } else {
        this.setState({ action_status: "failed" });
        this.toggleLoading();
      }
    }
  };

  saveSRNtoAPI = async () => {
    this.toggleLoading();
    // post ps
    const respondSaveTSSR = await postDatatoAPINODE(
      "/plantspec/createPlantspec3",
      { mr_type: this.state.dataMR[0], data: this.state.dataPS },
      this.state.tokenUser
    );
    if (
      respondSaveTSSR.data !== undefined &&
      respondSaveTSSR.status >= 200 &&
      respondSaveTSSR.status <= 300
    ) {
      const idps = respondSaveTSSR.data.id_plantspec_doc;
      const nops = respondSaveTSSR.data.no_plantspec;
      // post MR
      let MRdata = [
        [
          "id",
          "project_name",
          "created_based",
          "mr_type",
          "mr_delivery_type",
          "origin_warehouse",
          "etd",
          "eta",
          "mr_comment_project",
          "sent_mr_request",
          "identifier",
          "site_id_ne",
          "site_id_fe",
          "asp_company",
          "asp_company_code",
          "dsp_company",
          "dsp_company_code",
        ],
        [
          "new",
          this.state.project_select,
          "dpr",
          this.state.dataMR[0],
          1,
          this.state.dataMR[4],
          this.state.dataMR[5],
          this.state.dataMR[6],
          null,
          "",
          "DSP",
          this.state.site_ne_select,
          this.state.site_fe_select,
          this.state.dataMR[7],
          this.state.dataMR[7],
          this.state.dataMR[8],
          this.state.dataMR[8],
        ],
      ];
      const respondCheckingMR = await postDatatoAPINODE(
        "/matreq/matreqByActivityNew",
        { id_plantspec_doc: idps, no_plantspec: nops, data: MRdata },
        this.state.tokenUser
      );
      // console.log("respondCheckingMR ", respondCheckingMR.data);
      if (
        respondCheckingMR.data !== undefined &&
        respondCheckingMR.status >= 200 &&
        respondCheckingMR.status <= 300
      ) {
        const respondSaveMR = await postDatatoAPINODE(
          "/matreq/saveMatreqByActivity",
          { data: respondCheckingMR.data.data },
          this.state.tokenUser
        );
        if (
          respondSaveMR.data !== undefined &&
          respondSaveMR.status >= 200 &&
          respondSaveMR.status <= 300
        ) {
          const idmr = respondSaveMR.data.new[0]._id;
          // Assing PS to MR
          const respondAssignMR = await patchDatatoAPINODE(
            "/matreq/assignPlantSpecByTssr2/" + idmr + "/ps/" + idps,
            {
              mr_type: this.state.dataMR[0],
            },
            this.state.tokenUser
          );
          if (
            respondAssignMR.data !== undefined &&
            respondAssignMR.status >= 200 &&
            respondAssignMR.status <= 300
          ) {
            this.setState({
              action_status: "success",
              action_message: "SRN Created, please check in SRN List",
            });
            this.toggleLoading();
          } else {
            this.setState({ action_status: "failed" });
            this.toggleLoading();
          }
        } else {
          if (
            respondSaveMR.response !== undefined &&
            respondSaveMR.response.data !== undefined &&
            respondSaveMR.response.data.error !== undefined
          ) {
            if (respondSaveMR.response.data.error.message !== undefined) {
              this.setState({
                action_status: "failed",
                action_message: respondSaveMR.response.data.error.message,
              });
              this.toggleLoading();
            } else {
              this.setState({
                action_status: "failed",
                action_message: respondSaveMR.response.data.error,
              });
              this.toggleLoading();
            }
          } else {
            this.setState({ action_status: "failed" });
            this.toggleLoading();
          }
        }
      } else {
        if (
          respondCheckingMR.response !== undefined &&
          respondCheckingMR.response.data !== undefined &&
          respondCheckingMR.response.data.error !== undefined
        ) {
          if (respondCheckingMR.response.data.error.message !== undefined) {
            this.setState({
              action_status: "failed",
              action_message: respondCheckingMR.response.data.error.message,
            });
            this.toggleLoading();
          } else {
            this.setState({
              action_status: "failed",
              action_message: respondCheckingMR.response.data.error,
            });
            this.toggleLoading();
          }
        } else {
          this.setState({ action_status: "failed" });
          this.toggleLoading();
        }
      }
    } else {
      if (
        respondSaveTSSR.response !== undefined &&
        respondSaveTSSR.response.data !== undefined &&
        respondSaveTSSR.response.data.error !== undefined
      ) {
        if (respondSaveTSSR.response.data.error.message !== undefined) {
          this.setState({
            action_status: "failed",
            action_message: respondSaveTSSR.response.data.error.message,
          });
          this.toggleLoading();
        } else {
          this.setState({
            action_status: "failed",
            action_message: respondSaveTSSR.response.data.error,
          });
          this.toggleLoading();
        }
      } else {
        this.setState({ action_status: "failed" });
        this.toggleLoading();
      }
    }
  };

  decideMRType = () => {
    let mr_type = this.state.dataMR[0];
    switch (mr_type) {
      case "mr":
        this.saveMRtoAPI();
        break;
      case "mra":
        this.saveSRNtoAPI();
        break;
      default:
        this.setState({
          action_status: "failed",
          action_message: "Please select MR Type",
        });
        break;
    }
  };

  /*
   * the functions for our button
   */

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 1 ? 2 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
      page: this.state.page + 1,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
      page: this.state.page - 1,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <Button
          color="primary"
          className="btn-pill pull-left"
          onClick={this._prev}
          style={{ marginLeft: "20px" }}
        >
          <i className="fa fa-chevron-left" />
          &nbsp; Previous
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <Button
          color="primary"
          className="btn-pill pull-right"
          onClick={this._next}
          style={{ marginRight: "20px" }}
          disabled={this.state.dataPS.length === 0}
        >
          Next &nbsp;
          <i className="fa fa-chevron-right" />
        </Button>
      );
    }
    return null;
  }

  render() {
    const { steps, page } = this.state;
    return (
      <div>
        <Row className="row-alert-fixed">
          <Col xs="12" lg="12">
            <DefaultNotif
              actionMessage={this.state.action_message}
              actionStatus={this.state.action_status}
            />
          </Col>
        </Row>
        <Card>
          <Stepper steps={steps} activeStep={page} />
          <PScreation
            psTemplate={this.DownloadPStemplate}
            psTemplateTRM={this.DownloadPStemplateTRM}
            currentStep={this.state.currentStep}
            fileHandler={this.fileHandler}
            ps={this.state.dataPS}
          />
          <MRCreation
            list_dsp={this.state.vendor_list}
            list_asp={this.state.asp_list}
            list_project={this.loadOptionsCDID}
            list_wh={this.state.list_warehouse}
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleChangeCD={this.handleChangeCD}
            id={this.state.dataMR[0]}
            sow_type={this.state.dataMR[2]}
            project_name={this.state.project_name}
            mrdev_type={this.state.dataMR[3]}
            cdid={this.state.dataMR[1]}
            dsp_company={this.state.dataMR[7]}
            originwh={this.state.dataMR[8]}
            weektarget={this.state.dataMR[9]}
            prior={this.state.dataMR[10]}
            eta={this.state.dataMR[5]}
            etd={this.state.dataMR[6]}
            saveMRtoAPI={this.saveMRtoAPI}
          />
          <CardFooter>
            {this.previousButton()}
            {this.nextButton()}
          </CardFooter>
        </Card>

        {/* Modal Loading */}
        <Modal
          isOpen={this.state.modal_loading}
          toggle={this.toggleLoading}
          className={"modal-sm " + this.props.className}
        >
          <ModalBody>
            <div style={{ textAlign: "center" }}>
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>Loading ...</div>
            <div style={{ textAlign: "center" }}>System is processing ...</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleLoading}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {/* end Modal Loading */}
      </div>
    );
  }
}

const PScreation = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <Row>
      <Col xs="12">
        <Card className="card-border">
          <CardHeader>
            <span style={{ lineHeight: "2", fontSize: "17px" }}>
              Plant Spec Group
            </span>
            <Button
              size="sm"
              style={{ marginBottom: "0px", float: "right" }}
              onClick={props.psTemplate}
            >
              <i className="fa fa-download" aria-hidden="true">
                {" "}
                &nbsp;{" "}
              </i>
              PS Template RBS
            </Button>
            <Button
              size="sm"
              style={{
                marginBottom: "0px",
                float: "right",
                marginRight: "10px",
              }}
              onClick={props.psTemplateTRM}
            >
              <i className="fa fa-download" aria-hidden="true">
                {" "}
                &nbsp;{" "}
              </i>
              PS Template TRM
            </Button>
          </CardHeader>
          <CardBody>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Upload File</td>
                    <td>:</td>
                    <td>
                      <input
                        id="ps"
                        type="file"
                        onChange={props.fileHandler}
                        style={{ padding: "10px", visiblity: "hidden" }}
                      />
                    </td>
                    {/* <td>
                      <Button onClick={props.displayPS} disabled={props.ps.length === 0} color="success" size="sm">
                        Preview PS
                      </Button>
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
          <CardFooter>
            {props.ps.length !== 0 ? (
              <Table hover bordered striped responsive size="sm">
                <tbody>
                  {props.ps.map((row, i) => (
                    <tr key={i}>
                      {row.map((col, i) => (
                        <td key={i}>{col}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              ""
            )}
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

const MRCreation = (props) => {
  const list_dsp = props.list_dsp;
  const list_asp = props.list_asp;
  const list_project = props.list_project;
  const project_select = props.project_name;
  const list_wh = props.list_wh;
  const mr_type = props.id;
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div>
      <Row>
        <Col xl="12">
          <Card>
            <CardHeader>
              <span style={{ lineHeight: "2", fontSize: "17px" }}>
                <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                MR Creation{" "}
              </span>
            </CardHeader>
            <CardBody>
              <Form>
                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label>SOW Type</Label>
                      <Input
                        type="select"
                        id={"2"}
                        name={"2"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select SOW Type
                        </option>
                        <option value="RBS">RBS</option>
                        <option value="TRM">TRM</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Label>MR Type</Label>
                      <Input
                        type="select"
                        id={"0"}
                        name={"0"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select MR Type
                        </option>
                        <option value="New">New</option>
                        <option value="Upgrade">Upgrade</option>
                        <option value="Additional">Additional</option>
                        {/* <option value="Outstanding">Outstanding</option> */}
                        <option value="Replacement">Replacement</option>
                        {/* <option value="Return Excess">Return Excess (WH to WH)</option>
                      <option value="Return Faulty">Return Faulty (WH to WH)</option> */}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Label>MR Delivery Type</Label>
                      <Input
                        type="select"
                        id={"3"}
                        name={"3"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select MR Delivery Type
                        </option>
                        <option value="Warehouse to Site" selected>
                          Warehouse to Site
                        </option>
                        {/* <option value="Site to Warehouse">
                          Site to Warehouse
                        </option>
                        <option value="Site to Site">Site to Site</option> */}
                        {/* {(this.state.create_mr_form[3] === "New" || this.state.create_mr_form[3] === "Return Excess" || this.state.create_mr_form[3] === "Return Faulty") && (
                        <Fragment>
                          <option value="Warehouse to Warehouse" hidden={this.state.toggle_display !== "new"}>Warehouse to Warehouse</option>
                          <option value="Port to Warehouse" hidden={this.state.toggle_display !== "new"}>Port to Warehouse</option>
                          <option value="Warehouse to Port" hidden={this.state.toggle_display !== "new"}>Warehouse to Port</option>
                          <option value="Warehouse to Scrap" hidden={this.state.toggle_display !== "new"}>Warehouse to Scrap</option>
                        </Fragment>
                      )} */}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>WP ID</Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={list_project}
                        defaultOptions
                        onChange={props.handleChangeCD}
                        id={"1"}
                        name={"1"}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Project Name</Label>
                      <Input readOnly value={project_select} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Assignment By</Label>
                      <Input
                        type="select"
                        id={"4"}
                        name={"4"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select ASP
                        </option>
                        {list_asp.map((e) => (
                          <option value={e.Vendor_Code}>{e.Name}</option>
                        ))}
                      </Input>
                      {/* {this.state.create_mr_form[7] === "DSP" && (
                      <FormText color="muted" style={{fontSize : '12px', paddingLeft : '5px', marginTop : '5px'}}>
                        LDM will choose the DSP company
                      </FormText>
                    ) } */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>DSP</Label>
                      <Input
                        type="select"
                        id={"7"}
                        name={"7"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Delivery Company
                        </option>
                        <option value="DSP">DSP</option>
                        {list_dsp.map((e) => (
                          <option value={e.Vendor_Code}>{e.Name}</option>
                        ))}
                      </Input>
                      {/* {this.state.create_mr_form[7] === "DSP" && (
                      <FormText color="muted" style={{fontSize : '12px', paddingLeft : '5px', marginTop : '5px'}}>
                        LDM will choose the DSP company
                      </FormText>
                    ) } */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Origin Warehouse</Label>
                      <Input
                        type="select"
                        id={"8"}
                        name={"8"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Origin
                        </option>
                        {/* <option value="WH1">WH1</option>
                        <option value="WH2">WH2</option> */}
                        {list_wh.map((e) => (
                          <option value={e.wh_id}>
                            {e.wh_id + " - " + e.wh_name}
                          </option>
                        ))}
                      </Input>
                      {/* <Input
                        type="text"
                        name="8"
                        onChange={this.handleChangeFormMRCreation}
                        hidden={this.state.toggle_display !== "return"}
                      /> */}
                    </FormGroup>
                  </Col>
                  {/* {(this.state.create_mr_form[4] === "Warehouse to Warehouse" || this.state.create_mr_form[4] === "Warehouse to Port" || this.state.create_mr_form[4] === "Warehouse to Scrap") && (
                  <Col md={6}>
                    <FormGroup>
                      <Label>Destination</Label>
                      <Input
                        type="select"
                        id={"0"}
                        name={"0"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >                        <option value="" disabled selected hidden>Select Destination</option>
                        {this.state.list_warehouse.map(e =>
                          <option value={e.wh_id}>{e.wh_id +" - "+e.wh_name}</option>
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                )} */}
                </Row>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label>ETD</Label>
                      <Input
                        type="date"
                        id={"5"}
                        name={"5"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>ETA</Label>
                      <Input
                        type="date"
                        id={"6"}
                        name={"6"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md={3}>
                    <FormGroup>
                      <Label>Priority</Label>
                      <Input
                        type="select"
                        id={"10"}
                        name={"10"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Priority
                        </option>
                        <option value={"P1"}>P1</option>
                        <option value={"P2"}>P2</option>
                        <option value={"P3"}>P3</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Week target</Label>
                      <Input
                        type="number"
                        id={"9"}
                        name={"9"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                {/* {this.state.create_mr_form[3] === "Replacement" && (
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Note Replacement</Label>
                      <Input
                        type="text"
                        name="12" value={this.state.create_mr_form[12]} onChange={this.handleChangeFormMRCreation}
                        style={this.state.validation_form.etd === false ? {borderColor : 'red'} : {}}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>MR Related</Label>
                      <AsyncSelect
                        loadOptions={this.loadOptionsMRID}
                        defaultOptions
                        onChange={this.handleChangeMRID}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )} */}
              </Form>
              <Button
                color="success"
                style={{ float: "right" }}
                onClick={props.saveMRtoAPI}
              >
                <i
                  className="fa fa-plus-square"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                Create
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(WizardMR);
