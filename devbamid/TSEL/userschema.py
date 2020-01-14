userschema = {
    'first_name' : {
        'type' : 'string',
        'required' : True
    },
    'last_name' : {
        'type' : 'string',
        'required' : True
    },
    'username' : {
        'type' : 'string',
        'required' : True
    },
    'password' : {
        'type' : 'string',
        'required' : True
    },
    'active' : {
        'type' : 'boolean',
        'required' : True
    },
    'email' : {
        'type' : 'string',
        'required' : True
    },
    'roles' : {
        'type' : 'list',
        'required' : True,
        'schema' : {
            'type' : 'objectid',
            'data_relation':{
				'resource' : 'roles_all',
				'field': '_id',
				'embeddable': True
			},
        }
    },
}