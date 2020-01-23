tssrsiteitemsversionschema = {
    'id_document' : {
        'type': 'objectid',
        'required': True,
        'nullable': False
    },
    'id_tssr_boq_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'default': None
    },
    'id_tssr_boq' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'default': None
    },
    'no_tssr_boq' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_tssr_boq_site_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'default': None
    },
    'id_tssr_boq_site' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'default': None
    },
    'no_tssr_boq_site' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_pp_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
        'default': None
    },
    'pp_id' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'id_po_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'po_number' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'pp_group' : {
        'type': 'string',
        'required': True,
        'nullable': True
    },
    'pp_cust_number' : {
        'type': 'string',
        'required': True,
        'nullable': True
    },
    'product_name' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'physical_group' : {
        'type': 'string',
        'required': True,
        'nullable': True
    },
    'product_type' : {
        'type': 'string',
        'required': True,
        'nullable': False
    },
    'uom' : {
        'type': 'string',
        'required': True,
        'nullable': True
    },
    'qty' : {
        'type': 'float',
        'required': True,
        'nullable': False
    },
    'version' : {
        'type': 'string',
        'required': False,
        'nullable': True
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
        'nullable': False,
        'unique': False
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