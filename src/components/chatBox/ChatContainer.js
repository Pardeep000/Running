import { green } from "console-log-colors";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import codeToEmoji from "./ChatContainerComponents/codeToEmoji";
import {
  Container,
  Avatar,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InfoIcon from "@mui/icons-material/Info";
import DownloadIcon from "@mui/icons-material/Download";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import moment from "moment";
import { useSnackbar } from "notistack";
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
  // setChatBoxMarkNotToAddInChatCircleForLabel,
} from "../../store/actions/ChatBoxActions";
import {
  setFollowUpDialogToggle,
  setFollowUpDialogDateTime,
} from "../../store/actions/FollowUpDialogActions";
import highlightSearchIncludes from "./highlightSearchIncludes";
// import ChatContainerTypingMessageStatus from "./ChatContainerTypingMessageStatus";
import axios from "axios";
import "./report.css";
import includes from "./includes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router-dom";
import arrowUp from "../../assets/chatWindow/Icons-chevron-up.svg";
import arrowDown from "../../assets/chatWindow/Icons-chevron-down.svg";
import useRecorder from "./useRecorder";
import ChatContainerHeader from "./ChatContainerComponents/ChatContainerHeader";
import IncomingMessageContainer from "./ChatContainerComponents/IncomingMessageContainer";
import OutgoingMessageContainer from "./ChatContainerComponents/OutgoingMessageContainer";
import LabelMessageContainer from "./ChatContainerComponents/LabelMessageContainer";
import expressConfig from "../../config/express.json";
import BottomChatContainer from "./ChatContainerComponents/BottomChatContainer";
import { alertTitleClasses } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  color: {
    color: "red",
  },
  track: {
    width: "85% !important",
    height: "85% !important",
  },
  customerIcon2: {
    marginLeft: "10px",
    width: "30Px",
    height: "30px",
    marginBottom: "-5%",
  },

  paper: {
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  messageBox: {
    background: "white",
    overflow: "auto",
  },

  loadingCircularProgress: {
    marginTop: 250,
    width: "100%",
    height: "calc(100vh - 100px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },

  clearSearchButton: {
    padding: 10,
    display: "inline",
    cursor: "pointer",
    fontSize: "12px",
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
    borderRadius: "20px",
    background: "#eeeeee",
    padding: 8,
    marginTop: "-3px",
    // paddingLeft: "-20px",
    width: "78%",
    marginLeft: "17px",
    paddingLeft: "30px !important",
    marginBottom: "-8px !important",
  },
  chatBoxSearchTextFieldInputRoot: {
    border: "none !important",
    padding: 0,
    cursor: "auto",
    "&:hover": {
      border: "none",
    },
    "&:focus": {},
  },
  chatBoxSearchText: {
    width: "100%",
  },
  chatMainContainerStyles: {
    border: "1px solid lightgrey",
  },
  chatStartedFirstLine: {
    fontFamily: "Poppins",
    width: "95%",
    margin: "20px auto 20px auto",
    textAlign: "center",
    borderBottom: " 1px solid rgba(119, 119, 119,.5)",
    lineHeight: "0.1em",
  },
  chatStartedFirstLineText: {
    background: "white",
    padding: "0px 10px",
    color: "#777777",
    fontFamily: "Poppins",
    fontSize: "13.5px",
  },
}));
const ChatContainer = (props) => {
  let { customerId } = useParams();
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  const [change, setChange] = useState(false);
  const [url, setaudioURL] = useState("");
  const env = process.env.NODE_ENV || "development";
  const [searchText, setSearchText] = useState("");
  const [file, setFile] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [emojiShow, setEmojiShow] = useState(false);
  const [closeSavedRepliesWindow, setcloseSavedRepliesWindow] = useState(false);
  const [closeDisabled, setCloseDisabled] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [containerHeight, setContainerHeight] = useState(150);
  const closeChatWindowHandler = useCallback((cid) => {
    _.remove(
      props.chatBoxSelectedChatsOnFloating,
      (itm) => itm.customerId == cid
    );
  });
  const [ImageState, setImageState] = useState();
  const [ImageId, setImageId] = useState();
  const [farwardIcon, setfarwardIcon] = useState(true);
  const [backwardIcon, setbackwardIcon] = useState(true);
  const config = expressConfig[env];

  const onEmojiClick = (event, emojiObject) => {
    const cursor = chatBoxMessageTextInputRef.current.selectionStart;
    const text =
      props.chatBoxMessageTextInput.slice(0, cursor) +
      emojiObject.emoji +
      props.chatBoxMessageTextInput.slice(cursor);
    props.setChatBoxMessageTextInput(text);
    setTextFieldValue(text);
  };

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const AddChatToFacebookQuery = gql`
    mutation AddChatToFacebook(
      $customerId: String!
      $pageId: String!
      $message: String
      $filePath: String
      $filename: String
      $mediatype: String
      $outgoingMessageId: String!
      $accesstoken: String
    ) {
      addchattofacebook(
        customerId: $customerId
        pageId: $pageId
        message: $message
        filePath: $filePath
        filename: $filename
        mediatype: $mediatype
        outgoingMessageId: $outgoingMessageId
        accesstoken: $accesstoken
      ) {
        success
        error
        result
      }
    }
  `;

  let [
    addChatToFacebook,
    {
      loading: addChatToFacebookQueryLoading,
      error: addChatToFacebookQueryError,
      data: addChatToFacebookQueryResult,
    },
  ] = useMutation(AddChatToFacebookQuery);
  useEffect(() => {
    if (addChatToFacebookQueryError) {
      addChatToFacebookQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [addChatToFacebookQueryError]);

  var messages = _.find(
    props.chatBoxMessageData,
    (itm) =>
      itm?.customerId == props?.itemData?.customerId &&
      itm?.pageId == props?.itemData?.pageId
  );

  const onEnterMessageTextInput = (e) => {
    props.setChatBoxMessageTextInput(e.target.value);
    setTextFieldValue(e.target.value);
    if (e.target.value) {
      let searchString = e.target.value;
      if (searchString) {
        setSearchText(searchString);
      } else {
        setSearchText("");
      }
    } else {
      setSearchText("");
    }
  };

  useEffect(() => {
    if (props.chatBoxMessageTextInput.length) {
      props.chatBoxMessageTextInput.length <= 0 && setSearchText("");
    }
  }, [props.chatBoxMessageTextInput]);
  useEffect(() => {
    if (props.chatBoxSelectedChatsOnFloating) setCloseDisabled(false);
  }, [props.chatBoxSelectedChatsOnFloating]);
  useEffect(() => {
    if (
      addChatToFacebookQueryResult &&
      addChatToFacebookQueryResult.addchattofacebook
    ) {
      // alert(addChatToFacebookQueryResult.addchattofacebook.success)
      if (addChatToFacebookQueryResult.addchattofacebook.success) {
        // console.log(messages, "messages")
        if (messages) {
          var result = JSON.parse(
            addChatToFacebookQueryResult.addchattofacebook.result
          );
          console.log(result, "result");
          // console.log(result, "result");
          // console.log(messages.messages, "messages messages")
          // alert(result)
          var findItem = _.find(
            messages.messages,
            (item) => item.outgoingMessageId == result.outgoingMessageId
          );
          // console.log(findItem, "FIND ITEM")
          console.log(findItem, "result");
          console.log(messages.messages.length, "result");
          if (findItem) {
            _.remove(
              messages.messages,
              (item) => item.messageId == result.message_id
            ); // removing if its already been added in subscription

            findItem.loading = false;
            findItem.messageId = result.message_id;

            // removing image which has loading true and in the state twice (once having null as an messageId)
            // alert("1")
            _.remove(messages.messages, (item) => item.messageId == null);
            // alert("2")

            props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
          }

          // let findNullMessageIdItem = _.find(messages.messages, item => item.messageId == null)
          // if (findNullMessageIdItem){
          //   _.remove(messages.messages, item => item)
          // }
        }
      } else {
        if (messages) {
          enqueueSnackbar(
            addChatToFacebookQueryResult.addchattofacebook.error,
            {
              variant: "error",
            }
          );
          if (findItem) {
            findItem.loading = false;
            addChatDetail({
              variables: {
                customerId: findItem.customerId,
                pageId: findItem.pageId,
                messageId: findItem.uid,
                messagetext: props.chatBoxMessageTextInput,
                messagetimestamp: (moment().unix() * 1000).toString(),
                messagetype: "outgoing",
                agentId: userIdForChatContainerQuery,
                alternateagentId: props.authUserId,
                read: 1,
              },
            });
            findItem.error =
              addChatToFacebookQueryResult.addchattofacebook.error;
            props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
          }
        }
      }
    }
  }, [addChatToFacebookQueryResult]);

  const AddChatDetailQuery = gql`
    mutation AddChatDetail(
      $customerId: String!
      $pageId: String!
      $messageId: String
      $messagetext: String!
      $messagetimestamp: String!
      $messagetype: String!
      $agentId: ID!
      $alternateagentId: ID
      $read: Int!
    ) {
      addchatdetail(
        customerId: $customerId
        pageId: $pageId
        messageId: $messageId
        messagetext: $messagetext
        messagetimestamp: $messagetimestamp
        messagetype: $messagetype
        agentId: $agentId
        alternateagentId: $alternateagentId
        read: $read
      ) {
        success
        error
      }
    }
  `;

  let [
    addChatDetail,
    // {
    //   loading: __,
    //   error: addChatDetailQueryError,
    //   data: addChatDetailQueryResult,
    // },
  ] = useMutation(AddChatDetailQuery);

  const hiddenFileInput = useRef(null);

  // const chatBoxMessageTextInputDivRef = useRef(null);

  const handleFarward = () => {
    var scrollOffset = 40;
    inerRef.current.scrollLeft += scrollOffset;

    for (let i = 0; i < chatpictureState.length; i++) {
      if (chatpictureState.length > i) {
        if (ImageState?.id == chatpictureState[i]?.id) {
          setImageState(chatpictureState[i + 1]);
          setImageId(chatpictureState[i + 1]?.id);
          setfarwardIcon(true);
          setbackwardIcon(true);
        }
      }
      if (ImageState?.id == chatpictureState[chatpictureState.length - 1]?.id) {
        setfarwardIcon(false);
        setImageState(chatpictureState[chatpictureState.length - 1]);
        setImageId(chatpictureState[chatpictureState.length - 1]?.id);
        setbackwardIcon(true);
      }
    }
  };

  const [infodown, setInfoDown] = useState(false);

  const handleInfo = () => {
    setInfoDown(!infodown);
  };
  const handledownloadImage = (e) => {
    fetch(ImageState?.file, {
      method: "GET",
      // mode: "no-cors",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.download = "imagex.jpg";
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackward = () => {
    var scrollOffset = -30;
    inerRef.current.scrollLeft += scrollOffset;

    for (let i = 0; i < chatpictureState.length; i++) {
      if (ImageState?.id == chatpictureState[i]?.id) {
        setImageState(chatpictureState[i - 1]);
        setImageId(chatpictureState[i - 1]?.id);
        setbackwardIcon(true);
        setfarwardIcon(true);
      }
      if (ImageState?.id == chatpictureState[0]?.id) {
        setImageState(chatpictureState[0]);
        setImageId(chatpictureState[0]?.id);
        setbackwardIcon(false);
        setfarwardIcon(true);
      }
    }
  };
  //////////////////////////////////////
  // const handleChange = async (event) => {
  //   const fileUploaded = event.target.files[0];
  //   setIsShown(true);

  //   setFile(fileUploaded);
  //   setContainerHeightFunction(
  //     chatBoxMessageTextInputDivRef.current.clientHeight
  //   );
  // };
  const ChatDetailsByAgentCutomerPageIdQuery = gql`
    query ChatDetailsByAgentCutomerPageId(
      $userID: ID!
      $customerId: String!
      $pageId: String!
      $markChatRead: Boolean!
    ) {
      chatdetailsbyagentcutomerpageid(
        userID: $userID
        customerId: $customerId
        pageId: $pageId
        markChatRead: $markChatRead
      ) {
        id
        customerId
        pageId
        messageId
        messagetext
        file
        mediatype
        messagetimestamp
        messagetype
        agentId
        alternateagentId
        read
        deliverytimestamp
        receiptreadtimestamp
        marknottoaddinchatcircle
      }
    }
  `;

  let [
    chatDetailsByAgentCutomerPageId,
    {
      loading: chatDetailsByAgentCutomerPageIdQueryLoading,
      error: chatDetailsByAgentCutomerPageIdQueryError,
      data: chatDetailsByAgentCutomerPageIdQueryResult,
    },
  ] = useLazyQuery(ChatDetailsByAgentCutomerPageIdQuery, {
    fetchPolicy: "network-only",
  });
  const getInboxDataQuery = gql`
    query getInboxData($userID: ID!, $customerId: String!, $pageId: String!) {
      getInboxData(userID: $userID, customerId: $customerId, pageId: $pageId) {
        id
        customerId
        pageId
        messageId
        agentId
        read
        deliverytimestamp
        receiptreadtimestamp
        marknottoaddinchatcircle
      }
    }
  `;

  let [
    getInboxData,
    {
      // loading: getInboxDataQueryLoading,
      // error: getInboxDataQueryError,
      data: getInboxDataQueryResult,
    },
  ] = useLazyQuery(getInboxDataQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (chatDetailsByAgentCutomerPageIdQueryError) {
      setTimeout(() => {
        callChatDetailsByAgentCutomerPageId();
      }, 1000);
    }
  }, [chatDetailsByAgentCutomerPageIdQueryError]);

  useEffect(() => {
    if (
      chatDetailsByAgentCutomerPageIdQueryResult &&
      chatDetailsByAgentCutomerPageIdQueryResult.chatdetailsbyagentcutomerpageid &&
      getInboxDataQueryResult &&
      getInboxDataQueryResult.getInboxData
    ) {
      var chatData = {
        pageId: props?.itemData?.pageId,
        customerId: props?.itemData?.customerId,
        messages: [],
      };
      getInboxDataQueryResult.getInboxData[0].marknottoaddinchatcircle
        ? setCloseDisabled(true)
        : setCloseDisabled(false);

      chatDetailsByAgentCutomerPageIdQueryResult.chatdetailsbyagentcutomerpageid.map(
        (messages) => {
          var messageText =
            messages.messagetype == "followuplabel"
              ? JSON.parse(messages.messagetext)
              : messages.messagetext;

          messageText =
            messages.messagetype == "followuplabel"
              ? `${messageText[0]} at ${moment
                .unix(messageText[1] / 1000)
                .format("yyyy-MM-DD hh:mm A")}`
              : messageText;
          var newmessagetext = messageText;
          chatData.messages.push({
            loading: false,
            id: messages.id,
            text: newmessagetext,
            timestamp: messages.messagetimestamp,
            type: messages.messagetype,
            messageId: messages.messageId,
            deliverytimestamp:
              getInboxDataQueryResult.getInboxData[0].deliverytimestamp,
            receiptreadtimestamp:
              getInboxDataQueryResult.getInboxData[0].receiptreadtimestamp,
            marknottoaddinchatcircle:
              getInboxDataQueryResult.getInboxData[0].marknottoaddinchatcircle,
            file: messages.file,
            mediatype: messages.mediatype,
          });
        }
      );
      var prevChatData = _.find(
        props.chatBoxMessageData,
        (itm) =>
          itm?.customerId == props?.itemData?.customerId &&
          itm?.pageId == props?.itemData?.pageId
      );
      if (!prevChatData) {
        props.chatBoxMessageData.push(chatData);
      } else {
        prevChatData.messages = chatData.messages;
      }

      props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
    }
  }, [chatDetailsByAgentCutomerPageIdQueryResult, getInboxDataQueryResult]);

  const setInputTextField = (data) => {
    props.setChatBoxMessageTextInput(data);
    setTextFieldValue(data);
  };

  useEffect(() => {
    if (props.itemData) {
      props.setChatBoxTypingMessageDetails(null);
      if (
        props.chatBoxRecentSearchText != "" &&
        props.chatBoxRecentSearchChatIds.length > 0
      ) {
        props.setChatBoxContainerChatSearchToggle(true);
        props.setChatBoxSearchText(props.chatBoxRecentSearchText);
      }

      callChatDetailsByAgentCutomerPageId();
    }
  }, [props.itemData]);

  useEffect(() => {
    if (props.chatBoxSubscriptionStatus)
      if (props.itemData) {
        callChatDetailsByAgentCutomerPageId();
      }
  }, [props.chatBoxSubscriptionStatus, customerId]);

  var userIdForChatContainerQuery =
    new includes().getUserIdForChatContainerQuery(props.itemData);

  const callChatDetailsByAgentCutomerPageId = () => {
    chatDetailsByAgentCutomerPageId({
      variables: {
        userID: userIdForChatContainerQuery,
        customerId: props.itemData.customerId,
        pageId: props.itemData.pageId,
        markChatRead: !props.itemData.read,
      },
    });
    getInboxData({
      variables: {
        userID: userIdForChatContainerQuery,
        customerId: props.itemData.customerId,
        pageId: props.itemData.pageId,
      },
    });
  };

  const messageContainerRef = useRef(null);
  useEffect(() => {
    if (messageContainerRef.current)
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
  }, [messages]);

  const mainContainerRef = useRef();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      props.setChatBoxWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown, false);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []); // Empty array ensures that effect is only run on mount

  const chatBoxContainerChatSearchToggleRef = useRef(null);
  chatBoxContainerChatSearchToggleRef.current =
    props.chatBoxContainerChatSearchToggle;

  const handleKeyDown = (event) => {
    if (event.keyCode == 70 && event.ctrlKey) {
      event.preventDefault();

      if (chatBoxContainerChatSearchToggleRef.current) {
        props.setChatBoxSearchText("");
        props.setChatBoxContainerChatSearchToggle(false);
      } else {
        props.setChatBoxContainerChatSearchToggle(true);
      }
    }
  };
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  useEffect(() => {
    if (chatBoxMessageTextInputRef.current) {
      setContainerHeightFunction(
        chatBoxMessageTextInputRef.current.clientHeight
      );
    }
  }, [isShown]);
  const setContainerHeightFunction = (h) => {
    let initialHeight = 120;
    let height =
      h === 40 && isShown
        ? initialHeight + 75
        : h === 40 && !isShown
          ? initialHeight + 25
          : h === 56 && !isShown
            ? initialHeight + 15 + 25
            : h === 56 && isShown
              ? initialHeight + 15 + 75
              : h === 80 && !isShown
                ? initialHeight + 40 + 25
                : h === 80 && isShown
                  ? initialHeight + 40 + 75
                  : h === 100 && !isShown
                    ? initialHeight + 65 + 25
                    : h === 100 && isShown
                      ? initialHeight + 65 + 75
                      : initialHeight;
    setContainerHeight(height);
  };

  useEffect(() => {
    setIsShown(false);
  }, [props?.itemData?.customerId]);

  const addMessageInputText = useCallback(async () => {
    // alert("addMessageInputText")

    // setState1(false);
    if (audioURL != "" && audioURL != undefined && audioURL != null) {
      if (audioURL != url) {
        setChange(false);
        // setState1(true);
        setaudioURL(audioURL);
        var uid1 = guidGenerator();

        addChatToFacebook({
          variables: {
            customerId: props.itemData.customerId,
            pageId: props.itemData.pageId,
            message: "",
            filename: audioURL,
            mediatype: "audio",
            filePath: res?.data?.filePath,
            outgoingMessageId: uid1,
            accesstoken: pageDataForAccessToken?.accesstoken,
          },
        });

        props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));

        props.setChatBoxMessageTextInput("");
        setTextFieldValue("");
      }

      setSearchText("");
    }

    if (file) {
      setIsShown(false);
      // console.log((props.chatBoxMessageTextInput))
      const formData = new FormData();

      formData.append("file", file);

      var res = await axios.post(
        `${config.graphql_domain}:${config.port}/uploads`,
        formData
      );
      var pageDataForAccessToken = _.find(
        props.authPagesData,
        (pages) => pages.pageId == props.itemData.pageId
      );
      if (pageDataForAccessToken) {
        var uid = guidGenerator();
        messages.messages.push({
          loading: true,
          text: "",
          timestamp: moment().unix() * 1000,
          type: "outgoing",
          messageId: null,
          outgoingMessageId: uid,
          file: res.data.filePath,
          name: file.name,
          mediatype: file.type ? file.type : "file",
        });
        console.log(props.chatBoxMessageTextInput, "chatBoxMessageTextInput");
        console.log(res.data.filePath, "filePath");
        console.log(file.name, "filePath");
        console.log(file.type, "filePath");

        addChatToFacebook({
          variables: {
            customerId: props.itemData.customerId,
            pageId: props.itemData.pageId,
            message: "",
            filename: file.name,
            mediatype: file.type,
            filePath: res.data.filePath,
            outgoingMessageId: uid,
            accesstoken: pageDataForAccessToken.accesstoken,
          },
        });
        // console.log(props.chatBoxMessageData, "before")
        props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
        // console.log(props.chatBoxMessageData, "after")

        props.setChatBoxMessageTextInput("");
        setTextFieldValue("");
      } else {
        enqueueSnackbar(`${props.itemData.pageId} page id not found.`, {
          variant: "error",
        });
      }
      setFile(null);
      // return;
    }
    // alert("not breakin funcoit")
    if (props.chatBoxMessageTextInput != "") {
      // console.log("dad")
      var pageDataForAccessToken = _.find(
        props.authPagesData,
        (pages) => pages.pageId == props.itemData.pageId
      );
      if (pageDataForAccessToken) {
        let uid = guidGenerator();
        const match = props.chatBoxMessageTextInput.match(
          /\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/gi
        );

        messages.messages.push({
          loading: true,
          text: codeToEmoji(props.chatBoxMessageTextInput),
          timestamp: moment().unix() * 1000,
          type: "outgoing",
          messageId: null,
          outgoingMessageId: uid,
        });

        addChatToFacebook({
          variables: {
            customerId: props.itemData.customerId,
            pageId: props.itemData.pageId,
            message: codeToEmoji(props.chatBoxMessageTextInput),
            outgoingMessageId: uid,
            accesstoken: pageDataForAccessToken.accesstoken,
          },
        });

        props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));

        props.setChatBoxMessageTextInput("");
        setTextFieldValue("");
      } else {
        enqueueSnackbar(`${props.itemData.pageId} page id not found.`, {
          variant: "error",
        });
      }
    }
  });

  const chatBoxMessageTextInputRef = useRef(null);

  const setChatBoxMessageTextInput = () => {
    if (chatBoxMessageTextInputRef.current) {
      setContainerHeightFunction(
        chatBoxMessageTextInputRef.current.clientHeight
      );
      props.setChatBoxMessageTextBoxHeight(
        chatBoxMessageTextInputRef.current.clientHeight
      );
    }
  };
  useEffect(() => {
    setChatBoxMessageTextInput();
  }, [chatBoxMessageTextInputRef]);

  var outgoingMessageSeenLastItem =
    messages &&
    _.last(
      _.filter(
        messages.messages,
        (mess) => mess.type == "outgoing" && mess.receiptreadtimestamp
      )
    );

  var outgoingMessageDeliveredLastItem =
    messages &&
    _.last(
      _.filter(
        messages.messages,
        (mess) =>
          mess.type == "outgoing" &&
          mess.deliverytimestamp &&
          !mess.receiptreadtimestamp
      )
    );

  var searchCount = 0;

  useEffect(() => {
    if (props.chatBoxSearchText != "") {
      if (messageContainerRef.current) {
        props.setChatBoxContainerChatSearchCount(0);
        new highlightSearchIncludes().showNextSearch(
          0,
          messageContainerRef.current,
          props.setChatBoxContainerChatSearchCount,
          props.setChatBoxContainerChatSearchUpButtonToggle,
          props.setChatBoxContainerChatSearchDownButtonToggle
        );
      } else {
        props.setChatBoxContainerChatSearchUpButtonToggle(false);
        props.setChatBoxContainerChatSearchDownButtonToggle(false);
      }
    } else {
      props.setChatBoxContainerChatSearchUpButtonToggle(false);
      props.setChatBoxContainerChatSearchDownButtonToggle(false);
    }
  }, [props.chatBoxSearchText, messageContainerRef, props.itemData, messages]);
  const parseNameFromURL = (url) => {
    let myArray = [];
    if (url && url.length) {
      myArray = url.split("?")[0];
    }
    let name = [];

    for (let i = myArray.length; i >= 0; i--) {
      if (myArray[i] == "/") break;
      name.push(myArray[i]);
    }
    let subfinal = name.reverse();
    let final = subfinal.join("");
    return final;
  };
  const MessageTypingStatusChanged = gql`
    mutation MessageTypingStatusChanged(
      $customerId: String!
      $pageId: String!
      $agentId: ID!
      $userId: ID!
      $username: String!
    ) {
      messagetypingstatuschanged(
        customerId: $customerId
        pageId: $pageId
        agentId: $agentId
        userId: $userId
        username: $username
      ) {
        agentId
        userId
        username
      }
    }
  `;

  let [messageTypingStatusChanged, { }] = useMutation(
    MessageTypingStatusChanged
  );
  function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 =
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(
      replacePattern1,
      '<a style="color:white; overflow-wrap: break-word;" href="$1" target="_blank">$1</a>'
    );

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(
      replacePattern2,
      '$1<a style="color:white; overflow-wrap: break-word;" href="http://$2" target="_blank">$2</a>'
    );

    //Change email addresses to mailto:: links.
    replacePattern3 =
      /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(
      replacePattern3,
      '<a style="color:white; overflow-wrap: break-word;" href="mailto:$1">$1</a>'
    );

    return replacedText;
  }

  var chatBoxMessageTextInputTimeOutForMessageTypingStatus = null;
  useEffect(() => {
    if (chatBoxMessageTextInputTimeOutForMessageTypingStatus)
      chatBoxMessageTextInputTimeOutForMessageTypingStatus.clear();

    if (props.chatBoxMessageTextInput != "") {
      chatBoxMessageTextInputTimeOutForMessageTypingStatus = setTimeout(
        () => {
          messageTypingStatusChanged({
            variables: {
              customerId: props.itemData.customerId,
              pageId: props.itemData.pageId,
              agentId: userIdForChatContainerQuery,
              userId: props.authUserId,
              username: props.authUserName,
            },
          });
        },

        500
      );
    }
  }, [props.chatBoxMessageTextInput]);
  const ImageRef = useRef();
  const inerRef = useRef(null);

  const wrapperRef = useRef();
  const buttonRef = useRef();
  const emojiBtnRef = useRef();
  const emojiRef = useRef();

  const closeLabelAction = useCallback(() => {
    addChatDetail({
      variables: {
        customerId: props.itemData.customerId,
        pageId: props.itemData.pageId,
        messageId: null,
        messagetext: "Close",
        messagetimestamp: (moment().unix() * 1000).toString(),
        messagetype: "closelabel",
        agentId: userIdForChatContainerQuery,
        alternateagentId: props.authUserId,
        read: 1,
      },
    });
    setCloseDisabled(true);
  }, [closeDisabled]);
  const chatContainerHeader = useMemo(
    () => (
      <ChatContainerHeader
        closeDisabled={closeDisabled}
        closeLabelAction={closeLabelAction}
        closeChatWindowHandler={closeChatWindowHandler}
        chatBoxSelectedChatsOnFloating={props.chatBoxSelectedChatsOnFloating}
        chatTabHeaderStyles={props.chatTabHeaderStyles}
        setChatBoxSelectedChatsOnFloating={
          props.setChatBoxSelectedChatsOnFloating
        }
        itemData={props.itemData}
        setChatBoxContainerChatSearchToggle={
          props.setChatBoxContainerChatSearchToggle
        }
      />
    ),
    [closeDisabled]
  );
  const handleClickOutside = (event) => {
    if (
      wrapperRef &&
      !wrapperRef?.current?.contains(event.target) &&
      !buttonRef?.current?.contains(event.target) &&
      closeSavedRepliesWindow
    ) {
      setcloseSavedRepliesWindow(false);
    }
  };
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideEmoji);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEmoji);
    };
  });

  const [open, setOpen] = useState(false);
  const [chatpictureState, setchatpictureState] = useState();
  const handleClickOpen = (props) => {
    var temporarypicturesarray = [];
    setImageState(props);
    setImageId(props?.id);
    setOpen(true);
    chatDetailsByAgentCutomerPageIdQueryResult?.chatdetailsbyagentcutomerpageid?.map(
      (item) => {
        if (item.file != null && item.mediatype == "image") {
          temporarypicturesarray.push(item);
        }
      }
    );
    setchatpictureState(temporarypicturesarray);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  return (
    <>
      <Container
        maxWidth={false}
        ref={mainContainerRef}
        disableGutters={true}
        className={props.chatMainContainerStyles}
        style={{ filter: open ? "blur(80px)" : "" }}
      >
        {!messages || chatDetailsByAgentCutomerPageIdQueryLoading ? (
          <CircularProgress
            className={classes.loadingCircularProgress}
            size={24}
          />
        ) : (
          <div
            style={{
              border: "1px solid grey",
              height: "calc(100vh - 65px)",
            }}
          >
            {/* header of chat container */}
            { }

            {/* end */}

            <Container maxWidth={false} disableGutters={true}>
              {props.chatBoxContainerChatSearchToggle && (
                <Container
                  style={{
                    background: "#fff",
                    marginTop: "8px",

                    // border:"5px solid green"
                  }}
                  disableGutters={true}
                >
                  <TextField
                    autoFocus={true}
                    value={props.chatBoxSearchText}
                    onInput={(e) => {
                      props.setChatBoxSearchText(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <Container
                          disableGutters={true}
                          className={classes.chatBoxSearchToolbar}
                        >
                          <IconButton
                            disabled={
                              !props.chatBoxContainerChatSearchUpButtonToggle
                            }
                            className={classes.chatBoxSearchUpButton}
                            onClick={() => {
                              new highlightSearchIncludes().showPrevSearch(
                                props.chatBoxContainerChatSearchCount,
                                messageContainerRef.current,
                                props.setChatBoxContainerChatSearchCount,
                                props.setChatBoxContainerChatSearchUpButtonToggle,
                                props.setChatBoxContainerChatSearchDownButtonToggle
                              );
                            }}
                          >
                            <img
                              src={arrowUp}
                              alt=""
                              style={{ width: "15px" }}
                            />
                          </IconButton>
                          <IconButton
                            className={classes.chatBoxSearchDownButton}
                            disabled={
                              !props.chatBoxContainerChatSearchDownButtonToggle
                            }
                            onClick={() => {
                              new highlightSearchIncludes().showNextSearch(
                                props.chatBoxContainerChatSearchCount,
                                messageContainerRef.current,
                                props.setChatBoxContainerChatSearchCount,
                                props.setChatBoxContainerChatSearchUpButtonToggle,
                                props.setChatBoxContainerChatSearchDownButtonToggle
                              );
                            }}
                          >
                            <img
                              alt=""
                              src={arrowDown}
                              style={{ marginLeft: "10px", width: "15px" }}
                            />
                          </IconButton>

                          <p
                            className={classes.clearSearchButton}
                            onClick={() => {
                              props.setChatBoxSearchText("");
                              props.setChatBoxContainerChatSearchToggle(false);
                            }}
                          >
                            Close
                          </p>
                        </Container>
                      ),
                      classes: {
                        input: classes.chatBoxSearchTextFieldInput,
                        root: classes.chatBoxSearchTextFieldInputRoot,
                      },
                    }}
                    className={classes.chatBoxSearchText}
                    InputAdornmentProps={{
                      position: "end",
                      style: { order: 2, marginLeft: 0 },
                    }}
                    placeholder="Search"
                    variant={"standard"}
                  ></TextField>
                </Container>
              )}
              {/* search  */}
              <Container
                ref={messageContainerRef}
                maxWidth={false}
                disableGutters={true}
                style={{
                  height: `calc(100vh - ${props.authMainAppBarHeight
                    }px - 10px - ${containerHeight}px - ${props.chatBoxContainerChatSearchToggle ? "46" : "0"
                    }px `,
                }}
                className={classes.messageBox}
              >
                {chatDetailsByAgentCutomerPageIdQueryLoading ? (
                  <CircularProgress
                    className={classes.loadingCircularProgress}
                    size={24}
                  />
                ) : (
                  <>
                    {messages &&
                      messages.messages &&
                      messages.messages.length ? (
                      <div className={classes.chatStartedFirstLine}>
                        <span className={classes.chatStartedFirstLineText}>
                          Chat started:{" "}
                          <span>
                            {moment
                              .unix(messages.messages[0].timestamp / 1000)
                              .format("DD MMM YYYY hh:mm a")}
                          </span>
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {messages.messages.map((item, index, { length }) => {
                      // console.log(item, "message")
                      var textCreated =
                        new highlightSearchIncludes().getSearchContentText(
                          props.chatBoxSearchText,
                          item.text
                        );

                      if (textCreated.containsSearch) searchCount++;
                      return item.type == "outgoing" ? (
                        <OutgoingMessageContainer
                          index={index}
                          textCreated={textCreated}
                          searchCount={searchCount}
                          parseNameFromURL={parseNameFromURL}
                          messages={messages}
                          item={item}
                          handleClickOpen={handleClickOpen}
                          itemData={props.itemData}
                          outgoingMessageSeenLastItem={
                            outgoingMessageSeenLastItem
                          }
                          outgoingMessageDeliveredLastItem={
                            outgoingMessageDeliveredLastItem
                          }
                          linkify={linkify}
                        />
                      ) : // incoming container

                        item.type == "incoming" ? (
                          <IncomingMessageContainer
                            index={index}
                            textCreated={textCreated}
                            searchCount={searchCount}
                            parseNameFromURL={parseNameFromURL}
                            messages={messages}
                            item={item}
                            handleClickOpen={handleClickOpen}
                            itemData={props.itemData}
                          />
                        ) : item.type == "label" || item.type == "slabel" ? (
                          <LabelMessageContainer
                            item={item}
                            textCreated={textCreated}
                            searchCount={searchCount}
                          />
                        ) : (
                          ""
                        );
                    })}
                  </>
                )}
              </Container>
              <BottomChatContainer
                wrapperRef={wrapperRef}
                stopRecording={stopRecording}
                setContainerHeightFunction={setContainerHeightFunction}
                setIsShown={setIsShown}
                setChatBoxMessageTextInput={setChatBoxMessageTextInput}
                chatBoxMessageTextInputRef={chatBoxMessageTextInputRef}
                file={file}
                setFile={setFile}
                audioURL={audioURL}
                setChange={setChange}
                change={change}
                startRecording={startRecording}
                isShown={isShown}
                chatBoxSubscriptionStatus={props.chatBoxSubscriptionStatus}
                textFieldValue={textFieldValue}
                setTextFieldValue={setTextFieldValue}
                setSearchText={setSearchText}
                onEnterMessageTextInput={onEnterMessageTextInput}
                emojiBtnRef={emojiBtnRef}
                emojiShow={emojiShow}
                setEmojiShow={setEmojiShow}
                addChatToFacebookQueryLoading={addChatToFacebookQueryLoading}
                addMessageInputText={addMessageInputText}
                emojiRef={emojiRef}
                buttonRef={buttonRef}
                setcloseSavedRepliesWindow={setcloseSavedRepliesWindow}
                hiddenFileInput={hiddenFileInput}
                closeSavedRepliesWindow={closeSavedRepliesWindow}
                searchText={searchText}
                setInputTextField={setInputTextField}
                onEmojiClick={onEmojiClick}
              />
            </Container>
          </div>
        )}
      </Container>

      <div style={{ opacity: "0.9" }}>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose1}
          style={{ opacity: "0.98", backgroundColor: "black !important" }}
        >
          <Toolbar
            style={{ display: " flex", justifyContent: "space-between" }}
          >
            <IconButton
              edge="start"
              color="gray"
              onClick={handleClose1}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              style={{ display: "flex" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  "https://img.freepik.com/premium-vector/smiling-girl-avatar_102172-32.jpg"
                }
                style={{
                  width: "10%",
                  marginTop: "1%",
                }}
              />

              <Typography
                sx={{ ml: 2, flex: 1, display: "flex" }}
                style={{ fontSize: "18px", marginLeft: "6px" }}
                variant="h6"
                component="div"
              >
                CustomerName
                <Typography
                  sx={{
                    ml: 2,
                    flex: 1,
                    marginTop: "8%",
                    marginLeft: "8%",
                  }}
                  style={{ fontSize: "9px" }}
                  component="p"
                >
                  {moment
                    .unix(
                      ImageState?.messagetimestamp / 1000 ||
                      ImageState?.timestamp / 1000
                    )
                    .format("DD MMM YYYY hh:mm a")}
                </Typography>
              </Typography>
            </Typography>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <IconButton edge="start" color="gray" aria-label="close">
                <DownloadIcon
                  onClick={(e) => handledownloadImage(e)}
                  href="javascript:void(0)"
                />
                {/* </a> */}
              </IconButton>
              <IconButton edge="start" color="gray" aria-label="close">
                <InfoIcon onClick={handleInfo} />
              </IconButton>
            </Typography>
          </Toolbar>
          {/* </AppBar> */}
          <div style={{ display: " flex", justifyContent: "space-around" }}>
            <ArrowBackIosIcon
              onClick={handleBackward}
              style={{
                cursor: backwardIcon ? "pointer" : "",
                marginTop: "18%",
                // marginLeft: "4%",
                color: backwardIcon ? "black" : "gray",
              }}
            />
            <List
              style={{
                maxWidth: "1000px",
              }}
            >
              <img alt="img" src={ImageState?.file} width={"400px"} />
            </List>
            <ArrowForwardIosIcon
              onClick={handleFarward}
              style={{
                cursor: farwardIcon ? "pointer" : "",

                marginTop: "18%",
                color: farwardIcon ? "black" : "gray",
              }}
            />
          </div>
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              ref={inerRef}
              style={{
                display: "flex",

                paddingLeft: "7px",
                width: "800px",
                whiteSpace: "nowrap",
                overflowY: "hidden",
                overflowX: "hidden",

                marginTop: "3%",
              }}
              variant="h6"
              component="div"
            >
              {chatpictureState?.map((image) => {
                return (
                  <Typography>
                    <img
                      alt="img"
                      ref={ImageRef}
                      src={image.file}
                      width={"60px"}
                      height={"60px"}
                      style={{
                        // position: "absolute",
                        cursor: "pointer",
                        borderRadius: ImageId == image.id ? "10%" : "none",
                        border: ImageId == image.id ? "1px solid gray" : "none",
                        padding: ImageId == image.id ? "0px" : "2px",
                        opacity: ImageId == image.id ? "1" : "0.7",
                        // scrollLeft: `${experiment}px`,
                        // transform: `translate(-${experiment}px)`,
                        // left: `-${experiment}px`,
                      }}
                      onClick={(e) => {
                        setImageState(image);
                        setfarwardIcon(true);
                        setbackwardIcon(true);
                        setImageId(image.id);

                        const mouseXPos = e?.clientX;

                        if (mouseXPos <= 700) {
                          inerRef.current.scrollLeft += -50;
                        } else {
                          inerRef.current.scrollLeft += 50;
                        }
                      }}
                    />
                  </Typography>
                );
              })}
            </Typography>
          </Typography>
        </Dialog>
      </div>
      {/* //////////////////////Info///////////////////// */}
      <Dialog
        open={infodown}
        onClose={handleInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "16%",
            height: "20%",
            position: "fixed",
            top: 45,
            left: 1160,
            m: 0,
            wordBreak: "break-word",
          },
        }}
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              sx={{ flex: 2 }}
              variant="p"
              component="p"
              style={{ fontSize: "14px" }}
            >
              <b>Name : Human 909</b>
            </Typography>
            <Typography
              sx={{ flex: 2 }}
              variant="p"
              component="p"
              style={{ fontSize: "14px" }}
            >
              <b>Image type : jpg</b>
            </Typography>
            <Typography
              sx={{ flex: 2 }}
              variant="p"
              component="p"
              style={{ fontSize: "14px" }}
            >
              <b>
                {" "}
                Date&time :{" "}
                {moment
                  .unix(
                    ImageState?.messagetimestamp / 1000 ||
                    ImageState?.timestamp / 1000
                  )
                  .format("DD MMM YYYY hh:mm a")}
              </b>
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
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
