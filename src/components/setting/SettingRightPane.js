import React from "react";
import CannedResponse from "./cannedResponses/CannedResponse";
import SettingLabel from "./labels/SettingLabel";
import SettingFacebook from "./SettingFacebook";
import SettingHeader from "./SettingHeader";
import ChatPage from "./SettingChatPage";
import SettingWebsite from "./SettingWebsite";
import SettingNotification from "./SettingNotification";
import TwilioConfiguration from "./twilio/TwilioConfiguration";
import TwilioPhoneConfiguration from "./twilio/TwilioPhoneConfiguration";
import TwilioSetting from "./twilio/TwilioSetting";

function SettingRightPane({ setPage }) {
  // console.log(setPage,"setPage")
  let route =
    setPage == "/setting/facebook"
      ? "facebook"
      : setPage == "/setting/website"
      ? "website"
      : setPage == "/setting/cannedResponse"
      ? "cannedResponse"
      : setPage == "/setting/label"
      ? "labels"
      : setPage == "/setting/chatpage"
      ? "chatpage"
      : setPage == "/setting/website"
      ? "website"
      : setPage == "/setting/twilio"
      ? "twilio"
      :  setPage == "/setting/notification"
      ? "notification":"/setting/chatpage";
  return (
    <div>
      <SettingHeader
        text={
          route == "facebook"
            ? "Facebook"
            : route == "cannedResponse"
            ? "Canned Response"
            : route == "labels"
            ? "Labels"
            : route == "chatpage"
            ? "ChatPage"
            : route == "twilio"
            ? "Twilio Configuration"
            : route == "website"
            ? "Website":route == "notification"?"Notification"
            : "Setting"
        }
        fontColor="#55A530"
        fontWeight="800"
      />

      {route == "facebook" && <SettingFacebook />}
      {route == "cannedResponse" && <CannedResponse />}
      {route == "labels" && <SettingLabel />}
      {route == "chatpage" && <ChatPage />}
      {/* {route == "twilio" && <TwilioConfiguration />} */}
      
      {route == "twilio" && <TwilioSetting/>}
      {route == "website" && <SettingWebsite />}
      {route == "notification" && <SettingNotification/>}
    </div>
  );
}

export default SettingRightPane;
