module.exports = (sequelize, DataTypes) => {

    let alias = 'Imagenes';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        }
    };
    let config = {
        tableName: 'imagenes',
        timestamps: false
    }

    const Imagenes = sequelize.define(alias, cols, config);
    Imagenes.associate = function(modelos){
        Imagenes.belongsToMany(modelos.Productos, {
            as: "productos",
            through: "producto_imagen",
            foreignKey: "id_imagen",
            otherKey: "id_producto",
            timestamps: false
        });
    } 
    return Imagenes;
}