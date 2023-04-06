import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Container,
  IconButton,
  Tabs,
  Tab,
  TextField,
  FormControlLabel,
  Tooltip,
  Typography,
  Button,
  Checkbox,
} from "@material-ui/core";
import { connect } from "react-redux";
import CountrySelect from "../dropdown/SelectCountry";
import {
  setChatBoxRecentSearchInputText,
  setChatBoxRecentSearchText,
  setChatBoxRecentChatListData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxFacebookIDsWithProfileDetails,
  setChatBoxMarkNotToAddInChatCircleForLabel,
  setChatBoxRecentSearchChatIds,
  setChatBoxRecentChatListShowAllListToggle,
  setChatBoxRecentChatListShowAllListByManagerToggle,
} from "../../store/actions/ChatBoxActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  setUsersListSelectedUser,
  setUsersListData,
} from "../../store/actions/UsersListActions";
import {
  setLabelListData,
  setLabelListTextInput,
} from "../../store/actions/LabelListActions";
import { setUserPanelChatOnline } from "../../store/actions/UserPanelActions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ClearIcon from "@material-ui/icons/Clear";
import ChatList from "./ChatList";
import _, { filter } from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import ChatTabPanel from "./ChatTabPanel";
import SplitterLayout from "../../otherComponents/react-splitter-layout/components/SplitterLayout";
import "../../otherComponents/react-splitter-layout/stylesheets/index.css";
import ChatContainer from "./ChatContainer";
import ChatSubscription from "./ChatSubscription";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useSnackbar } from "notistack";
import { Facebook } from "../../auth/Facebook";
import moment from "moment";
import includes from "./includes";
import FacebookAvatar from "./FacebookAvatar";
import FacebookTypography from "./FacebookTypography";
import UsersList from "./UsersList";
import ManagerList from "./ManagerList";
import ManagersListTabContainer from "./ManagersListTabContainer";
import chevdown from "../../assets/chatWindow/Icons-chevron-down.svg";
import { useQuery } from "@apollo/react-hooks";
import chevup from "../../assets/chatWindow/Icons-chevron-up.svg";
import detail from "../../assets/chatWindow/Details.svg";
import form from "../../assets/chatWindow/AddForm.svg";
import closeBtn from "../../assets/chatWindow/Closeg.svg";
import searchBtng from "../../assets/chatWindow/Searchg.svg";
import ChatNoteMain from "./ChatNoteMain";
import setReminder from "../../assets/chatWindow/setReminder.svg";
import LabelsOnRightPanel from "./LabelsOnRightPanel";
import dayjs from "dayjs";
import DateTimePicker from "react-datetime-picker";
import DoneIcon from "@mui/icons-material/Done";
import { styled } from "@mui/material/styles";
import SendMessage from "./SendMessage";
import RightPanelChatBox from "./ChatContainerComponents/RightPanelChatBox";
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CssBaseline, } from '@mui/material';
import Header from '../layout/header/Header';
import NavigationList from '../adminPanel/NavigationList'


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

