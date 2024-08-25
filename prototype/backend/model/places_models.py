from config import db

class Places(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.String(50), nullable=False)
    image = db.Column(db.LargeBinary, nullable=False)  # Large binary for image
    images = db.relationship('PlacesImages', backref='place', lazy=True)
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)

    def __repr__(self):
        return f'<Places {self.name}>'


class PlacesImages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.LargeBinary, nullable=False)  # Large binary for image
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)

    def __repr__(self):
        return f'<PlacesImages {self.id}>'


class States(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    places = db.relationship('Places', backref='state', lazy=True)

    def __repr__(self):
        return f'<States {self.name}>'


class StateImages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.LargeBinary, nullable=False)  # Large binary for image
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)

    def __repr__(self):
        return f'<StateImages {self.id}>'
