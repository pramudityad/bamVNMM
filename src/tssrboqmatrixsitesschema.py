tssrboqmatrixsitesschema = {
	'no_tssr_boq_site' : {
		'type' : 'string',
		'required' : True,
	},
    'id_tssr_boq_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : True
	},
    'no_tssr_boq' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False
	},
	'id_boq_tech_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : True
	},
	'no_boq_tech' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True
	},
	'id_boq_tech_site_doc' : {
		'type' : 'objectid',
		'required' : False,
		'nullable' : True
	},
	'no_boq_tech_site' : {
		'type' : 'string',
		'required' : False,
		'nullable' : True
	},
	'id_project_doc' : {
		'type' : 'objectid',
		'required' : False,
	},
	'project_name' : {
		'type' : 'string',
		'required' : True,
	},
	'id_site_doc' : {
		'type' : 'objectid',
        'required' : True
	},
	'site_id' : {
		'type' : 'string',
		'required' : True,
	},
	'site_name' : {
		'type' : 'string',
		'required' : True,
	},
    	'id_cd_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'cd_id' : {
		'type' : 'string',
		'nullable' : True,
	},
	'list_of_site_items' : {
		'type' : 'list',
		'required' : True,
        'schema': {
            'type': 'dict',
            'schema': {
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
                },
				'pp_cust_number' : {
					'type' : 'string',
					'required' : True,
				},
                'package_name' : {
                    'type' : 'string',
                    'required' : True,
                },
				'phy_group' : {
					'type' : 'string',
					'required' : True,
				},
				'product_type' : {
					'type' : 'string',
					'required' : True,
				},
				'unit' : {
					'type' : 'string',
					'required' : True,
				},
                'qty' : {
                    'type' : 'float',
                    'required' : True,
                },
				'qty_quotation_allocated' : {
                    'type' : 'float',
                    'nullable' : True,
                    'default' : None,
                },
				'smart_allocated' : {
                    'type' : 'float',
                    'nullable' : True,
                    'default' : None,
                },
				'ericsson_allocated' : {
                    'type' : 'float',
                    'nullable' : True,
                    'default' : None,
                }
            }
        }
	},
	'version' : {
		'type' : 'string',
		'nullable' : True,
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
		'nullable' : True,
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True,
	}
}