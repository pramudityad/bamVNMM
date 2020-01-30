implementationbomschema = {
    'id_cd_doc' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : True,
	},
	'cd_id' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
    'id_site_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
    'site_id' : {
		'type' : 'string',
		'required' : True,
	},
    'site_name' : {
		'type' : 'string',
		'required' : True,
	},
    'id_project_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
    'project_name' : {
		'type' : 'string',
		'required' : True,
	},
    'implementation_id' : {
        'type' : 'string',
        'required' : True
    },
    'status' : {
        'type' : 'string',
        'required' : True
    },
    'scopes' : {
        'type' : 'list',
        'required' : True,
        'schema': {
            'type': 'string',
        }
    },
    'endstate' : {
        'type' : 'boolean',
        'required' : True
    },
    'tech_boq_ids' : {
		'type' : 'list',
		'required' : True,
        'schema': {
            'type': 'string',
        }
	},
    'counter_mr' : {
		'type' : 'integer',
		'required' : True,
	},
    'tssr_id' : {
		'type' : 'string',
		'required' : True,
	},
    'material' : {
		'type' : 'list',
		'required' : True,
        'schema': {
            'type': 'dict',
            'schema': {
                'id_pp_doc' : {
                    'type' : 'objectid',
                    'required' : True
                },
                'id_po_doc' : {
                    'type' : 'objectid',
                    'nullable' : True,
                    'required' : True
                },
                'po_number' : {
                    'type' : 'string',
                    'nullable' : True,
                    'required' : True
                },
                'pp_id' : {
                    'type' : 'string',
                    'required' : True,
                },
                'product_name' : {
                    'type' : 'string',
                    'required' : True
                },
                'qty_bom_tssr' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_implementation' : {
                    'type' : 'float',
                    'required' : True
                },
                'material_type' : {
                    'type' : 'string',
                    'nullable' : True,
                    'allowed' : ['passive_material', 'active_material']
                },
                'material_content' : {
                    'type' : 'list',
                    'required' : True,
                    'schema': {
                        'type': 'dict',
                        'schema': {
                            'id_mc_doc' : {
                                'type' : 'objectid',
                                'required' : True
                            },
                            'material_id' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'product_code' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'description' : {
                                'type' : 'string',
                                'required' : True,
                            },
                            'unit' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'qty_in_profile' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'qty_child_bom_tssr' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'qty_child_implementation' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'soh_insufficient' : {
                                'type' : 'boolean',
                                'required' : True,
                                'nullable' : True
                            },
                        }
                    }
                }
            }
        }
	},
    'deleted' : {
		'type' : 'integer',
		'default' : 0,
	}
}