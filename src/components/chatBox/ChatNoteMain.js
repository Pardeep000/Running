import React, { useEffect } from "react";
import ChatNotes from "./ChatNotes";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import saveIcon from "../../assets/chatWindow/Save.svg";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import 'bootstrap/dist/css/bootstrap.min.css';
const useStyles = makeStyles((theme) => ({
  chatNoteMainDiv: {
    width: "100%",
    padding: "10px 10px",
    border: "1px solid lightgrey",
    borderRadius: "5px",
    margin: "8px 0px",
  },
  textAreaStyle: {
    width: "100%",
    border: "1px solid lightgrey",
    marginTop: "10px",
    fontFamily: "Poppins",
    fontSize: "13px",
    resize: "none",
  },
  viewAllChatNoteBtn: {
    background: "none",
    border: "none",
    color: "green",
    textDecoration: "underline",
    fontFamily: "Poppins",
    fontSize: "14px",
  },
}));

function ChatNoteMain(props) {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [chatNote, setChatNote] = React.useState("");
  const [chatNoteData, setChatNoteData] = React.useState([]);

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
          id
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

  useEffect(() => {
    if (ResponseQueryResult) {
      setChatNoteData(JSON.parse(ResponseQueryResult.getChatNotes.chatnote));
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
        enqueueSnackbar("Chat Note Saved Successfully", { variant: "success" });
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

  const sendChatNoteToBackend = () => {
    let queryData;
    if (chatNote.length) {
      if (chatNoteData == null || chatNoteData.length == 0) {
        queryData = [
          {
            id: 0,
            chatNote: chatNote,
            timeStamp: Date.now(),
            agentId: props.authUserId,
          },
        ];
      } else {
        queryData = [
          ...chatNoteData,
          {
            id: chatNoteData[chatNoteData.length - 1].id + 1,
            chatNote: chatNote,
            timeStamp: Date.now(),
            agentId: props.authUserId,
          },
        ];
      }

      updatechatnote({
        variables: {
          chatnote: JSON.stringify(queryData),
          agentId: props.agentId,
          customerId: props.customerId,
          pageId: props.pageId,
        },
      });
    }
    setChatNote("");
  };

  return (
    <div>
      <div className={classes.chatNoteMainDiv}>
        <span
          style={{
            display: "block",
            color: "#777777",
            fontSize: "16px",
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "500",
          }}
        >
          Chat Notes
        </span>
        <textarea
          rows="4"
          className={classes.textAreaStyle}
          value={chatNote}
          placeholder="Save your chat notes here"
          onChange={(e) => setChatNote(e.target.value)}
        ></textarea>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => setModalShow(true)}
            className={classes.viewAllChatNoteBtn}
          >
            View all chat notes
          </button>


          <button
            // disabled={twilioConfiguration != null ? false : true}
            style={{
              color: 'white',
              background: 'rgba(85, 165, 48, 1)',
              padding: '5px 15px',
              border: 'rgba(85, 165, 48, 1)',
              borderRadius: '3px',
              fontSize: '14px'
            }}
            onClick={sendChatNoteToBackend}
          >Save</button>

          {/* <button class="btn btn-success btn-sm"
            onClick={sendChatNoteToBackend}
            style={{}}
          >
            Save
          </button> */}
        </div>

        <ChatNotes
          chatNoteData={chatNoteData}
          setModalShow={setModalShow}
          modalShow={modalShow}
          setChatNote={setChatNote}
          sendChatNoteToBackend={sendChatNoteToBackend}
          agentId={props.agentId}
          customerId={props.customerId}
          pageId={props.pageId}
          authUserId={props.authUserId}
        />
      </div>
    </div>
  );
}

export default ChatNoteMain;
