from bomitemschema import bom_item_schema
from prpogrschema import prpogrschema
from prposchema import prposchema
from grschema import grschema
from bomschema import bom_schema
from custdelschema import custdelschema
from amountdataschema import amount_data_schema
from projectschema import projectschema
from projectschemawithoutaudit import projectschemawithoutaudit
from siteschema import siteschema
from siteschemawithoutaudit import siteschemawithoutaudit
from productpackageschema import productpackageschema
from productpackageschemawithoutaudit import productpackageschemawithoutaudit
from materialcatalogueschema import materialcatalogueschema
from materialcatalogueschemawithoutaudit import materialcatalogueschemawithoutaudit
from boqcommercialitemschema import boqcommercialitemschema
from boqcommercialitemgroupschema import boqcommercialitemgroupschema
from boqcommercialschema import boqcommercialschema
from boqcommercialschemawithoutaudit import boqcommercialschemawithoutaudit
from boqtechnicalsiteschema import boqtechnicalsiteschema
from boqtechnicalschema import boqtechnicalschema
from boqtechnicalschemawithoutaudit import boqtechnicalschemawithoutaudit
from warehouseschema import warehouseschema
from orderingchema import orderingschema
from userschema import userschema
from roleschema import roleschema
from poschema import poschema
from activityschema import activityschema
from flowmenuschema import flowmenuschema
from flowpermissionviewschema import flowpermissionviewschema
from mrfschema import mrfschema
from mrfschema2 import mrfschema2
from infoscopeschema import infoscopeschema
from implementationbomschema import implementationbomschema
from allocationitemschema import allocationitemschema
from allocationitemschemawithoutaudit import allocationitemschemawithoutaudit
from tssrboqmatrixschema import tssrboqmatrixschema
from tssrboqmatrixwithoutauditschema import tssrboqmatrixwithoutauditschema
from tssrboqmatrixsitesschema import tssrboqmatrixsitesschema
from deltaboqtechnicalsitesschema import deltaboqtechnicalsitesschema
from ddlschema import ddlschema

from revisioningdomain import (
    project_rev, site_rev, pp_rev, mc_rev, boq_tech_rev, boq_tech_sites_rev, boq_comm_rev, boq_comm_items_rev, custdel_rev, 
    mc_rev_all, pp_rev_all, boq_tech_rev_all, boq_tech_sites_rev_all, boq_comm_rev_all, boq_comm_items_rev_all, boq_comm_items_group_rev,
    boq_comm_items_group_rev_all, tssr_boq_matrix_rev, tssr_boq_matrix_rev_all, tssr_boq_matrix_sites_rev, tssr_boq_matrix_sites_rev_all 
)

MONGO_HOST = '10.0.0.11'
MONGO_PORT = 27017

# Skip these if your db has no auth. But it really should.
MONGO_USERNAME = 'adminphildev'
MONGO_PASSWORD = 'hFgs0KJvnG2i'

MONGO_DBNAME = 'devphildb'

URL_PREFIX = 'smartapi'

MONGO_QUERY_BLACKLIST = ['$where']

ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']

DATE_CREATED = 'created_on'

LAST_UPDATED = 'updated_on'

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

EXTENDED_MEDIA_INFO = ['content_type', 'name', 'length']

RETURN_MEDIA_AS_URL = True

MEDIA_ENDPOINT = 'datafiles'

OPLOG = True

OPLOG_AUDIT = True

PAGINATION = True

RETURN_MEDIA_AS_BASE64_STRING = False

PAGINATION_DEFAULT = 25

PAGINATION_LIMIT = 100

X_DOMAINS = ['http://localhost:3000', 'http://52.230.4.218:5002', 'http://localhost:3005', 'https://smart.pdb-flow.e-dpm.com', 'https://smart.e-dpm.com', 'https://ops.e-dpm.com', 'https://test.ops.e-dpm.com', 'https://mittapp.com']

X_HEADERS = ['Content-Type', 'If-Match', 'Authorization']

ALLOWED_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_READ_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_WRITE_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_ITEM_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_ITEM_READ_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_ITEM_WRITE_ROLES = ['Admin', 'PDB-Dash']

bom_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'bom_data',
        'projection' : {
            'cust_created_on': 0,
            'cust_created_by': 0,
            'cust_updated_on': 0,
            'cust_updated_by': 0,
            'tech_created_on': 0,
            'tech_created_by': 0,
            'tech_updated_on': 0,
            'tech_updated_by': 0,
            'available_created_on': 0,
            'available_created_by': 0,
            'available_updated_on': 0,
            'available_updated_by': 0,
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
	'versioning' : False,
    'schema' : bom_schema
}

bom_all_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'bom_data',
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['POST', 'GET'],
	'versioning' : False,
    'schema' : bom_schema
}


bom_item_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'bom_item_list'
	},
    'allow_unknown' : True,
    'resource_methods': ['POST', 'GET'],
    'versioning' : False,
    'pagination' : False,
    'schema' : bom_item_schema,
}

amountboqtech = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'boq_tech_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
	'versioning' : False,
    'schema' : amount_data_schema
}

amountboqcomm = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'boq_comm_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
	'versioning' : False,
    'schema' : amount_data_schema
}

amountpp = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'pp_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
    
    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

	'versioning' : False,
	'hateoas' : False,
    'schema' : amount_data_schema
}

amountmc = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'mc_data' : 1
        }
	},

    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

	'versioning' : False,
	'hateoas' : False,
    'schema' : amount_data_schema
}

amountsite = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'site_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
	'versioning' : False,
    'schema' : amount_data_schema
}

amountproject = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'project_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
	'versioning' : False,
    'schema' : amount_data_schema
}

amounttssrboq = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'tssr_boq_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
	'versioning' : False,
    'schema' : amount_data_schema
}

amountordering = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'ordering_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],
	'versioning' : False,
    'schema' : amount_data_schema
}

boq_comm_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialschemawithoutaudit,
}

boq_comm_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialschema,
}

boq_comm_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
	'hateoas' : False,

    'schema' : boqcommercialschema,
}

boq_comm_audit = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial',
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning' : False,
	'hateoas' : False,

    'schema' : boqcommercialschema,
}

boq_comm_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'pagination' : False,
	'hateoas' : False,

    'schema' : boqcommercialschema,
}

boq_comm_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialschema,
}

boq_comm_items_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialitemschema,
}

boq_comm_items_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
	'hateoas' : False,

    'schema' : boqcommercialitemschema,
}

boq_comm_items_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialitemschema,
}

boq_comm_items_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
    'schema' : boqcommercialitemschema,
}

boq_comm_items_group_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_group',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialitemgroupschema,
}

boq_comm_items_group_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_group',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
	'hateoas' : False,

    'schema' : boqcommercialitemgroupschema,
}

boq_comm_items_group_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_group',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqcommercialitemgroupschema,
}

boq_comm_items_group_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_group',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
    'schema' : boqcommercialitemgroupschema,
}

boq_tech_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqtechnicalschemawithoutaudit,
}

boq_tech_allin = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'schema' : boqtechnicalschema,
}

boq_tech_find_item_comm = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    
    'datasource' : {
		'source' : 'boq_technical',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'aggregation': {
            'pipeline': [
                {
                    '$unwind': {
                        'path': '$list_of_id_boq_comm', 
                        'preserveNullAndEmptyArrays': True
                    }
                }, {
                    '$lookup': {
                        'from': 'boq_commercial_item', 
                        'let': {
                            'idboqcomm': '$list_of_id_boq_comm'
                        }, 
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$and': [
                                            {
                                                '$eq': [
                                                    '$id_boq_comm_doc', '$$idboqcomm'
                                                ]
                                            }, {
                                                '$eq': [
                                                    '$deleted', 0
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ], 
                        'as': 'list_item_boq'
                    }
                }, {
                    '$unwind': {
                        'path': '$list_item_boq', 
                        'preserveNullAndEmptyArrays': True
                    }
                }, {
                    '$group': {
                        '_id': '$_id', 
                        'no_boq_tech': {
                            '$first': '$no_boq_tech'
                        }, 
                        'rev': {
                            '$first': '$rev'
                        }, 
                        'rev_by': {
                            '$first': '$rev_by'
                        }, 
                        'rev_date': {
                            '$first': '$rev_date'
                        }, 
                        'created_by': {
                            '$first': '$created_by'
                        }, 
                        'updated_by': {
                            '$first': '$updated_by'
                        }, 
                        'no_boq_comm': {
                            '$first': '$no_boq_comm'
                        }, 
                        'id_project_doc': {
                            '$first': '$id_project_doc'
                        }, 
                        'project_name': {
                            '$first': '$project_name'
                        }, 
                        'list_of_id_boq_comm': {
                            '$addToSet': '$list_of_id_boq_comm'
                        }, 
                        'delta_rev': {
                            '$first': '$delta_rev'
                        }, 
                        'delta_rev_by': {
                            '$first': '$delta_rev_by'
                        }, 
                        'delta_rev_date': {
                            '$first': '$delta_rev_date'
                        }, 
                        'delta_rev_file': {
                            '$first': '$delta_rev_file'
                        }, 
                        'version': {
                            '$first': '$version'
                        }, 
                        'deleted': {
                            '$first': '$deleted'
                        }, 
                        'created_on': {
                            '$first': '$created_on'
                        }, 
                        'updated_on': {
                            '$first': '$updated_on'
                        }, 
                        '_etag': {
                            '$first': '$_etag'
                        }, 
                        'list_of_item_boq': {
                            '$push': '$list_item_boq'
                        }
                    }
                }
            ]
        },
        'filter' : {'deleted' : 0}
	},

    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : [],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : [],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'pagination' : False,
    'hateoas' : False,
    'schema' : boqtechnicalschema,
}

boq_tech_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,

    'schema' : boqtechnicalschema,
}

boq_tech_audit = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical',
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning' : False,
    'hateoas' : False,

    'schema' : boqtechnicalschema,
}

boq_tech_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical',
        'default_sort': [('_id', -1)],
        'projection' : {
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'pagination' : False,
    'hateoas' : False,
    
    'schema' : boqtechnicalschema,
}

