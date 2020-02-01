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
	'site_status' : {
		'type' : 'string',
		'required' : True,
	},
	'im_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ie_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'cpm_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'lsp_responsible_initial': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'lsp_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'asp_responsible_initial': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'asp_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'mp_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'integrator_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'site_spv_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'document_controller_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'pp_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'rnd_responsible': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'number_of_implementation_bom': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'number_of_mrf': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'number_of_scope': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'po_scope': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'customer_prioritization_critical_sites': {
        'type': 'string',
        'nullable': True
    }, 
    'customer_prioritization_no_lte': {
        'type': 'string',
        'nullable': True
    }, 
    'customer_prioritization_ftk': {
        'type': 'string',
        'nullable': True
    }, 
    'customer_prioritization_sncr': {
        'type': 'string',
        'nullable': True
    }, 
    'customer_prioritization_sea_games': {
        'type': 'string',
        'nullable': True
    },
    'ms_17000_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17000_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17000_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17000_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17500_sfac_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17500_sfac_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17500_sfac_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17500_sfac_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17600_sfac_approved_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17600_sfac_approved_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17600_sfac_approved_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_17600_sfac_approved_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_18000_pac_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_18000_pac_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_18000_pac_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_18000_pac_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_19000_fac_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_19000_fac_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_19000_fac_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_19000_fac_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2600_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2300_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2100_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l1800_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l850_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l700_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u2100_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u900_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u850_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w2100_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w900_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w900_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w850_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_g1800_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g1800_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_g900_c1_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_g900_c1_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2600_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2300_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2100_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l1800_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l850_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l700_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u2100_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u900_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u850_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w2100_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w850_c2_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c2_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2600_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2600_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2300_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2300_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l2100_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l2100_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l1800_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l1800_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l850_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l850_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_l700_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_l700_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u2100_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u2100_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u900_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u900_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_u850_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_u850_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w2100_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w2100_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_w850_c3_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_w850_c3_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_ce_expansion_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ce_expansion_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_ip_migration_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_ip_migration_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_p_abis_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_p_abis_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_multi_sector_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_multi_sector_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_implementation_bom_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_mrf_id': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_in_scope': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_customer_tagging': {
        'type': 'list',
        'required': False,
        'nullable': True,
        'default': None,
        'schema': {
			'type': 'objectid'
		}
    },
    'ms_na_00000_tx_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tx_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tx_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tx_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_power_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_power_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_power_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_power_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tower_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tower_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tower_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_tower_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_saq_access_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_saq_access_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_saq_access_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_saq_access_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_material_availability_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_material_availability_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_material_availability_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_material_availability_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_asp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_asp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_asp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_asp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_lsp_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_lsp_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_lsp_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_lsp_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_site_supervisor_1_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_site_supervisor_2_status_detail': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_site_supervisor_3_remarks': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_00000_site_supervisor_4_resolve_plan_date': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_01000_implementation_bom_requested_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_01000_implementation_bom_requested_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_01000_implementation_bom_requested_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_01000_implementation_bom_requested_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_02000_implementation_bom_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_02000_implementation_bom_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_02000_implementation_bom_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_02000_implementation_bom_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03000_mrf_release_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03000_mrf_release_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03000_mrf_release_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03000_mrf_release_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03500_pullout_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03500_pullout_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03500_pullout_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_03500_pullout_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_04000_kitting_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_04000_kitting_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_04000_kitting_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_04000_kitting_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_05000_pullout_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_05000_pullout_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_05000_pullout_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_05000_pullout_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06000_mos_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06000_mos_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06000_mos_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06000_mos_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06500_dn_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06500_dn_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06500_dn_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_06500_dn_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_07000_installation_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_07000_installation_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_07000_installation_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_07000_installation_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_08000_installation_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_08000_installation_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_08000_installation_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_08000_installation_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_08000_installation_finish_issue': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09000_integration_start_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09000_integration_start_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09000_integration_start_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09000_integration_start_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09500_integration_finish_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09500_integration_finish_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09500_integration_finish_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09500_integration_finish_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_09500_integration_finish_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_10000_oss_definition_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_10000_oss_definition_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_10000_oss_definition_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_10000_oss_definition_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_10000_oss_definition_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_request_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_request_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_request_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_request_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_received_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_received_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_received_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_received_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_11000_sdtsr_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_12000_unlock_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_12000_unlock_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_12000_unlock_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_12000_unlock_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_12000_unlock_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_13000_kpi_check_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_13000_kpi_check_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_13000_kpi_check_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_13000_kpi_check_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_13000_kpi_check_name': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_13000_kpi_check_status': {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_ft_complete_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_ft_complete_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_ft_complete_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_ft_complete_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_on_air_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_on_air_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_on_air_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_14000_on_air_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15000_scaf_hw_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15000_scaf_hw_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15000_scaf_hw_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15000_scaf_hw_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15001_scaf_services_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15001_scaf_services_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15001_scaf_services_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_15001_scaf_services_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_16000_pre_pat_1_baseline': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_16000_pre_pat_2_plan': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_16000_pre_pat_3_actual': {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ms_na_16000_pre_pat_4_notes': {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'ixt_sync_st' : {
		'type' : 'boolean',
	},
	'deleted' : {
		'type' : 'integer',
		'default': 0,
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