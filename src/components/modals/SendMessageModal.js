import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MessageUI from '../atoms/messageUI/MessageUI'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { gql } from "apollo-boost";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import { connect } from "react-redux";
import {
  IconButton,
  TextareaAutosize,
} from "@material-ui/core";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { useEffect,useState } from 'react';
import moment from 'moment';
import {
  setSmsChatListData
} from "../../store/actions/ChatBoxActions";

import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles((theme) => ({
  textFieldInputRoot: {
    width: "100%",
    background: "#eeeeee",
    border: "0px solid #d0d0d0",
    paddingLeft: "35px",
  },
  btnAdd:{
    color:'white',
    background:'rgba(85, 165, 48, 1)',
    padding:'7px 15px',
    border:'rgba(85, 165, 48, 1)',
    borderRadius:'3px',
    fontSize:'14px',
    marginLeft:'10px'
  },
  messageInput: {
    height: 41,

    padding: "0px 4px",
    borderBottom: 0,
  },
  messageTextBox: {
    margin: "16px 0 0 0",
    padding: "0 6px",
    outline: "none",
    font: "inherit",
    maxHeight: 100,
    flex: 1,
    minHeight: 40,
    paddingTop: 8,
    // paddingLeft: 8,
    paddingRight: "50px",
    paddingLeft: "15px",
    overflow: "auto!important",
    borderRadius: "20px",
    border: "1px solid lightgrey",
    width: "100%",
    resize: "none",
    marginBottom: "-6px",
  },
  sendMessageButton: {
     margin: "21px 0 0 10px",
    // alignSelf: "flex-end",
    background: "#56a530",
    color: "white",
      width:30,
     height: 30,
    borderRadius: "50%",
    fontSize: "12px",
    "&:hover": {
      background: "#9c9c9c",
    },
  }

}));



function SendMessageModal(props) {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [messages,setMessages] = useState([]);
  const [phone,setPhone] = useState();
  const [msgBody,setMsgBody] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const messagesEndRef = React.useRef(null);

  const [editPhoneNumber,setEditPhoneNumber] = useState(true);
  const emojiBtnRef = React.useRef();
  const emojiRef = React.useRef();
  const chatBoxMessageTextInputRef = React.useRef(null);
  const GetAllSmsMessagesQuery = gql`
  query getAllSmsMessages($customerId: String!, $agentId: ID!) {
    getAllSmsMessages(
      customerId: $customerId
      agentId: $agentId
    ) {
      customerId
      messageId
      messagetext
      messagetimestamp
      messagetype
      agentId
      phoneNumber
    }
  }
`;

const [
  getAllSmsMessages,
  {
    data: GetAllSmsMessagesQueryResult,
    loading: GetAllSmsMessagesQueryLoading,
    error: GetAllSmsMessagesQueryError,
  },
] = useLazyQuery(GetAllSmsMessagesQuery, {
  fetchPolicy: "network-only",
});
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}
useEffect(() => {
  if(  messagesEndRef &&   messagesEndRef.current){
    scrollToBottom()
  }
}, [props.smsChatListData]);

useEffect(() => {
  if (GetAllSmsMessagesQueryError) {
    GetAllSmsMessagesQueryError.graphQLErrors.map(
      ({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      }
    );
 
  }
}, [GetAllSmsMessagesQueryError]);

useEffect(()=>{
  if(GetAllSmsMessagesQueryResult && GetAllSmsMessagesQueryResult.getAllSmsMessages){
     let SmsMessagesArray = [];

     GetAllSmsMessagesQueryResult.getAllSmsMessages.map((curr)=>{

      let messagetime = moment
        .unix(curr.messagetimestamp / 1000)
        .format("DD MMM YYYY hh:mm a")

        let messageObj = {
            messageBody:curr.messagetext,
            messagetime:messagetime,
            messagetype:curr.messagetype
        }

        SmsMessagesArray.push(messageObj);
      
     })
     props.setSmsChatListData(SmsMessagesArray);
     setMessages(SmsMessagesArray);
  }
},[GetAllSmsMessagesQueryResult])



useEffect(()=>{
  getAllSmsMessages({
    variables: {
      customerId:props.customerId,
      agentId:props.agentId
    },
  });
},[props.customerId])


const addSMSChatToTwilioMutation = gql`
mutation addchattoTwilio(
  $agentId:ID
  $messagetext:String!
  $number:String!
  $customerId:String!
  $accountSID:String!
  $authToken:String!
  $twilioNumber:String!
  ) {
      addchattoTwilio(
      agentId:$agentId
      messagetext:$messagetext
      number:$number
      customerId:$customerId
      accountSID:$accountSID
      authToken:$authToken
      twilioNumber:$twilioNumber

  ) {
  success
  error
  result
  }
}

`;

let [
  addchattoTwilio,
  {
    loading: addSMSChatToTwilioMutationLoading,
    error: addSMSChatToTwilioMutationError,
    data: addSMSChatToTwilioMutationResult,
  },
] = useMutation(addSMSChatToTwilioMutation);

useEffect(() => {
  if (addSMSChatToTwilioMutationError) {
    addSMSChatToTwilioMutationError.graphQLErrors.map(({ message }, i) => {
      enqueueSnackbar(message, { variant: "error" });
    });
  }
}, [addSMSChatToTwilioMutationError]);

useEffect(() => {
  if (addSMSChatToTwilioMutationResult && addSMSChatToTwilioMutationResult.addchattoTwilio) {
    if (addSMSChatToTwilioMutationResult.addchattoTwilio.success) {
      props.smsChatListData.push({
          messageBody:msgBody,
          messagetimestamp:
          moment
    .unix( Date.now() / 1000)
    .format("DD MMM YYYY hh:mm a")
          ,
          messagetype:'ougoing'
      })
      props.setSmsChatListData(
        props.smsChatListData
      )
    
      setMsgBody("")
      enqueueSnackbar("Chat Added Successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar( addSMSChatToTwilioMutationResult.addchattoTwilio.error, {
        variant: "error",
      });
    }
  }
}, [addSMSChatToTwilioMutationResult]);
const sendSMSToTwilio = ()=>{
  if(msgBody && msgBody.length>1 && phone){
    addchattoTwilio({
      variables: {
        customerId: props.customerId,
        agentId: props.agentId,
        messagetext:msgBody,
        number:phone,
        accountSID:props.twilioConfig.accountSID,
        authToken:props.twilioConfig.authToken,
        twilioNumber:props.twilioConfig.phoneNumber
      },
    });
  }

}


