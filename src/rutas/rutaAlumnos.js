const {Router} = require('express');
const controladorAlumnos = require('../controladores/controladorAlumnos');
const { body, query } = require('express-validator');
const router = Router();

router.get('/', controladorAlumnos.listarAlumnos);


router.get('/buscarid',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'), 
    controladorAlumnos.obtenerAlumnoPorId
);

router.post('/',
    body('name').notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    controladorAlumnos.crearAlumno
);

router.put('/id',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'),
    body('name').notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    controladorAlumnos.actualizarAlumno
);

router.delete('/id',
    query('id').notEmpty().withMessage('El id es obligatorio')
    .isInt().withMessage('El id debe ser un número entero'),
    controladorAlumnos.eliminarAlumno
);

module.exports = router;



