const indexController = {
    home: (req, res, next) => {

        res.render('home', {
            usuario: req.usuarioLogueado
        });
    },
    ayuda: (req, res, next) => {
        res.render('ayuda', {
            usuario: req.usuarioLogueado
        });
    },
    contacto: (req, res, next) => {
        res.render('contacto', {
            usuario: req.usuarioLogueado
        });
    }
};

module.exports = indexController;