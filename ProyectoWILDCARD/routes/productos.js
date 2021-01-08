var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosController');
const accesoMiddleware = require('../middlewares/accesoMiddleware');

router.get('/', productoController.productos);

router.get('/ofertas', productoController.ofertas);

router.get('/ultimos', productoController.loNuevo);
// post
// post
router.post('/search/', productoController.busquedaProductos);//ver si se hace por GET

router.post('/filtro', productoController.filtro);
router.get('/accesorios', productoController.accesorios);


router.get('/:id', productoController.detalleProducto);
router.post('/:id', accesoMiddleware.acceso, productoController.compraProducto);

module.exports = router;