//definir las rutas on las que trabajará la aplicación
const { Router } = require('express');
const router = Router();
router.use('/alumnos', require('./rutaAlumnos'));
router.use('/carreras', require('./rutaCarreras'));



module.exports = router;