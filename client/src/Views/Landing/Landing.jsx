import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.module.css'
import image from '../../fondo.jpg'

const Landing = () => {
  return (
    <div className={style.landingContainer}>
      <h1 className={style.landingTitle}>{/* Bienvenidos a <span className={style.span}>Pueblo Paleta</span> */}</h1>
        <Link  className={style.landingButton} to='/home'>
          <span className={style.span1}></span>
          <span className={style.span2}></span>
          <span className={style.span3}></span>
          <span className={style.span4}></span>
          Inicia la Aventura</Link>
    </div>
    
  )
}

export default Landing