from flask_restful import Resource

class MatchesResource(Resource):
    def __init__(self, basketball_api):
        self.basketball_api = basketball_api()

    def get(self):

        try:
            # Raise this exception during development, so that API limit
            # does not get exceeded
            # raise Exception('Be careful with API limit')
            return self.basketball_api.get_yesterday_matches()
        except Exception as e:
            print(e)
            return '', 204
