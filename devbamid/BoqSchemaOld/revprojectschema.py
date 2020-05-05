revprojectschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
	'project_name' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'project_year' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False,
	},
	'email_cpm' : {
		'type' : 'string',
		'nullable' : True,
	},
	'email_pp' : {
		'type' : 'string',
		'nullable' : True,
	},
	'email_project_coordinator_01' : {
		'type' : 'string',
		'nullable' : True,
	},
	'email_project_coordinator_02' : {
		'type' : 'string',
		'nullable' : True,
	},
	'email_project_coordinator_03' : {
		'type' : 'string',
		'nullable' : True,
	},
	'email_project_coordinator_04' : {
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