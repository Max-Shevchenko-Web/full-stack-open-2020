import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const users = useSelector(state => state.users)

  const createTable = () => {
    return (
      <Table striped bordered hover  size="sm" style={{width: '50%'}}>
        <thead>
          <tr>
            <td>users</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td style={{ textAlign: 'start'}}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
  return (
    <div>
      <h3>Users</h3>
      {users
        ? createTable()
        : <p>...wait for loading</p>
      }
    </div>
  )
}

export default Users
