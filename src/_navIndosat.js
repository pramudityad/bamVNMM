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
          name: 'Config Library',
          url: '/config-library',
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

      //   {
      //     name: 'CPO Database ',
      //     url: '/cpo-database',
      //     icon: 'icon-globe',
      //   },
        {
          name: 'TSSR BOQ',
          url: '/list-tssr-boq',
          icon: 'icon-docs',
        },
      {
         name: 'CR',
         url: '/cr-detail',
         icon: 'icon-drawer',
       },
       {
        name: 'Plant Spec List',
        url: '/ps-list',
        icon: 'icon-menu',
      },
      ]
    }
  ],
};
