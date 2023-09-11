import React from 'react'
import style from './ErrorPage.module.css'
import error from './error.png'
import pokeball from './Pokeball.png'

const ErrorPage = () => {
  return (
    <div className={style.error_container}>
        <div className={style.error_image}>
            <img className={style.image} src={error} alt="" />
        </div>
        <div className={style.message}>
            <div className={style.e404}>
                <span className={style.span}>4</span>
                <img  className={style.pokeball} src={pokeball} alt="" />
                <span className={style.span}>4</span>
            </div>
            <h1 className={style.text}>Page not found</h1>
        </div>

    </div>
  )
}

export default ErrorPage