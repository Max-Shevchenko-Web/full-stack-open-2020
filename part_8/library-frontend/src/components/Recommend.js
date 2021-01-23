import React, { useState } from 'react'
import { Me, ALL_BOOKS } from './../query';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

export const Recommend = ({token}) => {
  const currentUserData = useQuery(Me)
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const  allBooksQuery  = useQuery(	ALL_BOOKS, {
    variables: { genre: genre },
  });

  useEffect(() => {
    if (!!currentUserData.data) {
      if (currentUserData.data.me !== null)
      setGenre(currentUserData.data.me.favoriteGenre)
    }
  }, [currentUserData])

  useEffect(() => {
    if(allBooksQuery.data) {
      setBooks(allBooksQuery.data.allBooks)
    }
  }, [allBooksQuery])

  if (currentUserData.loading || !token) {
    return null
  }

  return (
    <div>
      <h3>Recommendations</h3>
      <p>books in your favorite genre <b>{genre}</b></p>
      {books
        ? <table>
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
                    return (
                      <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                        <td>{a.genres.join(', ')}</td>
                      </tr>
                    )
                })
              }
            </tbody>
          </table>
        : <div>loading...</div>
      }
    </div>
  )
}

export default Recommend
