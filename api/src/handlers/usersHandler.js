/* const {User} = require('../db')
const generateId = require('../helpers/generateId')
const getUserByEmail = require('../controllers/getUserByName')

const getUserHandler = async (req, res) => {
    try {
        const {email} = req.query
        const result = email ? await getUserByEmail(email) : await User.findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const postUserHandler = async (req, res) => {
    try {
        const {name, password, email} = req.body
        const token = generateId()
        const [pokemon, created] = await User.findOrCreate({ where : {email},
        defaults: {
            name,
            password,
            email,
            token,
        }})
        if(!created) throw Error('El email ya existe!')
        const user = await User.findOne({where: {email}})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const putUserHandler = async (req, res) => {
    try {
        const {e} = req.params
        const {password} = req.body
        const user = await User.findOne({where: {email: e}})
        if(!user) throw Error('Usuario no encontrado')
        await user.update({
            password: password
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const deleteUserHandler = async (req, res) => {
    try {
        const {e} = req.params
        await User.destroy({where: {email: e}})
        res.status(200).json(User.findAll())
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    getUserHandler,
    postUserHandler,
    putUserHandler,
    deleteUserHandler,
}  */