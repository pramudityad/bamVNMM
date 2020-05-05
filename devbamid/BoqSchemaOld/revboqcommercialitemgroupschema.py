revboqcommercialitemgroupschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
	'id_boq_comm_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
	'no_boq_comm' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False
	},
	'pp_group' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False
	},
	'product_type' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False
	},
	'phy_group' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False
	},
	'unit' : {
		'type' : 'string',
		'nullable' : True
	},
	'qty_early_start' : {
		'type' : 'float',
		'nullable' : True,
	},
	'qty_tech' : {
		'type' : 'float',
		'nullable' : True,
	},
	'qty_ericsson' : {
		'type' : 'float',
		'nullable' : True,
	},
	'qty_comm_quotation' : {
		'type' : 'float',
		'nullable' : True,
	},
	'qty_po' : {
		'type' : 'float',
		'nullable' : True,
	},
	'smart_stock': {
		'type' : 'float',
		'nullable' : True,
	},
	'unit_price' : {
		'type' : 'float',
		'nullable' : True,
	},
	'total_price' : {
		'type' : 'float',
		'nullable' : True,
	},
	'rate_year' : {
		'type' : 'string',
		'nullable' : True,
	},
	'currency' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_order_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'list_of_id_pp' : {
		'type' : 'list',
		'nullable' : True,
		'schema': {
			'type': 'objectid',
			'data_relation':{
				'resource' : 'pp_sorted',
				'field': '_id',
				'embeddable': True
			},
		},
	},
	'version' : {
		'type' : 'string',
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