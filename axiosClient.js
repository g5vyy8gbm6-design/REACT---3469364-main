/**
 * Se crea una instancia configurada de axios para hablar con el
 * backend (node/express) en vez de escribir la url completa 
 * cada peticion la dejamos configurada una sola vez aqui 
 */

//libreria para hacer peticiones >HTTP (GET POST)
import axios from 'axios';

/**URL base del backend en un proyecto reak esto vendria de una variable de una 
 * variable de entorno vite (import.meta.env VITE_API_URL)
 * pero la fija apuntando al backend
*/

const API_URL = "HTTP://localhost:4000/api";
//axios.create genera una instancia propia del axios global
//con configuraciones ya listas para usar en toda la aplicacion 
const axiosClient = axios.create({
  baseURL: API_URL, // se antepone automaticamente a cada ruta relativa ej: auth/login
  headers:{
    'content-type': 'application/json', // le avisamos al backend que mandamos el json 
  },
});

/**
 * Interceptor de peticiones se ejecuta antes de enviar cada
 * peticion aqui aprovechamos para agregar automaticamente el
 * token JWT guardado en localStortage (si existe) al header
 * Authorization para no tener que repetirlo en cada llamada.
 */
axiosClient.interceptors.request.use((config) => {
  //Revisamos si hay un token de sesion iniciado
  const token = localStorage.getItem('token');
  if (token) {
    //Lo agregamos al header en el formato que espera el backend:
    //Authorization: Beader <token>
  config.headers.Authorization = 'Bearer ${token}';
  }
  // Siempre hay que devolver  "config" si o no la peticion nunca se envia
  return config;
});
//  Exportamos la instancia ya configurada para usarla en toda la aplicacion
export default axiosClient;




