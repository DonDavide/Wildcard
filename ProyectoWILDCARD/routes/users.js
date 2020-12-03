var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersContreller')

router.get('/register', usersController.register);
router.post('/register', usersController.store)

router.get('/login', usersController.login);

router.get('/userList', usersController.list);

router.get('/userList/delete/:id', usersController.destroy)

router.get('/userList/edit/:id', usersController.editarUsuario);//ver
router.post('/userList/edit/:id', usersController.editarUsuarioPost)


router.get('/carrito/:id', usersController.carrito);


module.exports = router;
