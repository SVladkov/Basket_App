from flask_restful import reqparse, Resource
import base64

parser = reqparse.RequestParser()
parser.add_argument('Authorization', location='headers')

class AuthenticationResource(Resource):
    def post(self):
        args = parser.parse_args()
        credentials_as_bytestring = base64.b64decode(args['Authorization'][6:])
        credentials = credentials_as_bytestring.decode('utf-8')
        colon_position = credentials.find(':')

        username = credentials[:colon_position]
        password = credentials[colon_position+1:]

        print(username)
        print(password)
        return "You logged in"
