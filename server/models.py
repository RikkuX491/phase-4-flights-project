from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!

class Flight(db.Model, SerializerMixin):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    airline = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    origin = db.Column(db.String, nullable=False)
    destination = db.Column(db.String, nullable=False)

    @validates('price')
    def validate_price(self, column, value):
        if type(value) in [float, int] and value > 0:
            return value
        else:
            raise Exception(f"{column} must be a number that is greater than 0!")
        
class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    @validates('first_name', 'last_name')
    def validate_columns(self, column, value):
        if type(value) == str and len(value) >= 3:
            return value
        else:
            raise Exception(f"{column} must be a string that is at least 3 characters long!")