const expres = require('express');
const morgan = require('morgan');
require('dotenv').config(); //cargar variables de entorno desde el archivo .env

const db = require('./configuracion/db.js'); //importar la configuración de la base de datos
const rutas = require('./rutas/index.js');

const port = process.env.PORT;

const app = expres();

app.use(morgan('common')); //middleware para registrar solicitudes HTTP en la consola
//middleware para analizar el cuerpo de las solicitudes entrantes en formato JSON
app.use(expres.json());

//importar rutas definidas en el archivo rutas/index.js
app.use('/api', rutas); //usar las rutas definidas en el archivo rutas/index.js con el prefijo /api



//iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});