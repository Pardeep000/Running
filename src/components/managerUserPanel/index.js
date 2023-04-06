import React, { useEffect, useRef } from "react";

import {
  Container,
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
  Box,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  setUserPanelFullscreenToggle,
  setUserPanelChatOnline,
} from "../../store/actions/UserPanelActions";
import { setAuthUserWsSubscriptionReady,setAuthMainAppBarHeight } from "../../store/actions/AuthActions";
import Fullscreen from "fullscreen-react";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ProfilePictureMenu from "./ProfilePictureMenu";

import { Redirect } from "react-router-dom";
import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
import SettingsMenu from "./SettingsMenu";
import ChatBox from "../chatBox";
import ChatBoxCustomerFormModal from "../chatBox/ChatBoxCustomerFormModal";
import ChatSubscriptionStatus from "../chatBox/ChatSubscriptionStatus";
import ChatPendingCountContainer from "../chatBox/ChatPendingCountContainer";
import LoginAsBackToAccount from "../LoginAsBackToAccount";
import LogoutSubscription from "../loginForgetPassword/LogoutSubscription";
import includes from "../chatBox/includes";
import {Link} from 'react-router-dom'
import AssessmentIcon from '@material-ui/icons/Assessment';
import chattyhub from '../../assets/img/chattyhubblack.png'
import chattyhubblack from '../../assets/navicons/LOGO.svg'

import { useSnackbar } from "notistack";
import NavigationList from "./NavigationList";
import MainContentContainer from './MainContentContainer'
import {BrowserRouter} from 'react-router-dom'
import robot from '../../assets/img/robot.png'


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: "white",
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "white",
    borderBottom:'1px solid lightgrey',
    boxShadow:
      "0px 2px 4px -1px rgb(18 17 17 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(48 48 48 / 0%)",
  },
  appBarShift: {},
  appBarShiftInverse: {},
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  textFieldInputRoot: {
    width: "100%",

    borderRadius: "0!important",
    "&:before": {
      borderBottom: "0!important",
    },
    "&:after": {
      borderBottom: "0!important",
    },
    padding: "0",
  },
  searchTodayChatsTextField: { width: "100%" },
  textField: { width: "100%" },
  textFieldInput: {
    width: "100%",
    border: 0,
    height: "1.1876em",
    margin: 0,
    display: "block",
    padding: 11.3,
  },

  fullscreenIcon: {
    fontSize: 35,
  },

  userInfoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight:'10px'
  },
  usernameText: {
    fontSize: 20,
    marginRight: 15,
    color: "black",
  },
  onlineStatusSwitchLabel: {
    color: "black",
    fontSize: 21,
  },
  recentPagesLeftPane: {
    borderRight: "1px solid #dedede",
    flex: 0.2,
    margin: 0,
  },
  pageIcon: {
    position: "absolute",
    left: 1,
    background: "#737272",
  },
  customerIcon: {
    marginLeft: 10,
  },
  listItemPrimaryText: {
    fontWeight: "bolder",
  },
  listItemButton: {
    borderBottom: "1px solid #d0cfcf",
  },
  profilePic: {
    paddingBottom: 0,
    paddingTop: 5,
  },
  logo: {
    width: 155,
    margin: "0 15px",
  },
  drawerLogoIcon: {
    width: 40,
    margin: "auto",
  },
  drawerLogoLarge: {
    width: "85%",
  },
  drawerPaper:{
    marginTop:'8px',
    width:'70px'
  }
}));

