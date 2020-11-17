var fs = require('fs');

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);

const productoController = {
    productos: (req, res, next) => {
        res.render('products/productos', {
            listaProductos
        });
    },
    detalleProducto: (req, res, next) => {
        let productID = req.params.id;
        let productSelect = {};

        for (let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productID){
                productSelect = listaProductos[i];
            }
        }
        res.render('products/productDetail',{
            productSelect
        });
    }
};

module.exports = productoController;