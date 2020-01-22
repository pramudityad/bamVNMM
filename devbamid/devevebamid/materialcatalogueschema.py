materialcatalogueschema = {
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
	'material_id' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'material_name' : {
		'type' : 'string',
		'required' : True,
	},
	'material_type' : {
		'type' : 'string',
		'nullable' : True,
        'allowed' : ['passive_material', 'active_material']
	},
	'uom' : {
		'type' : 'string',
		'required' : True,
	},
	'qty' : {
		'type' : 'float',
		'required' : True
	},
	'material_price' : {
		'type' : 'float',
		'default' : 0
	},
	'deleted' : {
		'type' : 'integer',
		'default': 0,
	},
	'created_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'created_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	}
}