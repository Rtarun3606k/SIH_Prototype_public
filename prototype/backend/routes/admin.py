from flask import Blueprint,jsonify,request,current_app,send_file
import bcrypt
from config import db
from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,create_refresh_token
from datetime import timedelta
import re
import bcrypt
from sqlalchemy.exc import IntegrityError
import base64
from werkzeug.utils import secure_filename
from io import BytesIO
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
    state = get_data.get("state_name")
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

    # Extract data from the form
    name = request.form.get('place_name')
    description = request.form.get('description')

    category = request.form.get('cat_name')
    price = request.form.get('price')
    rating = request.form.get('rating')
    state = request.form.get('state_name')
    print(name,description,category,price,rating,state)
    print(request.files)

    # Extract and handle images
    image_files = request.files.getlist('images')
    if not image_files:
        return jsonify({'message': 'Please upload at least one image'}), 400

    # Validation
    if not all([name, description, category, price, rating, state]):
        return jsonify({'message': 'Please fill all the fields'}), 400

    # Find state and category
    state_obj = States.query.filter_by(name=state).first()
    category_obj = Categories.query.filter_by(name=category).first()

    if not state_obj or not category_obj:
        return jsonify({'message': 'Invalid state or category'}), 400

    # Create a new place instance
    new_place = Places(
        name=name,
        description=description,
        State_name=state,
        categories=category_obj.id,
        price=price,
        rating=rating,
        state_id=state_obj.id
    )

    try:
        db.session.add(new_place)
        db.session.commit()

        # Add images
        for image_file in image_files:
            image = image_file.read()
            mimetype = image_file.mimetype
            place_image = PlacesImages(image=image, mimetype=mimetype, place_id=new_place.id, image_name=image_file.filename)
            db.session.add(place_image)

        db.session.commit()
        return jsonify({'message': 'Place added successfully'}), 200
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding place: {e}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Unexpected error: {e}'}), 500
    


@admin.route('/get_places', methods=['GET'])
def get_places():
    places = Places.query.all()
    places_list = []
    for place in places:
        images = PlacesImages.query.filter_by(place_id=place.id).all()
        images_list = [{'id': image.id, 'image_name': image.image_name, 'mimetype': image.mimetype} for image in images]
        places_list.append({
            'id': place.id,
            'name': place.name,
            'description': place.description,
            'state': place.state.name,
            'category': place.categories,
            'price': place.price,
            'rating': place.rating,
            'images': images_list
        })
    # print(places_list)
    return jsonify({'places': places_list,"message":"data sent sucessfully"}), 200



@admin.route('/get_place/<int:id>', methods=['GET'])
def get_place(id):
    place = Places.query.get(id)
    if not place:
        return jsonify({'message': 'Place not found'}), 404

    images = PlacesImages.query.filter_by(place_id=place.id).all()
    images_list = [{'id': image.id, 'image_name': image.image_name, 'mimetype': image.mimetype} for image in images]

    return jsonify({
        'id': place.id,
        'name': place.name,
        'description': place.description,
        'state': place.state.name,
        'category': place.categories.name,
        'price': place.price,
        'rating': place.rating,
        'images': images_list
    }), 200



@admin.route("/get_image/<int:id>", methods=['GET'])
def get_image(id):
    image_data = PlacesImages.query.get_or_404(id)
    # image_data = PlacesImages.query.filter_by(place_id=id).all()
    print(image_data)
    if not image_data:
        return jsonify({'message': 'Image not found'}), 404

    # Return the image with the appropriate mimetype
    return send_file(BytesIO(image_data.image), mimetype=image_data.mimetype)



# delete routes for admin

@admin.route('/delete_image/<int:id>', methods=['DELETE'])
def delete_image(id):
    image = PlacesImages.query.filter_by(id=id).first()
    if not image:
        return jsonify({'message': 'Image not found'}), 404

    db.session.delete(image)
    db.session.commit()

    return jsonify({'message': 'Image deleted successfully'}), 200
