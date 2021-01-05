var fs = require('fs');

const accesoMiddleware = {
    acceso: (req,res,next) => {

        if ( req.session.usuario ) {
            next()
        } else {
            // req.session.error = 'Access denied!';
            res.render('users/login', {
                mensaje: 'Acceso denegado! Por favor, logueese'
            })
        }
    },
    accesoAdmin: (req,res,next) => {

        if ( req.session.usuario ){
            if ( req.session.usuario.permiso == 'admin' ) {
                next()
            } else {
                res.render('/',{
                    usuario: req.session.permiso
                })
            }
        } else {
            res.render('users/login', {
                mensaje: 'Acceso denegado! Por favor, logueese'
            })
        }
    }
}

module.exports = accesoMiddleware;