custdel_item_schema = {
	'Id_Item' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : True
	},
	'Id_CD' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : True
	},
	'Id_BOM' : {
		'type' : 'objectid',
		'required' : True,
		'nullable' : True
	},
	'Qty' : {
		'type' : 'float',
		'nullable' : True
	},
	'Status' : {
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