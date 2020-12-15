import React from 'react';
import GRInternal from './views/MR/GR/GRInternal';
// import WHDashboard from './views/Warehouse/WHDashboard';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const ProductPackage = React.lazy(() => import('./views/ProductPackage/PackageUpload'));
const AdditionalMaterial = React.lazy(() => import('./views/ProductPackage/AddMatPackageUpload'));

const TssrList = React.lazy(() => import('./views/Tssr/TssrList'));
const TssrBOM = React.lazy(() => import('./views/Tssr/TssrBOM'));
const TssrBOMDetail = React.lazy(() => import('./views/Tssr/DetailTssr'));
const MRList = React.lazy(() => import('./views/MR/MRList'));
const MRNAList = React.lazy(() => import('./views/MR/MRNAList'));
const MRCreation = React.lazy(() => import('./views/MR/MRCreation'));
const BulkMRCreation = React.lazy(() => import('./views/MR/BulkMR'));
const MRDetail = React.lazy(() => import('./views/MR/MRDetail'));
const PSUpload = React.lazy(() => import('./views/MR/PSUpload'));
const MRProgress = React.lazy(() => import('./views/MR/MRProgress'));
const MRDashboardGlob = React.lazy(() => import('./views/MR/Dashboard/MRDashboardGlob'));

const OrderReceived = React.lazy(() => import('./views/Warehouse/OrderReceived'));
const OrderProcessing = React.lazy(() => import('./views/Warehouse/OrderProcessing'));
const ReadyToDeliver = React.lazy(() => import('./views/Warehouse/ReadyToDeliver'));
const JointCheck = React.lazy(() => import('./views/Warehouse/JointCheck'));
const LoadingProcess = React.lazy(() => import('./views/Warehouse/LoadingProcess'));
const WaitingDispatch = React.lazy(() => import('./views/Warehouse/WaitingDispatch'));
const MaterialDispatch = React.lazy(() => import('./views/Warehouse/MaterialDispatch'));
const ProjectDashboard = React.lazy(() => import('./views/Project/ProjectDashboard'));
const OrderCreated = React.lazy(() => import('./views/Project/OrderCreated'));
const LOMList = React.lazy(() => import('./views/MR/LOMList'));
const MatLOMList = React.lazy(() => import('./views/MR/MatLOMList'));


const AssignmentCreation = React.lazy(() => import('./views/Assignment/AssignmentCreation'));
const AssignmentList = React.lazy(() => import('./views/Assignment/AssignmentList'));
const AssignmentReport = React.lazy(() => import('./views/Assignment/AssignmentReport'));
const BulkAssignment = React.lazy(() => import('./views/Assignment/BulkAssignment'));
const AssignmentDetail = React.lazy(() => import('./views/Assignment/AssignmentDetail'));
const AssignmentEdit = React.lazy(() => import('./views/Assignment/AssignmentEdit'));
const AssignBast = React.lazy(() => import('./views/Assignment/AssignBast'));
const BulkRequest = React.lazy(() => import('./views/MR/BulkRequest'));
const BulkNotifytoASP = React.lazy(() => import('./views/Assignment/BulkNotifytoASP'));
const AssignmentListASP = React.lazy(() => import('./views/Assignment/AssignmentListASP'));
const AssignmentDetailASP = React.lazy(() => import('./views/Assignment/AssignmentDetailASP'));
const AssignmentListApproval = React.lazy(() => import('./views/Assignment/AssignmentListApproval'));
const AssignmentBulkApproval = React.lazy(() => import('./views/Assignment/AssignmentBulkApproval'));

const PRPOCreation = React.lazy(() => import('./views/PRPO/CreatePRPO'));
const ListPRPO = React.lazy(() => import('./views/PRPO/ListPRPO'));
const DetailPRPO = React.lazy(() => import('./views/PRPO/DetailPRPO'));
const EditPRPO = React.lazy(() => import('./views/PRPO/EditPRPO'));

