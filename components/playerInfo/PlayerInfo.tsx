import { FC } from "react";
import styled from "styled-components"
import { Card, CardContent, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { GlobalStyles } from "@mui/styled-engine"
import { useAppSelector } from "store/hooks";
import { calculatePer } from "lib/utils/functions";
import InfoBox from "components/playerInfo/stats/InfoBox"

const StatBox = styled.div`
  background: #F1F3F6;
  min-height: 110px;
  padding: 20px 0 10px;
`
const StyledTypo = styled(Typography)<{large?: number}>`
  color: #001487;
  font-size: ${props => props.large === 1 ? '28px' : '12px'};
`

const PlayerInfo: FC = () => {
  const theme = useTheme()
  const downLg = useMediaQuery(theme.breakpoints.down("lg"));
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }

  const { name, mainPosition, subPosition, birthDate, birthPlace, backNumber, stats, height, weight } = player

  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <GlobalStyles styles={{
          '.css-fae2zt-MuiCardContent-root:last-child': {
            paddingBottom: '0px !important'
          }
        }}/>
        <CardContent sx={{ padding: '0 16px 12px' }}>
          <Typography sx={{ color: '#001487', fontSize: '24px', fontWeight: 600 }}>{name}</Typography>
        </CardContent>
      </Card>
      <Card sx={
        downSm ? { display: 'none' } : 
        downLg ? { boxShadow: 'none' } : 
        { border: '2px solid #001487', marginTop: '12px' }
      } raised>
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
                {mainPosition === 'GoalKeeper' ? stats.cleanSheets : stats.goals}
              </StyledTypo>
              <StyledTypo>
                {mainPosition === 'GoalKeeper' ? 'Clean Sheets' : 'Goals'}
              </StyledTypo>
              </StatBox>
            </Grid>
            <Grid item xs={3} sm={3}>
            <StatBox>
              <StyledTypo large={1}>
                {mainPosition === 'GoalKeeper' ? stats.saves : stats.assists}
              </StyledTypo>
              <StyledTypo>
                {mainPosition === 'GoalKeeper' ? 'Saves' : 'Assists'}
              </StyledTypo>
              </StatBox>
            </Grid>
            <Grid item xs={3} sm={3}>
            <StatBox>
              <StyledTypo large={1}>
                {
                  mainPosition === 'GoalKeeper' ? calculatePer(stats.shotsSaved) :
                  mainPosition === 'Defender' ? calculatePer(stats.tackleSuccess) :
                  subPosition === 'Striker' ? calculatePer(stats.shootingAccuracy)
                  : stats.passAccuracy * 100
                }%
              </StyledTypo>
              <StyledTypo>
                {
                  mainPosition === 'GoalKeeper' ? 'Shots Saved' :
                  mainPosition === 'Defender' ? 'Tackles Success' :
                  subPosition === 'Striker' ? 'Shooting Accuracy'
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
            <InfoBox title="Name" desc={name} />
            <InfoBox title="Date of birth" desc={birthDate} />
            <InfoBox title="Birthplace" desc={birthPlace} />
            <InfoBox title="Height" desc={height} />
            <InfoBox title="Weight" desc={weight} />
            <InfoBox title="Position" desc={mainPosition} />
            <InfoBox title="Number" desc={backNumber} />
          </CardContent>
        </Card>
      </Card>
    </>
  )
}

export default PlayerInfo