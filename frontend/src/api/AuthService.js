/**
 * Concreta las llamadas a la api relacionadas con autenticaccion
 * los componentes (por ejemplo loeginpage) no llaman al axios
 * directamente llaman a estas funciones que son mas faciles
 * de leer y de reutlizar
 */

// instancio de axios ya configurada con la url del backend y el token 
import axiosClient from "./axiosClient";

// envia email y password al backend si son correctos en bakend
// responde con {token, user} si no axios lanza error
//que el componente que llama debe capturar con try/catch
export async function iniciarsesion (email, password) 
{
    const response = await axiosClient.post("/auth/login", { email, password });
    return response.data;// {token, user}
}

//pide al backend los datos de usuario dueño actual del token almacenado
//sirve por ejemolo para validar la seccion cuando se recarga la pagina
export async function obtenerPerfil ()
{
    const response = await axiosClient.get("/auth/profile");
    return response.data;
}