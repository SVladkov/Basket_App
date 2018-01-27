from flask import Flask, request
from flask_restful import Api, reqparse
from flask_cors import CORS
from resources.matches import MatchesResource
from resources.users import (
    AuthenticationResource,
    RegisterResource,
    ProfileResource
)
from basketball_apis.fantasydata_api import FantasydataApi
from database import init_database
from models.user import User

app = Flask(__name__)
db = init_database(app)
CORS(app)
api = Api(app)

api.add_resource(MatchesResource, '/yesterday-matches', resource_class_kwargs={'basketball_api': FantasydataApi})
api.add_resource(AuthenticationResource, '/login')
api.add_resource(RegisterResource, '/register')
api.add_resource(ProfileResource, '/profile')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
