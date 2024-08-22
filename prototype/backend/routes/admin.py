from flask import Blueprint,jsonify,request,current_app
import bcrypt
# from config import db
# from models import User,Product
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,create_refresh_token
from datetime import timedelta
import re



admin = Blueprint('admin', __name__)

@admin.route('/register',methods=['POST',"GET"])
def register():
    return jsonify({'message':'register'})