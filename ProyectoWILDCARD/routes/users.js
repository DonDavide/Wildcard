var express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');
const usersController = require('../controllers/usersContreller')
const userMiddleware = require('../middlewares/userMiddleware')
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/register', usersController.register);
router.post('/register', [
    check('fullname').isLength( {min:3} ).withMessage('Nombre - campo obligatorio mayor a 3 letras'),
    check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
    check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
    check('password').isLength( {min:6} ).withMessage('Contraseña - campo obligatorio mayor a 6 letras'),
    check('confirmpassword').isLength( {min:1} ).withMessage('Confimación de contraseña - campo obligatorio'),
], userMiddleware.checkRegisterErrors, userMiddleware.checkPassConfirmation, userMiddleware.checkUserExistance, usersController.store)

router.get('/login', usersController.login);
router.post('/login', userMiddleware.checkUser, usersController.loginOK);

router.get('/userList', usersController.list);

router.get('/userList/delete/:id', usersController.destroy)

router.get('/userList/edit/:id', usersController.editarUsuario);//ver
router.post('/userList/edit/:id', usersController.editarUsuarioPost)


router.get('/carrito/:id', accesoMiddleware.acceso, usersController.carrito);


module.exports = router;
