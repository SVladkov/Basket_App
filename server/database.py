from flask_sqlalchemy import SQLAlchemy
from configurations import configurations

db = SQLAlchemy()

def init_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = configurations['database_uri']
    with app.app_context():
        db.init_app(app)
