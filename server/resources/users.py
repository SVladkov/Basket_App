from flask_restful import Resource

class UsersResource(Resource):
    def post(self):
        return "You logged in"
