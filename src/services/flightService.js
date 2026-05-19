import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const searchFlights = async (payload) => {
  const response = await API.post("/flights/search", payload);
  return response.data;
};
