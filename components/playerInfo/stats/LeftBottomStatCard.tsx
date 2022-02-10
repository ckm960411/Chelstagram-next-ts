import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import goalpostImg from "public/imgs/goalpost.png";
import styled from "styled-components";
import Image from "next/image";
import { LeftStatLabel, LeftStatNumber } from "components/playerInfo/stats/statFunction";

const ImageWrapper = styled.div`
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  & > span {
    width: 60% !important;
    height: 80% !important;
    margin: auto !important;
  }
`;

const StyledTypo = styled.div<{ borderRight?: boolean }>`
  flex: 1;
  border-right: ${(props) =>
    props.borderRight === true ? "1px solid #d8deef" : null};
  height: 100px;
  padding: 16px 6px 0;
`;

const LeftBottomStatCard: FC<{ player: PlayerProfile }> = ({ player }) => {
  const { mainPosition, subPosition, stats } = player;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card sx={{ borderBottom: "3px solid #001487" }} raised>
      <CardActionArea>
        <CardHeader
          subheader={
            mainPosition === "GoalKeeper" ? "Clean Sheet Statistics"
            : subPosition === "Striker" ? "Goal Statistics"
            : "Assistance Statistics"
          }
        />
        <CardContent
          sx={{
            textAlign: "center",
            height: "120px",
            paddingTop: "30px",
            backgroundPosition: "center center",
            backgroundSize: "200px 80px",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <ImageWrapper>
            <Image
              src={goalpostImg}
              alt="goalPost"
              width="100%"
              height="100%"
              layout="responsive"
            />
          </ImageWrapper>
          {LeftStatNumber(
            matches, mainPosition, subPosition,
            stats.goalsConceded!, stats.goalsFromInsideBox!, stats.assists!
          )}
          {LeftStatLabel(
            mainPosition, subPosition,
            "Goals Conceded", "Goals From Inside Box", "Assists"
          )}
        </CardContent>
        <CardContent sx={{ textAlign: "center", display: "flex" }}>
          <StyledTypo borderRight>
            {LeftStatNumber(
              matches, mainPosition, subPosition,
              stats.cleanSheets!, stats.goalsFromOutsideBox!, stats.crosses!
            )}
            {LeftStatLabel(
              mainPosition, subPosition,
              "Clean Sheets", "Goals From Outside Box", "Crosses"
            )}
          </StyledTypo>
          <StyledTypo>
            {LeftStatNumber(
              matches, mainPosition, subPosition,
              stats.minutesPerGoalConceded!, stats.goalsFromSetPieces!, stats.chancesCreated!
            )}
            {LeftStatLabel(
              mainPosition, subPosition,
              "Mins Per Goal Conceded", "Goals From Set Pieces", "Chances Created"
            )}
          </StyledTypo>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LeftBottomStatCard;
