import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify';
import Recommend from './components/Recommend';

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const getToken =  localStorage.getItem('phonenumbers-user-token', token)
    if (getToken) {
      setToken(getToken)
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const isLogged = () => {
    if (!token) {
      return (
        <button onClick={() => setPage('login')}>login</button>
      )
    }

    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {isLogged()}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      {page === 'recommend' ? <Recommend token={!!token} /> : null}

      <LoginForm
      show={page === 'login'}
      setToken={setToken}
      setError={notify}
      onClick={() => setPage('books')}
      />

    </div>
  )
}

export default App