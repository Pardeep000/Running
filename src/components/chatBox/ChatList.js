import React, { Fragment, useEffect, useRef, useState } from "react";
// import List from "@material-ui/core/List";
import {
  Container,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,

} from "@material-ui/core";
import { AutoSizer, List } from "react-virtualized";
import {
  setChatBoxRecentChatListData,
  setChatBoxRecentSearchText,
  setChatBoxRecentSearchChatIds,
  setChatBoxRecentSearchInputText,
  setChatBoxRecentChatListDataTotalCount,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxNotificationCustomerId
} from "../../store/actions/ChatBoxActions";
import { setPropsObjectData } from "../../store/actions/PropsObjectActions";
import {
  setUsersListSelectedUser,
  setUsersListData,
  setUsersListSearchInputText,
  setUsersListSearchText,
} from "../../store/actions/UsersListActions";

import { setAllUsersData } from "../../store/actions/AdmindataActions";
import includes from "./includes";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useSnackbar } from "notistack";
import FacebookAvatar from "./FacebookAvatar";
import FacebookTypography from "./FacebookTypography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ReactTimeAgo from "react-timeago";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import ChatListTypingMessageStatus from "./ChatListTypingMessageStatus";
import Tabs from "../../otherComponents/react-responsive-tabs";
import "../../otherComponents/react-responsive-tabs/styles.css";

import { Waypoint } from "react-waypoint";
import backIcon from "../../assets/chatWindow/Back.svg";
import messengerIcon from "../../assets/chatWindow/messenger.svg";

import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textFieldInputRoot: {
    width: "100%",
    background: "#eeeeee",
    border: "0px solid #d0d0d0",
    paddingLeft: "35px",
  },
  textFieldInput: {
    height: 41,

    padding: "0px 4px",
    borderBottom: 0,
  },
  pageIcon: {
    position: "absolute",
    left: 1,
    background: "#737272",
  },
  customerIcon: {
    marginLeft: 8,
    marginTop: "10px",
  },
  listItemPri: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
  },
  listItemPrimaryText: {
    fontWeight: "bold",
    flex: 1,

    fontSize: "13px",
    wordBreak: "break-all",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "break-spaces",
    maxHeight: 24,
  },
  listItemButton: {
    overflow: "hidden!important",
    // borderBottom: "1px solid #d0cfcf",
    paddingRight: 4,
    width: "96%",
    marginLeft: "2%",
    "&:hover": {
      background: "none",
    },
  },
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
  },
  selectedListItem: {
    borderRadius: "10px",
    background: "#eeeeee",
    border: "1px solid #d7d7d7",
    boxShadow: "0px 2px 1px 1px rgba(0,0,0,0.02)",
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
  },
  timeStamp: {
    marginTop: "-85px",
    textAlign: "right",
    fontSize: 10,
    // color: "#7e7e7e",
    color: "#55a530",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontFamily: "Poppins",
  },
  listItemAvatarAndTextContainer: {
    display: "flex",
    marginTop: "-25px",
  },
  listItemSecondaryText: {
    whiteSpace: "nowrap",
    fontFamily: "Poppins",
    fontSize: "12px",
  },
  listItemMarkUnread: {
    background: "red",
  },
  listItemInnerContainer: {
    paddingLeft: 3,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  listItem: {
    padding: 0,
    height: "95px",
  },
  listItemPrimaryTextMarkUnread: {
    fontWeight: "bold",
  },
  listItemSecondaryTextMarkUnread: {
    fontWeight: "bold",
    color: "#64a4ca",
  },
  markNotToAddInChatCircleContainer: {
    width: "55%",
    height: 5,
  },
  markNotToAddInChatCircleSpan: {
    height: "20px",

    textAlign: "right",
    fontSize: 10,
    // color: "#7e7e7e",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "red",
    marginLeft: "250px",
    marginTop: "10px",
    fontFamily: "Poppins",
  },
  salesDonewppSpan: {
    width: "calc(100% - 5px)",
    background: "#47c843",
    height: 5,
    display: "block",
  },
  salesDoneppSpan: {
    width: "calc(100% - 5px)",
    background: "#3c9939",
    height: 5,
    display: "block",
  },
  listItemBottomContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listNoRows: {
    padding: 10,
  },
}));

