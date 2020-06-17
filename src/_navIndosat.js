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
      //   {
      //     name: 'Commercial BOQ ',
      //     url: '/list-commercial',
      //     icon: 'icon-tag',
      //   },
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
      // {
      //    name: 'TSSR Matrix BOQ ',
      //    url: '/list-tssr-matix',
      //    icon: 'icon-drawer',
      //  },
       {
        name: 'Plant Spec List',
        url: '/ps-list',
        icon: 'icon-menu',
      },
      ]
    }
  ],
};
