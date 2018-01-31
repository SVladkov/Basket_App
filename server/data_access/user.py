from models.user import User
from database import db

def register_new_user(username, password):
    user = User(username=username, password=password)

    db.session.add(user)
    db.session.commit()

def get_password_hash(username):
    return User.query.filter_by(username=username).first().password

def check_if_user_exists(username):
    return User.query.filter_by(username=username).first() != None

def get_username_name(username):
    return User.query.filter_by(username=username).first().name

def set_username_name(username, name):
    user = User.query.filter_by(username=username).first()
    user.name = name
    db.session.commit()
