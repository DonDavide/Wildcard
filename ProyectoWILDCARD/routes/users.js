var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersContreller')

router.get('/register', usersController.register);
router.post('/register', usersController.store)

router.get('/login', usersController.login);

router.get('/carrito/:id', usersController.carrito);


module.exports = router;