const ChatList = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [filterData, setfilterData] = useState([]);


  const [showSearchList, setShowSearchList] = useState("");

  const [onResquestFetching, setOnResquestFetching] = useState(false);

  const onResquestFetching_ = useRef(null);
  onResquestFetching_.current = onResquestFetching;

  const [hasNextPage, setHasNextPage] = useState(true);
  const [showCircle, setShowCircle] = useState(true);
  const hasNextPage_ = useRef(null);
  hasNextPage_.current = hasNextPage;

  const [showBar, setShowBar] = useState(false);

  const chatBoxRecentChatListFetchNumber = 20;
  const [agentId, setAgentId] = useState();

  let userIdForRecentsChatQuery = new includes().getUserIdForRecentsChatQuery(
    props.authUserId,
    props.authPanelType,
    props.usersListSelectedUser,
    props.chatBoxRecentChatListShowAllListToggle
  );
  if (props.userauthid) {
    userIdForRecentsChatQuery = props.userauthid;
  }

  var managerIdForRecentsChatQuery =
    new includes().getManagerIdForRecentsChatQuery(
      props.authUserId,
      props.authPanelType,
      props.managersListSelectedManager,
      props.chatBoxRecentChatListShowAllListByManagerToggle,
      props.chatBoxRecentChatListShowAllListToggle
    );

  const ChatLastDetailsByIdWithPaginationQuery = gql`
    query ChatLastDetailsByIdWithPagination(
      $userID: ID
      $first: Int
      $after: String
      $managerId: ID
      $cursor: String
    ) {
      chatlastdetailsbyidwithpagination(
        userID: $userID
        first: $first
        after: $after
        managerId: $managerId
        cursor: $cursor
      ) {
        chatDetails {
          id
          customerId
          pageId
          messageId
          messagetext
          messagetimestamp
          customerName
          messagetype
          agentId
          alternateagentId
          read
          labels
          marknottoaddinchatcircle
          file
          chatorder
          
        }
        totalCount
        hasNextPage
        managerId
        userID
      }
    }
  `;

  const [
    chatLastDetailsByIdWithPagination,
    {
      data: chatLastDetailsByIdWithPaginationQueryResult,
      loading: chatLastDetailsByIdWithPaginationQueryLoading,
      error: chatLastDetailsByIdWithPaginationQueryError,
    },
  ] = useLazyQuery(ChatLastDetailsByIdWithPaginationQuery, {
    fetchPolicy: "network-only",
  });
  const chatlastdetailsbyCustomerNameQuery = gql`
    query chatlastdetailsbyCustomerName($searchtext: String!, $agentId:ID!) {
      chatlastdetailsbyCustomerName(
        searchtext: $searchtext
        agentId:$agentId
        ) {
        chatDetails {
          id
          customerId
          pageId
          messageId
          messagetext
          messagetimestamp
          customerName
          messagetype
          agentId
          alternateagentId
          read
          labels
          marknottoaddinchatcircle
          file
          chatorder
        }
      }
    }
  `;
  const [
    chatlastdetailsbyCustomerName,
    {
      data: chatlastdetailsbyCustomerNameResult,
      loading: chatlastdetailsbyCustomerNameLoading,
      error: chatlastdetailsbyCustomerNameError,
    },
  ] = useLazyQuery(chatlastdetailsbyCustomerNameQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (props.chatBoxSubscriptionStatus) {
      props.setChatBoxRecentChatListData([]);

      props.setChatBoxRecentChatListDataTotalCount(null);
      if (props.chatBoxRecentChatListShowAllListToggle) {
        props.setUsersListSelectedUser(null);
        var findPreviousSelectedItem = _.find(
          props.usersListData,
          (itm) => itm.selected == true
        );

        if (findPreviousSelectedItem) {
          findPreviousSelectedItem.selected = false;
          props.setUsersListData(_.cloneDeep(props.usersListData));
        }
      }
      if (userIdForRecentsChatQuery != "") {
        function findPos(obj) {
          var curtop = 0;
          if (obj.offsetParent) {
            do {
              curtop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return [curtop];
          }
        }

        window.scroll(0, findPos(document.getElementById("scrolltome")));
        chatLastDetailsByIdWithPagination({
          variables: {
            userID: userIdForRecentsChatQuery,
            // after: endCursor,
            first: chatBoxRecentChatListFetchNumber,
            managerId: managerIdForRecentsChatQuery,
          },
        });
      }
    }
  }, [
    props.chatBoxSubscriptionStatus,
    userIdForRecentsChatQuery,
    props.chatBoxRecentChatListShowAllListToggle,
  ]);
  const fetchMoreData = () => {


    if (
      !chatLastDetailsByIdWithPaginationQueryLoading && chatLastDetailsByIdWithPaginationQueryResult.chatlastdetailsbyidwithpagination.hasNextPage && !(chatlastdetailsbyCustomerNameResult?.chatlastdetailsbyCustomerName?.chatDetails)
    ) {
      setShowCircle(true);
      chatLastDetailsByIdWithPagination({
        variables: {
          userID: userIdForRecentsChatQuery,
          // after: endCursor,
          first: chatBoxRecentChatListFetchNumber,
          managerId: managerIdForRecentsChatQuery,
          cursor:
            props.chatBoxRecentChatListData[
              props.chatBoxRecentChatListData.length - 1
            ].chatorder,
        },
      });
      // setShowCircle(true);
    } else {
      setShowCircle(false);
    }

  };

  const parseNameFromURL = (url) => {
    let myArray = url.split("?")[0];
    let name = [];

    for (let i = myArray.length; i >= 0; i--) {
      if (myArray[i] == "/") break;
      name.push(myArray[i]);
    }
    let subfinal = name.reverse();
    let final = subfinal.join("");
    return final;
  };
  const formatChatDetails = (chatDetails) => {

    var chatBoxRecentChatListData = [];
    chatDetails.map((item) => {
      var messageText =
        item.messagetype == "followuplabel"
          ? JSON.parse(item.messagetext)
          : item.messagetext;

      messageText =
        item.messagetype == "followuplabel"
          ? `${messageText[0]} at ${moment
            .unix(messageText[1] / 1000)
            .format("yyyy-MM-DD hh:mm A")}`
          : messageText;

      messageText =
        item.messagetype == "label"
          ? messageText.includes("!-!-!-")
            ? messageText.split("!-!-!-")[0]
            : messageText
          : messageText;
      chatBoxRecentChatListData.push({
        agentId: item.agentId,
        pageId: item.pageId,
        customerId: item.customerId,
        pageName: "",
        customername: item.customerName,
        lastMessage: messageText ? messageText : parseNameFromURL(item.file),
        lastMessageTimeStamp: item.messagetimestamp,
        selected: false,
        messageId: item.messageId,
        read: item.read,
        labels: JSON.parse(item.labels),
        loading: false,
        marknottoaddinchatcircle: item.marknottoaddinchatcircle,
        chatorder: item.chatorder,
      });
    });
    return chatBoxRecentChatListData;
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  var dataArray =
    filterData != null ? filterData : props.chatBoxRecentChatListData;
  useEffect(() => {
    if (
      chatLastDetailsByIdWithPaginationQueryResult &&
      chatLastDetailsByIdWithPaginationQueryResult.chatlastdetailsbyidwithpagination
    ) {

      if (

        chatLastDetailsByIdWithPaginationQueryResult
          .chatlastdetailsbyidwithpagination.userID ==
        userIdForRecentsChatQuery &&
        chatLastDetailsByIdWithPaginationQueryResult
          .chatlastdetailsbyidwithpagination.managerId ==
        managerIdForRecentsChatQuery
      ) {


        props.setChatBoxRecentChatListDataTotalCount(
          chatLastDetailsByIdWithPaginationQueryResult
            .chatlastdetailsbyidwithpagination.chatDetails.length
        );
        let chatDetailsss = chatLastDetailsByIdWithPaginationQueryResult
          .chatlastdetailsbyidwithpagination.chatDetails;
        if (chatDetailsss && chatDetailsss.length) {
          setAgentId(chatLastDetailsByIdWithPaginationQueryResult
            .chatlastdetailsbyidwithpagination?.chatDetails[0].agentId);

        }
        else {

        }

        if (
          chatLastDetailsByIdWithPaginationQueryResult
            .chatlastdetailsbyidwithpagination.chatDetails.length > 0
        ) {
          var chatBoxRecentChatListData = null;
          if (props.chatBoxRecentChatListData.length > 0) {

            chatBoxRecentChatListData = [
              ...props.chatBoxRecentChatListData,
              ...formatChatDetails(
                chatLastDetailsByIdWithPaginationQueryResult
                  .chatlastdetailsbyidwithpagination.chatDetails
              ),
            ];
          } else
            chatBoxRecentChatListData = formatChatDetails(
              chatLastDetailsByIdWithPaginationQueryResult
                .chatlastdetailsbyidwithpagination.chatDetails
            );
          props.setChatBoxRecentChatListData(
            _.cloneDeep(chatBoxRecentChatListData)
          );

          if (
            chatLastDetailsByIdWithPaginationQueryResult
              .chatlastdetailsbyidwithpagination.hasNextPage
          ) {

          }


        }
        // onResquestFetching_.current = false;
        // setOnResquestFetching(false);
      }
    }
  }, [chatLastDetailsByIdWithPaginationQueryResult]);


  useEffect(() => {
    if (chatlastdetailsbyCustomerNameResult && chatlastdetailsbyCustomerNameResult.chatlastdetailsbyCustomerName) {
      let chatBoxRecentChatListData = [];

      if (chatlastdetailsbyCustomerNameResult.chatlastdetailsbyCustomerName.chatDetails.find((curr) => curr.customerId == props.chatBoxNotificationCustomerId)) {
        chatBoxRecentChatListData = formatChatDetails(
          [chatlastdetailsbyCustomerNameResult.chatlastdetailsbyCustomerName.chatDetails.find((curr) => curr.customerId == props.chatBoxNotificationCustomerId)]
        );
        setfilterData(
          _.cloneDeep(chatBoxRecentChatListData)
        );
      } else {
        chatBoxRecentChatListData = formatChatDetails(
          chatlastdetailsbyCustomerNameResult.chatlastdetailsbyCustomerName.chatDetails
        );
        setfilterData(
          _.cloneDeep(chatBoxRecentChatListData)
        );
      }



    }
  }, [chatlastdetailsbyCustomerNameResult])


  useEffect(() => {
    if (chatLastDetailsByIdWithPaginationQueryError) {
      chatLastDetailsByIdWithPaginationQueryError.graphQLErrors.map(
        ({ message }, i) => {
          enqueueSnackbar(message, { variant: "error" });
        }
      );
      if (userIdForRecentsChatQuery != "") {
        // chatLastDetailsByIdWithPagination({
        //   variables: {
        //     userID: userIdForRecentsChatQuery,
        //     first: chatBoxRecentChatListFetchNumber,
        //     managerId: managerIdForRecentsChatQuery,
        //   },
        // });
      }
    }
  }, [chatLastDetailsByIdWithPaginationQueryError]);




  useEffect(() => {
    if (props.chatBoxRecentSearchInputText?.length > 0) {


      const delayDebounceFn = setTimeout(() => {
        chatlastdetailsbyCustomerName({
          variables: {
            searchtext: props.chatBoxRecentSearchInputText,
            agentId: agentId
          },
        });

        // Send Axios request here
      }, 500)
      setShowSearchList(true);
      return () => clearTimeout(delayDebounceFn)


    }
    else if (props.chatBoxRecentSearchInputText?.length == 0) {
      props.setChatBoxNotificationCustomerId("")
      setfilterData([]);
      setShowSearchList(false)

    }




  }, [props.chatBoxRecentSearchInputText]);



  var dataArray =
    showSearchList ? filterData : props.chatBoxRecentChatListData;

  function getLabels(labelsData) {
    if (!labelsData) {
      return [];
    }

    return labelsData.map((label, index) => ({
      title: label.includes("!-!-!-") ? label.split("!-!-!-")[0] : label,
      getContent: () => "",
      /* Optional parameters */
      key: index,
      color: label.includes("!-!-!-") ? label.split("!-!-!-")[1] : "8",
    }));
  }

  const isRowLoaded = ({ index }) => {
    return !!dataArray[index];
  };
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const getTopBarName = () => {
    let name = undefined;
    if (userIdForRecentsChatQuery) {
      if (props.managersListData && props.managersListData.length) {
        name = props.managersListData.find(
          (curr) => curr.id == userIdForRecentsChatQuery
        )?.name;
      }
      if (
        name == undefined &&
        props.usersListData &&
        props.usersListData.length
      ) {
        name = props.usersListData.find(
          (curr) => curr.id == userIdForRecentsChatQuery
        )?.name;
      }
    }

    return name;
  };
  var value = 0;
  const rndInt = randomIntFromInterval(1, 5);
  const chatListRef = useRef(null);

  useEffect(() => {
    if (props.activeUserDetail.id == undefined) setShowBar(true);
    else if (props.activeUserDetail.id != props.authUserId) {
      setShowBar(true);

    }
    if (props.ifMyChatsTabPressed) setShowBar(false);
  }, [props.activeUserDetail.id, props.authUserId, props.ifMyChatsTabPressed]);

  return (
    <>

      <div disableGutters={true} style={{ height: "calc(100vh - 230px)" }}>
        {!new includes().showRecentListIsLoadingAccordingToPanelType(
          props.chatBoxSubscriptionStatus,
          props.authPanelType,
          props.usersListSelectedUser,
          props.chatBoxRecentChatListDataTotalCount,
          props.chatBoxRecentChatListShowAllListToggle
        ) ? (
          <div style={{ height: "calc(100vh - 235px)", overflowY: "hidden" }}>
            {
              <div
                style={{
                  width: "100%",
                  height: "35px",
                  background: "#3e3e3e",
                  display: !showBar ? "none" : null,
                }}
              >
                <div
                  style={{
                    width: "95%",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    height: "35px",
                  }}
                >
                  <>
                    <img
                      onClick={() => {
                        props.backBtnHandler(userIdForRecentsChatQuery);

                      }}
                      src={backIcon}
                      style={{ width: "20px", cursor: "pointer" }}
                      alt="backIcon"
                    />

                    <span
                      style={{
                        fontFamily: "Poppins",
                        color: "#fefefe",
                        marginLeft: "10px",
                        fontSize: "13px",
                      }}
                    >
                      {/* {userIdForRecentsChatQuery && props.usersListData && props.usersListData.length && props.usersListData.find((curr)=>curr.id ==userIdForRecentsChatQuery ).name} */}
                      {getTopBarName()}
                    </span>
                  </>
                </div>
              </div>
            }

            <div id="scrolltome"></div>

            {dataArray?.length > 0 ? (
              <AutoSizer>
                {({ height, width }) => (

                  <List
                    ref={chatListRef}
                    className={props.className}
                    rowHeight={86}
                    // rowHeight={({ index }) => {
                    //   var item = dataArray[index];

                    //   if (item) {

                    //     var labelsCount = getLabels(item.labels).length;
                    //     return labelsCount > 0 ? 116 : 86;
                    //   } else return 86;
                    // }}
                    rowCount={
                      dataArray.length
                    }
                    height={height}
                    width={width}
                    // noRowsRenderer={() => {

                    //   return (
                    //     <div className={classes.listNoRows}>
                    //       {new includes().getEmptyRecentListMessage(
                    //         props.authPanelType,
                    //         props.usersListSelectedUser,
                    //         props.chatBoxRecentChatListShowAllListToggle
                    //       )}
                    //     </div>
                    //   );
                    // }}
                    rowRenderer={({ index, isScrolling, key, style }) => {
                      // if(lastRowIndex < index)
                      // setLastRowIndex(index);
                      var item = dataArray[index];
                      if (index == dataArray.length - 1 && isScrolling == false) {

                        // console.log(index,isScrolling,"index value")
                        fetchMoreData()
                      }

                      if (isRowLoaded({ index })) {
                        var item = dataArray[index];

                        return (
                          <>

                            <ListItem
                              key={item.customerId}
                              style={style}
                              classes={{
                                root: clsx(classes.listItem, {
                                  [classes.selectedListItem]: item && item.selected,
                                }),
                              }}
                              onClick={() => {
                                props.onItemClick(item);
                              }}
                              button
                              className={classes.listItemButton}
                            >
                              <Container
                                disableGutters={true}
                                className={clsx(
                                  classes.listItemContainer,
                                  classes.listItemInnerContainer
                                )}
                              >
                                <Container
                                  disableGutters={true}
                                  className={classes.listItemAvatarAndTextContainer}
                                >
                                  <ListItemAvatar>
                                    <div style={{ position: 'relative' }}>
                                      <FacebookAvatar
                                        key={item.customerId}
                                        className={classes.customerIcon}
                                        type="customer"
                                        item={item}
                                      ></FacebookAvatar>
                                      <img style={{ width: "13px", position: 'absolute', bottom: '0px', right: '5px' }} src={messengerIcon} alt="messenger" />

                                    </div>
                                  </ListItemAvatar>
                                  <ListItemText
                                    classes={{
                                      primary: classes.listItemPrimaryText,
                                      secondary: clsx(classes.listItemSecondaryText, {
                                        [classes.listItemSecondaryTextMarkUnread]:
                                          !item.read,
                                      }),
                                    }}
                                    primary={
                                      <FacebookTypography
                                        className={clsx(classes.listItemPri, {
                                          [classes.listItemPrimaryTextMarkUnread]:
                                            !item.read,
                                        })}
                                        key={item.customerId}
                                        pageNameChange={(name) => {
                                          var findItem = _.find(
                                            props.chatBoxRecentChatListData,
                                            (list) =>
                                              list.pageId == item.pageId &&
                                              list.customerId == item.customerId
                                          );
                                          if (findItem) {
                                            if (findItem.pageName != name) {
                                              findItem.pageName = name;

                                              props.setChatBoxRecentChatListData(
                                                _.cloneDeep(
                                                  props.chatBoxRecentChatListData
                                                )
                                              );
                                            }
                                          }
                                        }}
                                        customerNameChange={(name) => {

                                          var findItem = _.find(
                                            props.chatBoxRecentChatListData,
                                            (list) =>
                                              list.pageId == item.pageId &&
                                              list.customerId == item.customerId
                                          );

                                          if (findItem) {
                                            if (findItem.customerName != name) {
                                              findItem.customerName = name;
                                              props.setChatBoxRecentChatListData(
                                                _.cloneDeep(
                                                  props.chatBoxRecentChatListData
                                                )
                                              );
                                            }
                                          }
                                        }}
                                        item={item}
                                      />
                                    }
                                    secondary={
                                      item?.lastMessage?.length > 30
                                        ? `${item?.lastMessage?.slice(0, 30)}...`
                                        : item?.lastMessage
                                    }
                                  />
                                </Container>

                                <div
                                  style={{
                                    flexGrow: 1,
                                    position: "absolute",
                                    top: "58px",
                                    left: "50px",
                                    width: "190px",
                                  }}
                                  className="basic__tabs"
                                >



                                  
                                  <Tabs
                                    colorNumber={rndInt}
                                    allowRemove={true}
                                    key={item.labels}
                                    showMore={true}
                                    showMoreLabel={"more"}
                                    showInkBar={false}
                                    transform={false}
                                    unmountOnExit={true}
                                    selectedTabKey={0}
                                    onChildrenClick={(key, text) => {
                                      props.setChatBoxRecentSearchText("");
                                      props.setChatBoxRecentSearchChatIds([]);
                                      props.setChatBoxRecentSearchInputText(
                                        "l:" + text
                                      );
                                    }}

                                    items={getLabels(item.labels)}
                                  />






                                  
                                </div>
                                <div className={classes.listItemBottomContainer}>
                                  {!item.typingMessageDetails && (
                                    <div
                                      className={
                                        classes.markNotToAddInChatCircleContainer
                                      }
                                    >
                                      {item.marknottoaddinchatcircle === 1 ? (
                                        <div
                                          className={
                                            classes.markNotToAddInChatCircleSpan
                                          }
                                        >
                                          Closed
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                  {item.typingMessageDetails ? (
                                    <ChatListTypingMessageStatus
                                      pageId={item.pageId}
                                      customerId={item.customerId}
                                      typingMessageDetails={item.typingMessageDetails}
                                    ></ChatListTypingMessageStatus>
                                  ) : null}
                                  <ReactTimeAgo
                                    className={classes.timeStamp}
                                    date={moment.unix(item.lastMessageTimeStamp / 1000)}
                                    locale="en-US"
                                  />
                                </div>
                              </Container>
                            </ListItem>

                          </>
                        );
                      }
                    }}

                  ></List>
                )}
              </AutoSizer>
              //     <List>
              //       {dataArray?.map((item, index) => (
              //         <Fragment key={index}>
              //           {index === props.chatBoxRecentChatListData.length - 1 && (
              //             <Waypoint onEnter={() => fetchMoreData()} />
              //           )}
              //           <ListItem
              //             key={item.customerId}
              //             // style={style}
              //             classes={{
              //               root: clsx(classes.listItem, {
              //                 [classes.selectedListItem]:
              //                   (item && item.selected) ||
              //                   (item.customerId ==
              //                     props?.propsObjectData[0]?.customerId &&
              //                     props?.propsObjectData[0]?.customerId !=
              //                       undefined),
              //               }),
              //             }}
              //             onClick={() => {
              //               props.onItemClick(item);
              //               history.push(`/chat/${item.customerId}`, {
              //                 prop1: item,
              //               });
              //               props.setPropsObjectData(undefined);

              //             }}
              //             button
              //             className={classes.listItemButton}
              //           >
              //             <Container
              //               disableGutters={true}
              //               className={clsx(
              //                 classes.listItemContainer,
              //                 classes.listItemInnerContainer
              //               )}
              //             >
              //               <Container
              //                 disableGutters={true}
              //                 className={classes.listItemAvatarAndTextContainer}
              //               >
              //                 <ListItemAvatar>
              //                   <div style={{position:'relative'}}>
              //                   <FacebookAvatar
              //                     key={item.customerId}
              //                     className={classes.customerIcon}
              //                     type="customer"
              //                     item={item}
              //                   ></FacebookAvatar>
              // <img style={{ width: "13px",position:'absolute',bottom:'0px',right:'5px' }} src={messengerIcon} alt="messenger" />

              //                   </div>
              //                 </ListItemAvatar>
              //                 <ListItemText
              //                   classes={{
              //                     primary: classes.listItemPrimaryText,
              //                     secondary: clsx(classes.listItemSecondaryText, {
              //                       [classes.listItemSecondaryTextMarkUnread]:
              //                         !item.read,
              //                     }),
              //                   }}
              //                   primary={
              //                     <FacebookTypography
              //                       className={clsx(classes.listItemPri, {
              //                         [classes.listItemPrimaryTextMarkUnread]:
              //                           !item.read,
              //                       })}
              //                       key={item.customerId}
              //                       pageNameChange={(name) => {
              //                         var findItem = _.find(
              //                           props.chatBoxRecentChatListData,
              //                           (list) =>
              //                             list.pageId == item.pageId &&
              //                             list.customerId == item.customerId
              //                         );
              //                         if (findItem) {
              //                           if (findItem.pageName != name) {
              //                             findItem.pageName = name;

              //                             props.setChatBoxRecentChatListData(
              //                               _.cloneDeep(
              //                                 props.chatBoxRecentChatListData
              //                               )
              //                             );
              //                           }
              //                         }
              //                       }}
              //                       customerNameChange={(name) => {
              //                         var findItem = _.find(
              //                           props.chatBoxRecentChatListData,
              //                           (list) =>
              //                             list.pageId == item.pageId &&
              //                             list.customerId == item.customerId
              //                         );

              //                         if (findItem) {
              //                           if (findItem.customerName != name) {
              //                             findItem.customerName = name;
              //                             props.setChatBoxRecentChatListData(
              //                               _.cloneDeep(
              //                                 props.chatBoxRecentChatListData
              //                               )
              //                             );
              //                           }
              //                         }
              //                       }}
              //                       item={item}
              //                     />
              //                   }
              //                   secondary={
              //                     item?.lastMessage?.length > 30
              //                       ? `${item?.lastMessage?.slice(0, 30)}...`
              //                       : item?.lastMessage
              //                   }
              //                 />
              //               </Container>

              //               <div
              //                 style={{
              //                   flexGrow: 1,
              //                   position: "absolute",
              //                   top: "58px",
              //                   left: "50px",
              //                   width: "190px",
              //                 }}
              //                 className="basic__tabs"
              //               >
              //                 <Tabs
              //                   colorNumber={rndInt}
              //                   allowRemove={true}
              //                   key={item.labels}
              //                   showMore={true}
              //                   showMoreLabel={"more"}
              //                   showInkBar={false}
              //                   transform={false}
              //                   unmountOnExit={true}
              //                   selectedTabKey={0}
              //                   onChildrenClick={(key, text) => {
              //                     props.setChatBoxRecentSearchText("");
              //                     props.setChatBoxRecentSearchChatIds([]);
              //                     props.setChatBoxRecentSearchInputText(
              //                       "l:" + text
              //                     );
              //                   }}

              //                   items={getLabels(item.labels)}
              //                 />
              //               </div>
              //               <div className={classes.listItemBottomContainer}>
              //                 {!item.typingMessageDetails && (
              //                   <div
              //                     className={
              //                       classes.markNotToAddInChatCircleContainer
              //                     }
              //                   >
              //                     {item.marknottoaddinchatcircle === 1 ? (
              //                       <div
              //                         className={
              //                           classes.markNotToAddInChatCircleSpan
              //                         }
              //                       >
              //                         Closed
              //                       </div>
              //                     ) : null}
              //                   </div>
              //                 )}

              //                 {item.typingMessageDetails ? (
              //                   <ChatListTypingMessageStatus
              //                     pageId={item.pageId}
              //                     customerId={item.customerId}
              //                     typingMessageDetails={item.typingMessageDetails}
              //                   ></ChatListTypingMessageStatus>
              //                 ) : null}
              //                 <ReactTimeAgo
              //                   className={classes.timeStamp}
              //                   date={moment.unix(item.lastMessageTimeStamp / 1000)}
              //                   locale="en-US"
              //                 />
              //               </div>
              //             </Container>
              //           </ListItem>
              //         </Fragment>
              //       ))}

              //       {showCircle == true && filterData.length == 0 &&  (
              //         <CircularProgress
              //           className={classes.loadingCircularProgress}
              //           size={24}
              //         />
              //       )}
              //     </List>
            ) : (
              <>
                {chatLastDetailsByIdWithPaginationQueryLoading ? (
                  <>
                    <CircularProgress
                      className={classes.loadingCircularProgress}
                      size={24}
                    />
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        color: "gray",
                        marginTop: "10%",
                      }}
                    >
                      No Chats Found
                    </div>
                  </>
                )}
              </>
            )}
            {/* {
            dataArray?.length > 0 ? (
              <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={chatListRef}
                  className={props.className}
                  rowHeight={({ index }) => {
                    var item = dataArray[index];
                    if (item) {
            
                      var labelsCount = getLabels(item.labels).length;
                      return labelsCount > 0 ? 116 : 86;
                    } else return 86;
                  }}
                  rowCount={
                    filterData != null
                      ? filterData.length
                      : props.chatBoxRecentChatListDataTotalCount
                  }
                  height={height}
                  width={width}
                  noRowsRenderer={() => {
                    return (
                      <div className={classes.listNoRows}>
                        {new includes().getEmptyRecentListMessage(
                          props.authPanelType,
                          props.usersListSelectedUser,
                          props.chatBoxRecentChatListShowAllListToggle
                        )}
                      </div>
                    );
                  }}
                  rowRenderer={({ index, isScrolling, key, style }) => {
                    // if(lastRowIndex < index)
                    // setLastRowIndex(index);
                    var item = dataArray[index];
                    if(index == dataArray.length-1 && isScrolling == false){
            
                      fetchMoreData()
                    }
            
                    if (isRowLoaded({index})) {
                      var item = dataArray[index];
            
                      return (
                        <>
                  
                        <ListItem
                          key={item.customerId}
                          style={style}
                          classes={{
                            root: clsx(classes.listItem, {
                              [classes.selectedListItem]: item && item.selected,
                            }),
                          }}
                          onClick={() => {
                            props.onItemClick(item);
                          }}
                          button
                          className={classes.listItemButton}
                        >
                          <Container
                            disableGutters={true}
                            className={clsx(
                              classes.listItemContainer,
                              classes.listItemInnerContainer
                            )}
                          >
                            <Container
                              disableGutters={true}
                              className={classes.listItemAvatarAndTextContainer}
                            >
                              <ListItemAvatar>
                              <div style={{position:'relative'}}>
                                <FacebookAvatar
                                  key={item.customerId}
                                  className={classes.customerIcon}
                                  type="customer"
                                  item={item}
                                ></FacebookAvatar>
                                <img style={{ width: "13px",position:'absolute',bottom:'0px',right:'5px' }} src={messengerIcon} alt="messenger" />
            
            </div>
                              </ListItemAvatar>
                              <ListItemText
                                classes={{
                                  primary: classes.listItemPrimaryText,
                                  secondary: clsx(classes.listItemSecondaryText, {
                                    [classes.listItemSecondaryTextMarkUnread]:
                                      !item.read,
                                  }),
                                }}
                                primary={
                                  <FacebookTypography
                                    className={clsx(classes.listItemPri,{
                                      [classes.listItemPrimaryTextMarkUnread]:
                                        !item.read,
                                    })}
                                    key={item.customerId}
                                    pageNameChange={(name) => {
                                      var findItem = _.find(
                                        props.chatBoxRecentChatListData,
                                        (list) =>
                                          list.pageId == item.pageId &&
                                          list.customerId == item.customerId
                                      );
                                      if (findItem) {
                                        if (findItem.pageName != name) {
                                          findItem.pageName = name;
            
                                          props.setChatBoxRecentChatListData(
                                            _.cloneDeep(
                                              props.chatBoxRecentChatListData
                                            )
                                          );
                                        }
                                      }
                                    }}
                                    customerNameChange={(name) => {
            
                                      var findItem = _.find(
                                        props.chatBoxRecentChatListData,
                                        (list) =>
                                          list.pageId == item.pageId &&
                                          list.customerId == item.customerId
                                      );
            
                                      if (findItem) {
                                        if (findItem.customerName != name) {
                                          findItem.customerName = name;
                                          props.setChatBoxRecentChatListData(
                                            _.cloneDeep(
                                              props.chatBoxRecentChatListData
                                            )
                                          );
                                        }
                                      }
                                    }}
                                    item={item}
                                  />
                                }
                                secondary={
                                  item?.lastMessage?.length > 30
                                    ? `${item?.lastMessage?.slice(0, 30)}...`
                                    : item?.lastMessage
                                }
                              />
                            </Container>
                           
                    <div
                      style={{
                        flexGrow: 1,
                        position: "absolute",
                        top: "58px",
                        left: "50px",
                        width: "190px",
                      }}
                      className="basic__tabs"
                    >                 
                     <Tabs
             colorNumber={rndInt}
            allowRemove={true}
                                key={item.labels}
                                showMore={true}
                                showMoreLabel={"more"}
                                showInkBar={false}
                                transform={false}
                                unmountOnExit={true}
                                selectedTabKey={0}
                                onChildrenClick={(key, text) => {
                                  props.setChatBoxRecentSearchText("");
                                  props.setChatBoxRecentSearchChatIds([]);
                                  props.setChatBoxRecentSearchInputText(
                                    "l:" + text
                                  );
                                }}
                          
                                items={getLabels(item.labels)}
                              />
                            </div>
                            <div className={classes.listItemBottomContainer}>
                              {!item.typingMessageDetails && (
                                <div
                                  className={
                                    classes.markNotToAddInChatCircleContainer
                                  }
                                >
                                  {item.marknottoaddinchatcircle === 1 ? (
              <div
              className={
                classes.markNotToAddInChatCircleSpan
              }
            >
              Closed
            </div>
                                  ) : null}
                                </div>
                              )}
                              {item.typingMessageDetails ? (
                                <ChatListTypingMessageStatus
                                  pageId={item.pageId}
                                  customerId={item.customerId}
                                  typingMessageDetails={item.typingMessageDetails}
                                ></ChatListTypingMessageStatus>
                              ) : null}
                              <ReactTimeAgo
                                className={classes.timeStamp}
                                date={moment.unix(item.lastMessageTimeStamp / 1000)}
                                locale="en-US"
                              />
                            </div>
                          </Container>
                        </ListItem>
            
                        </>
                      );
                    }
                  }}
                ></List>
              )}
            </AutoSizer>
            ): <>
            {chatLastDetailsByIdWithPaginationQueryLoading ? (
              <>
                <CircularProgress
                  className={classes.loadingCircularProgress}
                  size={24}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    color: "gray",
                    marginTop: "10%",
                  }}
                >
                  No Chats Found
                </div>
              </>
            )}
          </> 
          } */}

          </div>
        ) :




          // <AutoSizer>
          //   {({ height, width }) => (
          //     <List
          //       ref={chatListRef}
          //       className={props.className}
          //       // rowHeight={({ index }) => {
          //       //   var item = dataArray[index];
          //       //   if (item) {

          //       //     var labelsCount = getLabels(item.labels).length;
          //       //     return labelsCount > 0 ? 116 : 86;
          //       //   } else return 86;
          //       // }}
          //       // rowCount={
          //       //   filterData != null
          //       //     ? filterData.length
          //       //     : props.chatBoxRecentChatListDataTotalCount
          //       // }
          //       // height={height}
          //       // width={width}
          //       // noRowsRenderer={() => {
          //       //   return (
          //       //     <div className={classes.listNoRows}>
          //       //       {new includes().getEmptyRecentListMessage(
          //       //         props.authPanelType,
          //       //         props.usersListSelectedUser,
          //       //         props.chatBoxRecentChatListShowAllListToggle
          //       //       )}
          //       //     </div>
          //       //   );
          //       // }}
          //       rowRenderer={({ index, isScrolling, key, style }) => {
          //         // if(lastRowIndex < index)
          //         // setLastRowIndex(index);

          //         if (isRowLoaded({index})) {
          //           var item = dataArray[index];

          //           return (
          //             <>
          //            <Waypoint
          //         onEnter={()=>console.log(index,"index")}

          //       />
          //             <ListItem
          //               key={item.customerId}
          //               style={style}
          //               classes={{
          //                 root: clsx(classes.listItem, {
          //                   [classes.selectedListItem]: item && item.selected,
          //                 }),
          //               }}
          //               onClick={() => {
          //                 props.onItemClick(item);
          //               }}
          //               button
          //               className={classes.listItemButton}
          //             >
          //               <Container
          //                 disableGutters={true}
          //                 className={clsx(
          //                   classes.listItemContainer,
          //                   classes.listItemInnerContainer
          //                 )}
          //               >
          //                 <Container
          //                   disableGutters={true}
          //                   className={classes.listItemAvatarAndTextContainer}
          //                 >
          //                   <ListItemAvatar>
          //                     <FacebookAvatar
          //                       key={item.pageId}
          //                       className={classes.pageIcon}
          //                       item={item}
          //                       type="page"
          //                     ></FacebookAvatar>
          //                     <FacebookAvatar
          //                       key={item.customerId}
          //                       className={classes.customerIcon}
          //                       type="customer"
          //                       item={item}
          //                     ></FacebookAvatar>
          //                   </ListItemAvatar>
          //                   <ListItemText
          //                     classes={{
          //                       primary: classes.listItemPrimaryText,
          //                       secondary: clsx(classes.listItemSecondaryText, {
          //                         [classes.listItemSecondaryTextMarkUnread]:
          //                           !item.read,
          //                       }),
          //                     }}
          //                     primary={
          //                       <FacebookTypography
          //                         className={clsx({
          //                           [classes.listItemPrimaryTextMarkUnread]:
          //                             !item.read,
          //                         })}
          //                         key={item.customerId}
          //                         pageNameChange={(name) => {
          //                           var findItem = _.find(
          //                             props.chatBoxRecentChatListData,
          //                             (list) =>
          //                               list.pageId == item.pageId &&
          //                               list.customerId == item.customerId
          //                           );
          //                           if (findItem) {
          //                             if (findItem.pageName != name) {
          //                               findItem.pageName = name;

          //                               props.setChatBoxRecentChatListData(
          //                                 _.cloneDeep(
          //                                   props.chatBoxRecentChatListData
          //                                 )
          //                               );
          //                             }
          //                           }
          //                         }}
          //                         customerNameChange={(name) => {

          //                           var findItem = _.find(
          //                             props.chatBoxRecentChatListData,
          //                             (list) =>
          //                               list.pageId == item.pageId &&
          //                               list.customerId == item.customerId
          //                           );

          //                           if (findItem) {
          //                             if (findItem.customerName != name) {
          //                               findItem.customerName = name;
          //                               props.setChatBoxRecentChatListData(
          //                                 _.cloneDeep(
          //                                   props.chatBoxRecentChatListData
          //                                 )
          //                               );
          //                             }
          //                           }
          //                         }}
          //                         item={item}
          //                       />
          //                     }
          //                     secondary={item.lastMessage}
          //                   />
          //                 </Container>
          //                 <div style={{ flexGrow: 1 }} className="basic__tabs">
          //                   <Tabs
          //                     allowRemove={true}
          //                     key={item.labels}
          //                     showMore={true}
          //                     showMoreLabel={"more"}
          //                     showInkBar={false}
          //                     transform={false}
          //                     unmountOnExit={true}
          //                     selectedTabKey={0}
          //                     onChildrenClick={(key, text) => {
          //                       props.setChatBoxRecentSearchText("");
          //                       props.setChatBoxRecentSearchChatIds([]);
          //                       props.setChatBoxRecentSearchInputText(
          //                         "l:" + text
          //                       );
          //                     }}
          //                     onRemove={(key, text) => {
          //                       props.onLabelRemove(
          //                         text,
          //                         item.pageId,
          //                         item.customerId
          //                       );
          //                     }}
          //                     items={getLabels(item.labels)}
          //                   />
          //                 </div>
          //                 <div className={classes.listItemBottomContainer}>
          //                   {!item.typingMessageDetails && (
          //                     <div
          //                       className={
          //                         classes.markNotToAddInChatCircleContainer
          //                       }
          //                     >
          //                       {item.marknottoaddinchatcircle === 1 ? (
          //                         <Tooltip title={"Closed"}>
          //                           <span
          //                             className={
          //                               classes.markNotToAddInChatCircleSpan
          //                             }
          //                           ></span>
          //                         </Tooltip>
          //                       ) : null}
          //                       {
          //                         item.marknottoaddinchatcircle === 2 ? (
          //                           <Tooltip title={"Sales Done wpp"}>
          //                             <span
          //                               className={
          //                                 classes.salesDonewppSpan
          //                               }
          //                             ></span>
          //                           </Tooltip>
          //                         ) : null
          //                       }
          //                         {
          //                         item.marknottoaddinchatcircle === 3 ? (
          //                           <Tooltip title={"Sales Done pp"}>
          //                             <span
          //                               className={
          //                                 classes.salesDoneppSpan
          //                               }
          //                             ></span>
          //                           </Tooltip>
          //                         ) : null
          //                       }
          //                     </div>
          //                   )}
          //                   {item.typingMessageDetails ? (
          //                     <ChatListTypingMessageStatus
          //                       pageId={item.pageId}
          //                       customerId={item.customerId}
          //                       typingMessageDetails={item.typingMessageDetails}
          //                     ></ChatListTypingMessageStatus>
          //                   ) : null}
          //                   <ReactTimeAgo
          //                     className={classes.timeStamp}
          //                     date={moment.unix(item.lastMessageTimeStamp / 1000)}
          //                     locale="en-US"
          //                   />
          //                 </div>
          //               </Container>
          //             </ListItem>

          //             </>
          //           );
          //         } else {
          //           if(!chatLastDetailsByIdWithPaginationQueryLoading
          //             && !onResquestFetching_.current
          //             ){
          //               // fetchMe(props.chatBoxRecentChatListData,userIdForRecentsChatQuery,currentCursor,chatBoxRecentChatListFetchNumber,managerIdForRecentsChatQuery);
          //               console.log("called")

          //           }
          //           return (
          //             <div
          //               style={style}
          //               className={classes.listItemBottomContainer}
          //             >
          //               <ContentLoader
          //                 speed={4}
          //                 width={width}
          //                 height={86}
          //                 viewBox={`0 0 ${width} ${86}`}
          //                 backgroundColor="#bfbfbf"
          //                 foregroundColor="#dedede"
          //               >
          //                 <circle cx="53" cy="20" r="20" />
          //                 <circle cx="29" cy="19" r="20" />
          //                 <rect
          //                   x="86"
          //                   y="6"
          //                   rx="3"
          //                   ry="3"
          //                   width={width}
          //                   height="8"
          //                 />
          //                 <rect
          //                   x="87"
          //                   y="25"
          //                   rx="3"
          //                   ry="3"
          //                   width="90"
          //                   height="8"
          //                 />
          //                 <rect
          //                   x="1"
          //                   y="57"
          //                   rx="3"
          //                   ry="3"
          //                   width={width}
          //                   height="2"
          //                 />
          //               </ContentLoader>
          //             </div>
          //           );
          //         }
          //       }}
          //     ></List>
          //   )}
          // </AutoSizer>
          // <CircularProgress
          //   className={classes.loadingCircularProgress}
          //   size={24}
          // />
          null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.ChatBoxReducer,
    ...state.AuthReducer,
    ...state.UsersListReducer,
    ...state.ManagersListReducer,
    ...state.AdminDataReducer,
    ...state.PropsObjectDataReducer,
  };
};
export default connect(mapStateToProps, {
  setUsersListSearchText,
  setUsersListSearchInputText,
  setChatBoxRecentChatListData,
  setChatBoxRecentSearchText,
  setChatBoxRecentSearchChatIds,
  setChatBoxRecentSearchInputText,
  setChatBoxRecentChatListDataTotalCount,
  setUsersListSelectedUser,
  setUsersListData,
  setAllUsersData,
  setPropsObjectData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxNotificationCustomerId
})(ChatList);
