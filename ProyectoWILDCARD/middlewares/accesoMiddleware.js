var fs = require('fs');

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
        console.log("USUARIO LOGUEADO : ")
        console.log(req.usuarioLogueado)
        next()
    }
}

module.exports = accesoMiddleware;