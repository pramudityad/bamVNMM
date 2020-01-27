import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const ProductPackage = React.lazy(() => import('./views/ProductPackage/PackageUpload'));
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
const WarehouseDashboard = React.lazy(() => import('./views/Warehouse/WarehouseDashboard'));
const OrderReceived = React.lazy(() => import('./views/Warehouse/OrderReceived'));
const OrderProcessing = React.lazy(() => import('./views/Warehouse/OrderProcessing'));
const ReadyToDeliver = React.lazy(() => import('./views/Warehouse/ReadyToDeliver'));
const JointCheck = React.lazy(() => import('./views/Warehouse/JointCheck'));
const LoadingProcess = React.lazy(() => import('./views/Warehouse/LoadingProcess'));
const MaterialDispatch = React.lazy(() => import('./views/Warehouse/MaterialDispatch'));
const ProjectDashboard = React.lazy(() => import('./views/Project/ProjectDashboard'));
const OrderCreated = React.lazy(() => import('./views/Project/OrderCreated'));
const LOMList = React.lazy(() => import('./views/MR/LOMList'));
const AssignmentCreation = React.lazy(() => import('./views/Assignment/AssignmentCreation'));
const AssignmentList = React.lazy(() => import('./views/Assignment/AssignmentList'));
const BulkAssignment = React.lazy(() => import('./views/Assignment/BulkAssignment'));
const AssignmentDetail = React.lazy(() => import('./views/Assignment/AssignmentDetail'));
const AssignBast = React.lazy(() => import('./views/Assignment/AssignBast'));
const BulkRequest = React.lazy(() => import('./views/MR/BulkRequest'));
const BulkNotifytoASP = React.lazy(() => import('./views/Assignment/BulkNotifytoASP'));
const ListTechnical = React.lazy(() => import('./views/Technical/ListTechnical'));
const DetailTechnical = React.lazy(() => import('./views/Technical/TechnicalBoq'));
const ApprovalTechnical = React.lazy(() => import('./views/Technical/TechnicalBoqApproval'));
const DSACreation = React.lazy(() => import('./views/DSA/DSACreation'));
const ListCommercial = React.lazy(() => import('./views/Commercial/ListCommercial'));
const DetailCommercial = React.lazy(() => import('./views/Commercial/CommercialBoq'));
const ApprovalCommercial = React.lazy(() => import('./views/Commercial/CommercialBoqApproval'));
const DSAList = React.lazy(() => import('./views/DSA/DSAList'));
const DSADetail = React.lazy(() => import('./views/DSA/DSADetail'));
const BulkChangeApproval = React.lazy(() => import('./views/MR/ListChangeApproval'));
const BulkApproval = React.lazy(() => import('./views/MR/ListBulkApproval'));
const ListOrdering = React.lazy(() => import('./views/Ordering/ListOrdering'));
const DetailOrdering = React.lazy(() => import('./views/Ordering/OrderingMaterial'));

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
  { path: '/ps-list', exact: true, name: 'Plant Spec List', component: TssrList },
  { path: '/ps-bom', exact: true, name: 'Plant Spec BOM', component: TssrBOM },
  { path: '/ps-bom/:id', name: 'Plant Spec BOM', component: TssrBOMDetail },
  { path: '/mr-list', exact: true, name: 'MR List', component: MRList },
  { path: '/mr-na-list', exact: true, name: 'MR List', component: MRNAList },
  { path: '/mr-creation', exact: true, name: 'Create MR', component: MRCreation },
  { path: '/mr-detail/:id', exact: true, name: 'MR Detail', component: MRDetail },
  { path: '/bulk-mr-creation', name: 'Bulk MR Creation', component: BulkMRCreation },
  { path: '/bulk-mr-request', name: 'Bulk MR Request', component: BulkRequest },
  { path: '/bulk-mr-change-approval', name: 'Bulk MR Change Approval', component: BulkChangeApproval },
  { path: '/bulk-mr-approval', name: 'Bulk MR Approval', component: BulkApproval },
  { path: '/ps-upload/:id', exact: true, name: 'MR List', component: PSUpload },
  { path: '/mr-progress/:id', exact: true, name: 'MR Progress', component: MRProgress },
  { path: '/wh-dashboard', exact: true, name: 'Warehouse Dashboard', component: WarehouseDashboard },
  { path: '/order-received', exact: true, name: 'Order Received', component: OrderReceived },
  { path: '/order-processing', exact: true, name: 'Order Processing', component: OrderProcessing },
  { path: '/ready-to-deliver', exact: true, name: 'Ready To Deliver', component: ReadyToDeliver },
  { path: '/joint-check', exact: true, name: 'Joint Check', component: JointCheck },
  { path: '/loading-process', exact: true, name: 'Loading Process', component: LoadingProcess },
  { path: '/material-dispatch', exact: true, name: 'Material Dispatch', component: MaterialDispatch },
  { path: '/project-dashboard', exact: true, name: 'Project Dashboard', component: ProjectDashboard },
  { path: '/order-created', exact: true, name: 'Order Created', component: OrderCreated },
  { path: '/lom-list', exact: true, name: 'LOM List', component: LOMList },
  { path: '/assignment-creation', exact: true, name: 'Assignment Creation', component: AssignmentCreation },
  { path: '/assignment-list', exact: true, name: 'Assignment List', component: AssignmentList },
  { path: '/bulk-assignment-creation', exact: true, name: 'Bulk Assignment Creation', component: BulkAssignment },
  { path: '/assignment-detail/:id', exact: true, name: 'Assignment Detail', component: AssignmentDetail },
  { path: '/bulk-assignment-notify', exact: true, name: 'Bulk Assignment Notify to ASP', component: BulkNotifytoASP },
  { path: '/list-technical', exact: true, name: 'List Technical BOQ', component: ListTechnical },
  { path: '/detail-technical/:id', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },
  { path: '/approval-technical/:id', exact: true, name: 'Approval for Technical BOQ', component: ApprovalTechnical },
  { path: '/dsa-creation', exact: true, name: 'DSA Creation', component: DSACreation },
  { path: '/list-commercial', exact: true, name: 'List Commercial BOQ', component: ListCommercial },
  { path: '/detail-commercial/:id', exact: true, name: 'Detail Commercial BOQ', component: DetailCommercial },
  { path: '/approval-commercial/:id', exact: true, name: 'Approval for Commercial BOQ', component: ApprovalCommercial },
  { path: '/assign-bast/:id', exact: true, name: 'Assign Bast', component: AssignBast },
  { path: '/dsa-list', exact: true, name: 'DSA List', component: DSAList },
  { path: '/dsa-detail/:id', exact: true, name: 'DSA Detail', component: DSADetail },
  { path: '/ordering-list', exact: true, name: 'Ordering List', component: ListOrdering },
  { path: '/ordering-detail/:id', exact: true, name: 'Ordering Detail', component: DetailOrdering },
];

export default routes;
