roleschema = {
    'name' : {
        'type' : 'string',
        'required' : True
    },
    'permissions' : {
        'type' : 'list',
        'required' : True,
        'schema' : {
            'type' : 'objectid'
        }
    }
}