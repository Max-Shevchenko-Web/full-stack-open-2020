import axios from 'axios'
const baseUsl = 'api/login'

const login = async credentials => {
  const response = await axios.post(baseUsl, credentials)
  return response.data
}

export default { login }