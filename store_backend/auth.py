"""
contains of all authentication routes
"""

from flask import Blueprint, request, jsonify, make_response, render_template, flash, url_for, redirect
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from store_backend.models import User, Admin
from store_backend import db

auth = Blueprint('auth',__name__, url_prefix='/')

@auth.route("/users/new_user", methods=['POST'])
def addNewUser():
    """
    add user
    """
    
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        user = User.query.filter_by(email=email).first()
        if user:
            flash("Email already exists", category='error')
        elif not first_name or not last_name or not phone or not email or not password1 or not password2:
            flash("Please fill in all details", category='error')
        elif len(first_name) < 3 or len(last_name) < 3:
            flash("Name is too short", category='error')
        elif password1 != password2:
            flash('Passwords do not match', category='error')
        elif len(password1) < 8:
            flash('Password must be at least 8 characters', category='error')
        elif len(phone) < 10:
            flash('Phone number must be at least 10 digits', category='error')
        else:
            # add new user to DB and hash password
            new_user = User(first_name=first_name, last_name=last_name,phone=phone, email=email, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            # db.session.add(Admin(first_name='James', last_name='Admin', email='admin@gmail.com', phone='0711111111', password=generate_password_hash('admin123', method='sha256')))
            db.session.commit()
            flash("New user added successfully", category='success')
        return redirect(url_for('views.users'))
    return jsonify({'error': 'unsuccessful'}), 403

@auth.route('/signup', methods=['POST'])
def signup():
    """
    Registers users
    """
    if request.method == 'POST':
        data = request.json
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        phoneNumber = data.get('phoneNumber')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')
        user = User.query.filter_by(email=email).first()
        if user:
            message = 'Email already exists'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 409
        elif not firstName or not lastName or not phoneNumber or not email or not password1 or not password2:
            message = 'Please fill in all fields' 
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        elif len(firstName) < 3 or len(lastName) < 3:
            message = 'Name is too short'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        elif password1 != password2:
            message = 'Passwords do not match'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        elif len(password1) < 8:
            message = 'Password must be at least 8 characters'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 400
        else:
            new_user = User(first_name=firstName,last_name=lastName, phone=phoneNumber, email=email, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            message = 'Account created!'
            category = 'success'
            return jsonify({"message": message, 'category': category}), 200
    return jsonify({"error": "Forbidden method"}), 403

@auth.route('/login', methods=['POST'])
def login():
    """
    login user
    """
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                user_info = {
                            'id': current_user.id,
                            'name': current_user.first_name,
                            'email': current_user.email,
                            'isAuthenticated': current_user.is_authenticated
                        }
                return jsonify({'message': 'Logged in successfully', 'category': 'success', 'user': user_info}), 200
            else:
                message = 'Incorrect password'
                category = 'error'
                return jsonify({'message': message, 'category': category}), 401
        else:
            message = 'Email does not exist'
            category = 'error'
            return jsonify({'message': message, 'category': category}), 401
    return jsonify({'error': 'method not allowed'}), 403


@auth.route("/login_admin", methods=['POST', 'GET'])
def loginAdmin():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = Admin.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                flash("Logged in successfully", category='success')
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password', category='error')
        else:
            flash('Email does not exist', category='error')
    return render_template("login.html", user=current_user)

@auth.route('/logout_admin')
@login_required
def logoutAdmin():
    logout_user()
    return redirect(url_for("auth.loginAdmin"))