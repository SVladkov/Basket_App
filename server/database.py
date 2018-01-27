from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from configurations import configurations

db = SQLAlchemy()

def init_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = configurations['database_uri']
    db.init_app(app)
    return db
