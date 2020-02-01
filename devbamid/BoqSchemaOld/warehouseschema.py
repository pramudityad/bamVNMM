warehouseschema = {
	'sku' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False,
	},
	'description' : {
		'type' : 'string',
		'nullable' : True,
	},
	'location' : {
		'type' : 'string',
		'nullable' : True,
	},
	'project_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'handling_unit' : {
		'type' : 'string',
		'nullable' : True,
	},
	'lpn_id' : {
		'type' : 'string',
		'nullable' : True,
	},
	'category' : {
		'type' : 'string',
		'nullable' : True,
	},
	'wbs' : {
		'type' : 'string',
		'nullable' : True,
	},
	'on_hand' : {
		'type' : 'integer',
		'nullable' : True,
	},
	'allocated' : {
		'type' : 'integer',
		'nullable' : True,
	},
	'picked' : {
		'type' : 'integer',
		'nullable' : True,
	},
	'available' : {
		'type' : 'integer',
		'nullable' : True,
	},
	'cbm' : {
		'type' : 'float',
		'nullable' : True,
	},
}