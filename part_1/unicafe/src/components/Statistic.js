import React from 'react'

const Statistic = ({text, value}) => {
  const styles = {
    paddingRight: '5px'
  }

  return (
    <div style={{display: 'flex'}}>
      <p style={styles}>{text}</p>
      <p>{value}</p>
    </div>
  )
}

export default Statistic
