const { LOADIPHLPAPI } = require('dns');
var fs = require('fs');

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productoController = {
    productos: (req, res, next) => {
        res.render('products/productos', {
            listaProductos, toThousand
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
        var productRel = listaProductos.filter(function(producto){//crear variable para enviar productos relacionados.
            return producto.categorias==productSelect.categorias
        });
        
        console.log(productSelect);
        console.log(productSelect.talles);
        res.render('products/productDetail',{
            productSelect, productRel, toThousand
        });
    }
};

module.exports = productoController;