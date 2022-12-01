// Module 
const DB = require('../db.config')

exports.getAllUsers = (req, res) => {
    DB.User.findAll()
        .then(users => res.json({data: users}))
        .catch(err => res.status(500).json({message: "Internal Server Error"}))
}

exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérifie le param
    if(!userId){
        return res.status(400).json({message: "Missing Parameter"})
    }

    try{
        let user = await DB.User.findOne({where: {id:userId}})
        if(user === null){
            return res.status(404).json({message: 'This account does not exists!'})
        }

        return res.json({data: user})
    }catch(err){
        return res.status(500).json({message: "Internal Server Error"})
    }
}

exports.addUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    // Vérification
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({message: "Missing Parameter"})
    }

    try{
        // Creation utilisateur
        await DB.User.create(req.body)

        return res.json({message: "User created"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

exports.deleteUser = (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification
    if(!userId){
        return res.status(400).json({message: "Missing Parameter"})
    }

    // Suppression utilisateur
    DB.User.destroy({where: {id: userId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: "Internal Server Error"}))
}