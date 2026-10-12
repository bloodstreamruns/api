const { HOST_DB, USUARIO_DB, CONTRASENA_DB, NOMBRE_DB, PORT_DB } = process.env;
const sequelize = require('sequelize');

const db = new sequelize(NOMBRE_DB, USUARIO_DB, CONTRASENA_DB, {
    host: HOST_DB, //dónde se encuentra la base de datos
    port: PORT_DB,
    dialect: 'mysql', //tipo de base de datos que se está utilizando
    logging: true //mostrar en consola las consultas SQL que se están ejecutando
});

//sincronizacion de los modelos con la base de datos
db.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
        db.sync({ alter: true }) //sincronizar los modelos con la base de datos, alterando las tablas si es necesario
        .then(() => {
            console.log('Modelos sincronizados con la base de datos correctamente.');
        })
        .catch((error) => {
            console.error('Error al sincronizar los modelos con la base de datos:', error);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = db;