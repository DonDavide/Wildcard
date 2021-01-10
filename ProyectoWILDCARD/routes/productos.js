var express = require('express');
var router = express.Router();
const productoController = require('../controllers/productosController');
const accesoMiddleware = require('../middlewares/accesoMiddleware');

router.get('/', accesoMiddleware.userSessionLogged, productoController.productos);

router.get('/ofertas', accesoMiddleware.userSessionLogged, productoController.ofertas);

router.get('/ultimos', accesoMiddleware.userSessionLogged, productoController.loNuevo);
// post
// post
router.post('/search/', accesoMiddleware.userSessionLogged, productoController.busquedaProductos);//ver si se hace por GET

router.post('/filtro', accesoMiddleware.userSessionLogged, productoController.filtro);
router.get('/accesorios', accesoMiddleware.userSessionLogged, productoController.accesorios);


router.get('/:id', accesoMiddleware.userSessionLogged, productoController.detalleProducto);
router.post('/:id', accesoMiddleware.acceso, accesoMiddleware.userSessionLogged, productoController.compraProducto);

module.exports = router;