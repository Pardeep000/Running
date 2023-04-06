import React from 'react'



import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import ReactTimeAgo from "react-timeago";

import { makeStyles } from '@material-ui/core';
import Style from './notification.module.css';
import bell2 from '../../assets/notification/Bell02.svg'
import mark from '../../assets/notification/Mark.svg'

import remind from '../../assets/notification/Remind.svg'
import removeNotification from '../../assets/notification/Removenotification.svg';
import moment from 'moment';
import FacebookAvatar from '../chatBox/FacebookAvatar';


import { gql } from "apollo-boost";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { connect } from 'react-redux';

import {

  setChatBoxRecentSearchInputText,
  setChatBoxNotificationCustomerId
} from "../../store/actions/ChatBoxActions";
import FacebookTypography from '../chatBox/FacebookTypography';

const NotificationListUI = (props)=> {
  const {notification} = props;
   
    const [anchorElList, setanchorElList] = React.useState(null);
    const openListDot = Boolean(anchorElList);
    const handleClickLink = (event) => {
        setanchorElList(event.currentTarget);
    };

    let MarkasReadMutation = gql`
    mutation markNotificationRead(
      $id:ID!
      $customerId:String!
      $pageId:String!
      $agentId:ID
      $read:Boolean
    ){
      markNotificationRead(
        id:$id
        customerId:$customerId
        pageId:$pageId
        agentId:$agentId
        read:$read
      ) {
    	success
    error
 }
}

  `;

  const [
    markNotificationsRead,
    {
      loading: markNotificationsReadLoading,
      error: markNotificationsReadError,
      data: markNotificationsReadResult,
    },
  ] = useMutation(MarkasReadMutation);

  React.useEffect(() => {

    if (markNotificationsReadResult && markNotificationsReadResult.markNotificationRead && markNotificationsReadResult.markNotificationRead.success) {

    }
  }, [markNotificationsReadResult]);

  let deleteNotificationMutation = gql`
  mutation deleteNotification(
    $id:ID!
    $customerId:String!
    $agentId:String!
    $pageId:String!
  ){
    deleteNotification(
      id:$id
      customerId:$customerId
      pageId:$pageId
      agentId:$agentId
      
     
    ) {
    success
  error
}
}

`;

const [
  deleteNotification,
  {
    loading: deleteNotificationLoading,
    error: deleteNotificationError,
    data: deleteNotificationResult,
  },
] = useMutation(deleteNotificationMutation);

React.useEffect(() => {

  if (deleteNotificationResult && deleteNotificationResult.deleteNotification && deleteNotificationResult.deleteNotification.success) {
   
  }
}, [deleteNotificationResult]);


    const handleCloseList = () => {
        setanchorElList(null);
    };
    const openCustomerChatHandler = (data)=>{
      markAsReadHandler(data);
      
      props.setChatBoxRecentSearchInputText(data.customerName);
      props.setChatBoxNotificationCustomerId(data.customerId);
    }
    const markAsReadHandler = (data)=>{
      if(!markNotificationsReadLoading){
        markNotificationsRead({
          variables: {
            customerId:data.customerId,
            pageId:data.pageId,
            agentId:data.agentId,
            id:data.id,
            read: true
          },
        });
      }

    }
    const removeThisNotification = (data)=>{
       
      deleteNotification({
        variables: {
          customerId:data.customerId,
          pageId:data.pageId,
          agentId:data.agentId,
          id:data.id,
        },
      });
    }
    const typostyle = {
      display: "inline",
      fontWeight: "500",
      color: "black",
      marginLeft: 5,
      width: 150,
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontStyle: "bold",
      fontFamily: "Poppins",
      fontSize: "17px",
    }

    return(
      
        <div className={!notification.read?Style.listmain:Style.listmainunread} >
               <div onClick={()=>openCustomerChatHandler(notification)} style={{display:'flex',alignItems:'center',width:'80%'}}>
                   {/* <div style={{width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center',background:"rgb(85,165,48,.10)",borderRadius:'50%',marginRight:'10px'}}> <img src={bell2} style={{width:'20px'}} /></div> */}
                   <div style={{position:'relative'}}>
                            <FacebookAvatar
                              key={notification.id}
                              // className={classes.customerIcon}
                              type="customer"
                              item={notification}
                            ></FacebookAvatar>
          <img style={{ width: "13px",position:'absolute',bottom:'0px',right:'5px' }} src={bell2} alt="messenger" />

                            </div>
                   <div style={{width:'100%'}}>
                       <p style={{margin:'-2px',color:'grey',fontSize:'13px'}}>Reminder</p>
                       {/* <p style={{margin:'-2px',fontSize:'13px',width:'80%',fontWeight:'500',fontFamily:'poppins'}}>
                        
                        {` ${notification.customername !='' ? notification.customername : ""} `}
                        
                    
                  
                  </p> */}
                   <FacebookTypography
                      item={notification}
                      className={typostyle}
                    ></FacebookTypography>
                  <ReactTimeAgo
                            style={{fontSize:'12px',color:'grey'}}
                            // className={classes.timeStamp}
                            date={moment.unix(notification.dateandtime / 1000)}
                            locale="en-US"
                          />
                       {/* <p style={{margin:0,fontSize:'12px',color:'lightgrey'}}>a few seconds ago</p> */}
                   </div>
               </div>
               <div className={Style.dropdown}>
               <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' ,}}>
     
     <Tooltip title="menu">
       <IconButton
         onClick={handleClickLink}
         style={{width:'20px',height:'20px',background:'white',boxShadow:"0px 0px 2px 1px rgba(0,0,0,0.32)"}}
         size="small"
         sx={{ ml: 2 }}
         aria-controls={openListDot ? 'account-menu-list' : undefined}
         aria-haspopup="true"
         aria-expanded={openListDot ? 'true' : undefined}
       >
         <MoreHorizIcon fontSize='small'/>
       </IconButton>
     </Tooltip>
   </Box>
   <Menu
   
     anchorEl={anchorElList}
     id="account-menu-list"
      open={openListDot}
     onClose={handleCloseList}
     onClick={handleCloseList}
     PaperProps={{
       elevation: 0,
       border:'1px solid red',
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
     <MenuItem onClick={()=>markAsReadHandler(notification)} >
     <div> <img src={mark} style={{width:'25px',marginRight:'5px'}} /></div>
Mark as Read
     </MenuItem>

     <MenuItem onClick={()=>removeThisNotification(notification)}>
     <div> <img src={removeNotification} style={{width:'25px',marginRight:'5px'}} /></div>
 Remove this notification
     </MenuItem>
   
     
   </Menu>
               </div>
           </div>
      
    )
}

const mapStateToProps = (state) => {
  return { 
    ...state.NotificationsListReducer,

    
  };
};
export default connect(mapStateToProps, {
 
 setChatBoxRecentSearchInputText,
 setChatBoxNotificationCustomerId
})(NotificationListUI);
