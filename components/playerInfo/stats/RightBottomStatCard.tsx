import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styled from "styled-components";
import { calculatePer } from "lib/utils/functions";
import { RightStatLabel, RightStatNumber } from "components/playerInfo/stats/statFunction";

const StatBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  position: relative;
  top: 4px;
`;
const PercentageBar = styled.div<{ percentage: string }>`
  width: ${(props) => props.percentage || "100%"};
  height: 100%;
  background: #001487;
`;
const StyledTypo = styled.div<{ borderRight?: boolean }>`
  flex: 1;
  border-right: ${(props) =>
    props.borderRight === true ? "1px solid #d8deef" : null};
  height: 100px;
  padding: 16px 6px 0;
`;

const RightBottomStatCard: FC<{ player: PlayerProfile }> = ({ player }) => {
  const { mainPosition, subPosition, stats } = player;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card sx={{ borderBottom: "3px solid #001487" }} raised>
      <CardActionArea>
        <CardHeader
          subheader={
            mainPosition === "GoalKeeper" ? "Save Statistics"
            : mainPosition === "Defender" ? "Tackle Statistics"
            : subPosition === "Striker" ? "Shooting Statistics"
            : "Distribution Statistics"
          }
        />
        <CardContent sx={{ textAlign: "center", height: "120px", paddingTop: "30px" }}>
          {RightStatNumber(
            matches, mainPosition, subPosition,
            `${calculatePer(stats.shotsSaved)}%`,
            `${calculatePer(stats.tackleSuccess)}%`,
            `${calculatePer(stats.conversionRate)}%`,
            `${calculatePer(stats.passAccuracy)}%`
          )}
          {RightStatLabel(
            mainPosition, subPosition,
            "Shots Saved",
            "Tackle Success",
            "Conversion Rate",
            "Pass Accuracy"
          )}
          <StatBar>
            <PercentageBar
              percentage={
                mainPosition === "GoalKeeper" ? `${calculatePer(stats.shotsSaved)}%`
                : mainPosition === "Defender" ? `${calculatePer(stats.tackleSuccess)}%`
                : subPosition === "Striker" ? `${calculatePer(stats.conversionRate)}%`
                : `${calculatePer(stats.passAccuracy)}%`
              }
            />
          </StatBar>
        </CardContent>
        <CardContent sx={{ textAlign: "center", display: "flex" }}>
          <StyledTypo borderRight>
            {RightStatNumber(
              matches, mainPosition, subPosition,
              stats.saves!, stats.tacklesTotal!, stats.shotsTotal!, stats.passesTotal!
            )}
            {RightStatLabel(
              mainPosition, subPosition,
              "Saves", "Total Tackles", "Total Shots", "Total Passes"
            )}
          </StyledTypo>
          <StyledTypo>
            {RightStatNumber(
              matches, mainPosition, subPosition,
              stats.savesPerGame!, stats.tacklesWon!, stats.shotsOnTarget!, stats.passesCompleted!
            )}
            {RightStatLabel(
              mainPosition, subPosition,
              "Saves Per Game", "Tackles Won", "Shots On Target", "Passes Completed"
            )}
          </StyledTypo>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RightBottomStatCard;
