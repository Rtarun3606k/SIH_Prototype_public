from flask import Flask , request ,jsonify ,Blueprint
from config import app, db
from model.admin_model import ADMIN
from flask_jwt_extended import verify_jwt_in_request, create_access_token, create_refresh_token, get_jwt_identity, get_jwt, jwt_required
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

# importing all files from models folder
# from model.user_model import USER
# from model.places_models import Places_images,PLACES,States

# impoting all files from routes folder
from routes.admin import admin
from routes.check_session_token import check_session_token


# app.register_blueprint(admin, url_prefix='/loginRegister')

app.register_blueprint(admin,url_prefix='/admin')
app.register_blueprint(check_session_token,url_prefix='/check_session_token')



@app.route('/check_token', methods=['POST'])
def check_token():
    try:
        verify_jwt_in_request()
        return jsonify({"msg": "Token is valid"}), 200
    except ExpiredSignatureError:
        return jsonify({"msg": "Token is expired"}), 401
    except InvalidTokenError:
        return jsonify({"msg": "Invalid token"}), 401
    except Exception as e:
        return jsonify({"msg": str(e)}), 401