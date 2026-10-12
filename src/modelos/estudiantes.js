const db = require('../configuracion/db.js'); //importar la configuración de la base de datos
const { DataTypes } = require('sequelize');

const Carrera = db.define('Carrera', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_identidad: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    cuenta: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    primer_nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    segundo_nombre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    primer_apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    correo_electronico: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        allowNull: false,
        defaultValue: 'Activo'
    }
}, {
    tableName: 'estudiantes', //nombre de la tabla en la base de datos
    timestamps: false //desactivar las columnas createdAt y updatedAt que Sequelize agrega por defecto
});

//definir la relacion entre la tabla de estudiantes y la tabla de carreras
Estudiante.belongsTo(Carrera, { foreignKey: 'carrera_id', as: 'carrera' }); //un estudiante pertenece a una carrera
Carrera.hasMany(Estudiante, { foreignKey: 'carrera_id', as: 'estudiantes' }); //una carrera tiene muchos estudiantes

module.exports = Estudiante;