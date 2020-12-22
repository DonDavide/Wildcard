module.exports = (sequelize, DataTypes) => {
    
    let alias = 'Colores';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
        },
        hex: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
    let config = {
        tableName: 'colores',
        timestamps: false
}

    const Colores = sequelize.define(alias, cols, config);
    Colores.associate = function(modelos){
        Colores.belongsToMany(modelos.Productos, {
            as: "productos",
            through: "producto_color",
            foreignKey: "id_color",
            otherKey: "id_producto",
            timestamps: false
        });
    } 
    return Colores;
}