import axios from "axios";

export default axios.create({
  baseURL: "https://andtechnology.online/api/",
  headers: {
    "Content-type": "application/json",  
  }
});