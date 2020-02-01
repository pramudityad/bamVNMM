revboqtechnicalschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
	'no_boq_tech' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False,
	},
	'id_boq_comm_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'no_boq_comm' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_project_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'project_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'scenario' : {
		'type' : 'string',
		'nullable' : True,
	},
	'status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'version' : {
		'type' : 'string',
		'nullable' : True,
	},
	'version_comment' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'delta_rev' : {
		'type' : 'string',
		'nullable' : True,
	},
	'delta_rev_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'delta_rev_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'delta_rev_file' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'list_of_id_site' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'boq_tech_sites_all',
				'field': '_id',
				'embeddable': True
			},
		},
	},
	'list_of_id_boq_comm' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'boq_comm_all',
				'field': '_id',
				'embeddable': True
			},
		},
	},
	'opportunity_id' : {
		'type' : 'string',
        'nullable' : True
	},
	'note_name_1' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_1' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_name_2' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_2' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_name_3' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_3' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_name_4' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_4' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_name_5' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_5' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_name_6' : {
		'type' : 'string',
		'nullable' : True
 	},
	'note_6' : {
		'type' : 'string',
		'nullable' : True
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