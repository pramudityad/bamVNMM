import React from 'react';
// import WHDashboard from './viewsIndosat/Milestone/WHDashboard';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const ProductPackage = React.lazy(() => import('./viewsIndosat/ProductPackage/PackageUpload'));
const ServiceLibrary = React.lazy(() => import('./viewsIndosat/SVC/ServiceLibrary'));
const ConfigManager = React.lazy(() => import('./viewsIndosat/Configlib/Configlibrary'));

const ListTechnical = React.lazy(() => import('./viewsIndosat/Technical/ListTechnical'));
const DetailTechnical = React.lazy(() => import('./viewsIndosat/Technical/TechnicalBoq'));
const SummaryBoq = React.lazy(() => import('./viewsIndosat/Technical/SummaryBoq'));

const ListPR = React.lazy(() => import('./viewsIndosat/Commercial/ListPR'));
const DetailPR = React.lazy(() => import('./viewsIndosat/Commercial/PR'));
const PRCreation = React.lazy(() => import('./viewsIndosat/Commercial/PRCreation'));

// const DetailCommercialPO = React.lazy(() => import('./viewsIndosat/Commercial/CommercialBoqPO'));
const ApprovalCommercial = React.lazy(() => import('./viewsIndosat/Commercial/CommercialBoqApproval'));
const SubmissionCommBoq = React.lazy(() => import('./viewsIndosat/Commercial/SubmissionCommBoq'));

const ListTssrMatrix = React.lazy(() => import('./viewsIndosat/TssrMatrix/ListTSSRBoq'));
const DetailTssrMatrix = React.lazy(() => import('./viewsIndosat/TssrMatrix/UploadTSSRMatrix'));
const NewTssrMatrix = React.lazy(() => import('./viewsIndosat/TssrMatrix/TSSRbyTech'));

const ListTSSRBoq = React.lazy(() => import('./viewsIndosat/Tssr/ListTSSRBoq'));
const DetailTSSRBoq = React.lazy(() => import('./viewsIndosat/Tssr/TSSRBoq'));

const CPODatabase  = React.lazy(() => import('./viewsIndosat/CPODatabase/CPODatabaseList'));

const PSList = React.lazy(() => import('./viewsIndosat/PS/PSList'));
const PSBOM = React.lazy(() => import('./viewsIndosat/PS/PSBOM'));
const PSBOMDetail = React.lazy(() => import('./viewsIndosat/PS/DetailPS'));

const CRDetail = React.lazy(() => import('./viewsIndosat/CR/CRDetail'));

const MRList = React.lazy(() => import('./viewsIndosat/MR/MRList'));
const MRNAList = React.lazy(() => import('./viewsIndosat/MR/MRNAList'));
const MRCreation = React.lazy(() => import('./viewsIndosat/MR/MRCreation'));
const BulkMRCreation = React.lazy(() => import('./viewsIndosat/MR/BulkMR'));
const MRDetail = React.lazy(() => import('./viewsIndosat/MR/MRDetail'));
const PSUpload = React.lazy(() => import('./viewsIndosat/MR/PSUpload'));
const MRProgress = React.lazy(() => import('./viewsIndosat/MR/MRProgress'));
const BulkChangeApproval = React.lazy(() => import('./viewsIndosat/MR/ListChangeApproval'));
const BulkApproval = React.lazy(() => import('./viewsIndosat/MR/ListBulkApproval'));
const BulkRequest = React.lazy(() => import('./viewsIndosat/MR/BulkRequest'));
const MRDashboardGlob = React.lazy(() => import('./viewsIndosat/MR/DashMR/MRDashboardGlob'));

const OrderReceived = React.lazy(() => import('./viewsIndosat/Milestone/OrderReceived'));
const OrderProcessing = React.lazy(() => import('./viewsIndosat/Milestone/OrderProcessing'));
const ReadyToDeliver = React.lazy(() => import('./viewsIndosat/Milestone/ReadyToDeliver'));
const JointCheck = React.lazy(() => import('./viewsIndosat/Milestone/JointCheck'));
const LoadingProcess = React.lazy(() => import('./viewsIndosat/Milestone/LoadingProcess'));
const WaitingDispatch = React.lazy(() => import('./viewsIndosat/Milestone/WaitingDispatch'));
const MaterialDispatch = React.lazy(() => import('./viewsIndosat/Milestone/MaterialDispatch'));
const OrderCreated = React.lazy(() => import('./viewsIndosat/Milestone/OrderCreated'));
const LOMList = React.lazy(() => import('./views/MR/LOMList'));

