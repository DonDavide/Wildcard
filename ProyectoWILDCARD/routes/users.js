var express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');
const usersController = require('../controllers/usersContreller')
const userMiddleware = require('../middlewares/userMiddleware')
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/register', accesoMiddleware.userSessionLogged, usersController.register);
router.post('/register', [
    check('fullname').isLength( {min:3} ).withMessage('Nombre - campo obligatorio mayor a 3 letras'),
    check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
    check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
    check('password').isLength( {min:6} ).withMessage('Contraseña - campo obligatorio mayor a 6 letras'),
    check('confirmpassword').isLength( {min:1} ).withMessage('Confimación de contraseña - campo obligatorio'),
], userMiddleware.checkRegisterErrors, userMiddleware.checkPassConfirmation, userMiddleware.checkUserExistance, usersController.store)

router.get('/login', accesoMiddleware.userSessionLogged, usersController.login);
router.post('/login', userMiddleware.checkUser, accesoMiddleware.userSessionLogged, usersController.loginOK);

router.get('/userList',accesoMiddleware.userSessionLogged, usersController.list);

router.get('/userList/delete/:id',accesoMiddleware.userSessionLogged, usersController.destroy)

router.get('/userList/edit/:id', accesoMiddleware.userSessionLogged, usersController.editarUsuario);//ver
router.post('/userList/edit/:id',accesoMiddleware.userSessionLogged, usersController.editarUsuarioPost)


router.get('/carrito/:id?', accesoMiddleware.acceso,accesoMiddleware.userSessionLogged, usersController.carrito);
router.post('/carrito/:id?',accesoMiddleware.userSessionLogged, usersController.carrito);

router.get('/closesession', usersController.closeSession);

module.exports = router;
