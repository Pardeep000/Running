import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatContainer from "./ChatContainer";
import includes from "./includes";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { setChatBoxFacebookIDsWithProfileDetails } from "../../store/actions/ChatBoxActions";
import messengerIcon from "../../assets/chatWindow/messenger.svg";

const useStyles = makeStyles((theme) => ({}));

const FacebookTypography = (props) => {
  const classes = useStyles();

  const [pageName, setPageName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { item } = props;
  const includesObj = new includes();

  useEffect(() => {
    if (
      props.chatBoxFacebookIDsWithProfileDetails.find(
        (curr) => curr.id == item.pageId
      )
    ) {
      setPageName(
        props.chatBoxFacebookIDsWithProfileDetails.find(
          (curr) => curr.id == item.pageId
        ).name
      );
    } else {
      getPageData();
    }

    if (
      props.chatBoxFacebookIDsWithProfileDetails.find(
        (curr) => curr.id == item.customerId
      )
    ) {
      setCustomerName(
        props.chatBoxFacebookIDsWithProfileDetails.find(
          (curr) => curr.id == item?.customerId
        ).name
      );
    } else {
      getCustomerData();
    }
  }, [item]);

  const getPageData = () => {
    includesObj.resolvePageInfo(
      item?.pageId,
      props.chatBoxFacebookIDsWithProfileDetails,
      props.setChatBoxFacebookIDsWithProfileDetails,
      pageCallBack,
      props.authPagesData
    );
  };
  const getCustomerData = () => {
    includesObj.resolveClientInfo(
      item?.customerId,
      item?.pageId,
      props.chatBoxFacebookIDsWithProfileDetails,
      props.setChatBoxFacebookIDsWithProfileDetails,
      customerCallBack,
      props.authPagesData
    );
  };
  const pageCallBack = (result) => {
    if (result) {
      setPageName(result.name);
      props.pageNameChange && props.pageNameChange(result.name);
    }
  };
  const customerCallBack = (result) => {
    if (result) {
      setCustomerName(result.name);
      props.customerNameChange && props.customerNameChange(result.name);
    }
  };

  return (
    <>
      {!props.special && !props.pageName && (
        <>
        <Typography className={props.className}>
          {`${customerName}`}{" "}  {
          props.icon &&  <img style={{ width: "30px" }} src={messengerIcon} alt="messenger" />
        }
        </Typography>
        </>
      )}
      {props.special && customerName}
      {props.pageName && (
        <Typography className={props.className}>{`${pageName}`}</Typography>
      )}
    </>
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
})(FacebookTypography);
