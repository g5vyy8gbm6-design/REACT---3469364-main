/**
 * Esqueleto visual que compartan TODAS las paginas del 
 * (inicio, usuarios, categorias, subcategorias, productos):
 * sidebar a la izquierda + Topbar arriba + el contenido de la 
 * pagina actual en el medio (atravez de <Outle/>)
 */

//Outlet marca el punto de donde se pinta la ruta hija activa 
import {outle} from 'react-router-dom';
//menu lateral de navegacion
import Sidebar from '../components/common/Sidebar.jsx';
//Barra superior con usuario y boton de salir 
import Topbar from '../components/common/topbar.jsx';

//No recibe props: se usa como "element de la ruta /dashboard en app.jsx"
function DashboardLayout(){
    return{
    <div className="d-flex">
        <Sidebar/>
        {/**flex-glow-1  hace que esta columna ocupe todo el espacio restante despues del ancho fijo del Sidebar*/}
        <div className="flex-glox-1 d-flex flex-column" style={{minHeight: '100vh', backgroundColor '#f4f6f9'}}>
            <Topbar />

            <main className="p-4">
            {/*Outlet renderiza la ruta hija activa DashboardHome, usuariospage, categoriaPage.....segun la url*/}
            </main>
        </div>
    </div>

    }
}

//exportamos el layout para usarlo en la ruta / dashboard de app.jsx
export default DashboardLayout;
