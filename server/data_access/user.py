from models.user import User
from database import db

def register_new_user(username, password):
    u = User(username=username, password=password)

    db.session.add(u);
    db.session.commit();

def get_password_hash(username):
    return User.query.filter_by(username=username).first().password

def check_if_user_exists(username):
    return User.query.filter_by(username=username).first() != None