import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs/Blogs'
import Blog from './components/Blogs/Blog/Blog'
import Users from './components/Users/index';
import User from './components/Users/User/index';
import Notification from './components/Notification/index';
import LoginForm from './components/LoginForm/LoginForm';
import Navigation from './components/Navigation/index';
import { initializeBlogs } from './redux/blogReducer'
import { loggedUserFromLocalStorage } from './redux/loginReducer'
import { initializeUsers } from './redux/usersReducer'
import { Switch, Route } from "react-router-dom"


import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loggedUserFromLocalStorage())
  }, [dispatch])

  if( user !== null ) {
    return (
      <div className="container">

        <Navigation user={user}/>

        <Notification />

        <Switch>
        <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/" exact>
            <Blogs user = {user} />
          </Route>
          <Route path="/users/:id">
            <User/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
        </Switch>

      </div>
    )
  }

  return ( <LoginForm /> )
}

export default App