const fs = require('fs');
const path = require('path');

var usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

var carritosFilePath = path.join(__dirname, '../data/carritos.json');
var carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));

const usersController = {
    register : (req, res, next) => {
        res.render('users/register.ejs')
    },
    store: (req, res, next) => {
        var allIds=[];
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
            password: req.body.password
        }

        users.push(nuevoUser);//capturo los datos del formulario y los inserto en el array users.
        usersJSON = JSON.stringify(users, null, 2);//convierto el array users en un archivo JSON
        fs.writeFileSync(__dirname + '/../data/users.json', usersJSON);//escribo el JSON con el usuario nuevo.

        carritos.push({id : nuevoId, products:[]});//capturo el ID para crear carrito con mismo ID que el usuario
        carritosJSON = JSON.stringify(carritos, null, 2);//convierto el array carritos en un archivo JSON
        fs.writeFileSync(__dirname + '/../data/carritos.json', carritosJSON)//escribo el JSON con el carrito y el id del usuario nuevo.
        res.send('bienvenido '+req.body.fullname);
    },
    login: (req, res, next) => {
        res.render('users/login.ejs');
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