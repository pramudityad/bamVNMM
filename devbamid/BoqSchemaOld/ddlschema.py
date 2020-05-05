ddlschema = {
    'ddl_name' : {
        'type' : 'string',
        'required' : True
    },
    'ddl_group' : {
        'type' : 'string',
        'required' : True,
    },
	'deleted' : {
		'type' : 'integer',
		'default': 0,
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
	}
}