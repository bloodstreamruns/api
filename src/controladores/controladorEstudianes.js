const { validationResult } = require('express-validator');
const Estudiantes = require('../modelos/estudiantes');


const listarEstudiantes = async (req, res) => {
    try {
        // Aquí iría la lógica para obtener los estudiantes de la base de datos
        const estudiantes = await Estudiantes.findAll({include: Carreras});
        res.json(estudiantes);
    } catch (error) {
        console.error("Error al listar estudiantes:", error);
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

const obtenerEstudiantePorId = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.query;
    try {
        const estudiante = await Estudiantes.findByPk(id, {include: Carreras});
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        console.error("Error al obtener estudiante por id:", error);
        res.status(500).json({ error: 'Error al obtener el estudiante por ID' });
    }
};

const crearEstudiante = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { numero_identidad, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, estado, carrera_id } = req.body;
    try {
        const nuevoEstudiante = await Estudiantes.create({ numero_identidad, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo_electronico, estado, carrera_id });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        console.error("Error al crear estudiante:", error);
        res.status(500).json({ error: 'Error al crear el estudiante' });
    }
};

const actualizarEstudiante = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.query;
    const { nombre, edad, carreraId } = req.body;

    try {
        const estudiante = await Estudiantes.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        estudiante.primer_nombre = nombre;
        estudiante.edad = edad;
        estudiante.carrera_id = carreraId;
        await estudiante.save();

        res.json(estudiante);
    } catch (error) {
        console.error("Error al actualizar estudiante:", error);
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

const eliminarEstudiante = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.query;

    try {
        const estudiante = await Estudiantes.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        await estudiante.destroy();
        res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar estudiante:", error);
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
};

module.exports = {
    listarEstudiantes,
    obtenerEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};