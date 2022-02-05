import { FC, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import AppBar from "components/layout/AppBar"
import SideTabList from "components/layout/SideTabList";
import SideDrawer, { DrawerHeader } from "components/layout/SideDrawer";
import { GlobalStyles } from "@mui/styled-engine"

export const drawerWidth = 240;

const AppLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} onOpen={handleDrawerOpen} />
      <SideDrawer open={open} onClose={handleDrawerClose}>
        <SideTabList />
      </SideDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <GlobalStyles styles={{
          '.css-13xmxm1-MuiContainer-root': {
            width: 'calc(100vw - 88px) !important'
          }
        }}/>
        <DrawerHeader />
        <Container fixed disableGutters>{children}</Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
