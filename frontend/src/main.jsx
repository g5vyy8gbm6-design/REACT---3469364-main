//Ayuda a dectectar errores comunes en el desarrollo
import { StrictMode } from 'react'
// Es la funcion moderna de react 18+ para montar la aplicacion en dom
import { createRoot } from 'react-dom/client'

//habilita el madeja de las rutas por url
import {BrowserRouter} from 'react-router-dom';

//estilos de bootstrap calses como btn, cotainer, table y demas
import 'bootstrap/dist/css/bootstrap.min.css';

//iconos de bootstrap clases como bi bi-trash
import'bootstrap-icons/font/bootstrap-icons.css';

//js de bootstrap necesario para que funcionen los modales
import'bootstrap/dist/js/bootstrap.bundle.min.js'

// estilos propios del proyecto se cargan solos despues del bootstrap 
//describe detalles puntuales de la aplicacion 
import './index.css'

//componente raiz con todas las rutas de la aplicacion 
import App from './App.jsx'

//Proveedor cel contexto de sesion (ver context/AuthContext.jsx)
import{AuthProvider} from './context/AuthContext.jsx';

//busca el <div id= "root" de index.html y engancha react ahi dentro 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
