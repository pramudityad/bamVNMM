export default {
  items: [
    {
      name: 'Product',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Bundle Manager',
          url: '/product-package',
          icon: 'icon-folder',
        },
        {
          name: 'Config Manager',
          url: '/config-manager',
          icon: 'icon-doc',
        },
        {
          name: 'Material Library',
          url: '/mat-library',
          icon: 'icon-list',
        }
      ]
    },
    {
      name: 'BOQ',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Technical BOQ',
          url: '/list-technical',
          icon: 'icon-docs',
        },
        {
          name: 'Commercial BOQ ',
          url: '/list-commercial',
          icon: 'icon-tag',
        },
        {
          name: 'CPO Database ',
          url: '/cpo-database',
          icon: 'icon-globe',
        },
        {
          name: 'CPO BOQ',
          url: '/list-cpo-boq',
          icon: 'icon-docs',
        },
        {
          name: 'DRM',
          url: '/drm-detail',
          icon: 'icon-docs',
        },
        {
          name: 'TSSR BOQ',
          url: '/list-tssr-boq',
          icon: 'icon-docs',
        },
        // {
        //   name: 'Ordering BOQ',
        //   url: '/list-ordering',
        //   icon: 'icon-cursor',
        // },
//        {
//          name: 'TSSR Matrix BOQ ',
//          url: '/list-tssr-matix',
//          icon: 'icon-drawer',
//        },
        {
          name: 'Plant Spec List',
          url: '/ps-list',
          icon: 'icon-menu',
        },
      ]
    },
    {
      name: 'Assignment',
      icon: 'icon-docs',
      children: [
        {
          name: 'Assignment List',
          url: '/assignment-list',
          icon: 'icon-list',
        },
        {
          name: 'Assignment NA List',
          url: '/assignment-list-approval',
          icon: 'icon-list',
        },
        {
          name: 'Assignment List (ASP)',
          url: '/assignment-list-asp',
          icon: 'icon-list',
        },
        {
          name: 'Assignment Bulk Notify',
          url: '/bulk-assignment-notify',
          icon: 'icon-list',
        }
      ]
    },
    {
      name: 'Material Request',
      icon: 'icon-note',
      children: [
        // {
        //   name: 'WH Dashboard',
        //   url: '/wh-dashboard',
        //   icon: 'icon-speedometer',
        // },
        {
          name: 'MR List',
          url: '/mr-list',
          icon: 'icon-list',
        },
        {
          name: 'MR PS Not Assigned',
          url: '/mr-na-list',
          icon: 'icon-list',
        },
        {
          name: 'Bulk MR Request',
          url: '/bulk-mr-request',
          icon: 'icon-plus',
        },
        {
          name: 'Bulk MR Approval Changes',
          url: '/bulk-mr-change-approval',
          icon: 'icon-list',
        },
        {
          name: 'Bulk MR Approval',
          url: '/bulk-mr-approval',
          icon: 'icon-check',
        }
      ]
    },
    {
      name: 'Warehouse',
      icon: 'icon-list',
      children: [
        {
          name: 'WH Dashboard EID',
          url: '/wh-dashboard2',
          icon: 'icon-speedometer',
        },
        {
          name: 'WH Dashboard ASP/DSP',
          url: '/wh-dashboard3',
          icon: 'icon-speedometer',
        },
        {
          name: 'WH Management',
          url: '/wh-management',
          icon: 'icon-list',
        },
        // {
        //   name: 'WH Stock',
        //   url: '/material-stock',
        //   icon: 'icon-list',
        // },
        // {
        //   name: 'WH Inbound Plan',
        //   url: '/material-inbound-plan',
        //   icon: 'icon-list',
        // }
      ]
    },
    {
      name: 'DSA List',
      url: '/dsa-list',
      icon: 'icon-list',
    },
    {
      title: true,
      name: 'MR Process',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Order Created',
      url: '/order-created',
      icon: 'icon-envelope-open',
      role : ["BAM-LDM"]
    },
    {
      name: 'MR Milestones',
      icon: 'icon-paper-plane',
      children: [
        {
          name: 'Order Received',
          url: '/order-received',
          icon: 'fa fa-warehouse',
        },
        {
          name: 'Order Processing',
          url: '/order-processing',
          icon: 'fa fa-clipboard-list',
        },
        {
          name: 'Ready to Deliver',
          url: '/ready-to-deliver',
          icon: 'fa fa-arrow-right',
        },
        {
          name: 'Joint Check',
          url: '/joint-check',
          icon: 'fa fa-box-open',
        },
        {
          name: 'Loading Process',
          url: '/loading-process',
          icon: 'fa fa-truck-loading',
        },
        {
          name: 'Material Dispatch',
          url: '/material-dispatch',
          icon: 'fa fa-truck-moving',
        },
        {
          name: 'Shipment',
          url: '/shipment-list',
          icon: 'fa fa-truck-moving',
        },

      ]
    },
    {
      name: 'LOM List',
      url: '/lom-list',
      icon: 'fa fa-stop-circle',
    },
  ],
};