boq_tech_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqtechnicalschema,
}

boq_tech_sites_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqtechnicalsiteschema,
}

boq_tech_sites_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'schema' : boqtechnicalsiteschema,
}

boq_tech_sites_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : boqtechnicalsiteschema,
}

boq_tech_sites_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
    'schema' : boqtechnicalsiteschema,
}

boq_tech_sites_sum_qty = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'aggregation': {
            'pipeline': [
                {"$match": { "id_boq_tech_doc": "$id_boq_tech_doc"}},
                {"$unwind": "$list_of_site_items"},
                {"$group": {    
                    "_id": "$list_of_site_items.id_pp_doc", 
                    "pp_id": {"$first": "$list_of_site_items.pp_id"},
                    "package_name": {"$first": "$list_of_site_items.package_name"},
                    "totalQtyTech": {"$sum": "$list_of_site_items.qty"},
                    "totalAmountQtyQuotation": {"$sum": "$list_of_site_items.qty_quotation_allocated"},
                    "totalAmountEricsson": {"$sum": "$list_of_site_items.ericsson_allocated"},
                    "totalAmountSmart": {"$sum": "$list_of_site_items.smart_allocated"},
                    }
                },
            ]
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'schema' : boqtechnicalsiteschema,
}

boq_tech_sites_po_number = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'aggregation': {
            'pipeline': [
                {
                    '$match': {
                        'id_boq_tech_doc': '$id_boq_tech_doc'
                    }
                }, {
                    '$unwind': {
                        'path': '$list_of_site_items'
                    }
                }, {
                    '$group': {
                        '_id': '$list_of_site_items.id_pp_doc', 
                        'id_boq_tech_doc': {
                            '$first': '$id_boq_tech_doc'
                        }, 
                        'no_boq_tech': {
                            '$first': '$no_boq_tech'
                        }, 
                        'id_pp_doc': {
                            '$first': '$list_of_site_items.id_pp_doc'
                        }, 
                        'pp_id': {
                            '$first': '$list_of_site_items.pp_id'
                        }, 
                        'package_name': {
                            '$first': '$list_of_site_items.package_name'
                        }, 
                        'phy_group': {
                            '$first': '$list_of_site_items.phy_group'
                        }, 
                        'product_type': {
                            '$first': '$list_of_site_items.product_type'
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'boq_commercial', 
                        'localField': 'id_boq_tech_doc', 
                        'foreignField': 'id_boq_tech_doc', 
                        'as': 'id_boq_comm'
                    }
                }, {
                    '$lookup': {
                        'from': 'boq_commercial_item', 
                        'localField': 'id_boq_comm.list_of_id_item', 
                        'foreignField': '_id', 
                        'as': 'item_boq'
                    }
                }, {
                    '$project': {
                        'id_boq_comm': 0
                    }
                }, {
                    '$unwind': {
                        'path': '$item_boq'
                    }
                }, {
                    '$match': {
                        '$expr': {
                            '$eq': [
                                '$pp_id', '$item_boq.pp_id'
                            ]
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'boq_commercial', 
                        'let': {
                            'idcomm': '$item_boq.id_boq_comm_doc'
                        }, 
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$eq': [
                                            '$$idcomm', '$_id'
                                        ]
                                    }
                                }
                            }, {
                                '$project': {
                                    'no_boq_comm': 1, 
                                    'po_number': 1, 
                                    'id_po_doc': 1
                                }
                            }
                        ], 
                        'as': 'po_data'
                    }
                }, {
                    '$project': {
                        'item_boq': 0
                    }
                }
            ]
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],

    'schema' : boqtechnicalsiteschema,
}

project_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : projectschemawithoutaudit,
}

project_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'pagination' : False,
    'versioning' : False,
    'schema' : projectschema,
}

project_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'schema' : projectschema,
}

project_audit = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : projectschema,
}

project_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning' : False,
    'pagination' : False,
    'schema' : projectschema,
}

project_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : projectschema,
}

site_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : siteschemawithoutaudit,
}

site_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : siteschema,
}

site_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'schema' : siteschema,
}

site_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
    'hateoas' : False,
    'schema' : siteschema,
}

site_audit = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : siteschema,
}

site_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : siteschema,
}

pp_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
    
    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    
    'versioning': False,
    'hateoas' : False,
    'schema': productpackageschemawithoutaudit,
}

pp_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'schema': productpackageschema,
}

pp_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas' : False,
    'schema': productpackageschemawithoutaudit,
}

pp_audit = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas' : False,
    'schema': productpackageschema,
}

pp_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': productpackageschema,
}

pp_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning': False,
    'pagination': False,
    'schema': productpackageschema,
}

pp_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'schema': productpackageschema,
}

mc_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas' : False,
    'schema': materialcatalogueschemawithoutaudit,
}

mc_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'schema': materialcatalogueschema,
}

mc_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas' : False,
    'schema': materialcatalogueschema,
}

mc_audit = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'hateoas' : False,
    'schema': materialcatalogueschema,
}

mc_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': materialcatalogueschema,
}

mc_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning': False,
    'pagination': False,
    'schema': materialcatalogueschema,
}

mc_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'schema': materialcatalogueschema,
}

custdel_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    
    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'hateoas' : False,
    'schema': custdelschema,

}

custdel_pk_only = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0,
            'cd_id' : 1
        },
        'filter' : {'deleted' : 0}
	},

    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': custdelschema,
}

custdel_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning': False,
    'hateoas' : False,
    'schema': custdelschema,
}

custdel_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas' : False,
    'schema': custdelschema,
}

custdel_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'Reporting-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'Reporting-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': custdelschema,
}

custdel_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'hateoas' : False,
    'schema': custdelschema,
}

