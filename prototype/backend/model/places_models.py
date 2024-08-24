from config import db

class PLACES(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),nullable=False)
    description = db.Column(db.Text(),nullable=False)
    location = db.Column(db.String(50),nullable=False)
    category = db.Column(db.String(50),nullable=False)
    price = db.Column(db.String(50),nullable=False)
    rating = db.Column(db.String(50),nullable=False)
    image = db.Column(db.String(50),nullable=False)
    images = db.relationship('Places_images',backref='places',lazy=True)
    state = db.Column(db.Integer,db.ForeignKey('states.id'),nullable=False)



class Places_images(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    image = db.Column(db.String(50),nullable=False)
    place_id = db.Column(db.Integer,db.ForeignKey('places.id'),nullable=False)


class States(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),nullable=False)
    places = db.relationship('PLACES',backref='states',lazy=True)

    def __repr__(self):
        return f'<States {self.name}>'