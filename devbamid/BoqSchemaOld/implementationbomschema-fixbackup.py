implementationbomschema = {
    'id_cd_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
	'cd_id' : {
		'type' : 'string',
		'required' : True,
	},
    'id_site_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
    'site_id' : {
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
    'implementation_id' : {
		'type' : 'list',
		'required' : True,
        'schema': {
            'type': 'dict',
            'schema': {
                'id' : {
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
            }
        }
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
                'po_number' : {
                    'type' : 'string',
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
                'bom_tssr' : {
                    'type' : 'string',
                    'required' : True
                },
                'implementation_sum' : {
                    'type' : 'string',
                    'required' : True
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
                            'child_bom_tssr' : {
                                'type' : 'string',
                                'required' : True
                            },
                        }
                    }
                },
                'material_request' : {
                    'type' : 'dict',
                    'required' : True,
                    'schema' : {
                        'implementation' : {
                            'type' : 'list',
                            'nullable' : True,
                            'schema': {
                                'type': 'string'
                            }
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