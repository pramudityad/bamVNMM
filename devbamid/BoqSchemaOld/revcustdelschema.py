revcustdelschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
    'cd_id' : {
		'type' : 'string',
		'required' : True,
	},
	'id_project_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
	'project_name' : {
		'type' : 'string',
		'required' : True,
	},
	'id_site_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
	'site_id' : {
		'type' : 'string',
		'required' : True,
	},
	'id_boq_tech_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
	'no_boq_tech' : {
		'type' : 'string',
		'required' : True,
	},
	'ms_01' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ms_02' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ms_03' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ms_04' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ms_05' : {
		'type' : 'datetime',
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