import { getFetcher } from "lib/utils/fetchers"
import { URL_PLAYERS } from "lib/utils/urls"

export const getAllPlayersId = async () => {
  // const players: PlayerProfile[] = await axios.get('http://localhost:3000/players').then(res => res.data)
  const players: PlayerProfile[] = await getFetcher(URL_PLAYERS)
  return players.map(player => {
    return {
      params: {
        id: `${player.id}`
      }
    }
  })
}