import React, {useState, useEffect} from 'react'
import style from './Card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deletePokemon, addFavorite, removeFavorite} from '../../redux/actions'

const Card = ({poke, setEditPokemon, setNewPokemon}) => {

  const {key, id, image, name, types} = poke
  const pokemonEdit = {...poke, types: types.map(e=>e.name)}

  const favorites = useSelector(state => state.favorites)
  const [isFav, setIsFav] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
          favorites.forEach((fav) => {
             if (fav.id === id) {
                setIsFav(true);
             }
          });

          // eslint-disable-next-line
       }, [favorites]);


  const onClose = (id) => {
    dispatch(deletePokemon(id))
  }

  const handleFavorite = () => {
    if(isFav) {
      setIsFav(false)
      dispatch(removeFavorite(id))
    } else {
      setIsFav(true)
      dispatch(addFavorite(id))
    }
  }

  const handlerEditar = () => {
    setEditPokemon(pokemonEdit)
    setNewPokemon({...pokemonEdit, types: []})
  }
  
  return (
    <div key={key} className={style.cardContainer}>
        <h3 className={style.name}>{name}</h3>
        {
            isFav ? (
            <button className={style.favorite} onClick={e => handleFavorite(e)}>❤️</button>
            ) : (
            <button className={style.favorite} onClick={e => handleFavorite(e)}>🤍</button>
               )
            }

        <img className={style.image} src={image} alt="img" />

        <div className={style.types}>
            {types ? types.map(e => {
            return <h5 className={style[e.name]}>{e.name}</h5>
          }) : <h5>no hay types</h5>}

          {isNaN(id) && <button onClick={() => onClose(id)} className={style.on_closed}>X</button>}
        </div>
        <div className={style.buttons_container}>
          <button className={style.button}><Link to={`/detail/${id}`} className={style.link}>Ver Detalles</Link></button>
          {isNaN(id) && <Link to='/create' onClick={() => handlerEditar(id)}  className={style.button}>Editar</Link>}
        </div>

    </div>
  )
}

export default Card