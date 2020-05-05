revboqtechnicalsiteschema = {
	'id_document' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : False
	},
	'id_boq_tech_doc' : {
		'type' : 'objectid',
		'required' : True,
        'nullable' : False
	},
	'no_boq_tech' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'id_project_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'project_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_site_doc' : {
		'type' : 'objectid',
        'nullable' : True
	},
	'site_id' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'site_name' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'status' : {
		'type' : 'string',
		'nullable' : True
	},
	'version' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_allocation_doc' : {
		'type' : 'objectid',
        'nullable' : True
	},
	'tssr_boq_id' : {
		'type' : 'string',
        'nullable' : True
	},
	'list_of_site_items' : {
		'type' : 'list',
		'nullable' : True,
        'schema': {
            'type': 'dict',
            'schema': {
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
                'qty' : {
                    'type' : 'float',
                    'required' : True,
                    'nullable' : False
                },
				'qty_quotation_allocated' : {
                    'type' : 'float',
                    'required' : True,
                    'nullable' : False
                },
				'smart_allocated' : {
                    'type' : 'float',
                    'required' : True,
                    'nullable' : False
                },
				'ericsson_allocated' : {
                    'type' : 'float',
                    'required' : True,
                    'nullable' : False
                },
		'po_allocated' : {
                    'type' : 'float',
                    'required' : False,
                    'nullable' : True
                },
		'po_not_allocated' : {
                    'type' : 'float',
                    'required' : False,
                    'nullable' : True
                },
                'status' : {
                    'type' : 'string',
                    'nullable' : True
                },
                'version' : {
                    'type' : 'string',
                    'nullable' : True,
                },
            }
        }
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