const useStyles = makeStyles((theme) => ({

  searchTodayChatsTextField: { width: "100%" },

  textFieldInputRoot: {
    width: "100%",
    background: "#eeeeee",
    color: "black",
    // border:'1px solid red',
    // height:'35px',
    paddingLeft: "35px !important",
    borderBottom: "none",
  },
  textFieldInput: {
    height: 41,

    padding: "0px 4px",
    borderBottom: 0,
  },
  recentPagesLeftPane: {
    borderRight: "1px solid #dedede",
    flex: 0.26,
    margin: 0,
  },
  clearSearchButton: {
    padding: 0,
    marginRight: 9,
    order: 1,
  },
  bottomChatsTabs: {
    position: "fixed",
    bottom: 0,
    zIndex: 1000,
    height: 52,
    maxWidth: "100%",
  },
  bottomChatsTab: {
    background: "#1a2733",
    maxWidth: 300,

    marginRight: 6,
  },
  bottomChatsTabText: {
    display: "inline",
    color: "black",
    marginLeft: 5,
    width: 150,
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontStyle: "bold",
    fontFamily: "Poppins",
    fontSize: "14px",
  },
  bottomChatsTabContainer: {
    display: "flex",
    alignItems: "center",
  },
  bottomChatsCloseButton: {
    color: "white",
    marginLeft: 15,
  },
  bottomChatsTabPageImage: {
    marginRight: 2,
    background: "#737272",
  },
  bottomChatsTabPanel: {
    zIndex: 1000,
    background: "#1a2733",
    position: "fixed",
    bottom: 0,
    right: 0,
    width: 400,
  },
  bottomChatsTabScrollButtons: {
    background: "#66c047",
    color: "white",
  },
  chatMainContainer: {},
  chatTabHeader: {
    padding: 5,
    background: "#1a2733",
  },
  chatBoxRecentSearchList: {
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: 4,
  },
  totalRecentChatsLoadText: {
    background: "#bdbdbd",
    color: "white",
    padding: "0 5px",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
  },
  chatBoxSerachTextBoxContainer: {
    display: "flex",
  },
  chatBoxRecentShowAllChatListToggleButton: {
    color: "white",
    background: "#f50057",
    borderRadius: 0,
    minWidth: 0,
    "&:hover": {
      background: "#e14079",
    },
  },
  chatBoxRecentShowAllChatListToggleButtonDisabled: {
    background: "#b7b3b3",
  },
  chatBoxRecentChatListShowAllListByManagerCheckbox: {
    borderBottom: "1px solid #949494",
    borderRadius: 0,
    paddingBottom: 0,
    paddingTop: 1,
  },
  horizontalDropdownActive: {
    fontStyle: "bold",
  },
  activeClass: {
    fontStyle: "bold",
  },

  "&:hover": {
    background: "white",
  },
}));

