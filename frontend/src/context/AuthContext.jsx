/**
 * contexto global de autenticacion
 */

import { createContext, useContext, useEffect, useState } from "react";
import { iniciarSesion } from "../api/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const tokenGuardado = localStorage.getItem("token");

    if (usuarioGuardado && tokenGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    setCargando(false);
  }, []);

  async function login(email, password) {
    const { token, user } = await iniciarSesion(email, password);

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(user));
    setUsuario(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  const value = {
    usuario,
    cargando,
    estaAutenticado: !!usuario,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }

  return contexto;
}