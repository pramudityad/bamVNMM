from eve import Eve
from eve.auth import BasicAuth
from flask import request, current_app as app, g, abort
from werkzeug.security import check_password_hash 

class MyBasicAuth(BasicAuth):
	def check_auth(self, username, password, allowed_roles, resource, method):
		allowed_roles_name = allowed_roles
		# role = app.data.driver.db['role']
		account = app.data.driver.db['user_pool']
		# datarole = role.find()

		# roles_id = [i['_id'] for i in datarole if i['name'] in allowed_roles_name]

		query = {'email' : username}
		query['roles'] = {'$in': allowed_roles_name}

		acc = account.find_one(query)
		if acc is not None:
			if check_password_hash(acc['password'], password) :
				return True

# def before_returning_items(resource_name, response):
#     select_user = g.get('user')
#     user_collection = app.data.driver.db['user']
#     query = {'username': select_user}
#     username = user_collection.find_one(query)
#     print(username['_id'])
#     print(username['username'])
    

# def post_get_callback(resource, request, payload):
#     print(request)


app = Eve(auth=MyBasicAuth, settings='bamidsettings.py')

# app.on_post_GET += post_get_callback
# app.on_fetched_resource += before_returning_items

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5013, debug=True)