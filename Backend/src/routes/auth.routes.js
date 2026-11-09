/**
 * Define las urls(endpoints) relacionadas con autenticacion las conecta con su funcion controladora correspondiente
 */

//framework del servidor
const express = require('express')
//router un mini servidor de rutas despues se montan en server.js 
//con una app.use(api/auth), authRoutes
const router = express.Router();

//funciones controladoras con la logica real de cada endpoint

const {login, perfil} = require('../controllers/auth.controller');

//middleware que protege rutas exigiendo un token JWT valido
const verificarToken  = require ('../middlewares/VerificarToken');

//post/api/auth/login = iniciar sesion (ruta oublica)

router.post('/login', login);

//Get api/auth/perfil = devuelve los datos del usuario logueado
// ruta protegida  pasa primero por la vereficacion

router.get('/perfil', verificarToken, perfil);

module.exports = router;