const ChatBox = (props) => {
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(new Date());
  const [openReminder, setOpenReminder] = useState(false);
  const [tState, settState] = useState([]);
  const [ifManagertabPressed, setIfManagertabPressed] = useState(false);
  const [ifMyChatsTabPressed, setIfMyChatsTabPressed] = useState(true);
  const [ifAgentsTabPressed, setIfAgentsTabPressed] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showLeadFormDetail, setShowLeadFormDetail] = useState(false);
  const [openAddLabelInput, setOpenAddLabelInput] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [activeUserDetail, setActiveUserDetail] = useState({});
  var splitterLayoutRef = React.useRef(null);
  var splitterLayoutRef2 = React.useRef(null);
  const [TemporarySelection, setTemporarySelection] = useState([]);
  const [statedateandtime, setstatedateandtime] = useState("");
  var selectedChatsOnFloatingTabpanelItem = _.find(
    props.chatBoxSelectedChatsOnFloating,
    (itm) => itm.selected == true
  );

  useEffect(() => {
    document.title = "Chat";
  }, []);

  ///////////////
  const [filterData, setfilterData] = useState(null);
  const classes = useStyles();

  let notificationMutation = gql`
    mutation addNotification(
      $customerId: String!
      $pageId: String!
      $agentId: ID!
      $timeStamp: String!
      $read: Boolean!
      $customername: String
    ) {
      addNotification(
        customerId: $customerId
        pageId: $pageId
        agentId: $agentId
        timeStamp: $timeStamp
        read: $read
        customername: $customername
      ) {
        success
        error
      }
    }
  `;
  const [
    addNotification,
    {
      loading: notificationLoading,
      error: notificationError,
      data: notificationResult,
    },
  ] = useMutation(notificationMutation);

  const handleClearSearch = () => {
    props.setChatBoxRecentSearchText("");
    props.setChatBoxRecentSearchChatIds([]);
    props.setChatBoxRecentSearchInputText("");
    props.setChatBoxRecentChatListData(tState);
  };
  const handledateTime = () => {
    alert("handledateTime")
    addNotification({
      variables: {
        agentId: TemporarySelection?.agentId,
        customerId: TemporarySelection?.customerId,
        pageId: TemporarySelection?.pageId,
        timeStamp: value,
        read: false,
        customername: selectedChatsOnFloatingTabpanelItem.customername,
      },
    });
  };
  useEffect(() => {
    if (notificationResult) {
      setOpenReminder(true);
    }
  }, [notificationResult]);
  useEffect(() => {
    props.chatBoxSelectedChatsOnFloating.map((item) => {
      if (item.selected) {
        setTemporarySelection(item);
      }
    });
  }, [props.chatBoxSelectedChatsOnFloating]);

  const getUsers = gql`
    query getUsers($accessToken: String) {
      getUsers(accessToken: $accessToken) {
        id
        settings
        name
      }
    }
  `;

  let { loading: meQueryLoading, data: meQueryResult } = useQuery(getUsers, {
    fetchPolicy: "network-only",
  });

  let userIdForRecentsChatQuery = new includes().getUserIdForRecentsChatQuery(
    props.authUserId,
    props.authPanelType,
    props.usersListSelectedUser,
    props.chatBoxRecentChatListShowAllListToggle
  );
  var managerIdForRecentsChatQuery =
    new includes().getManagerIdForRecentsChatQuery(
      props.authUserId,
      props.authPanelType,
      props.managersListSelectedManager,
      props.chatBoxRecentChatListShowAllListByManagerToggle,
      props.chatBoxRecentChatListShowAllListToggle
    );

  useEffect(() => {
    Facebook.fbInt();
  }, []);
  useEffect(() => {
    if (props.usersListSelectedUser) {
      setIfAgentsTabPressed(false);
      setIfManagertabPressed(false);
      setIfMyChatsTabPressed(false);
    }
  }, [props.usersListSelectedUser]);

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
    {
      loading: addChatDetailQueryLoading,
      error: addChatDetailQueryError,
      data: addChatDetailQueryResult,
    },
  ] = useMutation(AddChatDetailQuery);

  useEffect(() => {
    if (addChatDetailQueryError) {
      //error
    }
  }, [addChatDetailQueryError]);

  var includesObj = new includes();

  var otherHeightDeduction = 0;
  if (new includes().showChatBoxManagersList(props.authPanelType)) {
    otherHeightDeduction = 52;
  }

  var layoutHeightOfMiddleContent =
    props.chatBoxSelectedChatsOnFloating.length > 1
      ? `calc(100vh - ${props.authMainAppBarHeight}px - 52px - ${otherHeightDeduction}px)`
      : `calc(100vh - ${props.authMainAppBarHeight}px - ${otherHeightDeduction}px)`;

  var heightOfListSearch = 41;
  var layoutHeightOfLists =
    props.chatBoxSelectedChatsOnFloating.length > 1
      ? `calc(100vh - ${props.authMainAppBarHeight}px - 52px - ${heightOfListSearch}px - ${otherHeightDeduction}px)`
      : `calc(100vh - ${props.authMainAppBarHeight}px - ${heightOfListSearch}px - ${otherHeightDeduction}px)`;

  const showMyChats = () => {
    setIfMyChatsTabPressed(true);
    setIfManagertabPressed(false);
    setIfAgentsTabPressed(false);
    props.setUsersListSelectedUser(null);
  };

  const showManagers = () => {
    setIfManagertabPressed(true);
    setIfMyChatsTabPressed(false);
    setIfAgentsTabPressed(false);
    props.setUsersListSelectedUser(null);
  };

  const showAllAgents = () => {
    setIfAgentsTabPressed(true);
    setIfManagertabPressed(false);
    setIfMyChatsTabPressed(false);
    props.setUsersListSelectedUser(null);
    props.setUsersListData([]);
  };

  const showUserDetailPanel = () => {
    setShowUserDetail(!showUserDetail);
  };
  const showLeadFormPanel = () => {
    setShowLeadFormDetail(true);
  };
  const backBtnHandler = (id) => {
    let paneltypes =
      props.managersListData &&
      props.managersListData.length &&
      props.managersListData.find((curr) => curr.id == id)?.panelType;

    if (paneltypes == 0 || paneltypes == undefined) {
      paneltypes = "AGENT";
    }

    let paneltype = paneltypes;
    if (paneltype == "AGENT") {
      showAllAgents();
    } else if (paneltype == "MANAGER") {
      showManagers();
    }
  };
  const chatListContainer = (
    <Container disableGutters={true}>
      <Container
        disableGutters={true}
        className={classes.chatBoxSerachTextBoxContainer}
      >
        <div style={{ width: "100%", position: "relative" }}>
          <img
            src={searchBtng}
            alt=""
            style={{
              width: "17px",
              position: "absolute",
              zIndex: "100",
              left: "18px",
              top: "12px",
            }}
          />
          <TextField
            value={props.chatBoxRecentSearchInputText}
            onInput={(e) => {
              props.setChatBoxRecentSearchInputText(e.target.value);
            }}
            InputProps={{
              startAdornment:
                props.chatBoxRecentSearchText == "" ? null : (
                  <IconButton
                    className={classes.clearSearchButton}
                    onClick={handleClearSearch}
                  >
                    <ClearIcon color="disabled" fontSize="small" />
                  </IconButton>
                ),
              classes: {
                input: classes.textFieldInput,
              },
            }}
            classes={{
              root: classes.textFieldInputRoot,
            }}
            InputAdornmentProps={{
              position: "end",
              style: { order: 2, marginLeft: 0 },
            }}
            placeholder="Search"
          ></TextField>
        </div>

        {new includes().chatBoxRecentShowAllChatListToggleButtonToPanelType(
          props.authPanelType
        ) && <></>}
      </Container>

      <ChatList
        ifMyChatsTabPressed={ifMyChatsTabPressed}
        activeUserDetail={activeUserDetail}
        backBtnHandler={backBtnHandler}
        className={classes.chatBoxRecentSearchList}
        containerHeight={layoutHeightOfLists}
        searchText={props.chatBoxRecentSearchText}
        searchIds={props.chatBoxRecentSearchChatIds}
        onItemClick={(item) => {
          includesObj.bindItemToMainChat(
            item,
            props.chatBoxRecentChatListData,
            props.setChatBoxRecentChatListData,
            props.chatBoxSelectedChatsOnFloating,
            props.setChatBoxSelectedChatsOnFloating,
            props.setChatBoxMarkNotToAddInChatCircleForLabel
          );
        }}
        onLabelRemove={(text, pageId, customerId) => { }}
      />
    </Container>
  );
  const rightPanelChatBox = useMemo(() =>
    <RightPanelChatBox
      showUserDetail={showUserDetail}
      showLeadFormDetail={showLeadFormDetail}
      selectedChatsOnFloatingTabpanelItem={selectedChatsOnFloatingTabpanelItem}
      setOpenAddLabelInput={setOpenAddLabelInput}
      openAddLabelInput={openAddLabelInput}
      authUserId={props.authUserId}
      handledateTime={handledateTime}
      value={value}
      setValue={setValue}
      showUserDetailPanel={showUserDetailPanel}
      setFollowUpDialogToggle={props.setFollowUpDialogToggle}
      openReminder={openReminder}
      setOpenReminder={setOpenReminder}
    />,
    [openAddLabelInput, selectedChatsOnFloatingTabpanelItem, value, props.authUserId, showUserDetail, openReminder]
  );
  const theme = useTheme();

  return (
    <>

      {/* <Outlet /> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: showUserDetail ? "26% auto 25%" : "26% auto 6%",
        }}
      >
        {/* left panel of chats */}
        <div style={{ border: "1px solid lightgrey" }}>
          {/* 3 tabs below chat */}
          <div
            style={{
              margin: "0 auto",
              height: "68px",
              fontSize: "18px",
              borderBottom: "1px solid grey",
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <h4 style={{ fontFamily: "Poppins" }}>Chats</h4>
          </div>
          <div
            style={{
              padding: "15px 20px",
              display: "grid",
              gridTemplateColumns: props.isManager
                ? "auto auto auto auto auto auto auto auto auto"
                : props.isAgent
                  ? "auto"
                  : "auto auto auto",
              margin: "0 auto",
            }}
          >
            <div
              className={
                ifMyChatsTabPressed ? classes.horizontalDropdownActive : null
              }
              onClick={showMyChats}
              style={{
                cursor: "pointer",
                fontWeight: ifMyChatsTabPressed ? "500" : "400",
                fontFamily: "Poppins",
                fontSize: "15px",
              }}
            >
              My chats{" "}
              <img
                style={{ width: "10px" }}
                src={ifMyChatsTabPressed ? chevdown : chevup}
                alt="my chats tab"
              />
            </div>

            {props.isSuperAdmin && (
              <div
                className={
                  ifManagertabPressed ? classes.horizontalDropdownActive : null
                }
                onClick={showManagers}
                style={{
                  cursor: "pointer",
                  fontWeight: ifManagertabPressed ? "500" : "400",
                  fontFamily: "Poppins",
                  fontSize: "15px",
                }}
              >
                Managers{" "}
                <img
                  style={{ width: "10px" }}
                  src={ifManagertabPressed ? chevdown : chevup}
                  alt="managers tab"
                />
              </div>
            )}
            {!props.isAgent && (
              <div
                className={
                  ifAgentsTabPressed ? classes.horizontalDropdownActive : null
                }
                onClick={showAllAgents}
                style={{
                  cursor: "pointer",
                  fontWeight: ifAgentsTabPressed ? "500" : "400",
                  fontFamily: "Poppins",
                  fontSize: "15px",
                }}
              >
                Agents{" "}
                <img
                  style={{ width: "10px" }}
                  src={ifAgentsTabPressed ? chevdown : chevup}
                  alt="agents tab"
                />
              </div>
            )}
          </div>
          {/* Left panel of chats below 3 tabs */}
          <Container disableGutters className={classes.recentPagesLeftPane}>
            {props.authUserWsSubscriptionReady && <ChatSubscription />}
            {/* checks if user is manager or SA */}
            {new includes().showChatBoxUsersList(props.authPanelType) ? (
              <div>
                <Container disableGutters className={classes.userListPane}>
                  {!props.usersListSelectedUser && ifAgentsTabPressed && (
                    <UsersList
                      managerId={new includes().getUserIdForUserListQuery(
                        props.authUserId,
                        props.authPanelType,
                        props.managersListSelectedManager
                      )}
                      containerHeight={layoutHeightOfLists}
                      onItemClick={(item) =>
                        setActiveUserDetail({
                          id: item.id,
                          paneltype: item.panelType,
                        })
                      }
                    />
                  )}
                  {ifMyChatsTabPressed ? chatListContainer : null}
                  {ifManagertabPressed && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <ManagerList authId={props.authUserId} />{" "}
                    </div>
                  )}
                  {props.usersListSelectedUser && chatListContainer}
                </Container>
              </div>
            ) : (
              chatListContainer
            )}
          </Container>
        </div>
        {/* Right panel of chats */}
        <div>
          <Container
            maxWidth={false}
            disableGutters={true}
            className={classes.mainChatBox}
          >
            {selectedChatsOnFloatingTabpanelItem ? (
              <ChatContainer
                chatBoxMessageBoxDynamicHeight={true}
                chatTabHeaderStyles={classes.chatTabHeader}
                chatMainContainerStyles={classes.chatMainContainer}
                itemData={selectedChatsOnFloatingTabpanelItem}
              ></ChatContainer>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "calc(100vh - 100px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#bbbbbb",
                }}
              >
                <p>No chat selected</p>
              </div>
            )}
          </Container>
        </div>

        {/* user detail panel onClick */}


        {selectedChatsOnFloatingTabpanelItem !== undefined && (
          <>
            <div style={{ height: "calc(100vh - 70px)", overflowY: "auto" }}>
              {rightPanelChatBox}

            </div>
          </>
        )}
      </div>

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
    ...state.ChatBoxReducer,
    ...state.AuthReducer,
    ...state.UsersListReducer,
    ...state.ManagersListReducer,
    ...state.LabelListReducer,
  };
};
export default connect(mapStateToProps, {
  setLabelListData,
  setLabelListTextInput,
  setChatBoxRecentSearchInputText,
  setUsersListSelectedUser,
  setUsersListData,
  setChatBoxRecentSearchText,
  setChatBoxRecentChatListData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxFacebookIDsWithProfileDetails,
  setUserPanelChatOnline,
  setChatBoxMarkNotToAddInChatCircleForLabel,
  setChatBoxRecentSearchChatIds,
  setChatBoxRecentChatListShowAllListToggle,
  setChatBoxRecentChatListShowAllListByManagerToggle,
})(ChatBox);
