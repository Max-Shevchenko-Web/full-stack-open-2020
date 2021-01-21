import React, {useState} from 'react'

const Blog = ({ blog, handleBlogLike, handlerDeleteBlog }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const checkUser = (userId) => {
    if (!userId) {
      return ''
    }
    return userId
  }

  const updateBlogLikes = {
    user: checkUser,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const blogInfo = () => (
    <div>
      {blog.url}
      <div style={{display: 'flex'}}>
        <span style={{paddingRight: '5px'}} className="blog_likes" >likes: {blog.likes} </span>
        <button onClick={() => handleBlogLike(blog.id, updateBlogLikes)} className="blog_likes_btn">like</button>
      </div>
      {blog.user
        ? <div>{blog.user.name}</div>
        : null
      }
      <button onClick={() => handlerDeleteBlog(blog.id)}>remove</button>
    </div>
  )

  return (
  <div style={blogStyle} className="blog_item">
    <div style={{display: 'flex'}}>
      <div style={{paddingRight: '5px'}} className="blog">
        {blog.title} {blog.author}
      </div>
      {show
        ? <button className="switch_btn" onClick={() => {setShow(false)}}>hide</button>
        : <button  className="switch_btn"onClick={() => {setShow(true)}}>view</button>
      }
    </div>
    {show ? blogInfo()
          : null
    }
  </div>
)}

export default Blog