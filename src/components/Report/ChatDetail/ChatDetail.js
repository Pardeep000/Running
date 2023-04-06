import React, { useEffect, useRef, useState } from "react";
import {useParams} from 'react-router-dom'

import {
  Container,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  setChatBoxRecentChatListData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxLabelsPopoverAnchorEl,
  setChatBoxCustomerFormData,
  setChatBoxMessageData,
  setChatBoxWindowSize,
  setChatBoxMessageTextInput,
  setChatBoxMessageTextBoxHeight,
  setChatBoxContainerChatSearchToggle,
  setChatBoxSearchText,
  setChatBoxContainerChatSearchCount,
  setChatBoxContainerChatSearchUpButtonToggle,
  setChatBoxContainerChatSearchDownButtonToggle,
  setChatBoxTypingMessageDetails,
} from "../../../store/actions/ChatBoxActions";
import {
  setFollowUpDialogToggle,
  setFollowUpDialogDateTime,
} from "../../../store/actions/FollowUpDialogActions";

import clsx from "clsx";

import { gql } from "apollo-boost";
import moment from "moment";

import includes from "../../chatBox/includes";
import {  useLazyQuery } from "@apollo/react-hooks";
import { Avatar,Typography } from "@material-ui/core";
import FacebookAvatar from "../../chatBox/FacebookAvatar";
import AppBar from '@material-ui/core/AppBar';
import './chatdetail.css'
const useStyles = makeStyles((theme) => ({
  chatTabHeaderContainer: {
    display: "flex",
  },
  chatsTabText: {
    display: "inline",
    color: "white",
    marginLeft: 5,
    width: 150,
    whiteSpace: "nowrap",
    overflow: "hidden",
    flexGrow: 1,
  },
  chatsTabContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  chatsCloseButton: {
    color: "white",
    marginLeft: 15,
  },
  chatsTabPageImage: {
    marginRight: 2,
    background: "#737272",
  },
  messageBox: {
    background: "white",
    overflow: "auto",
  },

  messageInputRoot: {
    width: "100%",
    background: "white",
    borderTop: "1px solid gray",
  },
  messageInput: {
    height: 41,

    padding: "0px 4px",
    borderBottom: 0,
  },
  sendMessageButton: {
    padding: "0 9px",
    alignSelf: "flex-end",
    background: "#b5b3b3",
    height: 41,
    borderRadius: 0,
    "&:hover": {
      background: "#9c9c9c",
    },
  },
  messageTextAndSendContainer: {
    display: "flex",
    background: "white",
  },
  incomingMessage: {
    background: "#cccbcb",
    borderRadius: 20,
    display: "inline-block",
    padding: 15,
    margin: 5,
    whiteSpace: "pre-wrap",
  },
  outgoingMessage: {
    background: "#66c047",
    borderRadius: 20,
    display: "inline-block",
    color: "white",
    padding: 15,
    margin: 5,
    whiteSpace: "pre-wrap",
  },
  outgoingMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
  },
  formAddButton: {
    color: "white",
    background: "#f50057",
    marginRight: 5,
    "&:hover": {
      background: "#e14079",
    },
  },
  labelAddButton: {
    borderRadius: 0,
    alignSelf: "flex-end",
    height: 41,
  },
  addLabelsPopoverPaper: {
    borderRadius: 0,
  },
  userLabel: {
    textAlign: "center",
    borderBottom: "1px solid gray",
    margin: "25px 55px",
    fontSize: 15,
    display: "block",
  },
  chatMessageProgress: {
    width: "19px!important",
    height: "19px!important",
    marginTop: "auto",
    marginBottom: "auto",
  },
  errorMessage: {
    color: "#f50057",
    marginTop: "auto",
    marginBottom: "auto",
  },
  messageTextBox: {
    padding: "0 6px",
    border: "1px solid gray",
    outline: "none",
    font: "inherit",
    maxHeight: 180,
    flex: 1,
    minHeight: 30,
    paddingTop: 8,
    overflow: "auto!important",
  },
  unreadMessage: {
    background: "red",
  },
  readMessage: {
    background: "red",
  },
  seenMessageIcon: {
    width: 16,
    height: 16,
  },
  deliveredMessageIconContainer: {
    border: "1px solid gray",
    alignSelf: "flex-end",
    borderRadius: "50%",
    display: "flex",
    marginBottom: 8,
  },
  deliveredMessageIcon: {
    fontSize: 14,
  },
  seenMessageIconContainer: {
    display: "flex",
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  clearSearchButton: {
    padding: 0,
    padding: 10,
  },
  chatBoxSearchToolbar: {
    order: 1,
    width: 140,
  },
  chatBoxSearchDownButton: {
    padding: 0,
  },
  chatBoxSearchUpButton: {
    padding: 0,
  },
  chatBoxSearchTextFieldInput: {
    border: "1px solid gray",
    padding: 10,
  },
  chatBoxSearchTextFieldInputRoot: {
    borderRadius: 0,
    padding: 0,
  },
  chatBoxSearchText: {
    width: "100%",
  },
  header_main:{
      padding:'20px',
      
  }
}));



