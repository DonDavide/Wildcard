var fs = require('fs');
const db = require("../database/models");
const bcrypt = require("bcrypt")
const { check, validationResult, body } = require('express-validator');

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
                        mensaje: 'Usuario y/o contraseña incorrectos.',
                        usuario: "ningunUsuarioLogueado"
                    })
                }
            } else { // si no existe usuario vuelve al login
                req.session.loggedIn = false;
                res.render('users/login', {
                    mensaje: 'Usuario y/o contraseña incorrectos.',
                    usuario: "ningunUsuarioLogueado"
                })
            }
        })
    },
    checkRegisterErrors : (req,res,next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/register', {
                mensaje: errors.errors,
                usuario: "ningunUsuarioLogueado"
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
                    mensaje: 'Usuario ya existente.',
                    usuario: "ningunUsuarioLogueado"
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
                    mensaje: 'Contraseña y confirmación no coinciden.',
                    usuario: "ningunUsuarioLogueado"
                })
            }


    }
}

module.exports = userMiddleware;