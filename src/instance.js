import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://services.baapofcharts.com',
});

export default instance;