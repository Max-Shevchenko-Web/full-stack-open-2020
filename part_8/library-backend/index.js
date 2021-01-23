const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://newUser:useruser@cluster0.xytdp.mongodb.net/library?retryWrites=true&w=majority'

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id:ID!
    born: Int
    bookCount: Int!
    books: [Book!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String,  genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
  ): Book

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if(args.author && args.genre) {
            const author = await Author.findOne({name: args.author})
            return Book.find({
              genres: {$all: [args.genre]},
              author: author._id
            }).populate('author')
        } else {
            if(args.author) {
                const author = await Author.findOne({name: args.author})
                return await Book.find({author: author._id}).populate('author');
            }
            if(args.genre) {
                return Book.find({
                  genres: {$all: [args.genre]}
                }).populate('author')
            }
        }
        return await Book.find({}).populate('author')
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    allAuthors : () => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const isAuthor = await Author.findOne({ "name": args.author })

      if(!isAuthor) {
        const author = new Author({ name: args.author})
        try {
          const newAuthor = await author.save()
          const book = new Book({ ...args, author: author._id})
          const savedBook = await book.save()
          newAuthor.books = [savedBook._id]
          newAuthor.save()

          const bookForAdd = await Book.populate(savedBook, {path:"author"})
          pubsub.publish('BOOK_ADDED', { bookAdded: bookForAdd })
          return await bookForAdd
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        try {
          const existingAuthor = isAuthor.toJSON();
          const book = new Book({...args, author: existingAuthor.id});
          const savedBook = await book.save();
          await Author.findByIdAndUpdate(existingAuthor.id, {...existingAuthor, books: Array.isArray(existingAuthor.books) ? [...existingAuthor.books, savedBook._id] : [savedBook._id]})

          const bookForAdd = await Book.populate(savedBook, {path:"author"})
          pubsub.publish('BOOK_ADDED', { bookAdded: bookForAdd })

          return bookForAdd
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        return Author.findOneAndUpdate({
          name: args.name
        }, {
          born: args.setBornTo
        }, {
          new: true
        });
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
        const user = new User({...args});

        try {
          return user.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username});

        // hardcoded password
        if(!user || args.password !== "secret") {
          throw new UserInputError("wrong credentials")
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return {value: jwt.sign(userForToken, JWT_SECRET)}
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})