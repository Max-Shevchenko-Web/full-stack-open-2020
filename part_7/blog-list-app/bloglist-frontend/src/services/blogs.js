import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const createComment = async (id, newComment) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment, config)
  return response.data
}

export default { getAll, create, update, deleteBlog,  setToken, createComment}