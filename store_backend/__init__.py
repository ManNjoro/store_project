"""
Flask app setup
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
DB_PATH = 'stores.db'
migrate = Migrate()

def create_app():
    """
    creates a flask app
    """
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
    app.config['SECRET_KEY'] = 'saferinnumbers'
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET')
    jwt = JWTManager(app)
    app.url_map.strict_slashes = False
    from store_backend.auth import auth
    from store_backend.views import views

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth)
    app.register_blueprint(views)
    from store_backend.models import User, Store, Payment, Admin
    create_database(app)
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.loginAdmin'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return Admin.query.get(id)
    
    return app

def create_database(app):
    """
    creates the sqlite database
    """
    with app.app_context():
        if not os.path.exists('store_backend/' + DB_PATH):
            db.create_all()
            print("Created database!")
