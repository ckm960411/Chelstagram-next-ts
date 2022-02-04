import { FC } from "react";
import styled from "styled-components"
import { Card, CardContent, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { GlobalStyles } from "@mui/styled-engine"
import { useAppSelector } from "store/hooks";
import { PlayerProfile } from "types/playerTypes";

type InfoPropTypes = {
  title: string
  desc: string | number
}
const StatBox = styled.div`
  background: #F1F3F6;
  min-height: 110px;
  padding: 20px 0 10px;
`
const StyledTypo = styled(Typography)<{large?: number}>`
  color: #001487;
  font-size: ${props => props.large === 1 ? '28px' : '12px'};
`
const InfoBox = ({ title, desc }: InfoPropTypes) => (
  <>
    <Typography sx={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0' }}>
      <span>{title}</span>
      <span>{desc}</span>
    </Typography>
    <Divider />
  </>
)

const PlayerInfo: FC = () => {
  const theme = useTheme()
  const downLg = useMediaQuery(theme.breakpoints.down("lg"));
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }

  const { playerName, position, birthDate, birthPlace, backNumber, stats } = player

  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <GlobalStyles styles={{
          '.css-fae2zt-MuiCardContent-root:last-child': {
            paddingBottom: '0px !important'
          }
        }}
        />
        <CardContent sx={{ padding: '0 16px 12px' }}>
          <Typography sx={{ color: '#001487', fontSize: '24px', fontWeight: 600 }}>{playerName}</Typography>
        </CardContent>
      </Card>
      <Card sx={
        downSm ? { display: 'none' } : 
        downLg ? { boxShadow: 'none' } : 
        { border: '2px solid #001487', marginTop: '12px' }
      }>
        <CardContent>
          <Grid container spacing={1} sx={{ textAlign: 'center' }}>
            <Grid item xs={3} sm={3}>
              <StatBox>
                <StyledTypo large={1}>{stats.appearances}</StyledTypo>
                <StyledTypo>Appearances</StyledTypo>
              </StatBox>
            </Grid >
            <Grid item xs={3} sm={3}> 
            <StatBox>
              <StyledTypo large={1}>
                {position === 'GoalKeeper' ? stats.cleanSheets : stats.goals}
              </StyledTypo>
              <StyledTypo>
                {position === 'GoalKeeper' ? 'Clean Sheets' : 'Goals'}
              </StyledTypo>
              </StatBox>
            </Grid>
            <Grid item xs={3} sm={3}>
            <StatBox>
              <StyledTypo large={1}>
                {position === 'GoalKeeper' ? stats.saves : stats.assists}
              </StyledTypo>
              <StyledTypo>
                {position === 'GoalKeeper' ? 'Saves' : 'Assists'}
              </StyledTypo>
              </StatBox>
            </Grid>
            <Grid item xs={3} sm={3}>
            <StatBox>
              <StyledTypo large={1}>
                {
                  position === 'GoalKeeper' ? stats.shotsSaved :
                  position === 'Defender' ? stats.tackleSuccess :
                  position === 'Forward' && stats.totalShots !== undefined ? stats.shootingAcuuracy
                  : stats.passAccuracy
                }%
              </StyledTypo>
              <StyledTypo>
                {
                  position === 'GoalKeeper' ? 'Shots Saved' :
                  position === 'Defender' ? 'Tackles Success' :
                  position === 'Forward' && stats.totalShots !== undefined ? 'Shooting Accuracy'
                  : 'Pass Accuracy'
                }
              </StyledTypo>
              </StatBox>
            </Grid>
          </Grid>
        </CardContent>
        <Card sx={downLg ? { display: 'none' } : { margin: '0 16px', boxShadow: 'none' }}>
          <CardContent sx={{ padding: '0 0 16px' }}>
            <Typography sx={{ color: '#001487', fontWeight: 600 }}>Personal Information</Typography>
            <Divider sx={{ background: '#001487', height: '3px', marginTop: 2 }} />
            <InfoBox title="Name" desc={playerName} />
            <InfoBox title="Date of birth" desc={birthDate} />
            <InfoBox title="Birthplace" desc={birthPlace} />
            <InfoBox title="Position" desc={position} />
            <InfoBox title="Number" desc={backNumber} />
          </CardContent>
        </Card>
      </Card>
    </>
  )
}

export default PlayerInfo