import { useLocation, useNavigate } from "react-router-dom";
import FlightCard from "../components/FlightCard";

function FlightListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const flights = location.state?.flights || [];
  const searchData = location.state?.searchData;

  // Handle refresh / direct access
  if (!searchData) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No Search Data Found</h2>
        <button onClick={() => navigate("/dashboard")}>
          Go Back
        </button>
      </div>
    );
  }

  const handleSelect = (flight) => {

    // Next step: navigate to booking page
    // navigate("/booking", { state: { flight, searchData } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {searchData.from} → 
        {" "}
        {searchData.to}
      </h2>
      <p>Date: {searchData.date}</p>

      {flights.length === 0 ? (
        <p>No flights found</p>
      ) : (
        flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onSelect={handleSelect}
          />
        ))
      )}
    </div>
  );
}

export default FlightListPage;
