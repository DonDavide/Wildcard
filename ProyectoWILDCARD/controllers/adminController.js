var fs = require('fs');

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);

const adminController = {
    listaProducto: (req, res, next) => {
        res.render('admin/listProducts', {
            listaProductos
        });
    },

    nuevoProducto: (req, res, next) => {
        res.render('admin/newProduct');
    },
    nuevoProductoPost: (req, res, next) => {
        let productoNuevo = req.body;
        console.log(req.body);
        productoNuevo.id = listaProductos.length;
        if (req.files.length >= 1){
            productoNuevo.imagen1 = req.files[0].filename;
        } 
        if (req.files.length >= 2){
            productoNuevo.imagen2 = req.files[1].filename;
        } 
        if (req.files.length >= 3){
            productoNuevo.imagen3 = req.files[2].filename;
        } 
        if (req.files.length >= 4){
            productoNuevo.imagen4 = req.files[3].filename;
        } 
        if (req.files.length >= 5){
            productoNuevo.imagen5 = req.files[4].filename;
        } 
        if (req.files.length >= 6){
            productoNuevo.imagen6 = req.files[5].filename;
        } 
        if (req.files.length >= 7){
            productoNuevo.imagen7 = req.files[6].filename;
        } 
        if (req.files.length >= 8){
            productoNuevo.imagen8 = req.files[7].filename;
        } 

        listaProductos.push(productoNuevo);
        let listaProductosString = JSON.stringify(listaProductos, null, 2);
        fs.writeFileSync(__dirname + "/../data/products.json", listaProductosString);
        
        res.render('admin/listProducts', {
            listaProductos
        });
    },

    editarProducto: (req, res, next) => {
        let productID = req.params.id;
        let productEdit = {};
        for (let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productID){
                productEdit = listaProductos[i];
            }
        }

        res.render('admin/editProduct', {
            productEdit
        });
    },
    editarProductoPost: (req, res, next) => {
        let productID = req.params.id;
        let productNewEdit = req.body;
        productNewEdit.id = productID;
        for (let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productID){
                if(listaProductos[i].imagen1){
                    productNewEdit.imagen1 = listaProductos[i].imagen1;
                }
                if(listaProductos[i].imagen2){
                    productNewEdit.imagen2 = listaProductos[i].imagen2;
                }
                if(listaProductos[i].imagen3){
                    productNewEdit.imagen3 = listaProductos[i].imagen3;
                }
                if(listaProductos[i].imagen4){
                    productNewEdit.imagen4 = listaProductos[i].imagen4;
                }
                if(listaProductos[i].imagen5){
                    productNewEdit.imagen5 = listaProductos[i].imagen5;
                }
                if(listaProductos[i].imagen6){
                    productNewEdit.imagen6 = listaProductos[i].imagen6;
                }
                if(listaProductos[i].imagen7){
                    productNewEdit.imagen7 = listaProductos[i].imagen7;
                }
                if(listaProductos[i].imagen8){
                    productNewEdit.imagen8 = listaProductos[i].imagen8;
                }
            }
        }

        let listaProductosEditada = []
        for (let i=0; i<listaProductos.length; i++){
            if (listaProductos[i].id == productID){
                listaProductosEditada.push(productNewEdit);
            } else {
                listaProductosEditada.push(listaProductos[i]);
            }
        }

        let listaProductosString = JSON.stringify(listaProductosEditada);
        fs.writeFileSync(__dirname + "/../data/products.json", listaProductosString);

        res.render('products/productDetail', {
            productSelect: productNewEdit,
            productEdit: productNewEdit
        });
    },
}

module.exports = adminController;