const AssignmentCreation = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentCreation'));
const AssignmentList = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentList'));
const AssignmentReport = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentReport'));
const BulkAssignment = React.lazy(() => import('./viewsIndosat/Assignment/BulkAssignment'));
const AssignmentDetail = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentDetail'));
const AssignmentEdit = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentEdit'));
const AssignBast = React.lazy(() => import('./viewsIndosat/Assignment/AssignBast'));
const BulkNotifytoASP = React.lazy(() => import('./viewsIndosat/Assignment/BulkNotifytoASP'));
const AssignmentListASP = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentListASP'));
const AssignmentDetailASP = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentDetailASP'));
const AssignmentListApproval = React.lazy(() => import('./viewsIndosat/Assignment/AssignmentListApproval'));

const WHManagement  = React.lazy(() => import('./viewsIndosat/Warehouse/WHManagement'));

const ShipmentList = React.lazy(() => import('./viewsIndosat/ShipmentList/ShipmentList'));

const ASPManagement  = React.lazy(() => import('./viewsIndosat/ASP/ASPUser'));
const ASPManagementDet  = React.lazy(() => import('./viewsIndosat/ASP/ASPUserDet'));

const WHDashboard = React.lazy(() => import('./viewsIndosat/Warehouse/Dashboard/WHDashboard'));
const WHDashboardDet = React.lazy(() => import('./viewsIndosat/Warehouse/Dashboard/WHDashboardDet'));

const GRExternal  = React.lazy(() => import('./viewsIndosat/Milestone/External/GR'));
const GIExternal  = React.lazy(() => import('./viewsIndosat/Milestone/External/GI'));
const GRInternalDet = React.lazy(() => import('./viewsIndosat/Milestone/Internal/GRInternal'));
const GIInternalDet = React.lazy(() => import('./viewsIndosat/Milestone/Internal/GIInternal'));

const WHDashboardExt = React.lazy(() => import('./viewsIndosat/Warehouse/Dashboard/WHDashboardext'));
const WHDashboardExtDet = React.lazy(() => import('./viewsIndosat/Warehouse/Dashboard/WHDashboardextDet'));

const MaterialStock  = React.lazy(() => import('./viewsIndosat/Warehouse/MatStock'));
const MaterialInboundPlan  = React.lazy(() => import('./viewsIndosat/Warehouse/MatInboundPlan'));

const DSACreation = React.lazy(() => import('./viewsIndosat/DSA/DSACreation'));
const DSAList = React.lazy(() => import('./viewsIndosat/DSA/DSAList'));
const DSADetail = React.lazy(() => import('./viewsIndosat/DSA/DSADetail'));
const DSAEdit = React.lazy(() => import('./viewsIndosat/DSA/DSAEdit2'));

const LCCList = React.lazy(() => import('./viewsIndosat/LCC/LCCList'));
const LCCDetail = React.lazy(() => import('./viewsIndosat/LCC/LCCDetail'));
const LCCCreation = React.lazy(() => import('./viewsIndosat/LCC/LCCCreation'));
const LCCEdit = React.lazy(() => import('./viewsIndosat/LCC/LCCEdit'));

const SIDUploader = React.lazy(() => import('./viewsIndosat/SID/SIDupload'));
const SIDList = React.lazy(() => import('./viewsIndosat/SID/SIDList'));

const PRPOCreation = React.lazy(() => import('./viewsIndosat/PRPO/CreatePRPO'));
const ListPRPO = React.lazy(() => import('./viewsIndosat/PRPO/ListPRPO'));
const DetailPRPO = React.lazy(() => import('./viewsIndosat/PRPO/DetailPRPO'));
const EditPRPO = React.lazy(() => import('./viewsIndosat/PRPO/EditPRPO'));

