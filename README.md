<<<<<<< HEAD
# PROYECTO EN REACT SISTEMA DE INVENTARIO
Elaborado con react+ bootstrap y mySQL

El sistema de inventario contara on inicio de sesion con base de datos en mySQL con contraseña encriptada y JWT

El dashboar contara con gestion CRUD de **usuarios, categorias, subcategorias, productos** usando DATOS SIMULADOS EN javaScript

## Stack usado
Frontend = react 19 + vite + bootstrap 5 + react router
Backend (solo para login) = node.js + express + JWT
Base de datos = mySQL (xampp) + inventario_react
Encriptacion de contraseña = bcrypt (bcryptjs)
Gestiones = Usuarios, categorias, subcategorias, productos/ datos simulados en javaScript (useStage + localStorage)
Automatizacion npm scripts + concurently

Prerequisitos
# 1
 Instalar node.js, VERIFICAR desde CMD (Simbolo de sistema) con node -v

# 2
Tener XAMPP instalado con mySQL en puerto 3306

# 3
tener un editor de codigo

# Conocimientos previos

**componente**
La pantalla se divide en piezas pequeñas y reutilizables 
(un boton, una tabla, un formulario, un menu) cada comoponente es
una funcion de JavaScript que devuelve lo que tiene que mostrar 
**JSX** una sintaxis que permite escribir algo parecido a html dentro de JavaScript por eso los archivos terminan con extencion .jsx ejemplo:
```jsx
funcion Saludo (){
    return <h1 className="text-prymary">Hola, React </h1>
}


```
-**Estado (stage)** cada componente puede guardar datos que cambian por ejemplo, lo que el usuario escribe en un input, cuando el resultado cambia React vuelve a dibujar automaticamente
solo lo necesario sin recargar la pagina

**SPA** la aplicacion se carfa una sola vez en el navegador y luego cambia de pagina sin recargar para eso usamos `react-router-dom`

React solo se encarga de la interfaz grafica para el resto utilizamos
**vite**para crear y correr el proyecto
**Bootstrap** para los estilos
**axios** para hablar entre frontend y backend
**react-router-dom** para las rutas

# pasos para crear el proyecto
- 1 verifique que tengas node.js (node -v)cmd
- 2 Desde la raiz de proyecto crea el proyecto con react y vite
`npm create vite@latest frontend -- --template react`
- 3 entre a la carpeta frontend con `cd frontend` e instale npm `npm install`
- 4 instale las librerias: `nmp install bootstrap bootstrap-icons react-router-dom axios`
- 5 empaquetador optimisa y junta todo el CSS en un solo archivo al hacer `npm run build`
- 6 Instalar las dependecias del backend y frontend al tiempo `npm run install.all`
- 7 ingresar la carpeta backend `npm init -y`
- 8 Instalar dependencia
    - 8.1 `npm install express mysql2 bcryptjs jsonweb token cors dotenv`
    - 8.2 crea .env dentro de backend para las variables de entorno
    - 8.3 crea src/config/db.js conexion con DB
    - 8.4 crea src/middlewares/verificarToken.js valida el token JWT en rutas protegidas
    - 8.5 crea src/controllers/auth.controller.js es la logica de inicio de sesion
    - 8.6 crea src/routes/auth.routes.js conecta las rutas con el controlador
    - 8.7 crea src/server.js arma la app de express
    - 8.8 crea en backend seed.js crea el usuario administrador
    - 9 crear las siguientes carpetas en frontend
    - 9.1 src/api/axiosClient.js
    - 9.2 src/api/authService.js
    - 9.3 src/context/AuthContext.jsx
    - 9.4 src/page/LoginPage.jsx
    
=======
>>>>>>> a048b080fa8f0511db71656e5b30030fd66f8d9d
# react-ronal-m-6-11
