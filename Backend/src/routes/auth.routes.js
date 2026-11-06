/**
 * define las URLS (endpoints) relacionadas con autenticacion 
 * las conecta con su funcion controlandora correspondiente 
 */

// framework dl servidor 
const express = require('express');
// Router del servidor; se monta en ServerRouter.js.
const router = express.Router();

//Funciones controladas con la logica real de cada endpoint 
const {login, perfil} = require('../controllers/auth.controller');
//middleware que protege rutas exigiendo un token jwt valido 
const verificarToken = require('../middlewares/verificarToken');

//post /api/auth/login = iniciar sesion (ruta publica)
router.post('/login', login)

//GET api/auth/perfil devuelve los datos de usuario logueado 
//ruta protegida pasa primero por la verificarToken
router.get('/perfil', verificarToken, perfil);

module.exports = router; 