const MRAList  = React.lazy(() => import('./viewsIndosat/MRA/MRAList'));
const MRANeedConfirm  = React.lazy(() => import('./viewsIndosat/MRA/MRANeedConfirm'));
const MRADetail  = React.lazy(() => import('./viewsIndosat/MRA/MRADetail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/product-package', exact: true, name: 'Product Package Manager', component: ProductPackage },
  { path: '/variant-library', exact: true, name: 'Product Package Variant', component: ConfigManager },

  { path: '/svc-library', exact: true, name: 'Service Library', component: ServiceLibrary },

  { path: '/list-technical', exact: true, name: 'List Technical BOQ', component: ListTechnical },
  { path: '/detail-technical/:id', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },
  { path: '/new-technical', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },
  { path: '/summary-boq/:id', exact: true, name: 'Detail Summary BOQ', component: SummaryBoq },

  { path: '/list-pr', exact: true, name: 'List PR', component: ListPR },
  { path: '/list-pr/creation', exact: true, name: 'PR Creation', component: PRCreation },
  { path: '/list-pr/detail/:id', exact: true, name: 'Detail PR', component: DetailPR },
  // { path: '/list-commercial/detail-po/:id', exact: true, name: 'Detail Commercial BOQ', component: DetailCommercialPO },
  { path: '/approval-commercial/:id', exact: true, name: 'Approval for Commercial BOQ', component: ApprovalCommercial },
  { path: '/submission-commercial/:id', exact: true, name: 'Submission Commercial BOQ', component: SubmissionCommBoq },

  { path: '/list-tssr-matix', exact: true, name: 'List TSSR Matrix BOQ', component: ListTssrMatrix },
  { path: '/list-tssr-matix/creation', exact: true, name: 'TSSR Matrix BOQ Creation', component: NewTssrMatrix },
  { path: '/list-tssr-matix/:id', exact: true, name: 'Detail TSSR Matrix BOQ', component: DetailTssrMatrix },

  { path: '/list-tssr-boq', exact: true, name: 'BOQ Reservation List', component: ListTSSRBoq },
  { path: '/list-tssr-boq/detail/:id', exact: true, name: 'BOQ Reservation Detail', component: DetailTSSRBoq },

  { path: '/cpo-database', exact: true, name: 'CPO Database', component: CPODatabase },

  { path: '/ps-list', exact: true, name: 'Plant Spec List', component: PSList },
  { path: '/ps-creation', exact: true, name: 'Plant Spec BOM', component: PSBOM },
  { path: '/ps-detail/:id', name: 'Plant Spec BOM', component: PSBOMDetail },

  { path: '/cr-detail', exact: true, name: 'CR Detail', component: CRDetail },

  { path: '/mr-dashboard-global', exact: true, name: 'Material Request Dashboard', component: MRDashboardGlob },
  { path: '/mr-list', exact: true, name: 'MR List', component: MRList },
  { path: '/mr-na-list', exact: true, name: 'MR List Not Assign', component: MRNAList },
  { path: '/mr-creation', exact: true, name: 'Create MR', component: MRCreation },
  { path: '/mr-detail/:id', exact: true, name: 'MR Detail', component: MRDetail },
  { path: '/bulk-mr-creation', name: 'Bulk MR Creation', component: BulkMRCreation },
  { path: '/bulk-mr-request', name: 'Bulk MR Request', component: BulkRequest },
  { path: '/bulk-mr-change-approval', name: 'Bulk MR Change Approval', component: BulkChangeApproval },
  { path: '/bulk-mr-approval', name: 'Bulk MR Approval', component: BulkApproval },
  { path: '/ps-upload/:id', exact: true, name: 'MR List', component: PSUpload },
  { path: '/mr-progress/:id', exact: true, name: 'MR Progress', component: MRProgress },

  { path: '/assignment-creation', exact: true, name: 'Assignment Creation', component: AssignmentCreation },
  { path: '/assignment-list', exact: true, name: 'Assignment List', component: AssignmentList },
  { path: '/assignment-list-report', exact: true, name: 'Assignment List', component: AssignmentReport },
  { path: '/bulk-assignment-creation', exact: true, name: 'Bulk Assignment Creation', component: BulkAssignment },
  { path: '/assignment-detail/:id', exact: true, name: 'Assignment Detail', component: AssignmentDetail },
  { path: '/assignment-edit/:id', exact: true, name: 'Assignment Edit', component: AssignmentEdit },
  { path: '/bulk-assignment-notify', exact: true, name: 'Bulk Assignment Notify to ASP', component: BulkNotifytoASP },
  { path: '/assignment-detail-asp/:id', exact: true, name: 'Assignment Detail (ASP)', component: AssignmentDetailASP },
  { path: '/assignment-list-asp', exact: true, name: 'Assignment List (ASP)', component: AssignmentListASP },
  { path: '/assignment-list-approval', exact: true, name: 'Assignment Need Assignment List ', component: AssignmentListApproval },

  { path: '/order-received', exact: true, name: 'Order Received', component: OrderReceived },
  { path: '/order-processing', exact: true, name: 'Order Processing', component: OrderProcessing },
  { path: '/ready-to-deliver', exact: true, name: 'Ready To Deliver', component: ReadyToDeliver },
  { path: '/joint-check', exact: true, name: 'Joint Check', component: JointCheck },
  { path: '/loading-process', exact: true, name: 'Loading Process', component: LoadingProcess },
  { path: '/waiting-dispatch', exact: true, name: 'Material Dispatch', component: WaitingDispatch },
  { path: '/material-dispatch', exact: true, name: 'Material Dispatch', component: MaterialDispatch },
  { path: '/order-created', exact: true, name: 'Order Created', component: OrderCreated },
  { path: '/lom-list', exact: true, name: 'LOM List', component: LOMList },

  { path: '/wh-management', exact: true, name: 'Warehouse Management', component: WHManagement },
  { path: '/asp-user-management', exact: true, name: 'Vendor List', component: ASPManagement },
  { path: '/asp-user-management/:id', exact: true, name: 'Vendor Management', component: ASPManagementDet },

  { path: '/wh-dashboard-eid', exact: true, name: 'Warehouse Internal', component: WHDashboard },
  { path: '/wh-dashboard-eid/wh-dashboard-eid-det/:slug', exact: true, name: 'Dashboard Internal', component: WHDashboardDet },
  { path: '/wh-dashboard-eid/wh-gr-eid/:slug', exact: true, name: 'GR Internal Detail', component: GRInternalDet },
  { path: '/wh-dashboard-eid/wh-gi-eid/:slug', exact: true, name: 'GI Internal Detail', component: GIInternalDet },
  { path: '/wh-dashboard-eid/material-stock2/:slug', exact: true, name: 'Material Stock', component: MaterialStock },
  { path: '/wh-dashboard-eid/material-inbound-plan2/:slug', exact: true, name: 'Material Inbound Plan', component: MaterialInboundPlan },

  { path: '/wh-dashboard-ext', exact: true, name: 'Warehouse External', component: WHDashboardExt },
  { path: '/wh-dashboard-ext/wh-dashboard-ext-det/:slug', exact: true, name: 'Warehouse Dashboard External Detail', component: WHDashboardExtDet },
  { path: '/wh-dashboard-ext/wh-gr-ext-per-wh/:whid', exact: true, name: 'GR External Detail', component: GRExternal },
  { path: '/wh-dashboard-ext/wh-gi-ext-per-wh/:whid', exact: true, name: 'GI External Detail', component: GIExternal },

  { path: '/shipment-list', exact: true, name: 'Shipment List', component: ShipmentList },

  { path: '/dsa-creation', exact: true, name: 'DSA Creation', component: DSACreation },
  { path: '/dsa-list', exact: true, name: 'DSA List', component: DSAList },
  { path: '/dsa-detail/:id', exact: true, name: 'DSA Detail', component: DSADetail },
  { path: '/dsa-edit/:id', exact: true, name: 'DSA Edit', component: DSAEdit },

  { path: '/lcc-list', exact: true, name: 'LCC List', component: LCCList },
  { path: '/lcc-detail/:id', exact: true, name: 'LCC Detail', component: LCCDetail },
  { path: '/lcc-creation', exact: true, name: 'LCC Creation', component: LCCCreation },
  { path: '/lcc-edit/:id', exact: true, name: 'LCC Creation', component: LCCEdit },

  { path: '/sid-list/uploader', exact: true, name: 'SID Uploader', component: SIDUploader },
  { path: '/sid-list', exact: true, name: 'SID List', component: SIDList },

  { path: '/prt-list/creation', exact: true, name: 'PRT Creation', component: PRPOCreation },
  { path: '/prt-list', exact: true, name: 'PRT List', component: ListPRPO },
  { path: '/prt-list/detail/:id', exact: true, name: 'PRT Detail', component: DetailPRPO },
  { path: '/prt-list/edit/:id', exact: true, name: 'PRT Edit', component: EditPRPO },

  { path: '/mra-list', exact: true, name: 'MRA List', component: MRAList },
  { path: '/mra-list/detail/:id', exact: true, name: 'MRA Detail', component: MRADetail },
  { path: '/mra-list-need-confirm', exact: true, name: 'MRA Detail', component: MRANeedConfirm },

];

export default routes;
