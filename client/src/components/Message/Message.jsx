import React from 'react'
import style from './Message.module.css'

const Message = ({children, tipo}) => {
  return (
    <div className={style[tipo]}>{children}</div>
  )
}

export default Message
