import React, {useState} from 'react'

function CreateNewBlog({createNote}) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      "title": title,
      "author": author,
      "url": url,
    }
    createNote(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createNewBlog}>
      <h2>Create new Blog</h2>
      <div>
        title:
        &nbsp;
        <input
          type="text"
          id="title"
          value={title}
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div style={{marginTop: '5px'}}>
        author:
        &nbsp;
        <input
          type="text"
          id="author"
          value={author}
          name="Password"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div style={{marginTop: '5px'}}>
        url:
        &nbsp;
        <input
          type="text"
          id="url"
          value={url}
          name="Username"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" style={{marginTop: '5px'}} id="create_new_blog_btn">Create</button>
    </form>
  )
}

export default CreateNewBlog
