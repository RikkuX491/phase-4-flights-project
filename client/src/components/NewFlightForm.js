import {useState} from "react";

import { useOutletContext } from "react-router-dom";

function NewFlightForm(){

    const {addFlight} = useOutletContext();

    const [formData, setFormData] = useState({
        airline: "",
        image: "",
        price: "",
        origin: "",
        destination: ""
    })

    function handleSubmit(event){
        event.preventDefault()
        addFlight({...formData, price: Number(formData.price)})
    }

    function updateFormData(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Flight</h1>
            <label htmlFor="airline">Airline: </label>
            <input onChange={updateFormData} type="text" id="airline" name="airline" placeholder="New airline" value={formData.airline} required/>
            <br/><br/>
            <label htmlFor="image">Image: </label>
            <input onChange={updateFormData} type="text" id="image" name="image" placeholder="New image" value={formData.image} required/>
            <br/><br/>
            <label htmlFor="price">Price: </label>
            <input onChange={updateFormData} type="number" step="0.01" id="price" name="price" placeholder="New price" value={formData.price} required/>
            <br/><br/>
            <label htmlFor="origin">Origin: </label>
            <input onChange={updateFormData} type="text" id="origin" name="origin" placeholder="New origin" value={formData.origin} required/>
            <br/><br/>
            <label htmlFor="destination">Destination: </label>
            <input onChange={updateFormData} type="text" id="destination" name="destination" placeholder="New destination" value={formData.destination} required/>
            <br/><br/>
            <input type="submit" value="Add Flight"/>
        </form>
    );
}

export default NewFlightForm;