custdel_progress_ms = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0,
            'cd_id': 1,
            'id_project_doc': 1,
            'id_site_doc': 1,
            'customer_area': 1,
            'number_of_implementation_bom': 1,
            'number_of_mrf': 1,
            'number_of_scope': 1,
            'po_scope': 1,
            'ms_17000_pat_2_plan': 1,
            'ms_17000_pat_3_actual': 1,
            'ms_18000_pac_2_plan': 1,
            'ms_18000_pac_3_actual': 1,
            'ms_19000_fac_2_plan': 1,
            'ms_19000_fac_3_actual': 1,
            'ms_l2600_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2600_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2600_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_l2600_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_l2600_c1_03000_mrf_release_2_plan': 1,
            'ms_l2600_c1_03000_mrf_release_3_actual': 1,
            'ms_l2600_c1_06000_mos_2_plan': 1,
            'ms_l2600_c1_06000_mos_3_actual': 1,
            'ms_l2600_c1_07000_installation_start_2_plan': 1,
            'ms_l2600_c1_07000_installation_start_3_actual': 1,
            'ms_l2600_c1_08000_installation_finish_issue': 1,
            'ms_l2600_c1_09500_integration_finish_2_plan': 1,
            'ms_l2600_c1_09500_integration_finish_3_actual': 1,
            'ms_l2600_c1_14000_ft_complete_2_plan': 1,
            'ms_l2600_c1_14000_ft_complete_3_actual': 1,
            'ms_l2600_c1_16000_pre_pat_2_plan': 1,
            'ms_l2600_c1_16000_pre_pat_3_actual': 1,
            'ms_l2300_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2300_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2300_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_l2300_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_l2300_c1_03000_mrf_release_2_plan': 1,
            'ms_l2300_c1_03000_mrf_release_3_actual': 1,
            'ms_l2300_c1_06000_mos_2_plan': 1,
            'ms_l2300_c1_06000_mos_3_actual': 1,
            'ms_l2300_c1_07000_installation_start_2_plan': 1,
            'ms_l2300_c1_07000_installation_start_3_actual': 1,
            'ms_l2300_c1_08000_installation_finish_issue': 1,
            'ms_l2300_c1_09500_integration_finish_2_plan': 1,
            'ms_l2300_c1_09500_integration_finish_3_actual': 1,
            'ms_l2300_c1_14000_ft_complete_2_plan': 1,
            'ms_l2300_c1_14000_ft_complete_3_actual': 1,
            'ms_l2300_c1_16000_pre_pat_2_plan': 1,
            'ms_l2300_c1_16000_pre_pat_3_actual': 1,
            'ms_l2100_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2100_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2100_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_l2100_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_l2100_c1_03000_mrf_release_2_plan': 1,
            'ms_l2100_c1_03000_mrf_release_3_actual': 1,
            'ms_l2100_c1_06000_mos_2_plan': 1,
            'ms_l2100_c1_06000_mos_3_actual': 1,
            'ms_l2100_c1_07000_installation_start_2_plan': 1,
            'ms_l2100_c1_07000_installation_start_3_actual': 1,
            'ms_l2100_c1_08000_installation_finish_issue': 1,
            'ms_l2100_c1_09500_integration_finish_2_plan': 1,
            'ms_l2100_c1_09500_integration_finish_3_actual': 1,
            'ms_l2100_c1_14000_ft_complete_2_plan': 1,
            'ms_l2100_c1_14000_ft_complete_3_actual': 1,
            'ms_l2100_c1_16000_pre_pat_2_plan': 1,
            'ms_l2100_c1_16000_pre_pat_3_actual': 1,
            'ms_l1800_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_l1800_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_l1800_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_l1800_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_l1800_c1_03000_mrf_release_2_plan': 1,
            'ms_l1800_c1_03000_mrf_release_3_actual': 1,
            'ms_l1800_c1_06000_mos_2_plan': 1,
            'ms_l1800_c1_06000_mos_3_actual': 1,
            'ms_l1800_c1_07000_installation_start_2_plan': 1,
            'ms_l1800_c1_07000_installation_start_3_actual': 1,
            'ms_l1800_c1_08000_installation_finish_issue': 1,
            'ms_l1800_c1_09500_integration_finish_2_plan': 1,
            'ms_l1800_c1_09500_integration_finish_3_actual': 1,
            'ms_l1800_c1_14000_ft_complete_2_plan': 1,
            'ms_l1800_c1_14000_ft_complete_3_actual': 1,
            'ms_l1800_c1_16000_pre_pat_2_plan': 1,
            'ms_l1800_c1_16000_pre_pat_3_actual': 1,
            'ms_l850_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_l850_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_l850_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_l850_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_l850_c1_03000_mrf_release_2_plan': 1,
            'ms_l850_c1_03000_mrf_release_3_actual': 1,
            'ms_l850_c1_06000_mos_2_plan': 1,
            'ms_l850_c1_06000_mos_3_actual': 1,
            'ms_l850_c1_07000_installation_start_2_plan': 1,
            'ms_l850_c1_07000_installation_start_3_actual': 1,
            'ms_l850_c1_08000_installation_finish_issue': 1,
            'ms_l850_c1_09500_integration_finish_2_plan': 1,
            'ms_l850_c1_09500_integration_finish_3_actual': 1,
            'ms_l850_c1_14000_ft_complete_2_plan': 1,
            'ms_l850_c1_14000_ft_complete_3_actual': 1,
            'ms_l850_c1_16000_pre_pat_2_plan': 1,
            'ms_l850_c1_16000_pre_pat_3_actual': 1,
            'ms_l700_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_l700_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_l700_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_l700_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_l700_c1_03000_mrf_release_2_plan': 1,
            'ms_l700_c1_03000_mrf_release_3_actual': 1,
            'ms_l700_c1_06000_mos_2_plan': 1,
            'ms_l700_c1_06000_mos_3_actual': 1,
            'ms_l700_c1_07000_installation_start_2_plan': 1,
            'ms_l700_c1_07000_installation_start_3_actual': 1,
            'ms_l700_c1_08000_installation_finish_issue': 1,
            'ms_l700_c1_09500_integration_finish_2_plan': 1,
            'ms_l700_c1_09500_integration_finish_3_actual': 1,
            'ms_l700_c1_14000_ft_complete_2_plan': 1,
            'ms_l700_c1_14000_ft_complete_3_actual': 1,
            'ms_l700_c1_16000_pre_pat_2_plan': 1,
            'ms_l700_c1_16000_pre_pat_3_actual': 1,
            'ms_u2100_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_u2100_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_u2100_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_u2100_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_u2100_c1_03000_mrf_release_2_plan': 1,
            'ms_u2100_c1_03000_mrf_release_3_actual': 1,
            'ms_u2100_c1_06000_mos_2_plan': 1,
            'ms_u2100_c1_06000_mos_3_actual': 1,
            'ms_u2100_c1_07000_installation_start_2_plan': 1,
            'ms_u2100_c1_07000_installation_start_3_actual': 1,
            'ms_u2100_c1_08000_installation_finish_issue': 1,
            'ms_u2100_c1_09500_integration_finish_2_plan': 1,
            'ms_u2100_c1_09500_integration_finish_3_actual': 1,
            'ms_u2100_c1_14000_ft_complete_2_plan': 1,
            'ms_u2100_c1_14000_ft_complete_3_actual': 1,
            'ms_u2100_c1_16000_pre_pat_2_plan': 1,
            'ms_u2100_c1_16000_pre_pat_3_actual': 1,
            'ms_u900_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_u900_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_u900_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_u900_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_u900_c1_03000_mrf_release_2_plan': 1,
            'ms_u900_c1_03000_mrf_release_3_actual': 1,
            'ms_u900_c1_06000_mos_2_plan': 1,
            'ms_u900_c1_06000_mos_3_actual': 1,
            'ms_u900_c1_07000_installation_start_2_plan': 1,
            'ms_u900_c1_07000_installation_start_3_actual': 1,
            'ms_u900_c1_08000_installation_finish_issue': 1,
            'ms_u900_c1_09500_integration_finish_2_plan': 1,
            'ms_u900_c1_09500_integration_finish_3_actual': 1,
            'ms_u900_c1_14000_ft_complete_2_plan': 1,
            'ms_u900_c1_14000_ft_complete_3_actual': 1,
            'ms_u900_c1_16000_pre_pat_2_plan': 1,
            'ms_u900_c1_16000_pre_pat_3_actual': 1,
            'ms_u850_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_u850_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_u850_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_u850_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_u850_c1_03000_mrf_release_2_plan': 1,
            'ms_u850_c1_03000_mrf_release_3_actual': 1,
            'ms_u850_c1_06000_mos_2_plan': 1,
            'ms_u850_c1_06000_mos_3_actual': 1,
            'ms_u850_c1_07000_installation_start_2_plan': 1,
            'ms_u850_c1_07000_installation_start_3_actual': 1,
            'ms_u850_c1_08000_installation_finish_issue': 1,
            'ms_u850_c1_09500_integration_finish_2_plan': 1,
            'ms_u850_c1_09500_integration_finish_3_actual': 1,
            'ms_u850_c1_14000_ft_complete_2_plan': 1,
            'ms_u850_c1_14000_ft_complete_3_actual': 1,
            'ms_u850_c1_16000_pre_pat_2_plan': 1,
            'ms_u850_c1_16000_pre_pat_3_actual': 1,
            'ms_w2100_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_w2100_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_w2100_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_w2100_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_w2100_c1_03000_mrf_release_2_plan': 1,
            'ms_w2100_c1_03000_mrf_release_3_actual': 1,
            'ms_w2100_c1_06000_mos_2_plan': 1,
            'ms_w2100_c1_06000_mos_3_actual': 1,
            'ms_w2100_c1_07000_installation_start_2_plan': 1,
            'ms_w2100_c1_07000_installation_start_3_actual': 1,
            'ms_w2100_c1_08000_installation_finish_issue': 1,
            'ms_w2100_c1_09500_integration_finish_2_plan': 1,
            'ms_w2100_c1_09500_integration_finish_3_actual': 1,
            'ms_w2100_c1_14000_ft_complete_2_plan': 1,
            'ms_w2100_c1_14000_ft_complete_3_actual': 1,
            'ms_w2100_c1_16000_pre_pat_2_plan': 1,
            'ms_w2100_c1_16000_pre_pat_3_actual': 1,
            'ms_w900_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_w900_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_w900_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_w900_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_w900_c1_03000_mrf_release_2_plan': 1,
            'ms_w900_c1_03000_mrf_release_3_actual': 1,
            'ms_w900_c1_06000_mos_2_plan': 1,
            'ms_w900_c1_06000_mos_3_actual': 1,
            'ms_w900_c1_07000_installation_start_2_plan': 1,
            'ms_w900_c1_07000_installation_start_3_actual': 1,
            'ms_w900_c1_08000_installation_finish_issue': 1,
            'ms_w900_c1_09500_integration_finish_2_plan': 1,
            'ms_w900_c1_09500_integration_finish_3_actual': 1,
            'ms_w900_c1_14000_ft_complete_2_plan': 1,
            'ms_w900_c1_14000_ft_complete_3_actual': 1,
            'ms_w900_c1_16000_pre_pat_2_plan': 1,
            'ms_w900_c1_16000_pre_pat_3_actual': 1,
            'ms_w850_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_w850_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_w850_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_w850_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_w850_c1_03000_mrf_release_2_plan': 1,
            'ms_w850_c1_03000_mrf_release_3_actual': 1,
            'ms_w850_c1_06000_mos_2_plan': 1,
            'ms_w850_c1_06000_mos_3_actual': 1,
            'ms_w850_c1_07000_installation_start_2_plan': 1,
            'ms_w850_c1_07000_installation_start_3_actual': 1,
            'ms_w850_c1_08000_installation_finish_issue': 1,
            'ms_w850_c1_09500_integration_finish_2_plan': 1,
            'ms_w850_c1_09500_integration_finish_3_actual': 1,
            'ms_w850_c1_14000_ft_complete_2_plan': 1,
            'ms_w850_c1_14000_ft_complete_3_actual': 1,
            'ms_w850_c1_16000_pre_pat_2_plan': 1,
            'ms_w850_c1_16000_pre_pat_3_actual': 1,
            'ms_g1800_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_g1800_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_g1800_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_g1800_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_g1800_c1_03000_mrf_release_2_plan': 1,
            'ms_g1800_c1_03000_mrf_release_3_actual': 1,
            'ms_g1800_c1_06000_mos_2_plan': 1,
            'ms_g1800_c1_06000_mos_3_actual': 1,
            'ms_g1800_c1_07000_installation_start_2_plan': 1,
            'ms_g1800_c1_07000_installation_start_3_actual': 1,
            'ms_g1800_c1_08000_installation_finish_issue': 1,
            'ms_g1800_c1_09500_integration_finish_2_plan': 1,
            'ms_g1800_c1_09500_integration_finish_3_actual': 1,
            'ms_g1800_c1_14000_ft_complete_2_plan': 1,
            'ms_g1800_c1_14000_ft_complete_3_actual': 1,
            'ms_g1800_c1_16000_pre_pat_2_plan': 1,
            'ms_g1800_c1_16000_pre_pat_3_actual': 1,
            'ms_g900_c1_01000_implementation_bom_requested_2_plan': 1,
            'ms_g900_c1_01000_implementation_bom_requested_3_actual': 1,
            'ms_g900_c1_02000_implementation_bom_release_2_plan': 1,
            'ms_g900_c1_02000_implementation_bom_release_3_actual': 1,
            'ms_g900_c1_03000_mrf_release_2_plan': 1,
            'ms_g900_c1_03000_mrf_release_3_actual': 1,
            'ms_g900_c1_06000_mos_2_plan': 1,
            'ms_g900_c1_06000_mos_3_actual': 1,
            'ms_g900_c1_07000_installation_start_2_plan': 1,
            'ms_g900_c1_07000_installation_start_3_actual': 1,
            'ms_g900_c1_08000_installation_finish_issue': 1,
            'ms_g900_c1_09500_integration_finish_2_plan': 1,
            'ms_g900_c1_09500_integration_finish_3_actual': 1,
            'ms_g900_c1_14000_ft_complete_2_plan': 1,
            'ms_g900_c1_14000_ft_complete_3_actual': 1,
            'ms_g900_c1_16000_pre_pat_2_plan': 1,
            'ms_g900_c1_16000_pre_pat_3_actual': 1,
            'ms_l2600_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2600_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2600_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_l2600_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_l2600_c2_03000_mrf_release_2_plan': 1,
            'ms_l2600_c2_03000_mrf_release_3_actual': 1,
            'ms_l2600_c2_06000_mos_2_plan': 1,
            'ms_l2600_c2_06000_mos_3_actual': 1,
            'ms_l2600_c2_07000_installation_start_2_plan': 1,
            'ms_l2600_c2_07000_installation_start_3_actual': 1,
            'ms_l2600_c2_08000_installation_finish_issue': 1,
            'ms_l2600_c2_09500_integration_finish_2_plan': 1,
            'ms_l2600_c2_09500_integration_finish_3_actual': 1,
            'ms_l2600_c2_14000_ft_complete_2_plan': 1,
            'ms_l2600_c2_14000_ft_complete_3_actual': 1,
            'ms_l2600_c2_16000_pre_pat_2_plan': 1,
            'ms_l2600_c2_16000_pre_pat_3_actual': 1,
            'ms_l2300_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2300_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2300_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_l2300_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_l2300_c2_03000_mrf_release_2_plan': 1,
            'ms_l2300_c2_03000_mrf_release_3_actual': 1,
            'ms_l2300_c2_06000_mos_2_plan': 1,
            'ms_l2300_c2_06000_mos_3_actual': 1,
            'ms_l2300_c2_07000_installation_start_2_plan': 1,
            'ms_l2300_c2_07000_installation_start_3_actual': 1,
            'ms_l2300_c2_08000_installation_finish_issue': 1,
            'ms_l2300_c2_09500_integration_finish_2_plan': 1,
            'ms_l2300_c2_09500_integration_finish_3_actual': 1,
            'ms_l2300_c2_14000_ft_complete_2_plan': 1,
            'ms_l2300_c2_14000_ft_complete_3_actual': 1,
            'ms_l2300_c2_16000_pre_pat_2_plan': 1,
            'ms_l2300_c2_16000_pre_pat_3_actual': 1,
            'ms_l2100_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2100_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2100_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_l2100_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_l2100_c2_03000_mrf_release_2_plan': 1,
            'ms_l2100_c2_03000_mrf_release_3_actual': 1,
            'ms_l2100_c2_06000_mos_2_plan': 1,
            'ms_l2100_c2_06000_mos_3_actual': 1,
            'ms_l2100_c2_07000_installation_start_2_plan': 1,
            'ms_l2100_c2_07000_installation_start_3_actual': 1,
            'ms_l2100_c2_08000_installation_finish_issue': 1,
            'ms_l2100_c2_09500_integration_finish_2_plan': 1,
            'ms_l2100_c2_09500_integration_finish_3_actual': 1,
            'ms_l2100_c2_14000_ft_complete_2_plan': 1,
            'ms_l2100_c2_14000_ft_complete_3_actual': 1,
            'ms_l2100_c2_16000_pre_pat_2_plan': 1,
            'ms_l2100_c2_16000_pre_pat_3_actual': 1,
            'ms_l1800_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_l1800_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_l1800_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_l1800_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_l1800_c2_03000_mrf_release_2_plan': 1,
            'ms_l1800_c2_03000_mrf_release_3_actual': 1,
            'ms_l1800_c2_06000_mos_2_plan': 1,
            'ms_l1800_c2_06000_mos_3_actual': 1,
            'ms_l1800_c2_07000_installation_start_2_plan': 1,
            'ms_l1800_c2_07000_installation_start_3_actual': 1,
            'ms_l1800_c2_08000_installation_finish_issue': 1,
            'ms_l1800_c2_09500_integration_finish_2_plan': 1,
            'ms_l1800_c2_09500_integration_finish_3_actual': 1,
            'ms_l1800_c2_14000_ft_complete_2_plan': 1,
            'ms_l1800_c2_14000_ft_complete_3_actual': 1,
            'ms_l1800_c2_16000_pre_pat_2_plan': 1,
            'ms_l1800_c2_16000_pre_pat_3_actual': 1,
            'ms_l850_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_l850_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_l850_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_l850_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_l850_c2_03000_mrf_release_2_plan': 1,
            'ms_l850_c2_03000_mrf_release_3_actual': 1,
            'ms_l850_c2_06000_mos_2_plan': 1,
            'ms_l850_c2_06000_mos_3_actual': 1,
            'ms_l850_c2_07000_installation_start_2_plan': 1,
            'ms_l850_c2_07000_installation_start_3_actual': 1,
            'ms_l850_c2_08000_installation_finish_issue': 1,
            'ms_l850_c2_09500_integration_finish_2_plan': 1,
            'ms_l850_c2_09500_integration_finish_3_actual': 1,
            'ms_l850_c2_14000_ft_complete_2_plan': 1,
            'ms_l850_c2_14000_ft_complete_3_actual': 1,
            'ms_l850_c2_16000_pre_pat_2_plan': 1,
            'ms_l850_c2_16000_pre_pat_3_actual': 1,
            'ms_l700_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_l700_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_l700_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_l700_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_l700_c2_03000_mrf_release_2_plan': 1,
            'ms_l700_c2_03000_mrf_release_3_actual': 1,
            'ms_l700_c2_06000_mos_2_plan': 1,
            'ms_l700_c2_06000_mos_3_actual': 1,
            'ms_l700_c2_07000_installation_start_2_plan': 1,
            'ms_l700_c2_07000_installation_start_3_actual': 1,
            'ms_l700_c2_08000_installation_finish_issue': 1,
            'ms_l700_c2_09500_integration_finish_2_plan': 1,
            'ms_l700_c2_09500_integration_finish_3_actual': 1,
            'ms_l700_c2_14000_ft_complete_2_plan': 1,
            'ms_l700_c2_14000_ft_complete_3_actual': 1,
            'ms_l700_c2_16000_pre_pat_2_plan': 1,
            'ms_l700_c2_16000_pre_pat_3_actual': 1,
            'ms_u2100_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_u2100_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_u2100_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_u2100_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_u2100_c2_03000_mrf_release_2_plan': 1,
            'ms_u2100_c2_03000_mrf_release_3_actual': 1,
            'ms_u2100_c2_06000_mos_2_plan': 1,
            'ms_u2100_c2_06000_mos_3_actual': 1,
            'ms_u2100_c2_07000_installation_start_2_plan': 1,
            'ms_u2100_c2_07000_installation_start_3_actual': 1,
            'ms_u2100_c2_08000_installation_finish_issue': 1,
            'ms_u2100_c2_09500_integration_finish_2_plan': 1,
            'ms_u2100_c2_09500_integration_finish_3_actual': 1,
            'ms_u2100_c2_14000_ft_complete_2_plan': 1,
            'ms_u2100_c2_14000_ft_complete_3_actual': 1,
            'ms_u2100_c2_16000_pre_pat_2_plan': 1,
            'ms_u2100_c2_16000_pre_pat_3_actual': 1,
            'ms_u900_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_u900_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_u900_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_u900_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_u900_c2_03000_mrf_release_2_plan': 1,
            'ms_u900_c2_03000_mrf_release_3_actual': 1,
            'ms_u900_c2_06000_mos_2_plan': 1,
            'ms_u900_c2_06000_mos_3_actual': 1,
            'ms_u900_c2_07000_installation_start_2_plan': 1,
            'ms_u900_c2_07000_installation_start_3_actual': 1,
            'ms_u900_c2_08000_installation_finish_issue': 1,
            'ms_u900_c2_09500_integration_finish_2_plan': 1,
            'ms_u900_c2_09500_integration_finish_3_actual': 1,
            'ms_u900_c2_14000_ft_complete_2_plan': 1,
            'ms_u900_c2_14000_ft_complete_3_actual': 1,
            'ms_u900_c2_16000_pre_pat_2_plan': 1,
            'ms_u900_c2_16000_pre_pat_3_actual': 1,
            'ms_u850_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_u850_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_u850_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_u850_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_u850_c2_03000_mrf_release_2_plan': 1,
            'ms_u850_c2_03000_mrf_release_3_actual': 1,
            'ms_u850_c2_06000_mos_2_plan': 1,
            'ms_u850_c2_06000_mos_3_actual': 1,
            'ms_u850_c2_07000_installation_start_2_plan': 1,
            'ms_u850_c2_07000_installation_start_3_actual': 1,
            'ms_u850_c2_08000_installation_finish_issue': 1,
            'ms_u850_c2_09500_integration_finish_2_plan': 1,
            'ms_u850_c2_09500_integration_finish_3_actual': 1,
            'ms_u850_c2_14000_ft_complete_2_plan': 1,
            'ms_u850_c2_14000_ft_complete_3_actual': 1,
            'ms_u850_c2_16000_pre_pat_2_plan': 1,
            'ms_u850_c2_16000_pre_pat_3_actual': 1,
            'ms_w2100_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_w2100_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_w2100_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_w2100_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_w2100_c2_03000_mrf_release_2_plan': 1,
            'ms_w2100_c2_03000_mrf_release_3_actual': 1,
            'ms_w2100_c2_06000_mos_2_plan': 1,
            'ms_w2100_c2_06000_mos_3_actual': 1,
            'ms_w2100_c2_07000_installation_start_2_plan': 1,
            'ms_w2100_c2_07000_installation_start_3_actual': 1,
            'ms_w2100_c2_08000_installation_finish_issue': 1,
            'ms_w2100_c2_09500_integration_finish_2_plan': 1,
            'ms_w2100_c2_09500_integration_finish_3_actual': 1,
            'ms_w2100_c2_14000_ft_complete_2_plan': 1,
            'ms_w2100_c2_14000_ft_complete_3_actual': 1,
            'ms_w2100_c2_16000_pre_pat_2_plan': 1,
            'ms_w2100_c2_16000_pre_pat_3_actual': 1,
            'ms_w850_c2_01000_implementation_bom_requested_2_plan': 1,
            'ms_w850_c2_01000_implementation_bom_requested_3_actual': 1,
            'ms_w850_c2_02000_implementation_bom_release_2_plan': 1,
            'ms_w850_c2_02000_implementation_bom_release_3_actual': 1,
            'ms_w850_c2_03000_mrf_release_2_plan': 1,
            'ms_w850_c2_03000_mrf_release_3_actual': 1,
            'ms_w850_c2_06000_mos_2_plan': 1,
            'ms_w850_c2_06000_mos_3_actual': 1,
            'ms_w850_c2_07000_installation_start_2_plan': 1,
            'ms_w850_c2_07000_installation_start_3_actual': 1,
            'ms_w850_c2_08000_installation_finish_issue': 1,
            'ms_w850_c2_09500_integration_finish_2_plan': 1,
            'ms_w850_c2_09500_integration_finish_3_actual': 1,
            'ms_w850_c2_14000_ft_complete_2_plan': 1,
            'ms_w850_c2_14000_ft_complete_3_actual': 1,
            'ms_w850_c2_16000_pre_pat_2_plan': 1,
            'ms_w850_c2_16000_pre_pat_3_actual': 1,
            'ms_l2600_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2600_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2600_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_l2600_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_l2600_c3_03000_mrf_release_2_plan': 1,
            'ms_l2600_c3_03000_mrf_release_3_actual': 1,
            'ms_l2600_c3_06000_mos_2_plan': 1,
            'ms_l2600_c3_06000_mos_3_actual': 1,
            'ms_l2600_c3_07000_installation_start_2_plan': 1,
            'ms_l2600_c3_07000_installation_start_3_actual': 1,
            'ms_l2600_c3_08000_installation_finish_issue': 1,
            'ms_l2600_c3_09500_integration_finish_2_plan': 1,
            'ms_l2600_c3_09500_integration_finish_3_actual': 1,
            'ms_l2600_c3_14000_ft_complete_2_plan': 1,
            'ms_l2600_c3_14000_ft_complete_3_actual': 1,
            'ms_l2600_c3_16000_pre_pat_2_plan': 1,
            'ms_l2600_c3_16000_pre_pat_3_actual': 1,
            'ms_l2300_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2300_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2300_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_l2300_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_l2300_c3_03000_mrf_release_2_plan': 1,
            'ms_l2300_c3_03000_mrf_release_3_actual': 1,
            'ms_l2300_c3_06000_mos_2_plan': 1,
            'ms_l2300_c3_06000_mos_3_actual': 1,
            'ms_l2300_c3_07000_installation_start_2_plan': 1,
            'ms_l2300_c3_07000_installation_start_3_actual': 1,
            'ms_l2300_c3_08000_installation_finish_issue': 1,
            'ms_l2300_c3_09500_integration_finish_2_plan': 1,
            'ms_l2300_c3_09500_integration_finish_3_actual': 1,
            'ms_l2300_c3_14000_ft_complete_2_plan': 1,
            'ms_l2300_c3_14000_ft_complete_3_actual': 1,
            'ms_l2300_c3_16000_pre_pat_2_plan': 1,
            'ms_l2300_c3_16000_pre_pat_3_actual': 1,
            'ms_l2100_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_l2100_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_l2100_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_l2100_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_l2100_c3_03000_mrf_release_2_plan': 1,
            'ms_l2100_c3_03000_mrf_release_3_actual': 1,
            'ms_l2100_c3_06000_mos_2_plan': 1,
            'ms_l2100_c3_06000_mos_3_actual': 1,
            'ms_l2100_c3_07000_installation_start_2_plan': 1,
            'ms_l2100_c3_07000_installation_start_3_actual': 1,
            'ms_l2100_c3_08000_installation_finish_issue': 1,
            'ms_l2100_c3_09500_integration_finish_2_plan': 1,
            'ms_l2100_c3_09500_integration_finish_3_actual': 1,
            'ms_l2100_c3_14000_ft_complete_2_plan': 1,
            'ms_l2100_c3_14000_ft_complete_3_actual': 1,
            'ms_l2100_c3_16000_pre_pat_2_plan': 1,
            'ms_l2100_c3_16000_pre_pat_3_actual': 1,
            'ms_l1800_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_l1800_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_l1800_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_l1800_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_l1800_c3_03000_mrf_release_2_plan': 1,
            'ms_l1800_c3_03000_mrf_release_3_actual': 1,
            'ms_l1800_c3_06000_mos_2_plan': 1,
            'ms_l1800_c3_06000_mos_3_actual': 1,
            'ms_l1800_c3_07000_installation_start_2_plan': 1,
            'ms_l1800_c3_07000_installation_start_3_actual': 1,
            'ms_l1800_c3_08000_installation_finish_issue': 1,
            'ms_l1800_c3_09500_integration_finish_2_plan': 1,
            'ms_l1800_c3_09500_integration_finish_3_actual': 1,
            'ms_l1800_c3_14000_ft_complete_2_plan': 1,
            'ms_l1800_c3_14000_ft_complete_3_actual': 1,
            'ms_l1800_c3_16000_pre_pat_2_plan': 1,
            'ms_l1800_c3_16000_pre_pat_3_actual': 1,
            'ms_l850_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_l850_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_l850_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_l850_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_l850_c3_03000_mrf_release_2_plan': 1,
            'ms_l850_c3_03000_mrf_release_3_actual': 1,
            'ms_l850_c3_06000_mos_2_plan': 1,
            'ms_l850_c3_06000_mos_3_actual': 1,
            'ms_l850_c3_07000_installation_start_2_plan': 1,
            'ms_l850_c3_07000_installation_start_3_actual': 1,
            'ms_l850_c3_08000_installation_finish_issue': 1,
            'ms_l850_c3_09500_integration_finish_2_plan': 1,
            'ms_l850_c3_09500_integration_finish_3_actual': 1,
            'ms_l850_c3_14000_ft_complete_2_plan': 1,
            'ms_l850_c3_14000_ft_complete_3_actual': 1,
            'ms_l850_c3_16000_pre_pat_2_plan': 1,
            'ms_l850_c3_16000_pre_pat_3_actual': 1,
            'ms_l700_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_l700_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_l700_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_l700_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_l700_c3_03000_mrf_release_2_plan': 1,
            'ms_l700_c3_03000_mrf_release_3_actual': 1,
            'ms_l700_c3_06000_mos_2_plan': 1,
            'ms_l700_c3_06000_mos_3_actual': 1,
            'ms_l700_c3_07000_installation_start_2_plan': 1,
            'ms_l700_c3_07000_installation_start_3_actual': 1,
            'ms_l700_c3_08000_installation_finish_issue': 1,
            'ms_l700_c3_09500_integration_finish_2_plan': 1,
            'ms_l700_c3_09500_integration_finish_3_actual': 1,
            'ms_l700_c3_14000_ft_complete_2_plan': 1,
            'ms_l700_c3_14000_ft_complete_3_actual': 1,
            'ms_l700_c3_16000_pre_pat_2_plan': 1,
            'ms_l700_c3_16000_pre_pat_3_actual': 1,
            'ms_u2100_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_u2100_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_u2100_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_u2100_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_u2100_c3_03000_mrf_release_2_plan': 1,
            'ms_u2100_c3_03000_mrf_release_3_actual': 1,
            'ms_u2100_c3_06000_mos_2_plan': 1,
            'ms_u2100_c3_06000_mos_3_actual': 1,
            'ms_u2100_c3_07000_installation_start_2_plan': 1,
            'ms_u2100_c3_07000_installation_start_3_actual': 1,
            'ms_u2100_c3_08000_installation_finish_issue': 1,
            'ms_u2100_c3_09500_integration_finish_2_plan': 1,
            'ms_u2100_c3_09500_integration_finish_3_actual': 1,
            'ms_u2100_c3_14000_ft_complete_2_plan': 1,
            'ms_u2100_c3_14000_ft_complete_3_actual': 1,
            'ms_u2100_c3_16000_pre_pat_2_plan': 1,
            'ms_u2100_c3_16000_pre_pat_3_actual': 1,
            'ms_u900_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_u900_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_u900_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_u900_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_u900_c3_03000_mrf_release_2_plan': 1,
            'ms_u900_c3_03000_mrf_release_3_actual': 1,
            'ms_u900_c3_06000_mos_2_plan': 1,
            'ms_u900_c3_06000_mos_3_actual': 1,
            'ms_u900_c3_07000_installation_start_2_plan': 1,
            'ms_u900_c3_07000_installation_start_3_actual': 1,
            'ms_u900_c3_08000_installation_finish_issue': 1,
            'ms_u900_c3_09500_integration_finish_2_plan': 1,
            'ms_u900_c3_09500_integration_finish_3_actual': 1,
            'ms_u900_c3_14000_ft_complete_2_plan': 1,
            'ms_u900_c3_14000_ft_complete_3_actual': 1,
            'ms_u900_c3_16000_pre_pat_2_plan': 1,
            'ms_u900_c3_16000_pre_pat_3_actual': 1,
            'ms_u850_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_u850_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_u850_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_u850_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_u850_c3_03000_mrf_release_2_plan': 1,
            'ms_u850_c3_03000_mrf_release_3_actual': 1,
            'ms_u850_c3_06000_mos_2_plan': 1,
            'ms_u850_c3_06000_mos_3_actual': 1,
            'ms_u850_c3_07000_installation_start_2_plan': 1,
            'ms_u850_c3_07000_installation_start_3_actual': 1,
            'ms_u850_c3_08000_installation_finish_issue': 1,
            'ms_u850_c3_09500_integration_finish_2_plan': 1,
            'ms_u850_c3_09500_integration_finish_3_actual': 1,
            'ms_u850_c3_14000_ft_complete_2_plan': 1,
            'ms_u850_c3_14000_ft_complete_3_actual': 1,
            'ms_u850_c3_16000_pre_pat_2_plan': 1,
            'ms_u850_c3_16000_pre_pat_3_actual': 1,
            'ms_w2100_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_w2100_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_w2100_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_w2100_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_w2100_c3_03000_mrf_release_2_plan': 1,
            'ms_w2100_c3_03000_mrf_release_3_actual': 1,
            'ms_w2100_c3_06000_mos_2_plan': 1,
            'ms_w2100_c3_06000_mos_3_actual': 1,
            'ms_w2100_c3_07000_installation_start_2_plan': 1,
            'ms_w2100_c3_07000_installation_start_3_actual': 1,
            'ms_w2100_c3_08000_installation_finish_issue': 1,
            'ms_w2100_c3_09500_integration_finish_2_plan': 1,
            'ms_w2100_c3_09500_integration_finish_3_actual': 1,
            'ms_w2100_c3_14000_ft_complete_2_plan': 1,
            'ms_w2100_c3_14000_ft_complete_3_actual': 1,
            'ms_w2100_c3_16000_pre_pat_2_plan': 1,
            'ms_w2100_c3_16000_pre_pat_3_actual': 1,
            'ms_w850_c3_01000_implementation_bom_requested_2_plan': 1,
            'ms_w850_c3_01000_implementation_bom_requested_3_actual': 1,
            'ms_w850_c3_02000_implementation_bom_release_2_plan': 1,
            'ms_w850_c3_02000_implementation_bom_release_3_actual': 1,
            'ms_w850_c3_03000_mrf_release_2_plan': 1,
            'ms_w850_c3_03000_mrf_release_3_actual': 1,
            'ms_w850_c3_06000_mos_2_plan': 1,
            'ms_w850_c3_06000_mos_3_actual': 1,
            'ms_w850_c3_07000_installation_start_2_plan': 1,
            'ms_w850_c3_07000_installation_start_3_actual': 1,
            'ms_w850_c3_08000_installation_finish_issue': 1,
            'ms_w850_c3_09500_integration_finish_2_plan': 1,
            'ms_w850_c3_09500_integration_finish_3_actual': 1,
            'ms_w850_c3_14000_ft_complete_2_plan': 1,
            'ms_w850_c3_14000_ft_complete_3_actual': 1,
            'ms_w850_c3_16000_pre_pat_2_plan': 1,
            'ms_w850_c3_16000_pre_pat_3_actual': 1,
            'ms_ce_expansion_01000_implementation_bom_requested_2_plan': 1,
            'ms_ce_expansion_01000_implementation_bom_requested_3_actual': 1,
            'ms_ce_expansion_02000_implementation_bom_release_2_plan': 1,
            'ms_ce_expansion_02000_implementation_bom_release_3_actual': 1,
            'ms_ce_expansion_03000_mrf_release_2_plan': 1,
            'ms_ce_expansion_03000_mrf_release_3_actual': 1,
            'ms_ce_expansion_06000_mos_2_plan': 1,
            'ms_ce_expansion_06000_mos_3_actual': 1,
            'ms_ce_expansion_07000_installation_start_2_plan': 1,
            'ms_ce_expansion_07000_installation_start_3_actual': 1,
            'ms_ce_expansion_08000_installation_finish_issue': 1,
            'ms_ce_expansion_09500_integration_finish_2_plan': 1,
            'ms_ce_expansion_09500_integration_finish_3_actual': 1,
            'ms_ce_expansion_14000_ft_complete_2_plan': 1,
            'ms_ce_expansion_14000_ft_complete_3_actual': 1,
            'ms_ce_expansion_16000_pre_pat_2_plan': 1,
            'ms_ce_expansion_16000_pre_pat_3_actual': 1,
            'ms_ip_migration_01000_implementation_bom_requested_2_plan': 1,
            'ms_ip_migration_01000_implementation_bom_requested_3_actual': 1,
            'ms_ip_migration_02000_implementation_bom_release_2_plan': 1,
            'ms_ip_migration_02000_implementation_bom_release_3_actual': 1,
            'ms_ip_migration_03000_mrf_release_2_plan': 1,
            'ms_ip_migration_03000_mrf_release_3_actual': 1,
            'ms_ip_migration_06000_mos_2_plan': 1,
            'ms_ip_migration_06000_mos_3_actual': 1,
            'ms_ip_migration_07000_installation_start_2_plan': 1,
            'ms_ip_migration_07000_installation_start_3_actual': 1,
            'ms_ip_migration_08000_installation_finish_issue': 1,
            'ms_ip_migration_09500_integration_finish_2_plan': 1,
            'ms_ip_migration_09500_integration_finish_3_actual': 1,
            'ms_ip_migration_14000_ft_complete_2_plan': 1,
            'ms_ip_migration_14000_ft_complete_3_actual': 1,
            'ms_ip_migration_16000_pre_pat_2_plan': 1,
            'ms_ip_migration_16000_pre_pat_3_actual': 1,
            'ms_p_abis_01000_implementation_bom_requested_2_plan': 1,
            'ms_p_abis_01000_implementation_bom_requested_3_actual': 1,
            'ms_p_abis_02000_implementation_bom_release_2_plan': 1,
            'ms_p_abis_02000_implementation_bom_release_3_actual': 1,
            'ms_p_abis_03000_mrf_release_2_plan': 1,
            'ms_p_abis_03000_mrf_release_3_actual': 1,
            'ms_p_abis_06000_mos_2_plan': 1,
            'ms_p_abis_06000_mos_3_actual': 1,
            'ms_p_abis_07000_installation_start_2_plan': 1,
            'ms_p_abis_07000_installation_start_3_actual': 1,
            'ms_p_abis_08000_installation_finish_issue': 1,
            'ms_p_abis_09500_integration_finish_2_plan': 1,
            'ms_p_abis_09500_integration_finish_3_actual': 1,
            'ms_p_abis_14000_ft_complete_2_plan': 1,
            'ms_p_abis_14000_ft_complete_3_actual': 1,
            'ms_p_abis_16000_pre_pat_2_plan': 1,
            'ms_p_abis_16000_pre_pat_3_actual': 1,
            'ms_multi_sector_01000_implementation_bom_requested_2_plan': 1,
            'ms_multi_sector_01000_implementation_bom_requested_3_actual': 1,
            'ms_multi_sector_02000_implementation_bom_release_2_plan': 1,
            'ms_multi_sector_02000_implementation_bom_release_3_actual': 1,
            'ms_multi_sector_03000_mrf_release_2_plan': 1,
            'ms_multi_sector_03000_mrf_release_3_actual': 1,
            'ms_multi_sector_06000_mos_2_plan': 1,
            'ms_multi_sector_06000_mos_3_actual': 1,
            'ms_multi_sector_07000_installation_start_2_plan': 1,
            'ms_multi_sector_07000_installation_start_3_actual': 1,
            'ms_multi_sector_08000_installation_finish_issue': 1,
            'ms_multi_sector_09500_integration_finish_2_plan': 1,
            'ms_multi_sector_09500_integration_finish_3_actual': 1,
            'ms_multi_sector_14000_ft_complete_2_plan': 1,
            'ms_multi_sector_14000_ft_complete_3_actual': 1,
            'ms_multi_sector_16000_pre_pat_2_plan': 1,
            'ms_multi_sector_16000_pre_pat_3_actual': 1,
            'ms_na_01000_implementation_bom_requested_2_plan': 1,
            'ms_na_01000_implementation_bom_requested_3_actual': 1,
            'ms_na_02000_implementation_bom_release_2_plan': 1,
            'ms_na_02000_implementation_bom_release_3_actual': 1,
            'ms_na_03000_mrf_release_2_plan': 1,
            'ms_na_03000_mrf_release_3_actual': 1,
            'ms_na_06000_mos_2_plan': 1,
            'ms_na_06000_mos_3_actual': 1,
            'ms_na_07000_installation_start_2_plan': 1,
            'ms_na_07000_installation_start_3_actual': 1,
            'ms_na_08000_installation_finish_issue': 1,
            'ms_na_09500_integration_finish_2_plan': 1,
            'ms_na_09500_integration_finish_3_actual': 1,
            'ms_na_14000_ft_complete_2_plan': 1,
            'ms_na_14000_ft_complete_3_actual': 1,
            'ms_na_16000_pre_pat_2_plan': 1,
            'ms_na_16000_pre_pat_3_actual': 1,
            'ms_l2600_c1_00000_customer_tagging': 1,
            'ms_l2300_c1_00000_customer_tagging': 1,
            'ms_l2100_c1_00000_customer_tagging': 1,
            'ms_l1800_c1_00000_customer_tagging': 1,
            'ms_l850_c1_00000_customer_tagging': 1,
            'ms_l700_c1_00000_customer_tagging': 1,
            'ms_u2100_c1_00000_customer_tagging': 1,
            'ms_u900_c1_00000_customer_tagging': 1,
            'ms_u850_c1_00000_customer_tagging': 1,
            'ms_w2100_c1_00000_customer_tagging': 1,
            'ms_w900_c1_00000_customer_tagging': 1,
            'ms_w850_c1_00000_customer_tagging': 1,
            'ms_g1800_c1_00000_customer_tagging': 1,
            'ms_g900_c1_00000_customer_tagging': 1,
            'ms_l2600_c2_00000_customer_tagging': 1,
            'ms_l2300_c2_00000_customer_tagging': 1,
            'ms_l2100_c2_00000_customer_tagging': 1,
            'ms_l1800_c2_00000_customer_tagging': 1,
            'ms_l850_c2_00000_customer_tagging': 1,
            'ms_l700_c2_00000_customer_tagging': 1,
            'ms_u2100_c2_00000_customer_tagging': 1,
            'ms_u900_c2_00000_customer_tagging': 1,
            'ms_u850_c2_00000_customer_tagging': 1,
            'ms_w2100_c2_00000_customer_tagging': 1,
            'ms_w850_c2_00000_customer_tagging': 1,
            'ms_l2600_c3_00000_customer_tagging': 1,
            'ms_l2300_c3_00000_customer_tagging': 1,
            'ms_l2100_c3_00000_customer_tagging': 1,
            'ms_l1800_c3_00000_customer_tagging': 1,
            'ms_l850_c3_00000_customer_tagging': 1,
            'ms_l700_c3_00000_customer_tagging': 1,
            'ms_u2100_c3_00000_customer_tagging': 1,
            'ms_u900_c3_00000_customer_tagging': 1,
            'ms_u850_c3_00000_customer_tagging': 1,
            'ms_w2100_c3_00000_customer_tagging': 1,
            'ms_w850_c3_00000_customer_tagging': 1,
            'ms_ce_expansion_00000_customer_tagging': 1,
            'ms_ip_migration_00000_customer_tagging': 1,
            'ms_p_abis_00000_customer_tagging': 1,
            'ms_multi_sector_00000_customer_tagging': 1,
            'ms_na_00000_customer_tagging': 1
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning': False,
    'hateoas' : False,
    'pagination' : False,
    'schema': custdelschema,
}

