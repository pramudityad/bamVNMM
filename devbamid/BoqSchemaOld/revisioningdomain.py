from revprojectschema import revprojectschema
from revsiteschema import revsiteschema
from revproductpackageschema import revproductpackageschema
from revmaterialcatalogueschema import revmaterialcatalogueschema
from revboqtechnicalschema import revboqtechnicalschema
from revboqtechnicalsiteschema import revboqtechnicalsiteschema
from revboqcommercialschema import revboqcommercialschema
from revboqcommercialitemschema import revboqcommercialitemschema
from revboqcommercialitemgroupschema import revboqcommercialitemgroupschema
from revcustdelschema import revcustdelschema
from revtssrboqmatrixschema import revtssrboqmatrixschema
from revtssrboqmatrixsitesschema import revtssrboqmatrixsitesschema

project_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_data_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revprojectschema,
}

site_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'site_data_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revsiteschema,
}

pp_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning': False,
    'schema': revproductpackageschema,
}

pp_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'product_package_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning': False,
    'schema': revproductpackageschema,
}

mc_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'Deleted' : 0}
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning': False,
    'pagination': False,
    'schema': revmaterialcatalogueschema,
}

mc_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'material_catalogue_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
        'filter' : {'Deleted' : 0}
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning': False,
    'schema': revmaterialcatalogueschema,
}

boq_tech_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revboqtechnicalschema,
}

boq_tech_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'schema' : revboqtechnicalschema,
}

boq_tech_sites_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revboqtechnicalsiteschema,
}

boq_tech_sites_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_technical_sites_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination': False,
    'schema' : revboqtechnicalsiteschema,
}

boq_comm_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revboqcommercialschema,
}

boq_comm_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'schema' : revboqcommercialschema,
}

boq_comm_items_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revboqcommercialitemschema,
}

boq_comm_items_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination': False,
    'schema' : revboqcommercialitemschema,
}

boq_comm_items_group_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_group_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revboqcommercialitemgroupschema,
}

boq_comm_items_group_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'boq_commercial_item_group_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'schema' : revboqcommercialitemgroupschema,
}

custdel_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'custdel_data_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning': False,
    'schema': revcustdelschema,
}

tssr_boq_matrix_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revtssrboqmatrixschema
}

tssr_boq_matrix_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'schema' : revboqtechnicalschema,   
}

tssr_boq_matrix_sites_rev = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_sites_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PUT', 'PATCH', 'GET'],
    'versioning' : False,
    'schema' : revtssrboqmatrixsitesschema,
}

tssr_boq_matrix_sites_rev_all = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'tssr_boq_matrix_sites_revision',
        'projection' : {
            'created_by': 0,
            'updated_by': 0,
            'deleted' : 0
        },
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
    'versioning' : False,
    'pagination': False,
    'schema' : revtssrboqmatrixsitesschema,
}