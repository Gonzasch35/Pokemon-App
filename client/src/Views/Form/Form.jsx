import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import style from './Form.module.css'
import {validation} from './validation'
import Message from '../../components/Message/Message'
import { useNavigate } from 'react-router-dom'

const Form = ({message, setMessage, newPokemon, setNewPokemon, editPokemon, setEditPokemon}) => {

  const types = useSelector(state => state.allTypes)

  //ESTADO PARA MANEJAR SI LAS TYPES ESTAN ELEGIDAD O NO EN EL FORMULARIO
  const [isType, setIsType] = useState({
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(actions.getTypes())
    setMessage('')
  },[])
  
  const [errors, setErrors] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    types: '',
  })

  const handlerChange = (e) => {
    const property = e.target.name
    const value = e.target.value
    setNewPokemon({...newPokemon, [property]: value})

    validation(property, value, errors, setErrors)
  }

  const handlerTypes = (e) => {
    const property = e.target.name
    if(!newPokemon.types.includes(e.target.value)) {
      setNewPokemon({...newPokemon, types: [...newPokemon.types, e.target.value]})
    } else {
      const allTypes = newPokemon.types
      const filterTypes = allTypes.filter(type => type !== e.target.name)
      setNewPokemon({...newPokemon, types: filterTypes})
    }
    if (isType[property]) {
      setIsType({...isType, [property]: false})
    } else {
      setIsType({...isType, [property]: true})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newPokemon.name || !newPokemon.image || newPokemon.hp === 0 || newPokemon.attack === 0 || newPokemon.defense === 0 || !newPokemon.types.length) {
      setMessage('Completa todos los campos')
      setTimeout(() => {
        setMessage('')
      }, 3000);
    } else if((!errors.name && !errors.hp && !errors.attack && !errors.defense) && Object.keys(editPokemon).length > 0){
      try {
        await axios.put(`https://pokemon-app-production-636a.up.railway.app/pokemons/${newPokemon.id}`, newPokemon)
        alert('Pokemon editado')
        setEditPokemon({})
        setNewPokemon({name: '', image:'', hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, types: []})
        navigate('/home')
        setMessage('')
      } catch (error) {
        setMessage(error.response.data)
      }
    } else if((!errors.name && !errors.hp && !errors.attack && !errors.defense && !errors.types) && !editPokemon.length){
      try {
        await axios.post('https://pokemon-app-production-636a.up.railway.app/pokemons', newPokemon)
        alert('Pokemon creado')
        setNewPokemon({name: '', image:'', hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, types: []})
        setEditPokemon({})
        navigate('/home')
        setMessage('')
    } catch (error) {
        setMessage(error.response.data)
    }
    } else {
      setMessage('Hay errores en uno o más campos')
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className={style.formContainer}>
            <h2>{Object.keys(editPokemon).length > 0 ? 'Edit Pokemón' : 'Create a New Pokemón'}</h2>
              {message && <Message tipo='error'>{message}</Message>}
              <div className={style.formDiv}>

                  <div className={style.label_input}>
                    <label htmlFor="">*Name: </label>
                    <input 
                      type="text"
                      name='name' 
                      value={newPokemon.name}
                      onChange={handlerChange}
                    />
                    {errors.name && <h6 className={style.errors}>{errors.name}</h6>}
                  </div>
                  <div className={style.label_input}>
                    <label htmlFor="">*Image: </label>
                    <input
                      type="url"
                      name='image'
                      value={newPokemon.image}
                      onChange={handlerChange} 
                    />
                  </div>

              </div>

              <div className={style.formDiv}>

                  <div className={style.label_input}>
                    <label htmlFor="">*Hp: </label>
                    <input
                      type="number"
                      name='hp'
                      value={newPokemon.hp}
                      onChange={handlerChange} 
                    />
                    {errors.hp && <h6 className={style.errors}>{errors.hp}</h6>}
                  </div>
                  <div className={style.label_input}>
                    <label htmlFor="">*Attack: </label>
                    <input
                      type="number"
                      name='attack'
                      value={newPokemon.attack}
                      onChange={handlerChange} 
                    />
                    {errors.attack && <h6 className={style.errors}>{errors.attack}</h6>}
                  </div>
              </div>

              <div className={style.formDiv}>

                  <div className={style.label_input}>
                    <label htmlFor="">*Defense: </label>
                    <input
                      type="number"
                      name='defense'
                      value={newPokemon.defense}
                      onChange={handlerChange}
                    />
                    {errors.defense && <h6 className={style.errors}>{errors.defense}</h6>}
                  </div>
                  <div className={style.label_input}>
                    <label htmlFor="">Speed: </label>
                    <input 
                      type="number"
                      name='speed'
                      value={newPokemon.speed}
                      onChange={handlerChange} 
                    />
                  </div>

              </div>

              <div className={style.formDiv}>

                  <div className={style.label_input}>
                    <label htmlFor="">Height: </label>
                    <input 
                      type="number"
                      name='height'
                      value={newPokemon.height}
                      onChange={handlerChange}
                    />
                  </div>
                  <div className={style.label_input}>
                    <label htmlFor="">Weight: </label>
                    <input 
                      type="number"
                      name='weight'
                      value={newPokemon.weight}
                      onChange={handlerChange}
                    />
                  </div>

              </div>
              <div className={style.typesContainer}>
                {types.map(type => (
                  isType[type.name] ? (
                  <button
                    className={style[type.name]}
                    onClick={e => handlerTypes(e)}
                    value={type.name}
                    key={type.id}
                    name={type.name}
                    type='button'>{type.name}
                  </button>
                  ) : (                  
                  <button
                    className={style.button_type}
                    onClick={e => handlerTypes(e)}
                    value={type.name}
                    key={type.id}
                    name={type.name}
                    type='button'>{type.name}
                  </button>)
                  ))}
                  {errors.types && <h6 className={style.errors}>{errors.types}</h6>}
              </div>

              <div className={style.submit_button}>
                <input
                  type='submit'
                  value={Object.keys(editPokemon).length > 0 ? 'Edit Pokemón' : 'Create Pokemón'}
                />
              </div>

          </div>
        </form>
    </div>
  )
}

export default Form