import sys, copy
from eve import Eve
from eve.auth import BasicAuth
from datetime import datetime
from flask import current_app as app
from flask import jsonify, g
from werkzeug.security import check_password_hash

class MyBasicAuth(BasicAuth):
	def check_auth(self, username, password, allowed_roles, resource, method):
		allowed_roles_name = allowed_roles
		role = app.data.driver.db['role']
		account = app.data.driver.db['user']
		datarole = role.find()

		roles_id = [i['_id'] for i in datarole if i['name'] in allowed_roles_name]

		query = {'username' : username}

		if roles_id:
			query['roles'] = {'$in': roles_id}

		acc = account.find_one(query)
		if acc is not None:
			if check_password_hash(acc['password'], password) :
				return True

app = Eve(auth=MyBasicAuth, settings='smartsettings.py')

def before_update_prpo_data(updates, original):
	currentusername = g.get('user')
	if currentusername == 'userrapidtool':
		if 'Work_Status' in updates and updates['Work_Status'] == '' :
			updates['Work_Status'] = 'Waiting for PR-PO Creation'
		else :
			if original['Work_Status'] == 'Complete process for PR PO Creation with error message':
				updates['Work_Status'] = 'Waiting for PR-PO Creation'

def before_insert_prpo_data(items) :
	for i in items : 
		if 'Work_Status' in i and i['Work_Status'] == '' : 
			i['Work_Status'] = 'Waiting for PR-PO Creation'

app.on_update_prpo_data += before_update_prpo_data
app.on_insert_prpo_data += before_insert_prpo_data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3520, debug=True)