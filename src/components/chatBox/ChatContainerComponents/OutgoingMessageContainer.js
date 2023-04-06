import CheckIcon from "@material-ui/icons/Check";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import FacebookAvatar from "../FacebookAvatar";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import ErrorIcon from "@material-ui/icons/Error";

import { Tooltip, CircularProgress } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  chatStartedFirstLineText: {
    background: "white",
    padding: "0px 10px",
    color: "#777777",
    fontFamily: "Poppins",
    fontSize: "13.5px",
  },

  outgoingMessage: {
    background: "#56A530",
    position: "relative",
    borderRadius: "20px",
    display: "inline-block",
    color: "#fff !important",
    padding: "10px 25px",
    margin: "5px 17px 8px 5px !important",
    marginLeft: "100px",
    marginRight: "35px",
    whiteSpace: "pre-wrap",
    fontSize: "15.5px",
    fontFamily: "Poppins",
    maxWidth: "355px",
  },
  outgoingMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "1%",
  },
  errorMessage: {
    color: "#f50057",
    marginTop: "auto",
  },
  messageTimeStamp: {
    display: "block",
    width: "95%",
    margin: "20px auto 20px auto",
    textAlign: "center",
  },
  messageTimeStampText: {
    color: "#777777",
    display: "block",
    fontFamily: "Poppins",
    fontSize: "13.5px",
  },
  customerIcon2: {
    marginLeft: "10px",
    width: "30Px",
    height: "30px",
    marginBottom: "-5%",
  },
  seenMessageIcon: {
    width: 14,
    height: 14,
    marginLeft: "36%",
    marginBottom: "-120%",
    marginTop: "-133%",
  },
  seenMessageIconContainer: {
    display: "flex",
    marginBottom: "0px",
    marginLeft: "-17px",
    alignSelf: "flex-end",
  },
  chatMessageProgress: {
    width: "19px!important",
    height: "19px!important",
    marginTop: "auto",
    marginBottom: "auto",
  },

  messageTextBox: {
    margin: "0",
    padding: "0 6px",
    outline: "none",
    font: "inherit",
    maxHeight: 100,
    flex: 1,
    minHeight: 40,
    paddingTop: 8,
    // paddingLeft: 8,
    paddingRight: "50px",
    paddingLeft: "15px",
    overflow: "auto!important",
    borderRadius: "20px",
    border: "0px solid lightgrey",
    width: "100%",
    resize: "none",
    marginBottom: "-6px",
    fontFamily: "Poppins",
  },
  imageoutgoing: {
    background: "none",
    borderRadius: "10%",
    margin: "5px 15px 5px 5px !important",
  },
  unreadMessage: {
    background: "red",
  },
  readMessage: {
    background: "red",
  },
  deliveredMessageIconContainer: {
    border: "1px solid gray",
    alignSelf: "flex-end",
    borderRadius: "50%",
    display: "flex",
    marginBottom: "11px",
    marginLeft: "-13px",
  },
  deliveredMessageIcon: {
    fontSize: 10,
  },
}));
const OutgoingMessageContainer = ({
  textCreated,
  searchCount,
  parseNameFromURL,
  index,
  messages,
  item,
  handleClickOpen,
  itemData,
  outgoingMessageSeenLastItem,
  outgoingMessageDeliveredLastItem,
  linkify,
}) => {
  const classes = useStyles();
  // console.log(item, "item inside")
  return (
    <div>
      <>
        {index != 0 &&
          messages.messages[index].timestamp - 7200000 >
          messages.messages[index - 1].timestamp && (
            <div className={classes.messageTimeStamp}>
              <span className={classes.messageTimeStampText}>
                {moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
              </span>
            </div>
          )}
        {item.mediatype ? (
          item.mediatype.includes("image") ? (

            <div className={classes.outgoingMessageContainer}>
              {

                // console.log(item.text, "item text with null ")

              }
              {item.loading && (
                <CircularProgress
                  className={classes.chatMessageProgress}
                ></CircularProgress>
              )}
              {item.error && (
                <Tooltip
                  arrow={true}
                  placement={"top"}
                  title={item.error}
                  className={classes.errorMessageContainer}
                >
                  <ErrorIcon className={classes.errorMessage} />
                </Tooltip>
              )}
              {!item.loading && (
                <Tooltip
                  arrow={true}
                  placement={"top"}
                  title={moment
                    .unix(item.timestamp / 1000)
                    .format("DD MMM YYYY hh:mm a")}
                  className={classes.errorMessageContainer}
                >
                  <div >
                    <img
                      className={classes.imageoutgoing}
                      src={item.file}
                      alt=""
                      onClick={() => handleClickOpen(item)}
                      style={{
                        maxWidth: "226px",
                        margin: "5px",
                        cursor: "pointer",

                        width: "178px",
                        // height: "123px",
                        borderRadius: "0px",
                      }}
                    />
                  </div>


                </Tooltip>
              )}
              {!item.loading &&
                outgoingMessageSeenLastItem &&
                outgoingMessageSeenLastItem.messageId == item.messageId && (
                  <Tooltip
                    arrow={true}
                    placement={"top"}
                    title={
                      "Seen at " +
                      moment
                        .unix(item.receiptreadtimestamp / 1000)
                        .format("DD MMM YYYY hh:mm a")
                    }
                  >
                    <span className={classes.seenMessageIconContainer}>
                      {itemData && (
                        <>
                          <FacebookAvatar
                            key={itemData.customerId}
                            className={classes.seenMessageIcon}
                            type="customer"
                            item={itemData}
                          ></FacebookAvatar>
                        </>
                      )}
                    </span>
                  </Tooltip>
                )}
              {!item.loading &&
                !(
                  outgoingMessageSeenLastItem &&
                  outgoingMessageSeenLastItem.messageId == item.messageId
                ) &&
                outgoingMessageDeliveredLastItem &&
                outgoingMessageDeliveredLastItem.messageId ==
                item.messageId && (
                  <Tooltip
                    arrow={true}
                    placement={"top"}
                    title={
                      "Delivered at " +
                      moment
                        .unix(item.deliverytimestamp / 1000)
                        .format("DD MMM YYYY hh:mm a")
                    }
                  >
                    <span className={classes.deliveredMessageIconContainer}>
                      <CheckIcon className={classes.deliveredMessageIcon} />
                    </span>
                  </Tooltip>
                )}
            </div>
          ) : item.mediatype !== "image" ? (
            <div className={classes.outgoingMessageContainer}>
              {item.loading && (
                <CircularProgress
                  className={classes.chatMessageProgress}
                ></CircularProgress>
              )}
              {item.error && (
                <Tooltip
                  arrow={true}
                  placement={"top"}
                  title={item.error}
                  className={classes.errorMessageContainer}
                >
                  <ErrorIcon className={classes.errorMessage} />
                </Tooltip>
              )}

              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={classes.errorMessageContainer}
              >
                <a
                  style={{
                    width: "160px",
                    textDecoration: "none",
                    background: "lightgrey",
                    padding: "15px 20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    borderRadius: "20px",
                    margin: "5px",
                  }}
                  href={item.file}
                >
                  <DescriptionRoundedIcon />
                  <span style={{ marginLeft: "10px" }}>
                    {parseNameFromURL(item.file)}
                  </span>
                </a>
              </Tooltip>
              {!item.loading &&
                outgoingMessageSeenLastItem &&
                outgoingMessageSeenLastItem.messageId == item.messageId && (
                  <Tooltip
                    arrow={true}
                    placement={"top"}
                    title={
                      "Seen at " +
                      moment
                        .unix(item.receiptreadtimestamp / 1000)
                        .format("DD MMM YYYY hh:mm a")
                    }
                  >
                    <span className={classes.seenMessageIconContainer}>
                      {itemData && (
                        <>
                          <FacebookAvatar
                            key={itemData.customerId}
                            className={classes.seenMessageIcon}
                            type="customer"
                            item={itemData}
                          ></FacebookAvatar>
                        </>
                      )}
                    </span>
                  </Tooltip>
                )}
              {!item.loading &&
                !(
                  outgoingMessageSeenLastItem &&
                  outgoingMessageSeenLastItem.messageId == item.messageId
                ) &&
                outgoingMessageDeliveredLastItem &&
                outgoingMessageDeliveredLastItem.messageId ==
                item.messageId && (
                  <Tooltip
                    arrow={true}
                    placement={"top"}
                    title={
                      "Delivered at " +
                      moment
                        .unix(item.deliverytimestamp / 1000)
                        .format("DD MMM YYYY hh:mm a")
                    }
                  >
                    <span className={classes.deliveredMessageIconContainer}>
                      <CheckIcon className={classes.deliveredMessageIcon} />
                    </span>
                  </Tooltip>
                )}
            </div>
          ) : item.mediatype == "audio" ? (
            <div>
              {item.loading && (
                <CircularProgress
                  className={classes.chatMessageProgress}
                ></CircularProgress>
              )}
              {item.error && (
                <Tooltip
                  arrow={true}
                  placement={"top"}
                  title={item.error}
                  className={classes.errorMessageContainer}
                >
                  <ErrorIcon className={classes.errorMessage} />
                </Tooltip>
              )}

              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={classes.errorMessageContainer}
              >
                <audio controls>
                  <source src={item.filePath} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </Tooltip>
              {!item.loading &&
                outgoingMessageSeenLastItem &&
                outgoingMessageSeenLastItem.messageId == item.messageId && (
                  <Tooltip
                    arrow={true}
                    placement={"top"}
                    title={
                      "Seen at " +
                      moment
                        .unix(item.receiptreadtimestamp / 1000)
                        .format("DD MMM YYYY hh:mm a")
                    }
                  >
                    <span className={classes.seenMessageIconContainer}>
                      {itemData && (
                        <>
                          <FacebookAvatar
                            key={itemData.customerId}
                            className={classes.seenMessageIcon}
                            type="customer"
                            item={itemData}
                          ></FacebookAvatar>
                        </>
                      )}
                    </span>
                  </Tooltip>
                )}
              {!item.loading &&
                !(
                  outgoingMessageSeenLastItem &&
                  outgoingMessageSeenLastItem.messageId == item.messageId
                ) &&
                outgoingMessageDeliveredLastItem &&
                outgoingMessageDeliveredLastItem.messageId ==
                item.messageId && (
                  <Tooltip
                    arrow={true}
                    placement={"top"}
                    title={
                      "Delivered at " +
                      moment
                        .unix(item.deliverytimestamp / 1000)
                        .format("DD MMM YYYY hh:mm a")
                    }
                  >
                    <span className={classes.deliveredMessageIconContainer}>
                      <CheckIcon className={classes.deliveredMessageIcon} />
                    </span>
                  </Tooltip>
                )}
            </div>
          ) : (
            ""
          )
        ) : (
          <div className={classes.outgoingMessageContainer}>
            {item.loading && (
              <CircularProgress
                className={classes.chatMessageProgress}
              ></CircularProgress>
            )}
            {item.error && (
              <Tooltip
                arrow={true}
                placement={"top"}
                title={item.error}
                className={classes.errorMessageContainer}
              >
                <ErrorIcon className={classes.errorMessage} />
              </Tooltip>
            )}
            {/* outgoing message */}
            {!item.loading && (
              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={`${classes.outgoingMessage} ${classes.outgoingMessageLink}`}
              >
                <span
                  data-search={
                    textCreated.containsSearch
                      ? "Search" + searchCount
                      : undefined
                  }
                  // className={classes.outgoingMessageLink}
                  dangerouslySetInnerHTML={{
                    __html: linkify(textCreated.text),
                  }}
                ></span>
              </Tooltip>
            )}
            {!item.loading &&
              outgoingMessageSeenLastItem &&
              outgoingMessageSeenLastItem.messageId == item.messageId && (
                <Tooltip
                  arrow={true}
                  placement={"top"}
                  title={
                    "Seen at " +
                    moment
                      .unix(item.receiptreadtimestamp / 1000)
                      .format("DD MMM YYYY hh:mm a")
                  }
                >
                  <span className={classes.seenMessageIconContainer}>
                    {itemData && (
                      <>
                        <FacebookAvatar
                          key={itemData.customerId}
                          className={classes.seenMessageIcon}
                          type="customer"
                          item={itemData}
                        ></FacebookAvatar>
                      </>
                    )}
                  </span>
                </Tooltip>
              )}
            {!item.loading &&
              !(
                outgoingMessageSeenLastItem &&
                outgoingMessageSeenLastItem.messageId == item.messageId
              ) &&
              outgoingMessageDeliveredLastItem &&
              outgoingMessageDeliveredLastItem.messageId == item.messageId && (
                <Tooltip
                  arrow={true}
                  placement={"top"}
                  title={
                    "Delivered at " +
                    moment
                      .unix(item.deliverytimestamp / 1000)
                      .format("DD MMM YYYY hh:mm a")
                  }
                >
                  <span className={classes.deliveredMessageIconContainer}>
                    <CheckIcon className={classes.deliveredMessageIcon} />
                  </span>
                </Tooltip>
              )}
          </div>
        )}
      </>
    </div >
  );
};

export default OutgoingMessageContainer;
