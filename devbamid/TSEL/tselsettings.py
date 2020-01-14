from prpogrschema import prpogrschema
from vendorschema import vendor_schema
from bastschema import bastschema
from bastlogschema import bastlogschema
from assignmentbastmapschema import assignmentbastmapschema
from uservendormapschema import uservendormapschema
from amountdataschema import amount_data_schema
from userschema import userschema
from roleschema import roleschema
from siteschema import siteschema
from projectschema import projectschema
from custdelschema import custdelschema
from ssowschema import ssowschema
from aspassignmentschema import aspassignmentschema
from ssowactivitynumberschema import ssowactivitynumberschema

MONGO_HOST = '10.0.0.11'
MONGO_PORT = 27017

# Skip these if your db has no auth. But it really should.
MONGO_USERNAME = 'admintseldev'
MONGO_PASSWORD = '8gwtXCZsPA4F'

MONGO_DBNAME = 'devtselpdb'

URL_PREFIX = 'tselpdbapi'

RESOURCE_METHODS = ['GET', 'POST']

MONGO_QUERY_BLACKLIST = ['$where']

ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

EXTENDED_MEDIA_INFO = ['content_type', 'name', 'length']

RETURN_MEDIA_AS_URL = True

MEDIA_ENDPOINT = 'datafiles'

OPLOG = True

DATE_CREATED = 'created_on'

LAST_UPDATED = 'updated_on'

OPLOG_AUDIT = True

RETURN_MEDIA_AS_BASE64_STRING = False

PAGINATION_DEFAULT = 25

PAGINATION_LIMIT = 100

X_DOMAINS = ['http://localhost:3000', 'http://52.230.4.218:5002', 'http://localhost:3005', 'https://smart.pdb-flow.e-dpm.com', 'https://smart.e-dpm.com', 'https://ops.e-dpm.com', 'https://test.ops.e-dpm.com', 'https://mittapp.com']

X_HEADERS = ['Content-Type', 'If-Match', 'Authorization']

ALLOWED_ROLES = ['Admin', 'PDB-Dash', 'BAM-API']

ALLOWED_READ_ROLES = ['Admin', 'PDB-Dash', 'BAM-API']

ALLOWED_WRITE_ROLES = ['Admin', 'PDB-Dash', 'BAM-API']

ALLOWED_ITEM_ROLES = ['Admin', 'PDB-Dash', 'BAM-API']

ALLOWED_ITEM_READ_ROLES = ['Admin', 'PDB-Dash', 'BAM-API']

ALLOWED_ITEM_WRITE_ROLES = ['Admin', 'PDB-Dash', 'BAM-API']

amountbast = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'amount_data',
        'projection' : {
            'bast_data' : 1
        }
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

	'versioning' : False,
    'schema' : amount_data_schema
}

vendor_data = {
	# We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'vendor_data',
        'projection' : {
                'Vendor_Code': 1,
                'Name': 1,
                'Email': 1,
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],

    'allowed_read_roles' : ['BOTPRPO-API'],
    'allowed_item_read_roles' : ['BOTPRPO-API'],
    'allowed_item_write_roles' : ['BOTPRPO-API'],

    'schema': vendor_schema
}

