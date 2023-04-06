import React, { useEffect, useState } from "react";
import CustomDropDown from "./CustomDropDown";
import SettingHeader from "./SettingHeader";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Settingbar2 } from "../../store/actions/settingbar2";
const useStyles = makeStyles((theme) => ({
  SettingLeftPaneContentSection: {
    width: "90%",
    margin: "15px auto",
  },
  dropDownMainText: {
    fontFamily: "poppins",
    fontSize: "14px",
    margin: "15px 0px",
    cursor: "pointer",
    // color: "gray",
    "&:hover": {
      color: "green"
    },
  }
}));

const SettingLeftPane = () => {
  const history = useHistory();
  const { location: { pathname } } = history
  const {id} = useParams();
  console.log(id, "id")
  // const [first, setFirst] = useState(false)
  // console.log(pathname, "history");
  const dispatch = useDispatch();
  const rowStatex = useSelector((state) => state.SettingbarReducer);

  const classes = useStyles();

  const [activeUserData, setActiveUserData] = useState(
    JSON.parse(localStorage.getItem("ActiveUserdetail"))
  );
  // useEffect(() => {
  //   if (pathname.includes("cannedResponse")) {
  //     setActive(true);
  //   }
  //   if (pathname.includes("label")) {
  //     setActive2(true);
  //   }
  //   if (pathname.includes("notification")) {
  //     setActive3(true);
  //   }
  // }, [pathname, active, active2, active3]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setActive(JSON.parse(localStorage.getItem("signal1")));
  //     setActive2(JSON.parse(localStorage.getItem("signal2")));
  //   }
  // }, []);
  var ChanneldropPath = {
    Facebook: "facebook",
    Website: "website",
    Chatpage: "chatpage",
    Twilio: "twilio",
  };
  var chatDropPath = {
    Customization: "customization",
    Language: "language",
    Availability: "availablitiy",
  };
  const onCannedResponses = () => {
    history.push("/setting/cannedResponse");
    // setActive(true);
    // setActive2(false);
    dispatch(Settingbar2(true));
  };
  const onSettingLabels = () => {
    history.push("/setting/label");
    // setActive(false);
    // setActive2(true);
    dispatch(Settingbar2(true));
  };
  const onSettingNotification = () => {
    // setActive(false)
    // setActive2(false)
    history.push("/setting/notification");
  };

  // useEffect(() => {
  //   if (rowStatex?.signal == true) {
  //     setActive(false);
  //     setActive2(false);
  //   }
  // }, [rowStatex]);
  const isClickedChannel =
    pathname.includes("website")
    || pathname.includes("chatpage")
    || pathname.includes("facebook")
    || pathname.includes("twilio");

  const isClickedChatWidget =
    pathname.includes("customization")
    || pathname.includes("language")
    || pathname.includes("availability")
  return (
    <div>
      <SettingHeader text="Settings" fontColor="black" />
      <div className={classes.SettingLeftPaneContentSection}>
        {activeUserData.paneltype == "SUPERADMIN" && (
          <>  
            <CustomDropDown
              isClicked={isClickedChannel}
              dropDownMainText="Channels"
              dropDownData={["Website", "Chatpage", "Facebook", "Twilio"]}
              dropPaths={ChanneldropPath}
            />
            <CustomDropDown
              isClicked={isClickedChatWidget}
              dropDownMainText="Chat Widget"
              dropDownData={["Customization", "Language", "Availability"]}
              dropPaths={chatDropPath}
            // btnShow={false}
            //   onClick={dropdown2}
            />
          </>
        )}

        <p
          onClick={onCannedResponses}
          className={classes.dropDownMainText}
          style={{
            fontWeight: pathname.includes("cannedResponse") ? "600" : "",
            color: pathname.includes("cannedResponse") ? "green" : "gray",
          }}
        >
          Canned Responses
        </p>
        <p
          onClick={onSettingLabels}
          className={classes.dropDownMainText}
          style={{
            fontWeight: pathname.includes("label") ? "600" : "",
            color: pathname.includes("label") ? "green" : "gray",
          }}
        >
          Labels
        </p>
        {activeUserData.paneltype == "SUPERADMIN" && (
          <>
            <p
              onClick={onSettingNotification}
              className={classes.dropDownMainText}
              style={{
                fontWeight: pathname.includes("notification") ? "600" : "",
                color: pathname.includes("notification") ? "green" : "gray",
              }}
            >
              Notifications
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SettingLeftPane;
