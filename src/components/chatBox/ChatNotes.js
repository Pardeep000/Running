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
  },
  chatNoteParent: {
    height: "350px",
    overflowY: "auto",
  },
  chatNote: {
    padding: "5px 10px",
    background: "#eff0f2",
    margin: "10px 0px",
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
     height:'180px',
    // minHeight:'90px',
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
  const [editChatNote, setEditChatNote] = useState("");
  const [isModalDeleteActive, setIsModalDeleteActive] = React.useState(false);
  const [chatNotesData, setChatNotesData] = useState(props.chatNoteData);
  const [chatNotesDataSec, setChatNotesDataSec] = useState();
  const [activeChatNoteDetail, setActiveChatNoteDetail] = React.useState({});
  const [searchChatNote, setSearchChatNote] = React.useState("");
  const [headerValue, setHeaderValue] = React.useState("");
  const [agentName, setAgentName] = useState(props.agentName);
  useImperativeHandle(ref, () => ({
    childFunction(data) {
      setChatNotesData(data);
      setChatNotesDataSec(data);
    },
  }));

  useEffect(() => {
    if (searchChatNote.length) {
      setChatNotesData(
        chatNotesDataSec.filter((curr) =>
          curr.chatNote.includes(searchChatNote)
        )
      );
    } else {
      setChatNotesData(chatNotesDataSec);
    }
  }, [searchChatNote]);

  const editHandler = (txt) => {
    let header =
      txt.chatNote.length >= 20
        ? `${txt.chatNote.slice(0, 20)}...`
        : txt.chatNote;
    setHeaderValue(header);
    setIsEditOpen(true);
    setEditChatNote(txt.chatNote);
    setActiveChatNoteDetail(txt);
  
     setAgentName(props.agentName);
  };
  const saveHandler = () => {
    if (editChatNote.length) {
      var record = chatNotesData.find(
        (curr) => curr.id === activeChatNoteDetail.id
      );
      var newRecord = {
        id: record.id,
        chatNote: editChatNote,
        timeStamp: Date.now(),
        agentId: props.authUserId,
      };

      let recordOtherThanEditedChatNote = chatNotesData.filter(
        (curr) => curr.id != activeChatNoteDetail.id
      );
      let newChatNoteList = [...recordOtherThanEditedChatNote, newRecord];
      let finalArray = _.orderBy(newChatNoteList, "id", "ASC");

      setIsEditOpen(false);
      props.updatechatnote({
        variables: {
          chatnote: JSON.stringify(finalArray),
          agentId: props.agentId,
          customerId: props.customerId,
          pageId: props.pageId,
        },
      });
    }
  };

  const deleteHandler = () => {
    let finalArray = chatNotesData.filter(
      (curr) => curr.id != activeChatNoteDetail.id
    );
    setIsModalDeleteActive(false);

    props.updatechatnote({
      variables: {
        chatnote: JSON.stringify(finalArray),
        agentId: props.agentId,
        customerId: props.customerId,
        pageId: props.pageId,
      },
    });
  };
  const DropdownDeleteHandler = (curr) => {
    setIsModalDeleteActive(true);
    setActiveChatNoteDetail(curr);
  };
  const editChatNoteUI =
    chatNotesData &&
    chatNotesData.length &&
    chatNotesData.map((curr) => (
      <>
        <div key={curr.id} className={classes.chatNote}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={classes.chatNoteContent}>{curr.chatNote.length>100 ?curr.chatNote.slice(0,100)+"...":curr.chatNote } </p>
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
                  <img
                    src={menu}
                    alt="dropdown"
                    style={{ width: "20px", transform: "rotate(90deg)" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ background: "white", color: "grey !important" }}
                >
                  <Dropdown.Item
                    onClick={() => editHandler(curr)}
                    className={classes.menuItem}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => DropdownDeleteHandler(curr)}
                    className={classes.menuItemDel}
                  >
                    Delete{" "}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <p className={classes.chatNoteTimeStamp}>
            {moment.unix(curr.timeStamp / 1000).format("DD MMM YYYY hh:mm a")}{" "}
          </p>
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
                <textarea
                  className={classes.mainContentUpperDivTextArea}
                  rows="4"
                  
                  value={editChatNote}
                  onChange={(e) =>
                    editChatNote.length < 1000 || e.target.value.length < 1000
                      ? setEditChatNote(e.target.value)
                      : null
                  }
                ></textarea>

                <p style={{ fontFamily: "Poppins", fontSize: "14px" }}>
                  {`${1000 - editChatNote.length}`} characters remaining
                </p>
              </div>
              <div className={classes.mainContentLowerDiv}>
                <p className={classes.mainContentLowerDivPara}>
                  {" "}
                  Last edited by{" "}
                  {agentName}{" "}
                  on{" "}
                  {moment
                    .unix(activeChatNoteDetail.timeStamp / 1000)
                    .format("DD MMM YYYY hh:mm a")}{" "}
                </p>
                <div className={classes.iconContainer}>
                  <img
                    onClick={() => setIsModalDeleteActive(true)}
                    className={classes.icon}
                    src={deleteIcon}
                    style={{ width: "17px" }}
                    alt="deleteIcon"
                  />
                  <img
                    onClick={() => saveHandler()}
                    className={classes.icon}
                    src={saveIcon}
                    style={{ width: "15px" }}
                    alt="SaveIcon"
                  />
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
              Chat notes
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
      {isModalDeleteActive && (
        <>
          <Modal
            style={{ zIndex: "10000000000000000000000" }}
            {...props}
            size="sm"
            // dialogClassName={}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div className={classes.subChatNotesMainContainer}>
                <h4 className={classes.chatNoteHeading}>Are you sure ?</h4>
                <p className={classes.chatNotePara}>
                  You want to delete this chat note?
                </p>
                <div className={classes.mainContentLowerDiv}>
                  <button
                    onClick={() => setIsModalDeleteActive(false)}
                    className={classes.chatNoteCancelBtn}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteHandler()}
                    className={classes.chatNoteDeleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </Modal>
  );
});

function ChatNotes(props) {
  const childRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const getChatNoteQuery = gql`
    query getChatNotes($customerId: String!, $pageId: String!, $agentId: ID!) {
      getChatNotes(
        customerId: $customerId
        pageId: $pageId
        agentId: $agentId
      ) {
        customerId
        pageId
        chatnote
        agent{
          name
        }
      }
    }
  `;
  let [
    getChatNotes,
    {
      loading: ResponseQueryLoading,
      error: ResponseQueryError,
      data: ResponseQueryResult,
    },
  ] = useLazyQuery(getChatNoteQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (ResponseQueryError) {
      ResponseQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [ResponseQueryError]);
  const [agentName,setAgentName] = useState("");
  useEffect(() => {
    if (ResponseQueryResult) {
       setAgentName(ResponseQueryResult.getChatNotes.agent.name);
       childRef.current.childFunction(
        JSON.parse(ResponseQueryResult.getChatNotes.chatnote)
      );
    }
  }, [ResponseQueryResult]);

  useEffect(() => {
    getChatNotes({
      variables: {
        customerId: props.customerId,
        pageId: props.pageId,
        agentId: props.agentId,
      },
    });
  }, [props.customerId, props.pageId, props.agentId]);

  const updateChatNoteQuery = gql`
    mutation updatechatnote(
      $chatnote: String!
      $agentId: ID!
      $customerId: String!
      $pageId: String!
    ) {
      updatechatnote(
        chatnote: $chatnote
        agentId: $agentId
        customerId: $customerId
        pageId: $pageId
      ) {
        success
        error
      }
    }
  `;
  let [
    updatechatnote,
    {
      loading: updateChatNoteQueryLoading,
      error: updateChatNoteQueryError,
      data: updateChatNoteQueryResult,
    },
  ] = useMutation(updateChatNoteQuery);

  useEffect(() => {
    if (updateChatNoteQueryError) {
      updateChatNoteQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [updateChatNoteQueryError]);

  useEffect(() => {
    if (updateChatNoteQueryResult && updateChatNoteQueryResult.updatechatnote) {
      if (updateChatNoteQueryResult.updatechatnote.success) {
        getChatNotes({
          variables: {
            customerId: props.customerId,
            pageId: props.pageId,
            agentId: props.agentId,
          },
        });
      } else {
        enqueueSnackbar(updateChatNoteQueryResult.updatechatnote.error, {
          variant: "error",
        });
      }
    }
  }, [updateChatNoteQueryResult]);

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
        updatechatnote={updatechatnote}
        updateChatNoteQueryLoading={updateChatNoteQueryLoading}
        agentName = {agentName}
      />
    </>
  );
}

export default ChatNotes;
