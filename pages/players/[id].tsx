import { FC, useEffect } from "react";
import Head from "next/head";
import { getAllPlayersId } from "lib/players/get-all-players-id";
import { getPlayerData } from "lib/players/get-player-data";
import { PlayerProfile } from "types/playerTypes";
import { useAppDispatch } from "store/hooks";
import { addPlayerData } from "store/playersSlice";
import DetailTabs from "components/playerInfo/DetailTabs";
import { GlobalStyles, Grid } from "@mui/material";
import PlayerBgImg from "components/playerInfo/PlayerBgImg";
import PlayerInfo from "components/playerInfo/PlayerInfo";

type PathParams = {
  id: string
}

const PlayerDetail: FC<{player: PlayerProfile}> = ({ player }) => {
  const dispatch = useAppDispatch()
  const { name } = player
  
  useEffect(() => {
    dispatch(addPlayerData(player))
  }, [player, dispatch])
  
  return (
    <>
      <Head>
        <title>{name} | Chelstagram</title>
      </Head>
      <Grid container spacing={2}>
        <GlobalStyles styles={{
          '.css-19kzrtu': {
            padding: '10px 0 !important'
          }
        }} />
        <Grid item xs={12} order={{ sm: 1 }}>
          <PlayerBgImg />
        </Grid>
        <Grid item xs={12} md={12} lg={8} order={{ xs: 3, md: 3, lg: 2 }}>
          <DetailTabs />
        </Grid>
        <Grid item xs={12} md={12} lg={4} order={{ xs: 2, md: 2, lg: 3 }}>
          <PlayerInfo />
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllPlayersId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: PathParams }) => {
  const player: PlayerProfile = await getPlayerData(params.id)
  return {
    props: {
      player
    }
  }
}

export default PlayerDetail