import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchFlights } from "../services/flightService";
import bgImage from "../assets/dashboard_pic.jpg";
import "../components/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        from: "",
        to: "",
        date: "",
        passengers: {
            adults: 1,
            children: 0,
            infants: 0,
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassenger, setShowPassenger] = useState(false);

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // ✅ Update passengers
    const updatePassenger = (type, value) => {
        setForm((prev) => {
            const newValue = prev.passengers[type] + value;

            if (type === "adults" && newValue < 1) return prev;

            return {
                ...prev,
                passengers: {
                    ...prev.passengers,
                    [type]: Math.max(0, newValue),
                },
            };
        });
    };

    // ✅ Form validation
    const isFormValid =
        form.from &&
        form.to &&
        form.date &&
        form.from !== form.to;

    // ✅ API Search
    const handleSearch = async () => {
        if (!isFormValid) {
            alert("Please fill valid details");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (form.date < today) {
            alert("Date cannot be in the past");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const payload = {
                from: form.from,
                to: form.to,
                date: form.date,
                passengers:
                    form.passengers.adults +
                    form.passengers.children +
                    form.passengers.infants,
            };
            
            const res = await searchFlights(payload);
            
            navigate("/flights", {
                state: {
                    flights: res.flights,
                    searchData: form,
                },
            });

        } catch (error) {
            console.error("FULL ERROR:", error);
            if (error.response) {
               console.log("Backend Error:", error.response.data);
            }

             if (error.request) {
               console.log("No response received from backend");
            }

            console.log("Error Message:", error.message);

            setError("Failed to fetch flights");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="dashboard-container"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="header">✈ Flight Booking</div>

            <div className="search-box">
                <div className="tabs">
                    <button className="active">One way</button>
                    <button>Round Trip</button>
                </div>

                <div className="form-row">

                    <input
                        name="from"
                        placeholder="From"
                        value={form.from}
                        onChange={handleChange}
                    />

                    <button
                        className="swap-btn"
                        onClick={() =>
                            setForm({ ...form, from: form.to, to: form.from })
                        }
                    >
                        ↔
                    </button>

                    <input
                        name="to"
                        placeholder="To"
                        value={form.to}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />

                    {/* Passenger Selector */}
                    <div className="passenger-box">
                        <div
                            className="passenger-display"
                            onClick={() => setShowPassenger(!showPassenger)}
                        >
                            {form.passengers.adults +
                                form.passengers.children +
                                form.passengers.infants} Passengers
                        </div>

                        {showPassenger && (
                            <div className="passenger-dropdown">

                                <div className="row">
                                    <span>🧑 Adults</span>
                                    <div>
                                        <button onClick={() => updatePassenger("adults", -1)}>-</button>
                                        <span>{form.passengers.adults}</span>
                                        <button onClick={() => updatePassenger("adults", 1)}>+</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <span>🧒 Children</span>
                                    <div>
                                        <button onClick={() => updatePassenger("children", -1)}>-</button>
                                        <span>{form.passengers.children}</span>
                                        <button onClick={() => updatePassenger("children", 1)}>+</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <span>👶 Infants</span>
                                    <div>
                                        <button onClick={() => updatePassenger("infants", -1)}>-</button>
                                        <span>{form.passengers.infants}</span>
                                        <button onClick={() => updatePassenger("infants", 1)}>+</button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>

                    <button
                        className="search-btn"
                        onClick={handleSearch}
                        disabled={!isFormValid || loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
