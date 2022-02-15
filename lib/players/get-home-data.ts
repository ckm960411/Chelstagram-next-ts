import { getFetcher } from "lib/utils/fetchers"
import { URL_HOME } from "lib/utils/urls"

export const getHomeData = async () => {
  const response = await getFetcher(URL_HOME)
  return response
}