vendor_data_non_page = {
	# We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'vendor_data',
        'projection' : {
                'Vendor_Code': 1,
                'Name': 1,
                'Email': 1,
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['BOTPRPO-API'],
    'allowed_item_read_roles' : ['BOTPRPO-API'],
    'allowed_item_write_roles' : ['BOTPRPO-API'],

    'hateoas': False,
    'versioning' : False,
    'pagination' : False,

    'schema': vendor_schema
}


gr = {
	# We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'prpo_gr_data',
        'filter' : {'Request_Type' : {"$regex" : "gr", "$options" : "i"}},
        'projection' : {
            'Plant' : 1, 
            'Request_Type' : 1, 
            'Assignment_No' : 1, 
            'Account_Name' : 1, 
            'Requestor' : 1, 
            'BAST_No' : 1, 
            'PO_Number' : 1, 
            'PO_Item' : 1, 
            'PO_Qty' : 1, 
            'Payment_Term_Ratio' : 1, 
            'Required_GR_Qty' : 1,
            'GR_Document_No' : 1,
            'GR_Document_Date' : 1, 
            'GR_Document_Qty' : 1,
            'Error_Message' : 1, 
            'Error_Type' : 1, 
            'Item_Status' : 1, 
            'Work_Status' : 1
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['BOTPRPO-API'],
    'allowed_item_read_roles' : ['BOTPRPO-API'],
    'allowed_item_write_roles' : ['BOTPRPO-API'],

    'schema': prpogrschema
}

prpo = {
	# We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'prpo_gr_data',
        'filter' : {'Request_Type' : {"$regex" : "pr", "$options" : "i"}},
        'projection' : {
            'Request_Type' : 1, 
            'Assignment_No' : 1, 
            'Account_Name' : 1, 
            'ASP_Acceptance_Date' : 1,
            'Info_Area_XL' : 1,  
            'Project' : 1, 
            'SOW_Type' : 1, 
            'Plant' : 1, 
            'NW' : 1, 
            'NW_Activity' : 1, 
            'Requisitioner' : 1, 
            'Service_No' : 1, 
            'Service_Price' : 1, 
            'Service_Qty' : 1, 
            'Site_Name_Tracking_Number' : 1, 
            'Short_Text' : 1, 
            'Vendor_Code' : 1, 
            'Vendor_Name' : 1, 
            'Vendor_Email' : 1, 
            'Head_Text' : 1, 
            'Long_Text' : 1, 
            'Payment_Terms' : 1, 
            'PR_for_ASP' : 1, 
            'PO_Number' : 1, 
            'PO_Item' : 1, 
            'PO_Qty' : 1, 
            'WCN_Link' : 1,
            'Error_Type' : 1, 
            'Error_Message' : 1, 
            'Item_Status' : 1, 
            'Work_Status' : 1, 
            'Approval_L1' : 1, 
            'Approval_L2' : 1,
            'Approval_L1_Date' : 1, 
            'Approval_L2_Date' : 1,
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['BOTPRPO-API'],
    'allowed_item_read_roles' : ['BOTPRPO-API'],
    'allowed_item_write_roles' : ['BOTPRPO-API'],

    'schema': prpogrschema
}

asp_assignment_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'asp_assignment_data',
        'filter' : {'deleted' : 0},
        'projection' : {
            'deleted' : 0        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['GET', 'PATCH'],

    'hateoas': False,
    'versioning' : False,

    'schema': aspassignmentschema
}

asp_assignment_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'asp_assignment_data',
        'filter' : {'deleted' : 0},
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,

    'schema': aspassignmentschema
}

asp_assignment_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'asp_assignment_data',
        'filter' : {'deleted' : 0},
        'default_sort': [('_id', -1)],
        'projection' : {
            'deleted' : 0        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,
    'pagination' : False,

    'schema': aspassignmentschema
}


assignment_data_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'prpo_gr_data',
        'filter' : {'Request_Type' : {"$regex" : "PR"}},
        'projection' : {
            'Request_Type' : 1, 
            'Assignment_No' : 1, 
            'Account_Name' : 1, 
            'ASP_Acceptance_Date' : 1,
            'Info_Area_XL' : 1,  
            'Project' : 1, 
            'SOW_Type' : 1, 
            'Plant' : 1, 
            'NW' : 1, 
            'NW_Activity' : 1, 
            'Requisitioner' : 1, 
            'Service_No' : 1, 
            'Service_Price' : 1, 
            'Service_Qty' : 1, 
            'Site_Name_Tracking_Number' : 1, 
            'Short_Text' : 1, 
            'Vendor_Code' : 1, 
            'Vendor_Name' : 1, 
            'Vendor_Email' : 1, 
            'Head_Text' : 1, 
            'Long_Text' : 1, 
            'Payment_Terms' : 1, 
            'PR_for_ASP' : 1, 
            'PO_Number' : 1, 
            'PO_Item' : 1, 
            'PO_Qty' : 1, 
            'WCN_Link' : 1,
            'Error_Type' : 1, 
            'Error_Message' : 1, 
            'Item_Status' : 1, 
            'Work_Status' : 1, 
            'Approval_L1' : 1, 
            'Approval_L2' : 1,
            'Approval_L1_Date' : 1, 
            'Approval_L2_Date' : 1,
            'SH_ID': 1,
            'Site_Name': 1,
            'Assignment_Creation_Date': 1,
            'PO_Creation_Date': 1,
            'PR_Creation_Date': 1,
            'Assignment_Ready_for_Bast': 1,
            'Value_Assignment': 1,
            'Assignment_Cancel': 1
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET', 'PATCH'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': prpogrschema
}

assignment_data_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'prpo_gr_data',
        'default_sort': [('_id', -1)],
        'filter' : {
            'Request_Type' : {"$regex" : "PR"}
        },
        'projection' : {
            'Request_Type' : 1, 
            'Assignment_No' : 1, 
            'Account_Name' : 1, 
            'ASP_Acceptance_Date' : 1,
            'Info_Area_XL' : 1,  
            'Project' : 1, 
            'SOW_Type' : 1, 
            'Plant' : 1, 
            'NW' : 1, 
            'NW_Activity' : 1, 
            'Requisitioner' : 1, 
            'Service_No' : 1, 
            'Service_Price' : 1, 
            'Service_Qty' : 1, 
            'Site_Name_Tracking_Number' : 1, 
            'Short_Text' : 1, 
            'Vendor_Code' : 1, 
            'Vendor_Name' : 1, 
            'Vendor_Email' : 1, 
            'Head_Text' : 1, 
            'Long_Text' : 1, 
            'Payment_Terms' : 1, 
            'PR_for_ASP' : 1, 
            'PO_Number' : 1, 
            'PO_Item' : 1, 
            'PO_Qty' : 1, 
            'WCN_Link' : 1,
            'Error_Type' : 1, 
            'Error_Message' : 1, 
            'Item_Status' : 1, 
            'Work_Status' : 1, 
            'Approval_L1' : 1, 
            'Approval_L2' : 1,
            'Approval_L1_Date' : 1, 
            'Approval_L2_Date' : 1,
            'SH_ID': 1,
            'Site_Name': 1,
            'Assignment_Creation_Date': 1,
            'PO_Creation_Date': 1,
            'PR_Creation_Date': 1,
            'Assignment_Ready_for_Bast': 1,
            'Value_Assignment': 1,
            'Assignment_Cancel': 1
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': prpogrschema
}

bast_data_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'bast_data',
        'filter' : {
            'deleted' : 0
        },
        'projection' : {
            'created_by' : 0, 
            'updated_by' : 0, 
            'deleted' : 0,
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET', 'POST'],
    'item_methods': ['GET', 'PATCH'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': bastschema
}

bast_data_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'bast_data',
        'default_sort': [('_id', -1)],
        'filter' : {
            'deleted' : 0
        },
        'projection' : {
            'created_by' : 0, 
            'updated_by' : 0, 
            'deleted' : 0,
        }
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET', 'POST'],
    'item_methods': ['GET', 'PATCH'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': bastschema
}

bast_log_data_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'bast_log_data'
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET', 'POST'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': bastlogschema
}

bast_log_data_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'bast_log_data',
        'default_sort': [('_id', -1)],
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET', 'POST'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': bastlogschema
}

assignment_bast_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'assignment_bast_data',
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET', 'POST'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : ['Bast-API'],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : ['Bast-API'],

    'schema': assignmentbastmapschema
}

