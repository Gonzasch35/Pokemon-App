import './App.css'
import {Detail, Form, Home, Landing} from './Views'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import About from './Views/About/About'
import Favorites from './components/Favorites/Favorites'
import { useState } from 'react'
import ErrorPage from './Views/ErrorPage/ErrorPage'

function App() {
  
  const location = useLocation()
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [orderName, setOrderName] = useState('')
  const [orderAttack, setOrderAttack] = useState('')
  //ESTADO A EDITAR
  const [editPokemon, setEditPokemon] = useState({})
  //ESTADO DEL FORM
  const [newPokemon, setNewPokemon] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
      })

  return (
    <div>
        {/* RENDERIZO EL NAV SOLO EN LAS RUTAS QUE SE DECLARAN ABAJO */}

       {(location.pathname === '/home' || location.pathname === '/create' || location.pathname === '/detail*' || location.pathname === '/about' || location.pathname === '/favorites')  && <NavBar />}
      <Routes>

        <Route exact path='/' element={<Landing />} />

        <Route 
        path='/home'
        element={<Home
                setEditPokemon={setEditPokemon}
                setNewPokemon={setNewPokemon} 
                setType={setType}
                type={type}
                orderName={orderName}
                orderAttack={orderAttack}
                setOrderName={setOrderName}
                setOrderAttack={setOrderAttack}
                />}/>

        <Route path='/create' element={<Form
                                        message={message}
                                        setMessage={setMessage}
                                        newPokemon={newPokemon}
                                        setNewPokemon={setNewPokemon}
                                        editPokemon={editPokemon}
                                        setEditPokemon={setEditPokemon} />} />

        <Route path='/detail/:id' element={<Detail />} />

        <Route path='/about' element={<About />} />

        <Route path='/favorites' element={<Favorites />}/>

        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </div>
  )
}

export default App
