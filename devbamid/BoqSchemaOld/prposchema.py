prposchema = {
	'RT_Request_ID' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Request_Type' : {
		'type' : 'string',
		'required' : True,
		'allowed' : ['New PR-PO','Pending PR-PO'],
		'empty' : False
	},
	'Quotation_Type' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Quotation_Status' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None,
	},
	'Customer' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Project' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'NW' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'NW_Activity' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Request_Delivery_Date' : {
		'type' : 'datetime',
		'required' : True,
	},
	'Requisitioner' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'PurchGrp' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Site_ID' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Site_Name' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Header_Text' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Payment_Milestone' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'GL_Account' : {
		'type' : 'string',
		'default' : None,
		'nullable' : True,
	},
	'Plant' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Quotation' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Material_Code' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Qty' : {
		'type' : 'float',
		'required' : True,
	},
	'Price' : {
		'type' : 'float',
		'required' : True,
	},
	'Total_Amount' : {
		'type' : 'float',
		'required' : True,
	},
	'Currency' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Vendor_Code' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Vendor_Email' : {
		'type' : 'string',
		'default' : '',
	},
	'Approval_L1' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Approval_L2' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Approval_L3' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Approval_L4' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Approval_L5' : {
		'type' : 'string',
		'nullable' : True,
	},
	'Infor_Record' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'PO_Number' : {
		'type' : 'string',
		'default' : '',
	},
	'PO_Item' : {
		'type' : 'string',
		'default' : '',
	},
	'PO_Creation_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'PR_Number' : {
		'type' : 'string',
		'default' : '',
	},
	'PR_Item' : {
		'type' : 'string',
		'default' : '',
	},
	'PR_Creation_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'PO_Qty' : {
		'type' : 'float',
		'nullable' : True,
	},
	'Required_GR_Qty' : {
		'type' : 'float',
		'nullable' : True,
	},
	'WCN_Link' : {
		'type' : 'string',
		'nullable' : True,
	},
	'GR_Document_No' : {
		'type' : 'string',
		'nullable' : True,
	},
	'GR_Document_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Item_Status' : {
		'type' : 'string',
		'required' : True,
		'empty' : False
	},
	'Work_Status' : {
		'type' : 'string',
		'required' : True,
		'default' : 'Waiting for PR-PO creation',
	},
	'Approval_L1_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'Approval_L2_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'Approval_L3_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'Approval_L4_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'Approval_L5_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'PO_Release_Date' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'Implementation_Id' : {
		'type' : 'string',
		'required' : True,
		'nullable' : True,
	},
	'Error_Message' : {
		'type' : 'string',
		'nullable' : True,
		'default' : '',
	},
	'Error_Type' : {
		'type' : 'string',
		'nullable' : True,
		'default' : '',
	},
	'Export_on_PDB' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'Import_on_PDB' : {
		'type' : 'datetime',
		'nullable' : True,
		'default' : None,
	},
	'created_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'created_by' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	},
	'updated_by' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None
	}
}