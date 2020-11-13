var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersContreller')

router.get('/register', usersController.register);
// post
router.get('/login', usersController.login);
// post
router.get('/carrito', usersController.carrito);
// post

module.exports = router;
