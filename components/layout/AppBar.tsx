import { styled } from '@mui/material/styles';
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography } from "@mui/material"
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { FC } from 'react';
import { drawerWidth } from 'components/AppLayout';
import LoginDrawer from "components/login/LoginDrawer";
import Link from 'next/link';
import { useAppSelector } from 'store/hooks';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

type PropTypes = {
  open: boolean
  onOpen: () => void
}

const AppBarComponent: FC<PropTypes> = ({ open, onOpen }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
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
  )
}

export default AppBarComponent