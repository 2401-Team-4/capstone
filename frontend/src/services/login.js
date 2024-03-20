import axios from 'axios'
const baseUrl = 'http://localhost:3020/api/login'

export const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}