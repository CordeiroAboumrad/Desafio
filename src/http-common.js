import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  // baseURL: 'http://localhost:8081/',
  baseURL: `http://localhost:${process.env.PORT}/`,
  headers: {
    'Content-type': 'application/json',
  },
});
