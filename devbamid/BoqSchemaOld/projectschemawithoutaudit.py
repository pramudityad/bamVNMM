projectschemawithoutaudit = {
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
	'fas_1' : {
		'type' : 'string',
		'nullable' : True,
	},
	'fas_2' : {
		'type' : 'string',
		'nullable' : True,
	},
	'fas_3' : {
		'type' : 'string',
		'nullable' : True,
	},
	'fas_4' : {
		'type' : 'string',
		'nullable' : True,
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