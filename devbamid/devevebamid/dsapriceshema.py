dsapriceschema = {
    'dsa_price_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'service_master_number' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'short_text' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False
    },
    'price' : {
        'type': 'float',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'dsp' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'long_text' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'unique': False
    },
    'category' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': False
    },
    'deleted' : {
        'type': 'integer',
        'required': True,
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