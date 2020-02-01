revsiteschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
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
	'location' : {
		'type' : 'string',
		'nullable' : True,
	},
	'longitude' : {
		'type' : 'string',
		'nullable' : True,
	},
	'latitude' : {
		'type' : 'string',
		'nullable' : True,
	},
	'deleted' : {
		'type' : 'integer',
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