const ManagerUserPanel = (props) => {
  
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const drawerRef = useRef(null);

  const handleFullScreenToggle = () => {
    if (props.userPanelFullscreenToggle)
      props.setUserPanelFullscreenToggle(false);
    else props.setUserPanelFullscreenToggle(true);
  };

  useEffect(() => {
    new includes().setSubscriptionReadyIfUserIdIsAvailable(
      props.authUserId,
      props.wsLink,
      props.setAuthUserWsSubscriptionReady
    );
  }, [props.authUserId]);

  const ChangeOnlineStatusMutation = gql`
  mutation ChangeOnlineStatus($online: Boolean!) {
    changeonlinestatus(online: $online) {
      success
      error
      result
    }
  }
`;

let [
  changeOnlineStatusMutation,
  {
    loading: changeOnlineStatusMutationLoading,
    error: changeOnlineStatusMutationError,
    data: changeOnlineStatusMutationResult,
  },
] = useMutation(ChangeOnlineStatusMutation);

useEffect(() => {
  if (
    changeOnlineStatusMutationResult &&
    changeOnlineStatusMutationResult.changeonlinestatus
  ) {
    props.setUserPanelChatOnline(
      JSON.parse(changeOnlineStatusMutationResult.changeonlinestatus.result)
    );
  }
}, [changeOnlineStatusMutationResult]);
useEffect(() => {
  if (changeOnlineStatusMutationError) {
    props.setUserPanelChatOnline(false);
    changeOnlineStatusMutationError.graphQLErrors.map(({ message }, i) => {
      enqueueSnackbar(message, { variant: "error" });
    });
  }
}, [changeOnlineStatusMutationError]);

  const MeQuery = gql`
    query Me($accessToken: String) {
      me(accessToken: $accessToken) {
        id
        name
        picture
        email
        pseudonym
        designation {
          name
        }
      }
    }
  `;

  let {
    loading: meQueryLoading,
    error: meQueryQueryError,
    data: meQueryResult,
  } = useQuery(MeQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (meQueryResult && meQueryResult.me.name) {
      document.title = `Welcome ${meQueryResult.me.name}`;
    }
  }, [meQueryResult]);

  const appBarRef = useRef(null);
  const mainContainerRef = useRef(null);
  
  if (props.redirectToPath) {
    const path = props.redirectToPath;
    props.setRedirectToPath(null);
    return <Redirect to={{ pathname: path }} />;
  }

  return (
    <Fullscreen isEnter={props.userPanelFullscreenToggle}>
      <Container
         ref={mainContainerRef}
        maxWidth={false}
        disableGutters={true}
        className={classes.mainContainer}
      >
        {props.authUserWsSubscriptionReady && <LogoutSubscription />}
        <AppBar
          onLoad={() => {
            if (appBarRef.current)
              props.setAuthMainAppBarHeight(appBarRef.current.clientHeight);
          }}
          ref={appBarRef}
          position="fixed"
          className={clsx(classes.appBarShift, classes.appBar)}
        >
          <Toolbar disableGutters={true}>
            <img
              className={classes.logo}
           
              src={chattyhubblack}
              alt="logo"
            ></img>

         
           
            
          
            <ChatPendingCountContainer mainContainerRef={mainContainerRef}/>
            <Box
              flex={1}
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Container
                maxWidth={false}
                disableGutters={true}
                className={classes.userInfoContainer}
              >
              {/* <img src={bell} style={{marginRight:'-10px'}} /> */}
              
             
               <ProfilePictureMenu
                  profilePicClassName={classes.profilePic}
                  profilePicture={meQueryResult && meQueryResult.me.picture}
                  profileName = {meQueryResult && meQueryResult.me.name}
                  profileEmail = {meQueryResult && meQueryResult.me.email}
                  authUserId = {props.authUserId}
                /> 
              </Container>

             
            </Box>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Drawer
            ref={drawerRef}
            variant="permanent"
            
            className={clsx(classes.drawer, 
  
            )}
            classes={{
              paper: clsx(classes.drawerPaper,
        
              ),
            }}
          >
            <div className={classes.drawerToolbar}>
              {props.adminPanelDrawerToggle ? (
                <img
                  className={classes.drawerLogoLarge}
                  key="logolarge"
                  // src={process.env.PUBLIC_URL + "/greenmarketinglogo.png"}
                  src={chattyhub}
                  alt="logolarge"
                />
              ) : (
                <img
                  className={classes.drawerLogoIcon}
                  key="logosmall"
                  // src={process.env.PUBLIC_URL + "/greenmarketingicon.png"}
                  src={robot}
                  
                  alt="logosmall"
                />
              )}
            </div>
            {/* <Divider /> */}
            <NavigationList />
          </Drawer>
          <MainContentContainer />
        </BrowserRouter>
      
      </Container>
    </Fullscreen>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
    ...state.RedirectToPathReducer,
    ...state.AuthReducer,
    ...state.ChatBoxReducer,
  };
};
export default connect(mapStateToProps, {
  setRedirectToPath,
  setUserPanelFullscreenToggle,
  setAuthMainAppBarHeight,
  setUserPanelChatOnline,
  setAuthUserWsSubscriptionReady,
})(ManagerUserPanel);
