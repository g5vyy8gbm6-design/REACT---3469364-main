import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { cargando, estaAutenticado } = useAuth();

  if (cargando) {
    return null;
  }

  return estaAutenticado ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
