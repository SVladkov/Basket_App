from flask import Flask, request
from flask_restful import Api, reqparse
from flask_cors import CORS
#from flask.ext.session import Session
from resources.matches import MatchesResource
from resources.users import AuthenticationResource
from resources.users import RegisterResource
from basketball_apis.fantasydata_api import FantasydataApi
from database import init_database

app = Flask(__name__)
init_database(app)
CORS(app)
api = Api(app)

api.add_resource(MatchesResource, '/yesterday-matches', resource_class_kwargs={'basketball_api': FantasydataApi})
api.add_resource(AuthenticationResource, '/login')
api.add_resource(RegisterResource, '/register')

if __name__ == '__main__':
    app.run(debug=True)
