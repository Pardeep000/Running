import React, { useState, useEffect } from "react";

import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import menu from "../../assets/chatWindow/menu.svg";
import backIcon from "../../assets/chatWindow/Back.svg";
import deleteIcon from "../../assets/chatWindow/Delete.svg";
import saveIcon from "../../assets/chatWindow/Save.svg";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { gql } from "apollo-boost";
import _ from "lodash";
import { forwardRef, useImperativeHandle, useRef } from "react";
import moment from "moment";
import { act } from "react-dom/test-utils";

const useStyles = makeStyles((theme) => ({
  imageAvatar: {
    paddingRight: "4px",
  },
  chatNoteHeader: {
    background: "#f4f8f7",
    height: "50px",
    fontFamily: "Poppins",
  },
  chatNoteContainer: {
    width: "95%",
    margin: "0 auto",
  },
  chatNoteInputField: {
    width: "100%",
    margin: "0px 0px 5px 0px",
    outlineWidth: 0,
    "&:hover": {
      outlineWidth: 0,
    },
    "&:focus": {
      outlineWidth: 0,
    },
  },
  chatNoteParent: {
    height: "350px",
    overflowY: "auto",
  },
  chatNote: {
    padding: "5px 10px",
    background: "#eff0f2",
    margin: "10px 0px",
    cursor: "pointer",
  },
  chatNoteContent: {
    margin: "0 10px 0 0",
    fontFamily: "Poppins",
    fontSize: "15px",
  },
  menuItem: {
    fontFamily: "Poppins",
    fontSize: "14px",
    "&:hover": {
      background: "#ecf6eb",
      color: "#67945b",
    },
  },
  menuItemDel: {
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "red",
    "&:hover": {
      background: "#e4d7d7",
      color: "red",
    },
  },

  chatNoteTimeStamp: {
    margin: "0",
    textAlign: "right",
    fontFamily: "Poppins",
    fontSize: "13px",
  },
  subChatNoteMainContainer: {
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainContentUpperDivTextArea: {
    width: "100%",
    resize: "none",
    fontFamily: "Poppins",
    fontSize: "14px !important",
  },
  mainContentLowerDivPara: {
    borderBottom: "1px solid grey",
    marginBottom: "2px",
    fontFamily: "Poppins",
    fontSize: "14px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0px 0px 0px",
  },
  icon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  subChatNotesMainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  chatNotePara: {
    margin: "15px 0px 25px 0px",
    color: "grey",
  },
  mainContentLowerDiv: {
    marginBottom: "15px",
  },
  chatNoteCancelBtn: {
    background: "white",
    border: "1px solid lightgrey",
    color: "grey",
    padding: "5px 15px",
    borderRadius: "4px",
    marginRight: "10px",
  },
  chatNoteDeleteBtn: {
    background: "#e34d59",
    border: "0px solid lightgrey",
    color: "white",
    padding: "5px 15px",
    borderRadius: "4px",
    marginLeft: "10px",
  },
}));
const MyVerticallyCenteredModal = forwardRef((props, ref) => {
  const classes = useStyles();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [editChatNote, setEditChatNote] = useState("Ok");
  const [isModalDeleteActive, setIsModalDeleteActive] = React.useState(false);
  const [chatNotesData, setChatNotesData] = useState(props.chatNoteData);
  const [chatNotesDataSec, setChatNotesDataSec] = useState();
  const [activeChatNoteDetail, setActiveChatNoteDetail] = React.useState({});
  const [searchChatNote, setSearchChatNote] = React.useState("");
  const [headerValue, setHeaderValue] = React.useState("");
  //   useImperativeHandle(ref, () => ({
  //     childFunction(data) {
  //       setChatNotesData(data);
  //       setChatNotesDataSec(data);
  //     },
  //   }));

  const Messages = [
    { id: "1", message: "ok" },
    {
      id: "2",
      message:
        "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
    },
  ];
  const editChatNoteUI = Messages.map((curr) => (
    <>
      <div
        key={curr.id}
        className={classes.chatNote}
        onClick={() => {
          setIsEditOpen(true);
          setEditChatNote(curr.message);
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={classes.chatNoteContent}>{curr.message} </p>
        </div>
        {/* <p className={classes.chatNoteTimeStamp}>
            {moment.unix(curr.timeStamp / 1000).format("DD MMM YYYY hh:mm a")}{" "}
          </p> */}
      </div>
    </>
  ));

  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isEditOpen && !isModalDeleteActive && (
        <>
          <Modal.Header
            style={{ display: "flex", justifyContent: "flex-start" }}
            className={classes.chatNoteHeader}
          >
            <img
              onClick={() => setIsEditOpen(false)}
              src={backIcon}
              alt="backIcon"
              style={{ width: "20px", marginRight: "10px", cursor: "pointer" }}
            />
            <Modal.Title style={{ marginLeft: "0px", fontSize: "20px" }}>
              {headerValue}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={classes.subChatNoteMainContainer}>
              <div className={classes.mainContentUpperDiv}>
                <div style={{ display: "flex" }}>
                  <div className={classes.imageAvatar}>Image</div>
                  <h6>CustomerName</h6>
                </div>
                <div className={classes.chatNote}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className={classes.chatNoteContent}>{editChatNote} </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </>
      )}
      {!isEditOpen && !isModalDeleteActive && (
        <>
          <Modal.Header className={classes.chatNoteHeader} closeButton>
            <Modal.Title
              style={{ fontSize: "20px" }}
              id="contained-modal-title-vcenter"
            >
              All Messages
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={classes.chatNoteContainer}>
              <input
                className={classes.chatNoteInputField}
                type="text"
                placeholder="Search"
                value={searchChatNote}
                onChange={(e) => setSearchChatNote(e.target.value)}
              />
              <div className={classes.chatNoteParent}>{editChatNoteUI}</div>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
});

function AllMessages(props) {
  const childRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <MyVerticallyCenteredModal
        ref={childRef}
        show={props.modalShow}
        setChatNote={props.setChatNote}
        chatNoteData={props.chatNoteData}
        agentId={props.agentId}
        customerId={props.customerId}
        pageId={props.pageId}
        onHide={() => props.setModalShow(false)}
        sendChatNoteToBackend={props.sendChatNoteToBackend}
        // updatechatnote={updatechatnote}
        // updateChatNoteQueryLoading={updateChatNoteQueryLoading}
      />
    </>
  );
}

export default AllMessages;
