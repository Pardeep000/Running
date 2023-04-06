import React from 'react'

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

import mark from '../../assets/notification/Mark.svg'
import openNotification from '../../assets/notification/Open.svg'
import NotificationListUI from './NotificationList';
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




function NotificationMain() {
    const classes = useStyles();
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


   
  return (
    <div style={{background:'lightgrey'}}>
        <div style={{background:'white',display:'grid',gridTemplateColumns:'auto auto auto',justifyContent:'space-between',alignItems:'center',height:'50px',marginBottom:'20px',borderBottom:'1px solid grey'}}>
        <button style={{border:"none",background:'none'}}>Back</button>
        <h2 style={{fontSize:'20px',fontFamily:'poppins',marginTop:'5px'}}>Notifications</h2>
        </div>
        <div>
        <div>
             
             <React.Fragment>
   
     <div style={{display:'flex',justifyContent:'center',}}>
       <div style={{height:'calc(100vh - 135px)',overflowY:'auto',width:'450px',background:'white',boxShadow:'0px 2px 4px rgba(0,0,0,0.22)'}}>
       <div style={{width:'90%',margin:'20px auto 0px auto'}}>
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
               <h5 style={{fontSize:'16px'}}>Notification</h5>
        
           </div>
           <div style={{marginBottom:'5px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>

               <button className={classes.buttonActive}>All</button>
               <button className={classes.button}>Unread</button>
            </div>
            <span style={{color:'green',fontFamily:'poppins',fontSize:'13px',cursor:'pointer'}}>Mark all as Read</span>
           </div>
       </div>
      {
      
      }
       <MenuItem disableRipple>
         
         < NotificationListUI/>
        
      </MenuItem>
       
       <MenuItem disableRipple>
          < NotificationListUI/>
       </MenuItem>
       <MenuItem disableRipple>
         
         < NotificationListUI/>
        
      </MenuItem>
      <MenuItem disableRipple>
         
         < NotificationListUI/>
        
      </MenuItem>
      <MenuItem disableRipple>
      < NotificationListUI/>
         
     
        
      </MenuItem>
      <MenuItem disableRipple>
         
         < NotificationListUI/>
        
      </MenuItem>
      <MenuItem disableRipple>
         
         < NotificationListUI/>
        
      </MenuItem>
      <MenuItem disableRipple>
      < NotificationListUI/>
         
     
        
      </MenuItem>
   
 
 
       
      
       </div>
        
     
     </div>
   </React.Fragment>



   </div>
        </div>
    </div>
  )
}

export default NotificationMain