const FMSUploader = React.lazy(() => import('./views/FMS/FMSupload'));
const FMSList = React.lazy(() => import('./views/FMS/FMSList'));
const FMSDetail = React.lazy(() => import('./views/FMS/FMSDetail'));

const SIDUploader = React.lazy(() => import('./views/SID/SIDupload'));
const SIDList = React.lazy(() => import('./views/SID/SIDList'));

const ListTechnical = React.lazy(() => import('./views/Technical/ListTechnical'));
const DetailTechnical = React.lazy(() => import('./views/Technical/TechnicalBoq'));
const ApprovalTechnical = React.lazy(() => import('./views/Technical/TechnicalBoqApproval'));

const ListCommercial = React.lazy(() => import('./views/Commercial/ListCommercial'));
const DetailCommercial = React.lazy(() => import('./views/Commercial/CommercialBoq'));
const ApprovalCommercial = React.lazy(() => import('./views/Commercial/CommercialBoqApproval'));
const POAssign = React.lazy(() => import('./views/Commercial/POAssign'));
const SubmissionCommBoq = React.lazy(() => import('./views/Commercial/SubmissionCommBoq'));

const POCommercial = React.lazy(() => import('./views/Commercial/BoqCommPO'));
const ListTssrMatrix = React.lazy(() => import('./views/TssrMatrix/ListTSSRBoq'));
const DetailTssrMatrix = React.lazy(() => import('./views/TssrMatrix/UploadTSSRMatrix'));
const NewTssrMatrix = React.lazy(() => import('./views/TssrMatrix/TSSRbyTech'));

const DSACreation = React.lazy(() => import('./views/DSA/DSACreation'));
const DSAList = React.lazy(() => import('./views/DSA/DSAList'));
const DSADetail = React.lazy(() => import('./views/DSA/DSADetail'));
const DSAEdit = React.lazy(() => import('./views/DSA/DSAEdit2'));

const LCCList = React.lazy(() => import('./views/LCC/LCCList'));
const LCCDetail = React.lazy(() => import('./views/LCC/LCCDetail'));
const LCCCreation = React.lazy(() => import('./views/LCC/LCCCreation'));
const LCCEdit = React.lazy(() => import('./views/LCC/LCCEdit'));


const BulkChangeApproval = React.lazy(() => import('./views/MR/ListChangeApproval'));
const BulkApproval = React.lazy(() => import('./views/MR/ListBulkApproval'));
const ListOrdering = React.lazy(() => import('./views/Ordering/ListOrdering'));
const DetailOrdering = React.lazy(() => import('./views/Ordering/OrderingMaterial'));
const ConfigManager = React.lazy(() => import('./views/ConfigManagement/ConfigUpload'));

const CPODatabase  = React.lazy(() => import('./views/CPODatabase/CPODatabaseList'));
const CPODatabaseDetail  = React.lazy(() => import('./views/CPODatabase/CPODatabaseDetail'));

const ShipmentList = React.lazy(() => import('./views/ShipmentList/ShipmentList'));

const WHManagement  = React.lazy(() => import('./views/MR/WHManagement/WHManagement'));
const ASPManagement  = React.lazy(() => import('./views/MR/ASPUser/ASPUser'));
const ASPManagementDet  = React.lazy(() => import('./views/MR/ASPUser/ASPUserDet'));


const MaterialStock  = React.lazy(() => import('./views/MR/WHStock/MatStock2'));
const MaterialInboundPlan  = React.lazy(() => import('./views/MR/WHInbound/MatInboundPlan2'));
const MatLibrary  = React.lazy(() => import('./views/MR/MatLibrary/MatLibrary'));

const WHDashboard = React.lazy(() => import('./views/Warehouse/Dashboard/WHDashboard'));
const WHDashboardDet = React.lazy(() => import('./views/Warehouse/Dashboard/WHDashboardDet'));

const GRInternalDet = React.lazy(() => import('./views/MR/GR/GRInternal'));
const GIInternalDet = React.lazy(() => import('./views/MR/GI/GIInternal'));

