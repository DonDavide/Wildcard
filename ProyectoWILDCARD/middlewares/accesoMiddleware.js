var fs = require('fs');
const db = require("../database/models");
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');

const accesoMiddleware = {
    acceso: (req,res,next) => {

        if ( req.session.usuario ) {
            next()
        } else {
            // req.session.error = 'Access denied!';
            res.render('users/login', {
                mensaje: 'Acceso denegado! Por favor, logueese',
                usuario: "ningunUsuarioLogueado"
            })
        }
    },
    accesoAdmin: (req,res,next) => {

        if ( req.session.usuario ){
            if ( req.session.usuario.permiso == 'admin' ) {
                next()
            } else {
                res.render('home',{
                    mensaje: 'nada',
                    usuario: req.session.usuario.nombre
                })
            }
        } else {
            res.render('users/login', {
                mensaje: 'Acceso denegado! Por favor, logueese',
                usuario: "ningunUsuarioLogueado"
            })
        }
    },
    userSessionLogged: (req,res,next) => {

        if ( req.session.usuario ) {
            req.usuarioLogueado = req.session.usuario.nombre
        } else {
            req.usuarioLogueado = "ningunUsuarioLogueado"
        }
        next()
    },
    checkNewProductErrors : (req,res,next) => {
        let errors = validationResult(req);
        if ( req.session.usuario ) {
            req.usuarioLogueado = req.session.usuario.nombre
        } else {
            req.usuarioLogueado = "ningunUsuarioLogueado"
        }

        if (!errors.isEmpty()) {
            console.log("PASO POR VALIDACION DE ERROR ")
            console.log(errors.errors)

            let mostrarMarcas = db.Marcas.findAll();
            let mostrarTalles = db.Talles.findAll({
                order: [
                    ['id', 'ASC'],
                    ],
            });
            let mostrarColores = db.Colores.findAll();

            Promise.all ([mostrarMarcas, mostrarTalles, mostrarColores])

            .then(function([marcas, talles, colores]){
                return res.render('admin/newProduct', {marcas, talles, colores,usuario: req.usuarioLogueado,mensaje: errors.errors})
            })
        } else {
            next()  
        }  
    }
}

module.exports = accesoMiddleware;