siteschema = {
	'site_id' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False,
	},
	'site_name' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False,
	},
	'longitude' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'latitude' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'customer_area' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'province' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'city' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'address' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'site_type' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'deleted' : {
		'type' : 'integer',
		'default': 0
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
	},
}