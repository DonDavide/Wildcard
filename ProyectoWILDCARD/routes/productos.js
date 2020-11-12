var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosController')

router.get('/productos', productoController.productos);
router.get('/detalleProducto', productoController.detalleProducto);

module.exports = router;