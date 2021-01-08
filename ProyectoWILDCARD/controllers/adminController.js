var fs = require('fs');
const db = require("../database/models");
const accesoMiddleware = require('../middlewares/accesoMiddleware');
const { productos } = require('./productosController');

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const adminController = {
    listaProducto: (req, res, next) => {
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"}]}, {
            order: [
                ['nombre', 'ASC'],
                ],
        });
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarTalles = db.Talles.findAll({
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarColores = db.Colores.findAll();
        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([productos, marcas, talles, colores]){
        res.render('admin/listProducts', {productos : productos, marcas, talles, colores,  toThousand});
    })
    },

    nuevoProducto: (req, res, next) => {
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarTalles = db.Talles.findAll({
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarColores = db.Colores.findAll();
        Promise.all ([mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([marcas, talles, colores]){

            res.render('admin/newProduct', {marcas, talles, colores})
        })
        ;
    },
    nuevoProductoPost: (req, res, next) => {

        db.Productos.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descuento: req.body.descuento,
            id_tipo: req.body.categoria,
            usuario: req.body.usuario,
            id_categoria:  req.body.categorias,
            descripcion: req.body.descripcion,
            id_marca: req.body.marca
            
        })
        .then(function(){
            db.Productos.max('id').then(resultado => {
                for (var i = 0 ; i < req.body.talles.length ; i ++){
                    db.Producto_talle.create({
                        id_producto : resultado,
                        id_talle : req.body.talles[i]
                    })
                }
                }) 
        })
        .then(function(){
            db.Productos.max('id').then(resultado => {
                for (var i = 0 ; i < req.body.colores.length ; i ++){
                    db.Producto_color.create({
                        id_producto : resultado,
                        id_color : req.body.colores[i]
                    })
                }
                }) 
        })
        .then(function(){
            db.Productos.max('id').then(resultado => {
                for (var i = 0 ; i < req.files.length ; i ++){
                    db.Imagenes.create({
                       id_producto : resultado,
                        path : req.files[i].filename,
                       nombre : req.files[i].originalname
                    })
                }
                }) 
        })
        .then(function(){
            db.Productos.findAll({
                order: [
                    ['nombre', 'ASC'],
                    ],
            })
        })
        .then(function(productos){

            res.redirect('admin/products');
        }) 
    },

    editarProducto: (req, res, next) => {
        let mostrarProducto = db.Productos.findByPk(req.params.id, {//se busca el producto con el ID recibido por params
            include : [{association:"marcas"}, {association:"talles"}, {association:"colores"}, ]//se agrega la asociacion que esta en models
        })
        let mostrarMarcas = db.Marcas.findAll();//se buscan las marcas
        let mostrarTalles = db.Talles.findAll({//se buscan los talles
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarColores = db.Colores.findAll();
        Promise.all([mostrarProducto, mostrarMarcas, mostrarTalles, mostrarColores])//se ejecutan la promesa cuando se cumplen las cuatro
        .then(function([producto, marcas, talles, colores]){//se comparten las 4 variables solo con las 4 ya culminadas.
         console.log(producto.talles[0].talle);
            res.render('admin/editProduct', {producto, marcas, talles, colores})//enviamos a la vista los 4 objetos.
        });
    },
    editarProductoPost: (req, res, next) => {
        db.Productos.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descuento: req.body.descuento,
            id_tipo: req.body.categoria,
            usuario: req.body.usuario,
            id_categoria:  req.body.categorias,
            descripcion: req.body.descripcion,
            id_marca: req.body.marca
            
        },{
            where :  {id: req.params.id}
        })
        
        .then(resultado => {
            for (var i = 0 ; i < req.body.talles.length ; i ++){
                db.Producto_talle.update({
                    id_talle : req.body.colores[i]
                },{
                    where :{id_producto : req.params.id

                    }
                })
            }
            }) 
            .then(resultado => {
                for (var i = 0 ; i < req.body.colores.length ; i ++){
                    db.Producto_color.update({
                        id_color : req.body.colores[i]
                    },{
                        where :{id_producto : req.params.id
    
                        }
                    })
                }
                }) .then(resultado => {
                    for (var i = 0 ; i < req.files.length ; i ++){
                        db.Imagenes.update({
                            path : req.files[i].filename,
                           nombre : req.files[i].originalname
                            }, {
                            where :{id_producto : req.params.id}
                                }
                        )
                    }
                    }) 
                .then(function(productos){

                        res.redirect("/admin/products");
                    }) 
    },
    destroy : (req, res) => {
            db.Producto_talle.destroy({
            where : {
                id_producto : req.params.id
            }})
            .then(function(){
                db.Producto_color.destroy({
                where : {
                    id_producto : req.params.id
                }})      
        }) 
        .then(function(){
            db.Imagenes.destroy({
            where : {
                id_producto : req.params.id
            }})
            .then(function(){
                db.Productos.destroy({
                where : {
                    id : req.params.id
                }})         
    })          
    }).then(function(){res.redirect ("/admin/products")})
    
    },
    softDelete: (req, res, next) => {
        db.Productos.update({
            estado : 0
            
        },{
            where :  {id: req.params.id}
        })}
}

module.exports = adminController;