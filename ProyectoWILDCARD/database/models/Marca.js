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
        Marcas.hasMany(modelos.Productos, {
            as: "productos",
            foreignKey: "id_marca",
            timestamps: false
        });
    } 
    return Marcas;
}