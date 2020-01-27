tssrversionschema = {
    'id_document' : {
        'type': 'objectid',
        'required': True,
        'nullable': False
    },
    'no_tssr_boq' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_boq_tech_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'no_boq_tech' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'id_project_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'project_name' : {
        'type': 'string',
        'required': True,
        'nullable': True
    },
    'current_status' : {
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
    'tssr_status' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'schema': {
            'type': 'dict',
            'schema': {
                'status_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'status_value': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'status_date': {
                    'type': 'datetime',
                    'required': True,
                    'nullable': False
                },
                'status_updater': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'status_updater_id': {
                    'type': 'objectid',
                    'required': False,
                    'nullable': True
                }
            }
        }
    },
    'notes' : {
        'type': 'list',
        'required': False,
        'nullable': True,
        'schema': {
            'type': 'dict',
            'schema': {
                'note_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'note_value': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'note_date': {
                    'type': 'datetime',
                    'required': True,
                    'nullable': False
                },
                'note_updater': {
                    'type': 'string',
                    'required': True,
                    'nullable': False
                },
                'note_updater_id': {
                    'type': 'objectid',
                    'required': False,
                    'nullable': True
                }
            }
        }
    },
    'opportunity_id' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
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