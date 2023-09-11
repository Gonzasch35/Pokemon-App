const axios = require('axios')
const {Pokemon, Type} = require('../db')

const getPokemonsApi = async () => {
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?&limit=60')
    const {results} = data
    const dataMap = results.map(dat => dat.url)
    const responses = await Promise.all(dataMap?.map(url => axios.get(url)))
    const allPokemons = responses.map(response => {
        const {data} = response
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
            types: data.types?.map(e=> {return {name: e.type.name}})
    }
    return pokemon
    })
    if(!allPokemons)throw Error('No se encontraron pokemons')
    return allPokemons
}

const getPokemonsDb = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}
const getAllPokemons = async () => {
    const apiInfo = await getPokemonsApi()
    const dbInfo = await getPokemonsDb()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

module.exports = {
    getAllPokemons,    
}