import React, { useEffect } from "react";
import { Tabs, Tab, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import {
  setManagersListData,
  setManagersListSelectedManager,
} from "../../store/actions/ManagersListActions";

import { setAllUsersData } from "../../store/actions/AdmindataActions";
import {
  setChatBoxRecentChatListDataTotalCount,
  setChatBoxRecentChatListData,
  setChatBoxRecentChatListShowAllListToggle,
  setChatBoxRecentChatListShowAllListByManagerButtonToggle,
} from "../../store/actions/ChatBoxActions";
import { setUsersListSelectedUser } from "../../store/actions/UsersListActions";
import _ from "lodash";
import clsx from "clsx";
import Report from "./Report";
const useStyles = makeStyles((theme) => ({
  managersListTabScrollButtons: {
    background: "#66c047",
    color: "white",
  },
  managerTabContainer: {
    display: "flex",
    alignItems: "center",
  },
  managerTab: {
    maxWidth: 300,
    borderRight: "1px solid gray",
    marginRight: 6,
    backgroundColor: "#ababab" /*for compatibility with older browsers*/,
    backgroundImage: "linear-gradient(#ababab,white)",
  },
  selectedManagerTab: {
    backgroundColor: "#9ac387" /*for compatibility with older browsers*/,
    backgroundImage: "linear-gradient(white,#9ac387)",
  },
  managerNameTypography: {
    display: "inline",
    color: "black",
    marginLeft: 5,
    width: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: 200,
  },
  bottomChatsTabContainer: {
    display: "flex",
    alignItems: "center",
  },
  managersListMainContainer: {
    borderBottom: "1px solid gray",
  },
}));

const ManagersListTabContainer = (props) => {
  const classes = useStyles();
  const ManagersQuery = gql`
    query Managers($managersOnly: Boolean = true) {
      users(managersOnly: $managersOnly) {
        id
        name
      }
    }
  `;

  const [
    getManagers,
    {
      loading: managersQueryLoading,
      error: managersQueryError,
      data: managersQueryResult,
    },
  ] = useLazyQuery(ManagersQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (managersQueryResult && managersQueryResult.users) {
      props.setManagersListData(managersQueryResult.users);
    }
  }, [managersQueryResult]);

  const GetUsers = gql`
    query Users($mainSuperAdminId: ID!) {
      users(mainSuperAdminId: $mainSuperAdminId) {
        id
        picture
        name
        pseudonym
        username
        email
        number
        designation {
          id
          name
          paneltype
        }
        status
        comments
        managerId {
          id
          name
        }
        settings
        agentlimitchatassign
        pages
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
    if (getUsersQueryResult && getUsersQueryResult.users) {
      props.setAllUsersData(getUsersQueryResult.users);
    }
  }, [getUsersQueryResult]);

  useEffect(() => {
    if (!props.allusersdata.length) {
      getUsers({
        variables: {
          mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail"))
            .mainSuperAdminId,
        },
      });
    }
    // getManagers({
    //   variables: {
    //     managersOnly: true,
    //   },
    // });
  }, []);

  useEffect(() => {
    if (props.allusersdata.length) {
      var managerList = props.allusersdata.filter((curr) =>
        curr.designation ? curr.designation.paneltype == "MANAGER" : null
      );
      props.setManagersListData(managerList);
    }
  }, [props.allusersdata]);

  return (
    <div className={classes.managersListMainContainer}>
      <Tabs
        classes={{ scrollButtons: classes.managersListTabScrollButtons }}
        value={_.findIndex(
          props.managersListData,
          (itm) => itm.selected == true
        )}
        onChange={(event, newValue) => {
          var findPreviousManagerSelectedItem = _.find(
            props.managersListData,
            (itm) => itm.selected == true
          );

          if (findPreviousManagerSelectedItem) {
            findPreviousManagerSelectedItem.selected = false;
          }
          var findItem = _.find(
            props.managersListData,
            (itm) => itm.id == newValue
          );
          if (findItem) {
            findItem.selected = true;
            props.setManagersListSelectedManager(findItem.id);
          }
          props.setChatBoxRecentChatListShowAllListByManagerButtonToggle(true);
          props.setUsersListSelectedUser(null);
          props.setChatBoxRecentChatListData([]);
          props.setChatBoxRecentChatListShowAllListToggle(false);
          props.setChatBoxRecentChatListDataTotalCount(null);

          props.setManagersListData(_.cloneDeep(props.managersListData));
        }}
        className={classes.managerTabs}
        variant="scrollable"
        aria-label="Managers tabs"
      >
        {props.managersListData.map((item) => {
          return (<>
            
            <Tab
              key={`simple-tab-${item.id}`}
              value={item.id}
              aria-controls={`simple-tabpanel-${item.id}`}
              className={clsx(classes.managerTab, {
                [classes.selectedManagerTab]: item.selected,
              })}
              label={
                <span className={classes.managerTabContainer}>
                  <Avatar
                    key={item.id}
                    className={classes.managerProfilePic}
                    src={item.picture}
                  ></Avatar>
                  <Typography className={classes.managerNameTypography}>
                    {`${item.name}`}
                  </Typography>
                </span>
              }
            />
          
          </>);
        })}
      </Tabs>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.ManagersListReducer,
    ...state.AdminDataReducer,
  };
};
export default connect(mapStateToProps, {
  setManagersListData,
  setManagersListSelectedManager,
  setUsersListSelectedUser,
  setChatBoxRecentChatListDataTotalCount,
  setChatBoxRecentChatListData,
  setChatBoxRecentChatListShowAllListToggle,
  setChatBoxRecentChatListShowAllListByManagerButtonToggle,
  setAllUsersData,
})(ManagersListTabContainer);
