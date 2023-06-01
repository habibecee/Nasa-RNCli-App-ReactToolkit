import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://eonet.gsfc.nasa.gov/api/v3/',
});

export default axiosInstance;
