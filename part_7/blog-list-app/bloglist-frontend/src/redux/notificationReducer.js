const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {message: action.message, className: action.className}
      case 'DELETE_NOTIFICATION':
        return null
    default:
      return state
  }
}

let timer
export const addNotification = (content, messageClass, time) => {
  return dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      message: content,
      className: messageClass
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
  }
}

export default notificationReducer