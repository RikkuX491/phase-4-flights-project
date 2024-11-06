#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Flight, Customer

# Views go here!
class AllFlights(Resource):
    def get(self):
        flights = Flight.query.all()
        response_body = [flight.to_dict(only=('id', 'airline', 'image', 'price', 'origin', 'destination')) for flight in flights]
        return make_response(response_body, 200)
    
    def post(self):
        airline_data = request.json.get('airline')
        image_data = request.json.get('image')
        price_data = request.json.get('price')
        origin_data = request.json.get('origin')
        destination_data = request.json.get('destination')
        try:
            new_flight = Flight(airline=airline_data, image=image_data, price=price_data, origin=origin_data, destination=destination_data)
            db.session.add(new_flight)
            db.session.commit()
            response_body = new_flight.to_dict(only=('id', 'airline', 'image', 'price', 'origin', 'destination'))
            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "Invalid flight data provided!"
            }
            return make_response(response_body, 422)

api.add_resource(AllFlights, "/flights")

class FlightByID(Resource):
    def patch(self, id):
        flight = db.session.get(Flight, id)

        if flight:
            try:
                for attr in request.json:
                    setattr(flight, attr, request.json.get(attr))
                db.session.commit()
                response_body = flight.to_dict(only=('id', 'airline', 'image', 'price', 'origin', 'destination'))
                return make_response(response_body, 200)

            except:
                response_body = {
                    "error": "Invalid flight data provided!"
                }
                return make_response(response_body, 422)

        else:
            response_body = {
                "error": "Flight Not Found!"
            }
            return make_response(response_body, 404)
        
    def delete(self, id):
        flight = db.session.get(Flight, id)

        if flight:
            db.session.delete(flight)
            db.session.commit()
            return make_response({}, 204)
        
        else:
            response_body = {
                "error": "Flight Not Found!"
            }
            return make_response(response_body, 404)

api.add_resource(FlightByID, '/flights/<int:id>')

class AllCustomers(Resource):
    def get(self):
        customers = Customer.query.all()
        response_body = [customer.to_dict(only=('id', 'first_name', 'last_name')) for customer in customers]
        return make_response(response_body, 200)

    def post(self):
        first_name_data = request.json.get('first_name')
        last_name_data = request.json.get('last_name')
        try:
            new_customer = Customer(first_name=first_name_data, last_name=last_name_data)
            db.session.add(new_customer)
            db.session.commit()
            response_body = new_customer.to_dict(only=('id', 'first_name', 'last_name'))
            return make_response(response_body, 201)
        except:
            response_body = {
                "error": "Invalid customer data provided!"
            }
            return make_response(response_body, 422)

api.add_resource(AllCustomers, '/customers')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

