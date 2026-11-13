/*import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="container py-5 text-center">
      <h1 className="mb-3">Página no encontrada</h1>
      <p className="text-muted">La dirección que buscas no existe.</p>
      <Link className="btn btn-primary" to="/login">
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFoundPage;
*/
/**
 * componente guardian de ruta que se usa envolviendo las rutas del
 * dashboard en App.jsx. Si el usuario no esta iniciando sesion lo redirige
 * automaticamente a /login en vez de mostrar el contenido
 *  
 */
//Navigate redirige a otra ruta; outlet renderiza la ruta hija activa
import { Navigate, Outlet } from 'react-router-dom';
//Hook para leer el estado de sesion (usuario, cargando ....)
import { useAuth } from '../context/authContext';


