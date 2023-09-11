/* const {User} = require('../db')

const getUserByEmail = async (email) => {
    try {
        const userFound = await User.findAll({where: {email}})
        if(!userFound) throw Error('User not found!')
        if(!userFound.confirm) throw Error(`User isn't confirmed!`)
        return userFound
    } catch (error) {
        throw Error(error)
    }
}

module.exports = getUserByEmail */