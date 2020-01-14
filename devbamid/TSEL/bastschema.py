bastschema = {
    'BastNo': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalOneID': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalOneStatus': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalOneDate': {
        'type': 'datetime',
        'required': False,
        'nullable': True
    },
    'ApprovalTwoID': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalTwoStatus': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalTwoDate': {
        'type': 'datetime',
        'required': False,
        'nullable': True
    },
    'ApprovalThreeID': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalThreeStatus': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'ApprovalThreeDate': {
        'type': 'datetime',
        'required': False,
        'nullable': True
    },
    'RejectionReason': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'PaymentTerms': {
        'type': 'float',
        'required': False,
        'nullable': True
    },
    'TotalValue': {
        'type': 'float',
        'required': False,
        'nullable': True
    },
    'TotalDelay': {
        'type': 'string',
        'required': False,
        'nullable': True
    },
    'TotalPayment': {
        'type': 'float',
        'required': False,
        'nullable': True
    },
    'deleted': {
        'type': 'integer',
        'nullable': False,
        'default' : 0
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
	}
}