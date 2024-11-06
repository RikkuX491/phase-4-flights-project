import React, { useEffect, useState } from "react";

import Header from "./Header";
import NavBar from "./NavBar";

import { Outlet, useNavigate } from "react-router-dom";

function App() {

  const [flights, setFlights] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate()

  useEffect(getFlights, [])

  useEffect(getCustomers, [])

  useEffect(getBookings, [])

  function getFlights(){
    fetch('/flights')
    .then(response => response.json())
    .then(flightsData => setFlights(flightsData))
  }

  function getCustomers(){
    fetch('/customers')
    .then(response => response.json())
    .then(customersData => setCustomers(customersData))
  }

  function getBookings(){
    fetch('/bookings')
    .then(response => response.json())
    .then(bookingsData => setBookings(bookingsData))
  }

  function addFlight(newFlight){
    fetch('/flights', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newFlight)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newFlightData => {
          setFlights([...flights, newFlightData])
          navigate('/')
        })
      }
      else{
        response.json().then(errorData => alert(`Error: ${errorData.error}`))
      }
    })
  }

  function addBooking(newBooking){
    fetch('/bookings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newBooking)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newBookingData => setBookings([...bookings, newBookingData]))
        navigate('/bookings')
      }
      else{
        response.json().then(errorData => alert(`Error: ${errorData.error}`))
      }
    })
  }

  function editFlight(id, flightDataForUpdate){
    fetch(`/flights/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(flightDataForUpdate)
    })
    .then(response => {
      if(response.ok){
        response.json().then(updatedFlight => {
          const updatedFlightsArray = flights.map(flight => {
            if(flight.id === updatedFlight.id){
              return updatedFlight
            }
            else{
              return flight
            }
          })
          setFlights(updatedFlightsArray)
        })
      }
      else{
        response.json().then(errorData => alert(`Error: ${errorData.error}`))
      }
    })
  }

  function deleteFlight(id){
    fetch(`/flights/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok){
        const updatedFlightsArray = flights.filter(flight => {
          return flight.id !== id
        })
        setFlights(updatedFlightsArray)
      }
    })
  }

  return (
    <div>
      <NavBar/>
      <Header/>
      <Outlet context={
        {
          flights: flights,
          addFlight: addFlight,
          editFlight: editFlight,
          deleteFlight: deleteFlight,
          customers: customers,
          bookings: bookings,
          addBooking: addBooking
        }
      }/>
    </div>
  );
}

export default App;
