import {useState, useEffect} from "react";

import { useOutletContext } from "react-router-dom";

function NewBookingForm(){

    const {addBooking, flights, customers} = useOutletContext()

    const flightsOptionElements = flights.map(flight => {
        return <option value={flight.id}>{flight.id}: {flight.airline}</option>
    })

    const customersOptionsElements = customers.map(customer => {
        return <option value={customer.id}>{customer.id}: {customer.first_name} {customer.last_name}</option>
    })

    const [formData, setFormData] = useState({
        number_of_tickets: 1,
        flight_id: flights.length > 0 ? flights[0].id: "",
        customer_id: customers.length > 0 ? customers[0].id: ""
    })
    
    useEffect(() => {
        setFormData({...formData, flight_id: flights.length > 0 ? flights[0].id: ""})
    }, [flights])

    useEffect(() => {
        setFormData({...formData, customer_id: customers.length > 0 ? customers[0].id: ""})
    }, [customers])

    function updateFormData(event){
        if(event.target.name === 'number_of_tickets'){
            if(Number(event.target.value) > 0){
                setFormData({...formData, [event.target.name]: event.target.value})
            }
        }
        else{
            setFormData({...formData, [event.target.name]: event.target.value})
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        
        const newBooking = {
            number_of_tickets: Number(formData.number_of_tickets),
            flight_id: Number(formData.flight_id),
            customer_id: Number(formData.customer_id)
        }

        addBooking(newBooking)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Booking</h1>
            <label htmlFor="number_of_tickets">Number of tickets: </label>
            <input onChange={updateFormData} type="number" id="number_of_tickets" name="number_of_tickets" placeholder="New number of tickets" value={formData.number_of_tickets} required/>
            <br/><br/>
            <label htmlFor="flight_id">Flight ID: </label>
            <select onChange={updateFormData} id="flight_id" name="flight_id" value={formData.flight_id}>{flightsOptionElements}</select>
            <br/><br/>
            <label htmlFor="customer_id">Customer ID: </label>
            <select onChange={updateFormData} id="customer_id" name="customer_id" value={formData.customer_id}>{customersOptionsElements}</select>
            <br/><br/>
            <input type="submit" value="Add Booking"/>
        </form>
    );
}

export default NewBookingForm;