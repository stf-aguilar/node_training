const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido,  esEmailYaRegistrado } = require('../helpers/db-validators');

const { usersGet,
        usersPost, 
        usersPut, 
        usersDelete } = require('../controllers/usersController')
const router = Router();

router.get('/', usersGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6}),
    check('correo').custom( esEmailYaRegistrado),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido),
    validarCampos
],usersPost);
router.put('/:id',  usersPut);
router.delete('/', usersDelete);


module.exports = router;