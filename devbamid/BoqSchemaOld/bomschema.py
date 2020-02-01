bom_schema = {
	'No_BOM' : {
		'type' : 'string',
		'required' : True,
		'unique' : True,
	},
	'deleted' : {
		'type' : 'integer',
		'nullable' : True
	},
	'created_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'created_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'cust_created_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'cust_created_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'cust_updated_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'cust_updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'tech_created_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'tech_created_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'tech_updated_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'tech_updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'available_created_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'available_created_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'available_updated_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'available_updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	},    
}