warehouse_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'warehouse_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning': False,
    'schema': warehouseschema,
}

warehouse_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'warehouse_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning': False,
    'schema': warehouseschema,
}

warehouse_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'warehouse_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [''],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [''],

    'versioning': False,
    'hateoas' : False,
    'schema': warehouseschema,
}

warehouse_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'warehouse_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'created_on_utc' : 0,
            'updated_on_utc' : 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [''],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [''],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': warehouseschema,
}

user_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'user',
	},
    'resource_methods': ['POST'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': userschema,
}

user_ref = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'user',
        'projection' : {
            'password': 0,
            'active': 0,
            'roles': 0,
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': userschema,
}

user_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'user',
        'projection' : {
            'password': 0,
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': userschema,
}

roles_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'role',
        'projection' : {
            'permissions': 0,
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas': False,
    'schema': roleschema,
}

roles_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'role',
        'projection' : {
            'permissions': 0,
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': roleschema,
}

prpo_data = {
	# We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=3000,must-revalidate',
    'cache_expires': 3000,
	
	'datasource' : {
		'source' : 'prpogrdata',
        'filter' : {'Request_Type' : {"$regex" : "PR"}},
        'projection' : {
            'Request_Type': 1,
            'RT_Request_ID': 1,
            'Quotation_Type': 1,
            'Quotation_Status': 1,
            'Customer': 1,
            'Project': 1,
            'NW': 1,
            'NW_Activity': 1,
            'Request_Delivery_Date': 1,
            'Requisitioner': 1,
            'PurchGrp': 1,
            'Site_ID': 1,
            'Header_Text': 1,
            'Site_Name': 1,
            'Payment_Milestone': 1,
            'GL_Account': 1,
            'Plant': 1,
            'Quotation': 1,
            'Material_Code': 1,
            'Qty': 1,
            'Price': 1,
            'Total_Amount': 1,
            'Currency': 1,
            'Vendor_Code': 1,
            'Vendor_Email': 1,
            'Approval_L1': 1,
            'Approval_L2': 1,
            'Approval_L3': 1,
            'Approval_L4': 1,
            'Approval_L5': 1,
            'Infor_Record': 1,
            'PO_Number': 1,
            'PO_Item': 1,
            'PO_Creation_Date': 1,
            'PR_Number': 1,
            'PR_Item': 1,
            'PR_Creation_Date': 1,
            'Item_Status': 1,
            'Work_Status': 1,
            'Approval_L1_Date': 1,
            'Approval_L2_Date': 1,
            'Approval_L3_Date': 1,
            'Approval_L4_Date': 1,
            'Approval_L5_Date': 1,
            'PO_Release_Date': 1,
            'Implementation_Id': 1,
            'Error_Message': 1,
            'Error_Type': 1,
            'Export_on_PDB': 1,
            'Import_on_PDB': 1,
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['GET', 'PATCH'],
    'versioning': False,
    'hateoas': False,

    'allowed_read_roles' : ['RT-API', 'BOT-API'],
    'allowed_write_roles' : ['RT-API'],
    'allowed_item_read_roles' : ['RT-API', 'BOT-API'],
    'allowed_item_write_roles' : ['RT-API', 'BOT-API'],

    'normalize_on_patch' : False,

    'schema': prposchema
}

gr_data = {
    'cache_control': 'max-age=3000,must-revalidate',
    'cache_expires': 3000,
	
	'datasource' : {
		'source' : 'prpogrdata',
        'filter' : {'Request_Type' : {"$regex" : "GR"}},
        'projection' : {
            'Request_Type': 1,
            'Plant': 1,
            'Quotation_Type': 1,
            'Quotation': 1,
            'PO_Number': 1,
            'PO_Item': 1,
            'PO_Qty': 1,
            'Required_GR_Qty': 1,
            'WCN_Link': 1,
            'GR_Document_No': 1,
            'GR_Document_Date': 1,
            'Item_Status': 1,
            'Work_Status': 1,
            'Export_on_PDB': 1,
            'Import_on_PDB': 1,
            'Error_Message': 1,
            'Error_Type': 1,
        },
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['GET', 'PATCH'],
    'versioning': False,
    'hateoas': False,
    
    'allowed_read_roles' : ['RT-API', 'BOT-API'],
    'allowed_write_roles' : ['RT-API'],
    'allowed_item_read_roles' : ['RT-API', 'BOT-API'],
    'allowed_item_write_roles' : ['RT-API', 'BOT-API'],

    'normalize_on_patch' : False,

    'schema': grschema
}

ordering_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'ordering_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'schema': orderingschema,
}

ordering_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'ordering_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas' : False,
    'schema': orderingschema,
}

ordering_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'ordering_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas' : False,
    'schema': orderingschema,
}

