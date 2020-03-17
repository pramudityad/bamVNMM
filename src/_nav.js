export default {
  items: [
    {
      name: 'BOQ & Product',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Product Manager',
          url: '/product-package',
          icon: 'icon-folder',
        },
        {
          name: 'Config Manager',
          url: '/config-manager',
          icon: 'icon-doc',
        },
        {
          name: 'Technical BOQ',
          url: '/list-technical',
          icon: 'icon-docs',
        },
        {
          name: 'Technical CPO',
          url: '/list-technical-cpo',
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
          name: 'Ordering BOQ',
          url: '/list-ordering',
          icon: 'icon-cursor',
        },
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
        {
          name: 'WH Dashboard',
          url: '/wh-dashboard',
          icon: 'icon-speedometer',
        },
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
      ]
    },
    {
      name: 'LOM List',
      url: '/lom-list',
      icon: 'fa fa-stop-circle',
    },
  ],
};
