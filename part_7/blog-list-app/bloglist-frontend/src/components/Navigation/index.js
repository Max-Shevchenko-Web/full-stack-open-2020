import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom"
import {  logoutUser } from 'redux/loginReducer'
import { useDispatch } from 'react-redux';

const Navigation = ({user}) => {
  const dispatch = useDispatch()
  const padding = {
    padding: 5,
    color: 'white'
  }


  const removeUser = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user && <em style={padding}>{user.name} logged in</em> }
        </Nav.Link>
        <Button
          variant="outline-light"
          size="sm"
          onClick={() => removeUser()}
        >
          logout
        </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation