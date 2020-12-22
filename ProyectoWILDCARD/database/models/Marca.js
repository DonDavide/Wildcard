module.exports = (sequelize, DataTypes) => {

    let alias = 'Marcas';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
        }
    };
    let config = {
        tableName: 'marcas',
        timestamps: false
    }

    const Marcas = sequelize.define(alias, cols, config);
    Marcas.associate = function(modelos){
        Marcas.belongsToMany(modelos.Productos, {
            as: "productos",
            through: "producto_marca",
            foreignKey: "id_marca",
            otherKey: "id_producto",
            timestamps: false
        });
    } 
    return Marcas;
}