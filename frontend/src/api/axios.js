import axios from "axios";

const api = axios.create({
  baseURL: "https://waste-management-backend-oavk.onrender.com/api",
  withCredentials: true
});



export default api;
