custdelschema = {
    'cd_id' : {
		'type' : 'string',
		'required' : True,
		'unique' : True,
	},
	'id_project_doc' : {
		'type' : 'objectid',
		'required' : True,
		'data_relation':{
			'resource' : 'project_sorted',
			'field': '_id',
			'embeddable': True
		},
	},
	'project_name' : {
		'type' : 'string',
		'required' : True,
	},
	'project_year' : {
		'type' : 'string',
		'required' : True,
	},
	'id_site_doc' : {
		'type' : 'objectid',
		'required' : True,
		'data_relation':{
			'resource' : 'site_sorted',
			'field': '_id',
			'embeddable': True
		},
	},
	'site_id' : {
		'type' : 'string',
		'required' : True,
	},
	'site_name' : {
		'type' : 'string',
		'required' : True,
	},
	'customer_area' : {
		'type' : 'string',
		'required' : True,
	},
	'province' : {
		'type' : 'string',
		'required' : True,
	},
	'address' : {
		'type' : 'string',
		'required' : True,
	},
	'city' : {
		'type' : 'string',
		'required' : True,
	},
	'status' : {
		'type' : 'string',
		'required' : True,
	},
	'id_info_scope_doc' : {
		'type' : 'objectid',
		'nullable' : True,
		'data_relation':{
			'resource' : 'info_scope_sorted',
			'field': '_id',
			'embeddable': True
		},
	},
	'im_responsible' : {
		'type' : 'string',
		'nullable' : True,
	},
	'ie_responsible' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_bands_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'bands' : {
		'type' : 'string',
		'nullable' : True,
	},
	'id_carrier_doc' : {
		'type' : 'objectid',
		'nullable' : True,
	},
	'ixt_sync_st' : {
		'type' : 'boolean',
	},
	'carrier' : {
		'type' : 'string',
		'nullable' : True,
	},
	'material_pull_out_from_warehouse_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_pull_out_from_warehouse_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_pull_out_from_warehouse_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_on_site_first_delivery_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_on_site_first_delivery_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_on_site_first_delivery_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_on_site_complete_delivery_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_on_site_complete_delivery_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_on_site_complete_delivery_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_ce_expansion_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_ce_expansion_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_ce_expansion_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_g1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_g1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_g1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_g900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_g900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_g900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l1800_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l1800_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l1800_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l1800c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l1800c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l1800c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l700_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l700_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l700_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u900c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u900c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u900c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w900_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w900_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w900_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_ip_migration_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_ip_migration_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_ip_migration_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2300c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_l2600c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_pabis_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_pabis_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_pabis_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_u850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w850_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w850_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w850_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_survey_undertaken_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_survey_undertaken_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_survey_undertaken_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tssr_submitted_to_smart_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tssr_submitted_to_smart_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tssr_submitted_to_smart_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tssr_approved_by_smart_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tssr_approved_by_smart_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'tssr_approved_by_smart_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'prepat_passed_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'prepat_passed_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'prepat_passed_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'pat_undertaken_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'pat_undertaken_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'pat_undertaken_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'pat_passed_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'pat_passed_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'pat_passed_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_start_w850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'installation_finish_w850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_readiness_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_readiness_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'material_readiness_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ready_for_installation_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ready_for_installation_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ready_for_installation_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'lacking_material_delivery_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'lacking_material_delivery_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'lacking_material_delivery_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_start_w850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'integration_finish_w850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'ft_complete_w850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'site_unlocked_w850c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100c2_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100c3_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100c3_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w2100c3_actual' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w850c2_baseline' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w850c2_forecast' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'rfs_w850c2_actual' : {
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
	},
	'updated_on' : {
		'type' : 'datetime',
		'nullable' : True,
	},
	'updated_by' : {
		'type' : 'objectid',
		'nullable' : True,
	},
}