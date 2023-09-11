const {Router} = require('express')
const {
    getPokemonsHandler,
    getPokemonHandler,
    createPokemonHandler,
    putPokemonHandler,
    deletePokemonHandler} = require('../handlers/getPokemonHandler')

const pokemonsRouter = Router()



pokemonsRouter.get('/', getPokemonsHandler)

pokemonsRouter.get('/:id', getPokemonHandler)

pokemonsRouter.post('/', createPokemonHandler)

pokemonsRouter.put('/:id', putPokemonHandler)

pokemonsRouter.delete('/:id', deletePokemonHandler)



module.exports = pokemonsRouter;