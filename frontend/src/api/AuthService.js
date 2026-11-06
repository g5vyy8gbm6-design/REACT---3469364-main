/**
 * concreta las llamadas a la API relacionadas con la autenticación de usuarios.
 * los componenes (por ejemplo loginpage) no lo llaman a axios 
 * directamente llaman funciones que son mas faciles 
 * de leer y de reutilizar 
 */

//instancia de axios ya configurada con la url del backend y el token 
import axiosClient from "./axiosClient";

//envia email y password al backend si son correctos devuelve el backend 
//responde con {token, user } si no axios lanza error 
//que el componente que llama debe capturar con try/catch 
export async function iniciarSesion(email, password) {
    const respuesta = await axiosClient.post ('/auth/login', {email, password}); 
    return respuesta.data; //{token, usuario}
}

// pide al backend los datos del usuario dueño del token actual
//sirve por ejemplo para validar la sesion cuando se recarga la pagina 
export async function obtenerPerfil(){
    const respuesta = await axiosClient.get ('/auth/perfil');
    return respuesta.data; // {usuario}
}
