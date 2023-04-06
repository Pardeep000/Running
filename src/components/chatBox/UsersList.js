import React, { Fragment, useEffect, useRef, useState } from "react";

import {
  Container,
  CircularProgress,
 
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  TextField,
  IconButton,
  Badge,
} from "@material-ui/core";
import { List, AutoSizer } from "react-virtualized";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ClearIcon from "@material-ui/icons/Clear";
import {
  setUsersListSearchInputText,
  setUsersListSearchText,
  setUsersListData,
  setUsersListSubscriptionData,
  setUsersListContextMenuPosAndObjectDetails,
  setUsersListSelectedUser,
} from "../../store/actions/UsersListActions";

import { setAllUsersData } from "../../store/actions/AdmindataActions";
import { setChatBoxRecentChatListShowAllListToggle } from "../../store/actions/ChatBoxActions";
import includes from "./includes";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import { connect } from "react-redux";
import "../../otherComponents/react-responsive-tabs/styles.css";
import { useSnackbar } from "notistack";
import ErrorIcon from "@material-ui/icons/Error";
import LensIcon from "@material-ui/icons/Lens";
import iconRight from "../../assets/chatWindow/Icons-chevron-up.svg";
import UsersListContextMenu from "./UsersListContextMenu";
import searchBtng from "../../assets/chatWindow/Searchg.svg";
import { Waypoint } from "react-waypoint";
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
  listItemPrimaryText: {
    fontWeight: "500",
    flex: 1,
    wordBreak: "break-all",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "break-spaces",
    // maxHeight: 24,
    marginTop: 4,
    fontFamily: "Poppins",
    fontSize: "14px !important",
  },

  listItemButton: {
    overflow: "hidden!important",
    borderBottom: "0px solid #d0cfcf",
    width: "96% !important",
    marginLeft: "2%",
    paddingRight: 4,
    "&:hover": {
      borderRadius: "10px",
      background: "#eeeeee",
      border: "1px solid #d7d7d7",
      boxShadow: "0px 2px 1px 1px rgba(0,0,0,0.02)",
    },
  },
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
  },
  selectedListItem: {
    background: "#eaeaea",
    borderLeft: "7px solid #9ac2ff",
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    cursor: "context-menu",
  },

  listItemAvatarAndTextContainer: {
    display: "flex",
  },
  listItemSecondaryText: {
    whiteSpace: "nowrap",
    fontSize: 12,
    marginTop: 3,
  },

  listItemInnerContainer: {
    paddingLeft: 6,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  listItem: {
    padding: "10px !important",
  },
  listItemBottomContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listNoRows: {
    padding: 10,
  },
  userList: {
    overflowY: "auto",
    overflowX: "hidden",
  },
  disconnectedIcon: {
    marginRight: 3,
    color: "#f50057",
  },
  primaryTextContainer: {
    display: "flex",
  },
  spans: {
    width: "100px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  onlineStatusIcon: {
    marginRight: 3,
    color: "green",
    fontFamily: "Poppins",
  },
  offlineStatusIcon: {
    marginRight: 3,
    color: "red",
    fontFamily: "Poppins",
  },
  userAvatar: {
    marginTop: 7,
  },
  userAvatarChatsCountBadge: {
    background: "#55a530",
    marginTop: 14,
    transform: " scale(0.88) translate(-15%, -45%)",
    fontSize: "10.5px",
    color: "white",
  },
}));

