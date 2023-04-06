import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  setAdminPanelDrawerToggle,
  setAdminPanelChatBoxDrawerToggle,
} from "../../store/actions/AdminpanelActions";
import { useLocation, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useEffect } from "react";

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import useStyles from './Styles'
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const NavigationList = (props: { setAdminPanelChatBoxDrawerToggle: (arg0: boolean) => void; adminPanelDrawerToggle: any; adminPanelClosedDrawerToggle: any; setAdminPanelDrawerToggle: (arg0: boolean) => void; }) => {
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const handleMouseEnter = () => {
    setOpen(!open);
  };

  const handleMouseLeave = () => {
    setOpen(!open);
  };
  const uperItems = [
    { name: 'Dashboard', icon: <HomeIcon /> },
    { name: 'Chats', icon: <ForumIcon color="primary" /> },
    { name: 'Users', icon: <PeopleIcon /> },
    { name: 'Traffic', icon: <TrackChangesIcon /> },
    { name: 'Reports', icon: <TrackChangesIcon /> },
    { name: 'Marketplace', icon: <HomeIcon /> },
    { name: 'Settings', icon: <SettingsIcon /> },
  ]

  // const lowerItems = [
  //   { name: 'Help', icon: <HelpIcon /> },
  //   { name: 'Logout', icon: <LogoutIcon color="error" /> },
  // ]
  // const handleClick: any = (e: string ,name: string) => {
  //   history.push(name)
  // }

  useEffect(() => {
    if (location.pathname === "/chat") {
      props.setAdminPanelChatBoxDrawerToggle(true);
    } else {
      props.setAdminPanelChatBoxDrawerToggle(false);
    }
  }, [location, props]);

  const LogoutQuery = gql`
    mutation {
      logout {
        success
        error
      }
    }
  `;

  let [
    logout,
    {
      // loading: logoutQueryLoading,
      // error: logoutQueryError,
      data: logoutQueryResult,
    },
  ] = useMutation(LogoutQuery);
  useEffect(() => {
    if (logoutQueryResult && logoutQueryResult.logout) {
      window.location.href = "/login";
    }
  }, [logoutQueryResult]);

  return (

    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <Drawer variant="permanent" open={open} onMouseEnter={handleMouseEnter} sx={{
        position: 'fixed',
        zIndex: 999,
        left: 0,
        top: 0,
        height: '100vh',
        width: "4.166%",
        backgroundColor: '#f5f5f5',
        transition: 'width 0.2s ease-in-out',
        '&:hover': {
          width: 200,
        },
      }}
        onMouseLeave={handleMouseLeave}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List disablePadding={true}>
          <Box>

            {uperItems.map(({ name, icon }) => (

              <ListItem key={name} sx={{ display: 'block', padding: 0 }} >
                <Link
                  to={`/${name.toLowerCase()}`}
                  className={clsx(classes.listLink, {
                    [classes.linkSelected]:
                      location.pathname.includes(`/${name.toLowerCase()}`)
                    // location.pathname === "/admin" ||
                    // location.pathname === "/",
                  })}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: location.pathname.includes(`/${name.toLowerCase()}`) ? 'primary' : null
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              </ListItem>

            ))}


          </Box>
          <Box sx={{
            width:"10%",
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}>

            <Link
              to='/help'
              className={clsx(classes.listLink, {
                [classes.linkSelected]:
                  location.pathname.includes(`/help`)
              })}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText primary='Help' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="#"
              onClick={() => logout()}
              className={clsx(classes.listLink, {
                [classes.linkSelected]:
                  location.pathname.includes(`/logout`)
              })}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <LogoutIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </Box>
        </List>
      </Drawer>
    </Box >

  );
};

const mapStateToProps = (state: { AdminPanelReducer: any; }) => {
  return { ...state.AdminPanelReducer };
};
export default connect(mapStateToProps, {
  setAdminPanelDrawerToggle,
  setAdminPanelChatBoxDrawerToggle,
})(NavigationList);
