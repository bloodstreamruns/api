const db = require('../configuracion/db.js'); //importar la configuración de la base de datos
const { DataTypes } = require('sequelize');

const Carrera = db.define('Carrera', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    grado: {
        type: DataTypes.ENUM('Licenciatura', 'Ingeniería', 'Maestría', 'Doctorado'),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'carreras', //nombre de la tabla en la base de datos
    timestamps: false //desactivar las columnas createdAt y updatedAt que Sequelize agrega por defecto
});

module.exports = Carrera;