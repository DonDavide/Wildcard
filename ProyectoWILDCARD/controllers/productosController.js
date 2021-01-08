
var fs = require('fs');

const db = require ('../database/models');
const Op = db.Sequelize.Op;

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productoController = {
    productos: (req, res, next) => {
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
            res.render('products/productos', {productos : productos, marcas, talles, colores,  toThousand});
        })
       // res.render('products/productos', {
        //    listaProductos, toThousand
       // });
    },
    busquedaProductos: function(req, res, next){
        var busqueda = req.body.search;
        let productos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                nombre : {[Op.substring]: busqueda}
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
        Promise.all ([productos, mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([productos, marcas, talles, colores]){

            res.render('products/listadoBusqueda', {productos, marcas, talles, colores, toThousand});
        }) 
        .catch(function(error){
            console.log(error);
        })
    },
    ofertas: function(req, res, next){
        var busqueda = req.body.search;
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                descuento : { [Op.gt]: 0.5 }
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
        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([productos, marcas, talles, colores]){
            res.render('products/productos', {productos, marcas, talles, colores, toThousand});
        })
    },
    accesorios: function(req, res, next){
        var busqueda = req.body.search;
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                id_tipo : 2
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
        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([productos, marcas, talles, colores]){
            res.render('products/productos', {productos, marcas, talles, colores, toThousand});
        })
    },
    loNuevo: (req, res, next) =>{
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"},
            {association : "marcas"},
            {association : "talles"},
            {association : "categorias"}] ,
            order: [
                ['createdAt', 'ASC'],
                ],
            limit : 10
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
            res.render('products/productos', {productos, marcas, talles, colores, toThousand});
        })
    },
    filtro: (req, res, next) =>{
        console.log(req.body.persona);
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"},
            {association : "marcas"},
            {association : "talles"},
            {association : "categorias"},],
            where : {
                usuario : {[Op.substring]: req.body.persona},
                id_marca: {[Op.or]: [req.body.marcas]} ,
                id_categoria : {[Op.or]: [req.body.categoria]} ,
                precio : {[Op.between]: [req.body.preciomin, req.body.preciomax],
                
                 }
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

        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([productos, marcas, talles, colores]){
            console.log(talles);
            res.render('products/listadoBusqueda', {productos, marcas, talles, colores, toThousand});
        })
        .catch(function(error){
            console.log(error);
        })
    },
    detalleProducto: (req, res, next) => {
        let productID = req.params.id;
        let productSelect = {};
        db.Productos.findByPk(req.params.id, {
            include : [{association:"talles"}, 
            {association:"colores"}, 
            {association:"imagenes"}, 
            {association:"marcas"},
            {association:"categorias"}]//se agrega la asociacion que esta en models
        })
        .then(function(producto){
            db.Productos.findAll({
                where : {
                    id_categoria : producto.categorias.id
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
                res.render('products/productDetail', {producto, productos,  toThousand})
            })

        })
        .catch(function(error){
            console.log(error);
        })
    },
    compraProducto: (req, res, next) => {
        let usuarioId = req.session.usuario.id
        db.Carritos.findOne({where : {
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}
        }
        }).then(function(resultado){
            if(resultado){
                console.log('carrito encontrado, el id es '+ resultado.id);
                db.Carrito_producto.create({
                    id_carrito : resultado.id,
                    id_producto : req.params.id,
                    id_talle : req.body.talle,
                    id_color : req.body.color,
                    cantidad: req.body.cantidad
                        }).then(function(resultado){
                            res.redirect('../users/carrito')
                        })
            }else{
                console.log('no se encontro carrito para el usuario ' + usuarioId )
                db.Carritos.create({
                    id_usuario : usuarioId,
                    estado : "abierto",
                    forma_pago : req.body.mediosPago,
                    forma_envio : req.body.mediosEnvio
                }).then(function(nuevo){
                    console.log("se creo el carrito nuevo")
                    db.Carritos.findOne({
                        where:{
                            id_usuario : usuarioId,
                            estado : "abierto"
                        }
                    });
                }).then(function(){
                    db.Carritos.max('id').then(resultado => {
                            db.Carrito_producto.create({
                                id_carrito : resultado,
                                id_producto : req.params.id,
                                id_talle : req.body.talle,
                                id_color : req.body.color,
                                cantidad: req.body.cantidad
                            })
                        
                        }) 
                }).then(function(resultado){
                    res.redirect('../users/carrito')
                })
                }
                })

    }
};

module.exports = productoController;