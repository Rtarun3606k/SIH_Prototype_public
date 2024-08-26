from flask import Blueprint,jsonify,request,current_app
import bcrypt
from config import db
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,create_refresh_token
from datetime import timedelta
import re
import bcrypt
from sqlalchemy.exc import IntegrityError
import base64

#import models form model
from model.admin_model import ADMIN
from model.places_models import States,StateImages,Places,PlacesImages,Categories


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
    print("inside")
    get_data = request.json
    email = get_data.get("email")
    password = get_data.get("password")
    if not email or not password:
        return jsonify({'message':'please fill all the fields'}),401
    user = ADMIN.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message':'user not found'}),401
    if bcrypt.checkpw(password.encode('utf-8'), user.password):
        print("checked password")
        access_token = create_access_token(identity=user.id,expires_delta=timedelta(days=1))
        refresh_token = create_refresh_token(identity=user.id, expires_delta=timedelta(milliseconds=30))
        print(access_token,refresh_token,"token")
        return jsonify({'access_token':access_token,'refresh_token':refresh_token,"message":"login success"}),200
    return jsonify({'message':'invalid credentials'}),401

# new = PLACES(name='new',description='new',location='new',category='new',price='new',rating='new',image='new',state=1)





@admin.route('/add_state',methods=['POST'])
@jwt_required()
def add_state():
    identity = get_jwt_identity()
    check_user = ADMIN.query.filter_by(id=identity).first()
    if not check_user:
        return jsonify({'message':'user not found'}),401
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
    
@admin.route("/get_cat",methods=['GET'])
def get_cat():
    cat = Categories.query.all()
    cat_list = []
    for i in cat:
        cat_list.append({'id':i.id,'name':i.name})
    return jsonify({'cat':cat_list,"message":"data sent sucessfully"}),200

@admin.route("/add_cat",methods=['POST'])
@jwt_required()
def add_cat():
    identity = get_jwt_identity()
    check_user = ADMIN.query.filter_by(id=identity).first()
    if not check_user:
        return jsonify({'message':'user not found'}),401
    get_data = request.json
    cat = get_data.get("cat")
    new_cat = Categories(name=cat)
    try:
        db.session.add(new_cat)
        db.session.commit()
        return jsonify({'message':'category added successfully'}),200
    except Exception as e:
        return jsonify({'message':f'{e}'}),401
    


@admin.route('/add_place', methods=['POST'])
@jwt_required()
def add_place():
    identity = get_jwt_identity()
    check_user = ADMIN.query.filter_by(id=identity).first()
    if not check_user:
        return jsonify({'message': 'User not found'}), 401

    # Extract data from the request
    name = request.json.get('name')
    description = request.json.get('description')
    location = request.json.get('location')
    category = request.json.get('category')
    price = request.json.get('price')
    rating = request.json.get('rating')
    state = request.json.get('state')

    # Extract and decode images
    image_data = []
    for i in range(1, 6):  # Assuming up to 5 images
        image = request.json.get(f'image{i}')
        mimetype = request.json.get(f'mimetype{i}')
        if image and mimetype:
            decoded_image = base64.b64decode(image)
            image_data.append((decoded_image, mimetype))

    # Validation
    if not all([name, description, location, category, price, rating, state]) or not image_data:
        return jsonify({'message': 'Please fill all the fields and upload images'}), 400

    # Find state and category
    state_obj = States.query.filter_by(name=state).first()
    category_obj = Categories.query.filter_by(name=category).first()

    if not state_obj or not category_obj:
        return jsonify({'message': 'Invalid state or category'}), 400

    # Create a new place instance
    new_place = Places(
        name=name,
        description=description,
        location=location,
        categories=category_obj.id,
        price=price,
        rating=rating,
        state_id=state_obj.id
    )

    try:
        db.session.add(new_place)
        db.session.commit()

        # Add images
        for image, mimetype in image_data:
            place_image = PlacesImages(image=image, mimetype=mimetype, place_id=new_place.id)
            db.session.add(place_image)

        db.session.commit()
        return jsonify({'message': 'Place added successfully'}), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding place: {e}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Unexpected error: {e}'}), 500