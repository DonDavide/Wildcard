const usersController = {
    register : (req, res, next) => {
        res.render('users/register.ejs');
    },
    login: (req, res, next) => {
        res.render('users/login.ejs');
    },
    carrito: (req, res, next) => {
        res.render('users/carrito.ejs');
      }
};

module.exports = usersController;