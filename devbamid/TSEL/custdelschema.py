custdelschema = {	
	'WP_ID' : { 
		'type' : 'string',
		'nullable' : False,
        'required': True,
        'unique': True,
	},
	'WP_Name' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_FAS_ID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Network_Number' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Activity_Code' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Market_Type' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_WBS' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_WBS_EAB_HW_Bulk' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_System_Key' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Project' : { 
		'type' : 'objectid',
		'data_relation': {
			'resource': 'project_tsel',
			'field': '_id',
			'embeddable': True
		},
	},
	'CD_Info_Project_Year' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Program' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Work_Status' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Site_Type_CPS' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_SOW_Type' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'CD_Info_Zone_PM' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'PO_Info_number' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'PO_Info_rec_date' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'PO_Info_project_name' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteID_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteName_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Latitude_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Longitude_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Address_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_City_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Province_NE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteID_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteName_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Latitude_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Longitude_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Address_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_City_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Province_FE' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteID_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteName_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Latitude_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Longitude_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Address_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_City_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Province_NE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteID_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_SiteName_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Latitude_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Longitude_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Address_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_City_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'Site_Info_Province_FE_Origin' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS0010A_RBS_TX_Ready_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0010B_RBS_TX_Ready_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0010P_RBS_TX_Ready_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0020A_RBS_Pwr_Ready_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0020B_RBS_Pwr_Ready_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0020P_RBS_Pwr_Ready_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0030A_RBS_MR_Req_First_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0030B_RBS_MR_Req_First_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0030P_RBS_MR_Req_First_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0040A_RBS_MR_Req_Latest_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0040B_RBS_MR_Req_Latest_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0040P_RBS_MR_Req_Latest_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0050A_RBS_Assignment_Created_RBS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0050B_RBS_Assignment_Created_RBS_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0050P_RBS_Assignment_Created_RBS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0060A_RBS_Assignment_Created_TRM_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0060B_RBS_Assignment_Created_TRM_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0060P_RBS_Assignment_Created_TRM_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0070A_RBS_Assignment_Created_SACME_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0070B_RBS_Assignment_Created_SACME_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0070P_RBS_Assignment_Created_SACME_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0080A_RBS_Assignment_Created_NDO_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0080B_RBS_Assignment_Created_NDO_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0080P_RBS_Assignment_Created_NDO_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0090A_RBS_Assignment_Created_SURVEY_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0090B_RBS_Assignment_Created_SURVEY_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0090P_RBS_Assignment_Created_SURVEY_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100A_RBS_CDR_Req_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100B_RBS_CDR_Req_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100P_RBS_CDR_Req_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0110A_RBS_ATND_Req_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0110B_RBS_ATND_Req_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0110P_RBS_ATND_Req_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0120A_RBS_NMPOL_Req_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0120B_RBS_NMPOL_Req_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0120P_RBS_NMPOL_Req_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0130A_RBS_Tag_VLAN_Done_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0130B_RBS_Tag_VLAN_Done_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0130P_RBS_Tag_VLAN_Done_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0140A_RBS_MR_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0140B_RBS_MR_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0140P_RBS_MR_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0150A_RBS_CDR_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0150B_RBS_CDR_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0150P_RBS_CDR_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0160A_RBS_ATND_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0160B_RBS_ATND_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0160P_RBS_ATND_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0170A_RBS_Script_Done_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0170B_RBS_Script_Done_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0170P_RBS_Script_Done_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0180A_RBS_RDY4INST_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0180B_RBS_RDY4INST_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0180P_RBS_RDY4INST_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0190A_RBS_Material_Dispatch_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0190B_RBS_Material_Dispatch_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0190P_RBS_Material_Dispatch_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200A_RBS_RFI_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200B_RBS_RFI_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200P_RBS_RFI_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210A_RBS_MoS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210B_RBS_MoS_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210P_RBS_MoS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220A_RBS_Install_Start_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220B_RBS_Install_Start_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220P_RBS_Install_Start_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0230A_RBS_Installed_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0230B_RBS_Installed_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0230P_RBS_Installed_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0240A_RBS_Integrated_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0240B_RBS_Integrated_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0240P_RBS_Integrated_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0250A_RBS_Unlocked_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0250B_RBS_Unlocked_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0250P_RBS_Unlocked_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0260A_RBS_PMR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0260B_RBS_PMR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0260P_RBS_PMR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0270A_RBS_RSSI_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0270B_RBS_RSSI_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0270P_RBS_RSSI_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0280A_RBS_RTWP_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0280B_RBS_RTWP_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0280P_RBS_RTWP_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0290A_RBS_SSV_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0290B_RBS_SSV_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0290P_RBS_SSV_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0300A_RBS_FTR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0300B_RBS_FTR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0300P_RBS_FTR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0310A_RBS_ALARM_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0310B_RBS_ALARM_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0310P_RBS_ALARM_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0320A_RBS_RDY4MCR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0320B_RBS_RDY4MCR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0320P_RBS_RDY4MCR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0330A_RBS_SID_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0330B_RBS_SID_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0330P_RBS_SID_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0340A_RBS_BoQ_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0340B_RBS_BoQ_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0340P_RBS_BoQ_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0350A_RBS_PATP_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0350B_RBS_PATP_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0350P_RBS_PATP_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0360A_RBS_ATF_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0360B_RBS_ATF_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0360P_RBS_ATF_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0370A_RBS_Red_Line_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0370B_RBS_Red_Line_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0370P_RBS_Red_Line_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0380A_RBS_ABD_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0380B_RBS_ABD_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0380P_RBS_ABD_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0390A_RBS_Netgear_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0390B_RBS_Netgear_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0390P_RBS_Netgear_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0400A_RBS_RDY4ATP_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0400B_RBS_RDY4ATP_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0400P_RBS_RDY4ATP_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0410A_RBS_HN_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0410B_RBS_HN_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0401B_RBS_MCR_Done_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0402B_RBS_ATP_Done_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0401P_RBS_MCR_Done_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0402P_RBS_ATP_Done_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0401A_RBS_MCR_Done_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0402A_RBS_ATP_Done_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0410P_RBS_HN_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0420A_RBS_MCR_Cert_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0420B_RBS_MCR_Cert_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0420P_RBS_MCR_Cert_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0430A_RBS_FMS_RBS_HW_100p_NS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0430P_RBS_FMS_RBS_HW_100p_NS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0440A_RBS_FMS_RBS_SVC_100p_NS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0440P_RBS_FMS_RBS_SVC_100p_NS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0450A_RBS_FMS_RBS_LM_100p_NS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0450P_RBS_FMS_RBS_LM_100p_NS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0460A_RBS_FMS_RBS_SW_100p_NS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0460P_RBS_FMS_RBS_SW_100p_NS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0470A_RBS_FMS_RBS_HW_50p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0470P_RBS_FMS_RBS_HW_50p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0480A_RBS_FMS_RBS_SVC_50p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0480P_RBS_FMS_RBS_SVC_50p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0490A_RBS_FMS_RBS_LM_50p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0490P_RBS_FMS_RBS_LM_50p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0500A_RBS_FMS_RBS_SW_50p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0500P_RBS_FMS_RBS_SW_50p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0510A_RBS_ATP_Endorse_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0510B_RBS_ATP_Endorse_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0510P_RBS_ATP_Endorse_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0520A_RBS_PAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0520B_RBS_PAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0520P_RBS_PAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0530A_RBS_FMS_RBS_HW_80p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0530P_RBS_FMS_RBS_HW_80p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0540A_RBS_FMS_RBS_SVC_80p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0540P_RBS_FMS_RBS_SVC_80p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0550A_RBS_FMS_RBS_LM_80p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0550P_RBS_FMS_RBS_LM_80p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0560A_RBS_FMS_RBS_SW_80p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0560P_RBS_FMS_RBS_SW_80p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0570A_RBS_SPE_Ready_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0570B_RBS_SPE_Ready_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0570P_RBS_SPE_Ready_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0580A_RBS_SPE_Done_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0580B_RBS_SPE_Done_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0580P_RBS_SPE_Done_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0590A_RBS_FAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0590B_RBS_FAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0590P_RBS_FAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0600A_RBS_FMS_RBS_HW_100p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0600P_RBS_FMS_RBS_HW_100p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0610A_RBS_FMS_RBS_SVC_100p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0610P_RBS_FMS_RBS_SVC_100p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0620A_RBS_FMS_RBS_LM_100p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0620P_RBS_FMS_RBS_LM_100p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0630A_RBS_FMS_RBS_SW_100p_Billing_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0630P_RBS_FMS_RBS_SW_100p_Billing_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0640A_RBS_COA_MCR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0640B_RBS_COA_MCR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0640P_RBS_COA_MCR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0650A_RBS_COA_PAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0650B_RBS_COA_PAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0650P_RBS_COA_PAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0660A_RBS_COA_FAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0660B_RBS_COA_FAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0660P_RBS_COA_FAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'FMS_RBS_HW_100p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_100p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_100p_NS_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_100p_NS_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_50p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_50p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_80p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_HW_80p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_100p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_100p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_100p_NS_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_100p_NS_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_50p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_50p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_80p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_LM_80p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_100p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_100p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_100p_NS_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_100p_NS_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_50p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_50p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_80p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SVC_80p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_100p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_100p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_100p_NS_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_100p_NS_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_50p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_50p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_80p_Billing_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'FMS_RBS_SW_80p_Billing_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_MCR_Cert_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_MCR_Cert_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_PAC_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_PAC_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_FAC_SpecID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_FAC_PLOID' : { 
		'type' : 'string',
		'nullable' : True,
	},
	'MS_RBS_MCR_Cert_PoD' : { 
		'type' : 'media'
	},
	'MS_RBS_FAC_PoD' : { 
		'type' : 'media'
	},
	'MS_RBS_PAC_PoD' : { 
		'type' : 'media'
	},
	'MS_RBS_SID' : { 
		'type' : 'media'
	},
	'MS0010B_TRM_RFI_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0020B_TRM_ET_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0030B_TRM_Assgn_Survey_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0040B_TRM_Assgn_ITC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0050B_TRM_Create_MR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0060B_TRM_ASP_Survey_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0070B_TRM_ASP_Accepted_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0080B_TRM_MR_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0090B_TRM_Mat_Dispatch_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100B_TRM_SID_Binder_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0110B_TRM_MoS_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0120B_TRM_ITC_RFS_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0130B_TRM_Migration_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0140B_TRM_Dismantle_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0150B_TRM_Rtrn_Material_Released_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0160B_TRM_TSSR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0170B_TRM_ABD_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0180B_TRM_FATP_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0190B_TRM_BoQ_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200B_TRM_ETH_Test_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210B_TRM_Netgear_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220B_TRM_ATF_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0230B_TRM_ATP_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0240B_TRM_ATP_Endorse_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0250B_TRM_SPEAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0260B_TRM_COA_FATP_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0270B_TRM_COA_PAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0280B_TRM_COA_FAC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0010P_TRM_RFI_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0020P_TRM_ET_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0030P_TRM_Assgn_Survey_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0040P_TRM_Assgn_ITC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0050P_TRM_Create_MR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0060P_TRM_ASP_Survey_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0070P_TRM_ASP_Accepted_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0080P_TRM_MR_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0090P_TRM_Mat_Dispatch_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100P_TRM_SID_Binder_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0110P_TRM_MoS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0120P_TRM_ITC_RFS_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0130P_TRM_Migration_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0140P_TRM_Dismantle_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0150P_TRM_Rtrn_Material_Released_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0160P_TRM_TSSR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0170P_TRM_ABD_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0180P_TRM_FATP_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0190P_TRM_BoQ_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200P_TRM_ETH_Test_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210P_TRM_Netgear_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220P_TRM_ATF_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0230P_TRM_ATP_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0240P_TRM_ATP_Endorse_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0250P_TRM_SPEAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0260P_TRM_COA_FATP_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0270P_TRM_COA_PAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0280P_TRM_COA_FAC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0010A_TRM_RFI_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0020A_TRM_ET_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0030A_TRM_Assgn_Survey_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0040A_TRM_Assgn_ITC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0050A_TRM_Create_MR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0060A_TRM_ASP_Survey_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0070A_TRM_ASP_Accepted_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0080A_TRM_MR_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0090A_TRM_Mat_Dispatch_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100A_TRM_SID_Binder_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0110A_TRM_MoS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0120A_TRM_ITC_RFS_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0130A_TRM_Migration_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0140A_TRM_Dismantle_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0150A_TRM_Rtrn_Material_Released_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0160A_TRM_TSSR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0170A_TRM_ABD_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0180A_TRM_FATP_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0190A_TRM_BoQ_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200A_TRM_ETH_Test_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210A_TRM_Netgear_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220A_TRM_ATF_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0230A_TRM_ATP_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0240A_TRM_ATP_Endorse_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0250A_TRM_SPEAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0260A_TRM_COA_FATP_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0270A_TRM_COA_PAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0280A_TRM_COA_FAC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100B_CME_WO_Release_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200B_CME_TSR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0300B_CME_TSSR_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0400B_CME_DRM_Finish_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0500B_CME_Collo_Application_Submit_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0600B_CME_IP_Collo_Approved_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0700B_CME_Mini_CME_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0800B_CME_Site_Hunting_Finish_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0900B_CME_Validation_Candidate_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1000B_CME_Community_Permit_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1100B_CME_IMB_Finish_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1200B_CME_Design_Soil_Test_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1300B_CME_RFC_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1400B_CME_Civil_Work_Progress_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1500B_CME_PLN_Connection_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100P_CME_WO_Release_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200P_CME_TSR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0300P_CME_TSSR_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0400P_CME_DRM_Finish_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0500P_CME_Collo_Application_Submit_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0600P_CME_IP_Collo_Approved_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0700P_CME_Mini_CME_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0800P_CME_Site_Hunting_Finish_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0900P_CME_Validation_Candidate_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1000P_CME_Community_Permit_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1100P_CME_IMB_Finish_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1200P_CME_Design_Soil_Test_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1300P_CME_RFC_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1400P_CME_Civil_Work_Progress_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1500P_CME_PLN_Connection_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0100A_CME_WO_Release_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0200A_CME_TSR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0300A_CME_TSSR_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0400A_CME_DRM_Finish_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0500A_CME_Collo_Application_Submit_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0600A_CME_IP_Collo_Approved_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0700A_CME_Mini_CME_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0800A_CME_Site_Hunting_Finish_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0900A_CME_Validation_Candidate_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1000A_CME_Community_Permit_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1100A_CME_IMB_Finish_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1200A_CME_Design_Soil_Test_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1300A_CME_RFC_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1400A_CME_Civil_Work_Progress_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS1500A_CME_PLN_Connection_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210B_CME_NFI_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210P_CME_NFI_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0210A_CME_NFI_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220B_CME_CAF_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220P_CME_CAF_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0220A_CME_CAF_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0105B_TRM_MaterialReady_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0105P_TRM_MaterialReady_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0105A_TRM_MaterialReady_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0115B_TRM_InstallationStart_Baseline' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0115P_TRM_InstallationStart_Plan' : { 
		'type' : 'datetime',
		'nullable' : True,
	},
	'MS0115A_TRM_InstallationStart_Actual' : { 
		'type' : 'datetime',
		'nullable' : True,
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