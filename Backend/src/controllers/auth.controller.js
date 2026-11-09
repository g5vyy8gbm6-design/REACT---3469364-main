/**
 * aqui vive la logica de negocio del login recibe email
 * y contraseñas, buscar el usuario en mysql comparar la contrseña 
 * encriptar y devolver el token jwt si todo es correcto
 * las rutas(auth.routes.js)solo dicen cuando llegue tal data
 * peticion, llama a esta funcion la logica en si va aca (crud)
 */

//libreria para encrip y comparar la contraseña
const bcrypt = require('bcryptjs')
//libreria para crear (firmar) tokens JWT de sesion 

const jwt = require('jsonwebtoken');
//pool para crear conexiones mysql configurado en confi/db.js

const pool = require('../config/db')
//carga las variables de .env(JWT_SECRET, JWT_EXPIRE_IN)

require('dotenv').config();
//post/api/auth/login
//recibe {email, password} y devuelve {token, usuario}si son correctos

async function login(req, res) {
    try{
    //extraemos el email y la pass de cuerpo (body) de la peticion, que express.json() ya convirtio de JSON a objecto de js
    const{email, password} =req.body;
//1 validacion basica que no llegue al formulario vacio 
if (!email||!password) {
    return res.status(400).json
    ({mensaje: 'El correo y la contraseña son obligatorios'});}
// 2 buscar el usuario por email en la tabla usuarios 
//usamos "?" en la consulta (no contatenamos el email directo)
//para evitar inyeccion sql; mysql2 se encarga de escaparlo
const[filas] = await pool.query(
    'Select id,nombre,email,password,rol,estado from usuarios where email=? limit 1', [email]
);
//si no encontro nninguna fila, el correo no existe
if(filas.legth === 0){
    return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'});

    }

    //pool.query con select siempre devuelve un arreglo de filas;
    // como buscamos por email (unico), nos quedamos en la primera fila u unica fila 
    const usuario = filas[0];
    //si el usuario fue desactivado no dejamos iniciar sesion
    // aunque la contraseña sea correcta
    if(usuario.estado === 0){
        return res.status(403).JSON({message: 'Este usuario esta desactivado contacte al administrador'});
    }


    /**
     * coamparar la contraseña que envio el formulario con el hash 
     * guardado en la base de datos bcrypt. compare vuelve a aplicar 
     * el mismo algoritmo y revisa si el resultado concide con la contraseña original nunca se puede desencriptar
     */
    const passwordCorrecta = await bcrypt.compare (password, usuario.password);

    if (!passwordCorrecta){
        return res.status(401).JSON({message:'Correo o contraseña incorrectos'});
    }

    /**
     * generar el token  JWT que el frontend giardara para demostrar, en cada peticion futura que ya inicio sesion
     */

    const token = jwt.sign(
        {
            id: usuario.id, email, rol: usuario.rol
        },

        process.env. JWT_SECRET, //firma secreta

    {
        expiresIn: process.env. JWT_EXPIRES_IN || '8h'
    }// tiempo vida de token 
    );

    /**
     * responder token con los datos publicos del usuario
     * Nunca se devuelve el hash de la contraseña al frontend 
     */
    return res.JSON({
        token,
        usuario:{
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,

        },
    });



} catch(error){
    //cualquier error inesperado(por ejemplo en my sql este pagado)
    //cae aqui en vez de tumbar 
    console.error(' Error en login: ' , error);

    return res.status(500).JSON({mensaje:'Error del servidor a iniciar sesion'});
}
}

//GET/api/auth/perfil
//ruta protegida de ejemplosolo responde a personas si el middleware
//verificarToken corfirmo que el token es valido
async function perfil (req, res) {
//req.usuario fue puesto por el middleware verificar token
    return res.json({usuario: req.usuario});
}

//exportamos ambas funciones para authroutes.js pueda conectarlas 
// con las urls correspondientes

module.exports = {login, perfil};