import { Typography } from "@mui/material";

type RightStatNumFuncType = (
  matches: boolean,
  mainPosition: string,
  subPosition: string,
  stat1: number | string,
  stat2: number | string,
  stat3: number | string,
  stat4: number | string
) => React.ReactNode;
type RightStatLabelFuncType = (
  mainPosition: string,
  subPosition: string,
  label1: string,
  label2: string,
  label3: string,
  label4: string
) => React.ReactNode;
type LeftStatNumFuncType = (
  matches: boolean,
  mainPosition: string,
  subPosition: string,
  stat1: number,
  stat2: number,
  stat3: number,
) => React.ReactNode
type LeftStatLabelFuncType = (
  mainPosition: string,
  subPosition: string,
  label1: string,
  label2: string,
  label3: string,
) => React.ReactNode

export const RightStatNumber: RightStatNumFuncType = (
  matches, mainPosition, subPosition, stat1, stat2, stat3, stat4
) => (
  <Typography 
    variant={matches ? "h4" : "h5"} 
    sx={{ marginBottom: 0 }}
  >
    {mainPosition === "GoalKeeper" ? stat1
      : mainPosition === "Defender" ? stat2
      : subPosition === "Striker" ? stat3
      : stat4
    }
  </Typography>
);
export const RightStatLabel: RightStatLabelFuncType = (
  mainPosition, subPosition, label1, label2, label3, label4
) => (
  <Typography>
    {mainPosition === "GoalKeeper" ? label1
      : mainPosition === "Defender" ? label2
      : subPosition === "Striker" ? label3
      : label4}
  </Typography>
);

export const LeftStatNumber: LeftStatNumFuncType = 
  (matches, mainPosition, subPosition, stat1, stat2, stat3) => (
    <Typography 
      variant={matches ? "h4" : "h5"}
      sx={{ marginBottom: 0, mainPosition: 'relative', zIndex: 2 }}
    >
      {
        mainPosition === "GoalKeeper" ? stat1
        : subPosition === "Striker" ? stat2
        : stat3
      }
    </Typography>
  )
export const LeftStatLabel: LeftStatLabelFuncType = 
  (mainPosition, subPosition, label1, label2, label3) => (
    <Typography
      component="span" 
      sx={{ mainPosition: 'relative', zIndex: 2 }}
    >
      {
        mainPosition === "GoalKeeper" ? label1
        : subPosition === "Striker" ? label2
        : label3
      }
    </Typography>
  )