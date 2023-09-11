const axios =require("axios")
const {Pokemon, Type} = require('../db')

const getPokemonById = async (id) => {
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map(e=> {return {name: e.type.name}})
    }
        return pokemon
}

const getDbId = async (id) => {
    const db = await Pokemon.findByPk(id, {
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return db;
}

module.exports = {
    getPokemonById,
    getDbId,
}