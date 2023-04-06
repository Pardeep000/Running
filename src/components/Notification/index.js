import React,{useState,useEffect} from 'react'

import bell from '../../assets/navicons/Bell.svg'
import Badge from "@mui/material/Badge";

import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';

import { makeStyles } from '@material-ui/core';
import Style from './notification.module.css';
import {
  setNotificationsListData
} from "../../store/actions/NotificationListAction";
import mark from '../../assets/notification/Mark.svg'
import openNotification from '../../assets/notification/Open.svg'
import NotificationListUI from './NotificationList';
import {useHistory} from 'react-router-dom'
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import audiofile from './notification.mp3'
import {

  setChatBoxRecentSearchInputText,
  setChatBoxNotificationCustomerId
} from "../../store/actions/ChatBoxActions";
import { connect } from 'react-redux';

import noNotificationbell from '../../assets/notification/noNotificationbell.svg'
const useStyles = makeStyles((theme) => ({
    button: {
      background:'none',
      border:'none',
      fontFamily:"poppins",
      padding:'5px 10px',
      fontSize:'14px'
    },
    buttonActive:{
        border:'none',
        fontFamily:'poppins',
        color:'#55a530',
        background:"rgb(85,165,48,.10)",
        borderRadius:'5px',
        padding:'1px 10px',
        fontSize:'14px'

    },
    neworearlier:{
        width:'90%',
        margin:'0 auto',
        '&:h6':{
            fontSize:'14px',
        },
        fontFamily:'poppins'
    },
    listMain:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',

    }
}));


   
function Notification(props) {
    const history = useHistory();
    const classes = useStyles();

    const useAudio = url => {
      const [audio] = useState(new Audio(url));
  
      const [playing, setPlaying] = useState(false);
    
      const toggle = () => setPlaying(!playing);
    
      useEffect(() => {
          
          playing ? audio.play() : audio.pause();
        },
        [playing]
      );
    
      useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
          audio.removeEventListener('ended', () => setPlaying(false));
        };
      }, []);
    
      return [playing, toggle];
    };
    const getAllNotificationQuery = gql`
    query getNotifications(
      $accessToken: String
    ){
      getNotifications(
        accessToken: $accessToken
      ) {
        id
    	  customerId
        pageId
        dateandtime
        read
        customerName
        agentId
 }
}`;

let [
  getAllNotification,
  {
     loading: getAllNotificationLoading, 
     error: getAllNotificationError, 
     data: getAllNotificationResult 
    },
] = useLazyQuery(getAllNotificationQuery, {
  fetchPolicy: "network-only",
});
    // create team  //
    const [count,setCount] = useState(0)
      const [length,setLength] = useState(0);
    useEffect(() => {
        if (getAllNotificationResult && getAllNotificationResult.getNotifications) {
            setCount(()=>count + 1);
            props.setNotificationsListData(getAllNotificationResult.getNotifications)
        }
    }, [getAllNotificationResult])

    const [playing, toggle] = useAudio(audiofile);
    useEffect(()=>{
        if(count>2 && props.notificationsListData.length>=length){
          toggle()
          setLength(props.notificationsListData.length);
        }
    },[props.notificationsListData.length])

    useEffect(() => {
      const interval = setInterval(() => {
      
        getAllNotification();
      }, 3000);
      return () => clearInterval(interval);
      // getAllNotification();
    }, []);



    let MarkAllasReadMutation = gql`
    mutation  markAllNotificationsRead(
      $accessToken: String
      $idsArray:[ID],
      $read:Boolean
    ){
      markAllNotificationsRead(
        accessToken:$accessToken
        idsArray:$idsArray
        read:$read
       
      ) {
    	success
    error
 }
}

  `;

  const [
    markAllNotificationsRead,
    {
      loading: markAllNotificationsReadLoading,
      error: markAllNotificationsReadError,
      data: markAllNotificationsReadResult,
    },
  ] = useMutation(MarkAllasReadMutation);

  useEffect(() => {

    if (markAllNotificationsReadResult && markAllNotificationsReadResult.markAllNotificationsRead && markAllNotificationsReadResult.markAllNotificationsRead.success) {
     
    }
  }, [markAllNotificationsReadResult]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    const [anchorElThreeDot, setAnchorElThreeDot] = React.useState(null);
    const openThreeDot = Boolean(anchorElThreeDot);
    const handleClickThreeDot = (event) => {
        setAnchorElThreeDot(event.currentTarget);
     

    };
 
    const handleCloseThreeDot = () => {
        setAnchorElThreeDot(null);
    };
    const markAllReadHandler = ()=>{
      if(!markAllNotificationsReadLoading){
        markAllNotificationsRead({
          variables: {
           
            idsArray:props.notificationsListData && props.notificationsListData.length && props.notificationsListData.map(curr=> curr.id),
            read: true
  
          },
        });
      }


    }

  return (
    <div>
    
              <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            
            <Badge badgeContent={props.notificationsListData?props.notificationsListData.length?props.notificationsListData.filter(curr => curr.read === false).length:0:0} color="primary">
                <img
                alt="notification"
                src={bell}
                  style={{ cursor: "pointer" ,marginRight:'-10px'}}
                />
              </Badge>
        
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.22))',
            mt: 1.5,
            width:'350px',
            
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
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
        <div style={{height:'500px',overflowY:'auto'}}>
        <div style={{width:'90%',margin:'5px auto 0px auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h5 style={{fontSize:'16px'}}>Notifications</h5>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClickThreeDot}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreHorizIcon/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorElThreeDot}
        id="account-menu-theedot"
        open={openThreeDot}
        onClose={handleCloseThreeDot}
        onClick={handleCloseThreeDot}
        style={{height:'300px !important',overflowY:'scroll'}}
 
        PaperProps={{
          elevation: 0,
          height:'300px',
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.22))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
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
        
        <MenuItem onClick={markAllReadHandler}>
        <div> <img src={mark} style={{width:'20px',marginRight:'5px'}} /></div>
 Mark all as Read
        </MenuItem>
        {/* <MenuItem onClick={()=>{
            
            history.push('/notifications')}}>
        <div> <img src={openNotification} style={{width:'20px',marginRight:'5px'}} /></div>
Open notifications
        </MenuItem> */}
      
        
      </Menu>
            </div>
            <div style={{marginBottom:'5px'}}>
                <button className={classes.buttonActive}>All</button>
                <button className={classes.button}>Unread</button>
            </div>
        </div>
        {
          props.notificationsListData && props.notificationsListData.length ? props.notificationsListData.map((curr,index)=>(
       <MenuItem className={Style.listItem} key={index} disableRipple>
          < NotificationListUI notification={curr}/>
       </MenuItem>
          )):<div style={{height:'calc(100% - 75px)',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <img src={noNotificationbell} style={{}}/>
              <h4 style={{fontSize:'18px',fontWeight:'500',fontFamily:'poppins',textAlign:'center'}}>No notifications yet</h4>
              <p style={{width:'70%',fontSize:'14px',color:'grey',fontFamily:'poppins',textAlign:'center'}}>When you get notifications, they'll show up here</p>
          </div>
        }
               
        </div>
         
      
      </Menu>
    </React.Fragment>



    </div>
  )
}
const mapStateToProps = (state) => {
  return { 
    ...state.NotificationsListReducer,

    
  };
};
export default connect(mapStateToProps, {
 setNotificationsListData,
 setChatBoxRecentSearchInputText,
 setChatBoxNotificationCustomerId
})(Notification);
