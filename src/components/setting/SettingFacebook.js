import React, { useEffect, useRef } from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import expressConfig from "../../config/express.json";

import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import howitwork from "../../assets/setting/Howitworks.svg";
import integration from "../../assets/setting/Integrationbenefits.svg";
import howtoconnect from "../../assets/setting/Howtoconnect.svg";
import messenger from "../../assets/setting/messenger.svg";
import tickIcon from "../../assets/setting/tick.svg";

import avatar from "../../assets/setting/avatar.png";
import closeBtn from "../../assets/chatWindow/Closeg.svg";

import disconnectIcon from "../../assets/setting/page-disconnected-02.svg";
import removeIcon from "../../assets/setting/close-02.svg";

import axios from "axios";
import { useSnackbar } from "notistack";
import { Facebook } from "../../auth/Facebook";
import VerticallyCenteredModal from "./VerticallyCenteredModal";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
    color: "#55A530",
  },
  settingFacebookMain: {
    width: "95%",
    margin: "15px auto",
  },
  settingFacebookInner: {
    width: "65%",
  },
  settingFacebookHeadingContainer: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid lightgrey",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  settingFacebookHeading: {
    fontFamily: "poppins",
    fontSize: "15px",
    fontWeight: "600",
    margin: 0,
  },
  settingFacebookMainDiv: {
    margin: "15px 0px",
    border: "1px solid lightgrey",
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "20% auto",
    gridGap: "15px",
  },
  settingFacebookMainDivLeftImg: {
    width: "110px",
    height: "110px",
  },
  settingFacebookMainDivRight: {},
  settingFacebookMainDivRightButton: {
    border: "none",
    background: "#56a530",
    color: "white",
    fontFamily: "poppins",
    fontSize: "12px",
    padding: "6px 15px",
    borderRadius: "2px",
  },
  settingFacebookMainDivPara: {
    fontFamily: "poppins",
    fontSize: "13px",
    margin: 0,
  },
  settingFacebookMainHowItWork: {
    marginTop: 20,
  },
  settingFacebookMainDivHowPara: {
    fontFamily: "poppins",
    fontSize: "13px",
  },
  settingFacebookMainDivConnectPara: {
    fontFamily: "poppins",
    fontSize: "13px",
    marginBottom: "0px",
  },
  settingFacebookFBUserName: {
    width: "100%",
    padding: "7px 30px",
    background: "#eff0f2",
    marginBottom: "20px",
  },
  settingFacebookFBPara: {
    fontFamily: "poppins",
    fontSize: "13px",
  },
  settingFacebookPagesListHeader: {
    width: "100%",
    padding: "10px 17px",
    borderBottom: "1px solid rgba(119,119,119,.5)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "10px",
  },
  settingFacebookPagesListLeft: {
    fontFamily: "poppins",
    fontSize: "13px",
    color: "#777777",
  },
  settingFacebookFBListContainer: {
    width: "100%",
    padding: "10px 17px",
    borderBottom: "1px solid rgba(119,119,119,.5)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  settingFacebookFBListRightBtn: {
    padding: "4px 8px",
    marginRight: "5px",
  },
  settingFacebookFBListLeft: {
    display: "flex",
    alignItems: "center",
  },
  settingFacebookFBListLeftText: {
    fontFamily: "poppins",
    fontSize: "13.5px",
    marginLeft: "5px",
  },
}));
function SettingFacebook(props) {
  const { enqueueSnackbar } = useSnackbar();

  const env = process.env.NODE_ENV || "development";
  const config = expressConfig[env];
  const verticalRef = useRef(null);
  const [paraText, setParaText] = React.useState("");
  const [btnText, setBtnText] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState(null);
  const [pagesData, setPagesData] = React.useState([]);
  const [actionPageData, setActionPageData] = React.useState(null);
  const [loginData, setLoginData] = React.useState({});
  const [connectToFbOn, setConnectToFbOn] = React.useState(false);
  const [loadingWindow, setLoadingWindow] = React.useState(true);
  const GetPages = gql`
    query getAllPages($mainSuperAdminId: ID!) {
      getAllPages(mainSuperAdminId: $mainSuperAdminId) {
        id
        name
        pageId
        accesstoken
        picture
        isSelected
      }
    }
  `;

  let [
    getAllPages,
    {
      loading: getPagesQueryLoading,

      data: getPagesQueryResult,
    },
  ] = useLazyQuery(GetPages, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (getPagesQueryResult && getPagesQueryResult.getAllPages) {
      let pages = [];
      getPagesQueryResult.getAllPages.forEach((curr, index) =>
        pages.push({
          order: index,
          ...curr,
        })
      );
      setPagesData(pages);
      setConnectToFbOn(true);
    }
  }, [getPagesQueryResult]);

  const disConnectPageMutation = gql`
    mutation disconnectPage($pageId: String!) {
      disconnectPage(pageId: $pageId) {
        success
        error
      }
    }
  `;
  const [
    disconnectPage,
    {
      loading: disConnectPageMutationLoading,
      error: disConnectPageMutationError,
      data: disConnectPageMutationResult,
    },
  ] = useMutation(disConnectPageMutation);

  useEffect(() => {
    if (disConnectPageMutationResult && disConnectPageMutationResult) {
      let currData =
        pagesData &&
        pagesData.length &&
        pagesData.find((curr) => curr.pageId === actionPageData);
      let pagesDataWithoutCurrData =
        pagesData &&
        pagesData.length &&
        pagesData.filter((curr) => curr.pageId != actionPageData);
      let newData = {
        ...currData,
        isSelected: false,
      };
      let newArray = [...pagesDataWithoutCurrData, newData];
      let finalArray = _.orderBy(newArray, "order", "asc");
      setPagesData(finalArray);
      verticalRef.current.alterModalShow();
    }
  }, [disConnectPageMutationResult]);

  useEffect(() => {
    if (disConnectPageMutationError) {
      disConnectPageMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [disConnectPageMutationError]);

  const connectPageMutation = gql`
    mutation connectPage($pageId: String!) {
      connectPage(pageId: $pageId) {
        success
        error
      }
    }
  `;
  const [
    connectPage,
    {
      loading: connectPageMutationLoading,
      error: connectPageMutationError,
      data: connectPageMutationResult,
    },
  ] = useMutation(connectPageMutation);

  useEffect(() => {
    if (connectPageMutationResult) {
      let currData =
        pagesData &&
        pagesData.length &&
        pagesData.find((curr) => curr.pageId === actionPageData);
      let pagesDataWithoutCurrData =
        pagesData &&
        pagesData.length &&
        pagesData.filter((curr) => curr.pageId != actionPageData);
      let newData = {
        ...currData,
        isSelected: true,
      };
      let newArray = [...pagesDataWithoutCurrData, newData];
      let finalArray = _.orderBy(newArray, "order", "asc");
      setPagesData(finalArray);
    }
  }, [connectPageMutationResult]);

  useEffect(() => {
    if (connectPageMutationError) {
      connectPageMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [connectPageMutationError]);

  const AddPagesMutation = gql`
    mutation AddPages($objects: [pages_insert_input!]) {
      addpages(objects: $objects) {
        success
        error
      }
    }
  `;
  const [
    addPages,
    {
      loading: addPagesMutationLoading,
      error: addPagesMutationError,
      data: addPagesMutationResult,
    },
  ] = useMutation(AddPagesMutation);

  useEffect(() => {
    if (addPagesMutationError) {
      addPagesMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [addPagesMutationError]);

  useEffect(() => {
    if (addPagesMutationResult && addPagesMutationResult.addpages) {
      if (addPagesMutationResult.addpages.success) {
        // enqueueSnackbar("Pages added successfully.", {
        //   variant: "success",
        // });
      } else {
        enqueueSnackbar(addPagesMutationResult.addpages.error, {
          variant: "error",
        });
      }
    }
  }, [addPagesMutationResult]);
  useEffect(() => Facebook.fbInt(), []);
  const deletepageMutation = gql`
    mutation deletepage($pageId: String!) {
      deletepage(pageId: $pageId) {
        success
        error
      }
    }
  `;
  const [
    deletepage,
    {
      loading: deletepageMutationLoading,
      error: deletepageMutationError,
      data: deletepageMutationResult,
    },
  ] = useMutation(deletepageMutation);

  useEffect(() => {
    if (deletepageMutationResult && deletepageMutationResult) {
      let pagesDataWithoutCurrData =
        pagesData &&
        pagesData.length &&
        pagesData.filter((curr) => curr.pageId != actionPageData);
      setPagesData(pagesDataWithoutCurrData);
      verticalRef.current.alterModalShow();
    }
  }, [deletepageMutationResult]);

  useEffect(() => {
    if (deletepageMutationError) {
      deletepageMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [deletepageMutationError]);

  useEffect(() => {
    getAllPages({
      variables: {
        mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail"))
          .mainSuperAdminId,
      },
    });
  }, []);

  const colorConnected = {
    border: "1px solid rgba(33,213,155,.8)",
    background: "rgba(33,213,155,.05)",
    fontFamily: "poppins",
    fontSize: "11px",
    color: "rgba(33,213,155,.8)",
  };
  const colorDisconnected = {
    border: "1px solid rgba(227,77,89,.8)",
    background: "rgba(227,77,89,.05)",
    fontFamily: "poppins",
    fontSize: "11px",
    color: "rgba(227,77,89,.8)",
  };
  const classes = useStyles();
  const disconnectedHandler = (data) => {
    setParaText("Do you really want to disconnect this page?");
    setBtnText("Disconnect Page");
    setImgSrc(disconnectIcon);
    verticalRef.current.alterModalShow();
    setActionPageData(data.pageId);
  };

  const closeHandler = (data) => {
    setImgSrc(removeIcon);
    setParaText("Do you really want to remove this page?");
    setBtnText("Remove");
    verticalRef.current.alterModalShow();
    setActionPageData(data.pageId);
  };

  const connectedHandler = (data) => {
    setActionPageData(data.pageId);
    connectPage({
      variables: {
        pageId: data.pageId,
      },
    });
  };

  const disConnectApiCallHandler = () => {
    disconnectPage({
      variables: {
        pageId: actionPageData,
      },
    });
  };
  const removeApiCallHandler = () => {
    deletepage({
      variables: {
        pageId: actionPageData,
      },
    });
  };

  useEffect(() => {
    setLoadingWindow(true);
  }, []);
  const pages =
    pagesData &&
    pagesData.length &&
    pagesData.map((curr, index) => (
      <>
        <div key={curr.id} className={classes.settingFacebookFBListContainer}>
          <div className={classes.settingFacebookFBListLeft}>
            <img
              src={curr.picture ? curr.picture : avatar}
              alt="avatar"
              style={{ width: "30px" }}
            />
            <span className={classes.settingFacebookFBListLeftText}>
              {curr.name}
            </span>
          </div>
          <div className={classes.settingFacebookFBListRight}>
            <button
              onClick={
                curr.isSelected
                  ? () => disconnectedHandler(curr)
                  : () => connectedHandler(curr)
              }
              style={curr.isSelected ? colorDisconnected : colorConnected}
              className={classes.settingFacebookFBListRightBtn}
            >
              {curr.isSelected ? "Disconnect Page" : "Connect Page"}
            </button>
            <img
              src={closeBtn}
              onClick={() => closeHandler(curr)}
              alt="avatar"
              style={{ width: "15px", cursor: "pointer" }}
            />
          </div>
        </div>
      </>
    ));

  const connectToFB = () => {
    console.log(Facebook.fbInt());
    window.FB.login((responseLogin) => {
      console.log(responseLogin, "responseLogin");
      if (responseLogin.authResponse) {
        console.log("Welcome!  Fetching your information.... ");
        window.FB.api("/me", function (responses) {
          window.FB.api(
            `/${responses.id}/picture?redirect=false`,
            "GET",
            function (response) {
              // Insert your code here
              console.log(response, "response");
              setLoginData({
                name: responses.name,
                picture: response.data.url,
              });
              setLoadingWindow(false);
            }
          );
        });
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  };
  const connectToFacebookHandler = () => {
    window.FB.login(
      (responseLogin) => {
        var longAccessToken = null;
        if (responseLogin.status === "connected") {
          axios
            .get(
              `https://graph.facebook.com/oauth/access_token?  
                  grant_type=fb_exchange_token&          
                  client_id=${config.facebook_app_id}&
                  client_secret=${config.facebook_app_secret}&
                  fb_exchange_token=${responseLogin.authResponse.accessToken}`
            )
            .then((response) => {
              longAccessToken = response.data.access_token;

              if (longAccessToken) {
                window.FB.api(
                  `/${responseLogin.authResponse.userID}/accounts?fields=name,picture,access_token&access_token=${longAccessToken}`,
                  (responseAccount) => {
                    console.log(responseAccount);
                    if (responseAccount && !responseAccount.error) {
                      responseAccount.data.map((curr) =>
                        axios
                          .post(
                            `https://graph.facebook.com/${curr.id}/subscribed_apps?subscribed_fields=messages,messaging_postbacks,message_reads,messaging_payments,message_deliveries,message_echoes,messaging_checkout_updates,standby,messaging_handovers,message_reactions,feed,inbox_labels,messaging_feedback&access_token=${curr.access_token}`
                          )
                          .then((impres) => setConnectToFbOn(true))
                      );
                      var filterData = responseAccount.data;

                      pagesData.map((item) => {
                        filterData = _.filter(
                          filterData,
                          (responseData) => responseData.id != item.pageId
                        );
                      });
                      if (filterData && filterData.length != 0) {
                        var createPageObjectValue = [];
                        filterData.forEach((item) =>
                          createPageObjectValue.push({
                            name: item.name,
                            pageId: item.id,
                            accesstoken: item.access_token,
                            picture: item.picture.data.url,
                            mainSuperAdminId: JSON.parse(
                              localStorage.getItem("ActiveUserdetail")
                            ).mainSuperAdminId,
                          })
                        );

                        addPages({
                          variables: {
                            objects: createPageObjectValue,
                          },
                        });
                        setPagesData([...createPageObjectValue, ...pagesData]);
                      }
                      console.log(filterData, "filterData");
                      //   props.setaddEditPagesModalPages(
                      //     filterData
                      //   );
                      props.setAddEditPagesModalToggle(true);
                    } else if (responseAccount && responseAccount.error) {
                      //   enqueueSnackbar(
                      //     responseAccount.error.message,
                      //     {
                      //       variant: "error",
                      //     }
                      //   );
                    }
                  }
                );
              }
            })
            .catch((error) => {
              console.log("long lived token error ", error);
            });
        }
      },
      {
        scope:
          "pages_manage_metadata,pages_show_list,pages_messaging,pages_read_engagement",
      },
      { auth_type: "reauthenticate" }
    );
  };
  return (
    <div className={classes.settingFacebookMain}>
      {true && (
        <>
          <div className={classes.settingFacebookInner}>
            <div className={classes.settingFacebookHeadingContainer}>
              <h4 className={classes.settingFacebookHeading}>
                Accept Chats from Facebook Messenger
              </h4>
            </div>
            {!connectToFbOn && !loadingWindow && (
              <>
                <div className={classes.settingFacebookMainDiv}>
                  <div className={classes.settingFacebookMainDivLeft}>
                    <img
                      src={messenger}
                      alt="messenger"
                      className={classes.settingFacebookMainDivLeftImg}
                    />
                  </div>
                  <div className={classes.settingFacebookMainDivRight}>
                    <h5
                      style={{
                        fontSize: "13.5px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Connect your Facebook page
                    </h5>
                    <p
                      style={{
                        fontSize: "12px",
                        fontFamily: "poppins",
                        marginTop: "-5px",
                        marginBottom: "5px",
                      }}
                    >
                      <span>
                        Handle your Messenger conversations directly in your
                        Chattyhub panel and answer quickly to your customers'
                        questions.
                      </span>
                      <span>
                        Less distraction with switching platforms, more
                        productivity.
                      </span>
                    </p>
                    <button
                      onClick={connectToFacebookHandler}
                      className={classes.settingFacebookMainDivRightButton}
                    >
                      Connect To Facebook
                    </button>
                  </div>
                </div>
                <div className={classes.settingFacebookMainIntegration}>
                  <div className={classes.settingFacebookHeadingContainer}>
                    <img
                      src={integration}
                      alt="how it works"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    <h4 className={classes.settingFacebookHeading}>
                      Integration benefits
                    </h4>
                  </div>
                  <p className={classes.settingFacebookMainDivPara}>
                    <span className={classes.settingFacebookMainDivParaSpan}>
                      <img
                        src={tickIcon}
                        alt="tick"
                        style={{ marginRight: "5px", width: "15px" }}
                      />
                    </span>
                    You and your team members can see all Messenger
                    communication in one place
                  </p>
                  <p className={classes.settingFacebookMainDivPara}>
                    <span className={classes.settingFacebookMainDivParaSpan}>
                      <img
                        src={tickIcon}
                        alt="tick"
                        style={{ marginRight: "5px", width: "15px" }}
                      />
                    </span>
                    Don't miss any messages from Messenger - thanks to desktop
                    notifications
                  </p>
                  <p className={classes.settingFacebookMainDivPara}>
                    <span className={classes.settingFacebookMainDivParaSpan}>
                      <img
                        src={tickIcon}
                        alt="tick"
                        style={{ marginRight: "5px", width: "15px" }}
                      />
                    </span>
                    Easy to integrate, no-code required, takes less than 2
                    minutes
                  </p>
                </div>
                <div className={classes.settingFacebookMainHowItWork}>
                  <div className={classes.settingFacebookHeadingContainer}>
                    <img
                      src={howitwork}
                      alt="how it works"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    <h4 className={classes.settingFacebookHeading}>
                      How it works
                    </h4>
                  </div>

                  <p className={classes.settingFacebookMainDivHowPara}>
                    By integrating Messenger with Chattyhub, you receive all
                    your fan/business page's messages in one inbox. It means you
                    can handle your conversations across channels more
                    efficiently without the risk of losing context. Your data is
                    safe and secure - no third-party apps have access to it.
                  </p>
                </div>
                <div>
                  <div className={classes.settingFacebookHeadingContainer}>
                    <img
                      src={howtoconnect}
                      alt="how it works"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    <h4 className={classes.settingFacebookHeading}>
                      How to connect
                    </h4>
                  </div>
                  <p className={classes.settingFacebookMainDivConnectPara}>
                    Chattyhub integrates with Messenger in just two quick steps:
                  </p>
                  <ol style={{ fontFamily: "poppins", fontSize: "13px" }}>
                    <li>Click the button “Connect Facebook Messenger”</li>
                    <li>
                      Log in to your Facebook account and choose a fan page you
                      would like to integrate with. Next time you receive a
                      message from your fan page, it will land in your chats
                      panel inbox, with other messages from your communication
                      channels.
                    </li>
                  </ol>
                </div>
              </>
            )}
            {connectToFbOn && !loadingWindow && (
              <>
                <div className={classes.settingFacebookFBUserName}>
                  <span className={classes.settingFacebookFBPara}>
                    Connected to Facebook as:
                  </span>
                  <img
                    src={loginData.picture}
                    alt="fbavatar"
                    style={{ width: "50px" }}
                  />
                  <span className={classes.settingFacebookFBPara}>
                    {loginData.name}
                  </span>
                  <button
                    onClick={() => setConnectToFbOn(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      fontFamily: "poppins",
                      fontSize: "14px",
                    }}
                  >
                    disconnect
                  </button>
                </div>
                <div className={classes.settingFacebookPagesListHeader}>
                  <span className={classes.settingFacebookPagesListLeft}>
                    PAGE NAME
                  </span>
                  <button
                    onClick={connectToFacebookHandler}
                    className={classes.settingFacebookMainDivRightButton}
                  >
                    Connect To Facebook
                  </button>
                </div>
                {getPagesQueryLoading ? (
                  <div>
                    <CircularProgress
                      className={classes.loadingCircularProgress}
                      size={24}
                    />
                  </div>
                ) : (
                  <>{pages}</>
                )}
              </>
            )}
            {loadingWindow && (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "calc(100vh - 230px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <CircularProgress
                    style={{ color: "green", marginBottom: "10px" }}
                    color="success"
                  />
                  <button
                    style={{
                      border: "1px solid green",
                      background: "none",
                      fontFamily: "poppins",
                      fontSize: "13px",
                      padding: "5px 15px",
                    }}
                    onClick={connectToFB}
                  >
                    Connect To Facebook
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <VerticallyCenteredModal
        img={imgSrc}
        text={paraText}
        btnText={btnText}
        disConnect={disConnectApiCallHandler}
        removeHandler={removeApiCallHandler}
        ref={verticalRef}
      />
    </div>
  );
}

export default SettingFacebook;
