import { useState } from 'react'

export const useField = (type, id, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    input: {
      type,
      id,
      value,
      name,
      onChange
    }
  }
}