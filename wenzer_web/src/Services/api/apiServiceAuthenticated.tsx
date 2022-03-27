import axios from "axios";
import Cookies from 'js-cookie';

const {
  REACT_APP_PROTOCOL, REACT_APP_SERVER, REACT_APP_PORT
} = process.env;

const APIServiceAuthenticated = axios.create({
  baseURL: `${REACT_APP_PROTOCOL}://${REACT_APP_SERVER}:${REACT_APP_PORT}`
});

APIServiceAuthenticated.interceptors.request.use(async config => {
    const token = Cookies.get('WenzerToken')
    if (token) {
        APIServiceAuthenticated.defaults.headers.common['auth'] = `${token}`;
    }
    console.log(token);
    return config;
  });

export default APIServiceAuthenticated;
