const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    users: (req, res, next) => {
        db.Usuarios.findAll()
        .then( (result)=>{

            let datos = {
                cantidadUsuarios: result.length
            }
            res.json(datos) 
        })

    },
    productos: (req, res, next) => {
        db.Productos.findAll()
        .then( (result)=>{

            let datos = {
                cantidadProductos: result.length
            }
            res.json(datos)
        })
    },
    productosUltimo: (req, res, next) => {
        db.Productos.findAll({
            order :[['createdAt', 'DESC']],
            limit: 1
        }).then( (result)=>{

            let datos = {
                ultimoProducto: result
            }
            res.json(datos)
        })
    },
    ventas: (req, res, next) => {

        db.Carritos.findAll({where : {
            estado : {[Op.substring]: "cerrado"}
        }}).then( (result)=>{

            let datos = {
                cantidadVentas: result.length
            }
            res.json(datos)
        })
    }
}

module.exports = APIController;