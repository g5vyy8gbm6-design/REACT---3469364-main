/**
 * se crea una instancia configurada de axios para hablar con el 
 * backend (node/Express) en vez de escribir la url completa 
 * cada peticion la dejamos configurada una sola vez aqui 
 */


//libreria para hacer peticiones HTTP (GET POST)
import axios from "axios";
/**
 * url base del backend en un proyecto real esto vendria de una 
 * variable de entorno de vite (import.meta.env VITE_API_URL)
 * pero la vamos a  dejar fija apuntando al backend
 */
const API_URL = 'http//localhost:4000/api';
//axios.create genera una instancia propia distinta del axios global 
// con configuracion ya lista para usar en toda la aplicacion  
const axiosClient = axios.create ({
    baseURL: API_URL, //se antepone automaticamente a cada ruta relativa
    ej: /auth/login, 
    headers: {
        'Content_Type': 'application/json', // le avisamos al backend que mandamos al json
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