ordering_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'ordering_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': orderingschema,
}

ordering_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'ordering_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'hateoas' : False,
    'schema': orderingschema,
}

po_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'po_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'schema': poschema,
}

po_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'po_data',
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas' : False,
    'schema': poschema,
}

po_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'po_data',
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': poschema,
}

po_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'po_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': poschema,
}

activity_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'activity_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

    'versioning': False,
    'hateoas' : False,
    'schema': activityschema,
}

activity_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'activity_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'schema': activityschema,
}

activity_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'activity_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'pagination': False,
    'schema': activityschema,
}

activity_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'activity_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'schema': activityschema,
}

activity_del = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'activity_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'schema': activityschema,
}

flow_menu_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'flow_menu',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'schema': flowmenuschema,
}

flow_menu_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'flow_menu',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'schema': flowmenuschema,
}

flow_permission_view_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'flow_permission_view',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'versioning': False,
    'schema': flowpermissionviewschema,
}

flow_permission_view_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'flow_permission_view',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'schema': flowpermissionviewschema,
}

mrf_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'mrf_data',
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

    'versioning': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': mrfschema,
}

mrf_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'mrf_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

    'versioning': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': mrfschema,
}

mrf_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'mrf_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': mrfschema,
}

mrf_parent_list = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'mrf_data_2',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0,
            'parent_list' : 1
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST','GET'],
    'item_methods': ['GET', 'PATCH'],
    'allow_unknown' : True,
    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': mrfschema2,
}

