revmaterialcatalogueschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
	'material_id' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'id_pp_doc' : {
		'type' : 'objectid',
		'required' : True,
        'nullable' : False
	},
	'pp_id' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'material_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'material_unit' : {
		'type' : 'string',
		'nullable' : True,
	},
	'material_qty' : {
		'type' : 'float',
		'nullable' : True,
	},
	'material_price' : {
		'type' : 'float',
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