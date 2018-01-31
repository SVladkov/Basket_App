from flask import (
    Flask,
    request
)
from flask_restful import Api, reqparse, Resource
from flask_cors import CORS
from database import init_database
from routing import Routing
from configurations import configurations
from models.user import User

app = Flask(__name__)
app.secret_key = configurations['secret_key']
CORS(app, supports_credentials=True)
db = init_database(app)
api = Api(app)
Routing.add_resources(api)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
