from mrschema import mrschema
from mrproductpackageschema import mrproductpackageschema
from mrmaterialdetailschema import mrmaterialdetailschema
from serialnumberschema import serialnumberschema
from dsptrackingschema import dsptrackingschema
from handoverschema import handoverschema
from userpoolschema import userpoolschema
from tssrschema import tssrschema
from tssrsitesschema import tssrsitesschema
from tssrsiteitemsschema import tssrsiteitemsschema


# Mongo Config
MONGO_HOST = '10.0.0.11'
MONGO_PORT = 27017

MONGO_USERNAME = 'adminbamiddev'
MONGO_PASSWORD = 'Mrq2zNgIIou9'
MONGO_DBNAME = 'devidbamdb'

# Other Config
URL_PREFIX = 'bamidapi'

ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']

RETURN_MEDIA_AS_BASE64_STRING = False

RETURN_MEDIA_AS_URL = True

EXTENDED_MEDIA_INFO = ['content_type', 'name', 'length']

MEDIA_ENDPOINT = 'datafiles'

DATE_CREATED = 'created_on'

LAST_UPDATED = 'updated_on'

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

PAGINATION_DEFAULT = 25

PAGINATION_LIMIT = 100

MONGO_QUERY_BLACKLIST = ['$where']

OPLOG = True

OPLOG_AUDIT = True

PAGINATION = True

X_HEADERS = ['Content-Type', 'If-Match', 'Authorization']

X_DOMAINS = ['http://localhost:3000', 'http://52.230.4.218:5003', 'http://localhost:3010', 'https://ops.e-dpm.com', 'https://test.ops.e-dpm.com', 'https://dev.bam-id.e-dpm.com']

ALLOWED_ROLES = ['Admin', 'BAM-Admin']

ALLOWED_READ_ROLES = ['Admin', 'BAM-Admin']

ALLOWED_WRITE_ROLES = ['Admin', 'BAM-Admin']

ALLOWED_ITEM_ROLES = ['Admin', 'BAM-Admin']

ALLOWED_ITEM_READ_ROLES = ['Admin', 'BAM-Admin']

ALLOWED_ITEM_WRITE_ROLES = ['Admin', 'BAM-Admin']

mr_op = {    
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_data',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : mrschema
}

mr_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_data',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : mrschema
}

mr_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_data',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : mrschema,
}

mr_md_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_material_detail',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : mrmaterialdetailschema
}

mr_md_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_material_detail',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : mrmaterialdetailschema
}

mr_md_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_material_detail',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : mrmaterialdetailschema
}

mr_pp_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_product_package',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : mrproductpackageschema
}

mr_pp_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_product_package',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : mrproductpackageschema
}

mr_pp_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_product_package',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : mrproductpackageschema
}

serial_number_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_serial_number',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : serialnumberschema
}

dsp_tracking_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'dsp_tracking',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : dsptrackingschema
}

dsp_tracking_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'dsp_tracking',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : dsptrackingschema
}

dsp_tracking_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'dsp_tracking',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : dsptrackingschema
}

handover_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_handover',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : handoverschema
}

handover_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_handover',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : handoverschema
}

handover_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mr_handover',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : handoverschema
}

user_pool_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'user_pool',
        'filter' : {
            'is_active' : True,
            'roles' : {"$not" : { "$in" : ['BAM-API', 'IXT-API']}}
        },
        'projection' : {
            'password' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['IXT-API'],
    'allowed_write_roles' : ['IXT-API'],
    'allowed_item_read_roles' : ['IXT-API'],
    'allowed_item_write_roles' : ['IXT-API'],

	'versioning' : False,
    'schema' : userpoolschema
}

user_pool_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'user_pool',
        'filter' : {
            'is_active' : True,
            'roles' : {"$not" : { "$in" : ['BAM-API', 'IXT-API']}}
        },
        'projection' : {
            'password' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['IXT-API'],
    'allowed_write_roles' : ['IXT-API'],
    'allowed_item_read_roles' : ['IXT-API'],
    'allowed_item_write_roles' : ['IXT-API'],

	'versioning' : False,
    'schema' : userpoolschema
}

user_pool_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'user_pool',
        'filter' : {
            'is_active' : True,
            'roles' : {"$not" : { "$in" : ['BAM-API', 'IXT-API']}}
        },
        'projection' : {
            'password' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['IXT-API'],
    'allowed_write_roles' : ['IXT-API'],
    'allowed_item_read_roles' : ['IXT-API'],
    'allowed_item_write_roles' : ['IXT-API'],

    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : userpoolschema
}

tssr_op = {    
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_data',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : tssrschema
}

tssr_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_data',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : tssrschema
}

tssr_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_data',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : tssrschema,
}

tssr_sites_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_sites',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : tssrsitesschema
}

tssr_sites_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_sites',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : tssrsitesschema
}

tssr_sites_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_sites',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : tssrsitesschema
}

tssr_site_items_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_site_items',
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : tssrsiteitemsschema
}

tssr_site_items_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_site_items',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : tssrsiteitemsschema
}

tssr_site_items_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_site_items',
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)]
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,
    'schema' : tssrsiteitemsschema
}


DOMAIN = {
    'mr_op': mr_op,
    'mr_sorted': mr_sorted,
    'mr_sorted_nonpage': mr_sorted_nonpage,
    'mr_md_op': mr_md_op,
    'mr_md_sorted': mr_md_sorted,
    'mr_md_sorted_nonpage': mr_md_sorted_nonpage,
    'mr_pp_op': mr_pp_op,
    'mr_pp_sorted': mr_pp_sorted,
    'mr_pp_sorted_nonpage': mr_pp_sorted_nonpage,
    'serial_number_op': serial_number_op,
    'dsp_tracking_op': dsp_tracking_op,
    'dsp_tracking_sorted': dsp_tracking_sorted,
    'dsp_tracking_sorted_nonpage': dsp_tracking_sorted_nonpage,
    'handover_op': handover_op,
    'handover_sorted': handover_sorted,
    'handover_sorted_nonpage': handover_sorted_nonpage,
    'user_pool_op': user_pool_op,
    'user_pool_sorted': user_pool_sorted,
    'user_pool_sorted_nonpage': user_pool_sorted_nonpage,
    'tssr_op': tssr_op,
    'tssr_sorted': tssr_sorted,
    'tssr_sorted_nonpage': tssr_sorted_nonpage,
    'tssr_sites_op': tssr_sites_op,
    'tssr_sites_sorted': tssr_sites_sorted,
    'tssr_sites_sorted_nonpage': tssr_sites_sorted_nonpage,
    'tssr_site_items_op': tssr_site_items_op,
    'tssr_site_items_sorted': tssr_site_items_sorted,
    'tssr_site_items_sorted_nonpage': tssr_site_items_sorted_nonpage
}