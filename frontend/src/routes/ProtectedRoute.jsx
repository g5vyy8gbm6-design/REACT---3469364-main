/*import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { cargando, estaAutenticado } = useAuth();

  if (cargando) {
    return null;
  }

  return estaAutenticado ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;*/


/**
 * componenten que guardian de ruta se usa
 * envolviendo las rutas del dashboard en 
 * app.jsx si el usuario No a iniciado sesion lo redirige
 * automaticamente a /login en vez de mostrar el contenido
 */

//Navigate redirige a otra ruta; outlet renderiza la ruta hija activa
import {Navigate, outle} from 'react-router-dom';
//hook para leer el estado de sesion (usuario, cargando..)
import {useAuth} from '../context/authContext.jsx';

//no recibe props: se usa como elemento envolvente en app.jsx
function ProtectedRoute() {
  //leemos del contexto si hay sesion activa y si todavia se esta verificando 
  const {estaAutenticado, cargando} = useAuth();

  //Mientras se revisa si habia un inicio de sesion guardada en localstorage, 
  //mostramos un mensaje corto en vez de parpadear hacia/login
  if(cargando){
    return(
      <div className="d-flexjustify-contet-center-align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className='visually-hidden'>Cargando...</span>
        </div>
      </div>

    )
  }

  //si no hay sesion activa, <navigate> redirige a /login
  if(!estaAutenticado) {
    return <Navigate to="/login" replace />;
  } 

  //<outlet /> renderiza la ruta hija que corresponda 
  //(por ejemplo DashboardLayout con sus paginas internas)
  return <outle/>
}

//Exportamos el componente para usarlo en app.jsx
export default ProtectedRoute