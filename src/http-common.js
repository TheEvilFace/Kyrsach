import axios from "axios";

// Создание модели axios

export default axios.create({
  baseURL: "http://c031dade8941.eu.ngrok.io/api/v1",
  headers: {
    "Content-type": "application/json",
    "Authorization": ``
  }
});
