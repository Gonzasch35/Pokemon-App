import React, { useState } from 'react'
import style from './Loading.module.css'

const Loading = () => {

    const [circle, setCircle] = useState(false)

    const handlerClick = (e) => {
        if(circle) {
            setCircle(false)
        } else setCircle(true)
    }

  return (
    <div className={style.container}>
        <div className={style.cubo}>
            <span></span>
        </div>
    </div>
  )
}

export default Loading