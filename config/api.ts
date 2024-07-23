import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1',
  headers: {
    'X-CSCAPI-KEY': 'YOUR_API_KEY',
  },
})

export default api;