assignment_bast_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
	
	'datasource' : {
		'source' : 'assignment_bast_data',
        'default_sort': [('_id', -1)],
	},

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'hateoas': False,
    'versioning' : False,

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

    'schema': assignmentbastmapschema
}

user_vendor_map_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'user_vendor_map'
	},
    'resource_methods': ['GET', 'POST'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas': False,
    'schema': uservendormapschema,
}

user_vendor_map_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'user_vendor_map',
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas': False,
    'schema': uservendormapschema,
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

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

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

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

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

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': roleschema,
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

    'allowed_read_roles' : ['Bast-API'],
    'allowed_write_roles' : [],
    'allowed_item_read_roles' : ['Bast-API'],
    'allowed_item_write_roles' : [],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': userschema,
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
    'extra_response_fields' : ['site_id'],
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

    'versioning' : False,
    'hateoas' : False,
    'schema' : siteschema,
}

site_sorted_non_page = {
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

project_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_tsel',
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
    'schema' : projectschema,
}

project_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_tsel',
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
    'hateoas' : False,
    'schema' : projectschema,
}

project_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'project_tsel',
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
    'hateoas' : False,
    'schema' : projectschema,
}

custdel_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'cust_del_tsel',
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
    'versioning': False,
    'hateoas' : False,
    'schema': custdelschema,
}

