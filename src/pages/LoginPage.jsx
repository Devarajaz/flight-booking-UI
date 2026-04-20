import { useState } from "react";
import flightImg from "../assets/flight.jpg";
import { sendOtp, verifyOtp } from "../services/authService";
import "../styles/Login.css";

function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!email.includes("@")) {
        alert("Enter valid email");
        return;
    }

    try {
      await sendOtp(email);
      alert("OTP sent to your email");
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      console.log("Verify Response:", res.data);
      alert("Login Successful");
      // Save token if backend sends one
      if(res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      //Redirect
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Verify Error:", err.response || err);
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${flightImg})` }}
    >
      <div className="overlay">

        {/* TOP QUOTE */}
        <div className="top-quote">
            <h1>"Travel the world, one flight at a time"</h1>
        </div>

        {/* LOGIN BOX */}
        <div className="login-box">
          <h2>Login with OTP</h2>

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSendOtp}>Send OTP</button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerifyOtp}>Verify OTP</button>
            </>
          )}
        </div>

        {/* BOTTOM APP NAME */}
        <div className="bottom-brand">
            SkyBooker
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
