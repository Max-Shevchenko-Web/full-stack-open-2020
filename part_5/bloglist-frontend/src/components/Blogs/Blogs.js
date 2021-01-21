import React, { useState, useEffect, useRef }  from 'react'
import blogService from './../../services/blogs'
import Togglable from './../Togglable';
import Notification from './../Notification';
import CreateNewBlog from './CreateNewBlog/index';
import Blog from './Blog/Blog';

function Blogs({
  logoutUser,
  user
}) {
  const [blogs, setBlogs] = useState([])
  const noteFormRef = useRef()
  const [notification, setNotification] = useState({
    message: null,
    typeOfClass: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs( blogs )
    })
  }, [])

  const dispatchNotification = (newNotification) => {
    setNotification(newNotification)
    setTimeout(() => {
      setNotification({message: null, typeOfClass: ''})
    }, 5000)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      // close the form after creating a new blog
      noteFormRef.current.toggleVisibility()
      dispatchNotification({
        message: `a new blog ${newBlog.title} by ${user.name} added`,
        typeOfClass: 'info'
      })
    } catch (exception) {
      console.log(exception.response.status)
      if (exception.response.status === 400) {
        dispatchNotification({
          message: 'All fields must be filled',
          typeOfClass: 'error'
        })
      }
    }
  }

  const createNewBlog = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <CreateNewBlog createNote={addBlog} />
    </Togglable>
  )

  const updateBlog = async (id, updateBlogLikes) => {
    const updatedBlog = await blogService.update(id, updateBlogLikes)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const deleteBlog = async (id) => {
    const result = window.confirm("Delete this blog?")
    if (!result) {
      return
    }
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id ))
      dispatchNotification({
        message: `You delete a blog`,
        typeOfClass: 'info'
      })
    } catch (exception) {
      if (exception.response.status === 401) {
        dispatchNotification({
          message: 'You are not the author of this blog',
          typeOfClass: 'error'
        })
      }
    }
  }


  return (
    <div>
      <Notification message={notification.message} className={notification.typeOfClass}/>
      <h2>Blogs</h2>
      <div className="blogs__username">
        <div>{user.name} logged in</div>
        <button onClick={logoutUser}>logout</button>
      </div>
      {createNewBlog()}
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleBlogLike={updateBlog} handlerDeleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default Blogs
