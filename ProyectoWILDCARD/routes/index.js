var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/detalleProducto', function(req, res, next) {
  res.render('productDetail.ejs', { title: 'Express' });
});
router.get('/header', function(req, res, next) {
  res.render('header.ejs', { title: 'Express' });
});

module.exports = router;