mrf_total_qty = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'mrf_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'aggregation': {
            'pipeline': [
                {
                    '$match': {
                        'mr_properties.site_info.project_name': '$project_name', 
                        'mr_properties.site_info.site_id': '$site_id'
                    }
                }, {
                    '$unwind': {
                        'path': '$parent_list_hw'
                    }
                }, {
                    '$unwind': {
                        'path': '$parent_list_hw.details'
                    }
                }
            ]
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,

    'schema' : mrfschema,
}

info_scope_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'info_scope_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI'],

    'versioning': False,
    'hateoas' : False,
    'schema': infoscopeschema,
}

implementation_bom_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'implementation_bom_data',
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_write_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_item_write_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],

    'versioning': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': implementationbomschema,
}

implementation_bom_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'implementation_bom_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': implementationbomschema,
}

implementation_bom_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'implementation_bom_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI', 'RT-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': implementationbomschema,
}

implementation_bom_deletion = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'implementation_bom_data',
        'default_sort': [('_id', -1)],        
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'DELETE'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning': False,
    'hateoas' : False,
    #'allow_unknown': True,
    'schema': implementationbomschema,
}

allocation_item_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'allocation_item_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
    'versioning' : False,
    'schema' : allocationitemschemawithoutaudit,
}

allocation_item_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'allocation_item_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'schema' : allocationitemschema,
}

