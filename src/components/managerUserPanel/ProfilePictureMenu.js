// import React, { useRef,useEffect } from "react";

// import {
//   IconButton,
//   MenuList,
//   MenuItem,
//   ClickAwayListener,
//   Paper,
//   Popover,
//   Grow,
//   Divider,
// } from "@material-ui/core";
// import { connect } from "react-redux";
// import LoginAsModal from "../LoginAsModal";
// import { makeStyles } from "@material-ui/core/styles";
// import { setAdminPanelProfilePicMenuAnchorEl } from "../../store/actions/AdminpanelActions";
// import { setLoginAsModalToggle } from "../../store/actions/LoginAsModalActions";
// import LazyLoad from "react-lazyload";
// import Auth from "../../auth/auth";
// import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
// import { useMutation } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";

// const useStyles = makeStyles((theme) => ({
//   profilePicture: {
//     width: 45,
//     border: "1px solid #beb7b7",
//     borderRadius: "50%",
//     height: 45,
//     cursor:'pointer',

    
//   },
//   profilePicClassName:{
//     cursor:'pointer',
//     width: 45,
//     border: "1px solid #beb7b7",
//     borderRadius: "50%",
//     height: 45,
  

//   },
//   profilePicMenuPaper: {
//     background: "rgb(26 39 51 / 73%)",
//     borderRadius: 0,
//   },
//   profilePicMenuItem: {
//     color: "white",
//     cursor: "pointer",
//     pointerEvents: "auto",
//   },

//   popover: {
//     pointerEvents: "none",
//   },
//   profilePicMenuItemDivider:{
//     background:"white"
//   }
// }));

// const ProfilePictureMenu = (props) => {
//   const classes = useStyles();

//   const handleProfilePicMenuClick = (event) => {
//     props.setAdminPanelProfilePicMenuAnchorEl(event.currentTarget);
//   };

//   const handleProfilePicMenuClose = () => {
//     props.setAdminPanelProfilePicMenuAnchorEl(null);
//   };
//   const LogoutQuery = gql`
//     mutation {
//       logout {
//         success
//         error
//       }
//     }
//   `;

//   let [
//     logout,
//     {
//       loading: logoutQueryLoading,
//       error: logoutQueryError,
//       data: logoutQueryResult,
//     },
//   ] = useMutation(LogoutQuery);
//   useEffect(() => {
//     if (logoutQueryResult && logoutQueryResult.logout) {
//       window.location = "/login";
//     }
//   }, [logoutQueryResult]);


//   return (
//     <div >
//       <div
//        className={props.profilePicClassName}
//         onClick={handleProfilePicMenuClick}
//         aria-controls={
//           Boolean(props.adminPanelProfilePicMenuAnchorEl)
//             ? "menu-list-grow"
//             : undefined
//         }
//         aria-haspopup="true"
//       >
//         <LazyLoad height={200}>
//           {props.profilePicture ? (
//             <img src={props.profilePicture}  className={classes.profilePicture}/>
//           ) : (
//             <img
//               className={classes.profilePicture}
//               src={process.env.PUBLIC_URL + "/noprofileimagesmall.jpg"}
//             />
//           )}
//         </LazyLoad>
//       </div>
//       <LoginAsModal mainContainerRef={props.mainContainerRef}/>
//       <Popover
//         container={props.mainContainerRef.current}
//         classes={{ root: classes.popover }}
//         disableEnforceFocus={true}
//         open={Boolean(props.adminPanelProfilePicMenuAnchorEl)}
//         anchorEl={
//           props.adminPanelProfilePicMenuAnchorEl
//         }
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
        
//             <Paper className={classes.profilePicMenuPaper}>
//             </Paper>
     
        
//       </Popover>
     
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return { ...state.AdminPanelReducer };
// };
// export default connect(mapStateToProps, {
//   setAdminPanelProfilePicMenuAnchorEl,
//   setRedirectToPath,
//   setLoginAsModalToggle
// })(ProfilePictureMenu);




import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { FormControlLabel, Switch } from '@mui/material';
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  setUserPanelFullscreenToggle,
  setUserPanelChatOnline,
} from "../../store/actions/UserPanelActions";
import { connect } from 'react-redux';

 function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
React.useEffect(() => {
  if (
    changeOnlineStatusMutationResult &&
    changeOnlineStatusMutationResult.changeonlinestatus
  ) {
    props.setUserPanelChatOnline(
      JSON.parse(changeOnlineStatusMutationResult.changeonlinestatus.result)
    );
  }
}, [changeOnlineStatusMutationResult]);
React.useEffect(() => {
  if (changeOnlineStatusMutationError) {
    props.setUserPanelChatOnline(false);
    changeOnlineStatusMutationError.graphQLErrors.map(({ message }, i) => {
      // enqueueSnackbar(message, { variant: "error" });
    });
  }
}, [changeOnlineStatusMutationError]);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          ><div style={{position:'relative'}}>
  {
              props.profilePicture ?
            <Avatar sx={{ width: 32, height: 32 }} src={ props.profilePicture}/>:
             <Avatar/>

}
<div style={{display:'flex',justifyContent:"center",alignItems:'center',position:'absolute',width:'12px',height:'12px',background:'white',borderRadius:'50%',right:'-2px',bottom:'0px'}}>
<div style={{width:'8px',height:'8px',background:Boolean(props.userPanelChatOnline)?'green':'orange',borderRadius:'50px'}}></div>

</div>
          </div>
          
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            pl:1,
            pr:2,
            pt:1,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: 0.5,
              mr: 1,
             
            },
            '&:before': {
              content: '""',
              display: 'block',
              textAlign:'center',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
       
        {
              props.profilePicture ?
            <Avatar sx={{ width: 42, height: 42 }} src={ props.profilePicture}/>:
             <Avatar sx={{ width: 42, height: 42 }}/>

}
          <p style={{marginBottom:'0px'}}>
          {
            props.profileName ? props.profileName : "Demo"
          }
          </p>
        </div>
        <div style={{display:'flex',marginBottom:'0px',justifyContent:'center'}}>
          <p style={{textAlign:'center',fontSize:'13px',color:'grey'}}>
          {
              props.profileEmail ? props.profileEmail : "Demo@gmail.com"
          }
          </p>
        </div>
        <Divider />
        <div>
        <FormControlLabel
              classes={{ label: { 
                color: "black",
              fontSize: 21} }}
              control={
                <Switch
                  disabled={changeOnlineStatusMutationLoading}
                  checked={Boolean(props.userPanelChatOnline)}
                  onChange={(event) => {
                    if (props.authUserId != null) {
                      changeOnlineStatusMutation({
                        variables: {
                          online: event.target.checked,
                        },
                      });
                    }
                  }}
                  name="onlineStatus"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label={
                props.userPanelChatOnline
                  ? "Accepting chats"
                  : "Accepting chats"
              }
            />
        </div>
      </Menu>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
   
  };
};
export default connect(mapStateToProps, {
  setUserPanelChatOnline,
 })(React.memo(AccountMenu));