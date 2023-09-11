import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getPokemonById, resetDetail} from '../../redux/actions'
import { Link } from 'react-router-dom'
import style from './Detail.module.css'

const Detail = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const pokemonData = useSelector(state => state.pokemonDetail)

  useEffect(() => {
    dispatch(getPokemonById(id))
  },[])
  
  const handleBack = () => {
    dispatch(resetDetail())
  }
  
  return (
    <div className={style.detailContainer}>

            <div className={style.detailContent}>
              <div>
                <Link  className={style.back} onClick={handleBack} to='/home'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="56" height="56" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6f32be" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 14l-4 -4l4 -4" />
                    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                  </svg>
                </Link>
              </div>
              <div className={style.image}>
                <img src={pokemonData.image} alt="" />
              </div>

              <div className={style.datos}>
                <div>
                    <h1 className={style.name}>{pokemonData.name}</h1>
                </div>
                <div className={style.stats}>
                    <h3>Hp: </h3>
                    <span>{pokemonData.hp}</span>
                    <h3>Attack: </h3>
                    <span>{pokemonData.attack}</span>
                    <h3>Defense: </h3>
                    <span>{pokemonData.defense}</span>
                    <h3>Speed: </h3>
                    <span>{pokemonData.speed}</span>
                    <h3>Height: </h3>
                    <span>{pokemonData.height}</span>
                    <h3>Weight: </h3>
                    <span>{pokemonData.weight}</span>
                </div>
                <div>
                    <h3>Types: </h3>
                    {pokemonData.types?.map(e=> {
                      return (
                        <p className={style[e.name]}>{e.name}</p>
                      )
                      })}
                </div>
              </div>

            </div>
    </div>
  )
}

export default Detail