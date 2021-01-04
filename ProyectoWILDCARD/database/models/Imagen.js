module.exports = (sequelize, DataTypes) => {

    let alias = 'Imagenes';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
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
        Imagenes.belongsTo(modelos.Productos, {
            as: "productos",
            foreignKey: "id_producto",
            timestamps: false
        });
    } 
    return Imagenes;
}