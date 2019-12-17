mrmaterialdetailschema = {
    'id_mr_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'mr_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'id_mr_pp_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'id_pp_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'pp_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'id_site_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'site_id' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'id_mc_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'material_id' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'material_name' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'material_type' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'uom' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'qty' : {
        'type': 'float',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'priority' : {
        'type': 'integer',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'qty_scan' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': None
    },
    'id_po_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'po_number' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'add_photo' : {
        'type': 'boolean',
        'required': False,
        'nullable': True,
        'unique': False,
        'default': False
    },
    'serial_numbers': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'unique': False,
        'schema': {
            'type': 'dict',
            'schema': {
                'flag_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'list_of_sn': {
                    'type': 'list',
                    'required': True,
                    'nullable': False,
                    'schema': {
                        'type': 'dict',
                        'schema': {
                            'value': {
                                'type': 'string',
                                'required': True,
                                'nullable': False
                            },
                            'status': {
                                'type': 'string',
                                'required': True,
                                'nullable': False
                            },
                            'created_by': {
                                'type': 'string',
                                'required': True,
                                'nullable': False
                            },
                            'created_date': {
                                'type': 'datetime',
                                'required': True,
                                'nullable': False
                            }
                        }
                    }
                },
                'created_by': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'created_date': {
                    'type': 'datetime',
                    'required': True,
                    'nullable': False
                }
            }
        }
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
        'nullable': True,
    },
    'updated_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
    }
}