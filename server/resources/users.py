from flask import session
from flask_restful import reqparse, Resource
import base64
from data_access.user import (
    register_new_user,
    get_password_hash,
    check_if_user_exists,
    get_username_name,
    set_username_name
)
from passlib.hash import pbkdf2_sha256

parser = reqparse.RequestParser()
parser.add_argument('Authorization', location='headers')
parser.add_argument('Cookie', location='headers')
parser.add_argument('name')


class AuthenticationResource(Resource):
    def post(self):
        args = parser.parse_args()
        credentials_as_bytestring = base64.b64decode(args['Authorization'][6:])
        credentials = credentials_as_bytestring.decode('utf-8')
        colon_position = credentials.find(':')

        username = credentials[:colon_position]
        password = credentials[colon_position+1:]

        user_exists = check_if_user_exists(username)
        if not user_exists:
            return '', 400

        hash = get_password_hash(username)
        password_is_correct = pbkdf2_sha256.verify(password, hash)

        if password_is_correct:
            session['user'] = username
            print(session)

            return '', 200
        else:
            return '', 400

class LogoutResource(Resource):
    def post(self):
        if 'user' in session:
            session.pop('user')

        return '', 200

class RegisterResource(Resource):
    def post(self):
        args = parser.parse_args()
        credentials_as_bytestring = base64.b64decode(args['Authorization'][6:])
        credentials = credentials_as_bytestring.decode('utf-8')
        colon_position = credentials.find(':')

        username = credentials[:colon_position]
        password = credentials[colon_position+1:]

        user_exists = check_if_user_exists(username)
        if user_exists:
            return '', 409

        hash = pbkdf2_sha256.encrypt(password, rounds=100, salt_size=16)

        register_new_user(username, hash)

        return '', 200

class ProfileResource(Resource):
    def get(self):
        if 'user' not in session:
            return '', 401

        args = parser.parse_args()

        return get_username_name(session['user'])

    def post(self):
        args = parser.parse_args()
        print(args)

        if 'user' not in session:
            return '', 401

        try:
            set_username_name(session['user'], args['name'])
            return args['name'], 200
        except:
            return '', 400