allocation_item_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'allocation_item_data',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination' : False,
    'schema' : allocationitemschema,
}

tssr_boq_matrix_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : tssrboqmatrixwithoutauditschema,
}

tssr_boq_matrix_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix',
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'schema' : tssrboqmatrixschema,
}

tssr_boq_matrix_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'pagination' : False,
    'schema' : tssrboqmatrixschema,
}

tssr_boq_matrix_deletion = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0,
            'qty_quotation_allocated' : 0,
            'smart_allocated' : 0,
            'ericsson_allocated' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'DELETE'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : tssrboqmatrixschema,
}

tssr_boq_matrix_sites_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : tssrboqmatrixsitesschema,
}

tssr_boq_matrix_sites_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0,
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : tssrboqmatrixsitesschema,
}

tssr_boq_matrix_sites_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_sites',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'pagination' : False,
    'schema' : tssrboqmatrixsitesschema,
}

tssr_boq_matrix_sites_total_qty = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'aggregation': {
            'pipeline': [
                {
                    '$match': {
                        'project_name': '$project_name', 
                        'site_id': '$site_id'
                    }
                }, {
                    '$unwind': {
                        'path': '$list_of_site_items', 
                        'includeArrayIndex': 'index_pp'
                    }
                }, {
                    '$lookup': {
                        'from': 'material_catalogue', 
                        'localField': 'list_of_site_items.pp_id', 
                        'foreignField': 'pp_id', 
                        'as': 'material_catalogue'
                    }
                }, {
                    '$unwind': {
                        'path': '$material_catalogue'
                    }
                }, {
                    '$group': {
                        '_id': '$material_catalogue._id', 
                        'pp_id': {
                            '$first': '$list_of_site_items.pp_id'
                        }, 
                        'pp_key': {
                            '$first': '$list_of_site_items.pp_key'
                        }, 
                        'package_name': {
                            '$first': '$list_of_site_items.package_name'
                        }, 
                        'pp_qty': {
                            '$first': '$list_of_site_items.qty'
                        }, 
                        'material_id': {
                            '$first': '$material_catalogue.material_id'
                        }, 
                        'material_name': {
                            '$first': '$material_catalogue.material_name'
                        }, 
                        'material_qty': {
                            '$first': '$material_catalogue.material_qty'
                        }, 
                        'index_pp': {
                            '$first': '$index_pp'
                        }
                    }
                }, {
                    '$sort': {
                        'index_pp': 1
                    }
                }, {
                    '$project': {
                        '_id': 1, 
                        'pp_id': 1, 
                        'pp_key': 1, 
                        'package_name': 1, 
                        'pp_qty': 1, 
                        'material_id': 1, 
                        'material_name': 1, 
                        'material_qty': 1, 
                        'index_pp': 1, 
                        'total_data': {
                            '$multiply': [
                                '$pp_qty', '$material_qty'
                            ]
                        }
                    }
                }
            ]
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,

    'schema' : tssrboqmatrixsitesschema,
}

