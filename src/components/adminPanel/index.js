import React, { useRef, useEffect,  } from "react";

import {
 
  Box,

} from "@material-ui/core";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { setChatBoxRecentChatListData } from "../../store/actions/ChatBoxActions";
import {
  BrowserRouter,
  Redirect,

} from "react-router-dom";

import {
  setAdminPanelDrawerToggle,
  setAdminPanelFullscreenToggle,
  setAdminPanelClosedDrawerToggle,
  setAdminPanelChatOnline,
  setAdminPanelChatBoxDrawerToggle,
} from "../../store/actions/AdminpanelActions";
import { setPropsObjectData } from "../../store/actions/PropsObjectActions";
import {
  setUserPanelFullscreenToggle,
  setUserPanelChatOnline,
} from "../../store/actions/UserPanelActions";
import { setNotificationsListData } from "../../store/actions/NotificationListAction";
import {
  setAuthUserWsSubscriptionReady,
  setAuthMainAppBarHeight,
} from "../../store/actions/AuthActions";
import Fullscreen from "fullscreen-react";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import NavigationList from "./NavigationList";
import MainContentContainer from "./MainContentContainer";

import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
import { Facebook } from "../../auth/Facebook";

import includes from "../chatBox/includes";

import { useSnackbar } from "notistack";

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { CssBaseline, } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../layout/header/Header'

const drawerWidth = 240;
const Main = styled('main')(({ theme }) => ({
  ...(true && {
    // background: theme.custom?.background,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 60,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${60}px)`,
    // height:  `calc(100% - ${80}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px'
    }
  })
}));




const AdminPanel = (props) => {
 
  const { enqueueSnackbar } = useSnackbar();
  const drawerRef = useRef(null);
  const buttonRef = React.useRef();

  useEffect(() => {
    new includes().setSubscriptionReadyIfUserIdIsAvailable(
      props.authUserId,
      props.wsLink,
      props.setAuthUserWsSubscriptionReady
    );
  }, [props.authUserId]);

  const MeQuery = gql`
    query Me($accessToken: String) {
      me(accessToken: $accessToken) {
        id
        name
        email
        picture
        pseudonym
        designation {
          name
        }
      }
    }
  `;

  let [
    meQuery,
    { loading: meQueryLoading, error: meQueryQueryError, data: meQueryResult },
  ] = useLazyQuery(MeQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    Facebook.fbInt();
    meQuery();
  }, []);

  useEffect(() => {
    if (props.adminPanelChatBoxDrawerToggle)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [props.adminPanelChatBoxDrawerToggle]);

  const appBarRef = useRef(null);

  const mainContainerRef = useRef(null);

  if (props.redirectToPath) {
    const paths = props.redirectToPath;
    props.setRedirectToPath(null);
    return <Redirect to={{ pathname: paths }} />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  // console.log("admin panel", props.adminPanelDrawerToggle)
  return (
    <BrowserRouter>



      {/* <Fullscreen isEnter={props.adminPanelFullscreenToggle}> */}
      

            <MainContentContainer />
      
        {/* </BrowserRouter> */}

      {/* </Fullscreen> */}
    </BrowserRouter >
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.AdminPanelReducer,
    ...state.RedirectToPathReducer,
    ...state.AuthReducer,
    ...state.ChatBoxReducer,
    ...state.UserPanelReducer,
    ...state.NotificationsListReducer,
    ...state.PropsObjectDataReducer,
  };
};
export default connect(mapStateToProps, {
  setChatBoxRecentChatListData,
  setPropsObjectData,
  setNotificationsListData,
  setRedirectToPath,
  setAdminPanelDrawerToggle,
  setAdminPanelFullscreenToggle,
  setAuthMainAppBarHeight,
  setUserPanelChatOnline,
  setAdminPanelClosedDrawerToggle,
  setAdminPanelChatOnline,
  setAuthUserWsSubscriptionReady,
  setAdminPanelChatBoxDrawerToggle,
})(React.memo(AdminPanel));
