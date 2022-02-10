import axios from "axios"

export const getAllPlayersData = async () => {
  const playersData: PlayerProfile[] = await axios.get('http://localhost:3000/players').then(res => res.data)
  return playersData
}