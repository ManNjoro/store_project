"""
contains of all database tables to be created
"""

from datetime import datetime
from flask_login import UserMixin
from pytz import timezone
from sqlalchemy.sql import func
from sqlalchemy.dialects.mysql import TIME
from . import db
from uuid import uuid4
local_timezone = timezone('Africa/Nairobi')

def get_uuid():
    return uuid4().hex


class User(db.Model, UserMixin):
    """
    A user object
    """
    __tablename__ = 'users'
    id = db.Column(db.String(11),unique=True, primary_key=True, default=get_uuid)
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    phone = db.Column(db.String(13))
    password = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=local_timezone.localize(datetime.now()))
    updated_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()), onupdate=lambda: local_timezone.localize(datetime.now()))
    payments = db.relationship('Payment')

class Store(db.Model):
    """
    A store object
    """
    __tablename__ = 'stores'
    id = db.Column(db.String(11),unique=True, primary_key=True, default=get_uuid)
    store_name = db.Column(db.String(150))
    price = db.Column(db.Integer)
    store_pic = db.Column(db.LargeBinary)
    floor_number = db.Column(db.Integer)
    opening_time = db.Column(db.TIME())
    closing_time = db.Column(db.TIME())
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()))
    updated_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()), onupdate=lambda: local_timezone.localize(datetime.now()))
    payments = db.relationship('Payment')

class Payment(db.Model):
    """
    Customer payment table
    """
    __tablename__ = 'payments'
    user_id = db.Column(db.String(11), db.ForeignKey('users.id'), primary_key=True)
    store_id = db.Column(db.String(11),db.ForeignKey('stores.id'), primary_key=True)
    paid_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()))
    updated_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()), onupdate=lambda: local_timezone.localize(datetime.now()))

class Admin(db.Model, UserMixin):
    """
    Admin user table
    """
    __tablename__ = 'admin'
    id = db.Column(db.String(11),unique=True, primary_key=True, default=get_uuid)
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    phone = db.Column(db.String(13))
    password = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()))
    updated_at = db.Column(db.DateTime, default=lambda: local_timezone.localize(datetime.now()), onupdate=lambda: local_timezone.localize(datetime.now()))