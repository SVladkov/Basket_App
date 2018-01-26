from flask_restful import Resource

class MatchesResource(Resource):
    def __init__(self, basketball_api):
        self.basketball_api = basketball_api()

    def get(self):
        return self.basketball_api.get_yesterday_matches()