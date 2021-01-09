var fs = require('fs');
const db = require("../database/models");
const accesoMiddleware = require('../middlewares/accesoMiddleware');
const { productos } = require('./productosController');
const Op = db.Sequelize.Op;

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const adminController = {
    listaProducto: (req, res, next) => {
        let mostrarProductos = db.Productos.findAll({
            where : {
                activo: 1
            },
            include :[ 
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
        let mostrarCategorias = db.Categorias.findAll();

        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([productos, marcas, talles, colores, categorias]){
        res.render('admin/listProducts', {productos : productos, marcas, talles, colores, categorias,  toThousand, 
            filtros:{
                usuario: 'todos',
                categoria: 'ningunacategoria',
                precio: [0,1000000],
                talle: 'ninguntalle',
                color: 'ninguncolor',
                marcas: 'ningunamarca'
            }
            });
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
            id_marca: req.body.marca,
            activo: 1
            
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
            
            var tallesProducto = [];
            for ( let t=0; t<producto.talles.length; t++ ){
                tallesProducto.push(producto.talles[t].talle)
            }
            var coloresProducto = [];
            for ( let t=0; t<producto.colores.length; t++ ){
                coloresProducto.push(producto.colores[t].nombre)
            }
         /* console.log(producto.talles[0].talle); */
            res.render('admin/editProduct', {producto, marcas, talles, colores, tallesProducto, coloresProducto})//enviamos a la vista los 4 objetos.
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
            activo : 0
        },{
            where :  {id: req.params.id}
        }).then( function(){
            db.Productos.findByPk(req.params.id)
            .then(productoborrado => {

                res.redirect("/admin/products")

            })
        })
        .catch(function(error){
            console.log(error);
        })

    },
    listaProductoFiltrados: (req, res, next) =>{

        var usuarioWhere;
        var categoriaWhere;
        var precioWhere;
        var talleWhere;
        var colorWhere;
        var marcasWhere;

        var usuarioFilter;
        var categoriaFilter;
        var precioFilter;
        var talleFilter;
        var colorFilter;
        var marcasFilter;

        usuarioFilter = req.body.persona
        if ( req.body.persona == 'todos' ) {
            usuarioWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
        } else {
            usuarioWhere = { [Op.eq]: req.body.persona };
        }

        
        if ( req.body.categoria ) {
            if ( typeof(req.body.categoria) == 'string' ) {
                categoriaWhere = { [Op.in]: [req.body.categoria] };
                categoriaFilter = [req.body.categoria];
            } else {
                categoriaWhere = { [Op.in]: req.body.categoria };
                categoriaFilter = req.body.categoria;
            }
        } else {
            categoriaWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
            categoriaFilter = 'null';
        }

        precioFilter = [req.body.preciomin, req.body.preciomax]
        precioWhere = { [Op.between]: [req.body.preciomin, req.body.preciomax] };

        if ( req.body.talles ) {
            if ( typeof(req.body.talles) == 'string' ) {
                talleWhere = { [Op.in]: [req.body.talles] };
                talleFilter = [req.body.talles]
            } else {
                talleWhere = { [Op.in]: req.body.talles };
                talleFilter = req.body.talles
            }
        } else {
            talleWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
            talleFilter = 'null'
        }
  
        if ( req.body.color ) {
            if ( typeof(req.body.color) == 'string' ) {
                colorWhere = { [Op.in]: [req.body.color] };
                colorFilter = [req.body.color]
            } else {
                colorWhere = { [Op.in]: req.body.color };
                colorFilter = req.body.color
            }
        } else {
            colorWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
            colorFilter = 'null'
        }

        if ( req.body.marcas ) {
            if ( typeof(req.body.marcas) == 'string' ) {
                marcasWhere = { [Op.in]: [req.body.marcas] };
                marcasFilter = [req.body.marcas]
            } else {
                marcasWhere = { [Op.in]: req.body.marcas };
                marcasFilter = req.body.marcass
            }
        } else {
            marcasWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' }; 
            marcasFilter = 'null'
        }       

        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"},
            {association : "colores",
                where : {
                    nombre: colorWhere,                
                },
            },
            {association : "marcas",
                where : {
                    nombre: marcasWhere,                
                },
            },
            {association : "talles",
                where : {
                    talle: talleWhere,                
                },
            },
            {association : "categorias",
                where : {
                    nombre: categoriaWhere,                
                },
            },],
            where : {
                usuario: usuarioWhere,
                precio: precioWhere,
                activo: 1
            },
            order: [
                ['nombre', 'ASC'],
                ],
        })

        let mostrarMarcas = db.Marcas.findAll();
        let mostrarTalles = db.Talles.findAll({
            
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarColores = db.Colores.findAll();
        let mostrarCategorias = db.Categorias.findAll();

        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([productos, marcas, talles, colores, categorias]){
            res.render('admin/listProducts', {productos, marcas, talles, colores, categorias, toThousand,
            filtros:{
                usuario: usuarioFilter,
                categoria: categoriaFilter,
                precio: precioFilter,
                talle: talleFilter,
                color: colorFilter,
                marcas: marcasFilter
            }});
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

module.exports = adminController;