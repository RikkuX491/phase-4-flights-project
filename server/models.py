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

    bookings = db.relationship('Booking', back_populates="flight")

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

    bookings = db.relationship('Booking', back_populates="customer")

    @validates('first_name', 'last_name')
    def validate_columns(self, column, value):
        if type(value) == str and len(value) >= 3:
            return value
        else:
            raise Exception(f"{column} must be a string that is at least 3 characters long!")
        
class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)

    # This is an example of a user submittable attribute (a user specifying how many tickets they want to purchase for their booking)
    number_of_tickets = db.Column(db.Integer, nullable=False)

    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)

    flight = db.relationship('Flight', back_populates="bookings")
    customer = db.relationship('Customer', back_populates="bookings")

    @validates("flight_id", "customer_id")
    def validate_foreign_key_columns(self, column, value):
        if type(value) == int:
            return value
        else:
            raise Exception(f"{column} must be an integer!")
        
    @validates("number_of_tickets")
    def validate_number_of_tickets(self, column, value):
        if type(value) == int and value > 0:
            return value
        else:
            raise Exception(f"{column} must be an integer that is greater than 0!")