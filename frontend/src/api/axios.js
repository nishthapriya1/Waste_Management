import axios from "axios";

const api = axios.create({
  baseURL: "https://waste-management-dqro.onrender.com/api",
  withCredentials: true
});



export default api;
