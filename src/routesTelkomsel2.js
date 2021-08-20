import React from "react";
// import WHDashboard from './viewsTelkomsel2/Milestone/WHDashboard';

const Dashboard = React.lazy(() => import("./views/Dashboard"));

const ProductPackage = React.lazy(() =>
  import("./viewsTelkomsel2/ProductPackage/PackageUpload")
);
const ServiceLibrary = React.lazy(() =>
  import("./viewsTelkomsel2/SVC/ServiceLibrary")
);
const ConfigManager = React.lazy(() =>
  import("./viewsTelkomsel2/Configlib/Configlibrary")
);

const ListTechnical = React.lazy(() =>
  import("./viewsTelkomsel2/Technical/ListTechnical")
);
const DetailTechnical = React.lazy(() =>
  import("./viewsTelkomsel2/Technical/TechnicalBoq")
);
const SummaryBoq = React.lazy(() =>
  import("./viewsTelkomsel2/Technical/SummaryBoq")
);

// const DetailCommercialPO = React.lazy(() => import('./viewsTelkomsel2/Commercial/CommercialBoqPO'));
const ApprovalCommercial = React.lazy(() =>
  import("./viewsTelkomsel2/Commercial/CommercialBoqApproval")
);
const SubmissionCommBoq = React.lazy(() =>
  import("./viewsTelkomsel2/Commercial/SubmissionCommBoq")
);

const ListTssrMatrix = React.lazy(() =>
  import("./viewsTelkomsel2/TssrMatrix/ListTSSRBoq")
);
const DetailTssrMatrix = React.lazy(() =>
  import("./viewsTelkomsel2/TssrMatrix/UploadTSSRMatrix")
);
const NewTssrMatrix = React.lazy(() =>
  import("./viewsTelkomsel2/TssrMatrix/TSSRbyTech")
);

const ListTSSRBoq = React.lazy(() =>
  import("./viewsTelkomsel2/Tssr/ListTSSRBoq")
);
const DetailTSSRBoq = React.lazy(() => import("./viewsTelkomsel2/Tssr/TSSRBoq"));

const PSList = React.lazy(() => import("./viewsTelkomsel2/PS/PSList"));
const PSBOM = React.lazy(() => import("./viewsTelkomsel2/PS/PSBOM"));
const PSBOMDetail = React.lazy(() => import("./viewsTelkomsel2/PS/DetailPS"));

const CRDetail = React.lazy(() => import("./viewsTelkomsel2/CR/CRDetail"));

const MRList = React.lazy(() => import("./viewsTelkomsel2/MR/MRList"));
const MRNAList = React.lazy(() => import("./viewsTelkomsel2/MR/MRNAList"));
const MRCreation = React.lazy(() => import("./viewsTelkomsel2/MR/MRCreation2"));
const BulkMRCreation = React.lazy(() => import("./viewsTelkomsel2/MR/BulkMR"));
const MRDetail = React.lazy(() => import("./viewsTelkomsel2/MR/MRDetail"));
const PSUpload = React.lazy(() => import("./viewsTelkomsel2/MR/PSUpload"));
const MRProgress = React.lazy(() => import("./viewsTelkomsel2/MR/MRProgress"));
const BulkChangeApproval = React.lazy(() =>
  import("./viewsTelkomsel2/MR/ListChangeApproval")
);
const BulkApproval = React.lazy(() =>
  import("./viewsTelkomsel2/MR/ListBulkApproval")
);
const BulkRequest = React.lazy(() => import("./viewsTelkomsel2/MR/BulkRequest"));
const MRDashboardGlob = React.lazy(() =>
  import("./viewsTelkomsel2/MR/DashMR/MRDashboardGlob")
);

const OrderReceived = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/OrderReceived")
);
const OrderProcessing = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/OrderProcessing")
);
const ReadyToDeliver = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/ReadyToDeliver")
);
const JointCheck = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/JointCheck")
);
const LoadingProcess = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/LoadingProcess2")
);
const WaitingDispatch = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/WaitingDispatch")
);
const MaterialDispatch = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/MaterialDispatch")
);
const OrderCreated = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/OrderCreated")
);
const LOMList = React.lazy(() => import("./viewsTelkomsel2/MR/LOMList"));

