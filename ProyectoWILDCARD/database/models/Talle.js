module.exports = (sequelize, DataTypes) => {

    let alias = 'Talles';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        talle: {
            type: DataTypes.STRING,
        }
    };
    let config = {
        tableName: 'talles',
        timestamps: false
    }

    const Talles = sequelize.define(alias, cols, config);
    Talles.associate = function(modelos){
        Talles.belongsToMany(modelos.Productos, {
            as: "productos",
            through: "producto_talle",
            foreignKey: "id_talle",
            otherKey: "id_producto",
            timestamps: false
        });
    } 
    return Talles;
}