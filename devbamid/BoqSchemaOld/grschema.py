grschema = {
	'RT_Request_ID' : {
		'type' : 'string',
		'required' : True,
	},
    'Request_Type' : {
		'type' : 'string',
		'required' : True,
		'allowed' : ['New GR','Pending GR']
	},
	'Quotation_Type' : {
		'type' : 'string',
		'required' : True,
	},
	'Quotation_Status' : {
		'type' : 'string',
		'nullable' : True,
		'default' : None,
	},
	'Customer' : {
		'type' : 'string',
        'default' : None
	},
	'Project' : {
		'type' : 'string',
		'default' : None
	},
	'NW' : {
		'type' : 'string',
		'default' : None
	},
	'NW_Activity' : {
		'type' : 'string',
		'default' : None
	},
	'Request_Delivery_Date' : {
		'type' : 'datetime',
		'default' : None
	},
	'Requisitioner' : {
		'type' : 'string',
		'default' : None
	},
	'PurchGrp' : {
		'type' : 'string',
		'default' : None
	},
	'Site_ID' : {
		'type' : 'string',
		'default' : None
	},
	'Header_Text' : {
		'type' : 'string',
		'default' : None
	},
	'Site_Name' : {
		'type' : 'string',
		'default' : None
	},
	'Payment_Milestone' : {
		'type' : 'string',
		'default' : None
	},
	'GL_Account' : {
		'type' : 'string',
		'default' : None
	},
	'Plant' : {
		'type' : 'string',
		'required' : True,
	},
	'Quotation' : {
		'type' : 'string',
		'required' : True,
	},
	'Material_Code' : {
		'type' : 'string',
		'default' : None
	},
	'Qty' : {
		'type' : 'float',
		'default' : None
	},
	'Price' : {
		'type' : 'float',
		'default' : None
	},
	'Total_Amount' : {
		'type' : 'float',
		'default' : None
	},
	'Currency' : {
		'type' : 'string',
		'default' : None
	},
	'Vendor_Code' : {
		'type' : 'string',
		'default' : None
	},
	'Vendor_Email' : {
		'type' : 'string',
		'default' : None
	},
	'Request_Delivery_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Approval_L1' : {
		'type' : 'string',
		'nullable' : True,
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
		'nullable' : True,
	},
	'PO_Number' : {
		'type' : 'string',
		'required' : True,
	},
	'PO_Item' : {
		'type' : 'string',
		'required' : True,
	},
	'PO_Qty' : {
		'type' : 'float',
		'required' : True,
	},
	'Required_GR_Qty' : {
		'type' : 'float',
		'required' : True,
	},
	'WCN_Link' : {
		'type' : 'string',
		'required' : True,
	},
	'GR_Document_No' : {
		'type' : 'string',
		'default' : '',
	},
	'GR_Document_Date' : {
		'type' : 'datetime',
		'default' : None,
	},
	'Item_Status' : {
		'type' : 'string',
		'required' : True,
	},
	'Work_Status' : {
		'type' : 'string',
		'default' : 'Waiting for GR',
	},
	'PO_Creation_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Approval_L1_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Approval_L2_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Approval_L3_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Approval_L4_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'Approval_L5_Date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'PO_Release_Date' : {
		'type' : 'datetime',
		'default' : None,
	},
	'Error_Message' : {
		'type' : 'string',
		'default' : '',
	},
	'Error_Type' : {
		'type' : 'string',
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
	},
	'updated_by' : {
		'type' : 'string',
		'nullable' : True,
	}
}