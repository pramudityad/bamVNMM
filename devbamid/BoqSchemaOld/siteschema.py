siteschema = {
	'site_id' : {
		'type' : 'string',
		'required' : True,
        'nullable' : False,
	},
	'site_name' : {
		'type' : 'string',
		'required' : True,
		'nullable' : False,
	},
	'longitude' : {
		'type' : 'string',
		'nullable' : True,
	},
	'latitude' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_customerarea_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'customer_area' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_province_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'province' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_city_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'city' : {
		'type' : 'string',
		'nullable' : True,
	},
	'address' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_site_type' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'site_type' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_searchringstatus_type' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'search_ring_status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_lessortype_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'lessor_type' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_landclass_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'land_classification' : {
		'type' : 'string',
		'nullable' : True,
	},
	'lessor_name' : {
		'type' : 'string',
		'nullable' : True,
	},
	'lessor_contact' : {
		'type' : 'string',
		'nullable' : True,
	},
	'distance_from_nominal_in_meter' : {
		'type' : 'float',
		'nullable' : True,
	},
	'id_candidatestatus_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'candidate_status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_towertype_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'tower_type' : {
		'type' : 'string',
		'nullable' : True,
	},
	'tower_height_in_meter' : {
		'type' : 'float',
		'nullable' : True,
	},
	'id_pps_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'permanent_power_solution' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_ec_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'electrical_cooperative' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_tps_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'temporary_power_supplier' : {
		'type' : 'string',
		'nullable' : True,
	},
	'tx_readiness_status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'tx_readiness_remarks' : {
		'type' : 'string',
		'nullable' : True,
	},
	'tx_readiness_plan_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tx_readiness_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ac_dc_power_status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'ac_dc_power_remarks' : {
		'type' : 'string',
		'nullable' : True,
	},
	'ac_dc_power_plan_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ac_dc_power_actual_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tower_status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'tower_remarks' : {
		'type' : 'string',
		'nullable' : True,
	},
	'tower_plan_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tower_actual_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'access_status' : {
		'type' : 'string',
		'nullable' : True,
	},
	'access_remarks' : {
		'type' : 'string',
		'nullable' : True,
	},
	'access_plan_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'access_actual_date' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'deleted' : {
		'type' : 'integer',
		'default': 0,
		'nullable' : True,
	},
	'created_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'created_by' : {
		'type' : 'objectid',
		'nullable' : True,
		'data_relation':{
			'resource' : 'user_ref',
			'field': '_id',
			'embeddable': True
		},
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True,
		'data_relation':{
			'resource' : 'user_ref',
			'field': '_id',
			'embeddable': True
		},
	},
}