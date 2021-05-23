import axios from 'axios';

let urls = {
  development: 'http://localhost:3000/',
  production: 'https://wenzer.com/'
}

const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
})

export default api;