/**
 * contexto global de autenticacion permite que CUALQUIER 
 * componente de la app( sindebar, navbar, paginas protegidas y demas
 * * sepa si hay un usuario logueado quien es y pueda cerrar sesion 
 * sin tener que pasar la informacuin "a mano" del componente en 
 * componente( esos se llama "prop drilling" y el Context lo evita)
*/
// createContext: crea el contexto;
useContext: lo consume; useEffect:
// codigo que corre en momentos especificos del ciclo de vida;useState: 
//estado local del componente 
import { createContext, useContext, useEfect, useState } from "react";
//Funcion que llama al backend para validar email/password 
import { iniciarSesion } from "../api/AuthService";
//1) creamos el contexto (una especie de caja compartida )
const AuthContext = createContext(null);

//2) Componente proveedor: envuelve la app y le da sus 
// hijos acceso al valor de autenticacion actual 
export function AuthProvider({ childern}) {
    //usuario: datos publicos del usuario logueado (o null si no hay sesion)
    const [usuario, setUsuario] = useState(null); 
    
    //cargando: true mientras revisamos si ya habia una sesion guardada 
    //en el localStorage(por ejemplo al recargar la pagina con F5)
    const[cargando, setCargando] = useState(true);

    //useEffect con arreglo vacio [] -> se ejecuta UNA sola vez, 
    //Justo cuando la app arranca 
    useEffect(() => {
        const usuarioGuardado = 
        localStorage.getItem('usuario');
        const tokenGuardado =
        localStorage.getItem('token');

    //si el localStorage hay usuario y token de una sesion anterior, 
    // restauramos esa sesion sin obligar a volcver a hacer login 
    if (usuarioGuardado && tokenGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
    }

    setCargando(false);


}, []);

//funcion de login: la llama LoginPage cuando el usuario envia el formulario
async function login(email, password) {
    //Puede lanzar un error(por ejemplo credenciales invalidas)
    //dejamos que LoginPage lo capture con try/catch para mostrar el mensaje
    const {token, usuario: UsuarioRecibido } = await iniciarSesion(email, password);

    //Guardamos la sesion en el localStorage para que sobreviva a un F5 
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(UsuarioRecibido));

    //Actualizamos el estado en memoria para la UI reaccione al instante
    setUsuario(UsuarioRecibido)

    //Funcion de logout borra la sesion tanto de localStorage como el estado 
    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuario(null);
    }
    // valor que va a estar disponible para cualquier componente que useAuth()
    const value = {
        usuario, 
        cargando,
        estaAutenticado: !!usuario, //convierte usuario (objeto o null) en true o false 
            login,
            logout,

    };

    // todo lo que esta dentro del <AuthProvider>... </AuthProvider> osea 
    //children, toda la app puede leer value con useAuth()
    return <AuthContext.Provider value= {value}></AuthContext.Provider>;
}

/**
 * Hook personalizado para consumir el contexto mas facil:
 * en vezz de useContext (AuthContext) los componentes hacen useAuth().
*/
export function useAuth() {
    //lee el valor actual del contexto(usuario, cargando, login, logout)
    const contexto = useContext
    (AuthContext);
    // si alguien usa useAuth() fuera de <AuthProvider> contexto seria null:
    //avisamos con un error claro en vez de fallar mas adelante en forma confusa
    if (!contexto) {
        throw new Error('useAuth debe usarse dentro de un <authProvider>');

    }
    return contexto;

}
