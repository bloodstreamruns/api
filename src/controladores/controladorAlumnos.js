const { validationResult } = require('express-validator');

exports.listarAlumnos = (req, res) => {
    const alumnos = [
        { id: 1, nombre: 'Juan', edad: 20 },
        { id: 2, nombre: 'María', edad: 22 },
        { id: 3, nombre: 'Pedro', edad: 21 }
    ];
    res.json(alumnos);
};

exports.inicio = (req, res) => {
    res.json({ message: '¡Bienvenido a nuestra primera API!' });
};

exports.obtenerAlumnoPorId = (req, res) => {
    const {id} = req.query;
    //aquí se obtiene el alumno de la base de datos según el id
    const alumno = {id: parseInt(id), name: 'Juan'};
    res.json(alumno);
};

exports.crearAlumno = (req, res) => {
    const { name} = req.body;
    //aquí se crea el alumno en la base de datos
    const nuevoAlumno = {id: Date.now(), name};
    res.status(201).json(nuevoAlumno);
};
exports.actualizarAlumno = (req, res) => {
    const { id } = req.query;
    const { name } = req.body;
    //aquí se actualiza el alumno en la base de datos según el id
    const alumnoActualizado = { id: parseInt(id), name };
    res.json(alumnoActualizado);
};
exports.eliminarAlumno = (req, res) => {
    const { id } = req.query;
    //aquí se elimina el alumno de la base de datos según el id
    res.json({ message: `Alumno con id ${id} eliminado` });
};