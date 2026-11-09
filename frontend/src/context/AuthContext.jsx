/**
 * contexto global de atenticacion permite que CUALQUIER
 * componente de la app (Sidebar, Navbar, paginas protegidas y demas)
 * sepa si hay un usuario logueado quien es y puede cerrar sesion
 * sin tener que pasar esa informacion "a mano" del componente en
 * componente (eso se llama "prop drilling"
 * y el context lo evita)
 */

// createContext: crea el contexto; useContext: lo consume; useEffect:
//codigo que corre en momentos especificos del ciclo de vida; useState:
//wstado local del componente 
import { createContext, useContext, useEffect, useState } from 'react';
//funcion que llama el backend para validar email/password
import { iniciarSesion } from '../api/authService';

// 1)creamos el contexto (una especie de caja compartida)
const authContext = createContext(null);

// 2) Componente proveedor: envuelve la app y le da sus
//hijos acceso al valor de autenticacion actual
export function authProvider({ childen }) {
    //usuario: datos publicos del usuario loguado (o null si no hay sesion)
    const [usuario, setUsuario] = useState (null);

    //cargando: true mientras revisamos si ya habia una sesion guardada
    //en el localStorage (por ejemplo al recargar con f5)
    const [cargando, setCargando] = useState (true);

    //useEffect con arreglo vacio [] -> se ejecuta UNA sola vez,
    //justo cuando la app arranca
    useEffect(() => {
        const usuarioGuardado =
        localStorage.getItem('usuario');
        const tokenGuardado = localStorage.getItem('token');

    //si el localStorage hay usuario y token de una sesion anterior,
    //restauramos esa sesion sin obligar a volver a hacer login 
    if (usuarioGuardado && tokenGuardado){
       setUsuario(JSON.parse(usuarioGuardado));
    }

    setCargando(false);
});

//funcion de login: la llama loginpage cuando el usuario envia el formulario
async function login(email, password) {
    //puede lanzar un error (por ejemplo credenciales invalidas)
    //dejamos que loginpage lo capture con try/catch para mostrar el mensaje
    const { token, usuario: usuarioRecibido } = await iniciarSesion(email, password);

    //Guardamos la sesion en el localStorage para que sobreviva a un F5
    localStorage.setItem('token', token);
    localStorage.setItem('usario', JSON.stringify (usuarioRecibido));

    //Actualizamos el estado en memoria 
}
//Funcion de logout borrra la sesion tanto del localStorage con el estado 
 function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null)
 }

 //valor que va a estar disponible para cualquier componente que use useAuth()
 const value = {
    usuario,
    cargando,
    estaAutenticado: !!usuario, //convierte usuario (odjeto o null) en true false
    login,
    logout,
};

 //todo lo que esta dentro del <AuthProvider>... </AuthProvider> osea //children, toda la app puede leer "value" con useAuth()
 return <authContext.Provider value={value}></authContext.Provider>;
}

/**
 * hook personalizado para consumir el contexto mas facil:
 * en vez de useContext(AuthContext) los componentes hacen useAuth().
 */
export function useAuth() {
    //lee el valor actual del contexto (usuarui, cargando, login, logout)
const contexto = useContext (authContext);
  //si alguien usa eseAuth() fuera de <AuthProvider> contexto seria null:
  //avisamos con un error claro en vez de fallar mas adelante en forma confusa
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un <authProvider>');
  }
  return contexto;
}