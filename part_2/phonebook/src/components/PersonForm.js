import React from 'react'

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  onChangeName,
  onChangeNumber
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:&nbsp;
        <input
          value={newName}
          onChange={onChangeName}
        />
      </div>
      <div style={{marginTop: '10px'}}>
        number:&nbsp;
        <input
        value={newNumber}
        onChange={onChangeNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
