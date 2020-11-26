var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosController')

router.get('/', productoController.productos);
// post
router.get('/:id', productoController.detalleProducto);
// post

module.exports = router;