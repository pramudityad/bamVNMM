from eve import Eve
from eve.auth import BasicAuth
from flask import current_app as app
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
		#if username == 'admin' and password == 'admin123' :
		#	return True

app = Eve(auth=MyBasicAuth, settings='tselsettings.py')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3516, debug=True)