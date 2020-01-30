orderingschema = {
    'order_id' :{
        'type' : 'string',
		'required' : True,
		'nullable' : False
    },
    'id_project_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
    'id_boq_comm_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
    'list_of_id_item' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'boq_comm_items_all',
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
	},
}