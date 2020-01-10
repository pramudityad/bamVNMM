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
    }
}