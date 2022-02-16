import { FC } from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Bookmark as BookmarkIcon,
  MarkChatUnread as MarkChatUnreadIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import Link from "next/link";

type IconListItem = {
  icon: () => React.ReactNode;
  primary: string;
  route: string;
};

const DrawerMainIcons: Array<IconListItem> = [
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
const DrawerPersonalIcons: Array<IconListItem> = [
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

const SideTabList: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <List>
        {DrawerMainIcons.map((item) => (
          <Link href={item.route} key={item.primary}>
            <a>
              <ListItem button onClick={onClose}>
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
              <ListItem button onClick={onClose}>
                <ListItemIcon>{item.icon()}</ListItemIcon>
                <ListItemText primary={item.primary} />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </>
  );
};

export default SideTabList;
