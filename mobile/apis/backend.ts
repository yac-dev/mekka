import axios from 'axios';
import baseURL from './baseURL';

const backendAPI = axios.create({
  // baseURL: 'http://192.168.11.30:3500/api', // local
  baseURL: 'http://10.113.192.110:3500/api', // local
});

export default backendAPI;
