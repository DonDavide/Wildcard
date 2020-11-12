const indexController = {
    home: (req, res, next) => {
        res.render('home');
    },
    ayuda: (req, res, next) => {
        res.render('ayuda');
    },
    contacto: (req, res, next) => {
        res.render('contacto');
    }
};

module.exports = indexController;