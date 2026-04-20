import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

export const sendOtp = (email) => {
    return API.post("/api/auth/send-otp", { email });
};

export const verifyOtp = (email, otp) => {
    return API.post("/api/auth/verify-otp", { email, otp });
};