userpoolschema = {
    'id_user_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'username' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': True
    },
    'first_name' : {
        'type': 'string',
        'required': False,
        'nullable': True,
    },
    'last_name' : {
        'type': 'string',
        'required': False,
        'nullable': True,
    },
    'email' : {
        'type': 'string',
        'required': True,
        'nullable': False,
        'unique': True
    },
    'password' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'cas_id' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'is_active' : {
        'type': 'boolean',
        'required': False,
        'nullable': False,
        'default': True
    },
    'accounts' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'schema': {
            'type': 'string'
        }
    },
    'tokens' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'unique': False,
        'schema': {
            'type': 'dict',
            'schema': {
                'token': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                }
            }
        }
    },
    'roles' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'unique': False,
        'schema': {
            'type': 'string'
        }
    },
    'app_privilege' : {
        'type': 'list',
        'required': True,
        'nullable': False,
        'unique': False,
        'schema': {
            'type': 'string'
        }
    },
    'created_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    },
    'updated_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True
    }
}