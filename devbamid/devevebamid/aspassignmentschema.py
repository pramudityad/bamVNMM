aspassignmentschema = {
    'Request_Type' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Assignment_No' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'unique': True
    },
    'Account_Name' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'ASP_Acceptance_Date' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Info_Area_XL' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'id_cd_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'CD_ID' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'id_mr_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'MR_ID' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'id_project_doc' : {
        'type': 'objectid',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Project' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'SOW_Type' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Plant' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'NW' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'NW_Activity' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'Requisitioner' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'Service_No' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Servive_Price' : {
        'type': 'float',
        'required': False,
        'nullable': True,
    },
    'Service_Qty' : {
        'type': 'float',
        'required': False,
        'nullable': True,
    },
    'Site_Name_Tracking_Number' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Short_Text' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Vendor_Code' : {
        'type': 'objectid',
        'required': True,
        'nullable': False,
    },
    'Vendor_Code_Number' : {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'Vendor_Name' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'default': None
    },
    'Vendor_Email' : {
        'type': 'string',
        'required': True,
        'nullable': True,
        'default': None
    },
    'Head_Text' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Long_Text' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Payment_Terms' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'Approval_L1' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Approval_L2' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Approval_L3' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Approval_L4' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Approval_L5' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'PR_for_ASP' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'PO_Number' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'PO_Item' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Error_Type' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Error_Message' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Item_Status' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Work_Status' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'SH_ID' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'Site_ID' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'Site_Name' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'Site_Address' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_Longitude' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_Latitude' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_FE_ID' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_FE_Name' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_FE_Address' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_FE_Longitude' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Site_FE_Latitude' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Assignment_Creation_Date' : {
        'type': 'datetime',
        'required': True,
        'nullable': True,
    },
    'PO_Creation_Date' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'PR_Creation_Date' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Assignment_Ready_For_Bast' : {
        'type': 'boolean',
        'required': False,
        'nullable': True,
        'default': False
    },
    'Value_Assignment' : {
        'type': 'float',
        'required': True,
        'nullable': True,
    },
    'Assignment_Cancel' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Requestor' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'BAST_No' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'PO_Qty' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'Payment_Term_Ratio' : {
        'type': 'float',
        'required': True,
        'nullable': True,
    },
    'Required_GR_Qty' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'GR_Document_No' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'GR_Document_Date' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
        'default': None
    },
    'GR_Document_Qty' : {
        'type': 'float',
        'required': False,
        'nullable': True,
        'default': None
    },
    'WCN_Link' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'SSOW_List' : {
        'type': 'list',
        'required': True,
        'nullable': True,
        'schema': {
            'type': 'dict',
            'schema': {
                'id_ssow_doc': {
                    'type': 'objectid',
                    'required': False,
                    'nullable': True
                },
                'ssow_id': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'ssow_description': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'id_activity_number_doc': {
                    'type': 'objectid',
                    'required': False,
                    'nullable': True
                },
                'ssow_activity_number': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'ssow_unit': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'ssow_qty': {
                    'type': 'float',
                    'required': True,
                    'nullable': True
                },
                'ssow_status': {
                    'type': 'list',
                    'required': True,
                    'nullable': True,
                    'schema': {
                        'type': 'dict',
                        'schema': {
                            'status': {
                                'type': 'string',
                                'require': True,
                                'nullable': True
                            },
                            'status_update_date': {
                                'type': 'datetime',
                                'require': True,
                                'nullable': True
                            },
                            'status_updater': {
                                'type': 'string',
                                'require': True,
                                'nullable': True
                            },
                            'status_updater_id': {
                                'type': 'objectid',
                                'require': False,
                                'nullable': True
                            }
                        }
                    }
                }
            }
        }
    },
    'Current_Status' : {
        'type': 'string',
        'required': True,
        'nullable': True,
    },
    'ASP_Assignment_Status' : {
        'type': 'list',
        'required': True,
        'nullable': True,
        'schema': {
            'type': 'dict',
            'schema': {
                'status_name': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'status_value': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'status_date': {
                    'type': 'datetime',
                    'required': True,
                    'nullable': True
                },
                'status_updater': {
                    'type': 'string',
                    'required': True,
                    'nullable': True
                },
                'status_updater_id': {
                    'type': 'objectid',
                    'required': False,
                    'nullable': True
                }
            }
        }
    },
    'notes' : {
        'type': 'string',
        'required': False,
        'nullable': True,
        'default': None
    },
    'deleted' : {
        'type': 'integer',
        'required': True,
        'nullable': True,
        'default': 0
    },
    'created_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'updated_by' : {
        'type': 'objectid',
        'required': True,
        'nullable': True,
    },
    'created_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    },
    'updated_on' : {
        'type': 'datetime',
        'required': False,
        'nullable': True,
    }
}