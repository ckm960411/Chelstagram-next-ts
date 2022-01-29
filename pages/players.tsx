import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { loadPlayersData } from "store/playersSlice";
import { PlayerProfile } from 'types/playerTypes'
import PlayerCard from "components/playerInfo/PlayerCard";
import { Grid } from "@mui/material";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Players = ({ playersData }: { playersData: PlayerProfile[]}) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadPlayersData(playersData))
  }, [playersData, dispatch])
  return (
    <>
      <Head>
        <title>Players | Chelstagram</title>
      </Head>
      <Grid container spacing={2}>
        {playersData.map(player => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${player.playerName}-${player.playerId}`} >
            <PlayerCard player={player} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const playersData = await fetcher('http://localhost:3000/players')
  return {
    props: { playersData }
  }
}

export default Players;
