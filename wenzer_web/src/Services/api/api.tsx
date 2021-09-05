import axios from "axios";

const api = axios.create({
  baseURL: "http://www.wenzer.ml:3333",
});

export default api;
