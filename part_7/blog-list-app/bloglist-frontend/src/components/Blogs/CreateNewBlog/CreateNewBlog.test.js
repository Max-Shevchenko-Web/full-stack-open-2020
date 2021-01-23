import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewBlog from './index'

describe('<CreateNewBlog />', () => {
  test('the form calls the event handler  when a new blog is created', () => {
    const createNote = jest.fn()

    const component = render(
      <CreateNewBlog createNote={createNote} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'Markus' }
    })
    fireEvent.change(title, {
      target: { value: 'Nice food and you health' }
    })
    fireEvent.change(url, {
      target: { value: '//https/olayfoods/blog' }
    })

    fireEvent.submit(form)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0]).toMatchObject({
        "title": 'Nice food and you health',
        "author": 'Markus',
        "url": '//https/olayfoods/blog'
      })
  })
})