const ChatContainer = (props) => {
  const classes = useStyles();

  const {id} = useParams()
  const [customerId,setCustomerId] = useState('')
  const [pageId,setPageId] = useState('')
  const [messageData,setMessageData] = useState([]);
  useEffect(()=>{
    if(id){
        const word =  id.split('&');
       const again = word.map((word)=>word.split('='))
        let cusandpageId = [];
         again.map((cusandpageid) => cusandpageId.push(cusandpageid[1])
            )
        if(cusandpageId.length){

            setCustomerId(cusandpageId[0])
            setPageId(cusandpageId[1]);
            
        }
           
    }
},[id])

const GetPages = gql`
query Pages($mainSuperAdminId:ID!) {
  pages(mainSuperAdminId:$mainSuperAdminId) {
    id
    name
    pageId
    accesstoken
  }
}
`;

let [
getPages,
{
  loading: getPagesQueryLoading,
  error: getUsersQueryError,
  data: getPagesQueryResult,
},
] = useLazyQuery(GetPages, {
fetchPolicy: "network-only",
});


useEffect(()=>{
document.title = "Chat details";
getPages({
  variables: {
    mainSuperAdminId:JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
  }
});
},[])



const getChatDetailQuery = gql  `
query getChatDetail(
    $customerId:String!
    $pageId:String!
  ) {
      getChatDetail(
        customerId: $customerId
        pageId:$pageId
      ) {
        customerId
        messagetext
           messagetype
           pageId
           messagetimestamp
           agentId
           agentname
           read
           deliverytimestamp
          receiptreadtimestamp
    }
  }
`;

let [
    getChatDetail,
    {
      loading: getChatDetailQueryLoading,
      error: getChatDetailQueryError,
      data: getChatDetailQueryResult,
    },
  ] = useLazyQuery(getChatDetailQuery, {
    fetchPolicy: "network-only",
  });


    useEffect(() => {
        if (customerId && pageId) {
     
            getChatDetail({
            variables: {
              customerId: customerId,
              pageId:pageId
            },
          });
        }
    
      }, [customerId,pageId]);
    

  useEffect(()=>{
      if(getChatDetailQueryError){
          console.log('in error')
      }
    if(getChatDetailQueryResult && getChatDetailQueryResult.getChatDetail && getPagesQueryResult && getPagesQueryResult.pages ){
           
          const bigData = getChatDetailQueryResult.getChatDetail.map((curr)=>{
           
              return {
                  ...curr,
                  customerName:props.chatBoxFacebookIDsWithProfileDetails.find((customer)=>customer.id === getChatDetailQueryResult.getChatDetail[0].customerId)?props.chatBoxFacebookIDsWithProfileDetails.find((customer)=>customer.id === getChatDetailQueryResult.getChatDetail[0].customerId).name:'not fetched',
                  pageName:getPagesQueryResult.pages.find((page)=>page.pageId === getChatDetailQueryResult.getChatDetail[0].pageId).name,
                  lastseen:false
              }
          })
          if(bigData.length){
              for(let i = 0 ; i<bigData.length;i++){
                
                  if(bigData[i].receiptreadtimestamp && bigData[i].messagetype === 'outgoing'){
                        bigData.map((data)=>data.lastseen = false)
                        bigData[i].lastseen = true;
                  }
              }
            
             
          }
          setMessageData(bigData)
         
    }
    else{
      setMessageData([])

    }
  
  },[getChatDetailQueryResult])
  
return(
    <>
    {
      getChatDetailQueryLoading ?<div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}} ><div class="loader"></div></div> :
    
    messageData.length && getPagesQueryResult &&
    
    (
        <>
        <AppBar className={classes.header_main} color="transparent" position="static">

        <Typography className={props.className}>
      {`${messageData[0].customerName}  @${messageData[0].pageName}`}
    </Typography>
        </AppBar>
        <section>
            {
                messageData.map((message)=>(
                    message.messagetype === 'incoming' ?(
                    <Tooltip  arrow={true}
                    placement={"left"}
                    title={moment
                      .unix(message.messagetimestamp / 1000)
                      .format("DD MMM YYYY hh:mm a") }
                    ><span className="message incoming">{message.messagetext}</span></Tooltip>
                    ):message.messagetype === 'outgoing' ? (
                        <>
                       
                      <Tooltip arrow={true}
                        placement={"right"}
                        title={moment
                          .unix(message.messagetimestamp / 1000)
                          .format("DD MMM YYYY hh:mm a") }
                        ><span className="message outgoing"><div>{message.lastseen && ( <Tooltip arrow={true}
                            placement={"right"}
                            title={moment
                              .unix(message.receiptreadtimestamp / 1000)
                              .format("DD MMM YYYY hh:mm a") }
                            ><span className="seen">seen</span></Tooltip>)}</div><div>{message.messagetext}</div> </span></Tooltip>
                        </>
                    ):(
                        <Tooltip  arrow={true}
                    placement={"top"}
                    title={moment
                      .unix(message.messagetimestamp / 1000)
                      .format("DD MMM YYYY hh:mm a") }
                    ><span className="message label">{message.messagetext.includes("!-!-!-")
                    ? message.messagetext.split("!-!-!-")[0]
                    : message.messagetext}</span></Tooltip>
                    )
                ))
            }
        </section>
        </>
    )
    
    }
       
    </>
)
}
const mapStateToProps = (state) => {
  return {
    ...state.ChatBoxReducer,
    ...state.UserPanelReducer,
    ...state.AuthReducer,
    ...state.FollowUpDialogReducer,
    ...state.UsersListReducer,
  };
};
export default connect(mapStateToProps, {
  setChatBoxRecentChatListData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxLabelsPopoverAnchorEl,
  setChatBoxCustomerFormData,
  setChatBoxMessageData,
  setFollowUpDialogToggle,
  setFollowUpDialogDateTime,
  setChatBoxWindowSize,
  setChatBoxMessageTextInput,
  setChatBoxMessageTextBoxHeight,
  setChatBoxContainerChatSearchToggle,
  setChatBoxSearchText,
  setChatBoxContainerChatSearchCount,
  setChatBoxContainerChatSearchUpButtonToggle,
  setChatBoxContainerChatSearchDownButtonToggle,
  setChatBoxTypingMessageDetails,
})(ChatContainer);
