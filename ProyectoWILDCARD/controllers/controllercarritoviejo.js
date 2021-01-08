compraProducto: (req, res, next) => {
    let usuarioId = req.session.usuario.id
    db.Carritos.findOne({where : {
        id_usuario : usuarioId,
        estado : {[Op.substring]: "abierto"}
    }
    }).then(function(resultado){
        if(resultado == 0 || typeof resultado == 'undefined'|| resultado == 'null'){
            console.log(resultado);
            console.log('Crear carrito');
            db.Carritos.create({
                id_usuario : usuarioId,
                estado : "abierto",
                forma_pago : req.body.mediosPago,
                forma_envio : req.body.mediosEnvio
            }).then(function(maxId){
                db.Carritos.max('id')
                .then(function(carritoId) {
                    console.log("el id del carrito es"+ carritoId);
                        db.Carrito_producto.create({
                            id_carrito : carritoId,
                            id_producto : req.params.id,
                            id_talle : req.body.talle,
                            id_color : req.body.color,
                            cantidad: req.body.cantidad
                        })
                    })}).then(function(){
                        console.log(req.session.usuario.id, req.body, resultado);;
    res.render('users/carrito')
                    })  
        }else{
            console.log('carrito encontrado')
            console.log("el carrito encontrado es" + resultado)

            .then(function(carritoId){
                console.log('buscar el id')
            })
            db.Carrito_producto.create({
            id_carrito : carritoId.id,
            id_producto : req.params.id,
            id_talle : req.body.talle,
            id_color : req.body.color,
            cantidad: req.body.cantidad
                })}
            })
            .then(function(){console.log(req.session.usuario.id, req.body);;
             res.render('users/carrito')
                })