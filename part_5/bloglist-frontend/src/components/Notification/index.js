import React from 'react'
import './Notification.css'
import PropTypes from 'prop-types'

function Notification ({message, className}) {
  if (message === null) {
    return null
  }

  const classNotif = `notification ${className}`

  return (
    <div className={classNotif}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string
}

export default Notification