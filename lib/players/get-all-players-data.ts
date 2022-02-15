import { getFetcher } from "lib/utils/fetchers"
import { URL_PLAYERS } from "lib/utils/urls"

export const getAllPlayersData = async () => {
  const playersData: PlayerProfile[] = await getFetcher(URL_PLAYERS)
  return playersData
}