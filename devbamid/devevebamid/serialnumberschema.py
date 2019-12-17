serialnumberschema = {
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
    'mr_pp_id' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'pp_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'mr_mc_id' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'material_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'status' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'serial_number' : {
        'type': 'list',
        'required': True,
        'nullable': False,
        'unique': False,
        'schema': {
            'type': 'dict',
            'schema': {
                'flag_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'serial_number': {
                    'type': 'datetime',
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
    'deleted' : {
        'type': 'integer',
        'required': False,
        'nullable': False,
        'unique': False,
        'default': 0
    },
    'created_on' : {
        'type': 'datetime',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'created_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'updated_on' : {
        'type': 'datetime',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'updated_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'unique': False
    }
}