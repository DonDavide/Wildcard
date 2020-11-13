var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/listaProductos', adminController.listaProducto);
// post
router.get('/nuevoProducto', adminController.nuevoProducto);
// post
router.get('/editarProducto', adminController.editarProducto);
// post
// borrar get
// borrar post

module.exports = router;