import axios from "axios"

export const getHomeData = async () => {
  const response = await axios.get('http://localhost:3000/').then(res => res.data)
  return response
}