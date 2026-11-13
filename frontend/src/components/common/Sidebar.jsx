/**
 * Menu laterla del dashboard usa <NavLink> de react-router-dom
 * en vez de <link> porque <Navlink> sabe automaticamente cuando su ruta esta activa (la url  actual coincide) y no distino (clase activa
 * )
 */

//lista de items del menu mientras mas crece el dashboard , solo que hay que agregar un objeto aca 
// (evita) repetir el mismo <Navlink> 5 veces
const opcionesMenu=[
    {texto: 'inicio', ruta:'/dashboard', icono:'bi-house-door', fin: true},
    {texto: 'Usuarios', ruta:'/dashboard/usuarios', icono: 'bi-people' },
    {texto: 'Subcategorias', ruta:'/dashboard/subcategorias', icono: 'bi-diagram-3' },
    {texto: 'Productos', ruta:'/dashboard/productos', icono: 'bi-box-seam' },
];

