import * as React from "react";
import { useState } from "react"
import { styled, useTheme } from "@mui/material/styles";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  Drawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  Bookmark as BookmarkIcon,
  MarkChatUnread as MarkChatUnreadIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from 'store/hooks'
import LoginDrawer from "components/login/LoginDrawer";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type AppLayoutProps = {
  children: React.ReactNode;
};

const StyledBanner = styled(Typography)`
  color: #fff;
  font-weight: 600;
  font-size: 20px;
`;
const MainTypo: React.FC = () => (
  <Typography
    variant="h5"
    noWrap
    component="div"
    sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
  >
    <StyledBanner>
      <Link href="/">
        <a>Chelstagram</a>
      </Link>
    </StyledBanner>
  </Typography>
);

type IconListItem = {
  icon: () => React.ReactNode;
  primary: string;
  route: string;
};

const DrawerMainIcons: IconListItem[] = [
  {
    icon: () => <HomeIcon />,
    primary: "Home",
    route: "/",
  },
  {
    icon: () => <PersonIcon />,
    primary: "Players",
    route: "/players",
  },
  {
    icon: () => <MarkChatUnreadIcon />,
    primary: "Talk",
    route: "/talk",
  },
];
const DrawerPersonalIcons: IconListItem[] = [
  {
    icon: () => <AccountCircleIcon />,
    primary: "Profile",
    route: "/profile",
  },
  {
    icon: () => <BookmarkIcon />,
    primary: "Bookmark",
    route: "/bookmark",
  },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.user.value)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ zIndex: 1000 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {open && <div></div>}
          <MainTypo />
          <div>
            <IconButton color="inherit" edge="end">
              <SearchIcon />
            </IconButton>
            {myInfo ? (
              <IconButton color="inherit" edge="end" sx={{ marginLeft: 2 }}>
                <Link href="/profile">
                  <a><AccountCircleIcon sx={{ position: "relative", top: "4px" }} /></a>
                </Link>
              </IconButton>
            ) : (
              <LoginDrawer />
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {DrawerMainIcons.map((item) => (
            <Link href={item.route} key={item.primary}>
              <a>
                <ListItem button>
                  <ListItemIcon>{item.icon()}</ListItemIcon>
                  <ListItemText primary={item.primary} />
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {DrawerPersonalIcons.map((item) => (
            <Link href={item.route} key={item.primary}>
              <a>
                <ListItem button>
                  <ListItemIcon>{item.icon()}</ListItemIcon>
                  <ListItemText primary={item.primary} />
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default AppLayout;
