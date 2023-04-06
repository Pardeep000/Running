import React, { useState } from "react";
import FacebookTypography from "../FacebookTypography";
import { Dropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
// import Search from "../../assets/chatWindow/Search.svg";
// import menu from "../../assets/chatWindow/menu.svg";
import ChatTransfer from "../ChatTransfer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";

import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  color: {
    color: "red",
  },
  chatTabHeaderContainer: {
    display: "flex",
    background: "#fff !important",
    borderBottom: "1px solid lightgrey !important",
    height: "68px",
    color: "black !important",
  },

  chatsTabContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  chatsTabText: {
    fontSize: "24px",
    display: "inline",
    color: "black",
    textAlign: "center",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flexGrow: 1,
    fontFamily: "Poppins",
    fontWeight: "600px !important",
  },

  menuItemTransfer: {
    color: "grey",
    "&:hover": {
      color: "green",
      background: "rgba(85, 165, 48,0.1)",
    },
  },
  menuItemClose: {
    color: "grey",
    "&:hover": {
      color: "red",
      background: "rgba(227, 77, 89,0.1)",
    },
  },
}));

const ChatContainerHeader = ({ closeDisabled,
  closeLabelAction,
  closeChatWindowHandler,
  chatBoxSelectedChatsOnFloating,
  chatBoxContainerChatSearchToggle,
  chatTabHeaderStyles,
  setChatBoxSelectedChatsOnFloating,
  itemData,
  setChatBoxContainerChatSearchToggle }) => {
  // alert(chatBoxSelectedChatsOnFloating)
  const [modalShow, setModalShow] = useState(false);

  const classes = useStyles();
  // alert(closeDisabled)
  return (
    <Container
      maxWidth={false}
      disableGutters
      className={clsx(
        classes.chatTabHeaderContainer
        // chatTabHeaderStyles
      )}
    >
      <span className={classes.chatsTabContainer}>
        <FacebookTypography
          pageNameChange={(name) => {
            var findItem = _.find(
              chatBoxSelectedChatsOnFloating,
              (list) =>
                list.pageId == itemData.pageId &&
                list.customerId == itemData.customerId
            );
            if (findItem) {
              if (findItem.pageName != name) {
                findItem.pageName = name;
                setChatBoxSelectedChatsOnFloating(
                  _.cloneDeep(chatBoxSelectedChatsOnFloating)
                );
              }
            }
          }}
          customerNameChange={(name) => {
            var findItem = _.find(
              chatBoxSelectedChatsOnFloating,
              (list) =>
                list.pageId == itemData.pageId &&
                list.customerId == itemData.customerId
            );

            if (findItem) {
              if (findItem.customerName != name) {
                findItem.customerName = name;
                setChatBoxSelectedChatsOnFloating(
                  _.cloneDeep(chatBoxSelectedChatsOnFloating)
                );
              }
            }
          }}
          icon={true}
          item={itemData}
          className={classes.chatsTabText}
        ></FacebookTypography>

        <div style={{ display: "flex" }}>
          <div>
            {/* <img
              src={Search}
              alt=""
              onClick={() =>
                setChatBoxContainerChatSearchToggle(
                  !chatBoxContainerChatSearchToggle
                )
              }
              style={{
                width: "23px",
                marginRight: "15px",
                marginTop: "4px",
                cursor: "pointer",
              }}
            /> */}
            <SearchIcon
              onClick={() =>
                setChatBoxContainerChatSearchToggle(
                  !chatBoxContainerChatSearchToggle
                )
              }
              style={{
                width: "23px",
                marginRight: "15px",
                marginTop: "4px",
                cursor: "pointer",
              }}
            />
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  background: "none",
                  border: "none",
                  padding: "0",
                  outline: "none",
                  boxShadow: "none",
                }}
                id="dropdown-button-dark-example1"
              >
                {/* <img src={menu} alt="dropdown" style={{ width: "20px" }} /> */}
                <LinearScaleOutlinedIcon style={{ color: "black", width: "20px" }} />
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  background: "white",
                  color: "grey !important",
                }}
              >
                <Dropdown.Item
                  className={classes.menuItemTransfer}
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  {/* <img alt="" src={transfer} style={{ width: "15px" }} /> */}
                  <ArrowForwardIcon style={{ width: "15px" }} />
                  <span style={{ fontFamily: "poppins" }}> Transfer to...</span>
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={closeDisabled ? true : false}
                  className={classes.menuItemClose}
                  onClick={closeLabelAction}
                >
                  {/* <img alt="close chat icon" src={closeChat} style={{ fill: "#27ae60" , width: "15px" }} /> */}
                  <CloseIcon style={{ width: "15px" }} />
                  <span style={{ fontFamily: "Poppins" }}>
                    {" "}
                    Close this chat
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {
          <>
            <ChatTransfer
              closeChatWindowHandler={closeChatWindowHandler}
              modalShow={modalShow}
              setModalShow={setModalShow}
              cid={itemData?.customerId}
              pid={itemData?.pageId}
            />
          </>
        }
      </span>
    </Container>
  );
};

export default ChatContainerHeader;
