from flask import Flask , request ,jsonify ,Blueprint
from config import app, db
# from models import User
from flask_jwt_extended import verify_jwt_in_request, create_access_token, create_refresh_token, get_jwt_identity, get_jwt, jwt_required

# impoting all files from routes folder
from routes.admin import admin

# app.register_blueprint(admin, url_prefix='/loginRegister')

app.register_blueprint(admin,url_prefix='/admin')
