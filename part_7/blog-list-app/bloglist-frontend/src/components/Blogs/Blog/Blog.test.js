import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('a blog render with author and title and without url and likes', () => {
    const blog = {
      "title": "Кулинарный блог \"Вкуснейшие блюда мира!\" ",
      "author": "Оля",
      "url": "//https/olayfoods/blog",
      "likes": 25,
      "userId":"5fb6cc840a487a28984c075e"
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      blog.title
    )

    expect(component.container).toHaveTextContent(
      blog.author
    )

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('clicking the button adds to blog likes and URL info', () => {
    const blog = {
      "title": "Кулинарный блог \"Вкуснейшие блюда мира!\" ",
      "author": "Оля",
      "url": "//https/olayfoods/blog",
      "likes": 25,
      "userId":"5fb6cc840a487a28984c075e"
    }

    const component = render(
      <Blog blog={blog} />
    )

    // component.container doesn't have blog.url and blog.likes
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)

    const button = component.container.querySelector('.switch_btn')

    fireEvent.click(button)

    //  after click on button component.container  have blog.url and blog.likes
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)

    fireEvent.click(button)

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const blog = {
      "title": "Кулинарный блог \"Вкуснейшие блюда мира!\" ",
      "author": "Оля",
      "url": "//https/olayfoods/blog",
      "likes": 25,
      "userId":"5fb6cc840a487a28984c075e"
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleBlogLike={mockHandler} />
    )

    const btnOpenInfo = component.container.querySelector('.switch_btn')

    fireEvent.click(btnOpenInfo)

    const button = component.container.querySelector('.blog_likes_btn')

    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
