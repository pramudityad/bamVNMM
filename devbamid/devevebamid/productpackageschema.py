productpackageschema = {
	'pp_id' : {
		'type' : 'string',
		'required' : True,
		'unique' : True,
        'nullable' : False
	},
	'pp_key' : {
		'type' : 'string',
        'required' : True,
		'nullable' : True,
		'default' : None
	},
	'pp_group' : {
		'type' : 'string',
        'required' : True,
		'nullable' : True
	},
	'product_name' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'uom' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
	'pp_cust_number' : {
		'type' : 'string',
		'required' : True,
	},
	'physical_group' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
	'product_type' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
	'pricing_group' : {
		'type' : 'float',
		'default' : 0,
	},
	'price' : {
		'type' : 'float',
		'default' : 0,
	},
	'year' : {
		'type' : 'string',
		'default' : None,
	},
	'variant_name' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'notes' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'fas_assignment_id' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None,
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
		'nullable' : True
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	}
}