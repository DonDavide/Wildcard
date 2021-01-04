
var fs = require('fs');

const db = require ('../database/models');
const Op = db.Sequelize.Op;

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productoController = {
    productos: (req, res, next) => {
        db.Productos.findAll({include :[
            {association : "talles"}, 
           {association : "colores"}, 
            {association : "imagenes"},
            {association : "marcas"}, ]}, {
            order: [
                ['nombre', 'ASC'],
                ],
        })
        .then(function(productos){
            res.render('products/productos', {productos, toThousand});
        })
       // res.render('products/productos', {
        //    listaProductos, toThousand
       // });
    },
    busquedaProductos: function(req, res, next){
        var busqueda = req.body.search;
        db.Productos.findAll({
            where : {
                nombre : { [Op.like]: '%'+busqueda+'%' }
            },
            order: [
                ['nombre', 'ASC'],
                ],
        })
        .then(function(productos){

            res.render('products/listadoBusqueda', {productos, toThousand});
        }) 
        .catch(function(error){
            console.log(error);
        })
    },
    ofertas: function(req, res, next){
        var busqueda = req.body.search;
        db.Productos.findAll({
            where : {
                descuento : { [Op.gt]: 0.5 }
            },
            order: [
                ['nombre', 'ASC'],
                ],
        })
        .then(function(productos){

            res.render('products/listadoBusqueda', {productos, toThousand});
        }) 
        .catch(function(error){
            console.log(error);
        })
    },
    loNuevo: (req, res, next) =>{
        db.Productos.findAll({
            order: [
                ['createdAt', 'ASC'],
                ],
        })
        .then(function(productos){
            res.render('products/productos', {productos, toThousand});
        })
    },
    filtro: (req, res, next) =>{
        db.Productos.findAll({
            where : {
                usuario : { [Op.like]: '%'+req.body.persona+'%' },
                precio : {[Op.between]: [req.body.preciomin, req.body.preciomax], }
            },
            order: [
                ['nombre', 'ASC'],
                ],
        })
        .then(function(productos){
            res.render('products/productos', {productos, toThousand});
        })
    },
    detalleProducto: (req, res, next) => {
        let productID = req.params.id;
        let productSelect = {};
        db.Productos.findByPk(req.params.id, {
            include : [{association:"talles"}, 
            {association:"colores"}, 
            {association:"imagenes"}, 
            {association:"marcas"}]//se agrega la asociacion que esta en models
        })
        .then(function(producto){
            db.Productos.findAll({
                where : {
                    categoria : producto.categoria
                }
                , 
                    include : [{association:"talles"}, 
                    {association:"colores"}, 
                    {association:"imagenes"}, 
                    {association:"marcas"}],
            order: [
                ['nombre', 'ASC'],
                ],
            })
            .then(function(productos){
                console.log(producto.nombre);
                console.log(producto.talles[0].talle);
                console.log(producto.imagenes[0].path);
                console.log(productos)
                res.render('products/productDetail', {producto, productos,  toThousand})
            })

        })
        .catch(function(error){
            console.log(error);
        })
       /* for (let i=0; i<listaProductos.length; i++){
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
        });*/
    }
};

module.exports = productoController;