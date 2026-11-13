# PROYECTO EN REACT SISTEMA DE INVENTARIO 

elavorado con react+bootstrap y mysql

el sistema de einventario contara con inicio de secion con base de datos en mysql con contraseña en encriptada y jwt 

el dashboard contara con gestion crud de **usurios, categorias, subcategorias, productos** usando datos simulado en javascript

## stack usado

frontend = react 19 + vite + bootstrap 5 + react router

backend(solo para login) = node.js +e express + jwt 

base de datos = mysql (xampp) + inventario_react

encriptacion de contraseña = bcrypt (bcryptjs)

gestion = usuarios, categorias, subcategorias, productos/ datos simulados en js (useStage + localStorege)

automatizacion npm scripts + concurrently

pre requisitos 

# 1
instalar node.js verificar desde cmd con node -v

# 2 
tener  xampp instalado con mysql en el puerto 3306

# 3
tener un editor de codigo

## Iniciar el proyecto en Windows

1. Inicia MySQL desde XAMPP e importa `Backend/database/inventario_react.sql` en phpMyAdmin.
2. En una terminal, instala dependencias y arranca el backend:

   ```powershell
   cd Backend
   npm.cmd install
   npm.cmd run seed
   npm.cmd run dev
   ```

3. En otra terminal, arranca el frontend:

   ```powershell
   cd frontend
   npm.cmd install
   npm.cmd run dev
   ```

El backend escucha en `http://localhost:4000` y Vite muestra la dirección del frontend en la terminal.

# conocimientos previos 

**componente** la pantalla se divide en piezas pequeñas y reutilizables(un boton, una tabla, un formulario, puede ser un menu) cada componente es una funcion de js 

una funcion de js que devuelve lo que tiene q mostrar 

**JSX** una sintaxis que permite escribir algo parecido a html parecido a js por eso los archivos terminan con extension .jsx

```jsx

funtion saludo (){
    return <h1 className="text-primary">hola, react</h1>
}
```

**Estado (stage)** cada componente puede guardar datos que cambian por ejemplo:

lo que el usruario escribe en un input, cuando el estdo cambia react vuelve a dibujar automaticamente
solo lo necesrio sin recargar la pagina 
  

**SPA** la aplicacion se carga una sola vez en el navegador y luego cambia de pagina sin recargar para eso usamos `react-router-dom`

react solo se encarga de la int grafica para el resto utilizamos:
**Vite** para crear y correr el proyecto 
**bootstrap** para los estilos 
**axios** para hablar entre frontend y el backend 
**react-router-dom** para las rutas 


# pasos para crear el proyecto 
- 1 verifique que tenga node.js (node -v)cmd 

- 2 desde la raiz del proyecto crea el proyecto con react y vite 
`npm create vite@latest frontend -- --template react`

- 3 entre a la carpeta frontend con `cd frontend` e instale npm `npm install`

- 4 instale las librerias: `npm install bootstrap bootstrap-icons react-router-dom axios`

- 5 empaquetador optimisa y junta todo el css en un solo archivo al hacer `npm run build`

- 6  instalar las dependencias de backend y frontend al tiempo `npm run install:all`

- 7ingresar a la carpeta backend `npm init -y`

- 8 instalar dependencias 
    - 8.1`npm install express mysql2 bcryptjs jsonwebtoken cors dotenv`
    - 8.2 crea .env dentro de backend para las variables de entorno 
    - 8.3 crea src/config/db.js conexion con BD
    - 8.4 crea src/middlewares/verificartoken.js valida el token jwt en ruta protegidas 
    - 8.5 crea src/contollers/auth.controller.js es la logica de inicio de sesion 
    - 8.6 crea src/routes/auth.routes.js
    - 8.7 crea src/ server.js arma la app de express
    - 8.8 crea en backend seed.js crea el usuario administrador

    administrador
    9 crear las siguientes carpetas en frontend
        9.1 src/api/axiosClient.js
        9.2 src/api/authService.js
        9.3 src/context/authService.jsx
        9.4 src/page/loginPage.jsx
    

    -10.1 archivos a crear
-frontend/src/routes/ProtectedRoutes.jsx    -----------------
-fontend/src/layoust/DashboardLayout.jsx
-frontend/src/components/common/Sidebar.jsx
-frontend/src/components/common/topbar.jsx
-frontend/src/pages/DashboardHome.jsx
-frontend/src/pages/NotFoundPage.jsx ------------------------
-editar frontend/src/App.jsx




