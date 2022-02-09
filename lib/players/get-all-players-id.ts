import axios from "axios"
import { PlayerProfile } from "types/playerTypes"
// import { players } from "dummyData/players"

export const getAllPlayersId = async () => {
  const players: PlayerProfile[] = await axios.get('http://localhost:3000/players').then(res => res.data)
  return players.map(player => {
    return {
      params: {
        id: `${player.id}`
      }
    }
  })
}