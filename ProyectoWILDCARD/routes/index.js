var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('localhost:3000', function(req, res, next) {
  res.render('home');
});
router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Express' });
});
router.get('/detalleProducto', function(req, res, next) {
  res.render('productDetail', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register.ejs');
});
router.get('/header', function(req, res, next) {
  res.render('header.ejs', { title: 'Express' });
});
router.get('/carrito', function(req, res, next) {
  res.render('carrito.ejs', { title: 'Express' });
});
module.exports = router;
