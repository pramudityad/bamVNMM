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
  getDatafromAPIEXEL,
  getDatafromAPIBHARTI,
  getDatafromAPITSEL,
  getDatafromAPI_PDB2,
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

class WizardMRDis extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userRole: this.props.dataLogin.role,
      userId: this.props.dataLogin._id,
      userName: this.props.dataLogin.userName,
      tokenPDB: this.props.dataLogin.token_pdb,
      userEmail: this.props.dataLogin.email,
      tokenUser: this.props.dataLogin.token,
      datawizard: {},
      currentStep: 1,
      vendor_list: [],
      project_list: [],
      list_project_selection: [],
      list_warehouse: [],
      list_tower_selection_ne: [],
      list_tower_selection_fe: [],
      modal_loading: false,
      dataPS: [],
      steps: [{ title: "PS Creation" }, { title: "MRA Creation" }],
      page: 0,
      dataMR: new Array(8).fill(""),
      project_name: "",
      cd_id: "",
      id_project_doc: "",
      id_cd_doc: "",
      wp_name: "",
      site_id: "",
      site_name: "",
      site_fe_select: "",
      mr_select: "",
      list_asg_selection: [],
      asp_list: [],
    };
  }

  componentDidMount() {
    // this.getDataCD();
    // this.getDataTower();
    this.getDSPList();
    // this.getDataProject();
    this.getDataWarehouse();
    console.log("masuk");
    document.title = "MR Creation | BAM";
  }

  // getDSPList() {
  //   getDatafromAPITSEL("/vendor_non_page").then((res) => {
  //     if (res.data !== undefined) {
  //       const items = res.data._items;
  //       this.setState({ vendor_list: items }, () => this.getASPList(items));
  //     }
  //   });
  // }

  getDSPList() {
    getDatafromAPI_PDB2("/get-vendors").then((res) => {
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
    // if (!inputValue) {
    //   return [];
    // } else {
      let wp_id_list = [];
      // const getSSOWID = await this.getDatafromAPIXL('/ssow_sorted_nonpage?where={"ssow_id":{"$regex":"'+inputValue+'", "$options":"i"}, "sow_type":"'+this.state.list_activity_selected.CD_Info_SOW_Type +'"}');
      const getWPID = await getDatafromAPI_PDB2(
        '/get-activities'
      );
      if (getWPID !== undefined && getWPID.data !== undefined) {
        this.setState({ list_cd_options: getWPID.data._items });
        getWPID.data._items.map((wp) =>
          wp_id_list.push({
            value: wp.WP_ID,
            label: wp.WP_ID + " ( " + wp.Site_Info_Address_NE + " )",
            project: wp.CD_Info_Project_Name,
            id_project_doc: wp.CD_Info_Project,
            id_cd_doc: wp._id,
            wp_name: wp.WP_Name,
            site_name: wp.Site_Info_SiteName_NE,
            site_id:wp.Site_Info_SiteID_Value_NE
          })
        );
      }
      // this.setState({ project_name: wp_id_list[0].project });
      return wp_id_list;
    // }
  };

  loadOptionsMR = async (inputValue) => {
    if (!inputValue) {
      // this.setState({ list_asg_selection: [] });
      return [];
    } else {
      console.log("cari mr");
      let asg_list = [];
      const getASG = await getDatafromAPINODE(
        '/matreq?srt=_id:-1&q={"mr_id":{"$regex":"' +
          inputValue +
          '", "$options":"i"}}&v={"mr_id":1, "Site_ID" : 1}',
        this.state.tokenUser
      );
      // console.log(getASG.data.data);
      if (getASG !== undefined && getASG.data !== undefined) {
        getASG.data.data.map((mr) =>
          asg_list.push({
            label: mr.mr_id !== undefined ? mr.mr_id : null,
            value: mr._id,
            mr_id: mr.mr_id,
          })
        );
        // this.setState({ list_asg_selection: getASG.data.data }, () =>
        //   getASG.data.data.map((mr) =>
        //     asg_list.push({
        //       label: mr.mr_id !== undefined ? mr.mr_id : null,
        //       value: mr._id,
        //       mr_id: mr.mr_id,
        //     })
        //   )
        // );
      }
      //console.log(asg_list);
      return asg_list;
    }
  };

  filterDataProject = (inputValue) => {
    const list = [];
    const uniqueProject = [
      ...new Set(this.state.project_list.map((item) => item.PROJECT)),
    ];
    uniqueProject.map((i) =>
      list.push({ label: i, value: i, field: "project_name" })
    );
    this.setState({ list_project_selection: list });
    if (inputValue.length === 0) {
      return list;
    } else {
      return this.state.list_project_selection.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
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
    this.setState({
      cd_id: e.value,
      project_name: e.project,
      id_project_doc: e.id_project_doc,
      id_cd_doc: e.id_cd_doc,
      wp_name: e.wp_name,
      site_id: e.site_id,
      site_name: e.site_name,
    },() =>
    console.log("project and cd", this.state.project_name, this.state.id_project_doc));
    // console.log("project ", this.state.project_select);
  };

  handleChangeMR = (e) => {
    this.setState({
      mr_select: e.mr_id,
    });
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
    saveAs(new Blob([allocexport]), "Template PS.xlsx");
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
      "",
      "INF 903 6083/02",
    ];

    ws.addRow(headerRow);
    ws.addRow(row1);
    const allocexport = await wb.xlsx.writeBuffer();
    saveAs(new Blob([allocexport]), "Template PS Return.xlsx");
  }

  saveMRtoAPI = async () => {
    this.toggleLoading();
    let body_MRA = {
      id_cd_doc: this.state.id_cd_doc,
      cd_id: this.state.cd_id,
      mra_type: 1,
      id_project_doc: this.state.id_project_doc,
      project_name: this.state.project_name,
      delivery_category: this.state.dataMR[1],
      eta: this.state.dataMR[6],
      etd: this.state.dataMR[5],
      dsp: this.state.dataMR[4],
      asp: this.state.dataMR[3],
      wh_destination: this.state.dataMR[2],
      mr_related: this.state.mr_select,
    };
    // post ps
    const respondSaveTSSR = await postDatatoAPINODE(
      "/matreq-srn/createMatreqReturnWithPs",
      { mraInfo: body_MRA, psData: this.state.dataPS, access_token_vnmm: this.state.tokenPDB },
      this.state.tokenUser
    );
    if (
      respondSaveTSSR.data !== undefined &&
      respondSaveTSSR.status >= 200 &&
      respondSaveTSSR.status <= 300
    ) {
      this.setState({
        action_status: "success",
        action_message: "MRA Created, please check in MRA List",
      });
      this.toggleLoading();

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
      //   const respondSaveMR = await postDatatoAPINODE(
      //     "/matreq/saveMatreqByActivity",
      //     { data: respondCheckingMR.data.data },
      //     this.state.tokenUser
      //   );
      //   if (
      //     respondSaveMR.data !== undefined &&
      //     respondSaveMR.status >= 200 &&
      //     respondSaveMR.status <= 300
      //   ) {
      //     const idmr = respondSaveMR.data.new[0]._id;
      //     const no_mr = respondSaveMR.data.new[0].mr_id;
      //     // Assing PS to MR
      //     const respondAssignMR = await patchDatatoAPINODE(
      //       "/matreq/assignPlantSpecByTssr2/" + idmr + "/ps/" + idps,
      //       {
      //         mr_type: this.state.dataMR[0],
      //       },
      //       this.state.tokenUser
      //     );
      //     if (
      //       respondAssignMR.data !== undefined &&
      //       respondAssignMR.status >= 200 &&
      //       respondAssignMR.status <= 300
      //     ) {
      //       this.setState({
      //         action_status: "success",
      //         action_message: "MR Created, please check in MR List",
      //       });
      //       this.toggleLoading();
      //     } else {
      //       if (
      //         respondAssignMR.response !== undefined &&
      //         respondAssignMR.response.data !== undefined &&
      //         respondAssignMR.response.data.error !== undefined
      //       ) {
      //         if (respondAssignMR.response.data.error.message !== undefined) {
      //           this.setState({
      //             action_status: "failed",
      //             action_message: respondAssignMR.response.data.error.message,
      //           });
      //           this.toggleLoading();
      //         } else {
      //           this.setState({
      //             action_status: "failed",
      //             action_message: respondAssignMR.response.data.error,
      //           });
      //           this.toggleLoading();
      //         }
      //       } else {
      //         this.setState({ action_status: "failed" });
      //         this.toggleLoading();
      //       }
      //     }
      //   } else {
      //     if (
      //       respondSaveMR.response !== undefined &&
      //       respondSaveMR.response.data !== undefined &&
      //       respondSaveMR.response.data.error !== undefined
      //     ) {
      //       if (respondSaveMR.response.data.error.message !== undefined) {
      //         this.setState({
      //           action_status: "failed",
      //           action_message: respondSaveMR.response.data.error.message,
      //         });
      //         this.toggleLoading();
      //       } else {
      //         this.setState({
      //           action_status: "failed",
      //           action_message: respondSaveMR.response.data.error,
      //         });
      //         this.toggleLoading();
      //       }
      //     } else {
      //       this.setState({ action_status: "failed" });
      //       this.toggleLoading();
      //     }
      //   }
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
            list_mr={this.loadOptionsMR}
            currentStep={this.state.currentStep}
            list_wh={this.state.list_warehouse}
            handleChange={this.handleChange}
            handleChangeMR={this.handleChangeMR}
            handleChangeCD={this.handleChangeCD}
            wp_name={this.state.wp_name}
            site_id={this.state.site_id}
            site_name={this.state.site_name}
            project_name={this.state.project_name}
            id={this.state.dataMR[0]}
            sow_type={this.state.dataMR[2]}
            mrdev_type={this.state.dataMR[3]}
            delivery_category={this.state.dataMR[1]}
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
            {/* <Button
              size="sm"
              style={{ marginBottom: "0px", float: "right" }}
              onClick={props.psTemplate}
            >
              <i className="fa fa-download" aria-hidden="true">
                {" "}
                &nbsp;{" "}
              </i>
              PS Template RBS
            </Button> */}
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
              PS Template Return
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
  const list_wh = props.list_wh;
  const list_mr = props.list_mr;
  const wp_name = props.wp_name;
  const site_id = props.site_id;
  const site_name = props.site_name;
  const project_name = props.project_name;
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
                <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>MRA
                Creation{" "}
              </span>
            </CardHeader>
            <CardBody>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>MRA Type</Label>
                      <Input
                        type="select"
                        id={"0"}
                        name={"0"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select MRA Type
                        </option>
                        <option value="1">Dismantle</option>
                        <option value="2">Return Excess</option>
                        <option value="3">Return Faulty</option>
                        {/* <option value="4">Relocation</option> */}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        WP ID Source
                        <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                      </Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={list_project}
                        defaultOptions
                        onChange={props.handleChangeCD}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>WP Name Source</Label>
                      <Input
                        type="text"
                        // name="site_name"
                        readOnly
                        value={wp_name}
                        // onChange={this.handleChangeCD}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Site ID Source</Label>
                      <Input
                        type="text"
                        // name="site_name"
                        readOnly
                        value={site_id}
                        // onChange={this.handleChangeCD}
                      />{" "}
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Site Name Source</Label>
                      <Input
                        type="text"
                        // name="site_name"
                        readOnly
                        value={site_name}
                        // onChange={this.handleChangeCD}
                      />{" "}
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Project Name Source</Label>
                      <Input
                        type="text"
                        // name="site_name"
                        readOnly
                        value={project_name}
                        // onChange={this.handleChangeCD}
                      />{" "}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Destination
                        <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                      </Label>
                      <Input
                        type="select"
                        id={"1"}
                        name={"1"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Destination
                        </option>
                        <option value="TWH">Delivery to Warehouse</option>
                        {/* <option value="TST">Delivery to Site</option> */}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Warehouse
                        {/* {this.state.form_creation.destination === "TWH" && (
                          <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                        )} */}
                      </Label>
                      <Input
                        type="select"
                        id={"2"}
                        name={"2"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Warehouse
                        </option>
                        {list_wh.map((e) => (
                          <option value={e.wh_id}>
                            {e.wh_id + " - " + e.wh_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Dismantle by
                        <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                      </Label>
                      <Input
                        type="select"
                        id={"3"}
                        name={"3"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Dismantle Company
                        </option>
                        {list_asp.map((e) => (
                          <option value={e.Vendor_Code}>{e.Name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Deliver by
                        <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                      </Label>
                      <Input
                        type="select"
                        id={"4"}
                        name={"4"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      >
                        {" "}
                        <option value="" disabled selected hidden>
                          Select Delivery Company
                        </option>
                        {list_dsp.map((e) => (
                          <option value={e.Vendor_Code}>{e.Name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/* {this.state.form_creation.destination === "TST" && (
                <Fragment>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>WP ID Destination<span style={{color : 'rgba(216,67,21 ,1)'}}>*</span></Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptionsWPIDDestination}
                          defaultOptions
                          onChange={this.handleChangeWPIDDestination}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>WP Name Destination</Label>
                        <Input type="type" name="site_name" readOnly value={this.state.form_creation.wp_name_destination} onChange={this.handleChangeCD} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Site ID Destination</Label>
                        <Input type="type" name="site_id" readOnly value={this.state.form_creation.site_id_destination} onChange={this.handleChangeCD} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Site Name Destination</Label>
                        <Input type="type" name="site_name" readOnly value={this.state.form_creation.site_name_destination} onChange={this.handleChangeCD} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Project Name Destination</Label>
                        <Input type="type" name="project_name" readOnly value={this.state.form_creation.project_name_destination} onChange={this.handleChangeCD} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Fragment>
              )} */}
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        ETD
                        <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                      </Label>
                      <Input
                        type="date"
                        id={"5"}
                        name={"5"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      />{" "}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        ETA
                        <span style={{ color: "rgba(216,67,21 ,1)" }}>*</span>
                      </Label>
                      <Input
                        type="date"
                        id={"6"}
                        name={"6"}
                        value={props.dataMR}
                        onChange={props.handleChange}
                      />{" "}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        MR ID
                        <span style={{ marginLeft: "5px", fontSize: "10px" }}>
                          (Optional)
                        </span>
                      </Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={list_mr}
                        defaultOptions
                        onChange={props.handleChangeMR}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label>Notes<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <Input type="textarea" name="notes" value={this.state.form_creation.notes} onChange={this.handleChangeText} />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>Assignemnt ID<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <AsyncSelect loadOptions={this.loadOptionsASG} defaultOptions onChange={this.handleChangeASG} />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>Assignment Site ID</Label>
                    <Input type="text" name="site_id_asg" value={this.state.form_creation.site_id_asg} readOnly />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label>MR ID<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <AsyncSelect loadOptions={this.loadOptionsMR} defaultOptions onChange={this.handleChangeMR} />
                  </FormGroup>
                </Col>
              </Row> */}
                {/* <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label>BAPA File<span style={{marginLeft : '5px', fontSize : '10px'}}>(Optional)</span></Label>
                    <input type="file" onChange={this.handleInputFile} style={{visiblity: "hidden" }} />
                  </FormGroup>
                </Col>
              </Row> */}
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                color="success"
                style={{ float: "right" }}
                size="sm"
                onClick={props.saveMRtoAPI}
                // disabled={this.state.modal_loading === true}
              >
                <i
                  className="fa fa-plus-square"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                Create MRA
              </Button>
            </CardFooter>
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

export default connect(mapStateToProps)(WizardMRDis);
