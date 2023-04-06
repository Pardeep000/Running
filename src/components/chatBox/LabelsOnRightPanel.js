import React, { useState, useEffect } from "react";
import moment from "moment";
import LabelsList from "./LabelsList";
import addIcon from "../../assets/chatWindow/Add.svg";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import "../../otherComponents/react-responsive-tabs/styles.css";
import closeBtn from "../../assets/chatWindow/Closeg.svg";
import infoIcon from "../../assets/chatWindow/Info.svg";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";

function LabelsOnRightPanel(props) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const { enqueueSnackbar } = useSnackbar();
  const [customerLabels, setCustomerLabels] = useState([]);
  const [removedLabelData, setRemovedLabelData] = useState();
  const [addLabelData, setAddLabelData] = useState();
  const [lab, setlab] = useState([]);
  const [labb, setlabb] = useState([]);
  const [checked, setChacked] = useState(false);

  const handleChangecol = (e, index) => {

    e.target.checked = false;
    if (e?.target?.value != undefined && e?.target?.value != "") {
      addChatDetail({
        variables: {
          customerId: props.customerId,
          pageId: props.pageId,
          messageId: null,
          messagetext: e?.target?.value,
          messagetimestamp: (moment().unix() * 1000).toString(),
          messagetype: "label",
          agentId: props.agentId,
          alternateagentId: props.authUserId,
          read: 1,
        },
      });
      setAddLabelData(e.target?.value);


    }
  };
  const LabelsQuery = gql`
    query GetLabels($accessToken: String) {
      getlabels(accessToken: $accessToken) {
        id
        labels
      }
    }
  `;
  let [
    getLabels,
    {
      loading: labelsQueryLoading,
      error: labelsQueryError,
      data: labelsQueryResult,
    },
  ] = useLazyQuery(LabelsQuery, {
    fetchPolicy: "network-only",
  });
  //Setting up state and removing item from suggested if it is present in applied labels
  useEffect(() => {

    if (labelsQueryResult && customerLabels) {
      let obj = [];
      obj = JSON.parse(labelsQueryResult?.getlabels?.labels);
      setlab(obj);
      if (obj == null) obj = []
      for (let j = 0; j <= customerLabels.length; j++) {
        for (let i = 0; i <= obj?.length; i++) {
          if (obj[i]?.text == customerLabels[j]?.messagetext) {
            obj.splice(i, 1);
          }
        }
      }
    }
  }, [labelsQueryResult]);

  useEffect(() => {
    getLabels();
  }, [customerLabels]);

  useEffect(() => {
    if (labelsQueryError) {
      labelsQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [labelsQueryError]);
  const AddChatDetailQuery = gql`
    mutation AddChatDetail(
      $customerId: String!
      $pageId: String!
      $messageId: String
      $messagetext: String!
      $messagetimestamp: String!
      $messagetype: String!
      $agentId: ID!
      $alternateagentId: ID
      $read: Int!
    ) {
      addchatdetail(
        customerId: $customerId
        pageId: $pageId
        messageId: $messageId
        messagetext: $messagetext
        messagetimestamp: $messagetimestamp
        messagetype: $messagetype
        agentId: $agentId
        alternateagentId: $alternateagentId
        read: $read
      ) {
        success
        error
      }
    }
  `;

  let [
    addChatDetail,
    {
      loading: addChatDetailQueryLoading,
      error: addChatDetailQueryError,
      data: addChatDetailQueryResult,
    },
  ] = useMutation(AddChatDetailQuery);
  useEffect(() => {
    if (addChatDetailQueryError) {
      //error
    }
  }, [addChatDetailQueryError]);

  useEffect(() => {
    if (addChatDetailQueryResult) {
      let newCustomerLabelsArray = [
        ...customerLabels,
        { messagetext: addLabelData },
      ];
      setCustomerLabels(newCustomerLabelsArray);
    }
  }, [addChatDetailQueryResult]);
  const RemoveChatLabelMutation = gql`
    mutation RemoveChatLabel(
      $customerId: String!
      $pageId: String!
      $messagetext: String!
    ) {
      removechatlabel(
        customerId: $customerId
        pageId: $pageId
        messagetext: $messagetext
      ) {
        success
        error
        result
      }
    }
  `;

  let [
    removeChatLabel,
    {
      loading: removeChatLabelMutationLoading,
      error: removeChatLabelMutationError,
      data: removeChatLabelMutationResult,
    },
  ] = useMutation(RemoveChatLabelMutation);

  useEffect(() => {
    if (
      removeChatLabelMutationResult &&
      removeChatLabelMutationResult.removechatlabel
    ) {
      if (removedLabelData) {
        var labelsArrayWithoutDeletedLabel = customerLabels.filter(
          (curr) => curr.messagetext != removedLabelData.messagetext
        );
        setCustomerLabels(labelsArrayWithoutDeletedLabel);
      }
    }
  }, [removeChatLabelMutationResult]);

  const onDeleteLabelHandler = (curr) => {
    setRemovedLabelData(curr);

    removeChatLabel({
      variables: {
        customerId: props.customerId,
        pageId: props.pageId,
        messagetext: curr.messagetext,
      },
    });
  };
  const getChatLabelsQuery = gql`
    query getChatLabels($customerId: String!, $pageId: String!, $agentId: ID!) {
      getChatLabels(
        customerId: $customerId
        pageId: $pageId
        agentId: $agentId
      ) {
        messagetext
      }
    }
  `;
  let [
    getChatLabels,
    {
      loading: getChatLabelsQueryLoading,
      error: getChatLabelsQueryError,
      data: getChatLabelsQueryResult,
    },
  ] = useLazyQuery(getChatLabelsQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (getChatLabelsQueryError) {
      getChatLabelsQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [getChatLabelsQueryError]);

  useEffect(() => {
    if (getChatLabelsQueryResult) {
      setCustomerLabels(getChatLabelsQueryResult.getChatLabels);
    }
  }, [getChatLabelsQueryResult]);

  useEffect(() => {
    getChatLabels({
      variables: {
        customerId: props.customerId,
        pageId: props.pageId,
        agentId: props.agentId,
      },
    });
  }, [props.customerId, props.pageId, props.agentId]);

  //func for suggested labels click
  const handleSelected = (e) => {
    addChatDetail({
      variables: {
        customerId: props.customerId,
        pageId: props.pageId,
        messageId: null,
        messagetext: e.target.textContent,
        messagetimestamp: (moment().unix() * 1000).toString(),
        messagetype: "label",
        agentId: props.agentId,
        alternateagentId: props.authUserId,
        read: 1,
      },
    });
    setAddLabelData(e.target.textContent);
  };
  const LabelsUI =
    customerLabels &&
    customerLabels.length &&
    customerLabels?.map((curr) => (
      <>
        <div
          className={`RRT__tab_${curr?.messagetext?.includes("!-!-!-")
              ? curr?.messagetext?.split("!-!-!-")[1]
              : 8
            }`}
          style={{
            marginRight: "5px",
            marginBottom: "10px",
            display: "flex",  
            zIndex: 1,
            whiteSpace: "nowrap",
            padding: "3px 6px",
            alignItems: "center",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "13px",
          }}
        >
          <div>
            {curr?.messagetext?.includes("!-!-!-")
              ? curr?.messagetext?.split("!-!-!-")[0]
              : curr?.messagetext}
          </div>
          <div style={{ cursor: "pointer", marginLeft: "5px" }}>
            <img
              onClick={() => onDeleteLabelHandler(curr)}
              src={closeBtn}
              style={{ width: "10px", fontFamily: '"Poppins", sans-serif' }}
            />
          </div>
        </div>
      </>
    ));

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 10px",
        border: "1px solid lightgrey",
        borderRadius: "5px",
        margin: "8px 0px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <span
          style={{
            color: "#777777",
            fontSize: "16px",
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "500",
          }}
        >
          Labels
        </span>
        <img
          src={infoIcon}
          style={{ marginLeft: "5px", width: "15px" }}
          alt="infoicon"
        />
      </div>
      {LabelsUI != "" && LabelsUI != undefined && LabelsUI != null ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>{LabelsUI}</div>
      ) : (
        ""
      )}
      <div>
        <button
          onClick={() => props.setOpenAddLabelInput(!props.openAddLabelInput)}
          style={{
            background: " lightgrey",
            borderRadius: "3px",
            color: "black",
            border: "none",
            fontSize: "13px",
            padding: "4px 7px",
            marginBottom: "10px",
            fontFamily: "Poppins",
          }}
        >
          <img
            alt="label input"
            src={addIcon}
            style={{ width: "13px", marginTop: "-5px", marginRight: "3px" }}
          />
          Add label
        </button>
      </div>
      <>
        {props.openAddLabelInput && (
          <LabelsList
            customerId={props.customerId}
            // usedLabels={allLabelsUsed}
            onItemClick={(item) => {
              if (false) {
                props.setFollowUpDialogToggle(true);
              } else {
                let messageText = `${item}!-!-!-${Math.floor(
                  Math.random() * (7 - 1 + 1) + 1
                )}`;
                addChatDetail({
                  variables: {
                    customerId: props.customerId,
                    pageId: props.pageId,
                    messageId: null,
                    messagetext: messageText,
                    messagetimestamp: (moment().unix() * 1000).toString(),
                    messagetype: "label",
                    agentId: props.agentId,
                    alternateagentId: props.authUserId,
                    read: 1,
                  },
                });
                setAddLabelData(messageText);
              }
            }}
          />
        )}
      </>

      {/* Suggested Labels Conditional Rendering  */}

    </div>
  );
}

export default LabelsOnRightPanel;
