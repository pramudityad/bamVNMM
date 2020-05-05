flowpermissionviewschema = {
    'role' : {
		'type' : 'objectid',
		'required' : True,
        'data_relation':{
            'resource' : 'roles_all',
            'field': '_id',
            'embeddable': True
        },
	},
    'flow_menus' : {
        'type' : 'list',
        'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'flow_menu_all',
				'field': '_id',
				'embeddable': True
			},
		},
    }
}