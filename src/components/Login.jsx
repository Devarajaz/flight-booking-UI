import React from "react";
import "./Login.css";
import flightImg from "../assets/flight.webp";

const Login = () => {
  return (
    <div className="login-container">

      {/* LEFT: Image Section */}
      <div className="login-image">
        <img src={flightImg} alt="Flight travel" />

        <div className="overlay">
          <h1>Fly Smart ✈️</h1>
          <p>Book flights in seconds</p>
        </div>
      </div>

      {/* RIGHT: OTP Login */}
      <div className="login-form">
        <h2>Login / Signup</h2>

        <input
          type="text"
          placeholder="Enter Mobile Number"
          maxLength="10"
        />

        <button>Send OTP</button>
      </div>

    </div>
  );
};

export default Login;
