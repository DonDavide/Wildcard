module.exports = function(sequelize, dataTypes){
    let alias = "Producto_color";

    let cols = {
        //configuracion de las columnas
        id : {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_color : {
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
            tableName :"producto_color",
            timestamps: false
    }


    let Producto_color = sequelize.define(alias, cols, config);
//explico relacion de tablas
    Producto_color.associate = function(models){

        Producto_color.belongsTo(models.Colores, {
            as: "color",
            foreignKey :"id_color"
        });
        Producto_color.belongsTo(models.Productos, {
            as: "producto",
            foreignKey :"id_producto"
        });
    }
    return Producto_color;
}

