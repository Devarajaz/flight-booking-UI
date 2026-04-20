import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        from: "",
        to: "",
        date: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        navigate("/flights", { state: form });
    };

    return (
        <div>
            <h2>Search Flights</h2>

            <input name="from" placeholder="From" onchange={handleChange} />
            <input name="to" placeholder="To" onChange={handleChange} />
            <input name="date" type="date" onChange={handleChange} />

            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchPage;