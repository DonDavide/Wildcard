var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('localhost:3000', function(req, res, next) {
  res.render('home');
});
router.get('/detalleProducto', function(req, res, next) {
  res.render('productDetail.ejs', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register.ejs');
});
module.exports = router;
