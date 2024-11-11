import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',  // URL base de tu API FastAPI
  headers: {
    'Content-Type': 'application/json',  // Encabezado para que los datos sean JSON
  },
});

export default instance;
