describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'user',
      username: 'User',
      password: 'useruser'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('User')
      cy.get('#password').type('wrong_password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'user logged in')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('User')
      cy.get('#password').type('useruser')
      cy.get('#login-button').click()
      cy.contains('user logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'User', password: 'useruser' })
    })

    // it('A blog can be created', function() {
    //   cy.contains('new note').click()
    //   cy.get('#title').type('title created by cypress')
    //   cy.get('#author').type('author created by cypress')
    //   cy.get('#url').type('url created by cypress')
    //   cy.get('#create_new_blog_btn').click()

    //   cy.contains('title created by cypress')
    // })

    // it('user can like blog', function() {
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})
    //   cy.get('.switch_btn').click()
    //   cy.get('.blog_likes_btn').click()
    // })

    // it('user can delete the blog he created', function() {
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})

    //     cy.get('.switch_btn').then(buttons => {
    //       cy.wrap(buttons[0]).click()
    //     })
    //     cy.contains('remove').click()
    //     cy.contains('You delete a blog')
    // })

    // it('not the author can not delete the blog', function() {
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})
    //   cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog'})

    //   const user = {
    //     name: 'muser',
    //     username: 'MUser',
    //     password: 'museruser'
    //   }
    //   cy.request('POST', 'http://localhost:3001/api/users/', user)

    //   cy.login({ username: 'MUser', password: 'museruser' })
    //   cy.get('.switch_btn').then(buttons => {
    //     cy.wrap(buttons[0]).click()
    //   })
    //     cy.contains('remove').click()
    //     cy.contains('You are not the author of this blog')
    // })

    it('checks that the blogs are ordered according to likes with the blog with the most likes being first', function() {
        cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog', likes: 5})
        cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog', likes: 7})
        cy.createBlog({title: 'New title', author: 'User',  url: 'https://new blog', likes: 4})

        cy.get('.switch_btn').then(buttons => {
          cy.wrap(buttons[0]).click()
          cy.wrap(buttons[1]).click()
          cy.wrap(buttons[2]).click()
        })

        cy.get('.blog_likes').then(likes => {
          let arrayLikes = [...likes]
          let array = arrayLikes.map(like => Number(like.innerText.slice(7)))

          const checkArray = [...array]
          array.sort((a, b) => b - a)

          const checkBlogsLikes = () => {
            return array.every((item, index) => {
              return item === checkArray[index]
            })
          }

          cy.wrap({ fn: checkBlogsLikes }).invoke('fn').should('eq', true)
        })
    })
  })
})