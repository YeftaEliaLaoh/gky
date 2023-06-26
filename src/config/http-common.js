import axios from "axios";

export default axios.create({
  baseURL: "https://gkypluit.church/gky_api/api/",
  headers: {
    "Content-type": "application/json",  
  }
});