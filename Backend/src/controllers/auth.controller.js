/*
*aqui vive la logica de negocio del login recibir email y contraseña
*buscar el usuario en mysql, comparar la contraseña
*encriptar y devolver un token JWT si todo es correcto
*las rutas (auth.routes.js) solo dicen cuando llegue tal data
*peticion, llama a esta funcion la logica esn si va aca (CRUD)
*/

//Libreria para encriptar y comparar la contraseña
const bcrypt = require('bcryptjs');
//libreria para crear (firmar) tokens JWT de sesion
const jwt = require('jsonwebtoken');
//pool para conexiones mysql configurado en config/db.js
const pool = require('../config/db');
//Carga las variables de .env (JWT_SECRET, JWT_EXPIRES_IN)
require('dotenv').config();

//post /api/auth/login
//recibe {email, password} y devuelve {token, usuario} si son correctos
async function login(req, res) {
    //extraemos el email y password de cuerpo (body)) de la peticion,
    //que express.json() ya convirtio de JSON a objeto de javascript
    const {email, password}= req.body;

    // 1 validacion basica que no llegue ak formulario vacio
    if(!email || !password){
        return res.status(400).json({message: 'El correo y la contraseña son obligatorios'});
    
    }

    try {
        // 2 buscar el usuario por email en la tabla usuarios
        //usamos "?" en la consulta (no contatenamos el email directo)
        //para evitar inyccion SQL; mysql2 se encarga de escaparlo
        const [filas] = await pool.query(
            'SELECT id, nombre, email, password, rol, estado FROM usuarios WHERE email = ? LIMIT 1', [email]
        );

        //si no encontro ninguna fila, el correo no existe
        if (filas.length === 0) {
            return res.status(401).json({mensaje: 'usuario o contraseña incorrectos'});
        }

        //pool.query con SELECT devuelve filas; el correo es unico
        const usuario = filas[0];

        //si el usuario fue desactivado no dejamos iniciar sesion
        if (usuario.estado === 0) {
            return res.status(403).json({
                mensaje: 'este usuario esta desactivado. contacte con el administrador'
            });
        }

        /**
         * comparar la contraseña enviada con el hash guardado en la base de datos
         */
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);

        if (!passwordCorrecta) {
            return res.status(401).json({message: 'correo o contraseña incorrectos'});
        }

        /**
         *generar el token JWT que el frontend guardara para
         *demostrar, en cada peticion futura que ya inicio sesion
         */
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email, rol: usuario.rol},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '8h'}
        );

        /**
         *responder token con los datos publicos del usuario
         *NUNCA se devuelve el hash de la contraseña del frontend
         */
        return res.json({
            token,
            usuario: {
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        //Cualquier error inesperado se informa sin tumbar el servidor
        console.error('Error en login:', error);
        return res.status(500).json({mensaje: 'Error del servidor al iniciar sesion'});
    }
}

//GET/api/auth/perfil
//Ruta protegida de ejemplo solo responde a personas si el middleware 
//VerificarToken confirmo que el token es valido
async function perfil(req, res) {
    //req.usuario fue puesto por el middleware VerificarToken
    return res.json({usuario: req.usuario});
}

//Exportamos ambas funciones para authroutes.js pueda conectarlas // con las urls correspondientes
module.exports = {login, perfil };