const handleClickOutsideEmoji = (event) => {
  if (
    emojiRef &&
    !emojiRef?.current?.contains(event.target) &&
    !emojiBtnRef?.current?.contains(event.target) &&
    emojiShow
  ) {
    setEmojiShow(false);
  }
};

const onEmojiClick = (event, emojiObject) => {
  const cursor = chatBoxMessageTextInputRef.current.selectionStart;
  const text =
    msgBody.slice(0, cursor) +
    emojiObject.emoji +
    msgBody.slice(cursor);

  setMsgBody(text);

};


useEffect(() => {
  document.addEventListener("mousedown", handleClickOutsideEmoji);
  return () => {
    document.removeEventListener("mousedown", handleClickOutsideEmoji);
  };
});
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{border:'none'}} closeButton>
        <Modal.Title style={{fontFamily:'poppins',fontSize:'20px'}} id="contained-modal-title-vcenter">
      {
        editPhoneNumber && <div style={{display:'flex',alignItems:'center'}}>
        <PhoneInput
                    
                    country={'us'}
                    value={phone}
                    onChange={phone => setPhone(phone)}
                    />  
             <button 
          
          onClick={()=>setEditPhoneNumber(false)}
           className={classes.btnAdd}
           >
           Add
           </button>
        </div>
      }
       
       {
        !editPhoneNumber &&  <div>
        <span style={{fontFamily:'poppins',fontSize:'14px',color:'black',cursor:'pointer'}} onClick={()=>setEditPhoneNumber(true)}>Edit Number</span>
       </div>
       }
      
                 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div style={{height:'400px',overflowY:'auto'}}>
        {
          props.smsChatListData &&  props.smsChatListData.length &&  props.smsChatListData.map((curr)=> curr.messagetype == 'incoming' ? 
          
          <>
          <div style={{display:'flex',alignItems:'flex-end',marginBottom:'10px'}}>
        <MessageUI type="incoming" messagedata ={curr} />
        </div>
          </>:
          
          <>
            <div style={{display:'flex',alignItems:'flex-end',marginBottom:'10px'}}>
        <MessageUI type="outgoing" messagedata = {curr}/>
        <CheckCircleIcon style={{color:'lightgrey',fontSize:'16px',marginLeft:'5px'}}/>
        </div>
          </>)
        }
          <div ref={messagesEndRef}></div>
        </div>
        <div style={{display:'flex',height:'70px'}}>
        <TextareaAutosize
                       
                          ref={chatBoxMessageTextInputRef}
                          disabled={!props.chatBoxSubscriptionStatus}
                          onKeyPress={(e) => {
                            if (e.keyCode == 13 && !e.shiftKey) {
                              e.preventDefault();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.keyCode == 13 && !e.shiftKey) {
                              sendSMSToTwilio()
                              e.preventDefault();
                            }
                          }}
                          value={msgBody}
                          onInput={
                            (e) => setMsgBody(e.target.value)
                          
                          }
                          InputProps={{
                            classes: {
                              input: classes.messageInput,
                            },
                          }}
                       
                          placeholder={"Type message"}
                          autoFocus
                          className={classes.messageTextBox}
                        />

                        <IconButton
                          style={{
                            position: "absolute",
                            bottom: "32px",
                            right: "65px",
                            padding: "5px",
                          }}
                          ref={emojiBtnRef}
                          onClick={() => {
                            setEmojiShow(!emojiShow);
                          }}
                        >
                          <EmojiEmotionsIcon
                            style={{ color: "#55a530", fontSize: "" }}
                          />
                        </IconButton>

                        <IconButton
                       disabled={addSMSChatToTwilioMutationLoading}
                      onClick={() => {
                        sendSMSToTwilio();
                       
                      }}
                      className={classes.sendMessageButton}
                    >
                      { 
                        <>
                          <SendIcon
                            style={{ marginLeft: "3px", fontSize: "17px" }}
                          />
                        </>
                      }
                    </IconButton>

                    {emojiShow && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "75px",
                          right: "20px",
                        }}
                        ref={emojiRef}
                      >
                        <Picker onEmojiClick={onEmojiClick} />
                      </div>
                    )}
        </div>
      </Modal.Body>
    
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.ChatBoxReducer,
  };
};
export default connect(mapStateToProps, {
  setSmsChatListData,
})(SendMessageModal);
