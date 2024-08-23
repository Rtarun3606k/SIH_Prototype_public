from flask import Blueprint,jsonify,request,current_app
import bcrypt
from config import db
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,create_refresh_token
from datetime import timedelta
import re
import bcrypt

#import models form model
from model.admin_model import ADMIN


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
    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        access_token = create_access_token(identity=user.id,expires_delta=timedelta(days=1))
        refresh_token = create_refresh_token(identity=user.id, expires_delta=timedelta(milliseconds=30))
        return jsonify({'access_token':access_token,'refresh_token':refresh_token,"message":"login success"}),200
    return jsonify({'message':'invalid credentials'}),401