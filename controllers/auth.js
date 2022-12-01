// Module
const jwt = require('jsonwebtoken')
const DB = require('../db.config')

exports.login = async (req, res) => {
    const { email, password } = req.body

    // Test si ok
    if(!email || !password){
        return res.status(400).json({message : 'Bad request data'})
    }

    try{
        let user = await DB.User.findOne({ where: {email: email}, attributes: ['id', 'firstName', 'lastName', 'email', 'password']})
        if(user === null){
            return res.status(401).json({message: "This account does not exists !"})
        }

        let test = await DB.User.checkPassword(password, user.password)
        if(!test){
            return res.status(401).json({message: "Wrong password"})
        }

        const token = jwt.sign({
            id: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})

        return res.json({access_token: token})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Internal server error'})
    }
}