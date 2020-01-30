productpackageschemawithoutaudit = {
	'pp_id' : {
		'type' : 'string',
		'required' : True,
		'unique' : True,
        'nullable' : False
	},
	'pp_key' : {
		'type' : 'string',
        'required' : True,
		'nullable' : False
	},
	'pp_group' : {
		'type' : 'string',
        'required' : True,
		'nullable' : False
	},
	'name' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'unit' : {
		'type' : 'string',
		'nullable' : True,
	},
	'pp_cust_number' : {
		'type' : 'string',
		'required' : True,
	},
	'phy_group' : {
		'type' : 'string',
		'nullable' : True,
	},
	'pricing_group' : {
		'type' : 'string',
		'nullable' : True,
	},
	'product_type' : {
		'type' : 'string',
		'nullable' : True,
	},
	'price' : {
		'type' : 'float',
		'nullable' : True,
	},
	'year' : {
		'type' : 'string',
		'nullable' : True,
	},
	'variant_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'note' : {
		'type' : 'string',
		'nullable' : True,
	},
	'fas_category' : {
		'type' : 'string',
		'nullable' : True,
	},
	'list_of_id_material' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'mc_all',
				'field': '_id',
				'embeddable': True
			},
		},
	},
	'list_of_project' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'project_all',
				'field': '_id',
				'embeddable': True
			},
		},
	},
	'deleted' : {
		'type' : 'integer',
		'default': 0,
		'nullable' : True,
	},
	'created_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'created_by' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True,
	},
}