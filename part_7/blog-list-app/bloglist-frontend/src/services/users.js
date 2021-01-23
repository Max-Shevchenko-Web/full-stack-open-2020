import axios from 'axios'
const baseUrl = '/api/users'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const create = async (newBlog) => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newBlog, config)
//   return response.data
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

// const deleteBlog = async (id) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = axios.delete(`${baseUrl}/${id}`, config)
//   return response
// }

export default { getAll}