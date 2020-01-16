projectschema = {
	'Project' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'Project_Year' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False,
	},
	'Email_CPM_Name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Email_PP_Name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Email_Project_Coordinator_01' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Email_Project_Coordinator_02' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Email_Project_Coordinator_03' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Email_Project_Coordinator_04' : {
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