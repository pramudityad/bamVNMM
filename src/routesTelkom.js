import React from 'react';
// import WHDashboard from './views/Warehouse/WHDashboard';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const LMRCreation = React.lazy(() => import('./views/MYAssignment/MYASGCreation'));
const LMRDetail = React.lazy(() => import('./views/MYAssignment/MYASGDetail'));
const LMRList = React.lazy(() => import('./views/MYAssignment/MYASGList'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/lmr-list', exact: true, name: 'Assignment LMR List', component: LMRList },
  { path: '/lmr-creation', exact: true, name: 'Assignment LMR Creation', component: LMRCreation },
  { path: '/lmr-detail', exact: true, name: 'Assignment LMR Detail', component: LMRDetail },
];

export default routes;
