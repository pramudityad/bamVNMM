ssowschema = {
    'sow_type' : {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'ssow_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'description' : {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'price' : {
        'type': 'float',
        'required': True,
        'nullable': True,
        'default': 0
    },
    'ssow_type' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'default': None
    },
    'deleted' : {
        'type': 'integer',
        'required': True,
        'nullable': True,
        'default': 0
    },
    'created_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'updated_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'created_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    },
    'updated_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    }
}