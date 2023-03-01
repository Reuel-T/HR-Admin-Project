import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5252/",
    headers: {
      "Content-type": "application/json"
    }
  });