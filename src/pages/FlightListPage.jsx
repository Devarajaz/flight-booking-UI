import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function FlightListPage() {
        const location = useLocation();
        const searchData = location.state;

        const [flights, setFlights] = useState([]);

        useEffect(() => {
            //Mock data (replace with API later)
            setFlights([
                { id:1, airline: "Indigo", price: 5000 },
                { id:2, airline: "Air India", price: 6500 },
            ]);
        }, []);

        return (
            <div>
                <h2>Flights</h2>

                {flights.map((flight) => (
                    <div key={flight.id}>
                        <p>{flight.airline}</p>
                        <p>{flight.price}</p>
                        <button>Select</button>
                    </div>
                ))}
            </div>
        );
}

export default FlightListPage;