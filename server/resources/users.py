from flask import session
from flask_restful import reqparse, Resource
from data_access.user import (
    register_new_user,
    check_if_user_exists,
    get_username_name,
    set_username_name
)
from passlib.hash import pbkdf2_sha256
from authentication import Authentication

parser = reqparse.RequestParser()
parser.add_argument('Authorization', location='headers')
parser.add_argument('Cookie', location='headers')
parser.add_argument('name')

class AuthenticationResource(Resource):
    def post(self):
        if 'user' in session:
            return '', 400

        args = parser.parse_args()

        credentials = Authentication.get_credentials(args['Authorization'])
        is_authenticated = Authentication.authenticate_user(credentials)

        if is_authenticated:
            session['user'] = credentials['username']

            return '', 200
        else:
            return '', 401

class SessionAuthenticationResource(Resource):
    def get(self):
        if 'user' in session:
            return '', 200
        else:
            return '', 401

class LogoutResource(Resource):
    def post(self):
        if 'user' in session:
            session.pop('user')

        return '', 200

class RegisterResource(Resource):
    def post(self):
        args = parser.parse_args()

        credentials = Authentication.get_credentials(args['Authorization'])

        user_exists = check_if_user_exists(credentials['username'])
        if user_exists:
            return '', 409

        hash = pbkdf2_sha256.encrypt(credentials['password'], rounds=100, salt_size=16)

        register_new_user(credentials['username'], hash)

        return '', 200

class ProfileResource(Resource):
    def get(self):
        if 'user' not in session:
            return '', 401

        args = parser.parse_args()

        return get_username_name(session['user'])

    def post(self):
        args = parser.parse_args()

        if 'user' not in session:
            return '', 401

        try:
            set_username_name(session['user'], args['name'])
            return args['name'], 200
        except:
            return '', 400