const AssignmentCreation = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentCreation")
);
const AssignmentList = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentList")
);
const AssignmentReport = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentReport")
);
const BulkAssignment = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/BulkAssignment")
);
const AssignmentDetail = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentDetail")
);
const AssignmentEdit = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentEdit")
);
const AssignBast = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignBast")
);
const BulkNotifytoASP = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/BulkNotifytoASP")
);
const AssignmentListASP = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentListASP")
);
const AssignmentDetailASP = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentDetailASP")
);
const AssignmentListApproval = React.lazy(() =>
  import("./viewsTelkomsel2/Assignment/AssignmentListApproval")
);

const WHManagement = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/WHManagement")
);

const ShipmentList = React.lazy(() =>
  import("./viewsTelkomsel2/ShipmentList/ShipmentList")
);

const ASPManagement = React.lazy(() => import("./viewsTelkomsel2/ASP/ASPUser"));
const ASPManagementDet = React.lazy(() =>
  import("./viewsTelkomsel2/ASP/ASPUserDet")
);

const WHDashboard = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/Dashboard/WHDashboard")
);
const WHDashboardDet = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/Dashboard/WHDashboardDet")
);

const GRExternal = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/External/GR")
);
const GIExternal = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/External/GI")
);
const GRInternalDet = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/Internal/GRInternal")
);
const GIInternalDet = React.lazy(() =>
  import("./viewsTelkomsel2/Milestone/Internal/GIInternal")
);

const WHDashboardExt = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/Dashboard/WHDashboardext")
);
const WHDashboardExtDet = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/Dashboard/WHDashboardextDet")
);

const MaterialStock = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/MatStock")
);
const MaterialInboundPlan = React.lazy(() =>
  import("./viewsTelkomsel2/Warehouse/MatInboundPlan")
);

const DSACreation = React.lazy(() =>
  import("./viewsTelkomsel2/DSA/DSACreation")
);
const DSAList = React.lazy(() => import("./viewsTelkomsel2/DSA/DSAList"));
const DSADetail = React.lazy(() => import("./viewsTelkomsel2/DSA/DSADetail"));
const DSAEdit = React.lazy(() => import("./viewsTelkomsel2/DSA/DSAEdit2"));

const LCCList = React.lazy(() => import("./viewsTelkomsel2/LCC/LCCList"));
const LCCDetail = React.lazy(() => import("./viewsTelkomsel2/LCC/LCCDetail"));
const LCCCreation = React.lazy(() =>
  import("./viewsTelkomsel2/LCC/LCCCreation")
);
const LCCEdit = React.lazy(() => import("./viewsTelkomsel2/LCC/LCCEdit"));

const SIDUploader = React.lazy(() => import("./viewsTelkomsel2/SID/SIDupload"));
const SIDList = React.lazy(() => import("./viewsTelkomsel2/SID/SIDList"));

const PRPOCreation = React.lazy(() =>
  import("./viewsTelkomsel2/PRPO/CreatePRPO")
);
const ListPRPO = React.lazy(() => import("./viewsTelkomsel2/PRPO/ListPRPO"));
const DetailPRPO = React.lazy(() => import("./viewsTelkomsel2/PRPO/DetailPRPO"));
const EditPRPO = React.lazy(() => import("./viewsTelkomsel2/PRPO/EditPRPO"));

const MRAList = React.lazy(() => import("./viewsTelkomsel2/MRA/MRAList"));
const MRANeedConfirm = React.lazy(() =>
  import("./viewsTelkomsel2/MRA/MRANeedConfirm")
);
const MRADetail = React.lazy(() => import("./viewsTelkomsel2/MRA/MRADetail"));

const SHFList = React.lazy(() => import("./viewsTelkomsel2/SHF/SHFList"));

const MatLibrary = React.lazy(() =>
  import("./viewsTelkomsel2/MatLibrary/MatLibrary")
);

const MRDisList = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/MRDisList")
);
const MRDisCreation = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/MRDisCreation2")
);
const MRDisDetail = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/MRDisDetail")
);

const MRDisNAList = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/MRDisNAList")
);
const PSAssigntoMR = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/PSAssigntoMR")
);

const LDMApprovalDismantle = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/LDMApprovalDismantle")
);
const MRDismantleConfirmWH = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/MRDismantleConfirmWH")
);

const PSDisList = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/PSDisList")
);
const PSDisCreation = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/PSDisCreation")
);
const PSDisDetail = React.lazy(() =>
  import("./viewsTelkomsel2/MRDismantle/PSDisDetail")
);

