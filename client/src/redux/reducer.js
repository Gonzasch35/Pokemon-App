import {GET_POKEMONS,
        GET_POKEMON_BY_ID, 
        GET_POKEMON_BY_NAME, 
        GET_POKEMONS_BY_TYPE, 
        ORDER_NAME,
        ORDER_ATTACK,
        GET_API_OR_DB,
        GET_TYPES,
        DELETE_POKEMON,
        ADD_FAVORITE,
        REMOVE_FAVORITE} from "./actions"

let initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: {},
    allTypes: [],
    favorites: [],
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload, pokemons: action.payload}
        case GET_POKEMON_BY_ID:
            return{...state, pokemonDetail: action.payload}
        case 'RESET_DETAIL':
            return {...state, pokemonDetail: {}}
        case GET_POKEMON_BY_NAME:
            return{... state, allPokemons: [action.payload]}
        case GET_POKEMONS_BY_TYPE:
            const pokemons = state.pokemons
            const pokemonsFilter = action.payload === 'all' ? pokemons : pokemons.filter(pokemon => {
                return pokemon.types.some((type) => type.name === action.payload)
            })
            return {
                ...state, allPokemons: pokemonsFilter
            }
        case ORDER_NAME:
            let orderName = action.payload === "name_asc" ?
                state.allPokemons.sort((prev, next) => {
                    if(prev.name > next.name) return -1;
                    if(prev.name < next.name) return 1;
                    return 0;
                }) :
                state.allPokemons.sort((prev, next) => {
                    if(prev.name > next.name) return 1;
                    if(prev.name < next.name) return -1;
                    return 0;
                })
            return {
                ...state,
                allPokemons: orderName
            }
            case ORDER_ATTACK:
                let orderAttack = action.payload === "attack_desc" ?
                    state.allPokemons.sort((prev, next) => {
                        if(prev.attack > next.attack) return -1;
                        if(prev.attack < next.attack) return 1;
                        return 0;
                    }) :
                    state.allPokemons.sort((prev, next) => {
                        if(prev.attack > next.attack) return 1;
                        if(prev.attack < next.attack) return -1;
                        return 0;
                    })
                return {
                    ...state,
                    allPokemons: orderAttack
                }
        case GET_API_OR_DB:
            let allPokemons = state.pokemons
            const prop = 'created'
            let apiOrCreated = action.payload === 'api' ?
                allPokemons.filter(poke => !(prop in poke)) :
                allPokemons.filter(poke => 
                poke.created === true)
            return {
                ...state,
                allPokemons: apiOrCreated,
            }
        case GET_TYPES:
            return{... state, allTypes: action.payload}
        case DELETE_POKEMON: 
            return{...state, allPokemons: action.payload}

        case ADD_FAVORITE:
            const favorite = state.pokemons.find(poke => poke.id === action.payload)
            return {...state, favorites: [...state.favorites, favorite]}

        case REMOVE_FAVORITE:
            const removeFavorite = state.favorites.filter(poke => poke.id !== action.payload)
            return {...state, favorites: removeFavorite}

        default:
            return{
                ...state,
            }
    }
}

export default rootReducer
