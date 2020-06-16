import React from 'react';
// import WHDashboard from './views/Warehouse/WHDashboard';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const ProductPackage = React.lazy(() => import('./viewsIndosat/ProductPackage/PackageUpload'));

const ListTechnical = React.lazy(() => import('./viewsIndosat/Technical/ListTechnical'));
const DetailTechnical = React.lazy(() => import('./viewsIndosat/Technical/TechnicalBoq'));
const SummaryBoq = React.lazy(() => import('./viewsIndosat/Technical/SummaryBoq'));

const ListCommercial = React.lazy(() => import('./viewsIndosat/Commercial/ListCommercial'));
const DetailCommercial = React.lazy(() => import('./viewsIndosat/Commercial/CommercialBoq'));
const DetailCommercialPO = React.lazy(() => import('./viewsIndosat/Commercial/CommercialBoqPO'));
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


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/product-package', exact: true, name: 'Product Package Manager', component: ProductPackage },

  { path: '/list-technical', exact: true, name: 'List Technical BOQ', component: ListTechnical },
  { path: '/detail-technical/:id', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },
  { path: '/new-technical', exact: true, name: 'Detail Technical BOQ', component: DetailTechnical },
  { path: '/summary-boq/:id', exact: true, name: 'Detail Summary BOQ', component: SummaryBoq },

  { path: '/list-commercial', exact: true, name: 'List Commercial BOQ', component: ListCommercial },
  { path: '/list-commercial/creation', exact: true, name: 'Commercial BOQ Creation', component: DetailCommercial },
  { path: '/list-commercial/detail/:id', exact: true, name: 'Detail Commercial BOQ', component: DetailCommercial },
  { path: '/list-commercial/detail-po/:id', exact: true, name: 'Detail Commercial BOQ', component: DetailCommercialPO },
  { path: '/approval-commercial/:id', exact: true, name: 'Approval for Commercial BOQ', component: ApprovalCommercial },
  { path: '/submission-commercial/:id', exact: true, name: 'Submission Commercial BOQ', component: SubmissionCommBoq },

  { path: '/list-tssr-matix', exact: true, name: 'List TSSR Matrix BOQ', component: ListTssrMatrix },
  { path: '/list-tssr-matix/creation', exact: true, name: 'TSSR Matrix BOQ Creation', component: NewTssrMatrix },
  { path: '/list-tssr-matix/:id', exact: true, name: 'Detail TSSR Matrix BOQ', component: DetailTssrMatrix },
  { path: '/list-tssr-boq', exact: true, name: 'List TSSR BOQ', component: ListTSSRBoq },
  { path: '/list-tssr-boq/:id', exact: true, name: 'CPO TSSR Detail', component: DetailTSSRBoq },

  { path: '/cpo-database', exact: true, name: 'CPO Database', component: CPODatabase },

  { path: '/ps-list', exact: true, name: 'Plant Spec List', component: PSList },
  { path: '/ps-creation', exact: true, name: 'Plant Spec BOM', component: PSBOM },
  { path: '/ps-detail/:id', name: 'Plant Spec BOM', component: PSBOMDetail },


];

export default routes;
