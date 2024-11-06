import React, { useEffect, useState } from "react";

import Header from "./Header";
import NavBar from "./NavBar";

import { Outlet, useNavigate } from "react-router-dom";

function App() {

  const [flights, setFlights] = useState([]);

  const navigate = useNavigate()

  useEffect(getFlights, [])

  function getFlights(){
    fetch('/flights')
    .then(response => response.json())
    .then(flightsData => setFlights(flightsData))
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
    // console.log(id)
    // console.log('deleting flight...')
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
          deleteFlight: deleteFlight
        }
      }/>
    </div>
  );
}

export default App;
