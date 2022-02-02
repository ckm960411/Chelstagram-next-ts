import { FC, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import AppBar from "components/layout/AppBar"
import SideTabList from "components/layout/SideTabList";
import SideDrawer, { DrawerHeader } from "components/layout/SideDrawer";

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
        <DrawerHeader />
        <div style={{ maxWidth: "1280px", margin: "auto" }}>{children}</div>
      </Box>
    </Box>
  );
};

export default AppLayout;
