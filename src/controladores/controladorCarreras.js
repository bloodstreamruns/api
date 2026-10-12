const {validationResult} = require('express-validator');
const Carreras = require('../modelos/carreras');

//controlador para listar todas las carreras
const listarCarreras = async (req, res) => {
    try {
        const carreras = await Carreras.findAll();
        res.json(carreras);
    } catch (error) {
        console.error("Error al listar carreras:", error);
        res.status(500).json({ error: 'Error al obtener las carreras' }); 
    }
};

//controlador para obtener una carrera por su id
const obtenerCarreraPorId = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.query;
    try {
        const carrera = await Carreras.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }
        res.json(carrera);
    } catch (error) {
        console.error("Error al obtener carrera por id:", error);
        res.status(500).json({ error: 'Error al obtener la carrera' });
    }
};

//controlador para crear una nueva carrera
const crearCarrera = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const {codigo, nombre, descripcion = null, estado = true} = req.body;
    try {
        const nuevaCarrera = await Carreras.create({ code: codigo, name: nombre, description: descripcion, status: estado });
        res.status(201).json(nuevaCarrera);
    } catch (error) {
        console.error("Error al crear carrera:", error);
        res.status(500).json({ error: 'Error al crear la carrera' });
    }
};

//controlador para actualizar una carrera existente
const actualizarCarrera = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.query;
    const { codigo, nombre, descripcion, estado} = req.body;
    try {
        const carrera = await Carreras.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }
        carrera.code = codigo;
        carrera.name = nombre;
        carrera.description = descripcion;
        carrera.status = estado;
        await carrera.save();
        res.json(carrera);
    } catch (error) {
        console.error("Error al actualizar carrera:", error);
        res.status(500).json({ error: 'Error al actualizar la carrera' });
    }
};

//controlador para eliminar una carrera por su id
const eliminarCarrera = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.query;
    try {
        const carrera = await Carreras.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }
        await carrera.destroy();
        res.json({ message: `Carrera con id ${id} eliminada` });
    } catch (error) {
        console.error("Error al eliminar carrera:", error);
        res.status(500).json({ error: 'Error al eliminar la carrera' });
    }
};

module.exports = {
    listarCarreras,
    obtenerCarreraPorId,
    crearCarrera,
    actualizarCarrera,
    eliminarCarrera
};                                                                                                                