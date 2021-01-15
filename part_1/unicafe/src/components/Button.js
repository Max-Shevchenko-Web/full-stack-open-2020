import React from 'react'

const Button = ({onClick, text}) => {
  return (
    <button
      style={{marginRight: '5px'}}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
