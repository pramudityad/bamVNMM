mrschema = {
    'mr_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': True
    },
    'implementation_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': True
    },
    'scopes' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'mr_category' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'mr_type' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'id_tssr_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'tssr_id' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'account_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'project_name' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False,
    },
    'id_project_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
    },
    'asp_company' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'dsp_company' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'site_info' : {
        'type' : 'list',
        'required' : False,
        'nullable' : True,
        'schema' : {
            'type' : 'dict',
            'schema' : {
                'id_tssr_boq_site_doc' : {
                    'type': 'objectid',
                    'required': True,
                    'nullable': True,
                },
                'no_tssr_boq_site' : {
                    'type': 'string',
                    'required': True,
                    'nullable': True,
                },
                'tssr_version' : {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'id_site_doc' : {
                    'type': 'objectid',
                    'required': True,
                    'nullable': True,
                },
                'site_id' : {
                    'type': 'string',
                    'required': True,
                    'nullable': False,
                },
                'site_title' : {
                    'type': 'string',
                    'required': True,
                    'nullable': False,
                    'allowed': ['NE', 'FE'],
                },
                'site_name' : {
                    'type': 'string',
                    'required': False,
                    'nullable': True,
                },
                'site_address' : {
                    'type': 'string',
                    'required': False,
                    'nullable': True,
                },
                'site_longitude' : {
                    'type': 'float',
                    'required': False,
                    'nullable': True,
                },
                'site_latitude' : {
                    'type': 'float',
                    'required': False,
                    'nullable': True,
                },
            }
        }
    },
    'id_cd_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'default': None
    },
    'cd_id' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'etd' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'eta' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'requested_eta' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'mr_milestones' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None,
        'schema': {
            'type': 'dict',
            'schema': {
                'ms_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'ms_date': {
                    'type': 'datetime',
                    'required': True,
                    'nullable': True
                },
                'ms_updater': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'ms_updater_id': {
                    'type': 'objectid',
                    'required': True,
                    'nullable': True
                }
            }
        }
    },
    'mr_status' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None,
        'schema': {
            'type': 'dict',
            'schema': {
                'mr_status_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'mr_status_value': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'mr_status_date': {
                    'type': 'datetime',
                    'required': True,
                    'nullable': True
                },
                'mr_status_updater': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'mr_status_updater_id': {
                    'type': 'objectid',
                    'required': True,
                    'nullable': True
                }
            }
        }
    },
    'mr_contacts' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None,
        'schema': {
            'type': 'dict',
            'schema': {
                'mr_contact_title': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'mr_contact_value': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'mr_contact_phone': {
                    'type': 'string',
                    'required': False,
                    'nullable': True
                },
                'mr_contact_email': {
                    'type': 'string',
                    'required': False,
                    'nullable': True
                }
            }
        }
    },
    'current_mr_status' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': 'Implemented'
    },
    'current_milestones' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'material_completion' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'received_time' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'ip_remarks' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'ip_confirmation' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'material_check' : {
        'type': 'dict',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None,
        'schema': {
            'checked_by': {
                'type': 'string',
                'required': True,
                'nullable': False
            },
            'signature': {
                'type': 'media',
                'required': True,
                'nullable': False
            }
        }
    },
    'priority_mr' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'priority_reason' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'deleted' : {
        'type': 'integer',
        'required': False,
        'default': 0
    },
    'created_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    },
    'created_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
    },
    'updated_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True
    },
    'updated_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
    }
}