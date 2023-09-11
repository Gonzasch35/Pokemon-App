import React from 'react'
import Card from '../Card/Card'
import style from './CardsContainer.module.css'

const CardsContainer = ({pokemons, setEditPokemon, setNewPokemon, currentPage, setCurrentPage}) => {


  return (
      <div className={style.mainContainer}>

          <>
            {pokemons.length ? pokemons.map(poke => {
            return <Card
                    poke={poke}
/*                 key={poke.id}
                id={poke.id}
                image={poke.image}
                name={poke.name}
                attack={poke.attack}
                types={poke.types} */
                setEditPokemon={setEditPokemon}
                setNewPokemon={setNewPokemon}
                />
              }): setCurrentPage(currentPage - 1)}
            </>


      </div>

  )
}

export default CardsContainer

