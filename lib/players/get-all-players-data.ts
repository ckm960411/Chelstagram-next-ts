import axios from "axios"
import { PlayerProfile } from "types/playerTypes"

export const getAllPlayersData = async () => {
  const playersData: PlayerProfile[] = await axios.get('http://localhost:3000/players').then(res => res.data)
  return playersData
}