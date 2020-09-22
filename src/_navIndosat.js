export default {
  items: [
    {
      name: 'Product',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Product Package',
          url: '/product-package',
          icon: 'icon-folder',
        },
        {
          name: 'Product Package Variant',
          url: '/variant-library',
          icon: 'icon-folder',
        },
        {
          name: 'Service Library',
          url: '/svc-library',
          icon: 'icon-folder',
        },
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
          name: 'PR ',
          url: '/list-pr',
          icon: 'icon-tag',
        },
        {
          name: 'CPO DB',
          url: '/cpo-database',
          icon: 'icon-docs',
        },
        {
          name: 'BOQ Reservation',
          url: '/list-tssr-boq',
          icon: 'icon-docs',
        },
        // {
        //    name: 'CR',
        //    url: '/cr-detail',
        //    icon: 'icon-drawer',
        //  },
      ]
    },
    {
      name: 'Assignment',
      icon: 'icon-docs',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP"],
      children: [
        {
          name: 'Assignment List',
          url: '/assignment-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'Assignment NA List',
          url: '/assignment-list-approval',
          icon: 'icon-list',
          roles : ["BAM-Implementation Coordinator", "BAM-TPM", "BAM-Customer Project Manager"],
        },
        {
          name: 'Assignment List (ASP)',
          url: '/assignment-list-asp',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP"],
        },
        {
          name: 'Assignment Bulk Notify',
          url: '/bulk-assignment-notify',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'Assignment Report',
          url: '/assignment-list-report',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP" ],
        }
      ]
    },
    {
       name: 'Plant Spec List',
       url: '/ps-list',
       icon: 'icon-menu',
     },
    {
      name: 'Material Request',
      icon: "fas fa-tools",
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering"],
      children: [
        {
          name: 'MR Dashboard',
          url: '/mr-dashboard-global',
          icon: 'icon-speedometer',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'MR List',
          url: '/mr-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering"],
        },
        {
          name: 'MR PS Not Assigned',
          url: '/mr-na-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering"],
        },
        {
          name: 'Bulk MR Request',
          url: '/bulk-mr-request',
          icon: 'icon-plus',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
      ]
    },
    {
      name: 'Warehouse',
      icon: 'fas fa-boxes',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse", "BAM-ASPWarehouse"],
      children: [
        {
          name: 'Dashboard EID',
          url: '/wh-dashboard-eid',
          icon: 'icon-speedometer',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'Dashboard ASP/DSP',
          url: '/wh-dashboard-ext',
          icon: 'icon-speedometer',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASPWarehouse"],
        },
        {
          name: 'Warehouse Management',
          url: '/wh-management',
          icon: 'fas fa-pallet',
        },
        {
          name: 'ASP User Management',
          url: '/asp-user-management',
          icon: 'icon-list',
        },
      ]
    },
    {
      title: true,
      name: 'MR Process',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
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
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
    },
    {
      name: 'MR Milestones',
      icon: 'icon-paper-plane',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse", "BAM-ASP Management", "BAM-ASP"],
      children: [
        {
          name: 'Order Received',
          url: '/order-received',
          icon: 'fa fa-warehouse',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'Order Processing',
          url: '/order-processing',
          icon: 'fa fa-clipboard-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'LOM List',
          url: '/lom-list',
          icon: 'fa fa-stop-circle',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'Ready to Deliver',
          url: '/ready-to-deliver',
          icon: 'fa fa-arrow-right',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'Joint Check',
          url: '/joint-check',
          icon: 'fa fa-box-open',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'Loading Process',
          url: '/loading-process',
          icon: 'fa fa-truck-loading',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'Waiting Dispatch',
          url: '/waiting-dispatch',
          icon: 'fa fa-truck-moving',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP"],
        },
        {
          name: 'Material Dispatch',
          url: '/material-dispatch',
          icon: 'fa fa-truck-moving',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse", "BAM-ASP Management", "BAM-ASP"],
        },
        {
          name: 'Shipment',
          url: '/shipment-list',
          icon: 'fa fa-truck-moving',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
      ]
    },
  ],
};
