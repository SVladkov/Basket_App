from flask import Flask, request
from flask_restful import Api, reqparse
from flask_cors import CORS
from resources.matches import MatchesResource
from basketball_apis.fantasydata_api import FantasydataApi

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(MatchesResource, '/yesterday-matches', resource_class_kwargs={'basketball_api': FantasydataApi})

if __name__ == '__main__':
    app.run(debug=True)
