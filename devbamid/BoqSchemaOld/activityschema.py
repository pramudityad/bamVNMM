activityschema = {
	'activity_id' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_cd_doc' : {
		'type' : 'objectid',
		'nullable' : True,
        'data_relation':{
            'resource' : 'custdel_sorted',
            'field': '_id',
            'embeddable': True
		},
	},
	'cd_id' : {
		'type' : 'string',
		'nullable' : True,
	},
	'ms_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'baseline_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'forecast_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'actual_date' : {
		'type' : 'datetime',
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