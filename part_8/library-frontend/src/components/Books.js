import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../query';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState("all")
  if (!props.show) {
    return null
  }

  const genres = ["all",  "refactoring", "agile", "patterns", "design", "classic", "crime" ]

  if (result.loading){
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const btns = {
    button: {
      marginRight: "5px"
    },
    button_last: {
      marginRight: 0
    },
    div: {
      marginBottom: "15px"
    }
  }

  return (
    <div>
      <h2>books</h2>

      <div><p>in genre <b>{genre}</b></p></div>
      <div style={btns.div}>
        {genres.map((genre, id) =>
          <button
            style={id === genres.length - 1 ? btns.button_last : btns.button}
            key={genre + id}
            value={genre}
            onClick={({target}) => setGenre(target.value)}
          >
            {genre}
          </button>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
            {books.map(a => {
              if (a.genres.includes(genre) || genre === "all" ) {
                return (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    <td>{a.genres.join(', ')}</td>
                  </tr>
                )
              }
              return null
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books