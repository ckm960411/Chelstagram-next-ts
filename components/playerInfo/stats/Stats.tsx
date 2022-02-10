import { Grid } from "@mui/material";
import { useAppSelector } from "store/hooks";
import appearancesImg from "public/imgs/appearances.png"
import minutesPlayedImg from "public/imgs/minutesPlayed.png"
import gamesStartedImg from "public/imgs/gamesStarted.png"
import goalsImg from "public/imgs/goals.png"
import EachStatCard from "components/playerInfo/stats/EachStatCard";
import LeftBottomStatCard from "components/playerInfo/stats/LeftBottomStatCard"
import RightBottomStatCard from "components/playerInfo/stats/RightBottomStatCard"

const stats = [
  {
    name: 'Appearnces',
    img: appearancesImg,
  },
  {
    name: 'Minutes Played',
    img: minutesPlayedImg,
  },
  {
    name: 'Games Started',
    img: gamesStartedImg,
  },
  {
    name: 'Goals',
    img: goalsImg,
  },
]

const Stats = () => {
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Grid container spacing={2}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <EachStatCard name={stat.name} img={stat.img} stats={player.stats} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <LeftBottomStatCard player={player} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <RightBottomStatCard player={player} />
        </Grid>
      </Grid>
    </>
  );
}

export default Stats