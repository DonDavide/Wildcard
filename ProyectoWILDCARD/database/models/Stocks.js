
module.exports = function(sequelize, dataTypes){
    let alias = "Stocks";

    let cols = {
        //configuracion de las columnas
        id : {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_talle : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_color : {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        stock : {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }
    //configuracion de nombre de tabla
    let config = { 
            tableName :"stocks",
            timestamps: false
    }


    let Stocks = sequelize.define(alias, cols, config);
//explico relacion de tablas
    Stocks.associate = function(models){

        Stocks.belongsTo(models.Productos, {
            as: "producto",
            foreignKey :"id_producto"
        });
        Stocks.belongsTo(models.Talles, {
            as: "talle",
            foreignKey :"id_talle"
        });
        Stocks.belongsTo(models.Colores, {
            as: "color",
            foreignKey :"id_color"
        });
    }
    return Stocks;
}
