import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { setAdminPanelDrawerToggle } from "../../store/actions/AdminpanelActions";
import { createBrowserHistory } from "history";
import AddUsers from "./addUsers";
import AddDesignations from "./addDesignations";
import AddProfiles from "./addProfiles";
import AddPages from "./addPages";
import ChatContainer from "../chatBox/ChatContainer";
import ChatBox from "../chatBox";
import Setting from "../setting";
import Traffic from "./traffic";
import CustomizedTables from "./traffic/materialtable";
import FullScreenNotification from "./FullScreenNotification";
import NotificationMain from "../Notification/Notification";
import Report from "../chatBox/Report";
import TotalCustomer from "../Report/TotalCustomer/TotalCustomer";
import DailySummary from "../Report/DailySummary/DailySummary";
import ChatDetail from "../Report/ChatDetail/ChatDetail";
import MainLayout from "../layout";


const MainContentContainer = (props) => {


  return (
    // <main
    //   className={clsx(classes.mainContentContainer, {
    //     [classes.drawerShift]: props.adminPanelDrawerToggle,
    //     [classes.drawerShiftInverse]: !props.adminPanelDrawerToggle,
    //     [classes.drawerShiftFull]: props.adminPanelChatBoxDrawerToggle,
    //   })}
    //   style={{
    //     marginTop: props.authMainAppBarHeight,

    //     width: `calc(100% - 80px)`,
    //   }}
    // >
    <MainLayout>

      <Switch>
        <Route exact path="/users">
          <AddUsers />
        </Route>
        <Route path="/adddesignations">
          <AddDesignations />
        </Route>
        <Route path="/addprofiles">
          <AddProfiles />
        </Route>
        <Route path="/addpages">
          <AddPages />
        </Route>

        <Route
          path={["/chats", "/admin"]}
          render={(props) => <ChatBox {...props} isSuperAdmin={true} />}
        />
        <Redirect exact from='/settings' to='/settings/website' />
        <Route
          exact
          // strict
          path={[
            "/settings",
            "/settings/facebook",
            "/settings/website",
            "/settings/chatpage",
            "/settings/cannedResponse",
            "/settings/label",
            "/settings/notification",
            "/settings/twilio",
          ]}
          render={(props) => <Setting {...props} />}
        ></Route>

        <Route exact path="/traffic">
          <Traffic />
        </Route>
        <Route exact path="/reports">
          <Report />
        </Route>
        <Route
          exact
          path="/reports/totalcustomerreport"
          render={(props) => <TotalCustomer {...props} />}
        ></Route>
        <Route
          exact
          path="/reports/dailysummary"
          render={(props) => <DailySummary {...props} />}
        ></Route>
        <Route
          exact
          path="/reports/totalcustomerreport/:id"
          render={(props) => <ChatDetail />}
        ></Route>
        <Route
          exact
          path="/notifications"
          render={withRouter(NotificationMain)}
        />
      </Switch>

     </MainLayout>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AdminPanelReducer, ...state.AuthReducer };
};
export default connect(mapStateToProps, {
  setAdminPanelDrawerToggle,
})(MainContentContainer);
