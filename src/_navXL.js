export default {
  items: [
    {
      name: 'Product',
      icon: 'icon-folder-alt',
      roles : ["BAM-Engineering", "BAM-Project Planner", "BAM-Solution"],
      children: [
        {
          name: 'Bundle Manager',
          url: '/product-package',
          icon: 'icon-folder',
          roles : ["BAM-Engineering", "BAM-Project Planner"],
        },
        {
          name: 'Additional Material',
          url: '/additional-material-package',
          icon: 'icon-folder',
          roles : ["BAM-Engineering", "BAM-Project Planner"],
        },
        {
          name: 'Config Manager',
          url: '/config-manager',
          icon: 'icon-doc',
          roles : ["BAM-Engineering", "BAM-Project Planner", "BAM-Solution"],
        },
        {
          name: 'Additional Material',
          url: '/additional-material',
          icon: 'icon-folder',
          roles : ["BAM-Engineering"],
        },
        {
          name: 'Material Variant',
          url: '/mat-library',
          icon: 'icon-list',
          roles : ["BAM-Engineering", "BAM-Project Planner"],
        }
      ]
    },
    {
      name: 'BOQ',
      icon: 'icon-folder-alt',
      roles : ["BAM-Solution", "BAM-Account Team", "BAM-Engineering"],
      children: [
        {
          name: 'Technical BOQ',
          url: '/list-technical',
          icon: 'icon-docs',
          roles : ["BAM-Solution", "BAM-Account Team"],
        },
        {
          name: 'Commercial BOQ ',
          url: '/list-commercial',
          icon: 'icon-tag',
          roles : ["BAM-Account Team"],
        },
        {
          name: 'CPO Database ',
          url: '/cpo-database',
          icon: 'icon-globe',
          roles : ["BAM-Account Team"],
        },
        {
          name: 'CPO BOQ',
          url: '/list-cpo-boq',
          icon: 'icon-docs',
          roles : ["BAM-Account Team"],
        },
        {
          name: 'DRM',
          url: '/drm-list',
          icon: 'icon-docs',
          roles : ["BAM-Solution", "BAM-Engineering"],
        },
        {
          name: 'TSSR BOQ',
          url: '/list-tssr-boq',
          icon: 'icon-docs',
          roles : ["BAM-Solution", "BAM-Engineering"],
        },
        {
          name: 'CR',
          url: '/cr-detail',
          icon: 'icon-docs',
          roles : ["BAM-Solution", "BAM-Engineering"],
        },
      ]
    },
    {
      name: 'Assignment',
      icon: 'icon-docs',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP", "BAM-Customer Project Manager"],
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
          roles : ["BAM-Customer Project Manager"],
        },
        {
          name: 'Assignment Approval Bulk',
          url: '/assignment-bulk-approval',
          icon: 'icon-list',
          roles : ["BAM-Customer Project Manager"],
        },
        {
          name: 'Assignment List (ASP)',
          url: '/assignment-list-asp',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP"],
        },
        {
          name: 'Assignment Bulk Notify',
          url: '/bulk-assignment-notify',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'PRT',
          url: '/prt-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'Assignment Report',
          url: '/assignment-list-report',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP"],
        },
        {
          name: 'POD List',
          url: '/pod-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP"],
        },
      ]
    },
    {
      name: 'Plant Spec List',
      url: '/ps-list',
      icon: 'icon-menu',
      role : ["BAM-Engineering"]
    },
    {
      name: 'Material Request',
      icon: "fas fa-tools",
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
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
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MR PS Not Assigned',
          url: '/mr-na-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'Bulk MR Request',
          url: '/bulk-mr-request',
          icon: 'icon-plus',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
        {
          name: 'MRA List',
          url: '/mra-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MRA Need Confirm',
          url: '/mra-list-need-confirm',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
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
      name: 'DSA List',
      url: '/dsa-list',
      icon: 'icon-list',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
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
    {
      name: 'LOM List',
      url: '/lom-list',
      icon: 'fa fa-stop-circle',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
    },
    {
      name: 'Material LOM List',
      url: '/matlom-list',
      icon: 'fa fa-stop-circle',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
    },
  ],
};
