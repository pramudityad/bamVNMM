export default {
  items: [
    {
      name: 'Product',
      icon: 'icon-folder-alt',
      roles : ["BAM-Engineering", "BAM-Account Team"],
      children: [
        {
          name: 'Product Package',
          url: '/product-package',
          icon: 'icon-folder',
          roles : ["BAM-Engineering", "BAM-Account Team"],
        },
        {
          name: 'Product Package Variant',
          url: '/variant-library',
          icon: 'icon-folder',
          roles : ["BAM-Engineering"],
        },
        {
          name: 'Service Library',
          url: '/svc-library',
          icon: 'icon-folder',
          roles : ["BAM-Engineering"],
        },
        {
          name: 'Material Variant',
          url: '/mat-library',
          icon: 'icon-folder',
          roles : ["BAM-Engineering"],
        },
      ]
    },
    {
      name: 'BOQ',
      icon: 'icon-folder-alt',
      roles : ["BAM-Engineering", "BAM-Account Team"],
      children: [
        {
          name: 'Technical BOQ',
          url: '/list-technical',
          icon: 'icon-docs',
          roles : ["BAM-Engineering", "BAM-Account Team"],
        },
        {
          name: 'PR ',
          url: '/list-pr',
          icon: 'icon-tag',
          roles : ["BAM-Account Team"],
        },
        {
          name: 'CPO DB',
          url: '/cpo-database',
          icon: 'icon-docs',
          roles : ["BAM-Account Team"],
        },
        {
          name: 'BOQ Reservation',
          url: '/list-tssr-boq',
          icon: 'icon-docs',
          roles : ["BAM-PD", "BAM-Account Team", "BAM-Project Controller", "BAM-Project Planner"],
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
      roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP", "BAM-Project Controller", "BAM-Project Planner"],
      children: [
        {
          name: 'Assignment List',
          url: '/assignment-list',
          icon: 'icon-list',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Project Controller", "BAM-Project Planner"],
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
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP"],
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
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP Management", "BAM-ASP", "BAM-Project Controller", "BAM-Project Planner"],
        },
        {
          name: 'PRT',
          url: '/prt-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
      ]
    },
    {
       name: 'Plant Spec List',
       url: '/ps-list',
       icon: 'icon-menu',
       roles : ["BAM-Engineering", "BAM-Project Controller", "BAM-Project Planner"],
     },
    {
      name: 'Material Request',
      icon: "fas fa-tools",
      roles : [ "BAM-Warehouse", "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering", "BAM-LDM", "BAM-ASP", "BAM-ASPWarehouse", "BAM-Mover", "BAM-Project Controller", "BAM-Project Planner", "BAM-RSC"],
      children: [
        {
          name: 'MR Dashboard',
          url: '/mr-dashboard-global',
          icon: 'icon-speedometer',
          roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering", "BAM-LDM", "BAM-ASP", "BAM-ASPWarehouse", "BAM-Mover", "BAM-Project Controller", "BAM-Project Planner"],
        },
        {
          name: 'MR List',
          url: '/mr-list',
          icon: 'icon-list',
          roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering", "BAM-LDM", "BAM-ASP", "BAM-ASPWarehouse", "BAM-Mover", "BAM-Project Controller", "BAM-Project Planner", "BAM-RSC"],
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
      name: 'MR Return/Dismantle',
      icon: "fas fa-tools",
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
      children: [
        {
          name: 'PS SRN',
          url: '/srn/ps-srn-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MRA List',
          url: '/srn/mr-srn-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MRA Assign PS SRN',
          url: '/srn/mr-srn-na-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MRA Approval LDM',
          url: '/srn/mr-srn-need-approval-ldm-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MRA Warehouse Confirm',
          url: '/srn/mr-srn-need-confirm-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
      ]
    },
    {
      name: 'MR Warehouse',
      icon: "fas fa-tools",
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
      children: [
        {
          name: 'PS Warehouse List',
          url: '/toWH/ps-wh-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MR Warehouse',
          url: '/toWH/mr-wh-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MR WH Assign PS',
          url: '/toWH/mr-wh-na-list',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MR WH Dispatch',
          url: '/toWH/mr-wh-dispatch',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
        {
          name: 'MR WH Confirm WH',
          url: '/toWH/mr-wh-confirm-wh',
          icon: 'icon-list',
          roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse"],
        },
      ]
    },
    {
      name: 'Warehouse',
      icon: 'fas fa-boxes',
      roles : ["BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Warehouse", "BAM-ASPWarehouse", "BAM-Project Controller", "BAM-Project Planner"],
      children: [
        {
          name: 'Dashboard EID',
          url: '/wh-dashboard-eid',
          icon: 'icon-speedometer',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Project Controller", "BAM-Project Planner", "BAM-Warehouse"],
        },
        {
          name: 'Dashboard ASP/DSP',
          url: '/wh-dashboard-ext',
          icon: 'icon-speedometer',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASPWarehouse"],
        },
        {
          name: 'Warehouse Management',
          url: '/wh-management',
          icon: 'fas fa-pallet',
          roles : ["BAM-Warehouse"],
        },
        {
          name: 'ASP User Management',
          url: '/asp-user-management',
          icon: 'icon-list',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator"],
        },
      ]
    },
    {
      name: 'LCC List',
      url: '/lcc-list',
      icon: 'icon-list',
      roles : ["BAM-LDM"],
    },
    {
      name: 'DSA List',
      url: '/dsa-list',
      icon: 'icon-list',
      roles : ["BAM-LDM Admin", "BAM-LDM", "BAM-Mover"],
    },
    {
      name: 'DSA Return List',
      url: '/dsa-srn-list',
      icon: 'icon-list',
      roles : ["BAM-LDM Admin", "BAM-LDM", "BAM-Mover"],
    },
    {
      name: 'POD List',
      url: '/pod-list',
      icon: 'icon-list',
      roles : ["BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-ASP"],
    },
    {
      name: 'SID List',
      url: '/sid-list',
      icon: 'icon-list',
      roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering", "BAM-Project Controller", "BAM-Project Planner"],
    },
    {
      name: 'SHF List',
      url: '/shf-list',
      icon: 'icon-list',
      roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-Engineering", "BAM-Project Controller", "BAM-Project Planner"],
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
      roles : ["BAM-LDM", "BAM-RSC"],
    },
    {
      name: 'MR Milestones',
      icon: 'icon-paper-plane',
      roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-ASP", "BAM-ASPWarehouse", "BAM-Mover", "BAM-Project Controller", "BAM-Project Planner", "BAM-RSC"],
      children: [
        {
          name: 'Order Received',
          url: '/order-received',
          icon: 'fa fa-warehouse',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
        {
          name: 'Order Processing',
          url: '/order-processing',
          icon: 'fa fa-clipboard-list',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
        {
          name: 'LOM List',
          url: '/lom-list',
          icon: 'fa fa-stop-circle',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
        {
          name: 'Ready to Deliver',
          url: '/ready-to-deliver',
          icon: 'fa fa-arrow-right',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
        {
          name: 'Joint Check',
          url: '/joint-check',
          icon: 'fa fa-box-open',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
        {
          name: 'Loading Process',
          url: '/loading-process',
          icon: 'fa fa-truck-loading',
          roles : ["BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
        {
          name: 'Waiting Dispatch',
          url: '/waiting-dispatch',
          icon: 'fa fa-truck-moving',
          roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM" , "BAM-ASP", "BAM-ASPWarehouse", "BAM-Mover", "BAM-RSC"],
        },
        {
          name: 'Material Dispatch',
          url: '/material-dispatch',
          icon: 'fa fa-truck-moving',
          roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM" , "BAM-ASP", "BAM-ASPWarehouse", "BAM-Mover", "BAM-RSC"],
        },
        {
          name: 'Shipment',
          url: '/shipment-list',
          icon: 'fa fa-truck-moving',
          roles : [ "BAM-PD", "BAM-Customer Project Manager", "BAM-Implementation Manager", "BAM-Implementation Coordinator", "BAM-LDM", "BAM-RSC"],
        },
      ]
    },
  ],
};
