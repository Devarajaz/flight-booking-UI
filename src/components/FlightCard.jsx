import "./FlightCard.css";

function FlightCard({ flight, onSelect }) {
    return (
        <div className="flight-card">
            <div className="flight-header">
                <h3>{flight.airline?.name}</h3>
                <span className="price">₹{flight.ticket_cost}</span>
            </div>

            <div className="flight-body">
                <p>
                   {flight.fromAirport?.city} → {" "}
                   {flight.toAirport?.city}
                </p>

                <p>
                  {new Date(flight.departure_time).toLocaleString()}
                </p>

                <p>
                   Aircraft:
                   {" "}
                   {flight.airpline?.model} 
                </p>
            </div>

            <button onClick={() => onSelect(flight)}>
               Select Flight
            </button>
        </div>
    );
}

export default FlightCard;