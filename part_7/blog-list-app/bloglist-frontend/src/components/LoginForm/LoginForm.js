import React from 'react'
import Notification from './../Notification/index';
import { loginUser } from './../../redux/loginReducer';
import { useDispatch } from 'react-redux';
import { useField } from './../../hooks';
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text', 'username', 'Username')
  const password = useField('password', 'password', 'Password')

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser({username: username.input.value, password: password.input.value}))
    username.reset()
    password.reset()
  }

  return (
    <div className="container" >
      <h2>Log in to applications</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username.input}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...password.input}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
