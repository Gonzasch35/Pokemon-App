const axios =require("axios")
const {Pokemon, Type} = require('../db')

/* const getPokemonByName = async (name) => {
    const pokeDb =  await Pokemon.findAll({where: { name },
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
            })
        if(!pokeDb) throw Error('Pokemon not found')

        return pokeDb
}  */



const getPokemonByName = async (name) => {
    try {
        
        const pokeDb =  await Pokemon.findAll({where: { name: name.toLowerCase() },
            include:{
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
    })
    if (pokeDb.length) {
        return pokeDb[0]
    } else {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                
        if(!data) throw Error('Pokemon not found')
            
        const pokemonApi = {
                id: data.id,
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map(e=>{return {name: e.type.name}})
            }
            return pokemonApi;
    } 
    } catch (error) {
        throw Error('Pokemon not found')
    }

}

module.exports = getPokemonByName
/*     getPokemonsApiByName */

