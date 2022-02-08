import axios from "axios"
import { PlayerProfile } from "types/playerTypes"

export const getPlayerData = async (playerId: string) => {
  const playerData: PlayerProfile = await axios.get(`http://localhost:3000/players/${playerId}`).then(res => res.data)
  return playerData
}