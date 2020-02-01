poschema = {
    'po_number' : {
		'type' : 'string',
        'nullable' : True
	},
	'po_year' : {
		'type' : 'string',
        'nullable' : True
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
		'data_relation':{
			'resource' : 'user_ref',
			'field': '_id',
			'embeddable': True
		},
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True,
		'data_relation':{
			'resource' : 'user_ref',
			'field': '_id',
			'embeddable': True
		},
	},
}