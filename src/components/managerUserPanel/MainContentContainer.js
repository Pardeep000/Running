import React from "react";
import { Typography } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { setAdminPanelDrawerToggle } from "../../store/actions/AdminpanelActions";

import ChatBox from "../chatBox";
import Setting from "../setting";
import AddUsers from "../adminPanel/addUsers";
const useStyles = makeStyles((theme) => ({
  mainContentContainer: {
    flexGrow: 1,
    padding: 0,
  },
  drawerShift: {
     marginLeft: 70,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerShiftFull:{
    marginLeft:70,
    width: `calc(100%)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerShiftInverse: {
    // marginLeft: theme.spacing(7) + 2,
    width: `calc(100% - ${theme.spacing(7) + 2}px)`,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(9) + 2,
      width: `calc(100% - ${theme.spacing(9) + 2}px)`,
    },
  },
}));

const MainContentContainer = (props) => {
  const classes = useStyles();

  return (
    <main
      className={clsx(classes.mainContentContainer, {
        [classes.drawerShift]: props.adminPanelDrawerToggle,
        [classes.drawerShiftInverse]: !props.adminPanelDrawerToggle,
        [classes.drawerShiftFull]:props.adminPanelChatBoxDrawerToggle
      })}
      style={{
        marginTop: props.authMainAppBarHeight,
       
        width: `calc(100% - 80px)`,
      }}
    >
      <Switch>
        
      <Route exact path="/addusers">
          <AddUsers />
        </Route>
        <Route
                exact
                strict
                path={["/settings","/settings/facebook","/settings/website","/settings/chatpage","/setting/cannedResponse","/setting/label"]}
                render={(props) => (
                  <Setting
                    {...props}
                  />
                )}
              >

              </Route>
              <Route 
        path={["/chats","/admin", "/"]}  render={(props) => <ChatBox {...props} isManager={true} />}/>
      </Switch>
    </main>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AdminPanelReducer,
    ...state.AuthReducer };
};
export default connect(mapStateToProps, {
  setAdminPanelDrawerToggle,
})(MainContentContainer);
