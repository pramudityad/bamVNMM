export default {
  items: [
    {
      name: 'WH Dashboard',
      url: '/wh-dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'BOQ & Product',
      icon: 'icon-drawer',
      children: [
        {
          name: 'Product Manager',
          url: '/product-package',
          icon: 'icon-layers',
        },
        {
          name: 'TSSR List',
          url: '/tssr-list',
          icon: 'icon-briefcase',
        },
      ]
    },
    {
      name: 'MR Report',
      icon: 'icon-drawer',
      children: [
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
          name: 'LOM List',
          url: '/lom-list',
          icon: 'icon-list',
        },
      ]
    },
    {
      title: true,
      name: 'MR Process Milestones',
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
    },
    {
      name: 'Order Received',
      url: '/order-received',
      icon: 'icon-note',
    },
    {
      name: 'Order Processing',
      url: '/order-processing',
      icon: 'icon-envelope-letter',
    },
    {
      name: 'Ready to Deliver',
      url: '/ready-to-deliver',
      icon: 'icon-drop',
    },
    {
      name: 'Joint Check',
      url: '/joint-check',
      icon: 'icon-info',
      badge: {
        variant: 'danger',
        text: '1'
      }
    },
    {
      name: 'Loading Process',
      url: '/loading-process',
      icon: 'icon-basket',
    },
    {
      name: 'Material Dispatch',
      url: '/material-dispatch',
      icon: 'icon-basket-loaded',
    }
  ],
};
