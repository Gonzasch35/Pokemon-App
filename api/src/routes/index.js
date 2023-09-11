const { Router } = require('express');
const pokemonsRouter = require('./pokemonsRouter')
/* const usersRouter = require('./usersRouter') */
const axios =require("axios")


const {Type} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/pokemons', pokemonsRouter)

/* router.use('/user', usersRouter) */

router.get('/types', async (req, res) => {
    try {
        const {data} = await axios.get('https://pokeapi.co/api/v2/type')
        for (let i = 0; i < data.results.length; i++) {
           await Type.findOrCreate(
            {where: {name: data.results[i].name}}
            )}
        const tipos = await Type.findAll()
        res.status(200).json(tipos)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
