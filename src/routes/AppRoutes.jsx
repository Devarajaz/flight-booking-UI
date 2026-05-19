import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import FlightListPage from "../pages/FlightListPage";

function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/flights" element={<FlightListPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;