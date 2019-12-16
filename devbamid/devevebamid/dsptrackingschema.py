dsptrackingschema = {
    'id_mr_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
        'unique': True
    },
    'mr_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': True
    },
    'dsp_information' : {
        'type': 'dict',
        'required': True,
        'nullable': False,
        'unique': False,
        'schema': {
            'dsp_name': {
                'type': 'string',
                'required': True,
                'nullable': False
            },
            'dsp_phone': {
                'type': 'string',
                'required': True,
                'nullable': False
            },
            'dsp_email': {
                'type': 'string',
                'required': True,
                'nullable': True
            },
            'dsp_truck': {
                'type': 'string',
                'required': True,
                'nullable': False
            }
        }
    },
    'origin_location' : {
        'type': 'dict',
        'required': True,
        'nullable': False,
        'unique': False,
        'schema': {
            'latitude': {
                'type': 'float',
                'required': True,
                'nullable': False
            },
            'longitude': {
                'type': 'float',
                'required': True,
                'nullable': False
            }
        }
    },
    'distance' : {
        'type': 'float',
        'required': True,
        'nullable': False,
        'unique': False
    },
    'updated_location' : {
        'type': 'dict',
        'required': True,
        'nullable': False,
        'unique': False,
        'schema': {
            'latitude': {
                'type': 'float',
                'required': True,
                'nullable': False
            },
            'longitude': {
                'type': 'float',
                'required': True,
                'nullable': False
            }
        }
    },
    'latest_location' : {
        'type': 'dict',
        'required': True,
        'nullable': True,
        'unique': False,
        'schema': {
            'latitude': {
                'type': 'float',
                'required': True,
                'nullable': False
            },
            'longitude': {
                'type': 'float',
                'required': True,
                'nullable': False
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
        'nullable': True
    },
    'created_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True
    },
    'updated_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True
    },
    'updated_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True
    }
}