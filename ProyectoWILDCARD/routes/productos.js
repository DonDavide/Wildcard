var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosController')

router.get('/', productoController.productos);

router.get('/ofertas', productoController.ofertas);

router.get('/ultimos', productoController.loNuevo);
// post
// post
router.post('/search/', productoController.busquedaProductos);//ver si se hace por GET

router.post('/filtro', productoController.filtro);


router.get('/:id', productoController.detalleProducto);

module.exports = router;