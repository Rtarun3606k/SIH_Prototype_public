from config import db,app
from datetime import datetime,timezone

class USER(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(50),unique=True,nullable=False)
    email = db.Column(db.String(50),unique=True,nullable=False)
    password = db.Column(db.Text(),nullable=False)
    created_at = db.Column(db.DateTime,nullable=False,default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime,nullable=False,default=datetime.now(timezone.utc),onupdate=datetime.now(timezone.utc))

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return f'<User {self.username}>'