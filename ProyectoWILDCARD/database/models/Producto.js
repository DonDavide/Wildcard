module.exports = (sequelize, DataTypes) => {

    let alias = 'Productos';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
        },
        precio: {
            type: DataTypes.INTEGER
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipo: {
            type: DataTypes.STRING,
        },
        categoria: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        usuario: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    };
    let config = {
        tableName: 'productos',
    }

    const Productos = sequelize.define(alias, cols, config);
    Productos.associate = function(modelos){
        Productos.belongsToMany(modelos.Carritos, {
            as: "carritos",
            through: "carrito_producto",
            foreignKey: "id_producto",
            otherKey: "id_carrito",
            timestamps: false
        });
        Productos.belongsToMany(modelos.Colores, {
            as: "colores",
            through: "producto_color",
            foreignKey: "id_producto",
            otherKey: "id_color",
            timestamps: false
        });
        Productos.belongsToMany(modelos.Talles, {
            as: "talles",
            through: "producto_talle",
            foreignKey: "id_producto",
            otherKey: "id_talle",
            timestamps: false
        });
        Productos.belongsTo(modelos.Marcas, {
            as: "marcas",
            foreignKey: "id_marca",
            timestamps: false
        });
        Productos.hasMany(modelos.Imagenes, {
            as: "imagenes",
            foreignKey: "id_producto",
            timestamps: false
        });    
    } 
    return Productos;
}