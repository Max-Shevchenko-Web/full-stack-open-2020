import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer';

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })

      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(addNotification(`${user.name} Logged in`, 'info', 5))
    } catch (exception) {
      dispatch(addNotification('Wrong username or password', 'error', 5))
    }
  }
}

export const loggedUserFromLocalStorage = () => {
  return async dispatch => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogListappUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default loginReducer