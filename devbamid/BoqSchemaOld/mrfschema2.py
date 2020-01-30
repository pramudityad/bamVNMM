from datetime import datetime
mrfschema2 = {
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
		'type' : 'integer',
		'required' : True,
	},
    'current_status' : {
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
                        'type' : 'string',
                        'nullable' : True
                    },
                    'delivery_build' : {
                        'type' : 'string',
                        'required' : True
                    },
                    'implementation_bom_baseline' : {
                        'type' : 'integer',
                        'required' : True
                    }
                }
            },
        }
	},
	'parent_list' : {
		'type' : 'dict',
		'required' : True,
        # 'allow_unknown': {
        #     'type' : 'dict',
        #     'schema' : {
        #         'id_pp_doc' : {
        #             'type' : 'objectid'
        #         },
        #         'denomination' : {
        #             'type' : 'string',
        #             'nullable' : True
        #         },
        #         'ps_parent_ai' : {
        #             'type' : 'integer',
        #             'nullable' : True
        #         },
        #         'ps_parent_id' : {
        #             'type' : 'string',
        #         },
        #         'id_po_doc' : {
        #             'type' : 'objectid',
        #             'nullable' : True,
        #             'default' : None
        #         },
        #         'cpo_id' : {
        #             'type' : 'string',
        #             'nullable' : True
        #         },
        #         'qty' : {
        #             'type' : 'float',
        #             'nullable' : True
        #         },
        #         'qty_lom' : {
        #             'type' : 'float',
        #             'nullable' : True
        #         },
        #         'qty_lom_asp' : {
        #             'type' : 'float',
        #             'nullable' : True
        #         },
        #         'qty_lom_wh' : {
        #             'type' : 'float',
        #             'nullable' : True
        #         },
        #         'qty_scan' : {
        #             'type' : 'float',
        #             'nullable' : True
        #         },
        #         'uom' : {
        #             'type' : 'string',
        #             'nullable' : True
        #         },
        #         'details' : {
        #             'type' : 'dict',
        #             'allow_unknown': {
        #                 'type' : 'dict',
        #                 'schema' : {
        #                     'id_mc_doc' : {
        #                         'type' : 'objectid',
        #                     },
        #                     'product_description' : {
        #                         'type' : 'string',
        #                         'nullable' : True
        #                     },
        #                     'ps_detail_ai' : {
        #                         'type' : 'integer',
        #                         'nullable' : True
        #                     },
        #                     'ps_detail_id' : {
        #                         'type' : 'string',
        #                     },
        #                     'ps_parent_id' : {
        #                         'type' : 'string',
        #                         'nullable' : True
        #                     },
        #                     'qty' : {
        #                         'type' : 'float',
        #                         'nullable' : True
        #                     },
        #                     'qty_lom' : {
        #                         'type' : 'float',
        #                         'nullable' : True
        #                     },
        #                     'qty_lom_asp' : {
        #                         'type' : 'float',
        #                         'nullable' : True
        #                     },
        #                     'qty_lom_wh' : {
        #                         'type' : 'float',
        #                         'nullable' : True
        #                     },
        #                     'qty_scan' : {
        #                         'type' : 'float',
        #                         'nullable' : True
        #                     },
        #                     'uom' : {
        #                         'type' : 'string',
        #                         'nullable' : True
        #                     },
        #                     'milestones' : {
        #                         'type' : 'dict',
        #                         'allow_unknown' : {
        #                             'type' : 'dict',
        #                             'schema' : {
        #                                 'milestone_name' : {
        #                                     'type' : 'string',
        #                                 },
        #                                 'ms_updated_by' : {
        #                                     'type' : 'string',
        #                                     'nullable' : True
        #                                 },
        #                                 'ms_updated_date' : {
        #                                     'type' : 'string',
        #                                     'nullable' : True
        #                                 },
        #                                 'ms_details' : {
        #                                     'type' : 'dict',
        #                                     'schema' : {
        #                                         'passive_material' : {
        #                                             'type' : 'dict',
        #                                             'required' : True,
        #                                             'schema': {
        #                                                 'status' : {
        #                                                     'type' : 'boolean',
        #                                                     'nullable' : True
        #                                                 },
        #                                                 'qty_ok' : {
        #                                                     'type' : 'float',
        #                                                     'nullable' : True
        #                                                 },   
        #                                             }
        #                                         },
        #                                         'active_material' : {
        #                                             'type' : 'dict',
        #                                             'required' : True,
        #                                             'schema': {
        #                                                 'status' : {
        #                                                     'type' : 'boolean',
        #                                                     'nullable' : True
        #                                                 },
        #                                                 'qty_ok' : {
        #                                                     'type' : 'float',
        #                                                     'nullable' : True
        #                                                 },
        #                                                 'serial_number_list' : {
        #                                                     'type' : 'list',
        #                                                     'nullable' : True,
        #                                                     'default' : None,
        #                                                     'schema' : {
        #                                                         'type' : 'dict',
        #                                                         'nullable' : True,
        #                                                         'schema' : {
        #                                                             'serial_number' : {
        #                                                                 'type' : 'string',
        #                                                                 'nullable' : True
        #                                                             },
        #                                                             'status' : {
        #                                                                 'type' : 'string',
        #                                                                 'nullable' : True
        #                                                             }          
        #                                                         }
        #                                                     }
        #                                                 }   
        #                                             }
        #                                         }
        #                                     }
        #                                 }
        #                             }
        #                         }
        #                     }
        #                 }
        #             }
        #         }
        #     }
        # },
        'schema' : {
            'type' : 'dict',
            'schema' : {
                'id_pp_doc' : {
                    'type' : 'objectid',
                    'required' : True
                },
                'denomination' : {
                    'type' : 'string',
                    'nullable' : True
                },
                'ps_parent_ai' : {
                    'type' : 'integer',
                    'nullable' : True
                },
                'ps_parent_id' : {
                    'type' : 'string',
                    'required' : True,
                },
                'id_po_doc' : {
                    'type' : 'objectid',
                    'nullable' : True,
                    'default' : None
                },
                'cpo_id' : {
                    'type' : 'string',
                    'nullable' : True
                },
                'qty' : {
                    'type' : 'float',
                    'nullable' : True
                },
                'qty_lom' : {
                    'type' : 'float',
                    'nullable' : True
                },
                'qty_lom_asp' : {
                    'type' : 'float',
                    'nullable' : True
                },
                'qty_lom_wh' : {
                    'type' : 'float',
                    'nullable' : True
                },
                'qty_scan' : {
                    'type' : 'float',
                    'nullable' : True
                },
                'uom' : {
                    'type' : 'string',
                    'nullable' : True
                },
                'details' : {
                    'type' : 'dict',
                    'required' : True,
                #     'allow_unknown': {
                #         'type' : 'dict',
                #         'schema' : {
                #             'id_mc_doc' : {
                #                 'type' : 'objectid',
                #             },
                #             'product_description' : {
                #                 'type' : 'string',
                #                 'nullable' : True
                #             },
                #             'ps_detail_ai' : {
                #                 'type' : 'integer',
                #                 'nullable' : True
                #             },
                #             'ps_detail_id' : {
                #                 'type' : 'string',
                #             },
                #             'ps_parent_id' : {
                #                 'type' : 'string',
                #                 'nullable' : True
                #             },
                #             'qty' : {
                #                 'type' : 'float',
                #                 'nullable' : True
                #             },
                #             'qty_lom' : {
                #                 'type' : 'float',
                #                 'nullable' : True
                #             },
                #             'qty_lom_asp' : {
                #                 'type' : 'float',
                #                 'nullable' : True
                #             },
                #             'qty_lom_wh' : {
                #                 'type' : 'float',
                #                 'nullable' : True
                #             },
                #             'qty_scan' : {
                #                 'type' : 'float',
                #                 'nullable' : True
                #             },
                #             'uom' : {
                #                 'type' : 'string',
                #                 'nullable' : True
                #             },
                #             'milestones' : {
                #                 'type' : 'dict',
                #                 'allow_unknown' : {
                #                     'type' : 'dict',
                #                     'schema' : {
                #                         'milestone_name' : {
                #                             'type' : 'string',
                #                         },
                #                         'ms_updated_by' : {
                #                             'type' : 'string',
                #                             'nullable' : True
                #                         },
                #                         'ms_updated_date' : {
                #                             'type' : 'string',
                #                             'nullable' : True
                #                         },
                #                         'ms_details' : {
                #                             'type' : 'dict',
                #                             'schema' : {
                #                                 'passive_material' : {
                #                                     'type' : 'dict',
                #                                     'required' : True,
                #                                     'schema': {
                #                                         'status' : {
                #                                             'type' : 'boolean',
                #                                             'nullable' : True
                #                                         },
                #                                         'qty_ok' : {
                #                                             'type' : 'float',
                #                                             'nullable' : True
                #                                         },   
                #                                     }
                #                                 },
                #                                 'active_material' : {
                #                                     'type' : 'dict',
                #                                     'required' : True,
                #                                     'schema': {
                #                                         'status' : {
                #                                             'type' : 'boolean',
                #                                             'nullable' : True
                #                                         },
                #                                         'qty_ok' : {
                #                                             'type' : 'float',
                #                                             'nullable' : True
                #                                         },
                #                                         'serial_number_list' : {
                #                                             'type' : 'list',
                #                                             'nullable' : True,
                #                                             'default' : None,
                #                                             'schema' : {
                #                                                 'type' : 'dict',
                #                                                 'nullable' : True,
                #                                                 'schema' : {
                #                                                     'serial_number' : {
                #                                                         'type' : 'string',
                #                                                         'nullable' : True
                #                                                     },
                #                                                     'status' : {
                #                                                         'type' : 'string',
                #                                                         'nullable' : True
                #                                                     }          
                #                                                 }
                #                                             }
                #                                         }   
                #                                     }
                #                                 }
                #                             }
                #                         }
                #                     }
                #                 }
                #             }
                #         }
                # },
                'schema' : {
                        'type' : 'dict',
                        'schema' : {
                            'id_mc_doc' : {
                                'type' : 'objectid',
                                'required' : True,
                            },
                            'product_description' : {
                                'type' : 'string',
                                'nullable' : True
                            },
                            'ps_detail_ai' : {
                                'type' : 'integer',
                                'nullable' : True
                            },
                            'ps_detail_id' : {
                                'type' : 'string',
                                'required' : True,
                            },
                            'ps_parent_id' : {
                                'type' : 'string',
                                'nullable' : True
                            },
                            'qty' : {
                                'type' : 'float',
                                'nullable' : True
                            },
                            'qty_lom' : {
                                'type' : 'float',
                                'nullable' : True
                            },
                            'qty_lom_asp' : {
                                'type' : 'float',
                                'nullable' : True
                            },
                            'qty_lom_wh' : {
                                'type' : 'float',
                                'nullable' : True
                            },
                            'qty_scan' : {
                                'type' : 'float',
                                'nullable' : True
                            },
                            'uom' : {
                                'type' : 'string',
                                'nullable' : True
                            },
                            'milestones' : {
                                'type' : 'dict',
                                'required' : True,
                                # 'allow_unknown' : {
                                #     'type' : 'dict',
                                #     'schema' : {
                                #         'milestone_name' : {
                                #             'type' : 'string',
                                #         },
                                #         'ms_updated_by' : {
                                #             'type' : 'string',
                                #             'nullable' : True
                                #         },
                                #         'ms_updated_date' : {
                                #             'type' : 'string',
                                #             'nullable' : True
                                #         },
                                #         'ms_details' : {
                                #             'type' : 'dict',
                                #             'schema' : {
                                #                 'passive_material' : {
                                #                     'type' : 'dict',
                                #                     'required' : True,
                                #                     'schema': {
                                #                         'status' : {
                                #                             'type' : 'boolean',
                                #                             'nullable' : True
                                #                         },
                                #                         'qty_ok' : {
                                #                             'type' : 'float',
                                #                             'nullable' : True
                                #                         },   
                                #                     }
                                #                 },
                                #                 'active_material' : {
                                #                     'type' : 'dict',
                                #                     'required' : True,
                                #                     'schema': {
                                #                         'status' : {
                                #                             'type' : 'boolean',
                                #                             'nullable' : True
                                #                         },
                                #                         'qty_ok' : {
                                #                             'type' : 'float',
                                #                             'nullable' : True
                                #                         },
                                #                         'serial_number_list' : {
                                #                             'type' : 'list',
                                #                             'nullable' : True,
                                #                             'default' : None,
                                #                             'schema' : {
                                #                                 'type' : 'dict',
                                #                                 'nullable' : True,
                                #                                 'schema' : {
                                #                                     'serial_number' : {
                                #                                         'type' : 'string',
                                #                                         'nullable' : True
                                #                                     },
                                #                                     'status' : {
                                #                                         'type' : 'string',
                                #                                         'nullable' : True
                                #                                     }          
                                #                                 }
                                #                             }
                                #                         }   
                                #                     }
                                #                 }
                                #             }
                                #         }
                                #     }
                                # },
                                'schema' : {
                                    'type' : 'dict',
                                    'schema' : {
                                        'milestone_name' : {
                                            'type' : 'string',
                                            'required' : True
                                        },
                                        'ms_updated_by' : {
                                            'type' : 'string',
                                            'nullable' : True
                                        },
                                        'ms_updated_date' : {
                                            'type' : 'string',
                                            'nullable' : True
                                        },
                                        'ms_details' : {
                                            'type' : 'dict',
                                            'required' : True,
                                            'schema' : {
                                                'passive_material' : {
                                                    'type' : 'dict',
                                                    'required' : True,
                                                    'schema': {
                                                        'status' : {
                                                            'type' : 'boolean',
                                                            'nullable' : True
                                                        },
                                                        'qty_ok' : {
                                                            'type' : 'float',
                                                            'nullable' : True
                                                        },   
                                                    }
                                                },
                                                'active_material' : {
                                                    'type' : 'dict',
                                                    'required' : True,
                                                    'schema': {
                                                        'status' : {
                                                            'type' : 'boolean',
                                                            'nullable' : True
                                                        },
                                                        'qty_ok' : {
                                                            'type' : 'float',
                                                            'nullable' : True
                                                        },
                                                        'serial_number_list' : {
                                                            'type' : 'list',
                                                            'nullable' : True,
                                                            'default' : None,
                                                            'schema' : {
                                                                'type' : 'dict',
                                                                'nullable' : True,
                                                                'schema' : {
                                                                    'serial_number' : {
                                                                        'type' : 'string',
                                                                        'nullable' : True
                                                                    },
                                                                    'status' : {
                                                                        'type' : 'string',
                                                                        'nullable' : True
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