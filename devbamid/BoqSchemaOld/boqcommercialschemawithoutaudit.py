boqcommercialschemawithoutaudit = {
	'no_boq_comm' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'id_boq_tech_doc' : {
		'type' : 'objectid',
        'required' : True,
	},
	'no_boq_tech' : {
		'type' : 'string',
        'required' : True,
	},
	'version_boq_tech' : {
		'type' : 'string',
        'required' : True,
	},
	'id_project_doc' : {
		'type' : 'objectid',
        'nullable' : True
	},
	'project_name' : {
		'type' : 'string',
        'nullable' : True
	},
	'scenario' : {
		'type' : 'string',
        'nullable' : True
	},
	'early_start' : {
		'type' : 'boolean',
        'nullable' : True
	},
	'version' : {
		'type' : 'string',
		'nullable' : True,
	},
	'version_comment' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev1' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev2' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev3' : {
		'type' : 'string',
		'nullable' : True,
	},
	'clarified' : {
		'type' : 'string',
		'nullable' : True,
	},
	'submitted' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev1_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev2_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev3_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'clarified_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'submitted_by' : {
		'type' : 'string',
		'nullable' : True,
	},
	'rev1_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rev2_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rev3_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'clarified_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'submitted_date' : {
		'type' : 'datetime',
		'nullable' : True,
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
	'list_of_id_item_group' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'boq_comm_items_group_all',
				'field': '_id',
				'embeddable': True
			},
		},
	},
	'id_po_doc' : {
		'type' : 'objectid',
        'nullable' : True
	},
	'po_number' : {
		'type' : 'string',
        'nullable' : True
	},
	'po_status' : {
		'type' : 'string',
        'nullable' : True
	},
	'po_by' : {
		'type' : 'string',
        'nullable' : True
	},
	'po_date' : {
		'type' : 'datetime',
        'nullable' : True
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