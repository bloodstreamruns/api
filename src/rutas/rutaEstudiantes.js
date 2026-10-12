const {Router} = require('express');
const controladorEstudiantes = require('../controladores/controladorEstudiantes');
const controladorCarreras = require('../controladores/controladorCarreras');
const { validationResult } = require('express-validator');
const Estudiantes = require('../modelos/estudiantes');
const Carreras = require('../modelos/carreras');
const { body, query } = require('express-validator');
const router = Router();

router.get('/', controladorEstudiantes.listarEstudiantes);

router.get('/buscarid',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'), 
    controladorEstudiantes.obtenerEstudiantePorId
);

router.post('/guardar',
    body('numero_identidad').notEmpty().withMessage('El número de identidad es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El número de identidad debe tener entre 3 y 50 caracteres'),
    body('primer_nombre').notEmpty().withMessage('El primer nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El primer nombre debe tener entre 3 y 50 caracteres'),
    body('primer_apellido').notEmpty().withMessage('El primer apellido es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El primer apellido debe tener entre 3 y 50 caracteres'),
    body('correo_electronico').notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .isLength({ max: 100 }).withMessage('El correo electrónico debe tener como máximo 100 caracteres')
    .custom(async (value) => {
        const estudianteExistente = await Estudiantes.findOne({ where: { correo_electronico: value } });
        if (estudianteExistente) {
            throw new Error('El correo electrónico ya está en uso');
        }
        return true;
    }),
    body('estado').notEmpty().withMessage('El estado es obligatorio')
    .isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser "Activo" o "Inactivo"'),
    body('carrera_id').notEmpty().withMessage('La carrera es obligatoria')
    .isInt().withMessage('La carrera debe ser un número entero')
    .custom(async (value) => {
        const carrera = await Carreras.findByPk(value);
        if (!carrera) {
            throw new Error('La carrera no existe');
        }
        return true;
    }),
    controladorEstudiantes.crearEstudiante
);

router.put('/id',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'),
    body('name').notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    controladorEstudiantes.actualizarEstudiante
);

router.delete('/id',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'),
    controladorEstudiantes.eliminarEstudiante
);

module.exports = router;
