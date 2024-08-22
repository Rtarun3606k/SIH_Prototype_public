from config import db,app

class ADMIN(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(50),unique=True,nullable=False)
    email = db.Column(db.String(50),unique=True,nullable=False)
    password = db.Column(db.String(100),nullable=False)

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return f'<ADMIN {self.username}>'