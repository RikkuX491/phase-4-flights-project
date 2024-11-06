function Booking({booking}){
    return (
        <li>
            <h1>Booking # {booking.id}</h1>
            <h2>Number of tickets: {booking.number_of_tickets}</h2>
            <h2>Total Price: ${booking.total_price}</h2>
            <h2>Airline: {booking.flight.airline}</h2>
            <h2>Customer Name: {booking.customer.first_name} {booking.customer.last_name}</h2>
        </li>
    );
}

export default Booking;