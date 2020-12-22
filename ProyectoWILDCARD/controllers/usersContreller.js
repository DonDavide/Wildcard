const fs = require('fs');
const { UnsupportedMediaType } = require('http-errors');
const path = require('path');
const bcrypt = require("bcrypt")
const db = require("../database/models");

var usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

var carritosFilePath = path.join(__dirname, '../data/carritos.json');
var carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));

const usersController = {
    register : (req, res, next) => {
        res.render('users/register.ejs')
    },
    store: (req, res, next) => {

        if(req.body.password != req.body.confirmpassword){
            return res.send("La contraseña y la confirmacion de contraseña deben ser iguales")
        }

        db.Usuarios.create({
            nombre: req.body.fullname,
            email: req.body.email,
            telefono: req.body.telefono,
            password:  bcrypt.hashSync(req.body.password, 10), //encripto la contraseña
            permiso: "externo"
        })
        res.send('bienvenido '+req.body.fullname);

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
        res.render('users/login.ejs');
    },
    list: (req, res, next) => {
        console.log(users);
        res.render('users/userList.ejs', {users : users});
    },
    destroy : (req, res) => {
		var idUsers = req.params.id;
		var userDestroy = users.filter(function(user){
			return user.id!=idUsers; 
		})
		var userDestroyJSON = JSON.stringify(userDestroy, null, 2);
		fs.writeFileSync(__dirname + '/../data/users.json', userDestroyJSON);
		
		
		return res.redirect("/users/userList")
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
            userEdit
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
    carrito: (req, res, next) => {
        res.render('users/carrito.ejs');
        /*{(req, res, next) => {
            var idCarrito = req.params.id;
            for (var i = 0; i<carritos.length; i++){
                if(carritos[i].id == idCarrito){
                    productFound = carritos[i];
                    break;
                }
            }
            if(productFound){
                return res.render("users/carrito", {carritoFound});
            }	
          }*/
      }
};

module.exports = usersController;