delta_boq_tech_sites_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'delta_boq_technical_sites',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : deltaboqtechnicalsitesschema,
}

delta_boq_tech_sites_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'delta_boq_technical_sites',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['MittAppAPI'],
    'allowed_write_roles' : ['MittAppAPI'],
    'allowed_item_read_roles' : ['MittAppAPI'],
    'allowed_item_write_roles' : ['MittAppAPI'],

    'versioning' : False,
    'hateoas' : False,
    'schema' : deltaboqtechnicalsitesschema,
}

delta_boq_tech_sites_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'delta_boq_technical_sites',
        'default_sort': [('_id', -1)],
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0,
        },
        'filter' : {'deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    # 'allowed_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    # 'allowed_write_roles' : [],
    # 'allowed_item_read_roles' : ['MittAppAPI', 'IxtAppAPI'],
    # 'allowed_item_write_roles' : [],

    'versioning' : False,
    'hateoas' : False,
    'pagination' : False,
    'schema' : deltaboqtechnicalsitesschema,
}

ddl_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'ddl_data',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0,
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': ddlschema,
}

DOMAIN = {
    'bom_all' : bom_all, 
    'bom_all_sorted' : bom_all_sorted, 
    'bom_item_all' : bom_item_all, 
    'amountboqtech' : amountboqtech,
    'amountboqcomm' : amountboqcomm,
    'amountpp' : amountpp,
    'amountmc' : amountmc,
    'amountproject' : amountproject,
    'amountsite' : amountsite,
    'amounttssrboq' : amounttssrboq,
    'amountordering' : amountordering,
    'boq_comm_rev' : boq_comm_rev,
    'boq_comm_rev_all' : boq_comm_rev_all,
    'boq_comm_op' : boq_comm_op,
    'boq_comm_all' : boq_comm_all,
    'boq_comm_sorted' : boq_comm_sorted,
    'boq_comm_audit' : boq_comm_audit,
    'boq_comm_sorted_non_page' : boq_comm_sorted_non_page,
    'boq_comm_del' : boq_comm_del,
    'boq_comm_items_rev' : boq_comm_items_rev,
    'boq_comm_items_rev_all' : boq_comm_items_rev_all,
    'boq_comm_items_op' : boq_comm_items_op,
    'boq_comm_items_all' : boq_comm_items_all,
    'boq_comm_items_del' : boq_comm_items_del,
    'boq_comm_items_non_page' : boq_comm_items_non_page,
    'boq_comm_items_group_rev' : boq_comm_items_group_rev,
    'boq_comm_items_group_rev_all' : boq_comm_items_group_rev_all,
    'boq_comm_items_group_op' : boq_comm_items_group_op,
    'boq_comm_items_group_all' : boq_comm_items_group_all,
    'boq_comm_items_group_del' : boq_comm_items_group_del,
    'boq_comm_items_group_non_page' : boq_comm_items_group_non_page,
    'boq_tech_rev' : boq_tech_rev,
    'boq_tech_rev_all' : boq_tech_rev_all,
    'boq_tech_op' : boq_tech_op,
    'boq_tech_find_item_comm' : boq_tech_find_item_comm,
    'boq_tech_allin' : boq_tech_allin,
    'boq_tech_sorted' : boq_tech_sorted,
    'boq_tech_audit' : boq_tech_audit,
    'boq_tech_sorted_non_page' : boq_tech_sorted_non_page,
    'boq_tech_del' : boq_tech_del,
    'boq_tech_sites_rev' : boq_tech_sites_rev,
    'boq_tech_sites_rev_all' : boq_tech_sites_rev_all,
    'boq_tech_sites_op' : boq_tech_sites_op,
    'boq_tech_sites_all' : boq_tech_sites_all,
    'boq_tech_sites_del' : boq_tech_sites_del,
    'boq_tech_sites_non_page' : boq_tech_sites_non_page,
    'boq_tech_sites_sum_qty' : boq_tech_sites_sum_qty,
    'boq_tech_sites_po_number' : boq_tech_sites_po_number,
    'pp_rev' : pp_rev,
    'pp_rev_all' : pp_rev_all,
    'pp_op' : pp_op,
    'pp_all' : pp_all,
    'pp_sorted' : pp_sorted,
    'pp_audit' : pp_audit,
    'pp_sorted_non_page' : pp_sorted_non_page,
    'pp_del' : pp_del,
    'pp_non_page' : pp_non_page,
    'mc_rev' : mc_rev,
    'mc_rev_all' : mc_rev_all,
    'mc_op' : mc_op,
    'mc_all' : mc_all,
    'mc_sorted' : mc_sorted,
    'mc_audit' : mc_audit,
    'mc_sorted_non_page' : mc_sorted_non_page,
    'mc_del' : mc_del,
    'mc_non_page' : mc_non_page,
    'project_rev' : project_rev,
    'project_op' : project_op,
    'project_non_page' : project_non_page,
    'project_all' : project_all,
    'project_sorted' : project_sorted,
    'project_audit' : project_audit,
    'project_del' : project_del,
    'site_rev' : site_rev,
    'site_op' : site_op,
    'site_all' : site_all,
    'site_sorted' : site_sorted,
    'site_non_page' : site_non_page,
    'site_audit' : site_audit,
    'site_del' : site_del,
    'custdel_rev' : custdel_rev,
    'custdel_op' : custdel_op,
    'custdel_pk_only' : custdel_pk_only,
    'custdel_all' : custdel_all,
    'custdel_sorted' : custdel_sorted,
    'custdel_non_page' : custdel_non_page,
    'custdel_del' : custdel_del,
    'custdel_progress_ms' : custdel_progress_ms,
    'warehouse_op' : warehouse_op,
    'warehouse_all' : warehouse_all,
    'warehouse_sorted' : warehouse_sorted,
    'warehouse_sorted_non_page' : warehouse_sorted_non_page,
    'user_all' : user_all,
    'user_op' : user_op,
    'user_ref' : user_ref,
    'roles_all' : roles_all,
    'roles_non_page' : roles_non_page,
    'prpo_data' : prpo_data,
    'gr_data' : gr_data,
    'ordering_op' : ordering_op,
    'ordering_all' : ordering_all,
    'ordering_sorted' : ordering_sorted,
    'ordering_sorted_non_page' : ordering_sorted_non_page,
    'ordering_del' : ordering_del,
    'po_op' : po_op,
    'po_all' : po_all,
    'po_non_page' : po_non_page,
    'po_del' : po_del,
    'activity_op' : activity_op,
    'activity_all' : activity_all,
    'activity_sorted' : activity_sorted,
    'activity_non_page' : activity_non_page,
    'activity_del' : activity_del,
    'flow_menu_op' : flow_menu_op,
    'flow_menu_all' : flow_menu_all,
    'flow_permission_view_op' : flow_permission_view_op,
    'flow_permission_view_all' : flow_permission_view_all,
    'mrf_op' : mrf_op,
    'mrf_sorted' : mrf_sorted,
    'mrf_sorted_non_page' : mrf_sorted_non_page,
    'mrf_parent_list' : mrf_parent_list,
    'mrf_total_qty' : mrf_total_qty,
    'info_scope_sorted' : info_scope_sorted,
    'implementation_bom_op' : implementation_bom_op,
    'implementation_bom_sorted' : implementation_bom_sorted,
    'implementation_bom_sorted_non_page' : implementation_bom_sorted_non_page,
    'implementation_bom_deletion' : implementation_bom_deletion,
    'allocation_item_op' : allocation_item_op,
    'allocation_item_sorted' : allocation_item_sorted,
    'allocation_item_sorted_non_page' : allocation_item_sorted_non_page,
    'tssr_boq_matrix_op' : tssr_boq_matrix_op,
    'tssr_boq_matrix_sorted' : tssr_boq_matrix_sorted,
    'tssr_boq_matrix_sorted_non_page' : tssr_boq_matrix_sorted_non_page,
    'tssr_boq_matrix_deletion' : tssr_boq_matrix_deletion,
    'tssr_boq_matrix_sites_op' : tssr_boq_matrix_sites_op,
    'tssr_boq_matrix_sites_all' : tssr_boq_matrix_sites_all,
    'tssr_boq_matrix_sites_sorted_non_page' : tssr_boq_matrix_sites_sorted_non_page,
    'tssr_boq_matrix_sites_total_qty' : tssr_boq_matrix_sites_total_qty,
    'tssr_boq_matrix_rev' : tssr_boq_matrix_rev, 
    'tssr_boq_matrix_rev_all' : tssr_boq_matrix_rev_all, 
    'tssr_boq_matrix_sites_rev' : tssr_boq_matrix_sites_rev, 
    'tssr_boq_matrix_sites_rev_all' : tssr_boq_matrix_sites_rev_all,
    'delta_boq_tech_sites_op' : delta_boq_tech_sites_op,
    'delta_boq_tech_sites_sorted' : delta_boq_tech_sites_sorted,
    'delta_boq_tech_sites_sorted_non_page' : delta_boq_tech_sites_sorted_non_page,
    'ddl_non_page' : ddl_non_page
}
