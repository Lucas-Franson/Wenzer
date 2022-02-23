import axios from "axios";

const api = axios.create({
  baseURL: "http://www.wenzer.com.br:3333/",
});

export default api;
