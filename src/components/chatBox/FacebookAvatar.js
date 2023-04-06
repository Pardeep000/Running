import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatContainer from "./ChatContainer";
import includes from "./includes";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { setChatBoxFacebookIDsWithProfileDetails } from "../../store/actions/ChatBoxActions";

const useStyles = makeStyles((theme) => ({}));

const FacebookAvatar = (props) => {
  const classes = useStyles();

  const [src, setSrc] = useState(null);
  const { item, type } = props;

  const includesObj = new includes();
  useEffect(() => {
    if (type == "page") {
      if (
        props.chatBoxFacebookIDsWithProfileDetails.find(
          (curr) => curr.id == item.pageId
        )
      ) {
        setSrc(
          props.chatBoxFacebookIDsWithProfileDetails.find(
            (curr) => curr.id == item.pageId
          ).image
        );
      } else {
        getPageData();
      }
    }
    if (type == "customer") {
      if (
        props.chatBoxFacebookIDsWithProfileDetails.find(
          (curr) => curr.id == item.customerId
        )
      ) {
        setSrc(
          props.chatBoxFacebookIDsWithProfileDetails.find(
            (curr) => curr.id == item.customerId
          ).image
        );
      } else {
        getCustomerData();
      }
    }
  }, [item]);
  const getPageData = () => {
    if (type == "page")
      includesObj.resolvePageInfo(
        item.pageId,
        props.chatBoxFacebookIDsWithProfileDetails,
        props.setChatBoxFacebookIDsWithProfileDetails,
        setImageCallBack,
        props.authPagesData
      );
  };
  const getCustomerData = () => {
    if (type == "customer") {
      includesObj.resolveClientInfo(
        item?.customerId,
        item?.pageId,
        props.chatBoxFacebookIDsWithProfileDetails,
        props.setChatBoxFacebookIDsWithProfileDetails,
        setImageCallBack,
        props.authPagesData
      );
    }
  };
  const setImageCallBack = (result) => {
    if (result) {
      setSrc(result.image);
    }
  };
  return (
    <div>
      <Avatar
        key={src}
        className={props.className}
        src={src}
        variant={props.variant}
      ></Avatar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.ChatBoxReducer,
    ...state.AuthReducer,
  };
};
export default connect(mapStateToProps, {
  setChatBoxFacebookIDsWithProfileDetails,
})(FacebookAvatar);
