allocationitemschemawithoutaudit = {
    'id_boq_tech_doc' : {
		'type' : 'objectid',
		'required' : True,
        'nullable' : False
	},
    'id_boq_comm_doc' : {
		'type' : 'list',
		'required' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'boq_comm_all',
				'field': '_id',
				'embeddable': True
			},
		}
	},
    'list_of_id_site' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation': {
				'resource' : 'boq_tech_sites_all',
				'field': '_id',
				'embeddable': True
			},
		},
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
	}
}