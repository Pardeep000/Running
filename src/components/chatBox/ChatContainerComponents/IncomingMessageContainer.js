import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";
import FacebookAvatar from "../FacebookAvatar";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  chatStartedFirstLineText: {
    background: "white",
    padding: "0px 10px",
    color: "#777777",
    fontFamily: "Poppins",
    fontSize: "13.5px",
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
  incomingMessage: {
    background: "#eeeeee",
    borderRadius: "20px",
    display: "inline-block",
    position: "relative",
    color: "black",
    padding: "10px 25px",
    margin: "5px 5px 8px 5px",
    marginLeft: "42px",
    whiteSpace: "pre-wrap",
    fontSize: "15.5px",
    fontFamily: "Poppins",
    maxWidth: "355px",
  },
  seenMessageIcon: {
    width: 14,
    height: 14,
    marginLeft: "36%",
    marginBottom: "-120%",
    marginTop: "-133%",
  },
}));

const IncomingMessageContainer = ({
  textCreated,
  searchCount,
  parseNameFromURL,
  index,
  messages,
  item,
  handleClickOpen,
  itemData,
}) => {
  const classes = useStyles();
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
          item.mediatype == "image" ? (
            <div>
              {index == 0 && messages.messages[index].type == "incoming" && (
                <>
                  <FacebookAvatar
                    key={item.customerId}
                    className={classes.customerIcon2}
                    type="customer"
                    item={itemData}
                  ></FacebookAvatar>
                </>
              )}
              {messages.messages[index].type == "incoming" &&
                index > 0 &&
                messages.messages[index - 1].type == "outgoing" && (
                  <>
                    <FacebookAvatar
                      key={item.customerId}
                      className={classes.customerIcon2}
                      type="customer"
                      item={itemData}
                    ></FacebookAvatar>
                  </>
                )}

              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={classes.incomingMessage}
              >
                <img
                  alt={"img"}
                  className={classes.imageincoming}
                  style={{
                    // maxWidth: "250px",
                    margin: "5px",
                    marginLeft: "11px",
                    cursor: "pointer",
                    width: "226px",
                    // height: "140px",
                    borderRadius: "0px",
                    // marginLeft: "17px",
                  }}
                  src={item.file}
                  onClick={() => handleClickOpen(item)}
                />
              </Tooltip>
            </div>
          ) : item.mediatype == "thumb" ? (
            <div>
              {index == 0 && messages.messages[index].type == "incoming" && (
                <>
                  <FacebookAvatar
                    key={item.customerId}
                    className={classes.customerIcon2}
                    type="customer"
                    item={itemData}
                  ></FacebookAvatar>
                </>
              )}
              {messages.messages[index].type == "incoming" &&
                index > 0 &&
                messages.messages[index - 1].type == "outgoing" && (
                  <>
                    <FacebookAvatar
                      key={item.customerId}
                      className={classes.customerIcon2}
                      type="customer"
                      item={itemData}
                    ></FacebookAvatar>
                  </>
                )}

              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={classes.incomingMessage}
              >
                <img
                  alt={"img"}
                  className={classes.imageincoming}
                  style={{
                    // maxWidth: "250px",
                    margin: "5px",
                    marginLeft: "11px",
                    cursor: "pointer",
                    width: "80px",
                    // height: "100px",
                    borderRadius: "0px",
                    // marginLeft: "17px",
                  }}
                  src={item.file}
                  onClick={() => handleClickOpen(item)}
                />
              </Tooltip>
            </div>
          ) : item.mediatype == "file" ? (
            <div>
              {index == 0 && messages.messages[index].type == "incoming" && (
                <>
                  {/* <FacebookAvatar
                key={item.customerId}
                className={classes.customerIcon2}
                type="customer"
                item={itemData}
              ></FacebookAvatar> */}
                  {/* <Avatar
                alt="Remy Sharp"
                src={
                  "https://img.freepik.com/premium-vector/smiling-girl-avatar_102172-32.jpg"
                }
                style={{
                  width: "4%",
                  marginBottom: "-5%",
                }}
              /> */}
                </>
              )}
              {messages.messages[index].type == "incoming" &&
                index > 0 &&
                messages.messages[index - 1].type == "outgoing" && (
                  <>
                    <FacebookAvatar
                      key={item.customerId}
                      className={classes.customerIcon2}
                      type="customer"
                      item={itemData}
                    ></FacebookAvatar>
                  </>
                )}
              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={classes.incomingMessage}
              >
                <a
                  style={{
                    width: "fit-content",
                    textDecoration: "none",
                    background: "lightgrey",
                    // padding: "15px 10px",
                    display: "flex",
                    // justifyContent: "center",
                    alignItems: "center",
                    // wordWrap: "break-word",
                    color: "black",
                    // borderRadius:0
                  }}
                  href={item.file}
                >
                  <DescriptionRoundedIcon />
                  <span style={{ marginLeft: "10px" }}>
                    {parseNameFromURL(item.file)}
                  </span>
                </a>
              </Tooltip>
            </div>
          ) : item.mediatype == "audio" ? (
            <div>
              {index == 0 && messages.messages[index].type == "incoming" && (
                <>
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
                </>
              )}
              {messages.messages[index].type == "incoming" &&
                index > 0 &&
                messages.messages[index - 1].type == "outgoing" && (
                  <>
                    <FacebookAvatar
                      key={item.customerId}
                      className={classes.customerIcon2}
                      type="customer"
                      item={itemData}
                    ></FacebookAvatar>
                  </>
                )}

              <Tooltip
                arrow={true}
                placement={"top"}
                title={moment
                  .unix(item.timestamp / 1000)
                  .format("DD MMM YYYY hh:mm a")}
                className={classes.incomingMessage}
              >
                <audio controls>
                  <source src={item.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </Tooltip>
            </div>
          ) : item.mediatype.split("-")[0] == "fallback" ? (
            <div
              style={{
                maxWidth: "250px",
                display: "flex",
                tex: "",
                flexDirection: "column",
                border: "1px solid grey",
                borderRadius: "15px",
                margin: 5,
              }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  padding: "1em",
                  wordWrap: "break-word",
                }}
                href={item.file}
              >
                {/* {item.text} */}
                {`${item.text.substring(0, 60)}${
                  item.text.length > 60 ? "..." : ""
                } `}
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "black",
                  textDecoration: "none",
                  padding: ".68em",
                  textAlign: "center",
                  borderTop: "1px solid grey",
                  background: "#cccbcb",
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
                href={item.file}
              >
                {item.mediatype.split("-")[1]}
              </a>
            </div>
          ) : (
            ""
          )
        ) : (
          <div>
            {index == 0 && messages.messages[index].type == "incoming" && (
              <>
                <FacebookAvatar
                  key={item.customerId}
                  className={classes.customerIcon2}
                  type="customer"
                  item={itemData}
                ></FacebookAvatar>
              </>
            )}
            {messages.messages[index].type == "incoming" &&
              index > 0 &&
              messages.messages[index - 1].type == "outgoing" && (
                <>
                  <FacebookAvatar
                    key={item.customerId}
                    className={classes.customerIcon2}
                    type="customer"
                    item={itemData}
                  ></FacebookAvatar>
                </>
              )}
            <Tooltip
              arrow={true}
              placement={"top"}
              title={moment
                .unix(item.timestamp / 1000)
                .format("DD MMM YYYY hh:mm a")}
              className={classes.incomingMessage}
            >
              <span
                data-search={
                  textCreated.containsSearch
                    ? "Search" + searchCount
                    : undefined
                }
                dangerouslySetInnerHTML={{
                  __html: textCreated.text,
                }}
              ></span>
            </Tooltip>{" "}
          </div>
        )}
      </>
    </div>
  );
};

export default IncomingMessageContainer;
