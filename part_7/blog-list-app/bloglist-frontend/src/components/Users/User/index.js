import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const User = () => {
  const allUsers = useSelector(state => state.users)
  const id = useParams().id
  const userToShow = allUsers && allUsers.find(user => user.id === id)

  const addedBlogs = () => (
    <div>
      <h3>{userToShow.name}</h3>
      <h4>added blogs</h4>
      <ul>
        { userToShow.blogs.map(blog =>
            <li key={blog.id}><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )

  return (
    <>
    { userToShow
      ? userToShow.blogs.length < 1
              ? <p>user has not added any blogs</p>
              :  addedBlogs()
      : <p>...wait for loading</p>
    }
    </>
  )
}

export default User
