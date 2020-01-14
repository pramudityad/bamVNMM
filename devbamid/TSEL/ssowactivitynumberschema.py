ssowactivitynumberschema = {
    'activity_number' : {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'area' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'price' : {
        'type': 'float',
        'required': True,
        'nullable': True,
        'default': 0
    },
    'coefficient' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
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