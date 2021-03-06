import { FC, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Stats from "components/playerInfo/stats/Stats"
import Comments from "components/playerInfo/comments/Comments";

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DetailTabs: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="stats" />
          <Tab label="comments" />
          <Tab label="images" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stats />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Comments />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default DetailTabs;
