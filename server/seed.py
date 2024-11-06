#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, Flight, Customer, Booking

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        Flight.query.delete()
        Customer.query.delete()
        Booking.query.delete()

        flight1 = Flight(airline="Emirates", image="data:image/jpeg;base64,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", price=1234.56, origin="Newark, New Jersey (EWR)", destination="Athens, Greece (ATH)")
        flight2 = Flight(airline="Delta", image="data:image/jpeg;base64,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", price=987.65, origin="New York, NY (JFK)", destination="Honolulu, HI (HNL)")

        customer1 = Customer(first_name="Alice", last_name="Baker")
        customer2 = Customer(first_name="Bob", last_name="Carris")

        booking1 = Booking(number_of_tickets=3, flight_id=1, customer_id=1)
        booking2 = Booking(number_of_tickets=2, flight_id=2, customer_id=1)
        booking3 = Booking(number_of_tickets=4, flight_id=1, customer_id=2)

        db.session.add_all([flight1, flight2])
        db.session.add_all([customer1, customer2])
        db.session.add_all([booking1, booking2, booking3])
        db.session.commit()

        print("🌱 Flights, Customers, and Bookings successfully seeded! 🌱")