const WHDashboardExt = React.lazy(() => import('./views/Warehouse/Dashboard/WHDashboardext'));
const WHDashboardExtDet = React.lazy(() => import('./views/Warehouse/Dashboard/WHDashboardextDet'));

const ListCPOBoq = React.lazy(() => import('./views/TechnicalCPO/ListCPOBoq'));
const DetailCPOBoq = React.lazy(() => import('./views/TechnicalCPO/DetailCPOBoq'));

const ListTSSRBoq = React.lazy(() => import('./views/Tssr/ListTSSRBoq'));
const DetailTSSRBoq = React.lazy(() => import('./views/Tssr/TSSRBoq'));

const CRDetail = React.lazy(() => import('./views/CR/CRDetail'));

const DRMList = React.lazy(() => import('./views/DRM/DRMList'));
const DRMDetail = React.lazy(() => import('./views/DRM/DRMDetail'));

const GR  = React.lazy(() => import('./views/Warehouse/GR'));
const GI  = React.lazy(() => import('./views/Warehouse/GI'));

const LoaderPage = React.lazy(() => import('./views/DefaultView/LoaderPage'));

const BlankPage = React.lazy(() => import('./containers/DefaultLayout/LoginSSO'));

const MRAList  = React.lazy(() => import('./views/MRA/MRAList'));
const MRANeedConfirm  = React.lazy(() => import('./views/MRA/MRANeedConfirm'));
const MRADetail  = React.lazy(() => import('./views/MRA/MRADetail'));

const MRDisList = React.lazy(() => import('./views/MRDismantle/MRDisList'));
const MRDisCreation = React.lazy(() => import('./views/MRDismantle/MRDisCreation'));
const MRDisDetail = React.lazy(() => import('./views/MRDismantle/MRDisDetail'));

const MRDisNAList = React.lazy(() => import('./views/MRDismantle/MRDisNAList'));
const PSAssigntoMR = React.lazy(() => import('./views/MRDismantle/PSAssigntoMR'));

const LDMApprovalDismantle = React.lazy(() => import('./views/MRDismantle/LDMApprovalDismantle'));
const MRDismantleConfirmWH = React.lazy(() => import('./views/MRDismantle/MRDismantleConfirmWH'));

const PSDisList = React.lazy(() => import('./views/MRDismantle/PSDisList'));
const PSDisCreation = React.lazy(() => import('./views/MRDismantle/PSDisCreation'));
const PSDisDetail = React.lazy(() => import('./views/MRDismantle/PSDisDetail'));


const SHFList = React.lazy(() => import('./views/SHF/SHFList'));

const PSWHList = React.lazy(() => import('./views/MRtoWarehouse/PSWarehouseList'));
const PSWHCreation = React.lazy(() => import('./views/MRtoWarehouse/PSWarehouseCreation'));
const PSWHDetail = React.lazy(() => import('./views/MRtoWarehouse/PSWarehouseDetail'));

const MRWHList = React.lazy(() => import('./views/MRtoWarehouse/ListMRWarehouse'));
const MRWHNAList = React.lazy(() => import('./views/MRtoWarehouse/MRWHNAList'));
const AssingPStoMRWH = React.lazy(() => import('./views/MRtoWarehouse/AssingPStoMRWH'));
const MRWHDismantle = React.lazy(() => import('./views/MRtoWarehouse/MRWHDismantle'));
const MRWHConfirm = React.lazy(() => import('./views/MRtoWarehouse/MRWHConfirm'));
// const PSDisCreation = React.lazy(() => import('./views/MRDismantle/PSDisCreation'));
const DSAMigration = React.lazy(() => import('./views/DSA/DSAMigration'));

const DSADCreation = React.lazy(() => import('./views/DSADismantle/DSADCreation'));
const DSADList = React.lazy(() => import('./views/DSADismantle/DSADList'));
const DSADDetail = React.lazy(() => import('./views/DSADismantle/DSADDetail'));
const DSADEdit = React.lazy(() => import('./views/DSADismantle/DSADEdit2'));

