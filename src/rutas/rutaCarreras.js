const {Router} = require('express');
const {listarCarreras,
    obtenerCarreraPorId,
    crearCarrera,
    actualizarCarrera,
    eliminarCarrera } = require('../controladores/controladorCarreras.js');
const { body, query } = require('express-validator');
const router = Router();

router.get('/', listarCarreras);

router.get('/buscarid',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'), 
    obtenerCarreraPorId
);

router.post('/guardar',
    body('codigo').notEmpty().withMessage('El código es obligatorio')
    .isLength({ min: 3, max: 10 }).withMessage('El código debe tener entre 3 y 10 caracteres'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('descripcion').optional().isLength({ max: 255, min: 10}).withMessage('La descripción no puede exceder los 255 caracteres'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser un valor booleano'),
    crearCarrera
);

router.put('/actualizar',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'),
    body('codigo').optional().isLength({ min: 3, max: 10 }).withMessage('El código debe tener entre 3 y 10 caracteres'),
    body('nombre').optional().isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('descripcion').optional().isLength({ max: 255, min: 10 }).withMessage('La descripción no puede exceder los 200 caracteres'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser un valor booleano'),
    actualizarCarrera
);

router.delete('/eliminar',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'),
    eliminarCarrera
);

module.exports = router;