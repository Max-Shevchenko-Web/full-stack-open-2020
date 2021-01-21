import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({
    message: null,
    typeOfClassName: ''
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const dispatchNotification = (newNotification) => {
    setNotification(newNotification)
    setTimeout(() => {
      setNotification({message: null, typeOfClassName: ''})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatchNotification({
        message : `${user.name} Logged in`,
        typeOfClassName : 'info'
      })
    } catch (exception) {
      console.log(exception.response.data)
      dispatchNotification({
        // message: JSON.stringify(error.response.data),
        message: 'Wrong username or password',
        typeOfClassName: 'error'
      })
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogListappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to applications</h2>
      <Notification message={notification.message} className={notification.typeOfClassName}/>
      <div>
        username
        &nbsp;
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div style={{marginTop: '5px'}}>
        password
        &nbsp;
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        </div>
        <button type="submit" id="login-button">login</button>
    </form>
  )

  const showBlogs = () => (
    <Blogs
      logoutUser={logoutUser}
      user={user}
    />
  )

  return (
    <div>
      { user === null ?
          loginForm() :
          showBlogs()
      }
    </div>
  )
}

export default App