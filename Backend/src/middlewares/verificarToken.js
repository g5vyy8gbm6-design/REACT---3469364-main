/** 
 * verificar token utilizara funcion: 
 * middleware de express. es una fncion que se ejecuta ANTES de llegar 
 * a las rutas protejidas por ejemplo un get
 * su trabajo es revisar que la peticion traiga un token JWT 
 * valido si no lo trae corta la peticion con error 401
 */

// libreria para crear y verficar tokens JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

// req es la peticion, res la respuesta y next continua la cadena
// middleware/controlador si todo esta bien.
function verificarToken(req, res, next) {
    //el frontend debe enviar el token en header 
    //Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    //si no viene el header no hay sesion -> rechazamos la peticion 
    if(!authHeader) {
        return res.status (401).json({mensaje: 'No se envio un token de autenticacion'});
    }

    //authHeader tiene el fromato "bearer eyJhbGci0i", nos quedamos 
    //solo con la segunda parte el token real 
    const [scheme, token] = authHeader.split(/\s+/);

    //si el header vino mal formado por ejemplo sin la palabra bearer 
    //el token queda undefined y tampoco dejamos pasar la peticion 
    if (!token || scheme.toLowerCase() !== 'bearer') {
        return res.status(401).json
        ({mensaje: 'formato de token invalido'});
    }

    //todo lo que puede fallar (token invalido, expirado o alterado) se maneja aqui
    try {
        //jwt.verify valida la firma y la expiracion del token
        const datosUsuario = jwt.verify(token, process.env.JWT_SECRET);

        //Guardamos los datos decodificados para que el controlador los use
        req.usuario = datosUsuario;

        //next() continua con la siguiente funcion
        return next();
    } catch (error) {
        //si el token esta vencido o fue alterado, jwt.verify lanza un error
        return res.status(401).json({
            mensaje: 'token invalido o expirado'
        });
    }
}


//exportamos 
module.exports = verificarToken;
