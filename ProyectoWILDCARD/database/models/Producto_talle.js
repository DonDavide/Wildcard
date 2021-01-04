
module.exports = function(sequelize, dataTypes){
    let alias = "Producto_talle";

    let cols = {
        //configuracion de las columnas
        id : {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_talle : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_producto : {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }
    //configuracion de nombre de tabla
    let config = { 
            tableName :"producto_talle",
            timestamps: false
    }


    let Producto_talle = sequelize.define(alias, cols, config);
//explico relacion de tablas
    Producto_talle.associate = function(models){

        Producto_talle.belongsTo(models.Talles, {
            as: "talle",
            foreignKey :"id_talle"
        });
        Producto_talle.belongsTo(models.Productos, {
            as: "producto",
            foreignKey :"id_producto"
        });
    }
    return Producto_talle;
}

