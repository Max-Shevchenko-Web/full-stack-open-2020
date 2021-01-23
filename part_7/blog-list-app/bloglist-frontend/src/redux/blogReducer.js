import blogService from 'services/blogs'
import { addNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'UPDATE_BLOG`S_LIKES':
      let id = action.data.id
      const updatedBlog = action.data.updatedBlog
      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog
      )
    case 'ADD_COMMENT_TO_BLOG':
      const addedComment = action.data.content
      return state.map(blog =>
        blog.id !== action.data.id
            ? blog
            : {...blog, comments: blog.comments.concat(addedComment)}
      )
    default:
      return state
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(addNotification(`a new blog ${newBlog.title} by ${user.name} added`, 'info', 5))
    } catch (exception) {
      if (exception.response.status === 400) {
        dispatch(addNotification('All fields must be filled', 'error', 5))
      }
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        id
      })
      dispatch(addNotification(`You delete a blog`, 'info' , 5))
    } catch (exception) {
      if (exception.response.status === 401) {
        dispatch(addNotification('You are not the author of this blog', 'error' , 5))
      }
    }
  }
}

export const updateBlogLikes = (id, arr ) => {
  return async dispatch => {
    const blogForUpdate = arr.find(a => a.id === id)
    const changedBlog = {...blogForUpdate, likes: blogForUpdate.likes + 1}
    const updatedBlog = await blogService.update(id, changedBlog)
    dispatch({
      type: 'UPDATE_BLOG`S_LIKES',
      data: {id, updatedBlog}
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNewComment = (id, content) => {
  return async dispatch => {
    const newComment = { content }
    const addedComment = await blogService.createComment(id, newComment)
    dispatch({
      type: 'ADD_COMMENT_TO_BLOG',
      data: {
        id,
        content: addedComment
      }
    })
  }
}

export default blogReducer
