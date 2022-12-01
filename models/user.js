// Modules
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

// Modèle user
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true},
        firstName: { type: DataTypes.STRING(100), allowNull: false},
        lastName: { type: DataTypes.STRING(100), allowNull: false},
        email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true}},
        password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64}$/i},
        role: { type: DataTypes.TINYINT, defaultValue: 0}
    })

    User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT))
        user.password = hash
    })

    User.checkPassword = async (password, original) => {
        console.log(password, original)
        return await bcrypt.compare(password, original)
    }

    return User
}