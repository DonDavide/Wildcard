
var fs = require('fs');

const db = require ('../database/models');
const Op = db.Sequelize.Op;

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productoController = {
    productos: (req, res, next) => {
        res.render('products/productos', {
            listaProductos, toThousand
        });
    },
    busquedaProductos: function(req, res, next){
        var busqueda = req.body.search;
        db.Productos.findAll({
            where : {
                nombre : { [Op.like]: '%'+busqueda+'%' }
            }
        })
        .then(function(productos){

            res.render('products/listadoBusqueda', {productos, toThousand});
        }) 
        .catch(function(error){
            console.log(error);
        })
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