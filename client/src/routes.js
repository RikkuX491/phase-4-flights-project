import App from './components/App';
import ErrorPage from './components/ErrorPage';
import FlightList from './components/FlightList';
import NewFlightForm from './components/NewFlightForm';
import BookingList from './components/BookingList';
import NewBookingForm from './components/NewBookingForm';

const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <FlightList/>
            },
            {
                path: "/add_flight",
                element: <NewFlightForm/>
            },
            {
                path: "/bookings",
                element: <BookingList/>
            },
            {
                path: "/add_booking",
                element: <NewBookingForm/>
            }
        ]
    }
];

export default routes;