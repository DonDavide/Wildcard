var express = require('express');
var router = express.Router();
const path = require ('path');
const multer = require('multer');
const adminController = require('../controllers/adminController')
const accesoMiddleware = require('../middlewares/accesoMiddleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })



router.get('/products', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listaProducto);
router.post('/products', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listaProductoFiltrados);

router.get('/products/create', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.nuevoProducto);
router.post('/products', upload.any(), accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.nuevoProductoPost); //Acción de creación (a donde se envía el formulario)

router.get('/products/:id/edit', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarProducto);
router.post('/products/:id', upload.any(), accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarProductoPost);

router.get('/products/delete/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.softDelete); 


module.exports = router;