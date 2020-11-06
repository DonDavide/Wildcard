var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/nuevoProducto', adminController.nuevoProducto);
router.get('/editarProducto', adminController.editarProducto);
module.exports = router;


