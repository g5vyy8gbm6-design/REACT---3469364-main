/** 
 * pantalla login funcional
 * 
 * pantalla publica de inicio de sesion es la unica parte del 
 * sistema que habla con la base de datos MYSQL real a travez del
 * backend Node/Express si las credenciales son correctas 
 * redirije al usuario al dashboard 
 */

//hook del estado local para los campos del formulario 
import { useState } from "react";
//Hook para redirigir por codigo despues de iniciar sesion 
import { useNavigate } from "react-router-dom";
//hook para llamar a login () del contexto global de sesion 
import { useAuth } from '../context/AuthContext';

//no recibe prompts es el elemento de la ruta publica / login en App.jsx 
function LoginPage() {
    //Traemos solo la funcion login() del contexto no se necesita mas 
    const { login} = useAuth();
    //Funcion para cambiar la URL una vez el login sea exitoso 
    const navigate = useNavigate();

    //estado del formulario controlado
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    //Estado para mostrar el error que devuelva el backend credenciales
    //invalidas, usuario desactivado servidor caido o demas 
    const [error, setError] = useState('');

    //estado para deshabilitar el boton mientras espera la respuesta
    //y evita que el usuario haga doble click 
    const [enviado, setEnviado] = useState (false);

    //se ejecuta cuando el usuario envia el formulario boton o enter
    async function manejarEnvio(evento) {
        evento.preventDefault(); // evita que el navegador recargue la pagina 
        setError (''); //limpia cualquier error de un intento anterior 
        setEnviado(true); //deshabilita el boton mientras espera la respuesta del backend

        try {
            //login()esta definido en AuthContext: llama al backend
            //guarda el token/usuario y actualiza el estado global
            await login(email, password);
            //si no lanzo error, las credenciales fueron correctas
            navigate('/dashboard', { replace: true }); //redirige al dashboard reemplazando la URL actual
        } catch (err) {
            //si el backend respondio un mensaje (401, 403...)
            //axios lo deja disponible en err.response.data.message
            const mensajeBackend = err.response?.data?.message;
            setError(mensajeBackend || 'no se pudo conectar con el servidor. Verifica que el backend este corriendo');

        } finally {
        //finally se esjecuta siempre (haya exito o error ) reactivamos el boton

    setEnviado(false);
    }

}

}