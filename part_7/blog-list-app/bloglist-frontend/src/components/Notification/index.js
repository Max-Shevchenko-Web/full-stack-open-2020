import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

function Notification () {
  const notification = useSelector(store => store.notification)
  let variantAlert = ''

  if (notification === null) {
    return null
  }



  if ( notification.className === 'info') {
    variantAlert = 'success'
  } else {
    variantAlert = 'danger'
  }


  // let classNotif = `notification ${notification.className}`

  // return (
  //   <div className={classNotif}>
  //     {notification.message}
  //   </div>
  // )

  return (
    <Alert variant={variantAlert}>
      {notification.message}
    </Alert>
  )
}


export default Notification