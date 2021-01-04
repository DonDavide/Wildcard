module.exports = function(sequelize, dataTypes){
    let alias = "Producto_imagen";

    let cols = {
        //configuracion de las columnas
        id : {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_imagen : {
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
            tableName :"producto_imagen",
            timestamps: false
    }


    let Producto_imagen = sequelize.define(alias, cols, config);
//explico relacion de tablas
    Producto_imagen.associate = function(models){

        Producto_imagen.belongsTo(models.Imagenes, {
            as: "imagen",
            foreignKey :"id_imagen"
        });
        Producto_imagen.belongsTo(models.Productos, {
            as: "producto",
            foreignKey :"id_producto"
        });
    }
    return Producto_imagen;
}

