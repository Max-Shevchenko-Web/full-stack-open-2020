import React from 'react'
import { useField } from 'hooks/index';
import { useDispatch } from 'react-redux';
import { createNewComment } from 'redux/blogReducer';

const Comments = ({blog}) => {
  const dispatch = useDispatch()
  const comments = blog.comments
  const commentContent = useField('text', 'newComment', 'newComment')

  const CreateNewComment = async (event)=> {
    event.preventDefault()
    dispatch(createNewComment(blog.id, commentContent.input.value))
    commentContent.reset()
  }

  return (
    <div>
      <h3 style={{paddingTop:'10px'}}>Comments</h3>
      <form onSubmit={CreateNewComment}>
        <input {...commentContent.input}/>
        <button>create new comment</button>
      </form>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default Comments
