bom_item_schema = {
	'Id_BOM' : {
		'type' : 'objectid',
		'required' : True,
	},
	'Denominaton' : {
		'type' : 'string',
		'nullable' : True
	},
	'Product_Description' : {
		'type' : 'string',
		'nullable' : True
	},
	'Priority' : {
		'type' : 'string',
		'nullable' : True
	},
	'Product_Code' : {
		'type' : 'string',
		'nullable' : True
	},
	'Qty' : {
		'type' : 'float',
		'nullable' : True
	},
	'Qty_Customer' : {
		'type' : 'float',
		'nullable' : True
	},
	'Qty_Technical' : {
		'type' : 'float',
		'nullable' : True
	},
	'Qty_Available' : {
		'type' : 'float',
		'nullable' : True
	},
	'UOM' : {
		'type' : 'string',
		'nullable' : True
	},
	'SAP_Code' : {
		'type' : 'string',
		'nullable' : True
	},
	'Parent_Child' : {
		'type' : 'string',
		'nullable' : True
	},
	'System' : {
		'type' : 'string',
		'nullable' : True
	},
	'Type' : {
		'type' : 'string',
		'nullable' : True
	},
    'created_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'created_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True
	},
}