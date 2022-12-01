// Module 
const DB = require('../db.config')

exports.getAllCanape = (req, res) => {
    DB.Canape.findAll()
        .then(canaps => {
            const mappedP = canaps.map(elem => {
                elem.image = `${req.protocol}://${req.get('host')}/images/${elem.image}`
                elem.colors = JSON.parse(elem.colors)
                return elem
            })
            res.json({ data: mappedP })
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }))
}

exports.getCanape = async (req, res) => {
    let canapeId = parseInt(req.params.id)

    // Vérifie le param
    if (!canapeId) {
        return res.status(400).json({ message: "Missing Parameter" })
    }

    try {
        let canape = await DB.Canape.findOne({ where: { id: canapeId } })
        if (canape === null) {
            return res.status(404).json({ message: 'This canape does not exists!' })
        }

        canape.image = `${req.protocol}://${req.get('host')}/images/${canape.image}`
        canape.colors = JSON.parse(canape.colors)

        return res.json({ data: canape })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.addCanape = async (req, res) => {
    const { name, description, altText, colors } = req.body

    // Vérification
    if (!name || !description || !altText || !colors) {
        return res.status(400).json({ message: "Missing Parameter" })
    }

    try {
        // Creation du canape
        await DB.Canape.create({
            user_id: 1,
            name: name,
            description: description,
            altText: altText,
            image: '',
            colors: JSON.stringify([]), // TODO
            like: 0,
            dislike: 0,
            usersLiked: JSON.stringify([]),
            usersDisliked: JSON.stringify([])
        })

        return res.json({ message: "Canape created" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.updateCanape = async (req, res) => {
    let canapeId = parseInt(req.params.id)

    // Vérifie le param
    if (!canapeId) {
        return res.status(400).json({ message: "Missing Parameter" })
    }

    try {
        let canape = await DB.Canape.findOne({where: {id: canapeId}, raw: true})
        if(canape === null){
            return res.status(404).json({message: 'This canape does not exists!'})
        }

        // Mise à jour
        // TODO
        return res.status(418).json({message: "ON TEST"})
    }catch(err){
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.deleteCanape = async (req, res) => { 
    let canapeId = parseInt(req.params.id)
    console.log(req.userid)

    // Vérification
    if(!canapeId){
        return res.status(400).json({message: "Missing Parameter"})
    }

    // Propriété du canape
    let canape = await DB.Canape.findOne({ where: { id: canapeId } })
    if(canape.user_id != req.userid){
        return res.status(403).json({message: "Mais bien sûr"})
    }

    // Suppression utilisateur
    DB.Canape.destroy({where: {id: canapeId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: "Internal Server Error"}))
}

exports.socialeCanape = async (req, res) => {
    let canapeId = parseInt(req.params.id)

    // Vérification
    if(!canapeId){
        return res.status(400).json({message: "Missing Parameter"})
    }

    try {
        let canape = await DB.Canape.findOne({ where: { id: canapeId } })
        if (canape === null) {
            return res.status(404).json({ message: 'This canape does not exists!' })
        }

        switch(req.body.action){
            case '1':
                console.log("LIKE")
                break
            case '-1':
                console.log("DISLIKE")
                break
            case '0':
                console.log('ANNULE')
                break
            default:
                return res.status(400).json({message: `I dont speak English`})
        }

        // TODO
        return res.status(418).json({ message: "ACTION A FAIRE" })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}