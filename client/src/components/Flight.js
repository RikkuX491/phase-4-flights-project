import {useState} from "react";

import { useOutletContext } from "react-router-dom";

function Flight({flight}){

    const [displayForm, setDisplayForm] = useState(false)

    const [formData, setFormData] = useState({
        airline: flight.airline,
        image: flight.image,
        price: flight.price,
        origin: flight.origin,
        destination: flight.destination
    })

    const {editFlight, deleteFlight} = useOutletContext()

    function updateFormData(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function toggleDisplayForm(){
        setDisplayForm(!displayForm)
    }

    function handleSubmit(event){
        event.preventDefault()
        editFlight(flight.id, {...formData, price: Number(formData.price)})
        toggleDisplayForm()
    }

    function handleDeleteButtonClick(){
        deleteFlight(flight.id)
    }

    return (
        <li>
            <h1>Flight # {flight.id}</h1>
            { !displayForm ?
            <div id="airline-display">
                <h2>Airline: {flight.airline}</h2>
                <img src={flight.image} alt={flight.airline}/>
                <h2>Price: {flight.price}</h2>
                <h2>Origin: {flight.origin}</h2>
                <h2>Destination: {flight.destination}</h2>
                <button onClick={toggleDisplayForm}>Edit</button>
                <button onClick={handleDeleteButtonClick}>Delete</button>
            </div>
            :
            <form onSubmit={handleSubmit} id="edit-flight">
                <label htmlFor="airline">Airline: </label>
                <input onChange={updateFormData} type="text" id="airline" name="airline" placeholder="Edit airline" value={formData.airline} required/>
                <br/><br/>
                <label htmlFor="image">Image: </label>
                <input onChange={updateFormData} type="text" id="image" name="image" placeholder="Edit image" value={formData.image} required/>
                <br/><br/>
                <label htmlFor="price">Price: </label>
                <input onChange={updateFormData} type="number" step="0.01" id="price" name="price" placeholder="Edit price" value={formData.price} required/>
                <br/><br/>
                <label htmlFor="origin">Origin: </label>
                <input onChange={updateFormData} type="text" id="origin" name="origin" placeholder="Edit origin" value={formData.origin} required/>
                <br/><br/>
                <label htmlFor="destination">Destination: </label>
                <input onChange={updateFormData} type="text" id="destination" name="destination" placeholder="Edit destination" value={formData.destination} required/>
                <br/><br/>
                <input type="submit" value="Update Flight"/>
            </form>
            }
        </li>
    );
}

export default Flight;