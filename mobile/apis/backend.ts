import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'http://192.168.11.30:3500/api', // local
});

export default backendAPI;
