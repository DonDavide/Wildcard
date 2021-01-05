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



router.get('/products', accesoMiddleware.accesoAdmin, adminController.listaProducto);
// post filtro

router.get('/products/create', accesoMiddleware.accesoAdmin, adminController.nuevoProducto);
router.post('/products', upload.any(), accesoMiddleware.accesoAdmin, adminController.nuevoProductoPost); //Acción de creación (a donde se envía el formulario)

router.get('/products/:id/edit', accesoMiddleware.accesoAdmin, adminController.editarProducto);
router.post('/products/:id', upload.any(), accesoMiddleware.accesoAdmin, adminController.editarProductoPost);

router.get('/products/delete/:id', accesoMiddleware.accesoAdmin, adminController.destroy); 


module.exports = router;