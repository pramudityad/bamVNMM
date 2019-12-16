mrproductpackageschema = {
    'id_mr_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
    },
    'mr_id' : {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'id_pp_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'pp_id' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'id_site_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'site_id' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'product_name' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'product_type' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'physical_group' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'uom' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'qty' : {
        'type': 'float',
        'required': True,
        'nullable': False,
    },
    'qty_scan' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'id_po_doc' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'po_number' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'add_photo' : {
        'type': 'boolean',
        'required': False,
        'default': False
    },
    'deleted' : {
        'type': 'integer',
        'required': False,
        'default': 0
    },
    'created_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    },
    'created_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
    },
    'updated_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    },
    'updated_by' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,       
    }
}