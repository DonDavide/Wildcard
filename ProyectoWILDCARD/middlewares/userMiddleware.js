var fs = require('fs');
const db = require("../database/models");
const bcrypt = require("bcrypt")
const { check, validationResult, body } = require('express-validator');
const Op = db.Sequelize.Op;

const userMiddleware = {
    checkUser : (req,res,next) => {

        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((resultado) => {
            if (resultado) { // si existe usuario chequea contraseña
                if ( bcrypt.compareSync(req.body.password, resultado.password) ) { // si contraseña es correcta, loguea al usuario
                    req.session.loggedIn = true;
                    req.session.usuario = resultado;
                    next()
                } else {
                    req.session.loggedIn = false;
                    res.render('users/login', { // si contraseña no es correcta, vuelve al login
                        mensaje: 'Usuario y/o contraseña incorrectos.'
                    })
                }
            } else { // si no existe usuario vuelve al login
                req.session.loggedIn = false;
                res.render('users/login', {
                    mensaje: 'Usuario y/o contraseña incorrectos.'
                })
            }
        })
    },
    checkRegisterErrors : (req,res,next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/register', {
                mensaje: errors.errors
            });
        } else {
            next()
        }           
    },
     checkUserExistance : (req,res,next) => {

        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((resultado) => {
            if (resultado) {
                return res.render('users/register', {
                    mensaje: 'Usuario ya existente.'
                })
            } else {
                next()
            }
        })

    },
    checkPassConfirmation : (req,res,next) => {
            if (req.body.password == req.body.confirmpassword) {
                next()
            } else {
                res.render('users/register', {
                    mensaje: 'Contraseña y confirmación no coinciden.'
                })
            }


    },
    checkCarrito : (req,res,next) => {
        let usuarioId = req.session.usuario.id
        db.Carritos.findOne({where : {
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}
        }
        }).then(function(resultado){
            if (resultado){
                console.log('se encontro carrito');
                next() 
            }else{
                console.log('no se encontro carrito para el usuario ' + usuarioId )
                db.Carritos.create({
                    id_usuario : usuarioId,
                    estado : "abierto",
                    forma_pago : req.body.mediosPago,
                    forma_envio : req.body.mediosEnvio
                }).then(function(carrito){
                    console.log('se creo carrito');
                    next()
                })
            }
        })
    }
}

module.exports = userMiddleware;