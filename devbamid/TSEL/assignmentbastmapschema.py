assignmentbastmapschema = {
    'AssignmentID' : {
		'type': 'objectid',
        'required': True,
        'nullable': False,
        'data_relation': {
			'resource': 'assignment_data_sorted',
			'field': '_id',
			'embeddable': True
		},
	},
    'BastID': {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'data_relation': {
			'resource': 'bast_data_sorted',
			'field': '_id',
			'embeddable': True
		},
    },
    'created_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
}