const ListTechnicalMW = React.lazy(() =>
  import("./viewsTelkomsel2/Microwave/Technical/ListTechnicalMW")
);
const DetailTechnicalMW = React.lazy(() =>
  import("./viewsTelkomsel2/Microwave/Technical/TechnicalBoqMW")
);
const SummaryBoqMW = React.lazy(() =>
  import("./viewsTelkomsel2/Microwave/Technical/SummaryBoqMW")
);

const PSCreationMW = React.lazy(() =>
  import("./viewsTelkomsel2/PS/PSCreationMW")
);
const PSBOMDetailMW = React.lazy(() =>
  import("./viewsTelkomsel2/PS/PSDetailMW")
);

const PSWHList = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/PSWarehouseList")
);
const PSWHCreation = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/PSWarehouseCreation")
);
const PSWHDetail = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/PSWarehouseDetail")
);

const MRWHList = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/ListMRWarehouse")
);
const MRWHNAList = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/MRWHNAList")
);
const AssingPStoMRWH = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/AssingPStoMRWH")
);
const MRWHDismantle = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/MRWHDismantle")
);
const MRWHConfirm = React.lazy(() =>
  import("./viewsTelkomsel2/MRtoWarehouse/MRWHConfirm")
);

const DSAMigration = React.lazy(() =>
  import("./viewsTelkomsel2/DSA/DSAMigration")
);

const MRDismantleBulk = React.lazy(() =>
  import("./views/MRDismantle/MRDismantleBulk")
);

const AdditionalPackage = React.lazy(() =>
  import("./viewsTelkomsel2/ProductPackage/AdditionalPackage")
);

const DSADCreation = React.lazy(() =>
  import("./viewsTelkomsel2/DSADismantle/DSADCreation")
);
const DSADList = React.lazy(() =>
  import("./viewsTelkomsel2/DSADismantle/DSADList")
);
const DSADDetail = React.lazy(() =>
  import("./viewsTelkomsel2/DSADismantle/DSADDetail")
);
const DSADEdit = React.lazy(() =>
  import("./viewsTelkomsel2/DSADismantle/DSADEdit2")
);

