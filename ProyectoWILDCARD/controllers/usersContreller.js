const fs = require('fs');
const { UnsupportedMediaType } = require('http-errors');
const path = require('path');
const bcrypt = require("bcrypt")
const db = require("../database/models");
const Op = db.Sequelize.Op;
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

var carritosFilePath = path.join(__dirname, '../data/carritos.json');
var carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));

const usersController = {
    register : (req, res, next) => {
        res.render('users/register.ejs', {
            mensaje: 'nada',
            usuario: req.usuarioLogueado
        })
    },
    store: (req, res, next) => {

        db.Usuarios.create({
            nombre: req.body.fullname,
            email: req.body.email,
            telefono: req.body.telefono,
            password:  bcrypt.hashSync(req.body.password, 10), //encripto la contraseña
            permiso: "externo"
        })
        res.render('users/login', {
            mensaje: 'Bienvenido '+req.body.fullname,
            usuario: req.usuarioLogueado
        });

        /* var allIds=[];
		for (i = 0 ; i < users.length; i ++){
			if(users[i].id){
				allIds.push(parseInt(users[i].id)); //Inserto todos los IDS del objeto products en un array.
			}
		}
        var idMax = Math.max(...allIds)//busco el numero mas alto dentro de los ids
        if(idMax>0){
            var nuevoId= idMax + 1; //creo el nuevo Id agregandole +1 al de mayor valor
            
        }
        else {  nuevoId = 1}
        if(req.body.password !=req.body.confirmpassword){
            return res.send("La contraseña y la confirmacion de contraseña deben ser iguales")
        }
        for(i=0; i<users.length; i++){
            if(users[i].email==req.body.email){
                res.send("Este email ya fue registrado")
            }
        }
        console.log(req.body);
        var nuevoUser={
            id: nuevoId,
            fullname: req.body.fullname,
            email: req.body.email,
            telefono: req.body.telefono,
            password:  bcrypt.hashSync(req.body.password, 10)//encripto la contraseña
        }

        users.push(nuevoUser);//capturo los datos del formulario y los inserto en el array users.
        usersJSON = JSON.stringify(users, null, 2);//convierto el array users en un archivo JSON
        fs.writeFileSync(__dirname + '/../data/users.json', usersJSON);//escribo el JSON con el usuario nuevo.

        carritos.push({id : nuevoId, products:[]});//capturo el ID para crear carrito con mismo ID que el usuario
        carritosJSON = JSON.stringify(carritos, null, 2);//convierto el array carritos en un archivo JSON
        fs.writeFileSync(__dirname + '/../data/carritos.json', carritosJSON)//escribo el JSON con el carrito y el id del usuario nuevo.
        res.send('bienvenido '+req.body.fullname); */
    },
    login: (req, res, next) => {
        res.render('users/login.ejs', {
            mensaje: 'nada',
            usuario: req.usuarioLogueado
        });
    },
    loginOK: (req, res, next) => {
        res.render('home', {
            usuario: req.usuarioLogueado
        });
    },
    list: (req, res, next) => {
        console.log(users);
        res.render('users/userList.ejs', {users : users, usuario: req.usuarioLogueado});
    },
    destroy : (req, res) => {
		var idUsers = req.params.id;
		var userDestroy = users.filter(function(user){
			return user.id!=idUsers; 
		})
		var userDestroyJSON = JSON.stringify(userDestroy, null, 2);
		fs.writeFileSync(__dirname + '/../data/users.json', userDestroyJSON);
		
		
		return res.redirect("/users/userList", {usuario: req.usuarioLogueado})
    },
    editarUsuario: (req, res, next) => {
        let userID = req.params.id;
        let userEdit = {};
        for (let i=0; i<users.length; i++){
            if (users[i].id == userID){
                userEdit = users[i];
            }
        }

        res.render('users/userEdit.ejs', {
            userEdit,
            usuario: req.usuarioLogueado
        })
    }, 
    editarUsuarioPost: (req, res) => {
		var idUser = req.params.id;
		console.log(req.params.id);
		var editUser = users.map(function(user){
			if(user.id == idUser){
				return req.body; 
			}
			return user;
		});
		editUserJSON = JSON.stringify(editUser, null, 2);
		fs.writeFileSync(__dirname + '/../data/users.json', editUserJSON);	
		console.log(req.body);
		var userEditado = req.body;
		
		res.send("usuario editado")
		
    },
    carritoVacio :(req, res, next)=>{
        let usuarioId = req.session.usuario.id;
        db.Carritos.findOne({where :{
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}
        }}).then(function(resultado){
            console.log(resultado);
            if (resultado){
                res.redirect('../../carrito')
            } else{
                
                res.redirect('/')
            }
        })
    },
    carrito: (req, res, next) => {
        let usuarioId = req.session.usuario.id;
        let mostrarCarrito = db.Carritos.findOne({where : {
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}}
            , 
            include : [{association:"carrito_productos"}]})
        let mostrarMarcas = db.Marcas.findAll();//se buscan las marcas
        let mostrarTalles = db.Talles.findAll({//se buscan los talles
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarCarritoProducto = db.Carrito_producto.findAll({where : {
            id_usuario : usuarioId}
            , 
            include : [{association:"producto"}, {association:"carrito"}, {association:"talle"},
            {association:"color"}]})

        let mostrarColores = db.Colores.findAll();
        let mostrarProductos = db.Productos.findAll({include : [{association:"imagenes"}]});
        
        Promise.all ([mostrarCarrito, mostrarCarritoProducto, mostrarMarcas, mostrarTalles, mostrarColores, mostrarProductos])
        .then(function([carrito, carritoProducto, marcas, talles, colores, productos]){
            res.render('users/carrito', {carrito, carritoProducto, marcas, talles, colores, productos, toThousand,
                usuario: req.usuarioLogueado
            });
        })
        .catch(function(error){
            console.log(error);
        })
    },
    borraDeCarrito: (req,res,next) =>{
        db.Carrito_producto.destroy({
        where : {
            id : req.params.id
        }}).then(function(){ console.log('producto Borrado'); res.redirect ('/users/carrito')})
        .catch(function(error){
            console.log(error);
        })
    },
    finalizarCompra: (req, res, next) =>{
        db.Carritos.update({
            estado: "pedido"
            
        },{
            where :  {id: req.params.id}
        }).then(function(){ console.log('Compra Finalizada'); res.render('users/comprado', {usuario :req.session.usuario.nombre,  mensaje: 'nada'})})
        .catch(function(error){
            console.log(error);
        })
    },
    closeSession: (req,res,next) => {
        req.usuarioLogueado = "ningunUsuarioLogueado";
        req.session.destroy();
        /* res.render('home', {
            usuario: req.usuarioLogueado
        }); */
        res.redirect('/')
    }
};

module.exports = usersController;