custdel_sorted_non_page = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource': {
		'source': 'cust_del_tsel',
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

    'versioning': False,
    'pagination': False,
    'hateoas' : False,
    'schema': custdelschema,
}

ssow_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'ssow_data',
        'filter' : {
            'deleted' : 0
        },
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : ssowschema
}

ssow_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'ssow_data',
        'filter' : {
            'deleted' : 0
        },
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : ssowschema
}

ssow_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'ssow_data',
        'filter' : {
            'deleted' : 0
        },
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
    'schema' : ssowschema
}

ssow_activity_number_op = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'ssow_activity_number',
        'filter' : {
            'deleted' : 0
        },
        'projection' : {
            'deleted' : 0
        }
	},
    'resource_methods': ['POST', 'GET'],
    'item_methods': ['PATCH', 'GET'],
	'versioning' : False,
    'schema' : ssowactivitynumberschema
}

ssow_activity_number_sorted = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'ssow_activity_number',
        'filter' : {
            'deleted' : 0
        },
        'projection' : {
            'deleted' : 0
        },
        'default_sort': [('_id', -1)],
	},
    'resource_methods': ['GET'],
    'item_methods': ['GET'],
	'versioning' : False,
    'schema' : ssowactivitynumberschema
}

ssow_activity_number_sorted_nonpage = {
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    'datasource' : {
		'source' : 'ssow_activity_number',
        'filter' : {
            'deleted' : 0
        },
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
    'schema' : ssowactivitynumberschema
}


DOMAIN = {
    'amountbast' : amountbast,
    'vendor_data' : vendor_data, 
    'vendor_data_non_page' : vendor_data_non_page, 
    'prpo_data' : prpo, 
    'gr_data' : gr,
    'user_all' : user_all,
    'user_ref' : user_ref,
    'roles_all' : roles_all,
    'roles_non_page' : roles_non_page,
    'site_op' : site_op,
    'site_sorted' : site_sorted,
    'site_sorted_non_page' : site_sorted_non_page,
    'project_op' : project_op,
    'project_sorted' : project_sorted,
    'project_sorted_non_page' : project_sorted_non_page,
    'custdel_op' : custdel_op,
    'custdel_sorted_non_page' : custdel_sorted_non_page,
    'asp_assignment_op' : asp_assignment_op,
    'asp_assignment_sorted' : asp_assignment_sorted,
    'asp_assignment_sorted_non_page' : asp_assignment_sorted_non_page,
    'ssow_op': ssow_op,
    'ssow_sorted': ssow_sorted,
    'ssow_sorted_nonpage': ssow_sorted_nonpage,
    'ssow_activity_number_op': ssow_activity_number_op,
    'ssow_activity_number_sorted': ssow_activity_number_sorted,
    'ssow_activity_number_sorted_nonpage': ssow_activity_number_sorted_nonpage
}