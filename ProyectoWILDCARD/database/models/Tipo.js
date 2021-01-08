module.exports = (sequelize, DataTypes) => {

    let alias = 'Tipos';
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
        tableName: 'tipos',
        timestamps: false
    }

    const Tipos = sequelize.define(alias, cols, config);
    Tipos.associate = function(modelos){
        Tipos.hasMany(modelos.Productos, {
            as: "productos",
            foreignKey: "id_tipo",
            timestamps: false
        });
    } 
    return Tipos;
}