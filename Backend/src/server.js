/**
 *      Punto de entrada del backend aqui se crea la aplicacion de Epress 
        se configurabn los middleware globales 
 * y se montan las rutas al final el servidor que esta escuchando
 * Peticiones por el puerto definido el .env (por defecto el 4000)
 */ 


//Framework para crear en servidor HTTP y definir rutas 
const express = require ('express');
//middleware que habilita CORS (peticiones desde otro origen/o puerto)
const cors = require ('cors');
//lee el archivo .env y carga sus valores en process.env
require('dotenv').config();
//Importamos el route con los enhpoints de autenticacion(login y perfil)
const authRoutes = require('./routes/auth.routes');
//Creamos la aplicacion express 
const app= express();
//cors() permite que el frontend(que corre en otro puerto)
// pueda hacer peticiones al backend sin  que el navegador lo bloquee 
app.use(cors());

//express.json() le enseña a express a leer el body de las peticiones 
//cuando viene en formato json asi podemos leer req.body.email, etc 
app.use(express.json());

//ruta de salud simple, utill para probar que el servidor esta vivo 
app.get('/', (req, res ) =>{
       res.json({ mensaje: 'Api de inventario react funcionando correctamente'})
}); 

//todas las rutas que empiecen con api/auth se revuelven en authroutes.js
app.use('/api/auth', authRoutes);

//middleware para rutas que no existen (404)
app.use((req, res) => {
       res.status(404).json({mensaje: 'ruta no encontrada'});
});

//tomamos el puerto desde .env o 4000 si no esta definido 
const PORT = process.env.PORT || 4000;

//arranca el servidor a partir de aqui Express queda escuchando 
//peticiones HTTP en el puerto indicado hasta que se detenga el proceso
app.listen(PORT, () => {
       //este callback se ejecuta una vez cuando el servidor este listo 
       console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
})