const MRDismantleBulk = React.lazy(() => import('./views/MRDismantle/MRDismantleBulk'));

const LCCPOList = React.lazy(() => import('./views/LCC/LCCPOList'));

const DSADMigration = React.lazy(() => import('./views/DSADismantle/DSADMigration'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/product-package', exact: true, name: 'Product Package Manager', component: ProductPackage },
  { path: '/additional-material', exact: true, name: 'Additional Material Manager', component: AdditionalMaterial },

  { path: '/ps-list', exact: true, name: 'Plant Spec List', component: TssrList },
  { path: '/ps-bom', exact: true, name: 'Plant Spec BOM', component: TssrBOM },
  { path: '/ps-list/:id', name: 'Plant Spec BOM', component: TssrBOMDetail },
  { path: '/mr-list', exact: true, name: 'MR List', component: MRList },
  { path: '/mr-na-list', exact: true, name: 'MR List Not Assign', component: MRNAList },
  { path: '/mr-creation', exact: true, name: 'Create MR', component: MRCreation },
  { path: '/mr-detail/:id', exact: true, name: 'MR Detail', component: MRDetail, roles : ['BAM-ASP'] },
  { path: '/bulk-mr-creation', name: 'Bulk MR Creation', component: BulkMRCreation },
  { path: '/bulk-mr-request', name: 'Bulk MR Request', component: BulkRequest },
  { path: '/bulk-mr-change-approval', name: 'Bulk MR Change Approval', component: BulkChangeApproval },
  { path: '/bulk-mr-approval', name: 'Bulk MR Approval', component: BulkApproval },
  { path: '/ps-upload/:id', exact: true, name: 'MR List', component: PSUpload },
  { path: '/mr-progress/:id', exact: true, name: 'MR Progress', component: MRProgress },

  { path: '/order-received', exact: true, name: 'Order Received', component: OrderReceived },
  { path: '/order-processing', exact: true, name: 'Order Processing', component: OrderProcessing },
  { path: '/ready-to-deliver', exact: true, name: 'Ready To Deliver', component: ReadyToDeliver },
  { path: '/joint-check', exact: true, name: 'Joint Check', component: JointCheck },
  { path: '/loading-process', exact: true, name: 'Loading Process', component: LoadingProcess },
  { path: '/waiting-dispatch', exact: true, name: 'Material Dispatch', component: WaitingDispatch, roles : ['BAM-ASP'] },
  { path: '/material-dispatch', exact: true, name: 'Material Dispatch', component: MaterialDispatch, roles : ['BAM-ASP'] },
  { path: '/project-dashboard', exact: true, name: 'Project Dashboard', component: ProjectDashboard },
  { path: '/order-created', exact: true, name: 'Order Created', component: OrderCreated },
  { path: '/lom-list', exact: true, name: 'LOM List', component: LOMList },
  { path: '/matlom-list', exact: true, name: 'Material LOM List', component: MatLOMList },

  { path: '/assignment-creation', exact: true, name: 'Assignment Creation', component: AssignmentCreation },
  { path: '/assignment-list', exact: true, name: 'Assignment List', component: AssignmentList },
  { path: '/assignment-list-report', exact: true, name: 'Assignment List', component: AssignmentReport, roles : ['BAM-ASP'] },
  { path: '/bulk-assignment-creation', exact: true, name: 'Bulk Assignment Creation', component: BulkAssignment },
  { path: '/assignment-detail/:id', exact: true, name: 'Assignment Detail', component: AssignmentDetail },
  { path: '/assignment-edit/:id', exact: true, name: 'Assignment Edit', component: AssignmentEdit },
  { path: '/bulk-assignment-notify', exact: true, name: 'Bulk Assignment Notify to ASP', component: BulkNotifytoASP },

  { path: '/list-technical', exact: true, name: 'List Technical BOQ', component: ListTechnical },
  { path: '/list-technical/detail/:id', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },
  { path: '/approval-technical/:id', exact: true, name: 'Approval Technical BOQ', component: ApprovalTechnical },
  { path: '/list-technical/new', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },

  { path: '/list-commercial', exact: true, name: 'List Commercial BOQ', component: ListCommercial },
  { path: '/list-commercial/creation', exact: true, name: 'Commercial BOQ Creation', component: DetailCommercial },
  { path: '/list-commercial/detail/:id', exact: true, name: 'Detail Commercial BOQ', component: DetailCommercial },
  { path: '/po-assign-commercial/:id', exact: true, name: 'PO Assign Commercial BOQ', component: POAssign },
  { path: '/submission-commercial/:id', exact: true, name: 'Submission Commercial BOQ', component: SubmissionCommBoq },

  { path: '/assignment-detail-asp/:id', exact: true, name: 'Assignment Detail (ASP)', component: AssignmentDetailASP, roles : ['BAM-ASP'] },
  { path: '/assignment-list-asp', exact: true, name: 'Assignment List (ASP)', component: AssignmentListASP, roles : ['BAM-ASP'] },
  { path: '/assignment-list-approval', exact: true, name: 'Assignment Need Assignment List ', component: AssignmentListApproval },
  { path: '/assignment-bulk-approval', exact: true, name: 'Assignment Bulk Approval ', component: AssignmentBulkApproval },

  { path: '/list-tssr-matix', exact: true, name: 'List TSSR Matrix BOQ', component: ListTssrMatrix },
  { path: '/tssr-matix-creation', exact: true, name: 'TSSR Matrix BOQ Creation', component: NewTssrMatrix },
  { path: '/detail-tssr-matix/:id', exact: true, name: 'Detail TSSR Matrix BOQ', component: DetailTssrMatrix },
  { path: '/approval-commercial/:id', exact: true, name: 'Approval for Commercial BOQ', component: ApprovalCommercial },
  { path: '/po-commercial/:id', exact: true, name: 'PO for Commercial BOQ', component: POCommercial },
  { path: '/list-ordering', exact: true, name: 'List Commercial BOQ', component: ListOrdering },
  { path: '/new-ordering', name: 'New Ordering Material', component: DetailOrdering},
  { path: '/detail-ordering/:id', exact: true, name: 'List Commercial BOQ', component: DetailOrdering },
  { path: '/assign-bast/:id', exact: true, name: 'Assign Bast', component: AssignBast },

  { path: '/dsa-creation', exact: true, name: 'DSA Creation', component: DSACreation },
  { path: '/dsa-list', exact: true, name: 'DSA List', component: DSAList },
  { path: '/dsa-detail/:id', exact: true, name: 'DSA Detail', component: DSADetail },
  { path: '/dsa-edit/:id', exact: true, name: 'DSA Edit', component: DSAEdit },

  { path: '/lcc-list', exact: true, name: 'LCC List', component: LCCList },
  { path: '/lcc-detail/:id', exact: true, name: 'LCC Detail', component: LCCDetail },
  { path: '/lcc-creation', exact: true, name: 'LCC Creation', component: LCCCreation },
  { path: '/lcc-edit/:id', exact: true, name: 'LCC Creation', component: LCCEdit },



  { path: '/ordering-list', exact: true, name: 'Ordering List', component: ListOrdering },
  { path: '/ordering-detail/:id', exact: true, name: 'Ordering Detail', component: DetailOrdering },

  { path: '/config-manager', exact: true, name: 'Config Manager', component: ConfigManager },

  { path: '/cpo-database', exact: true, name: 'CPO Database', component: CPODatabase },
  { path: '/detail-list-cpo-database/:id', exact: true, name: 'CPO Database', component: CPODatabaseDetail },

  { path: '/list-cpo-boq', exact: true, name: 'List CPO BOQ', component: ListCPOBoq },
  { path: '/list-cpo-boq/detail/:id', exact: true, name: 'CPO BOQ Detail', component: DetailCPOBoq },
  { path: '/list-cpo-boq/creation', exact: true, name: 'CPO BOQ Creation', component: DetailCPOBoq },

  { path: '/list-tssr-boq', exact: true, name: 'List TSSR BOQ', component: ListTSSRBoq },
  { path: '/list-tssr-boq/detail/:id', exact: true, name: 'CPO TSSR Detail', component: DetailTSSRBoq },

  { path: '/shipment-list', exact: true, name: 'Shipment List', component: ShipmentList },

  { path: '/wh-management', exact: true, name: 'Warehouse Management', component: WHManagement },
  { path: '/asp-user-management', exact: true, name: 'Vendor List', component: ASPManagement },
  { path: '/asp-user-management/:id', exact: true, name: 'Vendor Management', component: ASPManagementDet },


  { path: '/mat-library', exact: true, name: 'Material Library', component: MatLibrary },

  { path: '/mr-dashboard-global', exact: true, name: 'Material Request Dashboard', component: MRDashboardGlob },

  { path: '/wh-dashboard-eid', exact: true, name: 'Warehouse Internal', component: WHDashboard },
  { path: '/wh-dashboard-eid/wh-dashboard-eid-det/:slug', exact: true, name: 'Dashboard Internal', component: WHDashboardDet },
  { path: '/wh-dashboard-eid/wh-gr-eid/:slug', exact: true, name: 'GR Internal Detail', component: GRInternalDet },
  { path: '/wh-dashboard-eid/wh-gi-eid/:slug', exact: true, name: 'GI Internal Detail', component: GIInternalDet },
  { path: '/wh-dashboard-eid/material-stock2/:slug', exact: true, name: 'Material Stock', component: MaterialStock },
  { path: '/wh-dashboard-eid/material-inbound-plan2/:slug', exact: true, name: 'Material Inbound Plan', component: MaterialInboundPlan },

  { path: '/wh-dashboard-ext', exact: true, name: 'Warehouse External', component: WHDashboardExt },
  { path: '/wh-dashboard-ext/wh-dashboard-ext-det/:slug', exact: true, name: 'Warehouse Dashboard External Detail', component: WHDashboardExtDet },
  { path: '/wh-dashboard-ext/wh-gr-ext-per-wh/:whid', exact: true, name: 'GR External Detail', component: GR },
  { path: '/wh-dashboard-ext/wh-gi-ext-per-wh/:whid', exact: true, name: 'GI External Detail', component: GI },

  { path: '/drm-list', exact: true, name: 'DRM List', component: DRMList },
  { path: '/drm-list/detail/:id', exact: true, name: 'DRM Detail', component: DRMDetail },

  { path: '/cr-detail', exact: true, name: 'CR Detail', component: CRDetail },

  { path: '/order-received-per-wh/:whid', name: 'Order Received', component: OrderReceived },
  { path: '/order-processing-per-wh/:whid', exact: true, name: 'Order Processing', component: OrderProcessing },
  { path: '/ready-to-deliver-per-wh/:whid', exact: true, name: 'Ready To Deliver', component: ReadyToDeliver },
  { path: '/joint-check-per-wh/:whid', exact: true, name: 'Joint Check', component: JointCheck },
  { path: '/loading-process-per-wh/:whid', exact: true, name: 'Loading Process', component: LoadingProcess },
  { path: '/material-dispatch-per-wh/:whid', exact: true, name: 'Material Dispatch', component: MaterialDispatch },
  { path: '/loader-page', exact: true, name: 'Material Dispatch', component: LoaderPage },

  { path: '/prt-list/creation', exact: true, name: 'PRT Creation', component: PRPOCreation },
  { path: '/prt-list', exact: true, name: 'PRT List', component: ListPRPO },
  { path: '/prt-list/detail/:id', exact: true, name: 'PRT Detail', component: DetailPRPO },
  { path: '/prt-list/edit/:id', exact: true, name: 'PRT Edit', component: EditPRPO },

  { path: '/pod-list/uploader', exact: true, name: 'POD Uploader', component: FMSUploader },
  { path: '/pod-list', exact: true, name: 'POD List', component: FMSList },
  { path: '/pod-list/detail/:id', exact: true, name: 'POD Detail', component: FMSDetail },

  { path: '/sid-list/uploader', exact: true, name: 'SID Uploader', component: SIDUploader },
  { path: '/sid-list', exact: true, name: 'SID List', component: SIDList },

  { path: '/blank-page', exact: true, name: 'BlanK Page', component: BlankPage },

  { path: '/mra-list', exact: true, name: 'MRA List', component: MRAList },
  { path: '/mra-list/detail/:id', exact: true, name: 'MRA Detail', component: MRADetail },
  { path: '/mra-list-need-confirm', exact: true, name: 'MRA Detail', component: MRANeedConfirm },

  { path: '/srn/ps-srn-list', exact: true, name: 'PS SRN List', component: PSDisList },
  { path: '/srn/ps-srn-creation', exact: true, name: 'MR SRN Creation', component: PSDisCreation },
  { path: '/srn/ps-srn-detail/:id', exact: true, name: 'MR SRN Detail', component: PSDisDetail },

  { path: '/srn/mr-srn-list', exact: true, name: 'MRA List', component: MRDisList },
  { path: '/srn/mr-srn-creation', exact: true, name: 'MRA Creation', component: MRDisCreation },
  { path: '/srn/mr-srn-detail/:id', exact: true, name: 'MRA Detail', component: MRDisDetail },

  { path: '/srn/mr-srn-na-list', exact: true, name: 'MR Not Assigne PS SRN List', component: MRDisNAList },

  { path: '/srn/mr-srn-na-list/:id', exact: true, name: 'PS Assign to MR SRN Detail', component: PSAssigntoMR },

  { path: '/srn/mr-srn-need-approval-ldm-list', exact: true, name: 'MRA Need Approval LDM List', component: LDMApprovalDismantle },

  { path: '/srn/mr-srn-need-confirm-list', exact: true, name: 'MRA Need Confirm WH List', component: MRDismantleConfirmWH },

  { path: '/shf-list', exact: true, name: 'SHF List', component: SHFList },

  { path: '/toWH/ps-wh-list', exact: true, name: 'PS WH List', component: PSWHList },
  { path: '/toWH/ps-wh-creation', exact: true, name: 'PS WH Creation', component: PSWHCreation },
  { path: '/toWH/ps-wh-detail/:id', exact: true, name: 'PS WH Detail', component: PSWHDetail },

  { path: '/toWH/mr-wh-list', exact: true, name: 'MR WH List', component: MRWHList },
  { path: '/toWH/mr-wh-na-list', exact: true, name: 'MR WH NA List', component: MRWHNAList },
  { path: '/toWH/mr-wh-na-detail/:id', exact: true, name: 'MR WH NA Detail', component: AssingPStoMRWH },
  { path: '/toWH/mr-wh-dispatch', exact: true, name: 'MR WH Dispatch', component: MRWHDismantle },
  { path: '/toWH/mr-wh-confirm-wh', exact: true, name: 'MR WH Confirm Warehouse', component: MRWHConfirm },

  { path: '/dsa-migration', exact: true, name: 'DSA Migration', component: DSAMigration },

  { path: '/dsa-srn-creation', exact: true, name: 'DSA Return Creation', component: DSADCreation },
  { path: '/dsa-srn-list', exact: true, name: 'DSA Return List', component: DSADList },
  { path: '/dsa-srn-detail/:id', exact: true, name: 'DSA Return Detail', component: DSADDetail },
  { path: '/dsa-srn-edit/:id', exact: true, name: 'DSA Return Edit', component: DSADEdit },

  { path: '/srn/mr-srn-creation-bulk', exact: true, name: 'MR Return Creation', component: MRDismantleBulk },

  { path: '/lcc-po-list', exact: true, name: 'LCC PO List', component: LCCPOList },

  { path: '/dsa-srn-migration', exact: true, name: 'DSA SRN Migration', component: DSADMigration },

];

export default routes;
