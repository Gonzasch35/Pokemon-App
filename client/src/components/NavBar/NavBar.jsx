import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from './logo.png'
import style from './NavBar.module.css'

const NavBar = () => {

  const location = useLocation()

  return (
    <div className={style.navContainer}>
      <div>
        <Link className={style.link_logo} to='/'><img className={style.logo} src={logo} alt="logo" /></Link>
      </div>
      <div className={style.links_container}>
        <Link className={location.pathname === '/home' && style.active} to='/home'>Home</Link>
        <Link className={location.pathname === '/create' && style.active} to='/create'>Create Pokemón</Link>
        <Link className={location.pathname === '/favorites' && style.active} to='/favorites'>Favorites</Link>
        <Link className={location.pathname === '/about' && style.active} to='/about'>About</Link>
        <Link onClick={useLocation('/')}>Actualizar</Link>
      </div>

    </div>
  )
}

export default NavBar