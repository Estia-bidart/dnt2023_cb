// Modules
const { DataTypes } = require('sequelize')

// Modèle user
module.exports = (sequelize) => {
    const Canape = sequelize.define('Canape', {
        id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true},
        user_id: { type: DataTypes.INTEGER(10), allowNull: false},
        name: { type: DataTypes.STRING(100), allowNull: false},
        description: { type: DataTypes.TEXT, allowNull: false},
        altText : { type: DataTypes.STRING},
        image: { type: DataTypes.STRING, allowNull: false},
        colors: { type: DataTypes.STRING, allowNull: false},
        price: { type: DataTypes.INTEGER(4), allowNull: false},
        like: { type: DataTypes.INTEGER(2)},
        dislike: { type: DataTypes.INTEGER(2)},
        usersLiked: { type: DataTypes.STRING, allowNull: false},
        usersDisliked: { type: DataTypes.STRING, allowNull: false},
    })

    // Canape.afterFind((model) => {        
    //     //data.colors = JSON.parse(data.colors)
    //     //model.dataValues.colors = JSON.parse(model.dataValues.colors);
    //     //return data
    // })

    return Canape
}