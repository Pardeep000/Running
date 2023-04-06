import React from "react";

import { List, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  setAdminPanelDrawerToggle,
  setAdminPanelChatBoxDrawerToggle,
} from "../../store/actions/AdminpanelActions";
import { useLocation } from "react-router-dom";
import dashboardIcon from '../../assets/navicons/Dashboard.svg'
import chatIcon from '../../assets/navicons/Chats.svg'
import reportIcon from '../../assets/navicons/Reports.svg'
import trafficIcon from '../../assets/navicons/Traffic.svg'
import dashboardGIcon from '../../assets/navicons/DashboardG.svg'
import chatGIcon from '../../assets/navicons/ChatsG.svg'
import reportGIcon from '../../assets/navicons/ReportsG.svg'
import trafficGIcon from '../../assets/navicons/TrafficG.svg'
import settingIcon from '../../assets/navicons/Settings.svg'
import settingGIcon from '../../assets/navicons/SettingsG.svg'
import helpIcon from '../../assets/navicons/Help.svg'
import helpGIcon from '../../assets/navicons/HelpG.svg'
import LogoutIcon from '../../assets/navicons/Logout.svg'
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  navListItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    padding: '4px',
    "&:hover": {
      "navListText": {
        color: "white",
        fontWeight: "500",
        transition: theme.transitions.create(["color"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
          delay: 100,
        }),
      },
    },
  },
  navListIcon: {
    margin: 'auto',
    textAlign: 'center',

    // color: "rgb(255 255 255 / 80%)",
    color: "#8e8e8e",
    fontSize: 28,
  },
  navListText: {
    marginTop: 0,
    textAlign: 'left',
    color: "#8e8e8e",



  },
  listLink: {
    textDecoration: "none",
    // marginLeft: 5,
    display: "flex",
  },
  linkSelected: {
    background: '#edf5ec',
    borderLeft: "4px solid #79c646",
    marginLeft: 0,

  },
  linkSelectedInner: {
    color: '#79c646'
  },
  ListMain: {
    display: 'flex',
    marginTop: '65px',
    height: 'calc(100vh - 70px)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'space-between'
  }
}));

const NavigationList = (props: any) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/chat") {
      props.setAdminPanelChatBoxDrawerToggle(true);
    } else {
      props.setAdminPanelChatBoxDrawerToggle(false);
    }
  }, [location]);

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
      loading: logoutQueryLoading,
      error: logoutQueryError,
      data: logoutQueryResult,
    },
  ] = useMutation(LogoutQuery);
  
  useEffect(() => {
    if (logoutQueryResult && logoutQueryResult.logout) {
      window.location.href = "/login";
    }
  }, [logoutQueryResult]);

  return (
    <Container

      disableGutters={true}
      onMouseEnter={() => {
        if (!props.adminPanelDrawerToggle && props.adminPanelClosedDrawerToggle)
          props.setAdminPanelDrawerToggle(true);
      }}
      onMouseLeave={() => {
        if (props.adminPanelDrawerToggle && props.adminPanelClosedDrawerToggle)
          props.setAdminPanelDrawerToggle(false);
      }}
    >
      <List className={classes.ListMain} disablePadding={true}>
        <div>

          <Link
            to="/dashboard"
            className={clsx(classes.listLink, {
              [classes.linkSelected]:
                location.pathname === "/dashboard" ||
                location.pathname === "/admin" ||
                location.pathname === "/",
            })}
          >

            <ListItem button key={"dashboard"} className={classes.navListItem}>
              <ListItemIcon>
                <img src={location.pathname === "/dashboard" ? dashboardGIcon : dashboardIcon} alt="dashboard" className={clsx(classes.navListIcon, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/dashboard"
                })} />
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: '12px' }}
                className={clsx(classes.navListText, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/dashboard"
                })}
                primary={"Dashboard"}
              />
            </ListItem>
          </Link>
          <Link
            to="/chat"
            className={clsx(classes.listLink, {
              [classes.linkSelected]:
                location.pathname === "/chat"
            })}
          >
            <ListItem button key={"dashboard"} className={classes.navListItem}>
              <ListItemIcon>
                <img src={location.pathname === "/chat" ? chatGIcon : chatIcon} alt="chatIcon" className={clsx(classes.navListIcon, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/chat"
                })} />
              </ListItemIcon>
              <ListItemText
                className={clsx(classes.navListText, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/chats"
                })}
                primary={"Chats"}
              />
            </ListItem>
          </Link>


          <Link
            to="/traffic"
            className={clsx(classes.listLink, {
              [classes.linkSelected]: location.pathname === "/traffic",
            })}
          >
            <ListItem button key={"addprofiles"} className={classes.navListItem}>
              <ListItemIcon>
                <img src={location.pathname === "/traffic" ? trafficGIcon : trafficIcon} alt="traffic" className={clsx(classes.navListIcon, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/traffic"
                })} />
              </ListItemIcon>
              <ListItemText
                className={clsx(classes.navListText, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/traffic"
                })}
                primary={"Traffic"}
              />
            </ListItem>
          </Link>
          <Link
            to="/reports"
            className={clsx(classes.listLink, {
              [classes.linkSelected]: location.pathname === "/reports",
            })}
          >
            <ListItem button key={"addpages"} className={classes.navListItem}>
              <ListItemIcon>
                <img src={location.pathname === "/reports" ? reportGIcon : reportIcon} alt="report" className={clsx(classes.navListIcon, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/reports"
                })} />
              </ListItemIcon>
              <ListItemText
                className={clsx(classes.navListText, {
                  [classes.linkSelectedInner]:
                    location.pathname === "/reports"
                })}
                primary={"Reports"}
              />
            </ListItem>
          </Link>
        </div>
        <div>
          <Link
            to="/setting"
            className={clsx(classes.listLink, {
              [classes.linkSelected]: location.pathname === "/setting",
            })}
          >
            <ListItem
              button
              key={"setting"}
              className={classes.navListItem}
            >
              <ListItemIcon>
                <img src={location.pathname === "/setting" ? settingGIcon : settingIcon} className={classes.navListIcon} alt="img" />
              </ListItemIcon>
              <ListItemText
                className={classes.navListText}
                primary={"Setting"}
              />
            </ListItem>
          </Link>
          <Link
            to="/help"
            className={clsx(classes.listLink, {
              [classes.linkSelected]: location.pathname === "/help",
            })}
          >
            <ListItem button key={"help"} className={classes.navListItem}>
              <ListItemIcon>
                <img src={location.pathname === "/help" ? helpGIcon : helpIcon} className={classes.navListIcon} alt="img" />
              </ListItemIcon>
              <ListItemText
                className={classes.navListText}
                primary={"Help"}
              />
            </ListItem>
          </Link>
          <Link
            to="#"
            onClick={() => logout()}
            className={clsx(classes.listLink)}
          >
            <ListItem button key={"logout"} className={classes.navListItem}>
              <ListItemIcon>
                <img src={LogoutIcon} className={classes.navListIcon} alt="img" />
              </ListItemIcon>
              <ListItemText
                className={classes.navListText}
                primary={"Logout"}
              />
            </ListItem>
          </Link>
        </div>
      </List>

    </Container>
  );
};

const mapStateToProps = (state: { AdminPanelReducer: any; }) => {
  return { ...state.AdminPanelReducer };
};
export default connect(mapStateToProps, {
  setAdminPanelDrawerToggle,
  setAdminPanelChatBoxDrawerToggle,
})(NavigationList);
