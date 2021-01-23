import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import { deleteBlog, updateBlogLikes } from './../../../redux/blogReducer';
import { addNotification } from 'redux/notificationReducer';
import Comments from 'components/Comments/Comments'
import { Row, Col, Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.allBlogs)
  const id = useParams().id
  const blogToShow = blogs.find(blog => blog.id === id)

  const updateBlogLike = async (id) => {
    dispatch(updateBlogLikes(id, blogs))
    dispatch(addNotification(`You  like blog`, 'info' , 3))
  }

  const removeBlog = async (id) => {
    const result = window.confirm("Delete this blog?")
    if (!result) {
      return
    }
    dispatch(deleteBlog(id))
  }

  if (!blogToShow) {
    return null
  }

  return(
    <div>
      <h3>{blogToShow.title}</h3>
      <Row>
        <Col>
          {blogToShow.likes} likes
          <Button style={{marginLeft: '5px'}}variant="outline-primary" onClick={() => updateBlogLike(blogToShow.id)}>like</Button>
        </Col>
      </Row>
      <Button variant="outline-danger" style={{marginTop: '5px'}} onClick={() => removeBlog(blogToShow.id)}>delete blog</Button>
      {blogToShow.user
        ? <b style={{margin: '5px 0', display: 'block'}}>added by {blogToShow.user.username}</b>
        : <p>author unknown</p>
      }
      <Comments blog={blogToShow}/>
    </div>
  )
}

export default Blog