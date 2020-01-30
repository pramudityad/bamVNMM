from datetime import datetime
mrfschema = {
	'mr_id' : {
		'type' : 'string',
		'required' : True,
	},
    'id_cd_doc' : {
		'type' : 'objectid',
		'required' : True,
	},
	'cd_id' : {
		'type' : 'string',
		'required' : True,
	},
	'implementation_bom_baseline' : {
		'type' : 'string',
		'required' : True,
	},
    'tagging' : {
		'type' : 'string',
		'nullable' : True,
	},
    'current_status' : {
		'type' : 'string',
		'nullable' : True,
        'default' : None
	},
    'mrf_status' : {
		'type' : 'string',
		'nullable' : True,
        'default' : None
	},
	'mitt_properties' : {
		'type' : 'dict',
		'nullable' : True,
        'default' : None,
	},
	'ixt_properties' : {
		'type' : 'dict',
		'nullable' : True,
        'default' : None,
	},
    'mr_properties' : {
		'type' : 'dict',
		'required' : True,
        'schema' : {
            'site_info' : {
                'type' : 'dict',
                'required' : True,
                'schema' : {
                    'id_project_doc' : {
                        'type' : 'objectid',
                        'required' : True
                    },
                    'project_name' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'id_site_doc' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'site_id' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'site_name' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'site_address' : {
                        'type' : 'string',
                        'nullable' : True
                    }
                }
            },
            'mr_info' : {
                'type' : 'dict',
                'required' : True,
                'schema' : {
                    'submitted_by' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'target_delivery' : {
                        'type' : 'datetime',
                        'nullable' : True
                    },
                    'delivery_build' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'implementation_bom_baseline' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'origin_mrf' : {
                        'type' : 'string',
                        'required' : True,
                        'nullable' : True
                    }
                }
            },
        }
	},
    'band_carrier_tagging_hw' : {
		'type' : 'list',
		'nullable' : True,
        'schema': {
            'type': 'string',
        }
    },
    'band_carrier_tagging_svc' : {
		'type' : 'list',
		'nullable' : True,
        'schema': {
            'type': 'string',
        }
    },
	'parent_list_hw' : {
		'type' : 'list',
		'required' : True,
        'schema': {
            'type': 'dict',
            'schema': {
                'id_pp_doc' : {
                    'type' : 'objectid',
                    'required' : True
                },
                'pp_id' : {
                    'type' : 'string',
                    'required' : True
                },
                'denomination' : {
                    'type' : 'string',
                    'required' : True
                },
                'product_name' : {
                    'type' : 'string',
                    'required' : True
                },
                'ps_parent_ai' : {
                    'type' : 'integer',
                    'required' : True
                },
                'ps_parent_id' : {
                    'type' : 'string',
                    'required' : True,
                },
                'id_po_doc' : {
                    'type' : 'objectid',
                    'required' : True,
                    'nullable' : True                    
                },
				'cpo_id' : {
                    'type' : 'string',
                    'required' : True,
                    'nullable' : True                    
                },
                'qty' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_lom' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_lom_asp' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_lom_wh' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_scan' : {
                    'type' : 'float',
                    'required' : True
                },
                'uom' : {
                    'type' : 'string',
                    'nullable' : True
                },
                'details' : {
                    'type' : 'list',
                    'required' : True,
                    'schema': {
                        'type': 'dict',
                        'schema': {
                            'id_mc_doc' : {
                                'type' : 'objectid',
                                'required' : True,
                            },
                            'product_description' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'material_id' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'ps_detail_ai' : {
                                'type' : 'integer',
                                'required' : True
                            },
                            'ps_detail_id' : {
                                'type' : 'string',
                                'required' : True,
                            },
                            'ps_parent_id' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'material_type' : {
                                'type' : 'string',
                                'required' : True,
                                'allowed' : ['passive_material', 'active_material']
                            },
                            'qty' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'qty_lom' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'qty_lom_asp' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'qty_lom_wh' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'qty_scan' : {
                                'type' : 'float',
                                'required' : True
                            },
                            'uom' : {
                                'type' : 'string',
                                'nullable' : True
                            },
                            'milestones' : {
                                'type' : 'list',
                                'nullable' : True,
                                'schema': {
                                    'type': 'dict',
                                    'schema': {
                                        'milestone_id' : {
                                            'type' : 'string',
                                            'required' : True
                                        },
                                        'ms_updated_by' : {
                                            'type' : 'string',
                                            'required' : True
                                        },
                                        'ms_updated_date' : {
                                            'type' : 'datetime',
                                            'required' : True
                                        },
                                        'ms_details' : {
                                            'type' : 'dict',
                                            'required' : True,
                                            'schema' : {
                                                'status' : {
                                                    'type' : 'boolean',
                                                    'required' : True
                                                },
                                                'qty_tot' : {
                                                    'type' : 'float',
                                                    'required' : True
                                                },
                                                'qty_ok' : {
                                                    'type' : 'float',
                                                    'required' : True
                                                },
                                                'qty_faulty' : {
                                                    'type' : 'float',
                                                    'required' : True
                                                },
                                                'qty_missing' : {
                                                    'type' : 'float',
                                                    'required' : True
                                                },
                                                'serial_number_list' : {
                                                    'type' : 'list',
                                                    'nullable' : True,
                                                    'schema' : {
                                                        'type' : 'dict',
                                                        'nullable' : True,
                                                        'schema' : {
                                                            'inserted_by' : {
                                                                'type' : 'string',
                                                                'required' : True
                                                            },
                                                            'inserted_time' : {
                                                                'type' : 'datetime',
                                                                'required' : True
                                                            },
                                                            'status' : {
                                                                'type' : 'string',
                                                                'required' : True
                                                            },
                                                            'ps_id' : {
                                                                'type' : 'integer',
                                                                'required' : True
                                                            },
                                                            'ps_detail_ai' : {
                                                                'type' : 'integer',
                                                                'required' : True
                                                            },
                                                            'ps_parent_ai' : {
                                                                'type' : 'integer',
                                                                'required' : True
                                                            },
                                                            'serial_number' : {
                                                                'type' : 'string',
                                                                'required' : True
                                                            },
                                                            'status' : {
                                                                'type' : 'string',
                                                                'required' : True
                                                            },
                                                            'updated_by' : {
                                                                'type' : 'string',
                                                                'required' : True
                                                            },
                                                            'updated_time' : {
                                                                'type' : 'datetime',
                                                                'required' : True
                                                            },          
                                                        }
                                                    }
                                                }   
                                            }
                                        },
                                        'band_carrier_actual_hw' : {
                                            'type' : 'list',
                                            'nullable' : True,
                                            'schema': {
                                                'type': 'string',
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
	},
    'parent_list_svc' : {
		'type' : 'list',
		'required' : True,
        'schema': {
            'type': 'dict',
            'schema': {
                'id_pp_doc' : {
                    'type' : 'objectid',
                    'required' : True
                },
                'pp_id' : {
                    'type' : 'string',
                    'required' : True
                },
                'denomination' : {
                    'type' : 'string',
                    'required' : True
                },
                'product_name' : {
                    'type' : 'string',
                    'required' : True
                },
                'ps_parent_ai' : {
                    'type' : 'integer',
                    'required' : True
                },
                'ps_parent_id' : {
                    'type' : 'string',
                    'required' : True,
                },
                'ps_id' : {
                    'type' : 'integer',
                    'required' : True
                },
                'id_po_doc' : {
                    'type' : 'objectid',
                    'required' : True,
                    'nullable' : True
                },
				'cpo_id' : {
                    'type' : 'string',
                    'required' : True,
                    'nullable' : True
                },
                'qty' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_lom' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_lom_asp' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_lom_wh' : {
                    'type' : 'float',
                    'required' : True
                },
                'qty_scan' : {
                    'type' : 'float',
                    'required' : True
                },
                'uom' : {
                    'type' : 'string',
                    'nullable' : True
                },
                'milestones' : {
                    'type' : 'list',
                    'nullable' : True,
                    'schema': {
                        'type': 'dict',
                        'schema': {
                            'milestone_id' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'ms_updated_by' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'ms_updated_date' : {
                                'type' : 'datetime',
                                'required' : True
                            },
                            'status' : {
                                'type' : 'string',
                                'required' : True
                            },
                            'band_carrier_actual_svc' : {
                                'type' : 'list',
                                'nullable' : True,
                                'schema': {
                                    'type': 'string',
                                }
                            }
                        }
                    }
                }
            }
        }
	},
    'deleted' : {
		'type' : 'integer',
		'default': 0,
	}    
}