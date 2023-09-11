const {getPokemonById, getDbId} = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const {getAllPokemons} = require('../controllers/getPokemons')

const {Pokemon} = require('../db')



// -----------HANDLER PARA BORRAR UN POKEMON CREADO-----------
const deletePokemonHandler = async (req,res) => {
    try {
        const {id} = req.params
        await Pokemon.destroy({where: {id}})
        res.status(200).json(await getAllPokemons())
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// -----------HANDLER PARA EDITAR UN POKEMON CREADO-----------
const putPokemonHandler = async (req, res) => {
    try {
        const {id} = req.params
        const {name, image, hp, attack, defense, speed, height, weight, types} = req.body
        const pokemon = await Pokemon.findOne({where:{id}})
        const pokemonName = await Pokemon.findOne({where:{name}})
        if(pokemonName.name !== pokemon.name) throw Error('Ya existe un pokemon con ese nombre')
        if(!pokemon) throw Error('Pokemon no encontrado')
        await pokemon.update({
            name: name || pokemon.name,
            image: image || pokemon.image,
            hp: hp || pokemon.hp,
            attack: attack || pokemon.attack,
            defense: defense || pokemon.defense,
            speed: speed || pokemon.speed,
            heigth: height || pokemon.height,
            weight: weight || pokemon.weight,
        })
        if(!types) throw Error('No hay types')
        await pokemon.setTypes(types)
        res.status(200).json('Pokemon actualizado correctamente')
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// -----------HANDLER PARA TRAER UN POKEMON POR NOMBRE O TRAER TODOS LOS POKEMONS-----------
const getPokemonsHandler = async (req, res) => {
    try {
        const {name} = req.query
        const results = name ? await getPokemonByName(name) : await getAllPokemons() //SI NO LLEGA UN NAME POR QUERY TRAE TODOS LOS POKEMONS SINO TRAE SOLO UNO
        results && res.status(200).json(results)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// -----------HANDLER PARA TRAER UN POKEMON POR ID PARA MOSTRARLO EN EL DETAIL-----------
const getPokemonHandler = async (req, res) => {
    try {
        const { id } = req.params
        const pokemon = isNaN(id) ? await getDbId(id) : await getPokemonById(id) //SI EL ID NO ES UN NUMERO LO TRAE DE LA DB Y SINO LO TRAE DE LA API
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

// -----------HANDLER PARA CREAR UN NUEVO POKEMON-----------
const createPokemonHandler = async (req, res) => {
    try {
        const {name, image, hp, attack, defense, speed, height, weight, types} = req.body
        const [pokemon, created] = await Pokemon.findOrCreate(
            {where:{name}, 
            defaults:
            {   name: name.toLowerCase(),
                image,
                hp,
                attack, 
                defense,
                speed,
                height,
                weight }})
        if(!created) throw Error(`El pokemon ${pokemon.name} ya existe!`)

        await pokemon.addTypes(types)
        res.status(200).json('Pokemón creado')
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    getPokemonHandler,
    getPokemonsHandler,
    createPokemonHandler,
    deletePokemonHandler,
    putPokemonHandler,
} 


const getActivities = async (req, res) => {
    try {
        const {name} = req.query
        const results = name ? await getActivityByName(name) : await Activity.findAll({
            include: [
    {
      model: Store,
      attributes: ['name'],
      through: {
        attributes: []
      }
    },
    {
      model: Reservation,
      include: [
        {
          model: User
        }
      ]
    },
    {
      model: Review,
      include: [
        {
          model: User
        }
      ]
    }
  ]
        }) 
        results && res.status(200).json(results)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}