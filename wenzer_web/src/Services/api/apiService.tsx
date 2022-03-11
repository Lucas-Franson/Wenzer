import axios from "axios";

const {
  REACT_APP_PROTOCOL, REACT_APP_SERVER, REACT_APP_PORT
} = process.env;

const apiService = axios.create({
  baseURL: `${REACT_APP_PROTOCOL}://${REACT_APP_SERVER}:${REACT_APP_PORT}`
});

export default apiService;
