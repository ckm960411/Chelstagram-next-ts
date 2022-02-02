import { FC } from "react";
import Head from "next/head";
import { getAllPlayersId } from "lib/players/get-all-players-id";
import { getPlayerData } from "lib/players/get-player-data";
import { PlayerProfile } from "types/playerTypes";

type PathParams = {
  id: string
}

export const getStaticPaths = async () => {
  const paths = await getAllPlayersId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: PathParams }) => {
  const player = await getPlayerData(params.id)
  return {
    props: {
      player
    }
  }
}

const PlayerDetail: FC<{player: PlayerProfile}> = ({ player }) => {
  const { backNumber, backgroundImg, birthDate, birthPlace, playerId, playerName, position, profileImg } = player

  return (
    <>
      <Head>
        <title>{playerName} | Chelstagram</title>
      </Head>
      {playerName}
    </>
  )
}

export default PlayerDetail