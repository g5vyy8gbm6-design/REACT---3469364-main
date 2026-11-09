/**
 * Se crea una instancia configurada de axios para hablar con el
 * backend (node/express) en vez de escrinir la url completa
 * Cada peticion la dejamos configurada una sola vez aqui
 */

//libreria para hacer peticiones http (Get, Post)
import axios from "axios";

/**
 * URL base del backend en un proyecto real esto vendria de una 
 * variable de entorno vite (import.meta.env VITE_API_URL)
 * pero la fija apuntando al backend
 */
const API_URL = "http://localhost:4000/api";
// axios.create genera una instancia propia del axios global
//con configuracion ya lista para usar en toda la aplicaccion
const axiosClient = axios.create({
    baseURL: API_URL, // se antepone automaticamente a cada ruta relativa ej; /auth/Login 
    headers: {
        "Content-Type": "application/json", // tipo de contenido que se envia al backend
    },
});

/**
 * interceptor de peticiones, se ejecuta antes de enviar la peticion al backend
 * peticion aqui aprovecganos agregar automaticamente el
 * token JTW guardado en localStorage (si existe) al header de la peticion
 * autorizacopn para no tener que repetirlo en cada llamada
 */
axiosClient.interceptors.request.use((config) => {
    //recisamos si hay un token guardadp de una seccion iniciado}
    const token = localStorage.getItem("token");
    if (token) {
        // Lo agregamos al header en el formato que espera el backend
        //authorization: Bearer <token>
        config.headers.Authorization = `Bearer ${token}`;
    }
});