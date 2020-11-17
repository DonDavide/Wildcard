var express = require('express');
var router = express.Router();
const path = require ('path');
const multer = require('multer');
const adminController = require('../controllers/adminController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })



router.get('/products', adminController.listaProducto);
// post filtro

router.get('/products/create', adminController.nuevoProducto);
router.post('/products', upload.any(), adminController.nuevoProductoPost); //Acción de creación (a donde se envía el formulario)

router.get('/products/:id/edit', adminController.editarProducto);
router.post('/products/:id', upload.any(), adminController.editarProductoPost);

// borrar get
// borrar post

module.exports = router;