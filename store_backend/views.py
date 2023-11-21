"""
contains of all the other routes other than authentication routes
"""
from io import BytesIO
from flask import abort, Blueprint, request, render_template, jsonify, send_file, redirect, flash, url_for
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from datetime import datetime, time
from flask_jwt_extended import jwt_required
from store_backend.models import Store, User, Admin
from store_backend import db

views = Blueprint('views',__name__, url_prefix='/')

ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg']
def allowed_file(filename):
    """
    validates file format
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@views.route('/')
@login_required
def home():
    """homepage"""
     # Fetch recent users
    recent_users = User.query.order_by(User.updated_at.desc()).limit(5).all()
    recent_stores = Store.query.order_by(Store.updated_at.desc()).limit(5).all()

    # Fetch total number of users and stores
    total_users = User.query.count()
    total_stores = Store.query.count()
    return render_template("home.html", user=current_user, recent_users=recent_users, total_users=total_users, total_stores=total_stores, recent_stores=recent_stores)

@views.route('/data')
def getData():
    """get dataset"""
    data = [67,90,23,45,66,21,78]
    return jsonify({'data':data})

@views.route('/users')
@login_required
def users():
    """list users"""
    users = User.query.order_by(User.updated_at.desc()).all()
    return render_template("users.html", users=users, user=current_user)

@views.route("/stores")
@login_required
def stores():
    """list stores"""
    stores = Store.query.order_by(Store.updated_at.desc()).all()
    return render_template("stores.html", stores=stores, user=current_user)

@views.route('/stores/add_new', methods=['POST'])
@login_required
def addStore():
    """
    function for adding new store
    """

    if request.method == 'POST':
        store_name = request.form.get('store_name')
        price = request.form.get('price')
        floor_number = request.form.get('floor_number')
        open_time = request.form.get('open_time')
        close_time = request.form.get('close_time')
        description = request.form.get('description')
        store_pic = request.files['store_pic']
        opening_time = datetime.strptime(open_time, '%H:%M').time()
        closing_time = datetime.strptime(close_time, '%H:%M').time()
        if 'store_pic' not in request.files:
            flash("No file found", category='error')
        elif store_pic.filename == '' or store_name == '' or floor_number =='' or open_time =='' or close_time =='' or price == '' or description == '':
            flash("Please fill in all fields", category='error')
        elif store_pic and allowed_file(store_pic.filename) and store_name and price and open_time and close_time and floor_number and description:
            filename = secure_filename(store_pic.filename)
            file_data = store_pic.read()
            new_upload = Store(store_name=store_name,price=price, store_pic=file_data, floor_number=floor_number, opening_time=opening_time, closing_time=closing_time, description=description)
            db.session.add(new_upload)
            db.session.commit()
            flash("New store added sucessfully", category='success')
            return redirect(url_for("views.stores"))


@views.route('/stores/<string:store_id>/image')
def get_store_image(store_id):
    '''
    Gets the store's image
    '''
    store = Store.query.filter_by(id=store_id).first()
    if store:
        return send_file(BytesIO(store.store_pic), mimetype='image/*')
    else:
        abort(404)

@views.route('/stores/<string:store_id>', methods=['DELETE'])
@login_required
def delete_store(store_id):
    """
    deletes store by id
    """
    if request.method == 'DELETE':
        store = Store.query.filter_by(id=store_id).first()
        if not store:
            abort(404)
        db.session.delete(store)
        db.session.commit()
        flash("Deleted successfully")
        return jsonify({'success': True}), 200
    return redirect(url_for('views.stores'))

@views.route('/stores/<string:store_id>/update', methods=['POST'])
@login_required
def updateStore(store_id):
    """
    function for updating store details
    """
    if request.method == 'POST':
        store = Store.query.filter_by(id=store_id).first()
        if store:
            store_name = request.form.get('store_name')
            price = request.form.get('price')
            floor_number = request.form.get('floor_number')
            open_time = request.form.get('open_time')
            close_time = request.form.get('close_time')
            description = request.form.get('description')
            store_pic = request.files['store_pic']
            opening_time = datetime.strptime(open_time, '%H:%M:%S').time()
            closing_time = datetime.strptime(close_time, '%H:%M:%S').time()
            if 'store_pic' not in request.files:
                flash("No file found", category='error')
            elif store_pic.filename == '' or store_name == '' or floor_number =='' or open_time =='' or close_time =='' or price == '' or description == '':
                flash("Please fill in all fields", category='error')
            elif store_pic and allowed_file(store_pic.filename) and store_name and price and open_time and close_time and floor_number and description:
                filename = secure_filename(store_pic.filename)
                file_data = store_pic.read()
                store.store_name = store_name
                store.price = price
                store.store_pic = file_data
                store.floor_number = floor_number
                store.opening_time = opening_time
                store.closing_time = closing_time
                store.description = description
                db.session.commit()
                flash("updated sucessfully", category='success')
            return redirect(url_for("views.stores"))
    return jsonify({"error": "unsuccessfull"}), 403


@views.route("/users/<string:user_id>/delete")
def deleteUser(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    db.session.delete(user)
    db.session.commit()
    flash("User deleted successfully", category='success')
    return redirect(url_for('views.users'))


@views.route("/api/stores")
# @jwt_required() -- protected
def getStores():
    stores = Store.query.order_by(Store.updated_at.desc()).all()
    stores = [{
        'id': store.id, 'name': store.store_name, 'price': store.price,
        'floor_number': store.floor_number,
        'opening_time': store.opening_time.isoformat(),
        'closing_time': store.closing_time.isoformat(),
        'description': store.description,
        } for store in stores]
    return jsonify(stores=stores), 200

@views.route("/api/stores/<string:store_id>")
def getStore(store_id):
    store = Store.query.filter_by(id=store_id).first()
    if store:
        store_data = {
            'id': store.id, 
            'name': store.store_name, 
            'price': store.price,
            'floor_number': store.floor_number,
            'opening_time': store.opening_time.isoformat(),
            'closing_time': store.closing_time.isoformat(),
            'description': store.description,
            'created_at': store.created_at,
            'updated_at' : store.updated_at
        }
        return jsonify(stores=store_data), 200
    abort(404)