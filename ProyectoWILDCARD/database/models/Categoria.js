module.exports = (sequelize, DataTypes) => {

    let alias = 'Categorias';
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
        tableName: 'categorias',
        timestamps: false
    }

    const Categorias = sequelize.define(alias, cols, config);
    Categorias.associate = function(modelos){
        Categorias.hasMany(modelos.Productos, {
            as: "productos",
            foreignKey: "id_categoria",
            timestamps: false
        });
    } 
    return Categorias;
}