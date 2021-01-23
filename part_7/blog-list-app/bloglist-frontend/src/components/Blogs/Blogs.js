import React, { useRef }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './../Togglable';
import CreateNewBlog from './CreateNewBlog/index';
import { addNotification } from './../../redux/notificationReducer';
import { createBlog} from './../../redux/blogReducer';
import { Link } from 'react-router-dom'

function Blogs({
  user
}) {
  const dispatch = useDispatch()
  const noteFormRef = useRef()

  const blogs = useSelector(({allBlogs}) => {
    return allBlogs.sort(function (a, b) {
      return b.likes - a.likes;
    });
  })

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog, user))
    noteFormRef.current.toggleVisibility()
  }

  const createNewBlog = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <CreateNewBlog createNote={addBlog} />
    </Togglable>
  )



  return (
    <div>
      <h3>Blogs</h3>
      {createNewBlog()}
      <div>
        {blogs.map(blog =>
          <div key={blog.id} style={{padding: '5px'}} className="blog">
            <Link to={`/blogs/${blog.id}`}> <span style={{paddingRight: '5px'}}>{blog.title}</span>{blog.author}</Link >
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs
