tssrsitesversionschema = {
    'id_document' : {
        'type': 'objectid',
        'required': True,
        'nullable': False
    },
    'no_tssr_boq_site' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'account_id' : {
        'type': 'string',
        'required': True,
        'nullable': True
    },
    'id_tssr_boq_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True
    },
    'no_tssr_boq' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_boq_tech_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True
    },
    'no_boq_tech' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_project_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True
    },
    'project_name' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_site_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True
    },
    'site_id' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'site_name' : {
        'type': 'string',
        'required': True,
    },
    'site_title' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'allowed': ['NE', 'FE']
    },
    'id_cd_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'cd_id' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'version' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': 0
    },
    'deleted' : {
        'type': 'integer',
        'required': False,
        'nullable': False,
        'default': 0
    },
    'created_on' : {
        'type': 'datetime',
        'required': True,
        'nullable': False
    },
    'created_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': False
    },
    'updated_on' : {
        'type': 'datetime',
        'required': True,
        'nullable': False
    },
    'updated_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': False
    }
}