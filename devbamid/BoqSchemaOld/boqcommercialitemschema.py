boqcommercialitemschema = {
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
	'id_boq_tech_doc' : {
		'type' : 'objectid',
        'required' : True,
	},
	'no_boq_tech' : {
		'type' : 'string',
        'required' : True,
	},
	'id_po_doc' : {
		'type' : 'objectid',
        'nullable' : True
	},
	'po_number' : {
		'type' : 'string',
        'nullable' : True
	},
	'id_pp_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False,
		'data_relation':{
			'resource' : 'pp_all',
			'field': '_id',
			'embeddable': True
		},
	},
	'pp_id' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False
	},
	'pp_key' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True
	},
	'pp_group' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True
	},
	'pp_cust_number' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True
	},
	'package_name' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False
	},
	'phy_group' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
	'product_type' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
	'unit' : {
		'type' : 'string',
		'nullable' : True,
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
	'qty_multiple_po' : {
		'type' : 'list',
		'schema' : {
			'type' : 'dict',
			'schema' : {
				'id_order_doc' : {
					'type' : 'objectid',
					'required' : False,
					'nullable' : True
				},
				'order_id' : {
					'type' : 'string',
					'required' : False,
					'nullable' : True
				},
				'id_po_doc' : {
					'type' : 'objectid',
					'nullable' : True
				},
				'po_number' : {
					'type' : 'string',
					'nullable' : True
				},
				'qty' : {
					'type' : 'float',
					'required' : True,
					'nullable' : True,
				}
			}
		}
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
	'incentive' : {
		'type' : 'float',
		'nullable' : True,
	},
	'net_total' : {
		'type' : 'float',
		'nullable' : True,
	},
	'fas_assignment_id' : {
		'type' : 'string',
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