const DSADMigration = React.lazy(() =>
  import("./viewsTelkomsel2/DSADismantle/DSADMigration")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/product-package",
    exact: true,
    name: "Product Package Manager",
    component: ProductPackage,
  },
  {
    path: "/variant-library",
    exact: true,
    name: "Product Package Variant",
    component: ConfigManager,
  },

  {
    path: "/svc-library",
    exact: true,
    name: "Service Library",
    component: ServiceLibrary,
  },

  {
    path: "/list-technical",
    exact: true,
    name: "List Technical BOQ",
    component: ListTechnical,
  },
  {
    path: "/detail-technical/:id",
    exact: true,
    name: "Detail Technical BOQ",
    component: DetailTechnical,
  },
  {
    path: "/new-technical",
    exact: true,
    name: "Detail Technical BOQ",
    component: DetailTechnical,
  },
  {
    path: "/summary-boq/:id",
    exact: true,
    name: "Detail Summary BOQ",
    component: SummaryBoq,
  },

  {
    path: "/approval-commercial/:id",
    exact: true,
    name: "Approval for Commercial BOQ",
    component: ApprovalCommercial,
  },
  {
    path: "/submission-commercial/:id",
    exact: true,
    name: "Submission Commercial BOQ",
    component: SubmissionCommBoq,
  },

  {
    path: "/list-tssr-matix",
    exact: true,
    name: "List TSSR Matrix BOQ",
    component: ListTssrMatrix,
  },
  {
    path: "/list-tssr-matix/creation",
    exact: true,
    name: "TSSR Matrix BOQ Creation",
    component: NewTssrMatrix,
  },
  {
    path: "/list-tssr-matix/:id",
    exact: true,
    name: "Detail TSSR Matrix BOQ",
    component: DetailTssrMatrix,
  },

  {
    path: "/list-tssr-boq",
    exact: true,
    name: "BOQ Reservation List",
    component: ListTSSRBoq,
  },
  {
    path: "/list-tssr-boq/detail/:id",
    exact: true,
    name: "BOQ Reservation Detail",
    component: DetailTSSRBoq,
  },

  { path: "/ps-list", exact: true, name: "Plant Spec List", component: PSList },
  {
    path: "/ps-creation",
    exact: true,
    name: "Plant Spec BOM",
    component: PSBOM,
  },
  { path: "/ps-detail/:id", name: "Plant Spec BOM", component: PSBOMDetail },

  { path: "/cr-detail", exact: true, name: "CR Detail", component: CRDetail },

  {
    path: "/mr-dashboard-global",
    exact: true,
    name: "Material Request Dashboard",
    component: MRDashboardGlob,
  },
  { path: "/mr-list", exact: true, name: "MR List", component: MRList },
  {
    path: "/mr-na-list",
    exact: true,
    name: "MR List Not Assign",
    component: MRNAList,
  },
  {
    path: "/mr-creation",
    exact: true,
    name: "Create MR",
    component: MRCreation,
  },
  {
    path: "/mr-detail/:id",
    exact: true,
    name: "MR Detail",
    component: MRDetail,
  },
  {
    path: "/bulk-mr-creation",
    name: "Bulk MR Creation",
    component: BulkMRCreation,
  },
  { path: "/bulk-mr-request", name: "Bulk MR Request", component: BulkRequest },
  {
    path: "/bulk-mr-change-approval",
    name: "Bulk MR Change Approval",
    component: BulkChangeApproval,
  },
  {
    path: "/bulk-mr-approval",
    name: "Bulk MR Approval",
    component: BulkApproval,
  },
  { path: "/ps-upload/:id", exact: true, name: "MR List", component: PSUpload },
  {
    path: "/mr-progress/:id",
    exact: true,
    name: "MR Progress",
    component: MRProgress,
  },

  {
    path: "/assignment-creation",
    exact: true,
    name: "Assignment Creation",
    component: AssignmentCreation,
  },
  {
    path: "/assignment-list",
    exact: true,
    name: "Assignment List",
    component: AssignmentList,
  },
  {
    path: "/assignment-list-report",
    exact: true,
    name: "Assignment List",
    component: AssignmentReport,
  },
  {
    path: "/bulk-assignment-creation",
    exact: true,
    name: "Bulk Assignment Creation",
    component: BulkAssignment,
  },
  {
    path: "/assignment-detail/:id",
    exact: true,
    name: "Assignment Detail",
    component: AssignmentDetail,
  },
  {
    path: "/assignment-edit/:id",
    exact: true,
    name: "Assignment Edit",
    component: AssignmentEdit,
  },
  {
    path: "/bulk-assignment-notify",
    exact: true,
    name: "Bulk Assignment Notify to ASP",
    component: BulkNotifytoASP,
  },
  {
    path: "/assignment-detail-asp/:id",
    exact: true,
    name: "Assignment Detail (ASP)",
    component: AssignmentDetailASP,
  },
  {
    path: "/assignment-list-asp",
    exact: true,
    name: "Assignment List (ASP)",
    component: AssignmentListASP,
  },
  {
    path: "/assignment-list-approval",
    exact: true,
    name: "Assignment Need Assignment List ",
    component: AssignmentListApproval,
  },

  {
    path: "/order-received",
    exact: true,
    name: "Order Received",
    component: OrderReceived,
  },
  {
    path: "/order-processing",
    exact: true,
    name: "Order Processing",
    component: OrderProcessing,
  },
  {
    path: "/ready-to-deliver",
    exact: true,
    name: "Ready To Deliver",
    component: ReadyToDeliver,
  },
  {
    path: "/joint-check",
    exact: true,
    name: "Joint Check",
    component: JointCheck,
  },
  {
    path: "/loading-process",
    exact: true,
    name: "Loading Process",
    component: LoadingProcess,
  },
  {
    path: "/waiting-dispatch",
    exact: true,
    name: "Material Dispatch",
    component: WaitingDispatch,
  },
  {
    path: "/material-dispatch",
    exact: true,
    name: "Material Dispatch",
    component: MaterialDispatch,
  },
  {
    path: "/order-created",
    exact: true,
    name: "Order Created",
    component: OrderCreated,
  },
  { path: "/lom-list", exact: true, name: "LOM List", component: LOMList },

  {
    path: "/wh-management",
    exact: true,
    name: "Warehouse Management",
    component: WHManagement,
  },
  {
    path: "/asp-user-management",
    exact: true,
    name: "Vendor List",
    component: ASPManagement,
  },
  {
    path: "/asp-user-management/:id",
    exact: true,
    name: "Vendor Management",
    component: ASPManagementDet,
  },

  {
    path: "/wh-dashboard-eid",
    exact: true,
    name: "Warehouse Internal",
    component: WHDashboard,
  },
  {
    path: "/wh-dashboard-eid/wh-dashboard-eid-det/:slug",
    exact: true,
    name: "Dashboard Internal",
    component: WHDashboardDet,
  },
  {
    path: "/wh-dashboard-eid/wh-gr-eid/:slug",
    exact: true,
    name: "GR Internal Detail",
    component: GRInternalDet,
  },
  {
    path: "/wh-dashboard-eid/wh-gi-eid/:slug",
    exact: true,
    name: "GI Internal Detail",
    component: GIInternalDet,
  },
  {
    path: "/wh-dashboard-eid/material-stock2/:slug",
    exact: true,
    name: "Material Stock",
    component: MaterialStock,
  },
  {
    path: "/wh-dashboard-eid/material-inbound-plan2/:slug",
    exact: true,
    name: "Material Inbound Plan",
    component: MaterialInboundPlan,
  },

  {
    path: "/wh-dashboard-ext",
    exact: true,
    name: "Warehouse External",
    component: WHDashboardExt,
  },
  {
    path: "/wh-dashboard-ext/wh-dashboard-ext-det/:slug",
    exact: true,
    name: "Warehouse Dashboard External Detail",
    component: WHDashboardExtDet,
  },
  {
    path: "/wh-dashboard-ext/wh-gr-ext-per-wh/:whid",
    exact: true,
    name: "GR External Detail",
    component: GRExternal,
  },
  {
    path: "/wh-dashboard-ext/wh-gi-ext-per-wh/:whid",
    exact: true,
    name: "GI External Detail",
    component: GIExternal,
  },

  {
    path: "/shipment-list",
    exact: true,
    name: "Shipment List",
    component: ShipmentList,
  },

  {
    path: "/dsa-creation",
    exact: true,
    name: "DSA Creation",
    component: DSACreation,
  },
  { path: "/dsa-list", exact: true, name: "DSA List", component: DSAList },
  {
    path: "/dsa-detail/:id",
    exact: true,
    name: "DSA Detail",
    component: DSADetail,
  },
  { path: "/dsa-edit/:id", exact: true, name: "DSA Edit", component: DSAEdit },

  { path: "/lcc-list", exact: true, name: "LCC List", component: LCCList },
  {
    path: "/lcc-detail/:id",
    exact: true,
    name: "LCC Detail",
    component: LCCDetail,
  },
  {
    path: "/lcc-creation",
    exact: true,
    name: "LCC Creation",
    component: LCCCreation,
  },
  {
    path: "/lcc-edit/:id",
    exact: true,
    name: "LCC Creation",
    component: LCCEdit,
  },

  {
    path: "/sid-list/uploader",
    exact: true,
    name: "SID Uploader",
    component: SIDUploader,
  },
  { path: "/sid-list", exact: true, name: "SID List", component: SIDList },

  {
    path: "/prt-list/creation",
    exact: true,
    name: "PRT Creation",
    component: PRPOCreation,
  },
  { path: "/prt-list", exact: true, name: "PRT List", component: ListPRPO },
  {
    path: "/prt-list/detail/:id",
    exact: true,
    name: "PRT Detail",
    component: DetailPRPO,
  },
  {
    path: "/prt-list/edit/:id",
    exact: true,
    name: "PRT Edit",
    component: EditPRPO,
  },

  { path: "/mra-list", exact: true, name: "MRA List", component: MRAList },
  {
    path: "/mra-list/detail/:id",
    exact: true,
    name: "MRA Detail",
    component: MRADetail,
  },
  {
    path: "/mra-list-need-confirm",
    exact: true,
    name: "MRA Detail",
    component: MRANeedConfirm,
  },

  { path: "/shf-list", exact: true, name: "SHF List", component: SHFList },

  {
    path: "/mat-library",
    exact: true,
    name: "Material Library",
    component: MatLibrary,
  },

  {
    path: "/srn/ps-srn-list",
    exact: true,
    name: "PS SRN List",
    component: PSDisList,
  },
  {
    path: "/srn/ps-srn-creation",
    exact: true,
    name: "MR SRN Creation",
    component: PSDisCreation,
  },
  {
    path: "/srn/ps-srn-detail/:id",
    exact: true,
    name: "MR SRN Detail",
    component: PSDisDetail,
  },

  {
    path: "/srn/mr-srn-list",
    exact: true,
    name: "MR SRN List",
    component: MRDisList,
  },
  {
    path: "/srn/mr-srn-creation",
    exact: true,
    name: "MR SRN Creation",
    component: MRDisCreation,
  },
  {
    path: "/srn/mr-srn-detail/:id",
    exact: true,
    name: "MR SRN Detail",
    component: MRDisDetail,
  },

  {
    path: "/srn/mr-srn-na-list",
    exact: true,
    name: "MR Not Assigne PS SRN List",
    component: MRDisNAList,
  },

  {
    path: "/srn/mr-srn-na-list/:id",
    exact: true,
    name: "PS Assign to MR SRN List",
    component: PSAssigntoMR,
  },

  {
    path: "/srn/mr-srn-need-approval-ldm-list",
    exact: true,
    name: "MR SRN Need Approval LDM List",
    component: LDMApprovalDismantle,
  },

  {
    path: "/srn/mr-srn-need-confirm-list",
    exact: true,
    name: "MR SRN Need Confirm WH List",
    component: MRDismantleConfirmWH,
  },

  {
    path: "/Microwave/list-technical",
    exact: true,
    name: "List Technical BOQ",
    component: ListTechnicalMW,
  },
  {
    path: "/Microwave/detail-technical/:id",
    exact: true,
    name: "Detail Technical BOQ",
    component: DetailTechnicalMW,
  },
  {
    path: "/Microwave/new-technical",
    exact: true,
    name: "Create Technical BOQ Transmission",
    component: DetailTechnicalMW,
  },
  {
    path: "/Microwave/summary-boq/:id",
    exact: true,
    name: "Detail Summary BOQ",
    component: SummaryBoqMW,
  },

  {
    path: "/ps-creation-mw",
    exact: true,
    name: "Plant Spec BOM Transmission",
    component: PSCreationMW,
  },
  {
    path: "/ps-detail-mw/:id",
    name: "Plant Spec BOM Transmission",
    component: PSBOMDetailMW,
  },

  {
    path: "/toWH/ps-wh-list",
    exact: true,
    name: "PS WH List",
    component: PSWHList,
  },
  {
    path: "/toWH/ps-wh-creation",
    exact: true,
    name: "PS WH Creation",
    component: PSWHCreation,
  },
  {
    path: "/toWH/ps-wh-detail/:id",
    exact: true,
    name: "PS WH Detail",
    component: PSWHDetail,
  },

  {
    path: "/toWH/mr-wh-list",
    exact: true,
    name: "MR WH List",
    component: MRWHList,
  },
  {
    path: "/toWH/mr-wh-na-list",
    exact: true,
    name: "MR WH NA List",
    component: MRWHNAList,
  },
  {
    path: "/toWH/mr-wh-na-detail/:id",
    exact: true,
    name: "MR WH NA Detail",
    component: AssingPStoMRWH,
  },
  {
    path: "/toWH/mr-wh-dispatch",
    exact: true,
    name: "MR WH Dispatch",
    component: MRWHDismantle,
  },
  {
    path: "/toWH/mr-wh-confirm-wh",
    exact: true,
    name: "MR WH Confirm Warehouse",
    component: MRWHConfirm,
  },

  {
    path: "/dsa-migration",
    exact: true,
    name: "DSA Migration",
    component: DSAMigration,
  },

  {
    path: "/srn/mr-srn-creation-bulk",
    exact: true,
    name: "MR SRN Creation",
    component: MRDismantleBulk,
  },

  {
    path: "/additional-package",
    exact: true,
    name: "Product Package Manager",
    component: AdditionalPackage,
  },

  {
    path: "/dsa-srn-creation",
    exact: true,
    name: "DSA SRN Creation",
    component: DSADCreation,
  },
  {
    path: "/dsa-srn-list",
    exact: true,
    name: "DSA SRN List",
    component: DSADList,
  },
  {
    path: "/dsa-srn-detail/:id",
    exact: true,
    name: "DSA SRN Detail",
    component: DSADDetail,
  },
  {
    path: "/dsa-srn-edit/:id",
    exact: true,
    name: "DSA SRN Edit",
    component: DSADEdit,
  },

  {
    path: "/dsa-srn-migration",
    exact: true,
    name: "DSA SRN Migration",
    component: DSADMigration,
  },
];

export default routes;
