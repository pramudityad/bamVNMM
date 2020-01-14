from eve import Eve
from eve.auth import BasicAuth
from flask import current_app as app
from werkzeug.security import check_password_hash

class MyBasicAuth(BasicAuth):
	def check_auth(self, username, password, allowed_roles, resource, method):
		account = app.data.driver.db['user']
		query = {'username' : username}
		acc = account.find_one(query)
		if acc is not None:
			if check_password_hash(acc['password'], password) :
				return True
		#if username == 'admin' and password == 'admin123' :
		#	return True

app = Eve(auth=MyBasicAuth, settings='tselsettings.py')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3516, debug=True)