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

@admin.route('/register',methods=['POST',"GET"])
def register():
    get_data = request.json
    email = get_data.get("email")
    password = get_data.get("password")
    username = get_data.get("username")
    if not email or not password or not username:
        return jsonify({'message':'please fill all the fields'})
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'message':'invalid email'})
    if len(password) < 6:
        return jsonify({'message':'password must be 6 characters or more'})
    if len(username) < 6:
        return jsonify({'message':'username must be 6 characters or more'})
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = ADMIN(username=username,email=email,password=hashed)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"messgae":'register'})
    except Exception as e:
        return jsonify({'message':f'{e}'})

