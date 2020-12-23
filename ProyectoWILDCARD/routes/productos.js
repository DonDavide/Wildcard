var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosController')

router.get('/', productoController.productos);
// post
// post
router.post('/search/', productoController.busquedaProductos);//ver si se hace por GET


router.get('/:id', productoController.detalleProducto);

module.exports = router;