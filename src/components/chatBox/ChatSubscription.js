import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setChatBoxRecentChatListData,
  setSmsChatListData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxMessageData,
  setChatBoxPendingChatCount,
  setChatBoxTypingMessageDetails,
  setChatBoxRecentChatListDataTotalCount,
} from "../../store/actions/ChatBoxActions";
import { setUsersListSubscriptionData } from "../../store/actions/UsersListActions";
import { setUserPanelChatOnline } from "../../store/actions/UserPanelActions";
import _ from "lodash";
import moment from "moment";
import {
  useSubscription,
  useMutation,
  useLazyQuery,
} from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PanelType from "../../auth/PanelType";
import includes from "./includes";
import useIsTabVisible from "./useIsTabVisible";
import audiofile from "../Notification/notification.mp3";
import { Howl, Howler } from "howler";
const ChatSubscription = (props) => {
  const [data, setData] = React.useState({});
  const isVisible = useIsTabVisible();

  const getNotificationSettingQuery = gql`
    query getNotificationSetting($accessToken: String) {
      getNotificationSetting(accessToken: $accessToken) {
        id
        notificationsetting
      }
    }
  `;
  let [
    getNotificationSetting,
    {
      loading: getNotificationSettingQueryLoading,
      error: getNotificationSettingQueryError,
      data: getNotificationSettingQueryResult,
    },
  ] = useLazyQuery(getNotificationSettingQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getNotificationSetting();
  }, []);
  useEffect(() => {
    if (
      getNotificationSettingQueryResult &&
      getNotificationSettingQueryResult.getNotificationSetting
    ) {
      var decodeResult = JSON.parse(
        getNotificationSettingQueryResult.getNotificationSetting
          .notificationsetting
      );
      setData(decodeResult);
    }
  }, [getNotificationSettingQueryResult]);

  const MarkAllMessageChatRead = gql`
    mutation MarkAllMessageChatRead($customerId: String!, $pageId: String!) {
      markallmessagechatread(customerId: $customerId, pageId: $pageId) {
        success
        error
        result
      }
    }
  `;

  let [markAllMessageChatRead, {}] = useMutation(MarkAllMessageChatRead);

  const ReceiptReadStatusChangedSubscription = gql`
    subscription ReceiptReadStatusChanged {
      receiptreadstatuschanged {
        customerId
        pageId
        receiptreadtimestamp
      }
    }
  `;

  const { data: receiptReadStatusChangedSubscriptionResult } = useSubscription(
    ReceiptReadStatusChangedSubscription
  );

  useEffect(() => {
    if (
      receiptReadStatusChangedSubscriptionResult &&
      receiptReadStatusChangedSubscriptionResult.receiptreadstatuschanged
    ) {
      var prevChatData = _.find(
        props.chatBoxMessageData,
        (itm) =>
          itm.customerId ==
            receiptReadStatusChangedSubscriptionResult.receiptreadstatuschanged
              .customerId &&
          itm.pageId ==
            receiptReadStatusChangedSubscriptionResult.receiptreadstatuschanged
              .pageId
      );

      if (prevChatData) {
        var prevMarkReceiptReadChatItem = _.find(
          prevChatData.messages,
          (itm) => itm.receiptreadtimestamp
        );
        if (prevMarkReceiptReadChatItem)
          prevMarkReceiptReadChatItem.receiptreadtimestamp = undefined;

        var outgoingMessageLastItem = _.last(
          _.filter(prevChatData.messages, (itm) => itm.type == "outgoing")
        );
        if (outgoingMessageLastItem)
          outgoingMessageLastItem.receiptreadtimestamp =
            receiptReadStatusChangedSubscriptionResult.receiptreadstatuschanged.receiptreadtimestamp;

        props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
      }
    }
  }, [receiptReadStatusChangedSubscriptionResult]);
  const DeliveryStatusChangedSubscription = gql`
    subscription DeliveryStatusChanged {
      deliverystatuschanged {
        customerId
        pageId
        deliverytimestamp
      }
    }
  `;

  const { data: deliveryStatusChangedSubscriptionResult } = useSubscription(
    DeliveryStatusChangedSubscription
  );

  useEffect(() => {
    if (
      deliveryStatusChangedSubscriptionResult &&
      deliveryStatusChangedSubscriptionResult.deliverystatuschanged
    ) {
      var prevChatData = _.find(
        props.chatBoxMessageData,
        (itm) =>
          itm.customerId ==
            deliveryStatusChangedSubscriptionResult.deliverystatuschanged
              .customerId &&
          itm.pageId ==
            deliveryStatusChangedSubscriptionResult.deliverystatuschanged.pageId
      );

      if (prevChatData) {
        var prevMarkDeliveredChatItem = _.find(
          prevChatData.messages,
          (itm) => itm.deliverytimestamp
        );

        if (prevMarkDeliveredChatItem)
          prevMarkDeliveredChatItem.deliverytimestamp = undefined;

        var outgoingMessageLastItem = _.last(
          _.filter(prevChatData.messages, (itm) => itm.type == "outgoing")
        );

        if (outgoingMessageLastItem)
          outgoingMessageLastItem.deliverytimestamp =
            deliveryStatusChangedSubscriptionResult.deliverystatuschanged.deliverytimestamp;

        props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
      }
    }
  }, [deliveryStatusChangedSubscriptionResult]);

  const newSmsMessageAddedSubscription = gql`
    subscription newSmsMessageAdded {
      newSmsMessageAdded {
        id
        customerId
        messageId
        messagetext
        messagetimestamp
        messagetype
        phoneNumber
        agentId
      }
    }
  `;
  const { data: newSmsMessageAddedSubscriptionResult } = useSubscription(
    newSmsMessageAddedSubscription
  );

  useEffect(() => {
    if (
      newSmsMessageAddedSubscriptionResult &&
      newSmsMessageAddedSubscriptionResult.newSmsMessageAdded
    ) {
      props.smsChatListData.push({
        id: newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.id,
        customerId:
          newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.customerId,
        messagetimestamp: moment
          .unix(
            newSmsMessageAddedSubscriptionResult.newSmsMessageAdded
              .messagetimestamp / 1000
          )
          .format("DD MMM YYYY hh:mm a"),
        messageId:
          newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.messageId,
        messageBody:
          newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.messagetext,
        messagetype:
          newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.messagetype,
        phoneNumber:
          newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.phoneNumber,
        agentId:
          newSmsMessageAddedSubscriptionResult.newSmsMessageAdded.agentId,
      });

      props.setSmsChatListData(_.cloneDeep(props.smsChatListData));

      console.log(
        newSmsMessageAddedSubscriptionResult.newSmsMessageAdded,
        "newsmsmessageadded"
      );
    }
  }, [newSmsMessageAddedSubscriptionResult]);
  const MarkAllMessageChatReadSubscription = gql`
    subscription MarkAllMessageChatRead {
      markallmessagechatread {
        agentId
        customerId
        pageId
      }
    }
  `;

  const { data: markAllMessageChatReadSubscriptionResult } = useSubscription(
    MarkAllMessageChatReadSubscription
  );

  useEffect(() => {
    if (
      markAllMessageChatReadSubscriptionResult &&
      markAllMessageChatReadSubscriptionResult.markallmessagechatread
    ) {
      var findChatBoxRecentChatListData = _.find(
        props.chatBoxRecentChatListData,
        (item) =>
          item.pageId ==
            markAllMessageChatReadSubscriptionResult.markallmessagechatread
              .pageId &&
          item.customerId ==
            markAllMessageChatReadSubscriptionResult.markallmessagechatread
              .customerId
      );

      if (findChatBoxRecentChatListData) {
        findChatBoxRecentChatListData.read = true;
        props.setChatBoxRecentChatListData(
          _.cloneDeep(props.chatBoxRecentChatListData)
        );
      }
    }
  }, [markAllMessageChatReadSubscriptionResult]);
  const ChatDetailAddedSubscription = gql`
    subscription ChatDetailAdded {
      chatdetailadded {
        id
        customerId
        file
        mediatype
        pageId
        messageId
        messagetext
        messagetimestamp
        messagetype
        agentId
        alternateagentId
        marknottoaddinchatcircle
      }
    }
  `;

  const {
    error: chatDetailAddedSubscriptionError,
    data: chatDetailAddedSubscriptionResult,
  } = useSubscription(ChatDetailAddedSubscription);
  const InboxDetailAddedSubscription = gql`
    subscription InboxDetailAdded {
      inboxdetailadded {
        messagetimestamp
        agentId
        last_msg
        customerId
        pageId
        messageId
        read
      }
    }
  `;

  const {
    error: InboxDetailAddedSubscriptionError,
    data: InboxDetailAddedSubscriptionResult,
  } = useSubscription(InboxDetailAddedSubscription);

  const soundToggle = () => {
    let sound = new Howl({
      src: audiofile,
      autoplay: true,
      volume: 0.8,
      html5: true,
    });

    sound.play();
  };

  const [audio] = useState(new Audio(audiofile));

  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.autoplay = true;
    console.log(audio, "audio");
    audio.addEventListener("ended", () => setPlaying(false));
    // return () => {
    //   audio.removeEventListener('ended', () => setPlaying(false));
    // };
  }, []);

  // const useAudio = url => {
  //   const [audio] = useState(new Audio(url));

  //   const [playing, setPlaying] = useState(false);

  //   const toggle = () => setPlaying(!playing);

  //   useEffect(() => {

  //       playing ? audio.play() : audio.pause();
  //     },
  //     [playing]
  //   );

  //   useEffect(() => {

  //     audio.addEventListener('ended', () => setPlaying(false));
  //     return () => {
  //       audio.removeEventListener('ended', () => setPlaying(false));
  //     };
  //   }, []);

  //   return [playing, toggle];
  // };

  // const [playing, toggle] = useAudio(audiofile);
  useEffect(() => {
    console.log("inboxdetailadded");

    if (
      InboxDetailAddedSubscriptionResult &&
      InboxDetailAddedSubscriptionResult.inboxdetailadded
    ) {
      if (
        props.chatBoxRecentChatListData.find(
          (curr) =>
            curr.customerId ==
            InboxDetailAddedSubscriptionResult.inboxdetailadded.customerId
        )
      ) {
        let newArray = props.chatBoxRecentChatListData.filter(
          (curr) =>
            curr.customerId !=
            InboxDetailAddedSubscriptionResult.inboxdetailadded.customerId
        );
        props.setChatBoxRecentChatListData(_.cloneDeep(newArray));
      }
      if (
        InboxDetailAddedSubscriptionResult.inboxdetailadded.agentId ==
        props.authUserId
      ) {
        props.chatBoxRecentChatListData.unshift({
          agentId: InboxDetailAddedSubscriptionResult.inboxdetailadded.agentId,
          pageId: InboxDetailAddedSubscriptionResult.inboxdetailadded.pageId,
          customerId:
            InboxDetailAddedSubscriptionResult.inboxdetailadded.customerId,
          pageName: "",
          customerName: "",
          lastMessage: InboxDetailAddedSubscriptionResult.inboxdetailadded
            .last_msg
            ? codeToEmoji(
                InboxDetailAddedSubscriptionResult.inboxdetailadded.last_msg
              )
            : "Sends an attachment",
          lastMessageTimeStamp:
            InboxDetailAddedSubscriptionResult.inboxdetailadded
              .messagetimestamp,
          selected: false,
          messageId:
            InboxDetailAddedSubscriptionResult.inboxdetailadded.messageId,
          read: InboxDetailAddedSubscriptionResult.inboxdetailadded.read,
          loading: false,
          labels: [],
          marknottoaddinchatcircle: 0,
        });

        props.setChatBoxRecentChatListData(
          _.cloneDeep(props.chatBoxRecentChatListData)
        );
      }
    }
  }, [InboxDetailAddedSubscriptionResult]);
  useEffect(() => {
    if (chatDetailAddedSubscriptionError) {
      console.log(
        "chatDetailAddedSubscriptionError",
        chatDetailAddedSubscriptionError
      );
    }
  }, [chatDetailAddedSubscriptionError]);
  function codeToEmoji(stringVal) {
    var words;

    if (stringVal) {
      words = stringVal.split(" ");
    }

    var alpha = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const ar1 = [
      "o/",
      "</3",
      "<3",
      "8-D",
      "8D",
      ":-D",
      "=-3",
      "=-D",
      "=3",
      "=D",
      "B^D",
      "X-D",
      "XD",
      "x-D",
      "xD",
      ":')",
      ":'-)",
      ":-))",
      "8)",
      ":)",
      ":-)",
      ":3",
      ":D",
      ":]",
      ":^)",
      ":c)",
      ":o)",
      ":}",
      ":っ)",
      "=)",
      "=]",
      "0:)",
      "0:-)",
      "0:-3",
      "0:3",
      "0;^)",
      "O:-)",
      "3:)",
      "3:-)",
      "}:)",
      "}:-)",
      "*)",
      "*-)",
      ":-,",
      ";)",
      ";-)",
      ";-]",
      ";D",
      ";]",
      ";^)",
      ":-|",
      ":|",
      ":(",
      ":-(",
      ":-<",
      ":-[",
      ":-c",
      ":<",
      ":[",
      ":c",
      ":{",
      ":っC",
      "%)",
      "%-)",
      ":-P",
      ":-b",
      ":-p",
      ":-Þ",
      ":-þ",
      ":P",
      ":b",
      ":p",
      ":Þ",
      ":þ",
      ";(",
      "=p",
      "X-P",
      "XP",
      "d:",
      "x-p",
      "xp",
      ":-||",
      ":@",
      ":-.",
      ":-/",
      ":/",
      ":L",
      ":S",
      ":\\",
      "=/",
      "=L",
      "=\\",
      ":'(",
      ":'-(",
      "^5",
      "^<_<",
      "o/\\o",
      "|-O",
      "|;-)",
      ":###..",
      ":-###..",
      "D-':",
      "D8",
      "D:",
      "D:<",
      "D;",
      "D=",
      "DX",
      "v.v",
      "8-0",
      ":-O",
      ":-o",
      ":O",
      ":o",
      "O-O",
      "O_O",
      "O_o",
      "o-o",
      "o_O",
      "o_o",
      ":$",
      "#-)",
      ":#",
      ":&",
      ":-#",
      ":-&",
      ":-X",
      ":X",
      ":-J",
      ":*",
      ":^*",
      "ಠ_ಠ",
      "*\\0/*",
      "\\o/",
      ":>",
      ">.<",
      ">:(",
      ">:)",
      ">:-)",
      ">:/",
      ">:O",
      ">:P",
      ">:[",
      ">:\\",
      ">;)",
      ">_>^",
    ];
    var emojis = [
      "👋",
      "💔",
      "💗",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😁",
      "😂",
      "😂",
      "😃",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😄",
      "😇",
      "😇",
      "😇",
      "😇",
      "😇",
      "😇",
      "😈",
      "😈",
      "😈",
      "😈",
      "😉",
      "😉",
      "😉",
      "😉",
      "😉",
      "😉",
      "😉",
      "😉",
      "😉",
      "😐",
      "😐",
      "😒",
      "😒",
      "😒",
      "😒",
      "😒",
      "😒",
      "😒",
      "😒",
      "😒",
      "😒",
      "😖",
      "😖",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😜",
      "😠",
      "😠",
      "😡",
      "😡",
      "😡",
      "😡",
      "😡",
      "😡",
      "😡",
      "😡",
      "😡",
      "😢",
      "😢",
      "😤",
      "😤",
      "😤",
      "😫",
      "😫",
      "😰",
      "😰",
      "😱",
      "😱",
      "😱",
      "😱",
      "😱",
      "😱",
      "😱",
      "😱",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😲",
      "😳",
      "😵",
      "😶",
      "😶",
      "😶",
      "😶",
      "😶",
      "😶",
      "😼",
      "😽",
      "😽",
      "🙅",
      "🙆",
      "🙆",
      "😄",
      "😡",
      "😠",
      "😈",
      "😈",
      "😈",
      "😲",
      "😜",
      "😒",
      "😡",
      "😈",
      "😤",
    ];
    if (words && words.length) {
      for (let i = 0; i < words.length; i++) {
        if (alpha.includes(words[i][0]) || alpha.includes(words[i][0])) {
        } else {
          if (ar1.indexOf(words[i]) != -1) {
            words[i] = emojis[ar1.indexOf(words[i])];
          }
        }
      }
    }
    var newString;
    if (words) {
      newString = words.join(" ");
    }
    return newString;
  }
  const parseNameFromURL = (url) => {
    let myArray = url.split("?")[0];
    let name = [];

    for (let i = myArray.length; i >= 0; i--) {
      if (myArray[i] == "/") break;
      name.push(myArray[i]);
    }
    let subfinal = name.reverse();
    let final = subfinal.join("");
    return final;
  };
  useEffect(() => {
    if (
      chatDetailAddedSubscriptionResult &&
      chatDetailAddedSubscriptionResult.chatdetailadded
    ) {
      if (
        chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
          "incoming" &&
        chatDetailAddedSubscriptionResult.chatdetailadded.agentId ==
          props.authUserId
      ) {
        if (!isVisible) {
          soundToggle();
        }
      }
      if (
        chatDetailAddedSubscriptionResult.chatdetailadded.agentId ==
          props.authUserId ||
        new includes().checkToAddItemOnChatList(
          chatDetailAddedSubscriptionResult.chatdetailadded.agentId,
          props.usersListData,
          props.authPanelType,
          props.usersListSelectedUser,
          props.chatBoxRecentChatListShowAllListToggle,
          props.chatBoxRecentChatListShowAllListByManagerToggle
        )
      ) {
        var prevChatData = _.find(
          props.chatBoxMessageData,
          (itm) =>
            itm.customerId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.customerId &&
            itm.pageId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.pageId
        );

        var messageText =
          chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
          "followuplabel"
            ? JSON.parse(
                chatDetailAddedSubscriptionResult.chatdetailadded.messagetext
              )
            : chatDetailAddedSubscriptionResult.chatdetailadded.messagetext;

        messageText =
          chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
          "followuplabel"
            ? `${messageText[0]} at ${moment
                .unix(messageText[1] / 1000)
                .format("yyyy-MM-DD hh:mm A")}`
            : messageText;

        messageText =
          chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
          "label"
            ? messageText.includes("!-!-!-")
              ? messageText.split("!-!-!-")[0]
              : messageText
            : messageText;

        if (prevChatData) {
          var AddData = false;
          if (
            chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
              "followuplabel" ||
            chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
              "label" ||
            chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
              "closelabel" ||
            chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
              "salesdonepp" ||
            chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
              "salesdonewpp"
          ) {
            AddData = true;
          } else {
            var findMessageIfExistByMessageId = _.find(
              prevChatData.messages,
              (item) =>
                item.messageId ==
                chatDetailAddedSubscriptionResult.chatdetailadded.messageId
            );
            AddData = !findMessageIfExistByMessageId;
          }

          if (AddData) {
            var newmessagetext = codeToEmoji(messageText);
            prevChatData.messages.push({
              loading: false,
              messageId:
                chatDetailAddedSubscriptionResult.chatdetailadded.messageId,
              text: newmessagetext
                ? newmessagetext
                : chatDetailAddedSubscriptionResult.chatdetailadded.file,
              timestamp:
                chatDetailAddedSubscriptionResult.chatdetailadded
                  .messagetimestamp,
              type: chatDetailAddedSubscriptionResult.chatdetailadded
                .messagetype,
              read: chatDetailAddedSubscriptionResult.chatdetailadded.read,
              file: chatDetailAddedSubscriptionResult.chatdetailadded.file,
              name:
                chatDetailAddedSubscriptionResult.chatdetailadded.file &&
                parseNameFromURL(
                  chatDetailAddedSubscriptionResult.chatdetailadded.file
                ),
              mediatype:
                chatDetailAddedSubscriptionResult.chatdetailadded.mediatype,
            });

            props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
          }
          /// changing message to read if its open and message is incoming
          var selectedChatsOnFloatingTabpanelItem = _.find(
            props.chatBoxSelectedChatsOnFloating,
            (itm) => itm.selected == true
          );
          if (
            selectedChatsOnFloatingTabpanelItem &&
            selectedChatsOnFloatingTabpanelItem.customerId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.customerId &&
            selectedChatsOnFloatingTabpanelItem.pageId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.pageId
          ) {
            if (!chatDetailAddedSubscriptionResult.chatdetailadded.read) {
              markAllMessageChatRead({
                variables: {
                  customerId:
                    chatDetailAddedSubscriptionResult.chatdetailadded
                      .customerId,
                  pageId:
                    chatDetailAddedSubscriptionResult.chatdetailadded.pageId,
                },
              });
            }
          }
        }

        var prevRecentChatData = _.find(
          props.chatBoxRecentChatListData,
          (itm) =>
            itm.customerId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.customerId &&
            itm.pageId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.pageId
        );
        var labels = [];
        if (!prevRecentChatData) {
          props.setChatBoxRecentChatListDataTotalCount(
            props.chatBoxRecentChatListDataTotalCount + 1
          );
        }
        if (
          prevRecentChatData &&
          prevRecentChatData.labels &&
          prevRecentChatData.labels.length > 0
        )
          labels = prevRecentChatData.labels;

        if (
          chatDetailAddedSubscriptionResult.chatdetailadded.messagetype ==
          "label"
        )
          labels.push(
            codeToEmoji(
              chatDetailAddedSubscriptionResult.chatdetailadded.messagetext
            )
          );

        _.remove(
          props.chatBoxRecentChatListData,
          (item) =>
            item.pageId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.pageId &&
            item.customerId ==
              chatDetailAddedSubscriptionResult.chatdetailadded.customerId
        );

        //   if(props.chatBoxRecentChatListData.find((curr)=>curr.customerId == chatDetailAddedSubscriptionResult.chatdetailadded.customerId)){

        //     let newArray =props.chatBoxRecentChatListData.filter((curr)=>curr.customerId !=chatDetailAddedSubscriptionResult.chatdetailadded.customerId );
        //     props.setChatBoxRecentChatListData(
        //       _.cloneDeep(newArray)
        //     );
        //     console.log(newArray,"newArray")
        //   }
        //  else
        if (
          chatDetailAddedSubscriptionResult.chatdetailadded.messagetype &&
          prevRecentChatData
        )
          props.chatBoxRecentChatListData.unshift({
            agentId: chatDetailAddedSubscriptionResult.chatdetailadded.agentId,
            pageId: chatDetailAddedSubscriptionResult.chatdetailadded.pageId,
            customerId:
              chatDetailAddedSubscriptionResult.chatdetailadded.customerId,
            pageName: "",
            customerName: "",
            lastMessage: messageText
              ? codeToEmoji(messageText)
              : chatDetailAddedSubscriptionResult.chatdetailadded.mediatype ==
                "file"
              ? parseNameFromURL(
                  chatDetailAddedSubscriptionResult.chatdetailadded.file
                )
              : "Sends an attachment",

            lastMessageTimeStamp:
              chatDetailAddedSubscriptionResult.chatdetailadded
                .messagetimestamp,
            selected: false,
            messageId:
              chatDetailAddedSubscriptionResult.chatdetailadded.messageId,
            read: chatDetailAddedSubscriptionResult.chatdetailadded.read,
            loading: false,
            labels: labels,
            marknottoaddinchatcircle:
              chatDetailAddedSubscriptionResult.chatdetailadded
                .marknottoaddinchatcircle,
            file: chatDetailAddedSubscriptionResult.chatdetailadded.file,
            name:
              chatDetailAddedSubscriptionResult.chatdetailadded.file &&
              parseNameFromURL(
                chatDetailAddedSubscriptionResult.chatdetailadded.file
              ),
            mediatype:
              chatDetailAddedSubscriptionResult.chatdetailadded.mediatype,
          });

        props.setChatBoxRecentChatListData(
          _.cloneDeep(props.chatBoxRecentChatListData)
        );
      }
    }
  }, [chatDetailAddedSubscriptionResult]);

  const PendingChatCountChangedSubscription = gql`
    subscription PendingChatCountChanged {
      pendingchatcountchanged {
        result
      }
    }
  `;

  const {
    data: pendingChatCountChangedSubscriptionResult,
    error: pendingChatCountChangedSubscriptionError,
  } = useSubscription(PendingChatCountChangedSubscription);

  useEffect(() => {
    if (
      pendingChatCountChangedSubscriptionResult &&
      pendingChatCountChangedSubscriptionResult.pendingchatcountchanged
    ) {
      var pendingChatCount = JSON.parse(
        pendingChatCountChangedSubscriptionResult.pendingchatcountchanged.result
      );
      if (
        props.authPanelType != PanelType.MANAGER &&
        props.authPanelType != PanelType.SUPERADMIN
      ) {
        _.remove(
          pendingChatCount,
          (item) => !props.authUserPagesAssigned.includes(item.pageId)
        );
      } else {
        var userPagesAllAdded = _.map(
          props.authPagesData,
          (item) => item.pageId
        );
        _.remove(
          pendingChatCount,
          (item) => !userPagesAllAdded.includes(item.pageId)
        );
      }

      props.setChatBoxPendingChatCount(pendingChatCount.length);
    }
  }, [pendingChatCountChangedSubscriptionResult]);

  useEffect(() => {
    if (pendingChatCountChangedSubscriptionError) {
      alert(pendingChatCountChangedSubscriptionError);
    }
  }, [pendingChatCountChangedSubscriptionError]);

  const ChatLabelRemoveSubscription = gql`
    subscription ChatLabelRemove {
      chatlabelremove {
        success
        error
        result
      }
    }
  `;

  const {
    data: chatLabelRemoveSubscriptionResult,
    error: chatLabelRemoveSubscriptionError,
  } = useSubscription(ChatLabelRemoveSubscription);

  useEffect(() => {
    if (
      chatLabelRemoveSubscriptionResult &&
      chatLabelRemoveSubscriptionResult.chatlabelremove
    ) {
      var chatLabelRemoveResult = JSON.parse(
        chatLabelRemoveSubscriptionResult.chatlabelremove.result
      );

      if (chatLabelRemoveResult) {
        var prevRecentChatData = _.find(
          props.chatBoxRecentChatListData,
          (itm) =>
            itm.customerId == chatLabelRemoveResult.removeData.customerId &&
            itm.pageId == chatLabelRemoveResult.removeData.pageId
        );
        if (prevRecentChatData) {
          _.remove(
            prevRecentChatData.labels,
            (item) => item == chatLabelRemoveResult.removeData.messagetext
          );

          prevRecentChatData.lastMessage =
            chatLabelRemoveResult.lastChatDetails.messagetext;
          prevRecentChatData.lastMessageTimeStamp = moment(
            chatLabelRemoveResult.lastChatDetails.messagetimestamp
          );
          prevRecentChatData.messageId =
            chatLabelRemoveResult.lastChatDetails.messageId;
          prevRecentChatData.read = chatLabelRemoveResult.lastChatDetails.read;
          prevRecentChatData.marknottoaddinchatcircle =
            chatLabelRemoveResult.lastChatDetails.marknottoaddinchatcircle;

          props.setChatBoxRecentChatListData(
            _.cloneDeep(props.chatBoxRecentChatListData)
          );

          var prevChatData = _.find(
            props.chatBoxMessageData,
            (itm) =>
              itm.customerId == chatLabelRemoveResult.removeData.customerId &&
              itm.pageId == chatLabelRemoveResult.removeData.pageId
          );

          if (prevChatData) {
            _.remove(
              prevChatData.messages,
              (item) =>
                item.text == chatLabelRemoveResult.removeData.messagetext &&
                item.type == chatLabelRemoveResult.removeData.messagetype
            );
            props.setChatBoxMessageData(_.cloneDeep(props.chatBoxMessageData));
          }
        }
      }
    }
  }, [chatLabelRemoveSubscriptionResult]);

  useEffect(() => {
    if (chatLabelRemoveSubscriptionError) {
      alert(chatLabelRemoveSubscriptionError);
    }
  }, [chatLabelRemoveSubscriptionError]);

  const SubscriptionDataChangedSubscription = gql`
    subscription SubscriptionDataChanged {
      subscriptiondatachanged {
        success
        error
        result
      }
    }
  `;

  const {
    data: subscriptionDataChangedSubscriptionResult,
    error: subscriptionDataChangedSubscriptionError,
  } = useSubscription(SubscriptionDataChangedSubscription);

  useEffect(() => {
    if (
      subscriptionDataChangedSubscriptionResult &&
      subscriptionDataChangedSubscriptionResult.subscriptiondatachanged
    ) {
      const subData = JSON.parse(
        subscriptionDataChangedSubscriptionResult.subscriptiondatachanged.result
      );
      props.setUsersListSubscriptionData(subData);
      const findCurrentSubUserData = _.find(
        subData,
        (dataSub) => dataSub.agentId == props.authUserId
      );

      if (findCurrentSubUserData) {
        if (findCurrentSubUserData.isOnline != props.userPanelChatOnline)
          props.setUserPanelChatOnline(findCurrentSubUserData.isOnline);
      }
    }
  }, [subscriptionDataChangedSubscriptionResult]);

  useEffect(() => {
    if (subscriptionDataChangedSubscriptionError) {
      alert(subscriptionDataChangedSubscriptionError);
    }
  }, [subscriptionDataChangedSubscriptionError]);

  const MessageTypingStatusChangedSubscription = gql`
    subscription MessageTypingStatusChanged {
      messagetypingstatuschanged {
        customerId
        pageId
        agentId
        userId
        username
      }
    }
  `;

  const { data: messageTypingStatusChangedSubscriptionResult } =
    useSubscription(MessageTypingStatusChangedSubscription);

  useEffect(() => {
    if (
      messageTypingStatusChangedSubscriptionResult &&
      messageTypingStatusChangedSubscriptionResult.messagetypingstatuschanged
    ) {
      const agentIdOfTypingPerson =
        messageTypingStatusChangedSubscriptionResult.messagetypingstatuschanged
          .agentId;
      const userIdOfTypingPerson =
        messageTypingStatusChangedSubscriptionResult.messagetypingstatuschanged
          .userId;

      if (userIdOfTypingPerson != props.authUserId) {
        const usernameOfTypingPerson =
          messageTypingStatusChangedSubscriptionResult
            .messagetypingstatuschanged.username;
        const customerIdOfTypingPerson =
          messageTypingStatusChangedSubscriptionResult
            .messagetypingstatuschanged.customerId;
        const pageIdOfTypingPerson =
          messageTypingStatusChangedSubscriptionResult
            .messagetypingstatuschanged.pageId;

        var itemData = _.find(
          props.chatBoxSelectedChatsOnFloating,
          (itm) => itm.selected == true
        );
        if (
          itemData &&
          customerIdOfTypingPerson == itemData.customerId &&
          pageIdOfTypingPerson == itemData.pageId
        ) {
          props.setChatBoxTypingMessageDetails(usernameOfTypingPerson);
        }

        var prevChatData = _.find(
          props.chatBoxRecentChatListData,
          (itm) =>
            customerIdOfTypingPerson == itm.customerId &&
            pageIdOfTypingPerson == itm.pageId
        );

        if (prevChatData)
          prevChatData.typingMessageDetails = usernameOfTypingPerson;

        props.setChatBoxRecentChatListData(
          _.cloneDeep(props.chatBoxRecentChatListData)
        );
      }
    }
  }, [messageTypingStatusChangedSubscriptionResult]);

  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    ...state.UserPanelReducer,
    ...state.ChatBoxReducer,
    ...state.AuthReducer,
    ...state.UsersListReducer,
    ...state.ManagersListReducer,
  };
};
export default connect(mapStateToProps, {
  setChatBoxRecentChatListData,
  setSmsChatListData,
  setChatBoxSelectedChatsOnFloating,
  setChatBoxMessageData,
  setChatBoxPendingChatCount,
  setUserPanelChatOnline,
  setUsersListSubscriptionData,
  setChatBoxTypingMessageDetails,
  setChatBoxRecentChatListDataTotalCount,
})(ChatSubscription);
