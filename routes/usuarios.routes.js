const { Router } = require('express');
const { registrarUsuario,obtenerTodosLosUsuarios,obtenerUnUsuarioPorId, bajaFisicaUsuario, bajaLogicaUsuario, inicioSesionUsuario} = require('../controllers/usuarios.controllers');
const router = Router();
const { check } = require('express-validator');

const auth = require('../middlewares/auth');



/* Alta usuario */

router.post('/', [
    check('nombreUsuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('nombreUsuario', 'min: 5 caracteres y max: 20 caracteres').isLength({ min: 5, max: 20 }),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    check('rol', 'El rol debe ser usuario o admin').isIn(['usuario', 'admin'])
],registrarUsuario);
/* Inicar sesion */

router.post('/login', [
    check('nombreUsuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
     check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
],
    inicioSesionUsuario);



/* Obtener todos los usuarios */
router.get('/', auth('admin') ,obtenerTodosLosUsuarios);

router.get('/:idUsuario', [
    check('_id', 'El idUsuario es obligatorio').isMongoId(),
], auth('admin') ,obtenerUnUsuarioPorId);

/* Baja fisica usuario */
router.delete('/:idUsuario', auth('admin') , bajaFisicaUsuario);

/* Baja logica usuario */
router.put('/:idUsuario', auth('admin') , bajaLogicaUsuario);


module.exports = router;