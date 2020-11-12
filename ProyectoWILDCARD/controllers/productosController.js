const productoController = {
    productos: (req, res, next) => {
        res.render('products/productos');
    },
    detalleProducto: (req, res, next) => {
        res.render('products/productDetail');
    }
};

module.exports = productoController;