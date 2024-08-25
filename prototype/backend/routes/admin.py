from flask import Blueprint,jsonify,request,current_app
import bcrypt
from config import db
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,create_refresh_token
from datetime import timedelta
import re
import bcrypt

#import models form model
from model.admin_model import ADMIN
from model.places_models import States,StateImages,Places,PlacesImages


admin = Blueprint('admin', __name__)

@admin.route('/register',methods=['POST'])
def register():
    get_data = request.json
    email = get_data.get("email")
    password = get_data.get("password")
    username = get_data.get("username")
    print(email,password)
    if not email or not password or not username:
        print('please fill all the fields')
        return jsonify({'message':'please fill all the fields'}),401
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'message':'invalid email'}),401
    if len(password) < 6:
        return jsonify({'message':'password must be 6 characters or more'}),401
    if len(username) < 6:
        return jsonify({'message':'username must be 6 characters or more'}),401
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = ADMIN(username=username,email=email,password=hashed)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"messgae":'registerd successfully'}),200
    except Exception as e:
        return jsonify({'message':f'{e}'}),401

@admin.route('/login',methods=['POST'])
def login():
    get_data = request.json
    email = get_data.get("email")
    password = get_data.get("password")
    if not email or not password:
        return jsonify({'message':'please fill all the fields'})
    user = ADMIN.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message':'user not found'})
    if bcrypt.checkpw(password.encode('utf-8'), user.password):
        access_token = create_access_token(identity=user.id,expires_delta=timedelta(days=1))
        refresh_token = create_refresh_token(identity=user.id, expires_delta=timedelta(milliseconds=30))
        return jsonify({'access_token':access_token,'refresh_token':refresh_token,"message":"login success"}),200
    return jsonify({'message':'invalid credentials'}),401

# new = PLACES(name='new',description='new',location='new',category='new',price='new',rating='new',image='new',state=1)


@admin.route('/add_place',methods=['POST'])
def add_place():
    get_data = request.json
    name = get_data.get("name")
    description = get_data.get("description")
    location = get_data.get("location")
    category = get_data.get("category")
    price = get_data.get("price")
    rating = get_data.get("rating")
    image = get_data.get("image")
    state = get_data.get("state")
    images = get_data.get("images")
    if not name or not description or not location or not category or not price or not rating or not image or not state or not images:
        return jsonify({'message':'please fill all the fields'}),401
    # try:
    #     adding_place = 


@admin.route('/add_state',methods=['POST'])
def add_state():
    get_data = request.json
    state = get_data.get("state")
    print(state)
    # image = get_data.get("image")
    # if not name or not image:
    #     return jsonify({'message':'please fill all the fields'}),401
    new_state = States(name= state)
    try:
        db.session.add(new_state)
        db.session.commit()
        return jsonify({'message':'state added successfully'}),200
    except Exception as e:
        print(e)
        return jsonify({'message':f'{e}'}),401
    
@admin.route("/get_states",methods=['GET'])
def get_sates():
    states = States.query.all()
    states_list = []
    for i in states:
        states_list.append({'id':i.id,'name':i.name})
    return jsonify({'states':states_list,"message":"data sent sucessfully"}),200