const UsersList = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [filterData, setfilterData] = useState(null);
  const GetSubscriptionDataQuery = gql`
    query GetSubscriptionDataall {
      getsubscriptiondataall {
        id
        data
      }
    }
  `;

  let [getSubscriptionDataall, { data: getSubscriptionDataQueryResult }] =
    useLazyQuery(GetSubscriptionDataQuery, {
      fetchPolicy: "network-only",
    });
  
  useEffect(() => {
    if (
      getSubscriptionDataQueryResult &&
      getSubscriptionDataQueryResult.getsubscriptiondataall
    ) {
      props.setUsersListSubscriptionData(
        JSON.parse(getSubscriptionDataQueryResult.getsubscriptiondataall.data)
      );
    }
  }, [getSubscriptionDataQueryResult]);

  const GetUsers = gql`
    query getUsers($accessToken: String, $cursor: Int, $limit: Int) {
      getUsers(accessToken: $accessToken, cursor: $cursor, limit: $limit) {
        users {
          id
          name
          username
          email
          status
          managerId {
            id
          }
          agentlimitchatassign
          designation {
            id
            name
            paneltype
          }
          number
          pages
        }
        hasNextPage
      }
    }
  `;

  let [
    getUsers,
    {
      loading: getUsersQueryLoading,
      error: getUsersQueryError,
      data: getUsersQueryResult,
    },
  ] = useLazyQuery(GetUsers, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (getUsersQueryResult && getUsersQueryResult.getUsers.users) {

      var usersListData = [];
      getUsersQueryResult.getUsers.users
        .filter((curr) => curr.designation.paneltype === "AGENT")
        .map((user) => {
          const findCurrentSubUserData = _.find(
            props.usersListSubscriptionData,
            (dataSub) => dataSub.agentId == user.id
          );

          usersListData.push({
            id: user.id,
            name: user.name,
            picture: user.picture,
            isOnline: findCurrentSubUserData
              ? findCurrentSubUserData.isOnline
              : false,
            loggedIn: findCurrentSubUserData
              ? findCurrentSubUserData.loggedIn
              : false,
            isConnected: findCurrentSubUserData
              ? findCurrentSubUserData.isConnected
              : false,
            chatsAssignedCount: findCurrentSubUserData
              ? findCurrentSubUserData.chats.length
              : 0,
            panelType: user.designation.paneltype,
          });
        });
     

       let finalUsersListData = [...props.usersListData,...usersListData];
       finalUsersListData = _.sortBy(finalUsersListData, [
        (item) => item.isOnline && item.isConnected,
        (item) => item.loggedIn,
        (item) => item.chatsAssignedCount
      ]);
     props.setUsersListData(_.cloneDeep(_.reverse(finalUsersListData)));
      
      
    }
  }, [getUsersQueryResult]);

  useEffect(()=>{
    if(props.usersListData && props.usersListData.length){
      var usersListData = [];
      props.usersListData
        .map((user) => {
          const findCurrentSubUserData = _.find(
            props.usersListSubscriptionData,
            (dataSub) => dataSub.agentId == user.id
          );
  
          usersListData.push({
            id: user.id,
            name: user.name,
            picture: user.picture,
            isOnline: findCurrentSubUserData
              ? findCurrentSubUserData.isOnline
              : false,
            loggedIn: findCurrentSubUserData
              ? findCurrentSubUserData.loggedIn
              : false,
            isConnected: findCurrentSubUserData
              ? findCurrentSubUserData.isConnected
              : false,
            chatsAssignedCount: findCurrentSubUserData
              ? findCurrentSubUserData.chats.length
              : 0,
            panelType: user.panelType,
          });
        });
      usersListData = _.sortBy(usersListData, [
        (item) => item.isOnline && item.isConnected,
        (item) => item.loggedIn,
        (item) => item.chatsAssignedCount
      ]);

      props.setUsersListData(_.cloneDeep(_.reverse(usersListData)));
    }
    
  },[props.usersListSubscriptionData])
  const userListItemHandleClick = (event, userId) => {
    event.preventDefault();

    props.setUsersListContextMenuPosAndObjectDetails({
      anchorEl: event.currentTarget,
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      userId: userId,
    });
  };
  useEffect(() => {
    if (true) {
      getSubscriptionDataall();
    }
  }, []);

  useEffect(() => {
    getUsers({
      variables:{
        cursor:0,
        limit:20
      }
    });
   
  }, []);


  var searchUsersTextFieldTimeOut = null;
  useEffect(() => {
    if (searchUsersTextFieldTimeOut) searchUsersTextFieldTimeOut.clear();

    searchUsersTextFieldTimeOut = setTimeout(() => {
      props.setUsersListSearchText(props.usersListSearchInputText);
    }, 500);
  }, [props.usersListSearchInputText]);

  useEffect(() => {
    if (props.usersListSearchText.length > 0) {
      setfilterData(
        _.filter(props.usersListData, (itm) => {
          var searchValue_ = props.usersListSearchText.toLowerCase();
          if (!itm.name) {
            return [];
          } else {
            return itm.name.toLowerCase().indexOf(searchValue_) != -1;
          }
        })
      );
    } else {
      setfilterData(null);
    }
  }, [props.usersListSearchText, props.usersListData]);

  var dataArray = filterData != null ? filterData : props.usersListData;
  const fetchMoreData = () => {
      if (
      getUsersQueryResult&& getUsersQueryResult.getUsers.hasNextPage
    ) {
  
      // setShowCircle(true);
      getUsers({
        variables: {
          cursor: Math.max(...getUsersQueryResult.getUsers.users.map(o => o.id)),
          limit:20
          
        },
      })
      // setShowCircle(true);
    } else {
      // setShowCircle(false);
    }
    // setShowCircle(false);
  
  };
  return (
    <>
      <div style={{ position: "relative", border:" 5px purple solid"}} >
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
          value={props.usersListSearchInputText}
          onInput={(e) => {
            props.setUsersListSearchInputText(e.target.value);
          }}
          InputProps={{
            endAdornment:
              props.usersListSearchText == "" ? null : (
                <IconButton
                  className={classes.clearSearchButton}
                  onClick={() => {
                    props.setUsersListSearchText("");
                    props.setUsersListSearchInputText("");
                  }}
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

      {/* <UsersListContextMenu /> */}
      <div>
      {false ? (
        <CircularProgress
          className={classes.loadingCircularProgress}
          size={24}
        />
      ) : (
            <div disableGutters={true} style={{ height: "calc(100vh - 230px)" ,border:" 5px yellow solid"}}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                overscanRowsCount={5}
                rowHeight={({ index }) => {
                  return 80;
                }}
                className={classes.userList}
                rowRenderer={({ index, isScrolling, key, style }) => {
                  var item = dataArray[index];
                  if(index == dataArray.length-1 && isScrolling == false){

                    fetchMoreData()
                  }
                  return (
                    <ListItem
                      style={style}
                      classes={{
                        root: clsx(classes.listItem, {
                          [classes.selectedListItem]: item.selected,
                        }),
                      }}
                      onClick={() => {
                        props.setChatBoxRecentChatListShowAllListToggle(false);

                        new includes().bindItemToRecentChatByUser(
                          item,
                          props.usersListData,
                          props.setUsersListData,
                          props.setUsersListSelectedUser
                        );
                        props.onItemClick && props.onItemClick(item);
                      }}
                      button
                      className={classes.listItemButton}
                    >
                      <Container
                        onContextMenu={(event) => {
                          userListItemHandleClick(event, item.id);
                        }}
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
                            <Badge
                              style={{ width: "15px" }}
                              badgeContent={item.chatsAssignedCount}
                              classes={{
                                badge: classes.userAvatarChatsCountBadge,
                              }}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <Avatar
                                className={classes.userAvatar}
                                key={item.picture}
                                src={item.picture}
                              ></Avatar>
                              <Tooltip
                                arrow={true}
                                placement={"top"}
                                title={item.isOnline ? "Online" : "Offline"}
                              >
                                <LensIcon
                                  style={{
                                    width: "12px",
                                    marginTop: "30px",
                                    marginLeft: "-12px",
                                    zIndex: "100",
                                  }}
                                  className={clsx({
                                    [classes.onlineStatusIcon]: item.isOnline,
                                    [classes.offlineStatusIcon]: !item.isOnline,
                                  })}
                                />
                              </Tooltip>
                            </Badge>
                          </ListItemAvatar>

                          <ListItemText
                            classes={{
                              primary: classes.listItemPrimaryText,
                              secondary: clsx(classes.listItemSecondaryText),
                            }}
                            primary={
                              <div className={classes.primaryTextContainer}>
                                {item.isOnline && !item.isConnected && (
                                  <Tooltip
                                    arrow={true}
                                    placement={"top"}
                                    title={"Not connected"}
                                  >
                                    <ErrorIcon
                                      className={classes.disconnectedIcon}
                                    />
                                  </Tooltip>
                                )}

                                <span className={classes.spans}>
                                  {item.name}
                                </span>
                              </div>
                            }
                            secondary={
                              <div
                                className={clsx({
                                  [classes.onlineStatusIcon]: item.isOnline,
                                  [classes.offlineStatusIcon]: !item.isOnline,
                                })}
                              >
                                {item.loggedIn
                                  ? "User is logged in"
                                  : "User is logged out"}
                              </div>
                            }
                          />
                        </Container>
                      </Container>
                      <div style={{ marginLeft: "-4px" }}>
                        <img
                          src={iconRight}
                          style={{ width: "15px", transform: "rotate(90deg)" }}
                        />
                      </div>
                    </ListItem>
                  );
                }}
                rowCount={dataArray.length}
                height={height}
                width={width}
                noRowsRenderer={() => {
                  return (
                    <div className={classes.listNoRows}>
                      {new includes().getEmptyUsersListMessage(
                        props.authPanelType,
                        props.managersListSelectedManager
                      )}
                    </div>
                  );
                }}
              ></List>
            )}
          </AutoSizer>
        </div>
      )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.UsersListReducer,
    ...state.AuthReducer,
    ...state.ManagersListReducer,
    ...state.AdminDataReducer,
  };
};
export default connect(mapStateToProps, {
  setUsersListSearchInputText,
  setUsersListSearchText,
  setUsersListData,
  setUsersListSubscriptionData,
  setUsersListContextMenuPosAndObjectDetails,
  setUsersListSelectedUser,
  setChatBoxRecentChatListShowAllListToggle,
  setAllUsersData,
})(UsersList);
