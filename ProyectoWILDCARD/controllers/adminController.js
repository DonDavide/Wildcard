const adminController = {
    nuevoProducto: (req, res, next) => {
        res.render('admin/newProduct');
    },
    editarProducto: (req, res, next) => {
        res.render('admin/editProduct');
    },
}

module.exports = adminController;