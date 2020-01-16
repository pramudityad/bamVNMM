from prpogrschema import prpogrschema
from vendorschema import vendor_schema
from bastschema import bastschema
from bastlogschema import bastlogschema
from userschema import userschema
from roleschema import roleschema

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

X_DOMAINS = ['http://localhost:3000', 'http://localhost:3010']

X_HEADERS = ['Content-Type', 'If-Match', 'Authorization']

ALLOWED_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_READ_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_WRITE_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_ITEM_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_ITEM_READ_ROLES = ['Admin', 'PDB-Dash']

ALLOWED_ITEM_WRITE_ROLES = ['Admin', 'PDB-Dash']

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
            'BSAT_No' : 1, 
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
            'Bast_ID': 1,
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
            'Bast_ID': 1,
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
    'allowed_item_read_roles' : ['Bast-API'],

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
    'allowed_item_read_roles' : ['Bast-API'],


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
    'allowed_item_read_roles' : ['Bast-API'],


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
    'allowed_item_read_roles' : ['Bast-API'],

    'versioning': False,
    'hateoas': False,
    'pagination': False,
    'schema': userschema,
}

DOMAIN = {
    'vendor_data' : vendor_data, 
    'prpo_data' : prpo, 
    'gr_data' : gr,
    'assignment_data_op' : assignment_data_op,
    'assignment_data_sorted' : assignment_data_sorted,
    'bast_data_op' : bast_data_op,
    'bast_data_sorted' : bast_data_sorted,
    'bast_log_data_op' : bast_log_data_op,
    'bast_log_data_sorted' : bast_log_data_sorted,
    'user_all' : user_all,
    'user_ref' : user_ref,
    'roles_all' : roles_all,
    'roles_non_page' : roles_non_page,
}