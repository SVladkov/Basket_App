import base64
from data_access.user import (
    check_if_user_exists,
    get_password_hash
)
from passlib.hash import pbkdf2_sha256

class Authentication():
    def get_credentials(authorization_header):
        credentials_as_bytestring = base64.b64decode(authorization_header[6:])
        credentials = credentials_as_bytestring.decode('utf-8')
        colon_position = credentials.find(':')

        username = credentials[:colon_position]
        password = credentials[colon_position+1:]

        return {
            'username': username,
            'password': password
        }

    def authenticate_user(credentials):
        user_exists = check_if_user_exists(credentials['username'])
        if not user_exists:
            return False

        hash = get_password_hash(credentials['username'])
        is_password_correct = pbkdf2_sha256.verify(credentials['password'], hash)

        return is_password_correct