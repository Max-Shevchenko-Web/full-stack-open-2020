import React, {useState} from 'react'
import { Button} from 'react-bootstrap'

function CreateNewBlog({createNote}) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      createNote(null)
    }

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
    <form style={{padding: '5px 0'}} onSubmit={createNewBlog}>
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
      <Button variant="outline-primary"  type="submit"  id="create_new_blog_btn">Create</Button>
    </form>
  )
}

export default CreateNewBlog
